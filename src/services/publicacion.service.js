import { http } from './http'

export function listaPublicaciones(page=1, limit=2) {
    // localhost:8000/api/v1/publicacion?page=1
    return http().get(`/v1/publicacion?page=${page}&limit=${limit}`);    
}

export function guardarPublicacion(datos) {
    return http().post("/v1/publicacion", datos);    
}

export function mostrarPublicacion(id) {
    return http().get(`/v1/publicacion/${id}`);    
}

export function modificarPublicacion(id, datos) {
    return http().put(`/v1/publicacion/${id}`, datos);    
}

export function eliminarPublicacion(id) {
    return http().delete(`/v1/publicacion/${id}`);    
}