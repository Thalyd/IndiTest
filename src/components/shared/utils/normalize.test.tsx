import { normalize } from "./normalize";

describe("normalize", () => {
  it("should convert uppercase text to lowercase", () => {
    const input = "HELLO WORLD";
    const result = normalize(input);
    expect(result).toBe("hello world");
  });

  it("should leave lowercase text unchanged", () => {
    const input = "hello world";
    const result = normalize(input);
    expect(result).toBe("hello world");
  });

  it("should handle mixed-case text", () => {
    const input = "HeLLo WoRLd";
    const result = normalize(input);
    expect(result).toBe("hello world");
  });

  it("should handle text with numbers and symbols", () => {
    const input = "HeLLo123! WoRLd?";
    const result = normalize(input);
    expect(result).toBe("hello123! world?");
  });

  it("should handle an empty string", () => {
    const input = "";
    const result = normalize(input);
    expect(result).toBe("");
  });

  it("should handle whitespace only strings", () => {
    const input = "   ";
    const result = normalize(input);
    expect(result).toBe("   ");
  });
});
