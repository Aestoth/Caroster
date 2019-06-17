import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

class Insciption extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container bg-light py-5 mt-5">
          <form
            id="contact-form"
            method="post"
            action="contact.php"
            role="form"
          >
            <div className="messages" />
            <div className="controls">
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="form_name">Name *</label>
                    <input
                      id="form_name"
                      type="text"
                      name="surname"
                      className="form-control"
                      placeholder="Please enter your name *"
                      required="required"
                      data-error="name is required."
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="form_email">Email *</label>
                    <input
                      id="form_email"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Please enter your email *"
                      required="required"
                      data-error="Valid email is required."
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label htmlFor="form_phone">Phone</label>
                    <input
                      id="form_phone"
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="Please enter your phone number"
                    />
                    <div className="help-block with-errors" />
                  </div>
                </div>
              </div>
            </div>
            <div className="clearfix" />

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="form_message">Message *</label>
                  <textarea
                    id="form_message"
                    name="message"
                    className="form-control"
                    placeholder="Message for me *"
                    rows="4"
                    required="required"
                    data-error="send a message."
                  />
                  <div className="help-block with-errors" />
                </div>
              </div>
              <div className="col-md-12">
                <input
                  type="submit"
                  className="btn btn-warning btn-send"
                  value="Send message"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="text-muted">
                  <strong>*</strong> These fields are required.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Insciption;
