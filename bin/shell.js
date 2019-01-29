/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/shell/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assert.js":
/*!***********************!*\
  !*** ./src/assert.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((value, message) => {\n  if (!value) {\n    debugger;\n    if (message) {\n      throw message;\n    }\n    throw \"assert failed\";\n  }\n});\n\n\n//# sourceURL=webpack:///./src/assert.js?");

/***/ }),

/***/ "./src/image/open.js":
/*!***************************!*\
  !*** ./src/image/open.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _norm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../norm.js */ \"./src/norm.js\");\n/* harmony import */ var sqlite3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sqlite3 */ \"sqlite3\");\n/* harmony import */ var sqlite3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sqlite3__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n\n\n\n\nconst database = (name) => {\n  name = name || \"default\";\n  const home = process.env.DENSHI_HOME;\n  const path = `${home}/${name}`;\n  let exists = Object(fs__WEBPACK_IMPORTED_MODULE_2__[\"existsSync\"])(path);\n  let db = new sqlite3__WEBPACK_IMPORTED_MODULE_1__[\"Database\"](path);\n  if (!exists) {\n    db.serialize(() => {\n      db.run(\"create table words (name text primary key, src text)\");\n      console.log(`image: created ${name}`);\n    });\n  } else {\n    console.log(`image: ${name} already exists`);\n  }\n  return {\n    run(code, data) {\n      return new Promise((resolve, reject) => {\n        db.run(code, data, (error) => {\n          if (error !== null) {\n            reject(error);\n          } else {\n            resolve();\n          }\n        });\n      });\n    },\n    get(code, data) {\n      return new Promise((resolve, reject) => {\n        db.get(code, data, (error, value) => {\n          if (error !== null) {\n            reject(error);\n          } else {\n            resolve(value);\n          }\n        });\n      });\n    }\n  }\n}\n\n// Open an ABC module at the given path.\n/* harmony default export */ __webpack_exports__[\"default\"] = ((path) => {\n  let module = new Map();\n  let db = database(path);\n  const set = async (name, src) => {\n    console.log(`module: set ${name} to ${src}`);\n    const residual = await Object(_norm_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(src);\n    await db.run(\"delete from words where name=?\", [name]);\n    await db.run(\"insert into words values (?, ?)\", [name, residual]);\n    return residual;\n  }\n  const unset = async (name) => {\n    console.log(`module: unset ${name}`);\n    await db.run(\"delete from words where name=?\", [name]);\n    return name;\n  }\n  const localNorm = async (src) => {\n    console.log(`module: norm ${src}`);\n    return Object(_norm_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(src, async (name) => {\n      let row = await db.get(\"select src from words where name=?\", [name]);\n      if (row) {\n        return row.src;\n      } else {\n        return name;\n      }\n    });\n  }\n  return [set, unset, localNorm];\n});\n\n\n//# sourceURL=webpack:///./src/image/open.js?");

/***/ }),

/***/ "./src/norm.js":
/*!*********************!*\
  !*** ./src/norm.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _norm_pure_norm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./norm/pure/norm.js */ \"./src/norm/pure/norm.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _norm_pure_norm_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n\n\n\n//# sourceURL=webpack:///./src/norm.js?");

/***/ }),

/***/ "./src/norm/pure/Term.js":
/*!*******************************!*\
  !*** ./src/norm/pure/Term.js ***!
  \*******************************/
/*! exports provided: Term, Constant, Literal, Unary, Binary, Real */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Term\", function() { return Term; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Constant\", function() { return Constant; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Literal\", function() { return Literal; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Unary\", function() { return Unary; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Binary\", function() { return Binary; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Real\", function() { return Real; });\n/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assert.js */ \"./src/assert.js\");\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n\n\nclass Term {\n  constructor() {\n\n  }\n\n  static get id()      { return kId      }\n  static get apply()   { return kApply   }\n  static get bind()    { return kBind    }\n  static get copy()    { return kCopy    }\n  static get drop()    { return kDrop    }\n  static get reset()   { return kReset   }\n  static get shift()   { return kShift   }\n  static get sum()     { return kSum     }\n  static get negate()  { return kNegate  }\n  static get product() { return kProduct }\n  static get invert()  { return kInvert  }\n  static get exp()     { return kExp     }\n  static get log()     { return kLog     }\n  static get cos()     { return kCos     }\n  static get sin()     { return kSin     }\n  static get floor()   { return kFloor   }\n  static get ceil()    { return kCeil    }\n  \n  static real(value) { return new Literal(\"real\", value) }\n  static hint(name)  { return new Literal(\"hint\", name)  }\n  static word(name)  { return new Literal(\"word\", name)  }\n  static block(body) { return new Unary(\"block\", body)   }\n\n  static sequence(fst, snd) {\n    if (Term.isId(snd)) {\n      return fst;\n    }\n    if (Term.isId(fst)) {\n      return snd;\n    }\n    if (Term.isSequence(fst)) {\n      let inner = Term.sequence(fst.snd, snd);\n      return Term.sequence(fst.fst, inner);\n    }\n    return new Binary(\"sequence\", fst, snd);\n  }\n\n  static isTerm(obj)     { return obj instanceof Term     }\n  static isConstant(obj) { return obj instanceof Constant }\n  static isLiteral(obj)  { return obj instanceof Literal  }\n  static isUnary(obj)    { return obj instanceof Unary    }\n  static isBinary(obj)   { return obj instanceof Binary   }\n\n  static isId(obj) {\n    return Term.isConstant(obj) && obj.name === \"id\";\n  }\n\n  static isApply(obj) {\n    return Term.isConstant(obj) && obj.name === \"apply\";\n  }\n\n  static isBind(obj) {\n    return Term.isConstant(obj) && obj.name === \"bind\";\n  }\n\n  static isCopy(obj) {\n    return Term.isConstant(obj) && obj.name === \"copy\";\n  }\n\n  static isDrop(obj) {\n    return Term.isConstant(obj) && obj.name === \"drop\";\n  }\n\n  static isReset(obj) {\n    return Term.isConstant(obj) && obj.name === \"reset\";\n  }\n\n  static isShift(obj) {\n    return Term.isConstant(obj) && obj.name === \"shift\";\n  }\n\n  static isSum(obj) {\n    return Term.isConstant(obj) && obj.name === \"sum\";\n  }\n\n  static isNegate(obj) {\n    return Term.isConstant(obj) && obj.name === \"negate\";\n  }\n\n  static isProduct(obj) {\n    return Term.isConstant(obj) && obj.name === \"product\";\n  }\n\n  static isInvert(obj) {\n    return Term.isConstant(obj) && obj.name === \"invert\";\n  }\n\n  static isExp(obj) {\n    return Term.isConstant(obj) && obj.name === \"exp\";\n  }\n\n  static isLog(obj) {\n    return Term.isConstant(obj) && obj.name === \"log\";\n  }\n\n  static isCos(obj) {\n    return Term.isConstant(obj) && obj.name === \"cos\";\n  }\n\n  static isSin(obj) {\n    return Term.isConstant(obj) && obj.name === \"sin\";\n  }\n\n  static isFloor(obj) {\n    return Term.isConstant(obj) && obj.name === \"floor\";\n  }\n\n  static isCeil(obj) {\n    return Term.isConstant(obj) && obj.name === \"ceil\";\n  }\n\n  static isReal(obj) {\n    return Term.isLiteral(obj) && obj.type === \"real\";\n  }\n\n  static isHint(obj) {\n    return Term.isLiteral(obj) && obj.type === \"hint\";\n  }\n\n  static isWord(obj) {\n    return Term.isLiteral(obj) && obj.type === \"word\";\n  }\n\n  static isBlock(obj) {\n    return Term.isUnary(obj) && obj.type === \"block\";\n  }\n\n  static isSequence(obj) {\n    return Term.isBinary(obj) && obj.type === \"sequence\";\n  }\n}\n\nclass Constant extends Term {\n  constructor(name) {\n    super();\n    this.name = name;\n  }\n}\n\nclass Literal extends Term {\n  constructor(type, value) {\n    super();\n    this.type = type;\n    this.value = value;\n  }\n}\n\nclass Unary extends Term {\n  constructor(type, body) {\n    super();\n    this.type = type;\n    this.body = body;\n  }\n}\n\nclass Binary extends Term {\n  constructor(type, fst, snd) {\n    super();\n    this.type = type;\n    this.fst = fst;\n    this.snd = snd;\n  }\n}\n\nclass Real {\n  static sum(fst, snd) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(fst));\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(snd));\n    return Term.real(fst.value + snd.value);\n  }\n\n  static negate(obj) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(obj));\n    return Term.real(0 - obj.value);\n  }\n\n  static product(fst, snd) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(fst));\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(snd));\n    return Term.real(fst.value * snd.value);\n  }\n\n  static invert(obj) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(obj));\n    if (obj.value === 0) {\n      return obj;\n    } else {\n      return Term.real(1 / obj.value);\n    }\n  }\n\n  static exp(obj) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(obj));\n    return Term.real(Math.exp(obj.value));\n  }\n\n  static log(obj) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(obj));\n    return Term.real(Math.log(obj.value));\n  }\n\n  static cos(obj) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(obj));\n    return Term.real(Math.cos(obj.value));\n  }\n\n  static sin(obj) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(obj));\n    return Term.real(Math.sin(obj.value));\n  }\n\n  static floor(obj) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(obj));\n    return Term.real(Math.floor(obj.value));\n  }\n\n  static ceil(obj) {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Term.isReal(obj));\n    return Term.real(Math.ceil(obj.value));\n  }\n}\n\nconst kId      = new Constant(\"id\");\nconst kApply   = new Constant(\"apply\");\nconst kBind    = new Constant(\"bind\");\nconst kCopy    = new Constant(\"copy\");\nconst kDrop    = new Constant(\"drop\");\nconst kReset   = new Constant(\"reset\");\nconst kShift   = new Constant(\"shift\");\nconst kSum     = new Constant(\"sum\");\nconst kNegate  = new Constant(\"negate\");\nconst kProduct = new Constant(\"product\");\nconst kInvert  = new Constant(\"invert\");\nconst kExp     = new Constant(\"exp\");\nconst kLog     = new Constant(\"log\");\nconst kCos     = new Constant(\"cos\");\nconst kSin     = new Constant(\"sin\");\nconst kFloor   = new Constant(\"floor\");\nconst kCeil    = new Constant(\"ceil\");\n\n\n//# sourceURL=webpack:///./src/norm/pure/Term.js?");

/***/ }),

/***/ "./src/norm/pure/norm.js":
/*!*******************************!*\
  !*** ./src/norm/pure/norm.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assert.js */ \"./src/assert.js\");\n/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ \"./src/norm/pure/parse.js\");\n/* harmony import */ var _quote_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quote.js */ \"./src/norm/pure/quote.js\");\n/* harmony import */ var _Term_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Term.js */ \"./src/norm/pure/Term.js\");\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n\n\n\n\n\n// Normalize a string of code.\n// Expansion is a hack atm.\n/* harmony default export */ __webpack_exports__[\"default\"] = (async (src, expand) => {\n  let gas   = 65535;\n  let sink  = [];\n  let data  = [];\n  let code  = [Object(_parse_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(src)];\n  let words = new Map();\n  let redex;\n\n  if (expand === undefined) {\n    expand = async (x) => x;\n  }\n\n  const fetch = async () => {\n    Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(code.length > 0);\n    let term = code.pop();\n    // XXX HACK Think of a better way to do word expansion.\n    while (true) {\n      if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isSequence(term)) {\n        code.push(term.snd);\n        term = term.fst;\n      } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isWord(term)) {\n        let src = await expand(term.value);\n        if (src === term.value) {\n          break;\n        } else {\n          term = Object(_parse_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(src);\n        }\n      } else {\n        break;\n      }\n    }\n    return term;\n  }\n\n  const thunk = () => {\n    sink = sink.concat(data);\n    sink.push(redex);\n    data = [];\n  }\n\n  const arith1 = (fn) => {\n    if (data.length === 0) {\n      thunk();\n    } else {\n      let value = data[data.length-1];\n      if (!_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isReal(value)) {\n        thunk();\n      } else {\n        data.pop();\n        let result = fn(value);\n        data.push(result);\n      }\n    }\n  }\n\n  const arith2 = (fn) => {\n    if (data.length < 2) {\n      thunk();\n    } else {\n      let fst = data[data.length-1];\n      let snd = data[data.length-2];\n      if (!_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isReal(fst) || !_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isReal(snd)) {\n        thunk();\n      } else {\n        data.pop();\n        data.pop();\n        let result = fn(fst, snd);\n        data.push(result);\n      }\n    }\n  }\n\n  while (gas > 0 && code.length > 0) {\n    gas--;\n    redex = await fetch();\n    if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isId(redex)) {\n      //\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isApply(redex)) {\n      // [A] [B] a = B [A]\n      if (data.length < 2) {\n        thunk();\n      } else {\n        let block = data.pop();\n        let value = data.pop();\n        code.push(value);\n        code.push(block.body);\n      }\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isBind(redex)) {\n      // [A] [B] b = [[A] B]\n      if (data.length < 2) {\n        thunk();\n      } else {\n        let block = data.pop();\n        let value = data.pop();\n        let result = _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].block(\n          _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].sequence(value, block.body));\n        data.push(result);\n      }\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isCopy(redex)) {\n      // [A] c = [A] [A]\n      if (data.length === 0) {\n        thunk();\n      } else {\n        let peek = data[data.length-1];\n        data.push(peek);\n      }\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isDrop(redex)) {\n      // [A] d =\n      if (data.length === 0) {\n        thunk();\n      } else {\n        data.pop();\n      }\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isReset(redex)) {\n      thunk();\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isShift(redex)) {\n      // [F] s K r = [K] F\n      if (data.length === 0) {\n        thunk();\n      } else {\n        let block = data[data.length-1];\n        let value = null;\n        let buf = [];\n        while (value === null && code.length > 0) {\n          let term = fetch();\n          if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isReset(term)) {\n            let body = buf.reduceRight((acc, x) => {\n              return _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].sequence(x, acc);\n            }, _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].id);\n            value = _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].block(body);\n          } else {\n            buf.push(term);\n          }\n        }\n        if (value === null) {\n          thunk();\n          sink = sink.concat(buf);\n        } else {\n          data.pop();\n          data.push(value);\n          code.push(block.body);\n        }\n      }\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isSum(redex)) {\n      // 2 3 p = 5\n      arith2(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].sum);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isNegate(redex)) {\n      // 5 n = -5\n      arith1(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].negate);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isProduct(redex)) {\n      // 2 3 t = 6\n      arith2(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].product);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isInvert(redex)) {\n      // 5 v = 0.2\n      arith1(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].invert);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isExp(redex)) {\n      // 5 x = ...\n      arith1(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].exp);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isLog(redex)) {\n      // 5 l = ...\n      arith1(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].log);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isCos(redex)) {\n      // 5 k = ...\n      arith1(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].cos);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isSin(redex)) {\n      // 5 z = ...\n      arith1(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].sin);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isFloor(redex)) {\n      // 2.5 f = 2\n      arith1(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].floor);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isCeil(redex)) {\n      // 2.5 g = 3\n      arith1(_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Real\"].ceil);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isReal(redex)) {\n      // Real literals are placed on the stack.\n      data.push(redex);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isBlock(redex)) {\n      // Block literals are placed on the stack.\n      data.push(redex);\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isHint(redex)) {\n      // Hints are identity functions with invisible effects.  For now\n      // we'll just thunk, but in general these will e.g. drive\n      // acceleration.\n      thunk();\n    } else if (_Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].isWord(redex)) {\n      // Technically this is dead code since we expand words in\n      // `fetch`.  I'll need to think of a better way to handle words\n      // in general.\n      thunk();\n    } else {\n      throw `norm: unknown redex: ${redex}`;\n    }\n  }\n\n  let state = _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].id;\n  state = code.reduce((acc, x) => {\n    return _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].sequence(x, acc);\n  }, state);\n  state = data.reduceRight((acc, x) => {\n    return _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].sequence(x, acc);\n  }, state);\n  state = sink.reduceRight((acc, x) => {\n    return _Term_js__WEBPACK_IMPORTED_MODULE_3__[\"Term\"].sequence(x, acc);\n  }, state);\n\n  let dst = Object(_quote_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(state);\n  return dst\n});\n\n\n//# sourceURL=webpack:///./src/norm/pure/norm.js?");

/***/ }),

/***/ "./src/norm/pure/parse.js":
/*!********************************!*\
  !*** ./src/norm/pure/parse.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assert.js */ \"./src/assert.js\");\n/* harmony import */ var _Term_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Term.js */ \"./src/norm/pure/Term.js\");\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n\n\n\nconst atomPattern = /^[abcdfgklnpqrstvxz]$/;\nconst wordPattern = /^[a-zA-Z0-9_]+$/;\nconst hintPattern = /^\\([a-zA-Z0-9_]+\\)$/;\nconst realPattern = /^[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?$/;\n\n// Map a string to a Term, according to the following bytecode map:\n// a = apply\n// b = bind\n// c = copy\n// d = drop\n// f = floor\n// g = ceil\n// k = cos\n// l = log\n// n = -\n// p = +\n// q = >\n// r = reset\n// s = shift\n// t = *\n// v = /\n// x = exp\n// z = sin\n/* harmony default export */ __webpack_exports__[\"default\"] = ((src) => {\n  src = src.trim();\n  src = src.replace(/\\[/g, \"[ \");\n  src = src.replace(/\\]/g, \" ]\");\n  let tokens = src.split(\" \");\n  let build = [];\n  let stack = [];\n  let index = 0;\n  for (let token of tokens) {\n    if (token === \"[\") {\n      stack.push(build);\n      build = [];\n    } else if (token === \"]\") {\n      Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(stack.length != 0, \"Unbalanced brackets.\");\n      let fold = build.reduceRight((acc, x) => {\n        return _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].sequence(x, acc);\n      }, _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].id);\n      let term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].block(fold);\n      build = stack.pop();\n      build.push(term);\n    } else if (atomPattern.test(token)) {\n      let term;\n      switch (token) {\n      case \"a\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].apply;\n        break;\n      case \"b\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].bind;\n        break;\n      case \"c\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].copy;\n        break;\n      case \"d\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].drop;\n        break;\n      case \"f\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].floor;\n        break;\n      case \"g\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].ceil;\n        break;\n      case \"k\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].cos;\n        break;\n      case \"l\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].log;\n        break;\n      case \"n\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].negate;\n        break;\n      case \"p\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].sum;\n        break;\n      case \"q\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].gt;\n        break;\n      case \"r\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].reset;\n        break;\n      case \"s\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].shift;\n        break;\n      case \"t\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].product;\n        break;\n      case \"v\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].invert;\n        break;\n      case \"x\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].exp;\n        break;\n      case \"z\":\n        term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].sin;\n        break;\n      }\n      build.push(term);\n    } else if (hintPattern.test(token)) {\n      let name = token.substring(1, token.length - 1);\n      let term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].hint(name);\n      build.push(term);\n    } else if (realPattern.test(token)) {\n      let value = Number.parseFloat(token);\n      Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(!Number.isNaN(value));\n      let term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].real(value);\n      build.push(term);\n    } else if (wordPattern.test(token)) {\n      let term = _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].word(token);\n      build.push(term);\n    } else if (token.length === 0) {\n      //\n    } else {\n      console.log(`parse: unknown token: ${token}`);\n      return _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].block(_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].hint(\"syntax-error\"));\n    }\n  }\n  return build.reduceRight((acc, x) => {\n    return _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].sequence(x, acc);\n  }, _Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].id);\n});\n\n\n//# sourceURL=webpack:///./src/norm/pure/parse.js?");

/***/ }),

/***/ "./src/norm/pure/quote.js":
/*!********************************!*\
  !*** ./src/norm/pure/quote.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return quote; });\n/* harmony import */ var _assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assert.js */ \"./src/assert.js\");\n/* harmony import */ var _Term_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Term.js */ \"./src/norm/pure/Term.js\");\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n\n\n\n// Map a term to a string.\n// XXX TODO: This just repeats information in parse.js.\nfunction quote(obj) {\n  Object(_assert_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isTerm(obj));\n  if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isId(obj)) {\n    return \"\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isApply(obj)) {\n    return \"a\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isBind(obj)) {\n    return \"b\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isCopy(obj)) {\n    return \"c\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isDrop(obj)) {\n    return \"d\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isReset(obj)) {\n    return \"r\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isShift(obj)) {\n    return \"s\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isSum(obj)) {\n    return \"p\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isNegate(obj)) {\n    return \"n\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isProduct(obj)) {\n    return \"t\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isInvert(obj)) {\n    return \"v\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isExp(obj)) {\n    return \"x\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isLog(obj)) {\n    return \"l\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isCos(obj)) {\n    return \"k\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isSin(obj)) {\n    return \"z\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isFloor(obj)) {\n    return \"f\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isCeil(obj)) {\n    return \"g\";\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isHint(obj)) {\n    return `(${obj.value})`;\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isWord(obj)) {\n    return obj.value;\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isReal(obj)) {\n    return obj.value.toString();\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isBlock(obj)) {\n    const body = quote(obj.body);\n    return `[${body}]`;\n  } else if (_Term_js__WEBPACK_IMPORTED_MODULE_1__[\"Term\"].isSequence(obj)) {\n    const fst = quote(obj.fst);\n    const snd = quote(obj.snd);\n    return `${fst} ${snd}`;\n  } else {\n    throw `Couldn't quote object: ${obj}`;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/norm/pure/quote.js?");

/***/ }),

/***/ "./src/shell/main.js":
/*!***************************!*\
  !*** ./src/shell/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _image_open_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../image/open.js */ \"./src/image/open.js\");\n/* harmony import */ var _makeParser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makeParser.js */ \"./src/shell/makeParser.js\");\n/* harmony import */ var readline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! readline */ \"readline\");\n/* harmony import */ var readline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(readline__WEBPACK_IMPORTED_MODULE_2__);\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n\n\n\n\nlet image = Object(_image_open_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nlet parse = Object(_makeParser_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(image);\n\nlet ui = Object(readline__WEBPACK_IMPORTED_MODULE_2__[\"createInterface\"])({ input: process.stdin, output: process.stdout });\nui.setPrompt(\"user@denshi\\n> \");\nui.on(\"line\", (line) => {\n  let command = parse(line);\n  let response = command();\n  console.log(response);\n  ui.prompt();\n});\nui.on(\"error\", (error) => {\n  console.log(`image: error: ${error}`);\n});\nui.on(\"close\", () => {\n  process.exit(1);\n});\nui.prompt();\n\n\n//# sourceURL=webpack:///./src/shell/main.js?");

/***/ }),

/***/ "./src/shell/makeParser.js":
/*!*********************************!*\
  !*** ./src/shell/makeParser.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// This file is a part of Denshi.\n// Copyright (C) 2019 Matthew Blount\n\n// This program is free software: you can redistribute it and/or modify\n// it under the terms of the GNU Affero General Public License as\n// published by the Free Software Foundation, either version 3 of the\n// License, or (at your option) any later version.\n\n// This program is distributed in the hope that it will be useful, but\n// WITHOUT ANY WARRANTY; without even the implied warranty of\n// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU\n// Affero General Public License for more details.\n\n// You should have received a copy of the GNU Affero General Public\n// License along with this program.  If not, see\n// <https://www.gnu.org/licenses/.\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (([set, unset, norm]) => {\n  const setPattern = /^:([a-z][a-z0-9-]+) +(.*)$/;\n  const unsetPattern = /^~([a-z][a-z0-9-]+) *$/;\n  return (line) => {\n    var matches = line.match(setPattern);\n    if (matches !== null) {\n      let key = matches[1];\n      let value = matches[2];\n      return () => set(key, value);\n    }\n    var matches = line.match(unsetPattern);\n    if (matches !== null) {\n      let key = matches[1];\n      return () => unset(key);\n    }\n    return () => norm(line);\n  }\n});\n\n\n//# sourceURL=webpack:///./src/shell/makeParser.js?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"readline\");\n\n//# sourceURL=webpack:///external_%22readline%22?");

/***/ }),

/***/ "sqlite3":
/*!**************************!*\
  !*** external "sqlite3" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"sqlite3\");\n\n//# sourceURL=webpack:///external_%22sqlite3%22?");

/***/ })

/******/ });