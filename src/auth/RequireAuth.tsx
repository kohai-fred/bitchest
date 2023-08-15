import { Box } from "@mui/material";
import { getUserCookies } from "@src/utils/cookiesUser";
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: PropsWithChildren) => {
  const userAuth = getUserCookies();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🆘 USEFFECT,", location.pathname, "userAuth=>", userAuth);
    switch (userAuth?.role) {
      case "admin":
        if (location.pathname !== "/admin") navigate("/admin");
        break;
      case "client":
        if (location.pathname !== "/client") navigate("/client");
        break;
      default:
        navigate("/");
        break;
    }
  }, [userAuth, location.pathname]);

  return <Box>{children}</Box>;
};

export default RequireAuth;
