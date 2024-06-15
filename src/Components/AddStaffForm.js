import React, { Component, Fragment } from 'react';
import { Navigate } from 'react-router-dom';

class AddStaffForm extends Component {
    constructor(props) {
        super(props)
        // this.handleStaffFormData = this.props.handleStaffFormData.bind(this)
        this.state = {newstaff: {
                staff_name: "",
                area: "",
                owner_name: "",
                owner_phone_number: ""
            },
            submitted:false,
        }
    }

    handleStaffFormData(entry) {
        const addedstaff = {...this.state.newstaff}
        addedstaff[entry.target.id] = entry.target.value
        this.setState({newstaff: addedstaff})
        console.log(addedstaff)
    }

    submit(entry) {
        entry.preventDefault();
        console.log(entry)
        this.setState({submitted:true})
        fetch("/apis/staff",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newstaff),           
        })
        .then((response) => response.json())
        .then((reply) => console.log(reply))
        .catch((error) =>console.log(error))

    }

    render() {
        return (
            <Fragment>
                <div className='add-staff-form'>
                    <form onSubmit={(entry) => this.submit(entry)}>
                        <label htmlFor="staff_name"> Staff Name : </label>
                        <input onChange={(entry) => this.handleStaffFormData(entry)} id='staff_name' value={this.state.newstaff.staff_name} placeholder="staff name" type='text'></input>
                        <br />
                        <label htmlFor="area"> Staff Location : </label>
                        <input onChange={(entry) => this.handleStaffFormData(entry)} id='area' value={this.state.newstaff.area} placeholder="location" type='text'></input>
                        <br />
                        <label htmlFor="owner_name"> Owner's Name : </label>
                        <input onChange={(entry) => this.handleStaffFormData(entry)} id='owner_name' value={this.state.newstaff.owner_name} placeholder="owner name" type='text'></input>
                        <br />
                        <label htmlFor="owner_phone_number"> Owner's Phone Number : </label>
                        <input onChange={(entry) => this.handleStaffFormData(entry)} id='owner_phone_number' value={this.state.newstaff.owner_phone_number} placeholder="contact" type='text'></input>
                        <br />
                        <input className='form-submit-btn' type='submit' value="Submit"></input>
                    </form>
                </div>
                {this.state.submitted && <Navigate to={"/staff"}/>}
            </Fragment>
        )
    }
}

export default AddStaffForm