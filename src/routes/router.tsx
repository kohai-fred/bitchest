import AdminLayout from "@src/layouts/AdminLayout";
import ClientLayout from "@src/layouts/ClientLayout";
import LoginPage from "@src/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";

export const routes = [
  {
    title: "Login",
    path: "/",
    element: <LoginPage />,
  },
  {
    title: "Client",
    path: "/client",
    element: <ClientLayout />,
  },
  {
    title: "Admin",
    path: "/admin",
    element: <AdminLayout />,
  },
];

const router = createBrowserRouter(routes);
export default router;
