import React, { Component } from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import backendURL from "./helpers/getBackendURL";

class FormAddUserCar extends Component {
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
      showFormCar: true
    };
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(`${backendURL()}/api/${this.props.usersId}/userCars`, {
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
        this.props.changeShowFormCar();
        this.props.fetchCarsUsers();
      });
    });
  };

  render() {
    return (
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
        <h6 className="text-center text-uppercase mt-5">Lieu de rendez-vous</h6>
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
          <MDBBtn className="text-uppercase text-white" type="cancel">
            Annuler
          </MDBBtn>

          <MDBBtn className="text-uppercase text-white" type="submit">
            Creer
          </MDBBtn>
        </div>
      </form>
    );
  }
}

export default FormAddUserCar;
