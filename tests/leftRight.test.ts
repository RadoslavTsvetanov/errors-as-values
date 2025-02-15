import { describe, expect, it } from "bun:test";
import { LeftRight } from "../src/rust-like-pattern/leftRight";


describe("LeftRight", () => {
  it("should initialize with correct left and right values", async () => {
    const pair = new LeftRight(1, "hello");
    const raw = await pair.getRaw();
    expect(raw).toEqual([1, "hello"]);
  });

  it("should call handleLeft and return 'this'", async () => {
    const pair = new LeftRight(10, "test");
    let calledValue: number | null = null;

    const returned = await pair.handleLeft(async (v) => {
      calledValue = v;
    });

    expect(calledValue).toBe(10);
    expect(returned).toBe(pair);
  });

  it("should call handleRight and return 'this'", async () => {
    const pair = new LeftRight(20, "world");
    let calledValue: string | null = null;

    const returned = await pair.handleRight(async (v) => {
      calledValue = v;
    });

    expect(calledValue).toBe("world");
    expect(returned).toBe(pair);
  });

  it("should call handleLeftWhichReturnsTheResultedValue", async () => {
    const pair = new LeftRight(42, "ignored");
    const result = await pair.handleLeftWhichReturnsTheResultedValue(
      async (v) => v * 2
    );

    expect(result).toBe(84);
  });

  it("should call handleRightWhichReturnsTheResultedValue", async () => {
    const pair = new LeftRight("hello", 99);
    const result = await pair.handleRightWhichReturnsTheResultedValue(
      async (v) => v + 1
    );

    expect(result).toBe(100);
  });

  it("should return raw values correctly", async () => {
    const pair = new LeftRight({ a: 1 }, [1, 2, 3]);
    const raw = await pair.getRaw();

    expect(raw).toEqual([{ a: 1 }, [1, 2, 3]]);
  });
});
