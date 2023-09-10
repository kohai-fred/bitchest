import { Box, Card, CardActions, Divider, Skeleton } from "@mui/material";
import React from "react";

const SkeletonCardCrypto = () => {
  return (
    <Card
      variant="elevation"
      sx={{
        minHeight: 200,
        minWidth: "288px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Skeleton animation="wave" variant="circular" width="1.3em" />
        <Skeleton animation="wave" variant="text" width="10em" />
      </Box>
      <Box flex={1} mt={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Skeleton animation="wave" variant="text" width="5em" />
          <Skeleton animation="wave" variant="text" width="3em" />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Skeleton animation="wave" variant="text" width="5em" />
          <Skeleton animation="wave" variant="text" width="3em" />
        </Box>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Skeleton animation="wave" variant="rounded" width="5em" height="2em" />
        <Skeleton animation="wave" variant="rounded" width="5em" height="2em" />
      </CardActions>
    </Card>
  );
};

export default SkeletonCardCrypto;
