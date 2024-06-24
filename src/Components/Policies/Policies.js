import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Loader from '../Loader';

export default class Policies extends Component {
    constructor(props) {
    super(props)
    this.handlePoliciesChange = this.handlePoliciesChange.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
}

handlePoliciesChange(policies) {
    this.props.handlePoliciesChange(policies)
}

setLoadingState (value) {
    this.props.setLoadingState(value);
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

fetchPolicies = () => {
    this.setLoadingState(true);  
    fetch("apis/policies/withcustomers")
    .then(response => {
        response.json()
        .then(json => {
            this.handlePoliciesChange(json.data);                    
            console.log(json)              
            this.setLoadingState(false);  
            console.log("4: set state when fetching data to: "+ this.props.isLoadingData)
        })
    })        
    .catch((error) => {
            console.log(error);
            window.alert(error);
        }
    )            
}

    componentDidMount() {
        this.fetchPolicies()
    }

    render (){
        return(
            <Fragment>
                {
                    this.props.isLoadingData ? <Loader /> :
                     
                <>
                
                <div className="outer-table-wrapper">
                <div className='policies-table table-wrapper'>
                <table>
                <thead>
                    <tr>
                    <th></th>
                    <th>Owner</th>
                    <th>Identifier</th>
                    <th>Expires In</th>
                    <th>Phone</th>
                    <th>Policy No.</th>
                    <th>Type</th>
                    <th>Started On</th>
                    <th>Expires On</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {  
                        this.props.policies?.map((policy, index) => (
                            <tr key={policy.policy_number}>
                                <td>
                                    <Link to={`/policies/${policy.policy_id}`}>
                                        {index+1}.
                                    </Link>
                                </td>
                                
                                <td>
                                    <Link to={`/customers/${policy.customer_id}`}>
                                        {policy.first_name + " " + policy.second_name + " " + policy.last_name}
                                    </Link>
                                </td>

                                <td>
                                    <Link to={`/policies/${policy.policy_id}`}>
                                        {policy.item_identifier}
                                    </Link>
                                </td>

                                <td>
                                    <Link to={`/policies/${policy.policy_id}`}>
                                        {this.getNumberofDaysToExpiry(policy) + " days"}
                                    </Link>
                                </td>

                                <td>
                                    <a href={"tel:"+policy.phone_number}>
                                    {policy.phone_number}
                                    </a>
                                </td>

                                <td>
                                    {policy.policy_number}
                                </td>

                                <td>
                                    <Link to={`/policies/${policy.policy_id}`}>
                                        {policy.type}
                                    </Link>
                                </td>

                                <td>
                                    <Link to={`/policies/${policy.policy_id}`}>
                                        {this.getDateinYYYYMMDD(policy.issued_at)}
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/policies/${policy.policy_id}`}>
                                        {this.getDateinYYYYMMDD(policy.expires_at)}
                                    </Link>
                                </td>

                                <td>
                                    <a href={"mailto:"+policy.phone_number}>
                                    {policy.email}
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


            <div className="add-policy-button">
                <Link to={"/policies/add"}>
                    <button >
                        Add Policy
                    </button>
                </Link>
            </div>


        </Fragment>
        );
    }
}