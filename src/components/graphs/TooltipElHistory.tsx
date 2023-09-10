import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import {
  Percent,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Card,
  DialogContentText,
  Typography,
  useTheme,
} from "@mui/material";
import { customColors } from "@src/themes/customColors";
import type { CotationType } from "@src/types/cryptos";
import type { TooltipElType } from "@src/types/tooltipEl.type";
import { TransactionDataType } from "@src/types/transaction.type";
import { Tooltip } from "recharts";
import DialogContentTextSpaceBetween from "../DialogContentTextSpaceBetween";
import TextPrice from "../TextPrice";

type SpanColor = {
  text: string | number | null;
  color: string;
};

const SpanColor = ({ text, color }: SpanColor) => {
  return (
    <Typography component="span" color={color}>
      &nbsp;{text}&nbsp;
    </Typography>
  );
};

const TooltipElHistory = (props: TooltipElType<TransactionDataType>) => {
  const theme = useTheme();
  const { info, error } = theme.palette;
  const bitchestColor = customColors.bitchest.main;
  const { active, payload, label } = props ?? {
    active: false,
    payload: [],
    label: "",
  };

  if ((!active && !label) || !payload) return null;
  if (payload.length <= 0) return null;
  const data = payload[0].payload;
  const isAddedValue = data.amount_gain_loss
    ? data.amount_gain_loss > 0
      ? true
      : false
    : null;
  const color =
    isAddedValue === null
      ? info.main
      : isAddedValue
      ? bitchestColor
      : error.main;

  return (
    <Card sx={{ p: 2 }}>
      <DialogContentTextSpaceBetween mb={2} gap={3}>
        <>
          {data.type === "buy" ? "Achat" : "Vente"} du :{" "}
          <SpanColor text={data.created_at} color="white" />
        </>
        {data.type === "sell" && (
          <>
            {isAddedValue === null ? (
              <TrendingFlat sx={{ color: color }} />
            ) : isAddedValue ? (
              <TrendingUp sx={{ color: color }} />
            ) : (
              <TrendingDown sx={{ color: color }} />
            )}
          </>
        )}
      </DialogContentTextSpaceBetween>

      <DialogContentTextSpaceBetween>
        Quantité : <TextPrice price={data.quantity} />
      </DialogContentTextSpaceBetween>
      <DialogContentTextSpaceBetween>
        Montant : <TextPrice price={data.price} />
      </DialogContentTextSpaceBetween>
      {data.type === "sell" && (
        <>
          <DialogContentTextSpaceBetween>
            Gain :
            <TextPrice price={data.amount_gain_loss} priceColor={color} />
          </DialogContentTextSpaceBetween>
          <DialogContentTextSpaceBetween>
            Pourcentage:
            <TextPrice
              price={data.percentage_gain_loss}
              priceColor={color}
              symbol="%"
            />
            {/* <Percent /> */}
          </DialogContentTextSpaceBetween>
        </>
      )}
    </Card>
  );
};

export default TooltipElHistory;
