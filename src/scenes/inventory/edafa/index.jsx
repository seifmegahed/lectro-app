import { useEffect, useState } from "react";

import { db } from "../../../firebase-config";
import { doc, collection, onSnapshot } from "firebase/firestore";

import {
  Box,
  Input,
  useTheme,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { tokens } from "../../../theme";

import Loading from "../../../components/Loading";
import AllEzoon from "./AllEzoon";
import AllEdafa from "./AllEdafa";

const helperCollectionName = "helper_data";
const edafaHelperDocumentId = "Edafa";

const helperCollectionReferance = collection(db, helperCollectionName);
const edafaHelperDocumentReferance = doc(
  helperCollectionReferance,
  edafaHelperDocumentId
);

const Edafa = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [edafaItems, setEdafaItems] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [viewType, setViewType] = useState("ezn");

  useEffect(() => {
    const unsubscribe = onSnapshot(edafaHelperDocumentReferance, (snapshot) => {
      const documentData = snapshot.data();
      setEdafaItems(documentData.data);
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  if (!edafaItems.length) return <Loading state={true} />;
  return (
    <Box display="grid" gap="20px">
      <Box display="flex" justifyContent="space-between" gap="20px">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <Input
            disableUnderline
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <Search />
          </IconButton>
        </Box>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={(e, view) => setViewType(view)}
          color="primary"
        >
          <ToggleButton sx={{ width: "80px" }} value="edafa">
            <Typography variant="h5">
              <b>خامات</b>
            </Typography>
          </ToggleButton>
          <ToggleButton sx={{ width: "80px" }} value="ezn">
            <Typography variant="h5">
              <b>إذون</b>
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {viewType === "ezn" && (
        <AllEzoon data={edafaItems} searchkey={searchkey} />
      )}
      {viewType === "edafa" && (
        <AllEdafa data={edafaItems} searchkey={searchkey} />
      )}
    </Box>
  );
};

export default Edafa;
