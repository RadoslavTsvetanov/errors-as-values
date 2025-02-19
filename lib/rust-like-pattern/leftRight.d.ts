import type { Validator } from "../utils/validator";
export interface ILeftRight<LeftType, RightType> {
    handleLeft<HandleLeftReturnType>(handler: (v: LeftType) => Promise<HandleLeftReturnType>): Promise<this>;
    handleRight<HandleRightReturnType>(handler: (v: RightType) => Promise<HandleRightReturnType>): Promise<this>;
    handleLeftWhichReturnsTheResultedValue<ReturnType>(handler: (v: LeftType) => Promise<ReturnType>): Promise<ReturnType>;
    handleRightWhichReturnsTheResultedValue<ReturnType>(handler: (v: RightType) => Promise<ReturnType>): Promise<ReturnType>;
    getRaw(): Promise<[LeftType, RightType]>;
}
export declare class LeftRight<LeftType, RightType> implements ILeftRight<LeftType, RightType> {
    private left;
    private right;
    constructor(left: LeftType, right: RightType);
    handleLeft<HandleLeftReturnType>(handler: (v: LeftType) => Promise<HandleLeftReturnType>): Promise<this>;
    handleRight<HandleRightReturnType>(handler: (v: RightType) => Promise<HandleRightReturnType>): Promise<this>;
    handleLeftWhichReturnsTheResultedValue<ReturnType>(handler: (v: LeftType) => Promise<ReturnType>): Promise<ReturnType>;
    handleRightWhichReturnsTheResultedValue<ReturnType>(handler: (v: RightType) => Promise<ReturnType>): Promise<ReturnType>;
    getRaw(): Promise<[LeftType, RightType]>;
}
export declare class Either<L, R> {
    private left;
    private right;
    private isLeft;
    constructor(left: L, right: R, isLeft: (v: L | R) => boolean);
    handleLeft(handler: (v: L) => Promise<void>): Promise<this>;
    handleRight(handler: (v: R) => Promise<void>): Promise<this>;
}
export declare class LeftRightWithMemory<Left, Right> implements ILeftRight<Left, Right> {
    private left;
    private right;
    private didParentSucceed;
    private isLeft;
    constructor(left: Left, right: Right, isLeft: Validator<Left>, didParentSucceed?: boolean);
    handleLeft<HandleLeftReturnType>(handler: (v: Left) => Promise<HandleLeftReturnType>): Promise<this>;
    handleRight<HandleRightReturnType>(handler: (v: Right) => Promise<HandleRightReturnType>): Promise<this>;
    handleLeftWhichReturnsTheResultedValue<ReturnType>(handler: (v: Left) => Promise<ReturnType>): Promise<ReturnType>;
    handleRightWhichReturnsTheResultedValue<ReturnType>(handler: (v: Right) => Promise<ReturnType>): Promise<ReturnType>;
    getRaw(): Promise<[Left, Right]>;
}
declare class LeftOrRight<V> {
    private value;
    private tag;
    constructor(v: V, tag: "left" | "right");
    getTag(): "left" | "right";
    get v(): V;
}
export declare class LeftInstance<T> extends LeftOrRight<T> {
    constructor(v: T);
}
export declare class RightInstance<T> extends LeftOrRight<T> {
    constructor(v: T);
}
export declare class ClassicalEither<Left, Right> {
    private value;
    private isLeft;
    constructor(v: LeftInstance<Left> | RightInstance<Right>);
    handleLeft(handler: (v: Left) => void): this;
    handleRight(handler: (v: Right) => void): this;
}
export {};
//# sourceMappingURL=leftRight.d.ts.map