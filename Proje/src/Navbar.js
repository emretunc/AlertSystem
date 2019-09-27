import React,{Component} from "react";
import './Navbar.css';
class Navbar extends  Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className="Navbar">
                <h3>{this.props.title}</h3>
            </div>
        );
    }
}export default Navbar;