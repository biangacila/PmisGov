
import eConfig from '../config.json';
import {PostRequestHTTP} from './services';

const serverMainPMIS= eConfig.serverPmisMain;
const serverGovPMIS= eConfig.serverBackend;
const serverRecordPMIS= eConfig.serverPmisRecords;

let PostRecordPMIS = async (hub, endpoint, callback) => {
    let url = serverRecordPMIS + endpoint;

    console.log("POST-Transport response Url > ",url,hub);
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
            console.log("POST-Transport response Data > ",response);
            callback(response, null, status);
        }).catch((e) => {
        console.log("POST-Transport response Error > ",e);
        callback(null, e, null);
    });
}



let PostGovPMIS = async (hub, endpoint, callback) => {
    let url = serverGovPMIS + endpoint;

    console.log("POST-Transport response Url > ",url,hub);
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
            console.log("POST-Transport response Data > ",response);
            callback(response, null, status);
        }).catch((e) => {
        console.log("POST-Transport response Error > ",e);
        callback(null, e, null);
    });
}

let PostMainPMIS = async (hub, endpoint, callback) => {
    let url = serverMainPMIS + endpoint;

    console.log("POST-Transport response Url > ",url,hub);
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
            console.log("POST-Transport response Data > ",response);
            callback(response, null, status);
        }).catch((e) => {
         console.log("POST-Transport response Error > ",e);
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
    try {
        const value = await localStorage.getItem('@PIMS:' + key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        // Error retrieving data
        return ""
    }
}

let _storeData = async (key, val) => {
    try {
        await localStorage.setItem('@PIMS:' + key, val);
    } catch (error) {
        // Error saving data
        console.log("_storeData > ", key, val);
    }
}

let _removeData = async (key) => {
    try {
        await localStorage.removeItem('@PIMS:' + key);
    } catch (error) {
        // Error saving data
        console.log("_removeData error > ", key);
    }
}


export { PostMainPMIS,PostGovPMIS,PostRecordPMIS, _retrieveData, _storeData, _removeData};
