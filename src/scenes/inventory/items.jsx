import { db } from "../../firebase-config";
import {
  collection,
  orderBy,
  query,
  limit,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const AllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getDocs(query(collection(db, "items")));
      setItems(data.docs)
    }

    getData();
  }, []);

  return (
    <Box display="grid" gap="20px">
      {items.map((item) => {
        return <ItemCard key={item.id} data={item.data()} />;
      })}
    </Box>
  );
};

export default AllItems;
