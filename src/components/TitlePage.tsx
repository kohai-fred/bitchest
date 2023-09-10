import { Typography } from "@mui/material";

type Props = {
  title: string | null | undefined;
};
const TitlePage = ({ title }: Props) => {
  return (
    <Typography
      fontSize="clamp(2.5em, 5vw, 5em)"
      textAlign="center"
      fontWeight={600}
      mb={8}
    >
      {title}
    </Typography>
  );
};

export default TitlePage;
