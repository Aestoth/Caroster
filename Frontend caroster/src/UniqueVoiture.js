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
      passengers: []
    };
  }

  changeDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  componentDidMount() {
    this.fetchCarPassengers();
  }

  fetchCarPassengers = () => {
    console.log(">>>>" + this.state.passengers);
    fetch(`${backendURL()}/api/car/${this.props._id}/passengers`)
      .then(response => response.json())
      .then(data => this.setState({ passengers: data }));
    console.log(this.state.passengers);
  };

  countPassengers = () => {
    const passenger = this.state.passengers;
    const passengerSieges = passenger.length;
    return passengerSieges;
  };

  render() {
    const passenger = this.state.passengers;
    const passengerSieges = passenger.length;
    console.log(passengerSieges);
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
                  ? this.props.sieges - passengerSieges
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