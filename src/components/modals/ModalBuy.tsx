import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { buyCrypto } from "@src/services/walletAndTransactions";
import { useWalletStore } from "@src/store/wallet.store";
import type { LatestCotation } from "@src/types/cryptos";
import { BUY_RULES } from "@src/validation/transactions";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BitchestButton from "../BitchestButton";
import TextPrice from "../TextPrice";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cotation: LatestCotation;
};

type FormValues = {
  crypto_id: number;
  quantity: string;
};

export default function ModalBuy({ open, setOpen, cotation }: Props) {
  const { wallet, setNewBalance, addNewIdsCryptoTransaction } = useWalletStore(
    (state) => ({
      ...state,
    })
  );
  const [newTempBalance, setNewTempBalance] = useState(wallet.balance);
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { quantity: "0" },
  });
  const { enqueueSnackbar } = useSnackbar();
  const valueRef = useRef(0);
  const costRef = useRef(0);

  const handleClose = () => {
    reset();
    setNewTempBalance(wallet.balance);
    valueRef.current = 0;
    costRef.current = 0;
    setOpen(false);
  };

  async function formSubmit(formValue: FormValues) {
    formValue.crypto_id = cotation.id;
    const [res, status, error] = await buyCrypto(formValue);
    if (status) {
      enqueueSnackbar(`${JSON.parse(error).message}`, {
        variant: "error",
      });
      return;
    }
    const { data } = res;
    setNewBalance(data.balance.toFixed(4));
    addNewIdsCryptoTransaction(data.transaction.crypto_currency_id);
    handleClose();
    enqueueSnackbar(`Achat réussi`, {
      variant: "success",
    });
  }

  function calculNewTempBalance(value: string) {
    console.log("🆘 NEWTEMP", newTempBalance);
    valueRef.current = +value;
    if (+value <= 0) {
      setNewTempBalance(wallet.balance);
      return;
    }
    costRef.current = +cotation.latest_cotation.price * +value;
    const totalCost = (+wallet.balance - costRef.current).toFixed(4);
    setNewTempBalance(() => totalCost);
    if (+totalCost < 0) {
      enqueueSnackbar(`Solde insuffisant`, {
        variant: "error",
      });
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component="form"
      onSubmit={handleSubmit(formSubmit)}
    >
      <DialogTitle>Acheter des {cotation.name} </DialogTitle>
      <DialogContent>
        <Box ml={1} mb={3}>
          <DialogContentText>
            Cours : <TextPrice price={cotation.latest_cotation.price} />
          </DialogContentText>
          <DialogContentText>
            Solde actuelle : <TextPrice price={wallet.balance} />
          </DialogContentText>
        </Box>
        <Controller
          name="quantity"
          control={control}
          rules={{ ...BUY_RULES }}
          render={({ field, formState: { errors } }) => (
            <>
              <TextField
                autoFocus
                id={cotation.name}
                label="Quantité"
                type="number"
                fullWidth
                variant="outlined"
                inputProps={{ step: ".01" }}
                {...field}
                error={errors.quantity?.message ? true : false}
                onChange={(newValue) => {
                  field.onChange(newValue);
                  calculNewTempBalance(newValue.target.value);
                }}
              />
              <Typography variant="caption" color="error" pl={1}>
                {errors.quantity?.message}
              </Typography>
            </>
          )}
        />
        <Box mt={1} ml={1}>
          <DialogContentText>
            Coût achat : <TextPrice price={costRef.current.toFixed(4)} />
          </DialogContentText>
          <DialogContentText>
            Nouveau solde :
            <TextPrice
              price={newTempBalance}
              priceColor={`${+newTempBalance >= 0 ? "white" : "error"}`}
            />
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Annuler
        </Button>
        <BitchestButton
          type="submit"
          disabled={valueRef.current <= 0 || +newTempBalance < 0}
        >
          Acheter
        </BitchestButton>
      </DialogActions>
    </Dialog>
  );
}
