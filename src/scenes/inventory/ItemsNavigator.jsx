import {
  Breadcrumbs,
  Link,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ItemsNavigator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  let pathArray = location.pathname.split("/").filter((path) => path !== "");

  pathArray = pathArray.map((pathName, index) => {
    if (pathName === "item") return { disabled: true };

    let url = "";
    let name = pathName;
    pathArray.forEach((path, innerIndex) => {
      if (innerIndex <= index) {
        url += `/${path}`;
      }
    });

    if (!index) name = "Inventory";
    if (name === "edit") name = "Edit";
    if (name === "edafa") name = "Edafa";
    if (name.length === 20) name = "Item";
    if (name === "new-item") name = "New Item";
    if (name === "new-edafa") name = "New Edafa";

    if (index + 1 === pathArray.length) return { name, url, last: true };
    return { name, url };
  });

  return (
    <Box p="20px 0">
      <Breadcrumbs size="large">
        {pathArray.map((path) => {
          if (path?.disabled) return null;
          return (
            <Link
              key={path.name}
              underline={path?.last ? "none" : "hover"}
              color={path?.last ? "text.primary" : "inherit"}
              sx={{ cursor: `${path?.last ? "default" : "pointer"}` }}
              onClick={() => {
                if (!path?.last) navigate(path.url);
              }}
            >
              <Typography variant={`h${isNonMobile ? "3" : "5"}`}>
                {path.name}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default ItemsNavigator;
