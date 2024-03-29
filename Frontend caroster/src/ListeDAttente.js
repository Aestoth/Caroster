import React, { Component } from "react";
//import ModifierPassager from "./ModifierPassager";
import PassagersEnAttente from "./PassagersEnAttente";
import { MDBBtn, MDBIcon } from "mdbreact";
import AjouterListeDAttente from "./AjouterListeDAttente";
import backendURL from "./helpers/getBackendURL";

class ListeDAttente extends Component {
  constructor(props) {
    super(props);
    console.log("liste", props);
    this.state = {
      showListeDAttente: false,
      showModifierPassager: false,
      passengers: [],
      car: [],
      carList: []
    };
  }

  componentDidMount() {
    this.fetchPassagers();
    // this.props.fetchCarsEvent();
    this.props.seats();
  }

  fetchPassagers = () => {
    fetch(`${backendURL()}/api/event/${this.props.eventId}/passengers`)
      .then(response => response.json())
      .then(data => this.setState({ passengers: data }));
  };

  // seats = () => {
  //   const carList = this.state.carList;
  //   this.props.cars.forEach(car => {
  //     if (car.passengers.length !== car.seats) this.setState({ car: [car] });
  //     console.log("===>", car.seats);
  //     carList.push(car);
  //   });
  // };

  changeListeDAttente = () => {
    const { showListeDAttente } = this.state;
    this.setState({ showListeDAttente: !showListeDAttente });
  };

  render() {
    // console.log("carList", this.state.carList);
    console.log("state", this.props.carList);

    return (
      <div className="container">
        <div className="crd shadow">
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
            fetchPassagers={() => this.fetchPassagers()}
            fetchCarsEvent={this.props.fetchCarsEvent}
            seats={this.props.seats}
            carList={this.props.carList}
          />
        </div>
      </div>
    );
  }
}

export default ListeDAttente;
