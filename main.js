var tr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rr(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var ir = async (o) => {
  var se, p, E;
  let A = 0, q = !1, N, J = !1, oe = [], ie = (x) => +x + "" == x + "", W = (x) => ie(x) && +x >= 0 && +x <= D.duration, C = (x, Q) => {
    o[x] = Z.call(o, x) ? o[x] : Q;
  }, Z = {}.hasOwnProperty, D = document.createElement("video");
  for (D.src = o.url, D.crossOrigin = "anonymous", D.onseeked = async () => {
    N && N();
  }, D.onerror = () => {
    q = !0;
  }; (D.duration === 1 / 0 || isNaN(D.duration)) && D.readyState < 2 && (await new Promise((x) => setTimeout(x, 100)), D.currentTime = 1e7 * Math.random(), !q); )
    ;
  D.currentTime = D.duration / 2, await new Promise((x) => {
    N = x;
  }), C("format", "image/png"), C("offsets", []), C("startTime", 0), C("endTime", D.duration), C("count", 1), C("onLoad", !1), C("onProgress", !1), se = Array, o.offsets instanceof se ? o.offsets = o.offsets.filter((x) => W(x)) : o.offsets = [], o.offsets.length !== 0 && (J = !0), W(o.startTime) || (o.startTime = 0), W(o.endTime) || (o.endTime = D.duration), o.startTime = +o.startTime, o.endTime = +o.endTime, o.startTime >= o.endTime && (o.startTime = o.endTime, o.count = 1), o.count = Math.abs(~~o.count), o.count === 0 && (o.count = 1), J && (o.count = o.offsets.length);
  let X = (o.endTime - o.startTime) / o.count, R = Z.call(o, "width"), y = Z.call(o, "height"), Y = D.videoWidth / D.videoHeight;
  R && !ie(o.width) && (R = !1), y && !ie(o.height) && (y = !1), R || y ? R && !y ? o.height = o.width / Y : !R && y && (o.width = o.height * Y) : (o.width = 128, o.height = o.width / Y), o.width = +o.width, o.height = +o.height, p = Function, o.onLoad instanceof p || (o.onLoad = !1), E = Function, o.onProgress instanceof E || (o.onProgress = !1), o.onLoad && o.onLoad();
  let B = document.createElement("canvas"), S = B.getContext("2d");
  B.width = o.width, B.height = o.height;
  let K = async (x) => {
    for (; A < o.count; )
      D.currentTime = J ? o.offsets[A] : o.startTime + A * X, await new Promise((Q) => {
        N = Q;
      }), S.clearRect(0, 0, B.width, B.height), S.drawImage(D, 0, 0, B.width, B.height), oe.push({ offset: D.currentTime, image: B.toDataURL(o.format) }), A++, o.onProgress && o.onProgress(A, o.count);
    x(oe);
  };
  return new Promise((x) => {
    q && x([]), K(x);
  });
}, Oe = { exports: {} };
(function(o, se) {
  (function(p, E) {
    E(se);
  })(tr, function(p) {
    p.PipsMode = void 0, function(t) {
      t.Range = "range", t.Steps = "steps", t.Positions = "positions", t.Count = "count", t.Values = "values";
    }(p.PipsMode || (p.PipsMode = {})), p.PipsType = void 0, function(t) {
      t[t.None = -1] = "None", t[t.NoValue = 0] = "NoValue", t[t.LargeValue = 1] = "LargeValue", t[t.SmallValue = 2] = "SmallValue";
    }(p.PipsType || (p.PipsType = {}));
    function E(t) {
      return A(t) && typeof t.from == "function";
    }
    function A(t) {
      return typeof t == "object" && typeof t.to == "function";
    }
    function q(t) {
      t.parentElement.removeChild(t);
    }
    function N(t) {
      return t != null;
    }
    function J(t) {
      t.preventDefault();
    }
    function oe(t) {
      return t.filter(function(e) {
        return this[e] ? !1 : this[e] = !0;
      }, {});
    }
    function ie(t, e) {
      return Math.round(t / e) * e;
    }
    function W(t, e) {
      var s = t.getBoundingClientRect(), c = t.ownerDocument, f = c.documentElement, g = S(c);
      return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (g.x = 0), e ? s.top + g.y - f.clientTop : s.left + g.x - f.clientLeft;
    }
    function C(t) {
      return typeof t == "number" && !isNaN(t) && isFinite(t);
    }
    function Z(t, e, s) {
      s > 0 && (y(t, e), setTimeout(function() {
        Y(t, e);
      }, s));
    }
    function D(t) {
      return Math.max(Math.min(t, 100), 0);
    }
    function X(t) {
      return Array.isArray(t) ? t : [t];
    }
    function R(t) {
      t = String(t);
      var e = t.split(".");
      return e.length > 1 ? e[1].length : 0;
    }
    function y(t, e) {
      t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e;
    }
    function Y(t, e) {
      t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function B(t, e) {
      return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className);
    }
    function S(t) {
      var e = window.pageXOffset !== void 0, s = (t.compatMode || "") === "CSS1Compat", c = e ? window.pageXOffset : s ? t.documentElement.scrollLeft : t.body.scrollLeft, f = e ? window.pageYOffset : s ? t.documentElement.scrollTop : t.body.scrollTop;
      return {
        x: c,
        y: f
      };
    }
    function K() {
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
    function x() {
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
    function Q() {
      return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    function ce(t, e) {
      return 100 / (e - t);
    }
    function ne(t, e, s) {
      return e * 100 / (t[s + 1] - t[s]);
    }
    function de(t, e) {
      return ne(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0], 0);
    }
    function pe(t, e) {
      return e * (t[1] - t[0]) / 100 + t[0];
    }
    function G(t, e) {
      for (var s = 1; t >= e[s]; )
        s += 1;
      return s;
    }
    function rt(t, e, s) {
      if (s >= t.slice(-1)[0])
        return 100;
      var c = G(s, t), f = t[c - 1], g = t[c], v = e[c - 1], k = e[c];
      return v + de([f, g], s) / ce(v, k);
    }
    function it(t, e, s) {
      if (s >= 100)
        return t.slice(-1)[0];
      var c = G(s, e), f = t[c - 1], g = t[c], v = e[c - 1], k = e[c];
      return pe([f, g], (s - v) * ce(v, k));
    }
    function nt(t, e, s, c) {
      if (c === 100)
        return c;
      var f = G(c, t), g = t[f - 1], v = t[f];
      return s ? c - g > (v - g) / 2 ? v : g : e[f - 1] ? t[f - 1] + ie(c - t[f - 1], e[f - 1]) : c;
    }
    var _e = function() {
      function t(e, s, c) {
        this.xPct = [], this.xVal = [], this.xSteps = [], this.xNumSteps = [], this.xHighestCompleteStep = [], this.xSteps = [c || !1], this.xNumSteps = [!1], this.snap = s;
        var f, g = [];
        for (Object.keys(e).forEach(function(v) {
          g.push([X(e[v]), v]);
        }), g.sort(function(v, k) {
          return v[0][0] - k[0][0];
        }), f = 0; f < g.length; f++)
          this.handleEntryPoint(g[f][1], g[f][0]);
        for (this.xNumSteps = this.xSteps.slice(0), f = 0; f < this.xNumSteps.length; f++)
          this.handleStepPoint(f, this.xNumSteps[f]);
      }
      return t.prototype.getDistance = function(e) {
        for (var s = [], c = 0; c < this.xNumSteps.length - 1; c++)
          s[c] = ne(this.xVal, e, c);
        return s;
      }, t.prototype.getAbsoluteDistance = function(e, s, c) {
        var f = 0;
        if (e < this.xPct[this.xPct.length - 1])
          for (; e > this.xPct[f + 1]; )
            f++;
        else
          e === this.xPct[this.xPct.length - 1] && (f = this.xPct.length - 2);
        !c && e === this.xPct[f + 1] && f++, s === null && (s = []);
        var g, v = 1, k = s[f], m = 0, z = 0, $ = 0, O = 0;
        for (c ? g = (e - this.xPct[f]) / (this.xPct[f + 1] - this.xPct[f]) : g = (this.xPct[f + 1] - e) / (this.xPct[f + 1] - this.xPct[f]); k > 0; )
          m = this.xPct[f + 1 + O] - this.xPct[f + O], s[f + O] * v + 100 - g * 100 > 100 ? (z = m * g, v = (k - 100 * g) / s[f + O], g = 1) : (z = s[f + O] * m / 100 * v, v = 0), c ? ($ = $ - z, this.xPct.length + O >= 1 && O--) : ($ = $ + z, this.xPct.length - O >= 1 && O++), k = s[f + O] * v;
        return e + $;
      }, t.prototype.toStepping = function(e) {
        return e = rt(this.xVal, this.xPct, e), e;
      }, t.prototype.fromStepping = function(e) {
        return it(this.xVal, this.xPct, e);
      }, t.prototype.getStep = function(e) {
        return e = nt(this.xPct, this.xSteps, this.snap, e), e;
      }, t.prototype.getDefaultStep = function(e, s, c) {
        var f = G(e, this.xPct);
        return (e === 100 || s && e === this.xPct[f - 1]) && (f = Math.max(f - 1, 1)), (this.xVal[f] - this.xVal[f - 1]) / c;
      }, t.prototype.getNearbySteps = function(e) {
        var s = G(e, this.xPct);
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
        var e = this.xNumSteps.map(R);
        return Math.max.apply(null, e);
      }, t.prototype.hasNoSize = function() {
        return this.xVal[0] === this.xVal[this.xVal.length - 1];
      }, t.prototype.convert = function(e) {
        return this.getStep(this.toStepping(e));
      }, t.prototype.handleEntryPoint = function(e, s) {
        var c;
        if (e === "min" ? c = 0 : e === "max" ? c = 100 : c = parseFloat(e), !C(c) || !C(s[0]))
          throw new Error("noUiSlider: 'range' value isn't numeric.");
        this.xPct.push(c), this.xVal.push(s[0]);
        var f = Number(s[1]);
        c ? this.xSteps.push(isNaN(f) ? !1 : f) : isNaN(f) || (this.xSteps[0] = f), this.xHighestCompleteStep.push(0);
      }, t.prototype.handleStepPoint = function(e, s) {
        if (s) {
          if (this.xVal[e] === this.xVal[e + 1]) {
            this.xSteps[e] = this.xHighestCompleteStep[e] = this.xVal[e];
            return;
          }
          this.xSteps[e] = ne([this.xVal[e], this.xVal[e + 1]], s, 0) / ce(this.xPct[e], this.xPct[e + 1]);
          var c = (this.xVal[e + 1] - this.xVal[e]) / this.xNumSteps[e], f = Math.ceil(Number(c.toFixed(3)) - 1), g = this.xVal[e] + this.xNumSteps[e] * f;
          this.xHighestCompleteStep[e] = g;
        }
      }, t;
    }(), Fe = {
      to: function(t) {
        return t === void 0 ? "" : t.toFixed(2);
      },
      from: Number
    }, Ee = {
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
    }, ae = {
      tooltips: ".__tooltips",
      aria: ".__aria"
    };
    function at(t, e) {
      if (!C(e))
        throw new Error("noUiSlider: 'step' is not numeric.");
      t.singleStep = e;
    }
    function st(t, e) {
      if (!C(e))
        throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
      t.keyboardPageMultiplier = e;
    }
    function ot(t, e) {
      if (!C(e))
        throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
      t.keyboardMultiplier = e;
    }
    function lt(t, e) {
      if (!C(e))
        throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
      t.keyboardDefaultStep = e;
    }
    function ut(t, e) {
      if (typeof e != "object" || Array.isArray(e))
        throw new Error("noUiSlider: 'range' is not an object.");
      if (e.min === void 0 || e.max === void 0)
        throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
      t.spectrum = new _e(e, t.snap || !1, t.singleStep);
    }
    function ct(t, e) {
      if (e = X(e), !Array.isArray(e) || !e.length)
        throw new Error("noUiSlider: 'start' option is incorrect.");
      t.handles = e.length, t.start = e;
    }
    function ft(t, e) {
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
      var s = [!1], c;
      if (e === "lower" ? e = [!0, !1] : e === "upper" && (e = [!1, !0]), e === !0 || e === !1) {
        for (c = 1; c < t.handles; c++)
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
    function Re(t, e) {
      if (!C(e))
        throw new Error("noUiSlider: 'margin' option must be numeric.");
      e !== 0 && (t.margin = t.spectrum.getDistance(e));
    }
    function mt(t, e) {
      if (!C(e))
        throw new Error("noUiSlider: 'limit' option must be numeric.");
      if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2)
        throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
    function gt(t, e) {
      var s;
      if (!C(e) && !Array.isArray(e))
        throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
      if (Array.isArray(e) && !(e.length === 2 || C(e[0]) || C(e[1])))
        throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
      if (e !== 0) {
        for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], s = 0; s < t.spectrum.xNumSteps.length - 1; s++)
          if (t.padding[0][s] < 0 || t.padding[1][s] < 0)
            throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        var c = e[0] + e[1], f = t.spectrum.xVal[0], g = t.spectrum.xVal[t.spectrum.xVal.length - 1];
        if (c / (g - f) > 1)
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
      var s = e.indexOf("tap") >= 0, c = e.indexOf("drag") >= 0, f = e.indexOf("fixed") >= 0, g = e.indexOf("snap") >= 0, v = e.indexOf("hover") >= 0, k = e.indexOf("unconstrained") >= 0, m = e.indexOf("drag-all") >= 0, z = e.indexOf("smooth-steps") >= 0;
      if (f) {
        if (t.handles !== 2)
          throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
        Re(t, t.start[1] - t.start[0]);
      }
      if (k && (t.margin || t.limit))
        throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
      t.events = {
        tap: s || g,
        drag: c,
        dragAll: m,
        smoothSteps: z,
        fixed: f,
        snap: g,
        hover: v,
        unconstrained: k
      };
    }
    function Et(t, e) {
      if (e !== !1)
        if (e === !0 || A(e)) {
          t.tooltips = [];
          for (var s = 0; s < t.handles; s++)
            t.tooltips.push(e);
        } else {
          if (e = X(e), e.length !== t.handles)
            throw new Error("noUiSlider: must pass a formatter for all handles.");
          e.forEach(function(c) {
            if (typeof c != "boolean" && !A(c))
              throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
          }), t.tooltips = e;
        }
    }
    function bt(t, e) {
      if (e.length !== t.handles)
        throw new Error("noUiSlider: must pass a attributes for all handles.");
      t.handleAttributes = e;
    }
    function xt(t, e) {
      if (!A(e))
        throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
      t.ariaFormat = e;
    }
    function Ct(t, e) {
      if (!E(e))
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
    function je(t) {
      var e = {
        margin: null,
        limit: null,
        padding: null,
        animate: !0,
        animationDuration: 300,
        ariaFormat: Fe,
        format: Fe
      }, s = {
        step: { r: !1, t: at },
        keyboardPageMultiplier: { r: !1, t: st },
        keyboardMultiplier: { r: !1, t: ot },
        keyboardDefaultStep: { r: !1, t: lt },
        start: { r: !0, t: ct },
        connect: { r: !0, t: pt },
        direction: { r: !0, t: St },
        snap: { r: !1, t: ft },
        animate: { r: !1, t: dt },
        animationDuration: { r: !1, t: ht },
        range: { r: !0, t: ut },
        orientation: { r: !1, t: vt },
        margin: { r: !1, t: Re },
        limit: { r: !1, t: mt },
        padding: { r: !1, t: gt },
        behaviour: { r: !0, t: wt },
        ariaFormat: { r: !1, t: xt },
        format: { r: !1, t: Ct },
        tooltips: { r: !1, t: Et },
        keyboardSupport: { r: !0, t: Pt },
        documentElement: { r: !1, t: yt },
        cssPrefix: { r: !0, t: Vt },
        cssClasses: { r: !0, t: At },
        handleAttributes: { r: !1, t: bt }
      }, c = {
        connect: !1,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        keyboardSupport: !0,
        cssPrefix: "noUi-",
        cssClasses: Ee,
        keyboardPageMultiplier: 5,
        keyboardMultiplier: 1,
        keyboardDefaultStep: 10
      };
      t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(s).forEach(function(m) {
        if (!N(t[m]) && c[m] === void 0) {
          if (s[m].r)
            throw new Error("noUiSlider: '" + m + "' is required.");
          return;
        }
        s[m].t(e, N(t[m]) ? t[m] : c[m]);
      }), e.pips = t.pips;
      var f = document.createElement("div"), g = f.style.msTransform !== void 0, v = f.style.transform !== void 0;
      e.transformRule = v ? "transform" : g ? "msTransform" : "webkitTransform";
      var k = [
        ["left", "top"],
        ["right", "bottom"]
      ];
      return e.style = k[e.dir][e.ort], e;
    }
    function Dt(t, e, s) {
      var c = K(), f = Q(), g = f && x(), v = t, k, m, z, $, O, w = e.spectrum, ee = [], T = [], I = [], be = 0, te = {}, fe = t.ownerDocument, ve = e.documentElement || fe.documentElement, me = fe.body, Lt = fe.dir === "rtl" || e.ort === 1 ? 0 : 100;
      function re(r, i) {
        var n = fe.createElement("div");
        return i && y(n, i), r.appendChild(n), n;
      }
      function Mt(r, i) {
        var n = re(r, e.cssClasses.origin), a = re(n, e.cssClasses.handle);
        if (re(a, e.cssClasses.touchArea), a.setAttribute("data-handle", String(i)), e.keyboardSupport && (a.setAttribute("tabindex", "0"), a.addEventListener("keydown", function(l) {
          return Kt(l, i);
        })), e.handleAttributes !== void 0) {
          var u = e.handleAttributes[i];
          Object.keys(u).forEach(function(l) {
            a.setAttribute(l, u[l]);
          });
        }
        return a.setAttribute("role", "slider"), a.setAttribute("aria-orientation", e.ort ? "vertical" : "horizontal"), i === 0 ? y(a, e.cssClasses.handleLower) : i === e.handles - 1 && y(a, e.cssClasses.handleUpper), n;
      }
      function Ne(r, i) {
        return i ? re(r, e.cssClasses.connect) : !1;
      }
      function Tt(r, i) {
        var n = re(i, e.cssClasses.connects);
        m = [], z = [], z.push(Ne(n, r[0]));
        for (var a = 0; a < e.handles; a++)
          m.push(Mt(i, a)), I[a] = a, z.push(Ne(n, r[a + 1]));
      }
      function Ut(r) {
        y(r, e.cssClasses.target), e.dir === 0 ? y(r, e.cssClasses.ltr) : y(r, e.cssClasses.rtl), e.ort === 0 ? y(r, e.cssClasses.horizontal) : y(r, e.cssClasses.vertical);
        var i = getComputedStyle(r).direction;
        return i === "rtl" ? y(r, e.cssClasses.textDirectionRtl) : y(r, e.cssClasses.textDirectionLtr), re(r, e.cssClasses.base);
      }
      function Ht(r, i) {
        return !e.tooltips || !e.tooltips[i] ? !1 : re(r.firstChild, e.cssClasses.tooltip);
      }
      function Ie() {
        return v.hasAttribute("disabled");
      }
      function xe(r) {
        var i = m[r];
        return i.hasAttribute("disabled");
      }
      function Ce() {
        O && (he("update" + ae.tooltips), O.forEach(function(r) {
          r && q(r);
        }), O = null);
      }
      function Be() {
        Ce(), O = m.map(Ht), De("update" + ae.tooltips, function(r, i, n) {
          if (!(!O || !e.tooltips) && O[i] !== !1) {
            var a = r[i];
            e.tooltips[i] !== !0 && (a = e.tooltips[i].to(n[i])), O[i].innerHTML = a;
          }
        });
      }
      function Ot() {
        he("update" + ae.aria), De("update" + ae.aria, function(r, i, n, a, u) {
          I.forEach(function(l) {
            var h = m[l], d = ge(T, l, 0, !0, !0, !0), V = ge(T, l, 100, !0, !0, !0), P = u[l], L = String(e.ariaFormat.to(n[l]));
            d = w.fromStepping(d).toFixed(1), V = w.fromStepping(V).toFixed(1), P = w.fromStepping(P).toFixed(1), h.children[0].setAttribute("aria-valuemin", d), h.children[0].setAttribute("aria-valuemax", V), h.children[0].setAttribute("aria-valuenow", P), h.children[0].setAttribute("aria-valuetext", L);
          });
        });
      }
      function _t(r) {
        if (r.mode === p.PipsMode.Range || r.mode === p.PipsMode.Steps)
          return w.xVal;
        if (r.mode === p.PipsMode.Count) {
          if (r.values < 2)
            throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
          for (var i = r.values - 1, n = 100 / i, a = []; i--; )
            a[i] = i * n;
          return a.push(100), qe(a, r.stepped);
        }
        return r.mode === p.PipsMode.Positions ? qe(r.values, r.stepped) : r.mode === p.PipsMode.Values ? r.stepped ? r.values.map(function(u) {
          return w.fromStepping(w.getStep(w.toStepping(u)));
        }) : r.values : [];
      }
      function qe(r, i) {
        return r.map(function(n) {
          return w.fromStepping(i ? w.getStep(n) : n);
        });
      }
      function Ft(r) {
        function i(P, L) {
          return Number((P + L).toFixed(7));
        }
        var n = _t(r), a = {}, u = w.xVal[0], l = w.xVal[w.xVal.length - 1], h = !1, d = !1, V = 0;
        return n = oe(n.slice().sort(function(P, L) {
          return P - L;
        })), n[0] !== u && (n.unshift(u), h = !0), n[n.length - 1] !== l && (n.push(l), d = !0), n.forEach(function(P, L) {
          var M, b, H, j = P, _ = n[L + 1], F, Me, Te, Ue, Qe, He, et, tt = r.mode === p.PipsMode.Steps;
          for (tt && (M = w.xNumSteps[L]), M || (M = _ - j), _ === void 0 && (_ = j), M = Math.max(M, 1e-7), b = j; b <= _; b = i(b, M)) {
            for (F = w.toStepping(b), Me = F - V, Qe = Me / (r.density || 1), He = Math.round(Qe), et = Me / He, H = 1; H <= He; H += 1)
              Te = V + H * et, a[Te.toFixed(5)] = [w.fromStepping(Te), 0];
            Ue = n.indexOf(b) > -1 ? p.PipsType.LargeValue : tt ? p.PipsType.SmallValue : p.PipsType.NoValue, !L && h && b !== _ && (Ue = 0), b === _ && d || (a[F.toFixed(5)] = [b, Ue]), V = F;
          }
        }), a;
      }
      function Rt(r, i, n) {
        var a, u, l = fe.createElement("div"), h = (a = {}, a[p.PipsType.None] = "", a[p.PipsType.NoValue] = e.cssClasses.valueNormal, a[p.PipsType.LargeValue] = e.cssClasses.valueLarge, a[p.PipsType.SmallValue] = e.cssClasses.valueSub, a), d = (u = {}, u[p.PipsType.None] = "", u[p.PipsType.NoValue] = e.cssClasses.markerNormal, u[p.PipsType.LargeValue] = e.cssClasses.markerLarge, u[p.PipsType.SmallValue] = e.cssClasses.markerSub, u), V = [e.cssClasses.valueHorizontal, e.cssClasses.valueVertical], P = [e.cssClasses.markerHorizontal, e.cssClasses.markerVertical];
        y(l, e.cssClasses.pips), y(l, e.ort === 0 ? e.cssClasses.pipsHorizontal : e.cssClasses.pipsVertical);
        function L(b, H) {
          var j = H === e.cssClasses.value, _ = j ? V : P, F = j ? h : d;
          return H + " " + _[e.ort] + " " + F[b];
        }
        function M(b, H, j) {
          if (j = i ? i(H, j) : j, j !== p.PipsType.None) {
            var _ = re(l, !1);
            _.className = L(j, e.cssClasses.marker), _.style[e.style] = b + "%", j > p.PipsType.NoValue && (_ = re(l, !1), _.className = L(j, e.cssClasses.value), _.setAttribute("data-value", String(H)), _.style[e.style] = b + "%", _.innerHTML = String(n.to(H)));
          }
        }
        return Object.keys(r).forEach(function(b) {
          M(b, r[b][0], r[b][1]);
        }), l;
      }
      function Pe() {
        $ && (q($), $ = null);
      }
      function ye(r) {
        Pe();
        var i = Ft(r), n = r.filter, a = r.format || {
          to: function(u) {
            return String(Math.round(u));
          }
        };
        return $ = v.appendChild(Rt(i, n, a)), $;
      }
      function Ke() {
        var r = k.getBoundingClientRect(), i = "offset" + ["Width", "Height"][e.ort];
        return e.ort === 0 ? r.width || k[i] : r.height || k[i];
      }
      function le(r, i, n, a) {
        var u = function(h) {
          var d = jt(h, a.pageOffset, a.target || i);
          if (!d || Ie() && !a.doNotReject || B(v, e.cssClasses.tap) && !a.doNotReject || r === c.start && d.buttons !== void 0 && d.buttons > 1 || a.hover && d.buttons)
            return !1;
          g || d.preventDefault(), d.calcPoint = d.points[e.ort], n(d, a);
        }, l = [];
        return r.split(" ").forEach(function(h) {
          i.addEventListener(h, u, g ? { passive: !0 } : !1), l.push([h, u]);
        }), l;
      }
      function jt(r, i, n) {
        var a = r.type.indexOf("touch") === 0, u = r.type.indexOf("mouse") === 0, l = r.type.indexOf("pointer") === 0, h = 0, d = 0;
        if (r.type.indexOf("MSPointer") === 0 && (l = !0), r.type === "mousedown" && !r.buttons && !r.touches)
          return !1;
        if (a) {
          var V = function(M) {
            var b = M.target;
            return b === n || n.contains(b) || r.composed && r.composedPath().shift() === n;
          };
          if (r.type === "touchstart") {
            var P = Array.prototype.filter.call(r.touches, V);
            if (P.length > 1)
              return !1;
            h = P[0].pageX, d = P[0].pageY;
          } else {
            var L = Array.prototype.find.call(r.changedTouches, V);
            if (!L)
              return !1;
            h = L.pageX, d = L.pageY;
          }
        }
        return i = i || S(fe), (u || l) && (h = r.clientX + i.x, d = r.clientY + i.y), r.pageOffset = i, r.points = [h, d], r.cursor = u || l, r;
      }
      function We(r) {
        var i = r - W(k, e.ort), n = i * 100 / Ke();
        return n = D(n), e.dir ? 100 - n : n;
      }
      function zt(r) {
        var i = 100, n = !1;
        return m.forEach(function(a, u) {
          if (!xe(u)) {
            var l = T[u], h = Math.abs(l - r), d = h === 100 && i === 100, V = h < i, P = h <= i && r > l;
            (V || P || d) && (n = u, i = h);
          }
        }), n;
      }
      function Nt(r, i) {
        r.type === "mouseout" && r.target.nodeName === "HTML" && r.relatedTarget === null && Ve(r, i);
      }
      function It(r, i) {
        if (navigator.appVersion.indexOf("MSIE 9") === -1 && r.buttons === 0 && i.buttonsProperty !== 0)
          return Ve(r, i);
        var n = (e.dir ? -1 : 1) * (r.calcPoint - i.startCalcPoint), a = n * 100 / i.baseSize;
        $e(n > 0, a, i.locations, i.handleNumbers, i.connect);
      }
      function Ve(r, i) {
        i.handle && (Y(i.handle, e.cssClasses.active), be -= 1), i.listeners.forEach(function(n) {
          ve.removeEventListener(n[0], n[1]);
        }), be === 0 && (Y(v, e.cssClasses.drag), Le(), r.cursor && (me.style.cursor = "", me.removeEventListener("selectstart", J))), e.events.smoothSteps && (i.handleNumbers.forEach(function(n) {
          ue(n, T[n], !0, !0, !1, !1);
        }), i.handleNumbers.forEach(function(n) {
          U("update", n);
        })), i.handleNumbers.forEach(function(n) {
          U("change", n), U("set", n), U("end", n);
        });
      }
      function Ae(r, i) {
        if (!i.handleNumbers.some(xe)) {
          var n;
          if (i.handleNumbers.length === 1) {
            var a = m[i.handleNumbers[0]];
            n = a.children[0], be += 1, y(n, e.cssClasses.active);
          }
          r.stopPropagation();
          var u = [], l = le(c.move, ve, It, {
            target: r.target,
            handle: n,
            connect: i.connect,
            listeners: u,
            startCalcPoint: r.calcPoint,
            baseSize: Ke(),
            pageOffset: r.pageOffset,
            handleNumbers: i.handleNumbers,
            buttonsProperty: r.buttons,
            locations: T.slice()
          }), h = le(c.end, ve, Ve, {
            target: r.target,
            handle: n,
            listeners: u,
            doNotReject: !0,
            handleNumbers: i.handleNumbers
          }), d = le("mouseout", ve, Nt, {
            target: r.target,
            handle: n,
            listeners: u,
            doNotReject: !0,
            handleNumbers: i.handleNumbers
          });
          u.push.apply(u, l.concat(h, d)), r.cursor && (me.style.cursor = getComputedStyle(r.target).cursor, m.length > 1 && y(v, e.cssClasses.drag), me.addEventListener("selectstart", J, !1)), i.handleNumbers.forEach(function(V) {
            U("start", V);
          });
        }
      }
      function Bt(r) {
        r.stopPropagation();
        var i = We(r.calcPoint), n = zt(i);
        n !== !1 && (e.events.snap || Z(v, e.cssClasses.tap, e.animationDuration), ue(n, i, !0, !0), Le(), U("slide", n, !0), U("update", n, !0), e.events.snap ? Ae(r, { handleNumbers: [n] }) : (U("change", n, !0), U("set", n, !0)));
      }
      function qt(r) {
        var i = We(r.calcPoint), n = w.getStep(i), a = w.fromStepping(n);
        Object.keys(te).forEach(function(u) {
          u.split(".")[0] === "hover" && te[u].forEach(function(l) {
            l.call(we, a);
          });
        });
      }
      function Kt(r, i) {
        if (Ie() || xe(i))
          return !1;
        var n = ["Left", "Right"], a = ["Down", "Up"], u = ["PageDown", "PageUp"], l = ["Home", "End"];
        e.dir && !e.ort ? n.reverse() : e.ort && !e.dir && (a.reverse(), u.reverse());
        var h = r.key.replace("Arrow", ""), d = h === u[0], V = h === u[1], P = h === a[0] || h === n[0] || d, L = h === a[1] || h === n[1] || V, M = h === l[0], b = h === l[1];
        if (!P && !L && !M && !b)
          return !0;
        r.preventDefault();
        var H;
        if (L || P) {
          var j = P ? 0 : 1, _ = Ze(i), F = _[j];
          if (F === null)
            return !1;
          F === !1 && (F = w.getDefaultStep(T[i], P, e.keyboardDefaultStep)), V || d ? F *= e.keyboardPageMultiplier : F *= e.keyboardMultiplier, F = Math.max(F, 1e-7), F = (P ? -1 : 1) * F, H = ee[i] + F;
        } else
          b ? H = e.spectrum.xVal[e.spectrum.xVal.length - 1] : H = e.spectrum.xVal[0];
        return ue(i, w.toStepping(H), !0, !0), U("slide", i), U("update", i), U("change", i), U("set", i), !1;
      }
      function Wt(r) {
        r.fixed || m.forEach(function(i, n) {
          le(c.start, i.children[0], Ae, {
            handleNumbers: [n]
          });
        }), r.tap && le(c.start, k, Bt, {}), r.hover && le(c.move, k, qt, {
          hover: !0
        }), r.drag && z.forEach(function(i, n) {
          if (!(i === !1 || n === 0 || n === z.length - 1)) {
            var a = m[n - 1], u = m[n], l = [i], h = [a, u], d = [n - 1, n];
            y(i, e.cssClasses.draggable), r.fixed && (l.push(a.children[0]), l.push(u.children[0])), r.dragAll && (h = m, d = I), l.forEach(function(V) {
              le(c.start, V, Ae, {
                handles: h,
                handleNumbers: d,
                connect: i
              });
            });
          }
        });
      }
      function De(r, i) {
        te[r] = te[r] || [], te[r].push(i), r.split(".")[0] === "update" && m.forEach(function(n, a) {
          U("update", a);
        });
      }
      function $t(r) {
        return r === ae.aria || r === ae.tooltips;
      }
      function he(r) {
        var i = r && r.split(".")[0], n = i ? r.substring(i.length) : r;
        Object.keys(te).forEach(function(a) {
          var u = a.split(".")[0], l = a.substring(u.length);
          (!i || i === u) && (!n || n === l) && (!$t(l) || n === l) && delete te[a];
        });
      }
      function U(r, i, n) {
        Object.keys(te).forEach(function(a) {
          var u = a.split(".")[0];
          r === u && te[a].forEach(function(l) {
            l.call(
              we,
              ee.map(e.format.to),
              i,
              ee.slice(),
              n || !1,
              T.slice(),
              we
            );
          });
        });
      }
      function ge(r, i, n, a, u, l, h) {
        var d;
        return m.length > 1 && !e.events.unconstrained && (a && i > 0 && (d = w.getAbsoluteDistance(r[i - 1], e.margin, !1), n = Math.max(n, d)), u && i < m.length - 1 && (d = w.getAbsoluteDistance(r[i + 1], e.margin, !0), n = Math.min(n, d))), m.length > 1 && e.limit && (a && i > 0 && (d = w.getAbsoluteDistance(r[i - 1], e.limit, !1), n = Math.min(n, d)), u && i < m.length - 1 && (d = w.getAbsoluteDistance(r[i + 1], e.limit, !0), n = Math.max(n, d))), e.padding && (i === 0 && (d = w.getAbsoluteDistance(0, e.padding[0], !1), n = Math.max(n, d)), i === m.length - 1 && (d = w.getAbsoluteDistance(100, e.padding[1], !0), n = Math.min(n, d))), h || (n = w.getStep(n)), n = D(n), n === r[i] && !l ? !1 : n;
      }
      function ke(r, i) {
        var n = e.ort;
        return (n ? i : r) + ", " + (n ? r : i);
      }
      function $e(r, i, n, a, u) {
        var l = n.slice(), h = a[0], d = e.events.smoothSteps, V = [!r, r], P = [r, !r];
        a = a.slice(), r && a.reverse(), a.length > 1 ? a.forEach(function(M, b) {
          var H = ge(l, M, l[M] + i, V[b], P[b], !1, d);
          H === !1 ? i = 0 : (i = H - l[M], l[M] = H);
        }) : V = P = [!0];
        var L = !1;
        a.forEach(function(M, b) {
          L = ue(M, n[M] + i, V[b], P[b], !1, d) || L;
        }), L && (a.forEach(function(M) {
          U("update", M), U("slide", M);
        }), u != null && U("drag", h));
      }
      function Xe(r, i) {
        return e.dir ? 100 - r - i : r;
      }
      function Xt(r, i) {
        T[r] = i, ee[r] = w.fromStepping(i);
        var n = Xe(i, 0) - Lt, a = "translate(" + ke(n + "%", "0") + ")";
        m[r].style[e.transformRule] = a, Ye(r), Ye(r + 1);
      }
      function Le() {
        I.forEach(function(r) {
          var i = T[r] > 50 ? -1 : 1, n = 3 + (m.length + i * r);
          m[r].style.zIndex = String(n);
        });
      }
      function ue(r, i, n, a, u, l) {
        return u || (i = ge(T, r, i, n, a, !1, l)), i === !1 ? !1 : (Xt(r, i), !0);
      }
      function Ye(r) {
        if (z[r]) {
          var i = 0, n = 100;
          r !== 0 && (i = T[r - 1]), r !== z.length - 1 && (n = T[r]);
          var a = n - i, u = "translate(" + ke(Xe(i, a) + "%", "0") + ")", l = "scale(" + ke(a / 100, "1") + ")";
          z[r].style[e.transformRule] = u + " " + l;
        }
      }
      function Ge(r, i) {
        return r === null || r === !1 || r === void 0 || (typeof r == "number" && (r = String(r)), r = e.format.from(r), r !== !1 && (r = w.toStepping(r)), r === !1 || isNaN(r)) ? T[i] : r;
      }
      function Se(r, i, n) {
        var a = X(r), u = T[0] === void 0;
        i = i === void 0 ? !0 : i, e.animate && !u && Z(v, e.cssClasses.tap, e.animationDuration), I.forEach(function(d) {
          ue(d, Ge(a[d], d), !0, !1, n);
        });
        var l = I.length === 1 ? 0 : 1;
        if (u && w.hasNoSize() && (n = !0, T[0] = 0, I.length > 1)) {
          var h = 100 / (I.length - 1);
          I.forEach(function(d) {
            T[d] = d * h;
          });
        }
        for (; l < I.length; ++l)
          I.forEach(function(d) {
            ue(d, T[d], !0, !0, n);
          });
        Le(), I.forEach(function(d) {
          U("update", d), a[d] !== null && i && U("set", d);
        });
      }
      function Yt(r) {
        Se(e.start, r);
      }
      function Gt(r, i, n, a) {
        if (r = Number(r), !(r >= 0 && r < I.length))
          throw new Error("noUiSlider: invalid handle number, got: " + r);
        ue(r, Ge(i, r), !0, !0, a), U("update", r), n && U("set", r);
      }
      function Je(r) {
        if (r === void 0 && (r = !1), r)
          return ee.length === 1 ? ee[0] : ee.slice(0);
        var i = ee.map(e.format.to);
        return i.length === 1 ? i[0] : i;
      }
      function Jt() {
        for (he(ae.aria), he(ae.tooltips), Object.keys(e.cssClasses).forEach(function(r) {
          Y(v, e.cssClasses[r]);
        }); v.firstChild; )
          v.removeChild(v.firstChild);
        delete v.noUiSlider;
      }
      function Ze(r) {
        var i = T[r], n = w.getNearbySteps(i), a = ee[r], u = n.thisStep.step, l = null;
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
        return I.map(Ze);
      }
      function Qt(r, i) {
        var n = Je(), a = [
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
        var u = je(s);
        a.forEach(function(l) {
          r[l] !== void 0 && (e[l] = u[l]);
        }), w = u.spectrum, e.margin = u.margin, e.limit = u.limit, e.padding = u.padding, e.pips ? ye(e.pips) : Pe(), e.tooltips ? Be() : Ce(), T = [], Se(N(r.start) ? r.start : n, i);
      }
      function er() {
        k = Ut(v), Tt(e.connect, k), Wt(e.events), Se(e.start), e.pips && ye(e.pips), e.tooltips && Be(), Ot();
      }
      er();
      var we = {
        destroy: Jt,
        steps: Zt,
        on: De,
        off: he,
        get: Je,
        set: Se,
        setHandle: Gt,
        reset: Yt,
        __moveHandles: function(r, i, n) {
          $e(r, i, T, n);
        },
        options: s,
        updateOptions: Qt,
        target: v,
        removePips: Pe,
        removeTooltips: Ce,
        getPositions: function() {
          return T.slice();
        },
        getTooltips: function() {
          return O;
        },
        getOrigins: function() {
          return m;
        },
        pips: ye
      };
      return we;
    }
    function ze(t, e) {
      if (!t || !t.nodeName)
        throw new Error("noUiSlider: create requires a single element, got: " + t);
      if (t.noUiSlider)
        throw new Error("noUiSlider: Slider was already initialized.");
      var s = je(e), c = Dt(t, s, e);
      return t.noUiSlider = c, c;
    }
    var kt = {
      __spectrum: _e,
      cssClasses: Ee,
      create: ze
    };
    p.create = ze, p.cssClasses = Ee, p.default = kt, Object.defineProperty(p, "__esModule", { value: !0 });
  });
})(Oe, Oe.exports);
const nr = /* @__PURE__ */ rr(Oe.exports);
const ar = (o) => `Hello ${o}!`, sr = (o) => {
  if (!o)
    return;
  var se = document.createElement("div");
  const p = nr.create(se, {
    start: [0, 40, 100],
    connect: !0,
    range: {
      min: 0,
      max: 100
    }
  });
  o.appendChild(se);
  const E = document.createElement("video");
  E.style.maxHeight = "50vh";
  const A = document.createElement("input");
  A.type = "number", A.title = "Video width (height is automatic)", A.min = "8", A.max = "1080", A.style.width = "150px", A.placeholder = "0", A.value = "0", A.addEventListener("change", () => {
    const S = parseInt(A.value);
    console.log(S), E.style.width = S === 0 ? void 0 : `${S}px`;
  }), o.appendChild(A);
  const q = document.createElement("source"), N = document.createElement("input");
  N.type = "file", N.accept = "video/*";
  function J() {
    E.paused || E.ended ? E.play() : E.pause();
  }
  var oe = -1;
  function ie() {
    var S = E.currentTime;
    if (S !== oe) {
      oe = S, p.setHandle(1, S);
      const K = parseFloat(p.get()[0]), x = parseFloat(p.get()[2]);
      S > x && (E.currentTime = K);
    }
    requestAnimationFrame(ie);
  }
  ie(), p.on("start", (S) => {
    console.log("start", S), E.pause();
  }), p.on("end", (S) => {
    parseFloat(S[0]);
    const K = parseFloat(S[1]);
    parseFloat(S[2]), console.log("end", S), E.currentTime = K, E.play();
  });
  const W = document.createElement("div"), C = document.createElement("canvas");
  W.style.overflow = "auto", W.style.maxHeight = "calc(50vh - 100px)";
  const Z = () => {
    console.log(C.toDataURL());
    const S = document.createElement("a");
    S.download = `${N.files[0].name}-download.png`, S.href = C.toDataURL(), S.click(), S.delete;
  }, D = () => {
    const S = parseFloat(p.get()[0]), K = parseFloat(p.get()[2]), x = parseInt(A.value) || E.videoWidth, Q = parseInt(R.value);
    C.width = x * Q, C.height = E.videoHeight;
    const ce = C.getContext("2d");
    console.log({ canvasW: x * Q, canvH: E.videoHeight }), ir({
      url: q.src,
      count: Q,
      width: x,
      startTime: S,
      endTime: K,
      type: "image/webp",
      onLoad: () => {
        W.innerHTML = "video loaded";
      },
      onProgress: (ne, de) => {
        W.innerHTML = `${ne} of ${de} frames extracted`;
      }
    }).then((ne) => {
      W.innerHTML = "", ne.forEach((de, pe) => {
        if (ce) {
          const G = new Image();
          G.addEventListener("load", function() {
            ce.drawImage(G, pe * G.width, 0), pe === ne.length - 1 && setTimeout(() => {
              Z();
            }, 200);
          }, !1), G.src = de.image;
        }
      });
    });
  };
  E.addEventListener("loadeddata", (S) => {
    console.log("LOADED VIDEO", S, p), p.updateOptions({
      range: {
        min: 0,
        max: E.duration
      }
    }, !0), p.setHandle(2, E.duration);
  }), N.addEventListener("change", (S) => {
    console.log("Load video", S, q, q.parentNode);
    const K = S.target.files[0];
    console.log({ videoFile: K }), q.src = URL.createObjectURL(K), E.load(), E.play(), A.value = E.videoWidth.toString();
  });
  const X = document.createElement("button");
  X.innerText = "play/pause", X.addEventListener("click", J), E.addEventListener("click", J), E.appendChild(q), o.appendChild(E), o.appendChild(N), o.appendChild(X);
  const R = document.createElement("input");
  R.type = "number", R.min = "1", R.max = "80", R.style.width = "150px", R.placeholder = "extract 10 frames", R.value = "10", o.appendChild(R);
  const y = document.createElement("button");
  y.innerText = "Extract frames", y.addEventListener("click", D), C.addEventListener("click", Z), o.appendChild(y), o.appendChild(C);
  var Y = `
     .noUi-handle {
        opacity: 0.7;
     }
    `, B = document.createElement("style");
  B.innerText = Y, document.head.appendChild(B);
};
export {
  ar as hello,
  sr as init
};
