import axios from "axios"

const urlbase = "https://apptrabajos.herokuapp.com/api";
// const urlbase = "http://127.0.0.1:8000/api";

export function http(){
    const token = localStorage.getItem("token");
    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        timeout: 15000 // 5 segundos
    })

    //interceptor.defaults.timeout = 15000

    // verificar error 401
    interceptor.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            localStorage.removeItem("token");
            // alert(error.response.status)
            /*if(error.response.status === 401){

            }*/

            window.location.href='/ingresar'
        }
    )
    

    return interceptor;
}
