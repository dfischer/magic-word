// This file is a part of Denshi.
// Copyright (C) 2019 Matthew Blount

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public
// License along with this program.  If not, see
// <https://www.gnu.org/licenses/.

import open from "../abc/shell/open.js";
import express from "express";
import parser from "body-parser";

export default (port) => {
  let [set, unset, norm] = open();
  let app = express();
  app.use(parser.text());
  app.get("/", (request, response) => {
    console.log(`wiki: GET /`);
    response.send("Hello, Denshi.");
  });
  app.post("/", (request, response) => {
    const body = request.body;
    console.log(`wiki: POST / ${body}`);
    const residual = norm(body);
    response.send(residual);
  });
  app.get("/:word", (request, response) => {
    const word = request.params.word;
    console.log(`wiki: GET ${word}`);
    const body = norm(word);
    response.send(body);
  });
  app.post("/:word", (request, response) => {
    const word = request.params.word;
    const body = request.body;
    console.log(`wiki: POST ${word} ${body}`);
    set(word, body);
    response.send(`POST ${word} = ${body}`);
  });
  app.delete("/:word", (request, response) => {
    const word = request.params.word;
    console.log(`wiki: DELETE ${word}`);
    unset(word);
    response.send(`DELETE ${word}`);
  });
  app.listen(port, () => {
    console.log(`wiki: listening on ${port}`);
  });
}
