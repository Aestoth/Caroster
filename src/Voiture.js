import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBFooter,
  Button
} from "mdbreact";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      siege: "",
      contact: "",
      infoComp: "",
      adresse: "",
      date: "",
      horaire: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/post/voiture", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Success" + data);
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <Link to="/Evenement">
            <Button className="text-white">
              <i className="far fa-arrow-alt-circle-left fa-2x" />
            </Button>
          </Link>
        </nav>
        <div className="container-fluid cover-container d-flex">
          <div className="row col-12 align-items-center justify-content-center flex-fill mx-auto ">
            <form onSubmit={this.handleSubmit} className="mx-auto">
              <div className="form-group col-12">
                <MDBInput
                  type="text"
                  label="Nom de la voiture"
                  icon="car"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                  name="nom"
                  value={this.state.nom}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col-12">
                <MDBInput
                  type="number"
                  label="Sièges"
                  icon="chair"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                  name="siege"
                  value={this.state.siege}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col-12">
                <MDBInput
                  type="text"
                  label="Contact"
                  icon="phone"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                  name="contact"
                  value={this.state.contact}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group col-12">
                <MDBInput
                  type="text"
                  label="Notes"
                  icon="pen"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                  name="contact"
                  value={this.state.infoComp}
                  onChange={this.handleInputChange}
                />
              </div>
              <h6 className="text-center text-uppercase mt-5">
                Lieu de rendez-vous
              </h6>
              <div className="form-group col-12">
                <MDBInput
                  type="text"
                  label="Adresse"
                  icon="map-marker-alt"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                  name="adresse"
                  value={this.state.adresse}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="md-form form-group col-12">
                <MDBInput
                  type="date"
                  icon="calendar"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-2"
                  name="date"
                  value={this.state.date}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="md-form form-group col-12">
                <MDBInput
                  type="time"
                  icon="clock"
                  format="hh:mm"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-2"
                  name="horaire"
                  value={this.state.horaire}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="text-center mt-2">
                <MDBBtn className="text-uppercase text-white" type="cancel">
                  Annuler
                </MDBBtn>

                <MDBBtn className="text-uppercase text-white" type="submit">
                  Creer
                </MDBBtn>
              </div>
            </form>
          </div>
        </div>
        <MDBFooter color="blue" className="font-small pt-4 mt-5">
          <MDBContainer fluid className="text-md-left">
            <MDBRow className="justify-content-center">
              <MDBCol sm="6">
                <h2 className="title text-center">A propos</h2>
                <p className="text-center">
                  caroster.io est une façon simple et gratuite d'organiser du
                  covoiturage avec un groupe de personne pour se rendre à un
                  événement, un week-end, une fête, un tournoi ou juste quelque
                  part. Seulement, 3 cliques et 1 e-mail suffisent. caroster.io
                  est fait avec dans le but de vous simplifier vos covoiturages
                  de groupe.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="footer-copyright py-3">
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

export default Voiture;
