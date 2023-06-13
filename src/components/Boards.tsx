import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { BoardScene } from "../three/board/boardScene";
import { boardsSelectors } from "../redux/boards/boards.selectors";
import { informationsSelectors } from "../redux/informations/informations.selectors";
import {
  informationsActions,
  titles,
} from "../redux/informations/informations.slice";
import { useEffect, useRef, useState } from "react";
import { boardsActions, directions, gameStatuses } from "../redux/boards/boards.slice";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PaperImg from "/paper.png";
import { TextureLoader } from "three";
import steelPic from "../assets/steel.jpg";

export const Boards = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const playerBoardData = useSelector(boardsSelectors.playerBoardData);
  const playerShips = useSelector(boardsSelectors.playerShips);

  const aiBoardData = useSelector(boardsSelectors.aiBoardData);
  const aiShips = useSelector(boardsSelectors.aiShips);

  const [bulletPlayerFired, setBulletPlayerFired] = useState(false);
  const [bulletAiFired, setBulletAiFired] = useState(false);

  const bulletRefPlayer = useRef();
  const bulletRefAi = useRef();

  const shipToFill = useSelector(boardsSelectors.shipToFill);

  const gameStatus = useSelector(boardsSelectors.gameStatus);
  const isSecondAnimation =
    gameStatus === gameStatuses.playerSecondAnimation ||
    gameStatus === gameStatuses.aiSecondAnimation;

  const points = useSelector(boardsSelectors.getPoints);

  useEffect(() => {
    if (points.maxPoints <= points.playerPionts) {
      dispatch(informationsActions.setTitle(titles.playerWin));
    }

    if (points.maxPoints <= points.aiPoints) {
      dispatch(informationsActions.setTitle(titles.aiWin));
    }

    if (gameStatus === gameStatuses.playerTurn) {
      dispatch(informationsActions.setTitle(titles.playerTurn));
    }
    if (gameStatus === gameStatuses.aiAnimation) {
      dispatch(informationsActions.setTitle(titles.aiTurn));
      dispatch(boardsActions.aiHit({}));
    }
  }, [gameStatus]);

  useEffect(() => {
    if (
      gameStatus === gameStatuses.playerAnimation ||
      gameStatus === gameStatuses.aiSecondAnimation
    ) {
      console.log("start", gameStatus);

      fireBullet(bulletRefPlayer, bulletPlayerFired, setBulletPlayerFired);
    }
    if (
      gameStatus === gameStatuses.aiAnimation ||
      gameStatus === gameStatuses.playerSecondAnimation
    ) {
      console.log("start", gameStatus);

      fireBullet(bulletRefAi, bulletAiFired, setBulletAiFired);
    }
  }, [gameStatus]);

  const fireBullet = (bulletRefName, bulletFired, setBulletFired) => {
    if (!bulletFired) {
      setBulletFired(true);
      if (bulletRefName.current) {
        bulletRefName.current.position.x = 0; // Reset pozycji kuli
      }
    }
  };

  const [checked, setChecked] = useState(true);
  const [switchLabel, setSwitchLabel] = useState(directions.column);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) {
      dispatch(boardsActions.setShipToFillDirection(directions.row));
      setSwitchLabel(directions.row);
    } else {
      dispatch(boardsActions.setShipToFillDirection(directions.column));
      setSwitchLabel(directions.column);
    }
  };

  const flameTexture = new TextureLoader().load(steelPic);

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%,0)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        top: "0vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          width: "50vw",
          height: "100vh",
          // backgroundColor: "rgba(255,0,0,20%)",
        }}
      >
        <BoardScene
          boardData={playerBoardData}
          playerShips={playerShips}
          isPlayer={true}
          bulletRef={bulletRefPlayer}
          bulletFired={bulletPlayerFired}
          setBulletFired={setBulletPlayerFired}
          fireBullet={fireBullet}
          isSecondAnimation={isSecondAnimation}
          flameTexture={flameTexture}
        />
      </Box>

      <Box
        sx={{
          width: "50vw",
          height: "100vh",
          // backgroundColor: "rgba(0,255,0,20%)",
        }}
      >
        <BoardScene
          boardData={aiBoardData}
          playerShips={aiShips}
          isPlayer={false}
          bulletRef={bulletRefAi}
          bulletFired={bulletAiFired}
          setBulletFired={setBulletAiFired}
          fireBullet={fireBullet}
          isSecondAnimation={isSecondAnimation}
          flameTexture={flameTexture}
        />
      </Box>

      <FormGroup
        sx={{
          position: "absolute",
          top: "30vh",
          backgroundImage: `url(${PaperImg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "30px",
          border: "3px solid #D2B48C",
          borderRadius: "10px",
        }}
      >
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label={switchLabel}
          disabled={shipToFill ? false : true}
        />
        <Typography variant="h5">
          {" "}
          Player Points: {points.playerPionts}{" "}
        </Typography>
        <Typography variant="h5"> Ai Points: {points.aiPoints} </Typography>
        <Typography variant="h5">
          {" "}
          Points to win: {points.maxPoints}{" "}
        </Typography>
      </FormGroup>
    </Box>
  );
};
