import React, { Component } from "react";
import Navbar from "./Navbar";
import {
  MDBInput,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBAlert
} from "mdbreact";
import backendURL from "./helpers/getBackendURL";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
      email: "",
      password: "",
      user: [],
      error: false
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
    event.preventDefault();

    fetch(`${backendURL()}/api/register`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Failed with HTTP code " + response.status);
        }
        return response;
      })
      .then(response => {
        response.json().then(data => {
          this.setState({ user: data });
          console.log("Success", data._id);
          this.props.history.push({
            pathname: "/User",
            state: {
              user: this.state.user
            }
          });
        });
      })
      .catch(err => {
        console.log("error state", err);
        this.setState({ error: "Vous êtes déjà inscrit!" });
      });
  };

  render() {
    console.log("S", this.state.user._id);
    return (
      <div>
        <Navbar />
        <MDBContainer className="mt-5 col-md-5 py-3">
          {this.state.error !== false && (
            <MDBAlert color="danger" className="d-flex justify-content-center">
              {this.state.error}
            </MDBAlert>
          )}

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
                    S'incrire
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

export default Registration;
