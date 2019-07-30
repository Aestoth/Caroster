import React, { Component } from "react";
import backendURL from "./helpers/getBackendURL";
import { MDBInput } from "mdbreact";
import styled from "styled-components";

const InconButton = styled.button`
  background: none;
  padding: 0px;
  border: none;
`;

class EditPassengersCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: true,
      name: this.props.passengerEdit.name
    };
  }

  deletePassager = e => {
    e.preventDefault();
    console.log(this.props.passengerEdit._id);
    fetch(`${backendURL()}/api/passengers/${this.props.passengerEdit._id}`, {
      method: "DELETE",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log(data.result);
        this.props.fetchCarPassengers();
        this.props.showEditPassengers(data.result);
      });
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
    console.log(this.props.passengerEdit._id);
    fetch(`${backendURL()}/api/passengers/${this.props.passengerEdit._id}`, {
      method: "PUT",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log(data.result);
        this.props.fetchCarPassengers();
        this.props.showEditPassengers(this.props.passengerEdit._id);
      });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-8 ml-3">
            <MDBInput
              size="sm"
              className="ml-2"
              label="Nom passagers"
              name="nom"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-1 mt-3">
            <InconButton type="submit" value="Submit" id="completed-task">
              <i className="fas fa-check mt-4 ml-2" />
            </InconButton>
          </div>
          <div className="col-1 mt-3">
            <InconButton type="button" onClick={this.deletePassager}>
              <i className="fas fa-trash-alt mt-4 ml-3" />
            </InconButton>
          </div>
        </div>
      </form>
    );
  }
}

export default EditPassengersCar;
