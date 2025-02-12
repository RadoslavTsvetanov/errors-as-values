import { logger } from './../utils/console';
import { LeftRight } from "../rust-like-pattern/leftRight";
import { Optionable } from "../rust-like-pattern/option";

describe("Optionable", () => {
  test("unpack should return the value if it's not null or undefined", () => {
    const opt = new Optionable(42);
    expect(opt.unpack()).toBe(42);
  });

  test("unpack should throw an error if the value is null", () => {
    const opt = new Optionable(null);
    expect(() => opt.unpack()).toThrow("Option is None");
  });

  test("unpack should throw an error if the value is undefined", () => {
    const opt = new Optionable(undefined);
    expect(() => opt.unpack()).toThrow("Option is None");
  });

  test("unpack_with_default should return the default value if Optionable is None", () => {
    const opt = new Optionable<number>(null);
    expect(opt.unpack_with_default(100)).toBe(100);
  });

  test("unpack_with_default should return the actual value if it exists", () => {
    const opt = new Optionable(50);
    expect(opt.unpack_with_default(100)).toBe(50);
  });

  test("is_none should return true if value is null", () => {
    const opt = new Optionable(null);
    expect(opt.is_none()).toBe(true);
  });

  test("is_none should return true if value is undefined", () => {
    const opt = new Optionable(undefined);
    expect(opt.is_none()).toBe(true);
  });

  test("is_none should return false if value is defined", () => {
    const opt = new Optionable(10);
    expect(opt.is_none()).toBe(false);
  });

  test("unpack_or_with_diverging_type_from_the_original should return Left when value is defined", async() => {
    const opt = new Optionable(42);
    const result = opt.unpack_or_with_diverging_type_from_the_original(
      () => "fallback"
    );
    expect(await result.handleLeftWhichReturnsTheResultedValue(async(v) => v)).toBe(42);
    expect(await result.handleRightWhichReturnsTheResultedValue(async(v) => v)).toBe(null);
  });

  test("unpack_or_with_diverging_type_from_the_original should return Right when value is null",async () => {
    const opt = new Optionable<number>(null);
    const result = opt.unpack_or_with_diverging_type_from_the_original(
      () => "fallback"
    );
    expect(await result.handleLeftWhichReturnsTheResultedValue(async(v) => v)).toBe(null);
    expect(await result.handleRightWhichReturnsTheResultedValue(async(v) => v)).toBe("fallback");
  });

  test("unpack_or should return stored value if present", () => {
    const opt = new Optionable(10);
    expect(opt.unpack_or(() => 99)).toBe(10);
  });

  test("unpack_or should return default handler value if Optionable is None", () => {
    const opt = new Optionable<number>(null);
    expect(opt.unpack_or(() => 99)).toBe(99);
  });
});
