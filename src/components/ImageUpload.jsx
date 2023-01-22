// IMPORTS
// React
import { useState } from "react";

// Firebase
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Material UI
import { Box, CircularProgress } from "@mui/material";

// Icons
import { Upload } from "@mui/icons-material";

// Global Values
const borderRadius = "10px";

const ImageUpload = ({
  returnImageData,
  storageFolder,
  initUrl,
  initImage,
}) => {
  // Create State for Image URL and store initUrl if it Exists
  const [imageUrl, setImageUrl] = useState(
    !!initImage ? initImage.imageUrl : initUrl ?? null
  );

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
      // Create File Path
      const filePath = `${storageFolder}/${file.name}`;
      // Image Referance
      const newImageReferance = ref(getStorage(), filePath);

      getDownloadURL(newImageReferance).then(onResolve, onReject);

      function onResolve(publicImageUrl) {
        console.log("image exists");
        // Store in state
        setImageUrl(publicImageUrl);
        // Return Image Data to parent
        returnImageData({
          imageUrl: publicImageUrl,
          imageUri: filePath,
        });
        setLoaded(true);
      }
      function onReject() {
        // Upload Image
        const uploadTask = uploadBytesResumable(
          newImageReferance,
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
            getDownloadURL(newImageReferance).then((publicImageUrl) => {
              // Store in state
              setImageUrl(publicImageUrl);
              // Get URI from uploadTask metadata
              const fullPath = uploadTask._metadata.fullPath;
              // Return Image Data to parent
              returnImageData({
                imageUrl: publicImageUrl,
                imageUri: fullPath,
              });
            });
          }
        );
      }
    }
  };

  return (
    // Box to fill grid and contain component
    <Box
      // Flex
      display="flex"
      alignItems="center"
      justifyContent="center"
      // Size
      height="100%"
      width="100%"
      // Size Limits
      maxWidth="100%"
    >
      {/* Box that contains Image */}
      <Box
        position="relative"
        // Flex
        display="flex"
        alignItems="center"
        justifyContent="center"
        // Size
        height="max-content"
        width="max-content"
        // Size Limits
        maxHeight="100%"
        maxWidth="100%"
        // Border
        borderRadius={borderRadius}
        onClick={() => {
          if (loaded) document.getElementById("fileInput").click();
        }}
        // Style
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
        {/*
         * Progress circle
         * Displayed when loaded is false
         */}
        <Box position="absolute" display={loaded ? "none" : "block"}>
          <CircularProgress />
        </Box>
        {/*
         * Image
         * Accepts imageUrl
         * Or displays placeholder
         * When Image is loaded onLoaded()
         * changes loaded state
         */}
        <img
          // Image Source
          src={imageUrl ?? "/images/imageplaceholder.png"}
          alt=""
          // On Loaded callback
          onLoad={() => setLoaded(true)}
          // Style
          style={{
            // Size
            height: "max-content",
            // Size Limits
            maxHeight: "220px",
            maxWidth: "100%",
            // Border
            borderRadius: `${borderRadius}`,
          }}
        />
        {/* Overlay Box that contains Icon */}
        <Box
          // Positioning
          position="absolute"
          bottom="0"
          // Flex
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          // Size
          width="100%"
          // Padding
          p="8px"
          // Border
          borderRadius={`0 0 ${borderRadius} ${borderRadius}`}
          // Styles
          sx={{
            backgroundColor: "grey",
            opacity: "0.3",
          }}
        >
          {/* Upload Icon */}
          <Upload sx={{ color: "white", fontSize: "30pt" }} />
          {/* Hidden Input that accepts file */}
          <input
            // id to trigger click on box click
            hidden
            id="fileInput"
            // File Input Type
            type="file"
            // Accept image files
            accept="image/*"
            // Trigger uploadImage funciton
            onChange={uploadImage}
          />
        </Box>
      </Box>
    </Box>
  );
};

// Export Component
export default ImageUpload;
