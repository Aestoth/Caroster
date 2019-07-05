import React, { Component } from "react";
import { MDBBtn, MDBInput } from "mdbreact";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import backendURL from "./helpers/getBackendURL";

class form_add_voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomVoiture: "",
      sieges: "",
      infocomp: "",
      contact: "",
      adresse: "",
      date: "",
      horaire: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${backendURL()}/api/ajouter-voiture/`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Success", data);
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="container-fluid cover-container d-flex">
        <div className="row col-12 align-items-center justify-content-center flex-fill mx-auto ">
          <form onSubmit={this.handleSubmit} className="mx-auto">
            <div className="form-group col-12">
              <MDBInput
                type="text"
                label="Nom de la voiture"
                icon="car"
                className="mb-0"
                name="nomVoiture"
                value={this.state.nomVoiture}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-12">
              <MDBInput
                type="number"
                label="Sieges"
                icon="chair"
                className="mb-0"
                name="sieges"
                value={this.state.sieges}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-12 flex">
              <MDBInput
                type="text"
                label="Infos complémentaires"
                icon="pen"
                className="mb-0"
                name="infocomp"
                value={this.state.infocomp}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-12">
              <MDBInput
                type="text"
                label="Téléphone"
                icon="phone"
                className="mb-0"
                name="contact"
                value={this.state.contact}
                onChange={this.handleChange}
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
                className="mb-0"
                name="adresse"
                value={this.state.adresse}
                onChange={this.handleChange}
              />
            </div>
            <div className="md-form form-group col-12">
              <MDBInput
                type="date"
                icon="calendar"
                className="mb-2 textbox-n"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
              />
            </div>
            <div className="md-form form-group col-12">
              <MDBInput
                type="time"
                icon="clock"
                className="mb-2"
                name="horaire"
                value={this.state.horaire}
                onChange={this.handleChange}
              />
            </div>

            <div className="text-center mt-2">
              <Link to={"/Evenement"}>
                <MDBBtn className="text-uppercase text-white" type="cancel">
                  Annuler
                </MDBBtn>
              </Link>
              <Link to={"/Evenement"}>
                <MDBBtn className="text-uppercase text-white" type="submit">
                  Creer
                </MDBBtn>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default form_add_voiture;
