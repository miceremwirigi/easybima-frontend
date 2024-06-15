import React, { Component, Fragment, useState } from "react";
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
        this.dummyCybers = []
    }

    handleCybersChange(cybers, isLoadingData) {
        this.props.handleCybersChange(cybers, isLoadingData);
    }

    dummyCybers =  [
                    {cyber_name: "cyber1", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745852367"},
                    {cyber_name: "cyber2", area:"Thika", owner_name:"John", owner_phone_number:"0745858667"},
                    {cyber_name: "cyber3", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745892367"},
                    {cyber_name: "cyber4", area:"Juja", owner_name:"Richard", owner_phone_number:"0745852367"},
                ]

    fetchCybers = async () => {
        this.handleCybersChange(this.dummyCybers, true);
        
        console.log(this.props.isLoadingData)
        console.log(this.props.backendUrl)

        await fetch(this.props.backendUrl+"/apis/cybers/")
        .then(response => response.json())
        .then(json => {
            this.handleCybersChange(json.data, false)
            console.log(json)
        })
        .catch((error) => {
                console.log(error);
                window.alert(error);
            }
        )     
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
