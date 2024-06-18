import React, { Component, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css'

class AddPolicyForm extends Component {
    constructor(props) {
        super(props)
        // this.handlePolicyFormData = this.props.handlePolicyFormData.bind(this)
        this.state = {newpolicy: {
                policy_number: "",
                type: "",
                issued_at:"",
                expires_at:"",
                owner_id: "",
                item_identifier: ""
            },
            submitted:false,
            selectDate:null,
        }
    }

    handlePolicyFormData(entry) {
        const addedpolicy = {...this.state.newpolicy}
        addedpolicy[entry.target.id] = entry.target.value
        this.setState({newpolicy: addedpolicy})
    }

    submit(entry) {
        entry.preventDefault();
        console.log("Entry before : ", this.state.newpolicy)
        const formattedPolicy = this.state.newpolicy
        const formattedIssueDate = new Date (formattedPolicy.issued_at)
        const formattedExpiryDate = new Date (formattedPolicy.expires_at)
        formattedPolicy.issued_at = formattedIssueDate.toISOString()
        formattedPolicy.expires_at = formattedExpiryDate.toISOString()
        this.setState({newpolicy:formattedPolicy})
        console.log("Entry After : ", this.state.newpolicy)

        fetch("/apis/policies",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newpolicy),           
        })
        .then((response) => response.json())
        .then((reply) => {
            console.log(reply);
            this.setState({submitted:true})
        })
        .catch((error) => {
            window.alert(error)
            console.log(error)
        })

    }

    render() {
        return (
            <Fragment>

                <div className="leave-form-button">
                    <Link to={"/policies"}>
                        <button >
                            Back
                        </button>
                    </Link>
                </div>


                <div className='add-policy-form'>
                    <form onSubmit={(entry) => this.submit(entry)}>
                        <label htmlFor="policy_number"> Policy Number : </label>
                        <input onChange={(entry) => this.handlePolicyFormData(entry)} id='policy_number' value={this.state.newpolicy.policy_number} placeholder="policy number" type='text'></input>
                        <br />
                        <label htmlFor="type"> Policy Type : </label>
                        <input onChange={(entry) => this.handlePolicyFormData(entry)} id='type' value={this.state.newpolicy.type} placeholder="e.g Motor" type='text'></input>
                        <br />
                        <label htmlFor="issued_at"> Issued At : </label>
                        <input onChange={(entry) => this.handlePolicyFormData(entry)} id='issued_at' value={this.state.newpolicy.issued_at} placeholder="YYYY-MM-DD" type='date'></input>
                        <br />
                        <label htmlFor="expires_at"> Expires At : </label>
                        <input onChange={(entry) => this.handlePolicyFormData(entry)} id='expires_at' value={this.state.newpolicy.expires_at} placeholder="YYYY-MM-DD" type='date'></input>
                        <br />
                        <label htmlFor="owner_id"> Owner's ID Number : </label>
                        <input onChange={(entry) => this.handlePolicyFormData(entry)} id='owner_id' value={this.state.newpolicy.owner_id} placeholder="owner id" type='text'></input>
                        <br />
                        <label htmlFor="item_identifier"> Identifier : </label>
                        <input onChange={(entry) => this.handlePolicyFormData(entry)} id='item_identifier' value={this.state.newpolicy.item_identifier} placeholder="e.g KDG 123H" type='text'></input>
                        <br />
                        <input className='form-submit-btn' type='submit' value="Submit"></input>
                    </form>
                </div>
                {this.state.submitted && <Navigate to={"/policies"}/>}
            </Fragment>
        )
    }
}

export default AddPolicyForm