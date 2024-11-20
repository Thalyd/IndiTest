/**
 * Ajusta un objeto Date para eliminar su diferencia horaria, convirtiéndolo efectivamente a UTC.
 *
 * @param {Date} date - El objeto Date del cual se borrará la zona horaria.
 * @returns {Date} Un nuevo objeto Date ajustado a UTC, o la fecha original si la diferencia horaria es cero.
 */
export default function clearTimeZone(date: Date) {
  const timezoneOffset = date.getTimezoneOffset();

  if (timezoneOffset === 0) {
    return date;
  }
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
}
