import { LeftRight } from "./leftRight";
import { Optionable } from "./option";
import { CustomUnpackable } from "./unpackable/unpackable";
export class CustomError {
    message;
    constructor(message) {
        this.message = message;
    }
}
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
export class Result extends CustomUnpackable {
    error;
    safeMode = true;
    constructor(value, error) {
        super(value.unpack_with_default(null), (e) => error.is_none());
        this.error = error;
        if (value.is_none() && error.is_none()) {
            throw new Error("Either value or error must be provided");
        }
        if (!value.is_none() && !error.is_none()) {
            throw new Error("Only value or error can be provided, not both");
        }
        error.ifCanBeUnpacked((definedError) => {
            Object.entries(definedError).forEach(([key, value]) => {
                value.ifCanBeUnpacked((v) => {
                    value.ifCanBeUnpacked((v) => this.messageWhenYouCntUnpack = v.message);
                });
            });
        });
    }
    getError() {
        return this.error;
    }
    static async transformFunctionThatThrowsIntoResult(functionThatCouldThrow) {
        try {
            return new Result(new Optionable(await functionThatCouldThrow()), (new Optionable(null)));
        }
        catch (err) {
            return new Result(new Optionable(null), new Optionable({ errorThrownFromTheFunction: new Optionable(new CustomError(err.message)) }));
        }
    }
    handlerErrors(handlers) {
        if (isEmptyObject(handlers) && this.safeMode) {
            console.log("note passing empty error handler to handleErrors means you have not defined any possible errors that the Result could  result to are you sure using a result here is neccessary?, if you think you know what are you doing extend the class into your custom result and overwrite the safe method protected variablle to true, (i make you to make a whole new class to give you time to really think if you understand what you are doing)");
            return;
        }
        this.error.ifCanBeUnpacked((v) => {
            Object.keys(v).forEach((key) => {
                const handler = handlers[key]; // Ensure correct typing
                if (handler) {
                    v[key].ifCanBeUnpacked((error) => handler(error));
                }
            });
        });
    }
}
export class ConcreteResult extends Result {
}
// ---------------------
//# sourceMappingURL=result.js.map