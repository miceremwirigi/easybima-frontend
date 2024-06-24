import React, { Component, Fragment } from 'react'
import { Navigate, Link } from 'react-router-dom';
// import AddPolicyFields from '../Policies/AddPolicyFields'
import Loader from '../Loader';

// Shows one cyber details
export default class CyberView extends Component {
    constructor(props){
        super(props)
        this.state = {
            cyber:{
                id: "",
                created_at: "",
                updated_at: "",
                deleted_at: null,
                cyber_name: "",
                area: "",
                street: "",
                cyber_phone_number: "",
                owner_phone_number: "",
                owner_name: "",
            },
            updatedcyber:{
                id: "",
                created_at: "",
                updated_at: "",
                deleted_at: null,
                cyber_name: "",
                area: "",
                street: "",
                cyber_phone_number: "",
                owner_phone_number: "",
                owner_name: "",
            },
            isLoadingData:false,
            submitted:false,
            isdeleted:false,
        }
        this.handleUpdateCyberFormData=this.handleUpdateCyberFormData.bind(this)
    }
    
// populate updated cybers state as they are typed
handleUpdateCyberFormData(entry) {
    const addedcyber = {...this.state.updatedcyber}
    addedcyber[entry.target.id] = entry.target.value
    this.setState({updatedcyber: addedcyber})
    console.log("Set child state = ", this.state.updatedcyber)
}


// fetch individual cyber details
    fetchCyber = () => {
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Rereiving id from url
        
        fetch("/apis/cybers/"+id)
        .then(response => 
            response.json()
            .then((json)=>{
                this.setState({cyber:json.data});
                this.setState({updatedcyber:json.data});
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

    // delete one cyber
    deleteCyber = () => {
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Retreiving id from url

        fetch("/apis/cybers/delete/"+id,{
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

    // show dialog modal with cyber update form
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

    // send update request to api to update cyber
    updateCyber = (entry) => {
        entry.preventDefault();
        this.setState({isLoadingData:true});
        const id=this.props.match.params.id; // Rereiving id from url

        // Submit Cyber
        this.setState({submitted:true});
        fetch("/apis/cybers/update/"+id,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.updatedcyber),           
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
    }

    // load once component has mounted
    componentDidMount() {
        const modal = document.getElementById("modal")
        modal.style.display="none"
        this.fetchCyber()
    
    }

    render(){
        
        return (
            <Fragment>

            {
                this.state.isLoadingData ? <Loader /> :
                 
            <>
            <div className='info-card'>
                <div className='cyber-profile-column'>
                    <div className='profile-entry'>
                        <h3>Cyber Name</h3>
                        <div className='cyber_name'>
                            {this.state.cyber.cyber_name}
                        </div>
                    </div>
                    <br />
                    <div className='profile-entry'>
                        <h3>Cyber Phone Number</h3>
                        <div className='phone-number'>
                            <a href={"tel:"+this.state.cyber.cyber_phone_number}>
                            {this.state.cyber.cyber_phone_number}
                            </a>                            
                        </div>
                    <br />
                    </div>
                    <div className='profile-entry'>
                        <h3>Owner's Phone Number</h3>
                        <div className='secondary-phone-number'>
                            <a href={"tel:"+this.state.cyber.owner_phone_number}>
                                {this.state.cyber.owner_phone_number}
                            </a>
                        </div>
                    <br />
                    </div>
                    <div className='profile-entry'>
                        <h3>Owner</h3>
                        <div className='owner_name'>
                            {this.state.cyber.owner_name}
                        </div>
                    <br />
                    </div>
                    <div className='profile-entry'> 
                        <h3>Area</h3>
                        <div className='area'>
                            {this.state.cyber.area}
                        </div>
                    <br />
                    </div>
                    <div className='profile-entry'> 
                        <h3>Street</h3>
                        <div className='street'>
                            {this.state.cyber.street}
                        </div>
                    <br />
                    </div>
                </div>             
            </div>                
            </>
            }

            <dialog id='modal' stack="true">
                    <form onSubmit={(entry) => this.updateCyber(entry)}>
                        <label htmlFor="cyber_name"> Cyber Name : </label>
                        <input onChange={(entry) => this.handleUpdateCyberFormData(entry)} id='cyber_name' value={this.state.updatedcyber.cyber_name} placeholder="cyber name" type='text'></input>
                        <br />
                        <label htmlFor="area"> Area : </label>
                        <input onChange={(entry) => this.handleUpdateCyberFormData(entry)} id='area' value={this.state.updatedcyber.area} placeholder="location" type='text'></input>
                        <br />
                        <label htmlFor="street"> Street : </label>
                        <input onChange={(entry) => this.handleUpdateCyberFormData(entry)} id='street' value={this.state.updatedcyber.street} placeholder="street" type='text'></input>
                        <br />
                        <label htmlFor="cyber_phone_number"> Cyber Phone Number : </label>
                        <input onChange={(entry) => this.handleUpdateCyberFormData(entry)} id='cyber_phone_number' required value={this.state.updatedcyber.cyber_phone_number} placeholder="+254712345678" type='tel'></input>
                        <br />
                        <label htmlFor="owner_phone_number"> Owner's Phone Number : </label>
                        <input onChange={(entry) => this.handleUpdateCyberFormData(entry)} id='owner_phone_number' value={this.state.updatedcyber.owner_phone_number} placeholder="+254712345678" type='tel'></input>
                        <br />
                        <label htmlFor="owner_name"> Owner : </label>
                        <input onChange={(entry) => this.handleUpdateCyberFormData(entry)} id='owner_name' value={this.state.updatedcyber.owner_name} placeholder="owned by:" type='text'></input>
                        <br />
                        <br /> 

                        <input className='form-submit-btn' type='submit' value="Submit"></input>
                    </form>
                <button id='close-modal' onClick={()=>this.closeModalPopup()}>Close</button>
            </dialog>
            {this.state.submitted && <Navigate to={"/cybers"}/>}

            <div className='action-buttons'>
                <div className="delete-button">
                        <button onClick={() => this.deleteCyber()}>
                            Delete
                        </button>
                </div>
                <div className="update-button">
                        <button onClick={()=>this.showModalPopUp()}>
                            Edit
                        </button>
                </div>

            {this.state.isdeleted && <Navigate to={"/cybers"}/>}


                <div className="leave-view-button">
                    <Link to={"/cybers"}>
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