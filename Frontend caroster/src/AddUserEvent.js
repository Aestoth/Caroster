import React, { Component } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import backendURL from "./helpers/getBackendURL";

class AddUserEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      email: "",
      showFormEvent: true
    };
  }

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
    fetch(`${backendURL()}/api/${this.props.usersId}/userEvent`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Success", data._id);
        this.props.changeShowFormEvent();
        this.props.fetchEventsUsers();
        // this.props.history.push(`/Event/${data._id}`);
      });
    });
  };

  render() {
    console.log("addEvent", this.props.usersId);
    return (
      <div>
        <h4 className="d-flex justify-content-center mt-2">Créer événement</h4>
        <form onSubmit={this.handleSubmit}>
          <MDBRow className="d-flex justify-content-center mt-3">
            <MDBCol size="10">
              <MDBInput
                label="Prénom"
                type="text"
                name="title"
                value={this.state.title}
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
              />
            </MDBCol>

            <MDBCol
              size="6"
              className="d-flex justify-content-center mb-4 mt-4"
            >
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
      </div>
    );
  }
}

export default AddUserEvent;
