import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { ReduxCompatibleReducer } from 'redux-actions'
import { reducers } from './reducers'
const rootReducer = combineReducers(reducers)
const store = configureStore({ reducer: rootReducer })

export type Store = typeof store
export type StoreState = ReturnType<typeof rootReducer>
export type StoreDispatch = typeof store.dispatch

export type CreatedSelectors = {
    [Key in keyof StoreState]: (state: StoreState) => StoreState[Key];
  }

  export type StoreType<reducers extends StoreBasicType> = {
    [k in keyof reducers]: ReturnType<reducers[k]>
  }
  
  export interface StoreBasicType {
      [key: string]: ReduxCompatibleReducer<any, any>
    }
    
  