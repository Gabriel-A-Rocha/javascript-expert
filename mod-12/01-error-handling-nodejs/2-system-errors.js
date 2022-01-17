import timers from "timers/promises";

const timeoutAsync = timers.setTimeout;

setTimeout(async () => {
  console.log("Starting process...");
  await timeoutAsync(2000);
  console.count("debug");
  console.log(await Promise.resolve("Timeout order"));
  await timeoutAsync(2000);
  console.count("debug");

  await Promise.reject("Promise rejected from inside setTimeout!");
}, 2000);

const throwError = (msg) => {
  throw new Error(msg);
};

try {
  console.log("Starting block...");
  throwError("An error was thrown");
} catch (error) {
  console.log("Caught on catch block -->", error.message);
} finally {
  console.log("Executed after all");
}

process.on("unhandledRejection", (e) => {
  console.log("unhandledRejection", e.message ?? e);
});

process.on("uncaughtException", (e) => {
  console.log("uncaughtException", e.message ?? e);
});

setTimeout(async () => {
  await Promise.reject("Promise rejected outside");
});

setTimeout(async () => {
  throw new Error("Error outside try/catch block");
});
