import MuiButton, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { customColors } from "@src/themes/customColors";
import { PropsWithChildren } from "react";

const Button = styled(MuiButton)(() => {
  const bitchestColor = customColors.bitchest.main;
  return {
    "&:hover": { color: bitchestColor, borderColor: bitchestColor },
  };
});

const BitchestButton = (props: PropsWithChildren<ButtonProps>) => {
  const { children, ...rest } = props;
  return (
    <Button variant="outlined" {...rest}>
      {children}
    </Button>
  );
};

export default BitchestButton;
