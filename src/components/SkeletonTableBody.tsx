import { TableBody, TableRow, TableCell, Skeleton, Paper } from "@mui/material";
import React from "react";
type Props = {
  nbRows: number;
  nbCells: number;
};

const SkeletonTableBody = ({ nbRows, nbCells }: Props) => {
  return (
    <TableBody>
      {[...Array(nbRows)].map(() => (
        <TableRow key={crypto.randomUUID()}>
          {[...Array(nbCells)].map(() => (
            <TableCell key={crypto.randomUUID()}>
              <Skeleton animation="wave" variant="text" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SkeletonTableBody;
