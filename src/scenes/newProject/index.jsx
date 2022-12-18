import {useEffect, useState} from "react";
import { projects } from "../../data/mockData";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import Form from "./form";
import ProductsForm from "./productsForm";

const generateId = () => {
  const dateString = (date.getYear() - 100) * 100 + date.getMonth() + 1
  const projectNumber = String(projects.length + 1).padStart(4, "0")
  const id = `LL${dateString}D${projectNumber}`
  return id;
}

const date = new Date()
const id = generateId()

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
  })

  const [productsData, setProductsData] = useState([
    { type: "", name: "", amount: "", options: [] },
  ]);

  const [activeStep, setActiveStep] = useState();

  useEffect(() => {
    setActiveStep(0);
  }, []);

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
        />
      ),
    },
    {
      label: "Study",
      element: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
    {
      label: "Finalize",
      element: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
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
            <StepContent>
              {step.element}
            </StepContent>
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
    </Box>
  );
}
