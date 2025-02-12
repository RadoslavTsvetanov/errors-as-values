import { logger } from "../utils/console";
import { ILeftRight, LeftRight } from "./leftRight";
import { CustomUnpackable, Unpackable } from "./unpackable";

export type none = null | undefined;

export interface IOptionable<T> extends Unpackable<T> {
  is_none: () => boolean;
}

// export class Optionable<T> implements IOptionable<T>{
//     private value: T | none = null
//     constructor(v: T | none) {
//        this.value = v
//     }

//     unpack(): T {
//         if (this.value === null || this.value === undefined) {
//             throw new Error("Option is None")
//         }
//         return this.value
//     }

//     unpack_with_default(d: T): T{
//         if (this.value === null || this.value === undefined) {
//            return d
//         }
//         return this.value
//     }
//     is_none(): boolean{
//         return this.value === undefined || this.value === null
//     }

//     unpack_or_with_diverging_type_from_the_original<C>(customHandler: () => C) : ILeftRight<Optionable<T>,Optionable<C>>{
//         if (this.value === null) {
//             return new LeftRight(new Optionable<T>(null),new Optionable(customHandler()))
//         }
//         return new LeftRight(new Optionable(this.value),new Optionable<C>(null))
//    }

//     unpack_or(default_handler: () => T): T{
//         if (this.value === null || this.value === undefined) {
//             return default_handler()
//         }
//         return this.value
//    }
// }

//Plan -> write tests for this and then remake it to inherit since currently it will easier to test it whether it behaves cirrectly and if not debugging will be easier

export class Optionable<T> extends CustomUnpackable<T> {
  constructor(v: T | none) {
    super(v as T, (v) => {return (v !== null && v !== undefined)});
  }

  is_none(): boolean {
    return this.value === null || this.value === undefined;
  }
}
