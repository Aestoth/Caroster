import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import UserEdit from "./UserEdit";

class UserInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userChange: []
    };
  }

  changeInfo = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    return (
      <div>
        <div className="card shadow">
          <div className=" card-header bg-info text-center text-white d-flex justify-content-between">
            <div></div>
            <div className="ml-5">Mes infos</div>
            <div>
              <MDBCol size="2">
                <MDBIcon
                  icon="pencil-alt"
                  className="mr-2"
                  onClick={this.changeInfo}
                />
              </MDBCol>
            </div>
          </div>
          {this.state.show ? (
            <UserEdit
              changeInfo={() => this.changeInfo()}
              fetchUsers={this.props.fetchUsers}
              users={this.props.users}
              deleteUser={this.props.deleteUser}
            />
          ) : (
            <MDBContainer className="mt-2 mb-2 ml-3">
              <MDBRow className=" py-2">
                <MDBCol size="2">
                  <MDBIcon icon="user-alt" className="ml-5 mr-5" />
                </MDBCol>
                <MDBCol size="6" className="ml-4">
                  {this.props.users.name}
                </MDBCol>
              </MDBRow>

              <MDBRow className="py-2">
                <MDBCol size="2">
                  <MDBIcon icon="envelope" className="ml-5 mr-5" />
                </MDBCol>
                <MDBCol size="6" className="ml-4">
                  {this.props.users.email}
                </MDBCol>
              </MDBRow>
              <MDBRow className="py-2">
                <MDBCol size="2">
                  <MDBIcon icon="phone" className="ml-5 mr-5" />
                </MDBCol>
                <MDBCol size="6" className="ml-4">
                  {this.props.users.contact}
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
          )}
        </div>
      </div>
    );
  }
}

export default UserInfos;
