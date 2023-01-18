import { Routes, Route } from "react-router-dom";

import AllItems from "./AllItems";
import ItemPage from "./ItemPage";
import EditItem from "./EditItem";

const InventoryNew = () => {
  return (
    <Routes>
      <Route path="/" element={<AllItems />} />
      <Route path="/item/:id" element={<ItemPage />} />
      <Route path="/item/:id/edit" element={<EditItem />} />
    </Routes>
  );
};

export default InventoryNew;
