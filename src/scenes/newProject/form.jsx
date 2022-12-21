import { Box, TextField, useTheme, Autocomplete } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { tokens } from "../../theme";
import { clients } from "../../data/accounts";
import FormContainer from "../../components/FormContainer";
import NavButton from "../../components/navButton";
import { ACTIONS } from "./index";

const userSchema = yup.object().shape({
  projectName: yup.string().required("required"),
  clientName: yup.string().required("required"),
  contactPerson: yup.string().required("required"),
  contactNumber: yup.string().required("required"),
  notes: yup.string().required("required"),
});

const Form = ({ dispatch, project }) => {
  const initialValues = project.details;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleFormSubmit = (values) => {
    dispatch({ type: ACTIONS.UPDATE_DETAILS, payload: values });
    dispatch({ type: ACTIONS.NEXT });
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={userSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => (
        <form>
          <FormContainer>
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              gridColumn="span 4"
            >
              <h3> Project ID: {values.id} </h3>
              <h3>
                {new Date(values.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
            </Box>
            <TextField
              fullWidth
              type="text"
              label="Project Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.projectName}
              name="projectName"
              error={!!touched.projectName && !!errors.projectName}
              sx={{
                gridColumn: "span 2",
                input: {
                  backgroundColor: `${colors.grey[900]}`,
                  borderRadius: "4px",
                },
              }}
            />
            <Autocomplete
              disablePortal
              options={clients.map((client) => client.name)}
              name="clientName"
              id="clientName"
              value={values.clientName || ""}
              onChange={(e, value) => {
                setFieldValue(
                  "clientName",
                  value !== "" ? value : initialValues.clientName
                );
              }}
              sx={{
                gridColumn: "span 2",
                input: {
                  borderRadius: "4px",
                },
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  name="clientName"
                  label="Client Name"
                  sx={{
                    backgroundColor: `${colors.grey[900]}`,
                    borderRadius: "4px",
                    "&  .MuiFormHelperText-root.Mui-error": {
                      margin: 0,
                      paddingLeft: "10px",
                      paddingTop: "3px",
                      backgroundColor: `${colors.primary[700]}`,
                    },
                  }}
                  {...params}
                  onBlur={handleBlur}
                  type="text"
                  error={!!touched.clientName && !!errors.clientName}
                />
              )}
            />
            <TextField
              fullWidth
              type="text"
              label="Contact Person"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contactPerson}
              name="contactPerson"
              error={!!touched.contactPerson && !!errors.contactPerson}
              sx={{
                gridColumn: "span 2",
                input: {
                  backgroundColor: `${colors.grey[900]}`,
                  borderRadius: "4px",
                },
              }}
            />
            <TextField
              fullWidth
              type="text"
              label="Contact Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contactNumber}
              name="contactNumber"
              error={!!touched.contactNumber && !!errors.contactNumber}
              sx={{
                gridColumn: "span 2",
                input: {
                  backgroundColor: `${colors.grey[900]}`,
                  borderRadius: "4px",
                },
              }}
            />
            <TextField
              fullWidth
              type="text"
              label="Contact Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contactEmail}
              name="contactEmail"
              error={!!touched.contactEmail && !!errors.contactEmail}
              sx={{
                gridColumn: "span 2",
                input: {
                  backgroundColor: `${colors.grey[900]}`,
                  borderRadius: "4px",
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              maxRows={4}
              type="text"
              label="Notes"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.notes}
              name="notes"
              error={!!touched.notes && !!errors.notes}
              sx={{
                gridColumn: "span 4",
                backgroundColor: `${colors.grey[900]}`,
              }}
            />
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ gridColumn: "span 4" }}
            >
              {/* For Faster Testing */}
              <NavButton cb={() => dispatch({ type: ACTIONS.NEXT })}>
                CONTINUE
              </NavButton>
              {/* <NavButton cb={handleSubmit}>CONTINUE</NavButton> */}
            </Box>
          </FormContainer>
        </form>
      )}
    </Formik>
  );
};

export default Form;
