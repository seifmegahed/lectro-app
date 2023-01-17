import {
  Box,
  Select,
  MenuItem,
  useTheme,
  TextField,
  InputLabel,
  FormControl,
  ToggleButton,
  InputAdornment,
  ToggleButtonGroup,
} from "@mui/material";

import { tokens } from "../theme";

const FieldSelector = ({
  edit,
  field,
  value,
  error,
  index,
  prevData,
  updateData,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    name,
    type,
    span,
    label,
    input,
    preFix,
    postFix,
    options,
    editable,
    required,
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
              error={!!required ? !!error : false}
              value={value || ""}
              onChange={handleChange}
              sx={{
                height: "fit-content",
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
                  error={!!required ? error : false}
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
                error={!!required ? error : false}
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
        default:
          throw new Error(`No input case for ${field.input} available`);
      }
    } catch (error) {
      console.log("Field Selector Error", error);
    }
  };

  return <>{inputField()}</>;
};

export default FieldSelector;
