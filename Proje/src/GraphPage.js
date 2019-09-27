import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";



class GraphPage extends React.Component {

    constructor(props){
        super(props);
        this.state={
            responseList:[],
            responseTimeList:[],
        }
   }

   componentDidMount() {
       const {respos,listofresponses}=this.props;
       var deneme=this.props.listofresponses;
       let list1=[];
       let list2=[];
       if(listofresponses!=null) {
           if (listofresponses.length > 10){
               deneme=deneme.slice(deneme.length-10,deneme.length);
           }
       }

       for (let i=0;i<deneme.length;i++){
           this.state.responseList.push(deneme[i].response);
           this.state.responseTimeList.push(deneme[i].responseTime+" "+deneme[i].requestName);
       }

       this.setState({responseList:this.state.responseList,responseTimeList:this.state.responseTimeList});





   }


    render() {
        const {alert}=this.props;
        //console.log(this.state.responseList);
        return (

            <MDBContainer>
                <div style={{height:600, width:700}}>
                    <h3 className="mt-5">Line chart </h3>
                    <Line data={{labels: this.state.responseTimeList,
                                datasets: [
                            {
                                label: "Alert Request ",
                                fill: true,
                                lineTension: 0.3,
                                backgroundColor: "rgba(225, 204,230, .3)",
                                borderColor: "rgb(205, 130, 158)",
                                borderCapStyle: "butt",
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: "miter",
                                pointBorderColor: "rgb(205, 130,1 58)",
                                pointBackgroundColor: "rgb(255, 255, 255)",
                                pointBorderWidth: 10,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: this.state.responseList
                            }
                                        ]
                    }} options={{ responsive: true }} />
                </div>
            </MDBContainer>
        );
    }
}

export default GraphPage;