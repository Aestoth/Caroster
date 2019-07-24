import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import UserEditName from "./UserEditName";

class UserInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChangeInfo: false,
      userChange: []
    };
  }

  changeInfo = id => {
    const { showChangeInfo } = this.state;
    id = this.props._id;
    this.setState({
      showChangeInfo: !showChangeInfo,
      userChange: this.props._id
    });
  };

  render() {
    return (
      <MDBContainer className="mt-2 mb-2">
        {this.state.showChangeInfo ? (
          <UserEditName
            name={this.props.name}
            _id={this.props._id}
            changeInfo={() => this.changeInfo()}
          />
        ) : (
          <MDBRow className=" py-2">
            <MDBCol size="2">
              <MDBIcon icon="user-alt" className="ml-5 mr-5" />
            </MDBCol>
            <MDBCol size="6" className="ml-4">
              {this.props.name}
            </MDBCol>
            <MDBCol size="2">
              <MDBIcon
                icon="pencil-alt"
                className="ml-5 mr-5"
                onClick={this.changeInfo}
              />
            </MDBCol>
          </MDBRow>
        )}
        <MDBRow className="py-2">
          <MDBCol size="2">
            <MDBIcon icon="envelope" className="ml-5 mr-5" />
          </MDBCol>
          <MDBCol size="6" className="ml-4">
            {this.props.email}
          </MDBCol>
          <MDBCol size="2">
            <MDBIcon icon="pencil-alt" className="ml-5 mr-5" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="py-2">
          <MDBCol size="2">
            <MDBIcon icon="phone" className="ml-5 mr-5" />
          </MDBCol>
          <MDBCol size="6" className="ml-4">
            {this.props.contact}
          </MDBCol>
          <MDBCol size="2">
            <MDBIcon icon="pencil-alt" className="ml-5 mr-5" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="py-2">
          <MDBCol size="2">
            <MDBIcon icon="key" className="ml-5 mr-5" />
          </MDBCol>
          <MDBCol size="6" className="ml-4">
            ************
          </MDBCol>
          <MDBCol size="2">
            <MDBIcon icon="pencil-alt" className="ml-5 mr-5" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default UserInfos;
