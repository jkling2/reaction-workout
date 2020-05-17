import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./img/favicon.svg";
import "./ReactionWorkoutApp.css";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingsPage from "./settings/SettingsPage";
import WorkoutPage from "./workout/WorkoutPage";
import { ReactionWorkoutContextProvider } from "./context/ReactionWorkoutContext";

function ReactionWorkoutApp() {
  return (
    <>
      <header>
        <Navbar bg="fg" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="spin-logo d-inline-block align-top"
            />
            &nbsp;&nbsp;ReactionWorkout
          </Navbar.Brand>
          <Nav>
            <Nav.Item>
              <LinkContainer
                activeClassName="active"
                exact={true}
                to="/settings"
              >
                <Nav.Link>{"Settings"}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer
                activeClassName="active"
                exact={true}
                to="/workout"
              >
                <Nav.Link>{"Workout"}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Navbar>
      </header>
      <main>
        <ReactionWorkoutContextProvider>
          <Switch>
            <Route path="/settings" exact={true}>
              <SettingsPage />
            </Route>
            <Route path="/workout" exact={true}>
              <WorkoutPage />
            </Route>
            <Route>
              <Redirect from="/" to="/settings" />
            </Route>
          </Switch>
        </ReactionWorkoutContextProvider>
      </main>
    </>
  );
}

export default ReactionWorkoutApp;
