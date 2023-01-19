import { Routes, Route } from "react-router-dom";

import AllItems from "./AllItems";
import ItemPage from "./ItemPage";
import EditItem from "./EditItem";
import ItemsNavigator from "./ItemsNavigator";
import NewItem from "./NewItem";

const InventoryNew = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<ItemsNavigator />} />
      </Routes>
      <Routes>
        <Route path="/" element={<AllItems />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/item/:id/edit" element={<EditItem />} />
        <Route path="/new-item" element={<NewItem />} />
      </Routes>
    </>
  );
};

export default InventoryNew;
