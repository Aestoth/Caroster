import React, { Component } from "react";
import "react-devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Evenement from "./Evenement";
import CreerEvenement from "./CreerEvenement";
import Acceuil from "./Acceuil";
import Inscription from "./Inscription";
import Voiture from "./Voiture";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Acceuil} />
            <Route path="/CreerEvenement" component={CreerEvenement} />
            <Route path="/Inscription" component={Inscription} />
            <Route path="/Evenement" component={Evenement} />
            <Route path="/Voiture" component={Voiture} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
