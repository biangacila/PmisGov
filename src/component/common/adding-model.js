import React from 'react';
import {PostRequestHTTP, GetUserToken} from "../../api/services";
import {cleanInputUsername} from "../../api/others";
import moment from "moment";
import Button from '@material-ui/core/Button';
import ModalBootsrap from './modal-bootstrap';
import AddingModelFilter from './adding-model-filter';

export default class AddingModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            OrgCode: "",
            List: [],
            openclose: false,
            dataView: {},
            editMode:false,
            EntryData:{},
        }
        this.fetchModelList = this.fetchModelList.bind(this);
        this.SubmitNewEntry = this.SubmitNewEntry.bind(this);
        this.DeleteModel = this.DeleteModel.bind(this);
    }

    componentWillReceiveProps(nextProps){
        let tmp = this.state;
        tmp.EntryData = nextProps.EntryData;
        this.setState(tmp);
    }

    async componentDidMount() {

        this.setState({...this.props});
        console.log("componentDidMount > ",this.props," > ",this.state.EntryData);
        const user = GetUserToken();
        let tmp = this.state;
        tmp.OrgCode = user.OrgCode;

        this.setState(tmp);
        await this.fetchModelList();
    }

    async fetchModelList() {
        const _this = this;
        let endpoint = "/crum";

        let data = this.state;
        const hub = {
            OrgCode: this.state.OrgCode,
            ServiceName: "select",
            TableName: this.props.ModelName,
            Data: data,
            ParamUpdate: [],
            ParamConditions: []
        }


        console.log("fetchModelList > ", hub, endpoint);

        await PostRequestHTTP(hub, endpoint, function (data) {
            const res = data.RESULT;
            console.log("submitForm response > ", data);
            _this.setState({List: res})

        });
    }

    async SubmitNewEntry(e) {
        e.preventDefault();
        const _this = this;
        let endpoint = "/crum";

        const user = GetUserToken();

        let data = this.state.EntryData;
        data.OrgCode = user.OrgCode;



        const hub = {
            ServiceName: "insert",
            TableName: this.props.ModelName,
            Data: data,

        }


        await PostRequestHTTP(hub, endpoint, function (data) {
            const res = data;
            alert("Sucess! Entry add");
            _this.setState({EntryData:{}});
            _this.fetchModelList();

        });
    }

    async DeleteModel(inObject) {
        const text =window.confirm("Are you sure that you want to delete this ?");
        if(!text){
            return;
        }
        let paramCondition = [];
        for (let i in this.props.ListDeleteKey) {
            const row =this.props.ListDeleteKey[i];
            const val = inObject[row.field];
            paramCondition.push({
                Key: row.field,
                Val: val,
                DataType: row.type
            });
        }

        const _this = this;
        let endpoint = "/crum";

        let data = this.state;
        const hub = {
            OrgCode: this.state.OrgCode,
            ServiceName: "delete",
            TableName: this.props.ModelName,
            Data: data,
            ParamUpdate: [],
            ParamConditions: paramCondition
        }


        await PostRequestHTTP(hub, endpoint, function (data) {
            const res = data.RESULT;
            console.log("DeleteModel response > ", data);
            _this.fetchModelList();

        });

    }

    getModelName = () => {
        if (typeof this.state.ModelName === "undefined") {
            return "..."
        }

        return this.state.ModelName;
    }
    handleInput = (e, key) => {
        let tmp = this.state;
        tmp.EntryData[key] = e.target.value;
        this.setState(tmp);
        //console.log("HandleInput > ",key," > ",e.target.value);
    }
    getValue = (key) => {
        if (typeof this.state.EntryData[key] === "undefined") {
            return ""
        }
        return this.state.EntryData[key];
    }
    renderFormInput = () => {

        if (typeof this.state.MyModel === "undefined") {
            return (<div/>)
        }
        return (
            <form onSubmit={this.SubmitNewEntry}>
                {this.state.MyModel.map((row, index) => {

                    if(typeof row.filter !=="undefined"){
                        if(row.filter){
                            return(<AddingModelFilter row={row} handleInput={this.handleInput} getValue={this.getValue} field={row.field} />)
                        }
                    }


                    return (
                        <div className="form-group" key={index}>
                            <label>{row.desc}</label>
                            <input
                                type={row.type}
                                className="form-control"
                                id={row.field}
                                aria-describedby={row.field + "Help"}
                                placeholder={row.placeholder}
                                required={row.required}
                                onChange={(e) => this.handleInput(e, row.field)}
                                value={this.getValue(row.field)}
                            />

                        </div>
                    )
                })}
                <Button
                    variant="contained"
                    color="secondary"
                    className="pull-right"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        )
    }
    viewSelectedModel = (row) => {
        delete row.status;
        delete row.date;
        delete row.time;
        delete row.orgdatetime;
        delete row.id;
        this.setState({openclose: true, dataView: row});
    }
    editSelectedModel=(row)=>{

        this.setState({editMode: true, EntryData: row});
    }
    closeModal = () => {
        this.setState({openclose: false, dataView: {}});
    }
    open = () => {
        this.setState({openclose: true, dataView: {}});
    }
    renderList = () => {


        if (this.state.List.length === 0) {
            return (
                <p>Empty List ...</p>
            )
        }

        console.log("F! --> ", this.state.List.length, " > ", this.props.ListDisplayKey.length);

        return (
            <table className={"table"} style={styles.tableList}>
                <thead>

                <tr>
                    {this.props.ListDisplayKey.map((item, index) => {
                        console.log("F!!! --> ", item);
                        return (
                            <th key={index + "#" + item}>{item}</th>
                        )
                    })}
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {this.state.List.map((row, index) => {

                    return (
                        <tr key={index}>
                            {this.props.ListDisplayKey.map((item, index) => {
                                const myItem = item.toLocaleLowerCase();
                                return (
                                    <td key={index + "#" + item}>{row[myItem]}</td>
                                )
                            })}
                            <td>
                                <a onClick={() => {
                                    alert("List view");
                                }} className="glyphicon glyphicon-list clickMe"
                                   style={{fontSize: 24, color: "blue", fontWeight: "bold"}}
                                   onClick={() => this.viewSelectedModel(row)}
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <a onClick={() => {
                                    alert("List view");
                                }} className="glyphicon glyphicon-pencil clickMe"
                                   style={{fontSize: 24, color: "black", fontWeight: "bold"}}
                                   onClick={() => this.editSelectedModel(row)}
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a onClick={() => {
                                    alert("List view");
                                }} className="glyphicon glyphicon-minus-sign clickMe"
                                   style={{fontSize: 24, color: "red", fontWeight: "bold"}}
                                   onClick={()=>this.DeleteModel(row)}
                                />

                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div className="container">

                <p>
                    {/*JSON.stringify(this.state) */}
                </p>
                <div className="row">
                    <div className="col col-lg-6">
                        <p style={styles.newEntryTile}>Available {this.getModelName()} List</p>
                        <br/>
                        {this.renderList()}
                    </div>
                    <div className="col col-lg-4">
                        <p style={styles.newEntryTile}>New {this.getModelName()}</p>
                        {this.renderFormInput()}

                    </div>
                </div>

                <ModalBootsrap
                    openclose={this.state.openclose}
                    close={this.closeModal}
                    open={this.open}
                    data={this.state.dataView}
                />


            </div>
        )
    }
}

const styles = {
    newEntryTile: {
        color: "white",
        fontSize: 18,
        fontweight: "bold",
        textAlign: "center",
        backgroundColor: "gray"
    },
    tableList: {}
}