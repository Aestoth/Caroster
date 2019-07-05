import React, { Component } from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBFooter } from "mdbreact";
import "bootstrap/dist/css/bootstrap.css";

class footer extends Component {
    render() {
        return (
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
        );
    }
}

export default footer;