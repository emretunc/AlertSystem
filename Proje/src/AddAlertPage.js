import React,{Component} from 'react';
import Select from 'react-select';


const options = [
    { value: 'POST', label: 'POST' },
    { value: 'GET', label: 'GET' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE' ,label: 'DELETE' }
];
class AddAlertPage extends Component{
    emptyItem = {
        name: '',
        url: '',
        method: '',
        time: '',

    };
    constructor(props){
        super(props);
        this.state = {
            item: this.emptyItem,
            selectedValue:'',
            newAlert:null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }
    async componentDidMount() {
        const {pageType,alert}=this.props;
        if(!pageType){
            const response = await fetch(`/alert/show/${alert.id}`);
            const body = await response.json();
            this.setState({item:body});
        }
    }


    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        const {pageType,alert,closePopup}=this.props;

        if(pageType){
            const response= await fetch("/alert/new", {
                method:  'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            const body = await response.json();

            //this.props.add(body);
            closePopup();
        }
        else {
            const response= await fetch(`/alert/edit/${alert.id}`, {
                method:  'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item),
            });
            const body = await response.json();
            //this.props.update(body,alert.id);
            closePopup();
        }


    }

    handleChange(event) {
        let item = {...this.state.item};
        if(event.target.name==='time'){
            item[event.target.name] = parseInt(event.target.value);
        }
        else{
            item[event.target.name] = event.target.value;
        }

        this.setState({item});
    }
    selectChange= selectedValue=>{
        this.setState({selectedValue});
        let item = {...this.state.item};
        item["method"]=selectedValue.value;
        this.setState({item});

    };




    render(){

        const {item,selectedValue} = this.state;


        return(
            <form onSubmit={this.handleSubmit}>
                <div className={"form-group"}>
                    <label htmlFor="exampleFormControlInput1">Name: </label>
                    <input type="text"
                           onChange={this.handleChange} value={item.name || ''} name={"name"} className="form-control" id="name" autoComplete={item.name}/>
                </div>
                <div className={"form-group"}>
                    <label>URL</label>
                    <input type="text"
                           onChange={this.handleChange} value={item.url || ''} name={"url"} className="form-control" id="exampleFormControlInput2"/>
                </div>
                <div className={"form-group"}>
                    <label htmlFor="exampleFormControlSelect1">Method:</label>

                    <Select name={"method"} value={selectedValue || ''} options = {options}  onChange={this.selectChange}/>

                </div>
                <div className={"form-group"}>
                    <label htmlFor="exampleFormControlSelect1">Time</label>
                    <input type="text" name={"time"}
                           onChange={this.handleChange} value={item.time || ''} className="form-control" id="exampleFormControlInput4"/>

                </div>
                <button  id="btnSubmit" type="submit" className="btn btn-primary">Submit</button>
                <button  className="btn btn-primary"
                         style={{marginLeft:'0.8rem'}}
                         onClick={this.props.closePopup}>
                    Close me</button>
            </form>

        );
    }

}export  default  AddAlertPage;