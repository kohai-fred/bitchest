import React from "react";
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

type Props = {
  nbRows: number;
  nbCells?: number;
};

const SkeletonTable = ({ nbRows, nbCells }: Props) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  let cellNumber = nbCells ?? 2;
  if (!nbCells) {
    if (sm) cellNumber = 3;
    if (md) cellNumber = 4;
    if (lg) cellNumber = 6;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {[...Array(cellNumber)].map(() => (
              <TableCell key={crypto.randomUUID()}>
                <Skeleton animation="wave" variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(nbRows)].map(() => (
            <TableRow key={crypto.randomUUID()}>
              {[...Array(cellNumber)].map(() => (
                <TableCell key={crypto.randomUUID()}>
                  <Skeleton animation="wave" variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonTable;
