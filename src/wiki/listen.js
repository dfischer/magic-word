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
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Index from "./components/Index.js";
import Block from "./components/Block.js";

const render = (component) => {
  let body = renderToStaticMarkup(component);
  return `
<!doctype html>
<html>
 <head>
  <meta charset="utf-8">
  <meta lang="en-US">
 </head>
 <body>
  <div id="container">${body}</div>
 </body>
</html>
`
}

export default (port) => {
  let [set, unset, norm] = open();
  let app = express();
  app.use(parser.urlencoded({ extended: false }));
  app.get("/", (request, response) => {
    const html = render(<Index/>);
    response.send(html);
  });
  app.get("/:word", (request, response) => {
    const word = request.params.word;
    const src = norm(word);
    response.format({
      "text/plain": () => {
        response.send(src);
      },
      "text/html": () => {
        const html = render(<Block name={word} src={src}/>);
        response.send(html);
      },
      "default": () => {
        response.status(406);
        response.send("Unacceptable.");
      },
    });
  });
  app.post("/:word", (request, response) => {
    const word = request.params.word;
    if (request.body.src === undefined) {
      response.status(400);
      response.send("Bad request.");
    } else {
      const src = norm(request.body.src);
      set(word, src);
      response.format({
        "text/plain": () => {
          response.send(src);
        },
        "text/html": () => {
          const html = render(<Block name={word} src={src}/>);
          response.send(html);
        },
        "default": () => {
          response.status(406);
          response.send("Unacceptable.");
        },
      });
    }
  });
  app.listen(port, () => {
    console.log(`wiki: listening on ${port}`);
  });
}