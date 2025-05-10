import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import from 'react-dom/client'
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import taskReducer from "./taskSlice";
import "./index.css";

const store = configureStore({
  reducer: taskReducer,
});

// ✅ Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
