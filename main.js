var tr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function rr(F) {
  return F && F.__esModule && Object.prototype.hasOwnProperty.call(F, "default") ? F.default : F;
}
var Ae = { exports: {} };
(function(F, ee) {
  (function(p, J) {
    J(ee);
  })(tr, function(p) {
    p.PipsMode = void 0, function(t) {
      t.Range = "range", t.Steps = "steps", t.Positions = "positions", t.Count = "count", t.Values = "values";
    }(p.PipsMode || (p.PipsMode = {})), p.PipsType = void 0, function(t) {
      t[t.None = -1] = "None", t[t.NoValue = 0] = "NoValue", t[t.LargeValue = 1] = "LargeValue", t[t.SmallValue = 2] = "SmallValue";
    }(p.PipsType || (p.PipsType = {}));
    function J(t) {
      return I(t) && typeof t.from == "function";
    }
    function I(t) {
      return typeof t == "object" && typeof t.to == "function";
    }
    function V(t) {
      t.parentElement.removeChild(t);
    }
    function K(t) {
      return t != null;
    }
    function X(t) {
      t.preventDefault();
    }
    function te(t) {
      return t.filter(function(e) {
        return this[e] ? !1 : this[e] = !0;
      }, {});
    }
    function re(t, e) {
      return Math.round(t / e) * e;
    }
    function ie(t, e) {
      var s = t.getBoundingClientRect(), u = t.ownerDocument, f = u.documentElement, m = De(u);
      return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (m.x = 0), e ? s.top + m.y - f.clientTop : s.left + m.x - f.clientLeft;
    }
    function _(t) {
      return typeof t == "number" && !isNaN(t) && isFinite(t);
    }
    function A(t, e, s) {
      s > 0 && (L(t, e), setTimeout(function() {
        ae(t, e);
      }, s));
    }
    function T(t) {
      return Math.max(Math.min(t, 100), 0);
    }
    function W(t) {
      return Array.isArray(t) ? t : [t];
    }
    function We(t) {
      t = String(t);
      var e = t.split(".");
      return e.length > 1 ? e[1].length : 0;
    }
    function L(t, e) {
      t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e;
    }
    function ae(t, e) {
      t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function $e(t, e) {
      return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className);
    }
    function De(t) {
      var e = window.pageXOffset !== void 0, s = (t.compatMode || "") === "CSS1Compat", u = e ? window.pageXOffset : s ? t.documentElement.scrollLeft : t.body.scrollLeft, f = e ? window.pageYOffset : s ? t.documentElement.scrollTop : t.body.scrollTop;
      return {
        x: u,
        y: f
      };
    }
    function Je() {
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
    function Ze() {
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
    function Qe() {
      return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    function fe(t, e) {
      return 100 / (e - t);
    }
    function ce(t, e, s) {
      return e * 100 / (t[s + 1] - t[s]);
    }
    function et(t, e) {
      return ce(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0], 0);
    }
    function tt(t, e) {
      return e * (t[1] - t[0]) / 100 + t[0];
    }
    function Z(t, e) {
      for (var s = 1; t >= e[s]; )
        s += 1;
      return s;
    }
    function rt(t, e, s) {
      if (s >= t.slice(-1)[0])
        return 100;
      var u = Z(s, t), f = t[u - 1], m = t[u], h = e[u - 1], E = e[u];
      return h + et([f, m], s) / fe(h, E);
    }
    function it(t, e, s) {
      if (s >= 100)
        return t.slice(-1)[0];
      var u = Z(s, e), f = t[u - 1], m = t[u], h = e[u - 1], E = e[u];
      return tt([f, m], (s - h) * fe(h, E));
    }
    function at(t, e, s, u) {
      if (u === 100)
        return u;
      var f = Z(u, t), m = t[f - 1], h = t[f];
      return s ? u - m > (h - m) / 2 ? h : m : e[f - 1] ? t[f - 1] + re(u - t[f - 1], e[f - 1]) : u;
    }
    var ke = function() {
      function t(e, s, u) {
        this.xPct = [], this.xVal = [], this.xSteps = [], this.xNumSteps = [], this.xHighestCompleteStep = [], this.xSteps = [u || !1], this.xNumSteps = [!1], this.snap = s;
        var f, m = [];
        for (Object.keys(e).forEach(function(h) {
          m.push([W(e[h]), h]);
        }), m.sort(function(h, E) {
          return h[0][0] - E[0][0];
        }), f = 0; f < m.length; f++)
          this.handleEntryPoint(m[f][1], m[f][0]);
        for (this.xNumSteps = this.xSteps.slice(0), f = 0; f < this.xNumSteps.length; f++)
          this.handleStepPoint(f, this.xNumSteps[f]);
      }
      return t.prototype.getDistance = function(e) {
        for (var s = [], u = 0; u < this.xNumSteps.length - 1; u++)
          s[u] = ce(this.xVal, e, u);
        return s;
      }, t.prototype.getAbsoluteDistance = function(e, s, u) {
        var f = 0;
        if (e < this.xPct[this.xPct.length - 1])
          for (; e > this.xPct[f + 1]; )
            f++;
        else
          e === this.xPct[this.xPct.length - 1] && (f = this.xPct.length - 2);
        !u && e === this.xPct[f + 1] && f++, s === null && (s = []);
        var m, h = 1, E = s[f], v = 0, H = 0, z = 0, k = 0;
        for (u ? m = (e - this.xPct[f]) / (this.xPct[f + 1] - this.xPct[f]) : m = (this.xPct[f + 1] - e) / (this.xPct[f + 1] - this.xPct[f]); E > 0; )
          v = this.xPct[f + 1 + k] - this.xPct[f + k], s[f + k] * h + 100 - m * 100 > 100 ? (H = v * m, h = (E - 100 * m) / s[f + k], m = 1) : (H = s[f + k] * v / 100 * h, h = 0), u ? (z = z - H, this.xPct.length + k >= 1 && k--) : (z = z + H, this.xPct.length - k >= 1 && k++), E = s[f + k] * h;
        return e + z;
      }, t.prototype.toStepping = function(e) {
        return e = rt(this.xVal, this.xPct, e), e;
      }, t.prototype.fromStepping = function(e) {
        return it(this.xVal, this.xPct, e);
      }, t.prototype.getStep = function(e) {
        return e = at(this.xPct, this.xSteps, this.snap, e), e;
      }, t.prototype.getDefaultStep = function(e, s, u) {
        var f = Z(e, this.xPct);
        return (e === 100 || s && e === this.xPct[f - 1]) && (f = Math.max(f - 1, 1)), (this.xVal[f] - this.xVal[f - 1]) / u;
      }, t.prototype.getNearbySteps = function(e) {
        var s = Z(e, this.xPct);
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
        var e = this.xNumSteps.map(We);
        return Math.max.apply(null, e);
      }, t.prototype.hasNoSize = function() {
        return this.xVal[0] === this.xVal[this.xVal.length - 1];
      }, t.prototype.convert = function(e) {
        return this.getStep(this.toStepping(e));
      }, t.prototype.handleEntryPoint = function(e, s) {
        var u;
        if (e === "min" ? u = 0 : e === "max" ? u = 100 : u = parseFloat(e), !_(u) || !_(s[0]))
          throw new Error("noUiSlider: 'range' value isn't numeric.");
        this.xPct.push(u), this.xVal.push(s[0]);
        var f = Number(s[1]);
        u ? this.xSteps.push(isNaN(f) ? !1 : f) : isNaN(f) || (this.xSteps[0] = f), this.xHighestCompleteStep.push(0);
      }, t.prototype.handleStepPoint = function(e, s) {
        if (s) {
          if (this.xVal[e] === this.xVal[e + 1]) {
            this.xSteps[e] = this.xHighestCompleteStep[e] = this.xVal[e];
            return;
          }
          this.xSteps[e] = ce([this.xVal[e], this.xVal[e + 1]], s, 0) / fe(this.xPct[e], this.xPct[e + 1]);
          var u = (this.xVal[e + 1] - this.xVal[e]) / this.xNumSteps[e], f = Math.ceil(Number(u.toFixed(3)) - 1), m = this.xVal[e] + this.xNumSteps[e] * f;
          this.xHighestCompleteStep[e] = m;
        }
      }, t;
    }(), Me = {
      to: function(t) {
        return t === void 0 ? "" : t.toFixed(2);
      },
      from: Number
    }, de = {
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
    }, q = {
      tooltips: ".__tooltips",
      aria: ".__aria"
    };
    function nt(t, e) {
      if (!_(e))
        throw new Error("noUiSlider: 'step' is not numeric.");
      t.singleStep = e;
    }
    function st(t, e) {
      if (!_(e))
        throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
      t.keyboardPageMultiplier = e;
    }
    function ot(t, e) {
      if (!_(e))
        throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
      t.keyboardMultiplier = e;
    }
    function lt(t, e) {
      if (!_(e))
        throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
      t.keyboardDefaultStep = e;
    }
    function ut(t, e) {
      if (typeof e != "object" || Array.isArray(e))
        throw new Error("noUiSlider: 'range' is not an object.");
      if (e.min === void 0 || e.max === void 0)
        throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
      t.spectrum = new ke(e, t.snap || !1, t.singleStep);
    }
    function ft(t, e) {
      if (e = W(e), !Array.isArray(e) || !e.length)
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
    function pt(t, e) {
      if (typeof e != "number")
        throw new Error("noUiSlider: 'animationDuration' option must be a number.");
      t.animationDuration = e;
    }
    function ht(t, e) {
      var s = [!1], u;
      if (e === "lower" ? e = [!0, !1] : e === "upper" && (e = [!1, !0]), e === !0 || e === !1) {
        for (u = 1; u < t.handles; u++)
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
    function Ue(t, e) {
      if (!_(e))
        throw new Error("noUiSlider: 'margin' option must be numeric.");
      e !== 0 && (t.margin = t.spectrum.getDistance(e));
    }
    function mt(t, e) {
      if (!_(e))
        throw new Error("noUiSlider: 'limit' option must be numeric.");
      if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2)
        throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
    function gt(t, e) {
      var s;
      if (!_(e) && !Array.isArray(e))
        throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
      if (Array.isArray(e) && !(e.length === 2 || _(e[0]) || _(e[1])))
        throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
      if (e !== 0) {
        for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], s = 0; s < t.spectrum.xNumSteps.length - 1; s++)
          if (t.padding[0][s] < 0 || t.padding[1][s] < 0)
            throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        var u = e[0] + e[1], f = t.spectrum.xVal[0], m = t.spectrum.xVal[t.spectrum.xVal.length - 1];
        if (u / (m - f) > 1)
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
    function bt(t, e) {
      if (typeof e != "string")
        throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
      var s = e.indexOf("tap") >= 0, u = e.indexOf("drag") >= 0, f = e.indexOf("fixed") >= 0, m = e.indexOf("snap") >= 0, h = e.indexOf("hover") >= 0, E = e.indexOf("unconstrained") >= 0, v = e.indexOf("drag-all") >= 0, H = e.indexOf("smooth-steps") >= 0;
      if (f) {
        if (t.handles !== 2)
          throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
        Ue(t, t.start[1] - t.start[0]);
      }
      if (E && (t.margin || t.limit))
        throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
      t.events = {
        tap: s || m,
        drag: u,
        dragAll: v,
        smoothSteps: H,
        fixed: f,
        snap: m,
        hover: h,
        unconstrained: E
      };
    }
    function wt(t, e) {
      if (e !== !1)
        if (e === !0 || I(e)) {
          t.tooltips = [];
          for (var s = 0; s < t.handles; s++)
            t.tooltips.push(e);
        } else {
          if (e = W(e), e.length !== t.handles)
            throw new Error("noUiSlider: must pass a formatter for all handles.");
          e.forEach(function(u) {
            if (typeof u != "boolean" && !I(u))
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
      if (!J(e))
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
    function Le(t) {
      var e = {
        margin: null,
        limit: null,
        padding: null,
        animate: !0,
        animationDuration: 300,
        ariaFormat: Me,
        format: Me
      }, s = {
        step: { r: !1, t: nt },
        keyboardPageMultiplier: { r: !1, t: st },
        keyboardMultiplier: { r: !1, t: ot },
        keyboardDefaultStep: { r: !1, t: lt },
        start: { r: !0, t: ft },
        connect: { r: !0, t: ht },
        direction: { r: !0, t: St },
        snap: { r: !1, t: ct },
        animate: { r: !1, t: dt },
        animationDuration: { r: !1, t: pt },
        range: { r: !0, t: ut },
        orientation: { r: !1, t: vt },
        margin: { r: !1, t: Ue },
        limit: { r: !1, t: mt },
        padding: { r: !1, t: gt },
        behaviour: { r: !0, t: bt },
        ariaFormat: { r: !1, t: xt },
        format: { r: !1, t: Ct },
        tooltips: { r: !1, t: wt },
        keyboardSupport: { r: !0, t: Pt },
        documentElement: { r: !1, t: yt },
        cssPrefix: { r: !0, t: Vt },
        cssClasses: { r: !0, t: At },
        handleAttributes: { r: !1, t: Et }
      }, u = {
        connect: !1,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        keyboardSupport: !0,
        cssPrefix: "noUi-",
        cssClasses: de,
        keyboardPageMultiplier: 5,
        keyboardMultiplier: 1,
        keyboardDefaultStep: 10
      };
      t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(s).forEach(function(v) {
        if (!K(t[v]) && u[v] === void 0) {
          if (s[v].r)
            throw new Error("noUiSlider: '" + v + "' is required.");
          return;
        }
        s[v].t(e, K(t[v]) ? t[v] : u[v]);
      }), e.pips = t.pips;
      var f = document.createElement("div"), m = f.style.msTransform !== void 0, h = f.style.transform !== void 0;
      e.transformRule = h ? "transform" : m ? "msTransform" : "webkitTransform";
      var E = [
        ["left", "top"],
        ["right", "bottom"]
      ];
      return e.style = E[e.dir][e.ort], e;
    }
    function Dt(t, e, s) {
      var u = Je(), f = Qe(), m = f && Ze(), h = t, E, v, H, z, k, g = e.spectrum, R = [], P = [], j = [], pe = 0, N = {}, $ = t.ownerDocument, ne = e.documentElement || $.documentElement, se = $.body, Mt = $.dir === "rtl" || e.ort === 1 ? 0 : 100;
      function B(r, i) {
        var a = $.createElement("div");
        return i && L(a, i), r.appendChild(a), a;
      }
      function Ut(r, i) {
        var a = B(r, e.cssClasses.origin), n = B(a, e.cssClasses.handle);
        if (B(n, e.cssClasses.touchArea), n.setAttribute("data-handle", String(i)), e.keyboardSupport && (n.setAttribute("tabindex", "0"), n.addEventListener("keydown", function(o) {
          return It(o, i);
        })), e.handleAttributes !== void 0) {
          var l = e.handleAttributes[i];
          Object.keys(l).forEach(function(o) {
            n.setAttribute(o, l[o]);
          });
        }
        return n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", e.ort ? "vertical" : "horizontal"), i === 0 ? L(n, e.cssClasses.handleLower) : i === e.handles - 1 && L(n, e.cssClasses.handleUpper), a;
      }
      function _e(r, i) {
        return i ? B(r, e.cssClasses.connect) : !1;
      }
      function Lt(r, i) {
        var a = B(i, e.cssClasses.connects);
        v = [], H = [], H.push(_e(a, r[0]));
        for (var n = 0; n < e.handles; n++)
          v.push(Ut(i, n)), j[n] = n, H.push(_e(a, r[n + 1]));
      }
      function Ot(r) {
        L(r, e.cssClasses.target), e.dir === 0 ? L(r, e.cssClasses.ltr) : L(r, e.cssClasses.rtl), e.ort === 0 ? L(r, e.cssClasses.horizontal) : L(r, e.cssClasses.vertical);
        var i = getComputedStyle(r).direction;
        return i === "rtl" ? L(r, e.cssClasses.textDirectionRtl) : L(r, e.cssClasses.textDirectionLtr), B(r, e.cssClasses.base);
      }
      function _t(r, i) {
        return !e.tooltips || !e.tooltips[i] ? !1 : B(r.firstChild, e.cssClasses.tooltip);
      }
      function He() {
        return h.hasAttribute("disabled");
      }
      function he(r) {
        var i = v[r];
        return i.hasAttribute("disabled");
      }
      function ve() {
        k && (Q("update" + q.tooltips), k.forEach(function(r) {
          r && V(r);
        }), k = null);
      }
      function Fe() {
        ve(), k = v.map(_t), we("update" + q.tooltips, function(r, i, a) {
          if (!(!k || !e.tooltips) && k[i] !== !1) {
            var n = r[i];
            e.tooltips[i] !== !0 && (n = e.tooltips[i].to(a[i])), k[i].innerHTML = n;
          }
        });
      }
      function Ht() {
        Q("update" + q.aria), we("update" + q.aria, function(r, i, a, n, l) {
          j.forEach(function(o) {
            var d = v[o], c = oe(P, o, 0, !0, !0, !0), w = oe(P, o, 100, !0, !0, !0), b = l[o], x = String(e.ariaFormat.to(a[o]));
            c = g.fromStepping(c).toFixed(1), w = g.fromStepping(w).toFixed(1), b = g.fromStepping(b).toFixed(1), d.children[0].setAttribute("aria-valuemin", c), d.children[0].setAttribute("aria-valuemax", w), d.children[0].setAttribute("aria-valuenow", b), d.children[0].setAttribute("aria-valuetext", x);
          });
        });
      }
      function Ft(r) {
        if (r.mode === p.PipsMode.Range || r.mode === p.PipsMode.Steps)
          return g.xVal;
        if (r.mode === p.PipsMode.Count) {
          if (r.values < 2)
            throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
          for (var i = r.values - 1, a = 100 / i, n = []; i--; )
            n[i] = i * a;
          return n.push(100), je(n, r.stepped);
        }
        return r.mode === p.PipsMode.Positions ? je(r.values, r.stepped) : r.mode === p.PipsMode.Values ? r.stepped ? r.values.map(function(l) {
          return g.fromStepping(g.getStep(g.toStepping(l)));
        }) : r.values : [];
      }
      function je(r, i) {
        return r.map(function(a) {
          return g.fromStepping(i ? g.getStep(a) : a);
        });
      }
      function jt(r) {
        function i(b, x) {
          return Number((b + x).toFixed(7));
        }
        var a = Ft(r), n = {}, l = g.xVal[0], o = g.xVal[g.xVal.length - 1], d = !1, c = !1, w = 0;
        return a = te(a.slice().sort(function(b, x) {
          return b - x;
        })), a[0] !== l && (a.unshift(l), d = !0), a[a.length - 1] !== o && (a.push(o), c = !0), a.forEach(function(b, x) {
          var C, S, D, O = b, M = a[x + 1], U, Ce, Pe, ye, Xe, Ve, Ye, Ge = r.mode === p.PipsMode.Steps;
          for (Ge && (C = g.xNumSteps[x]), C || (C = M - O), M === void 0 && (M = O), C = Math.max(C, 1e-7), S = O; S <= M; S = i(S, C)) {
            for (U = g.toStepping(S), Ce = U - w, Xe = Ce / (r.density || 1), Ve = Math.round(Xe), Ye = Ce / Ve, D = 1; D <= Ve; D += 1)
              Pe = w + D * Ye, n[Pe.toFixed(5)] = [g.fromStepping(Pe), 0];
            ye = a.indexOf(S) > -1 ? p.PipsType.LargeValue : Ge ? p.PipsType.SmallValue : p.PipsType.NoValue, !x && d && S !== M && (ye = 0), S === M && c || (n[U.toFixed(5)] = [S, ye]), w = U;
          }
        }), n;
      }
      function zt(r, i, a) {
        var n, l, o = $.createElement("div"), d = (n = {}, n[p.PipsType.None] = "", n[p.PipsType.NoValue] = e.cssClasses.valueNormal, n[p.PipsType.LargeValue] = e.cssClasses.valueLarge, n[p.PipsType.SmallValue] = e.cssClasses.valueSub, n), c = (l = {}, l[p.PipsType.None] = "", l[p.PipsType.NoValue] = e.cssClasses.markerNormal, l[p.PipsType.LargeValue] = e.cssClasses.markerLarge, l[p.PipsType.SmallValue] = e.cssClasses.markerSub, l), w = [e.cssClasses.valueHorizontal, e.cssClasses.valueVertical], b = [e.cssClasses.markerHorizontal, e.cssClasses.markerVertical];
        L(o, e.cssClasses.pips), L(o, e.ort === 0 ? e.cssClasses.pipsHorizontal : e.cssClasses.pipsVertical);
        function x(S, D) {
          var O = D === e.cssClasses.value, M = O ? w : b, U = O ? d : c;
          return D + " " + M[e.ort] + " " + U[S];
        }
        function C(S, D, O) {
          if (O = i ? i(D, O) : O, O !== p.PipsType.None) {
            var M = B(o, !1);
            M.className = x(O, e.cssClasses.marker), M.style[e.style] = S + "%", O > p.PipsType.NoValue && (M = B(o, !1), M.className = x(O, e.cssClasses.value), M.setAttribute("data-value", String(D)), M.style[e.style] = S + "%", M.innerHTML = String(a.to(D)));
          }
        }
        return Object.keys(r).forEach(function(S) {
          C(S, r[S][0], r[S][1]);
        }), o;
      }
      function me() {
        z && (V(z), z = null);
      }
      function ge(r) {
        me();
        var i = jt(r), a = r.filter, n = r.format || {
          to: function(l) {
            return String(Math.round(l));
          }
        };
        return z = h.appendChild(zt(i, a, n)), z;
      }
      function ze() {
        var r = E.getBoundingClientRect(), i = "offset" + ["Width", "Height"][e.ort];
        return e.ort === 0 ? r.width || E[i] : r.height || E[i];
      }
      function Y(r, i, a, n) {
        var l = function(d) {
          var c = Tt(d, n.pageOffset, n.target || i);
          if (!c || He() && !n.doNotReject || $e(h, e.cssClasses.tap) && !n.doNotReject || r === u.start && c.buttons !== void 0 && c.buttons > 1 || n.hover && c.buttons)
            return !1;
          m || c.preventDefault(), c.calcPoint = c.points[e.ort], a(c, n);
        }, o = [];
        return r.split(" ").forEach(function(d) {
          i.addEventListener(d, l, m ? { passive: !0 } : !1), o.push([d, l]);
        }), o;
      }
      function Tt(r, i, a) {
        var n = r.type.indexOf("touch") === 0, l = r.type.indexOf("mouse") === 0, o = r.type.indexOf("pointer") === 0, d = 0, c = 0;
        if (r.type.indexOf("MSPointer") === 0 && (o = !0), r.type === "mousedown" && !r.buttons && !r.touches)
          return !1;
        if (n) {
          var w = function(C) {
            var S = C.target;
            return S === a || a.contains(S) || r.composed && r.composedPath().shift() === a;
          };
          if (r.type === "touchstart") {
            var b = Array.prototype.filter.call(r.touches, w);
            if (b.length > 1)
              return !1;
            d = b[0].pageX, c = b[0].pageY;
          } else {
            var x = Array.prototype.find.call(r.changedTouches, w);
            if (!x)
              return !1;
            d = x.pageX, c = x.pageY;
          }
        }
        return i = i || De($), (l || o) && (d = r.clientX + i.x, c = r.clientY + i.y), r.pageOffset = i, r.points = [d, c], r.cursor = l || o, r;
      }
      function Te(r) {
        var i = r - ie(E, e.ort), a = i * 100 / ze();
        return a = T(a), e.dir ? 100 - a : a;
      }
      function Rt(r) {
        var i = 100, a = !1;
        return v.forEach(function(n, l) {
          if (!he(l)) {
            var o = P[l], d = Math.abs(o - r), c = d === 100 && i === 100, w = d < i, b = d <= i && r > o;
            (w || b || c) && (a = l, i = d);
          }
        }), a;
      }
      function Nt(r, i) {
        r.type === "mouseout" && r.target.nodeName === "HTML" && r.relatedTarget === null && Se(r, i);
      }
      function Bt(r, i) {
        if (navigator.appVersion.indexOf("MSIE 9") === -1 && r.buttons === 0 && i.buttonsProperty !== 0)
          return Se(r, i);
        var a = (e.dir ? -1 : 1) * (r.calcPoint - i.startCalcPoint), n = a * 100 / i.baseSize;
        Re(a > 0, n, i.locations, i.handleNumbers, i.connect);
      }
      function Se(r, i) {
        i.handle && (ae(i.handle, e.cssClasses.active), pe -= 1), i.listeners.forEach(function(a) {
          ne.removeEventListener(a[0], a[1]);
        }), pe === 0 && (ae(h, e.cssClasses.drag), xe(), r.cursor && (se.style.cursor = "", se.removeEventListener("selectstart", X))), e.events.smoothSteps && (i.handleNumbers.forEach(function(a) {
          G(a, P[a], !0, !0, !1, !1);
        }), i.handleNumbers.forEach(function(a) {
          y("update", a);
        })), i.handleNumbers.forEach(function(a) {
          y("change", a), y("set", a), y("end", a);
        });
      }
      function be(r, i) {
        if (!i.handleNumbers.some(he)) {
          var a;
          if (i.handleNumbers.length === 1) {
            var n = v[i.handleNumbers[0]];
            a = n.children[0], pe += 1, L(a, e.cssClasses.active);
          }
          r.stopPropagation();
          var l = [], o = Y(u.move, ne, Bt, {
            target: r.target,
            handle: a,
            connect: i.connect,
            listeners: l,
            startCalcPoint: r.calcPoint,
            baseSize: ze(),
            pageOffset: r.pageOffset,
            handleNumbers: i.handleNumbers,
            buttonsProperty: r.buttons,
            locations: P.slice()
          }), d = Y(u.end, ne, Se, {
            target: r.target,
            handle: a,
            listeners: l,
            doNotReject: !0,
            handleNumbers: i.handleNumbers
          }), c = Y("mouseout", ne, Nt, {
            target: r.target,
            handle: a,
            listeners: l,
            doNotReject: !0,
            handleNumbers: i.handleNumbers
          });
          l.push.apply(l, o.concat(d, c)), r.cursor && (se.style.cursor = getComputedStyle(r.target).cursor, v.length > 1 && L(h, e.cssClasses.drag), se.addEventListener("selectstart", X, !1)), i.handleNumbers.forEach(function(w) {
            y("start", w);
          });
        }
      }
      function Kt(r) {
        r.stopPropagation();
        var i = Te(r.calcPoint), a = Rt(i);
        a !== !1 && (e.events.snap || A(h, e.cssClasses.tap, e.animationDuration), G(a, i, !0, !0), xe(), y("slide", a, !0), y("update", a, !0), e.events.snap ? be(r, { handleNumbers: [a] }) : (y("change", a, !0), y("set", a, !0)));
      }
      function qt(r) {
        var i = Te(r.calcPoint), a = g.getStep(i), n = g.fromStepping(a);
        Object.keys(N).forEach(function(l) {
          l.split(".")[0] === "hover" && N[l].forEach(function(o) {
            o.call(ue, n);
          });
        });
      }
      function It(r, i) {
        if (He() || he(i))
          return !1;
        var a = ["Left", "Right"], n = ["Down", "Up"], l = ["PageDown", "PageUp"], o = ["Home", "End"];
        e.dir && !e.ort ? a.reverse() : e.ort && !e.dir && (n.reverse(), l.reverse());
        var d = r.key.replace("Arrow", ""), c = d === l[0], w = d === l[1], b = d === n[0] || d === a[0] || c, x = d === n[1] || d === a[1] || w, C = d === o[0], S = d === o[1];
        if (!b && !x && !C && !S)
          return !0;
        r.preventDefault();
        var D;
        if (x || b) {
          var O = b ? 0 : 1, M = Ie(i), U = M[O];
          if (U === null)
            return !1;
          U === !1 && (U = g.getDefaultStep(P[i], b, e.keyboardDefaultStep)), w || c ? U *= e.keyboardPageMultiplier : U *= e.keyboardMultiplier, U = Math.max(U, 1e-7), U = (b ? -1 : 1) * U, D = R[i] + U;
        } else
          S ? D = e.spectrum.xVal[e.spectrum.xVal.length - 1] : D = e.spectrum.xVal[0];
        return G(i, g.toStepping(D), !0, !0), y("slide", i), y("update", i), y("change", i), y("set", i), !1;
      }
      function Xt(r) {
        r.fixed || v.forEach(function(i, a) {
          Y(u.start, i.children[0], be, {
            handleNumbers: [a]
          });
        }), r.tap && Y(u.start, E, Kt, {}), r.hover && Y(u.move, E, qt, {
          hover: !0
        }), r.drag && H.forEach(function(i, a) {
          if (!(i === !1 || a === 0 || a === H.length - 1)) {
            var n = v[a - 1], l = v[a], o = [i], d = [n, l], c = [a - 1, a];
            L(i, e.cssClasses.draggable), r.fixed && (o.push(n.children[0]), o.push(l.children[0])), r.dragAll && (d = v, c = j), o.forEach(function(w) {
              Y(u.start, w, be, {
                handles: d,
                handleNumbers: c,
                connect: i
              });
            });
          }
        });
      }
      function we(r, i) {
        N[r] = N[r] || [], N[r].push(i), r.split(".")[0] === "update" && v.forEach(function(a, n) {
          y("update", n);
        });
      }
      function Yt(r) {
        return r === q.aria || r === q.tooltips;
      }
      function Q(r) {
        var i = r && r.split(".")[0], a = i ? r.substring(i.length) : r;
        Object.keys(N).forEach(function(n) {
          var l = n.split(".")[0], o = n.substring(l.length);
          (!i || i === l) && (!a || a === o) && (!Yt(o) || a === o) && delete N[n];
        });
      }
      function y(r, i, a) {
        Object.keys(N).forEach(function(n) {
          var l = n.split(".")[0];
          r === l && N[n].forEach(function(o) {
            o.call(
              ue,
              R.map(e.format.to),
              i,
              R.slice(),
              a || !1,
              P.slice(),
              ue
            );
          });
        });
      }
      function oe(r, i, a, n, l, o, d) {
        var c;
        return v.length > 1 && !e.events.unconstrained && (n && i > 0 && (c = g.getAbsoluteDistance(r[i - 1], e.margin, !1), a = Math.max(a, c)), l && i < v.length - 1 && (c = g.getAbsoluteDistance(r[i + 1], e.margin, !0), a = Math.min(a, c))), v.length > 1 && e.limit && (n && i > 0 && (c = g.getAbsoluteDistance(r[i - 1], e.limit, !1), a = Math.min(a, c)), l && i < v.length - 1 && (c = g.getAbsoluteDistance(r[i + 1], e.limit, !0), a = Math.max(a, c))), e.padding && (i === 0 && (c = g.getAbsoluteDistance(0, e.padding[0], !1), a = Math.max(a, c)), i === v.length - 1 && (c = g.getAbsoluteDistance(100, e.padding[1], !0), a = Math.min(a, c))), d || (a = g.getStep(a)), a = T(a), a === r[i] && !o ? !1 : a;
      }
      function Ee(r, i) {
        var a = e.ort;
        return (a ? i : r) + ", " + (a ? r : i);
      }
      function Re(r, i, a, n, l) {
        var o = a.slice(), d = n[0], c = e.events.smoothSteps, w = [!r, r], b = [r, !r];
        n = n.slice(), r && n.reverse(), n.length > 1 ? n.forEach(function(C, S) {
          var D = oe(o, C, o[C] + i, w[S], b[S], !1, c);
          D === !1 ? i = 0 : (i = D - o[C], o[C] = D);
        }) : w = b = [!0];
        var x = !1;
        n.forEach(function(C, S) {
          x = G(C, a[C] + i, w[S], b[S], !1, c) || x;
        }), x && (n.forEach(function(C) {
          y("update", C), y("slide", C);
        }), l != null && y("drag", d));
      }
      function Ne(r, i) {
        return e.dir ? 100 - r - i : r;
      }
      function Gt(r, i) {
        P[r] = i, R[r] = g.fromStepping(i);
        var a = Ne(i, 0) - Mt, n = "translate(" + Ee(a + "%", "0") + ")";
        v[r].style[e.transformRule] = n, Be(r), Be(r + 1);
      }
      function xe() {
        j.forEach(function(r) {
          var i = P[r] > 50 ? -1 : 1, a = 3 + (v.length + i * r);
          v[r].style.zIndex = String(a);
        });
      }
      function G(r, i, a, n, l, o) {
        return l || (i = oe(P, r, i, a, n, !1, o)), i === !1 ? !1 : (Gt(r, i), !0);
      }
      function Be(r) {
        if (H[r]) {
          var i = 0, a = 100;
          r !== 0 && (i = P[r - 1]), r !== H.length - 1 && (a = P[r]);
          var n = a - i, l = "translate(" + Ee(Ne(i, n) + "%", "0") + ")", o = "scale(" + Ee(n / 100, "1") + ")";
          H[r].style[e.transformRule] = l + " " + o;
        }
      }
      function Ke(r, i) {
        return r === null || r === !1 || r === void 0 || (typeof r == "number" && (r = String(r)), r = e.format.from(r), r !== !1 && (r = g.toStepping(r)), r === !1 || isNaN(r)) ? P[i] : r;
      }
      function le(r, i, a) {
        var n = W(r), l = P[0] === void 0;
        i = i === void 0 ? !0 : i, e.animate && !l && A(h, e.cssClasses.tap, e.animationDuration), j.forEach(function(c) {
          G(c, Ke(n[c], c), !0, !1, a);
        });
        var o = j.length === 1 ? 0 : 1;
        if (l && g.hasNoSize() && (a = !0, P[0] = 0, j.length > 1)) {
          var d = 100 / (j.length - 1);
          j.forEach(function(c) {
            P[c] = c * d;
          });
        }
        for (; o < j.length; ++o)
          j.forEach(function(c) {
            G(c, P[c], !0, !0, a);
          });
        xe(), j.forEach(function(c) {
          y("update", c), n[c] !== null && i && y("set", c);
        });
      }
      function Wt(r) {
        le(e.start, r);
      }
      function $t(r, i, a, n) {
        if (r = Number(r), !(r >= 0 && r < j.length))
          throw new Error("noUiSlider: invalid handle number, got: " + r);
        G(r, Ke(i, r), !0, !0, n), y("update", r), a && y("set", r);
      }
      function qe(r) {
        if (r === void 0 && (r = !1), r)
          return R.length === 1 ? R[0] : R.slice(0);
        var i = R.map(e.format.to);
        return i.length === 1 ? i[0] : i;
      }
      function Jt() {
        for (Q(q.aria), Q(q.tooltips), Object.keys(e.cssClasses).forEach(function(r) {
          ae(h, e.cssClasses[r]);
        }); h.firstChild; )
          h.removeChild(h.firstChild);
        delete h.noUiSlider;
      }
      function Ie(r) {
        var i = P[r], a = g.getNearbySteps(i), n = R[r], l = a.thisStep.step, o = null;
        if (e.snap)
          return [
            n - a.stepBefore.startValue || null,
            a.stepAfter.startValue - n || null
          ];
        l !== !1 && n + l > a.stepAfter.startValue && (l = a.stepAfter.startValue - n), n > a.thisStep.startValue ? o = a.thisStep.step : a.stepBefore.step === !1 ? o = !1 : o = n - a.stepBefore.highestStep, i === 100 ? l = null : i === 0 && (o = null);
        var d = g.countStepDecimals();
        return l !== null && l !== !1 && (l = Number(l.toFixed(d))), o !== null && o !== !1 && (o = Number(o.toFixed(d))), [o, l];
      }
      function Zt() {
        return j.map(Ie);
      }
      function Qt(r, i) {
        var a = qe(), n = [
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
        n.forEach(function(o) {
          r[o] !== void 0 && (s[o] = r[o]);
        });
        var l = Le(s);
        n.forEach(function(o) {
          r[o] !== void 0 && (e[o] = l[o]);
        }), g = l.spectrum, e.margin = l.margin, e.limit = l.limit, e.padding = l.padding, e.pips ? ge(e.pips) : me(), e.tooltips ? Fe() : ve(), P = [], le(K(r.start) ? r.start : a, i);
      }
      function er() {
        E = Ot(h), Lt(e.connect, E), Xt(e.events), le(e.start), e.pips && ge(e.pips), e.tooltips && Fe(), Ht();
      }
      er();
      var ue = {
        destroy: Jt,
        steps: Zt,
        on: we,
        off: Q,
        get: qe,
        set: le,
        setHandle: $t,
        reset: Wt,
        __moveHandles: function(r, i, a) {
          Re(r, i, P, a);
        },
        options: s,
        updateOptions: Qt,
        target: h,
        removePips: me,
        removeTooltips: ve,
        getPositions: function() {
          return P.slice();
        },
        getTooltips: function() {
          return k;
        },
        getOrigins: function() {
          return v;
        },
        pips: ge
      };
      return ue;
    }
    function Oe(t, e) {
      if (!t || !t.nodeName)
        throw new Error("noUiSlider: create requires a single element, got: " + t);
      if (t.noUiSlider)
        throw new Error("noUiSlider: Slider was already initialized.");
      var s = Le(e), u = Dt(t, s, e);
      return t.noUiSlider = u, u;
    }
    var kt = {
      __spectrum: ke,
      cssClasses: de,
      create: Oe
    };
    p.create = Oe, p.cssClasses = de, p.default = kt, Object.defineProperty(p, "__esModule", { value: !0 });
  });
})(Ae, Ae.exports);
const ir = /* @__PURE__ */ rr(Ae.exports);
const ar = (F) => `Hello Todor, ${F}!`, nr = (F) => {
  if (!F)
    return;
  var ee = document.createElement("div");
  const p = ir.create(ee, {
    start: [0, 40, 100],
    connect: !0,
    range: {
      min: 0,
      max: 100
    }
  });
  F.appendChild(ee);
  var J = `
     .noUi-handle {
        opacity: 0.7;
     }
    `, I = document.createElement("style");
  I.innerText = J, document.head.appendChild(I);
  const V = document.createElement("video"), K = document.createElement("source"), X = document.createElement("input");
  X.type = "file", X.accept = "video/*";
  function te() {
    V.paused || V.ended ? V.play() : V.pause();
  }
  var re = -1;
  function ie() {
    var A = V.currentTime;
    if (A !== re) {
      console.log("time: " + A), re = A, p.setHandle(1, A);
      const T = parseFloat(p.get()[0]), W = parseFloat(p.get()[2]);
      A > W && (V.currentTime = T);
    }
    requestAnimationFrame(ie);
  }
  ie(), p.on("start", (A) => {
    console.log("start", A), V.pause();
  }), p.on("end", (A) => {
    parseFloat(A[0]);
    const T = parseFloat(A[1]);
    parseFloat(A[2]), console.log("end", A), V.currentTime = T, V.play();
  }), V.addEventListener("loadeddata", (A) => {
    console.log("LOADED VIDEO", A, p), p.updateOptions({
      range: {
        min: 0,
        max: V.duration
      }
    }, !0), p.setHandle(2, V.duration);
  }), X.addEventListener("change", (A) => {
    console.log("Load video", A, K, K.parentNode);
    const T = A.target.files[0];
    console.log({ videoFile: T }), K.src = URL.createObjectURL(T), V.load(), V.play();
  });
  const _ = document.createElement("button");
  _.innerText = "play/pause", _.addEventListener("click", te), V.addEventListener("click", te), V.appendChild(K), F.appendChild(V), F.appendChild(X), F.appendChild(_);
};
export {
  ar as hello,
  nr as init
};
