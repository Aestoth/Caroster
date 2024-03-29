import React, { Component } from "react";
import Navbar from "./Navbar";
import "./User.css";
import UserInfos from "./UserInfos";
import UserEvents from "./UserEvents";

import backendURL from "./helpers/getBackendURL";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBFooter
} from "mdbreact";

class User extends Component {
  _isMounted: false;
  constructor(props) {
    super(props);
    this.state = {
      userInfos: this.props.location.state,
      users: [],
      eventsUser: []
    };
  }

  logoutHandler = e => {
    this.props.history.replace("/");
  };

  componentDidMount() {
    this.forceUpdate();
    this._isMounted = true;
    this.fetchUsers();
    this.fetchEventsUsers();
  }

  fetchUsers = () => {
    fetch(`${backendURL()}/api/user/${this.props.location.state.user._id}`)
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
    console.log("uptd", this.state.users);
  };

  fetchEventsUsers = () => {
    fetch(
      `${backendURL()}/api/user/${this.props.location.state.user._id}/userEvent`
    )
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ eventsUser: data });
        }
        console.log("evntUser", this.state.eventsUser);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  deleteUser = event => {
    event.preventDefault();
    fetch(`${backendURL()}/api/user/${this.props.location.state.user._id}`, {
      method: "DELETE",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log(data.result);
        this.props.history.push("/");
      });
    });
  };

  render() {
    console.log("uptd", this.state.users.email);
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="text-white ml-5">PROFIL</div>
          <div>
            <MDBBtn onClick={this.logoutHandler} color="indigo btn-sm">
              Déconnexion
            </MDBBtn>
          </div>
        </nav>
        <MDBContainer className="mt-5 mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 mb-5">
              <UserEvents
                usersId={this.state.users._id}
                fetchEventsUsers={() => this.fetchEventsUsers()}
                eventsUser={this.state.eventsUser}
                usersEmail={this.state.users.email}
              />
              <div className="card shadow mt-5 mb-2">
                <div className="card-header bg-info text-center text-white ">
                  Mes participantions
                </div>
                <MDBCard className="text-center">
                  <MDBCardBody>ANNIVERSAIRE DUPONT</MDBCardBody>
                </MDBCard>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6  mb-5">
              <UserInfos
                fetchUsers={() => this.fetchUsers()}
                users={this.state.users}
                deleteUser={() => this.deleteUser(event)}
              />
            </div>
          </div>
        </MDBContainer>
        <MDBFooter color="blue" className="font-small pt-4 mt-5">
          <MDBContainer fluid className="text-center text-md-center">
            <h5 className="title">A Propos</h5>
            <p>
              Caroster.io est une façon simple et gratuite d'organiser du
              covoiturage avec un groupe de personnes pour se rendre a un
              événement, un week-end, une fête, un tournoi ou juste quelque
              part. Seulement 3 cliques et 1 e-mail suffisent. Caroster.io est
              fait avec le but de vous simplifier vos covoiturages de groupe.
            </p>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="https://www.MDBootstrap.com"> Caroster </a>
            </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    );
  }
}

export default User;
