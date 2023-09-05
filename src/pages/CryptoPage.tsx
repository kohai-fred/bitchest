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
import ModalBuy from "@src/components/modals/ModalBuy";
import ModalSell from "@src/components/modals/ModalSell";
import { getLatestCryptosCotation } from "@src/services/cryptos";
import { useWalletStore } from "@src/store/wallet.store";
import { LatestCotation } from "@src/types/cryptos";
import { getUserCookies } from "@src/utils/cookiesUser";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const CryptoPage = () => {
  const user = getUserCookies();
  const { wallet } = useWalletStore((state) => ({ ...state }));
  const [openModalBuy, setOpenModalBuy] = useState(false);
  const [openModalSell, setOpenModalSell] = useState(false);
  const cotationRef = useRef<null | LatestCotation>(null);
  const { data: cryptosCotation } = useQuery({
    queryKey: ["latest-cotation"],
    queryFn: getLatestCryptosCotation,
    staleTime: 60_000,
  });

  function handleOpenBuyModal(cotation: LatestCotation) {
    console.log("🆘 WALET", user?.token, "id", cotation);
    cotationRef.current = cotation;
    setOpenModalBuy(true);
  }

  function handleOpenModalSellModal(cotation: LatestCotation) {
    cotationRef.current = cotation;
    setOpenModalSell(true);
  }

  return (
    <>
      <Typography variant="h1" fontSize={34}>
        Cours des cryptos
      </Typography>
      <Typography variant="body2" mt={5} mb={1}>
        Le : {cryptosCotation && cryptosCotation[0].latest_cotation.timestamp}
      </Typography>
      <Box>
        <TableContainer component={Paper}>
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
            <TableBody>
              {cryptosCotation &&
                cryptosCotation.map((crypto) => {
                  return (
                    <TableRow
                      key={crypto.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <img
                            src={`/src/assets/cryptos/${crypto.symbol}.png`}
                            style={{ width: "1rem" }}
                          />
                          {crypto.name}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {crypto.latest_cotation.price} €
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          ">a": {
                            textDecoration: "none",
                            color: "primary.main",
                            "&:hover": {
                              color: "customColors.bitchest.main",
                            },
                          },
                        }}
                      >
                        <Link to={`/${user?.role}/details/${crypto.id}`}>
                          {crypto.symbol}
                        </Link>
                      </TableCell>
                      {user?.role === "client" && (
                        <>
                          <TableCell align="right">
                            <BitchestButton
                              disabled={
                                !wallet.idsCryptoTransaction.includes(crypto.id)
                              }
                              onClick={() => handleOpenModalSellModal(crypto)}
                            >
                              Vendre
                            </BitchestButton>
                          </TableCell>
                          <TableCell align="right">
                            <BitchestButton
                              onClick={() => handleOpenBuyModal(crypto)}
                              disabled={+wallet.balance <= 0}
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
          </Table>
        </TableContainer>
      </Box>
      {cotationRef.current && user && (
        <>
          <ModalBuy
            open={openModalBuy}
            setOpen={setOpenModalBuy}
            cotation={cotationRef.current}
          />
          <ModalSell
            open={openModalSell}
            setOpen={setOpenModalSell}
            cotation={cotationRef.current}
          />
        </>
      )}
    </>
  );
};

export default CryptoPage;
