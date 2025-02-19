import { LeftRight } from "../leftRight";
export class CustomUnpackable {
    value;
    canBeUnpacked;
    cantUnpackMessage = "cant unpack";
    set messageWhenYouCntUnpack(msg) {
        this.cantUnpackMessage = msg;
    }
    constructor(v, isValueValid) {
        this.value = v;
        this.canBeUnpacked = () => isValueValid(this.value);
    }
    // unpack_with_result_instead_of_throwing(): ConcreteResult<T> {
    //   if (!this.couldUnpack()) {
    //     return new ConcreteResult<T>(new Optionable<T>(null),new Optionable(new CustomError("couldnt unpack value is"+ this.value )))
    //   }
    //   return new ConcreteResult<T>(new Optionable(this.value), new Optionable<CustomError>(null))
    // }
    ifCanBeUnpacked(handler) {
        if (this.canBeUnpacked()) {
            handler(this.value);
        }
    }
    expect(msg) {
        if (!this.canBeUnpacked()) {
            throw new Error(msg);
        }
        return this.value;
    }
    unpack() {
        if (!this.canBeUnpacked()) {
            throw new Error(this.cantUnpackMessage);
        }
        return this.value;
    }
    unpack_or(default_handler) {
        if (!this.canBeUnpacked()) {
            return default_handler();
        }
        return this.value;
    }
    unpack_with_default(d) {
        if (!this.canBeUnpacked()) {
            return d;
        }
        return this.value;
    }
    unpack_or_with_diverging_type_from_the_original(d) {
        if (!this.canBeUnpacked()) {
            return new LeftRight(null, d());
        }
        return new LeftRight(this.value, null);
    }
}
//# sourceMappingURL=unpackable.js.map