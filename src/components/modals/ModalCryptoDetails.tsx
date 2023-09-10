import { HighlightOff } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { getCryptoDetails } from "@src/services/cryptos";
import { customColors } from "@src/themes/customColors";
import { CotationType } from "@src/types/cryptos";
import checkIsMobile from "@src/utils/checkIsMobile";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GraphCotation from "../graphs/GraphCotation";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  name: string;
};

const SX_MOBILE_DIALOG = {
  width: "90%",
  "@media(orientation: landscape)": {
    height: "90vh",
  },
  "@media(orientation: portrait)": {
    height: "33vh",
  },
};
const SX_DESKTOP_DIALOG = {
  width: "90vw",
  height: "33vh",
};

const ModalCryptoDetails = ({ open, setOpen, id, name }: Props) => {
  const isMobile = checkIsMobile();
  const SX_DIALOG = isMobile ? SX_MOBILE_DIALOG : SX_DESKTOP_DIALOG;
  const bitchestColor = customColors.bitchest.main;
  const [cotations, setCotations] = useState<CotationType[]>([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`crypto-detail`, id],
    queryFn: () => getCryptoDetails(id.toString() ?? ""),
    staleTime: 60_000,
    enabled: !!id,
  });

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    if (!data) return;
    setCotations(data.cotations);
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        ".MuiDialog-paper": {
          maxWidth: "none",
          maxHeight: "90vh",
          ...SX_DIALOG,
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="space-between">
        {name}
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{ "&:hover": { color: bitchestColor } }}
        >
          <HighlightOff />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {cotations.length > 0 && <GraphCotation dataArray={cotations} />}
      </DialogContent>
    </Dialog>
  );
};

export default ModalCryptoDetails;
