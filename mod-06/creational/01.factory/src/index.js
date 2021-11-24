const UserFactory = require("./factory/userFactory");

(async () => {
  const userService = await UserFactory.createInstance();
  const result = await userService.find({ name: "all" });
  console.log("🪁   result", result);
})();
