class NotImplementedException extends Error {
  constructor(functionName) {
    super(`${functionName} was called without an implementation`);
    this.name = "NotImplementedException";
  }
}

export { NotImplementedException };
