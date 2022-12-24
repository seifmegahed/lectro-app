import FormContainer from "../../components/FormContainer";
import { Box, Typography } from "@mui/material";

const ItemCard = ({ data }) => {
  return (
    <FormContainer>
      <Box display="flex" gap="10px" sx={{ gridColumn: "span 4" }}>
        <Box width="100px">
          <img
            src={data.img || "/images/imageplaceholder.png"}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box>
            <Typography variant="h3">{data.name}</Typography>
            <Typography variant="h5">
              {data.category} - {data.make}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Available Quantity: {data.quantity || "0"}</Typography>
          </Box>
        </Box>
      </Box>
    </FormContainer>
  );
};

export default ItemCard;
