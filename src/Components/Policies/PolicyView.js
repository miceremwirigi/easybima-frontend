import React, { Component, Fragment } from 'react'
import { Navigate, Link } from 'react-router-dom';
import AddPolicyFields from '../Policies/AddPolicyFields'
import Loader from '../Loader';

// Shows one policy details
export default class PolicyView extends Component {
    constructor(props){
        super(props)
        this.state = {
            policy:{
                first_name: "",
                second_name: "",
                last_name: "",
                policy_number: "",
                type: "",
                issued_at:"",
                expires_at:"",
                owner_phone_number:"",
                owner_id: "",
                email: "",
                item_identifier: ""
              },
            updatedpolicy:{
                first_name: "",
                second_name: "",
                last_name: "",
                policy_number: "",
                type: "",
                issued_at:"",
                expires_at:"",
                owner_phone_number:"",
                owner_id: "",
                email: "",
                item_identifier: ""
              },
              formattedPolicy:{
                first_name: "",
                second_name: "",
                last_name: "",
                policy_number: "",
                type: "",
                issued_at:"",
                expires_at:"",
                owner_phone_number:"",
                owner_id: "",
                email: "",
                item_identifier: ""
                },
            isLoadingData:false,
            submitted:false,
            isdeleted:false,
        }
        this.handlePolicyFormData=this.handlePolicyFormData.bind(this)
    }



getNumberofDaysToExpiry(policy) {
    let presentDate = new Date()
    let expiryDate = new Date(policy.expires_at)
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


// Retreives values from form entries
// as they are types and updates new policy state
// Need to use two states because of datepicker conversion limition
// i.e., cannot maintain state and convert date format
handlePolicyFormData(formEntry) {    
    const addedpolicy = {...this.state.policy}
    if (formEntry.target.value !== "" && formEntry.target.value !== null){
        addedpolicy[formEntry.target.id] = formEntry.target.value
    }

    console.log("Added policy value = ", addedpolicy)
    // addedpolicy["owner_id"] = this.state.policy.national_id      
    // addedpolicy["owner_phone_number"] = this.state.policy.owner_phone_number      
    this.setState({policy:addedpolicy})
    // this.setState({formattedPolicy:this.state.policy})
    
    // const policyToPost = {...this.state.formattedPolicy}
    // if (formEntry.target.id==="issued_at" || formEntry.target.id==="expires_at"){
    //     console.log(formEntry.target.id , " .... : ",addedpolicy[formEntry.target.id] )
    //     const dateField = new Date(formEntry.target.value)
    //     policyToPost[formEntry.target.id] = dateField.toISOString()
    // }else {
    //     // policyToPost[formEntry.target.id] = addedpolicy[formEntry.target.id]
    //     const targetid = formEntry.target.id
    //     policyToPost[formEntry.target.id] = this.state.policy.targetid
    //     policyToPost["owner_id"] = this.state.policy.national_id      
    //     policyToPost["owner_phone_number"] = this.state.policy.owner_phone_number  
    // }
    this.setState({formattedPolicy:addedpolicy})

    console.log("Set parent state = ", this.state.policy)
    // console.log("Child to set 1 = ", policyToPost)
    console.log("Child to set = ", this.state.formattedPolicy)
}


// fetch individual policy details
    fetchPolicy = () => {
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Rereiving id from url
        
        fetch("https://apis.bimapap.co.ke/apis/policies/"+id)
        .then(response => 
            response.json()
            .then((json)=>{
                this.setState({policy:json.data});
                }
            )
        )
        .then(()=>{
            this.setState({isLoadingData:false})
        })
        .catch((error) => {
            console.log(error);
            }
        )  
    }

    // delete one policy
    deletePolicy = () => {
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Retreiving id from url

        fetch("https://apis.bimapap.co.ke/apis/policies/delete/"+id,{
            method: "DELETE",          
        })
        .then(response => 
            response.json()
            .then((json)=>{       
                this.setState({isLoadingData:false});
                this.setState({isdeleted:true})
                }
            )
        )
        .catch((error) => {
            console.log(error);
            }
        )
    }

    // show dialog modal with policy update form
    showModalPopUp = () => {
        const modal = document.getElementById("modal")
        modal.style.display="flex"
        modal.showModal()
    }

    // close dialog modal
    closeModalPopup = () => {
        const modal = document.getElementById("modal")
        modal.style.display="none"
        modal.close()
    }

    // send update request to api to update policy
    updatePolicy = (entry) => {
        entry.preventDefault();
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Rereiving id from url

        // Submit Policy
        this.setState({submitted:false});
        fetch("https://apis.bimapap.co.ke/apis/policies/update/"+id,{
            method: "PUT",
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
        .catch((error) =>{
            console.log(error);
        }) 
    }

    // load once component has mounted
    componentDidMount() {
        const modal = document.getElementById("modal")
        modal.style.display="none"
        this.fetchPolicy()
    
    }

    render(){
        
        return (
            <Fragment>

            {
                this.state.isLoadingData ? <Loader /> :
                 
            <>
            <div className='info-card'>
                <div className='policy-profile-column'>

                <div className="profile-entry">
                  <h4>Owner</h4>
                  <div className="customer-name">
                    {this.state.policy.first_name +
                      " " +
                      this.state.policy.second_name +
                      " " +
                      this.state.policy.last_name}
                  </div>
                    <br />
                </div>

                    <div className="profile-entry">
                  <h3>Phone Number</h3>
                  <div className="phone-number">
                    <a href={"tel:" + this.state.policy.owner_phone_number}>
                      {this.state.policy.owner_phone_number}
                    </a>
                  </div>
                  <br />
                </div>

                <div className="profile-entry">
                  <h3>Email</h3>
                  <div className="email">
                    <a href={"mailto:" + this.state.policy.email}>
                      {this.state.policy.email}
                    </a>
                  </div>
                  <br />
                </div>

                    <div className='policy-entry'>
                        <h4>Expires in</h4>
                        <div>{this.getNumberofDaysToExpiry(this.state.policy) + " days"}</div>
                    </div>
                    <br />

                    <div className='policy-entry'>
                        <h4>Identifier</h4>
                        <div>{this.state.policy.item_identifier}</div>
                    </div>
                    <br />

                    <div className='policy-entry'>
                        <h4>Policy Type</h4>
                        <div>{this.state.policy.type}</div>
                    </div>
                    <br />

                    <div className='policy-entry'>
                        <h4>Policy Number</h4>
                        <div>{this.state.policy.policy_number}</div>
                    </div>
                    <br />

                    <div className='policy-entry'>
                        <h4>Issued On</h4>                              
                        <div>{this.getDateinYYYYMMDD(this.state.policy.issued_at)}</div>
                    </div>
                    <br />

                    <div className='policy-entry'>
                        <h4>Expires On</h4>
                        <div>{this.getDateinYYYYMMDD(this.state.policy.expires_at)}</div>
                    </div>
                    <br />
                </div>             
            </div>                
            </>
            }

            <dialog id='modal' stack="true">
                <form onSubmit={(entry) => this.updatePolicy(entry)}>

                    <AddPolicyFields 
                        handlePolicyFormData={this.handlePolicyFormData}
                        policy={this.state.policy}
                        />  
                    <br />
                    <br /> 

                    <input className='form-submit-btn' type='submit' value="Submit"></input>
                </form>

                <button id='close-modal' onClick={()=>this.closeModalPopup()}>Close</button>
            </dialog>
            {this.state.submitted && <Navigate to={"/policies"}/>}

            <div className='action-buttons'>
                <div className="delete-button">
                        <button onClick={() => this.deletePolicy()}>
                            Delete
                        </button>
                </div>
                <div className="update-button">
                        <button onClick={()=>this.showModalPopUp()}>
                            Edit
                        </button>
                </div>

            {this.state.isdeleted && <Navigate to={"/policies"}/>}


                <div className="leave-view-button">
                    <Link to={"/policies"}>
                        <button >
                            Back
                        </button>
                    </Link>
                </div>
            </div>
            </Fragment>
        )
    }
}