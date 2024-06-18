import React, { Component, Fragment } from 'react'
import './Home.css'

export default class Home extends Component {
    render(){
        return (
            <Fragment>
                <div className='home'>
                    <h1>Welcome</h1>
                    <p> Manage your clients efficiently </p>
                </div>
            </Fragment>
        )
    }
}