import { useState } from "react";

// Firebase
import { db } from "../../firebase-config";
import { collection, doc, serverTimestamp } from "firebase/firestore";
import {
  useFirestoreDocumentMutation,
  useFirestoreDocumentData,
} from "@react-query-firebase/firestore";

import { useAuth } from "../../contexts/AuthContext";

import { Box, Backdrop, Typography, CircularProgress } from "@mui/material";

import useInventory from "../../contexts/InventoryContext";
import FormContainer from "../../components/FormContainer";
import ImageUpload from "../../components/ImageUpload";
import AutoForm from "../../components/AutoForm";

import { itemFields } from "../../data/fields";

const helperCollectionName = "helper_data";
const itemsCollectionName = "items";
const helperDocumentId = "Items";

const EditItem = () => {
  const { item, setPage, PAGES } = useInventory();
  const { id, category, imageUrl } = item;
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const itemsCollectionReferance = collection(db, itemsCollectionName);
  const itemDocumentReferance = doc(itemsCollectionReferance, id);
  const helperCollectionReferance = collection(db, helperCollectionName);
  const helperDocumentReferance = doc(
    helperCollectionReferance,
    helperDocumentId
  );

  const [image, setImage] = useState(
    !!imageUrl
      ? { imageUrl: imageUrl, imageUri: "" }
      : { imageUrl: "", imageUri: "" }
  );

  const imageState = () => {
    let doesNotIncludeImage = true;
    itemFields[category].forEach(
      (field) => (doesNotIncludeImage &= field.name !== "image")
    );
    return !doesNotIncludeImage;
  };


  const updateItem = useFirestoreDocumentMutation(itemDocumentReferance);
  const updateHelper = useFirestoreDocumentMutation(helperDocumentReferance);
  const helperItems = useFirestoreDocumentData(
    [helperCollectionName, helperDocumentId],
    helperDocumentReferance
  );

  const itemDetails = useFirestoreDocumentData(
    [itemsCollectionName, id],
    itemDocumentReferance,
    {},
    {
      onSuccess() {
        setLoading(false);
      },
    }
  );

  const imageData = (data) => {
    console.log(data);
    setImage(data);
  };

  const handleSubmit = (data) => {
    setLoading(true);
    console.log(data);
    let changesToCommit = false;
    let imageChange = false;

    let newData = {};
    // Image Changed
    if (!!imageUrl && imageUrl !== image.imageUrl) {
      changesToCommit = true;
      imageChange = true;
      console.log("Image Changed");
      newData = { ...newData, imageUrl };
    }

    if (!!data) {
      changesToCommit = true;
      newData = { ...newData, ...data };
    } else {
      newData = { ...itemDetails };
    }
    if (changesToCommit) {
      newData = {
        ...newData,
        lastModifiedOn: serverTimestamp(),
        modifiedBy: currentUser.displayName,
      };

      updateItem.mutate(
        newData,
        {
          onSuccess() {
            if (imageChange) {
              const newHelperItems = helperItems.data.data.map((item) => {
                if (item.id === id) {
                  return { ...item, imageUrl: image.url };
                } else {
                  return item;
                }
              });
              updateHelper.mutate(
                { data: newHelperItems, count: newHelperItems.length },
                {
                  onSuccess() {
                    setPage(PAGES.ITEM_PAGE);
                  },
                  onError(error) {
                    console.log("Failed to update helperItems", error);
                  },
                }
              );
            } else {
              setPage(PAGES.ITEM_PAGE);
            }
          },
        }
      );
    } else {
      setPage(PAGES.ITEM_PAGE);
    }
  };

  return (
    <FormContainer>
      <Backdrop sx={{ color: "#fff", zIndex: "100000" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
            storageFolder={`items/${category}`}
            returnImageData={imageData}
            initUrl={image.imageUrl}
          />
        </Box>
      )}
      {itemDetails.isFetched && (
        <AutoForm
          edit={true}
          initData={itemDetails.data}
          fields={itemFields[category]}
          submitToParent={handleSubmit}
        />
      )}
    </FormContainer>
  );
};

export default EditItem;
