import { expect, describe, it, test, jest, beforeEach } from "@jest/globals";
import BaseBusiness from "../src/business/base/baseBusiness.js";
import { NotImplementedException } from "../src/util/exceptions.js";

describe("BaseBusiness Abstract Class", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw if child class does not implement _validateRequiredFields method", () => {
    class ConcreteClass extends BaseBusiness {}
    const concreteClass = new ConcreteClass();

    const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name);
    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  it("should throw an error when _validateRequiredFields returns false", () => {
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(false);
    }
    const concreteClass = new ConcreteClass();

    const validationError = new Error("Invalid data");
    expect(() => concreteClass.create({})).toThrow(validationError);
  });

  it("should throw if child class does not implement _create method", () => {
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(true);
    }
    const concreteClass = new ConcreteClass();

    const createMethodError = new NotImplementedException(concreteClass._create.name);
    expect(() => concreteClass.create({})).toThrow(createMethodError);
  });

  it("should call _validateRequiredFields and _create on create", () => {
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(true);
      _create = jest.fn().mockReturnValue(true);
    }
    const concreteClass = new ConcreteClass();
    const baseClassCreateSpy = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name);

    const result = concreteClass.create({});
    expect(result).toBeTruthy();
    expect(baseClassCreateSpy).toHaveBeenCalled();
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
    expect(concreteClass._create).toHaveBeenCalled();
  });
});
