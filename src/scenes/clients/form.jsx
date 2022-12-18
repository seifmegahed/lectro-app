import { Box, Button , Fab, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Close, Add } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useState } from "react";
import { projects } from "../../data/mockData";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Email is not valid").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

const Form = ({ project , updateProject }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const [visability, setVisability] = useState(false)

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  // Functions
  const triggerNewProject = () => {
    const newId = generateId()
    const newDate = new Date() 
    updateProject(
      {
        ...project,
        id: newId, 
        date: newDate
      })
    setVisability(true)
  }
  const closeForm = () => {setVisability(false)}
  const generateId = () => {
    const date= new Date()
    const dateString = ((date.getYear()-100)*100) + date.getMonth()+1
    return "LL"+dateString+"D"+String(projects.length+1).padStart(4, '0')
  }
  
  return (
    <Box m="0px" >
        <Fab
          
          onClick={triggerNewProject}
          sx={{
            position: "fixed",
            right: "30px",
            bottom: "50px",
            color: `${colors.grey[900]}`,
            backgroundColor: `${colors.greenAccent[500]}`,
            "&:hover": {
              backgroundColor: `${colors.greenAccent[400]}`,
            },
          }}
        >
          <Add fontSize="large"/>
        </Fab>
      
      <Box 
      
      >

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
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display={(visability ? "grid" : "none")}
              position="relative"
              mt="30px"
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
                position="absolute"
                right="20px"
                top="20px"
                onClick={closeForm}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Close />
              </Box>
              <Box 
                display="flex"  
                width= "100%" 
                justifyContent="space-between"
                gridColumn= "span 4" 
                
                >
                <h3> Project ID: {project.id} </h3>
                <h3>{new Date(project.date).toLocaleDateString("en-US",{year: 'numeric', month: 'short', day:'numeric'})}</h3>
              </Box>
              <TextField
                fullWidth
                type="text"
                label="Project Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="projectName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  gridColumn: "span 2",
                  input: {
                    backgroundColor: `${colors.grey[900]}`,
                  },
                }}
                />
              <TextField
                fullWidth
                type="text"
                label="Client Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="clientName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  gridColumn: "span 2",
                  input: {
                    backgroundColor: `${colors.grey[900]}`,
                  },
                }}
                />
              <TextField
                fullWidth
                type="text"
                label="Contact Person"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="name"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 2",
                  input: {
                    backgroundColor: `${colors.grey[900]}`,
                  },
                }}
              />
              <TextField
                fullWidth
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{
                  gridColumn: "span 2",
                  input: {
                    backgroundColor: `${colors.grey[900]}`,
                  },
                }}
              />
              <TextField
                fullWidth
                type="text"
                label="Contact Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="email"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{
                  gridColumn: "span 2",
                  input: {
                    backgroundColor: `${colors.grey[900]}`,
                  },
                }}
              />
              <TextField
                fullWidth
                type="text"
                label="Notes"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{
                  gridColumn: "span 4",
                  input: {
                    backgroundColor: `${colors.grey[900]}`,
                  },
                }}
              />
              <Box
                display="flex"
                justifyContent="end"
                sx={{
                  gridColumn: "span 4",
                }}
                >
                <Button
                  variant="cointained"
                  type="submit"

                  size="large"
                  sx={{
                    width: "6rem",
                    height: "2.5rem",
                    color: `${colors.grey[900]}`,
                    backgroundColor: `${colors.yellowAccent[500]}`,
                    "&:hover": {
                      backgroundColor: `${colors.yellowAccent[400]}`,
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
      </Box>
    </Box>
  );
};

export default Form;
