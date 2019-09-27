import React,{Component} from 'react';
import Alert from "./Alert";
class Table extends Component{



    render() {
        const {handleDelete,alerts,listAlerts,update}=this.props;

        return(
            <div>
                {alerts.map(alert=>{
                    return(

                        <Alert alert={alert} alerts={alerts} delete={handleDelete} update={update}/>
                    )
                })}
            </div>
        )
    }

}
export default Table