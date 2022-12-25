import { db } from "../../firebase-config";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const AllItems = () => {
  const [items, setItems] = useState([]);
  
  function handleDelete(docId) {
    console.log(docId)
    async function deleteData() {
      await deleteDoc(doc(db, "items", docId));
    }
    deleteData()
    const newItems = items.filter((item) => item.id !== docId);
    setItems(newItems);
  }

  useEffect(() => {
    async function getData() {
      const data = await getDocs(query(collection(db, "items")));
      setItems(data.docs);
    }
    getData();
  }, []);

  return (
    <Box display="grid" gap="20px">
      {items.map((item) => {
        return (
          <ItemCard
            key={item.id}
            docId={item.id}
            handleDelete={handleDelete}
            data={item.data()}
          />
        );
      })}
    </Box>
  );
};

export default AllItems;
