import Http from "http";

async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit;

  Http.Server.prototype.emit = function (...args) {
    return oldEmit.apply(this, args);
  };
}

export { InjectHttpInterceptor };
