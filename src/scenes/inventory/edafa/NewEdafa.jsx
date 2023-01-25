import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { db } from "../../../firebase-config";
import {
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

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

import { tokens } from "../../../theme";
import FormContainer from "../../../components/FormContainer";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../contexts/AuthContext";
import { descendingSort } from "../../../utils/functions";

const title = "إذن إضافة";

const edafaCollectionName = "edafa";
const itemsCollectionName = "items";
const helperCollectionName = "helper_data";

const itemsHelperDocumentId = "Items";
const edafaHelperDocumentId = "Edafa";
const suppliersHelperDocumentId = "Suppliers";

const getSupplierShort = (supplier) => {
  const { id, arabicName, englishName } = supplier;
  return { id, arabicName, englishName };
};

const getMaterialItemShort = (materialItem) => {
  const { id, category, name, make, mpn, imageUrl } = materialItem;
  return { id, category, name, make, mpn, imageUrl };
};

const extractEdafaMaterial = (materialItem, edafaId) => {
  const { quantity, item } = materialItem;
  return { quantity, edafaId, ...getMaterialItemShort(item) };
};

const extractHelperEdafa = (
  currentCount,
  edafaData,
  edafaReferences,
  supplier
) => ({
  edafaNumber: parseInt(currentCount) + 1,
  edafaDate: new Date(),
  supplier: getSupplierShort(supplier),
  items: edafaData.map((edafaItem, index) =>
    extractEdafaMaterial(edafaItem, edafaReferences[index].id)
  ),
});

const updateEdafaHelpers = ({
  edafaItems,
  edafaData,
  edafaReferences,
  supplier,
}) => ({
  data: [
    extractHelperEdafa(edafaItems.count, edafaData, edafaReferences, supplier),
    ...edafaItems.data,
  ],
  count: parseInt(edafaItems.count) + 1,
});

const extractEdafaItemDetails = (
  edafaItem,
  edafaNumber,
  userName,
  supplier
) => ({
  edafaNumber,
  date: serverTimestamp(),
  createdBy: userName,
  invoiceLinked: false,
  notes: edafaItem.notes,
  quantity: edafaItem.quantity,
  supplier: getSupplierShort(supplier),
  item: getMaterialItemShort(edafaItem.item),
});

const updateItemsHelper = (edafaData, helperItems) => ({
  data: helperItems.data.map((item) => {
    let newItem = {};
    edafaData.forEach((edafaItem) => {
      if (edafaItem.item.id === item.id) {
        newItem = {
          ...item,
          quantity: parseInt(item.quantity) + parseInt(edafaItem.quantity),
        };
        return;
      } else if (!newItem?.id) newItem = item;
    });
    return newItem;
  }),
  count: helperItems.count + 1,
});

const getSupplierOption = (supplier, label) => {
  const { englishName, arabicName, taxNumber, doc_id } = supplier;
  return {
    id: doc_id,
    label: supplier[label],
    englishName,
    arabicName,
    taxNumber,
  };
};

const NewEdafa = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems } = location.state;
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [errors, setErrors] = useState(selectedItems.map(() => false));
  const [supplier, setSupplier] = useState({ label: null });
  const [supplierError, setSupplierError] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const helperCollectionReference = collection(db, helperCollectionName);
  const itemsCollectionReference = collection(db, itemsCollectionName);
  const edafaCollectionReference = collection(db, edafaCollectionName);

  const suppliersHelperDocumentReference = doc(
    helperCollectionReference,
    suppliersHelperDocumentId
  );

  const edafaHelperDocumentReference = doc(
    helperCollectionReference,
    edafaHelperDocumentId
  );

  const itemsHelperDocumentReference = doc(
    helperCollectionReference,
    itemsHelperDocumentId
  );

  const [edafaData, setEdafaData] = useState(
    selectedItems.map((currentItem) => ({
      item: {
        id: currentItem.id,
        mpn: currentItem.mpn,
        name: currentItem.name,
        make: currentItem.make,
        category: currentItem.category,
        imageUrl: currentItem.imageUrl,
      },
      quantity: "",
      notes: "",
    }))
  );

  useEffect(() => {
    const getData = async () => {
      let data = [];
      const documentSnapshot = await getDoc(suppliersHelperDocumentReference);
      const supplierDocuments = documentSnapshot.data().data;
      supplierDocuments.forEach((supplier) => {
        data.push(getSupplierOption(supplier, "englishName"));
        data.push(getSupplierOption(supplier, "arabicName"));
      });
      data = descendingSort(data, "label");
      setSuppliers(data);
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const supplierChange = (event, value) => {
    const supplier = value ?? { label: null };
    setEdafaData((prev) =>
      prev.map((item, index) => {
        return { ...item, supplier };
      })
    );
    setSupplier(supplier);
  };

  const checkValidity = () => {
    let allValid = true;

    //Reset Errors
    setSupplierError(false);
    setErrors((prev) => prev.map(() => false));

    //Check Supplier Validity
    if (!supplier.label) {
      setSupplierError(true);
      allValid = false;
    }

    edafaData.forEach((item, index) => {
      // check validity
      if (item.quantity === "") {
        allValid = false;
        setErrors((prev) =>
          prev.map((errorValue, errorIndex) => {
            if (errorIndex === index) return true;
            return errorValue;
          })
        );
      }
    });
    return allValid;
  };

  const handleSubmit = async () => {
    if (checkValidity()) {
      setLoading(true);
      const edafaReferences = edafaData.map(() =>
        doc(edafaCollectionReference)
      );

      try {
        await runTransaction(db, async (transaction) => {
          // get and create new Helper Edafas
          const newEdafaHelper = await transaction
            .get(edafaHelperDocumentReference)
            .then((response) =>
              updateEdafaHelpers(
                response.data(),
                edafaData,
                edafaReferences,
                supplier
              )
            );

          // get and create New Helper Items
          const newHelperItems = await transaction
            .get(itemsHelperDocumentReference)
            .then((response) => updateItemsHelper(edafaData, response.data()));

          // update Helper Edafa
          transaction.set(edafaHelperDocumentReference, newEdafaHelper);

          // update Helper Items
          transaction.set(itemsHelperDocumentReference, newHelperItems);

          // Create Each Edafa Item in list, and update corresponding item
          edafaReferences.forEach((reference, index) => {
            const thisEdafaItem = edafaData[index];
            const edafaItemId = thisEdafaItem.item.id;
            const itemInHelper = newHelperItems.data.find(
              (helperItem) => helperItem.id === edafaItemId
            );

            // update Item
            transaction.update(doc(itemsCollectionReference, edafaItemId), {
              quantity: itemInHelper.quantity,
            });

            // create Edafa
            transaction.set(
              reference,
              extractEdafaItemDetails(
                thisEdafaItem,
                newEdafaHelper.count,
                currentUser.displayName,
                supplier
              )
            );
          });
        });

        console.log("Edafa Transaction Success");
        navigate("/inventory/edafa");
      } catch (error) {
        console.log("Edafa Transaction Failed", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!suppliers.length) return <Loading state={true} />;
  return (
    <FormContainer>
      <Loading state={loading} />
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ gridColumn: "span 4" }}
      >
        <Typography variant="h3">{title}</Typography>
      </Box>
      <Box sx={{ gridColumn: "span 4" }}>
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.label === value}
          onChange={supplierChange}
          options={suppliers}
          value={supplier.label || null}
          sx={{ backgroundColor: `${colors.grey[900]}` }}
          renderInput={(params) => (
            <TextField {...params} error={supplierError} label="Supplier" />
          )}
        />
      </Box>
      {edafaData.map((edafaItem, index) => (
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
              gridRow: isNonMobile ? undefined : "span 1",
            },
          }}
        >
          <Box sx={{ gridColumn: "span 4" }}>
            <Divider />
          </Box>
          <Box
            display="flex"
            alignSelf="baseline"
            gap="10px"
            sx={{ gridColumn: "span 2", gridRow: "span 2" }}
          >
            <Box alignSelf="center">
              <Typography variant="h1">{index + 1}</Typography>
            </Box>
            <Box>
              <Typography variant="h3">{edafaItem.item.name}</Typography>
              {!!edafaItem.item.mpn && (
                <Typography color="text.secondary" variant="h6">
                  {edafaItem.item.mpn}
                </Typography>
              )}
              <Typography color="text.secondary" variant="h6">
                {edafaItem.item.make} - {edafaItem.item.category}
              </Typography>
            </Box>
          </Box>
          <TextField
            label="Quantity"
            type="number"
            error={errors[index]}
            onChange={(e) => {
              setEdafaData((prev) => {
                const itemIndex = index;
                return prev.map((val, index) => {
                  if (index === itemIndex)
                    return { ...val, quantity: Number(e.target.value) };
                  return val;
                });
              });
            }}
            value={edafaItem.quantity || ""}
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
            value={edafaItem.notes || ""}
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

export default NewEdafa;
