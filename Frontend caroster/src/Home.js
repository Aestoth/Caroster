import React from "react";
import { Link } from "react-router-dom";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
  MDBMask,
  MDBView,
  MDBIcon,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBBtn
} from "mdbreact";

import { MDBFooter } from "mdbreact";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <div>
        <header>
          <MDBNavbar
            color="bg-primary"
            fixed="top"
            dark
            expand="md"
            scrolling
            transparent
          >
            <MDBNavbarBrand href="/">
              <strong>Caroster</strong>
            </MDBNavbarBrand>
            {!this.state.isWideEnough && (
              <MDBNavbarToggler onClick={this.onClick} />
            )}
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink to="/">
                    <MDBIcon icon="home mr-1" />
                    Acceuil
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/Registration">
                    <MDBIcon icon="pencil-alt mr-1" />
                    Inscription
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
<<<<<<< HEAD
                  <MDBNavLink to="/Login">
=======
                  <MDBNavLink to="/Connexion">
>>>>>>> 3cf1c0d589b44c9ccb84255af86b9b1dd5ed01eb
                    <MDBIcon icon="sign-in-alt mr-1" />
                    Connexion
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem />
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className=" d-md-inline">
                        <MDBIcon icon="globe mr-1" />
                        Français
                      </div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Français</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Anglais</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>

          <MDBView src="https://cap.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcap.2F2018.2F03.2F21.2Fcb986648-35c8-4b05-930f-796b651f246e.2Ejpeg/750x375/background-color/ffffff/quality/70/greve-sncf-et-ratp-vous-pouvez-beneficier-dun-covoiturage-gratuit-pour-aller-au-boulot-1278755.jpg">
            <MDBMask
              overlay=""
              className="flex-center flex-column text-white text-center"
            >
              <MDBContainer className="text-center">
                <div className="light-blue-text">
                  <h1>
                    <strong>Le covoiturage pratique</strong>
                  </h1>
                  <p className="lead mt-4">
                    Ideal pour les vacances, clubs, familles, équipes, tournois
                    et fêtes
                  </p>

                  <p className="mt-5">
                    <Link to="#">
                      <MDBBtn outline color="primary">
                        En Savoir plus
                      </MDBBtn>
                    </Link>

                    <Link to="/NewEvent">
                      <MDBBtn color="primary">COMMENCER</MDBBtn>
                    </Link>
                  </p>
                </div>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </header>

        <main>
          <MDBContainer className="text-center my-5">
            <div className="text-center">
              <h4>COMMENT ÇA MARCHE</h4>
            </div>
            <div className="row d-flex justify-content-center mt-4">
              <div className="col-10 col-xl-4 mb-3">
                <div className="card shadow">
                  <div className="card-header bg-primary" />
                  <div className="card-body text-center">
                    <p className="card-text">
                      Créez un espace dédié pour organiser le covoiturage de
                      votre événement.
                    </p>
                    <p>
                      <strong>Aucune création de compte</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-10 col-xl-4 mb-3">
                <div className="card shadow">
                  <div className="card-header bg-primary" />
                  <div className="card-body text-center">
                    <p className="card-text">
                      Partagez avec les personnes venant a votre événement, le
                      lien d'accès unique. Ensemble accèdez
                    </p>
                    <p>
                      <strong>
                        au tableau de bord d'organisation de covoiturage
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-10 col-xl-4">
                <div className="card shadow">
                  <div className="card-header bg-primary" />
                  <div className="card-body text-center">
                    <p className="card-text">Organiser votre covoiturage:</p>
                    <p>
                      <strong>Ajouter sa voiture ou sélectionner</strong>
                    </p>
                    <p>Facille comme bonjour!</p>
                  </div>
                </div>
              </div>
            </div>
          </MDBContainer>
        </main>
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
              <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
            </MDBContainer>
          </div>
        </MDBFooter>
      </div>
    );
  }
}

export default Home;
