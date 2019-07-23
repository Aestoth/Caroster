import React, { Component } from "react";
import Navbar from "./Navbar";
import { MDBInput, MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdbreact";
import backendURL from "./helpers/getBackendURL";

class Insciption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
      email: "",
      password: ""
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

  handleSubmit = event => {
    fetch(`${backendURL()}/api/register`, {
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
  };

  render() {
    return (
      <div>
        <Navbar />

        <MDBContainer className="mt-5 col-md-5 py-5">
          <div className="card shadow ">
            <div className="card-header bg-info text-white text-center">
              INSCRIPTION
            </div>
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
                  />
                </MDBCol>
                <MDBCol size="10">
                  <MDBInput
                    label="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </MDBCol>
                <MDBCol
                  size="6"
                  className="d-flex justify-content-center mb-4 mt-4"
                >
                  <MDBBtn type="submit" value="Submit" color="primary">
                    LOGIN
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default Insciption;
