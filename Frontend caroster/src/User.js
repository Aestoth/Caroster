import React, { Component } from "react";
import Navbar from "./Navbar";
import "./User.css";
import UserInfos from "./UserInfos";
import backendURL from "./helpers/getBackendURL";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBFooter,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader
} from "mdbreact";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfos: this.props.location.state,
      show: false,
      modal: false
    };
  }

  logoutHandler = e => {
    this.props.history.replace("/");
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  deleteUser = e => {
    e.preventDefault();
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
    console.log("delete", this.props.location.state.user._id);
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="text-white ml-5">PROFIL</div>
          <div>
            <MDBBtn onClick={this.toggle} className="btn-sm" color="danger">
              Supprimer
            </MDBBtn>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>ATTENTION!</MDBModalHeader>
              <MDBModalBody>
                {" "}
                Le Profil d'utilisateur será supprimé{" "}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>
                  Annuler
                </MDBBtn>
                <MDBBtn onClick={this.deleteUser} color="primary">
                  Continuer
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBBtn onClick={this.logoutHandler} color="indigo btn-sm">
              Déconnexion
            </MDBBtn>
          </div>
        </nav>
        <MDBContainer className="mt-5 mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 mb-5">
              <div className="card shadow">
                <div className="card-header bg-info text-center text-white d-flex justify-content-center">
                  Mes événements
                </div>
                <MDBCard color="cyan lighten-5" text="" className="text-center">
                  <MDBCardBody>BARBECUE BOB</MDBCardBody>
                </MDBCard>
              </div>
              <div className="card shadow mt-5">
                <div className="card-header bg-info text-center text-white ">
                  Mes participantions
                </div>
                <MDBCard color="cyan lighten-5" className="text-center">
                  <MDBCardBody>ANNIVERSAIRE DUPONT</MDBCardBody>
                </MDBCard>
              </div>
              <div className="card shadow mt-5">
                <div className="card-header bg-info text-center text-white">
                  Mes voitures
                </div>
                <MDBCard color="cyan lighten-5" className="text-center">
                  <MDBCardBody>Golf blue</MDBCardBody>
                </MDBCard>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6  mb-5">
              <UserInfos
                _id={this.props.location.state.user._id}
                name={this.props.location.state.user.name}
                contact={this.props.location.state.user.contact}
                email={this.props.location.state.user.email}
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
