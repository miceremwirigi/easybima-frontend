import React, { Component, Fragment } from "react";
import { Navigate, Link } from "react-router-dom";
// import AddPolicyFields from '../Policies/AddPolicyFields'
import Loader from "../Loader";

// Shows one staff details
export default class StaffView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: {
        first_name: "",
        second_name: "",
        other_names: "",
        phone_number: "",
        location: "",
        email: "",
      },
      updatedstaff: {
        first_name: "",
        second_name: "",
        other_names: "",
        phone_number: "",
        location: "",
        email: "",
      },
      isLoadingData: false,
      submitted: false,
      isdeleted: false,
    };
    this.handleUpdateStaffFormData = this.handleUpdateStaffFormData.bind(this);
  }

  // populate updated staffs state as they are typed
  handleUpdateStaffFormData(entry) {
    const addedstaff = { ...this.state.updatedstaff };
    addedstaff[entry.target.id] = entry.target.value;
    this.setState({ updatedstaff: addedstaff });
    console.log("Set child state = ", this.state.updatedstaff);
  }

  // fetch individual staff details
  fetchStaff = () => {
    this.setState({ isLoadingData: true });
    const id = this.props.match.params.id; // Rereiving id from url

    fetch("https://apis.bimapap.co.ke/apis/staffs/" + id)
      .then((response) =>
        response.json().then((json) => {
          this.setState({ staff: json.data });
          this.setState({ updatedstaff: json.data });
        })
      )
      .then(() => {
        this.setState({ isLoadingData: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // delete one staff
  deleteStaff = () => {
    this.setState({ isLoadingData: true });
    const id = this.props.match.params.id; // Retreiving id from url

    fetch("https://apis.bimapap.co.ke/apis/staffs/delete/" + id, {
      method: "DELETE",
    })
      .then((response) =>
        response.json().then((json) => {
          this.setState({ isLoadingData: false });
          this.setState({ isdeleted: true });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  // show dialog modal with staff update form
  showModalPopUp = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    modal.showModal();
  };

  // close dialog modal
  closeModalPopup = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    modal.close();
  };

  // send update request to api to update staff
  updateStaff = (entry) => {
    entry.preventDefault();
    this.setState({ isLoadingData: true });
    const id = this.props.match.params.id; // Rereiving id from url

    // Submit Staff
    this.setState({ submitted: true });
    fetch("https://apis.bimapap.co.ke/apis/staffs/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.updatedstaff),
    })
      .then((response) => response.json())
      .then((reply) => {
        console.log(reply);
        this.setState({ submitted: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // load once component has mounted
  componentDidMount() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    this.fetchStaff();
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoadingData ? (
          <Loader />
        ) : (
          <>
            <div className="info-card">
              <div className="staff-profile-column">
                <div className="profile-entry">
                  <h3>Staff Name</h3>
                  <div className="staff_name">
                    {this.state.staff.first_name +
                      " " +
                      this.state.staff.second_name +
                      " " +
                      this.state.staff.other_names}
                  </div>
                </div>
                <br />
                <div className="profile-entry">
                  <h3>Phone Number</h3>
                  <div className="phone-number">
                    <a href={"tel:" + this.state.staff.phone_number}>
                      {this.state.staff.phone_number}
                    </a>
                  </div>
                  <br />
                </div>
                <div className="profile-entry">
                  <h3>Email</h3>
                  <div className="secondary-phone-number">
                    <a href={"mailto:" + this.state.staff.email}>
                      {this.state.staff.email}
                    </a>
                  </div>
                  <br />
                </div>
                <div className="profile-entry">
                  <h3>Location</h3>
                  <div className="location">{this.state.staff.location}</div>
                  <br />
                </div>
              </div>
            </div>
          </>
        )}

        <dialog id="modal" stack="true">
          <form onSubmit={(entry) => this.updateStaff(entry)}>
            <label htmlFor="first_name"> First Name : </label>
            <input
              onChange={(entry) => this.handleUpdateStaffFormData(entry)}
              id="first_name"
              value={this.state.updatedstaff.first_name}
              placeholder="first name"
              type="text"
            ></input>
            <br />
            <label htmlFor="second_name"> Second Name : </label>
            <input
              onChange={(entry) => this.handleUpdateStaffFormData(entry)}
              id="second_name"
              value={this.state.updatedstaff.second_name}
              placeholder="second name"
              type="text"
            ></input>
            <br />
            <label htmlFor="other_names"> Other Names : </label>
            <input
              onChange={(entry) => this.handleUpdateStaffFormData(entry)}
              id="other_names"
              value={this.state.updatedstaff.other_names}
              placeholder="other names"
              type="text"
            ></input>
            <br />
            <label htmlFor="location"> Staff Location : </label>
            <input
              onChange={(entry) => this.handleUpdateStaffFormData(entry)}
              id="location"
              value={this.state.updatedstaff.location}
              placeholder="location"
              type="text"
            ></input>
            <br />
            <label htmlFor="phone_number"> Phone Number : </label>
            <input
              onChange={(entry) => this.handleUpdateStaffFormData(entry)}
              id="phone_number"
              value={this.state.updatedstaff.phone_number}
              placeholder="contact"
              type="text"
            ></input>
            <br />
            <label htmlFor="email"> Email : </label>
            <input
              onChange={(entry) => this.handleUpdateStaffFormData(entry)}
              id="email"
              value={this.state.updatedstaff.email}
              placeholder="owner name"
              type="text"
            ></input>
            <br />
            <br />

            <input
              className="form-submit-btn"
              type="submit"
              value="Submit"
            ></input>
          </form>
          <button id="close-modal" onClick={() => this.closeModalPopup()}>
            Close
          </button>
        </dialog>
        {this.state.submitted && <Navigate to={"/staff"} />}

        <div className="action-buttons">
          <div className="delete-button">
            <button onClick={() => this.deleteStaff()}>Delete</button>
          </div>
          <div className="update-button">
            <button onClick={() => this.showModalPopUp()}>Edit</button>
          </div>

          {this.state.isdeleted && <Navigate to={"/staff"} />}

          <div className="leave-view-button">
            <Link to={"/staff"}>
              <button>Back</button>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}
