import React, { Component } from "react";
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

class Voiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      nom: []
    };
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

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/post/voiture", {
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
      <div className="container">
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
            style={{ width: "20rem" }}
          >
            <MDBRow className="mdb-color lighten-5 py-2 border-bottom border-light">
              <MDBCol size="2">
                <MDBIcon icon="phone" size="2x" />
              </MDBCol>
              <MDBCol
                className="d-flex align-items-center d-flex justify-content-center"
                size="8"
              >
                <MDBPopover placement="right" popover clickable id="popper2">
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
                Pas de chien , sssssssss, ssssssss, ssssssss, ssssssssssssss
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
    );
  }
}

export default Voiture;
