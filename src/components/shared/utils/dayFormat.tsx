import ensureCero from "@Utils/ensureCero";

export default function dayFormat(timeString: Date) {
  const time = new Date(timeString);
  return (
    ensureCero(time.getDay()) +
    "/" +
    ensureCero(time.getMonth() + 1) +
    "/" +
    ensureCero(time.getFullYear())
  );
}
