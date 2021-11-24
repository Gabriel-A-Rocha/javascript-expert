const { deepStrictEqual } = require("assert");
const rewiremock = require("rewiremock/node");

const dbData = [{ name: "Ringo Starr" }, { name: "John Lennon" }];
class MockDatabase {
  connect = async () => this;
  find = async (query) => dbData;
}

rewiremock(() => require("../src/util/database")).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: "RINGO STARR" }, { name: "JOHN LENNON" }];

    rewiremock.enable();
    const UserFactory = require("../src/factory/userFactory");
    const userService = await UserFactory.createInstance();
    const result = await userService.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    const expected = [{ name: "RICK ASTLEY" }];

    const UserFactory = require("../src/factory/userFactory");
    const userService = await UserFactory.createInstance();
    const result = await userService.find();
    deepStrictEqual(result, expected);
  }
})();
