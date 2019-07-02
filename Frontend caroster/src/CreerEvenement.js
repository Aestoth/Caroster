import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdbreact";

class CreerEvenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titre: "",
      email: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/post/new", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Success" + data);
      });
    });
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

          <form
            onSubmit={this.handleSubmit}
            action="/api/post/new"
            className=""
          >
            <div className="form-group mt-4 col-md-5 mx-auto">
              <MDBInput
                type="text"
                label="Titre"
                outline
                name="titre"
                value={this.state.titre}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group col-md-5 mx-auto">
              <MDBInput
                type="email"
                label="Email"
                outline
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link to="/Evenement">
                <MDBBtn color="primary">Annuler</MDBBtn>
              </Link>

              <MDBBtn type="submit" value="Submit" active color="primary">
                Creer
              </MDBBtn>
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
