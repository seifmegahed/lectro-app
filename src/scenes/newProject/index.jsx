import { useState, useReducer } from "react";
import { projects } from "../../data/mockData";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import Header from "../../components/Header";
import Form from "./form";
import ProductsForm from "./productsForm";
import Study from "./study";

const generateId = () => {
  const dateString = (date.getYear() - 100) * 100 + date.getMonth() + 1;
  const projectNumber = String(projects.length + 1).padStart(4, "0");
  const id = `LL${dateString}D${projectNumber}`;
  return id;
};

const date = new Date();
const id = generateId();

export const ACTIONS = {
  NEXT: "next",
  BACK: "back",
  UPDATE_DETAILS: "update_details",
  ADD_PRODUCT: "add_product",
  REMOVE_PRODUCT: "remove_product",
  UPDATE_PRODUCT: "update_product",
  UPDATE_PRODUCT_DRIVER: "update_product_driver",
};

function reducer(project, action) {
  switch (action.type) {
    case ACTIONS.NEXT:
      return { ...project, activeStep: project.activeStep + 1 };
    case ACTIONS.BACK:
      return { ...project, activeStep: project.activeStep - 1 };
    case ACTIONS.UPDATE_DETAILS:
      return { ...project, details: action.payload };
    case ACTIONS.ADD_PRODUCT:
      return {
        ...project,
        products: [...project.products, addProduct()],
      };
    case ACTIONS.REMOVE_PRODUCT:
      return {
        ...project,
        products: project.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case ACTIONS.UPDATE_PRODUCT:
      return {
        ...project,
        products: project.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              [action.payload.field]: action.payload.value,
            };
          }
          return product;
        }),
      };
    case ACTIONS.UPDATE_PRODUCT_DRIVER:
      return {
        ...project,
        products: project.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              bom: {
                ...product.bom,
                driver: {
                  ...product.bom.driver,
                  [action.payload.field]: action.payload.value,
                },
              },
            };
          }
          return product;
        }),
      };
    default:
      return project;
  }
}

const addProduct = () => {
  return {
    id: Date.now(),
    type: "",
    name: "",
    quantity: "",
    options: [],
    bom: [],
  };
};

export default function AddProject() {
  const [project, dispatch] = useReducer(reducer, {
    activeStep: 0,
    details: {
      id: id,
      date: date,
      projectName: "",
      clientName: "",
      contactPerson: "",
      contactNumber: "",
      contactEmail: "",
      notes: "",
    },
    products: [addProduct()],
  });

  const [error, setError] = useState(false);

  const vertical = "bottom";
  const horizontal = "right";

  const handleClose = () => {
    setError(false);
  };

  const triggerError = () => {
    setError(true);
  };


  const steps = [
    {
      label: "Project Details",
      element: <Form dispatch={dispatch} project={project} />,
    },
    {
      label: "Add Products",
      element: (
        <ProductsForm
          dispatch={dispatch}
          project={project}
          triggerError={triggerError}
        />
      ),
    },
    {
      label: "Study",
      element: (
        <Study
          dispatch={dispatch}
          project={project}
        />
      ),
    },
    {
      label: "Finalize",
      element: "",
    },
  ];

  return (
    <Box
      m="20px"
      sx={{
        maxWidth: "700px",
      }}
    >
      <Header title="CREATE NEW PROJECT" />
      <Stepper activeStep={project.activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.element}</StepContent>
          </Step>
        ))}
      </Stepper>
      {project.activeStep === steps.length && (
        <Box m="20px">
          <Typography>All steps completed - you&apos;re finished</Typography>
        </Box>
      )}
      <Snackbar
        open={error}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={3000}
      >
        <Alert severity="error">Please Fill All Required Data</Alert>
      </Snackbar>
    </Box>
  );
}
