import { http } from './http'

export function listaEmpresas() {
    return http().get("/v1/empresa");    
}

export function guardarEmpresa(datos) {
    return http().post("/v1/empresa", datos);    
}

export function mostrarEmpresa(id) {
    return http().get("/v1/empresa/"+id);    
}

export function modificarEmpresa(id, datos) {
    return http().put("/v1/empresa/"+id, datos);    
}

export function eliminarEmpresa(id) {
    return http().delete("/v1/empresa/"+id);    
}