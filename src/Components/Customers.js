import React, { Component, Fragment, useState } from "react";

export default class Customers extends Component {
    constructor(props) {
    super(props)
    this.handleCustomersChange = this.handleCustomersChange.bind(this);
}

handleCustomersChange(customers) {
    this.props.handleCustomersChange(customers)
}

    componentDidMount() {
        this.handleCustomersChange(
            [
                {customer_name: "customer1", area:"Juja", policy_number:"TH5843", owner_phone_number:"0745852367",},
                {customer_name: "customer2", area:"Thika", policy_number:"TH2334", owner_phone_number:"0745858667"},
                {customer_name: "customer3", area:"Juja", policy_number:"SY4955", owner_phone_number:"0745892367"},
                {customer_name: "customer4", area:"Juja", policy_number:"MO7475", owner_phone_number:"0745852367"},
            ]
        )

    }

    render (){
        return(
            <Fragment>
                <div className='customers-table'>
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
                        this.props.customers?.map((customer) => (
                            <tr key={customer.customer_name}>
                                <td>{customer.customer_name}</td>
                                <td>{customer.area}</td>
                                <td>{customer.policy_number}</td>
                                <td>{customer.owner_phone_number}</td>
                            </tr>
                        )
                        )
                    }
                </tbody>
                </table>
            </div>
        </Fragment>
        );
    }
}