import { TerminalController } from "./TerminalController.js";
import database from "../database.json";
import Person from "./person.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERMINAL = ":q";

const terminalController = new TerminalController();

terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question("What?");

    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal();
      console.log("Process finished!");
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    console.log("📍   person", person.formatted(DEFAULT_LANG));

    return mainLoop();
  } catch (error) {
    console.log("An error occurred!");
    return mainLoop();
  }
}

await mainLoop();
