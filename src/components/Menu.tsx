import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { informationsSelectors } from "../redux/informations/informations.selectors";
//@ts-ignore
import PaperImg from "/paper.png";
import {
  actionNames,
  informationsActions,
  titles,
} from "../redux/informations/informations.slice";
import { boardsActions } from "../redux/boards/boards.slice";
import { useState } from "react";

export const Menu = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const optionsArray = [
    {
      name: "Board Size: ",
      buttons: [10, 11, 12, 13],
      categoryName: "boardSize",
    },
    { name: "1 Size Ships: ", buttons: [1, 2, 3, 4], categoryName: "ships1" },
    { name: "2 Size Ships: ", buttons: [1, 2, 3, 4], categoryName: "ships2" },
    { name: "3 Size Ships: ", buttons: [1, 2, 3], categoryName: "ships3" },
    { name: "4 Size Ships: ", buttons: [1, 2, 3], categoryName: "ships4" },
  ];

  const gameOptions = useSelector(informationsSelectors.gameOptions);

  const optionButtonClick = (optionName: string, value: number) => {
    if(optionName === "boardSize"){
      if(value === 10){
        if(gameOptions.ships4 > 1){
          dispatch(informationsActions.setGameOption({optionName: "ships4", value: 1 }));
        } if(gameOptions.ships3 > 2){
          dispatch(informationsActions.setGameOption({optionName: "ships3", value: 2 }));
        }
      } else if(value === 11){
        if(gameOptions.ships4 > 1){
          dispatch(informationsActions.setGameOption({optionName: "ships4", value: 1 }));
        } 
      } else if(value === 12){
        if(gameOptions.ships4 > 2){
          dispatch(informationsActions.setGameOption({optionName: "ships4", value: 2 }));
        }
      }
    }

    dispatch(informationsActions.setGameOption({ optionName, value }));
  };

  const startGameButtonClick = (actionName: string, value: boolean) => {
    dispatch(informationsActions.setCurrentAction({ actionName, value }));
    dispatch(informationsActions.setTitle(titles.pleaceShips));
    dispatch(boardsActions.setPlayerBoard(gameOptions.boardSize));
    let shipsArray = [];
    for (let i = 0; i < gameOptions.ships1; i++) {
      shipsArray.push(1);
    }
    for (let i = 0; i < gameOptions.ships2; i++) {
      shipsArray.push(2);
    }
    for (let i = 0; i < gameOptions.ships3; i++) {
      shipsArray.push(3);
    }
    for (let i = 0; i < gameOptions.ships4; i++) {
      shipsArray.push(4);
    }
    dispatch(boardsActions.setShipsToFill(shipsArray));
    dispatch(
      boardsActions.setAiShips({
        ships: shipsArray,
        boardSize: gameOptions.boardSize,
      })
    );
    dispatch(
      boardsActions.setStartPoints(
        gameOptions.ships1 * 1 +
          gameOptions.ships2 * 2 +
          gameOptions.ships3 * 3 +
          gameOptions.ships4 * 4
      )
    );
  };

  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%,0)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        top: "18vh",
        width: "100vw",
        height: "82vh",
        backgroundImage: `url(${PaperImg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {optionsArray.map((item) => {
          return (
            <Box
              sx={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ marginRight: "50px" }} variant="h2">
                {" "}
                {item.name}{" "}
              </Typography>

              {item.buttons.map((number) => {
                const numberName =
                  item.name === "Board Size: "
                    ? number + " x " + number
                    : number;
                const borderStyle =
                  gameOptions[item.categoryName] === number
                    ? "2px solid black"
                    : "";
                let disabled;
                if (
                  gameOptions.boardSize === 10 &&
                  item.categoryName === "ships4" &&
                  number > 1
                ) disabled = true;
                if (
                  gameOptions.boardSize === 10 &&
                  item.categoryName === "ships3" &&
                  number > 2
                ) disabled = true;

                if (
                  gameOptions.boardSize === 11 &&
                  item.categoryName === "ships4" &&
                  number > 1
                ) disabled = true;

                if (
                  gameOptions.boardSize === 12 &&
                  item.categoryName === "ships4" &&
                  number > 2
                ) disabled = true;

                 
                return (
                  <Button
                    disabled={disabled}
                    onClick={() => optionButtonClick(item.categoryName, number)}
                    sx={{
                      backgroundColor: disabled? "rgba(0,0,0, 20%)" : "",
                      minWidth: "100px",
                      margin: "5px",
                      border: borderStyle,
                    }}
                  >
                    <Typography variant="h2"> {numberName}</Typography>
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Button
        onClick={() => startGameButtonClick(actionNames.gameStarted, true)}
        sx={{
          marginTop: "60px",
          backgroundColor: "#d9996b",
          backgroundOpacity: "50%",
          border: "2px solid black",
        }}
      >
        <Typography variant="h2"> Play </Typography>
      </Button>
    </Box>
  );
};
