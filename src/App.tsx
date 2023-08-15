import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PropsWithChildren } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default App;
