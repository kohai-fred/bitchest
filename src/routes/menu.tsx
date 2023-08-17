import {
  AttachMoney,
  PersonPin,
  ViewListTwoTone,
  Wallet,
} from "@mui/icons-material";
import CryptoPage from "@src/pages/CryptoPage";
import MePage from "@src/pages/MePage";
import UsersPage from "@src/pages/admin/UsersPage";
import WalletPages from "@src/pages/clients/WalletPages";

const colorLight = "customColors.bitchest.light";

const COMMON_ROUTES = [
  {
    title: "Me",
    path: "me",
    element: <MePage />,
    icon: <PersonPin color="primary" />,
  },
  {
    title: "Crypto",
    path: "crypto",
    icon: <AttachMoney sx={{ color: "gold" }} />,
    element: <CryptoPage />,
  },
];

export const adminMenu = [
  ...COMMON_ROUTES,
  {
    title: "Clients",
    path: "users",
    icon: <ViewListTwoTone />,
    element: <UsersPage />,
  },
];

export const clientMenu = [
  ...COMMON_ROUTES,
  {
    title: "Portefeuille",
    path: "wallet",
    icon: <Wallet sx={{ color: "#AF786A" }} />,
    element: <WalletPages />,
  },
];
