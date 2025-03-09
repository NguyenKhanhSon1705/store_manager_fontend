// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import React from "react";
 
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store";
import GlobalStyles from "./components/globalStyles/GlobalStyles";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  // </StrictMode>
);
