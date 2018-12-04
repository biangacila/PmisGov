import React, {Component} from 'react';
import '../asset/css/login.css';
import '../asset/css/global.css';
import { PostRequestHTTP} from '../api/services';
import{cleanInputUsername} from '../api/others';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {};

        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm(e) {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("Error ! Password doesn't match");
            return
        }

        let endpoint = "/user/register";

        let data = this.state;
        data.username = data.email;
        data.username = cleanInputUsername(this.state.username);
        data.password = this.state.password.trim();

        const hub={
            Data: data
        }

        console.log("submitLogin > ", hub, endpoint);

        await PostRequestHTTP(hub, endpoint, function (data) {
            console.log("submitForm response > ", data);
            if (data.RESULT === "OK") {
                    alert("Your account have been created, you can now login or wait for activation!");
                    window.location.href = "/login"

            } else {
                alert("Account creation Failed:  " + data.RESULT);
            }

        });

    }

    getInputValue = (key) => {
        if (typeof this.state[key] !== "undefined") {
            return this.state[key]
        }
        return "";
    }
    handleInput = (e, key) => {
        const val = e.target.value;
        this.setState({[key]: val});
    }
    renderInputForm = () => {
        let ls = [
            {field: "orgcode", placeholder: "Organization Or Company Name", required: true, type: "text"},
            {field: "email", placeholder: "Email Address", required: true, type: "email"},
            {field: "password", placeholder: "Password", required: true, type: "password"},
            {field: "confirmPassword", placeholder: "Confirm Password", required: true, type: "password"},
            {field: "name", placeholder: "First Name", required: true, type: "text"},
            {field: "surname", placeholder: "Last Name", required: true, type: "text"},
            {field: "fullname", placeholder: "Full Name", required: true, type: "text"},
            {field: "phone", placeholder: "Phone Number", required: true, type: "text"},
            {field: "country", placeholder: "Country e.g ZA for South-Africa", required: true, type: "text"},
            {field: "province", placeholder: "Province", required: true, type: "text"},
            {field: "city", placeholder: "City", required: true, type: "text"},
            {field: "Suburb", placeholder: "Suburb", required: true, type: "text"},
            {field: "address", placeholder: "Address", required: true, type: "text"},
        ];

        return ls.map((row, index) => {
            return (
                <div className="form-group" key={row.field}>
                    <input
                        type={row.type}
                        name={row.field}
                        id={row.field}
                        tabIndex={index}
                        className="form-control"
                        placeholder={row.placeholder}
                        value={this.getInputValue(row.field)}
                        onChange={(e) => this.handleInput(e, row.field)}
                        required={row.required}
                    />

                </div>
            )
        })
    }

    render() {
        return (


            <div className="container registerContentBox">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-login">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="row">
                                        <div className="col-xs-12 myTitleLogin">
                                            Fleet Management System
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <a href="#" className="active" id="login-form-link">New user Registration</a>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12">

                                        <form id="register-form" onSubmit={this.submitForm} role="form">

                                            {this.renderInputForm()}

                                            {/*<div className="form-group">
                                                <input type="text" name="username" id="username" tabIndex="1"
                                                       className="form-control" placeholder="Username" value="" />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" name="email" id="email" tabIndex="1"
                                                       className="form-control" placeholder="Email Address"
                                                       value="" />
                                            </div>
                                            <div className="form-group" >
                                                <input type="password" name="password" id="password" tabIndex="2"
                                                       className="form-control" placeholder="Password" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" name="confirm-password" id="confirm-password"
                                                       tabIndex="2" className="form-control"
                                                       placeholder="Confirm Password" />
                                            </div>*/}
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <input type="submit" name="register-submit"
                                                               id="register-submit" tabIndex="4"
                                                               className="form-control btn btn-register"
                                                               value="Register Now"/>
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

            </div>


        );
    }
}
