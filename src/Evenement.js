import React, { Component } from "react";
import "./Evenement.css";
import Navbar from "./Navbar";
import { MDBBtn, MDBInput, MDBIcon } from "mdbreact";
import { MDBFooter, MDBContainer } from "mdbreact";

class Evenement extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        id: 1,
        nom: "",
        email: ""
      },
      listeVoiture: []
    };
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="text-white">
            <i className="far fa-arrow-alt-circle-left fa-2x" />
          </div>
          <div className="ml-5 text-white">
            <h5>Nom événement</h5>
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
            <div className="col-md-5 col-sm-8 col-lg-5">
              <div className="card shadow">
                <div className="card-header bg-info text-center text-white">
                  <i className="fas fa-list mr-2" />
                  Liste d'attente
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-5 marginTable col-sm-8 col-lg-5 col-xl-5">
              <div className="card shadow">
                <div className="card-header bg-info text-white text-center">
                  <i className="fas fa-car mr-2" />
                  Non de la voiture
                </div>

                <form className="form-inline mt-1 d-flex justify-content-center">
                  <div>
                    <MDBInput label="Telephone" outline icon="phone" />
                      <MDBInput type="date"  outline icon="calendar-alt" />
                    <MDBInput label="Adresse" outline icon="map-marker-alt" />
                    <MDBInput label="Info complémentaire" outline icon="comment-alt" />
                  </div>
                </form>

                <ul className="list-group list-group-flush mt-2">
                  <li className="list-group-item active border border-white">
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                  <li className="list-group-item active border border-white">
                    {" "}
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                  <li className="list-group-item active border border-white">
                    {" "}
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                </ul>
              </div>
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
              <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
            </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    );
  }
} //Fin de la class

export default Evenement;
