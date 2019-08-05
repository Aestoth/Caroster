import React, { Component } from "react";
//import ModifierPassager from "./ModifierPassager";
import PassagersEnAttente from "./PassagersEnAttente";
import { MDBBtn, MDBIcon } from "mdbreact";
import AjouterListeDAttente from "./AjouterListeDAttente";
import backendURL from "./helpers/getBackendURL";

class ListeDAttente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showListeDAttente: false,
      showModifierPassager: false,
      passengers: [],
      passengersInCar: []
    };
  }

  componentDidMount() {
    this.fetchPassagers();
    this.fetchPassagersInCar();
  }

  fetchPassagers = () => {
    fetch(`${backendURL()}/api/event/${this.props.eventId}/passengers`)
      .then(response => response.json())
      .then(data => this.setState({ passengers: data }));
  };

  fetchPassagersInCar = () => {
    this.props.cars.map(car => {
      fetch(`${backendURL()}/api/car/${car._id}/passengers`)
        .then(response => response.json())
        .then(data => this.setState({ passengersInCar: data }));
      return true;
    });
  };

  changeListeDAttente = () => {
    const { showListeDAttente } = this.state;
    this.setState({ showListeDAttente: !showListeDAttente });
  };

  render() {
    console.log("passInCar-1", this.state.passengersInCar);
    console.log("carState-2", this.props.cars);
    return (
      <div className="container">
        <div className="card shadow">
          <div className="card-header bg-info text-center text-white d-flex justify-content-between">
            <div />
            <div className="">
              <i className="fas fa-list mr-2" />
              Liste d'attente
            </div>
            <div className="">
              <MDBIcon icon="info-circle" />
            </div>
          </div>

          <div className="list-group list-group-flush">
            {this.state.showListeDAttente ? (
              <AjouterListeDAttente
                changeListeDAttente={() => this.changeListeDAttente()}
                fetchPassagers={() => this.fetchPassagers()}
                eventId={this.props.eventId}
              />
            ) : (
              <MDBBtn
                color="grey darken-1"
                className="list-group-item bg-primary border border-white mb-0"
                onClick={this.changeListeDAttente}
              >
                <i className="fas fa-user-plus  mr-3" />
                Ajouter passager
              </MDBBtn>
            )}
          </div>
          <PassagersEnAttente
            passengers={this.state.passengers}
            passengersInCar={this.state.passengersInCar}
            fetchPassagers={() => this.fetchPassagers()}
            cars={this.props.cars}
            // passengersCar={this.props.passengersCar}
            // seats={this.props.seats}
          />
        </div>
      </div>
    );
  }
}

export default ListeDAttente;
