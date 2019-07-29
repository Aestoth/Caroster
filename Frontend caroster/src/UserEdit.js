import React, { Component } from "react";
import { MDBInput, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import backendURL from "./helpers/getBackendURL";

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      contact: this.props.user.contact,
      email: this.props.user.email,
      password: this.props.user.password,
      showChangeInfo: true,
      value: ""
    };
    this.textInput = React.createRef();
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
    fetch(`${backendURL()}/api/user/${this.props._id}`, {
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

  // deleteUser = e => {
  //   e.preventDefault();
  //   fetch(`${backendURL()}/api/user/delete/${this.props._id}`, {
  //     method: "DELETE",
  //     body: JSON.stringify(this.state),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   }).then(response => {
  //     response.json().then(data => {
  //       console.log(data.result);
  //       this.props.history.push("/");
  //     });
  //   });
  // };

  render() {
    console.log("edit", this.state);
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
          <MDBCol size="6" className="d-flex justify-content-center mb-4 mt-4">
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

export default UserEdit;
