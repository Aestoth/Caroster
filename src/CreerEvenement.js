import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdbreact";

class CreerEvenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { titre: "", email: "" }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ data: event.target.state });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container  pt-2">
          <div className="row mt-3 d-flex justify-content-center pt-4">
            <div className="col-md-6  px-5">
              <div className="card">
                <img
                  className="card-img-top img-fluid"
                  src="http://s1.lprs1.fr/images/2018/10/09/7914480_cchevallier-7599555022422250316_1000x625.jpg"
                  alt="Card cap"
                />
              </div>
            </div>
          </div>

          <form onSubmit={this.handleSubmit} className="">
            <div className="form-group mt-4 col-md-5 mx-auto">
              <MDBInput
                type="text"
                label="Titre"
                outline
                value={this.state.titre}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group col-md-5 mx-auto">
              <MDBInput
                type="text"
                label="Email"
                outline
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link to="/Voiture">
                <MDBBtn color="primary">Annuler</MDBBtn>
              </Link>
              <Link to="/Evenement">
                <MDBBtn type="submit" value="Submit" active color="primary">
                  Creer
                </MDBBtn>
              </Link>
            </div>
          </form>

          <div className="mt-5">
            <footer className="page-footer font-small teal fixed-bottom mt-5">
              <div className="footer-copyright text-center footerCopy bg-dark text-white">
                <div>
                  <small>A Propos</small>{" "}
                  <p className="mr-5 ml-5">
                    <small>
                      caroster.io est une façon simple et gratuite d'organiser
                      du covoiturage avec un groupe de personnes pour se rendre
                      a un evenement
                    </small>
                  </p>
                </div>
                <small>
                  Caroster <i className="far fa-copyright" /> 2019 Copyright:
                </small>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default CreerEvenement;
