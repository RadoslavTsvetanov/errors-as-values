import { LeftRight } from "./leftRight";
import { IOptionable, Optionable } from "./option";
import { CustomUnpackable, Unpackable } from "./unpackable/unpackable";

interface ICustomError {
  message: string;
}

export class CustomError implements ICustomError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

interface IResult<T, E extends ICustomError> {
  expect(msg: string): void;
}

export class Result<T, E extends ICustomError>
  extends CustomUnpackable<T>
  implements IResult<T, E>
{
  private error: Optionable<E> = new Optionable<E>(null);

  constructor(
    value: Optionable<T> /* T | null */,
    error: Optionable<E> /*E | null*/
  ) {
    super(value.unpack_with_default(null as T), (e) => {
      return error.is_none();
    });
    if (value.is_none() && error.is_none()) {
      throw new Error("Either value or error must be provided");
    }
    if (!value.is_none() && !error.is_none()) {
      throw new Error("Only value or error can be provided not both");
    }

    this.messageWhenYouCntUnpack = error.unpack_with_default((new CustomError("cant unpack (default message for any result )"))).message
  }

  static async transformFunctionThatThrowsIntoResult<ExpectedResponseType>(
    functionThatCouldThrow: () => Promise<ExpectedResponseType>
  ): Promise<Result<ExpectedResponseType, CustomError>> {
    try {
      return new Result<ExpectedResponseType, CustomError>(
        new Optionable<ExpectedResponseType>(await functionThatCouldThrow()),
        new Optionable<CustomError>(null)
      );
    } catch (err) {
      return new Result<ExpectedResponseType, CustomError>(
        new Optionable<ExpectedResponseType>(null),
        new Optionable(new CustomError(err.message))
      );
    }
  }
}

export class ConcreteResult<T> extends Result<T, ICustomError> {}

