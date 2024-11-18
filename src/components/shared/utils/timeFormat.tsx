import ensureCero from "@Utils/ensureCero";

/**
 * Devuelve una cadena con el formato mm:ss a partir de un objeto Date.
 *
 * @param {Date} timeString - Un objeto Date con la hora a formatear.
 *
 * @returns {string} Un string con el formato mm:ss.
 */
export default function timeFormat(timeString: Date) {
  const time = new Date(timeString);
  return ensureCero(time.getMinutes()) + ":" + ensureCero(time.getSeconds());
}
