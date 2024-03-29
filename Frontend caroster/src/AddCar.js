import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import Footer from "./Footer";
import FormAddCar from "./FormAddCar";

class AddCar extends Component {
  render() {
    const Button = styled.button`
      background-color: transparent;
      border: none;
    `;
    console.log("kkk", this.props.location.state.params.id);
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="col-md-6">
            <Button
              className="text-white"
              onClick={() => this.props.history.goBack()}
            >
              <i className="far fa-arrow-alt-circle-left fa-2x" />
            </Button>
          </div>
        </nav>
        <FormAddCar />
        <Footer />
      </div>
    );
  }
}

export default AddCar;
