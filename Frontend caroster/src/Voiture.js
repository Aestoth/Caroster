import React, { Component } from "react";
import "./Voiture.css";
import UniqueVoiture from "./UniqueVoiture";

import backendURL from "./helpers/getBackendURL";

class Voiture extends Component {
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
    console.log(this.props.passengers);

    return (
      <div>
        {this.state.cars.map(
          ({
            _id,
            nomVoiture,
            infoComp,
            contact,
            adresse,
            date,
            horaire,
            sieges
          }) => (
            <UniqueVoiture
              key={_id}
              _id={_id}
              nomVoiture={nomVoiture}
              infoComp={infoComp}
              contact={contact}
              adresse={adresse}
              date={date}
              horaire={horaire}
              sieges={sieges}
              EventId={this.props.id}
              carId={this.state.cars}
              passengers={this.props.passengers}
              fetchCarPassengers={this.props.fetchCarPassengers}
            />
          )
        )}
      </div>
    );
  }
}

export default Voiture;
