import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store2";
// import { PersistGate } from "redux-persist/integration/react";
// import newStore from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const { store, persistor } = newStore();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
