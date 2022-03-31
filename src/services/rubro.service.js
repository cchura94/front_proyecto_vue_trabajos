import { http } from './http'

export function listaRubros() {
    return http().get("/v1/rubro");    
}

export function guardarRubro(datos) {
    return http().post("/v1/rubro", datos);    
}

export function mostrarRubro(id) {
    return http().get("/v1/rubro/"+id);    
}

export function modificarRubro(id, datos) {
    return http().put("/v1/rubro/"+id, datos);    
}

export function eliminarRubro(id) {
    return http().delete("/v1/rubro/"+id);    
}