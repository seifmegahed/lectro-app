import { Box, Button, TextField, useTheme, Autocomplete } from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { clients } from "../../data/accounts";


const userSchema = yup.object().shape({
  projectName: yup.string().required("required"),
  clientName: yup.string().required("required"),
  contactPerson: yup.string().required("required"),
  contactNumber: yup.string().required("required"),
  notes: yup.string().required("required"),
});

const Form = ({ next, data, updateData }) => {

  const initialValues = data;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    updateData(values)
    next()
  }

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
          <Box
            display="grid"
            p="30px"
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            borderRadius="10px"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              backgroundColor: `${colors.primary[700]}`,
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
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
              options={clients.map(client => client.name)}
              name="clientName"
              id="clientName"
              value={values.clientName || ''}
              onChange={(e, value) => {
                setFieldValue(
                  "clientName",
                  value !== '' ? value : initialValues.clientName
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
              sx={{
                gridColumn: "span 4",
              }}
            >
              <Button
                variant="cointained"
                onClick={handleSubmit}
                size="large"
                sx={{
                  width: "6rem",
                  height: "2.5rem",
                  color: "#fcfcfc",
                  backgroundColor: `${colors.blueAccent[500]}`,
                  "&:hover": {
                    backgroundColor: `${colors.blueAccent[400]}`,
                  },
                }}
              >
                CONTINUE
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
