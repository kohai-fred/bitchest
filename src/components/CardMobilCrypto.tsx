import { ControlPoint } from "@mui/icons-material";
import {
  Box,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MuiCard, { CardProps } from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { customColors } from "@src/themes/customColors";
import { getUserCookies } from "@src/utils/cookiesUser";
import { PropsWithChildren } from "react";
import BitchestButton from "./BitchestButton";
import ImgCryptoLogo from "./ImgCryptoLogo";
import { useWalletStore } from "@src/store/wallet.store";
import { useCryptoStore } from "@src/store/crypto.store";

type Props<T> = {
  name: string;
  id: string | number;
  symbol: string;
  disableBuy: boolean;
  disableSell: boolean;
  openModalBuy: () => void;
  openModalSell: () => void;
  openModalDetails: () => void;
  cardProps?: T;
};
const URL = import.meta.env.BASE_URL;

const Card = styled(MuiCard)(() => ({}));
const CardMobilCrypto = (props: PropsWithChildren<Props<CardProps>>) => {
  const {
    name,
    id,
    symbol,
    disableBuy,
    disableSell,
    openModalBuy,
    openModalSell,
    openModalDetails,
    children,
    cardProps,
  } = props;
  const balance = useWalletStore((state) => state.wallet.balance);
  const {} = useCryptoStore((state) => state.currencies);
  const user = getUserCookies();
  const isClient = user?.role === "client";
  const bitchestColor = customColors.bitchest.main;

  return (
    <Card
      variant="elevation"
      {...cardProps}
      sx={{ minWidth: "288px", ...cardProps?.sx }}
    >
      <CardContent>
        <Box
          display="flex "
          alignItems="center"
          justifyContent=""
          gap={2}
          mb={2}
        >
          <ImgCryptoLogo symbol={symbol} style={{ width: "1.3em" }} />
          <Typography>{name}</Typography>
        </Box>
        {children}
      </CardContent>
      <Divider />

      <CardActions
        sx={{
          justifyContent: isClient ? "space-between" : "flex-end",
          flexWrap: "wrap",
        }}
      >
        <IconButton
          color="primary"
          sx={{ "&:hover": { color: bitchestColor } }}
          onClick={openModalDetails}
        >
          <ControlPoint />
        </IconButton>
        {isClient && (
          <Box>
            <BitchestButton
              onClick={openModalSell}
              sx={{ mr: 1 }}
              disabled={disableSell}
            >
              Vendre
            </BitchestButton>
            <BitchestButton onClick={openModalBuy} disabled={disableBuy}>
              Acheter
            </BitchestButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default CardMobilCrypto;
