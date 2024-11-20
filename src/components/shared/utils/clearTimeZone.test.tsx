import clearTimeZone from "./clearTimeZone";

describe("clearTimeZone", () => {
  it("should return a new Date object", () => {
    const inputDate = new Date("2024-11-19T12:00:00Z");
    const result = clearTimeZone(inputDate);

    expect(result instanceof Date).toBe(true);
    expect(result).not.toBe(inputDate); // Ensure a new Date object is returned
  });

  it("should adjust the time to remove timezone offset", () => {
    const inputDate = new Date("2024-11-19T12:00:00Z");
    const timezoneOffset = inputDate.getTimezoneOffset(); // Offset in minutes
    const expectedTime = inputDate.getTime() - timezoneOffset * 60 * 1000;

    const result = clearTimeZone(inputDate);
    expect(result.getTime()).toBe(expectedTime);
  });

  it("should handle dates with positive timezone offsets (e.g., UTC+X)", () => {
    const inputDate = new Date("2024-11-19T12:00:00+0300"); // UTC+3
    const timezoneOffset = inputDate.getTimezoneOffset(); // Offset in minutes
    const expectedTime = inputDate.getTime() - timezoneOffset * 60 * 1000;

    const result = clearTimeZone(inputDate);
    expect(result.getTime()).toBe(expectedTime);
  });

  it("should handle dates with negative timezone offsets (e.g., UTC-X)", () => {
    const inputDate = new Date("2024-11-19T12:00:00-0500"); // UTC-5
    const timezoneOffset = inputDate.getTimezoneOffset(); // Offset in minutes
    const expectedTime = inputDate.getTime() - timezoneOffset * 60 * 1000;

    const result = clearTimeZone(inputDate);
    expect(result.getTime()).toBe(expectedTime);
  });

  it("should handle edge cases with UTC time", () => {
    const inputDate = new Date("2024-11-19T00:00:00Z"); // UTC time
    const timezoneOffset = inputDate.getTimezoneOffset(); // Should be 0 for UTC
    const expectedTime = inputDate.getTime() - timezoneOffset * 60 * 1000;

    const result = clearTimeZone(inputDate);
    expect(result.getTime()).toBe(expectedTime);
  });
});
