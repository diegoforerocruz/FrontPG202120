"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVariable = exports.updateVariable = exports.deleteVariable = exports.getVariables = void 0;
var API_URL = "http://localhost:5000/variables";
var ALL_URL = "".concat(API_URL, "/all");

var DELETE_URL = function DELETE_URL(gId) {
  return "".concat(API_URL, "/delete/").concat(gId);
};

var UPDATE_URL = function UPDATE_URL(nombre_variable) {
  return "".concat(API_URL, "/update/").concat(nombre_variable);
};

var CREATE_URL = "".concat(API_URL, "/create");

var getVariables = function getVariables() {
  return regeneratorRuntime.async(function getVariables$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", fetch(ALL_URL).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getVariables = getVariables;

var deleteVariable = function deleteVariable(gId) {
  return regeneratorRuntime.async(function deleteVariable$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", fetch(DELETE_URL(gId), {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(status).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.deleteVariable = deleteVariable;

var updateVariable = function updateVariable(name, body) {
  return regeneratorRuntime.async(function updateVariable$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", fetch(UPDATE_URL(name), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          }).then(status).then(function (res) {
            return res.json();
          })["catch"](function (error) {
            return error;
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updateVariable = updateVariable;

var createVariable = function createVariable(body) {
  return regeneratorRuntime.async(function createVariable$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", fetch(CREATE_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          }).then(status).then(function (res) {
            return res.json();
          })["catch"](function (error) {
            return error;
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.createVariable = createVariable;

function status(response) {
  if (response.ok) {
    return response;
  }

  return response.json().then(function (res) {
    return Promise.reject(res);
  });
}