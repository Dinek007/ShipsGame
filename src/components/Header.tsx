import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { informationsSelectors } from "../redux/informations/informations.selectors";
//@ts-ignore
import CloudImg from "/cloud.png"

export const Header = () => {
  const theme = useTheme();
  const title = useSelector(informationsSelectors.title)

  return (
    <Box sx={{
      position:"relative",
      left: "50%",
      transform: "translate(-50%,0)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      height: "25vh"
    }}
  >
    <img src={CloudImg} alt="cloud" style={{position: "absolute", width: "800px", top: "-150px", zIndex:"-1"}}/>
    <Box sx={{
      position: "absolute",
      top: "0px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    }}>
    <Typography variant="h1">   Ships Game  </Typography>
    <Typography variant="h4">   {title}  </Typography>
    </Box>
  </Box>
  );
};
