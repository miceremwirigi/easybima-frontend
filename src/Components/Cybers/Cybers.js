import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Loader from '../Loader';

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
        this.setLoadingState = this.setLoadingState.bind(this);
        this.dummyCybers = []
    }

    handleCybersChange (cybers) {
        this.props.handleCybersChange(cybers);
    }

    setLoadingState (value) {
        this.props.setLoadingState(value);
    }

    

    dummyCybers =  [
                    {cyber_name: "cyber1", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745852367"},
                    {cyber_name: "cyber2", area:"Thika", owner_name:"John", owner_phone_number:"0745858667"},
                    {cyber_name: "cyber3", area:"Juja", owner_name:"Lilian", owner_phone_number:"0745892367"},
                    {cyber_name: "cyber4", area:"Juja", owner_name:"Richard", owner_phone_number:"0745852367"},
                ]

    fetchCybers = () => {
        this.setLoadingState(true);  
        fetch("apis/cybers/")
        .then(response => {
            response.json()
            .then(json => {
                this.handleCybersChange(json.data);                    
                console.log(json)              
                this.setLoadingState(false);
            })
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
                
                {
                    this.props.isLoadingData ? <Loader /> :
                     
                <>
                    <div className="outer-table-wrapper">
                    <div className='cybers-table table-wrapper'>
                        <table>
                            <thead>
                                <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Owner</th>
                                <th>Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.cybers?.map((cyber, index) => (
                                        <tr key={cyber.cyber_name}>

                                            <td>
                                                <Link to={`/cybers/${cyber.id}`}>
                                                        {index+1}.
                                                </Link> 
                                            </td>
                                            
                                            <td>
                                                <Link to={`/cybers/${cyber.id}`}>
                                                        {cyber.cyber_name}
                                                </Link> 
                                            </td>
                                            <td>
                                                <Link to={`/cybers/${cyber.id}`}>
                                                        {cyber.area}
                                                </Link> 
                                            </td>
                                            <td>
                                                <Link to={`/cybers/${cyber.id}`}>
                                                        {cyber.owner_name}
                                                </Link> 
                                            </td>
                                            <td>
                                                <a href={"tel:"+cyber.cyber_phone_number}>
                                                    {cyber.cyber_phone_number}
                                                </a>
                                            </td>
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

                <div className="add-cyber-button">
                    <Link to={"/cybers/add"}>
                        <button >
                            Add Cyber
                        </button>
                    </Link>
                </div>
           
                
            </Fragment>
        );
    }
}
