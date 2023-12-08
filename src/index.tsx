import React from 'react';
import ReactDOM from 'react-dom/client';
import router  from './app/router/router'
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import './index.css';

//import reduc
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './app/store/reducers'
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: true,
})

const persistor = persistStore(store);

//if you want purge store of redux use next line 

// persistor.flush().then(() => {
//   return persistor.purge();
// });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
) ;


reportWebVitals();