import { useEffect, useState } from "react";

// Firebase
import { db } from "../../firebase-config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  collection,
  doc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

import { useAuth } from "../../contexts/AuthContext";

import {
  Box,
  Select,
  useTheme,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";

import { itemFields } from "../../data/fields";
import { tokens } from "../../theme";

import FormContainer from "../../components/FormContainer";
import ImageUpload from "../../components/ImageUpload";
import AutoForm from "../../components/AutoForm";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const helperCollectionName = "helper_data";
const itemsCollectionName = "items";
const helperDocumentId = "Items";

const NewItem = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [image, setImage] = useState({ imageUrl: "", imageUri: "" });
  const [imageState, setImageState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  const itemsCollectionReferance = collection(db, itemsCollectionName);
  const helperCollectionReferance = collection(db, helperCollectionName);
  const helperDocumentReferance = doc(
    helperCollectionReferance,
    helperDocumentId
  );

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

  // eslint-disable-next-line
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

  const imageData = (data) => {
    console.log(data);
    setImage(data);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await runTransaction(db, async (transaction) => {
        const helperItemsDocument = await transaction.get(
          helperDocumentReferance
        );
        const newItemDocumentReferance = doc(itemsCollectionReferance);
        const id = newItemDocumentReferance.id
        let newHelperItem = {
          id,
          name: data.name,
          make: data.make,
          category,
        };
        if (!!data.mpn) newHelperItem.mpn = data.mpn;
        if (!!image.imageUrl) newHelperItem.imageUrl = image.imageUrl;

        let newHelperItems = helperItemsDocument.data().data;
        newHelperItems.unshift(newHelperItem);

        transaction.update(helperDocumentReferance, {
          data: newHelperItems,
          count: newHelperItems.length,
        });

        transaction.set(newItemDocumentReferance, {
          category,
          ...data,
          ...image,
          createdBy: currentUser.displayName,
          createdOn: serverTimestamp(),
        });

        console.log(
          `Item Document ${id} Creation Transaction Successful`
        );
        navigate(`/inventory/item/${id}`);
      });
    } catch (error) {
      setLoading(false);
      console.log(`New Item Transaction Failed!`, error);
      // Modal
    }
  };

  return (
    <FormContainer>
      <Loading state={loading} />
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
          submitToParent={handleSubmit}
        />
      )}
    </FormContainer>
  );
};

export default NewItem;
