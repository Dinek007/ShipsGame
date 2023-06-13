import { colors as muiColors } from "@mui/material";
import createPalette from "@mui/material/styles/createPalette";

export const getPalette = () => {
  return createPalette({
    background: {
      default: "#ffffff",
      paper: "#ffaaff"
    },
    success: {
      main: "#66C965",
    },
    error: {
      main: "#DB5930",
    },
    borderGrey: {
      main: muiColors.grey[300],
    },
    warning: {
      main: "#FFC34A",
    },
    text: {
      primary: "#000000",
      secondary: "#ffffff",
    },
    grey: {
      "200": "#F0F0F4",
    },
  });
};
  

