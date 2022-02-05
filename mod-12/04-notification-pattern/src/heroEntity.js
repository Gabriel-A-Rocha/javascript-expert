// @ts-check

import { NotificationContext } from "./NotificationContext.js";

class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super();
    this.name = name;
    this.age = age;
  }

  isValid() {
    if (this.age < 20) {
      this.addNotification("Age must be greater than 20!");
    }

    if (this.name?.length < 2) {
      this.addNotification("Name must have at least 2 characters!");
    }

    return !this.hasNotifications();
  }
}

export { HeroEntity };
