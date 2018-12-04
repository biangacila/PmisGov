
import React from 'react';
import {PostRequestHTTP} from "../../api/services";

export default class AddingModelFilter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            List:[],
            Selected:null,
            field:""
        }
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount(){
        this.fetchData();
    }
    async fetchData(){
        const _this = this;
        let endpoint = "/crum";

        let data = this.state;
        const hub = {
            OrgCode: this.state.OrgCode,
            ServiceName: "select",
            TableName: this.props.row.filterTable,
            Data: {},
            ParamUpdate: [],
            ParamConditions: []
        }


        await PostRequestHTTP(hub, endpoint, function (data) {
            const res = data.RESULT;
            _this.setState({List: res})

        });


    }

    handleInput=(e)=>{
        this.setState({Selected:e.target.value});
        this.props.handleInput(e,this.props.field);
    }
    getValue=()=>{
        return this.props.getValue(this.props.field);
    }

    renderOptions=()=>{
        return this.state.List.map((row)=>{
            return(
                <option
                    value={row[this.props.row.filterKey]}
                >
                    {row[this.props.row.filterValue]}
                </option>
            )
        })
    }

    render(){
        return(
            <div className="form-group">
                <label>{this.props.row.desc}</label>
                <select
                    type={this.props.row.type}
                    className="form-control"
                    id={this.props.row.field}
                    aria-describedby={this.props.row.field + "Help"}
                    placeholder={this.props.row.placeholder}
                    required={this.props.row.required}
                    onChange={(e) => this.props.handleInput(e, this.props.row.field)}
                    value={this.getValue(this.props.row.field)}
                >
                    <option>--Select--</option>
                    {this.renderOptions()}
                </select>

            </div>
        )
    }
}