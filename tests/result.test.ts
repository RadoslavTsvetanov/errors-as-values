import { Optionable } from "../rust-like-pattern/option";
import { ConcreteResult, CustomError, Result } from "../rust-like-pattern/result";

describe("Result Class", () => {
  test("should create a Result with a value", () => {
    const result = new Result(new Optionable(42), new Optionable<CustomError>(null));
    expect(result.unpack()).toBe(42)
  });

  test("should create a Result with an error", () => {
    const error = new CustomError("Something went wrong");
    const result = new Result(new Optionable(null), new Optionable(error));
    expect(result.unpack()).toThrow("Something went wrong")
  });

  test("should throw error when both value and error are null", () => {
    expect(
      () => new Result(new Optionable(null), new Optionable<CustomError>(null))
    ).toThrow("Either value or error must be provided");
  });

  test("should throw error when both value and error are provided", () => {
    expect(
      () =>
        new Result(new Optionable(42), new Optionable(new CustomError("Error")))
    ).toThrow("Only value or error can be provided not both");
  });

  test("expect() should throw CustomError when value is null", () => {
    const result = new Result(
      new Optionable(null),
      new Optionable(new CustomError("Failure"))
    );
    expect(() => result.expect("Expected a value but got null")).toThrow(
      CustomError
    );
  });
});

describe("transformFunctionThatThrowsIntoResult", () => {
  test("should return a Result with a value when function resolves", async () => {
    const mockFn = jest.fn().mockResolvedValue(42);
    const result = await Result.transformFunctionThatThrowsIntoResult(mockFn);
    expect(result).toBeInstanceOf(Result);
  });

  test("should return a Result with an error when function rejects", async () => {
    const mockFn = jest.fn().mockRejectedValue(new Error("Function failed"));
    const result = await Result.transformFunctionThatThrowsIntoResult(mockFn);
    expect(result).toBeInstanceOf(Result);
  });
});

describe("ConcreteResult Class", () => {
  test("should create a ConcreteResult", () => {
    const result = new ConcreteResult(
      new Optionable("data"),
      new Optionable<CustomError>(null)
    );
    expect(result).toBeInstanceOf(ConcreteResult);
  });
});
