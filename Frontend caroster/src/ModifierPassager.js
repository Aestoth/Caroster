import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import styled from "styled-components";
import backendURL from "./helpers/getBackendURL";

const InconButton = styled.button`
  background: none;
  padding: 0px;
  border: none;
`;

class ModifierPassager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.passagerModif.name,
      showModifierPassager: true
    };
  }

  deletePassager = e => {
    e.preventDefault();
    console.log(this.props.passagerModif._id);
    fetch(`${backendURL()}/api/passengers/${this.props.passagerModif._id}`, {
      method: "DELETE",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log(data.result);
        this.props.fetchPassagers();
        this.props.ModifierPassagerShow(data.result);
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
    console.log(this.props.passagerModif._id);
    fetch(`${backendURL()}/api/passengers/${this.props.passagerModif._id}`, {
      method: "PUT",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log(data.result);
        this.props.fetchPassagers();
        this.props.ModifierPassagerShow(this.props.passagerModif._id);
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
              name="name"
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

export default ModifierPassager;
