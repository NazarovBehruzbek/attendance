import axios from 'axios';
import {getToken} from "../utilits";
import {tokenKey} from "../constants/Constants";

export let host='http://10.10.100.51:8088';

export let httpRequest=(config)=>{
   return axios({
       ...config,
       headesr:{
           Authorization:getToken(tokenKey)?'Bearer '+getToken(tokenKey):''
       }
   })
}