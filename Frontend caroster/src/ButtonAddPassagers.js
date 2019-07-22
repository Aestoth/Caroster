import React, { Component } from "react";
import { MDBBtn } from "mdbreact";

class ButtonAddPassagers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: false
    };
  }

  buttonAddPassager = () => {
    const buttonSieges = [];
    for (let i = 0; i < this.props.sieges; i++) {
      buttonSieges.push(
        <MDBBtn
          key={i}
          color="primary"
          className="list-group-item bg-primary border border-white mb-0"
          onClick={this.props.changeDiv}
          style={{ width: "97%" }}
        >
          <i className="fas fa-user-plus  mr-3" />
          Ajouter passager
        </MDBBtn>
      );
    }
    return buttonSieges;
  };

  render() {
    return <div>{this.buttonAddPassager()}</div>;
  }
}

export default ButtonAddPassagers;
