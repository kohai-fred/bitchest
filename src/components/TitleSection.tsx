import { Typography } from "@mui/material";

type Props = {
  title: string;
};
const TitleSection = ({ title }: Props) => {
  return (
    <Typography fontSize="clamp(1.5em, 3vw, 2.175em)" fontWeight={500} mb={3}>
      {title}
    </Typography>
  );
};

export default TitleSection;
