import React, { Component } from "react";
import { MDBBtn, MDBInput } from "mdbreact";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import backendURL from "./helpers/getBackendURL";
import { withRouter } from "react-router-dom";

class FormAddVoiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomVoiture: "",
      sieges: "",
      infoComp: "",
      contact: "",
      email: "",
      adresse: "",
      date: "",
      horaire: "",
      carId: []
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
    fetch(`${backendURL()}/api/${this.props.location.state.params.id}/newcar`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Success", data);
        console.log("id", data._id);
        this.props.history.push(
          `/Evenement/${this.props.location.state.params.id}`
        );
      });
    });
  }

  render() {
    console.log("iddd", this.props.location.state.params.id);
    return (
      <div className="container cover-container d-flex justify-content-center mt-4">
        <div className="card col-md-8">
          <form className="p-4" onSubmit={this.handleSubmit}>
            <div className="form-group ">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx"
                id="defaultFormRegisterNameEx"
                label="Nom de la voiture"
                icon="car"
                className="mb-0 form-control"
                name="nomVoiture"
                value={this.state.nomVoiture}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group ">
              <MDBInput
                type="number"
                htmlFor="defaultFormRegisterNameEx2"
                id="defaultFormRegisterNameEx2"
                label="Sieges"
                icon="chair"
                className="mb-0 form-control"
                name="sieges"
                value={this.state.sieges <= 10 && this.state.sieges}
                onChange={this.handleChange}
                validate={this.state.validate}
                required
              />
            </div>
            <div className="form-group flex">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx3"
                id="defaultFormRegisterNameEx3"
                label="Infos complémentaires"
                icon="pen"
                className="mb-0 form-control"
                name="infoComp"
                value={this.state.infocomp}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group ">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx4"
                id="defaultFormRegisterNameEx4"
                label="Téléphone"
                icon="phone"
                className="mb-0 form-control"
                name="contact"
                value={this.state.contact}
                onChange={this.handleChange}
                validate={this.state.validate}
                required
              />
            </div>
            <div className="form-group ">
              <MDBInput
                type="email"
                htmlFor="defaultFormRegisterNameEx5"
                id="defaultFormRegisterNameEx5"
                label="Email"
                icon="envelope"
                className="mb-0 form-control"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                validate={this.state.validate}
                required
              />
            </div>
            <h6 className="text-center text-uppercase mt-5">
              Lieu de rendez-vous
            </h6>
            <div className="form-group ">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx6"
                id="defaultFormRegisterNameEx6"
                label="Adresse"
                icon="map-marker-alt"
                className="mb-0 form-control"
                name="adresse"
                value={this.state.adresse}
                onChange={this.handleChange}
                validate={this.state.validate}
                required
              />
            </div>
            <div className="md-form form-group ">
              <MDBInput
                type="date"
                htmlFor="defaultFormRegisterNameEx7"
                id="defaultFormRegisterNameEx7"
                icon="calendar"
                className="mb-2 textbox-n form-control"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
                validate={this.state.validate}
                required
              />
            </div>
            <div className="md-form form-group ">
              <MDBInput
                type="time"
                htmlFor="defaultFormRegisterNameEx8"
                id="defaultFormRegisterNameEx8"
                icon="clock"
                className="mb-2 form-control"
                name="horaire"
                value={this.state.horaire}
                onChange={this.handleChange}
                validate={this.state.validate}
                required
              />
            </div>

            <div className="text-center mt-2">
              <Link to={`/Evenement/${this.props.location.state.params.id}`}>
                <MDBBtn className="text-uppercase text-white" type="cancel">
                  Annuler
                </MDBBtn>
              </Link>
              <MDBBtn className="text-uppercase text-white" type="submit">
                Creer
              </MDBBtn>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormAddVoiture);
