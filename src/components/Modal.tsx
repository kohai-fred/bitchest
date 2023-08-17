import { Fade } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import { PropsWithChildren, ReactElement, Ref, forwardRef } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  setOpen: (close: false) => void;
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export default function Modal({
  open,
  title,
  setOpen,
  children,
}: PropsWithChildren<ModalProps>) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}
