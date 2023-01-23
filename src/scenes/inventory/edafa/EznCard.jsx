import { Box } from "@mui/material";
import { useState } from "react";
import FormContainer from "../../../components/FormContainer";
import { getFormatedDate } from "../../../utils/dateFormatting";
import { pad } from "../../../utils/functions";

const EznCard = ({ edafaItem }) => {
  const { items, supplier, edafaNumber, edafaDate } = edafaItem;
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <FormContainer padding="15px">
      <Box
        onClick={toggleOpen}
        display="flex"
        width="100%"
        justifyContent="space-between"
        sx={{ gridColumn: "span 4", cursor: "pointer" }}
      >
        <h2>{"ED" + pad(edafaNumber, 3)}</h2>
        <Box display="flex" flexDirection="row">
          <h3>{supplier.englishName}</h3>
          <h4>{supplier.arabicName}</h4>
        </Box>
        <h2>{getFormatedDate(edafaDate)}</h2>
      </Box>
      {open &&
        items.map((item, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            width="100%"
            sx={{ gridColumn: "span 4" }}
          >
            <h4>{item.name}</h4>
            <h4>{item.category}</h4>
            <h4>{item?.mpn}</h4>
            <h4>{item.make}</h4>
            <h4>{item.quantity}</h4>
          </Box>
        ))}
    </FormContainer>
  );
};

export default EznCard;
