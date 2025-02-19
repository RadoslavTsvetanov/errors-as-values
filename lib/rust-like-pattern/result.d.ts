import { Optionable } from "./option";
import { CustomUnpackable } from "./unpackable/unpackable";
export interface ICustomError {
    message: string;
}
type Errors = Record<string, Optionable<ICustomError>>;
export declare class CustomError implements ICustomError {
    message: string;
    constructor(message: string);
}
interface IResult<T, E extends Errors> {
    expect(msg: string): void;
}
export declare class Result<T, E extends Errors> extends CustomUnpackable<T> implements IResult<T, E> {
    private error;
    protected safeMode: boolean;
    constructor(value: Optionable<T>, error: Optionable<E>);
    getError(): Optionable<E>;
    static transformFunctionThatThrowsIntoResult<ExpectedResponseType>(functionThatCouldThrow: () => Promise<ExpectedResponseType>): Promise<Result<ExpectedResponseType, {
        errorThrownFromTheFunction: Optionable<ICustomError>;
    }>>;
    handlerErrors(handlers: Record<keyof E, (e: ICustomError) => void>): void;
}
export declare class ConcreteResult<T> extends Result<T, Errors> {
}
export {};
//# sourceMappingURL=result.d.ts.map