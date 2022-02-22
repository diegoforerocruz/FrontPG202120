"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getVariables = void 0;
var API_URL = "https://pgkmc.herokuapp.com/variables";
var ALL_URL = "".concat(API_URL, "/all");

var getVariables = function getVariables() {
  return regeneratorRuntime.async(function getVariables$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          return _context.abrupt(
            "return",
            fetch(ALL_URL).then(function (res) {
              return res.json();
            })
          );

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getVariables = getVariables;
