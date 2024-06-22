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
        // this.handlePoliciesChange(
        // //     [
        // //         {policy_name: "policy1", area:"Juja", policy_number:"TH5843", owner_phone_number:"0745852367",},
        // //         {policy_name: "policy2", area:"Thika", policy_number:"TH2334", owner_phone_number:"0745858667"},
        // //         {policy_name: "policy3", area:"Juja", policy_number:"SY4955", owner_phone_number:"0745892367"},
        // //         {policy_name: "policy4", area:"Juja", policy_number:"MO7475", owner_phone_number:"0745852367"},
        // //     ]
        //     [
        //       {
        //         policy_number: "GTH4534",
        //         type: "",
        //         issued_at: "2006-01-02T18:04:05+03:00",
        //         expires_at: "2007-01-02T18:04:05+03:00",
        //         item_identifier: "KAD234R",
        //         first_name: "Greg",
        //         second_name: "Macharia",
        //         last_name: "Kiama",
        //         phone_number: "0754245877",
        //         secondary_phone_number: "",
        //         national_id: "123233",
        //         email: "gmk@email.com"
        //       },
        //       {
        //         policy_number: "GTr4534",
        //         type: "",
        //         issued_at: "2006-01-02T18:04:05+03:00",
        //         expires_at: "2007-01-02T18:04:05+03:00",
        //         item_identifier: "KDH234R",
        //         first_name: "Greg",
        //         second_name: "Macharia",
        //         last_name: "Kiama",
        //         phone_number: "0754245877",
        //         secondary_phone_number: "",
        //         national_id: "123233",
        //         email: "gmk@email.com"
        //       }
        //     ]
        // )

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
                        this.props.policies?.map((policy) => (
                            <tr key={policy.policy_number}>
                                <td>{policy.first_name + " " + policy.second_name + " " + policy.last_name}</td>
                                <td>{policy.item_identifier}</td>
                                <td>{this.getNumberofDaysToExpiry(policy) + " days"}</td>
                                <td>{policy.phone_number}</td>                             
                                <td>{policy.policy_number}</td>
                                <td>{policy.type}</td>
                                <td>{this.getDateinYYYYMMDD(policy.issued_at)}</td>
                                <td>{this.getDateinYYYYMMDD(policy.expires_at)}</td>
                                <td>{policy.email}</td>
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