import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import "./Passagers.css";

class Passagers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      show: false
    };
  }

  changeDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
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
    fetch("http://localhost:3000/api/post/passagers", {
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
            <button
              type="submit"
              value="Submit"
              id="completed-task"
              className="fabutton"
            >
              <i className="fas fa-check mt-4 ml-2" />
            </button>
          </div>
          <div className="col-1 mt-3">
            <button type="submit" id="completed-task" className="fabutton">
              <i className="fas fa-times mt-4 ml-3" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Passagers;
