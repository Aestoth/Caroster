import React, { Component } from "react";
import AddUserEvent from "./AddUserEvent";
import { MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
//import backendURL from "./helpers/getBackendURL";

class UserEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormEvent: false,
      eventsUser: []
    };
  }

  changeShowFormEvent = () => {
    const { showFormEvent } = this.state;
    this.setState({ showFormEvent: !showFormEvent });
  };

  render() {
    console.log("user-Id", this.props.usersEmail);
    return (
      <div className="card shadow">
        <div className="card-header bg-info text-center text-white d-flex justify-content-between">
          <div></div>
          <div className="ml-5">Mes événements</div>
          <div>
            <MDBIcon
              icon="plus"
              className=" mr-4"
              onClick={this.changeShowFormEvent}
            />
          </div>
        </div>

        {this.state.showFormEvent && (
          <AddUserEvent
            usersId={this.props.usersId}
            changeShowFormEvent={() => this.changeShowFormEvent()}
            fetchEventsUsers={this.props.fetchEventsUsers}
            usersEmail={this.props.usersEmail}
          />
        )}
        {this.props.eventsUser.map(({ _id, title }) => (
          <MDBCard key={_id} className="text-center">
            <MDBCardBody>
              <Link
                to={{
                  pathname: `/Event/${_id}`
                }}
              >
                {title}
              </Link>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
    );
  }
}

export default UserEvents;
