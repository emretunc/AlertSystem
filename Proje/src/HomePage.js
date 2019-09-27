import React,{Component} from 'react';
import App from "./App";
import LoginPage from "./LoginPage";
import {Route, Switch} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

class HomePage extends Component {
    render() {
        return (

                <Router>


                        <Switch>
                            <Route path="/" exact={true} component={LoginPage} />
                            <Route path="/user" exact={true} component={App}/>

                        </Switch>

                </Router>

        )
    }
}
export default HomePage;