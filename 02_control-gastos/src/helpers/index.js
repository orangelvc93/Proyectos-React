/* #9.5 Creamos este nuevo archivo donde guardaremos todas las funciones básicas y mas comunes

Creamos la función para generar ID
*/

export const generaId = () => {
    const random = Math.random().toString(36)
    const fecha = Date.now().toString(36)
    return random + fecha
}


/* #10.9 Creamos un helper para formatear la fecha */
export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    }

    return fechaNueva.toLocaleDateString("es-ES", opciones)
}