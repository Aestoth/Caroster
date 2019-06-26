import React, { Component } from "react";
import { MDBInput } from "mdbreact";

class Passagers extends Component {
  render() {
    return (
      <form>
        <div className="row">
          <div className="col-8 ml-3">
            <MDBInput size="sm" className="ml-2" label="Nom passagers" />
          </div>
          <div className="col-1 mt-3">
            <i className="fas fa-check mt-4 ml-2" />
          </div>
          <div className="col-1 mt-3">
            <i className="fas fa-times mt-4 ml-3" />
          </div>
        </div>
      </form>
    );
  }
}

export default Passagers;
