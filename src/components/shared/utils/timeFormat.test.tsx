import timeFormat from "./timeFormat";
import ensureCero from "@Utils/ensureCero";

jest.mock("@Utils/ensureCero");

describe("timeFormat", () => {
  it("should format a Date object into mm:ss", () => {
    // Mock ensureCero to return the input with leading zeros
    (ensureCero as jest.Mock).mockImplementation((num: number) =>
      num < 10 ? `0${num}` : `${num}`
    );

    const mockDate = new Date("2024-01-01T12:05:07Z"); // 12:05:07 UTC
    const result = timeFormat(mockDate);

    expect(ensureCero).toHaveBeenCalledWith(5); // Minutes
    expect(ensureCero).toHaveBeenCalledWith(7); // Seconds
    expect(result).toBe("05:07");
  });

  it("should handle single-digit minutes and seconds correctly", () => {
    (ensureCero as jest.Mock).mockImplementation((num: number) =>
      num < 10 ? `0${num}` : `${num}`
    );

    const mockDate = new Date("2024-01-01T00:02:03Z"); // 00:02:03 UTC
    const result = timeFormat(mockDate);

    expect(ensureCero).toHaveBeenCalledWith(2); // Minutes
    expect(ensureCero).toHaveBeenCalledWith(3); // Seconds
    expect(result).toBe("02:03");
  });

  it("should handle double-digit minutes and seconds correctly", () => {
    (ensureCero as jest.Mock).mockImplementation((num: number) =>
      num < 10 ? `0${num}` : `${num}`
    );

    const mockDate = new Date("2024-01-01T00:12:34Z"); // 00:12:34 UTC
    const result = timeFormat(mockDate);

    expect(ensureCero).toHaveBeenCalledWith(12); // Minutes
    expect(ensureCero).toHaveBeenCalledWith(34); // Seconds
    expect(result).toBe("12:34");
  });
});
