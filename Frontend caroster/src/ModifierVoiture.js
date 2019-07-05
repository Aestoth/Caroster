import React, { Component } from "react";
import Navbar from "./Navbar";
import FormUpdate from "./form_modifier";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import backendURL from "./helpers/getBackendURL";

class ModifierVoiture extends Component {
  state = {
    voiture: false
  };

  componentDidMount() {
    console.log("route param", this.props);
    fetch(`${backendURL()}/api/voiture/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => this.setState({ voiture: data.result }));
  }

  render() {
    console.log("voiture", this.state.voiture);
    const Button = styled.button`
      background-color: transparent;
      border: none;
    `;
    if (!this.state.voiture) {
      return "loading";
    }

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
        <FormUpdate {...this.state.voiture} />
        <Footer />
      </div>
    );
  }
}

export default ModifierVoiture;
