export interface UsuarioJWT {
    id: number;
    username: string;
    email: string;
    password: string;
    ip_creacion: string | null;
    estado_auditoria?: string;
    fecha_creacion?: Date| null;
    fecha_actualizacion?:  Date| null;
}