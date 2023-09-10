import { Card, Typography } from "@mui/material";
import type { CotationType } from "@src/types/cryptos";
import type { TooltipElType } from "@src/types/tooltipEl.type";
import DialogContentTextSpaceBetween from "../DialogContentTextSpaceBetween";
import TextPrice from "../TextPrice";

const TooltipElCotation = (props: TooltipElType<CotationType>) => {
  const { active, payload, label } = props ?? {
    active: false,
    payload: [],
    label: "",
  };

  if ((!active && !label) || !payload) return null;
  if (payload.length <= 0) return null;
  const data = payload[0].payload;

  return (
    <Card sx={{ p: 2 }}>
      <Typography mb={2}>{data.created_at}</Typography>
      <DialogContentTextSpaceBetween>
        Montant :<TextPrice price={data.price} />
      </DialogContentTextSpaceBetween>
    </Card>
  );
};

export default TooltipElCotation;
