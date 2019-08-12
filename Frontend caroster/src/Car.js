import React, { Component } from "react";
//import { Link } from "react-router-dom";
import ButtonAddPassagers from "./ButtonAddPassagers";
import PassagerDansVoiture from "./PassagerDansVoiture";
import FormUpdate from "./FormModifier";

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

class Car extends Component {
  constructor(props) {
    super();
    this.state = {
      show: false,
      passengers: [],
      carPlaces: [],
      showFormCar: false,
      carEdit: false
    };
  }

  componentDidMount() {
    this.fetchCarPassengers();
  }

  fetchCarPassengers = () => {
    fetch(`${backendURL()}/api/car/${this.props._id}/passengers`)
      .then(response => response.json())
      .then(data => this.setState({ passengers: data }));
    console.log(this.state.passengers);
  };

  changeDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  changeShowFormCar = id => {
    const cars = this.props.cars.find(item => item._id === id);
    const { showFormCar } = this.state;
    this.setState({ showFormCar: !showFormCar, carEdit: cars });
  };

  render() {
    console.log("carS", this.props.cars);
    console.log("carS", this.props._id);
    const passengers = this.state.passengers;
    const nombPassengerCar = passengers.length;

    return (
      <div className="container">
        <div className="card shadow marginTable mb-4">
          <div className="card-header bg-info text-white d-flex justify-content-between">
            <div />
            <div>
              <i className="fas fa-car mr-2" />
              {this.props.carName}
            </div>
            <div>
              <MDBIcon
                icon="pencil-alt"
                className=" mr-4"
                onClick={() => this.changeShowFormCar(this.props._id)}
              />
            </div>
          </div>
          {this.state.showFormCar ? (
            <FormUpdate
              changeShowFormCar={() => this.changeShowFormCar()}
              _id={this.props.eventId}
              carEdit={this.state.carEdit}
              cars={this.props.cars}
              carID={this.props._id}
              fetchCarsEvent={this.props.fetchCarsEvent}
            />
          ) : (
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
                  {this.props.date} à {this.props.time}
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
                  <a href="#">{this.props.address}</a>
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
                  {this.props.message}
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          )}
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
                fetchCarsEvent={this.props.fetchCarsEvent}
                seat={this.props.seat}
              />
            )}
            <ButtonAddPassagers
              seats={
                this.state.show || this.state.passengers
                  ? this.props.seats - nombPassengerCar
                  : this.props.seats
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

export default Car;

// <CarFreePlaces
//   carId={nombPassengerCar !== place && this.state.carPlaces}
//   cars={this.props.cars}
//   result={this.state.carPlaces}
// />
