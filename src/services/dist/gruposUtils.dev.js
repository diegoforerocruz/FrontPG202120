"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateGroup = exports.createGroup = exports.getBins = exports.deleteGrupoCluster = exports.deleteGrupo = exports.getGrupos = exports.getGruposCluster = void 0;
var API_URL = "http://localhost:5000/grupos";
var ALL_URL = "".concat(API_URL, "/all");
var CLUSTERALL_URL = "".concat(API_URL, "/clusterall");
var CREATE_URL = "".concat(API_URL, "/create");

var UPDATE_URL = function UPDATE_URL(gID) {
  return "".concat(API_URL, "/update/").concat(gID);
};

var DELETE_URL = function DELETE_URL(gID) {
  return "".concat(API_URL, "/delete/").concat(gID);
};

var DELETE_CLUSTER_URL = function DELETE_CLUSTER_URL(gID) {
  return "".concat(API_URL, "/deletecluster/").concat(gID);
};

var BINS_URL = function BINS_URL(bins, variable, tipo, grupoescogido) {
  return "".concat(API_URL, "/nivel/").concat(bins, "/").concat(variable, "/").concat(tipo, "/").concat(grupoescogido);
};

var getGruposCluster = function getGruposCluster() {
  return regeneratorRuntime.async(function getGruposCluster$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", fetch(CLUSTERALL_URL).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getGruposCluster = getGruposCluster;

var getGrupos = function getGrupos() {
  return regeneratorRuntime.async(function getGrupos$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", fetch(ALL_URL).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getGrupos = getGrupos;

var deleteGrupo = function deleteGrupo(gId) {
  return regeneratorRuntime.async(function deleteGrupo$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", fetch(DELETE_URL(gId), {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(status).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.deleteGrupo = deleteGrupo;

var deleteGrupoCluster = function deleteGrupoCluster(gId) {
  return regeneratorRuntime.async(function deleteGrupoCluster$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", fetch(DELETE_CLUSTER_URL(gId), {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(status).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteGrupoCluster = deleteGrupoCluster;

var getBins = function getBins(bins, variable, tipo, conditions, grupoescogido) {
  return regeneratorRuntime.async(function getBins$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", fetch(BINS_URL(bins, variable, tipo, grupoescogido), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(conditions)
          }).then(status).then(function (res) {
            return res.json();
          })["catch"](function (error) {
            console.log("Error", error);
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getBins = getBins;

var createGroup = function createGroup(conditions) {
  return regeneratorRuntime.async(function createGroup$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", fetch(CREATE_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(conditions)
          }).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.createGroup = createGroup;

var updateGroup = function updateGroup(id, body) {
  return regeneratorRuntime.async(function updateGroup$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", fetch(UPDATE_URL(id), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          }).then(function (res) {
            return res.json();
          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.updateGroup = updateGroup;

function status(response) {
  if (response.ok) {
    return response;
  }

  return response.json().then(function (res) {
    return Promise.reject(res);
  });
}