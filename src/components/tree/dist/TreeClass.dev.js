"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TreeClass =
/*#__PURE__*/
function () {
  function TreeClass(root) {
    _classCallCheck(this, TreeClass);

    this.root = root;
  }

  _createClass(TreeClass, [{
    key: "getRoot",
    value: function getRoot() {
      return this.root;
    }
  }, {
    key: "getTipo",
    value: function getTipo() {
      return this.root.tipo_arbol;
    }
  }, {
    key: "findChildren",
    //encuentra el primer nodo que cumpla la condición
    value: function findChildren(node, condition, action) {
      if (condition(node)) {
        action(node);
        return node;
      } else if (node.children === null) return null;else if (node.children.length <= 0) return null;else {
        var lista = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var c = _step.value;
            lista.push(this.findChildren(c, condition, action));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var v = lista.find(function (d) {
          return d !== null;
        });
        return v;
      }
    }
  }, {
    key: "addChildren",
    value: function addChildren(node, children) {
      this.findChildren(this.root, function (d) {
        return d.uid === node.uid;
      }, function (n) {
        n.children = children;
      });
    }
  }, {
    key: "hideChildren",
    value: function hideChildren(node) {
      this.findChildren(this.root, function (d) {
        return d.uid === node.uid;
      }, function (n) {
        if (n.children) {
          n.oculto = true;
          var temp = n.children;
          n._children = temp;
          n.children = null;
        } else {
          n.oculto = false;
          var _temp = n._children;
          n.children = _temp;
          n._children = null;
        }
      });
    }
  }, {
    key: "cleanTree",
    value: function cleanTree(node) {
      if (node === null) {
        return;
      } else if (node.children === null || node.children.length === 0) {
        return;
      } else {
        node.children = node.children.filter(function (d) {
          return d.uid !== "delete";
        });
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = node.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var child = _step2.value;
            this.cleanTree(child);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }, {
    key: "deleteNode",
    value: function deleteNode(node) {
      this.findChildren(this.root, function (d) {
        return d.uid === node.uid;
      }, function (n) {
        n.uid = "delete";
      });
      this.cleanTree(this.root);
    } //devuelve los nodos en un nivel

  }, {
    key: "getNodesInLevel",
    value: function getNodesInLevel(fase, node) {
      var rta = [];

      if (node.fase === fase) {
        rta.push(node);
      }

      if (node.children !== null && node.children !== undefined && node.children.length > 0) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = node.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var n = _step3.value;
            var temprta = this.getNodesInLevel(fase, n);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = temprta[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var item = _step4.value;
                rta.push(item);
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }

      return rta;
    }
  }]);

  return TreeClass;
}();

;
var _default = TreeClass;
exports["default"] = _default;