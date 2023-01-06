import {
  Box,
  Typography,
  useMediaQuery,
  Table,
  TableBody,
} from "@mui/material";

import useInventory from "../../contexts/InventoryContext";

import DataDisplay from "../../components/DataDisplay";
import FormContainer from "../../components/FormContainer";
import { itemFields } from "../../data/fields";

const ItemPage = () => {
  const { item } = useInventory();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  return (
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
              src={item.imageUrl || "/images/imageplaceholder.png"}
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
              {item.category}
            </Typography>
            <Typography color="text.primary" variant="h3">
              {item.name}
            </Typography>
          </Box>
          {isNonMobile && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Typography color="text.secondary">{item.id}</Typography>
              <Typography color="text.secondary" variant="h5">
                {item.make}
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
          {itemFields[item.category].map(
            (field) =>
              !!item[field.name] && (
                <DataDisplay
                  key={field.name}
                  data={item[field.name]}
                  details={field}
                />
              )
          )}
        </TableBody>
      </Table>
    </FormContainer>
  );
};

export default ItemPage;
