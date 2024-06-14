import React, { Component, Fragment } from 'react';

class AddCyberForm extends Component {
    constructor(props) {
        super(props)
        // this.handleCyberFormData = this.props.handleCyberFormData.bind(this)
        this.state = {newcyber: {
            cyber_name: "",
            area: "",
            owner_name: "",
            owner_phone_number: ""
        }}
    }

    handleCyberFormData(entry) {
        const addedcyber = {...this.state.newcyber}
        addedcyber[entry.target.id] = entry.target.value
        this.setState({newcyber: addedcyber})
        console.log(addedcyber)
    }

    submit(entry) {
        entry.preventDefault();
        console.log(entry)
        fetch("/apis/cybers",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.newcyber),           
        })
        .then((response) => response.json())
        .then((reply) => console.log(reply))
        .catch((error) =>console.log(error) )

    }

    render() {
        return (
            <Fragment>
                <div className='add-cyber-form'>
                    <form onSubmit={(entry) => this.submit(entry)}>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='cyber_name' value={this.state.newcyber.cyber_name} placeholder="cyber name" type='text'></input>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='area' value={this.state.newcyber.area} placeholder="location" type='text'></input>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='owner_name' value={this.state.newcyber.owner_name} placeholder="owner name" type='text'></input>
                        <input onChange={(entry) => this.handleCyberFormData(entry)} id='owner_phone_number' value={this.state.newcyber.owner_phone_number} placeholder="contact" type='text'></input>
                        <input type='submit' value="Submit"></input>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default AddCyberForm