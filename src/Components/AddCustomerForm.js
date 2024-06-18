import React, { Component, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';

class AddCustomerForm extends Component {
    constructor(props) {
        super(props)
        // this.handleCustomerFormData = this.props.handleCustomerFormData.bind(this)
        this.state = {newcustomer: {
            first_name: "",
            second_name: "",
            other_name: "",
            phone_number: "",
            secondary_phone_number: "",
            national_id: "",
            email: ""
            },
            submitted:false,
        }
    }

    handleCustomerFormData(entry) {
        const addedcustomer = {...this.state.newcustomer}
        addedcustomer[entry.target.id] = entry.target.value
        this.setState({newcustomer: addedcustomer})
    }

    submit(entry) {
        entry.preventDefault(); 
        this.setState({submitted:true});
        fetch("/apis/customers",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newcustomer),           
        })
        .then((response) => response.json())
        .then((reply) => console.log(reply))
        .catch((error) =>{
            window.alert(error);
            console.log(error);
        })

    }

    render() {
        return (
            <Fragment>
                <div className="leave-form-button">
                    <Link to={"/customers"}>
                        <button >
                            Back
                        </button>
                    </Link>
                </div>

                <div className='add-customer-form'>
                    <form onSubmit={(entry) => this.submit(entry)}>
                        <label htmlFor="first_name"> First Name : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='first_name' value={this.state.newcustomer.first_name} placeholder="first name" type='text'></input>
                        <br />
                        <label htmlFor="second_name"> Second Name : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='second_name' value={this.state.newcustomer.second_name} placeholder="second name" type='text'></input>
                        <br />
                        <label htmlFor="other_names"> Other Names : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='other_names' value={this.state.newcustomer.other_names} placeholder="other names" type='text'></input>
                        <br />
                        <label htmlFor="phone_number"> Phone Number : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='phone_number' value={this.state.newcustomer.phone_number} placeholder="+254712345678" type='text'></input>
                        <br />
                        <label htmlFor="secondary_phone_number"> Secondary Phone Number : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='secondary_phone_number' value={this.state.newcustomer.secondary_phone_number} placeholder="+254712345678" type='text'></input>
                        <br />
                        <label htmlFor="national_id"> National ID : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='national_id' value={this.state.newcustomer.national_id} placeholder="national id" type='text'></input>
                        <br />
                        <label htmlFor="email"> Email : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='email' value={this.state.newcustomer.email} placeholder="example@email.com" type='text'></input>
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