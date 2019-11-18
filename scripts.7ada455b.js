// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/carusel.js":[function(require,module,exports) {
function onInit() {
  var lists = document.querySelectorAll('[data-carusel]');
  lists.forEach(function (list) {
    var section = list.parentElement.parentElement;
    var button = section.querySelector('button[onclick]');
    setCarusel(button, 0);
    list.addEventListener('touchstart', onTouchStart);
    list.addEventListener('touchend', onTouchEnd);
  });
}

function onResize() {
  var lists = document.querySelectorAll('[data-carusel]');
  lists.forEach(function (list) {
    var section = list.parentElement.parentElement;
    var button = section.querySelector('button[onclick]');
    setCarusel(button, 0);
  });
}

var touchStartX = 0;
var touchMinDist = 30;

function onTouchStart(e) {
  touchStartX = e.changedTouches[0].pageX;
}

function onTouchEnd(e) {
  var distX = e.changedTouches[0].pageX - touchStartX;
  var absDistX = Math.abs(distX);
  var distOk = absDistX > touchMinDist;

  if (distOk) {
    var touchDirect = distX < 0 ? 'left' : 'right';
    touchSetCarucel(e, touchDirect);
  }
}

function touchSetCarucel(e, direct) {
  var list = e.target.closest('[data-carusel]');

  if (parent) {
    var step = direct === 'left' ? 1 : direct === 'right' ? -1 : 0;
    var section = list.parentElement.parentElement;
    var button = section.querySelector('button[onclick]');
    setCarusel(button, step);
  }
}

function setCarusel(button, step) {
  // console.log({target, step})
  var section = button.parentElement;
  var buttons = section.querySelectorAll('button[onclick]');
  var list = section.querySelector('[data-carusel]');
  var lenght = list.childElementCount;
  var w = list.firstElementChild.offsetWidth + 10;
  var viewLenght = Math.ceil(list.offsetWidth / w);
  var count = lenght - viewLenght; // console.log({list, buttons, viewLenght, count})

  var index = +list.dataset.carusel + step;

  if (index >= 0 && index <= count) {
    list.style.transform = "translateX(calc(".concat(index, " * ").concat(w, "px * -1))");
    list.dataset.carusel = index;
  }

  if (index <= 0) {
    buttons[0].style.opacity = 0;
    buttons[0].style.pointerEvents = 'none';
  } else {
    buttons[0].style.opacity = 1;
    buttons[0].style.pointerEvents = null;
  }

  if (index >= count) {
    buttons[1].style.opacity = 0;
    buttons[1].style.pointerEvents = 'none';
  } else {
    buttons[1].style.opacity = 1;
    buttons[1].style.pointerEvents = null;
  }
}

onInit();
window.addEventListener('resize', onResize);
window.setCarusel = setCarusel;
},{}],"scripts/menu.js":[function(require,module,exports) {
var burger = document.querySelector('.header__menu');
var menu = document.querySelector('.main-menu');
burger.addEventListener('click', function (e) {
  var isHide = menu.classList.contains('hide');

  if (isHide) {
    menu.classList.remove('hide');
    menu.classList.add('show');
    burger.classList.add('show-menu');
  } else {
    menu.classList.remove('show');
    menu.classList.add('hide');
    burger.classList.remove('show-menu');
  }
});
},{}],"../scripts/sub-menu.js":[function(require,module,exports) {
var buttons = document.querySelectorAll('.m-sub-menu, .m-sub-menu__close');
var menu = document.querySelector('.page__sub-menu');

var onClick = function onClick(e) {
  // debugger
  var isHide = menu.classList.contains('hide');

  if (isHide) {
    menu.classList.remove('hide');
    menu.classList.add('show');
  } else {
    menu.classList.remove('show');
    menu.classList.add('hide');
  }
};

buttons.forEach(function (button) {
  button.addEventListener('click', onClick);
});
},{}],"scripts/planer.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var currentDate = new Date();
var viewDays = 7;
var root = document.querySelector('.planer'); //корн эл

var grid = root && root.querySelector('.planer-grid');

function cleanGrid() {
  grid.innerHTML = '';
}

function checkViewDays() {
  if (window.innerWidth <= 600) {
    viewDays = 1;
  } else {
    viewDays = 7;
  }
}

function createCol() {
  var _elem$classList;

  var modeClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var elem = document.createElement('div');

  (_elem$classList = elem.classList).add.apply(_elem$classList, ['planer-grid__col'].concat(_toConsumableArray(modeClass)));

  grid.append(elem);
  return elem;
}

function renderTimeCol(fromTime, toTime, timeInterval) {
  var elem = createCol(['time']);
  var htmlStr = '<div class="cell"></div>';

  for (var i = fromTime; i < toTime; i = i + timeInterval) {
    var timeStrArr = new Date(i).toTimeString().split(':');
    var timeStr = timeStrArr[0] + ':' + timeStrArr[1];
    htmlStr += "<div class=\"cell\"><span>".concat(timeStr, "</span></div>");
  }

  elem.innerHTML = htmlStr;
}

function renderDayCol(fromTime, toTime, timeInterval, tasks) {
  var date = new Date(fromTime);
  var elem = createCol();
  var weekNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  var dateStrArr = date.toISOString().split('T')[0].split('-');
  var nameWeek = weekNames[date.getDay()];
  var dateStr = "".concat(dateStrArr[2], ".").concat(dateStrArr[1], " (").concat(nameWeek, ")");
  var htmlStr = "<div class=\"cell\">".concat(dateStr, "</div>");

  var _loop = function _loop(_i) {
    var task = tasks.find(function (el) {
      return el.from === _i;
    });

    if (task) {
      htmlStr += '<div class="planer-grid__task">';
      var toTaskTime = task.from + task.duration * 60 * 1000;

      for (var j = _i; j < toTaskTime; j = j + timeInterval) {
        htmlStr += '<div class="cell"><span></span></div>';
        _i = j;
      }

      htmlStr += "<div class=\"planer-task cropping\"><span>".concat(task.name, "</span></div>");
      htmlStr += '</div>';
    } else {
      htmlStr += '<div class="cell"><span></span></div>';
    }

    i = _i;
  };

  for (var i = fromTime; i < toTime; i = i + timeInterval) {
    _loop(i);
  }

  elem.innerHTML = htmlStr;
}

function getStartWeek(date) {
  var difDay = date.getDay() - 1; //разность дней

  var startWeek = date.getTime() - difDay * 24 * 60 * 60 * 1000;
  return new Date(startWeek);
}

function renderGrid(from, to, tasks) {
  cleanGrid();
  var timeInterval = 20 * 60 * 1000;
  var fromTime = from.getTime();
  var toTime = to.getTime();
  renderTimeCol(fromTime, toTime, timeInterval);

  for (var _i2 = 0; _i2 < viewDays; _i2++) {
    renderDayCol(fromTime, toTime, timeInterval, tasks);
    fromTime += 24 * 60 * 60 * 1000;
    toTime += 24 * 60 * 60 * 1000;
  }
}

function renderSelect(from) {
  var elem = root.querySelector('.planer-select span');
  var toTime = from.getTime() + (viewDays - 1) * 24 * 60 * 60 * 1000;
  var to = new Date(toTime);
  var fromStrArr = from.toISOString().split('T')[0].split('-');
  var fromStr = "".concat(fromStrArr[2], ".").concat(fromStrArr[1]);
  var toStrArr = to.toISOString().split('T')[0].split('-');
  var toStr = "".concat(toStrArr[2], ".").concat(toStrArr[1]);
  elem.textContent = "".concat(fromStr, " - ").concat(toStr);
}

function main() {
  var from = new Date(2019, 9, 14, 8, 0);
  var to = new Date(2019, 9, 14, 18, 0);
  var tasks = [{
    id: 1,
    name: 'Стерилизация',
    from: new Date(2019, 9, 20, 9, 0).getTime(),
    duration: 20
  }, {
    id: 2,
    name: 'Стерилизация',
    from: new Date(2019, 9, 20, 10, 20).getTime(),
    duration: 20
  }, {
    id: 3,
    name: 'Стерилизация',
    from: new Date(2019, 9, 19, 8, 0).getTime(),
    duration: 40
  }, {
    id: 4,
    name: 'Стерилизация',
    from: new Date(2019, 9, 17, 8, 40).getTime(),
    duration: 60
  }, {
    id: 5,
    name: 'Стерилизация',
    from: new Date(2019, 9, 14, 9, 40).getTime(),
    duration: 60
  }];
  checkViewDays();
  renderSelect(from);
  renderGrid(from, to, tasks);
  window.addEventListener('resize', function () {
    checkViewDays();
    renderSelect(from);
    renderGrid(from, to, tasks);
  });
}

if (root) {
  main();
}
},{}],"scripts/schedule.js":[function(require,module,exports) {
var root = document.querySelector('.schedule'); //корн эл

var grid = root && root.querySelector('.schedule-grid__body');
var viewWeek = 1;
var currentDate = new Date();

function cleanGrid() {
  grid.innerHTML = '';
}

function setViewWeek() {
  if (window.innerWidth <= 600) {
    viewDays = 1;
  } else {
    viewDays = getWeeks(year, month);
  }
}

function twoLen(time) {
  var timeTwo = ''; // console.log((time + '').length )

  if ((time + '').length == 1) {
    timeTwo = '0' + time;
  } else {
    timeTwo = time;
  }

  return timeTwo;
}

function renderDays(year, month, tasks) {
  var elem = grid;
  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = 32 - new Date(year, month, 32).getDate();
  var l = new Date(year, month + 1, 0);
  var weekInMonth = Math.ceil((l.getDate() - (l.getDay() ? l.getDay() : 7)) / 7) + 1;
  var htmlStr = '';
  var lastDay = new Date(year, month, daysInMonth).getDay();
  var countEmptyCell = 0;

  if (firstDay == 0) {
    countEmptyCell = 6;
  } else {
    countEmptyCell = firstDay - 1;
  }

  for (var i = 0; i < countEmptyCell; i++) {
    htmlStr += "<div class=\"cell empty\"></div>";
  }

  var _loop = function _loop(_i) {
    var task = tasks.find(function (el) {
      return new Date(el.from).getFullYear() === year && new Date(el.from).getMonth() === month && new Date(el.from).getDate() === _i;
    });
    var d = new Date(year, month, _i).getDay();
    var weekNames = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    if (task) {
      var fh = twoLen(new Date(task.from).getHours());
      var fm = twoLen(new Date(task.from).getMinutes());
      var th = twoLen(new Date(task.to).getHours());
      var tm = twoLen(new Date(task.to).getMinutes());

      if (task.filial == 1) {
        htmlStr += "<div class=\"cell cell__weekName\">".concat(weekNames[d], "</div>");
        htmlStr += "<div class=\"cell green\"><div class=\"cell__dom\">".concat(_i, "</div><span>").concat(fh, ":").concat(fm, " - ").concat(th, ":").concat(tm, "</span></div> ");
      }

      if (task.filial == 2) {
        htmlStr += "<div class=\"cell  cell__weekName\">".concat(weekNames[d], "</div>");
        htmlStr += "<div class=\"cell blue\"><div class=\"cell__dom\">".concat(_i, "</div><span>").concat(fh, ":").concat(fm, " - ").concat(th, ":").concat(tm, "</span></div> ");
      }

      if (task.filial == 3) {
        htmlStr += "<div class=\"cell  cell__weekName\">".concat(weekNames[d], "</div>");
        htmlStr += "<div class=\"cell orange\"><div class=\"cell__dom\">".concat(_i, "</div><span>").concat(fh, ":").concat(fm, " - ").concat(th, ":").concat(tm, "</span></div> ");
      }

      if (task.filial == 4) {
        htmlStr += "<div class=\"cell  cell__weekName\">".concat(weekNames[d], "</div>");
        htmlStr += "<div class=\"cell yellow\"><div class=\"cell__dom\">".concat(_i, "</div><span>").concat(fh, ":").concat(fm, " - ").concat(th, ":").concat(tm, "</span></div> ");
      }
    } else {
      htmlStr += "<div class=\"cell  cell__weekName\">".concat(weekNames[d], "</div>");
      htmlStr += "<div class=\"cell\"><div class=\"cell__dom\">".concat(_i, "</div></div>");
    }
  };

  for (var _i = 1; _i <= daysInMonth; _i = _i + 1) {
    _loop(_i);
  }

  for (var _i2 = 0; _i2 < 7 - lastDay; _i2++) {
    // htmlStr +=`<div class="cell  cell__weekName">${weekNames[d]}</div>`
    htmlStr += "<div class=\"cell empty\"></div>";
  }

  elem.innerHTML = htmlStr;
}

function main() {
  var tasks = [{
    from: new Date(2019, 9, 1, 9, 0).getTime(),
    to: new Date(2019, 9, 1, 17, 0).getTime(),
    filial: 1
  }, {
    from: new Date(2019, 9, 2, 9, 0).getTime(),
    to: new Date(2019, 9, 2, 17, 0).getTime(),
    filial: 1
  }, {
    from: new Date(2019, 9, 3, 9, 0).getTime(),
    to: new Date(2019, 9, 3, 17, 0).getTime(),
    filial: 3
  }, {
    from: new Date(2019, 9, 4, 9, 0).getTime(),
    to: new Date(2019, 9, 4, 17, 0).getTime(),
    filial: 3
  }, {
    from: new Date(2019, 9, 5, 9, 0).getTime(),
    to: new Date(2019, 9, 5, 17, 0).getTime(),
    filial: 3
  }, {
    from: new Date(2019, 9, 15, 9, 0).getTime(),
    to: new Date(2019, 9, 15, 17, 0).getTime(),
    filial: 3
  }, {
    from: new Date(2019, 9, 17, 9, 0).getTime(),
    to: new Date(2019, 9, 17, 17, 0).getTime(),
    filial: 4
  }, {
    from: new Date(2019, 9, 19, 9, 0).getTime(),
    to: new Date(2019, 9, 19, 17, 0).getTime(),
    filial: 1
  }, {
    from: new Date(2019, 9, 20, 9, 0).getTime(),
    to: new Date(2019, 9, 20, 17, 0).getTime(),
    filial: 4
  }, {
    from: new Date(2019, 9, 27, 9, 0).getTime(),
    to: new Date(2019, 9, 27, 17, 0).getTime(),
    filial: 2
  }, {
    from: new Date(2019, 9, 29, 9, 0).getTime(),
    to: new Date(2019, 9, 29, 17, 0).getTime(),
    filial: 1
  }, {
    from: new Date(2019, 9, 30, 9, 0).getTime(),
    to: new Date(2019, 9, 30, 17, 0).getTime(),
    filial: 2
  }];
  renderDays(2019, 9, tasks);
}

if (root) {
  main();
} // console.log(new Date)
},{}],"../scripts/text-cropping.js":[function(require,module,exports) {
var listBox = document.querySelectorAll('.cropping');

function main() {
  listBox.forEach(function (box) {
    var text = box.innerHTML;
    var clone = document.createElement('div');
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.width = box.clientWidth + 'px';
    clone.innerHTML = text;
    document.body.appendChild(clone);
    var l = text.length - 1;

    for (; l >= 0 && clone.clientHeight > box.clientHeight; l--) {
      clone.innerHTML = text.substring(0, l) + '...';
    }

    box.innerHTML = clone.innerHTML;
  });
}

function onResize() {
  if (listBox) {
    main();
  }
}

if (listBox) {
  main();
}

window.addEventListener('resize', onResize); // window.setCarusel = setCarusel
},{}],"scripts.js":[function(require,module,exports) {
require('./scripts/carusel');

require('./scripts/menu');

require('./scripts/sub-menu');

require('./scripts/planer');

require('./scripts/schedule');

require('./scripts/text-cropping');
},{"./scripts/carusel":"scripts/carusel.js","./scripts/menu":"scripts/menu.js","./scripts/sub-menu":"../scripts/sub-menu.js","./scripts/planer":"scripts/planer.js","./scripts/schedule":"scripts/schedule.js","./scripts/text-cropping":"../scripts/text-cropping.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51901" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts.js"], null)
//# sourceMappingURL=/scripts.7ada455b.js.map