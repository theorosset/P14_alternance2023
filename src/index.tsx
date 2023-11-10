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


const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
) ;


reportWebVitals();