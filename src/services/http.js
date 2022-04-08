import axios from "axios"

const urlbase = "https://apptrabajos.herokuapp.com/api";
// const urlbase = "http://127.0.0.1:8000/api";

export function http(){
    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer '+ token
        }
    })
    

    return interceptor;
}
