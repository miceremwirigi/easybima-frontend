import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default class Cybers extends Component {
        constructor(props) {
        super(props);
        this.handleCybersChange = this.handleCybersChange.bind(this);
    }

    handleCybersChange(cybers) {
        this.props.handleCybersChange(cybers)
    }

    handleCyberResponse(json){
        const response = JSON.parse(json);
        return response
    }

    componentDidMount() {
       // this.handleCybersChange(            
       //          [
       //             {cyber_name: "cyber1", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745852367"},
       //             {cyber_name: "cyber2", area:"Thika", owner_name:"John", owner_phone_number:"0745858667"},
       //             {cyber_name: "cyber3", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745892367"},
       //             {cyber_name: "cyber4", area:"Juja", owner_name:"Richard", owner_phone_number:"0745852367"},
       //         ]            
       // )
        this.fetchCybers()
    }

    fetchCybers = () => {
        fetch("/apis/cybers/")
        .then(response => response.json())
         //.then(response => {
          //   this.handleCyberResponse(response)
         //})
        // .then(data => console.log(data))
        // .then(json => console.log(json))
        .then(json => {
            console.log(json)
            window.alert(json)
            this.handleCybersChange(json.data)
        }).catch(error => window.alert(error)
    }

    render (){
        return(
            <Fragment>
                <div className="add-cyber-button">
                    <Link to={"/cybers/add"}>
                        <button >
                            Add Cyber
                        </button>
                    </Link>
                </div>
                <div className="outer-table-wrapper">
                    <div className='cybers-table table-wrapper'>
                        <table>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Owner</th>
                                <th>Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.cybers?.map((cyber) => (
                                        <tr key={cyber.cyber_name}>
                                            <td>{cyber.cyber_name}</td>
                                            <td>{cyber.area}</td>
                                            <td>{cyber.owner_name}</td>
                                            <td>{cyber.owner_phone_number}</td>
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
        </Fragment>
        );
    }
}
