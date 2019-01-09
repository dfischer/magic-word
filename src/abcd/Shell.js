import Module from "./Module.js";

// A textual interface to modules:
//
//     /prefix %hash
//     :name body
//     ~name
//
// `/prefix` imports the contents of the hash under that prefix.
// `:name` defines `name` as `body`.
// `~name` undefines `name`.
export default class Shell {
  constructor() {
    this.module = new Module();
    // `subscribers` is a map from event names to arrays of listeners.
    this.subscribers = new Map();
    this.subscribers.set("set", []);
    this.subscribers.set("delete", []);
    this.subscribers.set("import", []);
  }

  send(input) {
    let output = [];
    let lines = input.split("\n").map(x => x.trim());
    for (let line of lines) {
      // Defining words
      var match = line.match(/^:([a-z][a-z0-9]+) +(.*)$/);
      if (match !== null) {
        let key = match[1];
        let value = match[2];
        let response = this.module.set(key, value);
        output.push(response);
        this._emit("set", { key: key, value: value });
        continue;
      }
      // Undefining words
      var match = line.match(/^~([a-z][a-z0-9]+)$/);
      if (match !== null) {
        let key = match[1];
        let response = this.module.delete(key);
        output.push(response);
        this._emit("delete", { key: key });
        continue;
      }
      // Normalization
      output.push(this.module.normalize(line));
      // XXX TODO prefix imports
    }
    return output.join("\n");
  }

  _emit(event, data) {
    let subs = this.subscribers.get(event);
    for (let thunk of subs) {
      Promise.resolve().then(() => thunk(data));
    }
  }

  on(event, agent) {
    if (!this.subscribers.has(event)) {
      debugger;
      throw `no such event: ${event}`;
    }
    let subs = this.subscribers.get(event);
    subs.push(agent);
    // Add a flag so the removal function is idempotent.
    let removed = false;
    return () => {
      if (!removed) {
        subs.splice(subs.indexOf(agent), 1);
        removed = true;
      }
    };
  }

  toString() {
    let buf = [];
    // Print all of the definitions.
    for (let [key, value] of this.module) {
      buf.push(`:${key} ${value}`);
    }
    return buf.join("\n");
  }
}
