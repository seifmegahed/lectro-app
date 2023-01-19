import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Firebase
import { db } from "../../firebase-config";
import { collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import {
  useFirestoreDocumentMutation,
  useFirestoreDocumentData,
} from "@react-query-firebase/firestore";

import { useAuth } from "../../contexts/AuthContext";

import { Box, Typography } from "@mui/material";

import FormContainer from "../../components/FormContainer";
import ImageUpload from "../../components/ImageUpload";
import AutoForm from "../../components/AutoForm";

import { itemFields } from "../../data/fields";
import Loading from "../../components/Loading";

const helperCollectionName = "helper_data";
const itemsCollectionName = "items";
const helperDocumentId = "Items";

const EditItem = () => {
  const { id } = useParams();
  const itemUrl = `/items-new/item/${id}`;
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const itemsCollectionReferance = collection(db, itemsCollectionName);
  const itemDocumentReferance = doc(itemsCollectionReferance, id);
  const helperCollectionReferance = collection(db, helperCollectionName);

  const helperDocumentReferance = doc(
    helperCollectionReferance,
    helperDocumentId
  );
  const updateItem = useFirestoreDocumentMutation(itemDocumentReferance);
  const updateHelper = useFirestoreDocumentMutation(helperDocumentReferance);
  const helperItems = useFirestoreDocumentData(
    [helperCollectionName, helperDocumentId],
    helperDocumentReferance
  );

  const [image, setImage] = useState({ imageUrl: "", imageUri: "" });

  useEffect(() => {
    const getData = async () => {
      const documentSnapshot = await getDoc(itemDocumentReferance);
      return documentSnapshot.data();
    };
    getData().then((data) => {
      setItem(data);
      if (!!data?.imageUrl)
        setImage({
          imageUrl: data.imageUrl,
          imageUri: data.imageUri,
        });
    });
    // eslint-disable-next-line
  }, []);

  const imageState = () => {
    let doesNotIncludeImage = true;
    itemFields[item.category].forEach(
      (field) => (doesNotIncludeImage &= field.name !== "image")
    );
    return !doesNotIncludeImage;
  };

  const imageData = (data) => {
    console.log(data);
    setImage(data);
  };

  const handleSubmit = (data) => {
    setLoading(true);
    let changesToCommit = false;
    let imageChange = false;
    let newData = {};
    // Image Changed
    if (item?.imageUrl !== "" && item?.imageUrl !== image.imageUrl) {
      changesToCommit = true;
      imageChange = true;
      console.log("Image Changed");
      newData = { ...newData, imageDetails: item.imageUrl };
    }

    if (!!data) {
      changesToCommit = true;
      newData = { ...newData, ...data };
    } else {
      newData = { ...item };
    }
    if (changesToCommit) {
      newData = {
        ...newData,
        lastModifiedOn: serverTimestamp(),
        modifiedBy: currentUser.displayName,
      };

      updateItem.mutate(newData, {
        onSuccess() {
          if (imageChange) {
            const newHelperItems = helperItems.data.data.map((item) => {
              if (item.id === id) {
                return { ...item, imageUrl: image.imageUrl };
              } else {
                return item;
              }
            });
            updateHelper.mutate(
              { data: newHelperItems, count: newHelperItems.length },
              {
                onSuccess() {
                  navigate(itemUrl);
                },
                onError(error) {
                  console.log("Failed to update helperItems", error);
                },
              }
            );
          } else {
            navigate(itemUrl);
          }
        },
      });
    } else {
      navigate(itemUrl);
    }
  };

  if (!item?.name) {
    return <Loading state={true} />;
  }

  return (
    <FormContainer>
      <Loading state={loading} />
      <Box sx={{ gridColumn: "span 4" }}>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Typography variant="h3" mb="20px">
            Edit Item
          </Typography>
          <Typography variant="h3" mb="20px">
            {item.category}
          </Typography>
        </Box>
      </Box>
      {imageState && (
        <Box sx={{ gridColumn: "span 2", gridRow: "span 3" }}>
          <ImageUpload
            storageFolder={`items/${item.category}`}
            returnImageData={imageData}
            initImage={image}
          />
        </Box>
      )}
      <AutoForm
        edit={true}
        initData={item}
        fields={itemFields[item.category]}
        submitToParent={handleSubmit}
      />
    </FormContainer>
  );
};

export default EditItem;
