import { expect, describe, it, test, jest } from "@jest/globals";
import BaseBusiness from "../src/business/base/baseBusiness.js";
import { NotImplementedException } from "../src/util/exceptions.js";

describe("BaseBusiness Abstract Class", () => {
  it("should throw if child class does not implement _validateRequiredFields method", () => {
    class ConcreteClass extends BaseBusiness {}
    const concreteClass = new ConcreteClass();

    const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name);
    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  it.todo("should throw an error when _validateRequiredFields returns false");

  it.todo("should throw if child class does not implement _create method");

  it.todo("should call _validateRequiredFields and _create on create");
});
