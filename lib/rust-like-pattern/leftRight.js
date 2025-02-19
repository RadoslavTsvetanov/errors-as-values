export class LeftRight {
    left;
    right;
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
    async handleLeft(handler) {
        await handler(this.left);
        return this;
    }
    async handleRight(handler) {
        await handler(this.right);
        return this;
    }
    async handleLeftWhichReturnsTheResultedValue(handler) {
        return await handler(this.left);
    }
    async handleRightWhichReturnsTheResultedValue(handler) {
        return await handler(this.right);
    }
    async getRaw() {
        return [this.left, this.right];
    }
}
export class Either {
    left;
    right;
    isLeft;
    constructor(left, right, isLeft) {
        this.isLeft = isLeft;
        this.left = left;
        this.right = right;
    }
    async handleLeft(handler) {
        if (this.isLeft(this.left)) {
            handler(this.left);
        }
        return this;
    }
    async handleRight(handler) {
        if (!this.isLeft(this.left)) {
            handler(this.right);
        }
        return this;
    }
}
export class LeftRightWithMemory {
    left;
    right;
    didParentSucceed = false;
    isLeft;
    constructor(left, right, isLeft, didParentSucceed = false) {
        this.left = left;
        this.right = right;
        this.didParentSucceed = didParentSucceed;
        this.isLeft = isLeft;
    }
    async handleLeft(handler) {
        if (this.didParentSucceed) {
            return this;
        }
        if (this.isLeft(this.left)) {
            handler(this.left);
            this.didParentSucceed = true;
        }
        return this;
    }
    async handleRight(handler) {
        if (this.didParentSucceed) {
            return this;
        }
        if (!this.isLeft(this.left)) {
            handler(this.right);
            this.didParentSucceed = true;
        }
        return this;
    }
    handleLeftWhichReturnsTheResultedValue(handler) {
        return handler(this.left);
    }
    handleRightWhichReturnsTheResultedValue(handler) {
        return handler(this.right);
    }
    async getRaw() {
        return [this.left, this.right];
    }
}
class LeftOrRight {
    value;
    tag;
    constructor(v, tag) {
        this.value = v;
        this.tag = tag;
    }
    getTag() {
        return this.tag;
    }
    get v() {
        return this.value;
    }
}
export class LeftInstance extends LeftOrRight {
    constructor(v) {
        super(v, "left");
    }
}
export class RightInstance extends LeftOrRight {
    constructor(v) {
        super(v, "right");
    }
}
export class ClassicalEither {
    value;
    isLeft;
    constructor(v) {
        this.isLeft = v.getTag() === "left";
        this.value = v.v;
    }
    handleLeft(handler) {
        if (this.isLeft) {
            handler(this.value);
        }
        return this;
    }
    handleRight(handler) {
        if (!this.isLeft) {
            handler(this.value);
        }
        return this;
    }
}
//# sourceMappingURL=leftRight.js.map