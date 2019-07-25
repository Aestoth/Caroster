import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
//import UserEditName from "./UserEditName";

class UserInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChange: []
    };
  }

  render() {
    return (
      <MDBContainer className="mt-2 mb-2">
        <MDBRow className=" py-2">
          <MDBCol size="2">
            <MDBIcon icon="user-alt" className="ml-5 mr-5" />
          </MDBCol>
          <MDBCol size="6" className="ml-4">
            {this.props.name}
          </MDBCol>
        </MDBRow>

        <MDBRow className="py-2">
          <MDBCol size="2">
            <MDBIcon icon="envelope" className="ml-5 mr-5" />
          </MDBCol>
          <MDBCol size="6" className="ml-4">
            {this.props.email}
          </MDBCol>
        </MDBRow>
        <MDBRow className="py-2">
          <MDBCol size="2">
            <MDBIcon icon="phone" className="ml-5 mr-5" />
          </MDBCol>
          <MDBCol size="6" className="ml-4">
            {this.props.contact}
          </MDBCol>
        </MDBRow>
        <MDBRow className="py-2">
          <MDBCol size="2">
            <MDBIcon icon="key" className="ml-5 mr-5" />
          </MDBCol>
          <MDBCol size="6" className="ml-4">
            ************
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default UserInfos;
