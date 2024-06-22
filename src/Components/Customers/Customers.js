import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Loader from '../Loader';

export default class Customers extends Component {
    constructor(props) {
    super(props)
    this.handleCustomersChange = this.handleCustomersChange.bind(this);
    this.setLoadingState = this.setLoadingState.bind(this);
}

handleCustomersChange(customers) {
    this.props.handleCustomersChange(customers)
}

setLoadingState (value) {
    this.props.setLoadingState(value);
}

fetchCustomers = () => {
    this.setLoadingState(true);  
    fetch("apis/customers/")
    .then(response => {
        response.json()
        .then(json => {
            this.handleCustomersChange(json.data);                    
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
        // this.handleCustomersChange(
        // //     [
        // //         {customer_name: "customer1", area:"Juja", policy_number:"TH5843", owner_phone_number:"0745852367",},
        // //         {customer_name: "customer2", area:"Thika", policy_number:"TH2334", owner_phone_number:"0745858667"},
        // //         {customer_name: "customer3", area:"Juja", policy_number:"SY4955", owner_phone_number:"0745892367"},
        // //         {customer_name: "customer4", area:"Juja", policy_number:"MO7475", owner_phone_number:"0745852367"},
        // //     ]

        // [
        //     {
        //       first_name: "Greg",
        //       second_name: "Macharia",
        //       other_names: "Kiama",
        //       phone_number: "0754245877",
        //       secondary_phone_number: "",
        //       national_id: "123233",
        //       policies: [
        //         {
        //           id: "ffd7b0cf-8f27-4527-b41b-4a14b42dd07e",
        //           policy_number: "GTH4534",
        //           type: "",
        //           issued_at: "2006-01-02T18:04:05+03:00",
        //           expires_at: "2007-01-02T18:04:05+03:00",
        //           item_identifier: "KAD234R",
        //           owner_id: "123233"
        //         },
        //         {
        //           id: "68b8f4f2-22d7-431c-bf02-386a8539076b",
        //           policy_number: "GTr4534",
        //           type: "",
        //           issued_at: "2006-01-02T18:04:05+03:00",
        //           expires_at: "2007-01-02T18:04:05+03:00",
        //           item_identifier: "KDH234R",
        //           owner_id: "123233"
        //         }
        //       ],
        //       email: "gmk@email.com"
        //     }
        //   ]
        // )

        this.fetchCustomers()

    }

    render (){
        return(
            <Fragment>
                
                {
                    this.props.isLoadingData ? <Loader /> :
                     
                <>
                    <div className="outer-table-wrapper">
                    <div className='customers-table table-wrapper'>
                        <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Policies</th>
                            <th>ID No.</th>
                            <th>Phone</th>
                            <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {  
                                this.props.customers?.map((customer) => ( 
                                    <tr key={customer.phone_number}>
                                        <td>
                                    <Link to={`/customers/${customer.id}`}>
                                            {customer.first_name + " " + customer.second_name}
                                    </Link> 
                                        </td>
                                        <td>
                                    <Link to={`/customers/${customer.id}`}>
                                            {customer.policies.length}
                                    </Link> 
                                        </td>  
                                        <td>
                                    <Link to={`/customers/${customer.id}`}>
                                            {customer.national_id}
                                    </Link> 
                                        </td>
                                        <td>
                                            <a href={"tel:"+customer.phone_number}>
                                                {customer.phone_number}
                                            </a>
                                        </td>
                                        <td>
                                            <a href={"mailto:"+customer.email}>
                                                {customer.email}
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

            <div className="add-customer-button">
                <Link to={"/customers/add"}>
                    <button >
                        Add Customer
                    </button>
                </Link>
            </div>


        </Fragment>
        );
    }
}