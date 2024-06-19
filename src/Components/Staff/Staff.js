import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Loader from '../Loader';

export default class Staff extends Component {
    constructor(props) {
    super(props)
    this.handleStaffChange = this.handleStaffChange.bind(this);
}

handleStaffChange(staff) {
    this.props.handleStaffChange(staff)
}

    componentDidMount() {
        this.handleStaffChange(
            [
                {staff_name: "staff1", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745852367"},
                {staff_name: "staff2", area:"Thika", owner_name:"John", owner_phone_number:"0745858667"},
                {staff_name: "staff3", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745892367"},
                {staff_name: "staff4", area:"Juja", owner_name:"Richard", owner_phone_number:"0745852367"},
            ]
        )
    }

    render (){
        return(
            <Fragment>

                {
                    this.props.isLoadingData ? <Loader /> :
                     
                <>

                
                <div className="add-staff-button">
                    <Link to={"/staff/add"}>
                        <button >
                            Add Staff
                        </button>
                    </Link>
                </div>

                <div className="outer-table-wrapper">
                <div className='staff-table table-wrapper'>
                <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Owner</th>
                    <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.staff?.map((staff) => (
                            <tr key={staff.staff_name}>
                                <td>{staff.staff_name}</td>
                                <td>{staff.area}</td>
                                <td>{staff.owner_name}</td>
                                <td>{staff.owner_phone_number}</td>
                            </tr>
                        )
                        )
                    }
                </tbody>
                </table>
            </div>
            </div>

            </>
            }
        </Fragment>
        );
    }
}