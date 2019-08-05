import React, { Component } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { MDBBtn, MDBInput, MDBFooter, MDBContainer } from "mdbreact";
import backendURL from "./helpers/getBackendURL";

class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      email: ""
    };
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${backendURL()}/api/event`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Success", data);
        this.props.history.push("/Event/" + data._id);
      });
    });
  };

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
                label="title"
                outline
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
                required
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
                required
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Link to="/">
                <MDBBtn color="primary">Annuler</MDBBtn>
              </Link>

              <MDBBtn type="submit" value="Submit" active color="primary">
                Creer
              </MDBBtn>
            </div>
          </form>
        </div>
        <div className="mt-5">
          <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <MDBContainer className="text-center text-md-center">
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
              <MDBContainer>
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a href="https://www.MDBootstrap.com"> Caroster </a>
              </MDBContainer>
            </div>
          </MDBFooter>
        </div>
      </div>
    );
  }
}

export default NewEvent;
