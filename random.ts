import { Optionable } from "./rust-like-pattern/option";
import { CustomError, Result } from "./rust-like-pattern/result";

const error = new CustomError("Something went wrong");
const result = new Result(new Optionable(null), new Optionable(error));
console.log(result.unpack())