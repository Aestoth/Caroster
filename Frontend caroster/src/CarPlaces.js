import React, { Component } from "react";
import ListeDAttente from "./ListeDAttente";

class CarPlaces extends Component {
  render() {
    return (
      <div>
        {this.props.carsPlace.map(
          ({ _id, carName, message, contact, address, date, time, seats }) => (
            <ListeDAttente
              key={_id}
              _id={_id}
              carName={carName}
              message={message}
              contact={contact}
              address={address}
              date={date}
              time={time}
              seats={seats}
              eventId={this.props.eventId}
            />
          )
        )}
      </div>
    );
  }
}

export default CarPlaces;
