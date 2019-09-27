import React,{Component} from 'react';
import Modal from "@trendmicro/react-modal";
import AddAlertPage from "./AddAlertPage";
import GraphPage from "./GraphPage";

class Alert extends Component{
    constructor(props){
        super(props);
        this.state={
            isVisible : false,
            graphIsVisible : false,
            updateIsVisible : false,
            groups:[],
            isLoading:true
        };

        this.onClickEvent=this.onClickEvent.bind(this);
        this.onClickGraph=this.onClickGraph.bind(this);
        this.onClickUpdate=this.onClickUpdate.bind(this);
    }


    delete(id){
        this.props.delete(id);
    }

    onClickEvent(e){
        this.setState({
            isVisible : !this.state.isVisible
        })
    }
    onClickGraph(e){

        this.setState({
            graphIsVisible : !this.state.graphIsVisible
            }
        )
    };
    onClickUpdate (e){

        this.setState({
            updateIsVisible : !this.state.updateIsVisible
        })
    };


    render() {
        const {alert,update}=this.props;
        const {isVisible,graphIsVisible,updateIsVisible} = this.state;
        return (
            <div >
                <div className="card" >
                    <div className="card-header">
                        <h4 className="d-inline" style={{cursor:"pointer"}} onClick={this.onClickEvent}>{alert.name}</h4>
                        <i className="far fa-trash-alt" style={{cursor: "pointer", float: "right"}} onClick={() => this.delete(alert.id)}/>
                        <i className="fas fa-chart-bar" style={{cursor:"pointer",float:"right",marginRight:'0.8rem'}} onClick={ this.onClickGraph}/>
                        <i className="fas fa-edit" style={{cursor:"pointer",float:"right",marginRight:'1.0rem'}} onClick={this.onClickUpdate}/>
                    </div>
                    {
                        isVisible ?   <div className="card-body">
                            <p className="card-text" > URL: {alert.url}</p>
                            <p className="card-text"> Method: {alert.method}</p>
                            <p className="card-text"> Time: {alert.time}</p>
                        </div> : null

                    }
                    {
                       updateIsVisible ?
                           <Modal onClose={this.onClickUpdate.bind(this)}>
                            <Modal.Header>
                                <Modal.Title>
                                    Update Alert
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body padding>
                                <AddAlertPage closePopup={this.onClickUpdate.bind(this)}
                                              alert={alert}
                                              pageType={false}
                                              update={update}

                                />
                            </Modal.Body>
                           </Modal>:null
                    }
                    {
                        graphIsVisible ?
                            <Modal onClose={this.onClickGraph.bind(this)}>
                                <Modal.Header>
                                    <Modal.Title>
                                        Alert Graph
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body padding>
                                    <GraphPage closePopup={this.onClickGraph.bind(this)}
                                               respos={alert.responses}
                                               listofresponses={alert.listOfResponse}
                                               alert={alert}
                                       />

                                </Modal.Body>
                            </Modal>:null
                    }


                </div>

            </div>
        )
    }
}
export default Alert;
