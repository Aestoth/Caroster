import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBIcon, MDBTooltip } from "mdbreact";
import FormAddUserCar from "./FormAddUserCar";
import { Link } from "react-router-dom";

class UserCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormCar: false,
      carUser: []
    };
  }

  changeShowFormCar = () => {
    const { showFormCar } = this.state;
    this.setState({ showFormCar: !showFormCar });
  };

  render() {
    console.log("userCar", this.props.usersId);
    return (
      <div className="card shadow mt-5">
        <div className="card-header bg-info text-center text-white d-flex justify-content-between">
          <div></div>
          <div className="ml-5">Mes voitures</div>
          <div>
            <MDBIcon
              icon="plus"
              className=" mr-4"
              onClick={this.changeShowFormCar}
            />
          </div>
        </div>

        {this.state.showFormCar && (
          <FormAddUserCar
            changeShowFormCar={() => this.changeShowFormCar()}
            fetchCarsUsers={this.props.fetchCarsUsers}
            usersId={this.props.usersId}
          />
        )}

        {this.props.carUser.map(({ _id, carName }) => (
          <MDBCard key={_id} className="text-center">
            <MDBCardBody>
              <MDBTooltip placement="right">
                <Link
                  to={{
                    pathname: `/UpdateCarUser/${_id}`,
                    state: { params: { id: this.props.usersId } }
                  }}
                >
                  {carName}
                </Link>
                <div>Click ici pour modifier les infos de votre voiture</div>
              </MDBTooltip>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
    );
  }
}

export default UserCars;
