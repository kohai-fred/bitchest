import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import { PropsWithChildren } from "react";
import { customColors } from "./themes/customColors";
import "@src/types/customColors.type";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    customColors,
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "Roboto",
      "sans-serif",
      "Inter",
      "system-ui",
      "Avenir",
      "Helvetica",
      "Arial",
    ].join(","),
  },
});

const snackBarOptions: SnackbarProviderProps = {
  TransitionProps: { direction: "left" },
  anchorOrigin: { vertical: "top", horizontal: "right" },
  variant: "warning",
  maxSnack: 1,
};

function App({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider {...snackBarOptions}>{children}</SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
