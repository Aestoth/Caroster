import React, { Component } from "react";
import "./Voiture.css";
import Car from "./Car";

import backendURL from "./helpers/getBackendURL";

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      EventId: this.props.id
    };
  }

  componentDidMount() {
    this.fetchCarsEvent();
  }

  fetchCarsEvent = () => {
    fetch(`${backendURL()}/api/${this.props.id}/cars`)
      .then(res => res.json())
      .then(data => this.setState({ cars: data }));
  };

  render() {
    console.log("CarsEvtId", this.props.id);
    return (
      <div>
        {this.state.cars.map(
          ({ _id, carName, message, contact, address, date, time, seats }) => (
            <Car
              key={_id}
              _id={_id}
              carName={carName}
              message={message}
              contact={contact}
              address={address}
              date={date}
              time={time}
              seats={seats}
              eventId={this.props.id}
              cars={this.state.cars}
              fetchCarsEvent={() => this.fetchCarsEvent()}
              // passengers={this.props.passengers}
              // fetchCarPassengers={this.props.fetchCarPassengers}
            />
          )
        )}
      </div>
    );
  }
}

export default Cars;
