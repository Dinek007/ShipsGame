import { ActionCreatorsMapObject, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreKeys } from '../store.keys'

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export enum titles {
  welcome = "Welcome, select the game options !",
  pleaceShips = "Place ships to start the game !",
  playerTurn = "Your turn !",
  aiTurn = "Computer turn !",
  playerWin ="You win !",
  aiWin= "Ai win !"
}

export type currentActionsType = {
  palyerTurn: boolean,
  gameStarted: boolean,
  choosenShips: boolean,
  shootingAnimation: boolean 
}
export enum actionNames {
  palyerTurn= "palyerTurn",
  gameStarted= "gameStarted",
  choosenShips= "choosenShips",
  shootingAnimation= "shootingAnimation" 
}

export type gameOptionsType = {
  boardSize: number
  ships1: number
  ships2: number
  ships3: number
  ships4: number
}

export class InformationState {
  public title: string = titles.welcome;
  public currentActions: currentActionsType = {
    gameStarted: false,
    choosenShips: false,
    palyerTurn: false,
    shootingAnimation: false
  };
  public gameOptions:gameOptionsType = {
    boardSize: 10,
    ships4: 1,
    ships3: 2,
    ships2: 3,
    ships1: 4, 
  }
}

export const informationsSlice = createSlice({
  initialState: { ...new InformationState() },
  name: StoreKeys.Informations,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setCurrentAction: (state, action: PayloadAction<{actionName: string, value: boolean }>) => {
      state.currentActions[action.payload.actionName] = action.payload.value;
    },
    setGameOption: (state, action: PayloadAction<{optionName: string, value: number }>) => {
      const {optionName, value} = action.payload
      state.gameOptions[optionName] = value;
    },
  },
});

export const informationsActions = informationsSlice.actions
export const informationsReducer = informationsSlice.reducer

export type InformationsActions = ActionsType<typeof informationsActions>;