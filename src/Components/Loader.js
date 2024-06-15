import { Component } from "react";
import { RotatingLines } from "react-loader-spinner";


export default class Loader extends Component {
    render(){
        return (
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        )
    }
}