import React, {Component} from 'react';
import '../asset/css/login.css';
import Button from '@material-ui/core/Button';
import {
    PostRequestHTTP,
    SaveToken,
    GetUserToken
} from "../api/services";
import {cleanInputUsername} from '../api/others';
import moment from "moment";
import Footer from './common/footer';


export default class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {}

        this.submitForm = this.submitForm.bind(this);
    }

    handleInput = (e, key) => {
        const val = e.target.value;
        this.setState({[key]: val});
    }
    getInputValue = (key) => {
        if (typeof this.state[key] !== "undefined") {
            return this.state[key]
        }
        return "";
    }

    async submitForm(e) {
        e.preventDefault();
        const _this =this;
        let endpoint = "/user/login";

        let hub = this.state;
        hub.username = cleanInputUsername(this.state.username);
        hub.password = this.state.password.trim();

        console.log("submitLogin > ", hub, endpoint);

        await PostRequestHTTP(hub, endpoint, function (data) {

            if(data ===null){
                alert("Server connection Error! try again later");
                return
            }

            const res = data.DATA;
            console.log("submitForm response > ", data);
            if (!res.boo) {
                alert("Login Fail please try again! "+res.msg);
                return
            }

            SaveToken(res.token,res.user);
            _this.props.SaveLoginInfo({
                Token: res.token,
                User: res.user,
                Date: moment().format("DD MMM YYYY"),
                Time: moment().format("HH:MM:s")
            });
            window.location.href = "#/home"

        });

    }


    navigatorLink = (myLink) => {
        window.location.href = "/#" + myLink
    }

    render() {
        return (


            <div className="container loginContentBox">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-login">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="row">
                                        <div className="col-xs-12 myTitleLogin" style={{textAlign:"center"}}>
                                            PMIS Record Management <br/> System Portal
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <a href="#" className="active" id="login-form-link">Forgot</a>
                                    </div>
                                    <div className="col-xs-6">
                                        <a onClick={() => this.navigatorLink("register")} id="register-form-link"
                                           className={"clickMe"}>Register</a>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form id="login-form" onSubmit={this.submitForm} role="form"
                                              style={{"display": "block"}}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="username"
                                                    id="username"
                                                    tabIndex="1"
                                                    className="form-control"
                                                    placeholder="Username"
                                                    onChange={(e) => this.handleInput(e, "username")}
                                                    value={this.getInputValue("username")}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    tabIndex="2"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    onChange={(e) => this.handleInput(e, "password")}
                                                    value={this.getInputValue("password")}
                                                />
                                            </div>
                                            <div className="form-group text-center">
                                                <input type="checkbox" tabIndex="3" className="" name="remember"
                                                       id="remember"/>
                                                <label htmlFor="remember"> Remember Me</label>
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <Button type="submit" name="login-submit" id="login-submit"
                                                               tabIndex="4" className="form-control btn btn-login"
                                                               value="Log In"
                                                                variant="contained"
                                                                color="primary"
                                                        >Log In</Button>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{
                    textAlign:"center"
                }}>
                    Powered by <a href="easipath.com"> PMIS</a> | <a href="mail:info@easipath.com">Info@pmis.com</a>
                </p>
                <br/>
            </div>


        );
    }
}
