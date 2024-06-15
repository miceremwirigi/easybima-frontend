import React, { Component, Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from './Loader';

// function RenderTableAfterLoading(props){
//     if (props.isLoadingData) {
//         return (
//             <loader />
//         )
//     }
//     return (
//         <>
        
//         </>
//     );
// }

export default class Cybers extends Component {
        constructor(props) {
        super(props);
        this.handleCybersChange = this.handleCybersChange.bind(this);
        this.handleLoadingState = this.handleLoadingState.bind(this)
        this.dummyCybers = []
    }

    handleCybersChange (cybers) {
        this.props.handleCybersChange(cybers);
    }

    handleLoadingState (isLoadingData) {
        this.props.handleLoadingState(isLoadingData);
    }

    dummyCybers =  [
                    {cyber_name: "cyber1", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745852367"},
                    {cyber_name: "cyber2", area:"Thika", owner_name:"John", owner_phone_number:"0745858667"},
                    {cyber_name: "cyber3", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745892367"},
                    {cyber_name: "cyber4", area:"Juja", owner_name:"Richard", owner_phone_number:"0745852367"},
                ]

    fetchCybers = () => {
        this.handleLoadingState(true);        
        console.log(this.props.isLoadingData);
        const jsonDataResponse = fetch("https://easybima-backend.onrender.com/apis/cybers/")
        .then(response => {
            response.json()
            .then(json => {
            this.handleCybersChange(json.data);                    
            console.log(json) 
        })
        })
        
        .catch((error) => {
                console.log(error);
                window.alert(error);
            }
        )               
        this.handleLoadingState(false);    
    }

    componentDidMount() {
        // this.handleCybersChange(            
        //          dummyCybers            
        // )        
        this.fetchCybers();
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

                {
                    this.props.isLoadingData ? <Loader /> :
                     
                <>
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
                </>
                }               
                
            </Fragment>
        );
    }
}
