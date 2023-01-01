import { Typography, TableRow, TableCell } from "@mui/material";
import { getFormatedDate } from "../utils/dateFormatting";

const DataDisplay = ({ itemDetails, data }) => {
  let {label, type, preFix, postFix} = itemDetails;
  return (
    <TableRow>
      <TableCell>
        <Typography color="text.primary">{label}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography color="text.primary">
          {`${!!preFix ? preFix : ""}${
          type === "date" ? getFormatedDate(data) : data
          }${!!postFix ? postFix : ""}`}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default DataDisplay;
