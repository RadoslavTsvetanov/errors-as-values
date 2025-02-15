import { Optionable } from "../src/rust-like-pattern/option";
import { CustomError, ICustomError, Result } from "../src/rust-like-pattern/result";
import { logger } from "../src/utils/console";

// Mock Errors type
interface Errors {
  errorThrownFromFunction?: Optionable<CustomError>;
}

describe("Result class", () => {
  test("should create a Result with a value", () => {
    const result = new Result(new Optionable(42), new Optionable<{}>(null)); // <{}> means no errors but do not use it recklessly i am doing it for testing purposes
    logger.log(result.getError().is_none())
    expect(result.getError().is_none()).toBe(true);
  });

  test("should create a Result with an error", () => {
    const error = new Optionable<{ errorError: Optionable<ICustomError> }>({ errorError: new Optionable(new CustomError("An error occurred")) });
    const result = new Result(new Optionable <{}>(null), error);
    expect(result.getError().is_none()).toBe(false);
  });

  test("should throw an error if both value and error are provided", () => {
    const value = new Optionable(42);
    const error = new Optionable<{}>(new CustomError("An error occurred"));
    expect(() => new Result(value, error)).toThrow(
      "Only value or error can be provided, not both"
    );
  });

  test("should throw an error if neither value nor error is provided", () => {
    expect(() => new Result(new Optionable<{}>(null), new Optionable<{}>(null))).toThrow(
      "Either value or error must be provided"
    );
  });

  test("transformFunctionThatThrowsIntoResult should return a Result with value when function succeeds", async () => {
    const successfulFunction = async () => 42;
    const result = await Result.transformFunctionThatThrowsIntoResult(
      successfulFunction
    );
    expect(result.getError().is_none()).toBe(true);
  });

  test("transformFunctionThatThrowsIntoResult should return a Result with an error when function throws", async () => {
    const failingFunction = async () => {
      throw new Error("Failed");
    };
    const result = await Result.transformFunctionThatThrowsIntoResult(
      failingFunction
    );
    expect(result.getError().is_none()).toBe(false);
  });

  test("handlerErrors should execute correct handler when error exists", () => {
    const error = new Optionable({
      errorThrownFromFunction: new Optionable(new CustomError("Test error")),
    });
    const result = new Result(new Optionable<{}>(null), error);

    const handlerMock = jest.fn();

    result.handlerErrors({
      errorThrownFromFunction: handlerMock,
    });

    expect(handlerMock).toHaveBeenCalled();
  });
});
