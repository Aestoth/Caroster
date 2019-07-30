import React, { Component } from "react";
import Navbar from "./Navbar";
import FormUpdate from "./FormModifier";
import Footer from "./Footer";
import styled from "styled-components";
import backendURL from "./helpers/getBackendURL";

class UpdateCar extends Component {
  state = {
    car: false
  };

  componentDidMount() {
    console.log("route param", this.props);
    fetch(`${backendURL()}/api/car/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => this.setState({ car: data.result }));
  }

  render() {
    const Button = styled.button`
      background-color: transparent;
      border: none;
    `;
    if (!this.state.car) {
      return "loading";
    }

    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <Button
            className="text-white"
            onClick={() => this.props.history.goBack()}
          >
            <i className="far fa-arrow-alt-circle-left fa-2x" />
          </Button>
        </nav>
        <FormUpdate {...this.state.car} />
        <Footer />
      </div>
    );
  }
}

export default UpdateCar;
