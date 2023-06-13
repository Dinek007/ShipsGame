import {
  ActionCreatorsMapObject,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { StoreKeys } from "../store.keys";
import {
  BoardConstructor,
  getRandomNumber,
  getXandYfromCubeNames,
} from "./boardConstructor";
import {
  informationsActions,
  titles,
} from "../informations/informations.slice";
import { useDispatch } from "react-redux";

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export type BoardDataType = Array<{
  x: number;
  y: number;
  id: string;
  status: string;
}>;

export enum directions {
  row = "row",
  column = "column",
}

export type ShipsDataType = {
  x: number;
  y: number;
  id: string;
  status: string;
  length: number;
  direction: directions;
  cubes?: string[]
  showShip?: boolean
}[];

export enum cubeStatuses {
  New = "new",
  filled = "filled",
  aiFilled = "aiFilled",
  missed = "missed",
  hit = "hit",
}

export enum shipStatuses {
  New = "new",
  AiNew = "AiNew",
  Arrived = "Arrived",
}

export type pointsType = {
  maxPoints: number;
  playerPionts: number;
  aiPoints: number;
};

export enum gameStatuses {
  fillShips = "fillShips",
  playerTurn = "playerTurn",
  playerAnimation = "playerAnimation",
  playerSecondAnimation = "playerSecondAnimation",
  aiAnimation = "aiAnimation",
  aiSecondAnimation = "aiSecondAnimation"
}

export class BoardsState {
  public playerBoard: BoardDataType = [];
  public aiBoard: BoardDataType = [];
  public shipsToFill: number[] = [];
  public playerShips: ShipsDataType = [];
  public aiShips: ShipsDataType = [];
  public shipToFillDirection: directions = directions.column;
  public secondAnimationXandY:{x: number, y: number} = {x: 0, y: 0}
  public gameStatuses: gameStatuses = gameStatuses.fillShips
  public points: pointsType = {
    maxPoints: 0,
    playerPionts: 0,
    aiPoints: 0,
  };
}

export const boardsSlice = createSlice({
  initialState: { ...new BoardsState() },
  name: StoreKeys.Boards,
  reducers: {
    setSecondAnimationXandY: (state, action: PayloadAction<{x: number, y: number}>) => {
      state.secondAnimationXandY = action.payload;
    },
    setGameStatus: (state, action: PayloadAction<gameStatuses>) => {
      state.gameStatuses = action.payload;
    },
    setShipToFillDirection: (state, action: PayloadAction<directions>) => {
      state.shipToFillDirection = action.payload;
    },
    addPoint: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state.points.playerPionts++;
      else state.points.aiPoints++;
    },
    setStartPoints: (state, action: PayloadAction<number>) => {
      state.points.maxPoints = action.payload;
    },

    setShipsToFill: (state, action: PayloadAction<number[]>) => {
      state.shipsToFill = action.payload;
    },
    setPlayerBoard: (state, action: PayloadAction<number>) => {
      state.playerBoard = BoardConstructor(action.payload, 0.4);
      state.aiBoard = BoardConstructor(action.payload, 0.4);
    },
    playerHit: (state, action: PayloadAction<string>) => {
      const newCubes = state.aiBoard.map((cube) => {
        if (cube.id === action.payload) {
          if (cube.status === cubeStatuses.aiFilled) {
            state.points.playerPionts++;
            state.secondAnimationXandY={x: cube.x, y: cube.y}

            return { ...cube, status: cubeStatuses.hit };
          }
          if (cube.status === cubeStatuses.New){
            state.secondAnimationXandY={x: cube.x, y: cube.y}
            return { ...cube, status: cubeStatuses.missed };
          }
        }
        return cube;
      });
      state.aiBoard = newCubes;
      state.gameStatuses = gameStatuses.playerAnimation
    },
    aiHit: (state, _action) => {
      let randomCube: {
        x: number;
        y: number;
        id: string;
        status: string;
      };
      for (let i = 0; i < 1; i++) {
        const notHitedOrMissedCubes = state.playerBoard.filter((cube) => {
          return (
            cube.status !== cubeStatuses.hit &&
            cube.status !== cubeStatuses.missed
          );
        });
        const randomCubeIndex: number = getRandomNumber(
          0,
          notHitedOrMissedCubes.length - 1
        );
        randomCube = notHitedOrMissedCubes[randomCubeIndex];
      }
      const cubeStatus =
        randomCube.status === cubeStatuses.filled
          ? cubeStatuses.hit
          : cubeStatuses.missed;

      if (cubeStatus === cubeStatuses.hit) state.points.aiPoints++;

      const newCube = { ...randomCube, status: cubeStatus };


      const indexToRemove = state.playerBoard.findIndex((cube) => {
        return cube.id === randomCube.id;
      });
      state.playerBoard.splice(indexToRemove, 1);
      state.secondAnimationXandY={x: newCube.x, y: newCube.y}
      state.playerBoard = [...state.playerBoard, newCube];
    },
    setShipArrived: (state, action: PayloadAction<string>) => {
      const newShips = state.playerShips.map((ship) => {
        if (ship.id === action.payload) {
          if (ship.status === shipStatuses.New)
            return { ...ship, status: shipStatuses.Arrived };
        }
        return ship;
      });
      state.playerShips = newShips;
    },
    setPlayerShips: (
      state,
      action: PayloadAction<{
        direction: directions;
        cubeNames: string[];
      }>
    ) => {
      const { cubeNames, direction } = action.payload;
      // if cube are filled return
      const areFilledCubes = cubeNames.filter((item) => {
        const cube = state.playerBoard.find((cube) => {
          return item === cube.id;
        });
        return cube.status === cubeStatuses.filled;
      });
      if (areFilledCubes.length) return;

      // change cubes status to filled
      cubeNames.forEach((cubeName) => {
        const index = state.playerBoard.findIndex((cube) => {
          return cubeName === cube.id;
        });
        state.playerBoard.splice(index, 1, {
          ...state.playerBoard[index],
          status: cubeStatuses.filled,
        });
      });

      // find ship positions from cubes positions
      const shipsToFillLength = state.shipsToFill.length;
      const lastShipInShipsToFill = state.shipsToFill.pop();

      if (!state.shipsToFill.length) state.gameStatuses = gameStatuses.playerTurn;

      const shipXandY = getXandYfromCubeNames(
        cubeNames,
        direction,
        state.playerBoard,
        lastShipInShipsToFill
      );

      state.playerShips = [
        ...state.playerShips,
        {
          x: shipXandY.x,
          y: shipXandY.y,
          id: `ship${shipsToFillLength}`,
          status: shipStatuses.New,
          length: lastShipInShipsToFill,
          direction: direction,
        },
      ];
    },
    setAiShips: (
      state,
      action: PayloadAction<{ ships: number[]; boardSize: number }>
    ) => {
      const { boardSize, ships } = action.payload;
      let shipsToFill: ShipsDataType = [];
      let returne = false;
      let cubesToControl = [];
      let tries = 0
      for (let s = 0; s < ships.length; s++) {

        if(tries === 1000) {
          cubesToControl = []
          tries = 0
          shipsToFill=[]
          returne = true;
          s = -1
          const newState = state.aiBoard.map((item)=>{
            if(item.status === cubeStatuses.aiFilled){
              return {...item, status: cubeStatuses.New}
            } else return item
          })

          state.aiBoard = newState
          continue
        }

        tries++
        returne = false;
        const ship = ships[s];

        // get random cubes for one ship
        const randomDirection = getRandomNumber(0, 1);
        const direction = randomDirection ? directions.row : directions.column;
        let cubes = [];
        if (direction === directions.row) {
          const randomX = getRandomNumber(1, boardSize - ship);
          const randomY = getRandomNumber(1, boardSize);
          for (let i = 0; i < ship; i++) {
            const cube = cubesToControl.find((cube) => {
              return `box${randomY}_${randomX + i}` === cube;
            });

            if (cube) {
              s--;
              returne = true;
            }
          }
          for (let i = 0; i < ship; i++) {
            cubes.push(`box${randomY}_${randomX + i}`);
          }
        } else if (direction === directions.column) {
          const randomX = getRandomNumber(1, boardSize);
          const randomY = getRandomNumber(1, boardSize - ship);
          for (let i = 0; i < ship; i++) {
            const cube = cubesToControl.find((cube) => {
              return `box${randomY + i}_${randomX}` === cube;
            });
            if (cube) {
              s--;
              returne = true;
            }
          }
          for (let i = 0; i < ship; i++) {
            cubes.push(`box${randomY + i}_${randomX}`);
          }
        }

        if (returne) continue;
        cubesToControl = [...cubesToControl, ...cubes];
        // set cubes statuses as ai filled
        cubes.forEach((cubeName) => {
          const index = state.aiBoard.findIndex((cube) => {
            return cubeName === cube.id;
          });
          state.aiBoard.splice(index, 1, {
            ...state.aiBoard[index],
            status: cubeStatuses.aiFilled,
          });
        });
        // put ships to store
        const shipsFromCubesPositions = getXandYfromCubeNames(
          cubes,
          direction,
          state.aiBoard,
          ship
        );
        shipsToFill.push({
          x: shipsFromCubesPositions.x,
          y: shipsFromCubesPositions.y,
          id: `ship${shipsFromCubesPositions.x + shipsFromCubesPositions.y}`,
          status: shipStatuses.New,
          length: ship,
          direction: direction,
          cubes: cubes
        });
      
      }
      state.aiShips = shipsToFill;
    },
  },
});

export const boardsActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;

export type BoardsActions = ActionsType<typeof boardsActions>;
