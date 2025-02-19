import { CustomUnpackable, type Unpackable } from "./unpackable/unpackable";
export type none = null | undefined;
export interface IOptionable<T> extends Unpackable<T> {
    is_none: () => boolean;
}
export declare const statics: {
    messageForWhenOptionIsNone: string;
};
export declare class Optionable<T> extends CustomUnpackable<T> {
    constructor(v: T | none);
    is_none(): boolean;
}
//# sourceMappingURL=option.d.ts.map