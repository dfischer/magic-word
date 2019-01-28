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

import norm from "../norm.js";
import { Database } from "sqlite3";

const database = (path) => {
  path = path || `${process.env.DENSHI_HOME}/mod/default`;
  let db = new Database(path);
  return {
    run(code, data) {
      return new Promise((resolve, reject) => {
        db.run(code, data, (error) => {
          if (error !== null) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    },
    get(code, data) {
      return new Promise((resolve, reject) => {
        db.get(code, data, (error, value) => {
          if (error !== null) {
            reject(error);
          } else {
            resolve(value);
          }
        });
      });
    }
  }
}

// Open an ABC module at the given path.
export default (path) => {
  let module = new Map();
  let db = database(path);
  const set = async (name, src) => {
    console.log(`module: set ${name} to ${src}`);
    const residual = await norm(src);
    await db.run("delete from words where name=?", [name]);
    await db.run("insert into words values (?, ?)", [name, residual]);
    return residual;
  }
  const unset = async (name) => {
    console.log(`module: unset ${name}`);
    await db.run("delete from words where name=?", [name]);
    return name;
  }
  const localNorm = async (src) => {
    console.log(`module: norm ${src}`);
    return norm(src, async (name) => {
      let row = await db.get("select src from words where name=?", [name]);
      if (row) {
        return row.src;
      } else {
        return name;
      }
    });
  }
  return [set, unset, localNorm];
}
