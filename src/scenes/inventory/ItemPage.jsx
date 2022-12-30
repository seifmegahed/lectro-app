import { CATEGORIES } from "../../reducers/inventoryReducer";
import DriverPage from "./DriverPage";
const ItemPage = ({ items, dispatch }) => {
  function ItemCategory() {
    switch (items.selectedProduct.data().category) {
      case CATEGORIES.DRIVER:
        return <DriverPage items={items} dispatch={dispatch} />;
    }
  }
  return <ItemCategory />;
};

export default ItemPage;
