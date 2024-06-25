import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";

export default class Staff extends Component {
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
      // staffs:[{}],
      isLoadingData: false,
    };
    this.handleStaffChange = this.handleStaffChange.bind(this);
  }

  handleStaffChange(staff) {
    this.props.handleStaffChange(staff);
  }

  fetchStaff = () => {
    this.setState({ isLoadingData: true });
    fetch("https://easybima-backend.onrender.com/apis/staffs/")
      .then((response) => {
        response.json().then((json) => {
          this.handleStaffChange(json.data);
          console.log(this.props.staffs);
          this.setState({ isLoadingData: false });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    // this.handleStaffChange(
    //     [
    //         {staff_name: "staff1", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745852367"},
    //         {staff_name: "staff2", area:"Thika", owner_name:"John", owner_phone_number:"0745858667"},
    //         {staff_name: "staff3", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745892367"},
    //         {staff_name: "staff4", area:"Juja", owner_name:"Richard", owner_phone_number:"0745852367"},
    //     ]
    // )

    this.fetchStaff();
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoadingData ? (
          <Loader />
        ) : (
          <>
            <div className="outer-table-wrapper">
              <div className="staff-table table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Location</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.staffs?.map((staff, index) => (
                      <tr key={staff.phone_number}>
                        <td>
                          <Link to={`/staffs/${staff.id}`}>{index + 1}.</Link>
                        </td>
                        <td>
                          <Link to={`/staffs/${staff.id}`}>
                            {staff.first_name +
                              " " +
                              staff.second_name +
                              " " +
                              staff.other_names}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/staffs/${staff.id}`}>
                            {staff.phone_number}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/staffs/${staff.id}`}>
                            {staff.location}
                          </Link>
                        </td>
                        <td>
                          <Link to={`/staffs/${staff.id}`}>
                            {staff.email}
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

        <div className="add-staff-button">
          <Link to={"/staff/add"}>
            <button>Add Staff</button>
          </Link>
        </div>
      </Fragment>
    );
  }
}
