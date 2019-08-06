import React, { Component } from "react";
import Navbar from "./Navbar";
import FormCarUser from "./FormCarUser";
import Footer from "./Footer";
import styled from "styled-components";
import backendURL from "./helpers/getBackendURL";

const Button = styled.button`
  background-color: transparent;
  border: none;
`;

class UpdateCarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: false
    };
  }

  componentDidMount() {
    console.log("route param", this.props);
    fetch(`${backendURL()}/api/car/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => this.setState({ car: data.result }));
  }

  render() {
    console.log("mudar", this.props.location.state.params.id);
    if (this.state.car === false) return "loading...";
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
        <FormCarUser
          {...this.state.car}
          userId={this.props.location.state.params.id}
        />
        <Footer />
      </div>
    );
  }
}

export default UpdateCarUser;
