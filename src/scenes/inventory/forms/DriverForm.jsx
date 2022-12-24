import {
  Select,
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  useTheme,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { ACTIONS } from "../NewItem";
import { tokens } from "../../../theme";
import { db } from "../../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { PhotoCamera } from "@mui/icons-material";

const driverTypes = [
  "Constant Current",
  "Constant Voltage",
  "Constant Power",
  "DC-DC Constant Current",
  "DC-DC Buck",
  "DC-DC Boost",
];

const DriverForm = ({ dispatch, product }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  async function saveData() {
    try {
      await addDoc(collection(db, "items"), product);
      dispatch({ type: ACTIONS.RESET });
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
      saveData().then(setLoading(false));
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
          <InputLabel id={"selectItemCategoryLabel"}>Category</InputLabel>
          <Select
            labelId="selectItemCategoryLabel"
            label="Type"
            name="type"
            value={product.type || ""}
            onChange={handleChange}
            sx={{
              backgroundColor: `${colors.grey[900]}`,
            }}
          >
            {driverTypes.map((type) => (
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
        label="Input Voltage Min"
        name="inputVoltageMin"
        value={product.inputVoltageMin || ""}
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
          startAdornment: <InputAdornment position="start">V</InputAdornment>,
        }}
      />
      <TextField
        label="Input Voltage Max"
        name="inputVoltageMax"
        value={product.inputVoltageMax || ""}
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
          startAdornment: <InputAdornment position="start">V</InputAdornment>,
        }}
      />
      <TextField
        label="Output Voltage Min"
        name="outputVoltageMin"
        value={product.outputVoltageMin || ""}
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
          startAdornment: <InputAdornment position="start">V</InputAdornment>,
        }}
      />
      <TextField
        label="Output Voltage Max"
        name="outputVoltageMax"
        value={product.outputVoltageMax || ""}
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
          startAdornment: <InputAdornment position="start">V</InputAdornment>,
        }}
      />
      <TextField
        label="Output Current Min"
        name="outputCurrentMin"
        value={product.outputCurrentMin || ""}
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
          startAdornment: <InputAdornment position="start">mA</InputAdornment>,
        }}
      />
      <TextField
        label="Output Current Max"
        name="outputCurrentMax"
        value={product.outputCurrentMax || ""}
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
          startAdornment: <InputAdornment position="start">mA</InputAdornment>,
        }}
      />
      <TextField
        label="Power Factor"
        name="powerFactor"
        value={product.powerFactor || ""}
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
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
      />
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 2" }}
      >
        <ToggleButtonGroup
          color="primary"
          value={product.caseMaterial}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{ backgroundColor: `${colors.grey[900]}` }}
        >
          <ToggleButton name="caseMaterial" value="Aluminum">
            Aluminum
          </ToggleButton>
          <ToggleButton name="caseMaterial" value="Plastic">
            Plastic
          </ToggleButton>
          <ToggleButton name="caseMaterial" value="PCB">
            Bare PCB
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <TextField
        label="IP Rating"
        name="ipRating"
        value={product.ipRating || ""}
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
          startAdornment: <InputAdornment position="start">IP</InputAdornment>,
        }}
      />
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
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 2" }}
        >
        <Button
          variant="outlined"
          component="label"
          sx={{
            backgroundColor: `${colors.grey[900]}`,
            width: "100%",
            minHeight: "52.71px",
          }}
        >
          <PhotoCamera />
          <input hidden accept="image/*" multiple type="file" />
        </Button>
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

export default DriverForm;
