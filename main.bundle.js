/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _types_Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/Cell */ \"./src/types/Cell.ts\");\n\nclass Game {\n  static isRunning = false;\n  static iteration = 0;\n  constructor(gameField, gameView, timeoutRefresh) {\n    this.gameField = gameField;\n    this.gameView = gameView;\n    this.timeoutRefresh = timeoutRefresh;\n    this.state = gameField.getState();\n    gameView.updateGameField(gameField.getState());\n    // gameView.updateGameState({\n    //     isRunning: false,\n    //     width: this.state[0].length,\n    //     height: this.state.length\n    // })\n\n    const setSizeButton = document.querySelector(\"#setSize\");\n    setSizeButton.addEventListener(\"click\", () => {\n      let gameFieldWidth = Number(document.querySelector(\"#gameFieldWidth\").value);\n      let gameFieldHeight = Number(document.querySelector(\"#gameFieldHeight\").value);\n      this.gameField.setSize(gameFieldWidth, gameFieldHeight);\n      this.gameView.updateGameField(this.gameField.getState());\n    });\n    const nextGenerationButton = document.querySelector(\"#nextGeneration\");\n    nextGenerationButton.addEventListener(\"click\", () => {\n      switch (Game.iteration % 2) {\n        case 0:\n          this.gameField.nextFaze1();\n          break;\n        case 1:\n          this.gameField.nextFaze2();\n          break;\n        default:\n          return;\n      }\n      this.gameView.updateGameField(this.gameField.getState());\n      Game.iteration++;\n    });\n    document.querySelector(\"#app\").addEventListener(\"click\", ev => {\n      if (ev.target instanceof HTMLTableCellElement) {\n        let y = ev.target.closest(\"tr\").rowIndex;\n        let x = ev.target.cellIndex;\n        console.log(x);\n        console.log(y);\n        this.gameField.toggleCellState(x, y);\n        this.gameView.updateGameField(this.gameField.getState());\n      }\n    });\n  }\n  start() {\n    this.gameView.start(this.gameField);\n  }\n  execute() {\n    // this.gameView.updateGameField(this.gameField.getState());\n    // this.gameView.updateGameState({\n    //     isRunning: true\n    // })\n    // let myTimer = setInterval(() => {\n    //     this.gameField.nextGeneration();\n    //\n    // }, 5000);\n  }\n  onFieldSizeChange() {\n    let gameFieldWidth = Number(this.gameView.element.querySelector(\"#gameFieldWidth\"));\n    let gameFieldHeight = Number(this.gameView.element.querySelector(\"#gameFieldHeight\"));\n    this.gameField.setSize(gameFieldWidth, gameFieldHeight);\n    this.gameView.updateGameField(this.gameField.getState());\n  }\n\n  /**\n   * Все мёртвые клетки\n   * @param gameField\n   */\n  isAllDeadCells(gameField) {\n    return Array.prototype.concat.apply([], gameField.getState()).filter(cell => cell.getStatus() === _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING).length === 0;\n  }\n}\nfunction isAllDeadCells(gameField) {\n  return Array.prototype.concat.apply([], gameField.getState()).filter(cell => cell.getStatus() === _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING).length === 0;\n}\n\n//# sourceURL=webpack://lesson20/./src/Game.ts?");

/***/ }),

/***/ "./src/GameField.ts":
/*!**************************!*\
  !*** ./src/GameField.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameField: () => (/* binding */ GameField)\n/* harmony export */ });\n/* harmony import */ var _types_Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types/Cell */ \"./src/types/Cell.ts\");\n\nclass GameField {\n  bornCellsInNextIteration = new Set();\n  dieCellsInNextIteration = new Set();\n  constructor(width = 0, height = 0) {\n    this.width = width;\n    this.height = height;\n    this.state = [[]];\n    for (let i = 0; i < height; i++) {\n      this.state[i] = [];\n      for (let j = 0; j < width; j++) {\n        this.state[i][j] = new _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(i, j, _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.DEAD);\n        // this.state[i][j] = new Cell(i,j,Status.LIVING);\n      }\n    }\n  }\n  getState() {\n    const gameField = [[]];\n    for (let i = 0; i < this.height; i++) {\n      gameField[i] = [];\n      for (let j = 0; j < this.width; j++) {\n        gameField[i][j] = this.state[i][j];\n      }\n    }\n    return gameField;\n  }\n  nextFaze1() {\n    console.log(\"nextFaze1 = Фаза определения ячеек которые должны умереть и которые должны возродится\");\n    let neededModifyCellAndNeighboring = new Set();\n\n    // Ищем ячеки которые необходимо проверить для следующей итерации, добавляем к ним соседние ячейки\n    const neededModifyCell = this.state.map(row => row.filter(column => column.getStatus() === _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING));\n    neededModifyCell.forEach(row => {\n      row.forEach(cell => {\n        console.log(`${cell.x}, ${cell.y}, ${cell.getStatus()}`);\n        neededModifyCellAndNeighboring.add(cell);\n        const neighboringCells = this.getNeighboringCells(cell.x, cell.y);\n        neighboringCells.forEach(e => neededModifyCellAndNeighboring.add(e));\n      });\n    });\n    const newGenerationField = new GameField(this.width, this.height);\n    let nextFieldState = newGenerationField.getState();\n    neededModifyCellAndNeighboring.forEach(cell => {\n      const x = cell.x;\n      const y = cell.y;\n      const neighboringCells = this.getNeighboringCells(x, y);\n\n      // Определяем живые соседние клетки\n      const neighboringCellsLiving = neighboringCells.filter(cell => cell.getStatus() === _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING);\n      if (cell.getStatus() === _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.DEAD && neighboringCellsLiving.length === 3) {\n        this.bornCellsInNextIteration.add(new _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(x, y, _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING));\n        return;\n      }\n      if (cell.getStatus() === _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING && [2, 3].includes(neighboringCellsLiving.length)) {\n        nextFieldState[x][y] = new _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(x, y, _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING);\n        return;\n      }\n      if (cell.getStatus() === _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING && (neighboringCellsLiving.length < 2 || neighboringCellsLiving.length > 3)) {\n        nextFieldState[x][y] = new _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(x, y, _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.MUST_DIE);\n        this.dieCellsInNextIteration.add(new _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(x, y, _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.MUST_DIE));\n        return;\n      }\n    });\n    this.state = nextFieldState;\n    console.log(this.state);\n  }\n  nextFaze2() {\n    console.log(\"nextFaze1\");\n    console.log(this.dieCellsInNextIteration);\n    this.dieCellsInNextIteration.forEach(cell => {\n      this.state[cell.x][cell.y] = new _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(cell.x, cell.y, _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.DEAD);\n    });\n    this.bornCellsInNextIteration.forEach(cell => {\n      this.state[cell.x][cell.y] = new _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(cell.x, cell.y, _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING);\n    });\n    this.bornCellsInNextIteration.clear();\n    this.dieCellsInNextIteration.clear();\n  }\n  setSize(width, height) {\n    const newState = [[]];\n    for (let i = 0; i < height; i++) {\n      newState[i] = [];\n      for (let j = 0; j < width; j++) {\n        newState[i][j] = this.state[i] && this.state[i][j] ? this.state[i][j] : new _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(i, j, _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.DEAD);\n      }\n    }\n    this.width = width;\n    this.height = height;\n    this.state = newState;\n  }\n  toggleCellState(x, y) {\n    if (this.state[y][x].getStatus() === _types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.DEAD) {\n      this.state[y][x].setStatus(_types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.LIVING);\n    } else {\n      this.state[y][x].setStatus(_types_Cell__WEBPACK_IMPORTED_MODULE_0__.Status.DEAD);\n    }\n    console.log(`click cell ${x} ${y}`);\n  }\n\n  /**\n   * Получаем соседние клетки\n   * @param x\n   * @param y\n   */\n  getNeighboringCells(x, y) {\n    const neighboringCells = [];\n    neighboringCells.push(this.getCellValue(x - 1, y));\n    neighboringCells.push(this.getCellValue(x - 1, y + 1));\n    neighboringCells.push(this.getCellValue(x - 1, y - 1));\n    neighboringCells.push(this.getCellValue(x + 1, y));\n    neighboringCells.push(this.getCellValue(x + 1, y + 1));\n    neighboringCells.push(this.getCellValue(x + 1, y - 1));\n    neighboringCells.push(this.getCellValue(x, y + 1));\n    neighboringCells.push(this.getCellValue(x, y - 1));\n    return neighboringCells.filter(e => e != undefined);\n  }\n  getCellValue(x, y) {\n    try {\n      return this.state[x][y];\n    } catch (e) {\n      return undefined;\n    }\n  }\n}\n\n//# sourceURL=webpack://lesson20/./src/GameField.ts?");

/***/ }),

/***/ "./src/GameView.ts":
/*!*************************!*\
  !*** ./src/GameView.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameView: () => (/* binding */ GameView)\n/* harmony export */ });\nclass GameView {\n  constructor(element) {\n    this.element = element;\n  }\n  onFieldSizeChange() {\n    let gameFieldWidth = Number(this.element.querySelector(\"#gameFieldWidth\"));\n    let gameFieldHeight = Number(this.element.querySelector(\"#gameFieldHeight\"));\n  }\n  onGameStateChange(cb) {}\n  updateGameField(field) {\n    let table = this.element.querySelector(\".gameField\");\n    table.remove();\n    table = document.createElement(\"table\");\n    table.classList.add(\"gameField\");\n    for (let i = 0; i < field.length; i++) {\n      let tr = document.createElement(\"tr\");\n      for (let j = 0; j < field[i].length; j++) {\n        tr.appendChild(field[i][j].cellElement);\n      }\n      table.appendChild(tr);\n    }\n    this.element.querySelector(\".grid\").appendChild(table);\n  }\n  onCellClick(cb) {\n    const cells = document.querySelectorAll(\"td\");\n    cells.forEach(cell => {\n      cell.addEventListener(\"click\", () => {\n        let y = cell.closest(\"tr\").rowIndex;\n        let x = cell.cellIndex;\n        this.gameField.toggleCellState(x, y);\n        this.gameView.updateGameField(this.gameField.getState());\n      });\n    });\n  }\n}\n\n//# sourceURL=webpack://lesson20/./src/GameView.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.ts\");\n/* harmony import */ var _GameField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameField */ \"./src/GameField.ts\");\n/* harmony import */ var _GameView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameView */ \"./src/GameView.ts\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\n\n\n\nconst el = document.getElementById(\"app\");\nconst gameView = new _GameView__WEBPACK_IMPORTED_MODULE_2__.GameView(el);\nconst gameField = new _GameField__WEBPACK_IMPORTED_MODULE_1__.GameField(5, 5);\nconst game = new _Game__WEBPACK_IMPORTED_MODULE_0__.Game(gameField, gameView, 1000);\nconsole.log(gameField.getState());\ngameView.updateGameField(gameField.getState());\n\n// document.querySelector(\"button\").addEventListener(\"click\", () => {\n//     game.execute();\n// });\n\n//# sourceURL=webpack://lesson20/./src/index.ts?");

/***/ }),

/***/ "./src/types/Cell.ts":
/*!***************************!*\
  !*** ./src/types/Cell.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Cell: () => (/* binding */ Cell),\n/* harmony export */   Status: () => (/* binding */ Status)\n/* harmony export */ });\nlet Status = /*#__PURE__*/function (Status) {\n  Status[Status[\"DEAD\"] = 0] = \"DEAD\";\n  Status[Status[\"LIVING\"] = 1] = \"LIVING\";\n  Status[Status[\"MUST_DIE\"] = 2] = \"MUST_DIE\";\n  return Status;\n}({});\nclass Cell {\n  constructor(x, y, status, cellElement) {\n    this.x = x;\n    this.y = y;\n    this.status = status;\n    if (cellElement === undefined) {\n      cellElement = this.getDefaultCell(x, y, status);\n    }\n    this.cellElement = cellElement;\n  }\n  getDefaultCell(x, y, status) {\n    const cellElement = document.createElement(\"td\");\n    cellElement.classList.add(\"cell\");\n    cellElement.setAttribute(\"x\", x.toString());\n    cellElement.setAttribute(\"y\", y.toString());\n    cellElement.innerText = `${x},${y}`;\n    switch (status) {\n      case Status.LIVING:\n        cellElement.classList.add(\"cell--alive\");\n        break;\n      case Status.DEAD:\n        cellElement.classList.add(\"cell--dead\");\n        break;\n      case Status.MUST_DIE:\n        cellElement.classList.add(\"cell--must_die\");\n        break;\n    }\n    return cellElement;\n  }\n  getStatus() {\n    return this.status;\n  }\n  setStatus(status) {\n    this.status = status;\n    switch (status) {\n      case Status.LIVING:\n        this.cellElement.classList.remove(\"cell--dead\");\n        this.cellElement.classList.remove(\"cell--must_die\");\n        this.cellElement.classList.add(\"cell--alive\");\n        break;\n      case Status.DEAD:\n        this.cellElement.classList.remove(\"cell--alive\");\n        this.cellElement.classList.remove(\"cell--must_die\");\n        this.cellElement.classList.add(\"cell--dead\");\n        break;\n      case Status.MUST_DIE:\n        this.cellElement.classList.remove(\"cell--alive\");\n        this.cellElement.classList.remove(\"cell--dead\");\n        this.cellElement.classList.add(\"cell--must_die\");\n        break;\n    }\n  }\n}\n\n//# sourceURL=webpack://lesson20/./src/types/Cell.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `body {\n  font-family: sans-serif;\n}\n\ntable {\n  border-collapse: collapse;\n  margin: 30px;\n}\n\n.cell {\n  border: 1px solid lightblue;\n  color: lightgray;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n}\n\n.cell--alive {\n  background-color: black;\n}\n\n.cell--dead {\n  background-color: white;\n}\n\n.cell--must_die {\n  background-color: blue;\n}\n\nmain {\n  display: grid;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://lesson20/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://lesson20/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://lesson20/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://lesson20/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://lesson20/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://lesson20/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://lesson20/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://lesson20/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://lesson20/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://lesson20/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;