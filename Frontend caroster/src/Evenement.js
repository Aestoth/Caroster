import React, { Component } from "react";
import "./Evenement.css";
import Navbar from "./Navbar";

import ListeDAttente from "./ListeDAttente";
import Voiture from "./Voiture";
import backendURL from "./helpers/getBackendURL";

import {
  MDBFooter,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBModalHeader,
  MDBModal,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evenement: false,
      mondal: false
    };
  }

  componentDidMount() {
    fetch(`${backendURL()}/api/event/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("event in fetch", data);
        this.setState({ evenement: data });
      });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  deleteEvenement = e => {
    e.preventDefault();

    fetch(
      `http://localhost:3000/api/event/delete/${this.props.match.params.id}`,
      {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      response.json().then(data => {
        console.log(data.result);
        this.props.history.push("/");
      });
    });
  };

  render() {
    if (!this.state.evenement) return "loading";
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="text-white">
            <i className="far fa-arrow-alt-circle-left fa-2x" />
          </div>

          <div key={this.state.evenement._id} className="ml-5 text-white">
            <h5>{this.state.evenement.titre}</h5>
          </div>

          <div>
            <MDBBtn color="indigo btn-sm">
              <MDBIcon icon="plus" size="2x" className="mr-2 " />
              <MDBIcon icon="car" size="2x" />
            </MDBBtn>
          </div>
        </nav>
        <div className="container">
          <div className="row d-flex justify-content-center mt-4">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
              <ListeDAttente />
            </div>
            <div className="col-md-6 marginTable col-sm-6 col-lg-6 col-xl-6">
              <Voiture changeDiv={() => this.changeDiv()} />
            </div>
          </div>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <MDBBtn color="danger" onClick={this.toggle}>
            Supprimer Evenement
          </MDBBtn>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
            <MDBModalHeader toggle={this.toggle}>
              {this.state.evenement.titre}
            </MDBModalHeader>
            <MDBModalBody>Attention l'evenement será supprimer</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>
                Close
              </MDBBtn>
              <MDBBtn onClick={this.deleteEvenement} color="primary">
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </div>
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
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
} //Fin de la class

export default Evenement;
