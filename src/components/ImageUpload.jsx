// React
import { useState } from "react";

// Storage
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Material UI
import { Box, CircularProgress } from "@mui/material";

// Icons
import { Upload } from "@mui/icons-material";

// Global Styles
const borderRadius = "10px";

const ImageUpload = ({ returnImageData, storageFolder, initUrl }) => {
  // Create State for Image URL and store initUrl if it Exists
  const [imageUrl, setImageUrl] = useState(initUrl || "");

  // Create State for Image Pat
  const [imagePath, setImagePath] = useState();

  // Create State for Image loaded used by Circular Progress
  const [loaded, setLoaded] = useState(false);

  // Image Upload Function
  const uploadImage = async (event) => {
    const file = event.target.files[0];
    // check if file exists
    if (file.type === null) {
      console.log("Error not a file, try again");
      return;
    }
    // check if file is Image
    else if (!file.type.match("image.*")) {
      console.log("Error not Image");
      return;
    }
    // File Exists and is Image
    else {
      setLoaded(false);
      // Check if an Image already exists
      if (!!imagePath) {
        // Delete existing image
        await deleteObject(ref(getStorage(), imagePath))
          .then(() => {
            // Successful Delete
            console.log("delete complete");
          })
          .catch((error) => {
            // Handle unsuccessful delete
            throw new Error("File Delete Failed", error);
          });
      }
      // Create File Path
      const filePath = `${storageFolder}/${file.name}`;
      // Upload Image
      const uploadTask = uploadBytesResumable(
        // Image Referance
        ref(getStorage(), filePath),
        // File to Upload
        file
      );
      // Listen to upload status
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // get progress in percent
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("Failed to upload image", error);
        },
        // Upload Successful
        () => {
          // Get Image URL
          getDownloadURL(newImageRef).then((publicImageUrl) => {
            // Store in state
            setImageUrl(publicImageUrl);
            // Get URI from uploadTask metadata
            const fullPath = uploadTask._metadata.fullPath;
            // Store URI in State
            setImagePath(fullPath);
            // Return Image Data to parent
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
      height="100%"
      width="100%"
      maxWidth="100%"
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="max-content"
        width="max-content"
        maxHeight="100%"
        maxWidth="100%"
        borderRadius={borderRadius}
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
            height: "max-content",
            maxHeight: "220px",
            maxWidth: "100%",
            borderRadius: `${borderRadius}`,
          }}
          alt=""
          onLoad={() => setLoaded(true)}
        />
        <Box
          position="absolute"
          bottom="0"
          p="8px"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          width="100%"
          borderRadius={`0 0 ${borderRadius} ${borderRadius}`}
          sx={{
            backgroundColor: "grey",
            opacity: "0.3",
          }}
        >
          <Upload sx={{ color: "white", fontSize: "30pt" }} />
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
