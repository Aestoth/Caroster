import React, { Component } from "react";
import "./Voiture.css";
import Car from "./Car";

import backendURL from "./helpers/getBackendURL";

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      cars: [],
      EventId: this.props.id
    };
  }

  componentDidMount() {
    fetch(`${backendURL()}/api/${this.props.id}/cars`)
      .then(res => res.json())
      .then(data => this.setState({ cars: data }));
  }

  render() {
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
              EventId={this.props.id}
              carId={this.state.cars}
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
