import { Routes, Route } from "react-router-dom";

import ItemsNavigator from "./ItemsNavigator";
import AllItems from "./AllItems";
import Edafa from "./edafa/";
import ItemPage from "./ItemPage";
import EditItem from "./EditItem";
import NewEdafa from "./edafa/NewEdafa";
import NewItem from "./NewItem";

const Inventory = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<ItemsNavigator />} />
      </Routes>
      <Routes>
        <Route path="/" element={<AllItems />} />
        <Route path="/edafa" element={<Edafa />} />
        <Route path="/new-item" element={<NewItem />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/new-edafa" element={<NewEdafa />} />
        <Route path="/item/:id/edit" element={<EditItem />} />
      </Routes>
    </>
  );
};

export default Inventory;
