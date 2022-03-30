import { http } from './http'

export function listaCategorias() {
    return http().get("/v1/categoria");    
}

export function guardarCategoria(datos) {
    return http().post("/v1/categoria", datos);    
}

export function mostrarCategoria(id) {
    return http().get("/v1/categoria/"+id);    
}

export function modificarCategoria(id, datos) {
    return http().put("/v1/categoria/"+id, datos);    
}

export function eliminarCategoria(id) {
    return http().delete("/v1/categoria/"+id);    
}