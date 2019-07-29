import React, { Component } from "react";
import "./Evenement.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import ListeDAttente from "./ListeDAttente";
import Voiture from "./Voiture";
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

class Evenement extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      event: false,
      modal: false,
      carId: [],
      passengers: []
    };
  }

  componentDidMount() {
    fetch(`${backendURL()}/api/event/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("event in fetch", data);
        this.setState({ event: data });
      });
  }

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
    console.log("locat", this.props.location.state.carId);
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

          <div className="ml-5 text-white">
            <h5>{this.state.event.titre}</h5>
          </div>

          <div>
            <Link
              to={{
                pathname: "/Ajouter-Voiture",
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
          <div className="row d-flex justify-content-center mt-4">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
              <ListeDAttente eventId={this.props.match.params.id} />
            </div>
            <div className="col-md-6 marginTable col-sm-6 col-lg-6 col-xl-6">
              <Voiture id={this.props.match.params.id} />
            </div>
          </div>
        </div>
        <div className="mt-4 mb-5 d-flex justify-content-center">
          <MDBBtn color="danger" onClick={this.toggle}>
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

export default Evenement;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { Component } from "react";
import { Link } from "react-router-dom";
import ButtonAddPassagers from "./ButtonAddPassagers";
import PassagerDansVoiture from "./PassagerDansVoiture";

import backendURL from "./helpers/getBackendURL";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBPopover,
  MDBPopoverHeader
} from "mdbreact";
import Passagers from "./Passagers";

class UniqueVoiture extends Component {
  constructor(props) {
    super();
    this.state = {
      show: false,
      passengers: [],
      carPlaces: []
    };
  }

  changeDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  // componentDidMount() {
  //   this.fetchCarPassengers();
  // }
  //
  // fetchCarPassengers = () => {
  //   fetch(`${backendURL()}/api/car/${this.props._id}/passengers`)
  //     .then(response => response.json())
  //     .then(data => this.setState({ passengers: data }));
  //   console.log(this.state.passengers);
  // };

  render() {
    // const passengers = this.state.passengers;
    // const nombPassengerCar = passengers.length;
    // const place = this.props.sieges;

    return (
      <div className="container">
        <div className="card shadow marginTable mb-4">
          <div className="card-header bg-info text-white d-flex justify-content-between">
            <div />
            <div>
              <i className="fas fa-car mr-2" />
              {this.props.nomVoiture}
            </div>
            <div>
              <Link
                to={{
                  pathname: `/ModifierVoiture/${this.props._id}`,
                  state: { params: { id: this.props.EventId } }
                }}
              >
                <i className="fas fa-pencil-alt " />
              </Link>
            </div>
          </div>

          <MDBContainer
            className="border rounded mt-4"
            style={{ width: "22rem" }}
          >
            <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
              <MDBCol size="2">
                <MDBIcon icon="phone" size="2x" />
              </MDBCol>
              <MDBCol
                className="d-flex align-items-center d-flex justify-content-center"
                size="8"
              >
                <MDBPopover placement="right" popover clickable id="popper2">
                  <MDBBtn size="sm"> Contact</MDBBtn>

                  <MDBPopoverHeader>{this.props.contact}</MDBPopoverHeader>
                </MDBPopover>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
              <MDBCol size="2">
                <MDBIcon icon="calendar-alt" size="2x" className="" />
              </MDBCol>
              <MDBCol
                className="d-flex align-items-center d-flex justify-content-center"
                size="8"
              >
                {this.props.date} à {this.props.horaire}
              </MDBCol>
            </MDBRow>
            <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
              <MDBCol size="2">
                <MDBIcon icon="map-marker-alt" size="2x" className=" " />
              </MDBCol>
              <MDBCol
                className="d-flex align-items-center d-flex justify-content-center text-center"
                size="8"
              >
                <a href="#">{this.props.adresse}</a>
              </MDBCol>
            </MDBRow>
            <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
              <MDBCol size="2">
                <MDBIcon icon="comment-alt" size="2x" />
              </MDBCol>
              <MDBCol
                className="d-flex align-items-center d-flex justify-content-center text-center"
                size="8"
              >
                {this.props.infoComp}
              </MDBCol>
            </MDBRow>
          </MDBContainer>

          <ul className="list-group list-group-flush mt-4">
            <PassagerDansVoiture
              carId={this.props._id}
              passengersCar={this.state.passengers}
              fetchCarPassengers={() => this.fetchCarPassengers()}
            />
            {this.state.show && (
              <Passagers
                carId={this.props._id}
                fetchCarPassengers={() => this.fetchCarPassengers()}
                changeDiv={() => this.changeDiv()}
              />
            )}
            <ButtonAddPassagers
              sieges={
                this.state.show || this.state.passengers
                  ? this.props.sieges - nombPassengerCar
                  : this.props.sieges
              }
              changeDiv={() => this.changeDiv()}
              carId={this.props._id}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default UniqueVoiture;

// <CarFreePlaces
//   carId={nombPassengerCar !== place && this.state.carPlaces}
//   cars={this.props.cars}
//   result={this.state.carPlaces}
// />
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { Component } from "react";
import { MDBInput } from "mdbreact";

import styled from "styled-components";
import backendURL from "./helpers/getBackendURL";

const InconButton = styled.button`
  background: none;
  padding: 0px;
  border: none;
`;

class Passagers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      show: true,
      cars: [],
      passengers: [],
      passengersInCar: []
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
    fetch(`${backendURL()}/api/${this.props.carId}/passengersCar`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        this.setState({ passengersInCar: data });
        console.log("Success", data);
        this.props.changeDiv();
        this.props.fetchCarPassengers();
      });
    });
  };

  render() {
    console.log(this.props.carId);

    console.log("PaasInCar", this.state.passengersInCar);
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
            <InconButton type="button" onClick={this.props.changeDiv}>
              <i className="fas fa-times mt-4 ml-3" />
            </InconButton>
          </div>
        </div>
      </form>
    );
  }
}

export default Passagers;
