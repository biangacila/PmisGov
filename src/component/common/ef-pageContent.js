import React, {Component} from 'react';

import "../../asset/css/global.css"
import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps, mapStateToProps} from "./redux-dispatch-to-props";


 class PageContentWallpaper extends Component {
    constructor(props){
        super(props);
    }
    navigatorLink = (myLink) => {
        window.location.href = "/#" + myLink
    }
    getPageModule =()=>{

        if(this.props.PageModule !==null){
            return (<a className={"clickMe"} onClick={()=>this.navigatorLink(this.props.menus.PageModule)}> {this.props.menus.PageModule}</a>)
        }
        return "---"
    }
    getPageMenu =()=>{
        if( this.props.menus.PageMenu !==null){
            return this.props.menus.PageMenu;
        }
        return "---"
    }
    render() {
        return (
            <div className="container pageContentBox">
                <div className={"pageInfoSelected"}>
                    <span className="myTitleLogin">{this.getPageModule()}</span>
                    <span>&nbsp;</span>
                    <span> | </span>
                    <span>&nbsp;</span>
                    <span>{this.getPageMenu()}</span>
                    <hr/>
                </div>


                {this.props.children}

                <br/>


            </div>

        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PageContentWallpaper)


/*

https://api.easipath.com/bidoffice/get/total/opportunities
    http://41.185.16.250:14001/bidoffice/get/total/opportunities*/
