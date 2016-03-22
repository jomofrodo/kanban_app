webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(162);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _App = __webpack_require__(163);

	var _App2 = _interopRequireDefault(_App);

	var _alt = __webpack_require__(167);

	var _alt2 = _interopRequireDefault(_alt);

	var _storage = __webpack_require__(205);

	var _storage2 = _interopRequireDefault(_storage);

	var _persist = __webpack_require__(206);

	var _persist2 = _interopRequireDefault(_persist);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _persist2.default)(_alt2.default, _storage2.default, 'app');

	_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('app'));

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./main.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./main.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\r\n  background:   #8BA58E;\r\n  font-family: sans-serif;\r\n  \r\n}\r\n\r\n.add-note {\r\n  background-color: #fdfdfd;\r\n  border: 1px solid #ccc;\r\n}\r\n\r\n.notes {\r\n  margin: 0.5em;\r\n  padding-left: 0;\r\n\r\n  max-width: 10em;\r\n  list-style: none;\r\n}\r\n\r\n.note {\r\n  margin-bottom: 0.5em;\r\n  padding: 0.5em;\r\n\r\n  background-color: #fdfdfd;\r\n  box-shadow: 0 0 0.3em 0.03em rgba(0, 0, 0, 0.3);\r\n}\r\n.note:hover {\r\n  box-shadow: 0 0 0.3em 0.03em rgba(0, 0, 0, 0.7);\r\n\r\n  transition: 0.6s;\r\n}\r\n\r\n.note .task {\r\n  /* force to use inline-block so that it gets minimum height */\r\n  display: inline-block;\r\n}\r\n\r\nbutton{\r\n\tbackground-color: #C0C0C0;\r\n\tmargin:5px;\r\n}\r\n\r\n.note .delete-note {\r\n  float: right;\r\n\r\n  padding: 0;\r\n\r\n  background-color: #fdfdfd;\r\n  border: none;\r\n\r\n  cursor: pointer;\r\n\r\n  visibility: hidden;\r\n}\r\n.note:hover .delete-note {\r\n  visibility: visible;\r\n}", ""]);

	// exports


/***/ },

/***/ 3:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Notes = __webpack_require__(164);

	var _Notes2 = _interopRequireDefault(_Notes);

	var _NoteActions = __webpack_require__(166);

	var _NoteActions2 = _interopRequireDefault(_NoteActions);

	var _NoteStore = __webpack_require__(181);

	var _NoteStore2 = _interopRequireDefault(_NoteStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	    _this.storeChanged = function (state) {
	      // Without a property initializer `this` wouldn't
	      // point at the right context because it defaults to
	      // `undefined` in strict mode.
	      _this.setState(state);
	    };

	    _this.state = _NoteStore2.default.getState();

	    return _this;
	  }

	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _NoteStore2.default.listen(this.storeChanged);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      _NoteStore2.default.unlisten(this.storeChanged);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var notes = this.state.notes;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'button',
	          { className: 'add-note', onClick: this.addNote },
	          '+'
	        ),
	        _react2.default.createElement(_Notes2.default, { notes: notes,
	          onEdit: this.editNote,
	          onDelete: this.deleteNote })
	      );
	    }
	  }, {
	    key: 'deleteNote',
	    value: function deleteNote(id, e) {
	      e.stopPropagation();
	      _NoteActions2.default.delete(id);
	    }
	  }, {
	    key: 'addNote',
	    value: function addNote() {
	      _NoteActions2.default.create({ task: 'New task' });
	    }
	  }, {
	    key: 'editNote',
	    value: function editNote(id, task) {
	      if (!task.trim()) return;
	      _NoteActions2.default.update({ id: id, task: task });
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	exports.default = App;

/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _Note = __webpack_require__(165);

	var _Note2 = _interopRequireDefault(_Note);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref) {
	  var notes = _ref.notes;
	  var onEdit = _ref.onEdit;
	  var onDelete = _ref.onDelete;

	  return _react2.default.createElement(
	    'ul',
	    { className: 'notes' },
	    notes.map(function (note) {
	      return _react2.default.createElement(
	        'li',
	        { className: 'note', key: note.id },
	        _react2.default.createElement(_Note2.default, {
	          task: note.task,
	          onEdit: onEdit.bind(null, note.id),
	          onDelete: onDelete.bind(null, note.id) })
	      );
	    })
	  );
	};

/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Note = function (_React$Component) {
	  _inherits(Note, _React$Component);

	  function Note(props) {
	    _classCallCheck(this, Note);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Note).call(this, props));

	    _this.renderEdit = function () {
	      return _react2.default.createElement("input", { type: "text",
	        ref: function ref(e) {
	          return e ? e.selectionStart = _this.props.task.length : null;
	        },
	        autoFocus: true,
	        defaultValue: _this.props.task,
	        onBlur: _this.finishEdit,
	        onKeyPress: _this.checkEnter });
	    };

	    _this.renderDelete = function () {
	      return _react2.default.createElement(
	        "button",
	        {
	          className: "delete-note",
	          onClick: _this.props.onDelete },
	        "x"
	      );
	    };

	    _this.renderNote = function () {
	      var onDelete = _this.props.onDelete;

	      return _react2.default.createElement(
	        "div",
	        { onClick: _this.edit },
	        _react2.default.createElement(
	          "span",
	          { className: "task" },
	          _this.props.task
	        ),
	        onDelete ? _this.renderDelete() : null
	      );
	    };

	    _this.edit = function () {
	      _this.setState({
	        editing: true
	      });
	    };

	    _this.checkEnter = function (e) {
	      if (e.key === 'Enter') {
	        _this.finishEdit(e);
	      }
	    };

	    _this.finishEdit = function (e) {
	      var value = e.target.value;

	      if (_this.props.onEdit) {
	        _this.props.onEdit(value);

	        // Exit edit mode.
	        _this.setState({
	          editing: false
	        });
	      }
	    };

	    _this.state = {
	      editing: false
	    };
	    return _this;
	  }

	  _createClass(Note, [{
	    key: "render",
	    value: function render() {
	      if (this.state.editing) {
	        return this.renderEdit();
	      } else {
	        return this.renderNote();
	      }
	    }
	  }]);

	  return Note;
	}(_react2.default.Component);

	exports.default = Note;

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(167);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _alt2.default.generateActions('create', 'update', 'delete');

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alt = __webpack_require__(168);

	var _alt2 = _interopRequireDefault(_alt);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import chromeDebug from 'alt-utils/lib/chromeDebug';

	var alt = new _alt2.default();
	//chromeDebug(alt);

	exports.default = alt;

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _nodeUuid = __webpack_require__(182);

	var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

	var _alt = __webpack_require__(167);

	var _alt2 = _interopRequireDefault(_alt);

	var _NoteActions = __webpack_require__(166);

	var _NoteActions2 = _interopRequireDefault(_NoteActions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NoteStore = function () {
		function NoteStore() {
			_classCallCheck(this, NoteStore);

			this.bindActions(_NoteActions2.default);

			this.notes = [];
		}

		_createClass(NoteStore, [{
			key: 'create',
			value: function create(note) {
				var notes = this.notes;

				note.id = _nodeUuid2.default.v4();

				this.setState({
					notes: notes.concat(note)
				});
			}
		}, {
			key: 'update',
			value: function update(updatedNote) {
				var newNotes = this.notes.map(function (note) {
					if (note.id === updatedNote.id) {
						// Object.assign is used to patch the note data here. It
						// mutates target (first parameter). In order to avoid that,
						// I use {} as its target and apply data on it.
						//
						// Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
						//
						// You can pass as many objects to the method as you want.
						return _extends({}, note, updatedNote);
					}

					return note;
				});

				// This is same as `this.setState({notes: notes})`
				this.setState({ notes: newNotes });
			}
		}, {
			key: 'delete',
			value: function _delete(id) {
				this.setState({
					notes: this.notes.filter(function (note) {
						return note.id !== id;
					})
				});
			}
		}]);

		return NoteStore;
	}();

	exports.default = _alt2.default.createStore(NoteStore, 'NoteStore');

/***/ },

/***/ 205:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  get: function get(k) {
	    try {
	      return JSON.parse(localStorage.getItem(k));
	    } catch (e) {
	      return null;
	    }
	  },
	  set: function set(k, v) {
	    localStorage.setItem(k, JSON.stringify(v));
	  }
	};

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (alt, storage, storeName) {
	  var finalStore = (0, _makeFinalStore2.default)(alt);

	  try {
	    alt.bootstrap(storage.get(storeName));
	  } catch (e) {
	    console.error('Failed to bootstrap data', e);
	  }

	  finalStore.listen(function () {
	    if (!storage.get('debug')) {
	      storage.set(storeName, alt.takeSnapshot());
	    }
	  });
	};

	var _makeFinalStore = __webpack_require__(207);

	var _makeFinalStore2 = _interopRequireDefault(_makeFinalStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },

/***/ 207:
/***/ function(module, exports) {

	/**
	 * makeFinalStore(alt: AltInstance): AltStore
	 *
	 * > Creates a `FinalStore` which is a store like any other except that it
	 * waits for all other stores in your alt instance to emit a change before it
	 * emits a change itself.
	 *
	 * Want to know when a particular dispatch has completed? This is the util
	 * you want.
	 *
	 * Good for: taking a snapshot and persisting it somewhere, saving data from
	 * a set of stores, syncing data, etc.
	 *
	 * Usage:
	 *
	 * ```js
	 * var FinalStore = makeFinalStore(alt);
	 *
	 * FinalStore.listen(function () {
	 *   // all stores have now changed
	 * });
	 * ```
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = makeFinalStore;
	function FinalStore() {
	  var _this = this;

	  this.dispatcher.register(function (payload) {
	    var stores = Object.keys(_this.alt.stores).reduce(function (arr, store) {
	      arr.push(_this.alt.stores[store].dispatchToken);
	      return arr;
	    }, []);

	    _this.waitFor(stores);
	    _this.setState({ payload: payload });
	    _this.emitChange();
	  });
	}

	function makeFinalStore(alt) {
	  return alt.FinalStore ? alt.FinalStore : alt.FinalStore = alt.createUnsavedStore(FinalStore);
	}

	module.exports = exports["default"];

/***/ }

});