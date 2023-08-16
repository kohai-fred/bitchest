import { Box } from "@mui/material";
import { getUserCookies } from "@src/utils/cookiesUser";
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: PropsWithChildren) => {
  const userAuth = getUserCookies();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (userAuth?.role) {
      case "admin":
        if (!location.pathname.startsWith("/admin")) navigate("/admin");
        break;
      case "client":
        if (!location.pathname.startsWith("/client")) navigate("/client");
        break;
      default:
        navigate("/");
        break;
    }
  }, [userAuth, location.pathname]);

  return <Box>{children}</Box>;
};

export default RequireAuth;
