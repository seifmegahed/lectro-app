import {
  Autocomplete,
  Box,
  Divider,
  TextField,
  Typography,
  useTheme,
  Button,
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

  const { selectedItems, item } = useInventory();
  const [edafaData, setEdafaData] = useState(
    selectedItems.length > 0
      ? selectedItems.map((currentItem) => ({
          itemData: {
            id: currentItem.id,
            mpn: currentItem.mpn,
            name: currentItem.name,
            make: currentItem.make,
            category: currentItem.category,
          },
          quantity: "",
          notes: "",
          supplier: { label: "" },
        }))
      : [
          {
            itemData: {
              id: item.id,
              mpn: item.mpn,
              name: item.name,
              make: item.make,
              category: item.category,
            },
            quantity: "",
            notes: "",
            supplier: { label: "" },
          },
        ]
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

  const handleSubmit = () => {
    //TODO check for required fields
    edafaData.forEach(item => {
      //TODO Create Ezn Edafa Serial Number
      //TODO Add Ezn Edafa Document 
      //TODO get Ezn Edafa Document ID
      //TODO get Ezn Edafa Document ID
      //TODO Modify Item Documen to include Ezn Edafa id in a subCollection
      console.log(item)
    })
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
          <Box
            display="flex"
            alignSelf="center"
            gap="10px"
            sx={{ gridColumn: "span 2" }}
          >
            <Box alignSelf="center">
              <Typography variant="h1">{index + 1}</Typography>
            </Box>
            <Box>
              <Typography variant="h3">{item.itemData.name}</Typography>
              {!!item.itemData.mpn && (
                <Typography color="text.secondary" variant="h6">
                  {item.mpn}
                </Typography>
              )}
              <Typography color="text.secondary" variant="h6">
                {item.itemData.make} - {item.itemData.category}
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
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 4" }}
      >
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            width: "6rem",
            height: "2.5rem",
          }}
        >
          Save
        </Button>
      </Box>
    </FormContainer>
  );
};

export default Edafa;
