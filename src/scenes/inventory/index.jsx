import { Routes, Route } from "react-router-dom";

import ItemsNavigator from "./ItemsNavigator";
import AllItems from "./AllItems";
import ItemPage from "./ItemPage";
import EditItem from "./EditItem";
import NewItem from "./NewItem";
import Edafa from "./Edafa";

const Inventory = () => {
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
        <Route path="/edafa" element={<Edafa />} />
      </Routes>
    </>
  );
};

export default Inventory;
