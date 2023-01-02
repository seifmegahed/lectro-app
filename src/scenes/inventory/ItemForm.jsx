import {
  Box,
  useTheme,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PhotoCamera } from "@mui/icons-material";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../../firebase-config";
import { addDoc, collection, updateDoc } from "firebase/firestore";

import { useEffect, useState } from "react";

import { tokens } from "../../theme";
import { itemData } from "../../data/items";

import { ACTIONS } from "./NewItem";
import { useAuth } from "../../contexts/AuthContext";
import useInventory from "../../contexts/InventoryContext";

const Field = ({
  product,
  field,
  dispatch,
  errors,
  index,
  handleImageUpload,
  file,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    input,
    label,
    name,
    type,
    span,
    required,
    options,
    preFix,
    postFix,
  } = field;

  const handleChange = (event) => {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  let inputProps = {};
  if (postFix) {
    inputProps = {
      ...inputProps,
      endAdornment: <InputAdornment position="end">{postFix}</InputAdornment>,
    };
  }
  if (preFix) {
    inputProps = {
      ...inputProps,
      startAdornment: (
        <InputAdornment position="start">{preFix}</InputAdornment>
      ),
    };
  }

  const inputField = () => {
    try {
      switch (input) {
        case "textField":
          return (
            <TextField
              label={label}
              name={name}
              type={type}
              error={required ? errors[name] : false}
              value={product[name] || ""}
              onChange={handleChange}
              sx={{
                gridColumn: `span ${span || "2"}`,
                backgroundColor: `${colors.grey[900]}`,
                input: {
                  backgroundColor: `${colors.grey[900]}`,
                  borderRadius: "4px",
                },
              }}
              InputProps={inputProps}
            />
          );
        case "select":
          return (
            <Box sx={{ gridColumn: `span ${span || "2"}` }}>
              <FormControl fullWidth>
                <InputLabel id={`${name}SelectLabel`}>{label}</InputLabel>
                <Select
                  labelId={`${name}SelectLabel`}
                  label={label}
                  name={name}
                  error={errors[name]}
                  value={product[name] || ""}
                  onChange={handleChange}
                  sx={{
                    backgroundColor: `${colors.grey[900]}`,
                  }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          );
        case "toggle":
          return (
            <Box
              display="flex"
              justifyContent={index % 2 === 0 ? "flex-start" : "flex-end"}
              sx={{ gridColumn: `span ${span || "2"}` }}
            >
              <ToggleButtonGroup
                exclusive
                color="primary"
                value={product[name] || ""}
                onChange={handleChange}
                error={errors[name]}
                sx={{ backgroundColor: `${colors.grey[900]}` }}
              >
                {options.map((option) => (
                  <ToggleButton
                    key={option}
                    name={name}
                    value={option}
                    sx={{ minWidth: "70px" }}
                  >
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          );
        case "image":
          return (
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
          );
        default:
          throw new Error(`No input case for ${field.input} available`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <>{inputField()}</>;
};

const ItemForm = ({ product, dispatch }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const { updatePage, PAGES } = useInventory();

  const handleImageUpload = (event) => {
    event.preventDefault();

    const temp = event.target.files[0];
    // Check if the file is an image.
    if (temp.type === null) {
      console.log("Error not a file, try again");
      return;
    }
    if (!temp.type.match("image.*")) {
      console.log("Error not Image");
      return;
    }
    setFile(temp);
  };
  useEffect(() => {
    setErrors({})
  },[product.category])
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
    itemData[product.category].map((field) => {
      if (!!field.required) {
        setErrors((prev) => ({ ...prev, [field.name]: false }));
        if (product[field.name] === undefined || !product[field.name]) {
          allValid = false;
          setErrors((prev) => ({ ...prev, [field.name]: true }));
        }
      }
    });
    if (allValid) {
      saveData().then(updatePage(PAGES.STORE));
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {Object.keys(itemData).map((key) => {
        if (key === product.category)
          return itemData[key].map((field, index) => {
            if (!!field.input) {
              return (
                <Field
                  key={field.name}
                  field={field}
                  product={product}
                  dispatch={dispatch}
                  errors={errors}
                  index={index}
                  file={file}
                  handleImageUpload={handleImageUpload}
                />
              );
            }
          });
      })}
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 4" }}
      >
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          variant="contained"
          disabled={!product.category}
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

export default ItemForm;
