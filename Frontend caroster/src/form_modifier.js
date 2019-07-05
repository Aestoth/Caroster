import React, { Component } from "react";
import { MDBBtn, MDBInput } from "mdbreact";
import "bootstrap/dist/css/bootstrap.css";
import { withRouter } from "react-router-dom";
import backendURL from "./helpers/getBackendURL";

class FormUpdate extends Component {
  constructor(props) {
    super(props);
    console.log("props modifier", props);
    this.state = {
      nomVoiture: this.props.nomVoiture,
      sieges: this.props.sieges,
      infocomp: this.props.infocomp,
      telephone: this.props.telephone,
      adresse: this.props.adresse,
      date: this.props.date,
      horaire: this.props.horaire
    };
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    console.log(this.props.match.params.id);
    console.log("test", this.state);
    e.preventDefault();
    fetch(`${backendURL()}/api/voiture/update/${this.props.match.params.id}`, {
      method: "PUT",
      body: JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        res.json().then(data => {
          console.log("da5", data);
        });
        return res;
      })
      .catch(err => err);

    this.props.history.push("/Evenement");
  };

  handleDelete = e => {
    console.log("test", this.state);
    e.preventDefault();
    fetch(
      `http://localhost:3000/api/voiture/delete/${this.props.match.params.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state)
      }
    )
      .then(res => res.json())
      .then(res => console.log(res));

    this.props.history.push("/Evenement");
  };

  render() {
    if (typeof this.props.id === undefined) return "loading";
    console.log("state form", this.state);
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-12">
              <MDBInput
                type="text"
                label="Téléphone"
                icon="phone"
                className="mb-0"
                name="telephone"
                value={this.state.telephone}
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
                className="mb-2 textbox-n"
                name="date"
                value={this.state.date}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="md-form form-group col-12">
              <MDBInput
                type="time"
                icon="clock"
                className="mb-2"
                name="horaire"
                value={this.state.horaire}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="text-center">
              <MDBBtn
                className="btn btn-block text-uppercase mt-5"
                color="primary"
                type="submit"
              >
                Enregistrer les modifications
              </MDBBtn>
            </div>
            <MDBBtn
              className="btn btn-block text-uppercase mt-5"
              color="danger"
              onClick={this.handleDelete}
            >
              Supprimer la voiture
            </MDBBtn>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormUpdate);
