const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: 123,
        name: "John Doe",
        profession: "Software Engineer",
        age: 40,
      },
      {
        id: 234,
        name: "Sarah Smith",
        profession: "SAP Consultant",
        age: 38,
      },
      {
        id: 345,
        name: "Kevin Bacon",
        profession: "Director of Marketing",
        age: 42,
      },
    ];
    deepStrictEqual(result, expected);
  }
})();
