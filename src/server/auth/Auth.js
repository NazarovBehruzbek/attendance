import {httpRequest} from "../host";

export let signin=(object)=>{
    let config={
        url:`/api/authenticate`,
        method:'post',
        data:object
    }
    return httpRequest(config);
}