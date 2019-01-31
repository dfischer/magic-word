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

import open from "../image/open.js";
import express from "express";
import parser from "body-parser";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Index from "./components/Index.js";
import Function from "./components/Function.js";

const render = (component) => {
  let body = renderToStaticMarkup(component);
  return `
<!doctype html>
<html>
 <head>
  <meta charset="utf-8">
  <meta lang="en-US">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 </head>
 <body>
  <div id="container">${body}</div>
 </body>
</html>
`
}

export default (image, { port }) => {
  let app = express();
  app.use(parser.urlencoded({ extended: false }));
  app.get("/", (request, response) => {
    console.log(`wiki: get /`);
    response.format({
      "text/plain": () => {
        response.type("text/plain");
        response.send(`[(version-0-0-0)]`);
      },
      "text/html": () => {
        const html = render(<Index/>);
        response.type("text/html");
        response.send(html);
      },
      "default": () => {
        response.status(406);
        response.type("text/plain");
        response.send("Unacceptable.");
      },
    });
  });
  app.post("/", async (request, response) => {
    console.log(`wiki: post /`);
    if (request.body.src === undefined) {
      response.status(400);
      response.type("text/plain");
      response.send("Bad request.");
    } else {
      const src = request.body.src;
      const res = await image.norm(request.body.src);
      response.format({
        "text/plain": () => {
          response.type("text/plain");
          response.send(res);
        },
        "text/html": () => {
          const html = render(<Function src={src} res={res}/>);
          response.type("text/html");
          response.send(html);
        },
        "default": () => {
          response.status(406);
          response.type("text/plain");
          response.send("Unacceptable.");
        },
      });
    }
  });
  app.get("/:name", async (request, response) => {
    const name = request.params.name;
    console.log(`wiki: get ${name}`);
    const src = await image.get(name);
    const res = await image.norm(src);
    response.format({
      "text/plain": () => {
        response.type("text/plain");
        response.send(res);
      },
      "text/html": () => {
        const html = render(<Function name={name} src={src} res={res}/>);
        response.type("text/html");
        response.send(html);
      },
      "default": () => {
        response.status(406);
        response.type("text/plain");
        response.send("Unacceptable.");
      },
    });
  });
  app.post("/:name", async (request, response) => {
    const name = request.params.name;
    console.log(`wiki: post ${name}`);
    if (request.body.src === undefined) {
      response.status(400);
      response.type("text/plain");
      response.send("Bad request.");
    } else {
      const src = request.body.src;
      if (src === "" || src === name) {
        image.unset(name);
        src = name;
      } else {
        image.set(name, src);
      }
      const res = await image.norm(src);
      response.format({
        "text/plain": () => {
          response.type("text/plain");
          response.send(res);
        },
        "text/html": () => {
          const html = render(<Function name={name} src={src} res={res}/>);
          response.type("text/html");
          response.send(html);
        },
        "default": () => {
          response.status(406);
          response.type("text/plain");
          response.send("Unacceptable.");
        },
      });
    }
  });
  app.delete("/:name", async (request, response) => {
    const name = request.params.name;
    console.log(`wiki: delete ${name}`);
    image.unset(name);
    response.redirect("/");
  });
  app.listen(port, () => {
    console.log(`wiki: listening on ${port}`);
  });
}
