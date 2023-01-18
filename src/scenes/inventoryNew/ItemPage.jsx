import { Link, useParams } from "react-router-dom";

// Firebase
import { db } from "../../firebase-config";
import { collection, doc } from "firebase/firestore";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";

import {
  Fab,
  Box,
  Table,
  Backdrop,
  useTheme,
  TableBody,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import { tokens } from "../../theme";
import { itemFields } from "../../data/fields";

import DataDisplay from "../../components/DataDisplay";
import FormContainer from "../../components/FormContainer";

const itemsCollectionName = "items";

const ItemPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { id } = useParams();

  const itemsCollectionReferance = collection(db, itemsCollectionName);
  const itemDocumentReferance = doc(itemsCollectionReferance, id);

  const itemDetailsFetch = useFirestoreDocumentData(
    [itemsCollectionName, id],
    itemDocumentReferance,
    {
      subscribe: false,
      source: "server",
    }
  );
  const itemDetails = itemDetailsFetch.data;

  if (itemDetailsFetch.isLoading || !itemDetails) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: "100000" }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 4" }}
      >
        <Link to={`edit`}>
          <Fab
            color="primary"
            sx={{
              top: "100px",
              right: `${isNonMobile ? "30px" : "10px"}`,
              position: "fixed",
            }}
            size="large"
          >
            <Edit sx={{ color: `${colors.primary[700]}` }} fontSize="large" />
          </Fab>
        </Link>
      </Box>
      <FormContainer>
        <Box
          display="flex"
          alignItems="center"
          gap="20px"
          sx={{ gridColumn: "span 4" }}
        >
          {isNonMobile && (
            <Box width="100px" display="flex" alignItems="center">
              <img
                src={itemDetails.imageUrl || "/images/imageplaceholder.png"}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                alt=""
              />
            </Box>
          )}
          <Box display="flex" width="100%" justifyContent="space-between">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Typography color="text.secondary" variant="h5">
                {itemDetails.category}
              </Typography>
              <Typography color="text.primary" variant="h3">
                {itemDetails.name}
              </Typography>
            </Box>
            {isNonMobile && (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-end"
              >
                <Typography color="text.secondary">{id}</Typography>
                <Typography color="text.secondary" variant="h5">
                  {itemDetails.make}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        {isNonMobile && <Box sx={{ gridColumn: "span 1" }}></Box>}
        <Table
          size="small"
          sx={{ gridColumn: `span ${isNonMobile ? "3" : "4"}`, width: "100%" }}
        >
          <TableBody>
            {itemFields[itemDetails.category].map(
              (field) =>
                !!itemDetails[field.name] && (
                  <DataDisplay
                    key={field.name}
                    data={itemDetails[field.name]}
                    details={field}
                  />
                )
            )}
          </TableBody>
        </Table>
      </FormContainer>
    </>
  );
};

export default ItemPage;
