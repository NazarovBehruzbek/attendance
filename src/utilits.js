export const setLocalStorage=(key,token)=>{
    localStorage.setItem(key,token);
}
export const  deleteLocalStorage=(key)=>{
    localStorage.removeItem(key);
}
export const getToken=(key)=>{
    return localStorage.getItem(key);
}