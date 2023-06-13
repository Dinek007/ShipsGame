import { Box } from "@mui/system";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { useSelector } from "react-redux";
import { informationsSelectors } from "./redux/informations/informations.selectors";
import { Boards } from "./components/Boards";


export const App = () => {
  const isGameStarted = useSelector(informationsSelectors.currentAction).gameStarted

  return (
    <Box>
      <Header/>
      {!isGameStarted ? <Menu /> : <Boards/>}
    </Box>
  );
};

App.displayName = "AppComponent";
