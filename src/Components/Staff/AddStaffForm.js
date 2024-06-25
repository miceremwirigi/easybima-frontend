import React, { Component, Fragment } from "react";
import { Navigate, Link } from "react-router-dom";

class AddStaffForm extends Component {
  constructor(props) {
    super(props);
    // this.handleStaffFormData = this.props.handleStaffFormData.bind(this)
    this.state = {
      newstaff: {
        first_name: "",
        second_name: "",
        other_names: "",
        phone_number: "",
        location: "",
        email: "",
      },
      submitted: false,
    };
  }

  handleStaffFormData(entry) {
    const addedstaff = { ...this.state.newstaff };
    addedstaff[entry.target.id] = entry.target.value;
    this.setState({ newstaff: addedstaff });
  }

  submit(entry) {
    entry.preventDefault();
    this.setState({ submitted: true });
    fetch("/apis/staffs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.newstaff),
    })
      .then((response) => response.json())
      .then((reply) => console.log(reply))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Fragment>
        <div className="leave-form-button">
          <Link to={"/staff"}>
            <button>Back</button>
          </Link>
        </div>

        <div className="add-staff-form">
          <form onSubmit={(entry) => this.submit(entry)}>
            <label htmlFor="first_name"> First Name : </label>
            <input
              onChange={(entry) => this.handleStaffFormData(entry)}
              id="first_name"
              value={this.state.newstaff.first_name}
              placeholder="first name"
              type="text"
            ></input>
            <br />
            <label htmlFor="second_name"> Second Name : </label>
            <input
              onChange={(entry) => this.handleStaffFormData(entry)}
              id="second_name"
              value={this.state.newstaff.second_name}
              placeholder="second name"
              type="text"
            ></input>
            <br />
            <label htmlFor="other_names"> Other Names : </label>
            <input
              onChange={(entry) => this.handleStaffFormData(entry)}
              id="other_names"
              value={this.state.newstaff.other_names}
              placeholder="other names"
              type="text"
            ></input>
            <br />
            <label htmlFor="location"> Staff Location : </label>
            <input
              onChange={(entry) => this.handleStaffFormData(entry)}
              id="location"
              value={this.state.newstaff.location}
              placeholder="location"
              type="text"
            ></input>
            <br />
            <label htmlFor="phone_number"> Phone Number : </label>
            <input
              onChange={(entry) => this.handleStaffFormData(entry)}
              id="phone_number"
              value={this.state.newstaff.phone_number}
              placeholder="contact"
              type="text"
            ></input>
            <br />
            <label htmlFor="email"> Email : </label>
            <input
              onChange={(entry) => this.handleStaffFormData(entry)}
              id="email"
              value={this.state.newstaff.email}
              placeholder="owner name"
              type="text"
            ></input>
            <br />

            <input
              className="form-submit-btn"
              type="submit"
              value="Submit"
            ></input>
          </form>
        </div>
        {this.state.submitted && <Navigate to={"/staff"} />}
      </Fragment>
    );
  }
}

export default AddStaffForm;
