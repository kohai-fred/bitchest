import { Typography } from "@mui/material";

type Props = {
  price: string | number | null | undefined;
  symbol?: string;
  priceColor?: string;
};
const defaultProps = {
  symbol: "€",
  priceColor: "white",
};
const TextPrice = ({ price, symbol, priceColor }: Props) => {
  return (
    <Typography component="span">
      &nbsp;
      <Typography component="span" color={priceColor} fontWeight={600}>
        {price}
      </Typography>
      &nbsp;
      <Typography variant="caption" fontWeight={200} fontSize="0.6em">
        {symbol}
      </Typography>
    </Typography>
  );
};

TextPrice.defaultProps = defaultProps;

export default TextPrice;
