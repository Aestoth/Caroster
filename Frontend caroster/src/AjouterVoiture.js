import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import Footer from './Footer';
import Form_add_voiture from './form_ajouter_voiture';


class AjouterVoiture extends Component {


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
        <Form_add_voiture />
        <Footer />
      </div>
    );
  }
}

export default AjouterVoiture;
