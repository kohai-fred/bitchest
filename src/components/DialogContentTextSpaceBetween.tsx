import { styled } from "@mui/material/styles";
import MuiDialogContentText from "@mui/material/DialogContentText";
import { TypographyProps } from "@mui/material/Typography";
import { PropsWithChildren } from "react";

const DialogContentText = styled(MuiDialogContentText)(() => {
  return {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  };
});

const DialogContentTextSpaceBetween = (
  props: PropsWithChildren<TypographyProps>
) => {
  const { children, ...rest } = props;

  return <DialogContentText {...rest}>{children}</DialogContentText>;
};

export default DialogContentTextSpaceBetween;
