import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { db } from "../../firebase-config";
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

import { tokens } from "../../theme";
import FormContainer from "../../components/FormContainer";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/AuthContext";

const title = "إذن إضافه";

const edafaCollectionName = "edafa";
const itemsCollectionName = "items";
const helperCollectionName = "helper_data";

const itemsHelperDocumentId = "Items";
const edafaHelperDocumentId = "Edafa";
const suppliersHelperDocumentId = "Suppliers";

const Edafa = () => {
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
  const [supplierError, setsupplierError] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const helperCollectionReferance = collection(db, helperCollectionName);
  const itemsCollectionReferance = collection(db, itemsCollectionName);
  const edafaCollectionReferance = collection(db, edafaCollectionName);

  const suppliersHelperDocumentReferance = doc(
    helperCollectionReferance,
    suppliersHelperDocumentId
  );

  const edafaHelperDocumentReferance = doc(
    helperCollectionReferance,
    edafaHelperDocumentId
  );

  const itemsHelperDocumentReferance = doc(
    helperCollectionReferance,
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
      const documentSnapshot = await getDoc(suppliersHelperDocumentReferance);
      const supplierDocuments = documentSnapshot.data().data;
      supplierDocuments.forEach((supplier) => {
        const { englishName, arabicName, taxNumber, doc_id } = supplier;
        data.push({
          id: doc_id,
          label: englishName,
          englishName,
          arabicName,
          taxNumber,
        });
        data.push({
          id: doc_id,
          label: arabicName,
          englishName,
          arabicName,
          taxNumber,
        });
      });
      data.sort(function (a, b) {
        if (a.label > b.label) {
          return 1;
        }
        if (b.label > a.label) {
          return -1;
        }
        return 0;
      });
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
    setsupplierError(false);
    setErrors((prev) => prev.map(() => false));

    //Check Supplier Validity
    if (!supplier.label) {
      setsupplierError(true);
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
      const userName = currentUser.displayName;
      const edafaReferances = edafaData.map(() =>
        doc(edafaCollectionReferance)
      );

      try {
        await runTransaction(db, async (transaction) => {
          // get and create new Helper Edafas
          const newEdafaHelper = await transaction
            .get(edafaHelperDocumentReferance)
            .then((response) => ({
              data: [
                {
                  edafaNumber: parseInt(response.data().count) + 1,
                  edafaDate: new Date(),
                  supplier: {
                    id: supplier.id,
                    arabicName: supplier.arabicName,
                    englishName: supplier.englishName,
                  },
                  items: edafaData.map((edafaItem, index) => ({
                    edafaId: edafaReferances[index].id,
                    itemId: edafaItem.item.id,
                    category: edafaItem.item.category,
                    quantity: edafaItem.quantity,
                    name: edafaItem.item.name,
                    make: edafaItem.item.make,
                    mpn: edafaItem.item.mpn,
                  })),
                },
                ...response.data().data,
              ],
              count: parseInt(response.data().count) + 1,
            }));

          // get and create New Helper Items
          const newHelperItems = await transaction
            .get(itemsHelperDocumentReferance)
            .then((response) => {

              return {
                data: response.data().data.map((item) => {
                  let newItem = {};
                  edafaData.forEach((edafaItem) => {
                    if (edafaItem.item.id === item.id) {
                      newItem = {
                        ...item,
                        quantity:
                          parseInt(item.quantity) +
                          parseInt(edafaItem.quantity),
                      };
                      return;
                    } else {
                      if (!newItem?.id) newItem = item;
                    }
                  });
                  return newItem;
                }),
                count: parseInt(response.data().count) + 1,
              };
            });

          // update Helper Edafa
          transaction.set(edafaHelperDocumentReferance, newEdafaHelper);

          // update Helper Items
          transaction.set(itemsHelperDocumentReferance, newHelperItems);

          // Create Each Edafa Item in list, and update corisponding item
          edafaReferances.forEach((referance, index) => {
            const thisEdafaItem = edafaData[index];
            const edafaItemId = thisEdafaItem.item.id;
            const itemInHelper = newHelperItems.data.find(
              (helperItem) => helperItem.id === edafaItemId
            );
            const quantity = itemInHelper.quantity;

            // update Item
            transaction.update(doc(itemsCollectionReferance, edafaItemId), {
              quantity: quantity,
            });

            // create Edafa
            transaction.set(referance, {
              createdBy: userName,
              invoiceLinked: false,
              date: serverTimestamp(),
              notes: thisEdafaItem.notes,
              quantity: thisEdafaItem.quantity,
              edafaNumber: newEdafaHelper.count,
              supplier: {
                id: supplier.id,
                arabicName: supplier.arabicName,
                englishName: supplier.englishName,
              },
              item: {
                id: thisEdafaItem.item.id,
                mpn: thisEdafaItem.item.mpn,
                name: thisEdafaItem.item.name,
                make: thisEdafaItem.item.make,
                category: thisEdafaItem.item.category,
                imageUrl: thisEdafaItem.item.imageUrl,
              },
            });
          });
        });

        console.log("Edafa Transaction Success");
        setLoading(false);
        navigate("/inventory");
      } catch (error) {
        setLoading(false);
        console.log("Edafa Transaction Failed", error);
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

export default Edafa;
