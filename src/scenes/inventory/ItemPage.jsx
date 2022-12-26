import { CATEGORIES } from ".";
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
