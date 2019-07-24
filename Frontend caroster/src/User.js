import React, { Component } from "react";
import Navbar from "./Navbar";
import "./User.css";
import UserInfos from "./UserInfos";
//import backendURL from "./helpers/getBackendURL";

import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from "mdbreact";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfos: this.props.location.state
    };
  }

  logoutHandler = e => {
    this.props.history.replace("/");
  };

  render() {
    console.log("idUser", this.props.location.state);
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="text-white">
            <i className="far fa-arrow-alt-circle-left fa-2x" />
          </div>
          <div className="ml-5 text-white">
            {this.props.location.state.user.name}
          </div>
          <div>
            <MDBBtn onClick={this.logoutHandler} color="indigo btn-sm">
              Déconnexion
            </MDBBtn>
          </div>
        </nav>
        <MDBContainer className="mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 mb-5">
              <div className="card shadow">
                <div className="card-header blue-grey darken-1 text-center text-white d-flex justify-content-center">
                  Mes événements
                </div>
                <MDBCard color="cyan lighten-5" text="" className="text-center">
                  <MDBCardBody>BARBECUE BOB</MDBCardBody>
                </MDBCard>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6  mb-5">
              {" "}
              <div className="card shadow">
                <div className="card-header bg-info text-center text-white d-flex justify-content-center">
                  Mes participantions
                </div>
                <MDBCard
                  color="mdb-color lighten-2"
                  text="white"
                  className="text-center"
                >
                  <MDBCardBody>ANNIVERSAIRE DUPONT</MDBCardBody>
                </MDBCard>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-center mt-4">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6  mb-5">
              {" "}
              <div className="card shadow">
                <div className="card-header bg-info text-center text-white d-flex justify-content-center">
                  Mes voitures
                </div>
                <MDBCard
                  color="mdb-color lighten-2"
                  text="white"
                  className="text-center"
                >
                  <MDBCardBody>Golf blue</MDBCardBody>
                </MDBCard>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 ">
              <div className="card shadow">
                <div className="card-header bg-info text-center text-white d-flex justify-content-center">
                  Mes infos
                </div>
                <UserInfos
                  _id={this.props.location.state.user._id}
                  name={this.props.location.state.user.name}
                  contact={this.props.location.state.user.contact}
                  email={this.props.location.state.user.email}
                />
              </div>
            </div>
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default User;
