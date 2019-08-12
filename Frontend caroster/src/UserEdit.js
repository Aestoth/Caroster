import React, { Component } from "react";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBModalHeader,
  MDBModal,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import { withRouter } from "react-router-dom";

import backendURL from "./helpers/getBackendURL";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.users.name,
      contact: this.props.users.contact,
      email: this.props.users.email,
      password: this.props.users.password,
      showChangeInfo: true,
      value: "",
      show: true,
      modal: false
    };
    this.textInput = React.createRef();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${backendURL()}/api/user/${this.props.users._id}`, {
      method: "PUT",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        this.setState({
          state: data,
          value: this.textInput.current.value
        });
        console.log(data);
        this.props.fetchUsers();
        this.props.changeInfo();
      });
      return response;
    });
  };

  render() {
    console.log("edit", this.props.users);
    return (
      <form onSubmit={this.handleSubmit}>
        <MDBRow className="d-flex justify-content-center mt-3">
          <MDBCol size="10">
            <MDBInput
              label="Prénom"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </MDBCol>
          <MDBCol size="10">
            <MDBInput
              label="Télephone"
              type="text"
              name="contact"
              value={this.state.contact}
              onChange={this.handleInputChange}
            />
          </MDBCol>
          <MDBCol size="10">
            <MDBInput
              label="Your e-mail"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              ref={this.textInput}
            />
          </MDBCol>
          <MDBCol size="10">
            <MDBInput label="Password" type="password" />
          </MDBCol>
          <MDBCol size="12" className="d-flex justify-content-center mb-4 mt-4">
            <MDBBtn onClick={this.toggle} className="btn-sm" color="danger">
              Supprimer
            </MDBBtn>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>ATTENTION!</MDBModalHeader>
              <MDBModalBody>
                {" "}
                Le Profil d'utilisateur será supprimé{" "}
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>
                  Annuler
                </MDBBtn>
                <MDBBtn onClick={this.props.deleteUser} color="primary">
                  Continuer
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <MDBBtn
              className="btn-sm"
              type="submit"
              value="Submit"
              color="primary"
            >
              Enregister
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    );
  }
}

export default withRouter(UserEdit);
