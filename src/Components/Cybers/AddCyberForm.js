import React, { Component, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';

class AddCyberForm extends Component {
    constructor(props) {
        super(props)
        // this.handleCyberFormData = this.props.handleCyberFormData.bind(this)
        this.state = {newcyber: {
            cyber_name: "",
            area: "",
            street: "",
            cyber_phone_number: "",
            owner_phone_number: "",
            owner_name: "",
            },
            submitted:false,
        }
    }

    handleCyberFormData(entry) {
        const addedcyber = {...this.state.newcyber}
        addedcyber[entry.target.id] = entry.target.value
        this.setState({newcyber: addedcyber})
    }

    submit(entry) {
        entry.preventDefault();
        fetch("https://easybima-backend.onrender.com/apis/cybers/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newcyber),          
        })
        .then((response) => {
            response.json();
            this.setState({submitted:true});
        })
        .then((reply) => console.log(reply))
        .catch((error) =>{
            console.log(error)
        })
    }

    render() {
        return (
            <Fragment>

                <div className="leave-form-button">
                    <Link to={"/cybers"}>
                        <button >
                            Back
                        </button>
                    </Link>
                </div>

                <div className='add-cyber-form'>
                    <form onSubmit={(entry) => this.submit(entry)}>
                        <label htmlFor="cyber_name"> Cyber Name : </label>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='cyber_name' value={this.state.newcyber.cyber_name} placeholder="cyber name" type='text'></input>
                        <br />
                        <label htmlFor="cyber_phone_number"> Cyber Phone Number : </label>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='cyber_phone_number' required value={this.state.newcyber.cyber_phone_number} placeholder="+254712345678" type='tel'></input>
                        <br />
                        <label htmlFor="area"> Cyber Location : </label>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='area' value={this.state.newcyber.area} placeholder="location" type='text'></input>
                        <br />
                        <label htmlFor="street"> Street : </label>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='street' value={this.state.newcyber.street} placeholder="street" type='text'></input>
                        <br />
                        <label htmlFor="owner_name"> Owner's Name : </label>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='owner_name' value={this.state.newcyber.owner_name} placeholder="owner name" type='text'></input>
                        <br />
                        <label htmlFor="owner_phone_number"> Owner's Phone Number : </label>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='owner_phone_number' value={this.state.newcyber.owner_phone_number} placeholder="contact" type='text'></input>
                        <br />
                        <input className='form-submit-btn' type='submit' value="Submit"></input>
                    </form>
                </div>
                {this.state.submitted && <Navigate to={"/cybers"}/>}
            </Fragment>
        )
    }
}

export default AddCyberForm