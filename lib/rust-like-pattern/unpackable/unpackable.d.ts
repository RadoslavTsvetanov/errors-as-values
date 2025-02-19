import { type ILeftRight } from "../leftRight";
export interface Unpackable<T> {
    unpack: () => T;
    unpack_or_with_diverging_type_from_the_original: <C>(d: () => C) => ILeftRight<T, C>;
    unpack_or: (d: () => T) => T;
    unpack_with_default: (d: T) => T;
    expect: (msg: string) => T;
    ifCanBeUnpacked: (handler: (v: T) => void) => void;
}
export declare class CustomUnpackable<T> implements Unpackable<T> {
    protected value: T;
    protected canBeUnpacked: () => boolean;
    private cantUnpackMessage;
    set messageWhenYouCntUnpack(msg: string);
    constructor(v: T, isValueValid: (v: T) => boolean);
    ifCanBeUnpacked(handler: (v: T) => void): void;
    expect(msg: string): T;
    unpack(): T;
    unpack_or(default_handler: () => T): T;
    unpack_with_default(d: T): T;
    unpack_or_with_diverging_type_from_the_original<C>(d: () => C): ILeftRight<T, C>;
}
//# sourceMappingURL=unpackable.d.ts.map