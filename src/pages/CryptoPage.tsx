import {
  Box,
  Paper,
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
import ModalBuy from "@src/components/modals/ModalBuy";
import ModalCryptoDetails from "@src/components/modals/ModalCryptoDetails";
import ModalSell from "@src/components/modals/ModalSell";
import { getLatestCryptosCotation } from "@src/services/cryptos";
import { useWalletStore } from "@src/store/wallet.store";
import { LatestCotation } from "@src/types/cryptos";
import { getUserCookies } from "@src/utils/cookiesUser";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

const CryptoPage = () => {
  const user = getUserCookies();
  const { wallet, getIdOfOwnedCryptos } = useWalletStore((state) => ({
    ...state,
  }));
  const [openModalBuy, setOpenModalBuy] = useState(false);
  const [openModalSell, setOpenModalSell] = useState(false);
  const [openModalCryptoDetails, setOpenModalCryptoDetails] = useState(false);
  const cotationRef = useRef<null | LatestCotation>(null);
  const {
    id = 0,
    name = "",
    latest_cotation: { price: latestCotation = "" } = {},
  } = cotationRef.current ?? {};

  const idOfOwnedCryptos = getIdOfOwnedCryptos();

  const { data: cryptosCotation } = useQuery({
    queryKey: ["latest-cotation"],
    queryFn: getLatestCryptosCotation,
    staleTime: 60_000,
  });

  function handleOpenBuyModal(cotation: LatestCotation) {
    cotationRef.current = cotation;
    setOpenModalBuy(true);
  }

  function handleOpenModalSellModal(cotation: LatestCotation) {
    cotationRef.current = cotation;
    setOpenModalSell(true);
  }

  function handleOpenModalCryptoDetails(cotation: LatestCotation) {
    cotationRef.current = cotation;
    setOpenModalCryptoDetails(true);
  }

  return (
    <>
      <TitlePage title="Cours des cryptos" />
      <Typography variant="body2" mt={5} mb={1}>
        Le : {cryptosCotation && cryptosCotation[0].latest_cotation.timestamp}
      </Typography>
      <Box>
        {/* //? MOBILE VERSION */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            gap: 2,
            flexWrap: "wrap",
            maxWidth: "100%",
          }}
        >
          {
            !cryptosCotation || cryptosCotation.length <= 0
              ? [...Array(10)].map(() => (
                  <SkeletonCardCrypto key={crypto.randomUUID()} />
                ))
              : cryptosCotation.map((crypto) => {
                  return (
                    <CardMobilCrypto
                      key={`card-${crypto.id}`}
                      id={crypto.id}
                      name={crypto.name}
                      symbol={crypto.symbol}
                      disableBuy={
                        +wallet.balance <= +crypto.latest_cotation.price * 0.01
                      }
                      disableSell={!idOfOwnedCryptos.includes(crypto.id)}
                      openModalBuy={() => handleOpenBuyModal(crypto)}
                      openModalSell={() => handleOpenModalSellModal(crypto)}
                      openModalDetails={() =>
                        handleOpenModalCryptoDetails(crypto)
                      }
                      cardProps={{ sx: { flex: 1 } }}
                    >
                      <Box>
                        <DialogContentTextSpaceBetween>
                          Cours :
                          <TextPrice price={crypto.latest_cotation.price} />
                        </DialogContentTextSpaceBetween>
                      </Box>
                    </CardMobilCrypto>
                  );
                })
            // </>
          }
        </Box>
        {/* //? DESKTOP VERSION */}
        <TableContainer
          component={Paper}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Crypto-monnaie</TableCell>
                <TableCell align="right">Cours</TableCell>
                <TableCell align="right">Détails</TableCell>
                {user?.role === "client" && (
                  <>
                    <TableCell align="right">Vendre</TableCell>
                    <TableCell align="right">Acheter</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            {!cryptosCotation ? (
              <SkeletonTableBody
                nbCells={user?.role === "client" ? 5 : 3}
                nbRows={10}
              />
            ) : (
              <TableBody>
                {cryptosCotation.map((crypto) => {
                  return (
                    <TableRow
                      key={crypto.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box
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
                        {crypto.latest_cotation.price} €
                      </TableCell>
                      <TableCell align="right">
                        <BitchestButton
                          onClick={() => handleOpenModalCryptoDetails(crypto)}
                          fullWidth
                          sx={{ maxWidth: "8em" }}
                        >
                          {crypto.symbol}
                        </BitchestButton>
                      </TableCell>
                      {user?.role === "client" && (
                        <>
                          <TableCell align="right">
                            <BitchestButton
                              disabled={!idOfOwnedCryptos.includes(crypto.id)}
                              onClick={() => handleOpenModalSellModal(crypto)}
                            >
                              Vendre
                            </BitchestButton>
                          </TableCell>
                          <TableCell align="right">
                            <BitchestButton
                              onClick={() => handleOpenBuyModal(crypto)}
                              disabled={
                                +wallet.balance <=
                                +crypto.latest_cotation.price * 0.01
                              }
                            >
                              Acheter
                            </BitchestButton>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
      {cotationRef.current && user && (
        <>
          <ModalBuy
            open={openModalBuy}
            setOpen={setOpenModalBuy}
            data={{ id, latestCotation, name }}
          />
          <ModalSell open={openModalSell} setOpen={setOpenModalSell} id={id} />
          <ModalCryptoDetails
            open={openModalCryptoDetails}
            setOpen={setOpenModalCryptoDetails}
            id={id}
            name={name}
          />
        </>
      )}
    </>
  );
};

export default CryptoPage;
