import React, { Component, Fragment } from "react";
import { Navigate, Link } from "react-router-dom";
// import AddPolicyFields from '../Policies/AddPolicyFields'
import Loader from "../Loader";

// Shows one prospect details
export default class ProspectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prospect: {
        first_name: "",
        second_name: "",
        other_names: "",
        phone_number: "",
        policy_type:"",
        expiry_date:"",
        location: "",
        email: "",
      },
      updatedprospect: {
        first_name: "",
        second_name: "",
        other_names: "",
        phone_number: "",
        policy_type:"",
        expiry_date:"",
        location: "",
        email: "",
      },


      formattedprospect: {
        first_name: "",
        second_name: "",
        other_names: "",
        phone_number: "",
        policy_type:"",
        expiry_date:"",
        location: "",
        email: "",
      },

      isLoadingData: false,
      submitted: false,
      isdeleted: false,
    };
    this.handleUpdateProspectFormData = this.handleUpdateProspectFormData.bind(this);
  }

  // populate updated prospects state as they are typed
  handleUpdateProspectFormData(entry) {
    const addedprospect = { ...this.state.updatedprospect };
    addedprospect[entry.target.id] = entry.target.value;
    this.setState({ updatedprospect: addedprospect });
    console.log("Set child state = ", this.state.updatedprospect);

    const prospectToPost = {...this.state.updatedprospect}
    if (entry.target.id==="expiry_date" ){
        console.log(entry.target.id , " .... : ",addedprospect[entry.target.id])
        const dateField = new Date(addedprospect[entry.target.id])
        prospectToPost[entry.target.id] = dateField.toISOString()
    }
        prospectToPost[entry.target.id] = addedprospect[entry.target.id];
        const expiryDate = new Date(prospectToPost.expiry_date);
        console.log("Date Before= ", expiryDate)
        console.log("Clean Date = ", expiryDate.toISOString())
        prospectToPost.expiry_date = expiryDate.toISOString()
    
    
    this.setState({formattedprospect:prospectToPost})

    console.log("Set parent state = ", this.state.updatedprospect)
    console.log("Child to set = ", this.state.formattedprospect)
  }

  // fetch individual prospect details
  fetchProspect = () => {
    this.setState({ isLoadingData: true });
    const id = this.props.match.params.id; // Rereiving id from url
    var temporaryProspect = {};
    var date = {};
    var dateString = ""

    fetch("https://apis.bimapap.co.ke/apis/prospects/" + id)
      .then((response) =>
        response.json().then((json) => {
          this.setState({ prospect: json.data });
          this.setState({ updatedprospect: json.data });
        })
      )
      .then(() => {
        this.setState({ isLoadingData: false });
        
      })
      .catch((error) => {
        console.log(error);
      });

      temporaryProspect = { ...this.state.updatedprospect }
      date = new Date(this.state.updatedprospect.expiry_date)
      dateString = date.toISOString().substring(0, 10); // truncates 2024-07-18T07:57:13.877634Z expected format.
      temporaryProspect.expiry_date = dateString
      this.setState({ updatedprospect: temporaryProspect });      

  };

  // delete one prospect
  deleteProspect = () => {
    this.setState({ isLoadingData: true });
    const id = this.props.match.params.id; // Retreiving id from url

    fetch("https://apis.bimapap.co.ke/apis/prospects/delete/" + id, {
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

  // show dialog modal with prospect update form
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

  // send update request to api to update prospect
  updateProspect = (entry) => {
    entry.preventDefault();
    this.setState({ isLoadingData: true });
    const id = this.props.match.params.id; // Rereiving id from url

    // Submit Prospect
    fetch("https://apis.bimapap.co.ke/apis/prospects/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.formattedprospect),
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
    this.fetchProspect();
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoadingData ? (
          <Loader />
        ) : (
          <>
            <div className="info-card">
              <div className="prospect-profile-column">
                <div className="profile-entry">
                  <h3>Prospect Name</h3>
                  <div className="prospect_name">
                    {this.state.prospect.first_name +
                      " " +
                      this.state.prospect.second_name +
                      " " +
                      this.state.prospect.other_names}
                  </div>
                </div>
                <br />
                <div className="profile-entry">
                  <h3>Phone Number</h3>
                  <div className="phone-number">
                    <a href={"tel:" + this.state.prospect.phone_number}>
                      {this.state.prospect.phone_number}
                    </a>
                  </div>
                  <br />
                </div>
                <div className="profile-entry">
                  <h3>Policy Type</h3>
                  <div className="policy-type">
                    <a href={"tel:" + this.state.prospect.policy_type}>
                      {this.state.prospect.policy_type}
                    </a>
                  </div>
                  <br />
                </div>
                <div className="profile-entry">
                  <h3>Expiry Date</h3>
                  <div className="expiry-date">
                    <a href={"tel:" + this.state.prospect.expiry_date}>
                      {this.state.prospect.expiry_date}
                    </a>
                  </div>
                  <br />
                </div>
                <div className="profile-entry">
                  <h3>Email</h3>
                  <div className="email">
                    <a href={"mailto:" + this.state.prospect.email}>
                      {this.state.prospect.email}
                    </a>
                  </div>
                  <br />
                </div>
                <div className="profile-entry">
                  <h3>Location</h3>
                  <div className="location">{this.state.prospect.location}</div>
                  <br />
                </div>
              </div>
            </div>
          </>
        )}

        <dialog id="modal" stack="true">
          <form onSubmit={(entry) => this.updateProspect(entry)}>
          <label htmlFor="first_name"> First Name : </label>
            <input
              onChange={(entry) => this.handleUpdateProspectFormData(entry)}
              id="first_name"
              value={this.state.prospect.first_name}
              placeholder="first name"
              type="text"
            ></input>
            <br />
            <label htmlFor="second_name"> Second Name : </label>
            <input
              onChange={(entry) => this.handleUpdateProspectFormData(entry)}
              id="second_name"
              value={this.state.prospect.second_name}
              placeholder="second name"
              type="text"
            ></input>
            <br />
            <label htmlFor="other_names"> Other Names : </label>
            <input
              onChange={(entry) => this.handleUpdateProspectFormData(entry)}
              id="other_names"
              value={this.state.prospect.other_names}
              placeholder="other names"
              type="text"
            ></input>
            <br />
            <label htmlFor="phone_number"> Phone Number : </label>
            <input
              onChange={(entry) => this.handleUpdateProspectFormData(entry)}
              id="phone_number"
              value={this.state.prospect.phone_number}
              placeholder="contact"
              type="text"
            ></input>
            <br />
            <label htmlFor="policy_type"> Policy Type : </label>
              <select
                onChange={(entry) => this.handleUpdateProspectFormData(entry)}
                name="policy_type" 
                id="policy_type" value={this.state.prospect.policy_type}
              >
                <option value="">--Please choose an option--</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="third party">Third Party</option>
              </select>
            <br />
            <label htmlFor="expiry_date"> Expiry Date : </label>
                <input 
                onChange={(entry) => this.handleUpdateProspectFormData(entry)} 
                id='expiry_date' value={this.state.prospect.expiry_date} 
                placeholder="yyyy-MM-dd'T'HH:mm:ss. SSSXXX" 
                type='date'>
                </input>
                <br />
            <label htmlFor="location"> Prospect Location : </label>
            <input
              onChange={(entry) => this.handleUpdateProspectFormData(entry)}
              id="location"
              value={this.state.prospect.location}
              placeholder="location"
              type="text"
            ></input>
            <br />
            <label htmlFor="email"> Email : </label>
            <input
              onChange={(entry) => this.handleUpdateProspectFormData(entry)}
              id="email"
              value={this.state.prospect.email}
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
        {this.state.submitted && <Navigate to={"/prospects"} />}

        <div className="action-buttons">
          <div className="delete-button">
            <button onClick={() => this.deleteProspect()}>Delete</button>
          </div>
          <div className="update-button">
            <button onClick={() => this.showModalPopUp()}>Edit</button>
          </div>

          {this.state.isdeleted && <Navigate to={"/prospects"} />}

          <div className="leave-view-button">
            <Link to={"/prospects"}>
              <button>Back</button>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}
