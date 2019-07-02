import React, { Component } from "react";
import Navbar from "../Menu/Navbar";
import Form_update from '../Pages/form_update';
import Footer from '../Footer/Footer';
import { Link } from "react-router-dom";
import styled from "styled-components";




class UpdateVoiture extends Component {
  
  
  render() {
    const Button = styled.button`
      background-color: transparent;
      border: none;
    `;
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <Link to="/Evenement">
            <Button className="text-white">
              <i className="far fa-arrow-alt-circle-left fa-2x" />
            </Button>
          </Link>
        </nav>
        <Form_update />
        <Footer />
      </div>
    );
  }
}

export default UpdateVoiture;
