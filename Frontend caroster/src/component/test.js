import React, { Component } from "react";
import "./Evenement.css";
import Navbar from "./Navbar";
import Passagers from "./Passagers";
import ListeDAttente from "./ListeDAttente";
import ModifierPassager from "./ModifierPassager";
import backendURL from "../helpers/getBackendURL";

import {
  MDBFooter,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBPopover,
  MDBPopoverHeader,
  MDBCol,
  MDBRow
} from "mdbreact";

class Evenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showListeDAttente: false,
      showModifierPassager: false,
      nom: []
    };
  }

  componentDidMount() {
    fetch(`${backendURL()}/api/get/passagers`)
      .then(response => response.json())
      .then(data => this.setState({ nom: data.result }));
  }

  changeDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  changeListeDAttente = () => {
    const { showListeDAttente } = this.state;
    this.setState({ showListeDAttente: !showListeDAttente });
  };

  ModifierPassager = id => {
    const { showModifierPassager } = this.state;
    this.setState({ showModifierPassager: !showModifierPassager });
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
                <div className="card-header bg-info text-center text-white d-flex justify-content-between">
                  <div />
                  <div className="">
                    <i className="fas fa-list mr-2" />
                    Liste d'attente
                  </div>
                  <div className="">
                    <MDBIcon icon="info-circle" />
                  </div>
                </div>

                <div className="list-group list-group-flush">
                  {this.state.showListeDAttente ? (
                    <ListeDAttente
                      ModifierPassager={() => this.ModifierPassager()}
                      changeListeDAttente={() => this.changeListeDAttente()}
                    />
                  ) : (
                    <MDBBtn
                      color="grey darken-1"
                      className="list-group-item bg-primary border border-white mb-0"
                      onClick={this.changeListeDAttente}
                    >
                      <i className="fas fa-user-plus  mr-3" />
                      Ajouter passager
                    </MDBBtn>
                  )}
                  <MDBContainer className="mt-3">
                    {this.state.showModifierPassager ? (
                      <ModifierPassager
                        ModifierPassager={() => this.ModifierPassager()}
                      />
                    ) : (
                      this.state.nom.map(({ id, nom }) => (
                        <MDBRow key={id}>
                          <MDBCol size="5" className="mr-0 mt-2">
                            {" "}
                            <i className="fas fa-user pr-0 mr-1" />
                            {nom}
                          </MDBCol>
                          <MDBCol size="5" className="ml-0 ">
                            <select
                              className="form-control mb-3"
                              id="exampleFormControlSelect1"
                            >
                              <option>Aller avec</option>
                              <option>Voiture 1</option>
                              <option>Voiture 2</option>
                            </select>
                          </MDBCol>
                          <MDBCol size="1" className="mt-2">
                            <MDBIcon
                              icon="pencil-alt"
                              onClick={() => this.ModifierPassager(id)}
                            />
                          </MDBCol>
                        </MDBRow>
                      ))
                    )}
                  </MDBContainer>
                </div>
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

                <MDBContainer
                  className="border rounded mt-4"
                  style={{ width: "21rem" }}
                >
                  <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
                    <MDBCol size="2">
                      <MDBIcon icon="phone" size="2x" />
                    </MDBCol>
                    <MDBCol
                      className="d-flex align-items-center d-flex justify-content-center"
                      size="8"
                    >
                      <MDBPopover
                        placement="right"
                        popover
                        clickable
                        id="popper2"
                      >
                        <MDBBtn size="sm"> Contact</MDBBtn>

                        <MDBPopoverHeader>0791234567</MDBPopoverHeader>
                      </MDBPopover>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
                    <MDBCol size="2">
                      <MDBIcon icon="calendar-alt" size="2x" className="" />
                    </MDBCol>
                    <MDBCol
                      className="d-flex align-items-center d-flex justify-content-center"
                      size="8"
                    >
                      mar. 28 mai à
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
                    <MDBCol size="2">
                      <MDBIcon icon="map-marker-alt" size="2x" className=" " />
                    </MDBCol>
                    <MDBCol
                      className="d-flex align-items-center d-flex justify-content-center text-center"
                      size="8"
                    >
                      <a href="#">Rue Lamartine ...</a>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
                    <MDBCol size="2">
                      <MDBIcon icon="comment-alt" size="2x" />
                    </MDBCol>
                    <MDBCol
                      className="d-flex align-items-center d-flex justify-content-center text-center"
                      size="8"
                    >
                      Pas de chien , sssssssss, ssssssss, ssssssss,
                      ssssssssssssss sssss ssss
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>

                <ul className="list-group list-group-flush mt-4">
                  {this.state.show ? (
                    <Passagers changeDiv={() => this.changeDiv()} />
                  ) : (
                    <MDBBtn
                      color="primary"
                      className="list-group-item bg-primary border border-white mb-0"
                      onClick={this.changeDiv}
                    >
                      <i className="fas fa-user-plus  mr-3" />
                      Ajouter passager
                    </MDBBtn>
                  )}

                  <MDBBtn color="primary">
                    <i className="fas fa-user-plus  mr-3" />
                    Ajouter passager
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

<form onSubmit={this.handleSubmit}>
  <div className="row">
    <div className="col-8 ml-3">
      <MDBInput
        size="sm"
        className="ml-2"
        label="Nom passagers"
        name="nom"
        value={this.state.nom}
        onChange={this.handleInputChange}
      />
    </div>
    <div className="col-1 mt-3">
      <InconButton type="submit" value="Submit" id="completed-task">
        <i className="fas fa-check mt-4 ml-2" />
      </InconButton>
    </div>
    <div className="col-1 mt-3">
      <InconButton type="button" onClick={this.props.changeListeDAttente}>
        <i className="fas fa-times mt-4 ml-3" />
      </InconButton>
    </div>
  </div>
</form>;
