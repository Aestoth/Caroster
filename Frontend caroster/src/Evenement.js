import React, { Component } from "react";
import "./Evenement.css";
import Navbar from "./Navbar";

import ListeDAttente from "./ListeDAttente";
import Voiture from "./Voiture";
import backendURL from "./helpers/getBackendURL";

import { MDBFooter, MDBContainer, MDBBtn, MDBIcon } from "mdbreact";

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evenement: []
    };
  }

  componentDidMount() {
    fetch(`${backendURL()}/api/event/${this.state.evenement._id}`)
      .then(response => response.json())
      .then(data => this.setState({ evenement: data.result }));
  }

  render() {
    console.log(this.state.evenement);
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="text-white">
            <i className="far fa-arrow-alt-circle-left fa-2x" />
          </div>
          {this.state.evenement.map(({ _id, titre }) => (
            <div key={_id} className="ml-5 text-white">
              <h5>{titre}</h5>
            </div>
          ))}
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
