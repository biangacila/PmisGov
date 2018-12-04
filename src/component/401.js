import React, {Component} from 'react';
import '../asset/css/login.css';

export default class PageNotFindComponent extends Component {

    render() {
        return (


            <div className="container loginContentBox">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-login">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="row">
                                        <div className="col-xs-12 myTitleLogin">
                                            401 page not found!
                                        </div>
                                    </div>
                                    <div className="col-xs-12">
                                        <p>We can't find what you are looking for, try different module and menu</p>
                                    </div>

                                </div>
                                <hr/>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        );
    }
}
