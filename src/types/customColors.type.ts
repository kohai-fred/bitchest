// Étendre le type PaletteOptions pour inclure la couleur personnalisée
import { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    customColors?: {
      bitchest?: {
        main: string;
        light: string;
        dark: string;
      };
    };
  }
}
