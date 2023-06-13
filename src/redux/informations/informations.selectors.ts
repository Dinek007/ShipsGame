import { createSelector } from "@reduxjs/toolkit";
import { StoreKeys } from "../store.keys";
import { CreatedSelectors, StoreState } from "../store.types";

const informationsSlice: CreatedSelectors[StoreKeys.Informations] = (
  state: StoreState
) => state[StoreKeys.Informations];

const title = createSelector(
  informationsSlice,
  (reducerState) => reducerState.title
);

const currentAction = createSelector(
  informationsSlice,
  (reducerState) => reducerState.currentActions
);

const gameOptions = createSelector(
  informationsSlice,
  (reducerState) => reducerState.gameOptions
);

export const informationsSelectors = {
  title,
  currentAction,
  gameOptions
};
