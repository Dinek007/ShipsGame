import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { informationsReducer } from './informations/informations.slice'

import storage from 'redux-persist/lib/storage'
import { StoreKeys } from './store.keys'
import { StoreType } from './store.types'
import { boardsReducer } from './boards/boards.slice'

const persistConfig = {
  key: "root",
  throttle: 1000,
  storage: storage,
  whitelist: [
  //here store to persist
  ],
  transforms: [],
};

export const reducers = {
  [StoreKeys.Informations]: informationsReducer,
  [StoreKeys.Boards] : boardsReducer
};

export type Store = StoreType<typeof reducers>

export default persistReducer(persistConfig, combineReducers(reducers))
