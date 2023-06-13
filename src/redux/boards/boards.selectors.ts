import { createSelector } from "@reduxjs/toolkit";
import { StoreKeys } from "../store.keys";
import { CreatedSelectors, StoreState } from "../store.types";
import { BoardDataType } from "./boards.slice";

const boardsSlice: CreatedSelectors[StoreKeys.Boards] = (state: StoreState) =>
  state[StoreKeys.Boards];

const playerBoardData = createSelector(
  boardsSlice,
  (reducerState) => reducerState.playerBoard
);

const aiBoardData = createSelector(
  boardsSlice,
  (reducerState) => reducerState.aiBoard
);

const shipToFillDirection = createSelector(
  boardsSlice,
  (reducerState) => reducerState.shipToFillDirection
);

const shipToFill = createSelector(
  boardsSlice,
  (reducerState) =>
    reducerState.shipsToFill[reducerState.shipsToFill.length - 1]
);

const playerShips = createSelector(
  boardsSlice,
  (reducerState) => reducerState.playerShips
);

const aiShips = createSelector(
  boardsSlice,
  (reducerState) => reducerState.aiShips
);

const gameStatus = createSelector(
  boardsSlice,
  (reducerState) => reducerState.gameStatuses
);

const getPoints = createSelector(
  boardsSlice,
  (reducerState) => reducerState.points
);

const getSecondAnimationXandY = createSelector(
  boardsSlice,
  (reducerState) => reducerState.secondAnimationXandY
);

const findCubeByName = (cubeName, isPlayer) =>
  createSelector(
    boardsSlice,
    (reducerState) => {
      let boardState: BoardDataType
      if(isPlayer) boardState = reducerState.playerBoard
      else boardState = reducerState.aiBoard

      return boardState.find((cube)=>{
        return cube.id === cubeName
      })
    }
  );

const showAiShip = createSelector(
  aiShips,
  (aiShips) => {
    return aiShips.map(()=>{

    })


    return 
  }
)

export const boardsSelectors = {
  playerBoardData,
  aiBoardData,
  shipToFill,
  shipToFillDirection,
  playerShips,
  aiShips,
  gameStatus,
  findCubeByName,
  getPoints,
  getSecondAnimationXandY,
  showAiShip
};
