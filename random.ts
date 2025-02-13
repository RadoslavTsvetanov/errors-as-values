import { Optionable } from "./rust-like-pattern/option";
import { CustomError, Result } from "./rust-like-pattern/result";

const error = new CustomError("Something went wrong");
const result = new Result(new Optionable(null), new Optionable(error));
console.log(result.unpack())




function fail(i : string): Result<string, CustomError>{
    if (i.startsWith("a")) {
        return new Result(new Optionable<string>(null), new Optionable(new CustomError(" cant start with a ")))
    }

    return new Result(new Optionable(i), new Optionable<CustomError>(null))
}
