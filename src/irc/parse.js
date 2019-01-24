import Message from "./Message.js";

// XXX TODO Break this up and document it.
const pattern = /^(?:@([^\r\n ]*) +)?(?::([^\r\n ]+) +)?([^\r\n ]+)(?: +([^:\r\n ]+[^\r\n ]*(?: +[^:\r\n ]+[^\r\n ]*)*)|)?(?: +:([^\r\n]*)| +)?[\r\n]*$/;

export default (line) => {
  let matches = line.match(pattern);
  if (matches === null) {
    throw `irc: Couldn't parse line: ${line}`;
  } else {
    const tags = matches[1];
    const source = matches[2];
    const verb = matches[3];
    const fixedParameters = matches[4];
    const trailingParameters = matches[5];
    let parameters = [];
    if (fixedParameters !== undefined) {
      parameters = fixedParameters.split(" ");
    }
    if (trailingParameters !== undefined) {
      parameters.push(trailingParameters);
    }
    return new Message(source, verb, parameters, line);
  }
}
