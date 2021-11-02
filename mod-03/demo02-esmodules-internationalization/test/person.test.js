// if ES Module destructuring is not supported
import mocha from "mocha";
const { describe, it } = mocha;

import chai from "chai";
const { expect } = chai;

import { Person } from "../src/person.js";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const str = "1 Cruze,Elantra 50000 2020-10-10 2021-11-11";
    const person = Person.generateInstanceFromString(str);

    const expected = {
      id: 1,
      vehicles: ["Cruze", "Elantra"],
      kmTraveled: "50000",
      from: "2020-10-10",
      to: "2021-11-11",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      id: "1",
      vehicles: ["Cruze", "Elantra"],
      kmTraveled: "50000",
      from: "2020-10-10",
      to: "2021-11-11",
    });

    const formattedPerson = person.formatted("pt-br");

    const expected = {
      id: 1,
      vehicles: "Cruze e Elantra",
      kmTraveled: "50.000 km",
      from: "10 de outubro de 2020",
      to: "11 de novembro de 2021",
    };

    expect(formattedPerson).to.be.deep.equal(expected);
  });
});
