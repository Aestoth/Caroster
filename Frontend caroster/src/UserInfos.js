import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import UserEdit from "./UserEdit";
//import backendURL from "./helpers/getBackendURL";

class UserInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userChange: []
    };
  }

  // deleteUser = e => {
  //   e.preventDefault();
  //   fetch(`${backendURL()}/api/passengers/${this.props.users._id}`, {
  //     method: "DELETE",
  //     body: JSON.stringify(this.state),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   }).then(response => {
  //     response.json().then(data => {
  //       console.log(data.result);
  //       this.props.history.push("/");
  //     });
  //   });
  // };

  changeInfo = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    return (
      <div>
        <div className="card shadow">
          <div className=" card-header bg-info text-center text-white d-flex justify-content-between">
            <div className="col-md-2 col-sm-2"></div>
            <div className="col-md-5 col-sm-5">Mes infos</div>
            <div className="col-md-2 col-sm-2">
              <MDBCol size="2">
                <MDBIcon
                  icon="pencil-alt"
                  className="ml-3 mr-4"
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
            <MDBContainer className="mt-2 mb-2 ml-5">
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
