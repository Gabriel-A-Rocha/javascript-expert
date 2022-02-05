import { BaseError } from "./baseError.js";

class BusinessError extends BaseError {
  constructor(errorMessage) {
    super({
      message: errorMessage,
      name: "BusinessError",
    });
  }
}

export { BusinessError };
