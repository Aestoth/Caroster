import React, { Component } from "react";
//import ModifierPassager from "./ModifierPassager";
import PassagersEnAttente from "./PassagersEnAttente";
import { MDBBtn, MDBIcon } from "mdbreact";
import AjouterListeDAttente from "./AjouterListeDAttente";
import backendURL from "./helpers/getBackendURL";

class ListeDAttente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showListeDAttente: false,
      showModifierPassager: false,
      passagers: []
    };
  }

  componentDidMount() {
    this.fetchPassagers();
  }

  fetchPassagers = () => {
    fetch(`${backendURL()}/api/passagers`)
      .then(response => response.json())
      .then(data => this.setState({ passagers: data.result }));
  };

  changeListeDAttente = () => {
    const { showListeDAttente } = this.state;
    this.setState({ showListeDAttente: !showListeDAttente });
  };

  render() {
    if (!this.state.passagers) return "loading...";
    return (
      <div className="container">
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
              <AjouterListeDAttente
                changeListeDAttente={() => this.changeListeDAttente()}
                fetchPassagers={() => this.fetchPassagers()}
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
          </div>
          <PassagersEnAttente
            passagers={this.state.passagers}
            fetchPassagers={() => this.fetchPassagers()}
          />
        </div>
      </div>
    );
  }
}

export default ListeDAttente;
