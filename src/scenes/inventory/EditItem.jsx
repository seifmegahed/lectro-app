import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Firebase
import { db } from "../../firebase-config";
import {
  doc,
  getDoc,
  collection,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

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
  const itemUrl = `/inventory/item/${id}`;
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const itemsCollectionReferance = collection(db, itemsCollectionName);
  const helperCollectionReferance = collection(db, helperCollectionName);

  const itemDocumentReferance = doc(itemsCollectionReferance, id);
  const helperDocumentReferance = doc(
    helperCollectionReferance,
    helperDocumentId
  );

  const [image, setImage] = useState({ imageUrl: "", imageUri: "" });
  const [imageChange, setImageChange] = useState(false);

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
    setImageChange(true);
    setImage(data);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    let changesToCommit = false;
    let newData = {};

    if (!!data) {
      changesToCommit = true;
      newData = { ...newData, ...data };
    } else {
      newData = { ...item };
    }

    if (imageChange) {
      changesToCommit = true;
      console.log("Image Changed");
      newData = {
        ...newData,
        imageUrl: image.imageUrl,
        imageUri: image.imageUri,
      };
    }

    if (changesToCommit) {
      newData = {
        ...newData,
        lastModifiedOn: serverTimestamp(),
        modifiedBy: currentUser.displayName,
      };
      console.log(newData);
      try {
        await runTransaction(db, async (transaction) => {
          const helperDocument = await transaction.get(helperDocumentReferance);
          const itemDocument = await transaction.get(itemDocumentReferance);

          const newHelperItems = helperDocument
            .data()
            .data.map((helperItem) => {
              if (helperItem.id === itemDocument.id) {
                let newHelperItem = {
                  ...helperItem,
                  name: newData.name,
                };
                if (imageChange) newHelperItem.imageUrl = image.imageUrl;

                if (!!newData.mpn) newHelperItem.mpn = newData.mpn;
                return newHelperItem;
              }
              return helperItem;
            });
          transaction.update(helperDocumentReferance, {
            data: newHelperItems,
            count: newHelperItems.length,
          });
          transaction.update(itemDocumentReferance, {
            ...itemDocument.data(),
            ...newData,
          });
          console.log(`Edit ${id} Transaction Successfully Committed!`);
          navigate(itemUrl, { replace: true });
        });
      } catch (error) {
        console.log(`Edit ${id} Transaction Failed!`, error);
        setLoading(false);
        // Modal
      }
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
