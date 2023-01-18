import { Breadcrumbs } from "@mui/material";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const ItemsNavigator = () => {
  const location = useLocation();
  const pathArray = location.pathname.split("/").filter((path) => path !== "");
  useEffect(() => {
    console.log(pathArray);
  }, [location]);
  return (
    <Breadcrumbs>
      {pathArray.map((path, index) => {
        let pathUrl = "";
        pathArray.forEach((innerPath, innerIndex) => {
          if (innerIndex <= index) {
            pathUrl += `/${innerPath}`;
          }
        });
        if(path === "item") return;
        return (
          <Link to={pathUrl} key={path}>
            {path}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default ItemsNavigator;
