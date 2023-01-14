import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

import { Upload } from "@mui/icons-material";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const ImageUpload = ({ returnImageData, storageFolder, initUrl }) => {
  const [imageUrl, setImageUrl] = useState(initUrl || "");
  const [imagePath, setImagePath] = useState();
  const [loaded, setLoaded] = useState(false);
  const borderRadius = "10px"

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (file.type === null) {
      console.log("Error not a file, try again");
      return;
    } else if (!file.type.match("image.*")) {
      console.log("Error not Image");
      return;
    } else {
      setLoaded(false);
      if (!!imagePath) {
        await deleteObject(ref(getStorage(), imagePath))
          .then(() => {
            console.log("delete complete");
          })
          .catch((error) => {
            throw new Error("File Delete Failed", error);
          });
      }
      const filePath = `${storageFolder}/${file.name}`;
      const newImageRef = ref(getStorage(), filePath);
      const uploadTask = uploadBytesResumable(newImageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("Failed to upload image", error);
        },
        () => {
          getDownloadURL(newImageRef).then((publicImageUrl) => {
            setImageUrl(publicImageUrl);
            const fullPath = uploadTask._metadata.fullPath;
            setImagePath(fullPath);
            returnImageData({
              imageUrl: publicImageUrl,
              imageUri: fullPath,
            });
          });
        }
      );
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      width="100%"
      maxWidth="100%"
      height="100%"
      gap="10px"
    >
      <Box
        position="relative"
        display="flex"
        borderRadius={borderRadius}
        height="max-content"
        width="max-content"
        maxHeight="100%"
        maxWidth="100%"
        alignItems="center"
        justifyContent="center"
        onClick={() => {
          if (loaded) document.getElementById("fileInput").click();
        }}
        sx={{
          cursor: `${loaded ? "pointer" : "wait"}`,
          backgroundColor: `${loaded ? "" : "white"}`,
          opacity: `${loaded ? "" : "0.6"}`,
          ":hover": {
            backgroundColor: "white",
            opacity: "0.6",
          },
        }}
      >
        <Box position="absolute" display={loaded ? "none" : "block"}>
          <CircularProgress />
        </Box>
        <img
          src={imageUrl || "/images/imageplaceholder.png"}
          style={{
            borderRadius: `${borderRadius}`,
            maxHeight: "220px",
            height: "max-content",
            maxWidth: "100%",
          }}
          alt=""
          onLoad={() => setLoaded(true)}
        />
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          p="8px"
          bottom="0"
          width="100%"
          borderRadius={`0 0 ${borderRadius} ${borderRadius}`}
          sx={{
            backgroundColor: "grey",
            opacity: "0.3",
          }}
        >
          <Upload sx={{ color: "white",fontSize: "30pt" }} />
          <input
            id="fileInput"
            hidden
            accept="image/*"
            onChange={uploadImage}
            type="file"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ImageUpload;
