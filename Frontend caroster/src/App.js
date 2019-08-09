import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Event from "./Event";
import NewEvent from "./NewEvent";
import Home from "./Home";
import Registration from "./Registration";
import AddCar from "./AddCar";
// import UpdateCar from "./UpdateCar";
import Login from "./Login";
//import withAuth from "./withAuth";
import User from "./User";

import NotFoundPage from "./NotFoundPage";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/NewEvent" component={NewEvent} />
            <Route path="/Registration" component={Registration} />
            <Route path="/Event/:id" component={Event} />
            <Route path="/AddCar" component={AddCar} />
            <Route path="/Login" component={Login} />
            <Route path="/User" component={User} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
