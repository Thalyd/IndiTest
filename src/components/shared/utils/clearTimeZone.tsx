/**
 * Borra la diferencia horaria de un objeto Date. Esto es útil cuando necesitas
 * comparar una fecha con una fecha conocida en una zona horaria específica.
 *
 * @param {Date} date - Un objeto Date del cual borrar la diferencia horaria.
 *
 * @returns {Date} Un nuevo objeto Date con la diferencia horaria borrada.
 */
export default function clearTimeZone(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}
