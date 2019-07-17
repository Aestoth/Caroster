import React, { Component } from "react";
import { MDBIcon, MDBCol, MDBRow, MDBContainer } from "mdbreact";

class PassagerDansVoiture extends Component {
  render() {
    console.log(this.props.passengersCar);
    return (
      <MDBContainer>
        {this.props.passengersCar.map(({ _id, nom }) => (
          <MDBRow key={_id} className="green lighten-4 border border-white p-2">
            <MDBCol size="10">
              <i className="fas fa-user pr-0 mr-3" />
              {nom}
            </MDBCol>
            <MDBCol size="2">
              {" "}
              <MDBIcon icon="pencil-alt" />
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
    );
  }
}

export default PassagerDansVoiture;
