import React, { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./logo.svg";
import "./ReactionWorkoutApp.css";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingsPage from "./settings/SettingsPage";
import WorkoutPage from "./workout/WorkoutPage";
import {
  ReactionKind,
  ReactionWorkoutContext,
} from "./context/ReactionWorkoutContext";

function ReactionWorkoutApp() {
  const { kind, time } = useContext(ReactionWorkoutContext);
  return (
    <>
      <header>
        <Navbar bg="fg" variant="dark" expand="sm" collapseOnSelect>
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
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
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
                  {kind === ReactionKind.TIME && time === 0 ? (
                    <Nav.Link disabled>{"Workout"}</Nav.Link>
                  ) : (
                    <Nav.Link>{"Workout"}</Nav.Link>
                  )}
                </LinkContainer>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <main>
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
      </main>
    </>
  );
}

export default ReactionWorkoutApp;
