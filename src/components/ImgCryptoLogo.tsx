import { CSSProperties } from "react";

type Props = {
  symbol: string | null | undefined;
  style?: CSSProperties;
  extension?: "png" | "jpeg" | "jpg";
};

const defaultProps = {
  style: {},
  extension: "png",
};

const ImgCryptoLogo = ({ symbol, style, extension }: Props) => {
  if (!symbol) return <span />;
  return (
    <img src={`/src/assets/cryptos/${symbol}.${extension}`} style={style} />
  );
};

ImgCryptoLogo.defaultProps = defaultProps;

export default ImgCryptoLogo;
