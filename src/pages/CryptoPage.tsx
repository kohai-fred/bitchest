import { Mode, DeleteForever } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getLatestCryptosCotation } from "@src/services/cryptos";
import { getUserCookies } from "@src/utils/cookiesUser";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const CryptoPage = () => {
  const user = getUserCookies();
  const {
    data: cryptosCotation,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latest-cotation"],
    queryFn: getLatestCryptosCotation,
    staleTime: 60_000,
  });

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
                <TableCell align="right">Acheter</TableCell>
                <TableCell align="right">Vendre</TableCell>
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
                      {/* <TableCell
                        align="right"
                        sx={{
                          color:
                            user.role === "admin"
                              ? "customColors.bitchest.dark"
                              : "",
                        }}
                      >
                        {user.role}
                      </TableCell> */}
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
                      <TableCell align="right">
                        <Button variant="outlined">Vendre</Button>
                        {/* <IconButton
                          color="info"
                          // onClick={() => openModalEditUser(user)}
                        >
                          <Mode color="info" />
                        </IconButton> */}
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="outlined">Acheter</Button>
                        {/* <IconButton
                          color="error"
                          onClick={() => openConfirmationDeleteModal(user)}
                        >
                          <DeleteForever color="error" />
                        </IconButton> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default CryptoPage;
