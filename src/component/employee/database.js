import React from 'react';
import {PostMainPMIS} from "../../api/auth";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MySearchField from './search-field';
import Paper from 'material-ui/Paper';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Button, Modal} from 'react-bootstrap';
import MyComponentModal from '../common/modal-component';

import '../../asset/css/global-main.css';

const style = {
    margin: 12,
};

function numericSortFunc(a, b, order) {
    if (order === 'desc') {
        return Number(b.Id) - Number(a.Id);
    } else {
        return Number(a.Id) - Number(b.Id);
    }
}



export default class DatabaseComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Employees: [],
            currentEmployee:null,
            openclose:false,
            openclosestatus:false,
            hideColumnVariable: {
                Address: false,
                Gender: false,
                Email: false,
                CellphoneNumber: false,
            },
            empStatus: "trial",
            filtereedEmployee: 0,
            pips: 0,
            count: 0,
            searchText: "",
            statusView:false
        }

    }

   async componentDidMount(){
       await this.fetchEmployees()
    }

    actionViewEmployee=(row)=> {
        let tmp = this.state;
        tmp.currentEmployee = row;
        this.setState(tmp);
        this.openModal()
    }
    openModal=()=> {
        var tmp = this.state;
        tmp.openclose = true;
        this.setState(tmp);
    }


    goToDocs=(row)=>{
        window.localStorage.setItem("@RECORD-EMPLOYEE", JSON.stringify(row));
        window.location.href = "#/record";
    }

    goToProfile=(row)=>{
        window.localStorage.setItem("PROFILE-EMPLOYEE", JSON.stringify(row));
        window.location.href = "#/profile";
    }
    handleSearchChange = (searchText, result) => {
        var count = result.length;
        var tmpThis = result.pips;
        var pips = 0;
        for (var i = 0; i < result.length; i++) {
            pips = pips + result[i].Pips;
        }
        if (this.state.searchText !== searchText) { // <- this stops the infinite loop
            this.setState({
                pips: pips,
                count: count,
                searchText: searchText
            });
        }
        console.log("handleSearchChange --> ", searchText, result);
    }
    handleInput=(e)=>{
        let key = e.target.name;
        let val = e.target.value;
        this.setState({[key]:val})
    }
    popupViewForm=(row)=> {
        let tmp = this.state;
        tmp.currentEmployee = row;
        tmp.openclose = true;
        this.setState(tmp);

        console.log("popupViewForm > ",row,this.state.currentEmployee)
    }

    CommandButtons2=(row) =>{

        return (
            <div>
                <button type="button" className={"btn btn-default"} onClick={() => {
                    this.popupViewForm(row)
                }}>View
                </button>
                &nbsp;
                &nbsp;
                <button type="button" className={"btn btn-default"} onClick={() => {
                    this.goToProfile(row)
                }}>Profile
                </button>
                &nbsp;
                <button type="button" className={"btn btn-default"} onClick={() => {
                    this.goToDocs(row)
                }}>Docs
                </button>
            </div>
        );
        //alert("Choose to Terminate employee: "+row.EmployeeCode);
    }
    CommandButtons=(cell, row) =>{

        return (
            <div>
                <button type="button" className={"btn btn-default"} onClick={() => {
                    this.popupViewForm(row)
                }}>View
                </button>
                &nbsp;
                &nbsp;
                <button type="button" className={"btn btn-default"} onClick={() => {
                    this.goToProfile(row)
                }}>Profile
                </button>
                &nbsp;
                <button type="button" className={"btn btn-default"} onClick={() => {
                    this.goToDocs(row)
                }}>Docs
                </button>
            </div>
        );
        //alert("Choose to Terminate employee: "+row.EmployeeCode);
    }


    fetchEmployees=async ()=>{
        let _this = this;
        let company = this.props.state.company;
        let endpoint = "/employee/list/" + company;
        let hub = {};
        hub.company = company;

        await PostMainPMIS(hub, endpoint, function (data) {
            let emp = [];

            for (let i in data) {
                let row = data[i];
                row.Id = parseInt(row.Id);
                emp.push(row);
            }

            let tmp = _this.state;
            tmp.Employees = emp;
            _this.setState(tmp);

            console.log(":> fetchEmployees > ",_this.state.Employees );
        })


    }

    closeModal=()=>{
        this.setState({openclose:false,currentEmployee:null})
    }

    renderView() {
        if(this.state.currentEmployee ===null){
            return ""
        }
        if(typeof  this.state.currentEmployee ==="undefined"){
            return ""
        }
        let avoidedKeys = {
            Id: true,
            Status: true,
            Date: true,
            Time: true,
            OrgDateTime: true
        };
        let primaryKeys = {
            Company: true,
            EmployeeCode: true,
            Contract: true,
            Name: true,
            Surname: true,
            DailyRate: true,
            TerminationDate: true,
            TerminationCode: true,
            ReasonForTermination: true,
            Site: true,
        };

        let ls = [];
        for (let i in this.state.currentEmployee) {
            const item = this.state.currentEmployee[i];
            let o = {};
            o.key = i;
            o.val = item;
            o.editable = true;
            if (typeof primaryKeys[o.key] !== "undefined") {
                o.editable = false;
            }

            if (typeof avoidedKeys[o.key] === "undefined") {
                ls.push(o);
            }

        }


        return (
            <div className="container ">
                <Modal show={this.state.openclose} onHide={this.closeModal} className="">
                    <Modal.Header closeButton>
                        <Modal.Title>Employee Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{height: "80%", overflow: "scroll"}}>

                        <div className="row">
                            <div className="col-lg-12">

                                <h5>EmployeeCode: {this.state.currentEmployee.EmployeeCode}</h5>
                                <h5>EmployeeIDNo: {this.state.currentEmployee.EmployeeIDNo}</h5>
                                <h5>Site: {this.state.currentEmployee.Site}</h5>
                                <h5>
                                    Fullname: {this.state.currentEmployee.Name + "  " + this.state.currentEmployee.Surname}</h5>

                                <form>
                                    <table className="table">
                                        {ls.map((row) => {
                                            return (
                                                <tr key={row.key}>
                                                    <th style={{textAlign: "right"}}>
                                                        {row.key}: &nbsp;
                                                    </th>
                                                    <td style={{textAlign: "left"}}>{row.val}</td>

                                                </tr>
                                            )
                                        })}
                                    </table>

                                </form>


                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }


    renderDataTable=()=>{
        let data = [];

        if(this.state.Employees.length > 0){
            for(let i in this.state.Employees){
                let row = this.state.Employees[i];

                break;
            }

        }
        for (let i in this.state.Employees) {
            const row = this.state.Employees[i];
            if (row.Status === this.state.empStatus) {

                data.push(row)
            }
        }

        return(
            <table className={"table"}>
                <thead>
                <tr>
                    <th style={{textAlign:"left"}}>#</th>
                    <th style={{textAlign:"left"}}>Fullname</th>
                    <th style={{textAlign:"left"}}>Id Number</th>
                    <th style={{textAlign:"left"}}>Phone</th>
                    <th style={{textAlign:"left"}}>Site</th>
                </tr>
                </thead>
                <tbody>
                {this.state.Employees.map((row,index)=>{
                    return(
                        <tr>
                            <td>
                                {this.CommandButtons2(row)}
                            </td>
                            <td>{row.Name +" "+row.Surname}</td>
                            <td>{row.EmployeeIDNo}</td>
                            <td>{row.CellphoneNumber}</td>
                            <td>{row.Site}</td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        )
    }

    renderData=()=>{

        return this.renderDataTable();

        let data = [];

        for (let i in this.state.Employees) {
            const row = this.state.Employees[i];
            if (row.Status === this.state.empStatus) {
                console.log("renderData --> compare > ",row.Status," == ",this.state.empStatus,data);
                data.push(row)
            }
        }




        const selectRowProp = {
            mode: 'radio',
            clickToSelect: false  // enable click to select
        };

        let _this = this;

        const options = {
            defaultSortName: 'Id',
            defaultSortOrder: 'asc',
            paginationSize: 20,
            actionViewEmployee: this.actionViewEmployee,
            clearSearch: true,
            searchField: (props) => (<MySearchField {...props}/>),
            searchDelayTime: 1500,
            afterSearch: (e, ee) => {
                this.handleSearchChange(e, ee)
            },
            that: _this,
        };

        let myStyle = {
            overflow: 'visible',
            width: '70%'
        };

        myStyle.color = "red";

        let styleEmpStatus = {};
        let myClassGray = "";
        if (this.state.empStatus !== "trial") {
            styleEmpStatus.color = "#505050";
            myClassGray = "myClassGray";
        }

        let Statuses={trial:"Active Employee",termination:"Termination Employee"};

        return (
                <div className={""} style={{width:"90%",overFlow:"scroll"}}>
                <MuiThemeProvider>
                    <div className="row">

                        <div className="col col-lg-12">
                            <Paper style={style} zDepth={1}>
                                <div className="centerContent ">
                                    <form className="">
                                        <div className="form-group">
                                            <label>Database Query</label>
                                            <select
                                                className="select"
                                                name="empStatus"
                                                onChange={(e)=>this.handleInput(e)}
                                                defaultValue={this.state.statusView}
                                                style={{width:"50%"}}
                                            >
                                                <option value="trial">Active Employee</option>
                                                <option value="termination">Termination Employee</option>

                                            </select>
                                            <span className="pull-right totDatabaseQuery"> <b>{data.length}</b></span>
                                        </div>
                                    </form>
                                    <hr/>

                                    <p><span
                                        className="pull-right">Key search: <b>{this.state.searchText}</b> &nbsp;&nbsp;
                                        Count: <b>{this.state.count}</b></span></p>

                                    <BootstrapTable
                                        id="tbEmployee"
                                        style={myStyle}
                                        data={data}
                                        striped={false}
                                        hover={true}
                                        pagination
                                        options={options}
                                        exportCSV
                                        search
                                        hidden={this.state.hideColumnVariable}
                                        className={myClassGray}

                                    >
                                        <TableHeaderColumn dataField="button" width='380px'
                                                           dataFormat={this.CommandButtons}>#</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Id" isKey={true} dataSort width='300px'
                                                           style={styleEmpStatus}
                                                           sortFunc={numericSortFunc} hidden={true}
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField="EmployeeCode" width='70px'
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Code</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Name" width='300px' style={styleEmpStatus}
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Surname" width='300px' style={styleEmpStatus}
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Surname</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Designation" width='300px' style={styleEmpStatus}
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Designation</TableHeaderColumn>
                                        <TableHeaderColumn dataField="DailyRate" width='200px' style={styleEmpStatus}
                                                           filter={{type: 'TextFilter', delay: 1000}}
                                                           hidden={false}>Daily
                                            Rate</TableHeaderColumn>
                                        <TableHeaderColumn dataField="EmployeeIDNo" width='150px' style={styleEmpStatus}
                                                           filter={{type: 'TextFilter', delay: 1000}}>Employee
                                            ID No</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Site" width='200px' style={styleEmpStatus}
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Site</TableHeaderColumn>
                                        <TableHeaderColumn hidden={false} dataField="Address" width='200px'
                                                           style={styleEmpStatus} filter={{
                                            type: 'TextFilter',
                                            delay: 1000
                                        }}>Address</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Gender" width='10px' style={styleEmpStatus}
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Gender</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Bank" width='200px' style={styleEmpStatus}
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }} hidden={false}>Bank</TableHeaderColumn>
                                        <TableHeaderColumn dataField="AccountNumber" width='200px'
                                                           style={styleEmpStatus}
                                                           filter={{type: 'TextFilter', delay: 1000}}
                                                           hidden={false}>Account
                                            Number</TableHeaderColumn>
                                        <TableHeaderColumn dataField="BranchCode" width='200px' style={styleEmpStatus}
                                                           filter={{type: 'TextFilter', delay: 1000}}
                                                           hidden={false}>Branch
                                            Code</TableHeaderColumn>
                                        <TableHeaderColumn dataField="PaymentMethod" width='200px'
                                                           style={styleEmpStatus}
                                                           filter={{type: 'TextFilter', delay: 1000}}
                                                           hidden={false}>Payment
                                            Method</TableHeaderColumn>
                                        <TableHeaderColumn hidden={false} dataField="CommencementDate" width='200px'
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>CommencementDate</TableHeaderColumn>
                                        <TableHeaderColumn dataField="CellphoneNumber" width='100px'
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Cellphone Number</TableHeaderColumn>

                                        <TableHeaderColumn hidden={false} dataField="Email" width='200px'
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Email</TableHeaderColumn>

                                        <TableHeaderColumn hidden={false} dataField="Contract" width='200px'
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Contract</TableHeaderColumn>

                                        <TableHeaderColumn hidden={false} dataField="TerminationDate" width='200px'
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Termination Date</TableHeaderColumn>
                                        <TableHeaderColumn hidden={false} dataField="TerminationCode" width='200px'
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Termination Code</TableHeaderColumn>
                                        <TableHeaderColumn hidden={false} dataField="ReasonForTermination" width='200px'
                                                           filter={{
                                                               type: 'TextFilter',
                                                               delay: 1000
                                                           }}>Reason For Termination</TableHeaderColumn>

                                    </BootstrapTable>


                                    {this.state.currentEmployee !==null&&(
                                        <MyComponentModal
                                            obectname={"Employee Detail [" + this.state.currentEmployee.Name + "]"}
                                            openclose={this.state.openclose}
                                            close={this.closeModal}
                                            open={this.openModal}
                                            data={this.state.currentEmployee}
                                        />
                                    )}



                                </div>


                            </Paper>
                        </div>

                    </div>
                </MuiThemeProvider>
                </div>

        )
    }




    render() {
        return (
            <div className={""}>
                <div>
                    <hr/>
                    <div className={"row"}>
                        <div className={"col col-lg-12"}>
                            <p className={""}>
                                <button
                                    className={"btn btn-dander"}
                                    onClick={() => this.props.clearNewFilter()}>
                                    CLear [New Filter]
                                </button>
                            </p>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col col-lg-12"}>
                            {this.renderData()}
                        </div>
                    </div>

                    {this.renderView()}
                </div>
            </div>
        )
    }
}

let TerminationCodes = [
    {val: "", desc: "--- Select Reason --"},
    {
        val: "13--Absconded",
        desc: "Absconded"
    },
    {
        val: "14--Business Closed",
        desc: "Business Closed"
    },
    {
        val: "7--Constructive Dismissal",
        desc: "Constructive Dismissal"
    },
    {
        val: "5--Contract Expired",
        desc: "Contract Expired"
    },
    {val: "15--Death of Domestic Employer", desc: "Death of Domestic Employer"},
    {val: "2--Deceased", desc: "Deceased"},
    {
        val: "4--Dismissed",
        desc: "Dismissed"
    },
    {
        val: "10--Illness/Medically Boarded",
        desc: "Illness/Medically Boarded"
    },
    {val: "8--Insolvency/Liquidation", desc: "Insolvency/Liquidation"},
    {val: "9--Maternity/Adoption Leave", desc: "Maternity/Adoption Leave"},

    {val: "6--Resigned", desc: "Resigned"},

    {val: "3--Retired", desc: "Retired"},

    {val: "11--Retrenched/Staff Reduction", desc: "Retrenched/Staff Reduction"},

    {val: "12--Transfer to another Branch", desc: "Transfer to another Branch"},

    {val: "16--Voluntary Severance Package", desc: "Voluntary Severance Package"},
];