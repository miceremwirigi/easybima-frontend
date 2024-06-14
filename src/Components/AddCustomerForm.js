import React, { Component, Fragment } from 'react';
import { Navigate } from 'react-router-dom';

class AddCustomerForm extends Component {
    constructor(props) {
        super(props)
        // this.handleCustomerFormData = this.props.handleCustomerFormData.bind(this)
        this.state = {newcustomer: {
                customer_name: "",
                area: "",
                owner_name: "",
                owner_phone_number: ""
            },
            submitted:false,
        }
    }

    handleCustomerFormData(entry) {
        const addedcustomer = {...this.state.newcustomer}
        addedcustomer[entry.target.id] = entry.target.value
        this.setState({newcustomer: addedcustomer})
        console.log(addedcustomer)
    }

    submit(entry) {
        entry.preventDefault();
        console.log(entry)
        this.setState({submitted:true})
        fetch("/apis/customers",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newcustomer),           
        })
        .then((response) => response.json())
        .then((reply) => console.log(reply))
        .catch((error) =>console.log(error))

    }

    render() {
        return (
            <Fragment>
                <div className='add-customer-form'>
                    <form onSubmit={(entry) => this.submit(entry)}>
                        <label for="customer_name"> Customer Name : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='customer_name' value={this.state.newcustomer.customer_name} placeholder="customer name" type='text'></input>
                        <br />
                        <label for="area"> Customer Location : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='area' value={this.state.newcustomer.area} placeholder="location" type='text'></input>
                        <br />
                        <label for="owner_name"> Owner's Name : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='owner_name' value={this.state.newcustomer.owner_name} placeholder="owner name" type='text'></input>
                        <br />
                        <label for="owner_phone_number"> Owner's Phone Number : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='owner_phone_number' value={this.state.newcustomer.owner_phone_number} placeholder="contact" type='text'></input>
                        <br />
                        <input className='form-submit-btn' type='submit' value="Submit"></input>
                    </form>
                </div>
                {this.state.submitted && <Navigate to={"/customers"}/>}
            </Fragment>
        )
    }
}

export default AddCustomerForm