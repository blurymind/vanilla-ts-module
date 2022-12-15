var tr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rr(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var ir = async (o) => {
  var ie, v, Q;
  let I = 0, x = !1, M, q = !1, X = [], ee = (y) => +y + "" == y + "", te = (y) => ee(y) && +y >= 0 && +y <= b.duration, k = (y, oe) => {
    o[y] = W.call(o, y) ? o[y] : oe;
  }, W = {}.hasOwnProperty, b = document.createElement("video");
  for (b.src = o.url, b.crossOrigin = "anonymous", b.onseeked = async () => {
    M && M();
  }, b.onerror = () => {
    x = !0;
  }; (b.duration === 1 / 0 || isNaN(b.duration)) && b.readyState < 2 && (await new Promise((y) => setTimeout(y, 100)), b.currentTime = 1e7 * Math.random(), !x); )
    ;
  b.currentTime = b.duration / 2, await new Promise((y) => {
    M = y;
  }), k("format", "image/png"), k("offsets", []), k("startTime", 0), k("endTime", b.duration), k("count", 1), k("onLoad", !1), k("onProgress", !1), ie = Array, o.offsets instanceof ie ? o.offsets = o.offsets.filter((y) => te(y)) : o.offsets = [], o.offsets.length !== 0 && (q = !0), te(o.startTime) || (o.startTime = 0), te(o.endTime) || (o.endTime = b.duration), o.startTime = +o.startTime, o.endTime = +o.endTime, o.startTime >= o.endTime && (o.startTime = o.endTime, o.count = 1), o.count = Math.abs(~~o.count), o.count === 0 && (o.count = 1), q && (o.count = o.offsets.length);
  let $ = (o.endTime - o.startTime) / o.count, z = W.call(o, "width"), p = W.call(o, "height"), _ = b.videoWidth / b.videoHeight;
  z && !ee(o.width) && (z = !1), p && !ee(o.height) && (p = !1), z || p ? z && !p ? o.height = o.width / _ : !z && p && (o.width = o.height * _) : (o.width = 128, o.height = o.width / _), o.width = +o.width, o.height = +o.height, v = Function, o.onLoad instanceof v || (o.onLoad = !1), Q = Function, o.onProgress instanceof Q || (o.onProgress = !1), o.onLoad && o.onLoad();
  let j = document.createElement("canvas"), Y = j.getContext("2d");
  j.width = o.width, j.height = o.height;
  let ve = async (y) => {
    for (; I < o.count; )
      b.currentTime = q ? o.offsets[I] : o.startTime + I * $, await new Promise((oe) => {
        M = oe;
      }), Y.clearRect(0, 0, j.width, j.height), Y.drawImage(b, 0, 0, j.width, j.height), X.push({ offset: b.currentTime, image: j.toDataURL(o.format) }), I++, o.onProgress && o.onProgress(I, o.count);
    y(X);
  };
  return new Promise((y) => {
    x && y([]), ve(y);
  });
}, Ue = { exports: {} };
(function(o, ie) {
  (function(v, Q) {
    Q(ie);
  })(tr, function(v) {
    v.PipsMode = void 0, function(t) {
      t.Range = "range", t.Steps = "steps", t.Positions = "positions", t.Count = "count", t.Values = "values";
    }(v.PipsMode || (v.PipsMode = {})), v.PipsType = void 0, function(t) {
      t[t.None = -1] = "None", t[t.NoValue = 0] = "NoValue", t[t.LargeValue = 1] = "LargeValue", t[t.SmallValue = 2] = "SmallValue";
    }(v.PipsType || (v.PipsType = {}));
    function Q(t) {
      return I(t) && typeof t.from == "function";
    }
    function I(t) {
      return typeof t == "object" && typeof t.to == "function";
    }
    function x(t) {
      t.parentElement.removeChild(t);
    }
    function M(t) {
      return t != null;
    }
    function q(t) {
      t.preventDefault();
    }
    function X(t) {
      return t.filter(function(e) {
        return this[e] ? !1 : this[e] = !0;
      }, {});
    }
    function ee(t, e) {
      return Math.round(t / e) * e;
    }
    function te(t, e) {
      var s = t.getBoundingClientRect(), f = t.ownerDocument, c = f.documentElement, S = Y(f);
      return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (S.x = 0), e ? s.top + S.y - c.clientTop : s.left + S.x - c.clientLeft;
    }
    function k(t) {
      return typeof t == "number" && !isNaN(t) && isFinite(t);
    }
    function W(t, e, s) {
      s > 0 && (p(t, e), setTimeout(function() {
        _(t, e);
      }, s));
    }
    function b(t) {
      return Math.max(Math.min(t, 100), 0);
    }
    function $(t) {
      return Array.isArray(t) ? t : [t];
    }
    function z(t) {
      t = String(t);
      var e = t.split(".");
      return e.length > 1 ? e[1].length : 0;
    }
    function p(t, e) {
      t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e;
    }
    function _(t, e) {
      t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function j(t, e) {
      return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className);
    }
    function Y(t) {
      var e = window.pageXOffset !== void 0, s = (t.compatMode || "") === "CSS1Compat", f = e ? window.pageXOffset : s ? t.documentElement.scrollLeft : t.body.scrollLeft, c = e ? window.pageYOffset : s ? t.documentElement.scrollTop : t.body.scrollTop;
      return {
        x: f,
        y: c
      };
    }
    function ve() {
      return window.navigator.pointerEnabled ? {
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup"
      } : window.navigator.msPointerEnabled ? {
        start: "MSPointerDown",
        move: "MSPointerMove",
        end: "MSPointerUp"
      } : {
        start: "mousedown touchstart",
        move: "mousemove touchmove",
        end: "mouseup touchend"
      };
    }
    function y() {
      var t = !1;
      try {
        var e = Object.defineProperty({}, "passive", {
          get: function() {
            t = !0;
          }
        });
        window.addEventListener("test", null, e);
      } catch {
      }
      return t;
    }
    function oe() {
      return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    function me(t, e) {
      return 100 / (e - t);
    }
    function ge(t, e, s) {
      return e * 100 / (t[s + 1] - t[s]);
    }
    function et(t, e) {
      return ge(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0], 0);
    }
    function tt(t, e) {
      return e * (t[1] - t[0]) / 100 + t[0];
    }
    function le(t, e) {
      for (var s = 1; t >= e[s]; )
        s += 1;
      return s;
    }
    function rt(t, e, s) {
      if (s >= t.slice(-1)[0])
        return 100;
      var f = le(s, t), c = t[f - 1], S = t[f], m = e[f - 1], V = e[f];
      return m + et([c, S], s) / me(m, V);
    }
    function it(t, e, s) {
      if (s >= 100)
        return t.slice(-1)[0];
      var f = le(s, e), c = t[f - 1], S = t[f], m = e[f - 1], V = e[f];
      return tt([c, S], (s - m) * me(m, V));
    }
    function nt(t, e, s, f) {
      if (f === 100)
        return f;
      var c = le(f, t), S = t[c - 1], m = t[c];
      return s ? f - S > (m - S) / 2 ? m : S : e[c - 1] ? t[c - 1] + ee(f - t[c - 1], e[c - 1]) : f;
    }
    var He = function() {
      function t(e, s, f) {
        this.xPct = [], this.xVal = [], this.xSteps = [], this.xNumSteps = [], this.xHighestCompleteStep = [], this.xSteps = [f || !1], this.xNumSteps = [!1], this.snap = s;
        var c, S = [];
        for (Object.keys(e).forEach(function(m) {
          S.push([$(e[m]), m]);
        }), S.sort(function(m, V) {
          return m[0][0] - V[0][0];
        }), c = 0; c < S.length; c++)
          this.handleEntryPoint(S[c][1], S[c][0]);
        for (this.xNumSteps = this.xSteps.slice(0), c = 0; c < this.xNumSteps.length; c++)
          this.handleStepPoint(c, this.xNumSteps[c]);
      }
      return t.prototype.getDistance = function(e) {
        for (var s = [], f = 0; f < this.xNumSteps.length - 1; f++)
          s[f] = ge(this.xVal, e, f);
        return s;
      }, t.prototype.getAbsoluteDistance = function(e, s, f) {
        var c = 0;
        if (e < this.xPct[this.xPct.length - 1])
          for (; e > this.xPct[c + 1]; )
            c++;
        else
          e === this.xPct[this.xPct.length - 1] && (c = this.xPct.length - 2);
        !f && e === this.xPct[c + 1] && c++, s === null && (s = []);
        var S, m = 1, V = s[c], g = 0, N = 0, K = 0, H = 0;
        for (f ? S = (e - this.xPct[c]) / (this.xPct[c + 1] - this.xPct[c]) : S = (this.xPct[c + 1] - e) / (this.xPct[c + 1] - this.xPct[c]); V > 0; )
          g = this.xPct[c + 1 + H] - this.xPct[c + H], s[c + H] * m + 100 - S * 100 > 100 ? (N = g * S, m = (V - 100 * S) / s[c + H], S = 1) : (N = s[c + H] * g / 100 * m, m = 0), f ? (K = K - N, this.xPct.length + H >= 1 && H--) : (K = K + N, this.xPct.length - H >= 1 && H++), V = s[c + H] * m;
        return e + K;
      }, t.prototype.toStepping = function(e) {
        return e = rt(this.xVal, this.xPct, e), e;
      }, t.prototype.fromStepping = function(e) {
        return it(this.xVal, this.xPct, e);
      }, t.prototype.getStep = function(e) {
        return e = nt(this.xPct, this.xSteps, this.snap, e), e;
      }, t.prototype.getDefaultStep = function(e, s, f) {
        var c = le(e, this.xPct);
        return (e === 100 || s && e === this.xPct[c - 1]) && (c = Math.max(c - 1, 1)), (this.xVal[c] - this.xVal[c - 1]) / f;
      }, t.prototype.getNearbySteps = function(e) {
        var s = le(e, this.xPct);
        return {
          stepBefore: {
            startValue: this.xVal[s - 2],
            step: this.xNumSteps[s - 2],
            highestStep: this.xHighestCompleteStep[s - 2]
          },
          thisStep: {
            startValue: this.xVal[s - 1],
            step: this.xNumSteps[s - 1],
            highestStep: this.xHighestCompleteStep[s - 1]
          },
          stepAfter: {
            startValue: this.xVal[s],
            step: this.xNumSteps[s],
            highestStep: this.xHighestCompleteStep[s]
          }
        };
      }, t.prototype.countStepDecimals = function() {
        var e = this.xNumSteps.map(z);
        return Math.max.apply(null, e);
      }, t.prototype.hasNoSize = function() {
        return this.xVal[0] === this.xVal[this.xVal.length - 1];
      }, t.prototype.convert = function(e) {
        return this.getStep(this.toStepping(e));
      }, t.prototype.handleEntryPoint = function(e, s) {
        var f;
        if (e === "min" ? f = 0 : e === "max" ? f = 100 : f = parseFloat(e), !k(f) || !k(s[0]))
          throw new Error("noUiSlider: 'range' value isn't numeric.");
        this.xPct.push(f), this.xVal.push(s[0]);
        var c = Number(s[1]);
        f ? this.xSteps.push(isNaN(c) ? !1 : c) : isNaN(c) || (this.xSteps[0] = c), this.xHighestCompleteStep.push(0);
      }, t.prototype.handleStepPoint = function(e, s) {
        if (s) {
          if (this.xVal[e] === this.xVal[e + 1]) {
            this.xSteps[e] = this.xHighestCompleteStep[e] = this.xVal[e];
            return;
          }
          this.xSteps[e] = ge([this.xVal[e], this.xVal[e + 1]], s, 0) / me(this.xPct[e], this.xPct[e + 1]);
          var f = (this.xVal[e + 1] - this.xVal[e]) / this.xNumSteps[e], c = Math.ceil(Number(f.toFixed(3)) - 1), S = this.xVal[e] + this.xNumSteps[e] * c;
          this.xHighestCompleteStep[e] = S;
        }
      }, t;
    }(), Oe = {
      to: function(t) {
        return t === void 0 ? "" : t.toFixed(2);
      },
      from: Number
    }, Se = {
      target: "target",
      base: "base",
      origin: "origin",
      handle: "handle",
      handleLower: "handle-lower",
      handleUpper: "handle-upper",
      touchArea: "touch-area",
      horizontal: "horizontal",
      vertical: "vertical",
      background: "background",
      connect: "connect",
      connects: "connects",
      ltr: "ltr",
      rtl: "rtl",
      textDirectionLtr: "txt-dir-ltr",
      textDirectionRtl: "txt-dir-rtl",
      draggable: "draggable",
      drag: "state-drag",
      tap: "state-tap",
      active: "active",
      tooltip: "tooltip",
      pips: "pips",
      pipsHorizontal: "pips-horizontal",
      pipsVertical: "pips-vertical",
      marker: "marker",
      markerHorizontal: "marker-horizontal",
      markerVertical: "marker-vertical",
      markerNormal: "marker-normal",
      markerLarge: "marker-large",
      markerSub: "marker-sub",
      value: "value",
      valueHorizontal: "value-horizontal",
      valueVertical: "value-vertical",
      valueNormal: "value-normal",
      valueLarge: "value-large",
      valueSub: "value-sub"
    }, re = {
      tooltips: ".__tooltips",
      aria: ".__aria"
    };
    function at(t, e) {
      if (!k(e))
        throw new Error("noUiSlider: 'step' is not numeric.");
      t.singleStep = e;
    }
    function st(t, e) {
      if (!k(e))
        throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
      t.keyboardPageMultiplier = e;
    }
    function ot(t, e) {
      if (!k(e))
        throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
      t.keyboardMultiplier = e;
    }
    function lt(t, e) {
      if (!k(e))
        throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
      t.keyboardDefaultStep = e;
    }
    function ut(t, e) {
      if (typeof e != "object" || Array.isArray(e))
        throw new Error("noUiSlider: 'range' is not an object.");
      if (e.min === void 0 || e.max === void 0)
        throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
      t.spectrum = new He(e, t.snap || !1, t.singleStep);
    }
    function ft(t, e) {
      if (e = $(e), !Array.isArray(e) || !e.length)
        throw new Error("noUiSlider: 'start' option is incorrect.");
      t.handles = e.length, t.start = e;
    }
    function ct(t, e) {
      if (typeof e != "boolean")
        throw new Error("noUiSlider: 'snap' option must be a boolean.");
      t.snap = e;
    }
    function dt(t, e) {
      if (typeof e != "boolean")
        throw new Error("noUiSlider: 'animate' option must be a boolean.");
      t.animate = e;
    }
    function ht(t, e) {
      if (typeof e != "number")
        throw new Error("noUiSlider: 'animationDuration' option must be a number.");
      t.animationDuration = e;
    }
    function pt(t, e) {
      var s = [!1], f;
      if (e === "lower" ? e = [!0, !1] : e === "upper" && (e = [!1, !0]), e === !0 || e === !1) {
        for (f = 1; f < t.handles; f++)
          s.push(e);
        s.push(!1);
      } else {
        if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1)
          throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
        s = e;
      }
      t.connect = s;
    }
    function vt(t, e) {
      switch (e) {
        case "horizontal":
          t.ort = 0;
          break;
        case "vertical":
          t.ort = 1;
          break;
        default:
          throw new Error("noUiSlider: 'orientation' option is invalid.");
      }
    }
    function _e(t, e) {
      if (!k(e))
        throw new Error("noUiSlider: 'margin' option must be numeric.");
      e !== 0 && (t.margin = t.spectrum.getDistance(e));
    }
    function mt(t, e) {
      if (!k(e))
        throw new Error("noUiSlider: 'limit' option must be numeric.");
      if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2)
        throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
    function gt(t, e) {
      var s;
      if (!k(e) && !Array.isArray(e))
        throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
      if (Array.isArray(e) && !(e.length === 2 || k(e[0]) || k(e[1])))
        throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
      if (e !== 0) {
        for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], s = 0; s < t.spectrum.xNumSteps.length - 1; s++)
          if (t.padding[0][s] < 0 || t.padding[1][s] < 0)
            throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        var f = e[0] + e[1], c = t.spectrum.xVal[0], S = t.spectrum.xVal[t.spectrum.xVal.length - 1];
        if (f / (S - c) > 1)
          throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
      }
    }
    function St(t, e) {
      switch (e) {
        case "ltr":
          t.dir = 0;
          break;
        case "rtl":
          t.dir = 1;
          break;
        default:
          throw new Error("noUiSlider: 'direction' option was not recognized.");
      }
    }
    function wt(t, e) {
      if (typeof e != "string")
        throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
      var s = e.indexOf("tap") >= 0, f = e.indexOf("drag") >= 0, c = e.indexOf("fixed") >= 0, S = e.indexOf("snap") >= 0, m = e.indexOf("hover") >= 0, V = e.indexOf("unconstrained") >= 0, g = e.indexOf("drag-all") >= 0, N = e.indexOf("smooth-steps") >= 0;
      if (c) {
        if (t.handles !== 2)
          throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
        _e(t, t.start[1] - t.start[0]);
      }
      if (V && (t.margin || t.limit))
        throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
      t.events = {
        tap: s || S,
        drag: f,
        dragAll: g,
        smoothSteps: N,
        fixed: c,
        snap: S,
        hover: m,
        unconstrained: V
      };
    }
    function bt(t, e) {
      if (e !== !1)
        if (e === !0 || I(e)) {
          t.tooltips = [];
          for (var s = 0; s < t.handles; s++)
            t.tooltips.push(e);
        } else {
          if (e = $(e), e.length !== t.handles)
            throw new Error("noUiSlider: must pass a formatter for all handles.");
          e.forEach(function(f) {
            if (typeof f != "boolean" && !I(f))
              throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
          }), t.tooltips = e;
        }
    }
    function Et(t, e) {
      if (e.length !== t.handles)
        throw new Error("noUiSlider: must pass a attributes for all handles.");
      t.handleAttributes = e;
    }
    function xt(t, e) {
      if (!I(e))
        throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
      t.ariaFormat = e;
    }
    function Ct(t, e) {
      if (!Q(e))
        throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
      t.format = e;
    }
    function Pt(t, e) {
      if (typeof e != "boolean")
        throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
      t.keyboardSupport = e;
    }
    function yt(t, e) {
      t.documentElement = e;
    }
    function Vt(t, e) {
      if (typeof e != "string" && e !== !1)
        throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
      t.cssPrefix = e;
    }
    function At(t, e) {
      if (typeof e != "object")
        throw new Error("noUiSlider: 'cssClasses' must be an object.");
      typeof t.cssPrefix == "string" ? (t.cssClasses = {}, Object.keys(e).forEach(function(s) {
        t.cssClasses[s] = t.cssPrefix + e[s];
      })) : t.cssClasses = e;
    }
    function Fe(t) {
      var e = {
        margin: null,
        limit: null,
        padding: null,
        animate: !0,
        animationDuration: 300,
        ariaFormat: Oe,
        format: Oe
      }, s = {
        step: { r: !1, t: at },
        keyboardPageMultiplier: { r: !1, t: st },
        keyboardMultiplier: { r: !1, t: ot },
        keyboardDefaultStep: { r: !1, t: lt },
        start: { r: !0, t: ft },
        connect: { r: !0, t: pt },
        direction: { r: !0, t: St },
        snap: { r: !1, t: ct },
        animate: { r: !1, t: dt },
        animationDuration: { r: !1, t: ht },
        range: { r: !0, t: ut },
        orientation: { r: !1, t: vt },
        margin: { r: !1, t: _e },
        limit: { r: !1, t: mt },
        padding: { r: !1, t: gt },
        behaviour: { r: !0, t: wt },
        ariaFormat: { r: !1, t: xt },
        format: { r: !1, t: Ct },
        tooltips: { r: !1, t: bt },
        keyboardSupport: { r: !0, t: Pt },
        documentElement: { r: !1, t: yt },
        cssPrefix: { r: !0, t: Vt },
        cssClasses: { r: !0, t: At },
        handleAttributes: { r: !1, t: Et }
      }, f = {
        connect: !1,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        keyboardSupport: !0,
        cssPrefix: "noUi-",
        cssClasses: Se,
        keyboardPageMultiplier: 5,
        keyboardMultiplier: 1,
        keyboardDefaultStep: 10
      };
      t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(s).forEach(function(g) {
        if (!M(t[g]) && f[g] === void 0) {
          if (s[g].r)
            throw new Error("noUiSlider: '" + g + "' is required.");
          return;
        }
        s[g].t(e, M(t[g]) ? t[g] : f[g]);
      }), e.pips = t.pips;
      var c = document.createElement("div"), S = c.style.msTransform !== void 0, m = c.style.transform !== void 0;
      e.transformRule = m ? "transform" : S ? "msTransform" : "webkitTransform";
      var V = [
        ["left", "top"],
        ["right", "bottom"]
      ];
      return e.style = V[e.dir][e.ort], e;
    }
    function Dt(t, e, s) {
      var f = ve(), c = oe(), S = c && y(), m = t, V, g, N, K, H, w = e.spectrum, G = [], L = [], B = [], we = 0, J = {}, se = t.ownerDocument, fe = e.documentElement || se.documentElement, ce = se.body, Lt = se.dir === "rtl" || e.ort === 1 ? 0 : 100;
      function Z(r, i) {
        var n = se.createElement("div");
        return i && p(n, i), r.appendChild(n), n;
      }
      function Mt(r, i) {
        var n = Z(r, e.cssClasses.origin), a = Z(n, e.cssClasses.handle);
        if (Z(a, e.cssClasses.touchArea), a.setAttribute("data-handle", String(i)), e.keyboardSupport && (a.setAttribute("tabindex", "0"), a.addEventListener("keydown", function(l) {
          return Kt(l, i);
        })), e.handleAttributes !== void 0) {
          var u = e.handleAttributes[i];
          Object.keys(u).forEach(function(l) {
            a.setAttribute(l, u[l]);
          });
        }
        return a.setAttribute("role", "slider"), a.setAttribute("aria-orientation", e.ort ? "vertical" : "horizontal"), i === 0 ? p(a, e.cssClasses.handleLower) : i === e.handles - 1 && p(a, e.cssClasses.handleUpper), n;
      }
      function Re(r, i) {
        return i ? Z(r, e.cssClasses.connect) : !1;
      }
      function Tt(r, i) {
        var n = Z(i, e.cssClasses.connects);
        g = [], N = [], N.push(Re(n, r[0]));
        for (var a = 0; a < e.handles; a++)
          g.push(Mt(i, a)), B[a] = a, N.push(Re(n, r[a + 1]));
      }
      function Ut(r) {
        p(r, e.cssClasses.target), e.dir === 0 ? p(r, e.cssClasses.ltr) : p(r, e.cssClasses.rtl), e.ort === 0 ? p(r, e.cssClasses.horizontal) : p(r, e.cssClasses.vertical);
        var i = getComputedStyle(r).direction;
        return i === "rtl" ? p(r, e.cssClasses.textDirectionRtl) : p(r, e.cssClasses.textDirectionLtr), Z(r, e.cssClasses.base);
      }
      function Ht(r, i) {
        return !e.tooltips || !e.tooltips[i] ? !1 : Z(r.firstChild, e.cssClasses.tooltip);
      }
      function ze() {
        return m.hasAttribute("disabled");
      }
      function be(r) {
        var i = g[r];
        return i.hasAttribute("disabled");
      }
      function Ee() {
        H && (ue("update" + re.tooltips), H.forEach(function(r) {
          r && x(r);
        }), H = null);
      }
      function Ne() {
        Ee(), H = g.map(Ht), Ve("update" + re.tooltips, function(r, i, n) {
          if (!(!H || !e.tooltips) && H[i] !== !1) {
            var a = r[i];
            e.tooltips[i] !== !0 && (a = e.tooltips[i].to(n[i])), H[i].innerHTML = a;
          }
        });
      }
      function Ot() {
        ue("update" + re.aria), Ve("update" + re.aria, function(r, i, n, a, u) {
          B.forEach(function(l) {
            var h = g[l], d = de(L, l, 0, !0, !0, !0), P = de(L, l, 100, !0, !0, !0), C = u[l], A = String(e.ariaFormat.to(n[l]));
            d = w.fromStepping(d).toFixed(1), P = w.fromStepping(P).toFixed(1), C = w.fromStepping(C).toFixed(1), h.children[0].setAttribute("aria-valuemin", d), h.children[0].setAttribute("aria-valuemax", P), h.children[0].setAttribute("aria-valuenow", C), h.children[0].setAttribute("aria-valuetext", A);
          });
        });
      }
      function _t(r) {
        if (r.mode === v.PipsMode.Range || r.mode === v.PipsMode.Steps)
          return w.xVal;
        if (r.mode === v.PipsMode.Count) {
          if (r.values < 2)
            throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
          for (var i = r.values - 1, n = 100 / i, a = []; i--; )
            a[i] = i * n;
          return a.push(100), Be(a, r.stepped);
        }
        return r.mode === v.PipsMode.Positions ? Be(r.values, r.stepped) : r.mode === v.PipsMode.Values ? r.stepped ? r.values.map(function(u) {
          return w.fromStepping(w.getStep(w.toStepping(u)));
        }) : r.values : [];
      }
      function Be(r, i) {
        return r.map(function(n) {
          return w.fromStepping(i ? w.getStep(n) : n);
        });
      }
      function Ft(r) {
        function i(C, A) {
          return Number((C + A).toFixed(7));
        }
        var n = _t(r), a = {}, u = w.xVal[0], l = w.xVal[w.xVal.length - 1], h = !1, d = !1, P = 0;
        return n = X(n.slice().sort(function(C, A) {
          return C - A;
        })), n[0] !== u && (n.unshift(u), h = !0), n[n.length - 1] !== l && (n.push(l), d = !0), n.forEach(function(C, A) {
          var D, E, U, R = C, O = n[A + 1], F, ke, Le, Me, Je, Te, Ze, Qe = r.mode === v.PipsMode.Steps;
          for (Qe && (D = w.xNumSteps[A]), D || (D = O - R), O === void 0 && (O = R), D = Math.max(D, 1e-7), E = R; E <= O; E = i(E, D)) {
            for (F = w.toStepping(E), ke = F - P, Je = ke / (r.density || 1), Te = Math.round(Je), Ze = ke / Te, U = 1; U <= Te; U += 1)
              Le = P + U * Ze, a[Le.toFixed(5)] = [w.fromStepping(Le), 0];
            Me = n.indexOf(E) > -1 ? v.PipsType.LargeValue : Qe ? v.PipsType.SmallValue : v.PipsType.NoValue, !A && h && E !== O && (Me = 0), E === O && d || (a[F.toFixed(5)] = [E, Me]), P = F;
          }
        }), a;
      }
      function jt(r, i, n) {
        var a, u, l = se.createElement("div"), h = (a = {}, a[v.PipsType.None] = "", a[v.PipsType.NoValue] = e.cssClasses.valueNormal, a[v.PipsType.LargeValue] = e.cssClasses.valueLarge, a[v.PipsType.SmallValue] = e.cssClasses.valueSub, a), d = (u = {}, u[v.PipsType.None] = "", u[v.PipsType.NoValue] = e.cssClasses.markerNormal, u[v.PipsType.LargeValue] = e.cssClasses.markerLarge, u[v.PipsType.SmallValue] = e.cssClasses.markerSub, u), P = [e.cssClasses.valueHorizontal, e.cssClasses.valueVertical], C = [e.cssClasses.markerHorizontal, e.cssClasses.markerVertical];
        p(l, e.cssClasses.pips), p(l, e.ort === 0 ? e.cssClasses.pipsHorizontal : e.cssClasses.pipsVertical);
        function A(E, U) {
          var R = U === e.cssClasses.value, O = R ? P : C, F = R ? h : d;
          return U + " " + O[e.ort] + " " + F[E];
        }
        function D(E, U, R) {
          if (R = i ? i(U, R) : R, R !== v.PipsType.None) {
            var O = Z(l, !1);
            O.className = A(R, e.cssClasses.marker), O.style[e.style] = E + "%", R > v.PipsType.NoValue && (O = Z(l, !1), O.className = A(R, e.cssClasses.value), O.setAttribute("data-value", String(U)), O.style[e.style] = E + "%", O.innerHTML = String(n.to(U)));
          }
        }
        return Object.keys(r).forEach(function(E) {
          D(E, r[E][0], r[E][1]);
        }), l;
      }
      function xe() {
        K && (x(K), K = null);
      }
      function Ce(r) {
        xe();
        var i = Ft(r), n = r.filter, a = r.format || {
          to: function(u) {
            return String(Math.round(u));
          }
        };
        return K = m.appendChild(jt(i, n, a)), K;
      }
      function Ie() {
        var r = V.getBoundingClientRect(), i = "offset" + ["Width", "Height"][e.ort];
        return e.ort === 0 ? r.width || V[i] : r.height || V[i];
      }
      function ne(r, i, n, a) {
        var u = function(h) {
          var d = Rt(h, a.pageOffset, a.target || i);
          if (!d || ze() && !a.doNotReject || j(m, e.cssClasses.tap) && !a.doNotReject || r === f.start && d.buttons !== void 0 && d.buttons > 1 || a.hover && d.buttons)
            return !1;
          S || d.preventDefault(), d.calcPoint = d.points[e.ort], n(d, a);
        }, l = [];
        return r.split(" ").forEach(function(h) {
          i.addEventListener(h, u, S ? { passive: !0 } : !1), l.push([h, u]);
        }), l;
      }
      function Rt(r, i, n) {
        var a = r.type.indexOf("touch") === 0, u = r.type.indexOf("mouse") === 0, l = r.type.indexOf("pointer") === 0, h = 0, d = 0;
        if (r.type.indexOf("MSPointer") === 0 && (l = !0), r.type === "mousedown" && !r.buttons && !r.touches)
          return !1;
        if (a) {
          var P = function(D) {
            var E = D.target;
            return E === n || n.contains(E) || r.composed && r.composedPath().shift() === n;
          };
          if (r.type === "touchstart") {
            var C = Array.prototype.filter.call(r.touches, P);
            if (C.length > 1)
              return !1;
            h = C[0].pageX, d = C[0].pageY;
          } else {
            var A = Array.prototype.find.call(r.changedTouches, P);
            if (!A)
              return !1;
            h = A.pageX, d = A.pageY;
          }
        }
        return i = i || Y(se), (u || l) && (h = r.clientX + i.x, d = r.clientY + i.y), r.pageOffset = i, r.points = [h, d], r.cursor = u || l, r;
      }
      function qe(r) {
        var i = r - te(V, e.ort), n = i * 100 / Ie();
        return n = b(n), e.dir ? 100 - n : n;
      }
      function zt(r) {
        var i = 100, n = !1;
        return g.forEach(function(a, u) {
          if (!be(u)) {
            var l = L[u], h = Math.abs(l - r), d = h === 100 && i === 100, P = h < i, C = h <= i && r > l;
            (P || C || d) && (n = u, i = h);
          }
        }), n;
      }
      function Nt(r, i) {
        r.type === "mouseout" && r.target.nodeName === "HTML" && r.relatedTarget === null && Pe(r, i);
      }
      function Bt(r, i) {
        if (navigator.appVersion.indexOf("MSIE 9") === -1 && r.buttons === 0 && i.buttonsProperty !== 0)
          return Pe(r, i);
        var n = (e.dir ? -1 : 1) * (r.calcPoint - i.startCalcPoint), a = n * 100 / i.baseSize;
        Ke(n > 0, a, i.locations, i.handleNumbers, i.connect);
      }
      function Pe(r, i) {
        i.handle && (_(i.handle, e.cssClasses.active), we -= 1), i.listeners.forEach(function(n) {
          fe.removeEventListener(n[0], n[1]);
        }), we === 0 && (_(m, e.cssClasses.drag), De(), r.cursor && (ce.style.cursor = "", ce.removeEventListener("selectstart", q))), e.events.smoothSteps && (i.handleNumbers.forEach(function(n) {
          ae(n, L[n], !0, !0, !1, !1);
        }), i.handleNumbers.forEach(function(n) {
          T("update", n);
        })), i.handleNumbers.forEach(function(n) {
          T("change", n), T("set", n), T("end", n);
        });
      }
      function ye(r, i) {
        if (!i.handleNumbers.some(be)) {
          var n;
          if (i.handleNumbers.length === 1) {
            var a = g[i.handleNumbers[0]];
            n = a.children[0], we += 1, p(n, e.cssClasses.active);
          }
          r.stopPropagation();
          var u = [], l = ne(f.move, fe, Bt, {
            target: r.target,
            handle: n,
            connect: i.connect,
            listeners: u,
            startCalcPoint: r.calcPoint,
            baseSize: Ie(),
            pageOffset: r.pageOffset,
            handleNumbers: i.handleNumbers,
            buttonsProperty: r.buttons,
            locations: L.slice()
          }), h = ne(f.end, fe, Pe, {
            target: r.target,
            handle: n,
            listeners: u,
            doNotReject: !0,
            handleNumbers: i.handleNumbers
          }), d = ne("mouseout", fe, Nt, {
            target: r.target,
            handle: n,
            listeners: u,
            doNotReject: !0,
            handleNumbers: i.handleNumbers
          });
          u.push.apply(u, l.concat(h, d)), r.cursor && (ce.style.cursor = getComputedStyle(r.target).cursor, g.length > 1 && p(m, e.cssClasses.drag), ce.addEventListener("selectstart", q, !1)), i.handleNumbers.forEach(function(P) {
            T("start", P);
          });
        }
      }
      function It(r) {
        r.stopPropagation();
        var i = qe(r.calcPoint), n = zt(i);
        n !== !1 && (e.events.snap || W(m, e.cssClasses.tap, e.animationDuration), ae(n, i, !0, !0), De(), T("slide", n, !0), T("update", n, !0), e.events.snap ? ye(r, { handleNumbers: [n] }) : (T("change", n, !0), T("set", n, !0)));
      }
      function qt(r) {
        var i = qe(r.calcPoint), n = w.getStep(i), a = w.fromStepping(n);
        Object.keys(J).forEach(function(u) {
          u.split(".")[0] === "hover" && J[u].forEach(function(l) {
            l.call(pe, a);
          });
        });
      }
      function Kt(r, i) {
        if (ze() || be(i))
          return !1;
        var n = ["Left", "Right"], a = ["Down", "Up"], u = ["PageDown", "PageUp"], l = ["Home", "End"];
        e.dir && !e.ort ? n.reverse() : e.ort && !e.dir && (a.reverse(), u.reverse());
        var h = r.key.replace("Arrow", ""), d = h === u[0], P = h === u[1], C = h === a[0] || h === n[0] || d, A = h === a[1] || h === n[1] || P, D = h === l[0], E = h === l[1];
        if (!C && !A && !D && !E)
          return !0;
        r.preventDefault();
        var U;
        if (A || C) {
          var R = C ? 0 : 1, O = Ge(i), F = O[R];
          if (F === null)
            return !1;
          F === !1 && (F = w.getDefaultStep(L[i], C, e.keyboardDefaultStep)), P || d ? F *= e.keyboardPageMultiplier : F *= e.keyboardMultiplier, F = Math.max(F, 1e-7), F = (C ? -1 : 1) * F, U = G[i] + F;
        } else
          E ? U = e.spectrum.xVal[e.spectrum.xVal.length - 1] : U = e.spectrum.xVal[0];
        return ae(i, w.toStepping(U), !0, !0), T("slide", i), T("update", i), T("change", i), T("set", i), !1;
      }
      function Wt(r) {
        r.fixed || g.forEach(function(i, n) {
          ne(f.start, i.children[0], ye, {
            handleNumbers: [n]
          });
        }), r.tap && ne(f.start, V, It, {}), r.hover && ne(f.move, V, qt, {
          hover: !0
        }), r.drag && N.forEach(function(i, n) {
          if (!(i === !1 || n === 0 || n === N.length - 1)) {
            var a = g[n - 1], u = g[n], l = [i], h = [a, u], d = [n - 1, n];
            p(i, e.cssClasses.draggable), r.fixed && (l.push(a.children[0]), l.push(u.children[0])), r.dragAll && (h = g, d = B), l.forEach(function(P) {
              ne(f.start, P, ye, {
                handles: h,
                handleNumbers: d,
                connect: i
              });
            });
          }
        });
      }
      function Ve(r, i) {
        J[r] = J[r] || [], J[r].push(i), r.split(".")[0] === "update" && g.forEach(function(n, a) {
          T("update", a);
        });
      }
      function $t(r) {
        return r === re.aria || r === re.tooltips;
      }
      function ue(r) {
        var i = r && r.split(".")[0], n = i ? r.substring(i.length) : r;
        Object.keys(J).forEach(function(a) {
          var u = a.split(".")[0], l = a.substring(u.length);
          (!i || i === u) && (!n || n === l) && (!$t(l) || n === l) && delete J[a];
        });
      }
      function T(r, i, n) {
        Object.keys(J).forEach(function(a) {
          var u = a.split(".")[0];
          r === u && J[a].forEach(function(l) {
            l.call(
              pe,
              G.map(e.format.to),
              i,
              G.slice(),
              n || !1,
              L.slice(),
              pe
            );
          });
        });
      }
      function de(r, i, n, a, u, l, h) {
        var d;
        return g.length > 1 && !e.events.unconstrained && (a && i > 0 && (d = w.getAbsoluteDistance(r[i - 1], e.margin, !1), n = Math.max(n, d)), u && i < g.length - 1 && (d = w.getAbsoluteDistance(r[i + 1], e.margin, !0), n = Math.min(n, d))), g.length > 1 && e.limit && (a && i > 0 && (d = w.getAbsoluteDistance(r[i - 1], e.limit, !1), n = Math.min(n, d)), u && i < g.length - 1 && (d = w.getAbsoluteDistance(r[i + 1], e.limit, !0), n = Math.max(n, d))), e.padding && (i === 0 && (d = w.getAbsoluteDistance(0, e.padding[0], !1), n = Math.max(n, d)), i === g.length - 1 && (d = w.getAbsoluteDistance(100, e.padding[1], !0), n = Math.min(n, d))), h || (n = w.getStep(n)), n = b(n), n === r[i] && !l ? !1 : n;
      }
      function Ae(r, i) {
        var n = e.ort;
        return (n ? i : r) + ", " + (n ? r : i);
      }
      function Ke(r, i, n, a, u) {
        var l = n.slice(), h = a[0], d = e.events.smoothSteps, P = [!r, r], C = [r, !r];
        a = a.slice(), r && a.reverse(), a.length > 1 ? a.forEach(function(D, E) {
          var U = de(l, D, l[D] + i, P[E], C[E], !1, d);
          U === !1 ? i = 0 : (i = U - l[D], l[D] = U);
        }) : P = C = [!0];
        var A = !1;
        a.forEach(function(D, E) {
          A = ae(D, n[D] + i, P[E], C[E], !1, d) || A;
        }), A && (a.forEach(function(D) {
          T("update", D), T("slide", D);
        }), u != null && T("drag", h));
      }
      function We(r, i) {
        return e.dir ? 100 - r - i : r;
      }
      function Xt(r, i) {
        L[r] = i, G[r] = w.fromStepping(i);
        var n = We(i, 0) - Lt, a = "translate(" + Ae(n + "%", "0") + ")";
        g[r].style[e.transformRule] = a, $e(r), $e(r + 1);
      }
      function De() {
        B.forEach(function(r) {
          var i = L[r] > 50 ? -1 : 1, n = 3 + (g.length + i * r);
          g[r].style.zIndex = String(n);
        });
      }
      function ae(r, i, n, a, u, l) {
        return u || (i = de(L, r, i, n, a, !1, l)), i === !1 ? !1 : (Xt(r, i), !0);
      }
      function $e(r) {
        if (N[r]) {
          var i = 0, n = 100;
          r !== 0 && (i = L[r - 1]), r !== N.length - 1 && (n = L[r]);
          var a = n - i, u = "translate(" + Ae(We(i, a) + "%", "0") + ")", l = "scale(" + Ae(a / 100, "1") + ")";
          N[r].style[e.transformRule] = u + " " + l;
        }
      }
      function Xe(r, i) {
        return r === null || r === !1 || r === void 0 || (typeof r == "number" && (r = String(r)), r = e.format.from(r), r !== !1 && (r = w.toStepping(r)), r === !1 || isNaN(r)) ? L[i] : r;
      }
      function he(r, i, n) {
        var a = $(r), u = L[0] === void 0;
        i = i === void 0 ? !0 : i, e.animate && !u && W(m, e.cssClasses.tap, e.animationDuration), B.forEach(function(d) {
          ae(d, Xe(a[d], d), !0, !1, n);
        });
        var l = B.length === 1 ? 0 : 1;
        if (u && w.hasNoSize() && (n = !0, L[0] = 0, B.length > 1)) {
          var h = 100 / (B.length - 1);
          B.forEach(function(d) {
            L[d] = d * h;
          });
        }
        for (; l < B.length; ++l)
          B.forEach(function(d) {
            ae(d, L[d], !0, !0, n);
          });
        De(), B.forEach(function(d) {
          T("update", d), a[d] !== null && i && T("set", d);
        });
      }
      function Yt(r) {
        he(e.start, r);
      }
      function Gt(r, i, n, a) {
        if (r = Number(r), !(r >= 0 && r < B.length))
          throw new Error("noUiSlider: invalid handle number, got: " + r);
        ae(r, Xe(i, r), !0, !0, a), T("update", r), n && T("set", r);
      }
      function Ye(r) {
        if (r === void 0 && (r = !1), r)
          return G.length === 1 ? G[0] : G.slice(0);
        var i = G.map(e.format.to);
        return i.length === 1 ? i[0] : i;
      }
      function Jt() {
        for (ue(re.aria), ue(re.tooltips), Object.keys(e.cssClasses).forEach(function(r) {
          _(m, e.cssClasses[r]);
        }); m.firstChild; )
          m.removeChild(m.firstChild);
        delete m.noUiSlider;
      }
      function Ge(r) {
        var i = L[r], n = w.getNearbySteps(i), a = G[r], u = n.thisStep.step, l = null;
        if (e.snap)
          return [
            a - n.stepBefore.startValue || null,
            n.stepAfter.startValue - a || null
          ];
        u !== !1 && a + u > n.stepAfter.startValue && (u = n.stepAfter.startValue - a), a > n.thisStep.startValue ? l = n.thisStep.step : n.stepBefore.step === !1 ? l = !1 : l = a - n.stepBefore.highestStep, i === 100 ? u = null : i === 0 && (l = null);
        var h = w.countStepDecimals();
        return u !== null && u !== !1 && (u = Number(u.toFixed(h))), l !== null && l !== !1 && (l = Number(l.toFixed(h))), [l, u];
      }
      function Zt() {
        return B.map(Ge);
      }
      function Qt(r, i) {
        var n = Ye(), a = [
          "margin",
          "limit",
          "padding",
          "range",
          "animate",
          "snap",
          "step",
          "format",
          "pips",
          "tooltips"
        ];
        a.forEach(function(l) {
          r[l] !== void 0 && (s[l] = r[l]);
        });
        var u = Fe(s);
        a.forEach(function(l) {
          r[l] !== void 0 && (e[l] = u[l]);
        }), w = u.spectrum, e.margin = u.margin, e.limit = u.limit, e.padding = u.padding, e.pips ? Ce(e.pips) : xe(), e.tooltips ? Ne() : Ee(), L = [], he(M(r.start) ? r.start : n, i);
      }
      function er() {
        V = Ut(m), Tt(e.connect, V), Wt(e.events), he(e.start), e.pips && Ce(e.pips), e.tooltips && Ne(), Ot();
      }
      er();
      var pe = {
        destroy: Jt,
        steps: Zt,
        on: Ve,
        off: ue,
        get: Ye,
        set: he,
        setHandle: Gt,
        reset: Yt,
        __moveHandles: function(r, i, n) {
          Ke(r, i, L, n);
        },
        options: s,
        updateOptions: Qt,
        target: m,
        removePips: xe,
        removeTooltips: Ee,
        getPositions: function() {
          return L.slice();
        },
        getTooltips: function() {
          return H;
        },
        getOrigins: function() {
          return g;
        },
        pips: Ce
      };
      return pe;
    }
    function je(t, e) {
      if (!t || !t.nodeName)
        throw new Error("noUiSlider: create requires a single element, got: " + t);
      if (t.noUiSlider)
        throw new Error("noUiSlider: Slider was already initialized.");
      var s = Fe(e), f = Dt(t, s, e);
      return t.noUiSlider = f, f;
    }
    var kt = {
      __spectrum: He,
      cssClasses: Se,
      create: je
    };
    v.create = je, v.cssClasses = Se, v.default = kt, Object.defineProperty(v, "__esModule", { value: !0 });
  });
})(Ue, Ue.exports);
const nr = /* @__PURE__ */ rr(Ue.exports);
const ar = (o) => `Hello Todor, ${o}!`, sr = (o) => {
  if (!o)
    return;
  var ie = document.createElement("div");
  const v = nr.create(ie, {
    start: [0, 40, 100],
    connect: !0,
    range: {
      min: 0,
      max: 100
    }
  });
  o.appendChild(ie);
  var Q = `
     .noUi-handle {
        opacity: 0.7;
     }
    `, I = document.createElement("style");
  I.innerText = Q, document.head.appendChild(I);
  const x = document.createElement("video");
  x.style.maxHeight = "50vh";
  const M = document.createElement("input");
  M.type = "number", M.title = "Video width (height is automatic)", M.min = "8", M.max = "1080", M.style.width = "150px", M.placeholder = "0", M.value = "0", M.addEventListener("change", () => {
    const p = parseInt(M.value);
    console.log(p), x.style.width = p === 0 ? void 0 : `${p}px`;
  }), o.appendChild(M);
  const q = document.createElement("source"), X = document.createElement("input");
  X.type = "file", X.accept = "video/*";
  function ee() {
    x.paused || x.ended ? x.play() : x.pause();
  }
  var te = -1;
  function k() {
    var p = x.currentTime;
    if (p !== te) {
      te = p, v.setHandle(1, p);
      const _ = parseFloat(v.get()[0]), j = parseFloat(v.get()[2]);
      p > j && (x.currentTime = _);
    }
    requestAnimationFrame(k);
  }
  k(), v.on("start", (p) => {
    console.log("start", p), x.pause();
  }), v.on("end", (p) => {
    parseFloat(p[0]);
    const _ = parseFloat(p[1]);
    parseFloat(p[2]), console.log("end", p), x.currentTime = _, x.play();
  }), x.addEventListener("loadeddata", (p) => {
    console.log("LOADED VIDEO", p, v), v.updateOptions({
      range: {
        min: 0,
        max: x.duration
      }
    }, !0), v.setHandle(2, x.duration);
  }), X.addEventListener("change", (p) => {
    console.log("Load video", p, q, q.parentNode);
    const _ = p.target.files[0];
    console.log({ videoFile: _ }), q.src = URL.createObjectURL(_), x.load(), x.play(), M.value = x.videoWidth.toString();
  });
  const W = document.createElement("button");
  W.innerText = "play/pause", W.addEventListener("click", ee), x.addEventListener("click", ee), x.appendChild(q), o.appendChild(x), o.appendChild(X), o.appendChild(W);
  const b = document.createElement("input");
  b.type = "number", b.min = "1", b.max = "80", b.style.width = "150px", b.placeholder = "extract 10 frames", b.value = "10", o.appendChild(b);
  const $ = document.createElement("button");
  $.innerText = "Extract frames";
  const z = document.createElement("div");
  z.style.overflow = "auto", z.style.maxHeight = "calc(50vh - 100px)", $.addEventListener("click", () => {
    const p = parseFloat(v.get()[0]), _ = parseFloat(v.get()[2]);
    ir({
      url: q.src,
      count: parseInt(b.value),
      width: parseInt(M.value) || x.videoWidth,
      startTime: p,
      endTime: _,
      type: "image/webp",
      onLoad: () => {
        z.innerHTML = "video loaded";
      },
      onProgress: (j, Y) => {
        z.innerHTML = `${j} of ${Y} frames extracted`;
      }
    }).then((j) => {
      z.innerHTML = "", j.forEach((Y) => {
        z.innerHTML += `<img src="${Y.image}">`;
      });
    });
  }), o.appendChild($), o.appendChild(z);
};
export {
  ar as hello,
  sr as init
};
