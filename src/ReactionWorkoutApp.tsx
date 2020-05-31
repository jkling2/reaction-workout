import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./img/white-arrow.png";
import "./ReactionWorkoutApp.css";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingsPage from "./settings/SettingsPage";
import WorkoutPage from "./workout/WorkoutPage";
import { ReactionWorkoutContextProvider } from "./context/ReactionWorkoutContext";

function ReactionWorkoutApp() {
  return (
    <>
      <header>
        <Navbar bg="fg" variant="dark" expand="sm">
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
          <Navbar.Toggle/>
  <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item>
              <LinkContainer
                activeClassName="active"
                exact={true}
                to="/reaction-workout/settings"
              >
                <Nav.Link>{"Settings"}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer
                activeClassName="active"
                exact={true}
                to="/reaction-workout/workout"
              >
                <Nav.Link>{"Workout"}</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <main>
        <ReactionWorkoutContextProvider>
          <Switch>
            <Route path="/reaction-workout/settings" exact={true}>
              <SettingsPage />
            </Route>
            <Route path="/reaction-workout/workout" exact={true}>
              <WorkoutPage />
            </Route>
            <Route>
              <Redirect from="/" to="/reaction-workout/settings" />
            </Route>
          </Switch>
        </ReactionWorkoutContextProvider>
      </main>
    </>
  );
}

export default ReactionWorkoutApp;
