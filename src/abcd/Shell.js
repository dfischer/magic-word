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
  }

  send(input) {
    let output = [];
    let lines = input.split("\n").map(x => x.trim());
    for (let line of lines) {
      // Defining words
      var match = line.match(/^:([a-z][a-z0-9]+) +(.*)$/);
      if (match !== null) {
        output.push(this.module.set(match[1], match[2]));
        continue;
      }
      // Undefining words
      var match = line.match(/^~([a-z][a-z0-9]+)$/);
      if (match !== null) {
        output.push(this.module.delete(match[1]));
        continue;
      }
      // Normalization
      output.push(this.module.normalize(line));
      continue;
      // XXX TODO prefix imports
    }
    return output.join("\n");
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
