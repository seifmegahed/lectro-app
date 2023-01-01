import {
  Select,
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, updateDoc } from "firebase/firestore";

import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { tokens } from "../../../theme";
import { db } from "../../../firebase-config";
import { PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import { ACTIONS } from "../NewItem";
import useInventory from "../../../contexts/InventoryContext";

const LEDTypes = ["PCB", "COB", "Reel"];

const LEDForm = ({ dispatch, product }) => {
  const { currentUser } = useAuth();
  const { updatePage, PAGES } = useInventory();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    make: false,
    name: false,
    power: false,
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  const handleImageUpload = (event) => {
    event.preventDefault();

    const temp = event.target.files[0];
    // Check if the file is an image.
    if(temp.type === null) {
      console.log('Error not a file, try again')
      return;
    }
    if (!temp.type.match("image.*")) {
      console.log("Error not Image");
      return;
    }
    setFile(temp);
  };

  async function saveData() {
    try {
      const data = {
        ...product,
        createdBy: currentUser.displayName,
        createdOn: new Date(),
      };
      const itemRef = await addDoc(collection(db, "items"), data);

      if (!!file) {
        const filePath = `items/${itemRef.id}/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        const fileSnapshot = await uploadBytesResumable(newImageRef, file);
        const publicImageUrl = await getDownloadURL(newImageRef);

        await updateDoc(itemRef, {
          imageUrl: publicImageUrl,
          storageUri: fileSnapshot.metadata.fullPath,
        });
      }
    } catch (error) {
      console.error("Error writing new message to Firebase Database", error);
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    var allValid = true;
    for (const key in errors) {
      setErrors((prev) => ({ ...prev, [key]: false }));
      if (product[key] === undefined || !product[key]) {
        allValid = false;
        setErrors((prev) => ({ ...prev, [key]: true }));
      }
    }
    if (allValid) {
      saveData().then(setLoading(false)).then(updatePage(PAGES.STORE));
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <TextField
        label="Make"
        name="make"
        error={errors.make}
        value={product.make || ""}
        onChange={handleChange}
        sx={{
          gridColumn: "span 2",
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
      />
      <TextField
        label="Name"
        name="name"
        error={errors.name}
        value={product.name || ""}
        onChange={handleChange}
        type="text"
        sx={{
          gridColumn: "span 2",
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
      />
      <Box
        sx={{
          gridColumn: "span 2",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id={"selectLedTypeLabel"}>Type</InputLabel>
          <Select
            labelId="selectLedTypeLabel"
            label="Type"
            name="type"
            value={product.type || ""}
            onChange={handleChange}
            sx={{
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            {LEDTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField
        label="Power"
        name="power"
        error={errors.power}
        value={product.power || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 2",
          backgroundColor: `${colors.grey[900]}`,
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">W</InputAdornment>,
        }}
      />
      <TextField
        label="Forward Voltage (Vf)"
        name="forwardVoltage"
        value={product.forwardVoltage || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 2",
          backgroundColor: `${colors.grey[900]}`,
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">V</InputAdornment>,
        }}
      />
      <TextField
        label="Forward Current (If)"
        name="forwardCurrent"
        value={product.forwardCurrent || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 2",
          backgroundColor: `${colors.grey[900]}`,
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">mA</InputAdornment>,
        }}
      />
      <TextField
        label="lumen/Watt"
        name="lmPw"
        value={product.lmPw || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 2",
          backgroundColor: `${colors.grey[900]}`,
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">lm/W</InputAdornment>,
        }}
      />
      <TextField
        label="Color Temperature"
        name="colorTemperature"
        value={product.colorTemperature || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 2",
          backgroundColor: `${colors.grey[900]}`,
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">K</InputAdornment>,
        }}
      />
      <TextField
        label="Color Rendering Index"
        name="cri"
        value={product.cri || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 2",
          backgroundColor: `${colors.grey[900]}`,
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">Ra</InputAdornment>,
        }}
      />
      <TextField
        label="Length"
        name="length"
        value={product.length || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 1",
          backgroundColor: `${colors.grey[900]}`,
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
      />
      <TextField
        label="Width"
        name="width"
        value={product.width || ""}
        onChange={handleChange}
        type="number"
        sx={{
          gridColumn: "span 1",
          backgroundColor: `${colors.grey[900]}`,
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
      />
      {product.type === "PCB" && (
        <TextField
          label="Number of LEDs"
          name="numberOfLEDs"
          value={product.numberOfLEDs || ""}
          onChange={handleChange}
          type="number"
          sx={{
            gridColumn: "span 2",
            backgroundColor: `${colors.grey[900]}`,
            input: {
              backgroundColor: `${colors.grey[900]}`,
              borderRadius: "4px",
            },
          }}
        />
      )}
      <TextField
        label="Country of Origin"
        name="country"
        value={product.country || ""}
        onChange={handleChange}
        type="text"
        sx={{
          gridColumn: "span 2",
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
      />
      <TextField
        label="Notes"
        name="notes"
        value={product.notes || ""}
        onChange={handleChange}
        type="text"
        sx={{
          gridColumn: "span 2",
          input: {
            backgroundColor: `${colors.grey[900]}`,
            borderRadius: "4px",
          },
        }}
      />
      <Box display="flex" gap="20px" sx={{ gridColumn: "span 4" }}>
        <Button
          variant="outlined"
          component="label"
          sx={{
            backgroundColor: `${colors.grey[900]}`,
            minWidth: "80px",
            minHeight: "52.71px",
          }}
        >
          <PhotoCamera />
          <input
            hidden
            accept="image/*"
            onChange={handleImageUpload}
            type="file"
          />
        </Button>
        <TextField
          disabled
          label="File Name"
          value={!!file ? file.name : ""}
          sx={{
            width: "100%",
            input: {
              backgroundColor: `${colors.grey[900]}`,
              borderRadius: "4px",
            },
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 4" }}
      >
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          variant="contained"
          sx={{
            width: "6rem",
            height: "2.5rem",
          }}
        >
          {!loading && "Save"}
        </LoadingButton>
      </Box>
    </>
  );
};

export default LEDForm;
