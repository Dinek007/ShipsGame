import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import { configureStore } from '@reduxjs/toolkit'
import { createBrowserHistory } from 'history'
import persistStore from 'redux-persist/es/persistStore'


export const browserHistory = createBrowserHistory();

export default () => {
  const store = configureStore({
    reducer: reducers,
  })

  const persistor = persistStore(store)

  return {store, persistor}
}
