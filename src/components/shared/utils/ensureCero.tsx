export default function ensureCero(value) {
  return value < 10 ? "0" + value : value;
}
