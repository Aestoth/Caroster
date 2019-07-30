import React, { Component } from "react";
import "./Evenement.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import ListeDAttente from "./ListeDAttente";
import Cars from "./Cars";
import styled from "styled-components";
import backendURL from "./helpers/getBackendURL";

import {
  MDBFooter,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBModalHeader,
  MDBModal,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";

class Event extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      event: false,
      modal: false,
      carId: [],
      passengers: [],
      sieges: []
    };
  }

  componentDidMount() {
    fetch(`${backendURL()}/api/event/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("event in fetch", data);
        this.setState({ event: data });
        //this.fetchCarPassengers();
      });
  }

  // fetchCarPassengers = () => {
  //   if (
  //     typeof this.props.location.state.carId !== "object" ||
  //     typeof this.props.location.state.carId !== "undefined"
  //   ) {
  //     fetch(
  //       `${backendURL()}/api/car/${this.props.location.state.carId}/passengers`
  //     )
  //       .then(response => response.json())
  //       .then(data => this.setState({ passengers: data }));
  //     console.log(this.state.passengers);
  //   }
  // };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  deleteEvent = e => {
    e.preventDefault();
    fetch(`${backendURL()}/api/event/${this.props.match.params.id}`, {
      method: "DELETE",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log(data.result);
        this.props.history.push("/");
      });
    });
  };

  render() {
    // console.log("locet", this.props.location.state.carId);
    // console.log("sieges", this.props.location.state.sieges);
    const Button = styled.button`
      background-color: transparent;
      border: none;
    `;
    if (!this.state.event) return "loading";
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

          <div>
            <MDBBtn className="btn-sm" color="danger" onClick={this.toggle}>
              Supprimer événement
            </MDBBtn>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>
                {this.state.event.titre}
              </MDBModalHeader>
              <MDBModalBody>Attention! L'événement será supprimé </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>
                  Annuler
                </MDBBtn>
                <MDBBtn onClick={this.deleteEvent} color="primary">
                  Continuer
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
            <Link
              to={{
                pathname: "/AddCar",
                state: {
                  params: {
                    id: this.props.match.params.id
                  }
                }
              }}
            >
              <MDBBtn color="indigo btn-sm">
                <MDBIcon icon="plus" size="2x" className="mr-2 " />
                <MDBIcon icon="car" size="2x" />
              </MDBBtn>
            </Link>
          </div>
        </nav>
        <div className="container">
          <h1
            className=" d-flex justify-content-center mt-4 mb-5"
            style={{ fontFamily: "Righteous" }}
          >
            {this.state.event.titre}
          </h1>

          <div className="row d-flex justify-content-center mt-4">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
              <ListeDAttente
                eventId={this.props.match.params.id}
                //passengersCar={this.state.passengers}
                //sieges={this.state.sieges}
              />
            </div>
            <div className="col-md-6 marginTable col-sm-6 col-lg-6 col-xl-6">
              <Cars
                id={this.props.match.params.id}
                // fetchCarPassengers={() => this.fetchCarPassengers()}
                // passengers={this.state.passengers}
              />
            </div>
          </div>
        </div>

        <MDBFooter color="blue" className="font-small pt-4 mt-4">
          <MDBContainer fluid className="text-center text-md-center">
            <h5 className="title">A Propos</h5>
            <p>
              Caroster.io est une façon simple et gratuite d'organiser du
              covoiturage avec un groupe de personnes pour se rendre a un
              événement, un week-end, une fête, un tournoi ou juste quelque
              part. Seulement 3 cliques et 1 e-mail suffisent. Caroster.io est
              fait avec le but de vous simplifier vos covoiturages de groupe.
            </p>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="https://www.MDBootstrap.com"> Caroster </a>
            </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    );
  }
} //Fin de la class

export default Event;
