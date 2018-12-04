import logoImg from "../../asset/img/logo.png";
import {Button, ButtonToolbar} from "react-bootstrap";
import React from "react";
//https://fontawesome.bootstrapcheatsheets.com/#
import ButtonUI from '@material-ui/core/Button';
import {RemoveToken} from "../../api/services";
import moment from "moment";

import connect from "react-redux/es/connect/connect";
import {mapDispatchToProps, mapStateToProps} from "./redux-dispatch-to-props";

const PageHeading = (props) => {

    const getUserName = () => {


        if ( props.login.User !== null) {
            return props.login.User.Name;
        }

        return "Guest"
    }

    const loggedOut = () => {
        RemoveToken();
        props.SaveLoginInfo({
            Token: null,
            User: null,
            Date: null,
            Time: null
        });
        window.location.href = "#/login"
    }


    const menusButtons = () => {
        const stylesButton = {
            color: "white",
            fontWeight: "bold",
            fontSize: 14,
        }
        const ls = [
            {menu: "category", display: "V. Category"},
            {menu: "vehicle", display: "Vehicle"},
            {menu: "driver", display: "Driver"},
            {menu: "task", display: "Task"},
        ];

        /*return ls.map((row, index) => {
            return (
                <ButtonUI key={index + "#" + row.menus} variant="outlined" color="white" style={stylesButton}>
                    {row.display}
                </ButtonUI>
            );
        })*/

        console.log("*********************>>>> ",props.menus.PageModule,props.navigations[props.menus.PageModule])
        return props.navigations[props.menus.PageModule].data.map((row, index) => {

            if (props.menus.PageMenu!== row.menu) {
                return (
                    <a
                        key={index + "#" + row.menu}
                        className="myLinkHeader pageHeaderMenuButton"
                        onClick={()=>props.SetNavigateMenu(row.menu)}
                        onClick={()=>{
                            props.SetNavigateMenu(row.menu);
                            window.location.href ="#/"+row.menu
                        }}
                    >
                        {row.display.toLocaleUpperCase()}
                    </a>
                )
            }
            return (
                <ButtonUI
                    className={"pageHeaderMenuButton"}
                    key={index + "#" + row.menu}
                    variant="outlined"
                    color="white"
                    style={stylesButton}
                    onClick={()=>{
                        props.SetNavigateMenu(row.menu);
                        window.location.href ="#/"+row.menu
                    }}
                >
                    {row.display.toLocaleUpperCase()}
                </ButtonUI>
            );
        })

    }

    const moduleButtons = () => {
        const stylesButton = {
            color: "white",
            fontWeight: "bold",
            fontSize: 14,
        }

        let ls=[];

        for(let i in props.navigations){
            ls.push({
                menu:i,
                display:props.navigations[i].desc
            })
        }



        return ls.map((row, index) => {

            if (props.menus.PageModule !== row.menu) {
                return (
                    <a
                        key={index + "#" + row.menu}
                        className="myLinkHeader "
                        onClick={()=>props.SetNavigateModule(row.menu)}
                    >
                        {row.display}
                    </a>
                )
            }
            return (
                <ButtonUI
                    key={index + "#" + row.menu}
                    variant="outlined"
                    color="white"
                    style={stylesButton}
                    onClick={()=>props.SetNavigateModule(row.menu)}
                >
                    {row.display}
                </ButtonUI>
            );
        })
    }

    return (
        <div className={"pageHeader"}>
            <div className={"pageHeaderModule"}>
                <img className={"logoCompany"} src={logoImg}/>
                <span className={"companyTitle"}>PMIS </span>
                <small>Record Management System Portal</small>
                <div className={"pageHeaderModuleLinkBox"}>
                    <small>
                        <i className={"fa fa-user"}></i>&nbsp;
                        {getUserName()}
                        <a className={"headerLogout clickMe"} onClick={() => {
                            loggedOut()
                        }}>Logout</a>
                    </small>
                    &nbsp;&nbsp;&nbsp;
                    {moduleButtons()}

                </div>
            </div>
            <div className={"headerLine"}>&nbsp;</div>
            <div className={"pageHeaderMenu"}>
                <ButtonToolbar>
                    <a className={"headerMenuSelectSecondBar"}>Menu: </a>
                    {menusButtons()}
                </ButtonToolbar>
            </div>
        </div>
    )
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PageHeading)

//export default PageHeading;

/*

#let stop our cassandra service
kill -9 $(sudo lsof -t -i:7199)
sh /home/cassandra/bin/cassandra -R



docker start $(docker ps -a -q --filter "status=exited")
 */