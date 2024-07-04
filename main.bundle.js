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

/***/ "./src/addForm.ts":
/*!************************!*\
  !*** ./src/addForm.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addForm: () => (/* binding */ addForm)\n/* harmony export */ });\n/**\nНа странице должны быть три текстовых\n параграфа, поле ввода и кнопка. Напишите скрипт,\n который будет выполнять следующие условия:\n 1.Кнопка скрыта, если в поле ввода нет значения.\n 2.При клике на кнопку добавляется новый параграф,\n содержащий текст из поля ввода.\n 3.*Если параграфов становится больше 4, первый из\n них удаляется. */\n\n/**\n * @param {HTMLElement} el\n */\nfunction addForm(el) {\n  // el = document.createElement('div');\n  const input = document.createElement(\"input\");\n  const button = document.createElement(\"button\");\n  button.innerHTML = \"add\";\n  button.addEventListener(\"click\", () => {\n    const p = document.createElement(\"p\");\n    el.appendChild(p);\n    p.innerHTML = input.value;\n    input.value = \"\";\n    el.removeChild(button);\n    if (el.querySelectorAll(\"p\").length > 4) {\n      el.removeChild(el.querySelectorAll(\"p\")[0]);\n    }\n  });\n  el.appendChild(document.createElement(\"p\"));\n  el.appendChild(document.createElement(\"p\"));\n  el.appendChild(document.createElement(\"p\"));\n  el.appendChild(input);\n  input.addEventListener(\"keyup\", () => {\n    if (input.value !== \"\") {\n      el.appendChild(button);\n    } else {\n      el.removeChild(button);\n    }\n  });\n}\n\n//# sourceURL=webpack://lesson20/./src/addForm.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _addForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addForm */ \"./src/addForm.ts\");\n\nconst rootEl = document.querySelector(\"#app\");\nif (rootEl) {\n  (0,_addForm__WEBPACK_IMPORTED_MODULE_0__.addForm)(rootEl);\n}\n\n//# sourceURL=webpack://lesson20/./src/index.ts?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;