import ensureCero from "@Utils/ensureCero";
import clearTimeZone from "./clearTimeZone";

/**
 * Devuelve una cadena con el formato dd/mm/yyyy a partir de un objeto Date.
 *
 * @param {Date} timeString - Un objeto Date con la fecha a formatear.
 *
 * @returns {string} Un string con el formato dd/mm/yyyy.
 */
export default function dayFormat(timeString: Date) {
  const time = new Date(clearTimeZone(new Date(timeString)));

  return (
    ensureCero(time.getDate()) +
    "/" +
    ensureCero(time.getMonth() + 1) +
    "/" +
    ensureCero(time.getFullYear())
  );
}
