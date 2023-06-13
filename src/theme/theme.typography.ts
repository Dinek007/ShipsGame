import { Palette } from "@mui/material/styles";
import createTypography from "@mui/material/styles/createTypography";

export const getTypography = (palette: Palette) =>
  createTypography(palette, {
    fontFamily: "Poppins",
    fontSize: 12,
    caption:{
      fontSize: "2.2rem",
      fontFamily: 'Malinda',
      fontWeight: 700,
      color: palette.text.secondary
    },
    h1: {
      fontSize: "5.5rem",
      fontWeight: 10,
      fontFamily: "Malinda",
      color: palette.text.primary

    },
    h2: {
      fontSize: "2.2rem",
      fontFamily: "Poppins",
      fontWeight: 700,
      color: palette.text.primary

    },
    h3: {
      fontSize: "2rem",
      fontFamily: "Poppins",
      color: palette.text.primary
    },  
    h4: {
      fontSize: "1.8rem",
      fontFamily: "Poppins",
      fontWeight: 700,
      color: palette.text.primary
    },
    h5: {
      fontSize: "1.4rem",
      fontFamily: "Poppins",
      color: palette.text.primary
    },
    h6: {
      fontSize: "1rem",
      fontFamily: "Poppins",
      color: palette.text.primary
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontWeight: 600,
      color: palette.text.primary
    },
    subtitle2: { fontSize: "1rem" },
    button: {
      fontSize: "16px",
    },
    body2:{
      fontSize: "1.8rem",
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: palette.text.primary

    },
  });
