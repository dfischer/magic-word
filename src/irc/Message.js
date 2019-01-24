export default class Message {
  constructor(
    source, verb, parameters, rawMessage) {
    this.source = source;
    this.verb = verb;
    this.parameters = parameters;
    this.rawMessage = rawMessage;
  }
}
