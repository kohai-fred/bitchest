import LayoutPage from "@src/layouts/LayoutPage";
import LoginPage from "@src/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { adminMenu, clientMenu } from "./menu";

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
    children: [...clientMenu],
  },
  {
    title: "Admin",
    path: "/admin",
    element: <LayoutPage />,
    children: [...adminMenu],
  },
];

const router = createBrowserRouter(routes);
export default router;
