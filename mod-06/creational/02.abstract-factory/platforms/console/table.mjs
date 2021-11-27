import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    console.log("Rendering on console!\n", data);
  }
}
