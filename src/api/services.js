import React from 'react';
import moment from 'moment';
import eConfig from '../config';


const serverHTTP = eConfig.serverBackend;
const serverWS = eConfig.serverWS;
const TOKEN_KEY="token";
const TOKEN_USER ="@fleet-user";


const ConvertDateFormatFromStdToSA=(dateIn) =>{
    let mydate = moment(dateIn, "YYYY-MM-DD").format("DD MMM YYYY");
    return mydate;
};
let SaveToken=(token,user)=>{
    localStorage.setItem(TOKEN_KEY,token);
    localStorage.setItem(TOKEN_USER,JSON.stringify(user))
}
let RemoveToken=()=>{
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_USER)
}
const GetUserToken=()=>{
    return JSON.parse(localStorage.getItem(TOKEN_USER))
}
let CheckLogin =async (props,callback) => {

    let token = await _retrieveData("token");
    console.log("CheckLogin > ", token);

    if (token === null) {
        callback(false, -100, "Authentication failed, Please login");
        return;
    }
    if (token === undefined) {
        callback(false, -100, "Authentication failed, Please login",{});
        return;
    }
    if (token === "undefined") {
        callback(false, -100, "Authentication failed, Please login",{});
        return;
    }

    const hub = {token: token};
    const endpoint = "/user/token-info";

    await PostRequestHTTP(hub, endpoint, function (data, err) {

        if (err !== null) {
            callback(false, -200, "Server unavailable, Please try again late",{});
            return;
        }
        const rs = data.DATA;
        if (rs.boo) {
            //todo do nothing
            console.log("Response code is 200");
            callback(true, 200, "OK",rs.user);
            return
        }
        console.log("CheckLogin feedback err > ",err," > " ,rs.boo);
        //removeFromStorage("token")
        callback(false, -100, "Authentication failed, Please login",{});

    });
}
let PostRequestHTTP = async (hub, endpoint, callback) => {
    let url = serverHTTP + endpoint;
    //console.log("PostRequestHTTP: ",url," > ",hub);
   await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hub)
    })
        .then((response) => response.json())
        .then((response) => {
            //console.log("2 PostRequestHTTP: ",url," > ",response);
            const status = response.status;
            callback(response, null, status);
        }).catch((e) => {
        callback(null, e, null);
    });
}
let PostRequestWS = async (hub, endpoint, callback) => {
    let url = serverWS + endpoint;
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hub)
    })
        .then((response) => response.json())
        .then((response) => {
            const status = response.status;
            callback(response, null, status);
        }).catch((e) => {
        callback(null, e, null);
    });
}
let _redirectComponent = (_this, name, msg) => {
    let tmp = _this.state;
    tmp.currContainer = name;
    _this.setState(tmp);
    if (msg !== "") {
        alert(msg)
    }
}
let _retrieveData = async (key) => {
    const myKey = '@TRANSY:' + key;
    try {
        const value = await  localStorage.getItem(myKey);
        if (value !== null) {
            return value;
        }
    } catch (error) {

        // Error retrieving data
        return ""
    }
}
let SaveToStorage = async (key, val) => {
    try {
        await localStorage.setItem('@TRANSY:' + key, val);
    } catch (error) {
        // Error saving data
        console.log("_storeData > ", key, val);
    }
}
let _removeData = async (key) => {
    try {
        await localStorage.removeItem('@TRANSY:' + key);
    } catch (error) {
        // Error saving data
        console.log("_removeData error > ", key);
    }
}
let  getLoginUser = async(_this)=> {
    const u = await _retrieveData("user");
    console.log("---> getLoginUser user > ", u );
    if(u ===undefined){
        _this.setState({
            User:null,
            company:"",
            email:  user.Email,
            role:user.Role,
        });
        return
    }
    const user = JSON.parse(u);

    let tmp = this.state;
    tmp.User = user;
    tmp.company = user.Company;
    tmp.email = user.Email;
    tmp.role = user.Role;
    _this.setState({
        User:user,
        company:user.Company,
        email:  user.Email,
        role:user.Role,
    });

    console.log("---> LoginUser > ", _this.state.User.Email," > ", tmp.role );
}


export {
    SaveToken,
    RemoveToken,
    GetUserToken,
    CheckLogin,
    PostRequestHTTP,
    PostRequestWS,
     _retrieveData,
    SaveToStorage,
    _removeData,
    getLoginUser,
    ConvertDateFormatFromStdToSA
};

