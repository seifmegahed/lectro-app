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
import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { useState } from "react";

import { tokens } from "../theme";

import { useAuth } from "../contexts/AuthContext";

const Field = ({
  value,
  field,
  updateData,
  error,
  index,
  edit,
  prevData,
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
    editable,
  } = field;

  const handleChange = (event) => {
    const value = event.target.value;
    updateData(name, value);
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

  const disabled = edit ? !editable : false;
  const color = edit
    ? value === prevData
      ? ""
      : colors.yellowAccent[300]
    : "";
  const inputField = () => {
    try {
      switch (input) {
        case "textField":
          return (
            <TextField
              label={label}
              name={name}
              type={type}
              disabled={disabled}
              error={required ? error : false}
              value={value || ""}
              onChange={handleChange}
              sx={{
                gridColumn: `span ${span || "2"}`,
                backgroundColor: `${colors.grey[900]}`,
                input: {
                  color: `${color}`,
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
                  disabled={edit ? !editable : false}
                  name={name}
                  error={error}
                  value={value || ""}
                  onChange={handleChange}
                  color={
                    edit
                      ? value === prevData
                        ? "success"
                        : "primary"
                      : "primary"
                  }
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
                value={value || ""}
                disabled={edit ? !editable : false}
                onChange={handleChange}
                error={error}
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

const AutoForm = ({ fields, initData, returnHome, collectionName, edit }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [data, setData] = useState(initData);
  const { currentUser } = useAuth();
  const newData = {};

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

  async function saveData() {
    try {
      const newData = {
        ...data,
        createdBy: currentUser.displayName,
        createdOn: serverTimestamp(),
      };
      const itemRef = await addDoc(collection(db, collectionName), newData);

      if (!!file) {
        const filePath = `${collectionName}/${itemRef.id}/${file.name}`;
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
  async function editData() {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (data[key] !== (!!initData[key] ? initData[key] : "")) {
        newData[key] = data[key];
      }
    });
    const newDataKeys = Object.keys(newData);

    if (newDataKeys.length > 0) {
      newData.modifiedBy = currentUser.displayName;
      newData.lastModifiedOn = serverTimestamp();
      try {
        updateDoc(doc(db, collectionName, initData.id), newData);
      } catch (error) {
        console.error("Error writing new message to Firebase Database", error);
      }
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    var allValid = true;
    fields.forEach((field) => {
      if (!!field.required) {
        setErrors((prev) => ({ ...prev, [field.name]: false }));
        if (data[field.name] === undefined || !data[field.name]) {
          allValid = false;
          setErrors((prev) => ({ ...prev, [field.name]: true }));
        }
      }
    });
    if (allValid) {
      let noChange = true;
      fields.forEach((field) => {
        noChange &= data[field.name] === initData[field.name];
      });

      edit
        ? noChange
          ? editData().then(
              returnHome({ ...newData, lastModifiedOn: new Date() })
            )
          : returnHome()
        : saveData().then(returnHome());
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const updateData = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <>
      {fields.map((field, index) => {
        const { name, input } = field;
        if (!!input) {
          return (
            <Field
              key={name}
              file={file}
              field={field}
              edit={edit}
              index={index}
              value={data[name]}
              prevData={!!initData[name] ? initData[name] : ""}
              error={errors[name]}
              updateData={updateData}
              handleImageUpload={handleImageUpload}
            />
          );
        }
        return null;
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

export default AutoForm;
