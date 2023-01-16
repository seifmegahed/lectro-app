import { useEffect, useState } from "react";

// Firebase
import { db } from "../../firebase-config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { collection, doc, serverTimestamp } from "firebase/firestore";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreDocumentData,
} from "@react-query-firebase/firestore";

import { useAuth } from "../../contexts/AuthContext";

import {
  Box,
  Select,
  useTheme,
  Backdrop,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

import { itemFields } from "../../data/fields";
import { tokens } from "../../theme";

import useInventory from "../../contexts/InventoryContext";
import FormContainer from "../../components/FormContainer";
import ImageUpload from "../../components/ImageUpload";
import AutoForm from "../../components/AutoForm";

const helperCollectionName = "helper_data";
const itemsCollectionName = "items";
const helperDocumentId = "Items";

const NewItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { currentUser } = useAuth();

  const { setPage, setItem, addItem, setSelectedItems, PAGES } = useInventory();
  const [image, setImage] = useState({ imageUrl: "", imageUri: "" });
  const [imageState, setImageState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [canceled, setCanceled] = useState(true);

  const itemsCollectionReferance = collection(db, itemsCollectionName);
  const helperCollectionReferance = collection(db, helperCollectionName);
  const helperDocumentReferance = doc(
    helperCollectionReferance,
    helperDocumentId
  );

  const helperItems = useFirestoreDocumentData(
    [helperCollectionName, helperDocumentId],
    helperDocumentReferance
  ).data;
  const createItem = useFirestoreCollectionMutation(itemsCollectionReferance);
  const updateHelper = useFirestoreDocumentMutation(helperDocumentReferance);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    let doesNotIncludeImage = true;
    if (category !== "") {
      const checkForImage = new Promise((resolve) => {
        resolve(
          itemFields[category].forEach((field) => {
            const state = field.name !== "image";
            doesNotIncludeImage &= state;
          })
        );
      });
      checkForImage.then(setImageState(!doesNotIncludeImage));
    }
  }, [category]);

  const deleteImage = async (imageUri) => {
    if (imageUri !== "") {
      // Delete existing image
      await deleteObject(ref(getStorage(), imageUri))
        .then(() => {
          // Successful Delete
          console.log("Image delete complete");
        })
        .catch((error) => {
          // Handle unsuccessful delete
          throw new Error("File Delete Failed", error);
        });
    }
  };

  useEffect(() => {
    console.log("mount");
    return () => {
      const { imageUri } = image;
      if (canceled) {
        deleteImage(imageUri);
      }
    };
    // eslint-disable-next-line
  }, [image]);

  const imageData = (data) => {
    console.log(data);
    setImage(data);
  };

  const returnHome = (data) => {
    addItem(data);
    setItem(data);
    setSelectedItems([]);
    setPage(PAGES.ITEM_PAGE);
  };
  const handleHelper = (data) => {
    updateHelper.mutate({
      data: [data, ...helperItems.data],
      count: helperItems.count + 1,
    });
  };
  const handleSubmit = (data) => {
    setLoading(true);
    createItem.mutate(
      {
        ...data,
        ...image,
        createdBy: currentUser.displayName,
        createdOn: serverTimestamp(),
      },
      {
        onSuccess(response, values) {
          setCanceled(false);
          const { name, mpn, make, imageUrl, id } = values;
          const data = { name, category, make, imageUrl, id };
          if (!!mpn) data.mpn = mpn;
          handleHelper(data);
          setItem({ ...values, id: response.id, createdOn: new Date() });
          setSelectedItems([]);
          setLoading(false);
          setPage(PAGES.ITEM_PAGE);
        },
        onError(error) {
          setLoading(false);
          throw new Error("Error Writing Helper Data", error);
        },
      }
    );
  };

  return (
    <FormContainer>
      <Backdrop sx={{ color: "#fff", zIndex: "100000" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ gridColumn: "span 4" }}>
        <Typography variant="h3" mb="20px">
          New Item
        </Typography>
      </Box>
      {imageState && (
        <Box sx={{ gridColumn: "span 2", gridRow: "span 3" }}>
          <ImageUpload
            storageFolder={`items/${category}`}
            returnImageData={imageData}
            initUrl={image.imageUrl}
          />
        </Box>
      )}
      <FormControl
        fullWidth
        sx={{ gridColumn: `span ${imageState ? "2" : "4"}` }}
      >
        <InputLabel id={"selectItemCategoryLabel"}>Category</InputLabel>
        <Select
          labelId="selectItemCategoryLabel"
          label="Category"
          name="category"
          value={category || ""}
          onChange={handleCategoryChange}
          sx={{
            backgroundColor: `${colors.grey[900]}`,
          }}
        >
          {Object.keys(itemFields).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!!category && (
        <AutoForm
          initData={{}}
          fields={itemFields[category]}
          returnHome={returnHome}
          submitToParent={handleSubmit}
          collectionName="items"
        />
      )}
    </FormContainer>
  );
};

export default NewItem;
