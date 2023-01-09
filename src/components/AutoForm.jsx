import { Box, Backdrop, CircularProgress, Button } from "@mui/material";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase-config";
import { collection, doc, serverTimestamp } from "firebase/firestore";

import { useState } from "react";
import FieldSelector from "./FieldSelector";

import { useAuth } from "../contexts/AuthContext";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";

const AutoForm = ({ fields, initData, returnHome, collectionName, edit }) => {
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [data, setData] = useState(initData);
  const { currentUser } = useAuth();
  const collectionReferance = collection(db, collectionName);
  const documentReferance = edit
    ? doc(collectionReferance, initData.id)
    : undefined;

  const createMutation = useFirestoreCollectionMutation(collectionReferance);

  const editMutation = useFirestoreDocumentMutation(
    documentReferance,
    { merge: true },
    {
      onSuccess(response, values) {
        returnHome({ ...values, lastModifiedOn: new Date() });
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  const updateData = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadImage = async (category) => {
    const filePath = `${collectionName}/${category}/${file.name}`;
    const newImageRef = ref(getStorage(), filePath);
    const fileSnapshot = await uploadBytesResumable(newImageRef, file);
    const publicImageUrl = await getDownloadURL(newImageRef);
    return {
      imageUrl: publicImageUrl,
      storageUri: fileSnapshot.metadata.fullPath,
    };
  };

  const handleImageSelect = (event) => {
    event.preventDefault();

    const temp = event.target.files[0];
    // Check if the file is an image.
    if (temp.type === null) {
      console.log("Error not a file, try again");
      return;
    }
    if (!temp.type.match("image.*")) {
      console.log("Error not Image");
      return;
    }
    setFile(temp);
  };

  const saveData = async () => {
    let newData = {
      ...data,
      createdBy: currentUser.displayName,
      createdOn: serverTimestamp(),
    };
    if (!!file) {
      newData = { newData, ...(await uploadImage(newData.category)) };
    }
    createMutation.mutate(newData, {
      onSuccess(response, values) {
        returnHome({
          ...newData,
          id: response.id,
          createdOn: new Date(),
        });
      },
      onError(error) {
        console.log(error);
      },
    });
  };

  const editData = () => {
    let newData = {};
    const keys = Object.keys(data);

    keys.forEach((key) => {
      // check if data is changed
      if (data[key] !== (!!initData[key] ? initData[key] : "")) {
        // if field is changed add to newData Object
        newData[key] = data[key];
      }
    });

    const newDataKeys = Object.keys(newData);

    if (newDataKeys.length > 0) {
      delete newData["id"];
      delete newData["selected"];
      newData["modifiedBy"] = currentUser.displayName;
      newData["lastModifiedOn"] = serverTimestamp();
      editMutation.mutate({ ...newData });
    }
  };

  const handleSubmit = () => {
    var allValid = true;
    fields.forEach((field) => {
      if (!!field.required) {
        setErrors((prev) => ({ ...prev, [field.name]: false }));
        if (data[field.name] === undefined || !data[field.name]) {
          allValid = false;
          setErrors((prev) => ({ ...prev, [field.name]: true }));
        }
      }
    });
    if (allValid) {
      let noChange = true;
      fields.forEach((field) => {
        noChange &= data[field.name] === initData[field.name];
      });
      edit ? (noChange ? returnHome() : editData()) : saveData();
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: "100000" }}
        open={edit ? editMutation.isLoading : createMutation.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {fields.map((field, index) => {
        const { name, input } = field;
        if (!!input) {
          return (
            <FieldSelector
              key={name}
              file={file}
              field={field}
              edit={edit}
              index={index}
              value={data[name]}
              prevData={!!initData[name] ? initData[name] : ""}
              error={errors[name]}
              updateData={updateData}
              handleImageSelect={handleImageSelect}
            />
          );
        }
        return null;
      })}
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 4" }}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            width: "6rem",
            height: "2.5rem",
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default AutoForm;
