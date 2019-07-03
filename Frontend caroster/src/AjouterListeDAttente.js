import React, { Component } from "react";

import { MDBInput } from "mdbreact";

import styled from "styled-components";

const InconButton = styled.button`
  background: none;
  padding: 0px;
  border: none;
`;

class AjouterListeDAttente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",

      showListeDAttente: true
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
    fetch("http://localhost:3000/api/passagers/new", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Success" + data);
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
              value={this.state.nom}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="col-1 mt-3">
            <InconButton type="submit" value="Submit" id="completed-task">
              <i className="fas fa-check mt-4 ml-2" />
            </InconButton>
          </div>
          <div className="col-1 mt-3">
            <InconButton type="button" onClick={this.props.changeListeDAttente}>
              <i className="fas fa-times mt-4 ml-3" />
            </InconButton>
          </div>
        </div>
      </form>
    );
  }
}

export default AjouterListeDAttente;
