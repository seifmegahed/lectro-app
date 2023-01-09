import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState, useMemo } from "react";
import FormContainer from "../../components/FormContainer";
import useInventory from "../../contexts/InventoryContext";
import { db } from "../../firebase-config";
import { tokens } from "../../theme";

const title = "إذن إضافه";

const Edafa = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { selectedItems } = useInventory();
  const [edafaData, setEdafaData] = useState(
    selectedItems.map((item) => ({
      ...item,
      quantity: "",
      notes: "",
      supplier: { label: "" },
    }))
  );

  const suppliersList = useMemo(() => {
    const data = [];
    const getData = async () => {
      const q = query(
        collection(db, "accounts"),
        where("type", "==", "Supplier"),
        orderBy("number", "asc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const { englishName, arabicName, taxNumber } = doc.data();
        data.push({
          id: doc.id,
          label: englishName,
          englishName,
          arabicName,
          taxNumber,
        });
        data.push({
          id: doc.id,
          label: arabicName,
          englishName,
          arabicName,
          taxNumber,
        });
      });
      data.push({ label: "" });
      data.sort(function (a, b) {
        if (a.label > b.label) {
          return 1;
        }
        if (b.label > a.label) {
          return -1;
        }
        return 0;
      });
    };
    getData();
    return data;
  }, []);
  const globalSupplierChange = (event) => {
    const optionIndex = event.target.dataset.optionIndex;
    const supplier = !!optionIndex ? suppliersList[optionIndex] : "";
    setEdafaData((prev) =>
      prev.map((item) => {
        return { ...item, supplier, supplierLabel: supplier.label };
      })
    );
  };

  const supplierChange = (event, itemIndex) => {
    const optionIndex = event.target.dataset.optionIndex;
    const supplier = !!optionIndex ? suppliersList[optionIndex] : "";

    setEdafaData((prev) =>
      prev.map((item, index) => {
        if (index === itemIndex)
          return { ...item, supplier, supplierLabel: supplier.label };
        return item;
      })
    );
  };
  return (
    <FormContainer>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 4" }}
      >
        <Typography variant="h3">{title}</Typography>
      </Box>
      {edafaData.length > 1 && (
        <Box sx={{ gridColumn: "span 4" }}>
          <Autocomplete
            onChange={globalSupplierChange}
            options={suppliersList}
            sx={{ backgroundColor: `${colors.grey[900]}` }}
            renderInput={(params) => <TextField {...params} label="Supplier" />}
          />
        </Box>
      )}
      {edafaData.map((item, index) => (
        <Box
          gap="20px"
          display="grid"
          alignItems="baseline"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          key={index}
          sx={{
            gridColumn: "span 4",
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          <Box sx={{ gridColumn: "span 4" }}>
            <Divider />
          </Box>
          <Box display="flex" gap="10px" sx={{ gridColumn: "span 2" }}>
            <Typography variant="h1">{index + 1}</Typography>
            <Box>
              <Typography variant="h3">{item.name}</Typography>
              <Typography variant="h5">
                {item.make} - {item.category}
              </Typography>
            </Box>
          </Box>
          <Autocomplete
            onChange={(e) => supplierChange(e, index)}
            value={item.supplier.label || ""}
            options={suppliersList}
            sx={{
              gridColumn: "span 2",
              backgroundColor: `${colors.grey[900]}`,
            }}
            renderInput={(params) => <TextField {...params} label="Supplier" />}
          />
          <TextField
            label="Quantity"
            type="number"
            onChange={(e) => {
              setEdafaData((prev) => {
                const itemIndex = index;
                return prev.map((val, index) => {
                  if (index === itemIndex)
                    return { ...val, quantity: e.target.value };
                  return val;
                });
              });
            }}
            value={item.quantity || ""}
            sx={{
              gridColumn: "span 2",
              backgroundColor: `${colors.grey[900]}`,
            }}
          />
          <TextField
            label="Notes"
            onChange={(e) => {
              setEdafaData((prev) => {
                const itemIndex = index;
                return prev.map((val, index) => {
                  if (index === itemIndex)
                    return { ...val, notes: e.target.value };
                  return val;
                });
              });
            }}
            value={item.notes || ""}
            sx={{
              gridColumn: "span 2",
              backgroundColor: `${colors.grey[900]}`,
            }}
          />
        </Box>
      ))}
    </FormContainer>
  );
};

export default Edafa;
