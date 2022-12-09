import { Box , Button , TextField , useTheme} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header"
import { tokens } from "../../theme";


const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
}

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const userSchema = yup.object().shape({
  firstName: 
    yup
    .string()
    .required("required"),
  lastName: 
    yup
    .string()
    .required("required"),
  email:
     yup
    .string()
    .email("Email is not valid")
    .required("required"),
  contact: 
    yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: 
    yup
    .string()
    .required("required"),
  address2: 
    yup
    .string()
    .required("required"),
})

const Form = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery("(min-width:600px)")

  const handleFormSubmit = (values) => {
    console.log(values)
  }

  return (
  <Box m="20px">
    <Header title="CREATE USER" subtitle="Create a New User Profile" />

    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={userSchema}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Box 
            display="grid"
            mt="30px"
            p="30px"
            borderRadius="10px"
            gap="30px" 
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              backgroundColor: `${colors.primary[700]}`,
              "& > div" : {
                gridColumn: isNonMobile ? undefined : "span 4"
              }
            }}
          >
            <TextField
              fullWidth
              // variant="filled"
              type="text"
              label= "First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
              sx={{
                gridColumn: "span 2",
                input:{
                  backgroundColor: `${colors.grey[900]}`
                }
              }}
              />
            <TextField
              fullWidth
              // variant="filled"
              type="text"
              label= "Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
              sx={{
                gridColumn: "span 2",
                input:{
                  backgroundColor: `${colors.grey[900]}`
                }
              }}
              />
            <TextField
              fullWidth
              // variant="filled"
              type="text"
              label= "Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 2",
                input:{
                  backgroundColor: `${colors.grey[900]}`
                }
              }}
              />
            <TextField
              fullWidth
              // variant="filled"
              type="text"
              label= "Contact Number"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contact}
              name="contact"
              error={!!touched.contact && !!errors.contact}
              helperText={touched.contact && errors.contact}
              sx={{
                gridColumn: "span 2",
                input:{
                  backgroundColor: `${colors.grey[900]}`
                }
              }}
              />
            <TextField
              fullWidth
              // variant="filled"
              type="text"
              label= "Address 1"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address1}
              name="address1"
              error={!!touched.address1 && !!errors.address1}
              helperText={touched.address1 && errors.address1}
              sx={{
                gridColumn: "span 4",
                input:{
                  backgroundColor: `${colors.grey[900]}`
                }
              }}
              />
            <TextField
              fullWidth
              // variant="filled"
              type="text"
              label= "Address 2"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.address2}
              name="address2"
              error={!!touched.address2 && !!errors.address2}
              helperText={touched.address2 && errors.address2}
              sx={{
                gridColumn: "span 4",
                input:{
                  backgroundColor: `${colors.grey[900]}`,
                  border: "none"
                }
              }}
            />
            <Box
              
              display="flex"
              justifyContent= "end"
              sx={{
                gridColumn: "span 4",
              }}
              >
              <Button
                variant="cointained"
                type="submit"
                size= "large"
                sx={{
                  width: "8rem",
                  height: "2.5rem",
                  color: `${colors.grey[900]}`,
                  backgroundColor: `${colors.blueAccent[500]}`,
                  "&:hover": {
                    backgroundColor: `${colors.blueAccent[400]}`
                  }
                }}
                >
              Submit  
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  </Box>
  )
}

export default Form;