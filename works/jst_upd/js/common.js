(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Draggable = void 0;
var _matrix = require("./utils/matrix.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/*!
 * Draggable 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

/* eslint-disable */
var gsap,
  _win,
  _doc,
  _docElement,
  _body,
  _tempDiv,
  _placeholderDiv,
  _coreInitted,
  _checkPrefix,
  _toArray,
  _supportsPassive,
  _isTouchDevice,
  _touchEventLookup,
  _isMultiTouching,
  _isAndroid,
  InertiaPlugin,
  _defaultCursor,
  _supportsPointer,
  _context,
  _getStyleSaver,
  _dragCount = 0,
  _windowExists = function _windowExists() {
    return typeof window !== "undefined";
  },
  _getGSAP = function _getGSAP() {
    return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
  },
  _isFunction = function _isFunction(value) {
    return typeof value === "function";
  },
  _isObject = function _isObject(value) {
    return _typeof(value) === "object";
  },
  _isUndefined = function _isUndefined(value) {
    return typeof value === "undefined";
  },
  _emptyFunc = function _emptyFunc() {
    return false;
  },
  _transformProp = "transform",
  _transformOriginProp = "transformOrigin",
  _round = function _round(value) {
    return Math.round(value * 10000) / 10000;
  },
  _isArray = Array.isArray,
  _createElement = function _createElement(type, ns) {
    var e = _doc.createElementNS ? _doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

    return e.style ? e : _doc.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
  },
  _RAD2DEG = 180 / Math.PI,
  _bigNum = 1e20,
  _identityMatrix = new _matrix.Matrix2D(),
  _getTime = Date.now || function () {
    return new Date().getTime();
  },
  _renderQueue = [],
  _lookup = {},
  //when a Draggable is created, the target gets a unique _gsDragID property that allows gets associated with the Draggable instance for quick lookups in Draggable.get(). This avoids circular references that could cause gc problems.
  _lookupCount = 0,
  _clickableTagExp = /^(?:a|input|textarea|button|select)$/i,
  _lastDragTime = 0,
  _temp1 = {},
  // a simple object we reuse and populate (usually x/y properties) to conserve memory and improve performance.
  _windowProxy = {},
  //memory/performance optimization - we reuse this object during autoScroll to store window-related bounds/offsets.
  _copy = function _copy(obj, factor) {
    var copy = {},
      p;
    for (p in obj) {
      copy[p] = factor ? obj[p] * factor : obj[p];
    }
    return copy;
  },
  _extend = function _extend(obj, defaults) {
    for (var p in defaults) {
      if (!(p in obj)) {
        obj[p] = defaults[p];
      }
    }
    return obj;
  },
  _setTouchActionForAllDescendants = function _setTouchActionForAllDescendants(elements, value) {
    var i = elements.length,
      children;
    while (i--) {
      value ? elements[i].style.touchAction = value : elements[i].style.removeProperty("touch-action");
      children = elements[i].children;
      children && children.length && _setTouchActionForAllDescendants(children, value);
    }
  },
  _renderQueueTick = function _renderQueueTick() {
    return _renderQueue.forEach(function (func) {
      return func();
    });
  },
  _addToRenderQueue = function _addToRenderQueue(func) {
    _renderQueue.push(func);
    if (_renderQueue.length === 1) {
      gsap.ticker.add(_renderQueueTick);
    }
  },
  _renderQueueTimeout = function _renderQueueTimeout() {
    return !_renderQueue.length && gsap.ticker.remove(_renderQueueTick);
  },
  _removeFromRenderQueue = function _removeFromRenderQueue(func) {
    var i = _renderQueue.length;
    while (i--) {
      if (_renderQueue[i] === func) {
        _renderQueue.splice(i, 1);
      }
    }
    gsap.to(_renderQueueTimeout, {
      overwrite: true,
      delay: 15,
      duration: 0,
      onComplete: _renderQueueTimeout,
      data: "_draggable"
    }); //remove the "tick" listener only after the render queue is empty for 15 seconds (to improve performance). Adding/removing it constantly for every click/touch wouldn't deliver optimal speed, and we also don't want the ticker to keep calling the render method when things are idle for long periods of time (we want to improve battery life on mobile devices).
  },
  _setDefaults = function _setDefaults(obj, defaults) {
    for (var p in defaults) {
      if (!(p in obj)) {
        obj[p] = defaults[p];
      }
    }
    return obj;
  },
  _addListener = function _addListener(element, type, func, capture) {
    if (element.addEventListener) {
      var touchType = _touchEventLookup[type];
      capture = capture || (_supportsPassive ? {
        passive: false
      } : null);
      element.addEventListener(touchType || type, func, capture);
      touchType && type !== touchType && element.addEventListener(type, func, capture); //some browsers actually support both, so must we. But pointer events cover all.
    }
  },
  _removeListener = function _removeListener(element, type, func, capture) {
    if (element.removeEventListener) {
      var touchType = _touchEventLookup[type];
      element.removeEventListener(touchType || type, func, capture);
      touchType && type !== touchType && element.removeEventListener(type, func, capture);
    }
  },
  _preventDefault = function _preventDefault(event) {
    event.preventDefault && event.preventDefault();
    event.preventManipulation && event.preventManipulation(); //for some Microsoft browsers
  },
  _hasTouchID = function _hasTouchID(list, ID) {
    var i = list.length;
    while (i--) {
      if (list[i].identifier === ID) {
        return true;
      }
    }
  },
  _onMultiTouchDocumentEnd = function _onMultiTouchDocumentEnd(event) {
    _isMultiTouching = event.touches && _dragCount < event.touches.length;
    _removeListener(event.target, "touchend", _onMultiTouchDocumentEnd);
  },
  _onMultiTouchDocument = function _onMultiTouchDocument(event) {
    _isMultiTouching = event.touches && _dragCount < event.touches.length;
    _addListener(event.target, "touchend", _onMultiTouchDocumentEnd);
  },
  _getDocScrollTop = function _getDocScrollTop(doc) {
    return _win.pageYOffset || doc.scrollTop || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
  },
  _getDocScrollLeft = function _getDocScrollLeft(doc) {
    return _win.pageXOffset || doc.scrollLeft || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
  },
  _addScrollListener = function _addScrollListener(e, callback) {
    _addListener(e, "scroll", callback);
    if (!_isRoot(e.parentNode)) {
      _addScrollListener(e.parentNode, callback);
    }
  },
  _removeScrollListener = function _removeScrollListener(e, callback) {
    _removeListener(e, "scroll", callback);
    if (!_isRoot(e.parentNode)) {
      _removeScrollListener(e.parentNode, callback);
    }
  },
  _isRoot = function _isRoot(e) {
    return !!(!e || e === _docElement || e.nodeType === 9 || e === _doc.body || e === _win || !e.nodeType || !e.parentNode);
  },
  _getMaxScroll = function _getMaxScroll(element, axis) {
    var dim = axis === "x" ? "Width" : "Height",
      scroll = "scroll" + dim,
      client = "client" + dim;
    return Math.max(0, _isRoot(element) ? Math.max(_docElement[scroll], _body[scroll]) - (_win["inner" + dim] || _docElement[client] || _body[client]) : element[scroll] - element[client]);
  },
  _recordMaxScrolls = function _recordMaxScrolls(e, skipCurrent) {
    //records _gsMaxScrollX and _gsMaxScrollY properties for the element and all ancestors up the chain so that we can cap it, otherwise dragging beyond the edges with autoScroll on can endlessly scroll.
    var x = _getMaxScroll(e, "x"),
      y = _getMaxScroll(e, "y");
    if (_isRoot(e)) {
      e = _windowProxy;
    } else {
      _recordMaxScrolls(e.parentNode, skipCurrent);
    }
    e._gsMaxScrollX = x;
    e._gsMaxScrollY = y;
    if (!skipCurrent) {
      e._gsScrollX = e.scrollLeft || 0;
      e._gsScrollY = e.scrollTop || 0;
    }
  },
  _setStyle = function _setStyle(element, property, value) {
    var style = element.style;
    if (!style) {
      return;
    }
    if (_isUndefined(style[property])) {
      property = _checkPrefix(property, element) || property;
    }
    if (value == null) {
      style.removeProperty && style.removeProperty(property.replace(/([A-Z])/g, "-$1").toLowerCase());
    } else {
      style[property] = value;
    }
  },
  _getComputedStyle = function _getComputedStyle(element) {
    return _win.getComputedStyle(element instanceof Element ? element : element.host || (element.parentNode || {}).host || element);
  },
  //the "host" stuff helps to accommodate ShadowDom objects.
  _tempRect = {},
  //reuse to reduce garbage collection tasks
  _parseRect = function _parseRect(e) {
    //accepts a DOM element, a mouse event, or a rectangle object and returns the corresponding rectangle with left, right, width, height, top, and bottom properties
    if (e === _win) {
      _tempRect.left = _tempRect.top = 0;
      _tempRect.width = _tempRect.right = _docElement.clientWidth || e.innerWidth || _body.clientWidth || 0;
      _tempRect.height = _tempRect.bottom = (e.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : e.innerHeight || _body.clientHeight || 0;
      return _tempRect;
    }
    var doc = e.ownerDocument || _doc,
      r = !_isUndefined(e.pageX) ? {
        left: e.pageX - _getDocScrollLeft(doc),
        top: e.pageY - _getDocScrollTop(doc),
        right: e.pageX - _getDocScrollLeft(doc) + 1,
        bottom: e.pageY - _getDocScrollTop(doc) + 1
      } : !e.nodeType && !_isUndefined(e.left) && !_isUndefined(e.top) ? e : _toArray(e)[0].getBoundingClientRect();
    if (_isUndefined(r.right) && !_isUndefined(r.width)) {
      r.right = r.left + r.width;
      r.bottom = r.top + r.height;
    } else if (_isUndefined(r.width)) {
      //some browsers don't include width and height properties. We can't just set them directly on r because some browsers throw errors, so create a new generic object.
      r = {
        width: r.right - r.left,
        height: r.bottom - r.top,
        right: r.right,
        left: r.left,
        bottom: r.bottom,
        top: r.top
      };
    }
    return r;
  },
  _dispatchEvent = function _dispatchEvent(target, type, callbackName) {
    var vars = target.vars,
      callback = vars[callbackName],
      listeners = target._listeners[type],
      result;
    if (_isFunction(callback)) {
      result = callback.apply(vars.callbackScope || target, vars[callbackName + "Params"] || [target.pointerEvent]);
    }
    if (listeners && target.dispatchEvent(type) === false) {
      result = false;
    }
    return result;
  },
  _getBounds = function _getBounds(target, context) {
    //accepts any of the following: a DOM element, jQuery object, selector text, or an object defining bounds as {top, left, width, height} or {minX, maxX, minY, maxY}. Returns an object with left, top, width, and height properties.
    var e = _toArray(target)[0],
      top,
      left,
      offset;
    if (!e.nodeType && e !== _win) {
      if (!_isUndefined(target.left)) {
        offset = {
          x: 0,
          y: 0
        }; //_getOffsetTransformOrigin(context); //the bounds should be relative to the origin

        return {
          left: target.left - offset.x,
          top: target.top - offset.y,
          width: target.width,
          height: target.height
        };
      }
      left = target.min || target.minX || target.minRotation || 0;
      top = target.min || target.minY || 0;
      return {
        left: left,
        top: top,
        width: (target.max || target.maxX || target.maxRotation || 0) - left,
        height: (target.max || target.maxY || 0) - top
      };
    }
    return _getElementBounds(e, context);
  },
  _point1 = {},
  //we reuse to minimize garbage collection tasks.
  _getElementBounds = function _getElementBounds(element, context) {
    context = _toArray(context)[0];
    var isSVG = element.getBBox && element.ownerSVGElement,
      doc = element.ownerDocument || _doc,
      left,
      right,
      top,
      bottom,
      matrix,
      p1,
      p2,
      p3,
      p4,
      bbox,
      width,
      height,
      cs;
    if (element === _win) {
      top = _getDocScrollTop(doc);
      left = _getDocScrollLeft(doc);
      right = left + (doc.documentElement.clientWidth || element.innerWidth || doc.body.clientWidth || 0);
      bottom = top + ((element.innerHeight || 0) - 20 < doc.documentElement.clientHeight ? doc.documentElement.clientHeight : element.innerHeight || doc.body.clientHeight || 0); //some browsers (like Firefox) ignore absolutely positioned elements, and collapse the height of the documentElement, so it could be 8px, for example, if you have just an absolutely positioned div. In that case, we use the innerHeight to resolve this.
    } else if (context === _win || _isUndefined(context)) {
      return element.getBoundingClientRect();
    } else {
      left = top = 0;
      if (isSVG) {
        bbox = element.getBBox();
        width = bbox.width;
        height = bbox.height;
      } else {
        if (element.viewBox && (bbox = element.viewBox.baseVal)) {
          left = bbox.x || 0;
          top = bbox.y || 0;
          width = bbox.width;
          height = bbox.height;
        }
        if (!width) {
          cs = _getComputedStyle(element);
          bbox = cs.boxSizing === "border-box";
          width = (parseFloat(cs.width) || element.clientWidth || 0) + (bbox ? 0 : parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth));
          height = (parseFloat(cs.height) || element.clientHeight || 0) + (bbox ? 0 : parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth));
        }
      }
      right = width;
      bottom = height;
    }
    if (element === context) {
      return {
        left: left,
        top: top,
        width: right - left,
        height: bottom - top
      };
    }
    matrix = (0, _matrix.getGlobalMatrix)(context, true).multiply((0, _matrix.getGlobalMatrix)(element));
    p1 = matrix.apply({
      x: left,
      y: top
    });
    p2 = matrix.apply({
      x: right,
      y: top
    });
    p3 = matrix.apply({
      x: right,
      y: bottom
    });
    p4 = matrix.apply({
      x: left,
      y: bottom
    });
    left = Math.min(p1.x, p2.x, p3.x, p4.x);
    top = Math.min(p1.y, p2.y, p3.y, p4.y);
    return {
      left: left,
      top: top,
      width: Math.max(p1.x, p2.x, p3.x, p4.x) - left,
      height: Math.max(p1.y, p2.y, p3.y, p4.y) - top
    };
  },
  _parseInertia = function _parseInertia(draggable, snap, max, min, factor, forceZeroVelocity) {
    var vars = {},
      a,
      i,
      l;
    if (snap) {
      if (factor !== 1 && snap instanceof Array) {
        //some data must be altered to make sense, like if the user passes in an array of rotational values in degrees, we must convert it to radians. Or for scrollLeft and scrollTop, we invert the values.
        vars.end = a = [];
        l = snap.length;
        if (_isObject(snap[0])) {
          //if the array is populated with objects, like points ({x:100, y:200}), make copies before multiplying by the factor, otherwise we'll mess up the originals and the user may reuse it elsewhere.
          for (i = 0; i < l; i++) {
            a[i] = _copy(snap[i], factor);
          }
        } else {
          for (i = 0; i < l; i++) {
            a[i] = snap[i] * factor;
          }
        }
        max += 1.1; //allow 1.1 pixels of wiggle room when snapping in order to work around some browser inconsistencies in the way bounds are reported which can make them roughly a pixel off. For example, if "snap:[-$('#menu').width(), 0]" was defined and #menu had a wrapper that was used as the bounds, some browsers would be one pixel off, making the minimum -752 for example when snap was [-753,0], thus instead of snapping to -753, it would snap to 0 since -753 was below the minimum.

        min -= 1.1;
      } else if (_isFunction(snap)) {
        vars.end = function (value) {
          var result = snap.call(draggable, value),
            copy,
            p;
          if (factor !== 1) {
            if (_isObject(result)) {
              copy = {};
              for (p in result) {
                copy[p] = result[p] * factor;
              }
              result = copy;
            } else {
              result *= factor;
            }
          }
          return result; //we need to ensure that we can scope the function call to the Draggable instance itself so that users can access important values like maxX, minX, maxY, minY, x, and y from within that function.
        };
      } else {
        vars.end = snap;
      }
    }
    if (max || max === 0) {
      vars.max = max;
    }
    if (min || min === 0) {
      vars.min = min;
    }
    if (forceZeroVelocity) {
      vars.velocity = 0;
    }
    return vars;
  },
  _isClickable = function _isClickable(element) {
    //sometimes it's convenient to mark an element as clickable by adding a data-clickable="true" attribute (in which case we won't preventDefault() the mouse/touch event). This method checks if the element is an <a>, <input>, or <button> or has an onclick or has the data-clickable or contentEditable attribute set to true (or any of its parent elements).
    var data;
    return !element || !element.getAttribute || element === _body ? false : (data = element.getAttribute("data-clickable")) === "true" || data !== "false" && (element.onclick || _clickableTagExp.test(element.nodeName + "") || element.getAttribute("contentEditable") === "true") ? true : _isClickable(element.parentNode);
  },
  _setSelectable = function _setSelectable(elements, selectable) {
    var i = elements.length,
      e;
    while (i--) {
      e = elements[i];
      e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc;
      gsap.set(e, {
        lazy: true,
        userSelect: selectable ? "text" : "none"
      });
    }
  },
  _isFixed = function _isFixed(element) {
    if (_getComputedStyle(element).position === "fixed") {
      return true;
    }
    element = element.parentNode;
    if (element && element.nodeType === 1) {
      // avoid document fragments which will throw an error.
      return _isFixed(element);
    }
  },
  _supports3D,
  _addPaddingBR,
  //The ScrollProxy class wraps an element's contents into another div (we call it "content") that we either add padding when necessary or apply a translate3d() transform in order to overscroll (scroll past the boundaries). This allows us to simply set the scrollTop/scrollLeft (or top/left for easier reverse-axis orientation, which is what we do in Draggable) and it'll do all the work for us. For example, if we tried setting scrollTop to -100 on a normal DOM element, it wouldn't work - it'd look the same as setting it to 0, but if we set scrollTop of a ScrollProxy to -100, it'll give the correct appearance by either setting paddingTop of the wrapper to 100 or applying a 100-pixel translateY.
  ScrollProxy = function ScrollProxy(element, vars) {
    element = gsap.utils.toArray(element)[0];
    vars = vars || {};
    var content = document.createElement("div"),
      style = content.style,
      node = element.firstChild,
      offsetTop = 0,
      offsetLeft = 0,
      prevTop = element.scrollTop,
      prevLeft = element.scrollLeft,
      scrollWidth = element.scrollWidth,
      scrollHeight = element.scrollHeight,
      extraPadRight = 0,
      maxLeft = 0,
      maxTop = 0,
      elementWidth,
      elementHeight,
      contentHeight,
      nextNode,
      transformStart,
      transformEnd;
    if (_supports3D && vars.force3D !== false) {
      transformStart = "translate3d(";
      transformEnd = "px,0px)";
    } else if (_transformProp) {
      transformStart = "translate(";
      transformEnd = "px)";
    }
    this.scrollTop = function (value, force) {
      if (!arguments.length) {
        return -this.top();
      }
      this.top(-value, force);
    };
    this.scrollLeft = function (value, force) {
      if (!arguments.length) {
        return -this.left();
      }
      this.left(-value, force);
    };
    this.left = function (value, force) {
      if (!arguments.length) {
        return -(element.scrollLeft + offsetLeft);
      }
      var dif = element.scrollLeft - prevLeft,
        oldOffset = offsetLeft;
      if ((dif > 2 || dif < -2) && !force) {
        //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
        prevLeft = element.scrollLeft;
        gsap.killTweensOf(this, {
          left: 1,
          scrollLeft: 1
        });
        this.left(-prevLeft);
        if (vars.onKill) {
          vars.onKill();
        }
        return;
      }
      value = -value; //invert because scrolling works in the opposite direction

      if (value < 0) {
        offsetLeft = value - 0.5 | 0;
        value = 0;
      } else if (value > maxLeft) {
        offsetLeft = value - maxLeft | 0;
        value = maxLeft;
      } else {
        offsetLeft = 0;
      }
      if (offsetLeft || oldOffset) {
        if (!this._skip) {
          style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
        }
        if (offsetLeft + extraPadRight >= 0) {
          style.paddingRight = offsetLeft + extraPadRight + "px";
        }
      }
      element.scrollLeft = value | 0;
      prevLeft = element.scrollLeft; //don't merge this with the line above because some browsers adjust the scrollLeft after it's set, so in order to be 100% accurate in tracking it, we need to ask the browser to report it.
    };

    this.top = function (value, force) {
      if (!arguments.length) {
        return -(element.scrollTop + offsetTop);
      }
      var dif = element.scrollTop - prevTop,
        oldOffset = offsetTop;
      if ((dif > 2 || dif < -2) && !force) {
        //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
        prevTop = element.scrollTop;
        gsap.killTweensOf(this, {
          top: 1,
          scrollTop: 1
        });
        this.top(-prevTop);
        if (vars.onKill) {
          vars.onKill();
        }
        return;
      }
      value = -value; //invert because scrolling works in the opposite direction

      if (value < 0) {
        offsetTop = value - 0.5 | 0;
        value = 0;
      } else if (value > maxTop) {
        offsetTop = value - maxTop | 0;
        value = maxTop;
      } else {
        offsetTop = 0;
      }
      if (offsetTop || oldOffset) {
        if (!this._skip) {
          style[_transformProp] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
        }
      }
      element.scrollTop = value | 0;
      prevTop = element.scrollTop;
    };
    this.maxScrollTop = function () {
      return maxTop;
    };
    this.maxScrollLeft = function () {
      return maxLeft;
    };
    this.disable = function () {
      node = content.firstChild;
      while (node) {
        nextNode = node.nextSibling;
        element.appendChild(node);
        node = nextNode;
      }
      if (element === content.parentNode) {
        //in case disable() is called when it's already disabled.
        element.removeChild(content);
      }
    };
    this.enable = function () {
      node = element.firstChild;
      if (node === content) {
        return;
      }
      while (node) {
        nextNode = node.nextSibling;
        content.appendChild(node);
        node = nextNode;
      }
      element.appendChild(content);
      this.calibrate();
    };
    this.calibrate = function (force) {
      var widthMatches = element.clientWidth === elementWidth,
        cs,
        x,
        y;
      prevTop = element.scrollTop;
      prevLeft = element.scrollLeft;
      if (widthMatches && element.clientHeight === elementHeight && content.offsetHeight === contentHeight && scrollWidth === element.scrollWidth && scrollHeight === element.scrollHeight && !force) {
        return; //no need to recalculate things if the width and height haven't changed.
      }

      if (offsetTop || offsetLeft) {
        x = this.left();
        y = this.top();
        this.left(-element.scrollLeft);
        this.top(-element.scrollTop);
      }
      cs = _getComputedStyle(element); //first, we need to remove any width constraints to see how the content naturally flows so that we can see if it's wider than the containing element. If so, we've got to record the amount of overage so that we can apply that as padding in order for browsers to correctly handle things. Then we switch back to a width of 100% (without that, some browsers don't flow the content correctly)

      if (!widthMatches || force) {
        style.display = "block";
        style.width = "auto";
        style.paddingRight = "0px";
        extraPadRight = Math.max(0, element.scrollWidth - element.clientWidth); //if the content is wider than the container, we need to add the paddingLeft and paddingRight in order for things to behave correctly.

        if (extraPadRight) {
          extraPadRight += parseFloat(cs.paddingLeft) + (_addPaddingBR ? parseFloat(cs.paddingRight) : 0);
        }
      }
      style.display = "inline-block";
      style.position = "relative";
      style.overflow = "visible";
      style.verticalAlign = "top";
      style.boxSizing = "content-box";
      style.width = "100%";
      style.paddingRight = extraPadRight + "px"; //some browsers neglect to factor in the bottom padding when calculating the scrollHeight, so we need to add that padding to the content when that happens. Allow a 2px margin for error

      if (_addPaddingBR) {
        style.paddingBottom = cs.paddingBottom;
      }
      elementWidth = element.clientWidth;
      elementHeight = element.clientHeight;
      scrollWidth = element.scrollWidth;
      scrollHeight = element.scrollHeight;
      maxLeft = element.scrollWidth - elementWidth;
      maxTop = element.scrollHeight - elementHeight;
      contentHeight = content.offsetHeight;
      style.display = "block";
      if (x || y) {
        this.left(x);
        this.top(y);
      }
    };
    this.content = content;
    this.element = element;
    this._skip = false;
    this.enable();
  },
  _initCore = function _initCore(required) {
    if (_windowExists() && document.body) {
      var nav = window && window.navigator;
      _win = window;
      _doc = document;
      _docElement = _doc.documentElement;
      _body = _doc.body;
      _tempDiv = _createElement("div");
      _supportsPointer = !!window.PointerEvent;
      _placeholderDiv = _createElement("div");
      _placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab";
      _defaultCursor = _placeholderDiv.style.cursor === "grab" ? "grab" : "move";
      _isAndroid = nav && nav.userAgent.toLowerCase().indexOf("android") !== -1; //Android handles touch events in an odd way and it's virtually impossible to "feature test" so we resort to UA sniffing

      _isTouchDevice = "ontouchstart" in _docElement && "orientation" in _win || nav && (nav.MaxTouchPoints > 0 || nav.msMaxTouchPoints > 0);
      _addPaddingBR = function () {
        //this function is in charge of analyzing browser behavior related to padding. It sets the _addPaddingBR to true if the browser doesn't normally factor in the bottom or right padding on the element inside the scrolling area, and it sets _addPaddingLeft to true if it's a browser that requires the extra offset (offsetLeft) to be added to the paddingRight (like Opera).
        var div = _createElement("div"),
          child = _createElement("div"),
          childStyle = child.style,
          parent = _body,
          val;
        childStyle.display = "inline-block";
        childStyle.position = "relative";
        div.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden";
        div.appendChild(child);
        parent.appendChild(div);
        val = child.offsetHeight + 18 > div.scrollHeight; //div.scrollHeight should be child.offsetHeight + 20 because of the 10px of padding on each side, but some browsers ignore one side. We allow a 2px margin of error.

        parent.removeChild(div);
        return val;
      }();
      _touchEventLookup = function (types) {
        //we create an object that makes it easy to translate touch event types into their "pointer" counterparts if we're in a browser that uses those instead. Like IE10 uses "MSPointerDown" instead of "touchstart", for example.
        var standard = types.split(","),
          converted = ("onpointerdown" in _tempDiv ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in _tempDiv ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","),
          obj = {},
          i = 4;
        while (--i > -1) {
          obj[standard[i]] = converted[i];
          obj[converted[i]] = standard[i];
        } //to avoid problems in iOS 9, test to see if the browser supports the "passive" option on addEventListener().

        try {
          _docElement.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function get() {
              _supportsPassive = 1;
            }
          }));
        } catch (e) {}
        return obj;
      }("touchstart,touchmove,touchend,touchcancel");
      _addListener(_doc, "touchcancel", _emptyFunc); //some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document. Very strange indeed.

      _addListener(_win, "touchmove", _emptyFunc); //works around Safari bugs that still allow the page to scroll even when we preventDefault() on the touchmove event.

      _body && _body.addEventListener("touchstart", _emptyFunc); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

      _addListener(_doc, "contextmenu", function () {
        for (var p in _lookup) {
          if (_lookup[p].isPressed) {
            _lookup[p].endDrag();
          }
        }
      });
      gsap = _coreInitted = _getGSAP();
    }
    if (gsap) {
      InertiaPlugin = gsap.plugins.inertia;
      _context = gsap.core.context || function () {};
      _checkPrefix = gsap.utils.checkPrefix;
      _transformProp = _checkPrefix(_transformProp);
      _transformOriginProp = _checkPrefix(_transformOriginProp);
      _toArray = gsap.utils.toArray;
      _getStyleSaver = gsap.core.getStyleSaver;
      _supports3D = !!_checkPrefix("perspective");
    } else if (required) {
      console.warn("Please gsap.registerPlugin(Draggable)");
    }
  };
var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher(target) {
    this._listeners = {};
    this.target = target || this;
  }
  var _proto = EventDispatcher.prototype;
  _proto.addEventListener = function addEventListener(type, callback) {
    var list = this._listeners[type] || (this._listeners[type] = []);
    if (!~list.indexOf(callback)) {
      list.push(callback);
    }
  };
  _proto.removeEventListener = function removeEventListener(type, callback) {
    var list = this._listeners[type],
      i = list && list.indexOf(callback);
    i >= 0 && list.splice(i, 1);
  };
  _proto.dispatchEvent = function dispatchEvent(type) {
    var _this = this;
    var result;
    (this._listeners[type] || []).forEach(function (callback) {
      return callback.call(_this, {
        type: type,
        target: _this.target
      }) === false && (result = false);
    });
    return result; //if any of the callbacks return false, pass that along.
  };

  return EventDispatcher;
}();
var Draggable = /*#__PURE__*/function (_EventDispatcher) {
  _inheritsLoose(Draggable, _EventDispatcher);
  function Draggable(target, vars) {
    var _this2;
    _this2 = _EventDispatcher.call(this) || this;
    _coreInitted || _initCore(1);
    target = _toArray(target)[0]; //in case the target is a selector object or selector text

    _this2.styles = _getStyleSaver && _getStyleSaver(target, "transform,left,top");
    if (!InertiaPlugin) {
      InertiaPlugin = gsap.plugins.inertia;
    }
    _this2.vars = vars = _copy(vars || {});
    _this2.target = target;
    _this2.x = _this2.y = _this2.rotation = 0;
    _this2.dragResistance = parseFloat(vars.dragResistance) || 0;
    _this2.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
    _this2.lockAxis = vars.lockAxis;
    _this2.autoScroll = vars.autoScroll || 0;
    _this2.lockedAxis = null;
    _this2.allowEventDefault = !!vars.allowEventDefault;
    gsap.getProperty(target, "x"); // to ensure that transforms are instantiated.

    var type = (vars.type || "x,y").toLowerCase(),
      xyMode = ~type.indexOf("x") || ~type.indexOf("y"),
      rotationMode = type.indexOf("rotation") !== -1,
      xProp = rotationMode ? "rotation" : xyMode ? "x" : "left",
      yProp = xyMode ? "y" : "top",
      allowX = !!(~type.indexOf("x") || ~type.indexOf("left") || type === "scroll"),
      allowY = !!(~type.indexOf("y") || ~type.indexOf("top") || type === "scroll"),
      minimumMovement = vars.minimumMovement || 2,
      self = _assertThisInitialized(_this2),
      triggers = _toArray(vars.trigger || vars.handle || target),
      killProps = {},
      dragEndTime = 0,
      checkAutoScrollBounds = false,
      autoScrollMarginTop = vars.autoScrollMarginTop || 40,
      autoScrollMarginRight = vars.autoScrollMarginRight || 40,
      autoScrollMarginBottom = vars.autoScrollMarginBottom || 40,
      autoScrollMarginLeft = vars.autoScrollMarginLeft || 40,
      isClickable = vars.clickableTest || _isClickable,
      clickTime = 0,
      gsCache = target._gsap || gsap.core.getCache(target),
      isFixed = _isFixed(target),
      getPropAsNum = function getPropAsNum(property, unit) {
        return parseFloat(gsCache.get(target, property, unit));
      },
      ownerDoc = target.ownerDocument || _doc,
      enabled,
      scrollProxy,
      startPointerX,
      startPointerY,
      startElementX,
      startElementY,
      hasBounds,
      hasDragCallback,
      hasMoveCallback,
      maxX,
      minX,
      maxY,
      minY,
      touch,
      touchID,
      rotationOrigin,
      dirty,
      old,
      snapX,
      snapY,
      snapXY,
      isClicking,
      touchEventTarget,
      matrix,
      interrupted,
      allowNativeTouchScrolling,
      touchDragAxis,
      isDispatching,
      clickDispatch,
      trustedClickDispatch,
      isPreventingDefault,
      innerMatrix,
      dragged,
      onContextMenu = function onContextMenu(e) {
        //used to prevent long-touch from triggering a context menu.
        // (self.isPressed && e.which < 2) && self.endDrag() // previously ended drag when context menu was triggered, but instead we should just stop propagation and prevent the default event behavior.
        _preventDefault(e);
        e.stopImmediatePropagation && e.stopImmediatePropagation();
        return false;
      },
      //this method gets called on every tick of TweenLite.ticker which allows us to synchronize the renders to the core engine (which is typically synchronized with the display refresh via requestAnimationFrame). This is an optimization - it's better than applying the values inside the "mousemove" or "touchmove" event handler which may get called many times inbetween refreshes.
      render = function render(suppressEvents) {
        if (self.autoScroll && self.isDragging && (checkAutoScrollBounds || dirty)) {
          var e = target,
            autoScrollFactor = self.autoScroll * 15,
            //multiplying by 15 just gives us a better "feel" speed-wise.
            parent,
            isRoot,
            rect,
            pointerX,
            pointerY,
            changeX,
            changeY,
            gap;
          checkAutoScrollBounds = false;
          _windowProxy.scrollTop = _win.pageYOffset != null ? _win.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
          _windowProxy.scrollLeft = _win.pageXOffset != null ? _win.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;
          pointerX = self.pointerX - _windowProxy.scrollLeft;
          pointerY = self.pointerY - _windowProxy.scrollTop;
          while (e && !isRoot) {
            //walk up the chain and sense wherever the pointer is within 40px of an edge that's scrollable.
            isRoot = _isRoot(e.parentNode);
            parent = isRoot ? _windowProxy : e.parentNode;
            rect = isRoot ? {
              bottom: Math.max(_docElement.clientHeight, _win.innerHeight || 0),
              right: Math.max(_docElement.clientWidth, _win.innerWidth || 0),
              left: 0,
              top: 0
            } : parent.getBoundingClientRect();
            changeX = changeY = 0;
            if (allowY) {
              gap = parent._gsMaxScrollY - parent.scrollTop;
              if (gap < 0) {
                changeY = gap;
              } else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
                checkAutoScrollBounds = true;
                changeY = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.bottom - pointerY) / autoScrollMarginBottom) | 0);
              } else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
                checkAutoScrollBounds = true;
                changeY = -Math.min(parent.scrollTop, autoScrollFactor * (1 - Math.max(0, pointerY - rect.top) / autoScrollMarginTop) | 0);
              }
              if (changeY) {
                parent.scrollTop += changeY;
              }
            }
            if (allowX) {
              gap = parent._gsMaxScrollX - parent.scrollLeft;
              if (gap < 0) {
                changeX = gap;
              } else if (pointerX > rect.right - autoScrollMarginRight && gap) {
                checkAutoScrollBounds = true;
                changeX = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.right - pointerX) / autoScrollMarginRight) | 0);
              } else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
                checkAutoScrollBounds = true;
                changeX = -Math.min(parent.scrollLeft, autoScrollFactor * (1 - Math.max(0, pointerX - rect.left) / autoScrollMarginLeft) | 0);
              }
              if (changeX) {
                parent.scrollLeft += changeX;
              }
            }
            if (isRoot && (changeX || changeY)) {
              _win.scrollTo(parent.scrollLeft, parent.scrollTop);
              setPointerPosition(self.pointerX + changeX, self.pointerY + changeY);
            }
            e = parent;
          }
        }
        if (dirty) {
          var x = self.x,
            y = self.y;
          if (rotationMode) {
            self.deltaX = x - parseFloat(gsCache.rotation);
            self.rotation = x;
            gsCache.rotation = x + "deg";
            gsCache.renderTransform(1, gsCache);
          } else {
            if (scrollProxy) {
              if (allowY) {
                self.deltaY = y - scrollProxy.top();
                scrollProxy.top(y);
              }
              if (allowX) {
                self.deltaX = x - scrollProxy.left();
                scrollProxy.left(x);
              }
            } else if (xyMode) {
              if (allowY) {
                self.deltaY = y - parseFloat(gsCache.y);
                gsCache.y = y + "px";
              }
              if (allowX) {
                self.deltaX = x - parseFloat(gsCache.x);
                gsCache.x = x + "px";
              }
              gsCache.renderTransform(1, gsCache);
            } else {
              if (allowY) {
                self.deltaY = y - parseFloat(target.style.top || 0);
                target.style.top = y + "px";
              }
              if (allowX) {
                self.deltaX = x - parseFloat(target.style.left || 0);
                target.style.left = x + "px";
              }
            }
          }
          if (hasDragCallback && !suppressEvents && !isDispatching) {
            isDispatching = true; //in case onDrag has an update() call (avoid endless loop)

            if (_dispatchEvent(self, "drag", "onDrag") === false) {
              if (allowX) {
                self.x -= self.deltaX;
              }
              if (allowY) {
                self.y -= self.deltaY;
              }
              render(true);
            }
            isDispatching = false;
          }
        }
        dirty = false;
      },
      //copies the x/y from the element (whether that be transforms, top/left, or ScrollProxy's top/left) to the Draggable's x and y (and rotation if necessary) properties so that they reflect reality and it also (optionally) applies any snapping necessary. This is used by the InertiaPlugin tween in an onUpdate to ensure things are synced and snapped.
      syncXY = function syncXY(skipOnUpdate, skipSnap) {
        var x = self.x,
          y = self.y,
          snappedValue,
          cs;
        if (!target._gsap) {
          //just in case the _gsap cache got wiped, like if the user called clearProps on the transform or something (very rare).
          gsCache = gsap.core.getCache(target);
        }
        gsCache.uncache && gsap.getProperty(target, "x"); // trigger a re-cache

        if (xyMode) {
          self.x = parseFloat(gsCache.x);
          self.y = parseFloat(gsCache.y);
        } else if (rotationMode) {
          self.x = self.rotation = parseFloat(gsCache.rotation);
        } else if (scrollProxy) {
          self.y = scrollProxy.top();
          self.x = scrollProxy.left();
        } else {
          self.y = parseFloat(target.style.top || (cs = _getComputedStyle(target)) && cs.top) || 0;
          self.x = parseFloat(target.style.left || (cs || {}).left) || 0;
        }
        if ((snapX || snapY || snapXY) && !skipSnap && (self.isDragging || self.isThrowing)) {
          if (snapXY) {
            _temp1.x = self.x;
            _temp1.y = self.y;
            snappedValue = snapXY(_temp1);
            if (snappedValue.x !== self.x) {
              self.x = snappedValue.x;
              dirty = true;
            }
            if (snappedValue.y !== self.y) {
              self.y = snappedValue.y;
              dirty = true;
            }
          }
          if (snapX) {
            snappedValue = snapX(self.x);
            if (snappedValue !== self.x) {
              self.x = snappedValue;
              if (rotationMode) {
                self.rotation = snappedValue;
              }
              dirty = true;
            }
          }
          if (snapY) {
            snappedValue = snapY(self.y);
            if (snappedValue !== self.y) {
              self.y = snappedValue;
            }
            dirty = true;
          }
        }
        dirty && render(true);
        if (!skipOnUpdate) {
          self.deltaX = self.x - x;
          self.deltaY = self.y - y;
          _dispatchEvent(self, "throwupdate", "onThrowUpdate");
        }
      },
      buildSnapFunc = function buildSnapFunc(snap, min, max, factor) {
        if (min == null) {
          min = -_bigNum;
        }
        if (max == null) {
          max = _bigNum;
        }
        if (_isFunction(snap)) {
          return function (n) {
            var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

            return snap.call(self, (n > max ? max + (n - max) * edgeTolerance : n < min ? min + (n - min) * edgeTolerance : n) * factor) * factor;
          };
        }
        if (_isArray(snap)) {
          return function (n) {
            var i = snap.length,
              closest = 0,
              absDif = _bigNum,
              val,
              dif;
            while (--i > -1) {
              val = snap[i];
              dif = val - n;
              if (dif < 0) {
                dif = -dif;
              }
              if (dif < absDif && val >= min && val <= max) {
                closest = i;
                absDif = dif;
              }
            }
            return snap[closest];
          };
        }
        return isNaN(snap) ? function (n) {
          return n;
        } : function () {
          return snap * factor;
        };
      },
      buildPointSnapFunc = function buildPointSnapFunc(snap, minX, maxX, minY, maxY, radius, factor) {
        radius = radius && radius < _bigNum ? radius * radius : _bigNum; //so we don't have to Math.sqrt() in the functions. Performance optimization.

        if (_isFunction(snap)) {
          return function (point) {
            var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance,
              x = point.x,
              y = point.y,
              result,
              dx,
              dy; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

            point.x = x = x > maxX ? maxX + (x - maxX) * edgeTolerance : x < minX ? minX + (x - minX) * edgeTolerance : x;
            point.y = y = y > maxY ? maxY + (y - maxY) * edgeTolerance : y < minY ? minY + (y - minY) * edgeTolerance : y;
            result = snap.call(self, point);
            if (result !== point) {
              point.x = result.x;
              point.y = result.y;
            }
            if (factor !== 1) {
              point.x *= factor;
              point.y *= factor;
            }
            if (radius < _bigNum) {
              dx = point.x - x;
              dy = point.y - y;
              if (dx * dx + dy * dy > radius) {
                point.x = x;
                point.y = y;
              }
            }
            return point;
          };
        }
        if (_isArray(snap)) {
          return function (p) {
            var i = snap.length,
              closest = 0,
              minDist = _bigNum,
              x,
              y,
              point,
              dist;
            while (--i > -1) {
              point = snap[i];
              x = point.x - p.x;
              y = point.y - p.y;
              dist = x * x + y * y;
              if (dist < minDist) {
                closest = i;
                minDist = dist;
              }
            }
            return minDist <= radius ? snap[closest] : p;
          };
        }
        return function (n) {
          return n;
        };
      },
      calculateBounds = function calculateBounds() {
        var bounds, targetBounds, snap, snapIsRaw;
        hasBounds = false;
        if (scrollProxy) {
          scrollProxy.calibrate();
          self.minX = minX = -scrollProxy.maxScrollLeft();
          self.minY = minY = -scrollProxy.maxScrollTop();
          self.maxX = maxX = self.maxY = maxY = 0;
          hasBounds = true;
        } else if (!!vars.bounds) {
          bounds = _getBounds(vars.bounds, target.parentNode); //could be a selector/jQuery object or a DOM element or a generic object like {top:0, left:100, width:1000, height:800} or {minX:100, maxX:1100, minY:0, maxY:800}

          if (rotationMode) {
            self.minX = minX = bounds.left;
            self.maxX = maxX = bounds.left + bounds.width;
            self.minY = minY = self.maxY = maxY = 0;
          } else if (!_isUndefined(vars.bounds.maxX) || !_isUndefined(vars.bounds.maxY)) {
            bounds = vars.bounds;
            self.minX = minX = bounds.minX;
            self.minY = minY = bounds.minY;
            self.maxX = maxX = bounds.maxX;
            self.maxY = maxY = bounds.maxY;
          } else {
            targetBounds = _getBounds(target, target.parentNode);
            self.minX = minX = Math.round(getPropAsNum(xProp, "px") + bounds.left - targetBounds.left);
            self.minY = minY = Math.round(getPropAsNum(yProp, "px") + bounds.top - targetBounds.top);
            self.maxX = maxX = Math.round(minX + (bounds.width - targetBounds.width));
            self.maxY = maxY = Math.round(minY + (bounds.height - targetBounds.height));
          }
          if (minX > maxX) {
            self.minX = maxX;
            self.maxX = maxX = minX;
            minX = self.minX;
          }
          if (minY > maxY) {
            self.minY = maxY;
            self.maxY = maxY = minY;
            minY = self.minY;
          }
          if (rotationMode) {
            self.minRotation = minX;
            self.maxRotation = maxX;
          }
          hasBounds = true;
        }
        if (vars.liveSnap) {
          snap = vars.liveSnap === true ? vars.snap || {} : vars.liveSnap;
          snapIsRaw = _isArray(snap) || _isFunction(snap);
          if (rotationMode) {
            snapX = buildSnapFunc(snapIsRaw ? snap : snap.rotation, minX, maxX, 1);
            snapY = null;
          } else {
            if (snap.points) {
              snapXY = buildPointSnapFunc(snapIsRaw ? snap : snap.points, minX, maxX, minY, maxY, snap.radius, scrollProxy ? -1 : 1);
            } else {
              if (allowX) {
                snapX = buildSnapFunc(snapIsRaw ? snap : snap.x || snap.left || snap.scrollLeft, minX, maxX, scrollProxy ? -1 : 1);
              }
              if (allowY) {
                snapY = buildSnapFunc(snapIsRaw ? snap : snap.y || snap.top || snap.scrollTop, minY, maxY, scrollProxy ? -1 : 1);
              }
            }
          }
        }
      },
      onThrowComplete = function onThrowComplete() {
        self.isThrowing = false;
        _dispatchEvent(self, "throwcomplete", "onThrowComplete");
      },
      onThrowInterrupt = function onThrowInterrupt() {
        self.isThrowing = false;
      },
      animate = function animate(inertia, forceZeroVelocity) {
        var snap, snapIsRaw, tween, overshootTolerance;
        if (inertia && InertiaPlugin) {
          if (inertia === true) {
            snap = vars.snap || vars.liveSnap || {};
            snapIsRaw = _isArray(snap) || _isFunction(snap);
            inertia = {
              resistance: (vars.throwResistance || vars.resistance || 1000) / (rotationMode ? 10 : 1)
            };
            if (rotationMode) {
              inertia.rotation = _parseInertia(self, snapIsRaw ? snap : snap.rotation, maxX, minX, 1, forceZeroVelocity);
            } else {
              if (allowX) {
                inertia[xProp] = _parseInertia(self, snapIsRaw ? snap : snap.points || snap.x || snap.left, maxX, minX, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "x");
              }
              if (allowY) {
                inertia[yProp] = _parseInertia(self, snapIsRaw ? snap : snap.points || snap.y || snap.top, maxY, minY, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "y");
              }
              if (snap.points || _isArray(snap) && _isObject(snap[0])) {
                inertia.linkedProps = xProp + "," + yProp;
                inertia.radius = snap.radius; //note: we also disable liveSnapping while throwing if there's a "radius" defined, otherwise it looks weird to have the item thrown past a snapping point but live-snapping mid-tween. We do this by altering the onUpdateParams so that "skipSnap" parameter is true for syncXY.
              }
            }
          }

          self.isThrowing = true;
          overshootTolerance = !isNaN(vars.overshootTolerance) ? vars.overshootTolerance : vars.edgeResistance === 1 ? 0 : 1 - self.edgeResistance + 0.2;
          if (!inertia.duration) {
            inertia.duration = {
              max: Math.max(vars.minDuration || 0, "maxDuration" in vars ? vars.maxDuration : 2),
              min: !isNaN(vars.minDuration) ? vars.minDuration : overshootTolerance === 0 || _isObject(inertia) && inertia.resistance > 1000 ? 0 : 0.5,
              overshoot: overshootTolerance
            };
          }
          self.tween = tween = gsap.to(scrollProxy || target, {
            inertia: inertia,
            data: "_draggable",
            onComplete: onThrowComplete,
            onInterrupt: onThrowInterrupt,
            onUpdate: vars.fastMode ? _dispatchEvent : syncXY,
            onUpdateParams: vars.fastMode ? [self, "onthrowupdate", "onThrowUpdate"] : snap && snap.radius ? [false, true] : []
          });
          if (!vars.fastMode) {
            if (scrollProxy) {
              scrollProxy._skip = true; // Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
            }

            tween.render(1e9, true, true); // force to the end. Remember, the duration will likely change upon initting because that's when InertiaPlugin calculates it.

            syncXY(true, true);
            self.endX = self.x;
            self.endY = self.y;
            if (rotationMode) {
              self.endRotation = self.x;
            }
            tween.play(0);
            syncXY(true, true);
            if (scrollProxy) {
              scrollProxy._skip = false; //Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
            }
          }
        } else if (hasBounds) {
          self.applyBounds();
        }
      },
      updateMatrix = function updateMatrix(shiftStart) {
        var start = matrix,
          p;
        matrix = (0, _matrix.getGlobalMatrix)(target.parentNode, true);
        if (shiftStart && self.isPressed && !matrix.equals(start || new _matrix.Matrix2D())) {
          //if the matrix changes WHILE the element is pressed, we must adjust the startPointerX and startPointerY accordingly, so we invert the original matrix and figure out where the pointerX and pointerY were in the global space, then apply the new matrix to get the updated coordinates.
          p = start.inverse().apply({
            x: startPointerX,
            y: startPointerY
          });
          matrix.apply(p, p);
          startPointerX = p.x;
          startPointerY = p.y;
        }
        if (matrix.equals(_identityMatrix)) {
          //if there are no transforms, we can optimize performance by not factoring in the matrix
          matrix = null;
        }
      },
      recordStartPositions = function recordStartPositions() {
        var edgeTolerance = 1 - self.edgeResistance,
          offsetX = isFixed ? _getDocScrollLeft(ownerDoc) : 0,
          offsetY = isFixed ? _getDocScrollTop(ownerDoc) : 0,
          parsedOrigin,
          x,
          y;
        if (xyMode) {
          // in case the user set it as a different unit, like animating the x to "100%". We must convert it back to px!
          gsCache.x = getPropAsNum(xProp, "px") + "px";
          gsCache.y = getPropAsNum(yProp, "px") + "px";
          gsCache.renderTransform();
        }
        updateMatrix(false);
        _point1.x = self.pointerX - offsetX;
        _point1.y = self.pointerY - offsetY;
        matrix && matrix.apply(_point1, _point1);
        startPointerX = _point1.x; //translate to local coordinate system

        startPointerY = _point1.y;
        if (dirty) {
          setPointerPosition(self.pointerX, self.pointerY);
          render(true);
        }
        innerMatrix = (0, _matrix.getGlobalMatrix)(target);
        if (scrollProxy) {
          calculateBounds();
          startElementY = scrollProxy.top();
          startElementX = scrollProxy.left();
        } else {
          //if the element is in the process of tweening, don't force snapping to occur because it could make it jump. Imagine the user throwing, then before it's done, clicking on the element in its inbetween state.
          if (isTweening()) {
            syncXY(true, true);
            calculateBounds();
          } else {
            self.applyBounds();
          }
          if (rotationMode) {
            parsedOrigin = target.ownerSVGElement ? [gsCache.xOrigin - target.getBBox().x, gsCache.yOrigin - target.getBBox().y] : (_getComputedStyle(target)[_transformOriginProp] || "0 0").split(" ");
            rotationOrigin = self.rotationOrigin = (0, _matrix.getGlobalMatrix)(target).apply({
              x: parseFloat(parsedOrigin[0]) || 0,
              y: parseFloat(parsedOrigin[1]) || 0
            });
            syncXY(true, true);
            x = self.pointerX - rotationOrigin.x - offsetX;
            y = rotationOrigin.y - self.pointerY + offsetY;
            startElementX = self.x; //starting rotation (x always refers to rotation in type:"rotation", measured in degrees)

            startElementY = self.y = Math.atan2(y, x) * _RAD2DEG;
          } else {
            //parent = !isFixed && target.parentNode;
            //startScrollTop = parent ? parent.scrollTop || 0 : 0;
            //startScrollLeft = parent ? parent.scrollLeft || 0 : 0;
            startElementY = getPropAsNum(yProp, "px"); //record the starting top and left values so that we can just add the mouse's movement to them later.

            startElementX = getPropAsNum(xProp, "px");
          }
        }
        if (hasBounds && edgeTolerance) {
          if (startElementX > maxX) {
            startElementX = maxX + (startElementX - maxX) / edgeTolerance;
          } else if (startElementX < minX) {
            startElementX = minX - (minX - startElementX) / edgeTolerance;
          }
          if (!rotationMode) {
            if (startElementY > maxY) {
              startElementY = maxY + (startElementY - maxY) / edgeTolerance;
            } else if (startElementY < minY) {
              startElementY = minY - (minY - startElementY) / edgeTolerance;
            }
          }
        }
        self.startX = startElementX = _round(startElementX);
        self.startY = startElementY = _round(startElementY);
      },
      isTweening = function isTweening() {
        return self.tween && self.tween.isActive();
      },
      removePlaceholder = function removePlaceholder() {
        if (_placeholderDiv.parentNode && !isTweening() && !self.isDragging) {
          //_placeholderDiv just props open auto-scrolling containers so they don't collapse as the user drags left/up. We remove it after dragging (and throwing, if necessary) finishes.
          _placeholderDiv.parentNode.removeChild(_placeholderDiv);
        }
      },
      //called when the mouse is pressed (or touch starts)
      onPress = function onPress(e, force) {
        var i;
        if (!enabled || self.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime() - clickTime < 30 && _touchEventLookup[self.pointerEvent.type]) {
          //when we DON'T preventDefault() in order to accommodate touch-scrolling and the user just taps, many browsers also fire a mousedown/mouseup sequence AFTER the touchstart/touchend sequence, thus it'd result in two quick "click" events being dispatched. This line senses that condition and halts it on the subsequent mousedown.
          isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchstart, pointerdown, mousedown. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

          return;
        }
        interrupted = isTweening();
        dragged = false; // we need to track whether or not it was dragged in this interaction so that if, for example, the user calls .endDrag() to FORCE it to stop and then they keep the mouse pressed down and eventually release, that would normally cause an onClick but we have to skip it in that case if there was dragging that occurred.

        self.pointerEvent = e;
        if (_touchEventLookup[e.type]) {
          //note: on iOS, BOTH touchmove and mousemove are dispatched, but the mousemove has pageY and pageX of 0 which would mess up the calculations and needlessly hurt performance.
          touchEventTarget = ~e.type.indexOf("touch") ? e.currentTarget || e.target : ownerDoc; //pointer-based touches (for Microsoft browsers) don't remain locked to the original target like other browsers, so we must use the document instead. The event type would be "MSPointerDown" or "pointerdown".

          _addListener(touchEventTarget, "touchend", onRelease);
          _addListener(touchEventTarget, "touchmove", onMove); // possible future change if PointerEvents are more standardized: https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture

          _addListener(touchEventTarget, "touchcancel", onRelease);
          _addListener(ownerDoc, "touchstart", _onMultiTouchDocument);
        } else {
          touchEventTarget = null;
          _addListener(ownerDoc, "mousemove", onMove); //attach these to the document instead of the box itself so that if the user's mouse moves too quickly (and off of the box), things still work.
        }

        touchDragAxis = null;
        if (!_supportsPointer || !touchEventTarget) {
          _addListener(ownerDoc, "mouseup", onRelease);
          e && e.target && _addListener(e.target, "mouseup", onRelease); //we also have to listen directly on the element because some browsers don't bubble up the event to the _doc on elements with contentEditable="true"
        }

        isClicking = isClickable.call(self, e.target) && vars.dragClickables === false && !force;
        if (isClicking) {
          _addListener(e.target, "change", onRelease); //in some browsers, when you mousedown on a <select> element, no mouseup gets dispatched! So we listen for a "change" event instead.

          _dispatchEvent(self, "pressInit", "onPressInit");
          _dispatchEvent(self, "press", "onPress");
          _setSelectable(triggers, true); //accommodates things like inputs and elements with contentEditable="true" (otherwise user couldn't drag to select text)

          isPreventingDefault = false;
          return;
        }
        allowNativeTouchScrolling = !touchEventTarget || allowX === allowY || self.vars.allowNativeTouchScrolling === false || self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? false : allowX ? "y" : "x"; //note: in Chrome, right-clicking (for a context menu) fires onPress and it doesn't have the event.which set properly, so we must look for event.ctrlKey. If the user wants to allow context menus we should of course sense it here and not allow native touch scrolling.

        isPreventingDefault = !allowNativeTouchScrolling && !self.allowEventDefault;
        if (isPreventingDefault) {
          _preventDefault(e);
          _addListener(_win, "touchforcechange", _preventDefault); //works around safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/
        }

        if (e.changedTouches) {
          //touch events store the data slightly differently
          e = touch = e.changedTouches[0];
          touchID = e.identifier;
        } else if (e.pointerId) {
          touchID = e.pointerId; //for some Microsoft browsers
        } else {
          touch = touchID = null;
        }
        _dragCount++;
        _addToRenderQueue(render); //causes the Draggable to render on each "tick" of gsap.ticker (performance optimization - updating values in a mousemove can cause them to happen too frequently, like multiple times between frame redraws which is wasteful, and it also prevents values from updating properly in IE8)

        startPointerY = self.pointerY = e.pageY; //record the starting x and y so that we can calculate the movement from the original in _onMouseMove

        startPointerX = self.pointerX = e.pageX;
        _dispatchEvent(self, "pressInit", "onPressInit");
        if (allowNativeTouchScrolling || self.autoScroll) {
          _recordMaxScrolls(target.parentNode);
        }
        if (target.parentNode && self.autoScroll && !scrollProxy && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) {
          //add a placeholder div to prevent the parent container from collapsing when the user drags the element left.
          _placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
          target.parentNode.appendChild(_placeholderDiv);
        }
        recordStartPositions();
        self.tween && self.tween.kill();
        self.isThrowing = false;
        gsap.killTweensOf(scrollProxy || target, killProps, true); //in case the user tries to drag it before the last tween is done.

        scrollProxy && gsap.killTweensOf(target, {
          scrollTo: 1
        }, true); //just in case the original target's scroll position is being tweened somewhere else.

        self.tween = self.lockedAxis = null;
        if (vars.zIndexBoost || !rotationMode && !scrollProxy && vars.zIndexBoost !== false) {
          target.style.zIndex = Draggable.zIndex++;
        }
        self.isPressed = true;
        hasDragCallback = !!(vars.onDrag || self._listeners.drag);
        hasMoveCallback = !!(vars.onMove || self._listeners.move);
        if (vars.cursor !== false || vars.activeCursor) {
          i = triggers.length;
          while (--i > -1) {
            gsap.set(triggers[i], {
              cursor: vars.activeCursor || vars.cursor || (_defaultCursor === "grab" ? "grabbing" : _defaultCursor)
            });
          }
        }
        _dispatchEvent(self, "press", "onPress");
      },
      //called every time the mouse/touch moves
      onMove = function onMove(e) {
        var originalEvent = e,
          touches,
          pointerX,
          pointerY,
          i,
          dx,
          dy;
        if (!enabled || _isMultiTouching || !self.isPressed || !e) {
          isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchmove, pointermove, mousemove. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

          return;
        }
        self.pointerEvent = e;
        touches = e.changedTouches;
        if (touches) {
          //touch events store the data slightly differently
          e = touches[0];
          if (e !== touch && e.identifier !== touchID) {
            //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
            i = touches.length;
            while (--i > -1 && (e = touches[i]).identifier !== touchID && e.target !== target) {} // Some Android devices dispatch a touchstart AND pointerdown initially, and then only pointermove thus the touchID may not match because it was grabbed from the touchstart event whereas the pointer event is the one that the browser dispatches for move, so if the event target matches this Draggable's target, let it through.

            if (i < 0) {
              return;
            }
          }
        } else if (e.pointerId && touchID && e.pointerId !== touchID) {
          //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
          return;
        }
        if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) {
          //Android browsers force us to decide on the first "touchmove" event if we should allow the default (scrolling) behavior or preventDefault(). Otherwise, a "touchcancel" will be fired and then no "touchmove" or "touchend" will fire during the scrolling (no good).
          _point1.x = e.pageX - (isFixed ? _getDocScrollLeft(ownerDoc) : 0);
          _point1.y = e.pageY - (isFixed ? _getDocScrollTop(ownerDoc) : 0);
          matrix && matrix.apply(_point1, _point1);
          pointerX = _point1.x;
          pointerY = _point1.y;
          dx = Math.abs(pointerX - startPointerX);
          dy = Math.abs(pointerY - startPointerY);
          if (dx !== dy && (dx > minimumMovement || dy > minimumMovement) || _isAndroid && allowNativeTouchScrolling === touchDragAxis) {
            touchDragAxis = dx > dy && allowX ? "x" : "y";
            if (allowNativeTouchScrolling && touchDragAxis !== allowNativeTouchScrolling) {
              _addListener(_win, "touchforcechange", _preventDefault); // prevents native touch scrolling from taking over if the user started dragging in the other direction in iOS Safari
            }

            if (self.vars.lockAxisOnTouchScroll !== false && allowX && allowY) {
              self.lockedAxis = touchDragAxis === "x" ? "y" : "x";
              _isFunction(self.vars.onLockAxis) && self.vars.onLockAxis.call(self, originalEvent);
            }
            if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
              onRelease(originalEvent);
              return;
            }
          }
        }
        if (!self.allowEventDefault && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling !== touchDragAxis) && originalEvent.cancelable !== false) {
          _preventDefault(originalEvent);
          isPreventingDefault = true;
        } else if (isPreventingDefault) {
          isPreventingDefault = false;
        }
        if (self.autoScroll) {
          checkAutoScrollBounds = true;
        }
        setPointerPosition(e.pageX, e.pageY, hasMoveCallback);
      },
      setPointerPosition = function setPointerPosition(pointerX, pointerY, invokeOnMove) {
        var dragTolerance = 1 - self.dragResistance,
          edgeTolerance = 1 - self.edgeResistance,
          prevPointerX = self.pointerX,
          prevPointerY = self.pointerY,
          prevStartElementY = startElementY,
          prevX = self.x,
          prevY = self.y,
          prevEndX = self.endX,
          prevEndY = self.endY,
          prevEndRotation = self.endRotation,
          prevDirty = dirty,
          xChange,
          yChange,
          x,
          y,
          dif,
          temp;
        self.pointerX = pointerX;
        self.pointerY = pointerY;
        if (isFixed) {
          pointerX -= _getDocScrollLeft(ownerDoc);
          pointerY -= _getDocScrollTop(ownerDoc);
        }
        if (rotationMode) {
          y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG;
          dif = self.y - y;
          if (dif > 180) {
            startElementY -= 360;
            self.y = y;
          } else if (dif < -180) {
            startElementY += 360;
            self.y = y;
          }
          if (self.x !== startElementX || Math.abs(startElementY - y) > minimumMovement) {
            self.y = y;
            x = startElementX + (startElementY - y) * dragTolerance;
          } else {
            x = startElementX;
          }
        } else {
          if (matrix) {
            temp = pointerX * matrix.a + pointerY * matrix.c + matrix.e;
            pointerY = pointerX * matrix.b + pointerY * matrix.d + matrix.f;
            pointerX = temp;
          }
          yChange = pointerY - startPointerY;
          xChange = pointerX - startPointerX;
          if (yChange < minimumMovement && yChange > -minimumMovement) {
            yChange = 0;
          }
          if (xChange < minimumMovement && xChange > -minimumMovement) {
            xChange = 0;
          }
          if ((self.lockAxis || self.lockedAxis) && (xChange || yChange)) {
            temp = self.lockedAxis;
            if (!temp) {
              self.lockedAxis = temp = allowX && Math.abs(xChange) > Math.abs(yChange) ? "y" : allowY ? "x" : null;
              if (temp && _isFunction(self.vars.onLockAxis)) {
                self.vars.onLockAxis.call(self, self.pointerEvent);
              }
            }
            if (temp === "y") {
              yChange = 0;
            } else if (temp === "x") {
              xChange = 0;
            }
          }
          x = _round(startElementX + xChange * dragTolerance);
          y = _round(startElementY + yChange * dragTolerance);
        }
        if ((snapX || snapY || snapXY) && (self.x !== x || self.y !== y && !rotationMode)) {
          if (snapXY) {
            _temp1.x = x;
            _temp1.y = y;
            temp = snapXY(_temp1);
            x = _round(temp.x);
            y = _round(temp.y);
          }
          if (snapX) {
            x = _round(snapX(x));
          }
          if (snapY) {
            y = _round(snapY(y));
          }
        }
        if (hasBounds) {
          if (x > maxX) {
            x = maxX + Math.round((x - maxX) * edgeTolerance);
          } else if (x < minX) {
            x = minX + Math.round((x - minX) * edgeTolerance);
          }
          if (!rotationMode) {
            if (y > maxY) {
              y = Math.round(maxY + (y - maxY) * edgeTolerance);
            } else if (y < minY) {
              y = Math.round(minY + (y - minY) * edgeTolerance);
            }
          }
        }
        if (self.x !== x || self.y !== y && !rotationMode) {
          if (rotationMode) {
            self.endRotation = self.x = self.endX = x;
            dirty = true;
          } else {
            if (allowY) {
              self.y = self.endY = y;
              dirty = true; //a flag that indicates we need to render the target next time the TweenLite.ticker dispatches a "tick" event (typically on a requestAnimationFrame) - this is a performance optimization (we shouldn't render on every move because sometimes many move events can get dispatched between screen refreshes, and that'd be wasteful to render every time)
            }

            if (allowX) {
              self.x = self.endX = x;
              dirty = true;
            }
          }
          if (!invokeOnMove || _dispatchEvent(self, "move", "onMove") !== false) {
            if (!self.isDragging && self.isPressed) {
              self.isDragging = dragged = true;
              _dispatchEvent(self, "dragstart", "onDragStart");
            }
          } else {
            //revert because the onMove returned false!
            self.pointerX = prevPointerX;
            self.pointerY = prevPointerY;
            startElementY = prevStartElementY;
            self.x = prevX;
            self.y = prevY;
            self.endX = prevEndX;
            self.endY = prevEndY;
            self.endRotation = prevEndRotation;
            dirty = prevDirty;
          }
        }
      },
      //called when the mouse/touch is released
      onRelease = function onRelease(e, force) {
        if (!enabled || !self.isPressed || e && touchID != null && !force && (e.pointerId && e.pointerId !== touchID && e.target !== target || e.changedTouches && !_hasTouchID(e.changedTouches, touchID))) {
          //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
          isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchend, pointerup, mouseup. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

          return;
        }
        self.isPressed = false;
        var originalEvent = e,
          wasDragging = self.isDragging,
          isContextMenuRelease = self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2),
          placeholderDelayedCall = gsap.delayedCall(0.001, removePlaceholder),
          touches,
          i,
          syntheticEvent,
          eventTarget,
          syntheticClick;
        if (touchEventTarget) {
          _removeListener(touchEventTarget, "touchend", onRelease);
          _removeListener(touchEventTarget, "touchmove", onMove);
          _removeListener(touchEventTarget, "touchcancel", onRelease);
          _removeListener(ownerDoc, "touchstart", _onMultiTouchDocument);
        } else {
          _removeListener(ownerDoc, "mousemove", onMove);
        }
        _removeListener(_win, "touchforcechange", _preventDefault);
        if (!_supportsPointer || !touchEventTarget) {
          _removeListener(ownerDoc, "mouseup", onRelease);
          e && e.target && _removeListener(e.target, "mouseup", onRelease);
        }
        dirty = false;
        if (wasDragging) {
          dragEndTime = _lastDragTime = _getTime();
          self.isDragging = false;
        }
        _removeFromRenderQueue(render);
        if (isClicking && !isContextMenuRelease) {
          if (e) {
            _removeListener(e.target, "change", onRelease);
            self.pointerEvent = originalEvent;
          }
          _setSelectable(triggers, false);
          _dispatchEvent(self, "release", "onRelease");
          _dispatchEvent(self, "click", "onClick");
          isClicking = false;
          return;
        }
        i = triggers.length;
        while (--i > -1) {
          _setStyle(triggers[i], "cursor", vars.cursor || (vars.cursor !== false ? _defaultCursor : null));
        }
        _dragCount--;
        if (e) {
          touches = e.changedTouches;
          if (touches) {
            //touch events store the data slightly differently
            e = touches[0];
            if (e !== touch && e.identifier !== touchID) {
              //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
              i = touches.length;
              while (--i > -1 && (e = touches[i]).identifier !== touchID && e.target !== target) {}
              if (i < 0 && !force) {
                return;
              }
            }
          }
          self.pointerEvent = originalEvent;
          self.pointerX = e.pageX;
          self.pointerY = e.pageY;
        }
        if (isContextMenuRelease && originalEvent) {
          _preventDefault(originalEvent);
          isPreventingDefault = true;
          _dispatchEvent(self, "release", "onRelease");
        } else if (originalEvent && !wasDragging) {
          isPreventingDefault = false;
          if (interrupted && (vars.snap || vars.bounds)) {
            //otherwise, if the user clicks on the object while it's animating to a snapped position, and then releases without moving 3 pixels, it will just stay there (it should animate/snap)
            animate(vars.inertia || vars.throwProps);
          }
          _dispatchEvent(self, "release", "onRelease");
          if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) {
            //to accommodate native scrolling on Android devices, we have to immediately call onRelease() on the first touchmove event, but that shouldn't trigger a "click".
            _dispatchEvent(self, "click", "onClick");
            if (_getTime() - clickTime < 300) {
              _dispatchEvent(self, "doubleclick", "onDoubleClick");
            }
            eventTarget = originalEvent.target || target; //old IE uses srcElement

            clickTime = _getTime();
            syntheticClick = function syntheticClick() {
              // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
              if (clickTime !== clickDispatch && self.enabled() && !self.isPressed && !originalEvent.defaultPrevented) {
                if (eventTarget.click) {
                  //some browsers (like mobile Safari) don't properly trigger the click event
                  eventTarget.click();
                } else if (ownerDoc.createEvent) {
                  syntheticEvent = ownerDoc.createEvent("MouseEvents");
                  syntheticEvent.initMouseEvent("click", true, true, _win, 1, self.pointerEvent.screenX, self.pointerEvent.screenY, self.pointerX, self.pointerY, false, false, false, false, 0, null);
                  eventTarget.dispatchEvent(syntheticEvent);
                }
              }
            };
            if (!_isAndroid && !originalEvent.defaultPrevented) {
              //iOS Safari requires the synthetic click to happen immediately or else it simply won't work, but Android doesn't play nice.
              gsap.delayedCall(0.05, syntheticClick); //in addition to the iOS bug workaround, there's a Firefox issue with clicking on things like a video to play, so we must fake a click event in a slightly delayed fashion. Previously, we listened for the "click" event with "capture" false which solved the video-click-to-play issue, but it would allow the "click" event to be dispatched twice like if you were using a jQuery.click() because that was handled in the capture phase, thus we had to switch to the capture phase to avoid the double-dispatching, but do the delayed synthetic click. Don't fire it too fast (like 0.00001) because we want to give the native event a chance to fire first as it's "trusted".
            }
          }
        } else {
          animate(vars.inertia || vars.throwProps); //will skip if inertia/throwProps isn't defined or InertiaPlugin isn't loaded.

          if (!self.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling === touchDragAxis) && originalEvent.cancelable !== false) {
            isPreventingDefault = true;
            _preventDefault(originalEvent);
          } else {
            isPreventingDefault = false;
          }
          _dispatchEvent(self, "release", "onRelease");
        }
        isTweening() && placeholderDelayedCall.duration(self.tween.duration()); //sync the timing so that the placeholder DIV gets

        wasDragging && _dispatchEvent(self, "dragend", "onDragEnd");
        return true;
      },
      updateScroll = function updateScroll(e) {
        if (e && self.isDragging && !scrollProxy) {
          var parent = e.target || target.parentNode,
            deltaX = parent.scrollLeft - parent._gsScrollX,
            deltaY = parent.scrollTop - parent._gsScrollY;
          if (deltaX || deltaY) {
            if (matrix) {
              startPointerX -= deltaX * matrix.a + deltaY * matrix.c;
              startPointerY -= deltaY * matrix.d + deltaX * matrix.b;
            } else {
              startPointerX -= deltaX;
              startPointerY -= deltaY;
            }
            parent._gsScrollX += deltaX;
            parent._gsScrollY += deltaY;
            setPointerPosition(self.pointerX, self.pointerY);
          }
        }
      },
      onClick = function onClick(e) {
        //this was a huge pain in the neck to align all the various browsers and their behaviors. Chrome, Firefox, Safari, Opera, Android, and Microsoft Edge all handle events differently! Some will only trigger native behavior (like checkbox toggling) from trusted events. Others don't even support isTrusted, but require 2 events to flow through before triggering native behavior. Edge treats everything as trusted but also mandates that 2 flow through to trigger the correct native behavior.
        var time = _getTime(),
          recentlyClicked = time - clickTime < 100,
          recentlyDragged = time - dragEndTime < 50,
          alreadyDispatched = recentlyClicked && clickDispatch === clickTime,
          defaultPrevented = self.pointerEvent && self.pointerEvent.defaultPrevented,
          alreadyDispatchedTrusted = recentlyClicked && trustedClickDispatch === clickTime,
          trusted = e.isTrusted || e.isTrusted == null && recentlyClicked && alreadyDispatched; //note: Safari doesn't support isTrusted, and it won't properly execute native behavior (like toggling checkboxes) on the first synthetic "click" event - we must wait for the 2nd and treat it as trusted (but stop propagation at that point). Confusing, I know. Don't you love cross-browser compatibility challenges?

        if ((alreadyDispatched || recentlyDragged && self.vars.suppressClickOnDrag !== false) && e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }
        if (recentlyClicked && !(self.pointerEvent && self.pointerEvent.defaultPrevented) && (!alreadyDispatched || trusted && !alreadyDispatchedTrusted)) {
          //let the first click pass through unhindered. Let the next one only if it's trusted, then no more (stop quick-succession ones)
          if (trusted && alreadyDispatched) {
            trustedClickDispatch = clickTime;
          }
          clickDispatch = clickTime;
          return;
        }
        if (self.isPressed || recentlyDragged || recentlyClicked) {
          if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
            _preventDefault(e);
          }
        }
        if (!recentlyClicked && !recentlyDragged && !dragged) {
          // for script-triggered event dispatches, like element.click()
          e && e.target && (self.pointerEvent = e);
          _dispatchEvent(self, "click", "onClick");
        }
      },
      localizePoint = function localizePoint(p) {
        return matrix ? {
          x: p.x * matrix.a + p.y * matrix.c + matrix.e,
          y: p.x * matrix.b + p.y * matrix.d + matrix.f
        } : {
          x: p.x,
          y: p.y
        };
      };
    old = Draggable.get(target);
    old && old.kill(); // avoids duplicates (an element can only be controlled by one Draggable)
    //give the user access to start/stop dragging...

    _this2.startDrag = function (event, align) {
      var r1, r2, p1, p2;
      onPress(event || self.pointerEvent, true); //if the pointer isn't on top of the element, adjust things accordingly

      if (align && !self.hitTest(event || self.pointerEvent)) {
        r1 = _parseRect(event || self.pointerEvent);
        r2 = _parseRect(target);
        p1 = localizePoint({
          x: r1.left + r1.width / 2,
          y: r1.top + r1.height / 2
        });
        p2 = localizePoint({
          x: r2.left + r2.width / 2,
          y: r2.top + r2.height / 2
        });
        startPointerX -= p1.x - p2.x;
        startPointerY -= p1.y - p2.y;
      }
      if (!self.isDragging) {
        self.isDragging = dragged = true;
        _dispatchEvent(self, "dragstart", "onDragStart");
      }
    };
    _this2.drag = onMove;
    _this2.endDrag = function (e) {
      return onRelease(e || self.pointerEvent, true);
    };
    _this2.timeSinceDrag = function () {
      return self.isDragging ? 0 : (_getTime() - dragEndTime) / 1000;
    };
    _this2.timeSinceClick = function () {
      return (_getTime() - clickTime) / 1000;
    };
    _this2.hitTest = function (target, threshold) {
      return Draggable.hitTest(self.target, target, threshold);
    };
    _this2.getDirection = function (from, diagonalThreshold) {
      //from can be "start" (default), "velocity", or an element
      var mode = from === "velocity" && InertiaPlugin ? from : _isObject(from) && !rotationMode ? "element" : "start",
        xChange,
        yChange,
        ratio,
        direction,
        r1,
        r2;
      if (mode === "element") {
        r1 = _parseRect(self.target);
        r2 = _parseRect(from);
      }
      xChange = mode === "start" ? self.x - startElementX : mode === "velocity" ? InertiaPlugin.getVelocity(target, xProp) : r1.left + r1.width / 2 - (r2.left + r2.width / 2);
      if (rotationMode) {
        return xChange < 0 ? "counter-clockwise" : "clockwise";
      } else {
        diagonalThreshold = diagonalThreshold || 2;
        yChange = mode === "start" ? self.y - startElementY : mode === "velocity" ? InertiaPlugin.getVelocity(target, yProp) : r1.top + r1.height / 2 - (r2.top + r2.height / 2);
        ratio = Math.abs(xChange / yChange);
        direction = ratio < 1 / diagonalThreshold ? "" : xChange < 0 ? "left" : "right";
        if (ratio < diagonalThreshold) {
          if (direction !== "") {
            direction += "-";
          }
          direction += yChange < 0 ? "up" : "down";
        }
      }
      return direction;
    };
    _this2.applyBounds = function (newBounds, sticky) {
      var x, y, forceZeroVelocity, e, parent, isRoot;
      if (newBounds && vars.bounds !== newBounds) {
        vars.bounds = newBounds;
        return self.update(true, sticky);
      }
      syncXY(true);
      calculateBounds();
      if (hasBounds && !isTweening()) {
        x = self.x;
        y = self.y;
        if (x > maxX) {
          x = maxX;
        } else if (x < minX) {
          x = minX;
        }
        if (y > maxY) {
          y = maxY;
        } else if (y < minY) {
          y = minY;
        }
        if (self.x !== x || self.y !== y) {
          forceZeroVelocity = true;
          self.x = self.endX = x;
          if (rotationMode) {
            self.endRotation = x;
          } else {
            self.y = self.endY = y;
          }
          dirty = true;
          render(true);
          if (self.autoScroll && !self.isDragging) {
            _recordMaxScrolls(target.parentNode);
            e = target;
            _windowProxy.scrollTop = _win.pageYOffset != null ? _win.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
            _windowProxy.scrollLeft = _win.pageXOffset != null ? _win.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;
            while (e && !isRoot) {
              //walk up the chain and sense wherever the scrollTop/scrollLeft exceeds the maximum.
              isRoot = _isRoot(e.parentNode);
              parent = isRoot ? _windowProxy : e.parentNode;
              if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
                parent.scrollTop = parent._gsMaxScrollY;
              }
              if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
                parent.scrollLeft = parent._gsMaxScrollX;
              }
              e = parent;
            }
          }
        }
        if (self.isThrowing && (forceZeroVelocity || self.endX > maxX || self.endX < minX || self.endY > maxY || self.endY < minY)) {
          animate(vars.inertia || vars.throwProps, forceZeroVelocity);
        }
      }
      return self;
    };
    _this2.update = function (applyBounds, sticky, ignoreExternalChanges) {
      if (sticky && self.isPressed) {
        // in case the element was repositioned in the document flow, thus its x/y may be identical but its position is actually quite different.
        var m = (0, _matrix.getGlobalMatrix)(target),
          p = innerMatrix.apply({
            x: self.x - startElementX,
            y: self.y - startElementY
          }),
          m2 = (0, _matrix.getGlobalMatrix)(target.parentNode, true);
        m2.apply({
          x: m.e - p.x,
          y: m.f - p.y
        }, p);
        self.x -= p.x - m2.e;
        self.y -= p.y - m2.f;
        render(true);
        recordStartPositions();
      }
      var x = self.x,
        y = self.y;
      updateMatrix(!sticky);
      if (applyBounds) {
        self.applyBounds();
      } else {
        dirty && ignoreExternalChanges && render(true);
        syncXY(true);
      }
      if (sticky) {
        setPointerPosition(self.pointerX, self.pointerY);
        dirty && render(true);
      }
      if (self.isPressed && !sticky && (allowX && Math.abs(x - self.x) > 0.01 || allowY && Math.abs(y - self.y) > 0.01 && !rotationMode)) {
        recordStartPositions();
      }
      if (self.autoScroll) {
        _recordMaxScrolls(target.parentNode, self.isDragging);
        checkAutoScrollBounds = self.isDragging;
        render(true); //in case reparenting occurred.

        _removeScrollListener(target, updateScroll);
        _addScrollListener(target, updateScroll);
      }
      return self;
    };
    _this2.enable = function (type) {
      var setVars = {
          lazy: true
        },
        id,
        i,
        trigger;
      if (vars.cursor !== false) {
        setVars.cursor = vars.cursor || _defaultCursor;
      }
      if (gsap.utils.checkPrefix("touchCallout")) {
        setVars.touchCallout = "none";
      }
      if (type !== "soft") {
        _setTouchActionForAllDescendants(triggers, allowX === allowY ? "none" : vars.allowNativeTouchScrolling && target.scrollHeight === target.clientHeight === (target.scrollWidth === target.clientHeight) || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x"); // Some browsers like Internet Explorer will fire a pointercancel event when the user attempts to drag when touchAction is "manipulate" because it's perceived as a pan. If the element has scrollable content in only one direction, we should use pan-x or pan-y accordingly so that the pointercancel doesn't prevent dragging.

        i = triggers.length;
        while (--i > -1) {
          trigger = triggers[i];
          _supportsPointer || _addListener(trigger, "mousedown", onPress);
          _addListener(trigger, "touchstart", onPress);
          _addListener(trigger, "click", onClick, true); // note: used to pass true for capture but it prevented click-to-play-video functionality in Firefox.

          gsap.set(trigger, setVars);
          if (trigger.getBBox && trigger.ownerSVGElement && allowX !== allowY) {
            // a bug in chrome doesn't respect touch-action on SVG elements - it only works if we set it on the parent SVG.
            gsap.set(trigger.ownerSVGElement, {
              touchAction: vars.allowNativeTouchScrolling || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x"
            });
          }
          vars.allowContextMenu || _addListener(trigger, "contextmenu", onContextMenu);
        }
        _setSelectable(triggers, false);
      }
      _addScrollListener(target, updateScroll);
      enabled = true;
      if (InertiaPlugin && type !== "soft") {
        InertiaPlugin.track(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      }
      target._gsDragID = id = "d" + _lookupCount++;
      _lookup[id] = self;
      if (scrollProxy) {
        scrollProxy.enable();
        scrollProxy.element._gsDragID = id;
      }
      (vars.bounds || rotationMode) && recordStartPositions();
      vars.bounds && self.applyBounds();
      return self;
    };
    _this2.disable = function (type) {
      var dragging = self.isDragging,
        i = triggers.length,
        trigger;
      while (--i > -1) {
        _setStyle(triggers[i], "cursor", null);
      }
      if (type !== "soft") {
        _setTouchActionForAllDescendants(triggers, null);
        i = triggers.length;
        while (--i > -1) {
          trigger = triggers[i];
          _setStyle(trigger, "touchCallout", null);
          _removeListener(trigger, "mousedown", onPress);
          _removeListener(trigger, "touchstart", onPress);
          _removeListener(trigger, "click", onClick, true);
          _removeListener(trigger, "contextmenu", onContextMenu);
        }
        _setSelectable(triggers, true);
        if (touchEventTarget) {
          _removeListener(touchEventTarget, "touchcancel", onRelease);
          _removeListener(touchEventTarget, "touchend", onRelease);
          _removeListener(touchEventTarget, "touchmove", onMove);
        }
        _removeListener(ownerDoc, "mouseup", onRelease);
        _removeListener(ownerDoc, "mousemove", onMove);
      }
      _removeScrollListener(target, updateScroll);
      enabled = false;
      InertiaPlugin && type !== "soft" && InertiaPlugin.untrack(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
      scrollProxy && scrollProxy.disable();
      _removeFromRenderQueue(render);
      self.isDragging = self.isPressed = isClicking = false;
      dragging && _dispatchEvent(self, "dragend", "onDragEnd");
      return self;
    };
    _this2.enabled = function (value, type) {
      return arguments.length ? value ? self.enable(type) : self.disable(type) : enabled;
    };
    _this2.kill = function () {
      self.isThrowing = false;
      self.tween && self.tween.kill();
      self.disable();
      gsap.set(triggers, {
        clearProps: "userSelect"
      });
      delete _lookup[target._gsDragID];
      return self;
    };
    _this2.revert = function () {
      this.kill();
      this.styles && this.styles.revert();
    };
    if (~type.indexOf("scroll")) {
      scrollProxy = _this2.scrollProxy = new ScrollProxy(target, _extend({
        onKill: function onKill() {
          //ScrollProxy's onKill() gets called if/when the ScrollProxy senses that the user interacted with the scroll position manually (like using the scrollbar). IE9 doesn't fire the "mouseup" properly when users drag the scrollbar of an element, so this works around that issue.
          self.isPressed && onRelease(null);
        }
      }, vars)); //a bug in many Android devices' stock browser causes scrollTop to get forced back to 0 after it is altered via JS, so we set overflow to "hidden" on mobile/touch devices (they hide the scroll bar anyway). That works around the bug. (This bug is discussed at https://code.google.com/p/android/issues/detail?id=19625)

      target.style.overflowY = allowY && !_isTouchDevice ? "auto" : "hidden";
      target.style.overflowX = allowX && !_isTouchDevice ? "auto" : "hidden";
      target = scrollProxy.content;
    }
    if (rotationMode) {
      killProps.rotation = 1;
    } else {
      if (allowX) {
        killProps[xProp] = 1;
      }
      if (allowY) {
        killProps[yProp] = 1;
      }
    }
    gsCache.force3D = "force3D" in vars ? vars.force3D : true; //otherwise, normal dragging would be in 2D and then as soon as it's released and there's an inertia tween, it'd jump to 3D which can create an initial jump due to the work the browser must to do layerize it.

    _context(_assertThisInitialized(_this2));
    _this2.enable();
    return _this2;
  }
  Draggable.register = function register(core) {
    gsap = core;
    _initCore();
  };
  Draggable.create = function create(targets, vars) {
    _coreInitted || _initCore(true);
    return _toArray(targets).map(function (target) {
      return new Draggable(target, vars);
    });
  };
  Draggable.get = function get(target) {
    return _lookup[(_toArray(target)[0] || {})._gsDragID];
  };
  Draggable.timeSinceDrag = function timeSinceDrag() {
    return (_getTime() - _lastDragTime) / 1000;
  };
  Draggable.hitTest = function hitTest(obj1, obj2, threshold) {
    if (obj1 === obj2) {
      return false;
    }
    var r1 = _parseRect(obj1),
      r2 = _parseRect(obj2),
      top = r1.top,
      left = r1.left,
      right = r1.right,
      bottom = r1.bottom,
      width = r1.width,
      height = r1.height,
      isOutside = r2.left > right || r2.right < left || r2.top > bottom || r2.bottom < top,
      overlap,
      area,
      isRatio;
    if (isOutside || !threshold) {
      return !isOutside;
    }
    isRatio = (threshold + "").indexOf("%") !== -1;
    threshold = parseFloat(threshold) || 0;
    overlap = {
      left: Math.max(left, r2.left),
      top: Math.max(top, r2.top)
    };
    overlap.width = Math.min(right, r2.right) - overlap.left;
    overlap.height = Math.min(bottom, r2.bottom) - overlap.top;
    if (overlap.width < 0 || overlap.height < 0) {
      return false;
    }
    if (isRatio) {
      threshold *= 0.01;
      area = overlap.width * overlap.height;
      return area >= width * height * threshold || area >= r2.width * r2.height * threshold;
    }
    return overlap.width > threshold && overlap.height > threshold;
  };
  return Draggable;
}(EventDispatcher);
exports["default"] = exports.Draggable = Draggable;
_setDefaults(Draggable.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: false,
  isPressed: false
});
Draggable.zIndex = 1000;
Draggable.version = "3.11.5";
_getGSAP() && gsap.registerPlugin(Draggable);

},{"./utils/matrix.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Flip = void 0;
var _matrix = require("./utils/matrix.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); } /*!
                                                                                                                                                                                                                                                                                                                                                  * Flip 3.11.5
                                                                                                                                                                                                                                                                                                                                                  * https://greensock.com
                                                                                                                                                                                                                                                                                                                                                  *
                                                                                                                                                                                                                                                                                                                                                  * @license Copyright 2008-2023, GreenSock. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                  * Subject to the terms at https://greensock.com/standard-license or for
                                                                                                                                                                                                                                                                                                                                                  * Club GreenSock members, the agreement issued with that membership.
                                                                                                                                                                                                                                                                                                                                                  * @author: Jack Doyle, jack@greensock.com
                                                                                                                                                                                                                                                                                                                                                 */ /* eslint-disable */
var _id = 1,
  _toArray,
  gsap,
  _batch,
  _batchAction,
  _body,
  _closestTenth,
  _getStyleSaver,
  _forEachBatch = function _forEachBatch(batch, name) {
    return batch.actions.forEach(function (a) {
      return a.vars[name] && a.vars[name](a);
    });
  },
  _batchLookup = {},
  _RAD2DEG = 180 / Math.PI,
  _DEG2RAD = Math.PI / 180,
  _emptyObj = {},
  _dashedNameLookup = {},
  _memoizedRemoveProps = {},
  _listToArray = function _listToArray(list) {
    return typeof list === "string" ? list.split(" ").join("").split(",") : list;
  },
  // removes extra spaces contaminating the names, returns an Array.
  _callbacks = _listToArray("onStart,onUpdate,onComplete,onReverseComplete,onInterrupt"),
  _removeProps = _listToArray("transform,transformOrigin,width,height,position,top,left,opacity,zIndex,maxWidth,maxHeight,minWidth,minHeight"),
  _getEl = function _getEl(target) {
    return _toArray(target)[0] || console.warn("Element not found:", target);
  },
  _round = function _round(value) {
    return Math.round(value * 10000) / 10000 || 0;
  },
  _toggleClass = function _toggleClass(targets, className, action) {
    return targets.forEach(function (el) {
      return el.classList[action](className);
    });
  },
  _reserved = {
    zIndex: 1,
    kill: 1,
    simple: 1,
    spin: 1,
    clearProps: 1,
    targets: 1,
    toggleClass: 1,
    onComplete: 1,
    onUpdate: 1,
    onInterrupt: 1,
    onStart: 1,
    delay: 1,
    repeat: 1,
    repeatDelay: 1,
    yoyo: 1,
    scale: 1,
    fade: 1,
    absolute: 1,
    props: 1,
    onEnter: 1,
    onLeave: 1,
    custom: 1,
    paused: 1,
    nested: 1,
    prune: 1,
    absoluteOnLeave: 1
  },
  _fitReserved = {
    zIndex: 1,
    simple: 1,
    clearProps: 1,
    scale: 1,
    absolute: 1,
    fitChild: 1,
    getVars: 1,
    props: 1
  },
  _camelToDashed = function _camelToDashed(p) {
    return p.replace(/([A-Z])/g, "-$1").toLowerCase();
  },
  _copy = function _copy(obj, exclude) {
    var result = {},
      p;
    for (p in obj) {
      exclude[p] || (result[p] = obj[p]);
    }
    return result;
  },
  _memoizedProps = {},
  _memoizeProps = function _memoizeProps(props) {
    var p = _memoizedProps[props] = _listToArray(props);
    _memoizedRemoveProps[props] = p.concat(_removeProps);
    return p;
  },
  _getInverseGlobalMatrix = function _getInverseGlobalMatrix(el) {
    // integrates caching for improved performance
    var cache = el._gsap || gsap.core.getCache(el);
    if (cache.gmCache === gsap.ticker.frame) {
      return cache.gMatrix;
    }
    cache.gmCache = gsap.ticker.frame;
    return cache.gMatrix = (0, _matrix.getGlobalMatrix)(el, true, false, true);
  },
  _getDOMDepth = function _getDOMDepth(el, invert, level) {
    if (level === void 0) {
      level = 0;
    }

    // In invert is true, the sibling depth is increments of 1, and parent/nesting depth is increments of 1000. This lets us order elements in an Array to reflect document flow.
    var parent = el.parentNode,
      inc = 1000 * Math.pow(10, level) * (invert ? -1 : 1),
      l = invert ? -inc * 900 : 0;
    while (el) {
      l += inc;
      el = el.previousSibling;
    }
    return parent ? l + _getDOMDepth(parent, invert, level + 1) : l;
  },
  _orderByDOMDepth = function _orderByDOMDepth(comps, invert, isElStates) {
    comps.forEach(function (comp) {
      return comp.d = _getDOMDepth(isElStates ? comp.element : comp.t, invert);
    });
    comps.sort(function (c1, c2) {
      return c1.d - c2.d;
    });
    return comps;
  },
  _recordInlineStyles = function _recordInlineStyles(elState, props) {
    // records the current inline CSS properties into an Array in alternating name/value pairs that's stored in a "css" property on the state object so that we can revert later.
    var style = elState.element.style,
      a = elState.css = elState.css || [],
      i = props.length,
      p,
      v;
    while (i--) {
      p = props[i];
      v = style[p] || style.getPropertyValue(p);
      a.push(v ? p : _dashedNameLookup[p] || (_dashedNameLookup[p] = _camelToDashed(p)), v);
    }
    return style;
  },
  _applyInlineStyles = function _applyInlineStyles(state) {
    var css = state.css,
      style = state.element.style,
      i = 0;
    state.cache.uncache = 1;
    for (; i < css.length; i += 2) {
      css[i + 1] ? style[css[i]] = css[i + 1] : style.removeProperty(css[i]);
    }
    if (!css[css.indexOf("transform") + 1] && style.translate) {
      // CSSPlugin adds scale, translate, and rotate inline CSS as "none" in order to keep CSS rules from contaminating transforms.
      style.removeProperty("translate");
      style.removeProperty("scale");
      style.removeProperty("rotate");
    }
  },
  _setFinalStates = function _setFinalStates(comps, onlyTransforms) {
    comps.forEach(function (c) {
      return c.a.cache.uncache = 1;
    });
    onlyTransforms || comps.finalStates.forEach(_applyInlineStyles);
  },
  _absoluteProps = "paddingTop,paddingRight,paddingBottom,paddingLeft,gridArea,transition".split(","),
  // properties that we must record just
  _makeAbsolute = function _makeAbsolute(elState, fallbackNode, ignoreBatch) {
    var element = elState.element,
      width = elState.width,
      height = elState.height,
      uncache = elState.uncache,
      getProp = elState.getProp,
      style = element.style,
      i = 4,
      result,
      displayIsNone,
      cs;
    _typeof(fallbackNode) !== "object" && (fallbackNode = elState);
    if (_batch && ignoreBatch !== 1) {
      _batch._abs.push({
        t: element,
        b: elState,
        a: elState,
        sd: 0
      });
      _batch._final.push(function () {
        return (elState.cache.uncache = 1) && _applyInlineStyles(elState);
      });
      return element;
    }
    displayIsNone = getProp("display") === "none";
    if (!elState.isVisible || displayIsNone) {
      displayIsNone && (_recordInlineStyles(elState, ["display"]).display = fallbackNode.display);
      elState.matrix = fallbackNode.matrix;
      elState.width = width = elState.width || fallbackNode.width;
      elState.height = height = elState.height || fallbackNode.height;
    }
    _recordInlineStyles(elState, _absoluteProps);
    cs = window.getComputedStyle(element);
    while (i--) {
      style[_absoluteProps[i]] = cs[_absoluteProps[i]]; // record paddings as px-based because if removed from grid, percentage-based ones could be altered.
    }

    style.gridArea = "1 / 1 / 1 / 1";
    style.transition = "none";
    style.position = "absolute";
    style.width = width + "px";
    style.height = height + "px";
    style.top || (style.top = "0px");
    style.left || (style.left = "0px");
    if (uncache) {
      result = new ElementState(element);
    } else {
      // better performance
      result = _copy(elState, _emptyObj);
      result.position = "absolute";
      if (elState.simple) {
        var bounds = element.getBoundingClientRect();
        result.matrix = new _matrix.Matrix2D(1, 0, 0, 1, bounds.left + (0, _matrix._getDocScrollLeft)(), bounds.top + (0, _matrix._getDocScrollTop)());
      } else {
        result.matrix = (0, _matrix.getGlobalMatrix)(element, false, false, true);
      }
    }
    result = _fit(result, elState, true);
    elState.x = _closestTenth(result.x, 0.01);
    elState.y = _closestTenth(result.y, 0.01);
    return element;
  },
  _filterComps = function _filterComps(comps, targets) {
    if (targets !== true) {
      targets = _toArray(targets);
      comps = comps.filter(function (c) {
        if (targets.indexOf((c.sd < 0 ? c.b : c.a).element) !== -1) {
          return true;
        } else {
          c.t._gsap.renderTransform(1); // we must force transforms to render on anything that isn't being made position: absolute, otherwise the absolute position happens and then when animation begins it applies transforms which can create a new stacking context, throwing off positioning!

          if (c.b.isVisible) {
            c.t.style.width = c.b.width + "px"; // otherwise things can collapse when contents are made position: absolute.

            c.t.style.height = c.b.height + "px";
          }
        }
      });
    }
    return comps;
  },
  _makeCompsAbsolute = function _makeCompsAbsolute(comps) {
    return _orderByDOMDepth(comps, true).forEach(function (c) {
      return (c.a.isVisible || c.b.isVisible) && _makeAbsolute(c.sd < 0 ? c.b : c.a, c.b, 1);
    });
  },
  _findElStateInState = function _findElStateInState(state, other) {
    return other && state.idLookup[_parseElementState(other).id] || state.elementStates[0];
  },
  _parseElementState = function _parseElementState(elOrNode, props, simple, other) {
    return elOrNode instanceof ElementState ? elOrNode : elOrNode instanceof FlipState ? _findElStateInState(elOrNode, other) : new ElementState(typeof elOrNode === "string" ? _getEl(elOrNode) || console.warn(elOrNode + " not found") : elOrNode, props, simple);
  },
  _recordProps = function _recordProps(elState, props) {
    var getProp = gsap.getProperty(elState.element, null, "native"),
      obj = elState.props = {},
      i = props.length;
    while (i--) {
      obj[props[i]] = (getProp(props[i]) + "").trim();
    }
    obj.zIndex && (obj.zIndex = parseFloat(obj.zIndex) || 0);
    return elState;
  },
  _applyProps = function _applyProps(element, props) {
    var style = element.style || element,
      // could pass in a vars object.
      p;
    for (p in props) {
      style[p] = props[p];
    }
  },
  _getID = function _getID(el) {
    var id = el.getAttribute("data-flip-id");
    id || el.setAttribute("data-flip-id", id = "auto-" + _id++);
    return id;
  },
  _elementsFromElementStates = function _elementsFromElementStates(elStates) {
    return elStates.map(function (elState) {
      return elState.element;
    });
  },
  _handleCallback = function _handleCallback(callback, elStates, tl) {
    return callback && elStates.length && tl.add(callback(_elementsFromElementStates(elStates), tl, new FlipState(elStates, 0, true)), 0);
  },
  _fit = function _fit(fromState, toState, scale, applyProps, fitChild, vars) {
    var element = fromState.element,
      cache = fromState.cache,
      parent = fromState.parent,
      x = fromState.x,
      y = fromState.y,
      width = toState.width,
      height = toState.height,
      scaleX = toState.scaleX,
      scaleY = toState.scaleY,
      rotation = toState.rotation,
      bounds = toState.bounds,
      styles = vars && _getStyleSaver && _getStyleSaver(element, "transform"),
      dimensionState = fromState,
      _toState$matrix = toState.matrix,
      e = _toState$matrix.e,
      f = _toState$matrix.f,
      deep = fromState.bounds.width !== bounds.width || fromState.bounds.height !== bounds.height || fromState.scaleX !== scaleX || fromState.scaleY !== scaleY || fromState.rotation !== rotation,
      simple = !deep && fromState.simple && toState.simple && !fitChild,
      skewX,
      fromPoint,
      toPoint,
      getProp,
      parentMatrix,
      matrix,
      bbox;
    if (simple || !parent) {
      scaleX = scaleY = 1;
      rotation = skewX = 0;
    } else {
      parentMatrix = _getInverseGlobalMatrix(parent);
      matrix = parentMatrix.clone().multiply(toState.ctm ? toState.matrix.clone().multiply(toState.ctm) : toState.matrix); // root SVG elements have a ctm that we must factor out (for example, viewBox:"0 0 94 94" with a width of 200px would scale the internals by 2.127 but when we're matching the size of the root <svg> element itself, that scaling shouldn't factor in!)

      rotation = _round(Math.atan2(matrix.b, matrix.a) * _RAD2DEG);
      skewX = _round(Math.atan2(matrix.c, matrix.d) * _RAD2DEG + rotation) % 360; // in very rare cases, minor rounding might end up with 360 which should be 0.

      scaleX = Math.sqrt(Math.pow(matrix.a, 2) + Math.pow(matrix.b, 2));
      scaleY = Math.sqrt(Math.pow(matrix.c, 2) + Math.pow(matrix.d, 2)) * Math.cos(skewX * _DEG2RAD);
      if (fitChild) {
        fitChild = _toArray(fitChild)[0];
        getProp = gsap.getProperty(fitChild);
        bbox = fitChild.getBBox && typeof fitChild.getBBox === "function" && fitChild.getBBox();
        dimensionState = {
          scaleX: getProp("scaleX"),
          scaleY: getProp("scaleY"),
          width: bbox ? bbox.width : Math.ceil(parseFloat(getProp("width", "px"))),
          height: bbox ? bbox.height : parseFloat(getProp("height", "px"))
        };
      }
      cache.rotation = rotation + "deg";
      cache.skewX = skewX + "deg";
    }
    if (scale) {
      scaleX *= width === dimensionState.width || !dimensionState.width ? 1 : width / dimensionState.width; // note if widths are both 0, we should make scaleX 1 - some elements have box-sizing that incorporates padding, etc. and we don't want it to collapse in that case.

      scaleY *= height === dimensionState.height || !dimensionState.height ? 1 : height / dimensionState.height;
      cache.scaleX = scaleX;
      cache.scaleY = scaleY;
    } else {
      width = _closestTenth(width * scaleX / dimensionState.scaleX, 0);
      height = _closestTenth(height * scaleY / dimensionState.scaleY, 0);
      element.style.width = width + "px";
      element.style.height = height + "px";
    } // if (fromState.isFixed) { // commented out because it's now taken care of in getGlobalMatrix() with a flag at the end.
    // 	e -= _getDocScrollLeft();
    // 	f -= _getDocScrollTop();
    // }

    applyProps && _applyProps(element, toState.props);
    if (simple || !parent) {
      x += e - fromState.matrix.e;
      y += f - fromState.matrix.f;
    } else if (deep || parent !== toState.parent) {
      cache.renderTransform(1, cache);
      matrix = (0, _matrix.getGlobalMatrix)(fitChild || element, false, false, true);
      fromPoint = parentMatrix.apply({
        x: matrix.e,
        y: matrix.f
      });
      toPoint = parentMatrix.apply({
        x: e,
        y: f
      });
      x += toPoint.x - fromPoint.x;
      y += toPoint.y - fromPoint.y;
    } else {
      // use a faster/cheaper algorithm if we're just moving x/y
      parentMatrix.e = parentMatrix.f = 0;
      toPoint = parentMatrix.apply({
        x: e - fromState.matrix.e,
        y: f - fromState.matrix.f
      });
      x += toPoint.x;
      y += toPoint.y;
    }
    x = _closestTenth(x, 0.02);
    y = _closestTenth(y, 0.02);
    if (vars && !(vars instanceof ElementState)) {
      // revert
      styles && styles.revert();
    } else {
      // or apply the transform immediately
      cache.x = x + "px";
      cache.y = y + "px";
      cache.renderTransform(1, cache);
    }
    if (vars) {
      vars.x = x;
      vars.y = y;
      vars.rotation = rotation;
      vars.skewX = skewX;
      if (scale) {
        vars.scaleX = scaleX;
        vars.scaleY = scaleY;
      } else {
        vars.width = width;
        vars.height = height;
      }
    }
    return vars || cache;
  },
  _parseState = function _parseState(targetsOrState, vars) {
    return targetsOrState instanceof FlipState ? targetsOrState : new FlipState(targetsOrState, vars);
  },
  _getChangingElState = function _getChangingElState(toState, fromState, id) {
    var to1 = toState.idLookup[id],
      to2 = toState.alt[id];
    return to2.isVisible && (!(fromState.getElementState(to2.element) || to2).isVisible || !to1.isVisible) ? to2 : to1;
  },
  _bodyMetrics = [],
  _bodyProps = "width,height,overflowX,overflowY".split(","),
  _bodyLocked,
  _lockBodyScroll = function _lockBodyScroll(lock) {
    // if there's no scrollbar, we should lock that so that measurements don't get affected by temporary repositioning, like if something is centered in the window.
    if (lock !== _bodyLocked) {
      var s = _body.style,
        w = _body.clientWidth === window.outerWidth,
        h = _body.clientHeight === window.outerHeight,
        i = 4;
      if (lock && (w || h)) {
        while (i--) {
          _bodyMetrics[i] = s[_bodyProps[i]];
        }
        if (w) {
          s.width = _body.clientWidth + "px";
          s.overflowY = "hidden";
        }
        if (h) {
          s.height = _body.clientHeight + "px";
          s.overflowX = "hidden";
        }
        _bodyLocked = lock;
      } else if (_bodyLocked) {
        while (i--) {
          _bodyMetrics[i] ? s[_bodyProps[i]] = _bodyMetrics[i] : s.removeProperty(_camelToDashed(_bodyProps[i]));
        }
        _bodyLocked = lock;
      }
    }
  },
  _fromTo = function _fromTo(fromState, toState, vars, relative) {
    // relative is -1 if "from()", and 1 if "to()"
    fromState instanceof FlipState && toState instanceof FlipState || console.warn("Not a valid state object.");
    vars = vars || {};
    var _vars = vars,
      clearProps = _vars.clearProps,
      onEnter = _vars.onEnter,
      onLeave = _vars.onLeave,
      absolute = _vars.absolute,
      absoluteOnLeave = _vars.absoluteOnLeave,
      custom = _vars.custom,
      delay = _vars.delay,
      paused = _vars.paused,
      repeat = _vars.repeat,
      repeatDelay = _vars.repeatDelay,
      yoyo = _vars.yoyo,
      toggleClass = _vars.toggleClass,
      nested = _vars.nested,
      _zIndex = _vars.zIndex,
      scale = _vars.scale,
      fade = _vars.fade,
      stagger = _vars.stagger,
      spin = _vars.spin,
      prune = _vars.prune,
      props = ("props" in vars ? vars : fromState).props,
      tweenVars = _copy(vars, _reserved),
      animation = gsap.timeline({
        delay: delay,
        paused: paused,
        repeat: repeat,
        repeatDelay: repeatDelay,
        yoyo: yoyo,
        data: "isFlip"
      }),
      remainingProps = tweenVars,
      entering = [],
      leaving = [],
      comps = [],
      swapOutTargets = [],
      spinNum = spin === true ? 1 : spin || 0,
      spinFunc = typeof spin === "function" ? spin : function () {
        return spinNum;
      },
      interrupted = fromState.interrupted || toState.interrupted,
      addFunc = animation[relative !== 1 ? "to" : "from"],
      v,
      p,
      endTime,
      i,
      el,
      comp,
      state,
      targets,
      finalStates,
      fromNode,
      toNode,
      run,
      a,
      b; //relative || (toState = (new FlipState(toState.targets, {props: props})).fit(toState, scale));

    for (p in toState.idLookup) {
      toNode = !toState.alt[p] ? toState.idLookup[p] : _getChangingElState(toState, fromState, p);
      el = toNode.element;
      fromNode = fromState.idLookup[p];
      fromState.alt[p] && el === fromNode.element && (fromState.alt[p].isVisible || !toNode.isVisible) && (fromNode = fromState.alt[p]);
      if (fromNode) {
        comp = {
          t: el,
          b: fromNode,
          a: toNode,
          sd: fromNode.element === el ? 0 : toNode.isVisible ? 1 : -1
        };
        comps.push(comp);
        if (comp.sd) {
          if (comp.sd < 0) {
            comp.b = toNode;
            comp.a = fromNode;
          } // for swapping elements that got interrupted, we must re-record the inline styles to ensure they're not tainted. Remember, .batch() permits getState() not to force in-progress flips to their end state.

          interrupted && _recordInlineStyles(comp.b, props ? _memoizedRemoveProps[props] : _removeProps);
          fade && comps.push(comp.swap = {
            t: fromNode.element,
            b: comp.b,
            a: comp.a,
            sd: -comp.sd,
            swap: comp
          });
        }
        el._flip = fromNode.element._flip = _batch ? _batch.timeline : animation;
      } else if (toNode.isVisible) {
        comps.push({
          t: el,
          b: _copy(toNode, {
            isVisible: 1
          }),
          a: toNode,
          sd: 0,
          entering: 1
        }); // to include it in the "entering" Array and do absolute positioning if necessary

        el._flip = _batch ? _batch.timeline : animation;
      }
    }
    props && (_memoizedProps[props] || _memoizeProps(props)).forEach(function (p) {
      return tweenVars[p] = function (i) {
        return comps[i].a.props[p];
      };
    });
    comps.finalStates = finalStates = [];
    run = function run() {
      _orderByDOMDepth(comps);
      _lockBodyScroll(true); // otherwise, measurements may get thrown off when things get fit.
      // TODO: cache the matrix, especially for parent because it'll probably get reused quite a bit, but lock it to a particular cycle(?).

      for (i = 0; i < comps.length; i++) {
        comp = comps[i];
        a = comp.a;
        b = comp.b;
        if (prune && !a.isDifferent(b) && !comp.entering) {
          // only flip if things changed! Don't omit it from comps initially because that'd prevent the element from being positioned absolutely (if necessary)
          comps.splice(i--, 1);
        } else {
          el = comp.t;
          nested && !(comp.sd < 0) && i && (a.matrix = (0, _matrix.getGlobalMatrix)(el, false, false, true)); // moving a parent affects the position of children

          if (b.isVisible && a.isVisible) {
            if (comp.sd < 0) {
              // swapping OUT (swap direction of -1 is out)
              state = new ElementState(el, props, fromState.simple);
              _fit(state, a, scale, 0, 0, state);
              state.matrix = (0, _matrix.getGlobalMatrix)(el, false, false, true);
              state.css = comp.b.css;
              comp.a = a = state;
              fade && (el.style.opacity = interrupted ? b.opacity : a.opacity);
              stagger && swapOutTargets.push(el);
            } else if (comp.sd > 0 && fade) {
              // swapping IN (swap direction of 1 is in)
              el.style.opacity = interrupted ? a.opacity - b.opacity : "0";
            }
            _fit(a, b, scale, props);
          } else if (b.isVisible !== a.isVisible) {
            // either entering or leaving (one side is invisible)
            if (!b.isVisible) {
              // entering
              a.isVisible && entering.push(a);
              comps.splice(i--, 1);
            } else if (!a.isVisible) {
              // leaving
              b.css = a.css;
              leaving.push(b);
              comps.splice(i--, 1);
              absolute && nested && _fit(a, b, scale, props);
            }
          }
          if (!scale) {
            el.style.maxWidth = Math.max(a.width, b.width) + "px";
            el.style.maxHeight = Math.max(a.height, b.height) + "px";
            el.style.minWidth = Math.min(a.width, b.width) + "px";
            el.style.minHeight = Math.min(a.height, b.height) + "px";
          }
          nested && toggleClass && el.classList.add(toggleClass);
        }
        finalStates.push(a);
      }
      var classTargets;
      if (toggleClass) {
        classTargets = finalStates.map(function (s) {
          return s.element;
        });
        nested && classTargets.forEach(function (e) {
          return e.classList.remove(toggleClass);
        }); // there could be a delay, so don't leave the classes applied (we'll do it in a timeline callback)
      }

      _lockBodyScroll(false);
      if (scale) {
        tweenVars.scaleX = function (i) {
          return comps[i].a.scaleX;
        };
        tweenVars.scaleY = function (i) {
          return comps[i].a.scaleY;
        };
      } else {
        tweenVars.width = function (i) {
          return comps[i].a.width + "px";
        };
        tweenVars.height = function (i) {
          return comps[i].a.height + "px";
        };
        tweenVars.autoRound = vars.autoRound || false;
      }
      tweenVars.x = function (i) {
        return comps[i].a.x + "px";
      };
      tweenVars.y = function (i) {
        return comps[i].a.y + "px";
      };
      tweenVars.rotation = function (i) {
        return comps[i].a.rotation + (spin ? spinFunc(i, targets[i], targets) * 360 : 0);
      };
      tweenVars.skewX = function (i) {
        return comps[i].a.skewX;
      };
      targets = comps.map(function (c) {
        return c.t;
      });
      if (_zIndex || _zIndex === 0) {
        tweenVars.modifiers = {
          zIndex: function zIndex() {
            return _zIndex;
          }
        };
        tweenVars.zIndex = _zIndex;
        tweenVars.immediateRender = vars.immediateRender !== false;
      }
      fade && (tweenVars.opacity = function (i) {
        return comps[i].sd < 0 ? 0 : comps[i].sd > 0 ? comps[i].a.opacity : "+=0";
      });
      if (swapOutTargets.length) {
        stagger = gsap.utils.distribute(stagger);
        var dummyArray = targets.slice(swapOutTargets.length);
        tweenVars.stagger = function (i, el) {
          return stagger(~swapOutTargets.indexOf(el) ? targets.indexOf(comps[i].swap.t) : i, el, dummyArray);
        };
      } // // for testing...
      // gsap.delayedCall(vars.data ? 50 : 1, function() {
      // 	animation.eventCallback("onComplete", () => _setFinalStates(comps, !clearProps));
      // 	addFunc.call(animation, targets, tweenVars, 0).play();
      // });
      // return;

      _callbacks.forEach(function (name) {
        return vars[name] && animation.eventCallback(name, vars[name], vars[name + "Params"]);
      }); // apply callbacks to the timeline, not tweens (because "custom" timing can make multiple tweens)

      if (custom && targets.length) {
        // bust out the custom properties as their own tweens so they can use different eases, durations, etc.
        remainingProps = _copy(tweenVars, _reserved);
        if ("scale" in custom) {
          custom.scaleX = custom.scaleY = custom.scale;
          delete custom.scale;
        }
        for (p in custom) {
          v = _copy(custom[p], _fitReserved);
          v[p] = tweenVars[p];
          !("duration" in v) && "duration" in tweenVars && (v.duration = tweenVars.duration);
          v.stagger = tweenVars.stagger;
          addFunc.call(animation, targets, v, 0);
          delete remainingProps[p];
        }
      }
      if (targets.length || leaving.length || entering.length) {
        toggleClass && animation.add(function () {
          return _toggleClass(classTargets, toggleClass, animation._zTime < 0 ? "remove" : "add");
        }, 0) && !paused && _toggleClass(classTargets, toggleClass, "add");
        targets.length && addFunc.call(animation, targets, remainingProps, 0);
      }
      _handleCallback(onEnter, entering, animation);
      _handleCallback(onLeave, leaving, animation);
      var batchTl = _batch && _batch.timeline;
      if (batchTl) {
        batchTl.add(animation, 0);
        _batch._final.push(function () {
          return _setFinalStates(comps, !clearProps);
        });
      }
      endTime = animation.duration();
      animation.call(function () {
        var forward = animation.time() >= endTime;
        forward && !batchTl && _setFinalStates(comps, !clearProps);
        toggleClass && _toggleClass(classTargets, toggleClass, forward ? "remove" : "add");
      });
    };
    absoluteOnLeave && (absolute = comps.filter(function (comp) {
      return !comp.sd && !comp.a.isVisible && comp.b.isVisible;
    }).map(function (comp) {
      return comp.a.element;
    }));
    if (_batch) {
      var _batch$_abs;
      absolute && (_batch$_abs = _batch._abs).push.apply(_batch$_abs, _filterComps(comps, absolute));
      _batch._run.push(run);
    } else {
      absolute && _makeCompsAbsolute(_filterComps(comps, absolute)); // when making absolute, we must go in a very particular order so that document flow changes don't affect things. Don't make it visible if both the before and after states are invisible! There's no point, and it could make things appear visible during the flip that shouldn't be.

      run();
    }
    var anim = _batch ? _batch.timeline : animation;
    anim.revert = function () {
      return _killFlip(anim, 1);
    }; // a Flip timeline should behave very different when reverting - it should actually jump to the end so that styles get cleared out.

    return anim;
  },
  _interrupt = function _interrupt(tl) {
    tl.vars.onInterrupt && tl.vars.onInterrupt.apply(tl, tl.vars.onInterruptParams || []);
    tl.getChildren(true, false, true).forEach(_interrupt);
  },
  _killFlip = function _killFlip(tl, action) {
    // action: 0 = nothing, 1 = complete, 2 = only kill (don't complete)
    if (tl && tl.progress() < 1 && !tl.paused()) {
      if (action) {
        _interrupt(tl);
        action < 2 && tl.progress(1); // we should also kill it in case it was added to a parent timeline.

        tl.kill();
      }
      return true;
    }
  },
  _createLookup = function _createLookup(state) {
    var lookup = state.idLookup = {},
      alt = state.alt = {},
      elStates = state.elementStates,
      i = elStates.length,
      elState;
    while (i--) {
      elState = elStates[i];
      lookup[elState.id] ? alt[elState.id] = elState : lookup[elState.id] = elState;
    }
  };
var FlipState = /*#__PURE__*/function () {
  function FlipState(targets, vars, targetsAreElementStates) {
    this.props = vars && vars.props;
    this.simple = !!(vars && vars.simple);
    if (targetsAreElementStates) {
      this.targets = _elementsFromElementStates(targets);
      this.elementStates = targets;
      _createLookup(this);
    } else {
      this.targets = _toArray(targets);
      var soft = vars && (vars.kill === false || vars.batch && !vars.kill);
      _batch && !soft && _batch._kill.push(this);
      this.update(soft || !!_batch); // when batching, don't force in-progress flips to their end; we need to do that AFTER all getStates() are called.
    }
  }

  var _proto = FlipState.prototype;
  _proto.update = function update(soft) {
    var _this = this;
    this.elementStates = this.targets.map(function (el) {
      return new ElementState(el, _this.props, _this.simple);
    });
    _createLookup(this);
    this.interrupt(soft);
    this.recordInlineStyles();
    return this;
  };
  _proto.clear = function clear() {
    this.targets.length = this.elementStates.length = 0;
    _createLookup(this);
    return this;
  };
  _proto.fit = function fit(state, scale, nested) {
    var elStatesInOrder = _orderByDOMDepth(this.elementStates.slice(0), false, true),
      toElStates = (state || this).idLookup,
      i = 0,
      fromNode,
      toNode;
    for (; i < elStatesInOrder.length; i++) {
      fromNode = elStatesInOrder[i];
      nested && (fromNode.matrix = (0, _matrix.getGlobalMatrix)(fromNode.element, false, false, true)); // moving a parent affects the position of children

      toNode = toElStates[fromNode.id];
      toNode && _fit(fromNode, toNode, scale, true, 0, fromNode);
      fromNode.matrix = (0, _matrix.getGlobalMatrix)(fromNode.element, false, false, true);
    }
    return this;
  };
  _proto.getProperty = function getProperty(element, property) {
    var es = this.getElementState(element) || _emptyObj;
    return (property in es ? es : es.props || _emptyObj)[property];
  };
  _proto.add = function add(state) {
    var i = state.targets.length,
      lookup = this.idLookup,
      alt = this.alt,
      index,
      es,
      es2;
    while (i--) {
      es = state.elementStates[i];
      es2 = lookup[es.id];
      if (es2 && (es.element === es2.element || alt[es.id] && alt[es.id].element === es.element)) {
        // if the flip id is already in this FlipState, replace it!
        index = this.elementStates.indexOf(es.element === es2.element ? es2 : alt[es.id]);
        this.targets.splice(index, 1, state.targets[i]);
        this.elementStates.splice(index, 1, es);
      } else {
        this.targets.push(state.targets[i]);
        this.elementStates.push(es);
      }
    }
    state.interrupted && (this.interrupted = true);
    state.simple || (this.simple = false);
    _createLookup(this);
    return this;
  };
  _proto.compare = function compare(state) {
    var l1 = state.idLookup,
      l2 = this.idLookup,
      unchanged = [],
      changed = [],
      enter = [],
      leave = [],
      targets = [],
      a1 = state.alt,
      a2 = this.alt,
      place = function place(s1, s2, el) {
        return (s1.isVisible !== s2.isVisible ? s1.isVisible ? enter : leave : s1.isVisible ? changed : unchanged).push(el) && targets.push(el);
      },
      placeIfDoesNotExist = function placeIfDoesNotExist(s1, s2, el) {
        return targets.indexOf(el) < 0 && place(s1, s2, el);
      },
      s1,
      s2,
      p,
      el,
      s1Alt,
      s2Alt,
      c1,
      c2;
    for (p in l1) {
      s1Alt = a1[p];
      s2Alt = a2[p];
      s1 = !s1Alt ? l1[p] : _getChangingElState(state, this, p);
      el = s1.element;
      s2 = l2[p];
      if (s2Alt) {
        c2 = s2.isVisible || !s2Alt.isVisible && el === s2.element ? s2 : s2Alt;
        c1 = s1Alt && !s1.isVisible && !s1Alt.isVisible && c2.element === s1Alt.element ? s1Alt : s1; //c1.element !== c2.element && c1.element === s2.element && (c2 = s2);

        if (c1.isVisible && c2.isVisible && c1.element !== c2.element) {
          // swapping, so force into "changed" array
          (c1.isDifferent(c2) ? changed : unchanged).push(c1.element, c2.element);
          targets.push(c1.element, c2.element);
        } else {
          place(c1, c2, c1.element);
        }
        s1Alt && c1.element === s1Alt.element && (s1Alt = l1[p]);
        placeIfDoesNotExist(c1.element !== s2.element && s1Alt ? s1Alt : c1, s2, s2.element);
        placeIfDoesNotExist(s1Alt && s1Alt.element === s2Alt.element ? s1Alt : c1, s2Alt, s2Alt.element);
        s1Alt && placeIfDoesNotExist(s1Alt, s2Alt.element === s1Alt.element ? s2Alt : s2, s1Alt.element);
      } else {
        !s2 ? enter.push(el) : !s2.isDifferent(s1) ? unchanged.push(el) : place(s1, s2, el);
        s1Alt && placeIfDoesNotExist(s1Alt, s2, s1Alt.element);
      }
    }
    for (p in l2) {
      if (!l1[p]) {
        leave.push(l2[p].element);
        a2[p] && leave.push(a2[p].element);
      }
    }
    return {
      changed: changed,
      unchanged: unchanged,
      enter: enter,
      leave: leave
    };
  };
  _proto.recordInlineStyles = function recordInlineStyles() {
    var props = _memoizedRemoveProps[this.props] || _removeProps,
      i = this.elementStates.length;
    while (i--) {
      _recordInlineStyles(this.elementStates[i], props);
    }
  };
  _proto.interrupt = function interrupt(soft) {
    var _this2 = this;

    // soft = DON'T force in-progress flip animations to completion (like when running a batch, we can't immediately kill flips when getting states because it could contaminate positioning and other .getState() calls that will run in the batch (we kill AFTER all the .getState() calls complete).
    var timelines = [];
    this.targets.forEach(function (t) {
      var tl = t._flip,
        foundInProgress = _killFlip(tl, soft ? 0 : 1);
      soft && foundInProgress && timelines.indexOf(tl) < 0 && tl.add(function () {
        return _this2.updateVisibility();
      });
      foundInProgress && timelines.push(tl);
    });
    !soft && timelines.length && this.updateVisibility(); // if we found an in-progress Flip animation, we must record all the values in their current state at that point BUT we should update the isVisible value AFTER pushing that flip to completion so that elements that are entering or leaving will populate those Arrays properly.

    this.interrupted || (this.interrupted = !!timelines.length);
  };
  _proto.updateVisibility = function updateVisibility() {
    this.elementStates.forEach(function (es) {
      var b = es.element.getBoundingClientRect();
      es.isVisible = !!(b.width || b.height || b.top || b.left);
      es.uncache = 1;
    });
  };
  _proto.getElementState = function getElementState(element) {
    return this.elementStates[this.targets.indexOf(_getEl(element))];
  };
  _proto.makeAbsolute = function makeAbsolute() {
    return _orderByDOMDepth(this.elementStates.slice(0), true, true).map(_makeAbsolute);
  };
  return FlipState;
}();
var ElementState = /*#__PURE__*/function () {
  function ElementState(element, props, simple) {
    this.element = element;
    this.update(props, simple);
  }
  var _proto2 = ElementState.prototype;
  _proto2.isDifferent = function isDifferent(state) {
    var b1 = this.bounds,
      b2 = state.bounds;
    return b1.top !== b2.top || b1.left !== b2.left || b1.width !== b2.width || b1.height !== b2.height || !this.matrix.equals(state.matrix) || this.opacity !== state.opacity || this.props && state.props && JSON.stringify(this.props) !== JSON.stringify(state.props);
  };
  _proto2.update = function update(props, simple) {
    var self = this,
      element = self.element,
      getProp = gsap.getProperty(element),
      cache = gsap.core.getCache(element),
      bounds = element.getBoundingClientRect(),
      bbox = element.getBBox && typeof element.getBBox === "function" && element.nodeName.toLowerCase() !== "svg" && element.getBBox(),
      m = simple ? new _matrix.Matrix2D(1, 0, 0, 1, bounds.left + (0, _matrix._getDocScrollLeft)(), bounds.top + (0, _matrix._getDocScrollTop)()) : (0, _matrix.getGlobalMatrix)(element, false, false, true);
    self.getProp = getProp;
    self.element = element;
    self.id = _getID(element);
    self.matrix = m;
    self.cache = cache;
    self.bounds = bounds;
    self.isVisible = !!(bounds.width || bounds.height || bounds.left || bounds.top);
    self.display = getProp("display");
    self.position = getProp("position");
    self.parent = element.parentNode;
    self.x = getProp("x");
    self.y = getProp("y");
    self.scaleX = cache.scaleX;
    self.scaleY = cache.scaleY;
    self.rotation = getProp("rotation");
    self.skewX = getProp("skewX");
    self.opacity = getProp("opacity");
    self.width = bbox ? bbox.width : _closestTenth(getProp("width", "px"), 0.04); // round up to the closest 0.1 so that text doesn't wrap.

    self.height = bbox ? bbox.height : _closestTenth(getProp("height", "px"), 0.04);
    props && _recordProps(self, _memoizedProps[props] || _memoizeProps(props));
    self.ctm = element.getCTM && element.nodeName.toLowerCase() === "svg" && (0, _matrix._getCTM)(element).inverse();
    self.simple = simple || _round(m.a) === 1 && !_round(m.b) && !_round(m.c) && _round(m.d) === 1; // allows us to speed through some other tasks if it's not scale/rotated

    self.uncache = 0;
  };
  return ElementState;
}();
var FlipAction = /*#__PURE__*/function () {
  function FlipAction(vars, batch) {
    this.vars = vars;
    this.batch = batch;
    this.states = [];
    this.timeline = batch.timeline;
  }
  var _proto3 = FlipAction.prototype;
  _proto3.getStateById = function getStateById(id) {
    var i = this.states.length;
    while (i--) {
      if (this.states[i].idLookup[id]) {
        return this.states[i];
      }
    }
  };
  _proto3.kill = function kill() {
    this.batch.remove(this);
  };
  return FlipAction;
}();
var FlipBatch = /*#__PURE__*/function () {
  function FlipBatch(id) {
    this.id = id;
    this.actions = [];
    this._kill = [];
    this._final = [];
    this._abs = [];
    this._run = [];
    this.data = {};
    this.state = new FlipState();
    this.timeline = gsap.timeline();
  }
  var _proto4 = FlipBatch.prototype;
  _proto4.add = function add(config) {
    var result = this.actions.filter(function (action) {
      return action.vars === config;
    });
    if (result.length) {
      return result[0];
    }
    result = new FlipAction(typeof config === "function" ? {
      animate: config
    } : config, this);
    this.actions.push(result);
    return result;
  };
  _proto4.remove = function remove(action) {
    var i = this.actions.indexOf(action);
    i >= 0 && this.actions.splice(i, 1);
    return this;
  };
  _proto4.getState = function getState(merge) {
    var _this3 = this;
    var prevBatch = _batch,
      prevAction = _batchAction;
    _batch = this;
    this.state.clear();
    this._kill.length = 0;
    this.actions.forEach(function (action) {
      if (action.vars.getState) {
        action.states.length = 0;
        _batchAction = action;
        action.state = action.vars.getState(action);
      }
      merge && action.states.forEach(function (s) {
        return _this3.state.add(s);
      });
    });
    _batchAction = prevAction;
    _batch = prevBatch;
    this.killConflicts();
    return this;
  };
  _proto4.animate = function animate() {
    var _this4 = this;
    var prevBatch = _batch,
      tl = this.timeline,
      i = this.actions.length,
      finalStates,
      endTime;
    _batch = this;
    tl.clear();
    this._abs.length = this._final.length = this._run.length = 0;
    this.actions.forEach(function (a) {
      a.vars.animate && a.vars.animate(a);
      var onEnter = a.vars.onEnter,
        onLeave = a.vars.onLeave,
        targets = a.targets,
        s,
        result;
      if (targets && targets.length && (onEnter || onLeave)) {
        s = new FlipState();
        a.states.forEach(function (state) {
          return s.add(state);
        });
        result = s.compare(Flip.getState(targets));
        result.enter.length && onEnter && onEnter(result.enter);
        result.leave.length && onLeave && onLeave(result.leave);
      }
    });
    _makeCompsAbsolute(this._abs);
    this._run.forEach(function (f) {
      return f();
    });
    endTime = tl.duration();
    finalStates = this._final.slice(0);
    tl.add(function () {
      if (endTime <= tl.time()) {
        // only call if moving forward in the timeline (in case it's nested in a timeline that gets reversed)
        finalStates.forEach(function (f) {
          return f();
        });
        _forEachBatch(_this4, "onComplete");
      }
    });
    _batch = prevBatch;
    while (i--) {
      this.actions[i].vars.once && this.actions[i].kill();
    }
    _forEachBatch(this, "onStart");
    tl.restart();
    return this;
  };
  _proto4.loadState = function loadState(done) {
    done || (done = function done() {
      return 0;
    });
    var queue = [];
    this.actions.forEach(function (c) {
      if (c.vars.loadState) {
        var i,
          f = function f(targets) {
            targets && (c.targets = targets);
            i = queue.indexOf(f);
            if (~i) {
              queue.splice(i, 1);
              queue.length || done();
            }
          };
        queue.push(f);
        c.vars.loadState(f);
      }
    });
    queue.length || done();
    return this;
  };
  _proto4.setState = function setState() {
    this.actions.forEach(function (c) {
      return c.targets = c.vars.setState && c.vars.setState(c);
    });
    return this;
  };
  _proto4.killConflicts = function killConflicts(soft) {
    this.state.interrupt(soft);
    this._kill.forEach(function (state) {
      return state.interrupt(soft);
    });
    return this;
  };
  _proto4.run = function run(skipGetState, merge) {
    var _this5 = this;
    if (this !== _batch) {
      skipGetState || this.getState(merge);
      this.loadState(function () {
        if (!_this5._killed) {
          _this5.setState();
          _this5.animate();
        }
      });
    }
    return this;
  };
  _proto4.clear = function clear(stateOnly) {
    this.state.clear();
    stateOnly || (this.actions.length = 0);
  };
  _proto4.getStateById = function getStateById(id) {
    var i = this.actions.length,
      s;
    while (i--) {
      s = this.actions[i].getStateById(id);
      if (s) {
        return s;
      }
    }
    return this.state.idLookup[id] && this.state;
  };
  _proto4.kill = function kill() {
    this._killed = 1;
    this.clear();
    delete _batchLookup[this.id];
  };
  return FlipBatch;
}();
var Flip = /*#__PURE__*/function () {
  function Flip() {}
  Flip.getState = function getState(targets, vars) {
    var state = _parseState(targets, vars);
    _batchAction && _batchAction.states.push(state);
    vars && vars.batch && Flip.batch(vars.batch).state.add(state);
    return state;
  };
  Flip.from = function from(state, vars) {
    vars = vars || {};
    "clearProps" in vars || (vars.clearProps = true);
    return _fromTo(state, _parseState(vars.targets || state.targets, {
      props: vars.props || state.props,
      simple: vars.simple,
      kill: !!vars.kill
    }), vars, -1);
  };
  Flip.to = function to(state, vars) {
    return _fromTo(state, _parseState(vars.targets || state.targets, {
      props: vars.props || state.props,
      simple: vars.simple,
      kill: !!vars.kill
    }), vars, 1);
  };
  Flip.fromTo = function fromTo(fromState, toState, vars) {
    return _fromTo(fromState, toState, vars);
  };
  Flip.fit = function fit(fromEl, toEl, vars) {
    var v = vars ? _copy(vars, _fitReserved) : {},
      _ref = vars || v,
      absolute = _ref.absolute,
      scale = _ref.scale,
      getVars = _ref.getVars,
      props = _ref.props,
      runBackwards = _ref.runBackwards,
      onComplete = _ref.onComplete,
      simple = _ref.simple,
      fitChild = vars && vars.fitChild && _getEl(vars.fitChild),
      before = _parseElementState(toEl, props, simple, fromEl),
      after = _parseElementState(fromEl, 0, simple, before),
      inlineProps = props ? _memoizedRemoveProps[props] : _removeProps;
    props && _applyProps(v, before.props);
    if (runBackwards) {
      _recordInlineStyles(after, inlineProps);
      "immediateRender" in v || (v.immediateRender = true);
      v.onComplete = function () {
        _applyInlineStyles(after);
        onComplete && onComplete.apply(this, arguments);
      };
    }
    absolute && _makeAbsolute(after, before);
    v = _fit(after, before, scale || fitChild, props, fitChild, v.duration || getVars ? v : 0);
    return getVars ? v : v.duration ? gsap.to(after.element, v) : null;
  };
  Flip.makeAbsolute = function makeAbsolute(targetsOrStates, vars) {
    return (targetsOrStates instanceof FlipState ? targetsOrStates : new FlipState(targetsOrStates, vars)).makeAbsolute();
  };
  Flip.batch = function batch(id) {
    id || (id = "default");
    return _batchLookup[id] || (_batchLookup[id] = new FlipBatch(id));
  };
  Flip.killFlipsOf = function killFlipsOf(targets, complete) {
    (targets instanceof FlipState ? targets.targets : _toArray(targets)).forEach(function (t) {
      return t && _killFlip(t._flip, complete !== false ? 1 : 2);
    });
  };
  Flip.isFlipping = function isFlipping(target) {
    var f = Flip.getByTarget(target);
    return !!f && f.isActive();
  };
  Flip.getByTarget = function getByTarget(target) {
    return (_getEl(target) || _emptyObj)._flip;
  };
  Flip.getElementState = function getElementState(target, props) {
    return new ElementState(_getEl(target), props);
  };
  Flip.convertCoordinates = function convertCoordinates(fromElement, toElement, point) {
    var m = (0, _matrix.getGlobalMatrix)(toElement, true, true).multiply((0, _matrix.getGlobalMatrix)(fromElement));
    return point ? m.apply(point) : m;
  };
  Flip.register = function register(core) {
    _body = typeof document !== "undefined" && document.body;
    if (_body) {
      gsap = core;
      (0, _matrix._setDoc)(_body);
      _toArray = gsap.utils.toArray;
      _getStyleSaver = gsap.core.getStyleSaver;
      var snap = gsap.utils.snap(0.1);
      _closestTenth = function _closestTenth(value, add) {
        return snap(parseFloat(value) + add);
      };
    }
  };
  return Flip;
}();
exports["default"] = exports.Flip = Flip;
Flip.version = "3.11.5"; // function whenImagesLoad(el, func) {
// 	let pending = [],
// 		onLoad = e => {
// 			pending.splice(pending.indexOf(e.target), 1);
// 			e.target.removeEventListener("load", onLoad);
// 			pending.length || func();
// 		};
// 	gsap.utils.toArray(el.tagName.toLowerCase() === "img" ? el : el.querySelectorAll("img")).forEach(img => img.complete || img.addEventListener("load", onLoad) || pending.push(img));
// 	pending.length || func();
// }

typeof window !== "undefined" && window.gsap && window.gsap.registerPlugin(Flip);

},{"./utils/matrix.js":4}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.window = global.window || {}));
})(void 0, function (exports) {
  'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  /*!
   * GSAP 3.11.5
   * https://greensock.com
   *
   * @license Copyright 2008-2023, GreenSock. All rights reserved.
   * Subject to the terms at https://greensock.com/standard-license or for
   * Club GreenSock members, the agreement issued with that membership.
   * @author: Jack Doyle, jack@greensock.com
  */
  var _config = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: {
        lineHeight: ""
      }
    },
    _defaults = {
      duration: .5,
      overwrite: false,
      delay: 0
    },
    _suppressOverwrites,
    _reverting,
    _context,
    _bigNum = 1e8,
    _tinyNum = 1 / _bigNum,
    _2PI = Math.PI * 2,
    _HALF_PI = _2PI / 4,
    _gsID = 0,
    _sqrt = Math.sqrt,
    _cos = Math.cos,
    _sin = Math.sin,
    _isString = function _isString(value) {
      return typeof value === "string";
    },
    _isFunction = function _isFunction(value) {
      return typeof value === "function";
    },
    _isNumber = function _isNumber(value) {
      return typeof value === "number";
    },
    _isUndefined = function _isUndefined(value) {
      return typeof value === "undefined";
    },
    _isObject = function _isObject(value) {
      return _typeof(value) === "object";
    },
    _isNotFalse = function _isNotFalse(value) {
      return value !== false;
    },
    _windowExists = function _windowExists() {
      return typeof window !== "undefined";
    },
    _isFuncOrString = function _isFuncOrString(value) {
      return _isFunction(value) || _isString(value);
    },
    _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
    _isArray = Array.isArray,
    _strictNumExp = /(?:-?\.?\d|\.)+/gi,
    _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    _relExp = /[+-]=-?[.\d]+/,
    _delimitedValueExp = /[^,'"\[\]\s]+/gi,
    _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    _globalTimeline,
    _win,
    _coreInitted,
    _doc,
    _globals = {},
    _installScope = {},
    _coreReady,
    _install = function _install(scope) {
      return (_installScope = _merge(scope, _globals)) && gsap;
    },
    _missingPlugin = function _missingPlugin(property, value) {
      return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
    },
    _warn = function _warn(message, suppress) {
      return !suppress && console.warn(message);
    },
    _addGlobal = function _addGlobal(name, obj) {
      return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
    },
    _emptyFunc = function _emptyFunc() {
      return 0;
    },
    _startAtRevertConfig = {
      suppressEvents: true,
      isStart: true,
      kill: false
    },
    _revertConfigNoKill = {
      suppressEvents: true,
      kill: false
    },
    _revertConfig = {
      suppressEvents: true
    },
    _reservedProps = {},
    _lazyTweens = [],
    _lazyLookup = {},
    _lastRenderedFrame,
    _plugins = {},
    _effects = {},
    _nextGCFrame = 30,
    _harnessPlugins = [],
    _callbackNames = "",
    _harness = function _harness(targets) {
      var target = targets[0],
        harnessPlugin,
        i;
      _isObject(target) || _isFunction(target) || (targets = [targets]);
      if (!(harnessPlugin = (target._gsap || {}).harness)) {
        i = _harnessPlugins.length;
        while (i-- && !_harnessPlugins[i].targetTest(target)) {}
        harnessPlugin = _harnessPlugins[i];
      }
      i = targets.length;
      while (i--) {
        targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
      }
      return targets;
    },
    _getCache = function _getCache(target) {
      return target._gsap || _harness(toArray(target))[0]._gsap;
    },
    _getProperty = function _getProperty(target, property, v) {
      return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
    },
    _forEachName = function _forEachName(names, func) {
      return (names = names.split(",")).forEach(func) || names;
    },
    _round = function _round(value) {
      return Math.round(value * 100000) / 100000 || 0;
    },
    _roundPrecise = function _roundPrecise(value) {
      return Math.round(value * 10000000) / 10000000 || 0;
    },
    _parseRelative = function _parseRelative(start, value) {
      var operator = value.charAt(0),
        end = parseFloat(value.substr(2));
      start = parseFloat(start);
      return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
    },
    _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
      var l = toFind.length,
        i = 0;
      for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}
      return i < l;
    },
    _lazyRender = function _lazyRender() {
      var l = _lazyTweens.length,
        a = _lazyTweens.slice(0),
        i,
        tween;
      _lazyLookup = {};
      _lazyTweens.length = 0;
      for (i = 0; i < l; i++) {
        tween = a[i];
        tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
      }
    },
    _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
      _lazyTweens.length && !_reverting && _lazyRender();
      animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
      _lazyTweens.length && !_reverting && _lazyRender();
    },
    _numericIfPossible = function _numericIfPossible(value) {
      var n = parseFloat(value);
      return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
    },
    _passThrough = function _passThrough(p) {
      return p;
    },
    _setDefaults = function _setDefaults(obj, defaults) {
      for (var p in defaults) {
        p in obj || (obj[p] = defaults[p]);
      }
      return obj;
    },
    _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
      return function (obj, defaults) {
        for (var p in defaults) {
          p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
        }
      };
    },
    _merge = function _merge(base, toMerge) {
      for (var p in toMerge) {
        base[p] = toMerge[p];
      }
      return base;
    },
    _mergeDeep = function _mergeDeep(base, toMerge) {
      for (var p in toMerge) {
        p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
      }
      return base;
    },
    _copyExcluding = function _copyExcluding(obj, excluding) {
      var copy = {},
        p;
      for (p in obj) {
        p in excluding || (copy[p] = obj[p]);
      }
      return copy;
    },
    _inheritDefaults = function _inheritDefaults(vars) {
      var parent = vars.parent || _globalTimeline,
        func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
      if (_isNotFalse(vars.inherit)) {
        while (parent) {
          func(vars, parent.vars.defaults);
          parent = parent.parent || parent._dp;
        }
      }
      return vars;
    },
    _arraysMatch = function _arraysMatch(a1, a2) {
      var i = a1.length,
        match = i === a2.length;
      while (match && i-- && a1[i] === a2[i]) {}
      return i < 0;
    },
    _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
      if (firstProp === void 0) {
        firstProp = "_first";
      }
      if (lastProp === void 0) {
        lastProp = "_last";
      }
      var prev = parent[lastProp],
        t;
      if (sortBy) {
        t = child[sortBy];
        while (prev && prev[sortBy] > t) {
          prev = prev._prev;
        }
      }
      if (prev) {
        child._next = prev._next;
        prev._next = child;
      } else {
        child._next = parent[firstProp];
        parent[firstProp] = child;
      }
      if (child._next) {
        child._next._prev = child;
      } else {
        parent[lastProp] = child;
      }
      child._prev = prev;
      child.parent = child._dp = parent;
      return child;
    },
    _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
      if (firstProp === void 0) {
        firstProp = "_first";
      }
      if (lastProp === void 0) {
        lastProp = "_last";
      }
      var prev = child._prev,
        next = child._next;
      if (prev) {
        prev._next = next;
      } else if (parent[firstProp] === child) {
        parent[firstProp] = next;
      }
      if (next) {
        next._prev = prev;
      } else if (parent[lastProp] === child) {
        parent[lastProp] = prev;
      }
      child._next = child._prev = child.parent = null;
    },
    _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
      child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
      child._act = 0;
    },
    _uncache = function _uncache(animation, child) {
      if (animation && (!child || child._end > animation._dur || child._start < 0)) {
        var a = animation;
        while (a) {
          a._dirty = 1;
          a = a.parent;
        }
      }
      return animation;
    },
    _recacheAncestors = function _recacheAncestors(animation) {
      var parent = animation.parent;
      while (parent && parent.parent) {
        parent._dirty = 1;
        parent.totalDuration();
        parent = parent.parent;
      }
      return animation;
    },
    _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
      return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
    },
    _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
      return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
    },
    _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
      return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
    },
    _animationCycle = function _animationCycle(tTime, cycleDuration) {
      var whole = Math.floor(tTime /= cycleDuration);
      return tTime && whole === tTime ? whole - 1 : whole;
    },
    _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
      return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
    },
    _setEnd = function _setEnd(animation) {
      return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
    },
    _alignPlayhead = function _alignPlayhead(animation, totalTime) {
      var parent = animation._dp;
      if (parent && parent.smoothChildTiming && animation._ts) {
        animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
        _setEnd(animation);
        parent._dirty || _uncache(parent, animation);
      }
      return animation;
    },
    _postAddChecks = function _postAddChecks(timeline, child) {
      var t;
      if (child._time || child._initted && !child._dur) {
        t = _parentToChildTotalTime(timeline.rawTime(), child);
        if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
          child.render(t, true);
        }
      }
      if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
        if (timeline._dur < timeline.duration()) {
          t = timeline;
          while (t._dp) {
            t.rawTime() >= 0 && t.totalTime(t._tTime);
            t = t._dp;
          }
        }
        timeline._zTime = -_tinyNum;
      }
    },
    _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
      child.parent && _removeFromParent(child);
      child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
      child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
      _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
      _isFromOrFromStart(child) || (timeline._recent = child);
      skipChecks || _postAddChecks(timeline, child);
      timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime);
      return timeline;
    },
    _scrollTrigger = function _scrollTrigger(animation, trigger) {
      return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
    },
    _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
      _initTween(tween, time, tTime);
      if (!tween._initted) {
        return 1;
      }
      if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
        _lazyTweens.push(tween);
        tween._lazy = [tTime, suppressEvents];
        return 1;
      }
    },
    _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
      var parent = _ref.parent;
      return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
    },
    _isFromOrFromStart = function _isFromOrFromStart(_ref2) {
      var data = _ref2.data;
      return data === "isFromStart" || data === "isStart";
    },
    _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
      var prevRatio = tween.ratio,
        ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
        repeatDelay = tween._rDelay,
        tTime = 0,
        pt,
        iteration,
        prevIteration;
      if (repeatDelay && tween._repeat) {
        tTime = _clamp(0, tween._tDur, totalTime);
        iteration = _animationCycle(tTime, repeatDelay);
        tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
        if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
          prevRatio = 1 - ratio;
          tween.vars.repeatRefresh && tween._initted && tween.invalidate();
        }
      }
      if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
        if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
          return;
        }
        prevIteration = tween._zTime;
        tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
        suppressEvents || (suppressEvents = totalTime && !prevIteration);
        tween.ratio = ratio;
        tween._from && (ratio = 1 - ratio);
        tween._time = 0;
        tween._tTime = tTime;
        pt = tween._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
        tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
        tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
        if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
          ratio && _removeFromParent(tween, 1);
          if (!suppressEvents && !_reverting) {
            _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
            tween._prom && tween._prom();
          }
        }
      } else if (!tween._zTime) {
        tween._zTime = totalTime;
      }
    },
    _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
      var child;
      if (time > prevTime) {
        child = animation._first;
        while (child && child._start <= time) {
          if (child.data === "isPause" && child._start > prevTime) {
            return child;
          }
          child = child._next;
        }
      } else {
        child = animation._last;
        while (child && child._start >= time) {
          if (child.data === "isPause" && child._start < prevTime) {
            return child;
          }
          child = child._prev;
        }
      }
    },
    _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
      var repeat = animation._repeat,
        dur = _roundPrecise(duration) || 0,
        totalProgress = animation._tTime / animation._tDur;
      totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
      animation._dur = dur;
      animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
      totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
      animation.parent && _setEnd(animation);
      skipUncache || _uncache(animation.parent, animation);
      return animation;
    },
    _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
      return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
    },
    _zeroPosition = {
      _start: 0,
      endTime: _emptyFunc,
      totalDuration: _emptyFunc
    },
    _parsePosition = function _parsePosition(animation, position, percentAnimation) {
      var labels = animation.labels,
        recent = animation._recent || _zeroPosition,
        clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur,
        i,
        offset,
        isPercent;
      if (_isString(position) && (isNaN(position) || position in labels)) {
        offset = position.charAt(0);
        isPercent = position.substr(-1) === "%";
        i = position.indexOf("=");
        if (offset === "<" || offset === ">") {
          i >= 0 && (position = position.replace(/=/, ""));
          return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
        }
        if (i < 0) {
          position in labels || (labels[position] = clippedDuration);
          return labels[position];
        }
        offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
        if (isPercent && percentAnimation) {
          offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
        }
        return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
      }
      return position == null ? clippedDuration : +position;
    },
    _createTweenType = function _createTweenType(type, params, timeline) {
      var isLegacy = _isNumber(params[1]),
        varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
        vars = params[varsIndex],
        irVars,
        parent;
      isLegacy && (vars.duration = params[1]);
      vars.parent = timeline;
      if (type) {
        irVars = vars;
        parent = timeline;
        while (parent && !("immediateRender" in irVars)) {
          irVars = parent.vars.defaults || {};
          parent = _isNotFalse(parent.vars.inherit) && parent.parent;
        }
        vars.immediateRender = _isNotFalse(irVars.immediateRender);
        type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
      }
      return new Tween(params[0], vars, params[varsIndex + 1]);
    },
    _conditionalReturn = function _conditionalReturn(value, func) {
      return value || value === 0 ? func(value) : func;
    },
    _clamp = function _clamp(min, max, value) {
      return value < min ? min : value > max ? max : value;
    },
    getUnit = function getUnit(value, v) {
      return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
    },
    clamp = function clamp(min, max, value) {
      return _conditionalReturn(value, function (v) {
        return _clamp(min, max, v);
      });
    },
    _slice = [].slice,
    _isArrayLike = function _isArrayLike(value, nonEmpty) {
      return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
    },
    _flatten = function _flatten(ar, leaveStrings, accumulator) {
      if (accumulator === void 0) {
        accumulator = [];
      }
      return ar.forEach(function (value) {
        var _accumulator;
        return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
      }) || accumulator;
    },
    toArray = function toArray(value, scope, leaveStrings) {
      return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
    },
    selector = function selector(value) {
      value = toArray(value)[0] || _warn("Invalid scope") || {};
      return function (v) {
        var el = value.current || value.nativeElement || value;
        return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
      };
    },
    shuffle = function shuffle(a) {
      return a.sort(function () {
        return .5 - Math.random();
      });
    },
    distribute = function distribute(v) {
      if (_isFunction(v)) {
        return v;
      }
      var vars = _isObject(v) ? v : {
          each: v
        },
        ease = _parseEase(vars.ease),
        from = vars.from || 0,
        base = parseFloat(vars.base) || 0,
        cache = {},
        isDecimal = from > 0 && from < 1,
        ratios = isNaN(from) || isDecimal,
        axis = vars.axis,
        ratioX = from,
        ratioY = from;
      if (_isString(from)) {
        ratioX = ratioY = {
          center: .5,
          edges: .5,
          end: 1
        }[from] || 0;
      } else if (!isDecimal && ratios) {
        ratioX = from[0];
        ratioY = from[1];
      }
      return function (i, target, a) {
        var l = (a || vars).length,
          distances = cache[l],
          originX,
          originY,
          x,
          y,
          d,
          j,
          max,
          min,
          wrapAt;
        if (!distances) {
          wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum])[1];
          if (!wrapAt) {
            max = -_bigNum;
            while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}
            wrapAt--;
          }
          distances = cache[l] = [];
          originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
          originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
          max = 0;
          min = _bigNum;
          for (j = 0; j < l; j++) {
            x = j % wrapAt - originX;
            y = originY - (j / wrapAt | 0);
            distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
            d > max && (max = d);
            d < min && (min = d);
          }
          from === "random" && shuffle(distances);
          distances.max = max - min;
          distances.min = min;
          distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
          distances.b = l < 0 ? base - l : base;
          distances.u = getUnit(vars.amount || vars.each) || 0;
          ease = ease && l < 0 ? _invertEase(ease) : ease;
        }
        l = (distances[i] - distances.min) / distances.max || 0;
        return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
      };
    },
    _roundModifier = function _roundModifier(v) {
      var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
      return function (raw) {
        var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
        return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
      };
    },
    snap = function snap(snapTo, value) {
      var isArray = _isArray(snapTo),
        radius,
        is2D;
      if (!isArray && _isObject(snapTo)) {
        radius = isArray = snapTo.radius || _bigNum;
        if (snapTo.values) {
          snapTo = toArray(snapTo.values);
          if (is2D = !_isNumber(snapTo[0])) {
            radius *= radius;
          }
        } else {
          snapTo = _roundModifier(snapTo.increment);
        }
      }
      return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function (raw) {
        is2D = snapTo(raw);
        return Math.abs(is2D - raw) <= radius ? is2D : raw;
      } : function (raw) {
        var x = parseFloat(is2D ? raw.x : raw),
          y = parseFloat(is2D ? raw.y : 0),
          min = _bigNum,
          closest = 0,
          i = snapTo.length,
          dx,
          dy;
        while (i--) {
          if (is2D) {
            dx = snapTo[i].x - x;
            dy = snapTo[i].y - y;
            dx = dx * dx + dy * dy;
          } else {
            dx = Math.abs(snapTo[i] - x);
          }
          if (dx < min) {
            min = dx;
            closest = i;
          }
        }
        closest = !radius || min <= radius ? snapTo[closest] : raw;
        return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
      });
    },
    random = function random(min, max, roundingIncrement, returnFunction) {
      return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
        return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
      });
    },
    pipe = function pipe() {
      for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
        functions[_key] = arguments[_key];
      }
      return function (value) {
        return functions.reduce(function (v, f) {
          return f(v);
        }, value);
      };
    },
    unitize = function unitize(func, unit) {
      return function (value) {
        return func(parseFloat(value)) + (unit || getUnit(value));
      };
    },
    normalize = function normalize(min, max, value) {
      return mapRange(min, max, 0, 1, value);
    },
    _wrapArray = function _wrapArray(a, wrapper, value) {
      return _conditionalReturn(value, function (index) {
        return a[~~wrapper(index)];
      });
    },
    wrap = function wrap(min, max, value) {
      var range = max - min;
      return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
        return (range + (value - min) % range) % range + min;
      });
    },
    wrapYoyo = function wrapYoyo(min, max, value) {
      var range = max - min,
        total = range * 2;
      return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
        value = (total + (value - min) % total) % total || 0;
        return min + (value > range ? total - value : value);
      });
    },
    _replaceRandom = function _replaceRandom(value) {
      var prev = 0,
        s = "",
        i,
        nums,
        end,
        isArray;
      while (~(i = value.indexOf("random(", prev))) {
        end = value.indexOf(")", i);
        isArray = value.charAt(i + 7) === "[";
        nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
        s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
        prev = end + 1;
      }
      return s + value.substr(prev, value.length - prev);
    },
    mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
      var inRange = inMax - inMin,
        outRange = outMax - outMin;
      return _conditionalReturn(value, function (value) {
        return outMin + ((value - inMin) / inRange * outRange || 0);
      });
    },
    interpolate = function interpolate(start, end, progress, mutate) {
      var func = isNaN(start + end) ? 0 : function (p) {
        return (1 - p) * start + p * end;
      };
      if (!func) {
        var isString = _isString(start),
          master = {},
          p,
          i,
          interpolators,
          l,
          il;
        progress === true && (mutate = 1) && (progress = null);
        if (isString) {
          start = {
            p: start
          };
          end = {
            p: end
          };
        } else if (_isArray(start) && !_isArray(end)) {
          interpolators = [];
          l = start.length;
          il = l - 2;
          for (i = 1; i < l; i++) {
            interpolators.push(interpolate(start[i - 1], start[i]));
          }
          l--;
          func = function func(p) {
            p *= l;
            var i = Math.min(il, ~~p);
            return interpolators[i](p - i);
          };
          progress = end;
        } else if (!mutate) {
          start = _merge(_isArray(start) ? [] : {}, start);
        }
        if (!interpolators) {
          for (p in end) {
            _addPropTween.call(master, start, p, "get", end[p]);
          }
          func = function func(p) {
            return _renderPropTweens(p, master) || (isString ? start.p : start);
          };
        }
      }
      return _conditionalReturn(progress, func);
    },
    _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
      var labels = timeline.labels,
        min = _bigNum,
        p,
        distance,
        label;
      for (p in labels) {
        distance = labels[p] - fromTime;
        if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
          label = p;
          min = distance;
        }
      }
      return label;
    },
    _callback = function _callback(animation, type, executeLazyFirst) {
      var v = animation.vars,
        callback = v[type],
        prevContext = _context,
        context = animation._ctx,
        params,
        scope,
        result;
      if (!callback) {
        return;
      }
      params = v[type + "Params"];
      scope = v.callbackScope || animation;
      executeLazyFirst && _lazyTweens.length && _lazyRender();
      context && (_context = context);
      result = params ? callback.apply(scope, params) : callback.call(scope);
      _context = prevContext;
      return result;
    },
    _interrupt = function _interrupt(animation) {
      _removeFromParent(animation);
      animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
      animation.progress() < 1 && _callback(animation, "onInterrupt");
      return animation;
    },
    _quickTween,
    _registerPluginQueue = [],
    _createPlugin = function _createPlugin(config) {
      if (!_windowExists()) {
        _registerPluginQueue.push(config);
        return;
      }
      config = !config.name && config["default"] || config;
      var name = config.name,
        isFunc = _isFunction(config),
        Plugin = name && !isFunc && config.init ? function () {
          this._props = [];
        } : config,
        instanceDefaults = {
          init: _emptyFunc,
          render: _renderPropTweens,
          add: _addPropTween,
          kill: _killPropTweensOf,
          modifier: _addPluginModifier,
          rawVars: 0
        },
        statics = {
          targetTest: 0,
          get: 0,
          getSetter: _getSetter,
          aliases: {},
          register: 0
        };
      _wake();
      if (config !== Plugin) {
        if (_plugins[name]) {
          return;
        }
        _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics));
        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics)));
        _plugins[Plugin.prop = name] = Plugin;
        if (config.targetTest) {
          _harnessPlugins.push(Plugin);
          _reservedProps[name] = 1;
        }
        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
      }
      _addGlobal(name, Plugin);
      config.register && config.register(gsap, Plugin, PropTween);
    },
    _255 = 255,
    _colorLookup = {
      aqua: [0, _255, _255],
      lime: [0, _255, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, _255],
      navy: [0, 0, 128],
      white: [_255, _255, _255],
      olive: [128, 128, 0],
      yellow: [_255, _255, 0],
      orange: [_255, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [_255, 0, 0],
      pink: [_255, 192, 203],
      cyan: [0, _255, _255],
      transparent: [_255, _255, _255, 0]
    },
    _hue = function _hue(h, m1, m2) {
      h += h < 0 ? 1 : h > 1 ? -1 : 0;
      return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
    },
    splitColor = function splitColor(v, toHSL, forceAlpha) {
      var a = !v ? _colorLookup.black : _isNumber(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
        r,
        g,
        b,
        h,
        s,
        l,
        max,
        min,
        d,
        wasHSL;
      if (!a) {
        if (v.substr(-1) === ",") {
          v = v.substr(0, v.length - 1);
        }
        if (_colorLookup[v]) {
          a = _colorLookup[v];
        } else if (v.charAt(0) === "#") {
          if (v.length < 6) {
            r = v.charAt(1);
            g = v.charAt(2);
            b = v.charAt(3);
            v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
          }
          if (v.length === 9) {
            a = parseInt(v.substr(1, 6), 16);
            return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
          }
          v = parseInt(v.substr(1), 16);
          a = [v >> 16, v >> 8 & _255, v & _255];
        } else if (v.substr(0, 3) === "hsl") {
          a = wasHSL = v.match(_strictNumExp);
          if (!toHSL) {
            h = +a[0] % 360 / 360;
            s = +a[1] / 100;
            l = +a[2] / 100;
            g = l <= .5 ? l * (s + 1) : l + s - l * s;
            r = l * 2 - g;
            a.length > 3 && (a[3] *= 1);
            a[0] = _hue(h + 1 / 3, r, g);
            a[1] = _hue(h, r, g);
            a[2] = _hue(h - 1 / 3, r, g);
          } else if (~v.indexOf("=")) {
            a = v.match(_numExp);
            forceAlpha && a.length < 4 && (a[3] = 1);
            return a;
          }
        } else {
          a = v.match(_strictNumExp) || _colorLookup.transparent;
        }
        a = a.map(Number);
      }
      if (toHSL && !wasHSL) {
        r = a[0] / _255;
        g = a[1] / _255;
        b = a[2] / _255;
        max = Math.max(r, g, b);
        min = Math.min(r, g, b);
        l = (max + min) / 2;
        if (max === min) {
          h = s = 0;
        } else {
          d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
          h *= 60;
        }
        a[0] = ~~(h + .5);
        a[1] = ~~(s * 100 + .5);
        a[2] = ~~(l * 100 + .5);
      }
      forceAlpha && a.length < 4 && (a[3] = 1);
      return a;
    },
    _colorOrderData = function _colorOrderData(v) {
      var values = [],
        c = [],
        i = -1;
      v.split(_colorExp).forEach(function (v) {
        var a = v.match(_numWithUnitExp) || [];
        values.push.apply(values, a);
        c.push(i += a.length + 1);
      });
      values.c = c;
      return values;
    },
    _formatColors = function _formatColors(s, toHSL, orderMatchData) {
      var result = "",
        colors = (s + result).match(_colorExp),
        type = toHSL ? "hsla(" : "rgba(",
        i = 0,
        c,
        shell,
        d,
        l;
      if (!colors) {
        return s;
      }
      colors = colors.map(function (color) {
        return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
      });
      if (orderMatchData) {
        d = _colorOrderData(s);
        c = orderMatchData.c;
        if (c.join(result) !== d.c.join(result)) {
          shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
          l = shell.length - 1;
          for (; i < l; i++) {
            result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
          }
        }
      }
      if (!shell) {
        shell = s.split(_colorExp);
        l = shell.length - 1;
        for (; i < l; i++) {
          result += shell[i] + colors[i];
        }
      }
      return result + shell[l];
    },
    _colorExp = function () {
      var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        p;
      for (p in _colorLookup) {
        s += "|" + p + "\\b";
      }
      return new RegExp(s + ")", "gi");
    }(),
    _hslExp = /hsl[a]?\(/,
    _colorStringFilter = function _colorStringFilter(a) {
      var combined = a.join(" "),
        toHSL;
      _colorExp.lastIndex = 0;
      if (_colorExp.test(combined)) {
        toHSL = _hslExp.test(combined);
        a[1] = _formatColors(a[1], toHSL);
        a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
        return true;
      }
    },
    _tickerActive,
    _ticker = function () {
      var _getTime = Date.now,
        _lagThreshold = 500,
        _adjustedLag = 33,
        _startTime = _getTime(),
        _lastUpdate = _startTime,
        _gap = 1000 / 240,
        _nextTime = _gap,
        _listeners = [],
        _id,
        _req,
        _raf,
        _self,
        _delta,
        _i,
        _tick = function _tick(v) {
          var elapsed = _getTime() - _lastUpdate,
            manual = v === true,
            overlap,
            dispatch,
            time,
            frame;
          elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
          _lastUpdate += elapsed;
          time = _lastUpdate - _startTime;
          overlap = time - _nextTime;
          if (overlap > 0 || manual) {
            frame = ++_self.frame;
            _delta = time - _self.time * 1000;
            _self.time = time = time / 1000;
            _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
            dispatch = 1;
          }
          manual || (_id = _req(_tick));
          if (dispatch) {
            for (_i = 0; _i < _listeners.length; _i++) {
              _listeners[_i](time, _delta, frame, v);
            }
          }
        };
      _self = {
        time: 0,
        frame: 0,
        tick: function tick() {
          _tick(true);
        },
        deltaRatio: function deltaRatio(fps) {
          return _delta / (1000 / (fps || 60));
        },
        wake: function wake() {
          if (_coreReady) {
            if (!_coreInitted && _windowExists()) {
              _win = _coreInitted = window;
              _doc = _win.document || {};
              _globals.gsap = gsap;
              (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
              _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
              _raf = _win.requestAnimationFrame;
              _registerPluginQueue.forEach(_createPlugin);
            }
            _id && _self.sleep();
            _req = _raf || function (f) {
              return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
            };
            _tickerActive = 1;
            _tick(2);
          }
        },
        sleep: function sleep() {
          (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
          _tickerActive = 0;
          _req = _emptyFunc;
        },
        lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
          _lagThreshold = threshold || Infinity;
          _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
        },
        fps: function fps(_fps) {
          _gap = 1000 / (_fps || 240);
          _nextTime = _self.time * 1000 + _gap;
        },
        add: function add(callback, once, prioritize) {
          var func = once ? function (t, d, f, v) {
            callback(t, d, f, v);
            _self.remove(func);
          } : callback;
          _self.remove(callback);
          _listeners[prioritize ? "unshift" : "push"](func);
          _wake();
          return func;
        },
        remove: function remove(callback, i) {
          ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
        },
        _listeners: _listeners
      };
      return _self;
    }(),
    _wake = function _wake() {
      return !_tickerActive && _ticker.wake();
    },
    _easeMap = {},
    _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
    _quotesExp = /["']/g,
    _parseObjectInString = function _parseObjectInString(value) {
      var obj = {},
        split = value.substr(1, value.length - 3).split(":"),
        key = split[0],
        i = 1,
        l = split.length,
        index,
        val,
        parsedVal;
      for (; i < l; i++) {
        val = split[i];
        index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
        parsedVal = val.substr(0, index);
        obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
        key = val.substr(index + 1).trim();
      }
      return obj;
    },
    _valueInParentheses = function _valueInParentheses(value) {
      var open = value.indexOf("(") + 1,
        close = value.indexOf(")"),
        nested = value.indexOf("(", open);
      return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
    },
    _configEaseFromString = function _configEaseFromString(name) {
      var split = (name + "").split("("),
        ease = _easeMap[split[0]];
      return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
    },
    _invertEase = function _invertEase(ease) {
      return function (p) {
        return 1 - ease(1 - p);
      };
    },
    _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
      var child = timeline._first,
        ease;
      while (child) {
        if (child instanceof Timeline) {
          _propagateYoyoEase(child, isYoyo);
        } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
          if (child.timeline) {
            _propagateYoyoEase(child.timeline, isYoyo);
          } else {
            ease = child._ease;
            child._ease = child._yEase;
            child._yEase = ease;
            child._yoyo = isYoyo;
          }
        }
        child = child._next;
      }
    },
    _parseEase = function _parseEase(ease, defaultEase) {
      return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
    },
    _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
      if (easeOut === void 0) {
        easeOut = function easeOut(p) {
          return 1 - easeIn(1 - p);
        };
      }
      if (easeInOut === void 0) {
        easeInOut = function easeInOut(p) {
          return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
        };
      }
      var ease = {
          easeIn: easeIn,
          easeOut: easeOut,
          easeInOut: easeInOut
        },
        lowercaseName;
      _forEachName(names, function (name) {
        _easeMap[name] = _globals[name] = ease;
        _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
        for (var p in ease) {
          _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
        }
      });
      return ease;
    },
    _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
      return function (p) {
        return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
      };
    },
    _configElastic = function _configElastic(type, amplitude, period) {
      var p1 = amplitude >= 1 ? amplitude : 1,
        p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
        p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
        easeOut = function easeOut(p) {
          return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
        },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
          return 1 - easeOut(1 - p);
        } : _easeInOutFromOut(easeOut);
      p2 = _2PI / p2;
      ease.config = function (amplitude, period) {
        return _configElastic(type, amplitude, period);
      };
      return ease;
    },
    _configBack = function _configBack(type, overshoot) {
      if (overshoot === void 0) {
        overshoot = 1.70158;
      }
      var easeOut = function easeOut(p) {
          return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
        },
        ease = type === "out" ? easeOut : type === "in" ? function (p) {
          return 1 - easeOut(1 - p);
        } : _easeInOutFromOut(easeOut);
      ease.config = function (overshoot) {
        return _configBack(type, overshoot);
      };
      return ease;
    };
  _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
    var power = i < 5 ? i + 1 : i;
    _insertEase(name + ",Power" + (power - 1), i ? function (p) {
      return Math.pow(p, power);
    } : function (p) {
      return p;
    }, function (p) {
      return 1 - Math.pow(1 - p, power);
    }, function (p) {
      return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
    });
  });
  _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
  _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
  (function (n, c) {
    var n1 = 1 / c,
      n2 = 2 * n1,
      n3 = 2.5 * n1,
      easeOut = function easeOut(p) {
        return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
      };
    _insertEase("Bounce", function (p) {
      return 1 - easeOut(1 - p);
    }, easeOut);
  })(7.5625, 2.75);
  _insertEase("Expo", function (p) {
    return p ? Math.pow(2, 10 * (p - 1)) : 0;
  });
  _insertEase("Circ", function (p) {
    return -(_sqrt(1 - p * p) - 1);
  });
  _insertEase("Sine", function (p) {
    return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
  });
  _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
  _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
    config: function config(steps, immediateStart) {
      if (steps === void 0) {
        steps = 1;
      }
      var p1 = 1 / steps,
        p2 = steps + (immediateStart ? 0 : 1),
        p3 = immediateStart ? 1 : 0,
        max = 1 - _tinyNum;
      return function (p) {
        return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
      };
    }
  };
  _defaults.ease = _easeMap["quad.out"];
  _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
    return _callbackNames += name + "," + name + "Params,";
  });
  var GSCache = function GSCache(target, harness) {
    this.id = _gsID++;
    target._gsap = this;
    this.target = target;
    this.harness = harness;
    this.get = harness ? harness.get : _getProperty;
    this.set = harness ? harness.getSetter : _getSetter;
  };
  var Animation = function () {
    function Animation(vars) {
      this.vars = vars;
      this._delay = +vars.delay || 0;
      if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
        this._rDelay = vars.repeatDelay || 0;
        this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
      }
      this._ts = 1;
      _setDuration(this, +vars.duration, 1, 1);
      this.data = vars.data;
      if (_context) {
        this._ctx = _context;
        _context.data.push(this);
      }
      _tickerActive || _ticker.wake();
    }
    var _proto = Animation.prototype;
    _proto.delay = function delay(value) {
      if (value || value === 0) {
        this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
        this._delay = value;
        return this;
      }
      return this._delay;
    };
    _proto.duration = function duration(value) {
      return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
    };
    _proto.totalDuration = function totalDuration(value) {
      if (!arguments.length) {
        return this._tDur;
      }
      this._dirty = 0;
      return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
    };
    _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
      _wake();
      if (!arguments.length) {
        return this._tTime;
      }
      var parent = this._dp;
      if (parent && parent.smoothChildTiming && this._ts) {
        _alignPlayhead(this, _totalTime);
        !parent._dp || parent.parent || _postAddChecks(parent, this);
        while (parent && parent.parent) {
          if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
            parent.totalTime(parent._tTime, true);
          }
          parent = parent.parent;
        }
        if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
          _addToTimeline(this._dp, this, this._start - this._delay);
        }
      }
      if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
        this._ts || (this._pTime = _totalTime);
        _lazySafeRender(this, _totalTime, suppressEvents);
      }
      return this;
    };
    _proto.time = function time(value, suppressEvents) {
      return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
    };
    _proto.totalProgress = function totalProgress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
    };
    _proto.progress = function progress(value, suppressEvents) {
      return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
    };
    _proto.iteration = function iteration(value, suppressEvents) {
      var cycleDuration = this.duration() + this._rDelay;
      return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
    };
    _proto.timeScale = function timeScale(value) {
      if (!arguments.length) {
        return this._rts === -_tinyNum ? 0 : this._rts;
      }
      if (this._rts === value) {
        return this;
      }
      var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
      this._rts = +value || 0;
      this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
      this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), true);
      _setEnd(this);
      return _recacheAncestors(this);
    };
    _proto.paused = function paused(value) {
      if (!arguments.length) {
        return this._ps;
      }
      if (this._ps !== value) {
        this._ps = value;
        if (value) {
          this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
          this._ts = this._act = 0;
        } else {
          _wake();
          this._ts = this._rts;
          this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
        }
      }
      return this;
    };
    _proto.startTime = function startTime(value) {
      if (arguments.length) {
        this._start = value;
        var parent = this.parent || this._dp;
        parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
        return this;
      }
      return this._start;
    };
    _proto.endTime = function endTime(includeRepeats) {
      return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
    };
    _proto.rawTime = function rawTime(wrapRepeats) {
      var parent = this.parent || this._dp;
      return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
    };
    _proto.revert = function revert(config) {
      if (config === void 0) {
        config = _revertConfig;
      }
      var prevIsReverting = _reverting;
      _reverting = config;
      if (this._initted || this._startAt) {
        this.timeline && this.timeline.revert(config);
        this.totalTime(-0.01, config.suppressEvents);
      }
      this.data !== "nested" && config.kill !== false && this.kill();
      _reverting = prevIsReverting;
      return this;
    };
    _proto.globalTime = function globalTime(rawTime) {
      var animation = this,
        time = arguments.length ? rawTime : animation.rawTime();
      while (animation) {
        time = animation._start + time / (animation._ts || 1);
        animation = animation._dp;
      }
      return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(rawTime) : time;
    };
    _proto.repeat = function repeat(value) {
      if (arguments.length) {
        this._repeat = value === Infinity ? -2 : value;
        return _onUpdateTotalDuration(this);
      }
      return this._repeat === -2 ? Infinity : this._repeat;
    };
    _proto.repeatDelay = function repeatDelay(value) {
      if (arguments.length) {
        var time = this._time;
        this._rDelay = value;
        _onUpdateTotalDuration(this);
        return time ? this.time(time) : this;
      }
      return this._rDelay;
    };
    _proto.yoyo = function yoyo(value) {
      if (arguments.length) {
        this._yoyo = value;
        return this;
      }
      return this._yoyo;
    };
    _proto.seek = function seek(position, suppressEvents) {
      return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
    };
    _proto.restart = function restart(includeDelay, suppressEvents) {
      return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    };
    _proto.play = function play(from, suppressEvents) {
      from != null && this.seek(from, suppressEvents);
      return this.reversed(false).paused(false);
    };
    _proto.reverse = function reverse(from, suppressEvents) {
      from != null && this.seek(from || this.totalDuration(), suppressEvents);
      return this.reversed(true).paused(false);
    };
    _proto.pause = function pause(atTime, suppressEvents) {
      atTime != null && this.seek(atTime, suppressEvents);
      return this.paused(true);
    };
    _proto.resume = function resume() {
      return this.paused(false);
    };
    _proto.reversed = function reversed(value) {
      if (arguments.length) {
        !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
        return this;
      }
      return this._rts < 0;
    };
    _proto.invalidate = function invalidate() {
      this._initted = this._act = 0;
      this._zTime = -_tinyNum;
      return this;
    };
    _proto.isActive = function isActive() {
      var parent = this.parent || this._dp,
        start = this._start,
        rawTime;
      return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
    };
    _proto.eventCallback = function eventCallback(type, callback, params) {
      var vars = this.vars;
      if (arguments.length > 1) {
        if (!callback) {
          delete vars[type];
        } else {
          vars[type] = callback;
          params && (vars[type + "Params"] = params);
          type === "onUpdate" && (this._onUpdate = callback);
        }
        return this;
      }
      return vars[type];
    };
    _proto.then = function then(onFulfilled) {
      var self = this;
      return new Promise(function (resolve) {
        var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough,
          _resolve = function _resolve() {
            var _then = self.then;
            self.then = null;
            _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
            resolve(f);
            self.then = _then;
          };
        if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
          _resolve();
        } else {
          self._prom = _resolve;
        }
      });
    };
    _proto.kill = function kill() {
      _interrupt(this);
    };
    return Animation;
  }();
  _setDefaults(Animation.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: false,
    parent: null,
    _initted: false,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -_tinyNum,
    _prom: 0,
    _ps: false,
    _rts: 1
  });
  var Timeline = function (_Animation) {
    _inheritsLoose(Timeline, _Animation);
    function Timeline(vars, position) {
      var _this;
      if (vars === void 0) {
        vars = {};
      }
      _this = _Animation.call(this, vars) || this;
      _this.labels = {};
      _this.smoothChildTiming = !!vars.smoothChildTiming;
      _this.autoRemoveChildren = !!vars.autoRemoveChildren;
      _this._sort = _isNotFalse(vars.sortChildren);
      _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
      vars.reversed && _this.reverse();
      vars.paused && _this.paused(true);
      vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
      return _this;
    }
    var _proto2 = Timeline.prototype;
    _proto2.to = function to(targets, vars, position) {
      _createTweenType(0, arguments, this);
      return this;
    };
    _proto2.from = function from(targets, vars, position) {
      _createTweenType(1, arguments, this);
      return this;
    };
    _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
      _createTweenType(2, arguments, this);
      return this;
    };
    _proto2.set = function set(targets, vars, position) {
      vars.duration = 0;
      vars.parent = this;
      _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
      vars.immediateRender = !!vars.immediateRender;
      new Tween(targets, vars, _parsePosition(this, position), 1);
      return this;
    };
    _proto2.call = function call(callback, params, position) {
      return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
    };
    _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.duration = duration;
      vars.stagger = vars.stagger || stagger;
      vars.onComplete = onCompleteAll;
      vars.onCompleteParams = onCompleteAllParams;
      vars.parent = this;
      new Tween(targets, vars, _parsePosition(this, position));
      return this;
    };
    _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
      vars.runBackwards = 1;
      _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
      return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
      toVars.startAt = fromVars;
      _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
      return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
    };
    _proto2.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
        tDur = this._dirty ? this.totalDuration() : this._tDur,
        dur = this._dur,
        tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
        crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
        time,
        child,
        next,
        iteration,
        cycleDuration,
        prevPaused,
        pauseTween,
        timeScale,
        prevStart,
        prevIteration,
        yoyo,
        isYoyo;
      this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
      if (tTime !== this._tTime || force || crossingStart) {
        if (prevTime !== this._time && dur) {
          tTime += this._time - prevTime;
          totalTime += this._time - prevTime;
        }
        time = tTime;
        prevStart = this._start;
        timeScale = this._ts;
        prevPaused = !timeScale;
        if (crossingStart) {
          dur || (prevTime = this._zTime);
          (totalTime || !suppressEvents) && (this._zTime = totalTime);
        }
        if (this._repeat) {
          yoyo = this._yoyo;
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && totalTime < 0) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);
            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
          if (yoyo && iteration & 1) {
            time = dur - time;
            isYoyo = 1;
          }
          if (iteration !== prevIteration && !this._lock) {
            var rewinding = yoyo && prevIteration & 1,
              doesWrap = rewinding === (yoyo && iteration & 1);
            iteration < prevIteration && (rewinding = !rewinding);
            prevTime = rewinding ? 0 : dur;
            this._lock = 1;
            this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
            this._tTime = tTime;
            !suppressEvents && this.parent && _callback(this, "onRepeat");
            this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
            if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
              return this;
            }
            dur = this._dur;
            tDur = this._tDur;
            if (doesWrap) {
              this._lock = 2;
              prevTime = rewinding ? dur : -0.0001;
              this.render(prevTime, true);
              this.vars.repeatRefresh && !isYoyo && this.invalidate();
            }
            this._lock = 0;
            if (!this._ts && !prevPaused) {
              return this;
            }
            _propagateYoyoEase(this, isYoyo);
          }
        }
        if (this._hasPause && !this._forcing && this._lock < 2) {
          pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
          if (pauseTween) {
            tTime -= time - (time = pauseTween._start);
          }
        }
        this._tTime = tTime;
        this._time = time;
        this._act = !timeScale;
        if (!this._initted) {
          this._onUpdate = this.vars.onUpdate;
          this._initted = 1;
          this._zTime = totalTime;
          prevTime = 0;
        }
        if (!prevTime && time && !suppressEvents && !iteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        if (time >= prevTime && totalTime >= 0) {
          child = this._first;
          while (child) {
            next = child._next;
            if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = -_tinyNum);
                break;
              }
            }
            child = next;
          }
        } else {
          child = this._last;
          var adjustedTime = totalTime < 0 ? totalTime : time;
          while (child) {
            next = child._prev;
            if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
              if (child.parent !== this) {
                return this.render(totalTime, suppressEvents, force);
              }
              child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt));
              if (time !== this._time || !this._ts && !prevPaused) {
                pauseTween = 0;
                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                break;
              }
            }
            child = next;
          }
        }
        if (pauseTween && !suppressEvents) {
          this.pause();
          pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
          if (this._ts) {
            this._start = prevStart;
            _setEnd(this);
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
        if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
          (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
            _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto2.add = function add(child, position) {
      var _this2 = this;
      _isNumber(position) || (position = _parsePosition(this, position, child));
      if (!(child instanceof Animation)) {
        if (_isArray(child)) {
          child.forEach(function (obj) {
            return _this2.add(obj, position);
          });
          return this;
        }
        if (_isString(child)) {
          return this.addLabel(child, position);
        }
        if (_isFunction(child)) {
          child = Tween.delayedCall(0, child);
        } else {
          return this;
        }
      }
      return this !== child ? _addToTimeline(this, child, position) : this;
    };
    _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
      if (nested === void 0) {
        nested = true;
      }
      if (tweens === void 0) {
        tweens = true;
      }
      if (timelines === void 0) {
        timelines = true;
      }
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = -_bigNum;
      }
      var a = [],
        child = this._first;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          if (child instanceof Tween) {
            tweens && a.push(child);
          } else {
            timelines && a.push(child);
            nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
          }
        }
        child = child._next;
      }
      return a;
    };
    _proto2.getById = function getById(id) {
      var animations = this.getChildren(1, 1, 1),
        i = animations.length;
      while (i--) {
        if (animations[i].vars.id === id) {
          return animations[i];
        }
      }
    };
    _proto2.remove = function remove(child) {
      if (_isString(child)) {
        return this.removeLabel(child);
      }
      if (_isFunction(child)) {
        return this.killTweensOf(child);
      }
      _removeLinkedListItem(this, child);
      if (child === this._recent) {
        this._recent = this._last;
      }
      return _uncache(this);
    };
    _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
      if (!arguments.length) {
        return this._tTime;
      }
      this._forcing = 1;
      if (!this._dp && this._ts) {
        this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
      }
      _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
      this._forcing = 0;
      return this;
    };
    _proto2.addLabel = function addLabel(label, position) {
      this.labels[label] = _parsePosition(this, position);
      return this;
    };
    _proto2.removeLabel = function removeLabel(label) {
      delete this.labels[label];
      return this;
    };
    _proto2.addPause = function addPause(position, callback, params) {
      var t = Tween.delayedCall(0, callback || _emptyFunc, params);
      t.data = "isPause";
      this._hasPause = 1;
      return _addToTimeline(this, t, _parsePosition(this, position));
    };
    _proto2.removePause = function removePause(position) {
      var child = this._first;
      position = _parsePosition(this, position);
      while (child) {
        if (child._start === position && child.data === "isPause") {
          _removeFromParent(child);
        }
        child = child._next;
      }
    };
    _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      var tweens = this.getTweensOf(targets, onlyActive),
        i = tweens.length;
      while (i--) {
        _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
      }
      return this;
    };
    _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
      var a = [],
        parsedTargets = toArray(targets),
        child = this._first,
        isGlobalTime = _isNumber(onlyActive),
        children;
      while (child) {
        if (child instanceof Tween) {
          if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
            a.push(child);
          }
        } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
          a.push.apply(a, children);
        }
        child = child._next;
      }
      return a;
    };
    _proto2.tweenTo = function tweenTo(position, vars) {
      vars = vars || {};
      var tl = this,
        endTime = _parsePosition(tl, position),
        _vars = vars,
        startAt = _vars.startAt,
        _onStart = _vars.onStart,
        onStartParams = _vars.onStartParams,
        immediateRender = _vars.immediateRender,
        initted,
        tween = Tween.to(tl, _setDefaults({
          ease: vars.ease || "none",
          lazy: false,
          immediateRender: false,
          time: endTime,
          overwrite: "auto",
          duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
          onStart: function onStart() {
            tl.pause();
            if (!initted) {
              var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
              tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
              initted = 1;
            }
            _onStart && _onStart.apply(tween, onStartParams || []);
          }
        }, vars));
      return immediateRender ? tween.render(0) : tween;
    };
    _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
      return this.tweenTo(toPosition, _setDefaults({
        startAt: {
          time: _parsePosition(this, fromPosition)
        }
      }, vars));
    };
    _proto2.recent = function recent() {
      return this._recent;
    };
    _proto2.nextLabel = function nextLabel(afterTime) {
      if (afterTime === void 0) {
        afterTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, afterTime));
    };
    _proto2.previousLabel = function previousLabel(beforeTime) {
      if (beforeTime === void 0) {
        beforeTime = this._time;
      }
      return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
    };
    _proto2.currentLabel = function currentLabel(value) {
      return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
    };
    _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
      if (ignoreBeforeTime === void 0) {
        ignoreBeforeTime = 0;
      }
      var child = this._first,
        labels = this.labels,
        p;
      while (child) {
        if (child._start >= ignoreBeforeTime) {
          child._start += amount;
          child._end += amount;
        }
        child = child._next;
      }
      if (adjustLabels) {
        for (p in labels) {
          if (labels[p] >= ignoreBeforeTime) {
            labels[p] += amount;
          }
        }
      }
      return _uncache(this);
    };
    _proto2.invalidate = function invalidate(soft) {
      var child = this._first;
      this._lock = 0;
      while (child) {
        child.invalidate(soft);
        child = child._next;
      }
      return _Animation.prototype.invalidate.call(this, soft);
    };
    _proto2.clear = function clear(includeLabels) {
      if (includeLabels === void 0) {
        includeLabels = true;
      }
      var child = this._first,
        next;
      while (child) {
        next = child._next;
        this.remove(child);
        child = next;
      }
      this._dp && (this._time = this._tTime = this._pTime = 0);
      includeLabels && (this.labels = {});
      return _uncache(this);
    };
    _proto2.totalDuration = function totalDuration(value) {
      var max = 0,
        self = this,
        child = self._last,
        prevStart = _bigNum,
        prev,
        start,
        parent;
      if (arguments.length) {
        return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
      }
      if (self._dirty) {
        parent = self.parent;
        while (child) {
          prev = child._prev;
          child._dirty && child.totalDuration();
          start = child._start;
          if (start > prevStart && self._sort && child._ts && !self._lock) {
            self._lock = 1;
            _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
          } else {
            prevStart = start;
          }
          if (start < 0 && child._ts) {
            max -= start;
            if (!parent && !self._dp || parent && parent.smoothChildTiming) {
              self._start += start / self._ts;
              self._time -= start;
              self._tTime -= start;
            }
            self.shiftChildren(-start, false, -1e999);
            prevStart = 0;
          }
          child._end > max && child._ts && (max = child._end);
          child = prev;
        }
        _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
        self._dirty = 0;
      }
      return self._tDur;
    };
    Timeline.updateRoot = function updateRoot(time) {
      if (_globalTimeline._ts) {
        _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
        _lastRenderedFrame = _ticker.frame;
      }
      if (_ticker.frame >= _nextGCFrame) {
        _nextGCFrame += _config.autoSleep || 120;
        var child = _globalTimeline._first;
        if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }
          child || _ticker.sleep();
        }
      }
    };
    return Timeline;
  }(Animation);
  _setDefaults(Timeline.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
  });
  var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
      var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
        index = 0,
        matchIndex = 0,
        result,
        startNums,
        color,
        endNum,
        chunk,
        startNum,
        hasRandom,
        a;
      pt.b = start;
      pt.e = end;
      start += "";
      end += "";
      if (hasRandom = ~end.indexOf("random(")) {
        end = _replaceRandom(end);
      }
      if (stringFilter) {
        a = [start, end];
        stringFilter(a, target, prop);
        start = a[0];
        end = a[1];
      }
      startNums = start.match(_complexStringNumExp) || [];
      while (result = _complexStringNumExp.exec(end)) {
        endNum = result[0];
        chunk = end.substring(index, result.index);
        if (color) {
          color = (color + 1) % 5;
        } else if (chunk.substr(-5) === "rgba(") {
          color = 1;
        }
        if (endNum !== startNums[matchIndex++]) {
          startNum = parseFloat(startNums[matchIndex - 1]) || 0;
          pt._pt = {
            _next: pt._pt,
            p: chunk || matchIndex === 1 ? chunk : ",",
            s: startNum,
            c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
            m: color && color < 4 ? Math.round : 0
          };
          index = _complexStringNumExp.lastIndex;
        }
      }
      pt.c = index < end.length ? end.substring(index, end.length) : "";
      pt.fp = funcParam;
      if (_relExp.test(end) || hasRandom) {
        pt.e = 0;
      }
      this._pt = pt;
      return pt;
    },
    _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
      _isFunction(end) && (end = end(index || 0, target, targets));
      var currentValue = target[prop],
        parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
        setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
        pt;
      if (_isString(end)) {
        if (~end.indexOf("random(")) {
          end = _replaceRandom(end);
        }
        if (end.charAt(1) === "=") {
          pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
          if (pt || pt === 0) {
            end = pt;
          }
        }
      }
      if (!optional || parsedStart !== end || _forceAllPropTweens) {
        if (!isNaN(parsedStart * end) && end !== "") {
          pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
          funcParam && (pt.fp = funcParam);
          modifier && pt.modifier(modifier, this, target);
          return this._pt = pt;
        }
        !currentValue && !(prop in target) && _missingPlugin(prop, end);
        return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
      }
    },
    _processVars = function _processVars(vars, index, target, targets, tween) {
      _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
      if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
        return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
      }
      var copy = {},
        p;
      for (p in vars) {
        copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
      }
      return copy;
    },
    _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
      var plugin, pt, ptLookup, i;
      if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
        if (tween !== _quickTween) {
          ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
          i = plugin._props.length;
          while (i--) {
            ptLookup[plugin._props[i]] = pt;
          }
        }
      }
      return plugin;
    },
    _overwritingTween,
    _forceAllPropTweens,
    _initTween = function _initTween(tween, time, tTime) {
      var vars = tween.vars,
        ease = vars.ease,
        startAt = vars.startAt,
        immediateRender = vars.immediateRender,
        lazy = vars.lazy,
        onUpdate = vars.onUpdate,
        onUpdateParams = vars.onUpdateParams,
        callbackScope = vars.callbackScope,
        runBackwards = vars.runBackwards,
        yoyoEase = vars.yoyoEase,
        keyframes = vars.keyframes,
        autoRevert = vars.autoRevert,
        dur = tween._dur,
        prevStartAt = tween._startAt,
        targets = tween._targets,
        parent = tween.parent,
        fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
        autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites,
        tl = tween.timeline,
        cleanVars,
        i,
        p,
        pt,
        target,
        hasPriority,
        gsData,
        harness,
        plugin,
        ptLookup,
        index,
        harnessVars,
        overwritten;
      tl && (!keyframes || !ease) && (ease = "none");
      tween._ease = _parseEase(ease, _defaults.ease);
      tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
      if (yoyoEase && tween._yoyo && !tween._repeat) {
        yoyoEase = tween._yEase;
        tween._yEase = tween._ease;
        tween._ease = yoyoEase;
      }
      tween._from = !tl && !!vars.runBackwards;
      if (!tl || keyframes && !vars.stagger) {
        harness = targets[0] ? _getCache(targets[0]).harness : 0;
        harnessVars = harness && vars[harness.prop];
        cleanVars = _copyExcluding(vars, _reservedProps);
        if (prevStartAt) {
          prevStartAt._zTime < 0 && prevStartAt.progress(1);
          time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
          prevStartAt._lazy = 0;
        }
        if (startAt) {
          _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
            data: "isStart",
            overwrite: false,
            parent: parent,
            immediateRender: true,
            lazy: !prevStartAt && _isNotFalse(lazy),
            startAt: null,
            delay: 0,
            onUpdate: onUpdate,
            onUpdateParams: onUpdateParams,
            callbackScope: callbackScope,
            stagger: 0
          }, startAt)));
          tween._startAt._dp = 0;
          tween._startAt._sat = tween;
          time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
          if (immediateRender) {
            if (dur && time <= 0 && tTime <= 0) {
              time && (tween._zTime = time);
              return;
            }
          }
        } else if (runBackwards && dur) {
          if (!prevStartAt) {
            time && (immediateRender = false);
            p = _setDefaults({
              overwrite: false,
              data: "isFromStart",
              lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
              immediateRender: immediateRender,
              stagger: 0,
              parent: parent
            }, cleanVars);
            harnessVars && (p[harness.prop] = harnessVars);
            _removeFromParent(tween._startAt = Tween.set(targets, p));
            tween._startAt._dp = 0;
            tween._startAt._sat = tween;
            time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
            tween._zTime = time;
            if (!immediateRender) {
              _initTween(tween._startAt, _tinyNum, _tinyNum);
            } else if (!time) {
              return;
            }
          }
        }
        tween._pt = tween._ptCache = 0;
        lazy = dur && _isNotFalse(lazy) || lazy && !dur;
        for (i = 0; i < targets.length; i++) {
          target = targets[i];
          gsData = target._gsap || _harness(targets)[i]._gsap;
          tween._ptLookup[i] = ptLookup = {};
          _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
          index = fullTargets === targets ? i : fullTargets.indexOf(target);
          if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
            tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
            plugin._props.forEach(function (name) {
              ptLookup[name] = pt;
            });
            plugin.priority && (hasPriority = 1);
          }
          if (!harness || harnessVars) {
            for (p in cleanVars) {
              if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
                plugin.priority && (hasPriority = 1);
              } else {
                ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
              }
            }
          }
          tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
          if (autoOverwrite && tween._pt) {
            _overwritingTween = tween;
            _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
            overwritten = !tween.parent;
            _overwritingTween = 0;
          }
          tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
        }
        hasPriority && _sortPropTweensByPriority(tween);
        tween._onInit && tween._onInit(tween);
      }
      tween._onUpdate = onUpdate;
      tween._initted = (!tween._op || tween._pt) && !overwritten;
      keyframes && time <= 0 && tl.render(_bigNum, true, true);
    },
    _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
      var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
        pt,
        rootPT,
        lookup,
        i;
      if (!ptCache) {
        ptCache = tween._ptCache[property] = [];
        lookup = tween._ptLookup;
        i = tween._targets.length;
        while (i--) {
          pt = lookup[i][property];
          if (pt && pt.d && pt.d._pt) {
            pt = pt.d._pt;
            while (pt && pt.p !== property && pt.fp !== property) {
              pt = pt._next;
            }
          }
          if (!pt) {
            _forceAllPropTweens = 1;
            tween.vars[property] = "+=0";
            _initTween(tween, time);
            _forceAllPropTweens = 0;
            return 1;
          }
          ptCache.push(pt);
        }
      }
      i = ptCache.length;
      while (i--) {
        rootPT = ptCache[i];
        pt = rootPT._pt || rootPT;
        pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
        pt.c = value - pt.s;
        rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
        rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
      }
    },
    _addAliasesToVars = function _addAliasesToVars(targets, vars) {
      var harness = targets[0] ? _getCache(targets[0]).harness : 0,
        propertyAliases = harness && harness.aliases,
        copy,
        p,
        i,
        aliases;
      if (!propertyAliases) {
        return vars;
      }
      copy = _merge({}, vars);
      for (p in propertyAliases) {
        if (p in copy) {
          aliases = propertyAliases[p].split(",");
          i = aliases.length;
          while (i--) {
            copy[aliases[i]] = copy[p];
          }
        }
      }
      return copy;
    },
    _parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
      var ease = obj.ease || easeEach || "power1.inOut",
        p,
        a;
      if (_isArray(obj)) {
        a = allProps[prop] || (allProps[prop] = []);
        obj.forEach(function (value, i) {
          return a.push({
            t: i / (obj.length - 1) * 100,
            v: value,
            e: ease
          });
        });
      } else {
        for (p in obj) {
          a = allProps[p] || (allProps[p] = []);
          p === "ease" || a.push({
            t: parseFloat(prop),
            v: obj[p],
            e: ease
          });
        }
      }
    },
    _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
      return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
    },
    _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    _staggerPropsToSkip = {};
  _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
    return _staggerPropsToSkip[name] = 1;
  });
  var Tween = function (_Animation2) {
    _inheritsLoose(Tween, _Animation2);
    function Tween(targets, vars, position, skipInherit) {
      var _this3;
      if (typeof vars === "number") {
        position.duration = vars;
        vars = position;
        position = null;
      }
      _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
      var _this3$vars = _this3.vars,
        duration = _this3$vars.duration,
        delay = _this3$vars.delay,
        immediateRender = _this3$vars.immediateRender,
        stagger = _this3$vars.stagger,
        overwrite = _this3$vars.overwrite,
        keyframes = _this3$vars.keyframes,
        defaults = _this3$vars.defaults,
        scrollTrigger = _this3$vars.scrollTrigger,
        yoyoEase = _this3$vars.yoyoEase,
        parent = vars.parent || _globalTimeline,
        parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
        tl,
        i,
        copy,
        l,
        p,
        curTarget,
        staggerFunc,
        staggerVarsToMerge;
      _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
      _this3._ptLookup = [];
      _this3._overwrite = overwrite;
      if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        vars = _this3.vars;
        tl = _this3.timeline = new Timeline({
          data: "nested",
          defaults: defaults || {},
          targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
        });
        tl.kill();
        tl.parent = tl._dp = _assertThisInitialized(_this3);
        tl._start = 0;
        if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
          l = parsedTargets.length;
          staggerFunc = stagger && distribute(stagger);
          if (_isObject(stagger)) {
            for (p in stagger) {
              if (~_staggerTweenProps.indexOf(p)) {
                staggerVarsToMerge || (staggerVarsToMerge = {});
                staggerVarsToMerge[p] = stagger[p];
              }
            }
          }
          for (i = 0; i < l; i++) {
            copy = _copyExcluding(vars, _staggerPropsToSkip);
            copy.stagger = 0;
            yoyoEase && (copy.yoyoEase = yoyoEase);
            staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
            curTarget = parsedTargets[i];
            copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
            copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
            if (!stagger && l === 1 && copy.delay) {
              _this3._delay = delay = copy.delay;
              _this3._start += delay;
              copy.delay = 0;
            }
            tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
            tl._ease = _easeMap.none;
          }
          tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
        } else if (keyframes) {
          _inheritDefaults(_setDefaults(tl.vars.defaults, {
            ease: "none"
          }));
          tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
          var time = 0,
            a,
            kf,
            v;
          if (_isArray(keyframes)) {
            keyframes.forEach(function (frame) {
              return tl.to(parsedTargets, frame, ">");
            });
            tl.duration();
          } else {
            copy = {};
            for (p in keyframes) {
              p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
            }
            for (p in copy) {
              a = copy[p].sort(function (a, b) {
                return a.t - b.t;
              });
              time = 0;
              for (i = 0; i < a.length; i++) {
                kf = a[i];
                v = {
                  ease: kf.e,
                  duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                };
                v[p] = kf.v;
                tl.to(parsedTargets, v, time);
                time += v.duration;
              }
            }
            tl.duration() < duration && tl.to({}, {
              duration: duration - tl.duration()
            });
          }
        }
        duration || _this3.duration(duration = tl.duration());
      } else {
        _this3.timeline = 0;
      }
      if (overwrite === true && !_suppressOverwrites) {
        _overwritingTween = _assertThisInitialized(_this3);
        _globalTimeline.killTweensOf(parsedTargets);
        _overwritingTween = 0;
      }
      _addToTimeline(parent, _assertThisInitialized(_this3), position);
      vars.reversed && _this3.reverse();
      vars.paused && _this3.paused(true);
      if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
        _this3._tTime = -_tinyNum;
        _this3.render(Math.max(0, -delay) || 0);
      }
      scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
      return _this3;
    }
    var _proto3 = Tween.prototype;
    _proto3.render = function render(totalTime, suppressEvents, force) {
      var prevTime = this._time,
        tDur = this._tDur,
        dur = this._dur,
        isNegative = totalTime < 0,
        tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
        time,
        pt,
        iteration,
        cycleDuration,
        prevIteration,
        isYoyo,
        ratio,
        timeline,
        yoyoEase;
      if (!dur) {
        _renderZeroDurationTween(this, totalTime, suppressEvents, force);
      } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
        time = tTime;
        timeline = this.timeline;
        if (this._repeat) {
          cycleDuration = dur + this._rDelay;
          if (this._repeat < -1 && isNegative) {
            return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
          }
          time = _roundPrecise(tTime % cycleDuration);
          if (tTime === tDur) {
            iteration = this._repeat;
            time = dur;
          } else {
            iteration = ~~(tTime / cycleDuration);
            if (iteration && iteration === tTime / cycleDuration) {
              time = dur;
              iteration--;
            }
            time > dur && (time = dur);
          }
          isYoyo = this._yoyo && iteration & 1;
          if (isYoyo) {
            yoyoEase = this._yEase;
            time = dur - time;
          }
          prevIteration = _animationCycle(this._tTime, cycleDuration);
          if (time === prevTime && !force && this._initted) {
            this._tTime = tTime;
            return this;
          }
          if (iteration !== prevIteration) {
            timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo);
            if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
              this._lock = force = 1;
              this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
            }
          }
        }
        if (!this._initted) {
          if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
            this._tTime = 0;
            return this;
          }
          if (prevTime !== this._time) {
            return this;
          }
          if (dur !== this._dur) {
            return this.render(totalTime, suppressEvents, force);
          }
        }
        this._tTime = tTime;
        this._time = time;
        if (!this._act && this._ts) {
          this._act = 1;
          this._lazy = 0;
        }
        this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
        if (this._from) {
          this.ratio = ratio = 1 - ratio;
        }
        if (time && !prevTime && !suppressEvents && !iteration) {
          _callback(this, "onStart");
          if (this._tTime !== tTime) {
            return this;
          }
        }
        pt = this._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
        if (this._onUpdate && !suppressEvents) {
          isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
          _callback(this, "onUpdate");
        }
        this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
        if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
          isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
          (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
          if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
            _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
            this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
          }
        }
      }
      return this;
    };
    _proto3.targets = function targets() {
      return this._targets;
    };
    _proto3.invalidate = function invalidate(soft) {
      (!soft || !this.vars.runBackwards) && (this._startAt = 0);
      this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
      this._ptLookup = [];
      this.timeline && this.timeline.invalidate(soft);
      return _Animation2.prototype.invalidate.call(this, soft);
    };
    _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
      _tickerActive || _ticker.wake();
      this._ts || this.play();
      var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
        ratio;
      this._initted || _initTween(this, time);
      ratio = this._ease(time / this._dur);
      if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) {
        return this.resetTo(property, value, start, startIsRelative);
      }
      _alignPlayhead(this, 0);
      this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
      return this.render(0);
    };
    _proto3.kill = function kill(targets, vars) {
      if (vars === void 0) {
        vars = "all";
      }
      if (!targets && (!vars || vars === "all")) {
        this._lazy = this._pt = 0;
        return this.parent ? _interrupt(this) : this;
      }
      if (this.timeline) {
        var tDur = this.timeline.totalDuration();
        this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
        this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
        return this;
      }
      var parsedTargets = this._targets,
        killingTargets = targets ? toArray(targets) : parsedTargets,
        propTweenLookup = this._ptLookup,
        firstPT = this._pt,
        overwrittenProps,
        curLookup,
        curOverwriteProps,
        props,
        p,
        pt,
        i;
      if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
        vars === "all" && (this._pt = 0);
        return _interrupt(this);
      }
      overwrittenProps = this._op = this._op || [];
      if (vars !== "all") {
        if (_isString(vars)) {
          p = {};
          _forEachName(vars, function (name) {
            return p[name] = 1;
          });
          vars = p;
        }
        vars = _addAliasesToVars(parsedTargets, vars);
      }
      i = parsedTargets.length;
      while (i--) {
        if (~killingTargets.indexOf(parsedTargets[i])) {
          curLookup = propTweenLookup[i];
          if (vars === "all") {
            overwrittenProps[i] = vars;
            props = curLookup;
            curOverwriteProps = {};
          } else {
            curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
            props = vars;
          }
          for (p in props) {
            pt = curLookup && curLookup[p];
            if (pt) {
              if (!("kill" in pt.d) || pt.d.kill(p) === true) {
                _removeLinkedListItem(this, pt, "_pt");
              }
              delete curLookup[p];
            }
            if (curOverwriteProps !== "all") {
              curOverwriteProps[p] = 1;
            }
          }
        }
      }
      this._initted && !this._pt && firstPT && _interrupt(this);
      return this;
    };
    Tween.to = function to(targets, vars) {
      return new Tween(targets, vars, arguments[2]);
    };
    Tween.from = function from(targets, vars) {
      return _createTweenType(1, arguments);
    };
    Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
      return new Tween(callback, 0, {
        immediateRender: false,
        lazy: false,
        overwrite: false,
        delay: delay,
        onComplete: callback,
        onReverseComplete: callback,
        onCompleteParams: params,
        onReverseCompleteParams: params,
        callbackScope: scope
      });
    };
    Tween.fromTo = function fromTo(targets, fromVars, toVars) {
      return _createTweenType(2, arguments);
    };
    Tween.set = function set(targets, vars) {
      vars.duration = 0;
      vars.repeatDelay || (vars.repeat = 0);
      return new Tween(targets, vars);
    };
    Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
      return _globalTimeline.killTweensOf(targets, props, onlyActive);
    };
    return Tween;
  }(Animation);
  _setDefaults(Tween.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
  });
  _forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
    Tween[name] = function () {
      var tl = new Timeline(),
        params = _slice.call(arguments, 0);
      params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
      return tl[name].apply(tl, params);
    };
  });
  var _setterPlain = function _setterPlain(target, property, value) {
      return target[property] = value;
    },
    _setterFunc = function _setterFunc(target, property, value) {
      return target[property](value);
    },
    _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
      return target[property](data.fp, value);
    },
    _setterAttribute = function _setterAttribute(target, property, value) {
      return target.setAttribute(property, value);
    },
    _getSetter = function _getSetter(target, property) {
      return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
    },
    _renderPlain = function _renderPlain(ratio, data) {
      return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
    },
    _renderBoolean = function _renderBoolean(ratio, data) {
      return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
    },
    _renderComplexString = function _renderComplexString(ratio, data) {
      var pt = data._pt,
        s = "";
      if (!ratio && data.b) {
        s = data.b;
      } else if (ratio === 1 && data.e) {
        s = data.e;
      } else {
        while (pt) {
          s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s;
          pt = pt._next;
        }
        s += data.c;
      }
      data.set(data.t, data.p, s, data);
    },
    _renderPropTweens = function _renderPropTweens(ratio, data) {
      var pt = data._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    },
    _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
      var pt = this._pt,
        next;
      while (pt) {
        next = pt._next;
        pt.p === property && pt.modifier(modifier, tween, target);
        pt = next;
      }
    },
    _killPropTweensOf = function _killPropTweensOf(property) {
      var pt = this._pt,
        hasNonDependentRemaining,
        next;
      while (pt) {
        next = pt._next;
        if (pt.p === property && !pt.op || pt.op === property) {
          _removeLinkedListItem(this, pt, "_pt");
        } else if (!pt.dep) {
          hasNonDependentRemaining = 1;
        }
        pt = next;
      }
      return !hasNonDependentRemaining;
    },
    _setterWithModifier = function _setterWithModifier(target, property, value, data) {
      data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
    },
    _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
      var pt = parent._pt,
        next,
        pt2,
        first,
        last;
      while (pt) {
        next = pt._next;
        pt2 = first;
        while (pt2 && pt2.pr > pt.pr) {
          pt2 = pt2._next;
        }
        if (pt._prev = pt2 ? pt2._prev : last) {
          pt._prev._next = pt;
        } else {
          first = pt;
        }
        if (pt._next = pt2) {
          pt2._prev = pt;
        } else {
          last = pt;
        }
        pt = next;
      }
      parent._pt = first;
    };
  var PropTween = function () {
    function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
      this.t = target;
      this.s = start;
      this.c = change;
      this.p = prop;
      this.r = renderer || _renderPlain;
      this.d = data || this;
      this.set = setter || _setterPlain;
      this.pr = priority || 0;
      this._next = next;
      if (next) {
        next._prev = this;
      }
    }
    var _proto4 = PropTween.prototype;
    _proto4.modifier = function modifier(func, tween, target) {
      this.mSet = this.mSet || this.set;
      this.set = _setterWithModifier;
      this.m = func;
      this.mt = target;
      this.tween = tween;
    };
    return PropTween;
  }();
  _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
    return _reservedProps[name] = 1;
  });
  _globals.TweenMax = _globals.TweenLite = Tween;
  _globals.TimelineLite = _globals.TimelineMax = Timeline;
  _globalTimeline = new Timeline({
    sortChildren: false,
    defaults: _defaults,
    autoRemoveChildren: true,
    id: "root",
    smoothChildTiming: true
  });
  _config.stringFilter = _colorStringFilter;
  var _media = [],
    _listeners = {},
    _emptyArray = [],
    _lastMediaTime = 0,
    _dispatch = function _dispatch(type) {
      return (_listeners[type] || _emptyArray).map(function (f) {
        return f();
      });
    },
    _onMediaChange = function _onMediaChange() {
      var time = Date.now(),
        matches = [];
      if (time - _lastMediaTime > 2) {
        _dispatch("matchMediaInit");
        _media.forEach(function (c) {
          var queries = c.queries,
            conditions = c.conditions,
            match,
            p,
            anyMatch,
            toggled;
          for (p in queries) {
            match = _win.matchMedia(queries[p]).matches;
            match && (anyMatch = 1);
            if (match !== conditions[p]) {
              conditions[p] = match;
              toggled = 1;
            }
          }
          if (toggled) {
            c.revert();
            anyMatch && matches.push(c);
          }
        });
        _dispatch("matchMediaRevert");
        matches.forEach(function (c) {
          return c.onMatch(c);
        });
        _lastMediaTime = time;
        _dispatch("matchMedia");
      }
    };
  var Context = function () {
    function Context(func, scope) {
      this.selector = scope && selector(scope);
      this.data = [];
      this._r = [];
      this.isReverted = false;
      func && this.add(func);
    }
    var _proto5 = Context.prototype;
    _proto5.add = function add(name, func, scope) {
      if (_isFunction(name)) {
        scope = func;
        func = name;
        name = _isFunction;
      }
      var self = this,
        f = function f() {
          var prev = _context,
            prevSelector = self.selector,
            result;
          prev && prev !== self && prev.data.push(self);
          scope && (self.selector = selector(scope));
          _context = self;
          result = func.apply(self, arguments);
          _isFunction(result) && self._r.push(result);
          _context = prev;
          self.selector = prevSelector;
          self.isReverted = false;
          return result;
        };
      self.last = f;
      return name === _isFunction ? f(self) : name ? self[name] = f : f;
    };
    _proto5.ignore = function ignore(func) {
      var prev = _context;
      _context = null;
      func(this);
      _context = prev;
    };
    _proto5.getTweens = function getTweens() {
      var a = [];
      this.data.forEach(function (e) {
        return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
      });
      return a;
    };
    _proto5.clear = function clear() {
      this._r.length = this.data.length = 0;
    };
    _proto5.kill = function kill(revert, matchMedia) {
      var _this4 = this;
      if (revert) {
        var tweens = this.getTweens();
        this.data.forEach(function (t) {
          if (t.data === "isFlip") {
            t.revert();
            t.getChildren(true, true, false).forEach(function (tween) {
              return tweens.splice(tweens.indexOf(tween), 1);
            });
          }
        });
        tweens.map(function (t) {
          return {
            g: t.globalTime(0),
            t: t
          };
        }).sort(function (a, b) {
          return b.g - a.g || -1;
        }).forEach(function (o) {
          return o.t.revert(revert);
        });
        this.data.forEach(function (e) {
          return !(e instanceof Animation) && e.revert && e.revert(revert);
        });
        this._r.forEach(function (f) {
          return f(revert, _this4);
        });
        this.isReverted = true;
      } else {
        this.data.forEach(function (e) {
          return e.kill && e.kill();
        });
      }
      this.clear();
      if (matchMedia) {
        var i = _media.indexOf(this);
        !!~i && _media.splice(i, 1);
      }
    };
    _proto5.revert = function revert(config) {
      this.kill(config || {});
    };
    return Context;
  }();
  var MatchMedia = function () {
    function MatchMedia(scope) {
      this.contexts = [];
      this.scope = scope;
    }
    var _proto6 = MatchMedia.prototype;
    _proto6.add = function add(conditions, func, scope) {
      _isObject(conditions) || (conditions = {
        matches: conditions
      });
      var context = new Context(0, scope || this.scope),
        cond = context.conditions = {},
        mq,
        p,
        active;
      this.contexts.push(context);
      func = context.add("onMatch", func);
      context.queries = conditions;
      for (p in conditions) {
        if (p === "all") {
          active = 1;
        } else {
          mq = _win.matchMedia(conditions[p]);
          if (mq) {
            _media.indexOf(context) < 0 && _media.push(context);
            (cond[p] = mq.matches) && (active = 1);
            mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
          }
        }
      }
      active && func(context);
      return this;
    };
    _proto6.revert = function revert(config) {
      this.kill(config || {});
    };
    _proto6.kill = function kill(revert) {
      this.contexts.forEach(function (c) {
        return c.kill(revert, true);
      });
    };
    return MatchMedia;
  }();
  var _gsap = {
    registerPlugin: function registerPlugin() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      args.forEach(function (config) {
        return _createPlugin(config);
      });
    },
    timeline: function timeline(vars) {
      return new Timeline(vars);
    },
    getTweensOf: function getTweensOf(targets, onlyActive) {
      return _globalTimeline.getTweensOf(targets, onlyActive);
    },
    getProperty: function getProperty(target, property, unit, uncache) {
      _isString(target) && (target = toArray(target)[0]);
      var getter = _getCache(target || {}).get,
        format = unit ? _passThrough : _numericIfPossible;
      unit === "native" && (unit = "");
      return !target ? target : !property ? function (property, unit, uncache) {
        return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
      } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
    },
    quickSetter: function quickSetter(target, property, unit) {
      target = toArray(target);
      if (target.length > 1) {
        var setters = target.map(function (t) {
            return gsap.quickSetter(t, property, unit);
          }),
          l = setters.length;
        return function (value) {
          var i = l;
          while (i--) {
            setters[i](value);
          }
        };
      }
      target = target[0] || {};
      var Plugin = _plugins[property],
        cache = _getCache(target),
        p = cache.harness && (cache.harness.aliases || {})[property] || property,
        setter = Plugin ? function (value) {
          var p = new Plugin();
          _quickTween._pt = 0;
          p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
          p.render(1, p);
          _quickTween._pt && _renderPropTweens(1, _quickTween);
        } : cache.set(target, p);
      return Plugin ? setter : function (value) {
        return setter(target, p, unit ? value + unit : value, cache, 1);
      };
    },
    quickTo: function quickTo(target, property, vars) {
      var _merge2;
      var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, _merge2), vars || {})),
        func = function func(value, start, startIsRelative) {
          return tween.resetTo(property, value, start, startIsRelative);
        };
      func.tween = tween;
      return func;
    },
    isTweening: function isTweening(targets) {
      return _globalTimeline.getTweensOf(targets, true).length > 0;
    },
    defaults: function defaults(value) {
      value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
      return _mergeDeep(_defaults, value || {});
    },
    config: function config(value) {
      return _mergeDeep(_config, value || {});
    },
    registerEffect: function registerEffect(_ref3) {
      var name = _ref3.name,
        effect = _ref3.effect,
        plugins = _ref3.plugins,
        defaults = _ref3.defaults,
        extendTimeline = _ref3.extendTimeline;
      (plugins || "").split(",").forEach(function (pluginName) {
        return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
      });
      _effects[name] = function (targets, vars, tl) {
        return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
      };
      if (extendTimeline) {
        Timeline.prototype[name] = function (targets, vars, position) {
          return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
        };
      }
    },
    registerEase: function registerEase(name, ease) {
      _easeMap[name] = _parseEase(ease);
    },
    parseEase: function parseEase(ease, defaultEase) {
      return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
    },
    getById: function getById(id) {
      return _globalTimeline.getById(id);
    },
    exportRoot: function exportRoot(vars, includeDelayedCalls) {
      if (vars === void 0) {
        vars = {};
      }
      var tl = new Timeline(vars),
        child,
        next;
      tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
      _globalTimeline.remove(tl);
      tl._dp = 0;
      tl._time = tl._tTime = _globalTimeline._time;
      child = _globalTimeline._first;
      while (child) {
        next = child._next;
        if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
          _addToTimeline(tl, child, child._start - child._delay);
        }
        child = next;
      }
      _addToTimeline(_globalTimeline, tl, 0);
      return tl;
    },
    context: function context(func, scope) {
      return func ? new Context(func, scope) : _context;
    },
    matchMedia: function matchMedia(scope) {
      return new MatchMedia(scope);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return _media.forEach(function (c) {
        var cond = c.conditions,
          found,
          p;
        for (p in cond) {
          if (cond[p]) {
            cond[p] = false;
            found = 1;
          }
        }
        found && c.revert();
      }) || _onMediaChange();
    },
    addEventListener: function addEventListener(type, callback) {
      var a = _listeners[type] || (_listeners[type] = []);
      ~a.indexOf(callback) || a.push(callback);
    },
    removeEventListener: function removeEventListener(type, callback) {
      var a = _listeners[type],
        i = a && a.indexOf(callback);
      i >= 0 && a.splice(i, 1);
    },
    utils: {
      wrap: wrap,
      wrapYoyo: wrapYoyo,
      distribute: distribute,
      random: random,
      snap: snap,
      normalize: normalize,
      getUnit: getUnit,
      clamp: clamp,
      splitColor: splitColor,
      toArray: toArray,
      selector: selector,
      mapRange: mapRange,
      pipe: pipe,
      unitize: unitize,
      interpolate: interpolate,
      shuffle: shuffle
    },
    install: _install,
    effects: _effects,
    ticker: _ticker,
    updateRoot: Timeline.updateRoot,
    plugins: _plugins,
    globalTimeline: _globalTimeline,
    core: {
      PropTween: PropTween,
      globals: _addGlobal,
      Tween: Tween,
      Timeline: Timeline,
      Animation: Animation,
      getCache: _getCache,
      _removeLinkedListItem: _removeLinkedListItem,
      reverting: function reverting() {
        return _reverting;
      },
      context: function context(toAdd) {
        if (toAdd && _context) {
          _context.data.push(toAdd);
          toAdd._ctx = _context;
        }
        return _context;
      },
      suppressOverwrites: function suppressOverwrites(value) {
        return _suppressOverwrites = value;
      }
    }
  };
  _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
    return _gsap[name] = Tween[name];
  });
  _ticker.add(Timeline.updateRoot);
  _quickTween = _gsap.to({}, {
    duration: 0
  });
  var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
      var pt = plugin._pt;
      while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
        pt = pt._next;
      }
      return pt;
    },
    _addModifiers = function _addModifiers(tween, modifiers) {
      var targets = tween._targets,
        p,
        i,
        pt;
      for (p in modifiers) {
        i = targets.length;
        while (i--) {
          pt = tween._ptLookup[i][p];
          if (pt && (pt = pt.d)) {
            if (pt._pt) {
              pt = _getPluginPropTween(pt, p);
            }
            pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
          }
        }
      }
    },
    _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
      return {
        name: name,
        rawVars: 1,
        init: function init(target, vars, tween) {
          tween._onInit = function (tween) {
            var temp, p;
            if (_isString(vars)) {
              temp = {};
              _forEachName(vars, function (name) {
                return temp[name] = 1;
              });
              vars = temp;
            }
            if (modifier) {
              temp = {};
              for (p in vars) {
                temp[p] = modifier(vars[p]);
              }
              vars = temp;
            }
            _addModifiers(tween, vars);
          };
        }
      };
    };
  var gsap = _gsap.registerPlugin({
    name: "attr",
    init: function init(target, vars, tween, index, targets) {
      var p, pt, v;
      this.tween = tween;
      for (p in vars) {
        v = target.getAttribute(p) || "";
        pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
        pt.op = p;
        pt.b = v;
        this._props.push(p);
      }
    },
    render: function render(ratio, data) {
      var pt = data._pt;
      while (pt) {
        _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
        pt = pt._next;
      }
    }
  }, {
    name: "endArray",
    init: function init(target, value) {
      var i = value.length;
      while (i--) {
        this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
      }
    }
  }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
  Tween.version = Timeline.version = gsap.version = "3.11.5";
  _coreReady = 1;
  _windowExists() && _wake();
  var Power0 = _easeMap.Power0,
    Power1 = _easeMap.Power1,
    Power2 = _easeMap.Power2,
    Power3 = _easeMap.Power3,
    Power4 = _easeMap.Power4,
    Linear = _easeMap.Linear,
    Quad = _easeMap.Quad,
    Cubic = _easeMap.Cubic,
    Quart = _easeMap.Quart,
    Quint = _easeMap.Quint,
    Strong = _easeMap.Strong,
    Elastic = _easeMap.Elastic,
    Back = _easeMap.Back,
    SteppedEase = _easeMap.SteppedEase,
    Bounce = _easeMap.Bounce,
    Sine = _easeMap.Sine,
    Expo = _easeMap.Expo,
    Circ = _easeMap.Circ;
  var _win$1,
    _doc$1,
    _docElement,
    _pluginInitted,
    _tempDiv,
    _tempDivStyler,
    _recentSetterPlugin,
    _reverting$1,
    _windowExists$1 = function _windowExists() {
      return typeof window !== "undefined";
    },
    _transformProps = {},
    _RAD2DEG = 180 / Math.PI,
    _DEG2RAD = Math.PI / 180,
    _atan2 = Math.atan2,
    _bigNum$1 = 1e8,
    _capsExp = /([A-Z])/g,
    _horizontalExp = /(left|right|width|margin|padding|x)/i,
    _complexExp = /[\s,\(]\S/,
    _propertyAliases = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity"
    },
    _renderCSSProp = function _renderCSSProp(ratio, data) {
      return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
    },
    _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
      return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
    },
    _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
      return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
    },
    _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
      var value = data.s + data.c * ratio;
      data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
    },
    _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
      return data.set(data.t, data.p, ratio ? data.e : data.b, data);
    },
    _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
      return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
    },
    _setterCSSStyle = function _setterCSSStyle(target, property, value) {
      return target.style[property] = value;
    },
    _setterCSSProp = function _setterCSSProp(target, property, value) {
      return target.style.setProperty(property, value);
    },
    _setterTransform = function _setterTransform(target, property, value) {
      return target._gsap[property] = value;
    },
    _setterScale = function _setterScale(target, property, value) {
      return target._gsap.scaleX = target._gsap.scaleY = value;
    },
    _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
      var cache = target._gsap;
      cache.scaleX = cache.scaleY = value;
      cache.renderTransform(ratio, cache);
    },
    _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
      var cache = target._gsap;
      cache[property] = value;
      cache.renderTransform(ratio, cache);
    },
    _transformProp = "transform",
    _transformOriginProp = _transformProp + "Origin",
    _saveStyle = function _saveStyle(property, isNotCSS) {
      var _this = this;
      var target = this.target,
        style = target.style;
      if (property in _transformProps) {
        this.tfm = this.tfm || {};
        if (property !== "transform") {
          property = _propertyAliases[property] || property;
          ~property.indexOf(",") ? property.split(",").forEach(function (a) {
            return _this.tfm[a] = _get(target, a);
          }) : this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property);
        } else {
          return _propertyAliases.transform.split(",").forEach(function (p) {
            return _saveStyle.call(_this, p, isNotCSS);
          });
        }
        if (this.props.indexOf(_transformProp) >= 0) {
          return;
        }
        if (target._gsap.svg) {
          this.svgo = target.getAttribute("data-svg-origin");
          this.props.push(_transformOriginProp, isNotCSS, "");
        }
        property = _transformProp;
      }
      (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
    },
    _removeIndependentTransforms = function _removeIndependentTransforms(style) {
      if (style.translate) {
        style.removeProperty("translate");
        style.removeProperty("scale");
        style.removeProperty("rotate");
      }
    },
    _revertStyle = function _revertStyle() {
      var props = this.props,
        target = this.target,
        style = target.style,
        cache = target._gsap,
        i,
        p;
      for (i = 0; i < props.length; i += 3) {
        props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
      }
      if (this.tfm) {
        for (p in this.tfm) {
          cache[p] = this.tfm[p];
        }
        if (cache.svg) {
          cache.renderTransform();
          target.setAttribute("data-svg-origin", this.svgo || "");
        }
        i = _reverting$1();
        if ((!i || !i.isStart) && !style[_transformProp]) {
          _removeIndependentTransforms(style);
          cache.uncache = 1;
        }
      }
    },
    _getStyleSaver = function _getStyleSaver(target, properties) {
      var saver = {
        target: target,
        props: [],
        revert: _revertStyle,
        save: _saveStyle
      };
      target._gsap || gsap.core.getCache(target);
      properties && properties.split(",").forEach(function (p) {
        return saver.save(p);
      });
      return saver;
    },
    _supports3D,
    _createElement = function _createElement(type, ns) {
      var e = _doc$1.createElementNS ? _doc$1.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$1.createElement(type);
      return e.style ? e : _doc$1.createElement(type);
    },
    _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
      var cs = getComputedStyle(target);
      return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || "";
    },
    _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
    _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
      var e = element || _tempDiv,
        s = e.style,
        i = 5;
      if (property in s && !preferPrefix) {
        return property;
      }
      property = property.charAt(0).toUpperCase() + property.substr(1);
      while (i-- && !(_prefixes[i] + property in s)) {}
      return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
    },
    _initCore = function _initCore() {
      if (_windowExists$1() && window.document) {
        _win$1 = window;
        _doc$1 = _win$1.document;
        _docElement = _doc$1.documentElement;
        _tempDiv = _createElement("div") || {
          style: {}
        };
        _tempDivStyler = _createElement("div");
        _transformProp = _checkPropPrefix(_transformProp);
        _transformOriginProp = _transformProp + "Origin";
        _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
        _supports3D = !!_checkPropPrefix("perspective");
        _reverting$1 = gsap.core.reverting;
        _pluginInitted = 1;
      }
    },
    _getBBoxHack = function _getBBoxHack(swapIfPossible) {
      var svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
        oldParent = this.parentNode,
        oldSibling = this.nextSibling,
        oldCSS = this.style.cssText,
        bbox;
      _docElement.appendChild(svg);
      svg.appendChild(this);
      this.style.display = "block";
      if (swapIfPossible) {
        try {
          bbox = this.getBBox();
          this._gsapBBox = this.getBBox;
          this.getBBox = _getBBoxHack;
        } catch (e) {}
      } else if (this._gsapBBox) {
        bbox = this._gsapBBox();
      }
      if (oldParent) {
        if (oldSibling) {
          oldParent.insertBefore(this, oldSibling);
        } else {
          oldParent.appendChild(this);
        }
      }
      _docElement.removeChild(svg);
      this.style.cssText = oldCSS;
      return bbox;
    },
    _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
      var i = attributesArray.length;
      while (i--) {
        if (target.hasAttribute(attributesArray[i])) {
          return target.getAttribute(attributesArray[i]);
        }
      }
    },
    _getBBox = function _getBBox(target) {
      var bounds;
      try {
        bounds = target.getBBox();
      } catch (error) {
        bounds = _getBBoxHack.call(target, true);
      }
      bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
      return bounds && !bounds.width && !bounds.x && !bounds.y ? {
        x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
        y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
        width: 0,
        height: 0
      } : bounds;
    },
    _isSVG = function _isSVG(e) {
      return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
    },
    _removeProperty = function _removeProperty(target, property) {
      if (property) {
        var style = target.style;
        if (property in _transformProps && property !== _transformOriginProp) {
          property = _transformProp;
        }
        if (style.removeProperty) {
          if (property.substr(0, 2) === "ms" || property.substr(0, 6) === "webkit") {
            property = "-" + property;
          }
          style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
        } else {
          style.removeAttribute(property);
        }
      }
    },
    _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
      var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
      plugin._pt = pt;
      pt.b = beginning;
      pt.e = end;
      plugin._props.push(property);
      return pt;
    },
    _nonConvertibleUnits = {
      deg: 1,
      rad: 1,
      turn: 1
    },
    _nonStandardLayouts = {
      grid: 1,
      flex: 1
    },
    _convertToUnit = function _convertToUnit(target, property, value, unit) {
      var curValue = parseFloat(value) || 0,
        curUnit = (value + "").trim().substr((curValue + "").length) || "px",
        style = _tempDiv.style,
        horizontal = _horizontalExp.test(property),
        isRootSVG = target.tagName.toLowerCase() === "svg",
        measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
        amount = 100,
        toPixels = unit === "px",
        toPercent = unit === "%",
        px,
        parent,
        cache,
        isSVG;
      if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
        return curValue;
      }
      curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
      isSVG = target.getCTM && _isSVG(target);
      if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
        px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
        return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
      }
      style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
      parent = ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
      if (isSVG) {
        parent = (target.ownerSVGElement || {}).parentNode;
      }
      if (!parent || parent === _doc$1 || !parent.appendChild) {
        parent = _doc$1.body;
      }
      cache = parent._gsap;
      if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
        return _round(curValue / cache.width * amount);
      } else {
        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
        parent === target && (style.position = "static");
        parent.appendChild(_tempDiv);
        px = _tempDiv[measureProperty];
        parent.removeChild(_tempDiv);
        style.position = "absolute";
        if (horizontal && toPercent) {
          cache = _getCache(parent);
          cache.time = _ticker.time;
          cache.width = parent[measureProperty];
        }
      }
      return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
    },
    _get = function _get(target, property, unit, uncache) {
      var value;
      _pluginInitted || _initCore();
      if (property in _propertyAliases && property !== "transform") {
        property = _propertyAliases[property];
        if (~property.indexOf(",")) {
          property = property.split(",")[0];
        }
      }
      if (_transformProps[property] && property !== "transform") {
        value = _parseTransform(target, uncache);
        value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
      } else {
        value = target.style[property];
        if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
          value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
        }
      }
      return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
    },
    _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
      if (!start || start === "none") {
        var p = _checkPropPrefix(prop, target, 1),
          s = p && _getComputedProperty(target, p, 1);
        if (s && s !== start) {
          prop = p;
          start = s;
        } else if (prop === "borderColor") {
          start = _getComputedProperty(target, "borderTopColor");
        }
      }
      var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
        index = 0,
        matchIndex = 0,
        a,
        result,
        startValues,
        startNum,
        color,
        startValue,
        endValue,
        endNum,
        chunk,
        endUnit,
        startUnit,
        endValues;
      pt.b = start;
      pt.e = end;
      start += "";
      end += "";
      if (end === "auto") {
        target.style[prop] = end;
        end = _getComputedProperty(target, prop) || end;
        target.style[prop] = start;
      }
      a = [start, end];
      _colorStringFilter(a);
      start = a[0];
      end = a[1];
      startValues = start.match(_numWithUnitExp) || [];
      endValues = end.match(_numWithUnitExp) || [];
      if (endValues.length) {
        while (result = _numWithUnitExp.exec(end)) {
          endValue = result[0];
          chunk = end.substring(index, result.index);
          if (color) {
            color = (color + 1) % 5;
          } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
            color = 1;
          }
          if (endValue !== (startValue = startValues[matchIndex++] || "")) {
            startNum = parseFloat(startValue) || 0;
            startUnit = startValue.substr((startNum + "").length);
            endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
            endNum = parseFloat(endValue);
            endUnit = endValue.substr((endNum + "").length);
            index = _numWithUnitExp.lastIndex - endUnit.length;
            if (!endUnit) {
              endUnit = endUnit || _config.units[prop] || startUnit;
              if (index === end.length) {
                end += endUnit;
                pt.e += endUnit;
              }
            }
            if (startUnit !== endUnit) {
              startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
            }
            pt._pt = {
              _next: pt._pt,
              p: chunk || matchIndex === 1 ? chunk : ",",
              s: startNum,
              c: endNum - startNum,
              m: color && color < 4 || prop === "zIndex" ? Math.round : 0
            };
          }
        }
        pt.c = index < end.length ? end.substring(index, end.length) : "";
      } else {
        pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
      }
      _relExp.test(end) && (pt.e = 0);
      this._pt = pt;
      return pt;
    },
    _keywordToPercent = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%"
    },
    _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
      var split = value.split(" "),
        x = split[0],
        y = split[1] || "50%";
      if (x === "top" || x === "bottom" || y === "left" || y === "right") {
        value = x;
        x = y;
        y = value;
      }
      split[0] = _keywordToPercent[x] || x;
      split[1] = _keywordToPercent[y] || y;
      return split.join(" ");
    },
    _renderClearProps = function _renderClearProps(ratio, data) {
      if (data.tween && data.tween._time === data.tween._dur) {
        var target = data.t,
          style = target.style,
          props = data.u,
          cache = target._gsap,
          prop,
          clearTransforms,
          i;
        if (props === "all" || props === true) {
          style.cssText = "";
          clearTransforms = 1;
        } else {
          props = props.split(",");
          i = props.length;
          while (--i > -1) {
            prop = props[i];
            if (_transformProps[prop]) {
              clearTransforms = 1;
              prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
            }
            _removeProperty(target, prop);
          }
        }
        if (clearTransforms) {
          _removeProperty(target, _transformProp);
          if (cache) {
            cache.svg && target.removeAttribute("transform");
            _parseTransform(target, 1);
            cache.uncache = 1;
            _removeIndependentTransforms(style);
          }
        }
      }
    },
    _specialProps = {
      clearProps: function clearProps(plugin, target, property, endValue, tween) {
        if (tween.data !== "isFromStart") {
          var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
          pt.u = endValue;
          pt.pr = -10;
          pt.tween = tween;
          plugin._props.push(property);
          return 1;
        }
      }
    },
    _identity2DMatrix = [1, 0, 0, 1, 0, 0],
    _rotationalProperties = {},
    _isNullTransform = function _isNullTransform(value) {
      return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
    },
    _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
      var matrixString = _getComputedProperty(target, _transformProp);
      return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
    },
    _getMatrix = function _getMatrix(target, force2D) {
      var cache = target._gsap || _getCache(target),
        style = target.style,
        matrix = _getComputedTransformMatrixAsArray(target),
        parent,
        nextSibling,
        temp,
        addedToDOM;
      if (cache.svg && target.getAttribute("transform")) {
        temp = target.transform.baseVal.consolidate().matrix;
        matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
        return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
      } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
        temp = style.display;
        style.display = "block";
        parent = target.parentNode;
        if (!parent || !target.offsetParent) {
          addedToDOM = 1;
          nextSibling = target.nextElementSibling;
          _docElement.appendChild(target);
        }
        matrix = _getComputedTransformMatrixAsArray(target);
        temp ? style.display = temp : _removeProperty(target, "display");
        if (addedToDOM) {
          nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
        }
      }
      return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
    },
    _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
      var cache = target._gsap,
        matrix = matrixArray || _getMatrix(target, true),
        xOriginOld = cache.xOrigin || 0,
        yOriginOld = cache.yOrigin || 0,
        xOffsetOld = cache.xOffset || 0,
        yOffsetOld = cache.yOffset || 0,
        a = matrix[0],
        b = matrix[1],
        c = matrix[2],
        d = matrix[3],
        tx = matrix[4],
        ty = matrix[5],
        originSplit = origin.split(" "),
        xOrigin = parseFloat(originSplit[0]) || 0,
        yOrigin = parseFloat(originSplit[1]) || 0,
        bounds,
        determinant,
        x,
        y;
      if (!originIsAbsolute) {
        bounds = _getBBox(target);
        xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
        yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
      } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
        x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
        y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
        xOrigin = x;
        yOrigin = y;
      }
      if (smooth || smooth !== false && cache.smooth) {
        tx = xOrigin - xOriginOld;
        ty = yOrigin - yOriginOld;
        cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
        cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
      } else {
        cache.xOffset = cache.yOffset = 0;
      }
      cache.xOrigin = xOrigin;
      cache.yOrigin = yOrigin;
      cache.smooth = !!smooth;
      cache.origin = origin;
      cache.originIsAbsolute = !!originIsAbsolute;
      target.style[_transformOriginProp] = "0px 0px";
      if (pluginToAddPropTweensTo) {
        _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
        _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
        _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
        _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
      }
      target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
    },
    _parseTransform = function _parseTransform(target, uncache) {
      var cache = target._gsap || new GSCache(target);
      if ("x" in cache && !uncache && !cache.uncache) {
        return cache;
      }
      var style = target.style,
        invertedScaleX = cache.scaleX < 0,
        px = "px",
        deg = "deg",
        cs = getComputedStyle(target),
        origin = _getComputedProperty(target, _transformOriginProp) || "0",
        x,
        y,
        z,
        scaleX,
        scaleY,
        rotation,
        rotationX,
        rotationY,
        skewX,
        skewY,
        perspective,
        xOrigin,
        yOrigin,
        matrix,
        angle,
        cos,
        sin,
        a,
        b,
        c,
        d,
        a12,
        a22,
        t1,
        t2,
        t3,
        a13,
        a23,
        a33,
        a42,
        a43,
        a32;
      x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
      scaleX = scaleY = 1;
      cache.svg = !!(target.getCTM && _isSVG(target));
      if (cs.translate) {
        if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
          style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
        }
        style.scale = style.rotate = style.translate = "none";
      }
      matrix = _getMatrix(target, cache.svg);
      if (cache.svg) {
        if (cache.uncache) {
          t2 = target.getBBox();
          origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
          t1 = "";
        } else {
          t1 = !uncache && target.getAttribute("data-svg-origin");
        }
        _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
      }
      xOrigin = cache.xOrigin || 0;
      yOrigin = cache.yOrigin || 0;
      if (matrix !== _identity2DMatrix) {
        a = matrix[0];
        b = matrix[1];
        c = matrix[2];
        d = matrix[3];
        x = a12 = matrix[4];
        y = a22 = matrix[5];
        if (matrix.length === 6) {
          scaleX = Math.sqrt(a * a + b * b);
          scaleY = Math.sqrt(d * d + c * c);
          rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
          skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
          skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
          if (cache.svg) {
            x -= xOrigin - (xOrigin * a + yOrigin * c);
            y -= yOrigin - (xOrigin * b + yOrigin * d);
          }
        } else {
          a32 = matrix[6];
          a42 = matrix[7];
          a13 = matrix[8];
          a23 = matrix[9];
          a33 = matrix[10];
          a43 = matrix[11];
          x = matrix[12];
          y = matrix[13];
          z = matrix[14];
          angle = _atan2(a32, a33);
          rotationX = angle * _RAD2DEG;
          if (angle) {
            cos = Math.cos(-angle);
            sin = Math.sin(-angle);
            t1 = a12 * cos + a13 * sin;
            t2 = a22 * cos + a23 * sin;
            t3 = a32 * cos + a33 * sin;
            a13 = a12 * -sin + a13 * cos;
            a23 = a22 * -sin + a23 * cos;
            a33 = a32 * -sin + a33 * cos;
            a43 = a42 * -sin + a43 * cos;
            a12 = t1;
            a22 = t2;
            a32 = t3;
          }
          angle = _atan2(-c, a33);
          rotationY = angle * _RAD2DEG;
          if (angle) {
            cos = Math.cos(-angle);
            sin = Math.sin(-angle);
            t1 = a * cos - a13 * sin;
            t2 = b * cos - a23 * sin;
            t3 = c * cos - a33 * sin;
            a43 = d * sin + a43 * cos;
            a = t1;
            b = t2;
            c = t3;
          }
          angle = _atan2(b, a);
          rotation = angle * _RAD2DEG;
          if (angle) {
            cos = Math.cos(angle);
            sin = Math.sin(angle);
            t1 = a * cos + b * sin;
            t2 = a12 * cos + a22 * sin;
            b = b * cos - a * sin;
            a22 = a22 * cos - a12 * sin;
            a = t1;
            a12 = t2;
          }
          if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
            rotationX = rotation = 0;
            rotationY = 180 - rotationY;
          }
          scaleX = _round(Math.sqrt(a * a + b * b + c * c));
          scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
          angle = _atan2(a12, a22);
          skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
          perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
        }
        if (cache.svg) {
          t1 = target.getAttribute("transform");
          cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
          t1 && target.setAttribute("transform", t1);
        }
      }
      if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
        if (invertedScaleX) {
          scaleX *= -1;
          skewX += rotation <= 0 ? 180 : -180;
          rotation += rotation <= 0 ? 180 : -180;
        } else {
          scaleY *= -1;
          skewX += skewX <= 0 ? 180 : -180;
        }
      }
      uncache = uncache || cache.uncache;
      cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
      cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
      cache.z = z + px;
      cache.scaleX = _round(scaleX);
      cache.scaleY = _round(scaleY);
      cache.rotation = _round(rotation) + deg;
      cache.rotationX = _round(rotationX) + deg;
      cache.rotationY = _round(rotationY) + deg;
      cache.skewX = skewX + deg;
      cache.skewY = skewY + deg;
      cache.transformPerspective = perspective + px;
      if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) {
        style[_transformOriginProp] = _firstTwoOnly(origin);
      }
      cache.xOffset = cache.yOffset = 0;
      cache.force3D = _config.force3D;
      cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
      cache.uncache = 0;
      return cache;
    },
    _firstTwoOnly = function _firstTwoOnly(value) {
      return (value = value.split(" "))[0] + " " + value[1];
    },
    _addPxTranslate = function _addPxTranslate(target, start, value) {
      var unit = getUnit(start);
      return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
    },
    _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
      cache.z = "0px";
      cache.rotationY = cache.rotationX = "0deg";
      cache.force3D = 0;
      _renderCSSTransforms(ratio, cache);
    },
    _zeroDeg = "0deg",
    _zeroPx = "0px",
    _endParenthesis = ") ",
    _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
      var _ref = cache || this,
        xPercent = _ref.xPercent,
        yPercent = _ref.yPercent,
        x = _ref.x,
        y = _ref.y,
        z = _ref.z,
        rotation = _ref.rotation,
        rotationY = _ref.rotationY,
        rotationX = _ref.rotationX,
        skewX = _ref.skewX,
        skewY = _ref.skewY,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        transformPerspective = _ref.transformPerspective,
        force3D = _ref.force3D,
        target = _ref.target,
        zOrigin = _ref.zOrigin,
        transforms = "",
        use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
      if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
        var angle = parseFloat(rotationY) * _DEG2RAD,
          a13 = Math.sin(angle),
          a33 = Math.cos(angle),
          cos;
        angle = parseFloat(rotationX) * _DEG2RAD;
        cos = Math.cos(angle);
        x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
        y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
        z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
      }
      if (transformPerspective !== _zeroPx) {
        transforms += "perspective(" + transformPerspective + _endParenthesis;
      }
      if (xPercent || yPercent) {
        transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
      }
      if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
        transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
      }
      if (rotation !== _zeroDeg) {
        transforms += "rotate(" + rotation + _endParenthesis;
      }
      if (rotationY !== _zeroDeg) {
        transforms += "rotateY(" + rotationY + _endParenthesis;
      }
      if (rotationX !== _zeroDeg) {
        transforms += "rotateX(" + rotationX + _endParenthesis;
      }
      if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
        transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
      }
      if (scaleX !== 1 || scaleY !== 1) {
        transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
      }
      target.style[_transformProp] = transforms || "translate(0, 0)";
    },
    _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
      var _ref2 = cache || this,
        xPercent = _ref2.xPercent,
        yPercent = _ref2.yPercent,
        x = _ref2.x,
        y = _ref2.y,
        rotation = _ref2.rotation,
        skewX = _ref2.skewX,
        skewY = _ref2.skewY,
        scaleX = _ref2.scaleX,
        scaleY = _ref2.scaleY,
        target = _ref2.target,
        xOrigin = _ref2.xOrigin,
        yOrigin = _ref2.yOrigin,
        xOffset = _ref2.xOffset,
        yOffset = _ref2.yOffset,
        forceCSS = _ref2.forceCSS,
        tx = parseFloat(x),
        ty = parseFloat(y),
        a11,
        a21,
        a12,
        a22,
        temp;
      rotation = parseFloat(rotation);
      skewX = parseFloat(skewX);
      skewY = parseFloat(skewY);
      if (skewY) {
        skewY = parseFloat(skewY);
        skewX += skewY;
        rotation += skewY;
      }
      if (rotation || skewX) {
        rotation *= _DEG2RAD;
        skewX *= _DEG2RAD;
        a11 = Math.cos(rotation) * scaleX;
        a21 = Math.sin(rotation) * scaleX;
        a12 = Math.sin(rotation - skewX) * -scaleY;
        a22 = Math.cos(rotation - skewX) * scaleY;
        if (skewX) {
          skewY *= _DEG2RAD;
          temp = Math.tan(skewX - skewY);
          temp = Math.sqrt(1 + temp * temp);
          a12 *= temp;
          a22 *= temp;
          if (skewY) {
            temp = Math.tan(skewY);
            temp = Math.sqrt(1 + temp * temp);
            a11 *= temp;
            a21 *= temp;
          }
        }
        a11 = _round(a11);
        a21 = _round(a21);
        a12 = _round(a12);
        a22 = _round(a22);
      } else {
        a11 = scaleX;
        a22 = scaleY;
        a21 = a12 = 0;
      }
      if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
        tx = _convertToUnit(target, "x", x, "px");
        ty = _convertToUnit(target, "y", y, "px");
      }
      if (xOrigin || yOrigin || xOffset || yOffset) {
        tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
        ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
      }
      if (xPercent || yPercent) {
        temp = target.getBBox();
        tx = _round(tx + xPercent / 100 * temp.width);
        ty = _round(ty + yPercent / 100 * temp.height);
      }
      temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
      target.setAttribute("transform", temp);
      forceCSS && (target.style[_transformProp] = temp);
    },
    _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
      var cap = 360,
        isString = _isString(endValue),
        endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
        change = endNum - startNum,
        finalValue = startNum + change + "deg",
        direction,
        pt;
      if (isString) {
        direction = endValue.split("_")[1];
        if (direction === "short") {
          change %= cap;
          if (change !== change % (cap / 2)) {
            change += change < 0 ? cap : -cap;
          }
        }
        if (direction === "cw" && change < 0) {
          change = (change + cap * _bigNum$1) % cap - ~~(change / cap) * cap;
        } else if (direction === "ccw" && change > 0) {
          change = (change - cap * _bigNum$1) % cap - ~~(change / cap) * cap;
        }
      }
      plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
      pt.e = finalValue;
      pt.u = "deg";
      plugin._props.push(property);
      return pt;
    },
    _assign = function _assign(target, source) {
      for (var p in source) {
        target[p] = source[p];
      }
      return target;
    },
    _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
      var startCache = _assign({}, target._gsap),
        exclude = "perspective,force3D,transformOrigin,svgOrigin",
        style = target.style,
        endCache,
        p,
        startValue,
        endValue,
        startNum,
        endNum,
        startUnit,
        endUnit;
      if (startCache.svg) {
        startValue = target.getAttribute("transform");
        target.setAttribute("transform", "");
        style[_transformProp] = transforms;
        endCache = _parseTransform(target, 1);
        _removeProperty(target, _transformProp);
        target.setAttribute("transform", startValue);
      } else {
        startValue = getComputedStyle(target)[_transformProp];
        style[_transformProp] = transforms;
        endCache = _parseTransform(target, 1);
        style[_transformProp] = startValue;
      }
      for (p in _transformProps) {
        startValue = startCache[p];
        endValue = endCache[p];
        if (startValue !== endValue && exclude.indexOf(p) < 0) {
          startUnit = getUnit(startValue);
          endUnit = getUnit(endValue);
          startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
          endNum = parseFloat(endValue);
          plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
          plugin._pt.u = endUnit || 0;
          plugin._props.push(p);
        }
      }
      _assign(endCache, startCache);
    };
  _forEachName("padding,margin,Width,Radius", function (name, index) {
    var t = "Top",
      r = "Right",
      b = "Bottom",
      l = "Left",
      props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
        return index < 2 ? name + side : "border" + side + name;
      });
    _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
      var a, vars;
      if (arguments.length < 4) {
        a = props.map(function (prop) {
          return _get(plugin, prop, property);
        });
        vars = a.join(" ");
        return vars.split(a[0]).length === 5 ? a[0] : vars;
      }
      a = (endValue + "").split(" ");
      vars = {};
      props.forEach(function (prop, i) {
        return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
      });
      plugin.init(target, vars, tween);
    };
  });
  var CSSPlugin = {
    name: "css",
    register: _initCore,
    targetTest: function targetTest(target) {
      return target.style && target.nodeType;
    },
    init: function init(target, vars, tween, index, targets) {
      var props = this._props,
        style = target.style,
        startAt = tween.vars.startAt,
        startValue,
        endValue,
        endNum,
        startNum,
        type,
        specialProp,
        p,
        startUnit,
        endUnit,
        relative,
        isTransformRelated,
        transformPropTween,
        cache,
        smooth,
        hasPriority,
        inlineProps;
      _pluginInitted || _initCore();
      this.styles = this.styles || _getStyleSaver(target);
      inlineProps = this.styles.props;
      this.tween = tween;
      for (p in vars) {
        if (p === "autoRound") {
          continue;
        }
        endValue = vars[p];
        if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
          continue;
        }
        type = _typeof(endValue);
        specialProp = _specialProps[p];
        if (type === "function") {
          endValue = endValue.call(tween, index, target, targets);
          type = _typeof(endValue);
        }
        if (type === "string" && ~endValue.indexOf("random(")) {
          endValue = _replaceRandom(endValue);
        }
        if (specialProp) {
          specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
        } else if (p.substr(0, 2) === "--") {
          startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
          endValue += "";
          _colorExp.lastIndex = 0;
          if (!_colorExp.test(startValue)) {
            startUnit = getUnit(startValue);
            endUnit = getUnit(endValue);
          }
          endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
          this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
          props.push(p);
          inlineProps.push(p, 0, style[p]);
        } else if (type !== "undefined") {
          if (startAt && p in startAt) {
            startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
            _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
            getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
            (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
          } else {
            startValue = _get(target, p);
          }
          startNum = parseFloat(startValue);
          relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
          relative && (endValue = endValue.substr(2));
          endNum = parseFloat(endValue);
          if (p in _propertyAliases) {
            if (p === "autoAlpha") {
              if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
                startNum = 0;
              }
              inlineProps.push("visibility", 0, style.visibility);
              _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
            }
            if (p !== "scale" && p !== "transform") {
              p = _propertyAliases[p];
              ~p.indexOf(",") && (p = p.split(",")[0]);
            }
          }
          isTransformRelated = p in _transformProps;
          if (isTransformRelated) {
            this.styles.save(p);
            if (!transformPropTween) {
              cache = target._gsap;
              cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
              smooth = vars.smoothOrigin !== false && cache.smooth;
              transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
              transformPropTween.dep = 1;
            }
            if (p === "scale") {
              this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
              this._pt.u = 0;
              props.push("scaleY", p);
              p += "X";
            } else if (p === "transformOrigin") {
              inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
              endValue = _convertKeywordsToPercentages(endValue);
              if (cache.svg) {
                _applySVGOrigin(target, endValue, 0, smooth, 0, this);
              } else {
                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
              }
              continue;
            } else if (p === "svgOrigin") {
              _applySVGOrigin(target, endValue, 1, smooth, 0, this);
              continue;
            } else if (p in _rotationalProperties) {
              _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
              continue;
            } else if (p === "smoothOrigin") {
              _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
              continue;
            } else if (p === "force3D") {
              cache[p] = endValue;
              continue;
            } else if (p === "transform") {
              _addRawTransformPTs(this, endValue, target);
              continue;
            }
          } else if (!(p in style)) {
            p = _checkPropPrefix(p) || p;
          }
          if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
            startUnit = (startValue + "").substr((startNum + "").length);
            endNum || (endNum = 0);
            endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
            startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
            this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
            this._pt.u = endUnit || 0;
            if (startUnit !== endUnit && endUnit !== "%") {
              this._pt.b = startValue;
              this._pt.r = _renderCSSPropWithBeginning;
            }
          } else if (!(p in style)) {
            if (p in target) {
              this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
            } else if (p !== "parseTransform") {
              _missingPlugin(p, endValue);
              continue;
            }
          } else {
            _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
          }
          isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
          props.push(p);
        }
      }
      hasPriority && _sortPropTweensByPriority(this);
    },
    render: function render(ratio, data) {
      if (data.tween._time || !_reverting$1()) {
        var pt = data._pt;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
      } else {
        data.styles.revert();
      }
    },
    get: _get,
    aliases: _propertyAliases,
    getSetter: function getSetter(target, property, plugin) {
      var p = _propertyAliases[property];
      p && p.indexOf(",") < 0 && (property = p);
      return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
    },
    core: {
      _removeProperty: _removeProperty,
      _getMatrix: _getMatrix
    }
  };
  gsap.utils.checkPrefix = _checkPropPrefix;
  gsap.core.getStyleSaver = _getStyleSaver;
  (function (positionAndScale, rotation, others, aliases) {
    var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
      _transformProps[name] = 1;
    });
    _forEachName(rotation, function (name) {
      _config.units[name] = "deg";
      _rotationalProperties[name] = 1;
    });
    _propertyAliases[all[13]] = positionAndScale + "," + rotation;
    _forEachName(aliases, function (name) {
      var split = name.split(":");
      _propertyAliases[split[1]] = all[split[0]];
    });
  })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
  _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
    _config.units[name] = "px";
  });
  gsap.registerPlugin(CSSPlugin);
  var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap,
    TweenMaxWithCSS = gsapWithCSS.core.Tween;
  exports.Back = Back;
  exports.Bounce = Bounce;
  exports.CSSPlugin = CSSPlugin;
  exports.Circ = Circ;
  exports.Cubic = Cubic;
  exports.Elastic = Elastic;
  exports.Expo = Expo;
  exports.Linear = Linear;
  exports.Power0 = Power0;
  exports.Power1 = Power1;
  exports.Power2 = Power2;
  exports.Power3 = Power3;
  exports.Power4 = Power4;
  exports.Quad = Quad;
  exports.Quart = Quart;
  exports.Quint = Quint;
  exports.Sine = Sine;
  exports.SteppedEase = SteppedEase;
  exports.Strong = Strong;
  exports.TimelineLite = Timeline;
  exports.TimelineMax = Timeline;
  exports.TweenLite = Tween;
  exports.TweenMax = TweenMaxWithCSS;
  exports["default"] = gsapWithCSS;
  exports.gsap = gsapWithCSS;
  if (typeof window === 'undefined' || window !== exports) {
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  } else {
    delete window["default"];
  }
});

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._setDoc = exports._isFixed = exports._getDocScrollTop = exports._getDocScrollLeft = exports._getCTM = exports.Matrix2D = void 0;
exports.getGlobalMatrix = getGlobalMatrix;
/*!
 * matrix 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

/* eslint-disable */
var _doc,
  _win,
  _docElement,
  _body,
  _divContainer,
  _svgContainer,
  _identityMatrix,
  _gEl,
  _transformProp = "transform",
  _transformOriginProp = _transformProp + "Origin",
  _hasOffsetBug,
  _setDoc = function _setDoc(element) {
    var doc = element.ownerDocument || element;
    if (!(_transformProp in element.style) && "msTransform" in element.style) {
      //to improve compatibility with old Microsoft browsers
      _transformProp = "msTransform";
      _transformOriginProp = _transformProp + "Origin";
    }
    while (doc.parentNode && (doc = doc.parentNode)) {}
    _win = window;
    _identityMatrix = new Matrix2D();
    if (doc) {
      _doc = doc;
      _docElement = doc.documentElement;
      _body = doc.body;
      _gEl = _doc.createElementNS("http://www.w3.org/2000/svg", "g"); // prevent any existing CSS from transforming it

      _gEl.style.transform = "none"; // now test for the offset reporting bug. Use feature detection instead of browser sniffing to make things more bulletproof and future-proof. Hopefully Safari will fix their bug soon but it's 2020 and it's still not fixed.

      var d1 = doc.createElement("div"),
        d2 = doc.createElement("div");
      _body.appendChild(d1);
      d1.appendChild(d2);
      d1.style.position = "static";
      d1.style[_transformProp] = "translate3d(0,0,1px)";
      _hasOffsetBug = d2.offsetParent !== d1;
      _body.removeChild(d1);
    }
    return doc;
  },
  _forceNonZeroScale = function _forceNonZeroScale(e) {
    // walks up the element's ancestors and finds any that had their scale set to 0 via GSAP, and changes them to 0.0001 to ensure that measurements work. Firefox has a bug that causes it to incorrectly report getBoundingClientRect() when scale is 0.
    var a, cache;
    while (e && e !== _body) {
      cache = e._gsap;
      cache && cache.uncache && cache.get(e, "x"); // force re-parsing of transforms if necessary

      if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
        cache.scaleX = cache.scaleY = 1e-4;
        cache.renderTransform(1, cache);
        a ? a.push(cache) : a = [cache];
      }
      e = e.parentNode;
    }
    return a;
  },
  // possible future addition: pass an element to _forceDisplay() and it'll walk up all its ancestors and make sure anything with display: none is set to display: block, and if there's no parentNode, it'll add it to the body. It returns an Array that you can then feed to _revertDisplay() to have it revert all the changes it made.
  // _forceDisplay = e => {
  // 	let a = [],
  // 		parent;
  // 	while (e && e !== _body) {
  // 		parent = e.parentNode;
  // 		(_win.getComputedStyle(e).display === "none" || !parent) && a.push(e, e.style.display, parent) && (e.style.display = "block");
  // 		parent || _body.appendChild(e);
  // 		e = parent;
  // 	}
  // 	return a;
  // },
  // _revertDisplay = a => {
  // 	for (let i = 0; i < a.length; i+=3) {
  // 		a[i+1] ? (a[i].style.display = a[i+1]) : a[i].style.removeProperty("display");
  // 		a[i+2] || a[i].parentNode.removeChild(a[i]);
  // 	}
  // },
  _svgTemps = [],
  //we create 3 elements for SVG, and 3 for other DOM elements and cache them for performance reasons. They get nested in _divContainer and _svgContainer so that just one element is added to the DOM on each successive attempt. Again, performance is key.
  _divTemps = [],
  _getDocScrollTop = function _getDocScrollTop() {
    return _win.pageYOffset || _doc.scrollTop || _docElement.scrollTop || _body.scrollTop || 0;
  },
  _getDocScrollLeft = function _getDocScrollLeft() {
    return _win.pageXOffset || _doc.scrollLeft || _docElement.scrollLeft || _body.scrollLeft || 0;
  },
  _svgOwner = function _svgOwner(element) {
    return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
  },
  _isFixed = function _isFixed(element) {
    if (_win.getComputedStyle(element).position === "fixed") {
      return true;
    }
    element = element.parentNode;
    if (element && element.nodeType === 1) {
      // avoid document fragments which will throw an error.
      return _isFixed(element);
    }
  },
  _createSibling = function _createSibling(element, i) {
    if (element.parentNode && (_doc || _setDoc(element))) {
      var svg = _svgOwner(element),
        ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
        type = svg ? i ? "rect" : "g" : "div",
        x = i !== 2 ? 0 : 100,
        y = i === 3 ? 100 : 0,
        css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
        e = _doc.createElementNS ? _doc.createElementNS(ns.replace(/^https/, "http"), type) : _doc.createElement(type);
      if (i) {
        if (!svg) {
          if (!_divContainer) {
            _divContainer = _createSibling(element);
            _divContainer.style.cssText = css;
          }
          e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";
          _divContainer.appendChild(e);
        } else {
          _svgContainer || (_svgContainer = _createSibling(element));
          e.setAttribute("width", 0.01);
          e.setAttribute("height", 0.01);
          e.setAttribute("transform", "translate(" + x + "," + y + ")");
          _svgContainer.appendChild(e);
        }
      }
      return e;
    }
    throw "Need document and parent.";
  },
  _consolidate = function _consolidate(m) {
    // replaces SVGTransformList.consolidate() because a bug in Firefox causes it to break pointer events. See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800
    var c = new Matrix2D(),
      i = 0;
    for (; i < m.numberOfItems; i++) {
      c.multiply(m.getItem(i).matrix);
    }
    return c;
  },
  _getCTM = function _getCTM(svg) {
    var m = svg.getCTM(),
      transform;
    if (!m) {
      // Firefox returns null for getCTM() on root <svg> elements, so this is a workaround using a <g> that we temporarily append.
      transform = svg.style[_transformProp];
      svg.style[_transformProp] = "none"; // a bug in Firefox causes css transforms to contaminate the getCTM()

      svg.appendChild(_gEl);
      m = _gEl.getCTM();
      svg.removeChild(_gEl);
      transform ? svg.style[_transformProp] = transform : svg.style.removeProperty(_transformProp.replace(/([A-Z])/g, "-$1").toLowerCase());
    }
    return m || _identityMatrix.clone(); // Firefox will still return null if the <svg> has a width/height of 0 in the browser.
  },
  _placeSiblings = function _placeSiblings(element, adjustGOffset) {
    var svg = _svgOwner(element),
      isRootSVG = element === svg,
      siblings = svg ? _svgTemps : _divTemps,
      parent = element.parentNode,
      container,
      m,
      b,
      x,
      y,
      cs;
    if (element === _win) {
      return element;
    }
    siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
    container = svg ? _svgContainer : _divContainer;
    if (svg) {
      if (isRootSVG) {
        b = _getCTM(element);
        x = -b.e / b.a;
        y = -b.f / b.d;
        m = _identityMatrix;
      } else if (element.getBBox) {
        b = element.getBBox();
        m = element.transform ? element.transform.baseVal : {}; // IE11 doesn't follow the spec.

        m = !m.numberOfItems ? _identityMatrix : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix; // don't call m.consolidate().matrix because a bug in Firefox makes pointer events not work when consolidate() is called on the same tick as getBoundingClientRect()! See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800

        x = m.a * b.x + m.c * b.y;
        y = m.b * b.x + m.d * b.y;
      } else {
        // may be a <mask> which has no getBBox() so just use defaults instead of throwing errors.
        m = new Matrix2D();
        x = y = 0;
      }
      if (adjustGOffset && element.tagName.toLowerCase() === "g") {
        x = y = 0;
      }
      (isRootSVG ? svg : parent).appendChild(container);
      container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
    } else {
      x = y = 0;
      if (_hasOffsetBug) {
        // some browsers (like Safari) have a bug that causes them to misreport offset values. When an ancestor element has a transform applied, it's supposed to treat it as if it's position: relative (new context). Safari botches this, so we need to find the closest ancestor (between the element and its offsetParent) that has a transform applied and if one is found, grab its offsetTop/Left and subtract them to compensate.
        m = element.offsetParent;
        b = element;
        while (b && (b = b.parentNode) && b !== m && b.parentNode) {
          if ((_win.getComputedStyle(b)[_transformProp] + "").length > 4) {
            x = b.offsetLeft;
            y = b.offsetTop;
            b = 0;
          }
        }
      }
      cs = _win.getComputedStyle(element);
      if (cs.position !== "absolute" && cs.position !== "fixed") {
        m = element.offsetParent;
        while (parent && parent !== m) {
          // if there's an ancestor element between the element and its offsetParent that's scrolled, we must factor that in.
          x += parent.scrollLeft || 0;
          y += parent.scrollTop || 0;
          parent = parent.parentNode;
        }
      }
      b = container.style;
      b.top = element.offsetTop - y + "px";
      b.left = element.offsetLeft - x + "px";
      b[_transformProp] = cs[_transformProp];
      b[_transformOriginProp] = cs[_transformOriginProp]; // b.border = m.border;
      // b.borderLeftStyle = m.borderLeftStyle;
      // b.borderTopStyle = m.borderTopStyle;
      // b.borderLeftWidth = m.borderLeftWidth;
      // b.borderTopWidth = m.borderTopWidth;

      b.position = cs.position === "fixed" ? "fixed" : "absolute";
      element.parentNode.appendChild(container);
    }
    return container;
  },
  _setMatrix = function _setMatrix(m, a, b, c, d, e, f) {
    m.a = a;
    m.b = b;
    m.c = c;
    m.d = d;
    m.e = e;
    m.f = f;
    return m;
  };
exports._getCTM = _getCTM;
exports._isFixed = _isFixed;
exports._getDocScrollLeft = _getDocScrollLeft;
exports._getDocScrollTop = _getDocScrollTop;
exports._setDoc = _setDoc;
var Matrix2D = /*#__PURE__*/function () {
  function Matrix2D(a, b, c, d, e, f) {
    if (a === void 0) {
      a = 1;
    }
    if (b === void 0) {
      b = 0;
    }
    if (c === void 0) {
      c = 0;
    }
    if (d === void 0) {
      d = 1;
    }
    if (e === void 0) {
      e = 0;
    }
    if (f === void 0) {
      f = 0;
    }
    _setMatrix(this, a, b, c, d, e, f);
  }
  var _proto = Matrix2D.prototype;
  _proto.inverse = function inverse() {
    var a = this.a,
      b = this.b,
      c = this.c,
      d = this.d,
      e = this.e,
      f = this.f,
      determinant = a * d - b * c || 1e-10;
    return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
  };
  _proto.multiply = function multiply(matrix) {
    var a = this.a,
      b = this.b,
      c = this.c,
      d = this.d,
      e = this.e,
      f = this.f,
      a2 = matrix.a,
      b2 = matrix.c,
      c2 = matrix.b,
      d2 = matrix.d,
      e2 = matrix.e,
      f2 = matrix.f;
    return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
  };
  _proto.clone = function clone() {
    return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
  };
  _proto.equals = function equals(matrix) {
    var a = this.a,
      b = this.b,
      c = this.c,
      d = this.d,
      e = this.e,
      f = this.f;
    return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
  };
  _proto.apply = function apply(point, decoratee) {
    if (decoratee === void 0) {
      decoratee = {};
    }
    var x = point.x,
      y = point.y,
      a = this.a,
      b = this.b,
      c = this.c,
      d = this.d,
      e = this.e,
      f = this.f;
    decoratee.x = x * a + y * c + e || 0;
    decoratee.y = x * b + y * d + f || 0;
    return decoratee;
  };
  return Matrix2D;
}(); // Feed in an element and it'll return a 2D matrix (optionally inverted) so that you can translate between coordinate spaces.
// Inverting lets you translate a global point into a local coordinate space. No inverting lets you go the other way.
// We needed this to work around various browser bugs, like Firefox doesn't accurately report getScreenCTM() when there
// are transforms applied to ancestor elements.
// The matrix math to convert any x/y coordinate is as follows, which is wrapped in a convenient apply() method of Matrix2D above:
//     tx = m.a * x + m.c * y + m.e
//     ty = m.b * x + m.d * y + m.f
exports.Matrix2D = Matrix2D;
function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
  // adjustGOffset is typically used only when grabbing an element's PARENT's global matrix, and it ignores the x/y offset of any SVG <g> elements because they behave in a special way.
  if (!element || !element.parentNode || (_doc || _setDoc(element)).documentElement === element) {
    return new Matrix2D();
  }
  var zeroScales = _forceNonZeroScale(element),
    svg = _svgOwner(element),
    temps = svg ? _svgTemps : _divTemps,
    container = _placeSiblings(element, adjustGOffset),
    b1 = temps[0].getBoundingClientRect(),
    b2 = temps[1].getBoundingClientRect(),
    b3 = temps[2].getBoundingClientRect(),
    parent = container.parentNode,
    isFixed = !includeScrollInFixed && _isFixed(element),
    m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft()), b1.top + (isFixed ? 0 : _getDocScrollTop()));
  parent.removeChild(container);
  if (zeroScales) {
    b1 = zeroScales.length;
    while (b1--) {
      b2 = zeroScales[b1];
      b2.scaleX = b2.scaleY = 0;
      b2.renderTransform(1, b2);
    }
  }
  return inverse ? m.inverse() : m;
}
// export function getMatrix(element) {
// 	_doc || _setDoc(element);
// 	let m = (_win.getComputedStyle(element)[_transformProp] + "").substr(7).match(/[-.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g),
// 		is2D = m && m.length === 6;
// 	return !m || m.length < 6 ? new Matrix2D() : new Matrix2D(+m[0], +m[1], +m[is2D ? 2 : 4], +m[is2D ? 3 : 5], +m[is2D ? 4 : 12], +m[is2D ? 5 : 13]);
// }

},{}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (window, factory) {
  var lazySizes = factory(window, window.document, Date);
  window.lazySizes = lazySizes;
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    module.exports = lazySizes;
  }
})(typeof window != 'undefined' ? window : {},
/**
 * import("./types/global")
 * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
 */
function l(window, document, Date) {
  // Pass in the window Date function also for SSR because the Date class can be lost
  'use strict';

  /*jshint eqnull:true */
  var lazysizes,
    /**
     * @type { LazySizesConfigPartial }
     */
    lazySizesCfg;
  (function () {
    var prop;
    var lazySizesDefaults = {
      lazyClass: 'lazyload',
      loadedClass: 'lazyloaded',
      loadingClass: 'lazyloading',
      preloadClass: 'lazypreload',
      errorClass: 'lazyerror',
      //strictClass: 'lazystrict',
      autosizesClass: 'lazyautosizes',
      fastLoadedClass: 'ls-is-cached',
      iframeLoadMode: 0,
      srcAttr: 'data-src',
      srcsetAttr: 'data-srcset',
      sizesAttr: 'data-sizes',
      //preloadAfterLoad: false,
      minSize: 40,
      customMedia: {},
      init: true,
      expFactor: 1.5,
      hFac: 0.8,
      loadMode: 2,
      loadHidden: true,
      ricTimeout: 0,
      throttleDelay: 125
    };
    lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};
    for (prop in lazySizesDefaults) {
      if (!(prop in lazySizesCfg)) {
        lazySizesCfg[prop] = lazySizesDefaults[prop];
      }
    }
  })();
  if (!document || !document.getElementsByClassName) {
    return {
      init: function init() {},
      /**
       * @type { LazySizesConfigPartial }
       */
      cfg: lazySizesCfg,
      /**
       * @type { true }
       */
      noSupport: true
    };
  }
  var docElem = document.documentElement;
  var supportPicture = window.HTMLPictureElement;
  var _addEventListener = 'addEventListener';
  var _getAttribute = 'getAttribute';

  /**
   * Update to bind to window because 'this' becomes null during SSR
   * builds.
   */
  var addEventListener = window[_addEventListener].bind(window);
  var setTimeout = window.setTimeout;
  var requestAnimationFrame = window.requestAnimationFrame || setTimeout;
  var requestIdleCallback = window.requestIdleCallback;
  var regPicture = /^picture$/i;
  var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];
  var regClassCache = {};
  var forEach = Array.prototype.forEach;

  /**
   * @param ele {Element}
   * @param cls {string}
   */
  var hasClass = function hasClass(ele, cls) {
    if (!regClassCache[cls]) {
      regClassCache[cls] = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    }
    return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
  };

  /**
   * @param ele {Element}
   * @param cls {string}
   */
  var addClass = function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
    }
  };

  /**
   * @param ele {Element}
   * @param cls {string}
   */
  var removeClass = function removeClass(ele, cls) {
    var reg;
    if (reg = hasClass(ele, cls)) {
      ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
    }
  };
  var addRemoveLoadEvents = function addRemoveLoadEvents(dom, fn, add) {
    var action = add ? _addEventListener : 'removeEventListener';
    if (add) {
      addRemoveLoadEvents(dom, fn);
    }
    loadEvents.forEach(function (evt) {
      dom[action](evt, fn);
    });
  };

  /**
   * @param elem { Element }
   * @param name { string }
   * @param detail { any }
   * @param noBubbles { boolean }
   * @param noCancelable { boolean }
   * @returns { CustomEvent }
   */
  var triggerEvent = function triggerEvent(elem, name, detail, noBubbles, noCancelable) {
    var event = document.createEvent('Event');
    if (!detail) {
      detail = {};
    }
    detail.instance = lazysizes;
    event.initEvent(name, !noBubbles, !noCancelable);
    event.detail = detail;
    elem.dispatchEvent(event);
    return event;
  };
  var updatePolyfill = function updatePolyfill(el, full) {
    var polyfill;
    if (!supportPicture && (polyfill = window.picturefill || lazySizesCfg.pf)) {
      if (full && full.src && !el[_getAttribute]('srcset')) {
        el.setAttribute('srcset', full.src);
      }
      polyfill({
        reevaluate: true,
        elements: [el]
      });
    } else if (full && full.src) {
      el.src = full.src;
    }
  };
  var getCSS = function getCSS(elem, style) {
    return (getComputedStyle(elem, null) || {})[style];
  };

  /**
   *
   * @param elem { Element }
   * @param parent { Element }
   * @param [width] {number}
   * @returns {number}
   */
  var getWidth = function getWidth(elem, parent, width) {
    width = width || elem.offsetWidth;
    while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
      width = parent.offsetWidth;
      parent = parent.parentNode;
    }
    return width;
  };
  var rAF = function () {
    var running, waiting;
    var firstFns = [];
    var secondFns = [];
    var fns = firstFns;
    var run = function run() {
      var runFns = fns;
      fns = firstFns.length ? secondFns : firstFns;
      running = true;
      waiting = false;
      while (runFns.length) {
        runFns.shift()();
      }
      running = false;
    };
    var rafBatch = function rafBatch(fn, queue) {
      if (running && !queue) {
        fn.apply(this, arguments);
      } else {
        fns.push(fn);
        if (!waiting) {
          waiting = true;
          (document.hidden ? setTimeout : requestAnimationFrame)(run);
        }
      }
    };
    rafBatch._lsFlush = run;
    return rafBatch;
  }();
  var rAFIt = function rAFIt(fn, simple) {
    return simple ? function () {
      rAF(fn);
    } : function () {
      var that = this;
      var args = arguments;
      rAF(function () {
        fn.apply(that, args);
      });
    };
  };
  var throttle = function throttle(fn) {
    var running;
    var lastTime = 0;
    var gDelay = lazySizesCfg.throttleDelay;
    var rICTimeout = lazySizesCfg.ricTimeout;
    var run = function run() {
      running = false;
      lastTime = Date.now();
      fn();
    };
    var idleCallback = requestIdleCallback && rICTimeout > 49 ? function () {
      requestIdleCallback(run, {
        timeout: rICTimeout
      });
      if (rICTimeout !== lazySizesCfg.ricTimeout) {
        rICTimeout = lazySizesCfg.ricTimeout;
      }
    } : rAFIt(function () {
      setTimeout(run);
    }, true);
    return function (isPriority) {
      var delay;
      if (isPriority = isPriority === true) {
        rICTimeout = 33;
      }
      if (running) {
        return;
      }
      running = true;
      delay = gDelay - (Date.now() - lastTime);
      if (delay < 0) {
        delay = 0;
      }
      if (isPriority || delay < 9) {
        idleCallback();
      } else {
        setTimeout(idleCallback, delay);
      }
    };
  };

  //based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
  var debounce = function debounce(func) {
    var timeout, timestamp;
    var wait = 99;
    var run = function run() {
      timeout = null;
      func();
    };
    var later = function later() {
      var last = Date.now() - timestamp;
      if (last < wait) {
        setTimeout(later, wait - last);
      } else {
        (requestIdleCallback || run)(run);
      }
    };
    return function () {
      timestamp = Date.now();
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
    };
  };
  var loader = function () {
    var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
    var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
    var regImg = /^img$/i;
    var regIframe = /^iframe$/i;
    var supportScroll = 'onscroll' in window && !/(gle|ing)bot/.test(navigator.userAgent);
    var shrinkExpand = 0;
    var currentExpand = 0;
    var isLoading = 0;
    var lowRuns = -1;
    var resetPreloading = function resetPreloading(e) {
      isLoading--;
      if (!e || isLoading < 0 || !e.target) {
        isLoading = 0;
      }
    };
    var isVisible = function isVisible(elem) {
      if (isBodyHidden == null) {
        isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
      }
      return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
    };
    var isNestedVisible = function isNestedVisible(elem, elemExpand) {
      var outerRect;
      var parent = elem;
      var visible = isVisible(elem);
      eLtop -= elemExpand;
      eLbottom += elemExpand;
      eLleft -= elemExpand;
      eLright += elemExpand;
      while (visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem) {
        visible = (getCSS(parent, 'opacity') || 1) > 0;
        if (visible && getCSS(parent, 'overflow') != 'visible') {
          outerRect = parent.getBoundingClientRect();
          visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
        }
      }
      return visible;
    };
    var checkElements = function checkElements() {
      var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
      var lazyloadElems = lazysizes.elements;
      if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
        i = 0;
        lowRuns++;
        for (; i < eLlen; i++) {
          if (!lazyloadElems[i] || lazyloadElems[i]._lazyRace) {
            continue;
          }
          if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i])) {
            unveilElement(lazyloadElems[i]);
            continue;
          }
          if (!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)) {
            elemExpand = currentExpand;
          }
          if (!defaultExpand) {
            defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
            lazysizes._defEx = defaultExpand;
            preloadExpand = defaultExpand * lazySizesCfg.expFactor;
            hFac = lazySizesCfg.hFac;
            isBodyHidden = null;
            if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden) {
              currentExpand = preloadExpand;
              lowRuns = 0;
            } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
              currentExpand = defaultExpand;
            } else {
              currentExpand = shrinkExpand;
            }
          }
          if (beforeExpandVal !== elemExpand) {
            eLvW = innerWidth + elemExpand * hFac;
            elvH = innerHeight + elemExpand;
            elemNegativeExpand = elemExpand * -1;
            beforeExpandVal = elemExpand;
          }
          rect = lazyloadElems[i].getBoundingClientRect();
          if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i], elemExpand))) {
            unveilElement(lazyloadElems[i]);
            loadedSomething = true;
            if (isLoading > 9) {
              break;
            }
          } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto'))) {
            autoLoadElem = preloadElems[0] || lazyloadElems[i];
          }
        }
        if (autoLoadElem && !loadedSomething) {
          unveilElement(autoLoadElem);
        }
      }
    };
    var throttledCheckElements = throttle(checkElements);
    var switchLoadingClass = function switchLoadingClass(e) {
      var elem = e.target;
      if (elem._lazyCache) {
        delete elem._lazyCache;
        return;
      }
      resetPreloading(e);
      addClass(elem, lazySizesCfg.loadedClass);
      removeClass(elem, lazySizesCfg.loadingClass);
      addRemoveLoadEvents(elem, rafSwitchLoadingClass);
      triggerEvent(elem, 'lazyloaded');
    };
    var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
    var rafSwitchLoadingClass = function rafSwitchLoadingClass(e) {
      rafedSwitchLoadingClass({
        target: e.target
      });
    };
    var changeIframeSrc = function changeIframeSrc(elem, src) {
      var loadMode = elem.getAttribute('data-load-mode') || lazySizesCfg.iframeLoadMode;

      // loadMode can be also a string!
      if (loadMode == 0) {
        elem.contentWindow.location.replace(src);
      } else if (loadMode == 1) {
        elem.src = src;
      }
    };
    var handleSources = function handleSources(source) {
      var customMedia;
      var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
      if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) {
        source.setAttribute('media', customMedia);
      }
      if (sourceSrcset) {
        source.setAttribute('srcset', sourceSrcset);
      }
    };
    var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg) {
      var src, srcset, parent, isPicture, event, firesLoad;
      if (!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented) {
        if (sizes) {
          if (isAuto) {
            addClass(elem, lazySizesCfg.autosizesClass);
          } else {
            elem.setAttribute('sizes', sizes);
          }
        }
        srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
        src = elem[_getAttribute](lazySizesCfg.srcAttr);
        if (isImg) {
          parent = elem.parentNode;
          isPicture = parent && regPicture.test(parent.nodeName || '');
        }
        firesLoad = detail.firesLoad || 'src' in elem && (srcset || src || isPicture);
        event = {
          target: elem
        };
        addClass(elem, lazySizesCfg.loadingClass);
        if (firesLoad) {
          clearTimeout(resetPreloadingTimer);
          resetPreloadingTimer = setTimeout(resetPreloading, 2500);
          addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
        }
        if (isPicture) {
          forEach.call(parent.getElementsByTagName('source'), handleSources);
        }
        if (srcset) {
          elem.setAttribute('srcset', srcset);
        } else if (src && !isPicture) {
          if (regIframe.test(elem.nodeName)) {
            changeIframeSrc(elem, src);
          } else {
            elem.src = src;
          }
        }
        if (isImg && (srcset || isPicture)) {
          updatePolyfill(elem, {
            src: src
          });
        }
      }
      if (elem._lazyRace) {
        delete elem._lazyRace;
      }
      removeClass(elem, lazySizesCfg.lazyClass);
      rAF(function () {
        // Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
        var isLoaded = elem.complete && elem.naturalWidth > 1;
        if (!firesLoad || isLoaded) {
          if (isLoaded) {
            addClass(elem, lazySizesCfg.fastLoadedClass);
          }
          switchLoadingClass(event);
          elem._lazyCache = true;
          setTimeout(function () {
            if ('_lazyCache' in elem) {
              delete elem._lazyCache;
            }
          }, 9);
        }
        if (elem.loading == 'lazy') {
          isLoading--;
        }
      }, true);
    });

    /**
     *
     * @param elem { Element }
     */
    var unveilElement = function unveilElement(elem) {
      if (elem._lazyRace) {
        return;
      }
      var detail;
      var isImg = regImg.test(elem.nodeName);

      //allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
      var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));
      var isAuto = sizes == 'auto';
      if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
        return;
      }
      detail = triggerEvent(elem, 'lazyunveilread').detail;
      if (isAuto) {
        autoSizer.updateElem(elem, true, elem.offsetWidth);
      }
      elem._lazyRace = true;
      isLoading++;
      lazyUnveil(elem, detail, isAuto, sizes, isImg);
    };
    var afterScroll = debounce(function () {
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
    });
    var altLoadmodeScrollListner = function altLoadmodeScrollListner() {
      if (lazySizesCfg.loadMode == 3) {
        lazySizesCfg.loadMode = 2;
      }
      afterScroll();
    };
    var onload = function onload() {
      if (isCompleted) {
        return;
      }
      if (Date.now() - started < 999) {
        setTimeout(onload, 999);
        return;
      }
      isCompleted = true;
      lazySizesCfg.loadMode = 3;
      throttledCheckElements();
      addEventListener('scroll', altLoadmodeScrollListner, true);
    };
    return {
      _: function _() {
        started = Date.now();
        lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
        preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);
        addEventListener('scroll', throttledCheckElements, true);
        addEventListener('resize', throttledCheckElements, true);
        addEventListener('pageshow', function (e) {
          if (e.persisted) {
            var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);
            if (loadingElements.length && loadingElements.forEach) {
              requestAnimationFrame(function () {
                loadingElements.forEach(function (img) {
                  if (img.complete) {
                    unveilElement(img);
                  }
                });
              });
            }
          }
        });
        if (window.MutationObserver) {
          new MutationObserver(throttledCheckElements).observe(docElem, {
            childList: true,
            subtree: true,
            attributes: true
          });
        } else {
          docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
          docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
          setInterval(throttledCheckElements, 999);
        }
        addEventListener('hashchange', throttledCheckElements, true);

        //, 'fullscreenchange'
        ['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function (name) {
          document[_addEventListener](name, throttledCheckElements, true);
        });
        if (/d$|^c/.test(document.readyState)) {
          onload();
        } else {
          addEventListener('load', onload);
          document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
          setTimeout(onload, 20000);
        }
        if (lazysizes.elements.length) {
          checkElements();
          rAF._lsFlush();
        } else {
          throttledCheckElements();
        }
      },
      checkElems: throttledCheckElements,
      unveil: unveilElement,
      _aLSL: altLoadmodeScrollListner
    };
  }();
  var autoSizer = function () {
    var autosizesElems;
    var sizeElement = rAFIt(function (elem, parent, event, width) {
      var sources, i, len;
      elem._lazysizesWidth = width;
      width += 'px';
      elem.setAttribute('sizes', width);
      if (regPicture.test(parent.nodeName || '')) {
        sources = parent.getElementsByTagName('source');
        for (i = 0, len = sources.length; i < len; i++) {
          sources[i].setAttribute('sizes', width);
        }
      }
      if (!event.detail.dataAttr) {
        updatePolyfill(elem, event.detail);
      }
    });
    /**
     *
     * @param elem {Element}
     * @param dataAttr
     * @param [width] { number }
     */
    var getSizeElement = function getSizeElement(elem, dataAttr, width) {
      var event;
      var parent = elem.parentNode;
      if (parent) {
        width = getWidth(elem, parent, width);
        event = triggerEvent(elem, 'lazybeforesizes', {
          width: width,
          dataAttr: !!dataAttr
        });
        if (!event.defaultPrevented) {
          width = event.detail.width;
          if (width && width !== elem._lazysizesWidth) {
            sizeElement(elem, parent, event, width);
          }
        }
      }
    };
    var updateElementsSizes = function updateElementsSizes() {
      var i;
      var len = autosizesElems.length;
      if (len) {
        i = 0;
        for (; i < len; i++) {
          getSizeElement(autosizesElems[i]);
        }
      }
    };
    var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
    return {
      _: function _() {
        autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
        addEventListener('resize', debouncedUpdateElementsSizes);
      },
      checkElems: debouncedUpdateElementsSizes,
      updateElem: getSizeElement
    };
  }();
  var init = function init() {
    if (!init.i && document.getElementsByClassName) {
      init.i = true;
      autoSizer._();
      loader._();
    }
  };
  setTimeout(function () {
    if (lazySizesCfg.init) {
      init();
    }
  });
  lazysizes = {
    /**
     * @type { LazySizesConfigPartial }
     */
    cfg: lazySizesCfg,
    autoSizer: autoSizer,
    loader: loader,
    init: init,
    uP: updatePolyfill,
    aC: addClass,
    rC: removeClass,
    hC: hasClass,
    fire: triggerEvent,
    gW: getWidth,
    rAF: rAF
  };
  return lazysizes;
});

},{}],6:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (window, factory) {
  var globalInstall = function globalInstall() {
    factory(window.lazySizes);
    window.removeEventListener('lazyunveilread', globalInstall, true);
  };
  factory = factory.bind(null, window, window.document);
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    factory(require('lazysizes'));
  } else if (typeof define == 'function' && define.amd) {
    define(['lazysizes'], factory);
  } else if (window.lazySizes) {
    globalInstall();
  } else {
    window.addEventListener('lazyunveilread', globalInstall, true);
  }
})(window, function (window, document, lazySizes) {
  'use strict';

  if (!window.addEventListener) {
    return;
  }
  var lazySizesCfg = lazySizes.cfg;
  var regWhite = /\s+/g;
  var regSplitSet = /\s*\|\s+|\s+\|\s*/g;
  var regSource = /^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/;
  var regType = /^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/;
  var regBgUrlEscape = /\(|\)|'/;
  var allowedBackgroundSize = {
    contain: 1,
    cover: 1
  };
  var proxyWidth = function proxyWidth(elem) {
    var width = lazySizes.gW(elem, elem.parentNode);
    if (!elem._lazysizesWidth || width > elem._lazysizesWidth) {
      elem._lazysizesWidth = width;
    }
    return elem._lazysizesWidth;
  };
  var getBgSize = function getBgSize(elem) {
    var bgSize;
    bgSize = (getComputedStyle(elem) || {
      getPropertyValue: function getPropertyValue() {}
    }).getPropertyValue('background-size');
    if (!allowedBackgroundSize[bgSize] && allowedBackgroundSize[elem.style.backgroundSize]) {
      bgSize = elem.style.backgroundSize;
    }
    return bgSize;
  };
  var setTypeOrMedia = function setTypeOrMedia(source, match) {
    if (match) {
      var typeMatch = match.match(regType);
      if (typeMatch && typeMatch[1]) {
        source.setAttribute('type', typeMatch[1]);
      } else {
        source.setAttribute('media', lazySizesCfg.customMedia[match] || match);
      }
    }
  };
  var createPicture = function createPicture(sets, elem, img) {
    var picture = document.createElement('picture');
    var sizes = elem.getAttribute(lazySizesCfg.sizesAttr);
    var ratio = elem.getAttribute('data-ratio');
    var optimumx = elem.getAttribute('data-optimumx');
    if (elem._lazybgset && elem._lazybgset.parentNode == elem) {
      elem.removeChild(elem._lazybgset);
    }
    Object.defineProperty(img, '_lazybgset', {
      value: elem,
      writable: true
    });
    Object.defineProperty(elem, '_lazybgset', {
      value: picture,
      writable: true
    });
    sets = sets.replace(regWhite, ' ').split(regSplitSet);
    picture.style.display = 'none';
    img.className = lazySizesCfg.lazyClass;
    if (sets.length == 1 && !sizes) {
      sizes = 'auto';
    }
    sets.forEach(function (set) {
      var match;
      var source = document.createElement('source');
      if (sizes && sizes != 'auto') {
        source.setAttribute('sizes', sizes);
      }
      if (match = set.match(regSource)) {
        source.setAttribute(lazySizesCfg.srcsetAttr, match[1]);
        setTypeOrMedia(source, match[2]);
        setTypeOrMedia(source, match[3]);
      } else {
        source.setAttribute(lazySizesCfg.srcsetAttr, set);
      }
      picture.appendChild(source);
    });
    if (sizes) {
      img.setAttribute(lazySizesCfg.sizesAttr, sizes);
      elem.removeAttribute(lazySizesCfg.sizesAttr);
      elem.removeAttribute('sizes');
    }
    if (optimumx) {
      img.setAttribute('data-optimumx', optimumx);
    }
    if (ratio) {
      img.setAttribute('data-ratio', ratio);
    }
    picture.appendChild(img);
    elem.appendChild(picture);
  };
  var proxyLoad = function proxyLoad(e) {
    if (!e.target._lazybgset) {
      return;
    }
    var image = e.target;
    var elem = image._lazybgset;
    var bg = image.currentSrc || image.src;
    if (bg) {
      var useSrc = regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg;
      var event = lazySizes.fire(elem, 'bgsetproxy', {
        src: bg,
        useSrc: useSrc,
        fullSrc: null
      });
      if (!event.defaultPrevented) {
        elem.style.backgroundImage = event.detail.fullSrc || 'url(' + event.detail.useSrc + ')';
      }
    }
    if (image._lazybgsetLoading) {
      lazySizes.fire(elem, '_lazyloaded', {}, false, true);
      delete image._lazybgsetLoading;
    }
  };
  addEventListener('lazybeforeunveil', function (e) {
    var set, image, elem;
    if (e.defaultPrevented || !(set = e.target.getAttribute('data-bgset'))) {
      return;
    }
    elem = e.target;
    image = document.createElement('img');
    image.alt = '';
    image._lazybgsetLoading = true;
    e.detail.firesLoad = true;
    createPicture(set, elem, image);
    setTimeout(function () {
      lazySizes.loader.unveil(image);
      lazySizes.rAF(function () {
        lazySizes.fire(image, '_lazyloaded', {}, true, true);
        if (image.complete) {
          proxyLoad({
            target: image
          });
        }
      });
    });
  });
  document.addEventListener('load', proxyLoad, true);
  window.addEventListener('lazybeforesizes', function (e) {
    if (e.detail.instance != lazySizes) {
      return;
    }
    if (e.target._lazybgset && e.detail.dataAttr) {
      var elem = e.target._lazybgset;
      var bgSize = getBgSize(elem);
      if (allowedBackgroundSize[bgSize]) {
        e.target._lazysizesParentFit = bgSize;
        lazySizes.rAF(function () {
          e.target.setAttribute('data-parent-fit', bgSize);
          if (e.target._lazysizesParentFit) {
            delete e.target._lazysizesParentFit;
          }
        });
      }
    }
  }, true);
  document.documentElement.addEventListener('lazybeforesizes', function (e) {
    if (e.defaultPrevented || !e.target._lazybgset || e.detail.instance != lazySizes) {
      return;
    }
    e.detail.width = proxyWidth(e.target._lazybgset);
  });
});

},{"lazysizes":5}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (window, factory) {
  if (!window) {
    return;
  }
  var globalInstall = function globalInstall() {
    factory(window.lazySizes);
    window.removeEventListener('lazyunveilread', globalInstall, true);
  };
  factory = factory.bind(null, window, window.document);
  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module.exports) {
    factory(require('lazysizes'));
  } else if (typeof define == 'function' && define.amd) {
    define(['lazysizes'], factory);
  } else if (window.lazySizes) {
    globalInstall();
  } else {
    window.addEventListener('lazyunveilread', globalInstall, true);
  }
})(typeof window != 'undefined' ? window : 0, function (window, document, lazySizes) {
  'use strict';

  if (!window.addEventListener) {
    return;
  }
  var regDescriptors = /\s+(\d+)(w|h)\s+(\d+)(w|h)/;
  var regCssFit = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/;
  var regCssObject = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/;
  var regPicture = /^picture$/i;
  var cfg = lazySizes.cfg;
  var getCSS = function getCSS(elem) {
    return getComputedStyle(elem, null) || {};
  };
  var parentFit = {
    getParent: function getParent(element, parentSel) {
      var parent = element;
      var parentNode = element.parentNode;
      if ((!parentSel || parentSel == 'prev') && parentNode && regPicture.test(parentNode.nodeName || '')) {
        parentNode = parentNode.parentNode;
      }
      if (parentSel != 'self') {
        if (parentSel == 'prev') {
          parent = element.previousElementSibling;
        } else if (parentSel && (parentNode.closest || window.jQuery)) {
          parent = (parentNode.closest ? parentNode.closest(parentSel) : jQuery(parentNode).closest(parentSel)[0]) || parentNode;
        } else {
          parent = parentNode;
        }
      }
      return parent;
    },
    getFit: function getFit(element) {
      var tmpMatch, parentObj;
      var css = getCSS(element);
      var content = css.content || css.fontFamily;
      var obj = {
        fit: element._lazysizesParentFit || element.getAttribute('data-parent-fit')
      };
      if (!obj.fit && content && (tmpMatch = content.match(regCssFit))) {
        obj.fit = tmpMatch[1];
      }
      if (obj.fit) {
        parentObj = element._lazysizesParentContainer || element.getAttribute('data-parent-container');
        if (!parentObj && content && (tmpMatch = content.match(regCssObject))) {
          parentObj = tmpMatch[1];
        }
        obj.parent = parentFit.getParent(element, parentObj);
      } else {
        obj.fit = css.objectFit;
      }
      return obj;
    },
    getImageRatio: function getImageRatio(element) {
      var i, srcset, media, ratio, match, width, height;
      var parent = element.parentNode;
      var elements = parent && regPicture.test(parent.nodeName || '') ? parent.querySelectorAll('source, img') : [element];
      for (i = 0; i < elements.length; i++) {
        element = elements[i];
        srcset = element.getAttribute(cfg.srcsetAttr) || element.getAttribute('srcset') || element.getAttribute('data-pfsrcset') || element.getAttribute('data-risrcset') || '';
        media = element._lsMedia || element.getAttribute('media');
        media = cfg.customMedia[element.getAttribute('data-media') || media] || media;
        if (srcset && (!media || (window.matchMedia && matchMedia(media) || {}).matches)) {
          ratio = parseFloat(element.getAttribute('data-aspectratio'));
          if (!ratio) {
            match = srcset.match(regDescriptors);
            if (match) {
              if (match[2] == 'w') {
                width = match[1];
                height = match[3];
              } else {
                width = match[3];
                height = match[1];
              }
            } else {
              width = element.getAttribute('width');
              height = element.getAttribute('height');
            }
            ratio = width / height;
          }
          break;
        }
      }
      return ratio;
    },
    calculateSize: function calculateSize(element, width) {
      var displayRatio, height, imageRatio, retWidth;
      var fitObj = this.getFit(element);
      var fit = fitObj.fit;
      var fitElem = fitObj.parent;
      if (fit != 'width' && (fit != 'contain' && fit != 'cover' || !(imageRatio = this.getImageRatio(element)))) {
        return width;
      }
      if (fitElem) {
        width = fitElem.clientWidth;
      } else {
        fitElem = element;
      }
      retWidth = width;
      if (fit == 'width') {
        retWidth = width;
      } else {
        height = fitElem.clientHeight;
        if ((displayRatio = width / height) && (fit == 'cover' && displayRatio < imageRatio || fit == 'contain' && displayRatio > imageRatio)) {
          retWidth = width * (imageRatio / displayRatio);
        }
      }
      return retWidth;
    }
  };
  lazySizes.parentFit = parentFit;
  document.addEventListener('lazybeforesizes', function (e) {
    if (e.defaultPrevented || e.detail.instance != lazySizes) {
      return;
    }
    var element = e.target;
    e.detail.width = parentFit.calculateSize(element, e.detail.width);
  });
});

},{"lazysizes":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = extend;
exports.getDocument = getDocument;
exports.getWindow = getWindow;
exports.ssrWindow = exports.ssrDocument = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */
/* eslint-disable no-param-reassign */
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object' && 'constructor' in obj && obj.constructor === Object;
}
function extend() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Object.keys(src).forEach(function (key) {
    if (typeof target[key] === 'undefined') target[key] = src[key];else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    }
  });
}
var ssrDocument = {
  body: {},
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  activeElement: {
    blur: function blur() {},
    nodeName: ''
  },
  querySelector: function querySelector() {
    return null;
  },
  querySelectorAll: function querySelectorAll() {
    return [];
  },
  getElementById: function getElementById() {
    return null;
  },
  createEvent: function createEvent() {
    return {
      initEvent: function initEvent() {}
    };
  },
  createElement: function createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute: function setAttribute() {},
      getElementsByTagName: function getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS: function createElementNS() {
    return {};
  },
  importNode: function importNode() {
    return null;
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  }
};
exports.ssrDocument = ssrDocument;
function getDocument() {
  var doc = typeof document !== 'undefined' ? document : {};
  extend(doc, ssrDocument);
  return doc;
}
var ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ''
  },
  location: {
    hash: '',
    host: '',
    hostname: '',
    href: '',
    origin: '',
    pathname: '',
    protocol: '',
    search: ''
  },
  history: {
    replaceState: function replaceState() {},
    pushState: function pushState() {},
    go: function go() {},
    back: function back() {}
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  getComputedStyle: function getComputedStyle() {
    return {
      getPropertyValue: function getPropertyValue() {
        return '';
      }
    };
  },
  Image: function Image() {},
  Date: function Date() {},
  screen: {},
  setTimeout: function setTimeout() {},
  clearTimeout: function clearTimeout() {},
  matchMedia: function matchMedia() {
    return {};
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (typeof setTimeout === 'undefined') {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (typeof setTimeout === 'undefined') {
      return;
    }
    clearTimeout(id);
  }
};
exports.ssrWindow = ssrWindow;
function getWindow() {
  var win = typeof window !== 'undefined' ? window : {};
  extend(win, ssrWindow);
  return win;
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getBreakpoint;
var _ssrWindow = require("ssr-window");
function getBreakpoint(breakpoints) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'window';
  var containerEl = arguments.length > 2 ? arguments[2] : undefined;
  if (!breakpoints || base === 'container' && !containerEl) return undefined;
  var breakpoint = false;
  var window = (0, _ssrWindow.getWindow)();
  var currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
  var points = Object.keys(breakpoints).map(function (point) {
    if (typeof point === 'string' && point.indexOf('@') === 0) {
      var minRatio = parseFloat(point.substr(1));
      var value = currentHeight * minRatio;
      return {
        value: value,
        point: point
      };
    }
    return {
      value: point,
      point: point
    };
  });
  points.sort(function (a, b) {
    return parseInt(a.value, 10) - parseInt(b.value, 10);
  });
  for (var i = 0; i < points.length; i += 1) {
    var _points$i = points[i],
      point = _points$i.point,
      value = _points$i.value;
    if (base === 'window') {
      if (window.matchMedia("(min-width: ".concat(value, "px)")).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}

},{"ssr-window":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setBreakpoint = _interopRequireDefault(require("./setBreakpoint.js"));
var _getBreakpoint = _interopRequireDefault(require("./getBreakpoint.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  setBreakpoint: _setBreakpoint["default"],
  getBreakpoint: _getBreakpoint["default"]
};
exports["default"] = _default;

},{"./getBreakpoint.js":9,"./setBreakpoint.js":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setBreakpoint;
var _utils = require("../../shared/utils.js");
var isGridEnabled = function isGridEnabled(swiper, params) {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  var swiper = this;
  var realIndex = swiper.realIndex,
    initialized = swiper.initialized,
    params = swiper.params,
    el = swiper.el;
  var breakpoints = params.breakpoints;
  if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;

  // Get breakpoint for window width and update parameters
  var breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
  var breakpointParams = breakpointOnlyParams || swiper.originalParams;
  var wasMultiRow = isGridEnabled(swiper, params);
  var isMultiRow = isGridEnabled(swiper, breakpointParams);
  var wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el.classList.remove("".concat(params.containerModifierClass, "grid"), "".concat(params.containerModifierClass, "grid-column"));
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add("".concat(params.containerModifierClass, "grid"));
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column' || !breakpointParams.grid.fill && params.grid.fill === 'column') {
      el.classList.add("".concat(params.containerModifierClass, "grid-column"));
    }
    swiper.emitContainerClasses();
  }

  // Toggle navigation, pagination, scrollbar
  ['navigation', 'pagination', 'scrollbar'].forEach(function (prop) {
    var wasModuleEnabled = params[prop] && params[prop].enabled;
    var isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  (0, _utils.extend)(swiper.params, breakpointParams);
  var isEnabled = swiper.params.enabled;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit('_beforeBreakpoint', breakpointParams);
  if (needsReLoop && initialized) {
    swiper.loopDestroy();
    swiper.loopCreate(realIndex);
    swiper.updateSlides();
  }
  swiper.emit('breakpoint', breakpointParams);
}

},{"../../shared/utils.js":104}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function checkOverflow() {
  var swiper = this;
  var wasLocked = swiper.isLocked,
    params = swiper.params;
  var slidesOffsetBefore = params.slidesOffsetBefore;
  if (slidesOffsetBefore) {
    var lastSlideIndex = swiper.slides.length - 1;
    var lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}
var _default = {
  checkOverflow: checkOverflow
};
exports["default"] = _default;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addClasses;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function prepareClasses(entries, prefix) {
  var resultClasses = [];
  entries.forEach(function (item) {
    if (_typeof(item) === 'object') {
      Object.keys(item).forEach(function (classNames) {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === 'string') {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  var _el$classList;
  var swiper = this;
  var classNames = swiper.classNames,
    params = swiper.params,
    rtl = swiper.rtl,
    el = swiper.el,
    device = swiper.device;
  // prettier-ignore
  var suffixes = prepareClasses(['initialized', params.direction, {
    'free-mode': swiper.params.freeMode && params.freeMode.enabled
  }, {
    'autoheight': params.autoHeight
  }, {
    'rtl': rtl
  }, {
    'grid': params.grid && params.grid.rows > 1
  }, {
    'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column'
  }, {
    'android': device.android
  }, {
    'ios': device.ios
  }, {
    'css-mode': params.cssMode
  }, {
    'centered': params.cssMode && params.centeredSlides
  }, {
    'watch-progress': params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push.apply(classNames, _toConsumableArray(suffixes));
  (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(classNames));
  swiper.emitContainerClasses();
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _addClasses = _interopRequireDefault(require("./addClasses.js"));
var _removeClasses = _interopRequireDefault(require("./removeClasses.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  addClasses: _addClasses["default"],
  removeClasses: _removeClasses["default"]
};
exports["default"] = _default;

},{"./addClasses.js":13,"./removeClasses.js":15}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeClasses;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function removeClasses() {
  var _el$classList;
  var swiper = this;
  var el = swiper.el,
    classNames = swiper.classNames;
  (_el$classList = el.classList).remove.apply(_el$classList, _toConsumableArray(classNames));
  swiper.emitContainerClasses();
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ssrWindow = require("ssr-window");
var _utils = require("../shared/utils.js");
var _getSupport = require("../shared/get-support.js");
var _getDevice = require("../shared/get-device.js");
var _getBrowser = require("../shared/get-browser.js");
var _resize = _interopRequireDefault(require("./modules/resize/resize.js"));
var _observer = _interopRequireDefault(require("./modules/observer/observer.js"));
var _eventsEmitter = _interopRequireDefault(require("./events-emitter.js"));
var _index = _interopRequireDefault(require("./update/index.js"));
var _index2 = _interopRequireDefault(require("./translate/index.js"));
var _index3 = _interopRequireDefault(require("./transition/index.js"));
var _index4 = _interopRequireDefault(require("./slide/index.js"));
var _index5 = _interopRequireDefault(require("./loop/index.js"));
var _index6 = _interopRequireDefault(require("./grab-cursor/index.js"));
var _index7 = _interopRequireDefault(require("./events/index.js"));
var _index8 = _interopRequireDefault(require("./breakpoints/index.js"));
var _index9 = _interopRequireDefault(require("./classes/index.js"));
var _index10 = _interopRequireDefault(require("./check-overflow/index.js"));
var _defaults = _interopRequireDefault(require("./defaults.js"));
var _moduleExtendParams = _interopRequireDefault(require("./moduleExtendParams.js"));
var _processLazyPreloader = require("../shared/process-lazy-preloader.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* eslint no-param-reassign: "off" */
var prototypes = {
  eventsEmitter: _eventsEmitter["default"],
  update: _index["default"],
  translate: _index2["default"],
  transition: _index3["default"],
  slide: _index4["default"],
  loop: _index5["default"],
  grabCursor: _index6["default"],
  events: _index7["default"],
  breakpoints: _index8["default"],
  checkOverflow: _index10["default"],
  classes: _index9["default"]
};
var extendedDefaults = {};
var Swiper = /*#__PURE__*/function () {
  function Swiper() {
    _classCallCheck(this, Swiper);
    var el;
    var params;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object') {
      params = args[0];
    } else {
      el = args[0];
      params = args[1];
    }
    if (!params) params = {};
    params = (0, _utils.extend)({}, params);
    if (el && !params.el) params.el = el;
    var document = (0, _ssrWindow.getDocument)();
    if (params.el && typeof params.el === 'string' && document.querySelectorAll(params.el).length > 1) {
      var swipers = [];
      document.querySelectorAll(params.el).forEach(function (containerEl) {
        var newParams = (0, _utils.extend)({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      // eslint-disable-next-line no-constructor-return
      return swipers;
    }

    // Swiper Instance
    var swiper = this;
    swiper.__swiper__ = true;
    swiper.support = (0, _getSupport.getSupport)();
    swiper.device = (0, _getDevice.getDevice)({
      userAgent: params.userAgent
    });
    swiper.browser = (0, _getBrowser.getBrowser)();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = _toConsumableArray(swiper.__modules__);
    if (params.modules && Array.isArray(params.modules)) {
      var _swiper$modules;
      (_swiper$modules = swiper.modules).push.apply(_swiper$modules, _toConsumableArray(params.modules));
    }
    var allModulesParams = {};
    swiper.modules.forEach(function (mod) {
      mod({
        params: params,
        swiper: swiper,
        extendParams: (0, _moduleExtendParams["default"])(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });

    // Extend defaults with modules params
    var swiperParams = (0, _utils.extend)({}, _defaults["default"], allModulesParams);

    // Extend defaults with passed params
    swiper.params = (0, _utils.extend)({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = (0, _utils.extend)({}, swiper.params);
    swiper.passedParams = (0, _utils.extend)({}, params);

    // add event listeners
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach(function (eventName) {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }

    // Extend Swiper
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el: el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment: function cssOverflowAdjustment() {
        // Returns 0 unless `translate` is > 2**23
        // Should be subtracted from css values to prevent overflow
        return Math.trunc(this.translate / Math.pow(2, 23)) * Math.pow(2, 23);
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        startMoving: undefined,
        evCache: []
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit('_swiper');

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    // eslint-disable-next-line no-constructor-return
    return swiper;
  }
  _createClass(Swiper, [{
    key: "getSlideIndex",
    value: function getSlideIndex(slideEl) {
      var slidesEl = this.slidesEl,
        params = this.params;
      var slides = (0, _utils.elementChildren)(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
      var firstSlideIndex = (0, _utils.elementIndex)(slides[0]);
      return (0, _utils.elementIndex)(slideEl) - firstSlideIndex;
    }
  }, {
    key: "getSlideIndexByData",
    value: function getSlideIndexByData(index) {
      return this.getSlideIndex(this.slides.filter(function (slideEl) {
        return slideEl.getAttribute('data-swiper-slide-index') * 1 === index;
      })[0]);
    }
  }, {
    key: "recalcSlides",
    value: function recalcSlides() {
      var swiper = this;
      var slidesEl = swiper.slidesEl,
        params = swiper.params;
      swiper.slides = (0, _utils.elementChildren)(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
    }
  }, {
    key: "enable",
    value: function enable() {
      var swiper = this;
      if (swiper.enabled) return;
      swiper.enabled = true;
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }
      swiper.emit('enable');
    }
  }, {
    key: "disable",
    value: function disable() {
      var swiper = this;
      if (!swiper.enabled) return;
      swiper.enabled = false;
      if (swiper.params.grabCursor) {
        swiper.unsetGrabCursor();
      }
      swiper.emit('disable');
    }
  }, {
    key: "setProgress",
    value: function setProgress(progress, speed) {
      var swiper = this;
      progress = Math.min(Math.max(progress, 0), 1);
      var min = swiper.minTranslate();
      var max = swiper.maxTranslate();
      var current = (max - min) * progress + min;
      swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }, {
    key: "emitContainerClasses",
    value: function emitContainerClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var cls = swiper.el.className.split(' ').filter(function (className) {
        return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
      });
      swiper.emit('_containerClasses', cls.join(' '));
    }
  }, {
    key: "getSlideClasses",
    value: function getSlideClasses(slideEl) {
      var swiper = this;
      if (swiper.destroyed) return '';
      return slideEl.className.split(' ').filter(function (className) {
        return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
      }).join(' ');
    }
  }, {
    key: "emitSlidesClasses",
    value: function emitSlidesClasses() {
      var swiper = this;
      if (!swiper.params._emitClasses || !swiper.el) return;
      var updates = [];
      swiper.slides.forEach(function (slideEl) {
        var classNames = swiper.getSlideClasses(slideEl);
        updates.push({
          slideEl: slideEl,
          classNames: classNames
        });
        swiper.emit('_slideClass', slideEl, classNames);
      });
      swiper.emit('_slideClasses', updates);
    }
  }, {
    key: "slidesPerViewDynamic",
    value: function slidesPerViewDynamic() {
      var view = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
      var exact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var swiper = this;
      var params = swiper.params,
        slides = swiper.slides,
        slidesGrid = swiper.slidesGrid,
        slidesSizesGrid = swiper.slidesSizesGrid,
        swiperSize = swiper.size,
        activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
        for (var _i = activeIndex - 1; _i >= 0; _i -= 1) {
          if (slides[_i] && !breakLoop) {
            slideSize += slides[_i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) breakLoop = true;
          }
        }
      } else {
        // eslint-disable-next-line
        if (view === 'current') {
          for (var _i2 = activeIndex + 1; _i2 < slides.length; _i2 += 1) {
            var slideInView = exact ? slidesGrid[_i2] + slidesSizesGrid[_i2] - slidesGrid[activeIndex] < swiperSize : slidesGrid[_i2] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          // previous
          for (var _i3 = activeIndex - 1; _i3 >= 0; _i3 -= 1) {
            var _slideInView = slidesGrid[activeIndex] - slidesGrid[_i3] < swiperSize;
            if (_slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
  }, {
    key: "update",
    value: function update() {
      var swiper = this;
      if (!swiper || swiper.destroyed) return;
      var snapGrid = swiper.snapGrid,
        params = swiper.params;
      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      _toConsumableArray(swiper.el.querySelectorAll('[loading="lazy"]')).forEach(function (imageEl) {
        if (imageEl.complete) {
          (0, _processLazyPreloader.processLazyPreloader)(swiper, imageEl);
        }
      });
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      var translated;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
        setTranslate();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          var slides = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
          translated = swiper.slideTo(slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit('update');
    }
  }, {
    key: "changeDirection",
    value: function changeDirection(newDirection) {
      var needUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var swiper = this;
      var currentDirection = swiper.params.direction;
      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      if (newDirection === currentDirection || newDirection !== 'horizontal' && newDirection !== 'vertical') {
        return swiper;
      }
      swiper.el.classList.remove("".concat(swiper.params.containerModifierClass).concat(currentDirection));
      swiper.el.classList.add("".concat(swiper.params.containerModifierClass).concat(newDirection));
      swiper.emitContainerClasses();
      swiper.params.direction = newDirection;
      swiper.slides.forEach(function (slideEl) {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });
      swiper.emit('changeDirection');
      if (needUpdate) swiper.update();
      return swiper;
    }
  }, {
    key: "changeLanguageDirection",
    value: function changeLanguageDirection(direction) {
      var swiper = this;
      if (swiper.rtl && direction === 'rtl' || !swiper.rtl && direction === 'ltr') return;
      swiper.rtl = direction === 'rtl';
      swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;
      if (swiper.rtl) {
        swiper.el.classList.add("".concat(swiper.params.containerModifierClass, "rtl"));
        swiper.el.dir = 'rtl';
      } else {
        swiper.el.classList.remove("".concat(swiper.params.containerModifierClass, "rtl"));
        swiper.el.dir = 'ltr';
      }
      swiper.update();
    }
  }, {
    key: "mount",
    value: function mount(element) {
      var swiper = this;
      if (swiper.mounted) return true;

      // Find el
      var el = element || swiper.params.el;
      if (typeof el === 'string') {
        el = document.querySelector(el);
      }
      if (!el) {
        return false;
      }
      el.swiper = swiper;
      if (el.shadowEl) {
        swiper.isElement = true;
      }
      var getWrapperSelector = function getWrapperSelector() {
        return ".".concat((swiper.params.wrapperClass || '').trim().split(' ').join('.'));
      };
      var getWrapper = function getWrapper() {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          var res = el.shadowRoot.querySelector(getWrapperSelector());
          // Children needs to return slot items
          return res;
        }
        return (0, _utils.elementChildren)(el, getWrapperSelector())[0];
      };
      // Find Wrapper
      var wrapperEl = getWrapper();
      if (!wrapperEl && swiper.params.createElements) {
        wrapperEl = (0, _utils.createElement)('div', swiper.params.wrapperClass);
        el.append(wrapperEl);
        (0, _utils.elementChildren)(el, ".".concat(swiper.params.slideClass)).forEach(function (slideEl) {
          wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper, {
        el: el,
        wrapperEl: wrapperEl,
        slidesEl: swiper.isElement ? el : wrapperEl,
        mounted: true,
        // RTL
        rtl: el.dir.toLowerCase() === 'rtl' || (0, _utils.elementStyle)(el, 'direction') === 'rtl',
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || (0, _utils.elementStyle)(el, 'direction') === 'rtl'),
        wrongRTL: (0, _utils.elementStyle)(wrapperEl, 'display') === '-webkit-box'
      });
      return true;
    }
  }, {
    key: "init",
    value: function init(el) {
      var swiper = this;
      if (swiper.initialized) return swiper;
      var mounted = swiper.mount(el);
      if (mounted === false) return swiper;
      swiper.emit('beforeInit');

      // Set breakpoint
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Add Classes
      swiper.addClasses();

      // Update size
      swiper.updateSize();

      // Update slides
      swiper.updateSlides();
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      // Set Grab Cursor
      if (swiper.params.grabCursor && swiper.enabled) {
        swiper.setGrabCursor();
      }

      // Slide To Initial Slide
      if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
        swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
      }

      // Create loop
      if (swiper.params.loop) {
        swiper.loopCreate();
      }

      // Attach events
      swiper.attachEvents();
      _toConsumableArray(swiper.el.querySelectorAll('[loading="lazy"]')).forEach(function (imageEl) {
        if (imageEl.complete) {
          (0, _processLazyPreloader.processLazyPreloader)(swiper, imageEl);
        } else {
          imageEl.addEventListener('load', function (e) {
            (0, _processLazyPreloader.processLazyPreloader)(swiper, e.target);
          });
        }
      });
      (0, _processLazyPreloader.preload)(swiper);

      // Init Flag
      swiper.initialized = true;
      (0, _processLazyPreloader.preload)(swiper);

      // Emit
      swiper.emit('init');
      swiper.emit('afterInit');
      return swiper;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var deleteInstance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var cleanStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var swiper = this;
      var params = swiper.params,
        el = swiper.el,
        wrapperEl = swiper.wrapperEl,
        slides = swiper.slides;
      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }
      swiper.emit('beforeDestroy');

      // Init Flag
      swiper.initialized = false;

      // Detach events
      swiper.detachEvents();

      // Destroy loop
      if (params.loop) {
        swiper.loopDestroy();
      }

      // Cleanup styles
      if (cleanStyles) {
        swiper.removeClasses();
        el.removeAttribute('style');
        wrapperEl.removeAttribute('style');
        if (slides && slides.length) {
          slides.forEach(function (slideEl) {
            slideEl.classList.remove(params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
            slideEl.removeAttribute('style');
            slideEl.removeAttribute('data-swiper-slide-index');
          });
        }
      }
      swiper.emit('destroy');

      // Detach emitter events
      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });
      if (deleteInstance !== false) {
        swiper.el.swiper = null;
        (0, _utils.deleteProps)(swiper);
      }
      swiper.destroyed = true;
      return null;
    }
  }], [{
    key: "extendDefaults",
    value: function extendDefaults(newDefaults) {
      (0, _utils.extend)(extendedDefaults, newDefaults);
    }
  }, {
    key: "extendedDefaults",
    get: function get() {
      return extendedDefaults;
    }
  }, {
    key: "defaults",
    get: function get() {
      return _defaults["default"];
    }
  }, {
    key: "installModule",
    value: function installModule(mod) {
      if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
      var modules = Swiper.prototype.__modules__;
      if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
  }, {
    key: "use",
    value: function use(module) {
      if (Array.isArray(module)) {
        module.forEach(function (m) {
          return Swiper.installModule(m);
        });
        return Swiper;
      }
      Swiper.installModule(module);
      return Swiper;
    }
  }]);
  return Swiper;
}();
Object.keys(prototypes).forEach(function (prototypeGroup) {
  Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([_resize["default"], _observer["default"]]);
var _default = Swiper;
exports["default"] = _default;

},{"../shared/get-browser.js":100,"../shared/get-device.js":101,"../shared/get-support.js":102,"../shared/process-lazy-preloader.js":103,"../shared/utils.js":104,"./breakpoints/index.js":10,"./check-overflow/index.js":12,"./classes/index.js":14,"./defaults.js":17,"./events-emitter.js":18,"./events/index.js":19,"./grab-cursor/index.js":27,"./loop/index.js":30,"./moduleExtendParams.js":34,"./modules/observer/observer.js":35,"./modules/resize/resize.js":36,"./slide/index.js":37,"./transition/index.js":45,"./translate/index.js":51,"./update/index.js":56,"ssr-window":8}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  init: true,
  direction: 'horizontal',
  oneWayMovement: false,
  touchEventsTarget: 'wrapper',
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  enabled: true,
  focusableElements: 'input, select, option, textarea, button, video, label',
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: 'slide',
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,
  breakpointsBase: 'window',
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopedSlides: null,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: 'swiper-',
  // NEW
  slideClass: 'swiper-slide',
  slideActiveClass: 'swiper-slide-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideNextClass: 'swiper-slide-next',
  slidePrevClass: 'swiper-slide-prev',
  wrapperClass: 'swiper-wrapper',
  lazyPreloaderClass: 'swiper-lazy-preloader',
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};
exports["default"] = _default;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* eslint-disable no-underscore-dangle */
var _default = {
  on: function on(events, handler, priority) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once: function once(events, handler, priority) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    function onceHandler() {
      self.off(events, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events, onceHandler, priority);
  },
  onAny: function onAny(handler, priority) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== 'function') return self;
    var method = priority ? 'unshift' : 'push';
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny: function offAny(handler) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    var index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off: function off(events, handler) {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit: function emit() {
    var self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    var events;
    var data;
    var context;
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach(function (eventHandler) {
          eventHandler.apply(context, [event].concat(_toConsumableArray(data)));
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
exports["default"] = _default;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ssrWindow = require("ssr-window");
var _onTouchStart = _interopRequireDefault(require("./onTouchStart.js"));
var _onTouchMove = _interopRequireDefault(require("./onTouchMove.js"));
var _onTouchEnd = _interopRequireDefault(require("./onTouchEnd.js"));
var _onResize = _interopRequireDefault(require("./onResize.js"));
var _onClick = _interopRequireDefault(require("./onClick.js"));
var _onScroll = _interopRequireDefault(require("./onScroll.js"));
var _onLoad = _interopRequireDefault(require("./onLoad.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var dummyEventAttached = false;
function dummyEventListener() {}
var events = function events(swiper, method) {
  var document = (0, _ssrWindow.getDocument)();
  var params = swiper.params,
    el = swiper.el,
    wrapperEl = swiper.wrapperEl,
    device = swiper.device;
  var capture = !!params.nested;
  var domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
  var swiperMethod = method;

  // Touch Events
  el[domMethod]('pointerdown', swiper.onTouchStart, {
    passive: false
  });
  document[domMethod]('pointermove', swiper.onTouchMove, {
    passive: false,
    capture: capture
  });
  document[domMethod]('pointerup', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointercancel', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerout', swiper.onTouchEnd, {
    passive: true
  });
  document[domMethod]('pointerleave', swiper.onTouchEnd, {
    passive: true
  });

  // Prevent Links Clicks
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]('click', swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]('scroll', swiper.onScroll);
  }

  // Resize handler
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', _onResize["default"], true);
  } else {
    swiper[swiperMethod]('observerUpdate', _onResize["default"], true);
  }

  // Images loader
  el[domMethod]('load', swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  var swiper = this;
  var document = (0, _ssrWindow.getDocument)();
  var params = swiper.params;
  swiper.onTouchStart = _onTouchStart["default"].bind(swiper);
  swiper.onTouchMove = _onTouchMove["default"].bind(swiper);
  swiper.onTouchEnd = _onTouchEnd["default"].bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = _onScroll["default"].bind(swiper);
  }
  swiper.onClick = _onClick["default"].bind(swiper);
  swiper.onLoad = _onLoad["default"].bind(swiper);
  if (!dummyEventAttached) {
    document.addEventListener('touchstart', dummyEventListener);
    dummyEventAttached = true;
  }
  events(swiper, 'on');
}
function detachEvents() {
  var swiper = this;
  events(swiper, 'off');
}
var _default = {
  attachEvents: attachEvents,
  detachEvents: detachEvents
};
exports["default"] = _default;

},{"./onClick.js":20,"./onLoad.js":21,"./onResize.js":22,"./onScroll.js":23,"./onTouchEnd.js":24,"./onTouchMove.js":25,"./onTouchStart.js":26,"ssr-window":8}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onClick;
function onClick(e) {
  var swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onLoad;
var _processLazyPreloader = require("../../shared/process-lazy-preloader.js");
function onLoad(e) {
  var swiper = this;
  (0, _processLazyPreloader.processLazyPreloader)(swiper, e.target);
  swiper.update();
}

},{"../../shared/process-lazy-preloader.js":103}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onResize;
function onResize() {
  var swiper = this;
  var params = swiper.params,
    el = swiper.el;
  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  var allowSlideNext = swiper.allowSlideNext,
    allowSlidePrev = swiper.allowSlidePrev,
    snapGrid = swiper.snapGrid;
  var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  var isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(function () {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onScroll;
function onScroll() {
  var swiper = this;
  var wrapperEl = swiper.wrapperEl,
    rtlTranslate = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  // eslint-disable-next-line
  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit('setTranslate', swiper.translate, false);
}

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onTouchEnd;
var _utils = require("../../shared/utils.js");
function onTouchEnd(event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var pointerIndex = data.evCache.findIndex(function (cachedEv) {
    return cachedEv.pointerId === event.pointerId;
  });
  if (pointerIndex >= 0) {
    data.evCache.splice(pointerIndex, 1);
  }
  if (['pointercancel', 'pointerout', 'pointerleave'].includes(event.type)) {
    var proceed = event.type === 'pointercancel' && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  var params = swiper.params,
    touches = swiper.touches,
    rtl = swiper.rtlTranslate,
    slidesGrid = swiper.slidesGrid,
    enabled = swiper.enabled;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  var touchEndTime = (0, _utils.now)();
  var timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    var pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
    swiper.emit('tap click', e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit('doubleTap doubleClick', e);
    }
  }
  data.lastClickTime = (0, _utils.now)();
  (0, _utils.nextTick)(function () {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  var currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (swiper.params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos: currentPos
    });
    return;
  }

  // Find current slide
  var stopIndex = 0;
  var groupSize = swiper.slidesSizesGrid[0];
  for (var i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    var _increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + _increment] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + _increment]) {
        stopIndex = i;
        groupSize = slidesGrid[i + _increment] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  var rewindFirstIndex = null;
  var rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  // Find current slide size
  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  var increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}

},{"../../shared/utils.js":104}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onTouchMove;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function onTouchMove(event) {
  var document = (0, _ssrWindow.getDocument)();
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params,
    touches = swiper.touches,
    rtl = swiper.rtlTranslate,
    enabled = swiper.enabled;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    return;
  }
  var pointerIndex = data.evCache.findIndex(function (cachedEv) {
    return cachedEv.pointerId === e.pointerId;
  });
  if (pointerIndex >= 0) data.evCache[pointerIndex] = e;
  var targetTouch = data.evCache.length > 1 ? data.evCache[0] : e;
  var pageX = targetTouch.pageX;
  var pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        prevX: swiper.touches.currentX,
        prevY: swiper.touches.currentY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = (0, _utils.now)();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
      return;
    }
  }
  if (document.activeElement) {
    if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  if (e.targetTouches && e.targetTouches.length > 1) return;
  touches.currentX = pageX;
  touches.currentY = pageY;
  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)) < swiper.params.threshold) return;
  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof data.startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || swiper.zoom && swiper.params.zoom && swiper.params.zoom.enabled && data.evCache.length > 1) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  var diff = swiper.isHorizontal() ? diffX : diffY;
  var touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  var prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  swiper.touchesDirection = touchesDiff > 0 ? 'prev' : 'next';
  var isLoop = swiper.params.loop && !params.cssMode;
  if (!data.isMoved) {
    if (isLoop) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      var evt = new window.CustomEvent('transitionend', {
        bubbles: true,
        cancelable: true
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  var loopFixed;
  if (data.isMoved && prevTouchesDirection !== swiper.touchesDirection && isLoop && Math.abs(diff) >= 1) {
    // need another loop fix
    swiper.loopFix({
      direction: swiper.swipeDirection,
      setTranslate: true
    });
    loopFixed = true;
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && !loopFixed && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.size / 2 : swiper.minTranslate())) {
      swiper.loopFix({
        direction: 'prev',
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
      }
    }
  } else if (diff < 0) {
    if (isLoop && !loopFixed && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.size / 2 : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: 'next',
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }

  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;

  // Update active index in free mode
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
}

},{"../../shared/utils.js":104,"ssr-window":8}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onTouchStart;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
// Modified from https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
function closestElement(selector) {
  var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
  function __closestFrom(el) {
    if (!el || el === (0, _ssrWindow.getDocument)() || el === (0, _ssrWindow.getWindow)()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    var found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function onTouchStart(event) {
  var swiper = this;
  var document = (0, _ssrWindow.getDocument)();
  var window = (0, _ssrWindow.getWindow)();
  var data = swiper.touchEventsData;
  data.evCache.push(event);
  var params = swiper.params,
    touches = swiper.touches,
    enabled = swiper.enabled;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === 'mouse') return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  var e = event;
  if (e.originalEvent) e = e.originalEvent;
  var targetEl = e.target;
  if (params.touchEventsTarget === 'wrapper') {
    if (!swiper.wrapperEl.contains(targetEl)) return;
  }
  if ('which' in e && e.which === 3) return;
  if ('button' in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;

  // change target el for shadow root component
  var swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';
  // eslint-disable-next-line
  var eventPath = event.composedPath ? event.composedPath() : event.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  var noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : ".".concat(params.noSwipingClass);
  var isTargetShadow = !!(e.target && e.target.shadowRoot);

  // use closestElement for shadow root element to get the actual closest for nested shadow root element
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler)) return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

  var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
  var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === 'prevent') {
      event.preventDefault();
    } else {
      return;
    }
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = (0, _utils.now)();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) data.allowThresholdMove = false;
  var preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === 'SELECT') {
      data.isTouched = false;
    }
  }
  if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl) {
    document.activeElement.blur();
  }
  var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (swiper.params.freeMode && swiper.params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit('touchStart', e);
}

},{"../../shared/utils.js":104,"ssr-window":8}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setGrabCursor = _interopRequireDefault(require("./setGrabCursor.js"));
var _unsetGrabCursor = _interopRequireDefault(require("./unsetGrabCursor.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  setGrabCursor: _setGrabCursor["default"],
  unsetGrabCursor: _unsetGrabCursor["default"]
};
exports["default"] = _default;

},{"./setGrabCursor.js":28,"./unsetGrabCursor.js":29}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setGrabCursor;
function setGrabCursor(moving) {
  var swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  var el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = 'move';
  el.style.cursor = moving ? 'grabbing' : 'grab';
  if (swiper.isElement) {
    requestAnimationFrame(function () {
      swiper.__preventObserver__ = false;
    });
  }
}

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unsetGrabCursor;
function unsetGrabCursor() {
  var swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
  if (swiper.isElement) {
    requestAnimationFrame(function () {
      swiper.__preventObserver__ = false;
    });
  }
}

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _loopCreate = _interopRequireDefault(require("./loopCreate.js"));
var _loopFix = _interopRequireDefault(require("./loopFix.js"));
var _loopDestroy = _interopRequireDefault(require("./loopDestroy.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  loopCreate: _loopCreate["default"],
  loopFix: _loopFix["default"],
  loopDestroy: _loopDestroy["default"]
};
exports["default"] = _default;

},{"./loopCreate.js":31,"./loopDestroy.js":32,"./loopFix.js":33}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loopCreate;
var _utils = require("../../shared/utils.js");
function loopCreate(slideRealIndex) {
  var swiper = this;
  var params = swiper.params,
    slidesEl = swiper.slidesEl;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  var slides = (0, _utils.elementChildren)(slidesEl, ".".concat(params.slideClass, ", swiper-slide"));
  slides.forEach(function (el, index) {
    el.setAttribute('data-swiper-slide-index', index);
  });
  swiper.loopFix({
    slideRealIndex: slideRealIndex,
    direction: params.centeredSlides ? undefined : 'next'
  });
}

},{"../../shared/utils.js":104}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loopDestroy;
function loopDestroy() {
  var swiper = this;
  var params = swiper.params,
    slidesEl = swiper.slidesEl;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  var newSlidesOrder = [];
  swiper.slides.forEach(function (slideEl) {
    var index = typeof slideEl.swiperSlideIndex === 'undefined' ? slideEl.getAttribute('data-swiper-slide-index') * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach(function (slideEl) {
    slideEl.removeAttribute('data-swiper-slide-index');
  });
  newSlidesOrder.forEach(function (slideEl) {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loopFix;
function loopFix() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    slideRealIndex = _ref.slideRealIndex,
    _ref$slideTo = _ref.slideTo,
    slideTo = _ref$slideTo === void 0 ? true : _ref$slideTo,
    direction = _ref.direction,
    setTranslate = _ref.setTranslate,
    activeSlideIndex = _ref.activeSlideIndex,
    byController = _ref.byController,
    byMousewheel = _ref.byMousewheel;
  var swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit('beforeLoopFix');
  var slides = swiper.slides,
    allowSlidePrev = swiper.allowSlidePrev,
    allowSlideNext = swiper.allowSlideNext,
    slidesEl = swiper.slidesEl,
    params = swiper.params;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo) {
      if (!params.centeredSlides && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (params.centeredSlides && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
    return;
  }
  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10));
  var loopedSlides = params.loopedSlides || slidesPerView;
  if (loopedSlides % params.slidesPerGroup !== 0) {
    loopedSlides += params.slidesPerGroup - loopedSlides % params.slidesPerGroup;
  }
  swiper.loopedSlides = loopedSlides;
  var prependSlidesIndexes = [];
  var appendSlidesIndexes = [];
  var activeIndex = swiper.activeIndex;
  if (typeof activeSlideIndex === 'undefined') {
    activeSlideIndex = swiper.getSlideIndex(swiper.slides.filter(function (el) {
      return el.classList.contains(params.slideActiveClass);
    })[0]);
  } else {
    activeIndex = activeSlideIndex;
  }
  var isNext = direction === 'next' || !direction;
  var isPrev = direction === 'prev' || !direction;
  var slidesPrepended = 0;
  var slidesAppended = 0;
  // prepend last slides before start
  if (activeSlideIndex < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeSlideIndex, params.slidesPerGroup);
    for (var i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
      var index = i - Math.floor(i / slides.length) * slides.length;
      prependSlidesIndexes.push(slides.length - index - 1);
    }
  } else if (activeSlideIndex /* + slidesPerView */ > swiper.slides.length - loopedSlides * 2) {
    slidesAppended = Math.max(activeSlideIndex - (swiper.slides.length - loopedSlides * 2), params.slidesPerGroup);
    for (var _i = 0; _i < slidesAppended; _i += 1) {
      var _index = _i - Math.floor(_i / slides.length) * slides.length;
      appendSlidesIndexes.push(_index);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach(function (index) {
      slidesEl.prepend(swiper.slides[index]);
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach(function (index) {
      slidesEl.append(swiper.slides[index]);
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === 'auto') {
    swiper.updateSlides();
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === 'undefined') {
        var currentSlideTranslate = swiper.slidesGrid[activeIndex];
        var newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        var diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + slidesPrepended, 0, false, true);
          if (setTranslate) {
            swiper.touches[swiper.isHorizontal() ? 'startX' : 'startY'] += diff;
          }
        }
      } else {
        if (setTranslate) {
          swiper.slideToLoop(slideRealIndex, 0, false, true);
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === 'undefined') {
        var _currentSlideTranslate = swiper.slidesGrid[activeIndex];
        var _newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        var _diff = _newSlideTranslate - _currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - _diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate) {
            swiper.touches[swiper.isHorizontal() ? 'startX' : 'startY'] += _diff;
          }
        }
      } else {
        swiper.slideToLoop(slideRealIndex, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    var loopParams = {
      slideRealIndex: slideRealIndex,
      slideTo: false,
      direction: direction,
      setTranslate: setTranslate,
      activeSlideIndex: activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach(function (c) {
        if (!c.destroyed && c.params.loop) c.loopFix(loopParams);
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix(loopParams);
    }
  }
  swiper.emit('loopFix');
}

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = moduleExtendParams;
var _utils = require("../shared/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function moduleExtendParams(params, allModulesParams) {
  return function extendParams() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var moduleParamName = Object.keys(obj)[0];
    var moduleParams = obj[moduleParamName];
    if (_typeof(moduleParams) !== 'object' || moduleParams === null) {
      (0, _utils.extend)(allModulesParams, obj);
      return;
    }
    if (['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 && params[moduleParamName] === true) {
      params[moduleParamName] = {
        auto: true
      };
    }
    if (!(moduleParamName in params && 'enabled' in moduleParams)) {
      (0, _utils.extend)(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (_typeof(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    (0, _utils.extend)(allModulesParams, obj);
  };
}

},{"../shared/utils.js":104}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Observer;
var _ssrWindow = require("ssr-window");
var _utils = require("../../../shared/utils.js");
function Observer(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var observers = [];
  var window = (0, _ssrWindow.getWindow)();
  var attach = function attach(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
    var observer = new ObserverFunc(function (mutations) {
      // The observerUpdate event should only be triggered
      // once despite the number of mutations.  Additional
      // triggers are redundant and are very costly
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit('observerUpdate', mutations[0]);
        return;
      }
      var observerUpdate = function observerUpdate() {
        emit('observerUpdate', mutations[0]);
      };
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(observerUpdate);
      } else {
        window.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });
    observers.push(observer);
  };
  var init = function init() {
    if (!swiper.params.observer) return;
    if (swiper.params.observeParents) {
      var containerParents = (0, _utils.elementParents)(swiper.el);
      for (var i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    // Observe container
    attach(swiper.el, {
      childList: swiper.params.observeSlideChildren
    });

    // Observe wrapper
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  var destroy = function destroy() {
    observers.forEach(function (observer) {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on('init', init);
  on('destroy', destroy);
}

},{"../../../shared/utils.js":104,"ssr-window":8}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Resize;
var _ssrWindow = require("ssr-window");
function Resize(_ref) {
  var swiper = _ref.swiper,
    on = _ref.on,
    emit = _ref.emit;
  var window = (0, _ssrWindow.getWindow)();
  var observer = null;
  var animationFrame = null;
  var resizeHandler = function resizeHandler() {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('beforeResize');
    emit('resize');
  };
  var createObserver = function createObserver() {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver(function (entries) {
      animationFrame = window.requestAnimationFrame(function () {
        var width = swiper.width,
          height = swiper.height;
        var newWidth = width;
        var newHeight = height;
        entries.forEach(function (_ref2) {
          var contentBoxSize = _ref2.contentBoxSize,
            contentRect = _ref2.contentRect,
            target = _ref2.target;
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  var removeObserver = function removeObserver() {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  var orientationChangeHandler = function orientationChangeHandler() {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('orientationchange');
  };
  on('init', function () {
    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
      createObserver();
      return;
    }
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);
  });
  on('destroy', function () {
    removeObserver();
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('orientationchange', orientationChangeHandler);
  });
}

},{"ssr-window":8}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slideTo = _interopRequireDefault(require("./slideTo.js"));
var _slideToLoop = _interopRequireDefault(require("./slideToLoop.js"));
var _slideNext = _interopRequireDefault(require("./slideNext.js"));
var _slidePrev = _interopRequireDefault(require("./slidePrev.js"));
var _slideReset = _interopRequireDefault(require("./slideReset.js"));
var _slideToClosest = _interopRequireDefault(require("./slideToClosest.js"));
var _slideToClickedSlide = _interopRequireDefault(require("./slideToClickedSlide.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  slideTo: _slideTo["default"],
  slideToLoop: _slideToLoop["default"],
  slideNext: _slideNext["default"],
  slidePrev: _slidePrev["default"],
  slideReset: _slideReset["default"],
  slideToClosest: _slideToClosest["default"],
  slideToClickedSlide: _slideToClickedSlide["default"]
};
exports["default"] = _default;

},{"./slideNext.js":38,"./slidePrev.js":39,"./slideReset.js":40,"./slideTo.js":41,"./slideToClickedSlide.js":42,"./slideToClosest.js":43,"./slideToLoop.js":44}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideNext;
/* eslint no-unused-vars: "off" */
function slideNext() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var enabled = swiper.enabled,
    params = swiper.params,
    animating = swiper.animating;
  if (!enabled) return swiper;
  var perGroup = params.slidesPerGroup;
  if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
  }
  var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'next'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}

},{}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slidePrev;
/* eslint no-unused-vars: "off" */
function slidePrev() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  var params = swiper.params,
    snapGrid = swiper.snapGrid,
    slidesGrid = swiper.slidesGrid,
    rtlTranslate = swiper.rtlTranslate,
    enabled = swiper.enabled,
    animating = swiper.animating;
  if (!enabled) return swiper;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: 'prev'
    });
    // eslint-disable-next-line
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  var translate = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  var normalizedTranslate = normalize(translate);
  var normalizedSnapGrid = snapGrid.map(function (val) {
    return normalize(val);
  });
  var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === 'undefined' && params.cssMode) {
    var prevSnapIndex;
    snapGrid.forEach(function (snap, snapIndex) {
      if (normalizedTranslate >= snap) {
        // prevSnap = snap;
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== 'undefined') {
      prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  var prevIndex = 0;
  if (typeof prevSnap !== 'undefined') {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    var lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}

},{}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideReset;
/* eslint no-unused-vars: "off" */
function slideReset() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideTo;
var _utils = require("../../shared/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function slideTo() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  var initial = arguments.length > 4 ? arguments[4] : undefined;
  if (typeof index === 'string') {
    index = parseInt(index, 10);
  }
  var swiper = this;
  var slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  var params = swiper.params,
    snapGrid = swiper.snapGrid,
    slidesGrid = swiper.slidesGrid,
    previousIndex = swiper.previousIndex,
    activeIndex = swiper.activeIndex,
    rtl = swiper.rtlTranslate,
    wrapperEl = swiper.wrapperEl,
    enabled = swiper.enabled;
  if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
    return false;
  }
  var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  var translate = -snapGrid[snapIndex];
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      var normalizedTranslate = -Math.floor(translate * 100);
      var normalizedGrid = Math.floor(slidesGrid[i] * 100);
      var normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  // Directions locks
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  // Update progress
  swiper.updateProgress(translate);
  var direction;
  if (slideIndex > activeIndex) direction = 'next';else if (slideIndex < activeIndex) direction = 'prev';else direction = 'reset';

  // Update Index
  if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    if (direction !== 'reset') {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    var isH = swiper.isHorizontal();
    var t = rtl ? translate : -translate;
    if (speed === 0) {
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = 'none';
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(function () {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        });
      } else {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(function () {
          swiper.wrapperEl.style.scrollSnapType = '';
          swiper._immediateVirtual = false;
        });
      }
    } else {
      var _wrapperEl$scrollTo;
      if (!swiper.support.smoothScroll) {
        (0, _utils.animateCSSModeScroll)({
          swiper: swiper,
          targetPosition: t,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, _defineProperty(_wrapperEl$scrollTo, isH ? 'left' : 'top', t), _defineProperty(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
    }
    return true;
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit('beforeTransitionStart', speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}

},{"../../shared/utils.js":104}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideToClickedSlide;
var _utils = require("../../shared/utils.js");
function slideToClickedSlide() {
  var swiper = this;
  var params = swiper.params,
    slidesEl = swiper.slidesEl;
  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;
  var slideSelector = swiper.isElement ? "swiper-slide" : ".".concat(params.slideClass);
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
        swiper.loopFix();
        slideToIndex = swiper.getSlideIndex((0, _utils.elementChildren)(slidesEl, "".concat(slideSelector, "[data-swiper-slide-index=\"").concat(realIndex, "\"]"))[0]);
        (0, _utils.nextTick)(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex((0, _utils.elementChildren)(slidesEl, "".concat(slideSelector, "[data-swiper-slide-index=\"").concat(realIndex, "\"]"))[0]);
      (0, _utils.nextTick)(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}

},{"../../shared/utils.js":104}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideToClosest;
/* eslint no-unused-vars: "off" */
function slideToClosest() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.params.speed;
  var runCallbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var internal = arguments.length > 2 ? arguments[2] : undefined;
  var threshold = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.5;
  var swiper = this;
  var index = swiper.activeIndex;
  var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate >= swiper.snapGrid[snapIndex]) {
    // The current translate is on or after the current snap index, so the choice
    // is between the current index and the one after it.
    var currentSnap = swiper.snapGrid[snapIndex];
    var nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    // The current translate is before the current snap index, so the choice
    // is between the current index and the one before it.
    var prevSnap = swiper.snapGrid[snapIndex - 1];
    var _currentSnap = swiper.snapGrid[snapIndex];
    if (translate - prevSnap <= (_currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = slideToLoop;
function slideToLoop() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var internal = arguments.length > 3 ? arguments[3] : undefined;
  if (typeof index === 'string') {
    var indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  var swiper = this;
  var newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      // eslint-disable-next-line
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      newIndex = swiper.getSlideIndexByData(newIndex);
    }
  }
  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}

},{}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _setTransition = _interopRequireDefault(require("./setTransition.js"));
var _transitionStart = _interopRequireDefault(require("./transitionStart.js"));
var _transitionEnd = _interopRequireDefault(require("./transitionEnd.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  setTransition: _setTransition["default"],
  transitionStart: _transitionStart["default"],
  transitionEnd: _transitionEnd["default"]
};
exports["default"] = _default;

},{"./setTransition.js":46,"./transitionEnd.js":48,"./transitionStart.js":49}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setTransition;
function setTransition(duration, byController) {
  var swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = "".concat(duration, "ms");
  }
  swiper.emit('setTransition', duration, byController);
}

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transitionEmit;
function transitionEmit(_ref) {
  var swiper = _ref.swiper,
    runCallbacks = _ref.runCallbacks,
    direction = _ref.direction,
    step = _ref.step;
  var activeIndex = swiper.activeIndex,
    previousIndex = swiper.previousIndex;
  var dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = 'next';else if (activeIndex < previousIndex) dir = 'prev';else dir = 'reset';
  }
  swiper.emit("transition".concat(step));
  if (runCallbacks && activeIndex !== previousIndex) {
    if (dir === 'reset') {
      swiper.emit("slideResetTransition".concat(step));
      return;
    }
    swiper.emit("slideChangeTransition".concat(step));
    if (dir === 'next') {
      swiper.emit("slideNextTransition".concat(step));
    } else {
      swiper.emit("slidePrevTransition".concat(step));
    }
  }
}

},{}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transitionEnd;
var _transitionEmit = _interopRequireDefault(require("./transitionEmit.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function transitionEnd() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var params = swiper.params;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  (0, _transitionEmit["default"])({
    swiper: swiper,
    runCallbacks: runCallbacks,
    direction: direction,
    step: 'End'
  });
}

},{"./transitionEmit.js":47}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = transitionStart;
var _transitionEmit = _interopRequireDefault(require("./transitionEmit.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function transitionStart() {
  var runCallbacks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var direction = arguments.length > 1 ? arguments[1] : undefined;
  var swiper = this;
  var params = swiper.params;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  (0, _transitionEmit["default"])({
    swiper: swiper,
    runCallbacks: runCallbacks,
    direction: direction,
    step: 'Start'
  });
}

},{"./transitionEmit.js":47}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getSwiperTranslate;
var _utils = require("../../shared/utils.js");
function getSwiperTranslate() {
  var axis = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.isHorizontal() ? 'x' : 'y';
  var swiper = this;
  var params = swiper.params,
    rtl = swiper.rtlTranslate,
    translate = swiper.translate,
    wrapperEl = swiper.wrapperEl;
  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }
  if (params.cssMode) {
    return translate;
  }
  var currentTranslate = (0, _utils.getTranslate)(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}

},{"../../shared/utils.js":104}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _getTranslate = _interopRequireDefault(require("./getTranslate.js"));
var _setTranslate = _interopRequireDefault(require("./setTranslate.js"));
var _minTranslate = _interopRequireDefault(require("./minTranslate.js"));
var _maxTranslate = _interopRequireDefault(require("./maxTranslate.js"));
var _translateTo = _interopRequireDefault(require("./translateTo.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  getTranslate: _getTranslate["default"],
  setTranslate: _setTranslate["default"],
  minTranslate: _minTranslate["default"],
  maxTranslate: _maxTranslate["default"],
  translateTo: _translateTo["default"]
};
exports["default"] = _default;

},{"./getTranslate.js":50,"./maxTranslate.js":52,"./minTranslate.js":53,"./setTranslate.js":54,"./translateTo.js":55}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = maxTranslate;
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}

},{}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = minTranslate;
function minTranslate() {
  return -this.snapGrid[0];
}

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setTranslate;
function setTranslate(translate, byController) {
  var swiper = this;
  var rtl = swiper.rtlTranslate,
    params = swiper.params,
    wrapperEl = swiper.wrapperEl,
    progress = swiper.progress;
  var x = 0;
  var y = 0;
  var z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, ").concat(z, "px)");
  }

  // Check if we need to update progress
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }
  swiper.emit('setTranslate', swiper.translate, byController);
}

},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = translateTo;
var _utils = require("../../shared/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function translateTo() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.speed;
  var runCallbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var translateBounds = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var internal = arguments.length > 4 ? arguments[4] : undefined;
  var swiper = this;
  var params = swiper.params,
    wrapperEl = swiper.wrapperEl;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  var minTranslate = swiper.minTranslate();
  var maxTranslate = swiper.maxTranslate();
  var newTranslate;
  if (translateBounds && translate > minTranslate) newTranslate = minTranslate;else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;else newTranslate = translate;

  // Update progress
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    var isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
    } else {
      var _wrapperEl$scrollTo;
      if (!swiper.support.smoothScroll) {
        (0, _utils.animateCSSModeScroll)({
          swiper: swiper,
          targetPosition: -newTranslate,
          side: isH ? 'left' : 'top'
        });
        return true;
      }
      wrapperEl.scrollTo((_wrapperEl$scrollTo = {}, _defineProperty(_wrapperEl$scrollTo, isH ? 'left' : 'top', -newTranslate), _defineProperty(_wrapperEl$scrollTo, "behavior", 'smooth'), _wrapperEl$scrollTo));
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionEnd');
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.emit('transitionStart');
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          if (runCallbacks) {
            swiper.emit('transitionEnd');
          }
        };
      }
      swiper.wrapperEl.addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}

},{"../../shared/utils.js":104}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _updateSize = _interopRequireDefault(require("./updateSize.js"));
var _updateSlides = _interopRequireDefault(require("./updateSlides.js"));
var _updateAutoHeight = _interopRequireDefault(require("./updateAutoHeight.js"));
var _updateSlidesOffset = _interopRequireDefault(require("./updateSlidesOffset.js"));
var _updateSlidesProgress = _interopRequireDefault(require("./updateSlidesProgress.js"));
var _updateProgress = _interopRequireDefault(require("./updateProgress.js"));
var _updateSlidesClasses = _interopRequireDefault(require("./updateSlidesClasses.js"));
var _updateActiveIndex = _interopRequireDefault(require("./updateActiveIndex.js"));
var _updateClickedSlide = _interopRequireDefault(require("./updateClickedSlide.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  updateSize: _updateSize["default"],
  updateSlides: _updateSlides["default"],
  updateAutoHeight: _updateAutoHeight["default"],
  updateSlidesOffset: _updateSlidesOffset["default"],
  updateSlidesProgress: _updateSlidesProgress["default"],
  updateProgress: _updateProgress["default"],
  updateSlidesClasses: _updateSlidesClasses["default"],
  updateActiveIndex: _updateActiveIndex["default"],
  updateClickedSlide: _updateClickedSlide["default"]
};
exports["default"] = _default;

},{"./updateActiveIndex.js":57,"./updateAutoHeight.js":58,"./updateClickedSlide.js":59,"./updateProgress.js":60,"./updateSize.js":61,"./updateSlides.js":62,"./updateSlidesClasses.js":63,"./updateSlidesOffset.js":64,"./updateSlidesProgress.js":65}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateActiveIndex;
exports.getActiveIndexByTranslate = getActiveIndexByTranslate;
var _processLazyPreloader = require("../../shared/process-lazy-preloader.js");
function getActiveIndexByTranslate(swiper) {
  var slidesGrid = swiper.slidesGrid,
    params = swiper.params;
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  var activeIndex;
  for (var i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== 'undefined') {
      if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  var snapGrid = swiper.snapGrid,
    params = swiper.params,
    previousIndex = swiper.activeIndex,
    previousRealIndex = swiper.realIndex,
    previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;
  var getVirtualRealIndex = function getVirtualRealIndex(aIndex) {
    var realIndex = aIndex - swiper.virtual.slidesBefore;
    if (realIndex < 0) {
      realIndex = swiper.virtual.slides.length + realIndex;
    }
    if (realIndex >= swiper.virtual.slides.length) {
      realIndex -= swiper.virtual.slides.length;
    }
    return realIndex;
  };
  if (typeof activeIndex === 'undefined') {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.realIndex = getVirtualRealIndex(activeIndex);
    }
    return;
  }
  // Get real index
  var realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (swiper.slides[activeIndex]) {
    realIndex = parseInt(swiper.slides[activeIndex].getAttribute('data-swiper-slide-index') || activeIndex, 10);
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex: previousSnapIndex,
    snapIndex: snapIndex,
    previousRealIndex: previousRealIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex
  });
  if (swiper.initialized) {
    (0, _processLazyPreloader.preload)(swiper);
  }
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    swiper.emit('slideChange');
  }
}

},{"../../shared/process-lazy-preloader.js":103}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateAutoHeight;
function updateAutoHeight(speed) {
  var swiper = this;
  var activeSlides = [];
  var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  var newHeight = 0;
  var i;
  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  var getSlideByIndex = function getSlideByIndex(index) {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach(function (slide) {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        var index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      var height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = "".concat(newHeight, "px");
}

},{}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateClickedSlide;
function updateClickedSlide(e) {
  var swiper = this;
  var params = swiper.params;
  var slide = e.closest(".".concat(params.slideClass, ", swiper-slide"));
  var slideFound = false;
  var slideIndex;
  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}

},{}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateProgress;
function updateProgress(translate) {
  var swiper = this;
  if (typeof translate === 'undefined') {
    var multiplier = swiper.rtlTranslate ? -1 : 1;
    // eslint-disable-next-line
    translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  var params = swiper.params;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress,
    isBeginning = swiper.isBeginning,
    isEnd = swiper.isEnd,
    progressLoop = swiper.progressLoop;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / translatesDiff;
    var isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
    var isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded) progress = 0;
    if (isEndRounded) progress = 1;
  }
  if (params.loop) {
    var firstSlideIndex = swiper.getSlideIndexByData(0);
    var lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    var firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    var lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    var translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    var translateAbs = Math.abs(translate);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1) progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress: progress,
    progressLoop: progressLoop,
    isBeginning: isBeginning,
    isEnd: isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit('fromEdge');
  }
  swiper.emit('progress', progress);
}

},{}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSize;
var _utils = require("../../shared/utils.js");
function updateSize() {
  var swiper = this;
  var width;
  var height;
  var el = swiper.el;
  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }

  // Subtract paddings
  width = width - parseInt((0, _utils.elementStyle)(el, 'padding-left') || 0, 10) - parseInt((0, _utils.elementStyle)(el, 'padding-right') || 0, 10);
  height = height - parseInt((0, _utils.elementStyle)(el, 'padding-top') || 0, 10) - parseInt((0, _utils.elementStyle)(el, 'padding-bottom') || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height
  });
}

},{"../../shared/utils.js":104}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSlides;
var _utils = require("../../shared/utils.js");
function updateSlides() {
  var swiper = this;
  function getDirectionLabel(property) {
    if (swiper.isHorizontal()) {
      return property;
    }
    // prettier-ignore
    return {
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom'
    }[property];
  }
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
  }
  var params = swiper.params;
  var wrapperEl = swiper.wrapperEl,
    slidesEl = swiper.slidesEl,
    swiperSize = swiper.size,
    rtl = swiper.rtlTranslate,
    wrongRTL = swiper.wrongRTL;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  var slides = (0, _utils.elementChildren)(slidesEl, ".".concat(swiper.params.slideClass, ", swiper-slide"));
  var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  var snapGrid = [];
  var slidesGrid = [];
  var slidesSizesGrid = [];
  var offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  var offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  var previousSnapGridLength = swiper.snapGrid.length;
  var previousSlidesGridLength = swiper.slidesGrid.length;
  var spaceBetween = params.spaceBetween;
  var slidePosition = -offsetBefore;
  var prevSlideSize = 0;
  var index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
  }
  swiper.virtualSize = -spaceBetween;

  // reset margins
  slides.forEach(function (slideEl) {
    if (rtl) {
      slideEl.style.marginLeft = '';
    } else {
      slideEl.style.marginRight = '';
    }
    slideEl.style.marginBottom = '';
    slideEl.style.marginTop = '';
  });

  // reset cssMode offsets
  if (params.centeredSlides && params.cssMode) {
    (0, _utils.setCSSProperty)(wrapperEl, '--swiper-centered-offset-before', '');
    (0, _utils.setCSSProperty)(wrapperEl, '--swiper-centered-offset-after', '');
  }
  var gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slidesLength);
  }

  // Calc slides
  var slideSize;
  var shouldResetSlideSize = params.slidesPerView === 'auto' && params.breakpoints && Object.keys(params.breakpoints).filter(function (key) {
    return typeof params.breakpoints[key].slidesPerView !== 'undefined';
  }).length > 0;
  for (var i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    var slide = void 0;
    if (slides[i]) slide = slides[i];
    if (gridEnabled) {
      swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
    }
    if (slides[i] && (0, _utils.elementStyle)(slide, 'display') === 'none') continue; // eslint-disable-line

    if (params.slidesPerView === 'auto') {
      if (shouldResetSlideSize) {
        slides[i].style[getDirectionLabel('width')] = "";
      }
      var slideStyles = getComputedStyle(slide);
      var currentTransform = slide.style.transform;
      var currentWebKitTransform = slide.style.webkitTransform;
      if (currentTransform) {
        slide.style.transform = 'none';
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = 'none';
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? (0, _utils.elementOuterSize)(slide, 'width', true) : (0, _utils.elementOuterSize)(slide, 'height', true);
      } else {
        // eslint-disable-next-line
        var width = getDirectionPropertyValue(slideStyles, 'width');
        var paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
        var paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
        var marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
        var marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
        var boxSizing = slideStyles.getPropertyValue('box-sizing');
        if (boxSizing && boxSizing === 'border-box') {
          slideSize = width + marginLeft + marginRight;
        } else {
          var _slide = slide,
            clientWidth = _slide.clientWidth,
            offsetWidth = _slide.offsetWidth;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);
      if (slides[i]) {
        slides[i].style[getDirectionLabel('width')] = "".concat(slideSize, "px");
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    wrapperEl.style.width = "".concat(swiper.virtualSize + params.spaceBetween, "px");
  }
  if (params.setWrapperSize) {
    wrapperEl.style[getDirectionLabel('width')] = "".concat(swiper.virtualSize + params.spaceBetween, "px");
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    var newSlidesGrid = [];
    for (var _i = 0; _i < snapGrid.length; _i += 1) {
      var slidesGridItem = snapGrid[_i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[_i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    var size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      var groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      var groupSize = size * params.slidesPerGroup;
      for (var _i2 = 0; _i2 < groups; _i2 += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (var _i3 = 0; _i3 < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; _i3 += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (params.spaceBetween !== 0) {
    var key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
    slides.filter(function (_, slideIndex) {
      if (!params.cssMode || params.loop) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach(function (slideEl) {
      slideEl.style[key] = "".concat(spaceBetween, "px");
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    var allSlidesSize = 0;
    slidesSizesGrid.forEach(function (slideSizeValue) {
      allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    allSlidesSize -= params.spaceBetween;
    var maxSnap = allSlidesSize - swiperSize;
    snapGrid = snapGrid.map(function (snap) {
      if (snap < 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    var _allSlidesSize = 0;
    slidesSizesGrid.forEach(function (slideSizeValue) {
      _allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
    });
    _allSlidesSize -= params.spaceBetween;
    if (_allSlidesSize < swiperSize) {
      var allSlidesOffset = (swiperSize - _allSlidesSize) / 2;
      snapGrid.forEach(function (snap, snapIndex) {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach(function (snap, snapIndex) {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    (0, _utils.setCSSProperty)(wrapperEl, '--swiper-centered-offset-before', "".concat(-snapGrid[0], "px"));
    (0, _utils.setCSSProperty)(wrapperEl, '--swiper-centered-offset-after', "".concat(swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2, "px"));
    var addToSnapGrid = -swiper.snapGrid[0];
    var addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map(function (v) {
      return v + addToSnapGrid;
    });
    swiper.slidesGrid = swiper.slidesGrid.map(function (v) {
      return v + addToSlidesGrid;
    });
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (!isVirtual && !params.cssMode && (params.effect === 'slide' || params.effect === 'fade')) {
    var backFaceHiddenClass = "".concat(params.containerModifierClass, "backface-hidden");
    var hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}

},{"../../shared/utils.js":104}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSlidesClasses;
var _utils = require("../../shared/utils.js");
function updateSlidesClasses() {
  var swiper = this;
  var slides = swiper.slides,
    params = swiper.params,
    slidesEl = swiper.slidesEl,
    activeIndex = swiper.activeIndex;
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var getFilteredSlide = function getFilteredSlide(selector) {
    return (0, _utils.elementChildren)(slidesEl, ".".concat(params.slideClass).concat(selector, ", swiper-slide").concat(selector))[0];
  };
  slides.forEach(function (slideEl) {
    slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
  });
  var activeSlide;
  if (isVirtual) {
    if (params.loop) {
      var slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide("[data-swiper-slide-index=\"".concat(slideIndex, "\"]"));
    } else {
      activeSlide = getFilteredSlide("[data-swiper-slide-index=\"".concat(activeIndex, "\"]"));
    }
  } else {
    activeSlide = slides[activeIndex];
  }
  if (activeSlide) {
    // Active classes
    activeSlide.classList.add(params.slideActiveClass);

    // Next Slide
    var nextSlide = (0, _utils.elementNextAll)(activeSlide, ".".concat(params.slideClass, ", swiper-slide"))[0];
    if (params.loop && !nextSlide) {
      nextSlide = slides[0];
    }
    if (nextSlide) {
      nextSlide.classList.add(params.slideNextClass);
    }
    // Prev Slide
    var prevSlide = (0, _utils.elementPrevAll)(activeSlide, ".".concat(params.slideClass, ", swiper-slide"))[0];
    if (params.loop && !prevSlide === 0) {
      prevSlide = slides[slides.length - 1];
    }
    if (prevSlide) {
      prevSlide.classList.add(params.slidePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}

},{"../../shared/utils.js":104}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSlidesOffset;
function updateSlidesOffset() {
  var swiper = this;
  var slides = swiper.slides;
  // eslint-disable-next-line
  var minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (var i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}

},{}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateSlidesProgress;
function updateSlidesProgress() {
  var translate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this && this.translate || 0;
  var swiper = this;
  var params = swiper.params;
  var slides = swiper.slides,
    rtl = swiper.rtlTranslate,
    snapGrid = swiper.snapGrid;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
  var offsetCenter = -translate;
  if (rtl) offsetCenter = translate;

  // Visible Slides
  slides.forEach(function (slideEl) {
    slideEl.classList.remove(params.slideVisibleClass);
  });
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideOffset = slide.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    var originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
    var slideBefore = -(offsetCenter - slideOffset);
    var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    var isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
      slides[i].classList.add(params.slideVisibleClass);
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}

},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = A11y;
var _classesToSelector = _interopRequireDefault(require("../../shared/classes-to-selector.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function A11y(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    a11y: {
      enabled: true,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
      containerMessage: null,
      containerRoleDescriptionMessage: null,
      itemRoleDescriptionMessage: null,
      slideRole: 'group',
      id: null
    }
  });
  swiper.a11y = {
    clicked: false
  };
  var liveRegion = null;
  function notify(message) {
    var notification = liveRegion;
    if (notification.length === 0) return;
    notification.innerHTML = '';
    notification.innerHTML = message;
  }
  var makeElementsArray = function makeElementsArray(el) {
    if (!Array.isArray(el)) el = [el].filter(function (e) {
      return !!e;
    });
    return el;
  };
  function getRandomNumber() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    var randomChar = function randomChar() {
      return Math.round(16 * Math.random()).toString(16);
    };
    return 'x'.repeat(size).replace(/x/g, randomChar);
  }
  function makeElFocusable(el) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('tabIndex', '0');
    });
  }
  function makeElNotFocusable(el) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('tabIndex', '-1');
    });
  }
  function addElRole(el, role) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('role', role);
    });
  }
  function addElRoleDescription(el, description) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-roledescription', description);
    });
  }
  function addElControls(el, controls) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-controls', controls);
    });
  }
  function addElLabel(el, label) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-label', label);
    });
  }
  function addElId(el, id) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('id', id);
    });
  }
  function addElLive(el, live) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-live', live);
    });
  }
  function disableEl(el) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-disabled', true);
    });
  }
  function enableEl(el) {
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.setAttribute('aria-disabled', false);
    });
  }
  function onEnterOrSpaceKey(e) {
    if (e.keyCode !== 13 && e.keyCode !== 32) return;
    var params = swiper.params.a11y;
    var targetEl = e.target;
    if (swiper.pagination && swiper.pagination.el && (targetEl === swiper.pagination.el || swiper.pagination.el.contains(e.target))) {
      if (!e.target.matches((0, _classesToSelector["default"])(swiper.params.pagination.bulletClass))) return;
    }
    if (swiper.navigation && swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) {
      if (!(swiper.isEnd && !swiper.params.loop)) {
        swiper.slideNext();
      }
      if (swiper.isEnd) {
        notify(params.lastSlideMessage);
      } else {
        notify(params.nextSlideMessage);
      }
    }
    if (swiper.navigation && swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl) {
      if (!(swiper.isBeginning && !swiper.params.loop)) {
        swiper.slidePrev();
      }
      if (swiper.isBeginning) {
        notify(params.firstSlideMessage);
      } else {
        notify(params.prevSlideMessage);
      }
    }
    if (swiper.pagination && targetEl.matches((0, _classesToSelector["default"])(swiper.params.pagination.bulletClass))) {
      targetEl.click();
    }
  }
  function updateNavigation() {
    if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
    var _swiper$navigation = swiper.navigation,
      nextEl = _swiper$navigation.nextEl,
      prevEl = _swiper$navigation.prevEl;
    if (prevEl) {
      if (swiper.isBeginning) {
        disableEl(prevEl);
        makeElNotFocusable(prevEl);
      } else {
        enableEl(prevEl);
        makeElFocusable(prevEl);
      }
    }
    if (nextEl) {
      if (swiper.isEnd) {
        disableEl(nextEl);
        makeElNotFocusable(nextEl);
      } else {
        enableEl(nextEl);
        makeElFocusable(nextEl);
      }
    }
  }
  function hasPagination() {
    return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
  }
  function hasClickablePagination() {
    return hasPagination() && swiper.params.pagination.clickable;
  }
  function updatePagination() {
    var params = swiper.params.a11y;
    if (!hasPagination()) return;
    swiper.pagination.bullets.forEach(function (bulletEl) {
      if (swiper.params.pagination.clickable) {
        makeElFocusable(bulletEl);
        if (!swiper.params.pagination.renderBullet) {
          addElRole(bulletEl, 'button');
          addElLabel(bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, (0, _utils.elementIndex)(bulletEl) + 1));
        }
      }
      if (bulletEl.matches((0, _classesToSelector["default"])(swiper.params.pagination.bulletActiveClass))) {
        bulletEl.setAttribute('aria-current', 'true');
      } else {
        bulletEl.removeAttribute('aria-current');
      }
    });
  }
  var initNavEl = function initNavEl(el, wrapperId, message) {
    makeElFocusable(el);
    if (el.tagName !== 'BUTTON') {
      addElRole(el, 'button');
      el.addEventListener('keydown', onEnterOrSpaceKey);
    }
    addElLabel(el, message);
    addElControls(el, wrapperId);
  };
  var handlePointerDown = function handlePointerDown() {
    swiper.a11y.clicked = true;
  };
  var handlePointerUp = function handlePointerUp() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (!swiper.destroyed) {
          swiper.a11y.clicked = false;
        }
      });
    });
  };
  var handleFocus = function handleFocus(e) {
    if (swiper.a11y.clicked) return;
    var slideEl = e.target.closest(".".concat(swiper.params.slideClass, ", swiper-slide"));
    if (!slideEl || !swiper.slides.includes(slideEl)) return;
    var isActive = swiper.slides.indexOf(slideEl) === swiper.activeIndex;
    var isVisible = swiper.params.watchSlidesProgress && swiper.visibleSlides && swiper.visibleSlides.includes(slideEl);
    if (isActive || isVisible) return;
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    if (swiper.isHorizontal()) {
      swiper.el.scrollLeft = 0;
    } else {
      swiper.el.scrollTop = 0;
    }
    swiper.slideTo(swiper.slides.indexOf(slideEl), 0);
  };
  var initSlides = function initSlides() {
    var params = swiper.params.a11y;
    if (params.itemRoleDescriptionMessage) {
      addElRoleDescription(swiper.slides, params.itemRoleDescriptionMessage);
    }
    if (params.slideRole) {
      addElRole(swiper.slides, params.slideRole);
    }
    var slidesLength = swiper.slides.length;
    if (params.slideLabelMessage) {
      swiper.slides.forEach(function (slideEl, index) {
        var slideIndex = swiper.params.loop ? parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10) : index;
        var ariaLabelMessage = params.slideLabelMessage.replace(/\{\{index\}\}/, slideIndex + 1).replace(/\{\{slidesLength\}\}/, slidesLength);
        addElLabel(slideEl, ariaLabelMessage);
      });
    }
  };
  var init = function init() {
    var params = swiper.params.a11y;
    swiper.el.append(liveRegion);

    // Container
    var containerEl = swiper.el;
    if (params.containerRoleDescriptionMessage) {
      addElRoleDescription(containerEl, params.containerRoleDescriptionMessage);
    }
    if (params.containerMessage) {
      addElLabel(containerEl, params.containerMessage);
    }

    // Wrapper
    var wrapperEl = swiper.wrapperEl;
    var wrapperId = params.id || wrapperEl.getAttribute('id') || "swiper-wrapper-".concat(getRandomNumber(16));
    var live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
    addElId(wrapperEl, wrapperId);
    addElLive(wrapperEl, live);

    // Slide
    initSlides();

    // Navigation
    var _ref2 = swiper.navigation ? swiper.navigation : {},
      nextEl = _ref2.nextEl,
      prevEl = _ref2.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (nextEl) {
      nextEl.forEach(function (el) {
        return initNavEl(el, wrapperId, params.nextSlideMessage);
      });
    }
    if (prevEl) {
      prevEl.forEach(function (el) {
        return initNavEl(el, wrapperId, params.prevSlideMessage);
      });
    }

    // Pagination
    if (hasClickablePagination()) {
      var paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
      paginationEl.forEach(function (el) {
        el.addEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Tab focus
    swiper.el.addEventListener('focus', handleFocus, true);
    swiper.el.addEventListener('pointerdown', handlePointerDown, true);
    swiper.el.addEventListener('pointerup', handlePointerUp, true);
  };
  function destroy() {
    if (liveRegion && liveRegion.length > 0) liveRegion.remove();
    var _ref3 = swiper.navigation ? swiper.navigation : {},
      nextEl = _ref3.nextEl,
      prevEl = _ref3.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (nextEl) {
      nextEl.forEach(function (el) {
        return el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }
    if (prevEl) {
      prevEl.forEach(function (el) {
        return el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Pagination
    if (hasClickablePagination()) {
      var paginationEl = Array.isArray(swiper.pagination.el) ? swiper.pagination.el : [swiper.pagination.el];
      paginationEl.forEach(function (el) {
        el.removeEventListener('keydown', onEnterOrSpaceKey);
      });
    }

    // Tab focus
    swiper.el.removeEventListener('focus', handleFocus, true);
    swiper.el.removeEventListener('pointerdown', handlePointerDown, true);
    swiper.el.removeEventListener('pointerup', handlePointerUp, true);
  }
  on('beforeInit', function () {
    liveRegion = (0, _utils.createElement)('span', swiper.params.a11y.notificationClass);
    liveRegion.setAttribute('aria-live', 'assertive');
    liveRegion.setAttribute('aria-atomic', 'true');
    if (swiper.isElement) {
      liveRegion.setAttribute('slot', 'container-end');
    }
  });
  on('afterInit', function () {
    if (!swiper.params.a11y.enabled) return;
    init();
  });
  on('slidesLengthChange snapGridLengthChange slidesGridLengthChange', function () {
    if (!swiper.params.a11y.enabled) return;
    initSlides();
  });
  on('fromEdge toEdge afterInit lock unlock', function () {
    if (!swiper.params.a11y.enabled) return;
    updateNavigation();
  });
  on('paginationUpdate', function () {
    if (!swiper.params.a11y.enabled) return;
    updatePagination();
  });
  on('destroy', function () {
    if (!swiper.params.a11y.enabled) return;
    destroy();
  });
}

},{"../../shared/classes-to-selector.js":94,"../../shared/utils.js":104}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Autoplay;
var _ssrWindow = require("ssr-window");
/* eslint no-underscore-dangle: "off" */
/* eslint no-use-before-define: "off" */

function Autoplay(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit,
    params = _ref.params;
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  var timeout;
  var raf;
  var autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3000;
  var autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3000;
  var autoplayTimeLeft;
  var autoplayStartTime = new Date().getTime;
  var wasPaused;
  var isTouched;
  var pausedByTouch;
  var touchStartTimeout;
  var slideChanged;
  var pausedByInteraction;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
    resume();
  }
  var calcTimeLeft = function calcTimeLeft() {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    var timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(function () {
      calcTimeLeft();
    });
  };
  var getSlideDelay = function getSlideDelay() {
    var activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.filter(function (slideEl) {
        return slideEl.classList.contains('swiper-slide-active');
      })[0];
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return undefined;
    var currentSlideDelay = parseInt(activeSlideEl.getAttribute('data-swiper-autoplay'), 10);
    return currentSlideDelay;
  };
  var run = function run(delayForce) {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    var delay = typeof delayForce === 'undefined' ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    var currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === 'undefined') {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    var speed = swiper.params.speed;
    var proceed = function proceed() {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit('autoplay');
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit('autoplay');
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = new Date().getTime();
        requestAnimationFrame(function () {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(function () {
        proceed();
      });
    }

    // eslint-disable-next-line
    return delay;
  };
  var start = function start() {
    swiper.autoplay.running = true;
    run();
    emit('autoplayStart');
  };
  var stop = function stop() {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit('autoplayStop');
  };
  var pause = function pause(internal, reset) {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    var proceed = function proceed() {
      emit('autoplayPause');
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    var delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  var resume = function resume() {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = new Date().getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit('autoplayResume');
  };
  var onVisibilityChange = function onVisibilityChange() {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    var document = (0, _ssrWindow.getDocument)();
    if (document.visibilityState === 'hidden') {
      pausedByInteraction = true;
      pause(true);
    }
    if (document.visibilityState === 'visible') {
      resume();
    }
  };
  var onPointerEnter = function onPointerEnter(e) {
    if (e.pointerType !== 'mouse') return;
    pausedByInteraction = true;
    pause(true);
  };
  var onPointerLeave = function onPointerLeave(e) {
    if (e.pointerType !== 'mouse') return;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  var attachMouseEvents = function attachMouseEvents() {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener('pointerenter', onPointerEnter);
      swiper.el.addEventListener('pointerleave', onPointerLeave);
    }
  };
  var detachMouseEvents = function detachMouseEvents() {
    swiper.el.removeEventListener('pointerenter', onPointerEnter);
    swiper.el.removeEventListener('pointerleave', onPointerLeave);
  };
  var attachDocumentEvents = function attachDocumentEvents() {
    var document = (0, _ssrWindow.getDocument)();
    document.addEventListener('visibilitychange', onVisibilityChange);
  };
  var detachDocumentEvents = function detachDocumentEvents() {
    var document = (0, _ssrWindow.getDocument)();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
  on('init', function () {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      autoplayStartTime = new Date().getTime();
      start();
    }
  });
  on('destroy', function () {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on('beforeTransitionStart', function (_s, speed, internal) {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on('sliderFirstMove', function () {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(function () {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on('touchEnd', function () {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on('slideChange', function () {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start: start,
    stop: stop,
    pause: pause,
    resume: resume
  });
}

},{"ssr-window":8}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Controller;
var _utils = require("../../shared/utils.js");
/* eslint no-bitwise: ["error", { "allow": [">>"] }] */

function Controller(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide' // or 'container'
    }
  });

  swiper.controller = {
    control: undefined
  };
  function LinearSpline(x, y) {
    var binarySearch = function search() {
      var maxIndex;
      var minIndex;
      var guess;
      return function (array, val) {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }();
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    var i1;
    var i3;
    this.interpolate = function interpolate(x2) {
      if (!x2) return 0;

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
    };
    return this;
  }
  function getInterpolateFunction(c) {
    swiper.controller.spline = swiper.params.loop ? new LinearSpline(swiper.slidesGrid, c.slidesGrid) : new LinearSpline(swiper.snapGrid, c.snapGrid);
  }
  function setTranslate(_t, byController) {
    var controlled = swiper.controller.control;
    var multiplier;
    var controlledTranslate;
    var Swiper = swiper.constructor;
    function setControlledTranslate(c) {
      if (c.destroyed) return;

      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }
      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
          multiplier = 1;
        }
        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
      }
      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (var i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition(duration, byController) {
    var Swiper = swiper.constructor;
    var controlled = swiper.controller.control;
    var i;
    function setControlledTransition(c) {
      if (c.destroyed) return;
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          (0, _utils.nextTick)(function () {
            c.updateAutoHeight();
          });
        }
        (0, _utils.elementTransitionEnd)(c.wrapperEl, function () {
          if (!controlled) return;
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }
  function removeSpline() {
    if (!swiper.controller.control) return;
    if (swiper.controller.spline) {
      swiper.controller.spline = undefined;
      delete swiper.controller.spline;
    }
  }
  on('beforeInit', function () {
    if (typeof window !== 'undefined' && (
    // eslint-disable-line
    typeof swiper.params.controller.control === 'string' || swiper.params.controller.control instanceof HTMLElement)) {
      var controlElement = document.querySelector(swiper.params.controller.control);
      if (controlElement && controlElement.swiper) {
        swiper.controller.control = controlElement.swiper;
      } else if (controlElement) {
        var onControllerSwiper = function onControllerSwiper(e) {
          swiper.controller.control = e.detail[0];
          swiper.update();
          controlElement.removeEventListener('init', onControllerSwiper);
        };
        controlElement.addEventListener('init', onControllerSwiper);
      }
      return;
    }
    swiper.controller.control = swiper.params.controller.control;
  });
  on('update', function () {
    removeSpline();
  });
  on('resize', function () {
    removeSpline();
  });
  on('observerUpdate', function () {
    removeSpline();
  });
  on('setTranslate', function (_s, translate, byController) {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTranslate(translate, byController);
  });
  on('setTransition', function (_s, duration, byController) {
    if (!swiper.controller.control || swiper.controller.control.destroyed) return;
    swiper.controller.setTransition(duration, byController);
  });
  Object.assign(swiper.controller, {
    setTranslate: setTranslate,
    setTransition: setTransition
  });
}

},{"../../shared/utils.js":104}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectCards;
var _createShadow = _interopRequireDefault(require("../../shared/create-shadow.js"));
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _effectVirtualTransitionEnd = _interopRequireDefault(require("../../shared/effect-virtual-transition-end.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectCards(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    cardsEffect: {
      slideShadows: true,
      rotate: true,
      perSlideRotate: 2,
      perSlideOffset: 8
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      activeIndex = swiper.activeIndex;
    var params = swiper.params.cardsEffect;
    var _swiper$touchEventsDa = swiper.touchEventsData,
      startTranslate = _swiper$touchEventsDa.startTranslate,
      isTouched = _swiper$touchEventsDa.isTouched;
    var currentTranslate = swiper.translate;
    for (var i = 0; i < slides.length; i += 1) {
      var slideEl = slides[i];
      var slideProgress = slideEl.progress;
      var progress = Math.min(Math.max(slideProgress, -4), 4);
      var offset = slideEl.swiperSlideOffset;
      if (swiper.params.centeredSlides && !swiper.params.cssMode) {
        swiper.wrapperEl.style.transform = "translateX(".concat(swiper.minTranslate(), "px)");
      }
      if (swiper.params.centeredSlides && swiper.params.cssMode) {
        offset -= slides[0].swiperSlideOffset;
      }
      var tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      var tY = 0;
      var tZ = -100 * Math.abs(progress);
      var scale = 1;
      var rotate = -params.perSlideRotate * progress;
      var tXAdd = params.perSlideOffset - Math.abs(progress) * 0.75;
      var slideIndex = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.from + i : i;
      var isSwipeToNext = (slideIndex === activeIndex || slideIndex === activeIndex - 1) && progress > 0 && progress < 1 && (isTouched || swiper.params.cssMode) && currentTranslate < startTranslate;
      var isSwipeToPrev = (slideIndex === activeIndex || slideIndex === activeIndex + 1) && progress < 0 && progress > -1 && (isTouched || swiper.params.cssMode) && currentTranslate > startTranslate;
      if (isSwipeToNext || isSwipeToPrev) {
        var subProgress = Math.pow(1 - Math.abs((Math.abs(progress) - 0.5) / 0.5), 0.5);
        rotate += -28 * progress * subProgress;
        scale += -0.5 * subProgress;
        tXAdd += 96 * subProgress;
        tY = "".concat(-25 * subProgress * Math.abs(progress), "%");
      }
      if (progress < 0) {
        // next
        tX = "calc(".concat(tX, "px + (").concat(tXAdd * Math.abs(progress), "%))");
      } else if (progress > 0) {
        // prev
        tX = "calc(".concat(tX, "px + (-").concat(tXAdd * Math.abs(progress), "%))");
      } else {
        tX = "".concat(tX, "px");
      }
      if (!swiper.isHorizontal()) {
        var prevY = tY;
        tY = tX;
        tX = prevY;
      }
      var scaleString = progress < 0 ? "".concat(1 + (1 - scale) * progress) : "".concat(1 - (1 - scale) * progress);
      var transform = "\n        translate3d(".concat(tX, ", ").concat(tY, ", ").concat(tZ, "px)\n        rotateZ(").concat(params.rotate ? rotate : 0, "deg)\n        scale(").concat(scaleString, ")\n      ");
      if (params.slideShadows) {
        // Set shadows
        var shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl) {
          shadowEl = (0, _createShadow["default"])(params, slideEl);
        }
        if (shadowEl) shadowEl.style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
      }
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
      el.querySelectorAll('.swiper-slide-shadow').forEach(function (shadowEl) {
        shadowEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
    (0, _effectVirtualTransitionEnd["default"])({
      swiper: swiper,
      duration: duration,
      transformElements: transformElements
    });
  };
  (0, _effectInit["default"])({
    effect: 'cards',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

},{"../../shared/create-shadow.js":96,"../../shared/effect-init.js":97,"../../shared/effect-target.js":98,"../../shared/effect-virtual-transition-end.js":99,"../../shared/utils.js":104}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectCoverflow;
var _createShadow = _interopRequireDefault(require("../../shared/create-shadow.js"));
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectCoverflow(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      scale: 1,
      modifier: 1,
      slideShadows: true
    }
  });
  var setTranslate = function setTranslate() {
    var swiperWidth = swiper.width,
      swiperHeight = swiper.height,
      slides = swiper.slides,
      slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth;
    // Each slide offset from center
    for (var i = 0, length = slides.length; i < length; i += 1) {
      var slideEl = slides[i];
      var slideSize = slidesSizesGrid[i];
      var slideOffset = slideEl.swiperSlideOffset;
      var centerOffset = (center - slideOffset - slideSize / 2) / slideSize;
      var offsetMultiplier = typeof params.modifier === 'function' ? params.modifier(centerOffset) : centerOffset * params.modifier;
      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      var translateZ = -translate * Math.abs(offsetMultiplier);
      var stretch = params.stretch;
      // Allow percentage to make a relative stretch for responsive sliders
      if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
        stretch = parseFloat(params.stretch) / 100 * slideSize;
      }
      var translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
      var translateX = isHorizontal ? stretch * offsetMultiplier : 0;
      var scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier);

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) translateX = 0;
      if (Math.abs(translateY) < 0.001) translateY = 0;
      if (Math.abs(translateZ) < 0.001) translateZ = 0;
      if (Math.abs(rotateY) < 0.001) rotateY = 0;
      if (Math.abs(rotateX) < 0.001) rotateX = 0;
      if (Math.abs(scale) < 0.001) scale = 0;
      var slideTransform = "translate3d(".concat(translateX, "px,").concat(translateY, "px,").concat(translateZ, "px)  rotateX(").concat(rotateX, "deg) rotateY(").concat(rotateY, "deg) scale(").concat(scale, ")");
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.transform = slideTransform;
      slideEl.style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        var shadowBeforeEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
        var shadowAfterEl = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
        if (!shadowBeforeEl) {
          shadowBeforeEl = (0, _createShadow["default"])(params, slideEl, isHorizontal ? 'left' : 'top');
        }
        if (!shadowAfterEl) {
          shadowAfterEl = (0, _createShadow["default"])(params, slideEl, isHorizontal ? 'right' : 'bottom');
        }
        if (shadowBeforeEl) shadowBeforeEl.style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
        if (shadowAfterEl) shadowAfterEl.style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
      }
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
      el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(function (shadowEl) {
        shadowEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
  };
  (0, _effectInit["default"])({
    effect: 'coverflow',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true
      };
    }
  });
}

},{"../../shared/create-shadow.js":96,"../../shared/effect-init.js":97,"../../shared/effect-target.js":98,"../../shared/utils.js":104}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectCreative;
var _createShadow = _interopRequireDefault(require("../../shared/create-shadow.js"));
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _effectVirtualTransitionEnd = _interopRequireDefault(require("../../shared/effect-virtual-transition-end.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectCreative(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    creativeEffect: {
      limitProgress: 1,
      shadowPerProgress: false,
      progressMultiplier: 1,
      perspective: true,
      prev: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      },
      next: {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        opacity: 1,
        scale: 1
      }
    }
  });
  var getTranslateValue = function getTranslateValue(value) {
    if (typeof value === 'string') return value;
    return "".concat(value, "px");
  };
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      wrapperEl = swiper.wrapperEl,
      slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.creativeEffect;
    var multiplier = params.progressMultiplier;
    var isCenteredSlides = swiper.params.centeredSlides;
    if (isCenteredSlides) {
      var margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
      wrapperEl.style.transform = "translateX(calc(50% - ".concat(margin, "px))");
    }
    var _loop = function _loop() {
      var slideEl = slides[i];
      var slideProgress = slideEl.progress;
      var progress = Math.min(Math.max(slideEl.progress, -params.limitProgress), params.limitProgress);
      var originalProgress = progress;
      if (!isCenteredSlides) {
        originalProgress = Math.min(Math.max(slideEl.originalProgress, -params.limitProgress), params.limitProgress);
      }
      var offset = slideEl.swiperSlideOffset;
      var t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
      var r = [0, 0, 0];
      var custom = false;
      if (!swiper.isHorizontal()) {
        t[1] = t[0];
        t[0] = 0;
      }
      var data = {
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        scale: 1,
        opacity: 1
      };
      if (progress < 0) {
        data = params.next;
        custom = true;
      } else if (progress > 0) {
        data = params.prev;
        custom = true;
      }
      // set translate
      t.forEach(function (value, index) {
        t[index] = "calc(".concat(value, "px + (").concat(getTranslateValue(data.translate[index]), " * ").concat(Math.abs(progress * multiplier), "))");
      });
      // set rotates
      r.forEach(function (value, index) {
        r[index] = data.rotate[index] * Math.abs(progress * multiplier);
      });
      slideEl.style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
      var translateString = t.join(', ');
      var rotateString = "rotateX(".concat(r[0], "deg) rotateY(").concat(r[1], "deg) rotateZ(").concat(r[2], "deg)");
      var scaleString = originalProgress < 0 ? "scale(".concat(1 + (1 - data.scale) * originalProgress * multiplier, ")") : "scale(".concat(1 - (1 - data.scale) * originalProgress * multiplier, ")");
      var opacityString = originalProgress < 0 ? 1 + (1 - data.opacity) * originalProgress * multiplier : 1 - (1 - data.opacity) * originalProgress * multiplier;
      var transform = "translate3d(".concat(translateString, ") ").concat(rotateString, " ").concat(scaleString);

      // Set shadows
      if (custom && data.shadow || !custom) {
        var shadowEl = slideEl.querySelector('.swiper-slide-shadow');
        if (!shadowEl && data.shadow) {
          shadowEl = (0, _createShadow["default"])(params, slideEl);
        }
        if (shadowEl) {
          var shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
          shadowEl.style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
        }
      }
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.transform = transform;
      targetEl.style.opacity = opacityString;
      if (data.origin) {
        targetEl.style.transformOrigin = data.origin;
      }
    };
    for (var i = 0; i < slides.length; i += 1) {
      _loop();
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
      el.querySelectorAll('.swiper-slide-shadow').forEach(function (shadowEl) {
        shadowEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
    (0, _effectVirtualTransitionEnd["default"])({
      swiper: swiper,
      duration: duration,
      transformElements: transformElements,
      allSlides: true
    });
  };
  (0, _effectInit["default"])({
    effect: 'creative',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    perspective: function perspective() {
      return swiper.params.creativeEffect.perspective;
    },
    overwriteParams: function overwriteParams() {
      return {
        watchSlidesProgress: true,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

},{"../../shared/create-shadow.js":96,"../../shared/effect-init.js":97,"../../shared/effect-target.js":98,"../../shared/effect-virtual-transition-end.js":99,"../../shared/utils.js":104}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectCube;
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectCube(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    }
  });
  var createSlideShadows = function createSlideShadows(slideEl, progress, isHorizontal) {
    var shadowBefore = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
    var shadowAfter = isHorizontal ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = (0, _utils.createElement)('div', "swiper-slide-shadow-".concat(isHorizontal ? 'left' : 'top'));
      slideEl.append(shadowBefore);
    }
    if (!shadowAfter) {
      shadowAfter = (0, _utils.createElement)('div', "swiper-slide-shadow-".concat(isHorizontal ? 'right' : 'bottom'));
      slideEl.append(shadowAfter);
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  var recreateShadows = function recreateShadows() {
    // create new ones
    var isHorizontal = swiper.isHorizontal();
    swiper.slides.forEach(function (slideEl) {
      var progress = Math.max(Math.min(slideEl.progress, 1), -1);
      createSlideShadows(slideEl, progress, isHorizontal);
    });
  };
  var setTranslate = function setTranslate() {
    var el = swiper.el,
      wrapperEl = swiper.wrapperEl,
      slides = swiper.slides,
      swiperWidth = swiper.width,
      swiperHeight = swiper.height,
      rtl = swiper.rtlTranslate,
      swiperSize = swiper.size,
      browser = swiper.browser;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl = swiper.slidesEl.querySelector('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = (0, _utils.createElement)('div', 'swiper-cube-shadow');
          swiper.slidesEl.append(cubeShadowEl);
        }
        cubeShadowEl.style.height = "".concat(swiperWidth, "px");
      } else {
        cubeShadowEl = el.querySelector('.swiper-cube-shadow');
        if (!cubeShadowEl) {
          cubeShadowEl = (0, _utils.createElement)('div', 'swiper-cube-shadow');
          el.append(cubeShadowEl);
        }
      }
    }
    for (var i = 0; i < slides.length; i += 1) {
      var slideEl = slides[i];
      var slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index'), 10);
      }
      var slideAngle = slideIndex * 90;
      var round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      var progress = Math.max(Math.min(slideEl.progress, 1), -1);
      var tx = 0;
      var ty = 0;
      var tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + round * 4 * swiperSize;
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = 3 * swiperSize + swiperSize * 4 * round;
      }
      if (rtl) {
        tx = -tx;
      }
      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }
      var transform = "rotateX(".concat(isHorizontal ? 0 : -slideAngle, "deg) rotateY(").concat(isHorizontal ? slideAngle : 0, "deg) translate3d(").concat(tx, "px, ").concat(ty, "px, ").concat(tz, "px)");
      if (progress <= 1 && progress > -1) {
        wrapperRotate = slideIndex * 90 + progress * 90;
        if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
      }
      slideEl.style.transform = transform;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, isHorizontal);
      }
    }
    wrapperEl.style.transformOrigin = "50% 50% -".concat(swiperSize / 2, "px");
    wrapperEl.style['-webkit-transform-origin'] = "50% 50% -".concat(swiperSize / 2, "px");
    if (params.shadow) {
      if (isHorizontal) {
        cubeShadowEl.style.transform = "translate3d(0px, ".concat(swiperWidth / 2 + params.shadowOffset, "px, ").concat(-swiperWidth / 2, "px) rotateX(90deg) rotateZ(0deg) scale(").concat(params.shadowScale, ")");
      } else {
        var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
        var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var offset = params.shadowOffset;
        cubeShadowEl.style.transform = "scale3d(".concat(scale1, ", 1, ").concat(scale2, ") translate3d(0px, ").concat(swiperHeight / 2 + offset, "px, ").concat(-swiperHeight / 2 / scale2, "px) rotateX(-90deg)");
      }
    }
    var zFactor = (browser.isSafari || browser.isWebView) && browser.needPerspectiveFix ? -swiperSize / 2 : 0;
    wrapperEl.style.transform = "translate3d(0px,0,".concat(zFactor, "px) rotateX(").concat(swiper.isHorizontal() ? 0 : wrapperRotate, "deg) rotateY(").concat(swiper.isHorizontal() ? -wrapperRotate : 0, "deg)");
    wrapperEl.style.setProperty('--swiper-cube-translate-z', "".concat(zFactor, "px"));
  };
  var setTransition = function setTransition(duration) {
    var el = swiper.el,
      slides = swiper.slides;
    slides.forEach(function (slideEl) {
      slideEl.style.transitionDuration = "".concat(duration, "ms");
      slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(function (subEl) {
        subEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      var shadowEl = el.querySelector('.swiper-cube-shadow');
      if (shadowEl) shadowEl.style.transitionDuration = "".concat(duration, "ms");
    }
  };
  (0, _effectInit["default"])({
    effect: 'cube',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    recreateShadows: recreateShadows,
    getEffectParams: function getEffectParams() {
      return swiper.params.cubeEffect;
    },
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true
      };
    }
  });
}

},{"../../shared/effect-init.js":97,"../../shared/utils.js":104}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectFade;
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _effectVirtualTransitionEnd = _interopRequireDefault(require("../../shared/effect-virtual-transition-end.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectFade(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  var setTranslate = function setTranslate() {
    var slides = swiper.slides;
    var params = swiper.params.fadeEffect;
    for (var i = 0; i < slides.length; i += 1) {
      var slideEl = swiper.slides[i];
      var offset = slideEl.swiperSlideOffset;
      var tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = "translate3d(".concat(tx, "px, ").concat(ty, "px, 0px)");
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
    });
    (0, _effectVirtualTransitionEnd["default"])({
      swiper: swiper,
      duration: duration,
      transformElements: transformElements,
      allSlides: true
    });
  };
  (0, _effectInit["default"])({
    effect: 'fade',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

},{"../../shared/effect-init.js":97,"../../shared/effect-target.js":98,"../../shared/effect-virtual-transition-end.js":99,"../../shared/utils.js":104}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EffectFlip;
var _createShadow = _interopRequireDefault(require("../../shared/create-shadow.js"));
var _effectInit = _interopRequireDefault(require("../../shared/effect-init.js"));
var _effectTarget = _interopRequireDefault(require("../../shared/effect-target.js"));
var _effectVirtualTransitionEnd = _interopRequireDefault(require("../../shared/effect-virtual-transition-end.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function EffectFlip(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    flipEffect: {
      slideShadows: true,
      limitRotation: true
    }
  });
  var createSlideShadows = function createSlideShadows(slideEl, progress, params) {
    var shadowBefore = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-left') : slideEl.querySelector('.swiper-slide-shadow-top');
    var shadowAfter = swiper.isHorizontal() ? slideEl.querySelector('.swiper-slide-shadow-right') : slideEl.querySelector('.swiper-slide-shadow-bottom');
    if (!shadowBefore) {
      shadowBefore = (0, _createShadow["default"])(params, slideEl, swiper.isHorizontal() ? 'left' : 'top');
    }
    if (!shadowAfter) {
      shadowAfter = (0, _createShadow["default"])(params, slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
    }
    if (shadowBefore) shadowBefore.style.opacity = Math.max(-progress, 0);
    if (shadowAfter) shadowAfter.style.opacity = Math.max(progress, 0);
  };
  var recreateShadows = function recreateShadows() {
    // Set shadows
    var params = swiper.params.flipEffect;
    swiper.slides.forEach(function (slideEl) {
      var progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      createSlideShadows(slideEl, progress, params);
    });
  };
  var setTranslate = function setTranslate() {
    var slides = swiper.slides,
      rtl = swiper.rtlTranslate;
    var params = swiper.params.flipEffect;
    for (var i = 0; i < slides.length; i += 1) {
      var slideEl = slides[i];
      var progress = slideEl.progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min(slideEl.progress, 1), -1);
      }
      var offset = slideEl.swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (rtl) {
        rotateY = -rotateY;
      }
      slideEl.style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
      if (params.slideShadows) {
        createSlideShadows(slideEl, progress, params);
      }
      var transform = "translate3d(".concat(tx, "px, ").concat(ty, "px, 0px) rotateX(").concat(rotateX, "deg) rotateY(").concat(rotateY, "deg)");
      var targetEl = (0, _effectTarget["default"])(params, slideEl);
      targetEl.style.transform = transform;
    }
  };
  var setTransition = function setTransition(duration) {
    var transformElements = swiper.slides.map(function (slideEl) {
      return (0, _utils.getSlideTransformEl)(slideEl);
    });
    transformElements.forEach(function (el) {
      el.style.transitionDuration = "".concat(duration, "ms");
      el.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(function (shadowEl) {
        shadowEl.style.transitionDuration = "".concat(duration, "ms");
      });
    });
    (0, _effectVirtualTransitionEnd["default"])({
      swiper: swiper,
      duration: duration,
      transformElements: transformElements
    });
  };
  (0, _effectInit["default"])({
    effect: 'flip',
    swiper: swiper,
    on: on,
    setTranslate: setTranslate,
    setTransition: setTransition,
    recreateShadows: recreateShadows,
    getEffectParams: function getEffectParams() {
      return swiper.params.flipEffect;
    },
    perspective: function perspective() {
      return true;
    },
    overwriteParams: function overwriteParams() {
      return {
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper.params.cssMode
      };
    }
  });
}

},{"../../shared/create-shadow.js":96,"../../shared/effect-init.js":97,"../../shared/effect-target.js":98,"../../shared/effect-virtual-transition-end.js":99,"../../shared/utils.js":104}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = freeMode;
var _utils = require("../../shared/utils.js");
function freeMode(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    emit = _ref.emit,
    once = _ref.once;
  extendParams({
    freeMode: {
      enabled: false,
      momentum: true,
      momentumRatio: 1,
      momentumBounce: true,
      momentumBounceRatio: 1,
      momentumVelocityRatio: 1,
      sticky: false,
      minimumVelocity: 0.02
    }
  });
  function onTouchStart() {
    var translate = swiper.getTranslate();
    swiper.setTranslate(translate);
    swiper.setTransition(0);
    swiper.touchEventsData.velocities.length = 0;
    swiper.freeMode.onTouchEnd({
      currentPos: swiper.rtl ? swiper.translate : -swiper.translate
    });
  }
  function onTouchMove() {
    var data = swiper.touchEventsData,
      touches = swiper.touches;
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: (0, _utils.now)()
    });
  }
  function onTouchEnd(_ref2) {
    var currentPos = _ref2.currentPos;
    var params = swiper.params,
      wrapperEl = swiper.wrapperEl,
      rtl = swiper.rtlTranslate,
      snapGrid = swiper.snapGrid,
      data = swiper.touchEventsData;
    // Time diff
    var touchEndTime = (0, _utils.now)();
    var timeDiff = touchEndTime - data.touchStartTime;
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }
    if (params.freeMode.momentum) {
      if (data.velocities.length > 1) {
        var lastMoveEvent = data.velocities.pop();
        var velocityEvent = data.velocities.pop();
        var distance = lastMoveEvent.position - velocityEvent.position;
        var time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || (0, _utils.now)() - lastMoveEvent.time > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeMode.momentumVelocityRatio;
      data.velocities.length = 0;
      var momentumDuration = 1000 * params.freeMode.momentumRatio;
      var momentumDistance = swiper.velocity * momentumDuration;
      var newPosition = swiper.translate + momentumDistance;
      if (rtl) newPosition = -newPosition;
      var doBounce = false;
      var afterBouncePosition;
      var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
      var needsLoopFix;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeMode.momentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
        if (params.loop && params.centeredSlides) needsLoopFix = true;
      } else if (params.freeMode.sticky) {
        var nextSlide;
        for (var j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      if (needsLoopFix) {
        once('transitionEnd', function () {
          swiper.loopFix();
        });
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
        if (params.freeMode.sticky) {
          // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
          // event, then durations can be 20+ seconds to slide one (or zero!) slides.
          // It's easy to see this when simulating touch with mouse events. To fix this,
          // limit single-slide swipes to the default slide duration. This also has the
          // nice side effect of matching slide speed if the user stopped moving before
          // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
          // For faster swipes, also apply limits (albeit higher ones).
          var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
          var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
          if (moveDistance < currentSlideSize) {
            momentumDuration = params.speed;
          } else if (moveDistance < 2 * currentSlideSize) {
            momentumDuration = params.speed * 1.5;
          } else {
            momentumDuration = params.speed * 2.5;
          }
        }
      } else if (params.freeMode.sticky) {
        swiper.slideToClosest();
        return;
      }
      if (params.freeMode.momentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        swiper.animating = true;
        (0, _utils.elementTransitionEnd)(wrapperEl, function () {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
          emit('momentumBounce');
          swiper.setTransition(params.speed);
          setTimeout(function () {
            swiper.setTranslate(afterBouncePosition);
            (0, _utils.elementTransitionEnd)(wrapperEl, function () {
              if (!swiper || swiper.destroyed) return;
              swiper.transitionEnd();
            });
          }, 0);
        });
      } else if (swiper.velocity) {
        emit('_freeModeNoMomentumRelease');
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart(true, swiper.swipeDirection);
        if (!swiper.animating) {
          swiper.animating = true;
          (0, _utils.elementTransitionEnd)(wrapperEl, function () {
            if (!swiper || swiper.destroyed) return;
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    } else if (params.freeMode.sticky) {
      swiper.slideToClosest();
      return;
    } else if (params.freeMode) {
      emit('_freeModeNoMomentumRelease');
    }
    if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
  }
  Object.assign(swiper, {
    freeMode: {
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
      onTouchEnd: onTouchEnd
    }
  });
}

},{"../../shared/utils.js":104}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Grid;
function Grid(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams;
  extendParams({
    grid: {
      rows: 1,
      fill: 'column'
    }
  });
  var slidesNumberEvenToRows;
  var slidesPerRow;
  var numFullColumns;
  var initSlides = function initSlides(slidesLength) {
    var slidesPerView = swiper.params.slidesPerView;
    var _swiper$params$grid = swiper.params.grid,
      rows = _swiper$params$grid.rows,
      fill = _swiper$params$grid.fill;
    slidesPerRow = slidesNumberEvenToRows / rows;
    numFullColumns = Math.floor(slidesLength / rows);
    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }
    if (slidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
    }
  };
  var updateSlide = function updateSlide(i, slide, slidesLength, getDirectionLabel) {
    var _swiper$params = swiper.params,
      slidesPerGroup = _swiper$params.slidesPerGroup,
      spaceBetween = _swiper$params.spaceBetween;
    var _swiper$params$grid2 = swiper.params.grid,
      rows = _swiper$params$grid2.rows,
      fill = _swiper$params$grid2.fill;
    // Set slides order
    var newSlideOrderIndex;
    var column;
    var row;
    if (fill === 'row' && slidesPerGroup > 1) {
      var groupIndex = Math.floor(i / (slidesPerGroup * rows));
      var slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      var columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
      newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
      slide.style.order = newSlideOrderIndex;
    } else if (fill === 'column') {
      column = Math.floor(i / rows);
      row = i - column * rows;
      if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
        row += 1;
        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }
    slide.style[getDirectionLabel('margin-top')] = row !== 0 ? spaceBetween && "".concat(spaceBetween, "px") : '';
  };
  var updateWrapperSize = function updateWrapperSize(slideSize, snapGrid, getDirectionLabel) {
    var _swiper$params2 = swiper.params,
      spaceBetween = _swiper$params2.spaceBetween,
      centeredSlides = _swiper$params2.centeredSlides,
      roundLengths = _swiper$params2.roundLengths;
    var rows = swiper.params.grid.rows;
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    swiper.wrapperEl.style[getDirectionLabel('width')] = "".concat(swiper.virtualSize + spaceBetween, "px");
    if (centeredSlides) {
      var newSlidesGrid = [];
      for (var i = 0; i < snapGrid.length; i += 1) {
        var slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }
      snapGrid.splice(0, snapGrid.length);
      snapGrid.push.apply(snapGrid, newSlidesGrid);
    }
  };
  swiper.grid = {
    initSlides: initSlides,
    updateSlide: updateSlide,
    updateWrapperSize: updateWrapperSize
  };
}

},{}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = HashNavigation;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function HashNavigation(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    emit = _ref.emit,
    on = _ref.on;
  var initialized = false;
  var document = (0, _ssrWindow.getDocument)();
  var window = (0, _ssrWindow.getWindow)();
  extendParams({
    hashNavigation: {
      enabled: false,
      replaceState: false,
      watchState: false,
      getSlideIndex: function getSlideIndex(_s, hash) {
        if (swiper.virtual && swiper.params.virtual.enabled) {
          var slideWithHash = swiper.slides.filter(function (slideEl) {
            return slideEl.getAttribute('data-hash') === hash;
          })[0];
          if (!slideWithHash) return 0;
          var index = parseInt(slideWithHash.getAttribute('data-swiper-slide-index'), 10);
          return index;
        }
        return swiper.getSlideIndex((0, _utils.elementChildren)(swiper.slidesEl, ".".concat(swiper.params.slideClass, "[data-hash=\"").concat(hash, "\"], swiper-slide[data-hash=\"").concat(hash, "\"]"))[0]);
      }
    }
  });
  var onHashChange = function onHashChange() {
    emit('hashChange');
    var newHash = document.location.hash.replace('#', '');
    var activeSlideEl = swiper.slidesEl.querySelector("[data-swiper-slide-index=\"".concat(swiper.activeIndex, "\"]"));
    var activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
    if (newHash !== activeSlideHash) {
      var newIndex = swiper.params.hashNavigation.getSlideIndex(swiper, newHash);
      console.log(newIndex);
      if (typeof newIndex === 'undefined') return;
      swiper.slideTo(newIndex);
    }
  };
  var setHash = function setHash() {
    if (!initialized || !swiper.params.hashNavigation.enabled) return;
    var activeSlideEl = swiper.slidesEl.querySelector("[data-swiper-slide-index=\"".concat(swiper.activeIndex, "\"]"));
    var activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history') : '';
    if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
      window.history.replaceState(null, null, "#".concat(activeSlideHash) || '');
      emit('hashSet');
    } else {
      document.location.hash = activeSlideHash || '';
      emit('hashSet');
    }
  };
  var init = function init() {
    if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) return;
    initialized = true;
    var hash = document.location.hash.replace('#', '');
    if (hash) {
      var speed = 0;
      var index = swiper.params.hashNavigation.getSlideIndex(swiper, hash);
      swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
    }
    if (swiper.params.hashNavigation.watchState) {
      window.addEventListener('hashchange', onHashChange);
    }
  };
  var destroy = function destroy() {
    if (swiper.params.hashNavigation.watchState) {
      window.removeEventListener('hashchange', onHashChange);
    }
  };
  on('init', function () {
    if (swiper.params.hashNavigation.enabled) {
      init();
    }
  });
  on('destroy', function () {
    if (swiper.params.hashNavigation.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', function () {
    if (initialized) {
      setHash();
    }
  });
  on('slideChange', function () {
    if (initialized && swiper.params.cssMode) {
      setHash();
    }
  });
}

},{"../../shared/utils.js":104,"ssr-window":8}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = History;
var _ssrWindow = require("ssr-window");
function History(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    history: {
      enabled: false,
      root: '',
      replaceState: false,
      key: 'slides',
      keepQuery: false
    }
  });
  var initialized = false;
  var paths = {};
  var slugify = function slugify(text) {
    return text.toString().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };
  var getPathValues = function getPathValues(urlOverride) {
    var window = (0, _ssrWindow.getWindow)();
    var location;
    if (urlOverride) {
      location = new URL(urlOverride);
    } else {
      location = window.location;
    }
    var pathArray = location.pathname.slice(1).split('/').filter(function (part) {
      return part !== '';
    });
    var total = pathArray.length;
    var key = pathArray[total - 2];
    var value = pathArray[total - 1];
    return {
      key: key,
      value: value
    };
  };
  var setHistory = function setHistory(key, index) {
    var window = (0, _ssrWindow.getWindow)();
    if (!initialized || !swiper.params.history.enabled) return;
    var location;
    if (swiper.params.url) {
      location = new URL(swiper.params.url);
    } else {
      location = window.location;
    }
    var slide = swiper.slides[index];
    var value = slugify(slide.getAttribute('data-history'));
    if (swiper.params.history.root.length > 0) {
      var root = swiper.params.history.root;
      if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
      value = "".concat(root, "/").concat(key ? "".concat(key, "/") : '').concat(value);
    } else if (!location.pathname.includes(key)) {
      value = "".concat(key ? "".concat(key, "/") : '').concat(value);
    }
    if (swiper.params.history.keepQuery) {
      value += location.search;
    }
    var currentState = window.history.state;
    if (currentState && currentState.value === value) {
      return;
    }
    if (swiper.params.history.replaceState) {
      window.history.replaceState({
        value: value
      }, null, value);
    } else {
      window.history.pushState({
        value: value
      }, null, value);
    }
  };
  var scrollToSlide = function scrollToSlide(speed, value, runCallbacks) {
    if (value) {
      for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
        var slide = swiper.slides[i];
        var slideHistory = slugify(slide.getAttribute('data-history'));
        if (slideHistory === value) {
          var index = swiper.getSlideIndex(slide);
          swiper.slideTo(index, speed, runCallbacks);
        }
      }
    } else {
      swiper.slideTo(0, speed, runCallbacks);
    }
  };
  var setHistoryPopState = function setHistoryPopState() {
    paths = getPathValues(swiper.params.url);
    scrollToSlide(swiper.params.speed, paths.value, false);
  };
  var init = function init() {
    var window = (0, _ssrWindow.getWindow)();
    if (!swiper.params.history) return;
    if (!window.history || !window.history.pushState) {
      swiper.params.history.enabled = false;
      swiper.params.hashNavigation.enabled = true;
      return;
    }
    initialized = true;
    paths = getPathValues(swiper.params.url);
    if (!paths.key && !paths.value) {
      if (!swiper.params.history.replaceState) {
        window.addEventListener('popstate', setHistoryPopState);
      }
      return;
    }
    scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
    if (!swiper.params.history.replaceState) {
      window.addEventListener('popstate', setHistoryPopState);
    }
  };
  var destroy = function destroy() {
    var window = (0, _ssrWindow.getWindow)();
    if (!swiper.params.history.replaceState) {
      window.removeEventListener('popstate', setHistoryPopState);
    }
  };
  on('init', function () {
    if (swiper.params.history.enabled) {
      init();
    }
  });
  on('destroy', function () {
    if (swiper.params.history.enabled) {
      destroy();
    }
  });
  on('transitionEnd _freeModeNoMomentumRelease', function () {
    if (initialized) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
  on('slideChange', function () {
    if (initialized && swiper.params.cssMode) {
      setHistory(swiper.params.history.key, swiper.activeIndex);
    }
  });
}

},{"ssr-window":8}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Keyboard;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
/* eslint-disable consistent-return */

function Keyboard(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var document = (0, _ssrWindow.getDocument)();
  var window = (0, _ssrWindow.getWindow)();
  swiper.keyboard = {
    enabled: false
  };
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true
    }
  });
  function handle(event) {
    if (!swiper.enabled) return;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    var kc = e.keyCode || e.charCode;
    var pageUpDown = swiper.params.keyboard.pageUpDown;
    var isPageUp = pageUpDown && kc === 33;
    var isPageDown = pageUpDown && kc === 34;
    var isArrowLeft = kc === 37;
    var isArrowRight = kc === 39;
    var isArrowUp = kc === 38;
    var isArrowDown = kc === 40;
    // Directions locks
    if (!swiper.allowSlideNext && (swiper.isHorizontal() && isArrowRight || swiper.isVertical() && isArrowDown || isPageDown)) {
      return false;
    }
    if (!swiper.allowSlidePrev && (swiper.isHorizontal() && isArrowLeft || swiper.isVertical() && isArrowUp || isPageUp)) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }
    if (swiper.params.keyboard.onlyInViewport && (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
      var inView = false;
      // Check that swiper should be inside of visible area of window
      if ((0, _utils.elementParents)(swiper.el, ".".concat(swiper.params.slideClass, ", swiper-slide")).length > 0 && (0, _utils.elementParents)(swiper.el, ".".concat(swiper.params.slideActiveClass)).length === 0) {
        return undefined;
      }
      var el = swiper.el;
      var swiperWidth = el.clientWidth;
      var swiperHeight = el.clientHeight;
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var swiperOffset = (0, _utils.elementOffset)(el);
      if (rtl) swiperOffset.left -= el.scrollLeft;
      var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiperWidth, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiperHeight], [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight]];
      for (var i = 0; i < swiperCoord.length; i += 1) {
        var point = swiperCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if ((isPageDown || isArrowRight) && !rtl || (isPageUp || isArrowLeft) && rtl) swiper.slideNext();
      if ((isPageUp || isArrowLeft) && !rtl || (isPageDown || isArrowRight) && rtl) swiper.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) swiper.slideNext();
      if (isPageUp || isArrowUp) swiper.slidePrev();
    }
    emit('keyPress', kc);
    return undefined;
  }
  function enable() {
    if (swiper.keyboard.enabled) return;
    document.addEventListener('keydown', handle);
    swiper.keyboard.enabled = true;
  }
  function disable() {
    if (!swiper.keyboard.enabled) return;
    document.removeEventListener('keydown', handle);
    swiper.keyboard.enabled = false;
  }
  on('init', function () {
    if (swiper.params.keyboard.enabled) {
      enable();
    }
  });
  on('destroy', function () {
    if (swiper.keyboard.enabled) {
      disable();
    }
  });
  Object.assign(swiper.keyboard, {
    enable: enable,
    disable: disable
  });
}

},{"../../shared/utils.js":104,"ssr-window":8}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Manipulation;
var _appendSlide = _interopRequireDefault(require("./methods/appendSlide.js"));
var _prependSlide = _interopRequireDefault(require("./methods/prependSlide.js"));
var _addSlide = _interopRequireDefault(require("./methods/addSlide.js"));
var _removeSlide = _interopRequireDefault(require("./methods/removeSlide.js"));
var _removeAllSlides = _interopRequireDefault(require("./methods/removeAllSlides.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Manipulation(_ref) {
  var swiper = _ref.swiper;
  Object.assign(swiper, {
    appendSlide: _appendSlide["default"].bind(swiper),
    prependSlide: _prependSlide["default"].bind(swiper),
    addSlide: _addSlide["default"].bind(swiper),
    removeSlide: _removeSlide["default"].bind(swiper),
    removeAllSlides: _removeAllSlides["default"].bind(swiper)
  });
}

},{"./methods/addSlide.js":81,"./methods/appendSlide.js":82,"./methods/prependSlide.js":83,"./methods/removeAllSlides.js":84,"./methods/removeSlide.js":85}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addSlide;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function addSlide(index, slides) {
  var swiper = this;
  var params = swiper.params,
    activeIndex = swiper.activeIndex,
    slidesEl = swiper.slidesEl;
  var activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
    swiper.recalcSlides();
  }
  var baseLength = swiper.slides.length;
  if (index <= 0) {
    swiper.prependSlide(slides);
    return;
  }
  if (index >= baseLength) {
    swiper.appendSlide(slides);
    return;
  }
  var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
  var slidesBuffer = [];
  for (var i = baseLength - 1; i >= index; i -= 1) {
    var currentSlide = swiper.slides[i];
    currentSlide.remove();
    slidesBuffer.unshift(currentSlide);
  }
  if (_typeof(slides) === 'object' && 'length' in slides) {
    for (var _i = 0; _i < slides.length; _i += 1) {
      if (slides[_i]) slidesEl.append(slides[_i]);
    }
    newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    slidesEl.append(slides);
  }
  for (var _i2 = 0; _i2 < slidesBuffer.length; _i2 += 1) {
    slidesEl.append(slidesBuffer[_i2]);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

},{}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appendSlide;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function appendSlide(slides) {
  var swiper = this;
  var params = swiper.params,
    slidesEl = swiper.slidesEl;
  if (params.loop) {
    swiper.loopDestroy();
  }
  var appendElement = function appendElement(slideEl) {
    if (typeof slideEl === 'string') {
      var tempDOM = document.createElement('div');
      tempDOM.innerHTML = slideEl;
      slidesEl.append(tempDOM.children[0]);
      tempDOM.innerHTML = '';
    } else {
      slidesEl.append(slideEl);
    }
  };
  if (_typeof(slides) === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) appendElement(slides[i]);
    }
  } else {
    appendElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
}

},{}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = prependSlide;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function prependSlide(slides) {
  var swiper = this;
  var params = swiper.params,
    activeIndex = swiper.activeIndex,
    slidesEl = swiper.slidesEl;
  if (params.loop) {
    swiper.loopDestroy();
  }
  var newActiveIndex = activeIndex + 1;
  var prependElement = function prependElement(slideEl) {
    if (typeof slideEl === 'string') {
      var tempDOM = document.createElement('div');
      tempDOM.innerHTML = slideEl;
      slidesEl.prepend(tempDOM.children[0]);
      tempDOM.innerHTML = '';
    } else {
      slidesEl.prepend(slideEl);
    }
  };
  if (_typeof(slides) === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) prependElement(slides[i]);
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    prependElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
}

},{}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeAllSlides;
function removeAllSlides() {
  var swiper = this;
  var slidesIndexes = [];
  for (var i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
}

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removeSlide;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function removeSlide(slidesIndexes) {
  var swiper = this;
  var params = swiper.params,
    activeIndex = swiper.activeIndex;
  var activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides;
    swiper.loopDestroy();
  }
  var newActiveIndex = activeIndexBuffer;
  var indexToRemove;
  if (_typeof(slidesIndexes) === 'object' && 'length' in slidesIndexes) {
    for (var i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove].remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}

},{}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Mousewheel;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
/* eslint-disable consistent-return */

function Mousewheel(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var window = (0, _ssrWindow.getWindow)();
  extendParams({
    mousewheel: {
      enabled: false,
      releaseOnEdges: false,
      invert: false,
      forceToAxis: false,
      sensitivity: 1,
      eventsTarget: 'container',
      thresholdDelta: null,
      thresholdTime: null
    }
  });
  swiper.mousewheel = {
    enabled: false
  };
  var timeout;
  var lastScrollTime = (0, _utils.now)();
  var lastEventBeforeSnap;
  var recentWheelEvents = [];
  function normalize(e) {
    // Reasonable defaults
    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;
    var sX = 0;
    var sY = 0; // spinX, spinY
    var pX = 0;
    var pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail' in e) {
      sY = e.detail;
    }
    if ('wheelDelta' in e) {
      sY = -e.wheelDelta / 120;
    }
    if ('wheelDeltaY' in e) {
      sY = -e.wheelDeltaY / 120;
    }
    if ('wheelDeltaX' in e) {
      sX = -e.wheelDeltaX / 120;
    }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }
    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;
    if ('deltaY' in e) {
      pY = e.deltaY;
    }
    if ('deltaX' in e) {
      pX = e.deltaX;
    }
    if (e.shiftKey && !pX) {
      // if user scrolls with shift he wants horizontal scroll
      pX = pY;
      pY = 0;
    }
    if ((pX || pY) && e.deltaMode) {
      if (e.deltaMode === 1) {
        // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      } else {
        // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) {
      sX = pX < 1 ? -1 : 1;
    }
    if (pY && !sY) {
      sY = pY < 1 ? -1 : 1;
    }
    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  }
  function handleMouseEnter() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = true;
  }
  function handleMouseLeave() {
    if (!swiper.enabled) return;
    swiper.mouseEntered = false;
  }
  function animateSlider(newEvent) {
    if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
      // Prevent if delta of wheel scroll delta is below configured threshold
      return false;
    }
    if (swiper.params.mousewheel.thresholdTime && (0, _utils.now)() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
      // Prevent if time between scrolls is below configured threshold
      return false;
    }

    // If the movement is NOT big enough and
    // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
    //   Don't go any further (avoid insignificant scroll movement).
    if (newEvent.delta >= 6 && (0, _utils.now)() - lastScrollTime < 60) {
      // Return false as a default
      return true;
    }
    // If user is scrolling towards the end:
    //   If the slider hasn't hit the latest slide or
    //   if the slider is a loop and
    //   if the slider isn't moving right now:
    //     Go to next slide and
    //     emit a scroll event.
    // Else (the user is scrolling towards the beginning) and
    // if the slider hasn't hit the first slide or
    // if the slider is a loop and
    // if the slider isn't moving right now:
    //   Go to prev slide and
    //   emit a scroll event.
    if (newEvent.direction < 0) {
      if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
        swiper.slideNext();
        emit('scroll', newEvent.raw);
      }
    } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
      swiper.slidePrev();
      emit('scroll', newEvent.raw);
    }
    // If you got here is because an animation has been triggered so store the current time
    lastScrollTime = new window.Date().getTime();
    // Return false as a default
    return false;
  }
  function releaseScroll(newEvent) {
    var params = swiper.params.mousewheel;
    if (newEvent.direction < 0) {
      if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }
    } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
      // Return true to animate scroll on edges
      return true;
    }
    return false;
  }
  function handle(event) {
    var e = event;
    var disableParentSwiper = true;
    if (!swiper.enabled) return;
    var params = swiper.params.mousewheel;
    if (swiper.params.cssMode) {
      e.preventDefault();
    }
    var targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    var targetElContainsTarget = targetEl && targetEl.contains(e.target);
    if (!swiper.mouseEntered && !targetElContainsTarget && !params.releaseOnEdges) return true;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    var delta = 0;
    var rtlFactor = swiper.rtlTranslate ? -1 : 1;
    var data = normalize(e);
    if (params.forceToAxis) {
      if (swiper.isHorizontal()) {
        if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;else return true;
      } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;else return true;
    } else {
      delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
    }
    if (delta === 0) return true;
    if (params.invert) delta = -delta;

    // Get the scroll positions
    var positions = swiper.getTranslate() + delta * params.sensitivity;
    if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
    if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate();

    // When loop is true:
    //     the disableParentSwiper will be true.
    // When loop is false:
    //     if the scroll positions is not on edge,
    //     then the disableParentSwiper will be true.
    //     if the scroll on edge positions,
    //     then the disableParentSwiper will be false.
    disableParentSwiper = swiper.params.loop ? true : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
    if (disableParentSwiper && swiper.params.nested) e.stopPropagation();
    if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
      // Register the new event in a variable which stores the relevant data
      var newEvent = {
        time: (0, _utils.now)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta),
        raw: event
      };

      // Keep the most recent events
      if (recentWheelEvents.length >= 2) {
        recentWheelEvents.shift(); // only store the last N events
      }

      var prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
      recentWheelEvents.push(newEvent);

      // If there is at least one previous recorded event:
      //   If direction has changed or
      //   if the scroll is quicker than the previous one:
      //     Animate the slider.
      // Else (this is the first time the wheel is moved):
      //     Animate the slider.
      if (prevEvent) {
        if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta || newEvent.time > prevEvent.time + 150) {
          animateSlider(newEvent);
        }
      } else {
        animateSlider(newEvent);
      }

      // If it's time to release the scroll:
      //   Return now so you don't hit the preventDefault.
      if (releaseScroll(newEvent)) {
        return true;
      }
    } else {
      // Freemode or scrollContainer:

      // If we recently snapped after a momentum scroll, then ignore wheel events
      // to give time for the deceleration to finish. Stop ignoring after 500 msecs
      // or if it's a new scroll (larger delta or inverse sign as last event before
      // an end-of-momentum snap).
      var _newEvent = {
        time: (0, _utils.now)(),
        delta: Math.abs(delta),
        direction: Math.sign(delta)
      };
      var ignoreWheelEvents = lastEventBeforeSnap && _newEvent.time < lastEventBeforeSnap.time + 500 && _newEvent.delta <= lastEventBeforeSnap.delta && _newEvent.direction === lastEventBeforeSnap.direction;
      if (!ignoreWheelEvents) {
        lastEventBeforeSnap = undefined;
        var position = swiper.getTranslate() + delta * params.sensitivity;
        var wasBeginning = swiper.isBeginning;
        var wasEnd = swiper.isEnd;
        if (position >= swiper.minTranslate()) position = swiper.minTranslate();
        if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }
        if (swiper.params.loop) {
          swiper.loopFix({
            direction: _newEvent.direction < 0 ? 'next' : 'prev',
            byMousewheel: true
          });
        }
        if (swiper.params.freeMode.sticky) {
          // When wheel scrolling starts with sticky (aka snap) enabled, then detect
          // the end of a momentum scroll by storing recent (N=15?) wheel events.
          // 1. do all N events have decreasing or same (absolute value) delta?
          // 2. did all N events arrive in the last M (M=500?) msecs?
          // 3. does the earliest event have an (absolute value) delta that's
          //    at least P (P=1?) larger than the most recent event's delta?
          // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
          // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
          // Snap immediately and ignore remaining wheel events in this scroll.
          // See comment above for "remaining wheel events in this scroll" determination.
          // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
          clearTimeout(timeout);
          timeout = undefined;
          if (recentWheelEvents.length >= 15) {
            recentWheelEvents.shift(); // only store the last N events
          }

          var _prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
          var firstEvent = recentWheelEvents[0];
          recentWheelEvents.push(_newEvent);
          if (_prevEvent && (_newEvent.delta > _prevEvent.delta || _newEvent.direction !== _prevEvent.direction)) {
            // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
            recentWheelEvents.splice(0);
          } else if (recentWheelEvents.length >= 15 && _newEvent.time - firstEvent.time < 500 && firstEvent.delta - _newEvent.delta >= 1 && _newEvent.delta <= 6) {
            // We're at the end of the deceleration of a momentum scroll, so there's no need
            // to wait for more events. Snap ASAP on the next tick.
            // Also, because there's some remaining momentum we'll bias the snap in the
            // direction of the ongoing scroll because it's better UX for the scroll to snap
            // in the same direction as the scroll instead of reversing to snap.  Therefore,
            // if it's already scrolled more than 20% in the current direction, keep going.
            var snapToThreshold = delta > 0 ? 0.8 : 0.2;
            lastEventBeforeSnap = _newEvent;
            recentWheelEvents.splice(0);
            timeout = (0, _utils.nextTick)(function () {
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 0); // no delay; move on next tick
          }

          if (!timeout) {
            // if we get here, then we haven't detected the end of a momentum scroll, so
            // we'll consider a scroll "complete" when there haven't been any wheel events
            // for 500ms.
            timeout = (0, _utils.nextTick)(function () {
              var snapToThreshold = 0.5;
              lastEventBeforeSnap = _newEvent;
              recentWheelEvents.splice(0);
              swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
            }, 500);
          }
        }

        // Emit event
        if (!ignoreWheelEvents) emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop();
        // Return page scroll on edge positions
        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
      }
    }
    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    return false;
  }
  function events(method) {
    var targetEl = swiper.el;
    if (swiper.params.mousewheel.eventsTarget !== 'container') {
      targetEl = document.querySelector(swiper.params.mousewheel.eventsTarget);
    }
    targetEl[method]('mouseenter', handleMouseEnter);
    targetEl[method]('mouseleave', handleMouseLeave);
    targetEl[method]('wheel', handle);
  }
  function enable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.removeEventListener('wheel', handle);
      return true;
    }
    if (swiper.mousewheel.enabled) return false;
    events('addEventListener');
    swiper.mousewheel.enabled = true;
    return true;
  }
  function disable() {
    if (swiper.params.cssMode) {
      swiper.wrapperEl.addEventListener(event, handle);
      return true;
    }
    if (!swiper.mousewheel.enabled) return false;
    events('removeEventListener');
    swiper.mousewheel.enabled = false;
    return true;
  }
  on('init', function () {
    if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
      disable();
    }
    if (swiper.params.mousewheel.enabled) enable();
  });
  on('destroy', function () {
    if (swiper.params.cssMode) {
      enable();
    }
    if (swiper.mousewheel.enabled) disable();
  });
  Object.assign(swiper.mousewheel, {
    enable: enable,
    disable: disable
  });
}

},{"../../shared/utils.js":104,"ssr-window":8}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Navigation;
var _createElementIfNotDefined = _interopRequireDefault(require("../../shared/create-element-if-not-defined.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Navigation(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
      lockClass: 'swiper-button-lock',
      navigationDisabledClass: 'swiper-navigation-disabled'
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  var makeElementsArray = function makeElementsArray(el) {
    if (!Array.isArray(el)) el = [el].filter(function (e) {
      return !!e;
    });
    return el;
  };
  function getEl(el) {
    var res;
    if (el && typeof el === 'string' && swiper.isElement) {
      res = swiper.el.shadowRoot.querySelector(el);
      if (res) return res;
    }
    if (el) {
      if (typeof el === 'string') res = _toConsumableArray(document.querySelectorAll(el));
      if (swiper.params.uniqueNavElements && typeof el === 'string' && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
        res = swiper.el.querySelector(el);
      }
    }
    if (el && !res) return el;
    // if (Array.isArray(res) && res.length === 1) res = res[0];
    return res;
  }
  function toggleEl(el, disabled) {
    var params = swiper.params.navigation;
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      if (subEl) {
        var _subEl$classList;
        (_subEl$classList = subEl.classList)[disabled ? 'add' : 'remove'].apply(_subEl$classList, _toConsumableArray(params.disabledClass.split(' ')));
        if (subEl.tagName === 'BUTTON') subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
      }
    });
  }
  function update() {
    // Update Navigation Buttons
    var _swiper$navigation = swiper.navigation,
      nextEl = _swiper$navigation.nextEl,
      prevEl = _swiper$navigation.prevEl;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit('navigationPrev');
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit('navigationNext');
  }
  function init() {
    var params = swiper.params.navigation;
    swiper.params.navigation = (0, _createElementIfNotDefined["default"])(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: 'swiper-button-next',
      prevEl: 'swiper-button-prev'
    });
    if (!(params.nextEl || params.prevEl)) return;
    var nextEl = getEl(params.nextEl);
    var prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl: nextEl,
      prevEl: prevEl
    });
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    var initButton = function initButton(el, dir) {
      if (el) {
        el.addEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        var _el$classList;
        (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(params.lockClass.split(' ')));
      }
    };
    nextEl.forEach(function (el) {
      return initButton(el, 'next');
    });
    prevEl.forEach(function (el) {
      return initButton(el, 'prev');
    });
  }
  function destroy() {
    var _swiper$navigation2 = swiper.navigation,
      nextEl = _swiper$navigation2.nextEl,
      prevEl = _swiper$navigation2.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    var destroyButton = function destroyButton(el, dir) {
      var _el$classList2;
      el.removeEventListener('click', dir === 'next' ? onNextClick : onPrevClick);
      (_el$classList2 = el.classList).remove.apply(_el$classList2, _toConsumableArray(swiper.params.navigation.disabledClass.split(' ')));
    };
    nextEl.forEach(function (el) {
      return destroyButton(el, 'next');
    });
    prevEl.forEach(function (el) {
      return destroyButton(el, 'prev');
    });
  }
  on('init', function () {
    if (swiper.params.navigation.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      update();
    }
  });
  on('toEdge fromEdge lock unlock', function () {
    update();
  });
  on('destroy', function () {
    destroy();
  });
  on('enable disable', function () {
    var _swiper$navigation3 = swiper.navigation,
      nextEl = _swiper$navigation3.nextEl,
      prevEl = _swiper$navigation3.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    [].concat(_toConsumableArray(nextEl), _toConsumableArray(prevEl)).filter(function (el) {
      return !!el;
    }).forEach(function (el) {
      return el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.navigation.lockClass);
    });
  });
  on('click', function (_s, e) {
    var _swiper$navigation4 = swiper.navigation,
      nextEl = _swiper$navigation4.nextEl,
      prevEl = _swiper$navigation4.prevEl;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    var targetEl = e.target;
    if (swiper.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      var isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit('navigationShow');
      } else {
        emit('navigationHide');
      }
      [].concat(_toConsumableArray(nextEl), _toConsumableArray(prevEl)).filter(function (el) {
        return !!el;
      }).forEach(function (el) {
        return el.classList.toggle(swiper.params.navigation.hiddenClass);
      });
    }
  });
  var enable = function enable() {
    var _swiper$el$classList;
    (_swiper$el$classList = swiper.el.classList).remove.apply(_swiper$el$classList, _toConsumableArray(swiper.params.navigation.navigationDisabledClass.split(' ')));
    init();
    update();
  };
  var disable = function disable() {
    var _swiper$el$classList2;
    (_swiper$el$classList2 = swiper.el.classList).add.apply(_swiper$el$classList2, _toConsumableArray(swiper.params.navigation.navigationDisabledClass.split(' ')));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable: enable,
    disable: disable,
    update: update,
    init: init,
    destroy: destroy
  });
}

},{"../../shared/create-element-if-not-defined.js":95}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Pagination;
var _classesToSelector = _interopRequireDefault(require("../../shared/classes-to-selector.js"));
var _createElementIfNotDefined = _interopRequireDefault(require("../../shared/create-element-if-not-defined.js"));
var _utils = require("../../shared/utils.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Pagination(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var pfx = 'swiper-pagination';
  extendParams({
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      progressbarOpposite: false,
      type: 'bullets',
      // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,
      dynamicMainBullets: 1,
      formatFractionCurrent: function formatFractionCurrent(number) {
        return number;
      },
      formatFractionTotal: function formatFractionTotal(number) {
        return number;
      },
      bulletClass: "".concat(pfx, "-bullet"),
      bulletActiveClass: "".concat(pfx, "-bullet-active"),
      modifierClass: "".concat(pfx, "-"),
      currentClass: "".concat(pfx, "-current"),
      totalClass: "".concat(pfx, "-total"),
      hiddenClass: "".concat(pfx, "-hidden"),
      progressbarFillClass: "".concat(pfx, "-progressbar-fill"),
      progressbarOppositeClass: "".concat(pfx, "-progressbar-opposite"),
      clickableClass: "".concat(pfx, "-clickable"),
      lockClass: "".concat(pfx, "-lock"),
      horizontalClass: "".concat(pfx, "-horizontal"),
      verticalClass: "".concat(pfx, "-vertical"),
      paginationDisabledClass: "".concat(pfx, "-disabled")
    }
  });
  swiper.pagination = {
    el: null,
    bullets: []
  };
  var bulletSize;
  var dynamicBulletIndex = 0;
  var makeElementsArray = function makeElementsArray(el) {
    if (!Array.isArray(el)) el = [el].filter(function (e) {
      return !!e;
    });
    return el;
  };
  function isPaginationDisabled() {
    return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
  }
  function setSideBullets(bulletEl, position) {
    var bulletActiveClass = swiper.params.pagination.bulletActiveClass;
    if (!bulletEl) return;
    bulletEl = bulletEl["".concat(position === 'prev' ? 'previous' : 'next', "ElementSibling")];
    if (bulletEl) {
      bulletEl.classList.add("".concat(bulletActiveClass, "-").concat(position));
      bulletEl = bulletEl["".concat(position === 'prev' ? 'previous' : 'next', "ElementSibling")];
      if (bulletEl) {
        bulletEl.classList.add("".concat(bulletActiveClass, "-").concat(position, "-").concat(position));
      }
    }
  }
  function onBulletClick(e) {
    var bulletEl = e.target.closest((0, _classesToSelector["default"])(swiper.params.pagination.bulletClass));
    if (!bulletEl) {
      return;
    }
    e.preventDefault();
    var index = (0, _utils.elementIndex)(bulletEl) * swiper.params.slidesPerGroup;
    if (swiper.params.loop) {
      if (swiper.realIndex === index) return;
      var newSlideIndex = swiper.getSlideIndexByData(index);
      var currentSlideIndex = swiper.getSlideIndexByData(swiper.realIndex);
      if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
        swiper.loopFix({
          direction: newSlideIndex > currentSlideIndex ? 'next' : 'prev',
          activeSlideIndex: newSlideIndex,
          slideTo: false
        });
      }
      swiper.slideToLoop(index);
    } else {
      swiper.slideTo(index);
    }
  }
  function update() {
    // Render || Update Pagination bullets/items
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var el = swiper.pagination.el;
    el = makeElementsArray(el);
    // Current/Total
    var current;
    var previousIndex;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      previousIndex = swiper.previousRealIndex || 0;
      current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
      previousIndex = swiper.previousSnapIndex;
    } else {
      previousIndex = swiper.previousIndex || 0;
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var bullets = swiper.pagination.bullets;
      var firstIndex;
      var lastIndex;
      var midIndex;
      if (params.dynamicBullets) {
        bulletSize = (0, _utils.elementOuterSize)(bullets[0], swiper.isHorizontal() ? 'width' : 'height', true);
        el.forEach(function (subEl) {
          subEl.style[swiper.isHorizontal() ? 'width' : 'height'] = "".concat(bulletSize * (params.dynamicMainBullets + 4), "px");
        });
        if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
          dynamicBulletIndex += current - (previousIndex || 0);
          if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
            dynamicBulletIndex = params.dynamicMainBullets - 1;
          } else if (dynamicBulletIndex < 0) {
            dynamicBulletIndex = 0;
          }
        }
        firstIndex = Math.max(current - dynamicBulletIndex, 0);
        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
        midIndex = (lastIndex + firstIndex) / 2;
      }
      bullets.forEach(function (bulletEl) {
        var _bulletEl$classList;
        var classesToRemove = _toConsumableArray(['', '-next', '-next-next', '-prev', '-prev-prev', '-main'].map(function (suffix) {
          return "".concat(params.bulletActiveClass).concat(suffix);
        })).map(function (s) {
          return typeof s === 'string' && s.includes(' ') ? s.split(' ') : s;
        }).flat();
        (_bulletEl$classList = bulletEl.classList).remove.apply(_bulletEl$classList, _toConsumableArray(classesToRemove));
      });
      if (el.length > 1) {
        bullets.forEach(function (bullet) {
          var bulletIndex = (0, _utils.elementIndex)(bullet);
          if (bulletIndex === current) {
            var _bullet$classList;
            (_bullet$classList = bullet.classList).add.apply(_bullet$classList, _toConsumableArray(params.bulletActiveClass.split(' ')));
          }
          if (params.dynamicBullets) {
            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
              var _bullet$classList2;
              (_bullet$classList2 = bullet.classList).add.apply(_bullet$classList2, _toConsumableArray("".concat(params.bulletActiveClass, "-main").split(' ')));
            }
            if (bulletIndex === firstIndex) {
              setSideBullets(bullet, 'prev');
            }
            if (bulletIndex === lastIndex) {
              setSideBullets(bullet, 'next');
            }
          }
        });
      } else {
        var bullet = bullets[current];
        if (bullet) {
          var _bullet$classList3;
          (_bullet$classList3 = bullet.classList).add.apply(_bullet$classList3, _toConsumableArray(params.bulletActiveClass.split(' ')));
        }
        if (params.dynamicBullets) {
          var firstDisplayedBullet = bullets[firstIndex];
          var lastDisplayedBullet = bullets[lastIndex];
          for (var i = firstIndex; i <= lastIndex; i += 1) {
            if (bullets[i]) {
              var _bullets$i$classList;
              (_bullets$i$classList = bullets[i].classList).add.apply(_bullets$i$classList, _toConsumableArray("".concat(params.bulletActiveClass, "-main").split(' ')));
            }
          }
          setSideBullets(firstDisplayedBullet, 'prev');
          setSideBullets(lastDisplayedBullet, 'next');
        }
      }
      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
        var bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
        var offsetProp = rtl ? 'right' : 'left';
        bullets.forEach(function (bullet) {
          bullet.style[swiper.isHorizontal() ? offsetProp : 'top'] = "".concat(bulletsOffset, "px");
        });
      }
    }
    el.forEach(function (subEl, subElIndex) {
      if (params.type === 'fraction') {
        subEl.querySelectorAll((0, _classesToSelector["default"])(params.currentClass)).forEach(function (fractionEl) {
          fractionEl.textContent = params.formatFractionCurrent(current + 1);
        });
        subEl.querySelectorAll((0, _classesToSelector["default"])(params.totalClass)).forEach(function (totalEl) {
          totalEl.textContent = params.formatFractionTotal(total);
        });
      }
      if (params.type === 'progressbar') {
        var progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        subEl.querySelectorAll((0, _classesToSelector["default"])(params.progressbarFillClass)).forEach(function (progressEl) {
          progressEl.style.transform = "translate3d(0,0,0) scaleX(".concat(scaleX, ") scaleY(").concat(scaleY, ")");
          progressEl.style.transitionDuration = "".concat(swiper.params.speed, "ms");
        });
      }
      if (params.type === 'custom' && params.renderCustom) {
        subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
        if (subElIndex === 0) emit('paginationRender', subEl);
      } else {
        if (subElIndex === 0) emit('paginationRender', subEl);
        emit('paginationUpdate', subEl);
      }
      if (swiper.params.watchOverflow && swiper.enabled) {
        subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
      }
    });
  }
  function render() {
    // Render Container
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var el = swiper.pagination.el;
    el = makeElementsArray(el);
    var paginationHTML = '';
    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) {
        numberOfBullets = slidesLength;
      }
      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += "<".concat(params.bulletElement, " class=\"").concat(params.bulletClass, "\"></").concat(params.bulletElement, ">");
        }
      }
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML = "<span class=\"".concat(params.currentClass, "\"></span>") + ' / ' + "<span class=\"".concat(params.totalClass, "\"></span>");
      }
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = "<span class=\"".concat(params.progressbarFillClass, "\"></span>");
      }
    }
    swiper.pagination.bullets = [];
    el.forEach(function (subEl) {
      if (params.type !== 'custom') {
        subEl.innerHTML = paginationHTML || '';
      }
      if (params.type === 'bullets') {
        var _swiper$pagination$bu;
        (_swiper$pagination$bu = swiper.pagination.bullets).push.apply(_swiper$pagination$bu, _toConsumableArray(subEl.querySelectorAll((0, _classesToSelector["default"])(params.bulletClass))));
      }
    });
    if (params.type !== 'custom') {
      emit('paginationRender', el[0]);
    }
  }
  function init() {
    swiper.params.pagination = (0, _createElementIfNotDefined["default"])(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
      el: 'swiper-pagination'
    });
    var params = swiper.params.pagination;
    if (!params.el) return;
    var el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.shadowRoot.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = _toConsumableArray(document.querySelectorAll(params.el));
    }
    if (!el) {
      el = params.el;
    }
    if (!el || el.length === 0) return;
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && Array.isArray(el) && el.length > 1) {
      el = _toConsumableArray(swiper.el.querySelectorAll(params.el));
      // check if it belongs to another nested Swiper
      if (el.length > 1) {
        el = el.filter(function (subEl) {
          if ((0, _utils.elementParents)(subEl, '.swiper')[0] !== swiper.el) return false;
          return true;
        })[0];
      }
    }
    if (Array.isArray(el) && el.length === 1) el = el[0];
    Object.assign(swiper.pagination, {
      el: el
    });
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      if (params.type === 'bullets' && params.clickable) {
        subEl.classList.add(params.clickableClass);
      }
      subEl.classList.add(params.modifierClass + params.type);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
      if (params.type === 'bullets' && params.dynamicBullets) {
        subEl.classList.add("".concat(params.modifierClass).concat(params.type, "-dynamic"));
        dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        subEl.classList.add(params.progressbarOppositeClass);
      }
      if (params.clickable) {
        subEl.addEventListener('click', onBulletClick);
      }
      if (!swiper.enabled) {
        subEl.classList.add(params.lockClass);
      }
    });
  }
  function destroy() {
    var params = swiper.params.pagination;
    if (isPaginationDisabled()) return;
    var el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        subEl.classList.remove(params.hiddenClass);
        subEl.classList.remove(params.modifierClass + params.type);
        subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.clickable) {
          subEl.removeEventListener('click', onBulletClick);
        }
      });
    }
    if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(function (subEl) {
      var _subEl$classList;
      return (_subEl$classList = subEl.classList).remove.apply(_subEl$classList, _toConsumableArray(params.bulletActiveClass.split(' ')));
    });
  }
  on('changeDirection', function () {
    if (!swiper.pagination || !swiper.pagination.el) return;
    var params = swiper.params.pagination;
    var el = swiper.pagination.el;
    el = makeElementsArray(el);
    el.forEach(function (subEl) {
      subEl.classList.remove(params.horizontalClass, params.verticalClass);
      subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    });
  });
  on('init', function () {
    if (swiper.params.pagination.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      render();
      update();
    }
  });
  on('activeIndexChange', function () {
    if (typeof swiper.snapIndex === 'undefined') {
      update();
    }
  });
  on('snapIndexChange', function () {
    update();
  });
  on('snapGridLengthChange', function () {
    render();
    update();
  });
  on('destroy', function () {
    destroy();
  });
  on('enable disable', function () {
    var el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        return subEl.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.pagination.lockClass);
      });
    }
  });
  on('lock unlock', function () {
    update();
  });
  on('click', function (_s, e) {
    var targetEl = e.target;
    var el = swiper.pagination.el;
    if (!Array.isArray(el)) el = [el].filter(function (element) {
      return !!element;
    });
    if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
      if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
      var isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
      if (isHidden === true) {
        emit('paginationShow');
      } else {
        emit('paginationHide');
      }
      el.forEach(function (subEl) {
        return subEl.classList.toggle(swiper.params.pagination.hiddenClass);
      });
    }
  });
  var enable = function enable() {
    swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
    var el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        return subEl.classList.remove(swiper.params.pagination.paginationDisabledClass);
      });
    }
    init();
    render();
    update();
  };
  var disable = function disable() {
    swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
    var el = swiper.pagination.el;
    if (el) {
      el = makeElementsArray(el);
      el.forEach(function (subEl) {
        return subEl.classList.add(swiper.params.pagination.paginationDisabledClass);
      });
    }
    destroy();
  };
  Object.assign(swiper.pagination, {
    enable: enable,
    disable: disable,
    render: render,
    update: update,
    init: init,
    destroy: destroy
  });
}

},{"../../shared/classes-to-selector.js":94,"../../shared/create-element-if-not-defined.js":95,"../../shared/utils.js":104}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Parallax;
var _utils = require("../../shared/utils.js");
function Parallax(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    parallax: {
      enabled: false
    }
  });
  var setTransform = function setTransform(el, progress) {
    var rtl = swiper.rtl;
    var rtlFactor = rtl ? -1 : 1;
    var p = el.getAttribute('data-swiper-parallax') || '0';
    var x = el.getAttribute('data-swiper-parallax-x');
    var y = el.getAttribute('data-swiper-parallax-y');
    var scale = el.getAttribute('data-swiper-parallax-scale');
    var opacity = el.getAttribute('data-swiper-parallax-opacity');
    var rotate = el.getAttribute('data-swiper-parallax-rotate');
    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }
    if (x.indexOf('%') >= 0) {
      x = "".concat(parseInt(x, 10) * progress * rtlFactor, "%");
    } else {
      x = "".concat(x * progress * rtlFactor, "px");
    }
    if (y.indexOf('%') >= 0) {
      y = "".concat(parseInt(y, 10) * progress, "%");
    } else {
      y = "".concat(y * progress, "px");
    }
    if (typeof opacity !== 'undefined' && opacity !== null) {
      var currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
      el.style.opacity = currentOpacity;
    }
    var transform = "translate3d(".concat(x, ", ").concat(y, ", 0px)");
    if (typeof scale !== 'undefined' && scale !== null) {
      var currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
      transform += " scale(".concat(currentScale, ")");
    }
    if (rotate && typeof rotate !== 'undefined' && rotate !== null) {
      var currentRotate = rotate * progress * -1;
      transform += " rotate(".concat(currentRotate, "deg)");
    }
    el.style.transform = transform;
  };
  var setTranslate = function setTranslate() {
    var el = swiper.el,
      slides = swiper.slides,
      progress = swiper.progress,
      snapGrid = swiper.snapGrid;
    (0, _utils.elementChildren)(el, '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').forEach(function (subEl) {
      setTransform(subEl, progress);
    });
    slides.forEach(function (slideEl, slideIndex) {
      var slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      slideEl.querySelectorAll('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]').forEach(function (subEl) {
        setTransform(subEl, slideProgress);
      });
    });
  };
  var setTransition = function setTransition() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : swiper.params.speed;
    var el = swiper.el;
    el.querySelectorAll('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]').forEach(function (parallaxEl) {
      var parallaxDuration = parseInt(parallaxEl.getAttribute('data-swiper-parallax-duration'), 10) || duration;
      if (duration === 0) parallaxDuration = 0;
      parallaxEl.style.transitionDuration = "".concat(parallaxDuration, "ms");
    });
  };
  on('beforeInit', function () {
    if (!swiper.params.parallax.enabled) return;
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
  });
  on('init', function () {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTranslate', function () {
    if (!swiper.params.parallax.enabled) return;
    setTranslate();
  });
  on('setTransition', function (_swiper, duration) {
    if (!swiper.params.parallax.enabled) return;
    setTransition(duration);
  });
}

},{"../../shared/utils.js":104}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Scrollbar;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
var _createElementIfNotDefined = _interopRequireDefault(require("../../shared/create-element-if-not-defined.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Scrollbar(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var document = (0, _ssrWindow.getDocument)();
  var isTouched = false;
  var timeout = null;
  var dragTimeout = null;
  var dragStartPos;
  var dragSize;
  var trackSize;
  var divider;
  extendParams({
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
      lockClass: 'swiper-scrollbar-lock',
      dragClass: 'swiper-scrollbar-drag',
      scrollbarDisabledClass: 'swiper-scrollbar-disabled',
      horizontalClass: "swiper-scrollbar-horizontal",
      verticalClass: "swiper-scrollbar-vertical"
    }
  });
  swiper.scrollbar = {
    el: null,
    dragEl: null
  };
  function setTranslate() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    var scrollbar = swiper.scrollbar,
      rtl = swiper.rtlTranslate;
    var dragEl = scrollbar.dragEl,
      el = scrollbar.el;
    var params = swiper.params.scrollbar;
    var progress = swiper.params.loop ? swiper.progressLoop : swiper.progress;
    var newSize = dragSize;
    var newPos = (trackSize - dragSize) * progress;
    if (rtl) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      dragEl.style.transform = "translate3d(".concat(newPos, "px, 0, 0)");
      dragEl.style.width = "".concat(newSize, "px");
    } else {
      dragEl.style.transform = "translate3d(0px, ".concat(newPos, "px, 0)");
      dragEl.style.height = "".concat(newSize, "px");
    }
    if (params.hide) {
      clearTimeout(timeout);
      el.style.opacity = 1;
      timeout = setTimeout(function () {
        el.style.opacity = 0;
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
  }
  function setTransition(duration) {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    swiper.scrollbar.dragEl.style.transitionDuration = "".concat(duration, "ms");
  }
  function updateSize() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    var scrollbar = swiper.scrollbar;
    var dragEl = scrollbar.dragEl,
      el = scrollbar.el;
    dragEl.style.width = '';
    dragEl.style.height = '';
    trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
    divider = swiper.size / (swiper.virtualSize + swiper.params.slidesOffsetBefore - (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }
    if (swiper.isHorizontal()) {
      dragEl.style.width = "".concat(dragSize, "px");
    } else {
      dragEl.style.height = "".concat(dragSize, "px");
    }
    if (divider >= 1) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
    if (swiper.params.scrollbar.hide) {
      el.style.opacity = 0;
    }
    if (swiper.params.watchOverflow && swiper.enabled) {
      scrollbar.el.classList[swiper.isLocked ? 'add' : 'remove'](swiper.params.scrollbar.lockClass);
    }
  }
  function getPointerPosition(e) {
    return swiper.isHorizontal() ? e.clientX : e.clientY;
  }
  function setDragPosition(e) {
    var scrollbar = swiper.scrollbar,
      rtl = swiper.rtlTranslate;
    var el = scrollbar.el;
    var positionRatio;
    positionRatio = (getPointerPosition(e) - (0, _utils.elementOffset)(el)[swiper.isHorizontal() ? 'left' : 'top'] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (rtl) {
      positionRatio = 1 - positionRatio;
    }
    var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  function onDragStart(e) {
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
      wrapperEl = swiper.wrapperEl;
    var el = scrollbar.el,
      dragEl = scrollbar.dragEl;
    isTouched = true;
    dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
    e.preventDefault();
    e.stopPropagation();
    wrapperEl.style.transitionDuration = '100ms';
    dragEl.style.transitionDuration = '100ms';
    setDragPosition(e);
    clearTimeout(dragTimeout);
    el.style.transitionDuration = '0ms';
    if (params.hide) {
      el.style.opacity = 1;
    }
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style['scroll-snap-type'] = 'none';
    }
    emit('scrollbarDragStart', e);
  }
  function onDragMove(e) {
    var scrollbar = swiper.scrollbar,
      wrapperEl = swiper.wrapperEl;
    var el = scrollbar.el,
      dragEl = scrollbar.dragEl;
    if (!isTouched) return;
    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
    setDragPosition(e);
    wrapperEl.style.transitionDuration = '0ms';
    el.style.transitionDuration = '0ms';
    dragEl.style.transitionDuration = '0ms';
    emit('scrollbarDragMove', e);
  }
  function onDragEnd(e) {
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar,
      wrapperEl = swiper.wrapperEl;
    var el = scrollbar.el;
    if (!isTouched) return;
    isTouched = false;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style['scroll-snap-type'] = '';
      wrapperEl.style.transitionDuration = '';
    }
    if (params.hide) {
      clearTimeout(dragTimeout);
      dragTimeout = (0, _utils.nextTick)(function () {
        el.style.opacity = 0;
        el.style.transitionDuration = '400ms';
      }, 1000);
    }
    emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideToClosest();
    }
  }
  function events(method) {
    var scrollbar = swiper.scrollbar,
      params = swiper.params;
    var el = scrollbar.el;
    if (!el) return;
    var target = el;
    var activeListener = params.passiveListeners ? {
      passive: false,
      capture: false
    } : false;
    var passiveListener = params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    if (!target) return;
    var eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
    target[eventMethod]('pointerdown', onDragStart, activeListener);
    document[eventMethod]('pointermove', onDragMove, activeListener);
    document[eventMethod]('pointerup', onDragEnd, passiveListener);
  }
  function enableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('on');
  }
  function disableDraggable() {
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
    events('off');
  }
  function init() {
    var scrollbar = swiper.scrollbar,
      swiperEl = swiper.el;
    swiper.params.scrollbar = (0, _createElementIfNotDefined["default"])(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, {
      el: 'swiper-scrollbar'
    });
    var params = swiper.params.scrollbar;
    if (!params.el) return;
    var el;
    if (typeof params.el === 'string' && swiper.isElement) {
      el = swiper.el.shadowRoot.querySelector(params.el);
    }
    if (!el && typeof params.el === 'string') {
      el = document.querySelectorAll(params.el);
    } else if (!el) {
      el = params.el;
    }
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
      el = swiperEl.querySelector(params.el);
    }
    if (el.length > 0) el = el[0];
    el.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    var dragEl;
    if (el) {
      dragEl = el.querySelector(".".concat(swiper.params.scrollbar.dragClass));
      if (!dragEl) {
        dragEl = (0, _utils.createElement)('div', swiper.params.scrollbar.dragClass);
        el.append(dragEl);
      }
    }
    Object.assign(scrollbar, {
      el: el,
      dragEl: dragEl
    });
    if (params.draggable) {
      enableDraggable();
    }
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.scrollbar.lockClass);
    }
  }
  function destroy() {
    var params = swiper.params.scrollbar;
    var el = swiper.scrollbar.el;
    if (el) {
      el.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
    }
    disableDraggable();
  }
  on('init', function () {
    if (swiper.params.scrollbar.enabled === false) {
      // eslint-disable-next-line
      disable();
    } else {
      init();
      updateSize();
      setTranslate();
    }
  });
  on('update resize observerUpdate lock unlock', function () {
    updateSize();
  });
  on('setTranslate', function () {
    setTranslate();
  });
  on('setTransition', function (_s, duration) {
    setTransition(duration);
  });
  on('enable disable', function () {
    var el = swiper.scrollbar.el;
    if (el) {
      el.classList[swiper.enabled ? 'remove' : 'add'](swiper.params.scrollbar.lockClass);
    }
  });
  on('destroy', function () {
    destroy();
  });
  var enable = function enable() {
    swiper.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.remove(swiper.params.scrollbar.scrollbarDisabledClass);
    }
    init();
    updateSize();
    setTranslate();
  };
  var disable = function disable() {
    swiper.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
    if (swiper.scrollbar.el) {
      swiper.scrollbar.el.classList.add(swiper.params.scrollbar.scrollbarDisabledClass);
    }
    destroy();
  };
  Object.assign(swiper.scrollbar, {
    enable: enable,
    disable: disable,
    updateSize: updateSize,
    setTranslate: setTranslate,
    init: init,
    destroy: destroy
  });
}

},{"../../shared/create-element-if-not-defined.js":95,"../../shared/utils.js":104,"ssr-window":8}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Thumb;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function Thumb(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on;
  extendParams({
    thumbs: {
      swiper: null,
      multipleActiveThumbs: true,
      autoScrollOffset: 0,
      slideThumbActiveClass: 'swiper-slide-thumb-active',
      thumbsContainerClass: 'swiper-thumbs'
    }
  });
  var initialized = false;
  var swiperCreated = false;
  swiper.thumbs = {
    swiper: null
  };
  function onThumbClick() {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    var clickedIndex = thumbsSwiper.clickedIndex;
    var clickedSlide = thumbsSwiper.clickedSlide;
    if (clickedSlide && clickedSlide.classList.contains(swiper.params.thumbs.slideThumbActiveClass)) return;
    if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
    var slideToIndex;
    if (thumbsSwiper.params.loop) {
      slideToIndex = parseInt(thumbsSwiper.clickedSlide.getAttribute('data-swiper-slide-index'), 10);
    } else {
      slideToIndex = clickedIndex;
    }
    if (swiper.params.loop) {
      swiper.slideToLoop(slideToIndex);
    } else {
      swiper.slideTo(slideToIndex);
    }
  }
  function init() {
    var thumbsParams = swiper.params.thumbs;
    if (initialized) return false;
    initialized = true;
    var SwiperClass = swiper.constructor;
    if (thumbsParams.swiper instanceof SwiperClass) {
      swiper.thumbs.swiper = thumbsParams.swiper;
      Object.assign(swiper.thumbs.swiper.originalParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      Object.assign(swiper.thumbs.swiper.params, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper.update();
    } else if ((0, _utils.isObject)(thumbsParams.swiper)) {
      var thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
      Object.assign(thumbsSwiperParams, {
        watchSlidesProgress: true,
        slideToClickedSlide: false
      });
      swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
      swiperCreated = true;
    }
    swiper.thumbs.swiper.el.classList.add(swiper.params.thumbs.thumbsContainerClass);
    swiper.thumbs.swiper.on('tap', onThumbClick);
    return true;
  }
  function update(initial) {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto' ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;

    // Activate thumbs
    var thumbsToActivate = 1;
    var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
    if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
      thumbsToActivate = swiper.params.slidesPerView;
    }
    if (!swiper.params.thumbs.multipleActiveThumbs) {
      thumbsToActivate = 1;
    }
    thumbsToActivate = Math.floor(thumbsToActivate);
    thumbsSwiper.slides.forEach(function (slideEl) {
      return slideEl.classList.remove(thumbActiveClass);
    });
    if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) {
      for (var i = 0; i < thumbsToActivate; i += 1) {
        (0, _utils.elementChildren)(thumbsSwiper.slidesEl, "[data-swiper-slide-index=\"".concat(swiper.realIndex + i, "\"]")).forEach(function (slideEl) {
          slideEl.classList.add(thumbActiveClass);
        });
      }
    } else {
      for (var _i = 0; _i < thumbsToActivate; _i += 1) {
        if (thumbsSwiper.slides[swiper.realIndex + _i]) {
          thumbsSwiper.slides[swiper.realIndex + _i].classList.add(thumbActiveClass);
        }
      }
    }
    var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
    var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
    if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
      var currentThumbsIndex = thumbsSwiper.activeIndex;
      var newThumbsIndex;
      var direction;
      if (thumbsSwiper.params.loop) {
        var newThumbsSlide = thumbsSwiper.slides.filter(function (slideEl) {
          return slideEl.getAttribute('data-swiper-slide-index') === "".concat(swiper.realIndex);
        })[0];
        newThumbsIndex = thumbsSwiper.slides.indexOf(newThumbsSlide);
        direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
      } else {
        newThumbsIndex = swiper.realIndex;
        direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
      }
      if (useOffset) {
        newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
      }
      if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
        if (thumbsSwiper.params.centeredSlides) {
          if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
          } else {
            newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
          }
        } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1) {
          // newThumbsIndex = newThumbsIndex - slidesPerView + 1;
        }
        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
      }
    }
  }
  on('beforeInit', function () {
    var thumbs = swiper.params.thumbs;
    if (!thumbs || !thumbs.swiper) return;
    if (typeof thumbs.swiper === 'string' || thumbs.swiper instanceof HTMLElement) {
      var document = (0, _ssrWindow.getDocument)();
      var getThumbsElementAndInit = function getThumbsElementAndInit() {
        var thumbsElement = typeof thumbs.swiper === 'string' ? document.querySelector(thumbs.swiper) : thumbs.swiper;
        if (thumbsElement && thumbsElement.swiper) {
          thumbs.swiper = thumbsElement.swiper;
          init();
          update(true);
        } else if (thumbsElement) {
          var onThumbsSwiper = function onThumbsSwiper(e) {
            thumbs.swiper = e.detail[0];
            thumbsElement.removeEventListener('init', onThumbsSwiper);
            init();
            update(true);
            thumbs.swiper.update();
            swiper.update();
          };
          thumbsElement.addEventListener('init', onThumbsSwiper);
        }
        return thumbsElement;
      };
      var watchForThumbsToAppear = function watchForThumbsToAppear() {
        if (swiper.destroyed) return;
        var thumbsElement = getThumbsElementAndInit();
        if (!thumbsElement) {
          requestAnimationFrame(watchForThumbsToAppear);
        }
      };
      requestAnimationFrame(watchForThumbsToAppear);
    } else {
      init();
      update(true);
    }
  });
  on('slideChange update resize observerUpdate', function () {
    update();
  });
  on('setTransition', function (_s, duration) {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    thumbsSwiper.setTransition(duration);
  });
  on('beforeDestroy', function () {
    var thumbsSwiper = swiper.thumbs.swiper;
    if (!thumbsSwiper || thumbsSwiper.destroyed) return;
    if (swiperCreated) {
      thumbsSwiper.destroy();
    }
  });
  Object.assign(swiper.thumbs, {
    init: init,
    update: update
  });
}

},{"../../shared/utils.js":104,"ssr-window":8}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Virtual;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function Virtual(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  extendParams({
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
      renderExternalUpdate: true,
      addSlidesBefore: 0,
      addSlidesAfter: 0
    }
  });
  var cssModeTimeout;
  var document = (0, _ssrWindow.getDocument)();
  swiper.virtual = {
    cache: {},
    from: undefined,
    to: undefined,
    slides: [],
    offset: 0,
    slidesGrid: []
  };
  var tempDOM = document.createElement('div');
  function renderSlide(slide, index) {
    var params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    // eslint-disable-next-line
    var slideEl;
    if (params.renderSlide) {
      slideEl = params.renderSlide.call(swiper, slide, index);
      if (typeof slideEl === 'string') {
        tempDOM.innerHTML = slideEl;
        slideEl = tempDOM.children[0];
      }
    } else if (swiper.isElement) {
      slideEl = (0, _utils.createElement)('swiper-slide');
    } else {
      slideEl = (0, _utils.createElement)('div', swiper.params.slideClass);
    }
    slideEl.setAttribute('data-swiper-slide-index', index);
    if (!params.renderSlide) {
      slideEl.innerHTML = slide;
    }
    if (params.cache) swiper.virtual.cache[index] = slideEl;
    return slideEl;
  }
  function update(force) {
    var _swiper$params = swiper.params,
      slidesPerView = _swiper$params.slidesPerView,
      slidesPerGroup = _swiper$params.slidesPerGroup,
      centeredSlides = _swiper$params.centeredSlides,
      isLoop = _swiper$params.loop;
    var _swiper$params$virtua = swiper.params.virtual,
      addSlidesBefore = _swiper$params$virtua.addSlidesBefore,
      addSlidesAfter = _swiper$params$virtua.addSlidesAfter;
    var _swiper$virtual = swiper.virtual,
      previousFrom = _swiper$virtual.from,
      previousTo = _swiper$virtual.to,
      slides = _swiper$virtual.slides,
      previousSlidesGrid = _swiper$virtual.slidesGrid,
      previousOffset = _swiper$virtual.offset;
    if (!swiper.params.cssMode) {
      swiper.updateActiveIndex();
    }
    var activeIndex = swiper.activeIndex || 0;
    var offsetProp;
    if (swiper.rtlTranslate) offsetProp = 'right';else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
    var slidesAfter;
    var slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
      slidesBefore = (isLoop ? slidesPerView : slidesPerGroup) + addSlidesBefore;
    }
    var from = activeIndex - slidesBefore;
    var to = activeIndex + slidesAfter;
    if (!isLoop) {
      from = Math.max(from, 0);
      to = Math.min(to, slides.length - 1);
    }
    var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
    if (isLoop && activeIndex >= slidesBefore) {
      from -= slidesBefore;
      if (!centeredSlides) offset += swiper.slidesGrid[0];
    } else if (isLoop && activeIndex < slidesBefore) {
      from = -slidesBefore;
      if (centeredSlides) offset += swiper.slidesGrid[0];
    }
    Object.assign(swiper.virtual, {
      from: from,
      to: to,
      offset: offset,
      slidesGrid: swiper.slidesGrid,
      slidesBefore: slidesBefore,
      slidesAfter: slidesAfter
    });
    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      emit('virtualUpdate');
    }
    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.forEach(function (slideEl) {
          slideEl.style[offsetProp] = "".concat(offset - Math.abs(swiper.cssOverflowAdjustment()), "px");
        });
      }
      swiper.updateProgress();
      emit('virtualUpdate');
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset: offset,
        from: from,
        to: to,
        slides: function getSlides() {
          var slidesToRender = [];
          for (var i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()
      });
      if (swiper.params.virtual.renderExternalUpdate) {
        onRendered();
      } else {
        emit('virtualUpdate');
      }
      return;
    }
    var prependIndexes = [];
    var appendIndexes = [];
    var getSlideIndex = function getSlideIndex(index) {
      var slideIndex = index;
      if (index < 0) {
        slideIndex = slides.length + index;
      } else if (slideIndex >= slides.length) {
        // eslint-disable-next-line
        slideIndex = slideIndex - slides.length;
      }
      return slideIndex;
    };
    if (force) {
      swiper.slidesEl.querySelectorAll(".".concat(swiper.params.slideClass, ", swiper-slide")).forEach(function (slideEl) {
        slideEl.remove();
      });
    } else {
      for (var i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          var slideIndex = getSlideIndex(i);
          swiper.slidesEl.querySelectorAll(".".concat(swiper.params.slideClass, "[data-swiper-slide-index=\"").concat(slideIndex, "\"], swiper-slide[data-swiper-slide-index=\"").concat(slideIndex, "\"]")).forEach(function (slideEl) {
            slideEl.remove();
          });
        }
      }
    }
    var loopFrom = isLoop ? -slides.length : 0;
    var loopTo = isLoop ? slides.length * 2 : slides.length;
    for (var _i = loopFrom; _i < loopTo; _i += 1) {
      if (_i >= from && _i <= to) {
        var _slideIndex = getSlideIndex(_i);
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(_slideIndex);
        } else {
          if (_i > previousTo) appendIndexes.push(_slideIndex);
          if (_i < previousFrom) prependIndexes.push(_slideIndex);
        }
      }
    }
    appendIndexes.forEach(function (index) {
      swiper.slidesEl.append(renderSlide(slides[index], index));
    });
    if (isLoop) {
      for (var _i2 = prependIndexes.length - 1; _i2 >= 0; _i2 -= 1) {
        var index = prependIndexes[_i2];
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      }
    } else {
      prependIndexes.sort(function (a, b) {
        return b - a;
      });
      prependIndexes.forEach(function (index) {
        swiper.slidesEl.prepend(renderSlide(slides[index], index));
      });
    }
    (0, _utils.elementChildren)(swiper.slidesEl, '.swiper-slide, swiper-slide').forEach(function (slideEl) {
      slideEl.style[offsetProp] = "".concat(offset - Math.abs(swiper.cssOverflowAdjustment()), "px");
    });
    onRendered();
  }
  function appendSlide(slides) {
    if (_typeof(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.push(slides[i]);
      }
    } else {
      swiper.virtual.slides.push(slides);
    }
    update(true);
  }
  function prependSlide(slides) {
    var activeIndex = swiper.activeIndex;
    var newActiveIndex = activeIndex + 1;
    var numberOfNewSlides = 1;
    if (Array.isArray(slides)) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
      }
      newActiveIndex = activeIndex + slides.length;
      numberOfNewSlides = slides.length;
    } else {
      swiper.virtual.slides.unshift(slides);
    }
    if (swiper.params.virtual.cache) {
      var cache = swiper.virtual.cache;
      var newCache = {};
      Object.keys(cache).forEach(function (cachedIndex) {
        var cachedEl = cache[cachedIndex];
        var cachedElIndex = cachedEl.getAttribute('data-swiper-slide-index');
        if (cachedElIndex) {
          cachedEl.setAttribute('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
        }
        newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
      });
      swiper.virtual.cache = newCache;
    }
    update(true);
    swiper.slideTo(newActiveIndex, 0);
  }
  function removeSlide(slidesIndexes) {
    if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
    var activeIndex = swiper.activeIndex;
    if (Array.isArray(slidesIndexes)) {
      for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
        swiper.virtual.slides.splice(slidesIndexes[i], 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes[i]];
        }
        if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
        activeIndex = Math.max(activeIndex, 0);
      }
    } else {
      swiper.virtual.slides.splice(slidesIndexes, 1);
      if (swiper.params.virtual.cache) {
        delete swiper.virtual.cache[slidesIndexes];
      }
      if (slidesIndexes < activeIndex) activeIndex -= 1;
      activeIndex = Math.max(activeIndex, 0);
    }
    update(true);
    swiper.slideTo(activeIndex, 0);
  }
  function removeAllSlides() {
    swiper.virtual.slides = [];
    if (swiper.params.virtual.cache) {
      swiper.virtual.cache = {};
    }
    update(true);
    swiper.slideTo(0, 0);
  }
  on('beforeInit', function () {
    if (!swiper.params.virtual.enabled) return;
    var domSlidesAssigned;
    if (typeof swiper.passedParams.virtual.slides === 'undefined') {
      var slides = _toConsumableArray(swiper.slidesEl.children).filter(function (el) {
        return el.matches(".".concat(swiper.params.slideClass, ", swiper-slide"));
      });
      if (slides && slides.length) {
        swiper.virtual.slides = _toConsumableArray(slides);
        domSlidesAssigned = true;
        slides.forEach(function (slideEl, slideIndex) {
          slideEl.setAttribute('data-swiper-slide-index', slideIndex);
          swiper.virtual.cache[slideIndex] = slideEl;
          slideEl.remove();
        });
      }
    }
    if (!domSlidesAssigned) {
      swiper.virtual.slides = swiper.params.virtual.slides;
    }
    swiper.classNames.push("".concat(swiper.params.containerModifierClass, "virtual"));
    swiper.params.watchSlidesProgress = true;
    swiper.originalParams.watchSlidesProgress = true;
    if (!swiper.params.initialSlide) {
      update();
    }
  });
  on('setTranslate', function () {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode && !swiper._immediateVirtual) {
      clearTimeout(cssModeTimeout);
      cssModeTimeout = setTimeout(function () {
        update();
      }, 100);
    } else {
      update();
    }
  });
  on('init update resize', function () {
    if (!swiper.params.virtual.enabled) return;
    if (swiper.params.cssMode) {
      (0, _utils.setCSSProperty)(swiper.wrapperEl, '--swiper-virtual-size', "".concat(swiper.virtualSize, "px"));
    }
  });
  Object.assign(swiper.virtual, {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
    update: update
  });
}

},{"../../shared/utils.js":104,"ssr-window":8}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Zoom;
var _ssrWindow = require("ssr-window");
var _utils = require("../../shared/utils.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Zoom(_ref) {
  var swiper = _ref.swiper,
    extendParams = _ref.extendParams,
    on = _ref.on,
    emit = _ref.emit;
  var window = (0, _ssrWindow.getWindow)();
  extendParams({
    zoom: {
      enabled: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed'
    }
  });
  swiper.zoom = {
    enabled: false
  };
  var currentScale = 1;
  var isScaling = false;
  var fakeGestureTouched;
  var fakeGestureMoved;
  var evCache = [];
  var gesture = {
    originX: 0,
    originY: 0,
    slideEl: undefined,
    slideWidth: undefined,
    slideHeight: undefined,
    imageEl: undefined,
    imageWrapEl: undefined,
    maxRatio: 3
  };
  var image = {
    isTouched: undefined,
    isMoved: undefined,
    currentX: undefined,
    currentY: undefined,
    minX: undefined,
    minY: undefined,
    maxX: undefined,
    maxY: undefined,
    width: undefined,
    height: undefined,
    startX: undefined,
    startY: undefined,
    touchesStart: {},
    touchesCurrent: {}
  };
  var velocity = {
    x: undefined,
    y: undefined,
    prevPositionX: undefined,
    prevPositionY: undefined,
    prevTime: undefined
  };
  var scale = 1;
  Object.defineProperty(swiper.zoom, 'scale', {
    get: function get() {
      return scale;
    },
    set: function set(value) {
      if (scale !== value) {
        var imageEl = gesture.imageEl;
        var slideEl = gesture.slideEl;
        emit('zoomChange', value, imageEl, slideEl);
      }
      scale = value;
    }
  });
  function getDistanceBetweenTouches() {
    if (evCache.length < 2) return 1;
    var x1 = evCache[0].pageX;
    var y1 = evCache[0].pageY;
    var x2 = evCache[1].pageX;
    var y2 = evCache[1].pageY;
    var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance;
  }
  function getScaleOrigin() {
    if (evCache.length < 2) return {
      x: null,
      y: null
    };
    var box = gesture.imageEl.getBoundingClientRect();
    return [(evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x) / currentScale, (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y) / currentScale];
  }
  function getSlideSelector() {
    return swiper.isElement ? "swiper-slide" : ".".concat(swiper.params.slideClass);
  }
  function eventWithinSlide(e) {
    var slideSelector = getSlideSelector();
    if (e.target.matches(slideSelector)) return true;
    if (swiper.slides.filter(function (slideEl) {
      return slideEl.contains(e.target);
    }).length > 0) return true;
    return false;
  }
  function eventWithinZoomContainer(e) {
    var selector = ".".concat(swiper.params.zoom.containerClass);
    if (e.target.matches(selector)) return true;
    if (_toConsumableArray(swiper.el.querySelectorAll(selector)).filter(function (containerEl) {
      return containerEl.contains(e.target);
    }).length > 0) return true;
    return false;
  }

  // Events
  function onGestureStart(e) {
    if (e.pointerType === 'mouse') {
      evCache.splice(0, evCache.length);
    }
    if (!eventWithinSlide(e)) return;
    var params = swiper.params.zoom;
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    evCache.push(e);
    if (evCache.length < 2) {
      return;
    }
    fakeGestureTouched = true;
    gesture.scaleStart = getDistanceBetweenTouches();
    if (!gesture.slideEl) {
      gesture.slideEl = e.target.closest(".".concat(swiper.params.slideClass, ", swiper-slide"));
      if (!gesture.slideEl) gesture.slideEl = swiper.slides[swiper.activeIndex];
      var imageEl = gesture.slideEl.querySelector(".".concat(params.containerClass));
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0, _utils.elementParents)(gesture.imageEl, ".".concat(params.containerClass))[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
      if (!gesture.imageWrapEl) {
        gesture.imageEl = undefined;
        return;
      }
      gesture.maxRatio = gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
    }
    if (gesture.imageEl) {
      var _getScaleOrigin = getScaleOrigin(),
        _getScaleOrigin2 = _slicedToArray(_getScaleOrigin, 2),
        originX = _getScaleOrigin2[0],
        originY = _getScaleOrigin2[1];
      gesture.originX = originX;
      gesture.originY = originY;
      gesture.imageEl.style.transitionDuration = '0ms';
    }
    isScaling = true;
  }
  function onGestureChange(e) {
    if (!eventWithinSlide(e)) return;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var pointerIndex = evCache.findIndex(function (cachedEv) {
      return cachedEv.pointerId === e.pointerId;
    });
    if (pointerIndex >= 0) evCache[pointerIndex] = e;
    if (evCache.length < 2) {
      return;
    }
    fakeGestureMoved = true;
    gesture.scaleMove = getDistanceBetweenTouches();
    if (!gesture.imageEl) {
      return;
    }
    zoom.scale = gesture.scaleMove / gesture.scaleStart * currentScale;
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = gesture.maxRatio - 1 + Math.pow(zoom.scale - gesture.maxRatio + 1, 0.5);
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = params.minRatio + 1 - Math.pow(params.minRatio - zoom.scale + 1, 0.5);
    }
    gesture.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(zoom.scale, ")");
  }
  function onGestureEnd(e) {
    if (!eventWithinSlide(e)) return;
    if (e.pointerType === 'mouse' && e.type === 'pointerout') return;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var pointerIndex = evCache.findIndex(function (cachedEv) {
      return cachedEv.pointerId === e.pointerId;
    });
    if (pointerIndex >= 0) evCache.splice(pointerIndex, 1);
    if (!fakeGestureTouched || !fakeGestureMoved) {
      return;
    }
    fakeGestureTouched = false;
    fakeGestureMoved = false;
    if (!gesture.imageEl) return;
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.imageEl.style.transitionDuration = "".concat(swiper.params.speed, "ms");
    gesture.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(zoom.scale, ")");
    currentScale = zoom.scale;
    isScaling = false;
    if (zoom.scale > 1 && gesture.slideEl) {
      gesture.slideEl.classList.add("".concat(params.zoomedSlideClass));
    } else if (zoom.scale <= 1 && gesture.slideEl) {
      gesture.slideEl.classList.remove("".concat(params.zoomedSlideClass));
    }
    if (zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
      gesture.slideEl = undefined;
    }
  }
  function onTouchStart(e) {
    var device = swiper.device;
    if (!gesture.imageEl) return;
    if (image.isTouched) return;
    if (device.android && e.cancelable) e.preventDefault();
    image.isTouched = true;
    var event = evCache.length > 0 ? evCache[0] : e;
    image.touchesStart.x = event.pageX;
    image.touchesStart.y = event.pageY;
  }
  function onTouchMove(e) {
    if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) return;
    var zoom = swiper.zoom;
    if (!gesture.imageEl) return;
    if (!image.isTouched || !gesture.slideEl) return;
    if (!image.isMoved) {
      image.width = gesture.imageEl.offsetWidth;
      image.height = gesture.imageEl.offsetHeight;
      image.startX = (0, _utils.getTranslate)(gesture.imageWrapEl, 'x') || 0;
      image.startY = (0, _utils.getTranslate)(gesture.imageWrapEl, 'y') || 0;
      gesture.slideWidth = gesture.slideEl.offsetWidth;
      gesture.slideHeight = gesture.slideEl.offsetHeight;
      gesture.imageWrapEl.style.transitionDuration = '0ms';
    }
    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
    image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
    var touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - image.touchesStart.x), Math.abs(image.touchesCurrent.y - image.touchesStart.y));
    if (touchesDiff > 5) {
      swiper.allowClick = false;
    }
    if (!image.isMoved && !isScaling) {
      if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
        image.isTouched = false;
        return;
      }
      if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
        image.isTouched = false;
        return;
      }
    }
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();
    image.isMoved = true;
    var scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - swiper.params.zoom.minRatio);
    var originX = gesture.originX,
      originY = gesture.originY;
    image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX + scaleRatio * (image.width - originX * 2);
    image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY + scaleRatio * (image.height - originY * 2);
    if (image.currentX < image.minX) {
      image.currentX = image.minX + 1 - Math.pow(image.minX - image.currentX + 1, 0.8);
    }
    if (image.currentX > image.maxX) {
      image.currentX = image.maxX - 1 + Math.pow(image.currentX - image.maxX + 1, 0.8);
    }
    if (image.currentY < image.minY) {
      image.currentY = image.minY + 1 - Math.pow(image.minY - image.currentY + 1, 0.8);
    }
    if (image.currentY > image.maxY) {
      image.currentY = image.maxY - 1 + Math.pow(image.currentY - image.maxY + 1, 0.8);
    }

    // Velocity
    if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
    if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
    if (!velocity.prevTime) velocity.prevTime = Date.now();
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();
    gesture.imageWrapEl.style.transform = "translate3d(".concat(image.currentX, "px, ").concat(image.currentY, "px,0)");
  }
  function onTouchEnd() {
    var zoom = swiper.zoom;
    if (!gesture.imageEl) return;
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    var momentumDurationX = 300;
    var momentumDurationY = 300;
    var momentumDistanceX = velocity.x * momentumDurationX;
    var newPositionX = image.currentX + momentumDistanceX;
    var momentumDistanceY = velocity.y * momentumDurationY;
    var newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
    if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
    var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
    image.currentX = newPositionX;
    image.currentY = newPositionY;
    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
    image.maxX = -image.minX;
    image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
    gesture.imageWrapEl.style.transitionDuration = "".concat(momentumDuration, "ms");
    gesture.imageWrapEl.style.transform = "translate3d(".concat(image.currentX, "px, ").concat(image.currentY, "px,0)");
  }
  function onTransitionEnd() {
    var zoom = swiper.zoom;
    if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
      if (gesture.imageEl) {
        gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
      }
      if (gesture.imageWrapEl) {
        gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
      }
      gesture.slideEl.classList.remove("".concat(swiper.params.zoom.zoomedSlideClass));
      zoom.scale = 1;
      currentScale = 1;
      gesture.slideEl = undefined;
      gesture.imageEl = undefined;
      gesture.imageWrapEl = undefined;
      gesture.originX = 0;
      gesture.originY = 0;
    }
  }
  function zoomIn(e) {
    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (e && e.target) {
        gesture.slideEl = e.target.closest(".".concat(swiper.params.slideClass, ", swiper-slide"));
      }
      if (!gesture.slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.slideEl = (0, _utils.elementChildren)(swiper.slidesEl, ".".concat(swiper.params.slideActiveClass))[0];
        } else {
          gesture.slideEl = swiper.slides[swiper.activeIndex];
        }
      }
      var imageEl = gesture.slideEl.querySelector(".".concat(params.containerClass));
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0, _utils.elementParents)(gesture.imageEl, ".".concat(params.containerClass))[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.touchAction = 'none';
    }
    gesture.slideEl.classList.add("".concat(params.zoomedSlideClass));
    var touchX;
    var touchY;
    var offsetX;
    var offsetY;
    var diffX;
    var diffY;
    var translateX;
    var translateY;
    var imageWidth;
    var imageHeight;
    var scaledWidth;
    var scaledHeight;
    var translateMinX;
    var translateMinY;
    var translateMaxX;
    var translateMaxY;
    var slideWidth;
    var slideHeight;
    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.pageX;
      touchY = e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }
    var forceZoomRatio = typeof e === 'number' ? e : null;
    if (currentScale === 1 && forceZoomRatio) {
      touchX = undefined;
      touchY = undefined;
    }
    zoom.scale = forceZoomRatio || gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
    currentScale = forceZoomRatio || gesture.imageWrapEl.getAttribute('data-swiper-zoom') || params.maxRatio;
    if (e && !(currentScale === 1 && forceZoomRatio)) {
      slideWidth = gesture.slideEl.offsetWidth;
      slideHeight = gesture.slideEl.offsetHeight;
      offsetX = (0, _utils.elementOffset)(gesture.slideEl).left + window.scrollX;
      offsetY = (0, _utils.elementOffset)(gesture.slideEl).top + window.scrollY;
      diffX = offsetX + slideWidth / 2 - touchX;
      diffY = offsetY + slideHeight / 2 - touchY;
      imageWidth = gesture.imageEl.offsetWidth;
      imageHeight = gesture.imageEl.offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;
      translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
      translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;
      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;
      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }
      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    if (forceZoomRatio && zoom.scale === 1) {
      gesture.originX = 0;
      gesture.originY = 0;
    }
    gesture.imageWrapEl.style.transitionDuration = '300ms';
    gesture.imageWrapEl.style.transform = "translate3d(".concat(translateX, "px, ").concat(translateY, "px,0)");
    gesture.imageEl.style.transitionDuration = '300ms';
    gesture.imageEl.style.transform = "translate3d(0,0,0) scale(".concat(zoom.scale, ")");
  }
  function zoomOut() {
    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    if (!gesture.slideEl) {
      if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
        gesture.slideEl = (0, _utils.elementChildren)(swiper.slidesEl, ".".concat(swiper.params.slideActiveClass))[0];
      } else {
        gesture.slideEl = swiper.slides[swiper.activeIndex];
      }
      var imageEl = gesture.slideEl.querySelector(".".concat(params.containerClass));
      if (imageEl) {
        imageEl = imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0];
      }
      gesture.imageEl = imageEl;
      if (imageEl) {
        gesture.imageWrapEl = (0, _utils.elementParents)(gesture.imageEl, ".".concat(params.containerClass))[0];
      } else {
        gesture.imageWrapEl = undefined;
      }
    }
    if (!gesture.imageEl || !gesture.imageWrapEl) return;
    if (swiper.params.cssMode) {
      swiper.wrapperEl.style.overflow = '';
      swiper.wrapperEl.style.touchAction = '';
    }
    zoom.scale = 1;
    currentScale = 1;
    gesture.imageWrapEl.style.transitionDuration = '300ms';
    gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
    gesture.imageEl.style.transitionDuration = '300ms';
    gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
    gesture.slideEl.classList.remove("".concat(params.zoomedSlideClass));
    gesture.slideEl = undefined;
    gesture.originX = 0;
    gesture.originY = 0;
  }

  // Toggle Zoom
  function zoomToggle(e) {
    var zoom = swiper.zoom;
    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoomOut();
    } else {
      // Zoom In
      zoomIn(e);
    }
  }
  function getListeners() {
    var passiveListener = swiper.params.passiveListeners ? {
      passive: true,
      capture: false
    } : false;
    var activeListenerWithCapture = swiper.params.passiveListeners ? {
      passive: false,
      capture: true
    } : true;
    return {
      passiveListener: passiveListener,
      activeListenerWithCapture: activeListenerWithCapture
    };
  }

  // Attach/Detach Events
  function enable() {
    var zoom = swiper.zoom;
    if (zoom.enabled) return;
    zoom.enabled = true;
    var _getListeners = getListeners(),
      passiveListener = _getListeners.passiveListener,
      activeListenerWithCapture = _getListeners.activeListenerWithCapture;

    // Scale image
    swiper.wrapperEl.addEventListener('pointerdown', onGestureStart, passiveListener);
    swiper.wrapperEl.addEventListener('pointermove', onGestureChange, activeListenerWithCapture);
    ['pointerup', 'pointercancel', 'pointerout'].forEach(function (eventName) {
      swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
    });

    // Move image
    swiper.wrapperEl.addEventListener('pointermove', onTouchMove, activeListenerWithCapture);
  }
  function disable() {
    var zoom = swiper.zoom;
    if (!zoom.enabled) return;
    zoom.enabled = false;
    var _getListeners2 = getListeners(),
      passiveListener = _getListeners2.passiveListener,
      activeListenerWithCapture = _getListeners2.activeListenerWithCapture;

    // Scale image
    swiper.wrapperEl.removeEventListener('pointerdown', onGestureStart, passiveListener);
    swiper.wrapperEl.removeEventListener('pointermove', onGestureChange, activeListenerWithCapture);
    ['pointerup', 'pointercancel', 'pointerout'].forEach(function (eventName) {
      swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
    });

    // Move image
    swiper.wrapperEl.removeEventListener('pointermove', onTouchMove, activeListenerWithCapture);
  }
  on('init', function () {
    if (swiper.params.zoom.enabled) {
      enable();
    }
  });
  on('destroy', function () {
    disable();
  });
  on('touchStart', function (_s, e) {
    if (!swiper.zoom.enabled) return;
    onTouchStart(e);
  });
  on('touchEnd', function (_s, e) {
    if (!swiper.zoom.enabled) return;
    onTouchEnd(e);
  });
  on('doubleTap', function (_s, e) {
    if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
      zoomToggle(e);
    }
  });
  on('transitionEnd', function () {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
      onTransitionEnd();
    }
  });
  on('slideChange', function () {
    if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
      onTransitionEnd();
    }
  });
  Object.assign(swiper.zoom, {
    enable: enable,
    disable: disable,
    "in": zoomIn,
    out: zoomOut,
    toggle: zoomToggle
  });
}

},{"../../shared/utils.js":104,"ssr-window":8}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = classesToSelector;
function classesToSelector() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return ".".concat(classes.trim().replace(/([\.:!+\/])/g, '\\$1') // eslint-disable-line
  .replace(/ /g, '.'));
}

},{}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createElementIfNotDefined;
var _utils = require("./utils.js");
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach(function (key) {
      if (!params[key] && params.auto === true) {
        var element = (0, _utils.elementChildren)(swiper.el, ".".concat(checkProps[key]))[0];
        if (!element) {
          element = (0, _utils.createElement)('div', checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}

},{"./utils.js":104}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createShadow;
var _utils = require("./utils.js");
function createShadow(params, slideEl, side) {
  var shadowClass = "swiper-slide-shadow".concat(side ? "-".concat(side) : '');
  var shadowContainer = (0, _utils.getSlideTransformEl)(slideEl);
  var shadowEl = shadowContainer.querySelector(".".concat(shadowClass));
  if (!shadowEl) {
    shadowEl = (0, _utils.createElement)('div', "swiper-slide-shadow".concat(side ? "-".concat(side) : ''));
    shadowContainer.append(shadowEl);
  }
  return shadowEl;
}

},{"./utils.js":104}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = effectInit;
function effectInit(params) {
  var effect = params.effect,
    swiper = params.swiper,
    on = params.on,
    setTranslate = params.setTranslate,
    setTransition = params.setTransition,
    overwriteParams = params.overwriteParams,
    perspective = params.perspective,
    recreateShadows = params.recreateShadows,
    getEffectParams = params.getEffectParams;
  on('beforeInit', function () {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push("".concat(swiper.params.containerModifierClass).concat(effect));
    if (perspective && perspective()) {
      swiper.classNames.push("".concat(swiper.params.containerModifierClass, "3d"));
    }
    var overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on('setTranslate', function () {
    if (swiper.params.effect !== effect) return;
    setTranslate();
  });
  on('setTransition', function (_s, duration) {
    if (swiper.params.effect !== effect) return;
    setTransition(duration);
  });
  on('transitionEnd', function () {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      // remove shadows
      swiper.slides.forEach(function (slideEl) {
        slideEl.querySelectorAll('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').forEach(function (shadowEl) {
          return shadowEl.remove();
        });
      });
      // create new one
      recreateShadows();
    }
  });
  var requireUpdateOnVirtual;
  on('virtualUpdate', function () {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(function () {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate();
        requireUpdateOnVirtual = false;
      }
    });
  });
}

},{}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = effectTarget;
var _utils = require("./utils.js");
function effectTarget(effectParams, slideEl) {
  var transformEl = (0, _utils.getSlideTransformEl)(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = 'hidden';
    transformEl.style['-webkit-backface-visibility'] = 'hidden';
  }
  return transformEl;
}

},{"./utils.js":104}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = effectVirtualTransitionEnd;
var _utils = require("./utils.js");
function effectVirtualTransitionEnd(_ref) {
  var swiper = _ref.swiper,
    duration = _ref.duration,
    transformElements = _ref.transformElements,
    allSlides = _ref.allSlides;
  var activeIndex = swiper.activeIndex;
  var getSlide = function getSlide(el) {
    if (!el.parentElement) {
      // assume shadow root
      var slide = swiper.slides.filter(function (slideEl) {
        return slideEl.shadowEl && slideEl.shadowEl === el.parentNode;
      })[0];
      return slide;
    }
    return el.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    var eventTriggered = false;
    var transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter(function (transformEl) {
        var el = transformEl.classList.contains('swiper-slide-transform') ? getSlide(transformEl) : transformEl;
        return swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach(function (el) {
      (0, _utils.elementTransitionEnd)(el, function () {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        var evt = new window.CustomEvent('transitionend', {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}

},{"./utils.js":104}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBrowser = getBrowser;
var _ssrWindow = require("ssr-window");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var browser;
function calcBrowser() {
  var window = (0, _ssrWindow.getWindow)();
  var needPerspectiveFix = false;
  function isSafari() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
  }
  if (isSafari()) {
    var ua = String(window.navigator.userAgent);
    if (ua.includes('Version/')) {
      var _ua$split$1$split$0$s = ua.split('Version/')[1].split(' ')[0].split('.').map(function (num) {
          return Number(num);
        }),
        _ua$split$1$split$0$s2 = _slicedToArray(_ua$split$1$split$0$s, 2),
        major = _ua$split$1$split$0$s2[0],
        minor = _ua$split$1$split$0$s2[1];
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  return {
    isSafari: needPerspectiveFix || isSafari(),
    needPerspectiveFix: needPerspectiveFix,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}

},{"ssr-window":8}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevice = getDevice;
var _ssrWindow = require("ssr-window");
var _getSupport = require("./get-support.js");
var deviceCached;
function calcDevice() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    userAgent = _ref.userAgent;
  var support = (0, _getSupport.getSupport)();
  var window = (0, _ssrWindow.getWindow)();
  var platform = window.navigator.platform;
  var ua = userAgent || window.navigator.userAgent;
  var device = {
    ios: false,
    android: false
  };
  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  var windows = platform === 'Win32';
  var macos = platform === 'MacIntel';

  // iPadOs 13 fix
  var iPadScreens = ['1024x1366', '1366x1024', '834x1194', '1194x834', '834x1112', '1112x834', '768x1024', '1024x768', '820x1180', '1180x820', '810x1080', '1080x810'];
  if (!ipad && macos && support.touch && iPadScreens.indexOf("".concat(screenWidth, "x").concat(screenHeight)) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, '13_0_0'];
    macos = false;
  }

  // Android
  if (android && !windows) {
    device.os = 'android';
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }

  // Export object
  return device;
}
function getDevice() {
  var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}

},{"./get-support.js":102,"ssr-window":8}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSupport = getSupport;
var _ssrWindow = require("ssr-window");
var support;
function calcSupport() {
  var window = (0, _ssrWindow.getWindow)();
  var document = (0, _ssrWindow.getDocument)();
  return {
    smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

},{"ssr-window":8}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processLazyPreloader = exports.preload = void 0;
var processLazyPreloader = function processLazyPreloader(swiper, imageEl) {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  var slideSelector = function slideSelector() {
    return swiper.isElement ? "swiper-slide" : ".".concat(swiper.params.slideClass);
  };
  var slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    var lazyEl = slideEl.querySelector(".".concat(swiper.params.lazyPreloaderClass));
    if (lazyEl) lazyEl.remove();
  }
};
exports.processLazyPreloader = processLazyPreloader;
var unlazy = function unlazy(swiper, index) {
  if (!swiper.slides[index]) return;
  var imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute('loading');
};
var preload = function preload(swiper) {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  var amount = swiper.params.lazyPreloadPrevNext;
  var len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  var slidesPerView = swiper.params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  var activeIndex = swiper.activeIndex;
  var slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind) {
    for (var i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      var realIndex = (i % len + len) % len;
      if (realIndex !== activeIndex && realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (var _i = Math.max(slideIndexLastInView - amount, 0); _i <= Math.min(slideIndexLastInView + amount, len - 1); _i += 1) {
      if (_i !== activeIndex && _i > slideIndexLastInView) unlazy(swiper, _i);
    }
  }
};
exports.preload = preload;

},{}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateCSSModeScroll = animateCSSModeScroll;
exports.createElement = createElement;
exports.deleteProps = deleteProps;
exports.elementChildren = elementChildren;
exports.elementIndex = elementIndex;
exports.elementNextAll = elementNextAll;
exports.elementOffset = elementOffset;
exports.elementOuterSize = elementOuterSize;
exports.elementParents = elementParents;
exports.elementPrevAll = elementPrevAll;
exports.elementStyle = elementStyle;
exports.elementTransitionEnd = elementTransitionEnd;
exports.extend = extend;
exports.findElementsInElements = findElementsInElements;
exports.getComputedStyle = getComputedStyle;
exports.getSlideTransformEl = getSlideTransformEl;
exports.getTranslate = getTranslate;
exports.isObject = isObject;
exports.nextTick = nextTick;
exports.now = now;
exports.setCSSProperty = setCSSProperty;
var _ssrWindow = require("ssr-window");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function deleteProps(obj) {
  var object = obj;
  Object.keys(object).forEach(function (key) {
    try {
      object[key] = null;
    } catch (e) {
      // no getter for object
    }
    try {
      delete object[key];
    } catch (e) {
      // something got wrong
    }
  });
}
function nextTick(callback) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle(el) {
  var window = (0, _ssrWindow.getWindow)();
  var style;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el) {
  var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';
  var window = (0, _ssrWindow.getWindow)();
  var matrix;
  var curTransform;
  var transformMatrix;
  var curStyle = getComputedStyle(el, null);
  if (window.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(',').length > 6) {
      curTransform = curTransform.split(', ').map(function (a) {
        return a.replace(',', '.');
      }).join(', ');
    }
    // Some old versions of Webkit choke when 'none' is passed; pass
    // empty string instead in this case
    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
    matrix = transformMatrix.toString().split(',');
  }
  if (axis === 'x') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === 'y') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject(o) {
  return _typeof(o) === 'object' && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === 'Object';
}
function isNode(node) {
  // eslint-disable-next-line
  if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend() {
  var to = Object(arguments.length <= 0 ? undefined : arguments[0]);
  var noExtend = ['__proto__', 'constructor', 'prototype'];
  for (var i = 1; i < arguments.length; i += 1) {
    var nextSource = i < 0 || arguments.length <= i ? undefined : arguments[i];
    if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
      var keysArray = Object.keys(Object(nextSource)).filter(function (key) {
        return noExtend.indexOf(key) < 0;
      });
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll(_ref) {
  var swiper = _ref.swiper,
    targetPosition = _ref.targetPosition,
    side = _ref.side;
  var window = (0, _ssrWindow.getWindow)();
  var startPosition = -swiper.translate;
  var startTime = null;
  var time;
  var duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = 'none';
  window.cancelAnimationFrame(swiper.cssModeFrameID);
  var dir = targetPosition > startPosition ? 'next' : 'prev';
  var isOutOfBound = function isOutOfBound(current, target) {
    return dir === 'next' && current >= target || dir === 'prev' && current <= target;
  };
  var animate = function animate() {
    time = new Date().getTime();
    if (startTime === null) {
      startTime = time;
    }
    var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    var easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    var currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo(_defineProperty({}, side, currentPosition));
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = 'hidden';
      swiper.wrapperEl.style.scrollSnapType = '';
      setTimeout(function () {
        swiper.wrapperEl.style.overflow = '';
        swiper.wrapperEl.scrollTo(_defineProperty({}, side, currentPosition));
      });
      window.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector('.swiper-slide-transform') || slideEl.shadowEl && slideEl.shadowEl.querySelector('.swiper-slide-transform') || slideEl;
}
function findElementsInElements() {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var found = [];
  elements.forEach(function (el) {
    found.push.apply(found, _toConsumableArray(el.querySelectorAll(selector)));
  });
  return found;
}
function elementChildren(element) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return _toConsumableArray(element.children).filter(function (el) {
    return el.matches(selector);
  });
}
function createElement(tag) {
  var _el$classList;
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var el = document.createElement(tag);
  (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(Array.isArray(classes) ? classes : [classes]));
  return el;
}
function elementOffset(el) {
  var window = (0, _ssrWindow.getWindow)();
  var document = (0, _ssrWindow.getDocument)();
  var box = el.getBoundingClientRect();
  var body = document.body;
  var clientTop = el.clientTop || body.clientTop || 0;
  var clientLeft = el.clientLeft || body.clientLeft || 0;
  var scrollTop = el === window ? window.scrollY : el.scrollTop;
  var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
  return {
    top: box.top + scrollTop - clientTop,
    left: box.left + scrollLeft - clientLeft
  };
}
function elementPrevAll(el, selector) {
  var prevEls = [];
  while (el.previousElementSibling) {
    var prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  var nextEls = [];
  while (el.nextElementSibling) {
    var next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  var window = (0, _ssrWindow.getWindow)();
  return window.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  var child = el;
  var i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }
    return i;
  }
  return undefined;
}
function elementParents(el, selector) {
  var parents = []; // eslint-disable-line
  var parent = el.parentElement; // eslint-disable-line
  while (parent) {
    if (selector) {
      if (parent.matches(selector)) parents.push(parent);
    } else {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el) return;
    callback.call(el, e);
    el.removeEventListener('transitionend', fireCallBack);
  }
  if (callback) {
    el.addEventListener('transitionend', fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  var window = (0, _ssrWindow.getWindow)();
  if (includeMargins) {
    return el[size === 'width' ? 'offsetWidth' : 'offsetHeight'] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top')) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'));
  }
  return el.offsetWidth;
}

},{"ssr-window":8}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "A11y", {
  enumerable: true,
  get: function get() {
    return _a11y["default"];
  }
});
Object.defineProperty(exports, "Autoplay", {
  enumerable: true,
  get: function get() {
    return _autoplay["default"];
  }
});
Object.defineProperty(exports, "Controller", {
  enumerable: true,
  get: function get() {
    return _controller["default"];
  }
});
Object.defineProperty(exports, "EffectCards", {
  enumerable: true,
  get: function get() {
    return _effectCards["default"];
  }
});
Object.defineProperty(exports, "EffectCoverflow", {
  enumerable: true,
  get: function get() {
    return _effectCoverflow["default"];
  }
});
Object.defineProperty(exports, "EffectCreative", {
  enumerable: true,
  get: function get() {
    return _effectCreative["default"];
  }
});
Object.defineProperty(exports, "EffectCube", {
  enumerable: true,
  get: function get() {
    return _effectCube["default"];
  }
});
Object.defineProperty(exports, "EffectFade", {
  enumerable: true,
  get: function get() {
    return _effectFade["default"];
  }
});
Object.defineProperty(exports, "EffectFlip", {
  enumerable: true,
  get: function get() {
    return _effectFlip["default"];
  }
});
Object.defineProperty(exports, "FreeMode", {
  enumerable: true,
  get: function get() {
    return _freeMode["default"];
  }
});
Object.defineProperty(exports, "Grid", {
  enumerable: true,
  get: function get() {
    return _grid["default"];
  }
});
Object.defineProperty(exports, "HashNavigation", {
  enumerable: true,
  get: function get() {
    return _hashNavigation["default"];
  }
});
Object.defineProperty(exports, "History", {
  enumerable: true,
  get: function get() {
    return _history["default"];
  }
});
Object.defineProperty(exports, "Keyboard", {
  enumerable: true,
  get: function get() {
    return _keyboard["default"];
  }
});
Object.defineProperty(exports, "Manipulation", {
  enumerable: true,
  get: function get() {
    return _manipulation["default"];
  }
});
Object.defineProperty(exports, "Mousewheel", {
  enumerable: true,
  get: function get() {
    return _mousewheel["default"];
  }
});
Object.defineProperty(exports, "Navigation", {
  enumerable: true,
  get: function get() {
    return _navigation["default"];
  }
});
Object.defineProperty(exports, "Pagination", {
  enumerable: true,
  get: function get() {
    return _pagination["default"];
  }
});
Object.defineProperty(exports, "Parallax", {
  enumerable: true,
  get: function get() {
    return _parallax["default"];
  }
});
Object.defineProperty(exports, "Scrollbar", {
  enumerable: true,
  get: function get() {
    return _scrollbar["default"];
  }
});
Object.defineProperty(exports, "Swiper", {
  enumerable: true,
  get: function get() {
    return _core["default"];
  }
});
Object.defineProperty(exports, "Thumbs", {
  enumerable: true,
  get: function get() {
    return _thumbs["default"];
  }
});
Object.defineProperty(exports, "Virtual", {
  enumerable: true,
  get: function get() {
    return _virtual["default"];
  }
});
Object.defineProperty(exports, "Zoom", {
  enumerable: true,
  get: function get() {
    return _zoom["default"];
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _core["default"];
  }
});
var _core = _interopRequireDefault(require("./core/core.js"));
var _virtual = _interopRequireDefault(require("./modules/virtual/virtual.js"));
var _keyboard = _interopRequireDefault(require("./modules/keyboard/keyboard.js"));
var _mousewheel = _interopRequireDefault(require("./modules/mousewheel/mousewheel.js"));
var _navigation = _interopRequireDefault(require("./modules/navigation/navigation.js"));
var _pagination = _interopRequireDefault(require("./modules/pagination/pagination.js"));
var _scrollbar = _interopRequireDefault(require("./modules/scrollbar/scrollbar.js"));
var _parallax = _interopRequireDefault(require("./modules/parallax/parallax.js"));
var _zoom = _interopRequireDefault(require("./modules/zoom/zoom.js"));
var _controller = _interopRequireDefault(require("./modules/controller/controller.js"));
var _a11y = _interopRequireDefault(require("./modules/a11y/a11y.js"));
var _history = _interopRequireDefault(require("./modules/history/history.js"));
var _hashNavigation = _interopRequireDefault(require("./modules/hash-navigation/hash-navigation.js"));
var _autoplay = _interopRequireDefault(require("./modules/autoplay/autoplay.js"));
var _thumbs = _interopRequireDefault(require("./modules/thumbs/thumbs.js"));
var _freeMode = _interopRequireDefault(require("./modules/free-mode/free-mode.js"));
var _grid = _interopRequireDefault(require("./modules/grid/grid.js"));
var _manipulation = _interopRequireDefault(require("./modules/manipulation/manipulation.js"));
var _effectFade = _interopRequireDefault(require("./modules/effect-fade/effect-fade.js"));
var _effectCube = _interopRequireDefault(require("./modules/effect-cube/effect-cube.js"));
var _effectFlip = _interopRequireDefault(require("./modules/effect-flip/effect-flip.js"));
var _effectCoverflow = _interopRequireDefault(require("./modules/effect-coverflow/effect-coverflow.js"));
var _effectCreative = _interopRequireDefault(require("./modules/effect-creative/effect-creative.js"));
var _effectCards = _interopRequireDefault(require("./modules/effect-cards/effect-cards.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./core/core.js":16,"./modules/a11y/a11y.js":66,"./modules/autoplay/autoplay.js":67,"./modules/controller/controller.js":68,"./modules/effect-cards/effect-cards.js":69,"./modules/effect-coverflow/effect-coverflow.js":70,"./modules/effect-creative/effect-creative.js":71,"./modules/effect-cube/effect-cube.js":72,"./modules/effect-fade/effect-fade.js":73,"./modules/effect-flip/effect-flip.js":74,"./modules/free-mode/free-mode.js":75,"./modules/grid/grid.js":76,"./modules/hash-navigation/hash-navigation.js":77,"./modules/history/history.js":78,"./modules/keyboard/keyboard.js":79,"./modules/manipulation/manipulation.js":80,"./modules/mousewheel/mousewheel.js":86,"./modules/navigation/navigation.js":87,"./modules/pagination/pagination.js":88,"./modules/parallax/parallax.js":89,"./modules/scrollbar/scrollbar.js":90,"./modules/thumbs/thumbs.js":91,"./modules/virtual/virtual.js":92,"./modules/zoom/zoom.js":93}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppHeight = void 0;
var getAppHeight = function getAppHeight() {
  function getHeight() {
    $('html').css('--app-height', $(window).innerHeight() + 'px');
  }
  getHeight();
  window.addEventListener('resize', function () {
    getHeight();
  });
};
exports.getAppHeight = getAppHeight;

},{}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollWidth = void 0;
var getScrollWidth = function getScrollWidth() {
  setTimeout(function () {
    $('html').css('--scroll-width', $(window).outerWidth() - $(document).width() + 'px');
  }, 3500);
};
exports.getScrollWidth = getScrollWidth;

},{}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerScrollChange = void 0;
var headerScrollChange = function headerScrollChange() {
  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    if (scroll > 0) {
      $('.header').addClass('scroll');
    } else {
      $('.header').removeClass('scroll');
    }
  });
};
exports.headerScrollChange = headerScrollChange;

},{}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuBtn = void 0;
var menuBtn = function menuBtn() {
  // open menu
  $('#hamburger').on('click', function () {
    $('body').toggleClass('overflow menu-show');
    $(this).toggleClass('is-active');
    $('#main-menu').toggleClass('show');
  });
  // close menu
  $(document).click(function (e) {
    if ($('#main-menu').has(e.target).length === 0 && $('#hamburger').has(e.target).length === 0 && $('#main-menu').hasClass('show') && !e.target.classList.contains('hamburger')) {
      $('body').removeClass('overflow menu-show');
      $('#hamburger').removeClass('is-active');
      $('#main-menu').removeClass('show');
    }
  });
};
exports.menuBtn = menuBtn;

},{}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoModal = exports.simpleModal = exports.galleryModal = void 0;
var videoModal = function videoModal() {
  $('.js-video-modal').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    tClose: 'Закрыть',
    tLoading: 'Загрузка',
    fixedContentPos: false,
    removalDelay: 160,
    preloader: false,
    callbacks: {
      open: function open() {
        $('body').addClass('overflow');
      },
      close: function close() {
        $('body').removeClass('overflow');
      }
    }
  });
};
exports.videoModal = videoModal;
var simpleModal = function simpleModal() {
  $('.js-simple-modal').magnificPopup({
    type: 'inline',
    mainClass: 'mfp-fade',
    tClose: 'Закрыть',
    tLoading: 'Загрузка',
    removalDelay: 160,
    closeBtnInside: true,
    fixedContentPos: true,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="icon icon-close_icon"></i><svg class="close-line" width="64" height="65" viewBox="0 0 64 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.1255 1C44.1255 1 4.43328 2.92676 1.13692 38.7616C-2.15943 74.5964 55.0944 68.0456 61.6893 45.3124C68.2841 22.5793 48.9491 9.86249 27.0663 15.642" stroke="#D74F29"/></svg></button>',
    preloader: false,
    callbacks: {
      open: function open() {
        $('body').addClass('overflow');
      },
      close: function close() {
        $('body').removeClass('overflow');
      }
    }
  });
};
exports.simpleModal = simpleModal;
var galleryModal = function galleryModal(galleryBlock) {
  $(galleryBlock).magnificPopup({
    delegate: 'a',
    type: 'image',
    mainClass: 'mfp-fade',
    tClose: 'Закрыть',
    tLoading: 'Загрузка',
    gallery: {
      enabled: true,
      tPrev: 'Назад',
      tNext: 'Вперед',
      tCounter: '<span class="mfp-counter"><span class="active">%curr%</span> / <span>%total%</span></span>'
    },
    image: {
      tError: 'Ошибка загрузки'
    }
  });
};
exports.galleryModal = galleryModal;

},{}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollTo = void 0;
var scrollTo = function scrollTo(selector, offset) {
  $("body").on('click', selector, function (e) {
    $('html,body').stop().animate({
      scrollTop: $('#' + $(this).attr('data-section')).offset().top - offset
    }, 1000);
    e.preventDefault();
  });
};
exports.scrollTo = scrollTo;

},{}],112:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("lazysizes/plugins/bgset/ls.bgset.js");
require("lazysizes/plugins/parent-fit/ls.parent-fit.js");
var _swiper = _interopRequireWildcard(require("swiper"));
var _gsap = _interopRequireDefault(require("gsap"));
var _Draggable = require("gsap/Draggable");
var _Flip = require("gsap/Flip");
var _headerScrollChange = require("./_func/_jq/headerScrollChange");
var _getAppHeight = require("./_func/_jq/getAppHeight");
var _getScrollWidth = require("./_func/_jq/getScrollWidth");
var _menuBtn = require("./_func/_jq/menuBtn");
var _modalMagnific = require("./_func/_jq/modalMagnific");
var _scrollTo = require("./_func/_jq/scrollTo");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// slider

// functions

/* ------------------- */ // preloader
var interval_index = 0;
function progress() {
  if (interval_index == 0) {
    var frame = function frame() {
      if (width >= 100) {
        clearInterval(id);
        interval_index = 0;
        elem.find('.preloader__percent').addClass('done');
        elem.addClass('hide').delay(500).fadeOut(500);
        $('body').removeClass('overflow');
      } else {
        width++;
        elem.find('.current-line').css('width', width + '%');
        elem.find('.preloader__percent').html(width + '%');
      }
    };
    interval_index = 1;
    var elem = $("#preloader"),
      width = 0,
      id = setInterval(frame, 22);
  }
}
progress();
document.addEventListener('DOMContentLoaded', function () {
  // app height
  (0, _getAppHeight.getAppHeight)();
  // scroll width
  (0, _getScrollWidth.getScrollWidth)();
  // scroll header change
  (0, _headerScrollChange.headerScrollChange)();
  // mobile menu
  (0, _menuBtn.menuBtn)();

  /* animation */
  var wow = new WOW({
    boxClass: 'wow',
    // animated element css class
    animateClass: 'animated',
    // animation css class
    offset: 200,
    // distance to the element when triggering the animation
    mobile: true,
    // trigger animations on mobile devices
    live: true,
    // act on asynchronously loaded content
    callback: function callback(box) {
      box.classList.add('custom-animate');
    }
  });
  wow.init();

  /* main menu */
  $('.main-menu__item').hover(function (event) {
    event.stopPropagation();
    $(this).addClass('active');
    if ($(this).hasClass('submenu-item')) {
      $(this).find('.submenu-wrapper').stop(true, true).slideDown(500);
    }
  }, function (event) {
    event.stopPropagation();
    $(this).removeClass('active');
    if ($(this).hasClass('submenu-item')) {
      $(this).find('.submenu-wrapper').stop(true, true).slideUp(500);
    }
  });
  $('.submenu-list__item').hover(function (event) {
    event.stopPropagation();
    $(this).addClass('active');
    if ($(this).hasClass('submenu-item')) {
      $(this).find('.thirdmenu-wrapper').stop(true, true).show();
    }
  }, function (event) {
    event.stopPropagation();
    $(this).removeClass('active');
    if ($(this).hasClass('submenu-item')) {
      $(this).find('.thirdmenu-wrapper').stop(true, true).hide();
    }
  });
  /* main page */
  if ($('#main-slider').length > 0) {
    var workCheck = function workCheck(scroll) {
      if (scroll == 0) {
        mainSlider.mousewheel.enable();
      }
    };
    var mainSlider = new _swiper["default"]("#main-slider", {
      modules: [_swiper.Mousewheel],
      direction: "horizontal",
      slidesPerView: 'auto',
      speed: 800,
      spaceBetween: 15,
      watchOverflow: true,
      init: false,
      mousewheel: {
        sensitivity: 2,
        eventsTarget: '.main-page'
      },
      on: {
        transitionEnd: function transitionEnd() {
          if (mainSlider.isEnd) {
            mainSlider.mousewheel.disable();
            window.removeEventListener('scroll', workCheck);
          }
        }
      },
      breakpoints: {
        1801: {
          spaceBetween: 50,
          direction: "vertical",
          mousewheel: {
            sensitivity: 2,
            eventsTarget: '.main-page'
          }
        },
        959: {
          direction: "vertical",
          mousewheel: {
            sensitivity: 2,
            eventsTarget: '.main-page'
          }
        },
        576: {
          spaceBetween: 30,
          direction: "horizontal",
          mousewheel: {
            sensitivity: 2,
            eventsTarget: '.main-page'
          }
        }
      }
    });
    mainSlider.init();
    if ($(window).width() > 1200) {
      $(window).scroll(function () {
        workCheck(this.pageYOffset);
      });
    } else {
      mainSlider.mousewheel.disable();
    }
  }
  // news slider
  var newsSlider = new _swiper["default"]('#news-slider', {
    modules: [_swiper.Pagination],
    speed: 800,
    loop: false,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      type: "progressbar",
      el: '.swiper-pagination'
    },
    breakpoints: {
      1201: {
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: false
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: false
      },
      576: {
        slidesPerView: 2
      }
    }
  });
  // events slider
  if ($('.events-slider').length > 0) {
    var setup = function setup() {
      var radius = wheel.offsetWidth / 2,
        center = radius,
        slice = 9,
        DEG2RAD = Math.PI / 180;
      _gsap["default"].set(images, {
        x: function x(i) {
          return center + radius * Math.sin(i * slice * DEG2RAD);
        },
        y: function y(i) {
          return center - radius * Math.cos(i * slice * DEG2RAD);
        },
        rotation: function rotation(i) {
          return i * slice;
        },
        xPercent: -50,
        yPercent: -50
      });
    };
    _gsap["default"].registerPlugin(_Draggable.Draggable, _Flip.Flip);
    var wheel = document.querySelector(".wheel"),
      images = _gsap["default"].utils.toArray(".wheel__card");
    setup();
    window.addEventListener("resize", setup);
    _Draggable.Draggable.create(wheel, {
      allowContextMenu: true,
      type: "rotation",
      trigger: wheel,
      inertia: true,
      snap: {
        rotation: _gsap["default"].utils.snap(100 / images.length)
      }
    });
    _gsap["default"].to(wheel, {
      rotation: -100,
      ease: "none",
      duration: 80,
      repeat: -1
    });
  }
  /*
  var eventsSlider = new Swiper('#events-slider', {
      speed: 800,
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 3,
      slidesPerView: 'auto'
  });
   */

  /* restaurant sliders */
  // first slider
  var smallSlider = new _swiper["default"]("#small-slider", {
    modules: [_swiper.Autoplay, _swiper.EffectFade],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1000,
    grabCursor: true,
    effect: 'fade',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    on: {
      activeIndexChange: function activeIndexChange() {
        if (smallSlider.realIndex != bigSlider.realIndex) {
          bigSlider.slideTo(smallSlider.realIndex);
        }
      }
    }
  });
  var bigSlider = new _swiper["default"]("#big-slider", {
    modules: [_swiper.Autoplay, _swiper.EffectFade],
    loop: true,
    grabCursor: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 0,
    effect: 'fade',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    on: {
      activeIndexChange: function activeIndexChange() {
        if (bigSlider.realIndex != smallSlider.realIndex) {
          smallSlider.slideTo(bigSlider.realIndex);
        }
      }
    }
  });
  // dish slider
  var dishSlider = new _swiper["default"]('#dish-slider', {
    speed: 800,
    loop: false,
    grabCursor: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
      1440: {
        slidesPerView: 6
      },
      1200: {
        slidesPerView: 5
      },
      960: {
        slidesPerView: 4
      },
      640: {
        slidesPerView: 3
      },
      414: {
        slidesPerView: 2
      }
    }
  });

  // footer form validate
  /*
  $('.footer .search-form').submit(function (e){
      e.preventDefault();
      console.log($(this).find('input[name="email"]').val().indexOf('@'));
      if(!$(this).find('input[name="email"]').val() == '' && $(this).find('input[name="email"]').val().indexOf('@') < 1){
          $(this).find('input[name="email"]').addClass('validate-error');
      }
      else{
          $(this).find('input[name="email"]').removeClass('validate-error');
      }
  })
   */
  /* modals */
  (0, _modalMagnific.simpleModal)();
  $(window).scroll(function () {
    var scroll = $(this).scrollTop() + $(window).innerHeight(),
      mainContent = $('.main-page').innerHeight(),
      footer = $('.footer').offset().top;
    if (scroll > mainContent && scroll < footer) {
      $('#scrollTop').show();
    } else {
      $('#scrollTop').hide();
    }
  });
  /* scroll to top */
  $("body").on('click', '#scrollTop', function (e) {
    $('html,body').stop().animate({
      scrollTop: 0
    }, 1000);
    e.preventDefault();
  });
});

},{"./_func/_jq/getAppHeight":106,"./_func/_jq/getScrollWidth":107,"./_func/_jq/headerScrollChange":108,"./_func/_jq/menuBtn":109,"./_func/_jq/modalMagnific":110,"./_func/_jq/scrollTo":111,"gsap":3,"gsap/Draggable":1,"gsap/Flip":2,"lazysizes/plugins/bgset/ls.bgset.js":6,"lazysizes/plugins/parent-fit/ls.parent-fit.js":7,"swiper":105}]},{},[112])

//# sourceMappingURL=common.js.map
