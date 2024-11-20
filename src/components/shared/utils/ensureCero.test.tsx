import ensureCero from "./ensureCero";

describe("ensureCero", () => {
  it("should add a leading zero to numbers less than 10", () => {
    expect(ensureCero(0)).toBe("00");
    expect(ensureCero(5)).toBe("05");
    expect(ensureCero(9)).toBe("09");
  });

  it("should return numbers 10 or greater without modification", () => {
    expect(ensureCero(10)).toBe(10);
    expect(ensureCero(15)).toBe(15);
    expect(ensureCero(123)).toBe(123);
  });

  it("should handle edge cases", () => {
    expect(ensureCero(-1)).toBe("0-1"); // Negative numbers should also have a leading zero
    expect(ensureCero(10.5)).toBe(10.5); // Floats greater than 10 should remain unchanged
  });

  it("should handle invalid input gracefully", () => {
    // This depends on the intended behavior. If invalid input should throw an error, adapt this test.
    expect(ensureCero("5")).toBe("05"); // Strings are treated as numbers where possible
    expect(ensureCero(null)).toBe("00"); // Null coerces to a string
    expect(ensureCero(undefined)).toBe("00"); // Undefined coerces to a string
  });
});
