import React, { Component } from "react";
import "./Evenement.css";
import Navbar from "./Navbar";
import Passagers from "./Passagers";
import {
  MDBFooter,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBPopover,
  MDBPopoverHeader
} from "mdbreact";

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  changeDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <div className="text-white">
            <i className="far fa-arrow-alt-circle-left fa-2x" />
          </div>
          <div className="ml-5 text-white">
            <h5>Nom événement</h5>
          </div>
          <div>
            <MDBBtn color="indigo btn-sm">
              <MDBIcon icon="plus" size="2x" className="mr-2 " />
              <MDBIcon icon="car" size="2x" />
            </MDBBtn>
          </div>
        </nav>
        <div className="container">
          <div className="row d-flex justify-content-center mt-4">
            <div className="col-md-5 col-sm-8 col-lg-5">
              <div className="card shadow">
                <div className="card-header bg-info text-center text-white">
                  <i className="fas fa-list mr-2" />
                  Liste d'attente
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagers
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-9 marginTable col-sm-9 col-lg-8 col-xl-5">
              <div className="card shadow">
                <div className="card-header bg-info text-white d-flex justify-content-between">
                  <div />
                  <div>
                    <i className="fas fa-car mr-2" />
                    Non de la voiture
                  </div>
                  <div>
                    <i className="fas fa-pencil-alt " />
                  </div>
                </div>

                <MDBContainer className="mt-4 d-flex justify-content-center">
                  <MDBListGroup style={{ width: "20rem" }}>
                    <MDBListGroupItem color="secondary">
                      {" "}
                      <MDBIcon icon="phone" size="2x" className="mr-5" />
                      <MDBPopover
                        placement="right"
                        popover
                        clickable
                        id="popper2"
                      >
                        <MDBBtn size="sm"> Contact</MDBBtn>

                        <MDBPopoverHeader>0791234567</MDBPopoverHeader>
                      </MDBPopover>
                    </MDBListGroupItem>
                    <MDBListGroupItem color="secondary">
                      <MDBIcon icon="calendar-alt" size="2x" className="mr-5" />
                      mar. 28 mai à
                    </MDBListGroupItem>
                    <MDBListGroupItem color="secondary">
                      <MDBIcon
                        icon="map-marker-alt"
                        size="2x"
                        className="mr-5 "
                      />
                      <a href="#">Rue Lamartine</a>
                    </MDBListGroupItem>
                    <MDBListGroupItem color="secondary">
                      <MDBIcon icon="comment-alt" size="2x" className="mr-5" />
                      Pas de chien
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBContainer>

                <ul className="list-group list-group-flush mt-4">
                  {this.state.show ? (
                    <Passagers />
                  ) : (
                    <MDBBtn
                      color="primary"
                      className="list-group-item bg-primary border border-white mb-0"
                      onClick={this.changeDiv}
                    >
                      <i className="fas fa-user-plus ml-3 mr-3" />
                      Ajouter passagres
                    </MDBBtn>
                  )}

                  <MDBBtn color="primary">
                    <i className="fas fa-user-plus ml-3 mr-3" />
                    Ajouter passagres
                  </MDBBtn>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
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
} //Fin de la class

export default Evenement;
