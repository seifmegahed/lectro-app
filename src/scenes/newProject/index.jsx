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
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.NEXT:
      return { ...state, activeStep: state.activeStep + 1 };
    case ACTIONS.BACK:
      return { ...state, activeStep: state.activeStep - 1 };
    case ACTIONS.UPDATE_DETAILS:
      return { ...state, details: action.payload };
    default:
      return state;
  }
};

export default function AddProject() {
  const [project, dispatch] = useReducer(reducer, { 
    activeStep: 0 ,
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
    products: [

    ]
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

  const [productsData, setProductsData] = useState([
    { type: "", name: "", amount: "", options: [] },
  ]);

  const updateProductsData = (data) => {
    setProductsData(data);
  };

  const steps = [
    {
      label: "Project Details",
      element: (
        <Form
          dispatch={dispatch}
          project={project}
          />
          ),
        },
        {
          label: "Add Products",
      element: (
        <ProductsForm
          dispatch={dispatch}
          data={productsData}
          updateData={updateProductsData}
          triggerError={triggerError}
        />
      ),
    },
    {
      label: "Study",
      element: (
        <Study
          dispatch={dispatch}
          data={productsData}
          updateData={updateProductsData}
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
