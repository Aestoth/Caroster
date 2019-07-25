import React, { Component } from "react";
import Navbar from "./Navbar";
import "./User.css";
import UserInfos from "./UserInfos";
//import backendURL from "./helpers/getBackendURL";
import UserEdit from "./UserEdit";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
  MDBCol,
  MDBFooter
} from "mdbreact";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfos: this.props.location.state,
      show: false
    };
  }

  logoutHandler = e => {
    this.props.history.replace("/");
  };

  changeInfo = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    console.log("idUser", this.props.location.state);
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="text-white">
            <i className="far fa-arrow-alt-circle-left fa-2x" />
          </div>
          <div className="ml-5 text-white">
            {this.props.location.state.user.name}
          </div>
          <div>
            <MDBBtn onClick={this.logoutHandler} color="indigo btn-sm">
              Déconnexion
            </MDBBtn>
          </div>
        </nav>
        <MDBContainer className="mt-5 mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 mb-5">
              <div className="card shadow">
                <div className="card-header blue-grey darken-1 text-center text-white d-flex justify-content-center">
                  Mes événements
                </div>
                <MDBCard color="cyan lighten-5" text="" className="text-center">
                  <MDBCardBody>BARBECUE BOB</MDBCardBody>
                </MDBCard>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6  mb-5">
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
                    name={this.props.location.state.user.name}
                    contact={this.props.location.state.user.contact}
                    email={this.props.location.state.user.email}
                    password={this.props.location.state.user.password}
                    _id={this.props.location.state.user._id}
                    changeInfo={() => this.changeInfo()}
                  />
                ) : (
                  <UserInfos
                    _id={this.props.location.state.user._id}
                    name={this.props.location.state.user.name}
                    contact={this.props.location.state.user.contact}
                    email={this.props.location.state.user.email}
                  />
                )}
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6  mb-5">
              {" "}
              <div className="card shadow">
                <div className="card-header bg-info text-center text-white">
                  Mes voitures
                </div>
                <MDBCard
                  color="mdb-color lighten-2"
                  text="white"
                  className="text-center"
                >
                  <MDBCardBody>Golf blue</MDBCardBody>
                </MDBCard>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 ">
              {" "}
              <div className="card shadow">
                <div className="card-header bg-info text-center text-white ">
                  Mes participantions
                </div>
                <MDBCard
                  color="mdb-color lighten-2"
                  text="white"
                  className="text-center"
                >
                  <MDBCardBody>ANNIVERSAIRE DUPONT</MDBCardBody>
                </MDBCard>
              </div>
            </div>
          </div>
        </MDBContainer>
        <MDBFooter color="blue" className="font-small pt-4 mt-5">
          <MDBContainer fluid className="text-center text-md-center">
            <h5 className="title">A Propos</h5>
            <p>
              Caroster.io est une façon simple et gratuite d'organiser du
              covoiturage avec un groupe de personnes pour se rendre a un
              événement, un week-end, une fête, un tournoi ou juste quelque
              part. Seulement 3 cliques et 1 e-mail suffisent. Caroster.io est
              fait avec le but de vous simplifier vos covoiturages de groupe.
            </p>
          </MDBContainer>
          <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Copyright:{" "}
              <a href="https://www.MDBootstrap.com"> Caroster </a>
            </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    );
  }
}

export default User;
