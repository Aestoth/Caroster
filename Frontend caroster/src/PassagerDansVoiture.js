import React, { Component } from "react";
import { MDBIcon, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import EditPassengersCar from "./EditPassengersCar";

class PassagerDansVoiture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      passengerEdit: []
    };
  }

  showEditPassengers = id => {
    const passagers = this.props.passengersCar.find(item => item._id === id);
    const { showEdit } = this.state;

    this.setState({
      showEdit: !showEdit,
      passengerEdit: passagers
    });

    console.log(passagers);
  };

  render() {
    console.log(this.props.passengersCar);
    return (
      <MDBContainer>
        {this.state.showEdit && (
          <EditPassengersCar
            passengerEdit={this.state.passengerEdit}
            showEditPassengers={() => this.showEditPassengers()}
            fetchCarPassengers={this.props.fetchCarPassengers}
          />
        )}
        {this.props.passengersCar.map(({ _id, name }) => (
          <MDBRow key={_id} className="green lighten-4 border border-white p-2">
            <MDBCol size="10">
              <i className="fas fa-user pr-0 mr-3" />
              {name}
            </MDBCol>
            <MDBCol size="2">
              {" "}
              <MDBIcon
                icon="pencil-alt"
                onClick={() => this.showEditPassengers(_id)}
              />
            </MDBCol>
          </MDBRow>
        ))}
      </MDBContainer>
    );
  }
}

export default PassagerDansVoiture;
