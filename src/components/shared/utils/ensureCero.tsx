/**
 * Agrega un cero a la izquierda de un n mero menor a 10.
 *
 * @param {number} value - El valor a asegurar.
 * @returns {string | number} El valor con un cero a la izquierda si es menor a 10, de lo contrario el valor original.
 */
export default function ensureCero(value) {
  return value < 10 ? "0" + value : value;
}
