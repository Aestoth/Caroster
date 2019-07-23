import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Evenement from "./Evenement";
import CreerEvenement from "./CreerEvenement";
import Acceuil from "./Acceuil";
import Inscription from "./Inscription";
import AjouterVoiture from "./AjouterVoiture";
import ModifierVoiture from "./ModifierVoiture";
import Login from "./Login";
import withAuth from "./withAuth";
import User from "./User";

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
            <Route path="/Evenement/:id" component={Evenement} />
            <Route path="/Ajouter-voiture" component={AjouterVoiture} />
            <Route path="/ModifierVoiture/:id" component={ModifierVoiture} />
            <Route path="/Connexion" component={Login} />
            <Route path="/User" component={withAuth(User)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
