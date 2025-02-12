import { expect } from 'bun:test';
import { ILeftRight, LeftRight } from "./leftRight"
import { none, Optionable } from "./option";
import { ConcreteResult, CustomError, Result } from "./result";
export interface Unpackable<T> {
    unpack: () => T
    unpack_or_with_diverging_type_from_the_original: <C>(d: () => C) => ILeftRight<T,C>; 
    unpack_or: (d: () => T) => T
    unpack_with_default: (d: T) => T
    expect: (msg: string) => T
}



export class CustomUnpackable<T> implements Unpackable<T> {
  protected value: T ;
  private checkIfValueCouldBeUnpacked: (v: T) => boolean
  constructor(v: T, isValueValid: (v: T) => boolean) {
    this.value = v;
    this.checkIfValueCouldBeUnpacked = isValueValid; 
  }


  protected couldUnpack(): boolean {
    return this.checkIfValueCouldBeUnpacked(this.value)
  }

  unpack_with_result_instead_of_throwing(): ConcreteResult<T> {
    if (!this.couldUnpack()) {
      return new ConcreteResult<T>(new Optionable<T>(null),new Optionable(new CustomError("couldnt unpack value is"+ this.value )))
    }
    return new ConcreteResult<T>(new Optionable(this.value), new Optionable<CustomError>(null))
  }

  expect(msg: string): T{
    if (!this.couldUnpack()) {
      throw new CustomError(msg)
    }
    return this.value
  };
  unpack(): T {
    if (!this.couldUnpack()) {
      throw new Error("Option is None");
    }
    return this.value;
  }

  
    unpack_or(default_handler: () => T): T {
        if (!this.couldUnpack()) {
      return default_handler();
    }
    return this.value;
  }

  
    unpack_with_default(d: T): T {
    if (!this.couldUnpack()) {
      return d;
    }
    return this.value;
  }

  unpack_or_with_diverging_type_from_the_original<C>(
    d: () => C
  ): ILeftRight<T, C> {
      if (!this.couldUnpack()) {
          return new LeftRight(
              <T>(null),
              d()
          );
          
      }

      return new LeftRight(
              this.value,
              <C>(null)
          );
  }
} 