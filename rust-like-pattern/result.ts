import { LeftRight } from "./leftRight";
import { IOptionable, Optionable } from "./option";
import { CustomUnpackable, Unpackable } from "./unpackable/unpackable";

export interface ICustomError {
  message: string;
}

type Errors = Record<string, Optionable<ICustomError>>

export class CustomError implements ICustomError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

interface IResult<T, E extends Errors> {
  expect(msg: string): void;
}



export class Result<T, E extends Errors>
  extends CustomUnpackable<T>
  implements IResult<T, E>
{
  private error: Optionable<E>;

  constructor(value: Optionable<T>, error: Optionable<E>) {
    super(value.unpack_with_default(null as T), (e) => error.is_none());
    this.error = error;
    if (value.is_none() && !error) {
      throw new Error("Either value or error must be provided");
    }
    if (!value.is_none() && error) {
      throw new Error("Only value or error can be provided, not both");
    }


      error.ifCanBeUnpacked((definedError) => {
      Object.entries(definedError).forEach(([key, value]) => {
        console.log(key, value);
        value.ifCanBeUnpacked((v) => {
          value.ifCanBeUnpacked(
            (v) => this.messageWhenYouCntUnpack = v.message
          );
        })
      });

      })
  }
  
  public getError(): Optionable<E>{
    return this.error;  
  }

  static async transformFunctionThatThrowsIntoResult<ExpectedResponseType>(
    functionThatCouldThrow: () => Promise<ExpectedResponseType>
  ): Promise<Result<ExpectedResponseType, Errors>> {
    try {
      return new Result(
        new Optionable<ExpectedResponseType>(await functionThatCouldThrow()),
        (null)
      );
    } catch (err) {
      return new Result(
        new Optionable<ExpectedResponseType>(null),
        (
          { errorThrownFromFunction: new Optionable(new CustomError(err.message)) }
        )) 
    }
  }

handlerErrors(handlers: Record<keyof E, (e: ICustomError) => void>): void {
  this.error.ifCanBeUnpacked((v) => {
    Object.keys(v).forEach((key) => {
      const handler = handlers[key as keyof E]; // Ensure correct typing
      if (handler) {
        v[key].ifCanBeUnpacked((error) => handler(error))
      }
    });
  });
}

}

export class ConcreteResult<T> extends Result<T, Errors> {}









// ---------------------
