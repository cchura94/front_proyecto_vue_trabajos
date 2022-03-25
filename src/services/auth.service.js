import { http } from './http'

export function login(datos) {
    return http().post('/v1/auth/login', datos);
}

export function registroUsuario(datos) {
    return http().post('/v1/auth/registro', datos);    
}