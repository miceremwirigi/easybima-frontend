import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";

export default class Prospect extends Component {
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
      // prospects:[{}],
      isLoadingData: false,
    };
    this.handleProspectsChange = this.handleProspectsChange.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
  }

  handleProspectsChange(prospect) {
    this.props.handleProspectsChange(prospect);
  }

  setLoadingState (value) {
      this.props.setLoadingState(value);
  }

  getNumberofDaysToExpiry(prospect) {
    let presentDate = new Date()
    let expiryDate = new Date(prospect.expiry_date)
    let oneDay = 24 * 60 * 60 * 1000

    let daysToExpiry = Math.round((expiryDate - presentDate)/oneDay)

    return daysToExpiry
  }

  getDateinYYYYMMDD(dateString){
    let date = new Date(dateString)
    let year = date.toString().split(" ",[4])[3]
    let month = date.toString().split(" ",[4])[2]
    let dayDate = date.toString().split(" ",[4])[1]
    let day = date.toString().split(" ",[4])[0]

    return day + " " + dayDate + " " + month + " " + year
}

  fetchProspect = () => {
    this.setState({ isLoadingData: true });
    fetch("https://apis.bimapap.co.ke/apis/prospects/")
      .then((response) => {
        response.json().then((json) => {
          this.handleProspectsChange(json.data);
          console.log(this.props.prospects);
          this.setState({ isLoadingData: false });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchProspect();
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoadingData ? (
          <Loader />
        ) : (
          <>
            <div className="outer-table-wrapper">
              <div className="prospect-table table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Policy Type</th>
                      <th>Expires In</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.prospects?.map((prospect, index) => (
                      <tr key={prospect.phone_number}>
                        <td>
                          <Link to={`/prospects/${prospect.id}`}>{index + 1}.</Link>
                        </td>
                        <td>
                          <Link to={`/prospects/${prospect.id}`}>
                            {prospect.first_name +
                              " " +
                              prospect.second_name +
                              " " +
                              prospect.other_names}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/prospects/${prospect.id}`}>
                            {prospect.phone_number}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/prospects/${prospect.id}`}>
                            {prospect.policy_type}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/prospects/${prospect.id}`}>
                          {this.getNumberofDaysToExpiry(prospect) + " days"}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="add-prospect-button">
          <Link to={"/prospects/add"}>
            <button>Add Prospect</button>
          </Link>
        </div>
      </Fragment>
    );
  }
}
