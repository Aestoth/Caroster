import React, { Component } from "react";
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBFooter } from "mdbreact";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import styled from "styled-components";


class AddVoiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      inputValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log(value);
    this.setState({ inputValue: value });
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const Button = styled.button`
      background-color: transparent;
      border: none;
    `;

    return (
      <div>
        <Navbar />
        <nav className="navbar navbar-dark primary-color d-flex justify-content-between">
          <Link to="/Evenement">
            <Button className="text-white">
              <i className="far fa-arrow-alt-circle-left fa-2x" />
            </Button>
          </Link>
       
        </nav>
        <div className="container-fluid cover-container d-flex">
          <div className="row col-12 align-items-center justify-content-center flex-fill mx-auto ">
            <form className="mx-auto">
              <div className="form-group col-12">
                <MDBInput
                  type="text"
                  label="Nom de la voiture"
                  icon="car"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                />
              </div>
              <div className="form-group col-12">
                <MDBInput
                  type="number"
                  label="Sièges"
                  icon="chair"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                />
              </div>
              <div className="form-group col-12">
                <MDBInput
                  type="text"
                  label="Notes"
                  icon="pen"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                />
              </div>         
                <h6 className="text-center text-uppercase mt-5">Lieu de rendez-vous</h6>
              <div className="form-group col-12">
                <MDBInput
                  type="text"
                  label="Adresse"
                  icon="map-marker-alt"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-0"
                />
              </div>
              <div className="md-form form-group col-12">
              <MDBInput
                  type="date"
                  icon="calendar"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-2"
                />
              </div>
              <div className="md-form form-group col-12">
              <MDBInput
                  type="time"
                  icon="clock"
                  format="hh:mm"
                  group
                  validate
                  error="wrong"
                  success="right"
                  className="mb-2"
                />
              </div>
              
              <div className="text-center mt-2">
                <MDBBtn className="text-uppercase text-white" type="cancel">
                  Annuler
                </MDBBtn>
                <Link to="/Evenement">
                  <MDBBtn className="text-uppercase text-white" type="submit">
                    Creer
                  </MDBBtn>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <MDBFooter color="blue" className="font-small pt-4 mt-5">
          <MDBContainer fluid className="text-md-left">
            <MDBRow className="justify-content-center">
              <MDBCol sm="6">
                <h2 className="title text-center">A propos</h2>
                <p className="text-center">
                  caroster.io est une façon simple et gratuite d'organiser du
                  covoiturage avec un groupe de personne pour se rendre à un
                  événement, un week-end, une fête, un tournoi ou juste quelque
                  part. Seulement, 3 cliques et 1 e-mail suffisent. caroster.io
                  est fait avec dans le but de vous simplifier vos covoiturages
                  de groupe.
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="footer-copyright py-3">
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

export default AddVoiture;
