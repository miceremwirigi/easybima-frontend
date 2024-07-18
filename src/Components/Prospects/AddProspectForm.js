import React, { Component, Fragment } from "react";
import { Navigate, Link } from "react-router-dom";

class AddProspectForm extends Component {
  constructor(props) {
    super(props);
    // this.handleProspectFormData = this.props.handleProspectFormData.bind(this)
    this.state = {
      newprospect: {
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
      submitted: false,
    };
  }

  handleProspectFormData(entry) {
    const addedprospect = { ...this.state.newprospect };
    addedprospect[entry.target.id] = entry.target.value;
    this.setState({ newprospect: addedprospect });

    const prospectToPost = {...this.state.formattedprospect}
    if (entry.target.id==="expiry_date" ){
        console.log(entry.target.id , " .... : ",addedprospect[entry.target.id] )
        const dateField = new Date(addedprospect[entry.target.id])
        prospectToPost[entry.target.id] = dateField.toISOString()
    }else {
        prospectToPost[entry.target.id] = addedprospect[entry.target.id]
    }
    this.setState({formattedprospect:prospectToPost})

    console.log("Set parent state = ", this.state.newprospect)
    console.log("Child to set = ", this.state.formattedprospect)
  }

  submit(entry) {
    entry.preventDefault();
    fetch("https://apis.bimapap.co.ke/apis/prospects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.formattedprospect),
    })
      .then((response) => response.json())
      .then((reply) => {
        console.log(reply)
        this.setState({ submitted: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Fragment>
        <div className="leave-form-button">
          <Link to={"/prospects"}>
            <button>Back</button>
          </Link>
        </div>

        <div className="add-prospect-form">
          <form onSubmit={(entry) => this.submit(entry)}>
            <label htmlFor="first_name"> First Name : </label>
            <input
              onChange={(entry) => this.handleProspectFormData(entry)}
              id="first_name"
              value={this.state.newprospect.first_name}
              placeholder="first name"
              type="text"
            ></input>
            <br />
            <label htmlFor="second_name"> Second Name : </label>
            <input
              onChange={(entry) => this.handleProspectFormData(entry)}
              id="second_name"
              value={this.state.newprospect.second_name}
              placeholder="second name"
              type="text"
            ></input>
            <br />
            <label htmlFor="other_names"> Other Names : </label>
            <input
              onChange={(entry) => this.handleProspectFormData(entry)}
              id="other_names"
              value={this.state.newprospect.other_names}
              placeholder="other names"
              type="text"
            ></input>
            <br />
            <label htmlFor="phone_number"> Phone Number : </label>
            <input
              onChange={(entry) => this.handleProspectFormData(entry)}
              id="phone_number"
              value={this.state.newprospect.phone_number}
              placeholder="contact"
              type="text"
            ></input>
            <br />
            <label htmlFor="policy_type"> Policy Type : </label>
              <select
                onChange={(entry) => this.handleProspectFormData(entry)}
                name="policy_type" 
                id="policy_type" value={this.state.newprospect.policy_type}
              >
                <option value="">--Please choose an option--</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="third party">Third Party</option>
              </select>
            <br />
            <label htmlFor="expiry_date"> Expiry Date : </label>
                <input 
                onChange={(entry) => this.handleProspectFormData(entry)} 
                id='expiry_date' value={this.state.newprospect.expiry_date} 
                placeholder="yyyy-MM-dd'T'HH:mm:ss. SSSXXX" 
                type='date'>
                </input>
                <br />
            <label htmlFor="location"> Prospect Location : </label>
            <input
              onChange={(entry) => this.handleProspectFormData(entry)}
              id="location"
              value={this.state.newprospect.location}
              placeholder="location"
              type="text"
            ></input>
            <br />
            <label htmlFor="email"> Email : </label>
            <input
              onChange={(entry) => this.handleProspectFormData(entry)}
              id="email"
              value={this.state.newprospect.email}
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
        {this.state.submitted && <Navigate to={"/prospects"} />}
      </Fragment>
    );
  }
}

export default AddProspectForm;
