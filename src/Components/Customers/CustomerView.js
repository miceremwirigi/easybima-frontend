import React, { Component, Fragment } from 'react'
import { Navigate, Link } from 'react-router-dom';
import AddPolicyFields from '../Policies/AddPolicyFields'
import Loader from '../Loader';

export default class CustomerView extends Component {
    constructor(props){
        super(props)
        this.state = {
            customer:{
                id: "",
                created_at: "",
                updated_at: "",
                deleted_at: null,
                first_name: "",
                second_name: "",
                other_names: "",
                phone_number: "",
                secondary_phone_number: "",
                national_id: "",
                policies: [],
                email: ""
            },
            updatedcustomer:{
                id: "",
                created_at: "",
                updated_at: "",
                deleted_at: null,
                first_name: "",
                second_name: "",
                other_names: "",
                phone_number: "",
                secondary_phone_number: "",
                national_id: "",
                policies: [],
                email: ""
            },
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
            isLoadingData:false,
            showPolicyFormFields:false,
            submitted:false,
            isdeleted:false,
        }
        this.handleUpdateCustomerFormData=this.handleUpdateCustomerFormData.bind(this)
        this.handlePolicyFormData=this.handlePolicyFormData.bind(this)
    }

    //Submit customer on update
    submit(entry) {
        entry.preventDefault();

        // Submit Customer
        this.setState({submitted:true});
        fetch("/apis/customers",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.updatedcustomer),           
        })
        .then((response) => response.json())
        .then((reply) => {
            console.log(reply);
            this.setState({submitted:true})
        })
        .catch((error) =>{
            window.alert(error);
            console.log(error);
        }) 

        if (this.state.showPolicyFormFields){
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
                this.setState({showPolicyFormFields:false});
            })
            .catch((error) => {
                window.alert(error)
                console.log(error)
            });                   
        }
    }

// populate updated customers state as they are typed
handleUpdateCustomerFormData(entry) {
    const addedcustomer = {...this.state.updatedcustomer}
    addedcustomer[entry.target.id] = entry.target.value
    this.setState({updatedcustomer: addedcustomer})
    console.log("Set child state = ", this.state.updatedcustomer)
}

// populate updated policy fields as they are typed
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
    addedpolicy["owner_id"] = this.state.customer.national_id      
    addedpolicy["owner_phone_number"] = this.state.customer.phone_number      
    this.setState({policy:addedpolicy})
    
    const policyToPost = {...this.state.policy}
    if (formEntry.target.id==="issued_at" || formEntry.target.id==="expires_at"){
        console.log(formEntry.target.id , " .... : ",addedpolicy[formEntry.target.id] )
        const dateField = new Date(addedpolicy[formEntry.target.id])
        policyToPost[formEntry.target.id] = dateField.toISOString()
    }else {
        policyToPost[formEntry.target.id] = addedpolicy[formEntry.target.id]
        policyToPost["owner_id"] = this.state.customer.national_id      
        policyToPost["owner_phone_number"] = this.state.customer.phone_number  
    }
    this.setState({policy:policyToPost})

    console.log("Set parent state = ", this.state.policy)
    console.log("Child to set = ", this.state.policy)
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

// fetch individual customer details
    fetchCustomer = () => {
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Rereiving id from url
        
        fetch("/apis/customers/"+id)
        .then(response => 
            response.json()
            .then((json)=>{
                this.setState({customer:json.data});
                this.setState({updatedcustomer:json.data});
                }
            )
        )
        .then(()=>{
            this.setState({isLoadingData:false})
        })
        .catch((error) => {
            console.log(error);
            window.alert(error);
            }
        )  
    }

    // delete one customer
    deleteCustomer = () => {
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Retreiving id from url

        fetch("/apis/customers/delete/"+id,{
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
            window.alert(error);
            }
        )
    }

    // show dialog modal with customer update form
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

    // send update request to api to update customer
    updateCustomer = (entry) => {
        // this.setState({isLoadingData:true});
        // const id=this.props.match.params.id; // Rereiving id from url
        // fetch("/apis/customers/update/"+id,{
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(this.state.updatedcustomer),           
        // })
        // .then((response) => response.json())
        // .then((reply) => {
        //     console.log(reply);
        //     this.setState({showPolicyFormFields:false});
        //     this.setState({submitted:true})
        // })
        // .catch((error) =>{
        //     window.alert(error);
        //     console.log(error);
        // })
        entry.preventDefault();
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Rereiving id from url

        // Submit Customer
        this.setState({submitted:true});
        fetch("/apis/customers/update/"+id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.updatedcustomer),           
        })
        .then((response) => response.json())
        .then((reply) => {
            console.log(reply);
            this.setState({submitted:true})
        })
        .catch((error) =>{
            window.alert(error);
            console.log(error);
        }) 

        if (this.state.showPolicyFormFields){
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
                this.setState({showPolicyFormFields:false});
            })
            .catch((error) => {
                window.alert(error)
                console.log(error)
            });                   
        }
    }

    // load once component has mounted
    componentDidMount() {
        const modal = document.getElementById("modal")
        modal.style.display="none"
        this.fetchCustomer()
    
    }

    render(){
        
        return (
            <Fragment>

            {
                this.state.isLoadingData ? <Loader /> :
                 
            <>
            <div className='info-card'>
                <div className='profile-column'>
                    <div className='profile-entry'>
                        <h3>Name</h3>
                        <div className='customer-name'>
                            {this.state.customer.first_name 
                            + " " + this.state.customer.second_name 
                            + " " + this.state.customer.other_names}
                        </div>
                    </div>
                    <div className='profile-entry'>
                        <h3>Phone Number</h3>
                        <div className='phone-number'>
                            <a href={"tel:"+this.state.customer.phone_number}>
                            {this.state.customer.phone_number}
                            </a>                            
                        </div>
                    </div>
                    <div className='profile-entry'>
                        <h3>Secondary Phone Number</h3>
                        <div className='secondary-phone-number'>
                            <a href={"tel:"+this.state.customer.secondary_phone_number}>
                                {this.state.customer.secondary_phone_number}
                            </a>
                        </div>
                    </div>
                    <div className='profile-entry'>
                        <h3>National ID</h3>
                        <div className='national_id'>
                            {this.state.customer.national_id}
                        </div>
                    </div>
                    <div className='profile-entry'> 
                        <h3>Email</h3>
                        <div className='email'>
                            {this.state.customer.email}
                        </div>
                    </div>
                </div>
                <div className='policies-column'>
                    {  
                        this.state.customer.policies?.map((policy, index) => (
                            <div className='policy' key={policy.policy_number}>
                                <h3>Policy {index+1}</h3>
                                <div className='policy-entry'>
                                    <h4>Expires in</h4>
                                    <div>{this.getNumberofDaysToExpiry(policy) + " days"}</div>
                                </div>
                                <div className='policy-entry'>
                                    <h4>Identifier</h4>
                                    <div>{policy.item_identifier}</div>
                                </div>
                                <div className='policy-entry'>
                                    <h4>Policy Type</h4>
                                    <div>{policy.type}</div>
                                </div>
                                <div className='policy-entry'>
                                    <h4>Policy Number</h4>
                                    <div>{policy.policy_number}</div>
                                </div>
                                <div className='policy-entry'>
                                    <h4>Issued On</h4>                              
                                    <div>{this.getDateinYYYYMMDD(policy.issued_at)}</div>
                                </div>
                                <div className='policy-entry'>
                                    <h4>Expires On</h4>
                                    <div>{this.getDateinYYYYMMDD(policy.expires_at)}</div>
                                </div>
                                <hr />
                            </div>
                        )
                        )
                    }
                </div>                
            </div>                
            </>
            }

            <dialog id='modal'>
                    <form onSubmit={(entry) => this.updateCustomer(entry)}>
                        <label htmlFor="first_name"> First Name : </label>
                        <input onChange={(entry) => this.handleUpdateCustomerFormData(entry)} id='first_name' value={this.state.updatedcustomer.first_name} placeholder="first name" type='text'></input>
                        <br />
                        <label htmlFor="second_name"> Second Name : </label>
                        <input onChange={(entry) => this.handleUpdateCustomerFormData(entry)} id='second_name' value={this.state.updatedcustomer.second_name} placeholder="second name" type='text'></input>
                        <br />
                        <label htmlFor="other_names"> Other Names : </label>
                        <input onChange={(entry) => this.handleUpdateCustomerFormData(entry)} id='other_names' value={this.state.updatedcustomer.other_names} placeholder="other names" type='text'></input>
                        <br />
                        <label htmlFor="phone_number"> Phone Number : </label>
                        <input onChange={(entry) => this.handleUpdateCustomerFormData(entry)} id='phone_number' required value={this.state.updatedcustomer.phone_number} placeholder="+254712345678" type='tel'></input>
                        <br />
                        <label htmlFor="secondary_phone_number"> Secondary Phone Number : </label>
                        <input onChange={(entry) => this.handleUpdateCustomerFormData(entry)} id='secondary_phone_number' value={this.state.updatedcustomer.secondary_phone_number} placeholder="+254712345678" type='tel'></input>
                        <br />
                        <label htmlFor="national_id"> National ID : </label>
                        <input onChange={(entry) => this.handleUpdateCustomerFormData(entry)} id='national_id' value={this.state.updatedcustomer.national_id} placeholder="national id" type='text'></input>
                        <br />
                        <label htmlFor="email"> Email : </label>
                        <input onChange={(entry) => this.handleUpdateCustomerFormData(entry)} id='email' value={this.state.updatedcustomer.email} placeholder="example@email.com" type='email'></input>
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
                <button id='close-modal' onClick={()=>this.closeModalPopup()}>Close</button>
            </dialog>
            {this.state.submitted && <Navigate to={"/customers"}/>}

            <div className='action-buttons'>
                <div className="update-button">
                        <button onClick={()=>this.showModalPopUp()}>
                            Edit
                        </button>
                </div>

                <div className="delete-button">
                        <button onClick={() => this.deleteCustomer()}>
                            Delete
                        </button>
                </div>

            {this.state.isdeleted && <Navigate to={"/customers"}/>}


                <div className="leave-view-button">
                    <Link to={"/customers"}>
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