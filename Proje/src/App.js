import React,{Component} from 'react';
import './App.css';
import './Navbar.css';
import {Route, HashRouter as Router, Switch, withRouter, Link} from 'react-router-dom';
import Navbar from "./Navbar";
import Modal from '@trendmicro/react-modal';
import '@trendmicro/react-modal/dist/react-modal.css';
import Table from "./Table";
import AddAlertPage from "./AddAlertPage";
import LoginPage from "./LoginPage";
/*const Nav = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </ul>
    </div>
);*/

const HomePage = () => <h1>Home Page</h1>;
const LoginsPage=()=> <LoginPage/>;


class App extends Component{

    constructor(props){
        super(props);
        this.state={
            showPopup:false,isLoading:true,group:[]
        };
        this.remove = this.remove.bind(this);
        this.addAlert=this.addAlert.bind(this);
        this.updateAlert=this.updateAlert.bind(this);

}


    async hiddenPopup(){
        const response = await fetch('/list');
        const body = await response.json();
        this.setState({
            group: body,
            showPopup: !this.state.showPopup
        });



    }

    async componentDidMount() {


        const response = await fetch('/list');
       const body = await response.json();
        this.setState({ group: body, isLoading: false });
        console.log(body);

    }

    async remove(id) {
        await fetch(`/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedGroups = [...this.state.group].filter(i => i.id !== id);
            this.setState({group: updatedGroups});
        });
    }



    addAlert(body){
        this.state.group.push(body);
        this.setState({group: this.state.group});
    }

    updateAlert(body,id){

        let updatedGroups = [...this.state.group].filter(i => i.id !== id);
        this.setState({group:updatedGroups});
        this.state.group.push(body);
        this.setState({group: this.state.group});

    }





    render() {
        const {group, isLoading} = this.state;
        let header = new Headers({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'
        });


        if (isLoading) {
            return <p>Loading...</p>;
        }
        return(



            <div id={"alertPage"} className="container">
                <Navbar title={'ALERTING SYSTEM'} />

                <Table alerts={group}
                       handleDelete={this.remove.bind(this)}
                       update={this.updateAlert.bind(this)}
                       />

                <button id="addButton" type="button" className="btn btn-primary" onClick={this.hiddenPopup.bind(this)}
                >Add Alert
                </button>

                {/* <Router>


                    <div>
                        <Nav />
                        <Route exact path="/" component={HomePage} />
                        <Route path="/logout" component={LoginsPage}/>
                    </div>
                </Router>*/}

                {this.state.showPopup ?  <Modal onClose={this.hiddenPopup.bind(this)}>
                        <Modal.Header>
                            <Modal.Title>
                               Add Alert
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body padding>
                            <Router>
                                <Switch>
                                    <Route exact={true} path="/" render={() => <AddAlertPage closePopup={this.hiddenPopup.bind(this)}
                                                                                             add={this.addAlert.bind(this)}
                                                                                             pageType={true}
                                                                                                />} />
                            </Switch>
                        </Router>
                        </Modal.Body>
                    </Modal>
              :null}

            </div>


        );
    }

}

export default App;



