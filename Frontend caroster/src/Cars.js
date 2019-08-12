import React, { Component } from "react";
import "./Voiture.css";
import Car from "./Car";

//import backendURL from "./helpers/getBackendURL";

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      EventId: this.props.id
    };
  }

  render() {
    console.log("CarsEvtId", this.props.id);
    return (
      <div>
        {this.props.cars.map(
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
              cars={this.props.cars}
              fetchCarsEvent={this.props.fetchCarsEvent}
              seat={this.props.seats}
            />
          )
        )}
      </div>
    );
  }
}

export default Cars;
