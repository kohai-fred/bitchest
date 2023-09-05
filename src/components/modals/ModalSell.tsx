import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  getRemainingQuantityOfCrypto,
  sellCrypto,
} from "@src/services/walletAndTransactions";
import { useWalletStore } from "@src/store/wallet.store";
import { customColors } from "@src/themes/customColors";
import { LatestCotation } from "@src/types/cryptos";
import { useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BitchestButton from "../BitchestButton";
import TextPrice from "../TextPrice";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cotation: LatestCotation;
};

const ModalSell = ({ open, setOpen, cotation }: Props) => {
  const bitchestColor = customColors.bitchest.main;
  const { enqueueSnackbar } = useSnackbar();
  const { wallet, setNewBalance, removeIdsCryptoTransaction } = useWalletStore(
    (state) => ({
      ...state,
    })
  );
  const [newTempBalance, setNewTempBalance] = useState(wallet.balance);
  const [amount, setAmount] = useState("0");
  const { data } = useQuery({
    queryKey: [`crypto-sell`, cotation.id],
    queryFn: () => getRemainingQuantityOfCrypto(cotation.id),
    enabled: !!open,
  });

  const { handleSubmit } = useForm();

  function handleClose() {
    setOpen(false);
  }

  async function formSubmit() {
    const [res, status, error] = await sellCrypto(cotation.id);
    if (status) {
      console.log("🆘 STATUS", status, error);
      enqueueSnackbar(`${JSON.parse(error).message}`, {
        variant: "error",
      });
    }
    const { data } = res;
    setNewBalance(data.wallet.balance.toFixed(4));
    removeIdsCryptoTransaction(cotation.id);
    handleClose();
    enqueueSnackbar(`Vente réussi`, {
      variant: "success",
    });
  }

  useEffect(() => {
    if (!data) return;
    const amount = data * +cotation.latest_cotation.price;
    const newBalance = +wallet.balance + amount;
    console.log(
      "🚀 ~ file: ModalSell.tsx:80 ~ useEffect ~ data:",
      data,
      "amout",
      amount.toFixed(4),
      "newBalance",
      newBalance.toFixed(4)
    );
    Math.round(data);
    setAmount(amount.toFixed(4));
    setNewTempBalance(newBalance.toFixed(4));
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit(formSubmit)}
    >
      <DialogTitle>Vendre des {cotation.name}</DialogTitle>
      <DialogContent>
        <Box ml={1} mb={3}>
          <DialogContentText>
            Quantité :
            <TextPrice price={data} symbol={cotation.symbol} />
          </DialogContentText>
          <DialogContentText>
            Cours actuel :
            <TextPrice price={cotation.latest_cotation.price} />
          </DialogContentText>
          <DialogContentText>
            Solde actuelle :
            <TextPrice price={wallet.balance} />
          </DialogContentText>
          <DialogContentText>
            Nouveau solde :
            <TextPrice price={newTempBalance} />
          </DialogContentText>
          <DialogContentText>
            Gain :
            <TextPrice price={amount} priceColor={bitchestColor} />
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Annuler
        </Button>
        <BitchestButton type="submit">Vendre</BitchestButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSell;
