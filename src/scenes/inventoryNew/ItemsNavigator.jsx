import { Breadcrumbs, Link } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ItemsNavigator = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/").filter((path) => path !== "");
  useEffect(() => {
    console.log(pathArray);
  }, [location]);
  return (
    <Breadcrumbs>
      {pathArray.map((path) => <Link key={path}>{path}</Link>)}
    </Breadcrumbs>
  );
};

export default ItemsNavigator;
