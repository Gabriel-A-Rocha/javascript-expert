import NotImplementedException from "../notImplementedException.mjs";

// simulating and interface in JavaScript
export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name);
  }
}
