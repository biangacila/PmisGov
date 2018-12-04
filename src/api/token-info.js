/**
 * Created by dev1 on 2017/01/17.
 */
import { _retrieveData} from './auth';
import  jwtDecode from 'jwt-decode';

let TokenInfo=async ()=>{
    const token = await _retrieveData("token");
    console.log("jwt_decode in ******>>> ", token);
    var decoded = jwtDecode(token, {header: true});
    console.log("jwt_decode ******>>> ", decoded);
    if (decoded.typ === 'JWT' && decoded.alg === 'HS256') {
        // your token is created using the standard format
    } else {
        return null;
    }
    return decoded;
}

let CheckTokenValidation= async() =>{
    const token =_retrieveData("token");
    const decoded = jwtDecode(token, {header: true});
    if (decoded.typ === 'JWT' && decoded.alg === 'HS256') {
        // your token is created using the standard format
    } else {
        return false;
    }
    return true;
}

export {TokenInfo,CheckTokenValidation}