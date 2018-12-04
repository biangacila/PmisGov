import React from 'react';
import {PostMainPMIS, PostGovPMIS, PostRecordPMIS} from '../../api/auth';

export default class FilteringContract extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            province: "",
            municipality: "",
            company: "",
            contract: "",
            ListContract: [],
            ListOrganization: [],
            ComboProvince: [],
        }

    }

    async componentDidMount() {
        await this.fetchContract();
    }

    fetchContract = async () => {
        let _this = this;

        let hub = {}
        const endpoint = "/api/contract/list"; // "/api/contracts/information/list
        await PostMainPMIS(hub, endpoint, function (data) {

            let lsProvince = {};
            for (let i in data) {
                const row = data[i];
                lsProvince[row.Province] = true;
            }
            let ls = [];
            for (let i in lsProvince) {
                ls.push(i)
            }
            _this.setState({ListContract: data, ComboProvince: ls});

            console.log(":> ListContract > ", ls, data);
        })

    }
    /*fetchOrganization = async () => {
        let _this = this;

        let hub = {}
        const endpoint = "/api/organisation/list";
        await PostMainPMIS(hub, endpoint, function (data) {
            console.log(":> ListOrganization > ", data);
            _this.setState({ListOrganization: data})
        })

    }*/

    handleInput=(e,key)=>{
        this.setState({[key]:e.target.value});
        this.props.handleInput(e,key);
    }
    getValue=(key)=>{
        if(typeof this.state[key] ==="undefined"){
            return "";
        }
        return this.state[key]
    }

    renderProvince =()=> {
        console.log(":> renderProvince > ", this.state.ComboProvince.length );
        if(this.state.ComboProvince.length === 0){
            return(
                <p>Waiting for province list ...</p>
            )
        }

        return(
            <div className="form-group">
                <label>Province</label>
                <select
                    className="form-control"
                    required={true}
                    onChange={(e) => this.handleInput(e, "province")}
                    value={this.getValue("province")}
                >
                    <option>--Select Province --</option>
                    {this.state.ComboProvince.map((item,index)=>{
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </select>

            </div>
        )
    }

    renderMunicipality=()=>{
        if(this.state.province ===""){
            return ("")
        }
        let municipalities = [];
        let ls  = {};
        for(let i in this.state.ListContract){
            const row =this.state.ListContract[i]; // Municipality
            if(row.Province ===this.state.province){
                ls[row.Municipality] = true;
            }
        }

        for(let i in ls){
            municipalities.push(i)
        }

        if(municipalities.length ===0){
            return ""
        }

        return(
            <div className="form-group">
                <label>Municipality</label>
                <select
                    className="form-control"
                    required={true}
                    onChange={(e) => this.handleInput(e, "municipality")}
                    value={this.getValue("municipality")}
                >
                    <option>--Select Province --</option>
                    {municipalities.map((item,index)=>{
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </select>

            </div>
        )

    }

    renderCompany=()=>{

        if(this.state.province ===""){
            return ("")
        }
        if(this.state.municipality ===""){
            return ("")
        }

        let companies = [];
        let ls  = {};
        for(let i in this.state.ListContract){
            const row =this.state.ListContract[i]; // Municipality
            if(row.Province ===this.state.province && row.Municipality ===this.state.municipality){
                ls[row.Company] = true;
            }
        }

        for(let i in ls){
            companies.push(i)
        }

        if(companies.length ===0){
            return ""
        }

        return(
            <div className="form-group">
                <label>Company</label>
                <select
                    className="form-control"
                    required={true}
                    onChange={(e) => this.handleInput(e, "company")}
                    value={this.getValue("company")}
                >
                    <option>--Select Province --</option>
                    {companies.map((item,index)=>{
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </select>

            </div>
        )

    }

    renderContract=()=>{

        if(this.state.province ===""){
            return ("")
        }
        if(this.state.municipality ===""){
            return ("")
        }
        if(this.state.company ===""){
            return ("")
        }

        let contracts = [];
        let ls  = {};
        for(let i in this.state.ListContract){
            const row =this.state.ListContract[i]; // Municipality
            if(
                row.Province ===this.state.province &&
                row.Municipality ===this.state.municipality &&
                row.Company ===this.state.company
            ){
                ls[row.Name] = true;
            }
        }

        for(let i in ls){
            contracts.push(i)
        }

        if(contracts.length ===0){
            return ""
        }

        return(
            <div className="form-group">
                <label>Contract</label>
                <select
                    className="form-control"
                    required={true}
                    onChange={(e) => this.handleInput(e, "contract")}
                    value={this.getValue("contract")}
                >
                    <option>--Select Contract --</option>
                    {contracts.map((item,index)=>{
                        return(
                            <option key={index} value={item}>{item}</option>
                        )
                    })}
                </select>

            </div>
        )

    }

    submitSearchData=()=>{
        let _this = this;
        const validation=()=>{
            if(_this.state.province ===""){
                return false
            }
            if(_this.state.municipality ===""){
                return false
            }
            if(_this.state.company ===""){
                return false
            }
            if(_this.state.contract ===""){
                return false
            }

            return true
        };

        if(!validation()){
            alert("! Please select all the box before process");
        }

        this.props.handleInputData({
            province: this.state.province,
            municipality: this.state.municipality,
            company: this.state.company,
            contract: this.state.contract,
        },"Filter");
    }

    renderButtons=()=>{
        if(this.state.province ===""){
            return ("")
        }
        if(this.state.municipality ===""){
            return ("")
        }
        if(this.state.company ===""){
            return ("")
        }
        if(this.state.contract ===""){
            return ("")
        }

        return(
            <button className="btn btn-primary pull-left" onClick={()=>{this.submitSearchData()}}>
                Search Data
            </button>
        )
    }

    render() {
        return (
            <div className="">
                <h2>filtering request</h2>
                <div>
                    {this.renderProvince()}
                </div>
                <div>
                    {this.renderMunicipality()}
                </div>
                <div>
                    {this.renderCompany()}
                </div>
                <div>
                    {this.renderContract()}
                </div>
                <div>
                    {this.renderButtons()}
                </div>
                <div><br/><br/><br/></div>
            </div>
        )
    }
}