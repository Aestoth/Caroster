import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdbreact";
import backendURL from "./helpers/getBackendURL";

class FormCarUser extends Component {
  constructor(props) {
    super(props);
    console.log("zz", this.props);
    this.state = {
      carName: this.props.carName,
      seats: this.props.seats,
      message: this.props.message,
      contact: this.props.contact,
      email: this.props.email,
      address: this.props.address,
      date: this.props.date,
      time: this.props.time
    };
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${backendURL()}/api/car/${this.props.match.params.id}`, {
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

    this.props.history.goBack();
  };

  handleDelete = e => {
    console.log("test", this.state);
    e.preventDefault();
    fetch(`${backendURL()}/api/car/${this.props.match.params.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(res => console.log(res));

    this.props.history.goBack();
  };

  render() {
    console.log("fff", this.props.userId);
    console.log("form", this.state.carName);
    return (
      <div className="container-fluid cover-container d-flex">
        <div className="row col-12 align-items-center justify-content-center flex-fill mx-auto ">
          <form onSubmit={this.handleSubmit} className="mx-auto">
            <div className="form-group col-12">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx"
                id="defaultFormRegisterNameEx"
                label="Nom de la voiture"
                icon="car"
                className="mb-0"
                name="carName"
                value={this.state.carName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-12">
              <MDBInput
                type="number"
                htmlFor="defaultFormRegisterNameEx2"
                id="defaultFormRegisterNameEx2"
                label="Sièges"
                icon="chair"
                className="mb-0"
                name="seats"
                value={this.state.seats}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-12 flex">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx3"
                id="defaultFormRegisterNameEx3"
                label="Infos complémentaires"
                icon="comment-alt"
                className="mb-0"
                name="message"
                value={this.state.message}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-12">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx4"
                id="defaultFormRegisterNameEx4"
                label="Téléphone"
                icon="phone"
                className="mb-0"
                name="contact"
                value={this.state.contact}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-12">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx5"
                id="defaultFormRegisterNameEx5"
                label="Email"
                icon="envelope"
                className="mb-0"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <h6 className="text-center text-uppercase mt-5">
              Lieu de rendez-vous
            </h6>
            <div className="form-group col-12">
              <MDBInput
                type="text"
                htmlFor="defaultFormRegisterNameEx6"
                id="defaultFormRegisterNameEx6"
                label="Adresse"
                icon="map-marker-alt"
                className="mb-0"
                name="address"
                value={this.state.address}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="md-form form-group col-12">
              <MDBInput
                type="date"
                htmlFor="defaultFormRegisterNameEx7"
                id="defaultFormRegisterNameEx7"
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
                htmlFor="defaultFormRegisterNameEx8"
                id="defaultFormRegisterNameEx8"
                icon="clock"
                className="mb-2"
                name="time"
                value={this.state.time}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="text-center">
              <MDBBtn
                className="btn btn-block text-uppercase mt-5"
                color="primary"
                type="submit"
                onClick={this.handleSubmit}
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

export default withRouter(FormCarUser);
