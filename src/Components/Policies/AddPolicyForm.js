import React, { Component, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.module.css'
import AddPolicy from './AddPolicyFields';

class AddPolicyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted:false,
            selectDate:null,
            policy:{
                policy_number: "",
                type: "",
                issued_at:"",
                expires_at:"",
                owner_id: "",
                item_identifier: ""
              },
              formattedPolicy:{
                  policy_number: "",
                  type: "",
                  issued_at:"",
                  expires_at:"",
                  owner_id: "",
                  item_identifier: ""
                },
            
            
        }
        this.handlePolicyFormData=this.handlePolicyFormData.bind(this)
    }

    // Need to use two states because of datepicker conversion limition
    // i.e., cannot maintain state and convert date format
    handlePolicyFormData(formEntry) {
        const addedpolicy = {...this.state.policy}
        addedpolicy[formEntry.target.id] = formEntry.target.value
        this.setState({policy:addedpolicy})

        const policyToPost = {...this.state.formattedPolicy}
        if (formEntry.target.id==="issued_at" || formEntry.target.id==="expires_at"){
            console.log(formEntry.target.id , " .... : ",addedpolicy[formEntry.target.id] )
            const dateField = new Date(addedpolicy[formEntry.target.id])
            policyToPost[formEntry.target.id] = dateField.toISOString()
        }else {
            policyToPost[formEntry.target.id] = addedpolicy[formEntry.target.id]
        }
        this.setState({formattedPolicy:policyToPost})

        console.log("Set parent state = ", this.state.policy)
        console.log("Child to set = ", this.state.formattedPolicy)
    }

    submit(entry) {
        entry.preventDefault();
        fetch("/apis/policies",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.formattedPolicy),           
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

        console.log("Entry After : ", this.state.formattedPolicy)

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

                <AddPolicy 
                    handlePolicyFormData={this.handlePolicyFormData}
                    policy={this.state.policy} />


                
                        
                    <input className='form-submit-btn' type='submit' value="Submit"></input>
                    </form>
                </div>

                {this.state.submitted && <Navigate to={"/policies"}/>}
            </Fragment>
        )
    }
}

export default AddPolicyForm