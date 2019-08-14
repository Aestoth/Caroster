import React, { Component } from "react";
import { MDBIcon, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import ModifierPassager from "./ModifierPassager";
import backendURL from "./helpers/getBackendURL";

class PassagersEnAttente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModifierPassager: false,
      passagerModif: []
    };
  }

  ModifierPassagerShow = id => {
    const passagers = this.props.passengers.find(item => item._id === id);
    const { showModifierPassager } = this.state;

    this.setState({
      showModifierPassager: !showModifierPassager,
      passagerModif: passagers
    });
    console.log(passagers);
  };

  AddToCar = id => {
    const passengers = this.props.passengers.map(passenger => passenger._id);
    const oneCar = this.props.carList.find(car => car._id === id);
    oneCar.passengers.push(...passengers);
    const 
  };
  render() {
    console.log("statePass", this.props.carList);
    console.log("passengers", this.props.passengers);

    if (!this.props.passengers) return "Liste d-attente vide";
    // if (!this.props.placeInCar) return "Liste d-attente vide";
    return (
      <MDBContainer className="mt-3">
        {this.state.showModifierPassager && (
          <ModifierPassager
            passagerModif={this.state.passagerModif}
            ModifierPassagerShow={() => this.ModifierPassagerShow()}
            fetchPassagers={this.props.fetchPassagers}
          />
        )}
        {this.props.passengers.map(({ _id, name }) => (
          <MDBRow key={_id}>
            <MDBCol size="5" className="mr-0 mt-2">
              {" "}
              <i className="fas fa-user pr-0 mr-1" />
              {name}
            </MDBCol>
            <MDBCol size="5" className="ml-0 ">
              <select
                className="form-control mb-3"
                id="exampleFormControlSelect1"
              >
                <option>Aller avec...</option>
                {this.props.carList.map(({ _id, carName }) => (
                  <option key={_id} onClick={() => this.AddToCar(_id, name)}>
                    {carName}
                  </option>
                ))}
              </select>
            </MDBCol>
            <MDBCol size="1" className="mt-2">
              <MDBIcon
                icon="pencil-alt"
                onClick={() => this.ModifierPassagerShow(_id)}
              />
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
    );
  }
}

export default PassagersEnAttente;
