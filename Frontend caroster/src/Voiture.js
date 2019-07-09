import React, { Component } from "react";
import "./Voiture.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBPopover,
  MDBPopoverHeader
} from "mdbreact";
import Passagers from "./Passagers";
import backendURL from "./helpers/getBackendURL";
import { Link } from "react-router-dom";

class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      nom: [],
      voitures: [],
      EventId: this.props.id
    };
  }

  componentDidMount() {
    fetch(`${backendURL()}/api/voiture/all`)
      .then(res => res.json())
      .then(data => this.setState({ voitures: data.result }));
  }

  changeDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  changeShowPassager = result => {
    const { show } = this.state;

    this.setState({ show: !show });
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
    console.log("test", this.state);
    return (
      <div className="container">
        {this.state.voitures.map(
          ({ _id, nomVoiture, infoComp, contact, adresse, date, horaire }) => (
            <div key={_id} className="card shadow marginTable">
              <div className="card-header bg-info text-white d-flex justify-content-between">
                <div />
                <div>
                  <i className="fas fa-car mr-2" />
                  {nomVoiture}
                </div>
                <div>
                  <Link
                    to={{
                      pathname: `/ModifierVoiture/${_id}`,
                      state: { params: { id: this.state.EventId } }
                    }}
                  >
                    <i className="fas fa-pencil-alt " />
                  </Link>
                </div>
              </div>

              <MDBContainer
                className="border rounded mt-4"
                style={{ width: "22rem" }}
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

                      <MDBPopoverHeader>{contact}</MDBPopoverHeader>
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
                    {date} à {horaire}
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
                    <a href="#">{adresse}</a>
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
                    {infoComp}
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
          )
        )}
      </div>
    );
  }
}

export default Voiture;
