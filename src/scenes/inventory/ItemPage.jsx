import useInventory from "../../contexts/InventoryContext";
import { CATEGORIES } from "../../reducers/inventoryReducer";
import DriverPage from "./DriverPage";

const ItemPage = () => {
  const {selectedItem} = useInventory();

  function ItemCategory() {
    switch (selectedItem.category) {
      case CATEGORIES.DRIVER:
        return <DriverPage />;
    }
  }

  return <ItemCategory />;
};

export default ItemPage;
