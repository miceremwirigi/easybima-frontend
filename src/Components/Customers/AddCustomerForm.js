import React, { Component, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';
import AddPolicyFields from '../Policies/AddPolicyFields'

class AddCustomerForm extends Component {
    constructor(props) {
        super(props)
        // this.handleCustomerFormData = this.props.handleCustomerFormData.bind(this)
        this.state = {newcustomer: {
            first_name: "",
            second_name: "",
            other_names: "",
            phone_number: "",
            secondary_phone_number: "",
            national_id: "",
            email: ""
            },
            showPolicyFormFields: false,
            submitted:false,
            policy:{
                policy_number: "",
                type: "",
                issued_at:"",
                expires_at:"",
                owner_phone_number:"",
                owner_id: "",
                item_identifier: ""
              },
            formattedPolicy:{
                policy_number: "",
                type: "",
                issued_at:"",
                expires_at:"",
                owner_phone_number:"",
                owner_id: "",
                item_identifier: ""
                },
        }
        this.handlePolicyFormData=this.handlePolicyFormData.bind(this)
    }

    handleCustomerFormData(entry) {
        const addedcustomer = {...this.state.newcustomer}
        addedcustomer[entry.target.id] = entry.target.value
        this.setState({newcustomer: addedcustomer})
        console.log("Set child state = ", this.state.newcustomer)
    }

    handleShowPolicyFormFields(entry) {
        console.log(entry.target.checked)
        this.setState({showPolicyFormFields:entry.target.checked})
    }

    // Retreives values from form entries
    // as they are types and updates new policy state
    // Need to use two states because of datepicker conversion limition
    // i.e., cannot maintain state and convert date format
    handlePolicyFormData(formEntry) {
        const addedpolicy = {...this.state.policy}
        addedpolicy[formEntry.target.id] = formEntry.target.value
        addedpolicy["owner_id"] = this.state.newcustomer.national_id      
        addedpolicy["owner_phone_number"] = this.state.newcustomer.phone_number      
        this.setState({policy:addedpolicy})
        this.setState({formattedPolicy:this.state.policy})
        
        const policyToPost = {...this.state.formattedPolicy}
        if (formEntry.target.id==="issued_at" || formEntry.target.id==="expires_at"){
            console.log(formEntry.target.id , " .... : ",addedpolicy[formEntry.target.id] )
            const dateField = new Date(addedpolicy[formEntry.target.id])
            policyToPost[formEntry.target.id] = dateField.toISOString()
        }else {
            policyToPost[formEntry.target.id] = addedpolicy[formEntry.target.id]
            policyToPost["owner_id"] = this.state.newcustomer.national_id      
            policyToPost["owner_phone_number"] = this.state.newcustomer.phone_number  
        }
        this.setState({formattedPolicy:policyToPost})

        console.log("Set parent state = ", this.state.policy)
        console.log("Child to set = ", this.state.formattedPolicy)
    }


    submit(entry) {
        entry.preventDefault();

        // Submit Customer
        this.setState({submitted:true});
        fetch("https://easybima-backend.onrender.com/apis/customers",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newcustomer),           
        })
        .then((response) => response.json())
        .then((reply) => {
            console.log(reply);
            if (this.state.showPolicyFormFields){
                fetch("https://easybima-backend.onrender.com/apis/policies",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.state.formattedPolicy),           
                })
                .then((response) => response.json())
                .then((reply) => {
                    console.log(reply);
                    this.setState({showPolicyFormFields:false});
                })
                .catch((error) => {
                    console.log(error)
                });                   
            }
            this.setState({submitted:true})
        })
        .catch((error) =>{
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
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='phone_number' required value={this.state.newcustomer.phone_number} placeholder="+254712345678" type='tel'></input>
                        <br />
                        <label htmlFor="secondary_phone_number"> Secondary Phone Number : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='secondary_phone_number' value={this.state.newcustomer.secondary_phone_number} placeholder="+254712345678" type='tel'></input>
                        <br />
                        <label htmlFor="national_id"> National ID : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='national_id' value={this.state.newcustomer.national_id} placeholder="national id" type='text'></input>
                        <br />
                        <label htmlFor="email"> Email : </label>
                        <input onChange={(entry) => this.handleCustomerFormData(entry)} id='email' value={this.state.newcustomer.email} placeholder="example@email.com" type='email'></input>
                        <br />
                        <label htmlFor="showPolicyFormFields"> Add Policy Info : </label>
                        <input onChange={(entry) => this.handleShowPolicyFormFields(entry)} id='showPolicyFormFields' type='checkbox'></input>
                        <br /> 

                        { this.state.showPolicyFormFields && 
                         
                         <AddPolicyFields 
                            handlePolicyFormData={this.handlePolicyFormData}
                            policy={this.state.policy}
                         />                         
                        }               

                        <input className='form-submit-btn' type='submit' value="Submit"></input>
                    </form>
                </div>
                {this.state.submitted && <Navigate to={"/customers"}/>}
            </Fragment>
        )
    }
}

export default AddCustomerForm