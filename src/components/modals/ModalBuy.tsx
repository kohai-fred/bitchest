import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { buyCrypto } from "@src/services/walletAndTransactions";
import { useWalletStore } from "@src/store/wallet.store";
import { BUY_RULES } from "@src/validation/transactions";
import { useSnackbar } from "notistack";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BitchestButton from "../BitchestButton";
import DialogContentTextSpaceBetween from "../DialogContentTextSpaceBetween";
import TextPrice from "../TextPrice";

type DataBuy = {
  id: number;
  latestCotation: string;
  name: string;
};

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: DataBuy;
};

type FormValues = {
  crypto_id: number;
  quantity: string;
};

export default function ModalBuy({ open, setOpen, data }: Props) {
  const {
    wallet,
    setNewBalance,
    setOfOwnedCryptos,
    updateTransactionClientHistory,
  } = useWalletStore((state) => ({
    ...state,
  }));
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
    formValue.crypto_id = data.id;
    const [res, status, error] = await buyCrypto(formValue);
    if (status) {
      enqueueSnackbar(`${JSON.parse(error).message}`, {
        variant: "error",
      });
      return;
    }
    setNewBalance(res.data.balance.toFixed(4));
    setOfOwnedCryptos(res.data.ownedCrypto);
    updateTransactionClientHistory();
    handleClose();
    enqueueSnackbar(`Achat réussi`, {
      variant: "success",
    });
  }

  function calculNewTempBalance(value: string) {
    valueRef.current = +value;
    if (+value <= 0) {
      setNewTempBalance(wallet.balance);
      return;
    }
    costRef.current = +data.latestCotation * +value;
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
      <DialogTitle>Acheter des {data.name} </DialogTitle>
      <DialogContent>
        <Box ml={1} mb={3}>
          <DialogContentTextSpaceBetween>
            Cours : <TextPrice price={data.latestCotation} />
          </DialogContentTextSpaceBetween>
          <DialogContentTextSpaceBetween>
            Solde actuelle : <TextPrice price={wallet.balance} />
          </DialogContentTextSpaceBetween>
        </Box>
        <Controller
          name="quantity"
          control={control}
          rules={{ ...BUY_RULES }}
          render={({ field, formState: { errors } }) => (
            <>
              <TextField
                autoFocus
                id={data.name}
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
          <DialogContentTextSpaceBetween>
            Coût achat : <TextPrice price={costRef.current.toFixed(4)} />
          </DialogContentTextSpaceBetween>
          <DialogContentTextSpaceBetween>
            Nouveau solde :
            <TextPrice
              price={newTempBalance}
              priceColor={`${+newTempBalance >= 0 ? "white" : "error"}`}
            />
          </DialogContentTextSpaceBetween>
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
