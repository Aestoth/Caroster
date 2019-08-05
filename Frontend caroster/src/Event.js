import React, { Component } from "react";
import "./Evenement.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import ListeDAttente from "./ListeDAttente";
import Cars from "./Cars";
//import CarPlaces from "./CarPlaces"
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
      event: [],
      modal: false,
      cars: []
    };
  }

  componentDidMount() {
    fetch(`${backendURL()}/api/event/${this.props.match.params.id}`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Failed with HTTP code " + response.status);
        }
        return response;
      })

      .then(response => response.json())
      .then(data => {
        console.log("event in fetch", data);
        this.setState({ event: data });
        this.fetchCarInEvent();
      })
      .catch(err => {
        console.log("error state", err);
        this.setState({ hasError: true });
      });
  }

  fetchCarInEvent = () => {
    fetch(`${backendURL()}/api/${this.props.match.params.id}/cars`)
      .then(response => response.json())
      .then(data => this.setState({ cars: data }));
    console.log(this.state.cars);
  };

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
    console.log("carsState", this.state.event.title);
    // console.log("cars-Id", this.state.cars);

    const Button = styled.button`
      background-color: transparent;
      border: none;
    `;
    if (this.state.hasError) {
      console.log("hasError", this.state.hasError);
      return <h2>Something went wrong.</h2>;
    } else {
      if (!this.state.event) return "loading";
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

          <div>
            <MDBBtn className="btn-sm" color="danger" onClick={this.toggle}>
              Supprimer événement
            </MDBBtn>
            <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
              <MDBModalHeader toggle={this.toggle}>
                {this.state.event.title}
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
            style={{
              fontFamily: "Righteous",
              color: "#0d47a1",
              textDecorationLine: "underline"
            }}
          >
            {this.state.event.title}
          </h1>

          <div className="row d-flex justify-content-center mt-4">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
              <ListeDAttente
                eventId={this.props.match.params.id}
                cars={this.state.cars}
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
