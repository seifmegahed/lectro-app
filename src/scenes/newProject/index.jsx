import { useState } from "react";
import { projects } from "../../data/mockData";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Snackbar,
  Alert
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

export default function AddProject() {
  const [projectDetails, setProjectDetails] = useState({
    id: id,
    date: date,
    projectName: "",
    clientName: "",
    contactPerson: "",
    contactNumber: "",
    contactEmail: "",
    notes: "",
  });

  const [error, setError] = useState(false);

  const vertical = "bottom";
  const horizontal = "right";

  const handleClose = () => {
    setError(false);
  };

  const triggerError = () => {
    setError(true)
  }

  const [productsData, setProductsData] = useState([
    { type: "", name: "", amount: "", options: [] },
  ]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const updateProjectDetails = (data) => {
    setProjectDetails(data);
  };

  const updateProductsData = (data) => {
    setProductsData(data);
  };

  const steps = [
    {
      label: "Project Details",
      element: (
        <Form
          next={handleNext}
          data={projectDetails}
          updateData={updateProjectDetails}
        />
      ),
    },
    {
      label: "Add Products",
      element: (
        <ProductsForm
          next={handleNext}
          back={handleBack}
          data={productsData}
          updateData={updateProductsData}
          triggerError={triggerError}
        />
      ),
    },
    {
      label: "Study",
      element: (
        <Study next={handleNext} back={handleBack} data={productsData} />
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
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>{step.element}</StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box m="20px">
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
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
