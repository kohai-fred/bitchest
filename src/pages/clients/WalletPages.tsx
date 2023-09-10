import {
  Box,
  Button,
  DialogContentText,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BitchestButton from "@src/components/BitchestButton";
import CardMobilCrypto from "@src/components/CardMobilCrypto";
import DialogContentTextSpaceBetween from "@src/components/DialogContentTextSpaceBetween";
import ImgCryptoLogo from "@src/components/ImgCryptoLogo";
import SkeletonCardCrypto from "@src/components/SkeletonCardCrypto";
import SkeletonTableBody from "@src/components/SkeletonTableBody";
import TextPrice from "@src/components/TextPrice";
import TitlePage from "@src/components/TitlePage";
import TitleSection from "@src/components/TitleSection";
import GraphHistory from "@src/components/graphs/GraphHistory";
import ModalBuy from "@src/components/modals/ModalBuy";
import ModalCryptoDetails from "@src/components/modals/ModalCryptoDetails";
import ModalSell from "@src/components/modals/ModalSell";
import { useWalletStore } from "@src/store/wallet.store";
import { customColors } from "@src/themes/customColors";
import {
  OwnedCryptoType,
  TransactionDataType,
} from "@src/types/transaction.type";
import { useEffect, useRef, useState } from "react";

const WalletPages = () => {
  const [openModalBuy, setOpenModalBuy] = useState(false);
  const [openModalSell, setOpenModalSell] = useState(false);
  const [openModalCryptoDetails, setOpenModalCryptoDetails] = useState(false);
  const { wallet } = useWalletStore((state) => ({ ...state }));
  const [cryptoHistory, setCryptoHistory] = useState<TransactionDataType[]>();
  const cryptoName = Object.keys(wallet.transactionClientHistory)?.sort()[0];
  const cryptoRef = useRef<OwnedCryptoType>();
  const bitchestColor = customColors.bitchest.main;

  const {
    id = 0,
    name = "",
    latest_cotation: latestCotation = "",
  } = cryptoRef.current ?? {};

  function handleOpenBuyModal(crypto: OwnedCryptoType) {
    cryptoRef.current = crypto;
    setOpenModalBuy(true);
  }

  function handleOpenModalSellModal(crypto: OwnedCryptoType) {
    cryptoRef.current = crypto;
    setOpenModalSell(true);
  }

  function handleChangeCryptoHistory(event: SelectChangeEvent) {
    const name = event.target.value as string;
    const transactions = wallet.transactionClientHistory[name];
    setCryptoHistory(transactions);
  }

  function handleOpenModalCryptoDetails(crypto: OwnedCryptoType) {
    cryptoRef.current = crypto;
    setOpenModalCryptoDetails(true);
  }

  useEffect(() => {
    if (!cryptoName) return;
    const transactions = wallet.transactionClientHistory[cryptoName];
    setCryptoHistory(transactions);
  }, [cryptoName, wallet.transactionClientHistory[cryptoName]]);

  return (
    <>
      <TitlePage title="Mon Portefeuille" />
      <Box component="article" display="flex" flexDirection="column" gap={8}>
        <Box component="section" id="section_cryptos">
          <TitleSection title="Mes cryptos" />
          {/* //? MOBILE VERSION */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              gap: 2,
              flexWrap: "wrap",
              maxWidth: "100%",
            }}
          >
            {wallet.ownedCrypto.length <= 0
              ? [...Array(4)].map(() => (
                  <SkeletonCardCrypto key={crypto.randomUUID()} />
                ))
              : wallet.ownedCrypto.map((crypto) => {
                  return (
                    <CardMobilCrypto
                      key={`card-${crypto.id}`}
                      id={crypto.id}
                      name={crypto.name}
                      symbol={crypto.symbol}
                      disableSell={false}
                      disableBuy={
                        +wallet.balance <= +crypto.latest_cotation * 0.01
                      }
                      openModalBuy={() => handleOpenBuyModal(crypto)}
                      openModalSell={() => handleOpenModalSellModal(crypto)}
                      openModalDetails={() =>
                        handleOpenModalCryptoDetails(crypto)
                      }
                      cardProps={{ sx: { flex: 1 } }}
                    >
                      <Box>
                        <DialogContentTextSpaceBetween>
                          Quantité :
                          <TextPrice
                            price={crypto.available_quantity_to_sell}
                            symbol={crypto.symbol}
                          />
                        </DialogContentTextSpaceBetween>
                        <DialogContentTextSpaceBetween>
                          Cours :<TextPrice price={crypto.latest_cotation} />
                        </DialogContentTextSpaceBetween>
                        <DialogContentTextSpaceBetween>
                          Gain :<TextPrice price={crypto.potential_gain} />
                        </DialogContentTextSpaceBetween>
                      </Box>
                    </CardMobilCrypto>
                  );
                })}
          </Box>
          {/* //? DESKTOP VERSION */}
          <TableContainer
            component={Paper}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Crypto-monnaie</TableCell>
                  <TableCell align="right">Quantité</TableCell>
                  <TableCell align="right">Cours</TableCell>
                  <TableCell align="right">Gains</TableCell>
                  <TableCell align="right">Vendre</TableCell>
                  <TableCell align="right">Acheter</TableCell>
                </TableRow>
              </TableHead>
              {wallet.ownedCrypto.length <= 0 ? (
                <SkeletonTableBody nbCells={6} nbRows={4} />
              ) : (
                <TableBody>
                  {wallet.ownedCrypto.map((crypto) => {
                    return (
                      <TableRow
                        key={crypto.id}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell>
                          <Box
                            component="span"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <ImgCryptoLogo
                              symbol={crypto.symbol}
                              style={{ width: "1rem" }}
                            />
                            {crypto.name}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {crypto.available_quantity_to_sell}({crypto.symbol})
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            sx={{ "&:hover": { color: bitchestColor } }}
                            onClick={() => handleOpenModalCryptoDetails(crypto)}
                          >
                            {crypto.latest_cotation} €
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <TextPrice price={crypto.potential_gain} />
                        </TableCell>
                        <TableCell align="right">
                          <BitchestButton
                            onClick={() => handleOpenModalSellModal(crypto)}
                          >
                            Vendre
                          </BitchestButton>
                        </TableCell>
                        <TableCell align="right">
                          <BitchestButton
                            onClick={() => handleOpenBuyModal(crypto)}
                            disabled={
                              +wallet.balance <= +crypto.latest_cotation * 0.01
                            }
                          >
                            Acheter
                          </BitchestButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Box>
        <Divider />
        <Box component="section" id="section_history">
          <TitleSection title="Historique des achats" />
          {Object.keys(wallet.transactionClientHistory).length > 0 && (
            <Box>
              <InputLabel id="crypto-name" sx={{ mb: 1 }}>
                Crypto
              </InputLabel>
              {cryptoHistory && (
                <Select
                  labelId="crypto-name"
                  id="demo-simple-select"
                  value={cryptoHistory[0].name}
                  label="Crypto"
                  onChange={handleChangeCryptoHistory}
                >
                  {Object.keys(wallet.transactionClientHistory)
                    .sort()
                    .map((name) => {
                      return (
                        <MenuItem value={name} key={`option-${name}`}>
                          {name}
                        </MenuItem>
                      );
                    })}
                </Select>
              )}
              <Box width="100%" sx={{ aspectRatio: "16/9" }} maxHeight={400}>
                {cryptoHistory && <GraphHistory dataArray={cryptoHistory} />}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {cryptoRef.current && (
        <>
          <ModalBuy
            open={openModalBuy}
            setOpen={setOpenModalBuy}
            data={{ id, latestCotation, name }}
          />
          <ModalSell open={openModalSell} setOpen={setOpenModalSell} id={id} />
          {latestCotation && (
            <ModalCryptoDetails
              open={openModalCryptoDetails}
              setOpen={setOpenModalCryptoDetails}
              id={id}
              name={name}
            />
          )}
        </>
      )}
    </>
  );
};

export default WalletPages;
