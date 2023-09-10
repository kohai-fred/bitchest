import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { sellCrypto } from "@src/services/walletAndTransactions";
import { useWalletStore } from "@src/store/wallet.store";
import { customColors } from "@src/themes/customColors";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import BitchestButton from "../BitchestButton";
import DialogContentTextSpaceBetween from "../DialogContentTextSpaceBetween";
import TextPrice from "../TextPrice";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
};

const ModalSell = ({ open, setOpen, id }: Props) => {
  const bitchestColor = customColors.bitchest.main;
  const { enqueueSnackbar } = useSnackbar();
  const {
    wallet,
    setNewBalance,
    getOwnedCryptoById,
    removeOwnedCryptoById,
    updateTransactionClientHistory,
  } = useWalletStore((state) => ({
    ...state,
  }));

  const dataRef = getOwnedCryptoById(id);

  const { handleSubmit } = useForm();

  function handleClose() {
    setOpen(false);
  }

  async function formSubmit() {
    const [res, status, error] = await sellCrypto(id);
    if (status) {
      enqueueSnackbar(`${JSON.parse(error).message}`, {
        variant: "error",
      });
    }
    const { data } = res;
    setNewBalance(data.wallet.balance.toFixed(4));
    removeOwnedCryptoById(id);
    updateTransactionClientHistory();
    handleClose();
    enqueueSnackbar(`Vente réussi`, {
      variant: "success",
    });
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit(formSubmit)}
    >
      {dataRef && (
        <>
          <DialogTitle>
            Vendre tous les&nbsp;
            <Typography
              component="span"
              textTransform="uppercase"
              fontStyle="italic"
              fontSize="1.2rem"
            >
              {dataRef.name}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box ml={1} mb={3}>
              <DialogContentTextSpaceBetween>
                Quantité :
                <TextPrice
                  price={dataRef.available_quantity_to_sell}
                  symbol={dataRef.symbol}
                />
              </DialogContentTextSpaceBetween>
              <DialogContentTextSpaceBetween>
                Cours actuel :
                <TextPrice price={dataRef.latest_cotation} />
              </DialogContentTextSpaceBetween>
              <DialogContentTextSpaceBetween>
                Solde actuelle :
                <TextPrice price={wallet.balance} />
              </DialogContentTextSpaceBetween>
              <DialogContentTextSpaceBetween>
                Nouveau solde :
                <TextPrice
                  price={(+wallet.balance + +dataRef.potential_gain).toFixed(4)}
                />
              </DialogContentTextSpaceBetween>
              <DialogContentTextSpaceBetween>
                Gain :
                <TextPrice
                  price={dataRef.potential_gain}
                  priceColor={bitchestColor}
                />
              </DialogContentTextSpaceBetween>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Annuler
            </Button>
            <BitchestButton type="submit">Vendre</BitchestButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ModalSell;
