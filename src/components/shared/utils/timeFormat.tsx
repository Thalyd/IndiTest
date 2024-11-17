import ensureCero from "@Utils/ensureCero";

export default function timeFormat(timeString: Date) {
  const time = new Date(timeString);
  return ensureCero(time.getMinutes()) + ":" + ensureCero(time.getSeconds());
}
