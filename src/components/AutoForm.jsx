import { useState } from "react";

import { Box, Button } from "@mui/material";

import FieldSelector from "./FieldSelector";

const AutoForm = ({ edit, fields, initData, submitToParent }) => {
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState({});

  const updateData = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const checkFieldValidity = (fieldName) => {
    let isValid = true;
    setErrors((prev) => {
      if (data[fieldName] === undefined || !data[fieldName]) {
        isValid = false;
        console.log("all false");
        return { ...prev, [fieldName]: true };
      } else return { ...prev, [fieldName]: false };
    });
    return isValid;
  };

  const checkFormValidity = () => {
    let allValid = true;
    fields.forEach((field) => {
      if (!!field.required) {
        allValid &= checkFieldValidity(field.name);
      }
    });
    return allValid;
  };

  const handleSubmit = () => {
    if (checkFormValidity()) {
      let noChange = true;
      const checkForChanges = new Promise((resolve) => {
        resolve(
          fields.forEach((field) => {
            noChange &= data[field.name] === initData[field.name];
          })
        );
      });
      checkForChanges.then(() => {
        if (edit && noChange) submitToParent();
        else submitToParent(data);
      });
    }
  };

  return (
    <>
      {fields.map((field, index) => {
        const { name, input } = field;
        if (!!input &&  !!name) {
          return (
            <FieldSelector
              key={name}
              edit={edit}
              index={index}
              field={field}
              value={data[name]}
              error={errors[name]}
              updateData={updateData}
              prevData={!!initData[name] ? initData[name] : ""}
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
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            width: "6rem",
            height: "2.5rem",
          }}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default AutoForm;
