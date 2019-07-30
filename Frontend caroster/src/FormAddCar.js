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
      carName: "",
      seats: "",
      message: "",
      contact: "",
      email: "",
      address: "",
      date: "",
      time: "",
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
        this.props.history.push({
          pathname: `/Event/${this.props.location.state.params.id}`,
          state: { carId: data._id, seats: data.seats }
        });
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
                name="carName"
                value={this.state.carName}
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
                name="seats"
                value={this.state.seats <= 10 && this.state.seats}
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
                icon="comment-alt"
                className="mb-0 form-control"
                name="message"
                value={this.state.message}
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
                name="address"
                value={this.state.address}
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
                name="time"
                value={this.state.time}
                onChange={this.handleChange}
                validate={this.state.validate}
                required
              />
            </div>

            <div className="text-center mt-2">
              <Link to={`/Event/${this.props.location.state.params.id}`}>
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
