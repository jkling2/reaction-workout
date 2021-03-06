import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactionWorkoutApp from "./ReactionWorkoutApp";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "typeface-roboto";
import "./index.css";
import { ReactionWorkoutContextProvider } from "./context/ReactionWorkoutContext";

const mount = document.getElementById("root");

const app = (
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ReactionWorkoutContextProvider>
        <ReactionWorkoutApp />
      </ReactionWorkoutContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app, mount);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
