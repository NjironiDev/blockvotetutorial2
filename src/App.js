import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "./global.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Home from "./Components/Home";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";

// images
import BlockVoteLogo from "./assets/blockvotelogo.svg";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  return (
    <Router>
      <nav>
        <div className="nav-container">
          <li>
            <a href="/">
              <img src={BlockVoteLogo} className="logo" />
            </a>
          </li>

          <ul className="nav-links">
            <li>
              <a href="/NewPoll">New Poll</a>
            </li>
            <li>
              <a href="#" onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login" : window.accountId}
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home changeCandidates={changeCandidatesFunction} />
        </Route>
        <Route exact path="/PollingStation">
          <PollingStation />
        </Route>
        <Route exact path="/NewPoll">
          <NewPoll />
        </Route>
      </Switch>
    </Router>
  );
}
