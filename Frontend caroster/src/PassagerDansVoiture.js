import React, { Component } from "react";
import { MDBIcon, MDBCol, MDBRow, MDBContainer } from "mdbreact";

class PassagerDansVoiture extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <i className="fas fa-user pr-0 mr-1" />
            Nom passager
          </MDBCol>
          <MDBCol>
            {" "}
            <MDBIcon icon="pencil-alt" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default PassagerDansVoiture;
