import LayoutPage from "@src/layouts/LayoutPage";
import LoginPage from "@src/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { adminMenu, clientMenu } from "./menu";
import CryptoDetails from "@src/pages/CryptoDetails";

const commons = [
  {
    title: "Details",
    path: "details/:id",
    element: <CryptoDetails />,
  },
];
export const routes = [
  {
    title: "Login",
    path: "/",
    element: <LoginPage />,
  },
  {
    title: "Client",
    path: "/client",
    element: <LayoutPage />,
    children: [...clientMenu, ...commons],
  },
  {
    title: "Admin",
    path: "/admin",
    element: <LayoutPage />,
    children: [...adminMenu, ...commons],
  },
];

const router = createBrowserRouter(routes);
export default router;
