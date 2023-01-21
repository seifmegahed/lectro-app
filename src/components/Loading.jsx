import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ state }) => {
  return (
    <div>
      <Backdrop sx={{ color: "#fff", zIndex: "10002" }} open={state ?? true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loading;
