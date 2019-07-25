import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import UserEdit from "./UserEdit";
import backendURL from "./helpers/getBackendURL";

class UserInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userChange: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    console.log("up", this.state.userChange.name);
    fetch(`${backendURL()}/api/user/${this.props._id}`)
      .then(response => response.json())
      .then(data => this.setState({ userChange: data }));
    console.log("uptd", this.state.userChange);
  };

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
                  className="ml-3 mr-5"
                  onClick={this.changeInfo}
                />
              </MDBCol>
            </div>
          </div>
          {this.state.show ? (
            <UserEdit
              name={this.state.userChange.name}
              contact={this.state.userChange.contact}
              email={this.state.userChange.email}
              password={this.state.userChange.password}
              _id={this.state.userChange._id}
              changeInfo={() => this.changeInfo()}
              user={this.state.userChange}
              fetchUsers={() => this.fetchUsers()}
            />
          ) : (
            <MDBContainer className="mt-2 mb-2 ml-4">
              <MDBRow className=" py-2">
                <MDBCol size="2">
                  <MDBIcon icon="user-alt" className="ml-5 mr-5" />
                </MDBCol>
                <MDBCol size="6" className="ml-4">
                  {this.state.userChange.name}
                </MDBCol>
              </MDBRow>

              <MDBRow className="py-2">
                <MDBCol size="2">
                  <MDBIcon icon="envelope" className="ml-5 mr-5" />
                </MDBCol>
                <MDBCol size="6" className="ml-4">
                  {this.state.userChange.email}
                </MDBCol>
              </MDBRow>
              <MDBRow className="py-2">
                <MDBCol size="2">
                  <MDBIcon icon="phone" className="ml-5 mr-5" />
                </MDBCol>
                <MDBCol size="6" className="ml-4">
                  {this.state.userChange.contact}
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
