import React, { Component } from "react";
import ModifierPassager from "./ModifierPassager";
import { MDBBtn, MDBIcon, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import AjouterListeDAttente from "./AjouterListeDAttente";
import backendURL from "./helpers/getBackendURL";

class ListeDAttente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showListeDAttente: false,
      showModifierPassager: false,
      passagers: [],
      passagerModif: [],
      showPassagers: []
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

  ModifierPassager = id => {
    const passagers = this.state.passagers.find(item => item._id === id);
    const { showModifierPassager } = this.state;

    this.setState({
      showModifierPassager: !showModifierPassager,
      passagerModif: passagers
    });

    console.log(passagers);
  };

  changeModifierPassager = id => {
    const { showModifierPassager } = this.state;

    this.setState({
      showModifierPassager: !showModifierPassager
    });
  };

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
    fetch(`${backendURL()}/api/passagers/new`, {
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
          <MDBContainer className="mt-3">
            {this.state.showModifierPassager ? (
              <ModifierPassager
                passagerModif={this.state.passagerModif}
                changeModifierPassager={() => this.changeModifierPassager()}
                fetchPassagers={() => this.fetchPassagers()}
              />
            ) : (
              this.state.passagers.map(({ _id, nom }) => (
                <MDBRow key={_id}>
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
                      onClick={() => this.ModifierPassager(_id)}
                    />
                  </MDBCol>
                </MDBRow>
              ))
            )}
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default ListeDAttente;
