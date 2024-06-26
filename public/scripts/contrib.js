const keys = []
!(function (e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t(require("video.js"))
  else if ("function" == typeof define && define.amd) define(["video.js"], t)
  else {
    var r = t("object" == typeof exports ? require("video.js") : e.videojs)
    for (var i in r) ("object" == typeof exports ? exports : e)[i] = r[i]
  }
})(this, function (e) {
  return (function (e) {
    function t(i) {
      if (r[i]) return r[i].exports
      var a = (r[i] = { i: i, l: !1, exports: {} })
      return e[i].call(a.exports, a, a.exports, t), (a.l = !0), a.exports
    }
    var r = {}
    return (
      (t.m = e),
      (t.c = r),
      (t.i = function (e) {
        return e
      }),
      (t.d = function (e, r, i) {
        t.o(e, r) || Object.defineProperty(e, r, { configurable: !1, enumerable: !0, get: i })
      }),
      (t.n = function (e) {
        var r =
          e && e.__esModule
            ? function () {
                return e.default
              }
            : function () {
                return e
              }
        return t.d(r, "a", r), r
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
      }),
      (t.p = ""),
      t((t.s = 3))
    )
  })([
    function (e, t, r) {
      "use strict"
      function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      function a(e, t) {
        for (var r = 0; r < t.length; r++) {
          var i = t[r]
          ;(i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(e, i.key, i)
        }
      }
      function n(e, t, r) {
        return t && a(e.prototype, t), r && a(e, r), Object.defineProperty(e, "prototype", { writable: !1 }), e
      }
      function s() {
        return new Date().getTime()
      }
      function o(e) {
        if (!e) return "p2p"
        var t = document.createElement("a")
        return (t.href = e), t.hostname
      }
      var l = (function () {
        function e() {
          i(this, e), (this.stats = {}), (this.final_stats = [])
        }
        return (
          n(e, [
            {
              key: "create_segment_stats",
              value: function (e, t, r) {
                this.has_segment(e) ||
                  (this.stats[e] = {
                    start: s(),
                    end: 0,
                    totalLoaded: 0,
                    totalUploaded: 0,
                    cdn: o(r),
                    size: 0,
                    method: t,
                    speed: 0,
                    wasted: 0,
                    tfirst: 0,
                  })
              },
            },
            {
              key: "segment_ignore",
              value: function (e) {
                this.has_segment(e) &&
                  ((this.stats[e].wasted = this.stats[e].totalLoaded), (this.stats[e].end = s()), this.clear_segment(e))
              },
            },
            {
              key: "segment_download",
              value: function (e, t, r) {
                var i = r.id
                this.has_segment(i) || (this.create_segment_stats(i, e, r.url), (this.stats[i].tfirst = r.start_time)),
                  (this.stats[i].totalLoaded += t)
              },
            },
            {
              key: "segment_upload",
              value: function (e, t, r) {
                ;(r += "-upload"),
                  this.has_segment(r) || this.create_segment_stats(r, e),
                  (this.stats[r].totalUploaded += t)
              },
            },
            {
              key: "segment_loaded",
              value: function (e, t, r) {
                this.has_segment(e) &&
                  ((this.stats[e].size = t),
                  (this.stats[e].speed = r),
                  (this.stats[e].end = s()),
                  this.clear_segment(e))
              },
            },
            {
              key: "has_segment",
              value: function (e) {
                return !!this.stats[e]
              },
            },
            {
              key: "clear_segment",
              value: function (e) {
                this.has_segment(e) && (this.final_stats.push(this.stats[e]), delete this.stats[e])
              },
            },
            {
              key: "pop_stats",
              value: function () {
                var e = this.final_stats.splice(0),
                  t = {}
                return (
                  e.forEach(function (e) {
                    if (0 !== e.end) {
                      t.methods || (t = { start_time: 1 / 0, end_time: 0, methods: [] }),
                        (t.start_time = Math.min(t.start_time, e.start)),
                        (t.end_time = Math.max(t.end_time, e.end))
                      var r = -1
                      for (var i in t.methods) t.methods[i].name === e.method && (r = i)
                      ;-1 === r && (t.methods.push({ name: e.method, cdns: [] }), (r = t.methods.length - 1))
                      var a = e.cdn,
                        n = -1
                      for (var s in t.methods[r].cdns) t.methods[r].cdns[s].name === a && (n = s)
                      ;-1 === n &&
                        (t.methods[r].cdns.push({
                          name: a,
                          avg_bw: 0,
                          avg_response_time: 0,
                          avg_load_time: 0,
                          total_success: 0,
                          total_fail: 0,
                          num_segment: 0,
                        }),
                        (n = t.methods[r].cdns.length - 1))
                      var o = t.methods[r].cdns[n].num_segment,
                        l = e.end - e.start,
                        u = e.start - e.tfirst
                      if (l >= 100) {
                        var d = e.speed ? 1e3 * e.speed : e.totalLoaded / l
                        e.wasted
                          ? (t.methods[r].cdns[n].total_fail += e.wasted)
                          : (t.methods[r].cdns[n].total_success += Math.max(e.totalLoaded, e.size))
                        var c = function (e, t, i, a) {
                          e.methods[r].cdns[n][t] = (e.methods[r].cdns[n][t] * a + i) / (a + 1)
                        }
                        c(t, "avg_bw", d, o),
                          c(t, "avg_load_time", l, o),
                          c(t, "avg_response_time", u, o),
                          t.methods[r].cdns[n].num_segment++
                      }
                    }
                  }),
                  t.methods && 0 !== t.methods.length ? t : null
                )
              },
            },
          ]),
          e
        )
      })()
      t.a = l
    },
    function (e, t, r) {
      "undefined" != typeof window &&
        (function (t, r) {
          e.exports = r()
        })(0, function () {
          return (function (e) {
            function t(i) {
              if (r[i]) return r[i].exports
              var a = (r[i] = { i: i, l: !1, exports: {} })
              return e[i].call(a.exports, a, a.exports, t), (a.l = !0), a.exports
            }
            var r = {}
            return (
              (t.m = e),
              (t.c = r),
              (t.d = function (e, r, i) {
                t.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: i })
              }),
              (t.r = function (e) {
                "undefined" != typeof Symbol &&
                  Symbol.toStringTag &&
                  Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                  Object.defineProperty(e, "__esModule", { value: !0 })
              }),
              (t.t = function (e, r) {
                if ((1 & r && (e = t(e)), 8 & r)) return e
                if (4 & r && "object" == typeof e && e && e.__esModule) return e
                var i = Object.create(null)
                if (
                  (t.r(i),
                  Object.defineProperty(i, "default", { enumerable: !0, value: e }),
                  2 & r && "string" != typeof e)
                )
                  for (var a in e)
                    t.d(
                      i,
                      a,
                      function (t) {
                        return e[t]
                      }.bind(null, a)
                    )
                return i
              }),
              (t.n = function (e) {
                var r =
                  e && e.__esModule
                    ? function () {
                        return e.default
                      }
                    : function () {
                        return e
                      }
                return t.d(r, "a", r), r
              }),
              (t.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
              }),
              (t.p = "/dist/"),
              t((t.s = "./src/hls.ts"))
            )
          })({
            "./node_modules/eventemitter3/index.js": function (e, t, r) {
              "use strict"
              function i() {}
              function a(e, t, r) {
                ;(this.fn = e), (this.context = t), (this.once = r || !1)
              }
              function n(e, t, r, i, n) {
                if ("function" != typeof r) throw new TypeError("The listener must be a function")
                var s = new a(r, i || e, n),
                  o = u ? u + t : t
                return (
                  e._events[o]
                    ? e._events[o].fn
                      ? (e._events[o] = [e._events[o], s])
                      : e._events[o].push(s)
                    : ((e._events[o] = s), e._eventsCount++),
                  e
                )
              }
              function s(e, t) {
                0 == --e._eventsCount ? (e._events = new i()) : delete e._events[t]
              }
              function o() {
                ;(this._events = new i()), (this._eventsCount = 0)
              }
              var l = Object.prototype.hasOwnProperty,
                u = "~"
              Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (u = !1)),
                (o.prototype.eventNames = function () {
                  var e,
                    t,
                    r = []
                  if (0 === this._eventsCount) return r
                  for (t in (e = this._events)) l.call(e, t) && r.push(u ? t.slice(1) : t)
                  return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r
                }),
                (o.prototype.listeners = function (e) {
                  var t = u ? u + e : e,
                    r = this._events[t]
                  if (!r) return []
                  if (r.fn) return [r.fn]
                  for (var i = 0, a = r.length, n = new Array(a); i < a; i++) n[i] = r[i].fn
                  return n
                }),
                (o.prototype.listenerCount = function (e) {
                  var t = u ? u + e : e,
                    r = this._events[t]
                  return r ? (r.fn ? 1 : r.length) : 0
                }),
                (o.prototype.emit = function (e, t, r, i, a, n) {
                  var s = u ? u + e : e
                  if (!this._events[s]) return !1
                  var o,
                    l,
                    d = this._events[s],
                    c = arguments.length
                  if (d.fn) {
                    switch ((d.once && this.removeListener(e, d.fn, void 0, !0), c)) {
                      case 1:
                        return d.fn.call(d.context), !0
                      case 2:
                        return d.fn.call(d.context, t), !0
                      case 3:
                        return d.fn.call(d.context, t, r), !0
                      case 4:
                        return d.fn.call(d.context, t, r, i), !0
                      case 5:
                        return d.fn.call(d.context, t, r, i, a), !0
                      case 6:
                        return d.fn.call(d.context, t, r, i, a, n), !0
                    }
                    for (l = 1, o = new Array(c - 1); l < c; l++) o[l - 1] = arguments[l]
                    d.fn.apply(d.context, o)
                  } else {
                    var f,
                      h = d.length
                    for (l = 0; l < h; l++)
                      switch ((d[l].once && this.removeListener(e, d[l].fn, void 0, !0), c)) {
                        case 1:
                          d[l].fn.call(d[l].context)
                          break
                        case 2:
                          d[l].fn.call(d[l].context, t)
                          break
                        case 3:
                          d[l].fn.call(d[l].context, t, r)
                          break
                        case 4:
                          d[l].fn.call(d[l].context, t, r, i)
                          break
                        default:
                          if (!o) for (f = 1, o = new Array(c - 1); f < c; f++) o[f - 1] = arguments[f]
                          d[l].fn.apply(d[l].context, o)
                      }
                  }
                  return !0
                }),
                (o.prototype.on = function (e, t, r) {
                  return n(this, e, t, r, !1)
                }),
                (o.prototype.once = function (e, t, r) {
                  return n(this, e, t, r, !0)
                }),
                (o.prototype.removeListener = function (e, t, r, i) {
                  var a = u ? u + e : e
                  if (!this._events[a]) return this
                  if (!t) return s(this, a), this
                  var n = this._events[a]
                  if (n.fn) n.fn !== t || (i && !n.once) || (r && n.context !== r) || s(this, a)
                  else {
                    for (var o = 0, l = [], d = n.length; o < d; o++)
                      (n[o].fn !== t || (i && !n[o].once) || (r && n[o].context !== r)) && l.push(n[o])
                    l.length ? (this._events[a] = 1 === l.length ? l[0] : l) : s(this, a)
                  }
                  return this
                }),
                (o.prototype.removeAllListeners = function (e) {
                  var t
                  return (
                    e
                      ? ((t = u ? u + e : e), this._events[t] && s(this, t))
                      : ((this._events = new i()), (this._eventsCount = 0)),
                    this
                  )
                }),
                (o.prototype.off = o.prototype.removeListener),
                (o.prototype.addListener = o.prototype.on),
                (o.prefixed = u),
                (o.EventEmitter = o),
                (e.exports = o)
            },
            "./node_modules/url-toolkit/src/url-toolkit.js": function (e, t, r) {
              !(function (t) {
                var r = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/?#]*\/)*[^;?#]*)?(;[^?#]*)?(\?[^#]*)?(#.*)?$/,
                  i = /^([^\/?#]*)(.*)$/,
                  a = /(?:\/|^)\.(?=\/)/g,
                  n = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,
                  s = {
                    buildAbsoluteURL: function (e, t, r) {
                      if (((r = r || {}), (e = e.trim()), !(t = t.trim()))) {
                        if (!r.alwaysNormalize) return e
                        var a = s.parseURL(e)
                        if (!a) throw new Error("Error trying to parse base URL.")
                        return (a.path = s.normalizePath(a.path)), s.buildURLFromParts(a)
                      }
                      var n = s.parseURL(t)
                      if (!n) throw new Error("Error trying to parse relative URL.")
                      if (n.scheme)
                        return r.alwaysNormalize ? ((n.path = s.normalizePath(n.path)), s.buildURLFromParts(n)) : t
                      var o = s.parseURL(e)
                      if (!o) throw new Error("Error trying to parse base URL.")
                      if (!o.netLoc && o.path && "/" !== o.path[0]) {
                        var l = i.exec(o.path)
                        ;(o.netLoc = l[1]), (o.path = l[2])
                      }
                      o.netLoc && !o.path && (o.path = "/")
                      var u = {
                        scheme: o.scheme,
                        netLoc: n.netLoc,
                        path: null,
                        params: n.params,
                        query: n.query,
                        fragment: n.fragment,
                      }
                      if (!n.netLoc && ((u.netLoc = o.netLoc), "/" !== n.path[0]))
                        if (n.path) {
                          var d = o.path,
                            c = d.substring(0, d.lastIndexOf("/") + 1) + n.path
                          u.path = s.normalizePath(c)
                        } else (u.path = o.path), n.params || ((u.params = o.params), n.query || (u.query = o.query))
                      return (
                        null === u.path && (u.path = r.alwaysNormalize ? s.normalizePath(n.path) : n.path),
                        s.buildURLFromParts(u)
                      )
                    },
                    parseURL: function (e) {
                      var t = r.exec(e)
                      return t
                        ? {
                            scheme: t[1] || "",
                            netLoc: t[2] || "",
                            path: t[3] || "",
                            params: t[4] || "",
                            query: t[5] || "",
                            fragment: t[6] || "",
                          }
                        : null
                    },
                    normalizePath: function (e) {
                      for (
                        e = e.split("").reverse().join("").replace(a, "");
                        e.length !== (e = e.replace(n, "")).length;

                      );
                      return e.split("").reverse().join("")
                    },
                    buildURLFromParts: function (e) {
                      return e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment
                    },
                  }
                e.exports = s
              })()
            },
            "./node_modules/webworkify-webpack/index.js": function (e, t, r) {
              function i(e) {
                function t(i) {
                  if (r[i]) return r[i].exports
                  var a = (r[i] = { i: i, l: !1, exports: {} })
                  return e[i].call(a.exports, a, a.exports, t), (a.l = !0), a.exports
                }
                var r = {}
                ;(t.m = e),
                  (t.c = r),
                  (t.i = function (e) {
                    return e
                  }),
                  (t.d = function (e, r, i) {
                    t.o(e, r) || Object.defineProperty(e, r, { configurable: !1, enumerable: !0, get: i })
                  }),
                  (t.r = function (e) {
                    Object.defineProperty(e, "__esModule", { value: !0 })
                  }),
                  (t.n = function (e) {
                    var r =
                      e && e.__esModule
                        ? function () {
                            return e.default
                          }
                        : function () {
                            return e
                          }
                    return t.d(r, "a", r), r
                  }),
                  (t.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                  }),
                  (t.p = "/"),
                  (t.oe = function (e) {
                    throw (console.error(e), e)
                  })
                var i = t((t.s = ENTRY_MODULE))
                return i.default || i
              }
              function a(e) {
                return (e + "").replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
              }
              function n(e) {
                return !isNaN(1 * e)
              }
              function s(e, t, i) {
                var s = {}
                s[i] = []
                var o = t.toString(),
                  l = o.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/)
                if (!l) return s
                for (var c, f = l[1], h = new RegExp("(\\\\n|\\W)" + a(f) + d, "g"); (c = h.exec(o)); )
                  "dll-reference" !== c[3] && s[i].push(c[3])
                for (
                  h = new RegExp("\\(" + a(f) + '\\("(dll-reference\\s(' + u + '))"\\)\\)' + d, "g");
                  (c = h.exec(o));

                )
                  e[c[2]] || (s[i].push(c[1]), (e[c[2]] = r(c[1]).m)), (s[c[2]] = s[c[2]] || []), s[c[2]].push(c[4])
                for (var g = Object.keys(s), p = 0; p < g.length; p++)
                  for (var v = 0; v < s[g[p]].length; v++) n(s[g[p]][v]) && (s[g[p]][v] = 1 * s[g[p]][v])
                return s
              }
              function o(e) {
                return Object.keys(e).reduce(function (t, r) {
                  return t || e[r].length > 0
                }, !1)
              }
              function l(e, t) {
                for (var r = { main: [t] }, i = { main: [] }, a = { main: {} }; o(r); )
                  for (var n = Object.keys(r), l = 0; l < n.length; l++) {
                    var u = n[l],
                      d = r[u],
                      c = d.pop()
                    if (((a[u] = a[u] || {}), !a[u][c] && e[u][c])) {
                      ;(a[u][c] = !0), (i[u] = i[u] || []), i[u].push(c)
                      for (var f = s(e, e[u][c], u), h = Object.keys(f), g = 0; g < h.length; g++)
                        (r[h[g]] = r[h[g]] || []), (r[h[g]] = r[h[g]].concat(f[h[g]]))
                    }
                  }
                return i
              }
              var u = "[\\.|\\-|\\+|\\w|/|@]+",
                d = "\\(\\s*(/\\*.*?\\*/)?\\s*.*?(" + u + ").*?\\)"
              e.exports = function (e, t) {
                t = t || {}
                var a = { main: r.m },
                  n = t.all ? { main: Object.keys(a.main) } : l(a, e),
                  s = ""
                Object.keys(n)
                  .filter(function (e) {
                    return "main" !== e
                  })
                  .forEach(function (e) {
                    for (var t = 0; n[e][t]; ) t++
                    n[e].push(t),
                      (a[e][t] =
                        "(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })"),
                      (s =
                        s +
                        "var " +
                        e +
                        " = (" +
                        i.toString().replace("ENTRY_MODULE", JSON.stringify(t)) +
                        ")({" +
                        n[e]
                          .map(function (t) {
                            return JSON.stringify(t) + ": " + a[e][t].toString()
                          })
                          .join(",") +
                        "});\n")
                  }),
                  (s =
                    s +
                    "new ((" +
                    i.toString().replace("ENTRY_MODULE", JSON.stringify(e)) +
                    ")({" +
                    n.main
                      .map(function (e) {
                        return JSON.stringify(e) + ": " + a.main[e].toString()
                      })
                      .join(",") +
                    "}))(self);")
                var o = new window.Blob([s], { type: "text/javascript" })
                if (t.bare) return o
                var u = window.URL || window.webkitURL || window.mozURL || window.msURL,
                  d = u.createObjectURL(o),
                  c = new window.Worker(d)
                return (c.objectURL = d), c
              }
            },
            "./src/crypt/decrypter.js": function (e, t, r) {
              "use strict"
              function i(e) {
                var t = e.byteLength,
                  r = t && new DataView(e).getUint8(t - 1)
                return r ? e.slice(0, t - r) : e
              }
              r.r(t)
              var a = (function () {
                  function e(e, t) {
                    ;(this.subtle = e), (this.aesIV = t)
                  }
                  return (
                    (e.prototype.decrypt = function (e, t) {
                      return this.subtle.decrypt({ name: "AES-CBC", iv: this.aesIV }, t, e)
                    }),
                    e
                  )
                })(),
                n = (function () {
                  function e(e, t) {
                    ;(this.subtle = e), (this.key = t)
                  }
                  return (
                    (e.prototype.expandKey = function () {
                      return this.subtle.importKey("raw", this.key, { name: "AES-CBC" }, !1, ["encrypt", "decrypt"])
                    }),
                    e
                  )
                })(),
                s = n,
                o = (function () {
                  function e() {
                    ;(this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]),
                      (this.subMix = [
                        new Uint32Array(256),
                        new Uint32Array(256),
                        new Uint32Array(256),
                        new Uint32Array(256),
                      ]),
                      (this.invSubMix = [
                        new Uint32Array(256),
                        new Uint32Array(256),
                        new Uint32Array(256),
                        new Uint32Array(256),
                      ]),
                      (this.sBox = new Uint32Array(256)),
                      (this.invSBox = new Uint32Array(256)),
                      (this.key = new Uint32Array(0)),
                      this.initTable()
                  }
                  var t = e.prototype
                  return (
                    (t.uint8ArrayToUint32Array_ = function (e) {
                      for (var t = new DataView(e), r = new Uint32Array(4), i = 0; i < 4; i++) r[i] = t.getUint32(4 * i)
                      return r
                    }),
                    (t.initTable = function () {
                      var e = this.sBox,
                        t = this.invSBox,
                        r = this.subMix,
                        i = r[0],
                        a = r[1],
                        n = r[2],
                        s = r[3],
                        o = this.invSubMix,
                        l = o[0],
                        u = o[1],
                        d = o[2],
                        c = o[3],
                        f = new Uint32Array(256),
                        h = 0,
                        g = 0,
                        p = 0
                      for (p = 0; p < 256; p++) f[p] = p < 128 ? p << 1 : (p << 1) ^ 283
                      for (p = 0; p < 256; p++) {
                        var v = g ^ (g << 1) ^ (g << 2) ^ (g << 3) ^ (g << 4)
                        ;(v = (v >>> 8) ^ (255 & v) ^ 99), (e[h] = v), (t[v] = h)
                        var m = f[h],
                          y = f[m],
                          E = f[y],
                          T = (257 * f[v]) ^ (16843008 * v)
                        ;(i[h] = (T << 24) | (T >>> 8)),
                          (a[h] = (T << 16) | (T >>> 16)),
                          (n[h] = (T << 8) | (T >>> 24)),
                          (s[h] = T),
                          (T = (16843009 * E) ^ (65537 * y) ^ (257 * m) ^ (16843008 * h)),
                          (l[v] = (T << 24) | (T >>> 8)),
                          (u[v] = (T << 16) | (T >>> 16)),
                          (d[v] = (T << 8) | (T >>> 24)),
                          (c[v] = T),
                          h ? ((h = m ^ f[f[f[E ^ m]]]), (g ^= f[f[g]])) : (h = g = 1)
                      }
                    }),
                    (t.expandKey = function (e) {
                      for (var t = this.uint8ArrayToUint32Array_(e), r = !0, i = 0; i < t.length && r; )
                        (r = t[i] === this.key[i]), i++
                      if (!r) {
                        this.key = t
                        var a = (this.keySize = t.length)
                        if (4 !== a && 6 !== a && 8 !== a) throw new Error("Invalid aes key size=" + a)
                        var n,
                          s,
                          o,
                          l,
                          u = (this.ksRows = 4 * (a + 6 + 1)),
                          d = (this.keySchedule = new Uint32Array(u)),
                          c = (this.invKeySchedule = new Uint32Array(u)),
                          f = this.sBox,
                          h = this.rcon,
                          g = this.invSubMix,
                          p = g[0],
                          v = g[1],
                          m = g[2],
                          y = g[3]
                        for (n = 0; n < u; n++)
                          n < a
                            ? (o = d[n] = t[n])
                            : ((l = o),
                              n % a == 0
                                ? ((l = (l << 8) | (l >>> 24)),
                                  (l =
                                    (f[l >>> 24] << 24) |
                                    (f[(l >>> 16) & 255] << 16) |
                                    (f[(l >>> 8) & 255] << 8) |
                                    f[255 & l]),
                                  (l ^= h[(n / a) | 0] << 24))
                                : a > 6 &&
                                  n % a == 4 &&
                                  (l =
                                    (f[l >>> 24] << 24) |
                                    (f[(l >>> 16) & 255] << 16) |
                                    (f[(l >>> 8) & 255] << 8) |
                                    f[255 & l]),
                              (d[n] = o = (d[n - a] ^ l) >>> 0))
                        for (s = 0; s < u; s++)
                          (n = u - s),
                            (l = 3 & s ? d[n] : d[n - 4]),
                            (c[s] =
                              s < 4 || n <= 4
                                ? l
                                : p[f[l >>> 24]] ^ v[f[(l >>> 16) & 255]] ^ m[f[(l >>> 8) & 255]] ^ y[f[255 & l]]),
                            (c[s] = c[s] >>> 0)
                      }
                    }),
                    (t.networkToHostOrderSwap = function (e) {
                      return (e << 24) | ((65280 & e) << 8) | ((16711680 & e) >> 8) | (e >>> 24)
                    }),
                    (t.decrypt = function (e, t, r, a) {
                      for (
                        var n,
                          s,
                          o,
                          l,
                          u,
                          d,
                          c,
                          f,
                          h,
                          g,
                          p,
                          v,
                          m,
                          y,
                          E = this.keySize + 6,
                          T = this.invKeySchedule,
                          S = this.invSBox,
                          b = this.invSubMix,
                          _ = b[0],
                          A = b[1],
                          R = b[2],
                          D = b[3],
                          L = this.uint8ArrayToUint32Array_(r),
                          k = L[0],
                          w = L[1],
                          I = L[2],
                          O = L[3],
                          C = new Int32Array(e),
                          P = new Int32Array(C.length),
                          x = this.networkToHostOrderSwap;
                        t < C.length;

                      ) {
                        for (
                          h = x(C[t]),
                            g = x(C[t + 1]),
                            p = x(C[t + 2]),
                            v = x(C[t + 3]),
                            u = h ^ T[0],
                            d = v ^ T[1],
                            c = p ^ T[2],
                            f = g ^ T[3],
                            m = 4,
                            y = 1;
                          y < E;
                          y++
                        )
                          (n = _[u >>> 24] ^ A[(d >> 16) & 255] ^ R[(c >> 8) & 255] ^ D[255 & f] ^ T[m]),
                            (s = _[d >>> 24] ^ A[(c >> 16) & 255] ^ R[(f >> 8) & 255] ^ D[255 & u] ^ T[m + 1]),
                            (o = _[c >>> 24] ^ A[(f >> 16) & 255] ^ R[(u >> 8) & 255] ^ D[255 & d] ^ T[m + 2]),
                            (l = _[f >>> 24] ^ A[(u >> 16) & 255] ^ R[(d >> 8) & 255] ^ D[255 & c] ^ T[m + 3]),
                            (u = n),
                            (d = s),
                            (c = o),
                            (f = l),
                            (m += 4)
                        ;(n =
                          (S[u >>> 24] << 24) ^
                          (S[(d >> 16) & 255] << 16) ^
                          (S[(c >> 8) & 255] << 8) ^
                          S[255 & f] ^
                          T[m]),
                          (s =
                            (S[d >>> 24] << 24) ^
                            (S[(c >> 16) & 255] << 16) ^
                            (S[(f >> 8) & 255] << 8) ^
                            S[255 & u] ^
                            T[m + 1]),
                          (o =
                            (S[c >>> 24] << 24) ^
                            (S[(f >> 16) & 255] << 16) ^
                            (S[(u >> 8) & 255] << 8) ^
                            S[255 & d] ^
                            T[m + 2]),
                          (l =
                            (S[f >>> 24] << 24) ^
                            (S[(u >> 16) & 255] << 16) ^
                            (S[(d >> 8) & 255] << 8) ^
                            S[255 & c] ^
                            T[m + 3]),
                          (m += 3),
                          (P[t] = x(n ^ k)),
                          (P[t + 1] = x(l ^ w)),
                          (P[t + 2] = x(o ^ I)),
                          (P[t + 3] = x(s ^ O)),
                          (k = h),
                          (w = g),
                          (I = p),
                          (O = v),
                          (t += 4)
                      }
                      return a ? i(P.buffer) : P.buffer
                    }),
                    (t.destroy = function () {
                      ;(this.key = void 0),
                        (this.keySize = void 0),
                        (this.ksRows = void 0),
                        (this.sBox = void 0),
                        (this.invSBox = void 0),
                        (this.subMix = void 0),
                        (this.invSubMix = void 0),
                        (this.keySchedule = void 0),
                        (this.invKeySchedule = void 0),
                        (this.rcon = void 0)
                    }),
                    e
                  )
                })(),
                l = o,
                u = r("./src/errors.ts"),
                d = r("./src/utils/logger.js"),
                c = r("./src/events.js"),
                f = r("./src/utils/get-self-scope.js"),
                h = Object(f.getSelfScope)(),
                g = (function () {
                  function e(e, t, r) {
                    var i = void 0 === r ? {} : r,
                      a = i.removePKCS7Padding,
                      n = void 0 === a || a
                    if (
                      ((this.logEnabled = !0), (this.observer = e), (this.config = t), (this.removePKCS7Padding = n), n)
                    )
                      try {
                        var s = h.crypto
                        s && (this.subtle = s.subtle || s.webkitSubtle)
                      } catch (e) {}
                    this.disableWebCrypto = !this.subtle
                  }
                  var t = e.prototype
                  return (
                    (t.isSync = function () {
                      return this.disableWebCrypto && this.config.enableSoftwareAES
                    }),
                    (t.decrypt = function (e, t, r, i) {
                      var n = this
                      if (this.disableWebCrypto && this.config.enableSoftwareAES) {
                        this.logEnabled && (d.logger.log("JS AES decrypt"), (this.logEnabled = !1))
                        var o = this.decryptor
                        o || (this.decryptor = o = new l()),
                          o.expandKey(t),
                          i(o.decrypt(e, 0, r, this.removePKCS7Padding))
                      } else {
                        this.logEnabled && (d.logger.log("WebCrypto AES decrypt"), (this.logEnabled = !1))
                        var u = this.subtle
                        this.key !== t && ((this.key = t), (this.fastAesKey = new s(u, t))),
                          this.fastAesKey
                            .expandKey()
                            .then(function (s) {
                              new a(u, r)
                                .decrypt(e, s)
                                .catch(function (a) {
                                  n.onWebCryptoError(a, e, t, r, i)
                                })
                                .then(function (e) {
                                  i(e)
                                })
                            })
                            .catch(function (a) {
                              n.onWebCryptoError(a, e, t, r, i)
                            })
                      }
                    }),
                    (t.onWebCryptoError = function (e, t, r, i, a) {
                      this.config.enableSoftwareAES
                        ? (d.logger.log("WebCrypto Error, disable WebCrypto API"),
                          (this.disableWebCrypto = !0),
                          (this.logEnabled = !0),
                          this.decrypt(t, r, i, a))
                        : (d.logger.error("decrypting error : " + e.message),
                          this.observer.trigger(c.default.ERROR, {
                            type: u.ErrorTypes.MEDIA_ERROR,
                            details: u.ErrorDetails.FRAG_DECRYPT_ERROR,
                            fatal: !0,
                            reason: e.message,
                          }))
                    }),
                    (t.destroy = function () {
                      var e = this.decryptor
                      e && (e.destroy(), (this.decryptor = void 0))
                    }),
                    e
                  )
                })()
              t.default = g
            },
            "./src/demux/demuxer-inline.js": function (e, t, r) {
              "use strict"
              function i(e, t, r, i) {
                var a,
                  n,
                  s,
                  o,
                  l,
                  u = navigator.userAgent.toLowerCase(),
                  d = i,
                  c = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350]
                return (
                  (a = 1 + ((192 & t[r + 2]) >>> 6)),
                  (n = (60 & t[r + 2]) >>> 2) > c.length - 1
                    ? void e.trigger(y.default.ERROR, {
                        type: E.ErrorTypes.MEDIA_ERROR,
                        details: E.ErrorDetails.FRAG_PARSING_ERROR,
                        fatal: !0,
                        reason: "invalid ADTS sampling index:" + n,
                      })
                    : ((o = (1 & t[r + 2]) << 2),
                      (o |= (192 & t[r + 3]) >>> 6),
                      b.logger.log(
                        "manifest codec:" +
                          i +
                          ",ADTS data:type:" +
                          a +
                          ",sampleingIndex:" +
                          n +
                          "[" +
                          c[n] +
                          "Hz],channelConfig:" +
                          o
                      ),
                      /firefox/i.test(u)
                        ? n >= 6
                          ? ((a = 5), (l = new Array(4)), (s = n - 3))
                          : ((a = 2), (l = new Array(2)), (s = n))
                        : -1 !== u.indexOf("android")
                        ? ((a = 2), (l = new Array(2)), (s = n))
                        : ((a = 5),
                          (l = new Array(4)),
                          (i && (-1 !== i.indexOf("mp4a.40.29") || -1 !== i.indexOf("mp4a.40.5"))) || (!i && n >= 6)
                            ? (s = n - 3)
                            : (((i && -1 !== i.indexOf("mp4a.40.2") && ((n >= 6 && 1 === o) || /vivaldi/i.test(u))) ||
                                (!i && 1 === o)) &&
                                ((a = 2), (l = new Array(2))),
                              (s = n))),
                      (l[0] = a << 3),
                      (l[0] |= (14 & n) >> 1),
                      (l[1] |= (1 & n) << 7),
                      (l[1] |= o << 3),
                      5 === a && ((l[1] |= (14 & s) >> 1), (l[2] = (1 & s) << 7), (l[2] |= 8), (l[3] = 0)),
                      { config: l, samplerate: c[n], channelCount: o, codec: "mp4a.40." + a, manifestCodec: d })
                )
              }
              function a(e, t) {
                return 255 === e[t] && 240 == (246 & e[t + 1])
              }
              function n(e, t) {
                return 1 & e[t + 1] ? 7 : 9
              }
              function s(e, t) {
                return ((3 & e[t + 3]) << 11) | (e[t + 4] << 3) | ((224 & e[t + 5]) >>> 5)
              }
              function o(e, t) {
                return !!(t + 1 < e.length && a(e, t))
              }
              function l(e, t) {
                if (o(e, t)) {
                  var r = n(e, t)
                  if (t + r >= e.length) return !1
                  var i = s(e, t)
                  if (i <= r) return !1
                  var l = t + i
                  if (l === e.length || (l + 1 < e.length && a(e, l))) return !0
                }
                return !1
              }
              function u(e, t, r, a, n) {
                if (!e.samplerate) {
                  var s = i(t, r, a, n)
                  ;(e.config = s.config),
                    (e.samplerate = s.samplerate),
                    (e.channelCount = s.channelCount),
                    (e.codec = s.codec),
                    (e.manifestCodec = s.manifestCodec),
                    b.logger.log("parsed codec:" + e.codec + ",rate:" + s.samplerate + ",nb channel:" + s.channelCount)
                }
              }
              function d(e) {
                return 9216e4 / e
              }
              function c(e, t, r, i, a) {
                var o,
                  l,
                  u,
                  d = e.length
                if (((o = n(e, t)), (l = s(e, t)), (l -= o) > 0 && t + o + l <= d))
                  return (u = r + i * a), { headerLength: o, frameLength: l, stamp: u }
              }
              function f(e, t, r, i, a) {
                var n = d(e.samplerate),
                  s = c(t, r, i, a, n)
                if (s) {
                  var o = s.stamp,
                    l = s.headerLength,
                    u = s.frameLength,
                    f = { unit: t.subarray(r + l, r + l + u), pts: o, dts: o }
                  return e.samples.push(f), { sample: f, length: u + l }
                }
              }
              function h(e, t, r, i) {
                void 0 === r && (r = 1), void 0 === i && (i = !1)
                var a = e * t * r
                return i ? Math.round(a) : a
              }
              function g(e, t) {
                return void 0 === t && (t = !1), h(e, 1e3, 1 / V, t)
              }
              function p(e, t) {
                return void 0 === t && (t = 1), h(e, V, 1 / t)
              }
              function v(e, t) {
                var r
                if (void 0 === t) return e
                for (r = t < e ? -8589934592 : 8589934592; Math.abs(e - t) > 4294967296; ) e += r
                return e
              }
              r.r(t)
              var m,
                y = r("./src/events.js"),
                E = r("./src/errors.ts"),
                T = r("./src/crypt/decrypter.js"),
                S = r("./src/polyfills/number.js"),
                b = r("./src/utils/logger.js"),
                _ = r("./src/utils/get-self-scope.js"),
                A = r("./src/demux/id3.js"),
                R = (function () {
                  function e(e, t, r) {
                    ;(this.observer = e), (this.config = r), (this.remuxer = t)
                  }
                  var t = e.prototype
                  return (
                    (t.resetInitSegment = function (e, t, r, i) {
                      this._audioTrack = {
                        container: "audio/adts",
                        type: "audio",
                        id: 0,
                        sequenceNumber: 0,
                        isAAC: !0,
                        samples: [],
                        len: 0,
                        manifestCodec: t,
                        duration: i,
                        inputTimeScale: 9e4,
                      }
                    }),
                    (t.resetTimeStamp = function () {}),
                    (e.probe = function (e) {
                      if (!e) return !1
                      for (var t = A.default.getID3Data(e, 0) || [], r = t.length, i = e.length; r < i; r++)
                        if (l(e, r)) return b.logger.log("ADTS sync word found !"), !0
                      return !1
                    }),
                    (t.append = function (e, t, r, i) {
                      for (
                        var a = this._audioTrack,
                          n = A.default.getID3Data(e, 0) || [],
                          s = A.default.getTimeStamp(n),
                          l = Object(S.isFiniteNumber)(s) ? 90 * s : 9e4 * t,
                          d = 0,
                          c = l,
                          h = e.length,
                          g = n.length,
                          p = [{ pts: c, dts: c, data: n }];
                        g < h - 1;

                      )
                        if (o(e, g) && g + 5 < h) {
                          u(a, this.observer, e, g, a.manifestCodec)
                          var v = f(a, e, g, l, d)
                          if (!v) {
                            b.logger.log("Unable to parse AAC frame")
                            break
                          }
                          ;(g += v.length), (c = v.sample.pts), d++
                        } else
                          A.default.isHeader(e, g)
                            ? ((n = A.default.getID3Data(e, g)), p.push({ pts: c, dts: c, data: n }), (g += n.length))
                            : g++
                      this.remuxer.remux(
                        a,
                        { samples: [] },
                        { samples: p, inputTimeScale: 9e4 },
                        { samples: [] },
                        t,
                        r,
                        i
                      )
                    }),
                    (t.destroy = function () {}),
                    e
                  )
                })(),
                D = R,
                L = r("./src/demux/mp4demuxer.js"),
                k = {
                  BitratesMap: [
                    32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128,
                    160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48,
                    56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112,
                    128, 144, 160,
                  ],
                  SamplingRateMap: [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3],
                  SamplesCoefficients: [
                    [0, 72, 144, 12],
                    [0, 0, 0, 0],
                    [0, 72, 144, 12],
                    [0, 144, 144, 12],
                  ],
                  BytesInSlot: [0, 1, 1, 4],
                  appendFrame: function (e, t, r, i, a) {
                    if (!(r + 24 > t.length)) {
                      var n = this.parseHeader(t, r)
                      if (n && r + n.frameLength <= t.length) {
                        var s = (9e4 * n.samplesPerFrame) / n.sampleRate,
                          o = i + a * s,
                          l = { unit: t.subarray(r, r + n.frameLength), pts: o, dts: o }
                        return (
                          (e.config = []),
                          (e.channelCount = n.channelCount),
                          (e.samplerate = n.sampleRate),
                          e.samples.push(l),
                          { sample: l, length: n.frameLength }
                        )
                      }
                    }
                  },
                  parseHeader: function (e, t) {
                    var r = (e[t + 1] >> 3) & 3,
                      i = (e[t + 1] >> 1) & 3,
                      a = (e[t + 2] >> 4) & 15,
                      n = (e[t + 2] >> 2) & 3,
                      s = (e[t + 2] >> 1) & 1
                    if (1 !== r && 0 !== a && 15 !== a && 3 !== n) {
                      var o = 3 === r ? 3 - i : 3 === i ? 3 : 4,
                        l = 1e3 * k.BitratesMap[14 * o + a - 1],
                        u = 3 === r ? 0 : 2 === r ? 1 : 2,
                        d = k.SamplingRateMap[3 * u + n],
                        c = e[t + 3] >> 6 == 3 ? 1 : 2,
                        f = k.SamplesCoefficients[r][i],
                        h = k.BytesInSlot[i],
                        g = 8 * f * h
                      return {
                        sampleRate: d,
                        channelCount: c,
                        frameLength: parseInt((f * l) / d + s, 10) * h,
                        samplesPerFrame: g,
                      }
                    }
                  },
                  isHeaderPattern: function (e, t) {
                    return 255 === e[t] && 224 == (224 & e[t + 1]) && 0 != (6 & e[t + 1])
                  },
                  isHeader: function (e, t) {
                    return !!(t + 1 < e.length && this.isHeaderPattern(e, t))
                  },
                  probe: function (e, t) {
                    if (t + 1 < e.length && this.isHeaderPattern(e, t)) {
                      var r = this.parseHeader(e, t),
                        i = 4
                      r && r.frameLength && (i = r.frameLength)
                      var a = t + i
                      if (a === e.length || (a + 1 < e.length && this.isHeaderPattern(e, a))) return !0
                    }
                    return !1
                  },
                },
                w = k,
                I = (function () {
                  function e(e) {
                    ;(this.data = e), (this.bytesAvailable = e.byteLength), (this.word = 0), (this.bitsAvailable = 0)
                  }
                  var t = e.prototype
                  return (
                    (t.loadWord = function () {
                      var e = this.data,
                        t = this.bytesAvailable,
                        r = e.byteLength - t,
                        i = new Uint8Array(4),
                        a = Math.min(4, t)
                      if (0 === a) throw new Error("no bytes available")
                      i.set(e.subarray(r, r + a)),
                        (this.word = new DataView(i.buffer).getUint32(0)),
                        (this.bitsAvailable = 8 * a),
                        (this.bytesAvailable -= a)
                    }),
                    (t.skipBits = function (e) {
                      var t
                      this.bitsAvailable > e
                        ? ((this.word <<= e), (this.bitsAvailable -= e))
                        : ((e -= this.bitsAvailable),
                          (t = e >> 3),
                          (e -= t >> 3),
                          (this.bytesAvailable -= t),
                          this.loadWord(),
                          (this.word <<= e),
                          (this.bitsAvailable -= e))
                    }),
                    (t.readBits = function (e) {
                      var t = Math.min(this.bitsAvailable, e),
                        r = this.word >>> (32 - t)
                      return (
                        e > 32 && b.logger.error("Cannot read more than 32 bits at a time"),
                        (this.bitsAvailable -= t),
                        this.bitsAvailable > 0 ? (this.word <<= t) : this.bytesAvailable > 0 && this.loadWord(),
                        (t = e - t),
                        t > 0 && this.bitsAvailable ? (r << t) | this.readBits(t) : r
                      )
                    }),
                    (t.skipLZ = function () {
                      var e
                      for (e = 0; e < this.bitsAvailable; ++e)
                        if (0 != (this.word & (2147483648 >>> e)))
                          return (this.word <<= e), (this.bitsAvailable -= e), e
                      return this.loadWord(), e + this.skipLZ()
                    }),
                    (t.skipUEG = function () {
                      this.skipBits(1 + this.skipLZ())
                    }),
                    (t.skipEG = function () {
                      this.skipBits(1 + this.skipLZ())
                    }),
                    (t.readUEG = function () {
                      var e = this.skipLZ()
                      return this.readBits(e + 1) - 1
                    }),
                    (t.readEG = function () {
                      var e = this.readUEG()
                      return 1 & e ? (1 + e) >>> 1 : -1 * (e >>> 1)
                    }),
                    (t.readBoolean = function () {
                      return 1 === this.readBits(1)
                    }),
                    (t.readUByte = function () {
                      return this.readBits(8)
                    }),
                    (t.readUShort = function () {
                      return this.readBits(16)
                    }),
                    (t.readUInt = function () {
                      return this.readBits(32)
                    }),
                    (t.skipScalingList = function (e) {
                      var t,
                        r,
                        i = 8,
                        a = 8
                      for (t = 0; t < e; t++)
                        0 !== a && ((r = this.readEG()), (a = (i + r + 256) % 256)), (i = 0 === a ? i : a)
                    }),
                    (t.readSPS = function () {
                      var e,
                        t,
                        r,
                        i,
                        a,
                        n,
                        s,
                        o = 0,
                        l = 0,
                        u = 0,
                        d = 0,
                        c = this.readUByte.bind(this),
                        f = this.readBits.bind(this),
                        h = this.readUEG.bind(this),
                        g = this.readBoolean.bind(this),
                        p = this.skipBits.bind(this),
                        v = this.skipEG.bind(this),
                        m = this.skipUEG.bind(this),
                        y = this.skipScalingList.bind(this)
                      if (
                        (c(),
                        (e = c()),
                        f(5),
                        p(3),
                        c(),
                        m(),
                        100 === e ||
                          110 === e ||
                          122 === e ||
                          244 === e ||
                          44 === e ||
                          83 === e ||
                          86 === e ||
                          118 === e ||
                          128 === e)
                      ) {
                        var E = h()
                        if ((3 === E && p(1), m(), m(), p(1), g()))
                          for (n = 3 !== E ? 8 : 12, s = 0; s < n; s++) g() && y(s < 6 ? 16 : 64)
                      }
                      m()
                      var T = h()
                      if (0 === T) h()
                      else if (1 === T) for (p(1), v(), v(), t = h(), s = 0; s < t; s++) v()
                      m(),
                        p(1),
                        (r = h()),
                        (i = h()),
                        (a = f(1)),
                        0 === a && p(1),
                        p(1),
                        g() && ((o = h()), (l = h()), (u = h()), (d = h()))
                      var S = [1, 1]
                      if (g() && g()) {
                        switch (c()) {
                          case 1:
                            S = [1, 1]
                            break
                          case 2:
                            S = [12, 11]
                            break
                          case 3:
                            S = [10, 11]
                            break
                          case 4:
                            S = [16, 11]
                            break
                          case 5:
                            S = [40, 33]
                            break
                          case 6:
                            S = [24, 11]
                            break
                          case 7:
                            S = [20, 11]
                            break
                          case 8:
                            S = [32, 11]
                            break
                          case 9:
                            S = [80, 33]
                            break
                          case 10:
                            S = [18, 11]
                            break
                          case 11:
                            S = [15, 11]
                            break
                          case 12:
                            S = [64, 33]
                            break
                          case 13:
                            S = [160, 99]
                            break
                          case 14:
                            S = [4, 3]
                            break
                          case 15:
                            S = [3, 2]
                            break
                          case 16:
                            S = [2, 1]
                            break
                          case 255:
                            S = [(c() << 8) | c(), (c() << 8) | c()]
                        }
                      }
                      return {
                        width: Math.ceil(16 * (r + 1) - 2 * o - 2 * l),
                        height: (2 - a) * (i + 1) * 16 - (a ? 2 : 4) * (u + d),
                        pixelRatio: S,
                      }
                    }),
                    (t.readSliceType = function () {
                      return this.readUByte(), this.readUEG(), this.readUEG()
                    }),
                    e
                  )
                })(),
                O = I,
                C = (function () {
                  function e(e, t, r, i) {
                    ;(this.decryptdata = r),
                      (this.discardEPB = i),
                      (this.decrypter = new T.default(e, t, { removePKCS7Padding: !1 }))
                  }
                  var t = e.prototype
                  return (
                    (t.decryptBuffer = function (e, t) {
                      this.decrypter.decrypt(e, this.decryptdata.key.buffer, this.decryptdata.iv.buffer, t)
                    }),
                    (t.decryptAacSample = function (e, t, r, i) {
                      var a = e[t].unit,
                        n = a.subarray(16, a.length - (a.length % 16)),
                        s = n.buffer.slice(n.byteOffset, n.byteOffset + n.length),
                        o = this
                      this.decryptBuffer(s, function (n) {
                        ;(n = new Uint8Array(n)), a.set(n, 16), i || o.decryptAacSamples(e, t + 1, r)
                      })
                    }),
                    (t.decryptAacSamples = function (e, t, r) {
                      for (; ; t++) {
                        if (t >= e.length) return void r()
                        if (!(e[t].unit.length < 32)) {
                          var i = this.decrypter.isSync()
                          if ((this.decryptAacSample(e, t, r, i), !i)) return
                        }
                      }
                    }),
                    (t.getAvcEncryptedData = function (e) {
                      for (
                        var t = 16 * Math.floor((e.length - 48) / 160) + 16, r = new Int8Array(t), i = 0, a = 32;
                        a <= e.length - 16;
                        a += 160, i += 16
                      )
                        r.set(e.subarray(a, a + 16), i)
                      return r
                    }),
                    (t.getAvcDecryptedUnit = function (e, t) {
                      t = new Uint8Array(t)
                      for (var r = 0, i = 32; i <= e.length - 16; i += 160, r += 16) e.set(t.subarray(r, r + 16), i)
                      return e
                    }),
                    (t.decryptAvcSample = function (e, t, r, i, a, n) {
                      var s = this.discardEPB(a.data),
                        o = this.getAvcEncryptedData(s),
                        l = this
                      this.decryptBuffer(o.buffer, function (o) {
                        ;(a.data = l.getAvcDecryptedUnit(s, o)), n || l.decryptAvcSamples(e, t, r + 1, i)
                      })
                    }),
                    (t.decryptAvcSamples = function (e, t, r, i) {
                      for (; ; t++, r = 0) {
                        if (t >= e.length) return void i()
                        for (var a = e[t].units; !(r >= a.length); r++) {
                          var n = a[r]
                          if (!(n.data.length <= 48 || (1 !== n.type && 5 !== n.type))) {
                            var s = this.decrypter.isSync()
                            if ((this.decryptAvcSample(e, t, r, i, n, s), !s)) return
                          }
                        }
                      }
                    }),
                    e
                  )
                })(),
                P = C,
                x = { video: 1, audio: 2, id3: 3, text: 4 },
                F = (function () {
                  function e(e, t, r, i) {
                    ;(this.observer = e),
                      (this.config = r),
                      (this.typeSupported = i),
                      (this.remuxer = t),
                      (this.sampleAes = null),
                      (this.pmtUnknownTypes = {})
                  }
                  var t = e.prototype
                  return (
                    (t.setDecryptData = function (e) {
                      null != e && null != e.key && "SAMPLE-AES" === e.method
                        ? (this.sampleAes = new P(this.observer, this.config, e, this.discardEPB))
                        : (this.sampleAes = null)
                    }),
                    (e.probe = function (t) {
                      var r = e._syncOffset(t)
                      return (
                        !(r < 0) &&
                        (r &&
                          b.logger.warn("MPEG2-TS detected but first sync word found @ offset " + r + ", junk ahead ?"),
                        !0)
                      )
                    }),
                    (e._syncOffset = function (e) {
                      for (var t = Math.min(1e3, e.length - 564), r = 0; r < t; ) {
                        if (71 === e[r] && 71 === e[r + 188] && 71 === e[r + 376]) return r
                        r++
                      }
                      return -1
                    }),
                    (e.createTrack = function (e, t) {
                      return {
                        container: "video" === e || "audio" === e ? "video/mp2t" : void 0,
                        type: e,
                        id: x[e],
                        pid: -1,
                        inputTimeScale: 9e4,
                        sequenceNumber: 0,
                        samples: [],
                        dropped: "video" === e ? 0 : void 0,
                        isAAC: "audio" === e || void 0,
                        duration: "audio" === e ? t : void 0,
                      }
                    }),
                    (t.resetInitSegment = function (t, r, i, a) {
                      ;(this.pmtParsed = !1),
                        (this._pmtId = -1),
                        (this.pmtUnknownTypes = {}),
                        (this._avcTrack = e.createTrack("video", a)),
                        (this._audioTrack = e.createTrack("audio", a)),
                        (this._id3Track = e.createTrack("id3", a)),
                        (this._txtTrack = e.createTrack("text", a)),
                        (this.aacOverFlow = null),
                        (this.aacLastPTS = null),
                        (this.avcSample = null),
                        (this.audioCodec = r),
                        (this.videoCodec = i),
                        (this._duration = a)
                    }),
                    (t.resetTimeStamp = function () {}),
                    (t.append = function (t, r, i, a) {
                      var n,
                        s,
                        o,
                        l,
                        u,
                        d = t.length,
                        c = !1
                      ;(this.pmtUnknownTypes = {}), (this.contiguous = i)
                      var f = this.pmtParsed,
                        h = this._avcTrack,
                        g = this._audioTrack,
                        p = this._id3Track,
                        v = h.pid,
                        m = g.pid,
                        T = p.pid,
                        S = this._pmtId,
                        _ = h.pesData,
                        A = g.pesData,
                        R = p.pesData,
                        D = this._parsePAT,
                        L = this._parsePMT.bind(this),
                        k = this._parsePES,
                        w = this._parseAVCPES.bind(this),
                        I = this._parseAACPES.bind(this),
                        O = this._parseMPEGPES.bind(this),
                        C = this._parseID3PES.bind(this),
                        P = e._syncOffset(t)
                      for (d -= (d + P) % 188, n = P; n < d; n += 188)
                        if (71 === t[n]) {
                          if (
                            ((s = !!(64 & t[n + 1])), (o = ((31 & t[n + 1]) << 8) + t[n + 2]), (48 & t[n + 3]) >> 4 > 1)
                          ) {
                            if ((l = n + 5 + t[n + 4]) === n + 188) continue
                          } else l = n + 4
                          switch (o) {
                            case v:
                              s && (_ && (u = k(_)) && w(u, !1), (_ = { data: [], size: 0 })),
                                _ && (_.data.push(t.subarray(l, n + 188)), (_.size += n + 188 - l))
                              break
                            case m:
                              s && (A && (u = k(A)) && (g.isAAC ? I(u) : O(u)), (A = { data: [], size: 0 })),
                                A && (A.data.push(t.subarray(l, n + 188)), (A.size += n + 188 - l))
                              break
                            case T:
                              s && (R && (u = k(R)) && C(u), (R = { data: [], size: 0 })),
                                R && (R.data.push(t.subarray(l, n + 188)), (R.size += n + 188 - l))
                              break
                            case 0:
                              s && (l += t[l] + 1), (S = this._pmtId = D(t, l))
                              break
                            case S:
                              s && (l += t[l] + 1)
                              var x = L(
                                t,
                                l,
                                !0 === this.typeSupported.mpeg || !0 === this.typeSupported.mp3,
                                null != this.sampleAes
                              )
                              ;(v = x.avc),
                                v > 0 && (h.pid = v),
                                (m = x.audio),
                                m > 0 && ((g.pid = m), (g.isAAC = x.isAAC)),
                                (T = x.id3),
                                T > 0 && (p.pid = T),
                                c && !f && (b.logger.log("reparse from beginning"), (c = !1), (n = P - 188)),
                                (f = this.pmtParsed = !0)
                              break
                            case 17:
                            case 8191:
                              break
                            default:
                              c = !0
                          }
                        } else
                          this.observer.trigger(y.default.ERROR, {
                            type: E.ErrorTypes.MEDIA_ERROR,
                            details: E.ErrorDetails.FRAG_PARSING_ERROR,
                            fatal: !1,
                            reason: "TS packet did not start with 0x47",
                          })
                      _ && (u = k(_)) ? (w(u, !0), (h.pesData = null)) : (h.pesData = _),
                        A && (u = k(A))
                          ? (g.isAAC ? I(u) : O(u), (g.pesData = null))
                          : (A &&
                              A.size &&
                              b.logger.log("last AAC PES packet truncated,might overlap between fragments"),
                            (g.pesData = A)),
                        R && (u = k(R)) ? (C(u), (p.pesData = null)) : (p.pesData = R),
                        null == this.sampleAes
                          ? this.remuxer.remux(g, h, p, this._txtTrack, r, i, a)
                          : this.decryptAndRemux(g, h, p, this._txtTrack, r, i, a)
                    }),
                    (t.decryptAndRemux = function (e, t, r, i, a, n, s) {
                      if (e.samples && e.isAAC) {
                        var o = this
                        this.sampleAes.decryptAacSamples(e.samples, 0, function () {
                          o.decryptAndRemuxAvc(e, t, r, i, a, n, s)
                        })
                      } else this.decryptAndRemuxAvc(e, t, r, i, a, n, s)
                    }),
                    (t.decryptAndRemuxAvc = function (e, t, r, i, a, n, s) {
                      if (t.samples) {
                        var o = this
                        this.sampleAes.decryptAvcSamples(t.samples, 0, 0, function () {
                          o.remuxer.remux(e, t, r, i, a, n, s)
                        })
                      } else this.remuxer.remux(e, t, r, i, a, n, s)
                    }),
                    (t.destroy = function () {
                      ;(this._initPTS = this._initDTS = void 0), (this._duration = 0)
                    }),
                    (t._parsePAT = function (e, t) {
                      return ((31 & e[t + 10]) << 8) | e[t + 11]
                    }),
                    (t._trackUnknownPmt = function (e, t, r) {
                      var i = this.pmtUnknownTypes[e] || 0
                      return (
                        0 === i && ((this.pmtUnknownTypes[e] = 0), t.call(b.logger, r)), this.pmtUnknownTypes[e]++, i
                      )
                    }),
                    (t._parsePMT = function (e, t, r, i) {
                      var a,
                        n,
                        s,
                        o,
                        l = { audio: -1, avc: -1, id3: -1, isAAC: !0 }
                      for (
                        a = ((15 & e[t + 1]) << 8) | e[t + 2],
                          n = t + 3 + a - 4,
                          s = ((15 & e[t + 10]) << 8) | e[t + 11],
                          t += 12 + s;
                        t < n;

                      ) {
                        switch (((o = ((31 & e[t + 1]) << 8) | e[t + 2]), e[t])) {
                          case 207:
                            if (!i) {
                              this._trackUnknownPmt(
                                e[t],
                                b.logger.warn,
                                "ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream"
                              )
                              break
                            }
                          case 15:
                            ;-1 === l.audio && (l.audio = o)
                            break
                          case 21:
                            ;-1 === l.id3 && (l.id3 = o)
                            break
                          case 219:
                            if (!i) {
                              this._trackUnknownPmt(
                                e[t],
                                b.logger.warn,
                                "H.264 with AES-128-CBC slice encryption found in unencrypted stream"
                              )
                              break
                            }
                          case 27:
                            ;-1 === l.avc && (l.avc = o)
                            break
                          case 3:
                          case 4:
                            r
                              ? -1 === l.audio && ((l.audio = o), (l.isAAC = !1))
                              : this._trackUnknownPmt(
                                  e[t],
                                  b.logger.warn,
                                  "MPEG audio found, not supported in this browser"
                                )
                            break
                          case 36:
                            this._trackUnknownPmt(e[t], b.logger.warn, "Unsupported HEVC stream type found")
                            break
                          default:
                            this._trackUnknownPmt(e[t], b.logger.log, "Unknown stream type:" + e[t])
                        }
                        t += 5 + (((15 & e[t + 3]) << 8) | e[t + 4])
                      }
                      return l
                    }),
                    (t._parsePES = function (e) {
                      var t,
                        r,
                        i,
                        a,
                        n,
                        s,
                        o,
                        l,
                        u = 0,
                        d = e.data
                      if (!e || 0 === e.size) return null
                      for (; d[0].length < 19 && d.length > 1; ) {
                        var c = new Uint8Array(d[0].length + d[1].length)
                        c.set(d[0]), c.set(d[1], d[0].length), (d[0] = c), d.splice(1, 1)
                      }
                      if (((t = d[0]), 1 === (t[0] << 16) + (t[1] << 8) + t[2])) {
                        if ((i = (t[4] << 8) + t[5]) && i > e.size - 6) return null
                        if (
                          ((r = t[7]),
                          192 & r &&
                            ((s =
                              536870912 * (14 & t[9]) +
                              4194304 * (255 & t[10]) +
                              16384 * (254 & t[11]) +
                              128 * (255 & t[12]) +
                              (254 & t[13]) / 2),
                            64 & r
                              ? ((o =
                                  536870912 * (14 & t[14]) +
                                  4194304 * (255 & t[15]) +
                                  16384 * (254 & t[16]) +
                                  128 * (255 & t[17]) +
                                  (254 & t[18]) / 2),
                                s - o > 54e5 &&
                                  (b.logger.warn(Math.round((s - o) / 9e4) + "s delta between PTS and DTS, align them"),
                                  (s = o)))
                              : (o = s)),
                          (a = t[8]),
                          (l = a + 9),
                          e.size <= l)
                        )
                          return null
                        ;(e.size -= l), (n = new Uint8Array(e.size))
                        for (var f = 0, h = d.length; f < h; f++) {
                          t = d[f]
                          var g = t.byteLength
                          if (l) {
                            if (l > g) {
                              l -= g
                              continue
                            }
                            ;(t = t.subarray(l)), (g -= l), (l = 0)
                          }
                          n.set(t, u), (u += g)
                        }
                        return i && (i -= a + 3), { data: n, pts: s, dts: o, len: i }
                      }
                      return null
                    }),
                    (t.pushAccesUnit = function (e, t) {
                      if (e.units.length && e.frame) {
                        var r = t.samples,
                          i = r.length
                        if (isNaN(e.pts)) {
                          if (!i) return void t.dropped++
                          var a = r[i - 1]
                          ;(e.pts = a.pts), (e.dts = a.dts)
                        }
                        !this.config.forceKeyFrameOnDiscontinuity || !0 === e.key || (t.sps && (i || this.contiguous))
                          ? ((e.id = i), r.push(e))
                          : t.dropped++
                      }
                      e.debug.length && b.logger.log(e.pts + "/" + e.dts + ":" + e.debug)
                    }),
                    (t._parseAVCPES = function (e, t) {
                      var r,
                        i,
                        a,
                        n = this,
                        s = this._avcTrack,
                        o = this._parseAVCNALu(e.data),
                        l = this.avcSample,
                        u = !1,
                        d = this.pushAccesUnit.bind(this),
                        c = function (e, t, r, i) {
                          return { key: e, pts: t, dts: r, units: [], debug: i }
                        }
                      ;(e.data = null),
                        l && o.length && !s.audFound && (d(l, s), (l = this.avcSample = c(!1, e.pts, e.dts, ""))),
                        o.forEach(function (t) {
                          switch (t.type) {
                            case 1:
                              ;(i = !0), l || (l = n.avcSample = c(!0, e.pts, e.dts, "")), (l.frame = !0)
                              var o = t.data
                              if (u && o.length > 4) {
                                var f = new O(o).readSliceType()
                                ;(2 !== f && 4 !== f && 7 !== f && 9 !== f) || (l.key = !0)
                              }
                              break
                            case 5:
                              ;(i = !0), l || (l = n.avcSample = c(!0, e.pts, e.dts, "")), (l.key = !0), (l.frame = !0)
                              break
                            case 6:
                              ;(i = !0), (r = new O(n.discardEPB(t.data))), r.readUByte()
                              for (var h = 0, g = 0, p = !1, v = 0; !p && r.bytesAvailable > 1; ) {
                                h = 0
                                do {
                                  ;(v = r.readUByte()), (h += v)
                                } while (255 === v)
                                g = 0
                                do {
                                  ;(v = r.readUByte()), (g += v)
                                } while (255 === v)
                                if (4 === h && 0 !== r.bytesAvailable) {
                                  p = !0
                                  if (181 === r.readUByte()) {
                                    if (49 === r.readUShort()) {
                                      if (1195456820 === r.readUInt()) {
                                        if (3 === r.readUByte()) {
                                          var m = r.readUByte(),
                                            y = r.readUByte(),
                                            E = 31 & m,
                                            T = [m, y]
                                          for (a = 0; a < E; a++)
                                            T.push(r.readUByte()), T.push(r.readUByte()), T.push(r.readUByte())
                                          n._insertSampleInOrder(n._txtTrack.samples, { type: 3, pts: e.pts, bytes: T })
                                        }
                                      }
                                    }
                                  }
                                } else if (5 === h && 0 !== r.bytesAvailable) {
                                  if (((p = !0), g > 16)) {
                                    var S = []
                                    for (a = 0; a < 16; a++)
                                      S.push(r.readUByte().toString(16)),
                                        (3 !== a && 5 !== a && 7 !== a && 9 !== a) || S.push("-")
                                    var b = g - 16,
                                      _ = new Uint8Array(b)
                                    for (a = 0; a < b; a++) _[a] = r.readUByte()
                                    n._insertSampleInOrder(n._txtTrack.samples, {
                                      pts: e.pts,
                                      payloadType: h,
                                      uuid: S.join(""),
                                      userDataBytes: _,
                                      userData: Object(A.utf8ArrayToStr)(_.buffer),
                                    })
                                  }
                                } else if (g < r.bytesAvailable) for (a = 0; a < g; a++) r.readUByte()
                              }
                              break
                            case 7:
                              if (((i = !0), (u = !0), !s.sps)) {
                                r = new O(t.data)
                                var R = r.readSPS()
                                ;(s.width = R.width),
                                  (s.height = R.height),
                                  (s.pixelRatio = R.pixelRatio),
                                  (s.sps = [t.data]),
                                  (s.duration = n._duration)
                                var D = t.data.subarray(1, 4),
                                  L = "avc1."
                                for (a = 0; a < 3; a++) {
                                  var k = D[a].toString(16)
                                  k.length < 2 && (k = "0" + k), (L += k)
                                }
                                s.codec = L
                              }
                              break
                            case 8:
                              ;(i = !0), s.pps || (s.pps = [t.data])
                              break
                            case 9:
                              ;(i = !1), (s.audFound = !0), l && d(l, s), (l = n.avcSample = c(!1, e.pts, e.dts, ""))
                              break
                            case 12:
                              i = !1
                              break
                            default:
                              ;(i = !1), l && (l.debug += "unknown NAL " + t.type + " ")
                          }
                          if (l && i) {
                            l.units.push(t)
                          }
                        }),
                        t && l && (d(l, s), (this.avcSample = null))
                    }),
                    (t._insertSampleInOrder = function (e, t) {
                      var r = e.length
                      if (r > 0) {
                        if (t.pts >= e[r - 1].pts) e.push(t)
                        else
                          for (var i = r - 1; i >= 0; i--)
                            if (t.pts < e[i].pts) {
                              e.splice(i, 0, t)
                              break
                            }
                      } else e.push(t)
                    }),
                    (t._getLastNalUnit = function () {
                      var e,
                        t = this.avcSample
                      if (!t || 0 === t.units.length) {
                        var r = this._avcTrack,
                          i = r.samples
                        t = i[i.length - 1]
                      }
                      if (t) {
                        var a = t.units
                        e = a[a.length - 1]
                      }
                      return e
                    }),
                    (t._parseAVCNALu = function (e) {
                      var t,
                        r,
                        i,
                        a,
                        n,
                        s = 0,
                        o = e.byteLength,
                        l = this._avcTrack,
                        u = l.naluState || 0,
                        d = u,
                        c = [],
                        f = -1
                      for (-1 === u && ((f = 0), (n = 31 & e[0]), (u = 0), (s = 1)); s < o; )
                        if (((t = e[s++]), u))
                          if (1 !== u)
                            if (t)
                              if (1 === t) {
                                if (f >= 0) (i = { data: e.subarray(f, s - u - 1), type: n }), c.push(i)
                                else {
                                  var h = this._getLastNalUnit()
                                  if (
                                    h &&
                                    (d && s <= 4 - d && h.state && (h.data = h.data.subarray(0, h.data.byteLength - d)),
                                    (r = s - u - 1) > 0)
                                  ) {
                                    var g = new Uint8Array(h.data.byteLength + r)
                                    g.set(h.data, 0), g.set(e.subarray(0, r), h.data.byteLength), (h.data = g)
                                  }
                                }
                                s < o ? ((a = 31 & e[s]), (f = s), (n = a), (u = 0)) : (u = -1)
                              } else u = 0
                            else u = 3
                          else u = t ? 0 : 2
                        else u = t ? 0 : 1
                      if (
                        (f >= 0 && u >= 0 && ((i = { data: e.subarray(f, o), type: n, state: u }), c.push(i)),
                        0 === c.length)
                      ) {
                        var p = this._getLastNalUnit()
                        if (p) {
                          var v = new Uint8Array(p.data.byteLength + e.byteLength)
                          v.set(p.data, 0), v.set(e, p.data.byteLength), (p.data = v)
                        }
                      }
                      return (l.naluState = u), c
                    }),
                    (t.discardEPB = function (e) {
                      for (var t, r, i = e.byteLength, a = [], n = 1; n < i - 2; )
                        0 === e[n] && 0 === e[n + 1] && 3 === e[n + 2] ? (a.push(n + 2), (n += 2)) : n++
                      if (0 === a.length) return e
                      ;(t = i - a.length), (r = new Uint8Array(t))
                      var s = 0
                      for (n = 0; n < t; s++, n++) s === a[0] && (s++, a.shift()), (r[n] = e[s])
                      return r
                    }),
                    (t._parseAACPES = function (e) {
                      var t,
                        r,
                        i,
                        a,
                        n,
                        s = this._audioTrack,
                        l = e.data,
                        c = e.pts,
                        h = this.aacOverFlow,
                        g = this.aacLastPTS
                      if (h) {
                        var p = new Uint8Array(h.byteLength + l.byteLength)
                        p.set(h, 0), p.set(l, h.byteLength), (l = p)
                      }
                      for (i = 0, n = l.length; i < n - 1 && !o(l, i); i++);
                      if (i) {
                        var v, m
                        if (
                          (i < n - 1
                            ? ((v = "AAC PES did not start with ADTS header,offset:" + i), (m = !1))
                            : ((v = "no ADTS header found in AAC PES"), (m = !0)),
                          b.logger.warn("parsing error:" + v),
                          this.observer.trigger(y.default.ERROR, {
                            type: E.ErrorTypes.MEDIA_ERROR,
                            details: E.ErrorDetails.FRAG_PARSING_ERROR,
                            fatal: m,
                            reason: v,
                          }),
                          m)
                        )
                          return
                      }
                      if ((u(s, this.observer, l, i, this.audioCodec), (r = 0), (t = d(s.samplerate)), h && g)) {
                        var T = g + t
                        Math.abs(T - c) > 1 &&
                          (b.logger.log("AAC: align PTS for overlapping frames by " + Math.round((T - c) / 90)),
                          (c = T))
                      }
                      for (; i < n; ) {
                        if (o(l, i)) {
                          if (i + 5 < n) {
                            var S = f(s, l, i, c, r)
                            if (S) {
                              ;(i += S.length), (a = S.sample.pts), r++
                              continue
                            }
                          }
                          break
                        }
                        i++
                      }
                      ;(h = i < n ? l.subarray(i, n) : null), (this.aacOverFlow = h), (this.aacLastPTS = a)
                    }),
                    (t._parseMPEGPES = function (e) {
                      for (var t = e.data, r = t.length, i = 0, a = 0, n = e.pts; a < r; )
                        if (w.isHeader(t, a)) {
                          var s = w.appendFrame(this._audioTrack, t, a, n, i)
                          if (!s) break
                          ;(a += s.length), i++
                        } else a++
                    }),
                    (t._parseID3PES = function (e) {
                      this._id3Track.samples.push(e)
                    }),
                    e
                  )
                })(),
                M = F,
                N = (function () {
                  function e(e, t, r) {
                    ;(this.observer = e), (this.config = r), (this.remuxer = t)
                  }
                  var t = e.prototype
                  return (
                    (t.resetInitSegment = function (e, t, r, i) {
                      this._audioTrack = {
                        container: "audio/mpeg",
                        type: "audio",
                        id: -1,
                        sequenceNumber: 0,
                        isAAC: !1,
                        samples: [],
                        len: 0,
                        manifestCodec: t,
                        duration: i,
                        inputTimeScale: 9e4,
                      }
                    }),
                    (t.resetTimeStamp = function () {}),
                    (e.probe = function (e) {
                      var t,
                        r,
                        i = A.default.getID3Data(e, 0)
                      if (i && void 0 !== A.default.getTimeStamp(i))
                        for (t = i.length, r = Math.min(e.length - 1, t + 100); t < r; t++)
                          if (w.probe(e, t)) return b.logger.log("MPEG Audio sync word found !"), !0
                      return !1
                    }),
                    (t.append = function (e, t, r, i) {
                      for (
                        var a = A.default.getID3Data(e, 0) || [],
                          n = A.default.getTimeStamp(a),
                          s = void 0 !== n ? 90 * n : 9e4 * t,
                          o = a.length,
                          l = e.length,
                          u = 0,
                          d = 0,
                          c = this._audioTrack,
                          f = [{ pts: s, dts: s, data: a }];
                        o < l;

                      )
                        if (w.isHeader(e, o)) {
                          var h = w.appendFrame(c, e, o, s, u)
                          if (!h) break
                          ;(o += h.length), (d = h.sample.pts), u++
                        } else
                          A.default.isHeader(e, o)
                            ? ((a = A.default.getID3Data(e, o)), f.push({ pts: d, dts: d, data: a }), (o += a.length))
                            : o++
                      this.remuxer.remux(
                        c,
                        { samples: [] },
                        { samples: f, inputTimeScale: 9e4 },
                        { samples: [] },
                        t,
                        r,
                        i
                      )
                    }),
                    (t.destroy = function () {}),
                    e
                  )
                })(),
                U = N,
                B = (function () {
                  function e() {}
                  return (
                    (e.getSilentFrame = function (e, t) {
                      switch (e) {
                        case "mp4a.40.2":
                          if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128])
                          if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128])
                          if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142])
                          if (4 === t)
                            return new Uint8Array([
                              0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56,
                            ])
                          if (5 === t)
                            return new Uint8Array([
                              0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56,
                            ])
                          if (6 === t)
                            return new Uint8Array([
                              0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0,
                              32, 8, 224,
                            ])
                          break
                        default:
                          if (1 === t)
                            return new Uint8Array([
                              1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90,
                              90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                              90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94,
                            ])
                          if (2 === t)
                            return new Uint8Array([
                              1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90,
                              90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                              90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94,
                            ])
                          if (3 === t)
                            return new Uint8Array([
                              1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90,
                              90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
                              90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94,
                            ])
                      }
                      return null
                    }),
                    e
                  )
                })(),
                G = B,
                j = Math.pow(2, 32) - 1,
                K = (function () {
                  function e() {}
                  return (
                    (e.init = function () {
                      e.types = {
                        avc1: [],
                        avcC: [],
                        btrt: [],
                        dinf: [],
                        dref: [],
                        esds: [],
                        ftyp: [],
                        hdlr: [],
                        mdat: [],
                        mdhd: [],
                        mdia: [],
                        mfhd: [],
                        minf: [],
                        moof: [],
                        moov: [],
                        mp4a: [],
                        ".mp3": [],
                        mvex: [],
                        mvhd: [],
                        pasp: [],
                        sdtp: [],
                        stbl: [],
                        stco: [],
                        stsc: [],
                        stsd: [],
                        stsz: [],
                        stts: [],
                        tfdt: [],
                        tfhd: [],
                        traf: [],
                        trak: [],
                        trun: [],
                        trex: [],
                        tkhd: [],
                        vmhd: [],
                        smhd: [],
                      }
                      var t
                      for (t in e.types)
                        e.types.hasOwnProperty(t) &&
                          (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)])
                      var r = new Uint8Array([
                          0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100,
                          101, 111, 72, 97, 110, 100, 108, 101, 114, 0,
                        ]),
                        i = new Uint8Array([
                          0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117,
                          110, 100, 72, 97, 110, 100, 108, 101, 114, 0,
                        ])
                      e.HDLR_TYPES = { video: r, audio: i }
                      var a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                        n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])
                      ;(e.STTS = e.STSC = e.STCO = n),
                        (e.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])),
                        (e.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])),
                        (e.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
                        (e.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]))
                      var s = new Uint8Array([105, 115, 111, 109]),
                        o = new Uint8Array([97, 118, 99, 49]),
                        l = new Uint8Array([0, 0, 0, 1])
                      ;(e.FTYP = e.box(e.types.ftyp, s, l, s, o)),
                        (e.DINF = e.box(e.types.dinf, e.box(e.types.dref, a)))
                    }),
                    (e.box = function (e) {
                      for (var t, r = Array.prototype.slice.call(arguments, 1), i = 8, a = r.length, n = a; a--; )
                        i += r[a].byteLength
                      for (
                        t = new Uint8Array(i),
                          t[0] = (i >> 24) & 255,
                          t[1] = (i >> 16) & 255,
                          t[2] = (i >> 8) & 255,
                          t[3] = 255 & i,
                          t.set(e, 4),
                          a = 0,
                          i = 8;
                        a < n;
                        a++
                      )
                        t.set(r[a], i), (i += r[a].byteLength)
                      return t
                    }),
                    (e.hdlr = function (t) {
                      return e.box(e.types.hdlr, e.HDLR_TYPES[t])
                    }),
                    (e.mdat = function (t) {
                      return e.box(e.types.mdat, t)
                    }),
                    (e.mdhd = function (t, r) {
                      r *= t
                      var i = Math.floor(r / (j + 1)),
                        a = Math.floor(r % (j + 1))
                      return e.box(
                        e.types.mdhd,
                        new Uint8Array([
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          2,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          3,
                          (t >> 24) & 255,
                          (t >> 16) & 255,
                          (t >> 8) & 255,
                          255 & t,
                          i >> 24,
                          (i >> 16) & 255,
                          (i >> 8) & 255,
                          255 & i,
                          a >> 24,
                          (a >> 16) & 255,
                          (a >> 8) & 255,
                          255 & a,
                          85,
                          196,
                          0,
                          0,
                        ])
                      )
                    }),
                    (e.mdia = function (t) {
                      return e.box(e.types.mdia, e.mdhd(t.timescale, t.duration), e.hdlr(t.type), e.minf(t))
                    }),
                    (e.mfhd = function (t) {
                      return e.box(
                        e.types.mfhd,
                        new Uint8Array([0, 0, 0, 0, t >> 24, (t >> 16) & 255, (t >> 8) & 255, 255 & t])
                      )
                    }),
                    (e.minf = function (t) {
                      return "audio" === t.type
                        ? e.box(e.types.minf, e.box(e.types.smhd, e.SMHD), e.DINF, e.stbl(t))
                        : e.box(e.types.minf, e.box(e.types.vmhd, e.VMHD), e.DINF, e.stbl(t))
                    }),
                    (e.moof = function (t, r, i) {
                      return e.box(e.types.moof, e.mfhd(t), e.traf(i, r))
                    }),
                    (e.moov = function (t) {
                      for (var r = t.length, i = []; r--; ) i[r] = e.trak(t[r])
                      return e.box.apply(
                        null,
                        [e.types.moov, e.mvhd(t[0].timescale, t[0].duration)].concat(i).concat(e.mvex(t))
                      )
                    }),
                    (e.mvex = function (t) {
                      for (var r = t.length, i = []; r--; ) i[r] = e.trex(t[r])
                      return e.box.apply(null, [e.types.mvex].concat(i))
                    }),
                    (e.mvhd = function (t, r) {
                      r *= t
                      var i = Math.floor(r / (j + 1)),
                        a = Math.floor(r % (j + 1)),
                        n = new Uint8Array([
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          2,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          3,
                          (t >> 24) & 255,
                          (t >> 16) & 255,
                          (t >> 8) & 255,
                          255 & t,
                          i >> 24,
                          (i >> 16) & 255,
                          (i >> 8) & 255,
                          255 & i,
                          a >> 24,
                          (a >> 16) & 255,
                          (a >> 8) & 255,
                          255 & a,
                          0,
                          1,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          64,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          255,
                          255,
                          255,
                          255,
                        ])
                      return e.box(e.types.mvhd, n)
                    }),
                    (e.sdtp = function (t) {
                      var r,
                        i,
                        a = t.samples || [],
                        n = new Uint8Array(4 + a.length)
                      for (i = 0; i < a.length; i++)
                        (r = a[i].flags), (n[i + 4] = (r.dependsOn << 4) | (r.isDependedOn << 2) | r.hasRedundancy)
                      return e.box(e.types.sdtp, n)
                    }),
                    (e.stbl = function (t) {
                      return e.box(
                        e.types.stbl,
                        e.stsd(t),
                        e.box(e.types.stts, e.STTS),
                        e.box(e.types.stsc, e.STSC),
                        e.box(e.types.stsz, e.STSZ),
                        e.box(e.types.stco, e.STCO)
                      )
                    }),
                    (e.avc1 = function (t) {
                      var r,
                        i,
                        a,
                        n = [],
                        s = []
                      for (r = 0; r < t.sps.length; r++)
                        (i = t.sps[r]),
                          (a = i.byteLength),
                          n.push((a >>> 8) & 255),
                          n.push(255 & a),
                          (n = n.concat(Array.prototype.slice.call(i)))
                      for (r = 0; r < t.pps.length; r++)
                        (i = t.pps[r]),
                          (a = i.byteLength),
                          s.push((a >>> 8) & 255),
                          s.push(255 & a),
                          (s = s.concat(Array.prototype.slice.call(i)))
                      var o = e.box(
                          e.types.avcC,
                          new Uint8Array(
                            [1, n[3], n[4], n[5], 255, 224 | t.sps.length].concat(n).concat([t.pps.length]).concat(s)
                          )
                        ),
                        l = t.width,
                        u = t.height,
                        d = t.pixelRatio[0],
                        c = t.pixelRatio[1]
                      return e.box(
                        e.types.avc1,
                        new Uint8Array([
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          (l >> 8) & 255,
                          255 & l,
                          (u >> 8) & 255,
                          255 & u,
                          0,
                          72,
                          0,
                          0,
                          0,
                          72,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          18,
                          100,
                          97,
                          105,
                          108,
                          121,
                          109,
                          111,
                          116,
                          105,
                          111,
                          110,
                          47,
                          104,
                          108,
                          115,
                          46,
                          106,
                          115,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          24,
                          17,
                          17,
                        ]),
                        o,
                        e.box(e.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])),
                        e.box(
                          e.types.pasp,
                          new Uint8Array([
                            d >> 24,
                            (d >> 16) & 255,
                            (d >> 8) & 255,
                            255 & d,
                            c >> 24,
                            (c >> 16) & 255,
                            (c >> 8) & 255,
                            255 & c,
                          ])
                        )
                      )
                    }),
                    (e.esds = function (e) {
                      var t = e.config.length
                      return new Uint8Array(
                        [0, 0, 0, 0, 3, 23 + t, 0, 1, 0, 4, 15 + t, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5]
                          .concat([t])
                          .concat(e.config)
                          .concat([6, 1, 2])
                      )
                    }),
                    (e.mp4a = function (t) {
                      var r = t.samplerate
                      return e.box(
                        e.types.mp4a,
                        new Uint8Array([
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          t.channelCount,
                          0,
                          16,
                          0,
                          0,
                          0,
                          0,
                          (r >> 8) & 255,
                          255 & r,
                          0,
                          0,
                        ]),
                        e.box(e.types.esds, e.esds(t))
                      )
                    }),
                    (e.mp3 = function (t) {
                      var r = t.samplerate
                      return e.box(
                        e.types[".mp3"],
                        new Uint8Array([
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          t.channelCount,
                          0,
                          16,
                          0,
                          0,
                          0,
                          0,
                          (r >> 8) & 255,
                          255 & r,
                          0,
                          0,
                        ])
                      )
                    }),
                    (e.stsd = function (t) {
                      return "audio" === t.type
                        ? t.isAAC || "mp3" !== t.codec
                          ? e.box(e.types.stsd, e.STSD, e.mp4a(t))
                          : e.box(e.types.stsd, e.STSD, e.mp3(t))
                        : e.box(e.types.stsd, e.STSD, e.avc1(t))
                    }),
                    (e.tkhd = function (t) {
                      var r = t.id,
                        i = t.duration * t.timescale,
                        a = t.width,
                        n = t.height,
                        s = Math.floor(i / (j + 1)),
                        o = Math.floor(i % (j + 1))
                      return e.box(
                        e.types.tkhd,
                        new Uint8Array([
                          1,
                          0,
                          0,
                          7,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          2,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          3,
                          (r >> 24) & 255,
                          (r >> 16) & 255,
                          (r >> 8) & 255,
                          255 & r,
                          0,
                          0,
                          0,
                          0,
                          s >> 24,
                          (s >> 16) & 255,
                          (s >> 8) & 255,
                          255 & s,
                          o >> 24,
                          (o >> 16) & 255,
                          (o >> 8) & 255,
                          255 & o,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          64,
                          0,
                          0,
                          0,
                          (a >> 8) & 255,
                          255 & a,
                          0,
                          0,
                          (n >> 8) & 255,
                          255 & n,
                          0,
                          0,
                        ])
                      )
                    }),
                    (e.traf = function (t, r) {
                      var i = e.sdtp(t),
                        a = t.id,
                        n = Math.floor(r / (j + 1)),
                        s = Math.floor(r % (j + 1))
                      return e.box(
                        e.types.traf,
                        e.box(
                          e.types.tfhd,
                          new Uint8Array([0, 0, 0, 0, a >> 24, (a >> 16) & 255, (a >> 8) & 255, 255 & a])
                        ),
                        e.box(
                          e.types.tfdt,
                          new Uint8Array([
                            1,
                            0,
                            0,
                            0,
                            n >> 24,
                            (n >> 16) & 255,
                            (n >> 8) & 255,
                            255 & n,
                            s >> 24,
                            (s >> 16) & 255,
                            (s >> 8) & 255,
                            255 & s,
                          ])
                        ),
                        e.trun(t, i.length + 16 + 20 + 8 + 16 + 8 + 8),
                        i
                      )
                    }),
                    (e.trak = function (t) {
                      return (t.duration = t.duration || 4294967295), e.box(e.types.trak, e.tkhd(t), e.mdia(t))
                    }),
                    (e.trex = function (t) {
                      var r = t.id
                      return e.box(
                        e.types.trex,
                        new Uint8Array([
                          0,
                          0,
                          0,
                          0,
                          r >> 24,
                          (r >> 16) & 255,
                          (r >> 8) & 255,
                          255 & r,
                          0,
                          0,
                          0,
                          1,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          0,
                          1,
                          0,
                          1,
                        ])
                      )
                    }),
                    (e.trun = function (t, r) {
                      var i,
                        a,
                        n,
                        s,
                        o,
                        l,
                        u = t.samples || [],
                        d = u.length,
                        c = 12 + 16 * d,
                        f = new Uint8Array(c)
                      for (
                        r += 8 + c,
                          f.set(
                            [
                              0,
                              0,
                              15,
                              1,
                              (d >>> 24) & 255,
                              (d >>> 16) & 255,
                              (d >>> 8) & 255,
                              255 & d,
                              (r >>> 24) & 255,
                              (r >>> 16) & 255,
                              (r >>> 8) & 255,
                              255 & r,
                            ],
                            0
                          ),
                          i = 0;
                        i < d;
                        i++
                      )
                        (a = u[i]),
                          (n = a.duration),
                          (s = a.size),
                          (o = a.flags),
                          (l = a.cts),
                          f.set(
                            [
                              (n >>> 24) & 255,
                              (n >>> 16) & 255,
                              (n >>> 8) & 255,
                              255 & n,
                              (s >>> 24) & 255,
                              (s >>> 16) & 255,
                              (s >>> 8) & 255,
                              255 & s,
                              (o.isLeading << 2) | o.dependsOn,
                              (o.isDependedOn << 6) | (o.hasRedundancy << 4) | (o.paddingValue << 1) | o.isNonSync,
                              61440 & o.degradPrio,
                              15 & o.degradPrio,
                              (l >>> 24) & 255,
                              (l >>> 16) & 255,
                              (l >>> 8) & 255,
                              255 & l,
                            ],
                            12 + 16 * i
                          )
                      return e.box(e.types.trun, f)
                    }),
                    (e.initSegment = function (t) {
                      e.types || e.init()
                      var r,
                        i = e.moov(t)
                      return (
                        (r = new Uint8Array(e.FTYP.byteLength + i.byteLength)),
                        r.set(e.FTYP),
                        r.set(i, e.FTYP.byteLength),
                        r
                      )
                    }),
                    e
                  )
                })(),
                H = K,
                V = 9e4,
                Y = p(10),
                W = p(0.2),
                q = null,
                X = (function () {
                  function e(e, t, r, i) {
                    if (
                      ((this.observer = e),
                      (this.config = t),
                      (this.typeSupported = r),
                      (this.ISGenerated = !1),
                      null === q)
                    ) {
                      var a = navigator.userAgent.match(/Chrome\/(\d+)/i)
                      q = a ? parseInt(a[1]) : 0
                    }
                  }
                  var t = e.prototype
                  return (
                    (t.destroy = function () {}),
                    (t.resetTimeStamp = function (e) {
                      this._initPTS = this._initDTS = e
                    }),
                    (t.resetInitSegment = function () {
                      this.ISGenerated = !1
                    }),
                    (t.getVideoStartPts = function (e) {
                      var t = !1,
                        r = e.reduce(function (e, r) {
                          var i = r.pts - e
                          return i < -4294967296 ? ((t = !0), v(e, r.pts)) : i > 0 ? e : r.pts
                        }, e[0].pts)
                      return t && b.logger.debug("PTS rollover detected"), r
                    }),
                    (t.remux = function (e, t, r, i, a, n, s) {
                      if ((this.ISGenerated || this.generateIS(e, t, a), this.ISGenerated)) {
                        var o = e.samples.length,
                          l = t.samples.length,
                          u = a,
                          d = a
                        if (o && l) {
                          var c = this.getVideoStartPts(t.samples),
                            f = v(e.samples[0].pts, c) - c,
                            h = f / t.inputTimeScale
                          ;(u += Math.max(0, h)), (d += Math.max(0, -h))
                        }
                        if (o) {
                          e.timescale ||
                            (b.logger.warn("regenerate InitSegment as audio detected"), this.generateIS(e, t, a))
                          var g = this.remuxAudio(e, u, n, s)
                          if (l) {
                            var p
                            g && (p = g.endPTS - g.startPTS),
                              t.timescale ||
                                (b.logger.warn("regenerate InitSegment as video detected"), this.generateIS(e, t, a)),
                              this.remuxVideo(t, d, n, p)
                          }
                        } else if (l) {
                          var m = this.remuxVideo(t, d, n, 0, s)
                          m && e.codec && this.remuxEmptyAudio(e, u, n, m)
                        }
                      }
                      r.samples.length && this.remuxID3(r, a),
                        i.samples.length && this.remuxText(i, a),
                        this.observer.trigger(y.default.FRAG_PARSED)
                    }),
                    (t.generateIS = function (e, t, r) {
                      var i,
                        a,
                        n = this.observer,
                        s = e.samples,
                        o = t.samples,
                        l = this.typeSupported,
                        u = "audio/mp4",
                        d = {},
                        c = { tracks: d },
                        f = void 0 === this._initPTS
                      if (
                        (f && (i = a = 1 / 0),
                        e.config &&
                          s.length &&
                          ((e.timescale = e.samplerate),
                          b.logger.log("audio sampling rate : " + e.samplerate),
                          e.isAAC || (l.mpeg ? ((u = "audio/mpeg"), (e.codec = "")) : l.mp3 && (e.codec = "mp3")),
                          (d.audio = {
                            container: u,
                            codec: e.codec,
                            initSegment: !e.isAAC && l.mpeg ? new Uint8Array() : H.initSegment([e]),
                            metadata: { channelCount: e.channelCount },
                          }),
                          f && (i = a = s[0].pts - Math.round(e.inputTimeScale * r))),
                        t.sps && t.pps && o.length)
                      ) {
                        var h = t.inputTimeScale
                        if (
                          ((t.timescale = h),
                          (d.video = {
                            container: "video/mp4",
                            codec: t.codec,
                            initSegment: H.initSegment([t]),
                            metadata: { width: t.width, height: t.height },
                          }),
                          f)
                        ) {
                          var g = this.getVideoStartPts(o),
                            p = Math.round(h * r)
                          ;(a = Math.min(a, v(o[0].dts, g) - p)),
                            (i = Math.min(i, g - p)),
                            this.observer.trigger(y.default.INIT_PTS_FOUND, { initPTS: i })
                        }
                      } else f && d.audio && this.observer.trigger(y.default.INIT_PTS_FOUND, { initPTS: i })
                      Object.keys(d).length
                        ? (n.trigger(y.default.FRAG_PARSING_INIT_SEGMENT, c),
                          (this.ISGenerated = !0),
                          f && ((this._initPTS = i), (this._initDTS = a)))
                        : n.trigger(y.default.ERROR, {
                            type: E.ErrorTypes.MEDIA_ERROR,
                            details: E.ErrorDetails.FRAG_PARSING_ERROR,
                            fatal: !1,
                            reason: "no audio/video samples found",
                          })
                    }),
                    (t.remuxVideo = function (e, t, r, i) {
                      var a,
                        n,
                        s,
                        o,
                        l,
                        u = e.timescale,
                        d = e.samples,
                        c = [],
                        f = d.length,
                        h = this._initPTS,
                        p = 8,
                        m = Number.POSITIVE_INFINITY,
                        T = Number.NEGATIVE_INFINITY,
                        S = 0,
                        _ = !1,
                        A = this.nextAvcDts
                      if (0 !== f) {
                        if (!r) {
                          A = t * u - (d[0].pts - v(d[0].dts, d[0].pts))
                        }
                        for (var R = 0; R < f; R++) {
                          var D = d[R]
                          ;(D.pts = v(D.pts - h, A)),
                            (D.dts = v(D.dts - h, A)),
                            D.dts > D.pts && (S = Math.max(Math.min(S, D.pts - D.dts), -1 * W)),
                            D.dts < d[R > 0 ? R - 1 : R].dts && (_ = !0)
                        }
                        _ &&
                          d.sort(function (e, t) {
                            var r = e.dts - t.dts,
                              i = e.pts - t.pts
                            return r || i || e.id - t.id
                          }),
                          (o = d[0].dts),
                          (l = d[f - 1].dts)
                        var L = Math.round((l - o) / (f - 1))
                        if (S < 0) {
                          if (S < -2 * L) {
                            b.logger.warn(
                              "PTS < DTS detected in video samples, offsetting DTS from PTS by " + g(-L, !0) + " ms"
                            )
                            for (var k = S, w = 0; w < f; w++)
                              (d[w].dts = k = Math.max(k, d[w].pts - L)), (d[w].pts = Math.max(k, d[w].pts))
                          } else {
                            b.logger.warn(
                              "PTS < DTS detected in video samples, shifting DTS by " +
                                g(S, !0) +
                                " ms to overcome this issue"
                            )
                            for (var I = 0; I < f; I++) d[I].dts = d[I].dts + S
                          }
                          ;(o = d[0].dts), (l = d[f - 1].dts)
                        }
                        if (r) {
                          var O = o - A,
                            C = O > L,
                            P = O < -1
                          if (C || P) {
                            C
                              ? b.logger.warn(
                                  "AVC: " + g(O, !0) + " ms (" + O + "dts) hole between fragments detected, filling it"
                                )
                              : b.logger.warn(
                                  "AVC: " + g(-O, !0) + " ms (" + O + "dts) overlapping between fragments detected"
                                ),
                              (o = A)
                            var x = d[0].pts - O
                            ;(d[0].dts = o),
                              (d[0].pts = x),
                              b.logger.log(
                                "Video: First PTS/DTS adjusted: " +
                                  g(x, !0) +
                                  "/" +
                                  g(o, !0) +
                                  ", delta: " +
                                  g(O, !0) +
                                  " ms"
                              )
                          }
                        }
                        q && q < 75 && (o = Math.max(0, o))
                        for (var F = 0, M = 0, N = 0; N < f; N++) {
                          for (var U = d[N], B = U.units, G = B.length, j = 0, K = 0; K < G; K++) j += B[K].data.length
                          ;(M += j),
                            (F += G),
                            (U.length = j),
                            (U.dts = Math.max(U.dts, o)),
                            (U.pts = Math.max(U.pts, U.dts, 0)),
                            (m = Math.min(U.pts, m)),
                            (T = Math.max(U.pts, T))
                        }
                        l = d[f - 1].dts
                        var V = M + 4 * F + 8
                        try {
                          n = new Uint8Array(V)
                        } catch (e) {
                          return void this.observer.trigger(y.default.ERROR, {
                            type: E.ErrorTypes.MUX_ERROR,
                            details: E.ErrorDetails.REMUX_ALLOC_ERROR,
                            fatal: !1,
                            bytes: V,
                            reason: "fail allocating video mdat " + V,
                          })
                        }
                        var Y = new DataView(n.buffer)
                        Y.setUint32(0, V), n.set(H.types.mdat, 4)
                        for (var X = 0; X < f; X++) {
                          for (var z = d[X], Q = z.units, $ = 0, J = void 0, Z = 0, ee = Q.length; Z < ee; Z++) {
                            var te = Q[Z],
                              re = te.data,
                              ie = te.data.byteLength
                            Y.setUint32(p, ie), (p += 4), n.set(re, p), (p += ie), ($ += 4 + ie)
                          }
                          if (X < f - 1) a = d[X + 1].dts - z.dts
                          else {
                            var ae = this.config,
                              ne = z.dts - d[X > 0 ? X - 1 : X].dts
                            if (ae.stretchShortVideoTrack) {
                              var se = ae.maxBufferHole,
                                oe = Math.floor(se * u),
                                le = (i ? m + i * u : this.nextAudioPts) - z.pts
                              le > oe
                                ? ((a = le - ne),
                                  a < 0 && (a = ne),
                                  b.logger.log(
                                    "It is approximately " +
                                      g(le, !1) +
                                      " ms to the next segment; using duration " +
                                      g(a, !1) +
                                      " ms for the last video frame."
                                  ))
                                : (a = ne)
                            } else a = ne
                          }
                          ;(J = Math.round(z.pts - z.dts)),
                            c.push({
                              size: $,
                              duration: a,
                              cts: J,
                              flags: {
                                isLeading: 0,
                                isDependedOn: 0,
                                hasRedundancy: 0,
                                degradPrio: 0,
                                dependsOn: z.key ? 2 : 1,
                                isNonSync: z.key ? 0 : 1,
                              },
                            })
                        }
                        this.nextAvcDts = l + a
                        var ue = e.dropped
                        if (
                          ((e.nbNalu = 0),
                          (e.dropped = 0),
                          c.length && navigator.userAgent.toLowerCase().indexOf("chrome") > -1)
                        ) {
                          var de = c[0].flags
                          ;(de.dependsOn = 2), (de.isNonSync = 0)
                        }
                        ;(e.samples = c), (s = H.moof(e.sequenceNumber++, o, e)), (e.samples = [])
                        var ce = {
                          data1: s,
                          data2: n,
                          startPTS: m / u,
                          endPTS: (T + a) / u,
                          startDTS: o / u,
                          endDTS: this.nextAvcDts / u,
                          type: "video",
                          hasAudio: !1,
                          hasVideo: !0,
                          nb: c.length,
                          dropped: ue,
                        }
                        return this.observer.trigger(y.default.FRAG_PARSING_DATA, ce), ce
                      }
                    }),
                    (t.remuxAudio = function (e, t, r, i) {
                      var a,
                        n,
                        s,
                        o,
                        l,
                        u,
                        d = e.inputTimeScale,
                        c = e.timescale,
                        f = d / c,
                        h = e.isAAC ? 1024 : 1152,
                        p = h * f,
                        m = this._initPTS,
                        T = !e.isAAC && this.typeSupported.mpeg,
                        S = T ? 0 : 8,
                        _ = e.samples,
                        A = [],
                        R = this.nextAudioPts
                      if (
                        ((r |=
                          _.length && R && ((i && Math.abs(t - R / d) < 0.1) || Math.abs(_[0].pts - R - m) < 20 * p)),
                        _.forEach(function (e) {
                          e.pts = e.dts = v(e.pts - m, t * d)
                        }),
                        (_ = _.filter(function (e) {
                          return e.pts >= 0
                        })),
                        0 !== _.length)
                      ) {
                        if ((r || (R = i ? Math.max(0, t * d) : _[0].pts), e.isAAC))
                          for (var D = this.config.maxAudioFramesDrift, L = 0, k = R; L < _.length; ) {
                            var w = _[L],
                              I = w.pts,
                              O = I - k
                            if (O <= -D * p)
                              r || L > 0
                                ? (b.logger.warn(
                                    "Dropping 1 audio frame @ " +
                                      g(k, !0) / 1e3 +
                                      "s due to " +
                                      g(O, !0) +
                                      " ms overlap."
                                  ),
                                  _.splice(L, 1))
                                : (b.logger.warn(
                                    "Audio frame @ " +
                                      g(I, !0) / 1e3 +
                                      "s overlaps nextAudioPts by " +
                                      g(O, !0) +
                                      " ms."
                                  ),
                                  (k = I + p),
                                  L++)
                            else if (O >= D * p && O < Y && k) {
                              var C = Math.round(O / p)
                              b.logger.warn(
                                "Injecting " +
                                  C +
                                  " audio frames @ " +
                                  g(k, !0) / 1e3 +
                                  "s due to " +
                                  g(O, !0) +
                                  " ms gap."
                              )
                              for (var P = 0; P < C; P++) {
                                var x = Math.max(k, 0)
                                ;(n = G.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)),
                                  n ||
                                    (b.logger.log(
                                      "Unable to get silent frame for given audio codec; duplicating last frame instead."
                                    ),
                                    (n = w.unit.subarray())),
                                  _.splice(L, 0, { unit: n, pts: x, dts: x }),
                                  (k += p),
                                  L++
                              }
                              ;(w.pts = w.dts = k), (k += p), L++
                            } else Math.abs(O), (w.pts = w.dts = k), (k += p), L++
                          }
                        for (var F = _.length, M = 0; F--; ) M += _[F].unit.byteLength
                        for (var N = 0, U = _.length; N < U; N++) {
                          var B = _[N],
                            j = B.unit,
                            K = B.pts
                          if (void 0 !== u && a) a.duration = Math.round((K - u) / f)
                          else {
                            var V = K - R,
                              W = 0
                            if (r && e.isAAC && V) {
                              if (V > 0 && V < Y)
                                (W = Math.round((K - R) / p)),
                                  b.logger.log(g(V, !0) + " ms hole between AAC samples detected,filling it"),
                                  W > 0 &&
                                    ((n = G.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)),
                                    n || (n = j.subarray()),
                                    (M += W * n.length))
                              else if (V < -12) {
                                b.logger.log(
                                  "drop overlapping AAC sample, expected/parsed/delta: " +
                                    g(R, !0) +
                                    " ms / " +
                                    g(K, !0) +
                                    " ms / " +
                                    g(-V, !0) +
                                    " ms"
                                ),
                                  (M -= j.byteLength)
                                continue
                              }
                              K = R
                            }
                            if (((l = K), !(M > 0))) return
                            M += S
                            try {
                              s = new Uint8Array(M)
                            } catch (e) {
                              return void this.observer.trigger(y.default.ERROR, {
                                type: E.ErrorTypes.MUX_ERROR,
                                details: E.ErrorDetails.REMUX_ALLOC_ERROR,
                                fatal: !1,
                                bytes: M,
                                reason: "fail allocating audio mdat " + M,
                              })
                            }
                            if (!T) {
                              new DataView(s.buffer).setUint32(0, M), s.set(H.types.mdat, 4)
                            }
                            for (var q = 0; q < W; q++)
                              (n = G.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)),
                                n ||
                                  (b.logger.log(
                                    "Unable to get silent frame for given audio codec; duplicating this frame instead."
                                  ),
                                  (n = j.subarray())),
                                s.set(n, S),
                                (S += n.byteLength),
                                (a = {
                                  size: n.byteLength,
                                  cts: 0,
                                  duration: 1024,
                                  flags: {
                                    isLeading: 0,
                                    isDependedOn: 0,
                                    hasRedundancy: 0,
                                    degradPrio: 0,
                                    dependsOn: 1,
                                  },
                                }),
                                A.push(a)
                          }
                          s.set(j, S)
                          var X = j.byteLength
                          ;(S += X),
                            (a = {
                              size: X,
                              cts: 0,
                              duration: 0,
                              flags: { isLeading: 0, isDependedOn: 0, hasRedundancy: 0, degradPrio: 0, dependsOn: 1 },
                            }),
                            A.push(a),
                            (u = K)
                        }
                        var z = 0
                        if (((F = A.length), F >= 2 && ((z = A[F - 2].duration), (a.duration = z)), F)) {
                          ;(this.nextAudioPts = R = u + f * z),
                            (e.samples = A),
                            (o = T ? new Uint8Array() : H.moof(e.sequenceNumber++, l / f, e)),
                            (e.samples = [])
                          var Q = l / d,
                            $ = R / d,
                            J = {
                              data1: o,
                              data2: s,
                              startPTS: Q,
                              endPTS: $,
                              startDTS: Q,
                              endDTS: $,
                              type: "audio",
                              hasAudio: !0,
                              hasVideo: !1,
                              nb: F,
                            }
                          return this.observer.trigger(y.default.FRAG_PARSING_DATA, J), J
                        }
                        return null
                      }
                    }),
                    (t.remuxEmptyAudio = function (e, t, r, i) {
                      var a = e.inputTimeScale,
                        n = e.samplerate ? e.samplerate : a,
                        s = a / n,
                        o = this.nextAudioPts,
                        l = (void 0 !== o ? o : i.startDTS * a) + this._initDTS,
                        u = i.endDTS * a + this._initDTS,
                        d = 1024 * s,
                        c = Math.ceil((u - l) / d),
                        f = G.getSilentFrame(e.manifestCodec || e.codec, e.channelCount)
                      if ((b.logger.warn("remux empty Audio"), !f))
                        return void b.logger.trace(
                          "Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!"
                        )
                      for (var h = [], g = 0; g < c; g++) {
                        var p = l + g * d
                        h.push({ unit: f, pts: p, dts: p })
                      }
                      ;(e.samples = h), this.remuxAudio(e, t, r)
                    }),
                    (t.remuxID3 = function (e, t) {
                      var r = e.samples.length
                      if (r) {
                        for (var i = e.inputTimeScale, a = this._initPTS, n = this._initDTS, s = 0; s < r; s++) {
                          var o = e.samples[s]
                          ;(o.pts = v(o.pts - a, t * i) / i), (o.dts = v(o.dts - n, t * i) / i)
                        }
                        this.observer.trigger(y.default.FRAG_PARSING_METADATA, { samples: e.samples }), (e.samples = [])
                      }
                    }),
                    (t.remuxText = function (e, t) {
                      var r = e.samples.length,
                        i = e.inputTimeScale,
                        a = this._initPTS
                      if (r) {
                        for (var n = 0; n < r; n++) {
                          var s = e.samples[n]
                          s.pts = v(s.pts - a, t * i) / i
                        }
                        e.samples.sort(function (e, t) {
                          return e.pts - t.pts
                        }),
                          this.observer.trigger(y.default.FRAG_PARSING_USERDATA, { samples: e.samples })
                      }
                      e.samples = []
                    }),
                    e
                  )
                })(),
                z = X,
                Q = (function () {
                  function e(e) {
                    this.observer = e
                  }
                  var t = e.prototype
                  return (
                    (t.destroy = function () {}),
                    (t.resetTimeStamp = function () {}),
                    (t.resetInitSegment = function () {}),
                    (t.remux = function (e, t, r, i, a, n, s, o) {
                      var l = this.observer,
                        u = ""
                      e && (u += "audio"),
                        t && (u += "video"),
                        l.trigger(y.default.FRAG_PARSING_DATA, {
                          data1: o,
                          startPTS: a,
                          startDTS: a,
                          type: u,
                          hasAudio: !!e,
                          hasVideo: !!t,
                          nb: 1,
                          dropped: 0,
                        }),
                        l.trigger(y.default.FRAG_PARSED)
                    }),
                    e
                  )
                })(),
                $ = Q,
                J = Object(_.getSelfScope)()
              try {
                m = J.performance.now.bind(J.performance)
              } catch (e) {
                b.logger.debug("Unable to use Performance API on this environment"), (m = J.Date.now)
              }
              var Z = (function () {
                function e(e, t, r, i) {
                  ;(this.observer = e), (this.typeSupported = t), (this.config = r), (this.vendor = i)
                }
                var t = e.prototype
                return (
                  (t.destroy = function () {
                    var e = this.demuxer
                    e && e.destroy()
                  }),
                  (t.push = function (e, t, r, i, a, n, s, o, l, u, d, c) {
                    var f = this
                    if (e.byteLength > 0 && null != t && null != t.key && "AES-128" === t.method) {
                      var h = this.decrypter
                      null == h && (h = this.decrypter = new T.default(this.observer, this.config))
                      var g = m()
                      h.decrypt(e, t.key.buffer, t.iv.buffer, function (e) {
                        var h = m()
                        f.observer.trigger(y.default.FRAG_DECRYPTED, { stats: { tstart: g, tdecrypt: h } }),
                          f.pushDecrypted(new Uint8Array(e), t, new Uint8Array(r), i, a, n, s, o, l, u, d, c)
                      })
                    } else this.pushDecrypted(new Uint8Array(e), t, new Uint8Array(r), i, a, n, s, o, l, u, d, c)
                  }),
                  (t.pushDecrypted = function (e, t, r, i, a, n, s, o, l, u, d, c) {
                    var f = this.demuxer,
                      h = this.remuxer
                    if (!f || s || o) {
                      for (
                        var g,
                          p = this.observer,
                          v = this.typeSupported,
                          m = this.config,
                          T = [
                            { demux: M, remux: z },
                            { demux: L.default, remux: $ },
                            { demux: D, remux: z },
                            { demux: U, remux: z },
                          ],
                          S = 0,
                          b = T.length;
                        S < b && ((g = T[S]), !g.demux.probe(e));
                        S++
                      );
                      if (!g)
                        return void p.trigger(y.default.ERROR, {
                          type: E.ErrorTypes.MEDIA_ERROR,
                          details: E.ErrorDetails.FRAG_PARSING_ERROR,
                          fatal: !0,
                          reason: "no demux matching with content found",
                        })
                      ;(h && h instanceof g.remux) || (h = new g.remux(p, m, v, this.vendor)),
                        (f && f instanceof g.demux) || ((f = new g.demux(p, h, m, v)), (this.probe = g.demux.probe)),
                        (this.demuxer = f),
                        (this.remuxer = h)
                    }
                    ;(s || o) && (f.resetInitSegment(r, i, a, u), h.resetInitSegment()),
                      s && (f.resetTimeStamp(c), h.resetTimeStamp(c)),
                      "function" == typeof f.setDecryptData && f.setDecryptData(t),
                      f.append(e, n, l, d)
                  }),
                  e
                )
              })()
              t.default = Z
            },
            "./src/demux/demuxer-worker.js": function (e, t, r) {
              "use strict"
              r.r(t)
              var i = r("./src/demux/demuxer-inline.js"),
                a = r("./src/events.js"),
                n = r("./src/utils/logger.js"),
                s = r("./node_modules/eventemitter3/index.js"),
                o = function (e) {
                  var t = new s.EventEmitter()
                  ;(t.trigger = function (e) {
                    for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
                      i[a - 1] = arguments[a]
                    t.emit.apply(t, [e, e].concat(i))
                  }),
                    (t.off = function (e) {
                      for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
                        i[a - 1] = arguments[a]
                      t.removeListener.apply(t, [e].concat(i))
                    })
                  var r = function (t, r) {
                    e.postMessage({ event: t, data: r })
                  }
                  e.addEventListener("message", function (a) {
                    var s = a.data
                    switch (s.cmd) {
                      case "init":
                        var o = JSON.parse(s.config)
                        ;(e.demuxer = new i.default(t, s.typeSupported, o, s.vendor)),
                          Object(n.enableLogs)(o.debug),
                          r("init", null)
                        break
                      case "demux":
                        e.demuxer.push(
                          s.data,
                          s.decryptdata,
                          s.initSegment,
                          s.audioCodec,
                          s.videoCodec,
                          s.timeOffset,
                          s.discontinuity,
                          s.trackSwitch,
                          s.contiguous,
                          s.duration,
                          s.accurateTimeOffset,
                          s.defaultInitPTS
                        )
                    }
                  }),
                    t.on(a.default.FRAG_DECRYPTED, r),
                    t.on(a.default.FRAG_PARSING_INIT_SEGMENT, r),
                    t.on(a.default.FRAG_PARSED, r),
                    t.on(a.default.ERROR, r),
                    t.on(a.default.FRAG_PARSING_METADATA, r),
                    t.on(a.default.FRAG_PARSING_USERDATA, r),
                    t.on(a.default.INIT_PTS_FOUND, r),
                    t.on(a.default.FRAG_PARSING_DATA, function (t, r) {
                      var i = [],
                        a = { event: t, data: r }
                      r.data1 && ((a.data1 = r.data1.buffer), i.push(r.data1.buffer), delete r.data1),
                        r.data2 && ((a.data2 = r.data2.buffer), i.push(r.data2.buffer), delete r.data2),
                        e.postMessage(a, i)
                    })
                }
              t.default = o
            },
            "./src/demux/id3.js": function (e, t, r) {
              "use strict"
              function i() {
                var e = Object(n.getSelfScope)()
                return a || void 0 === e.TextDecoder || (a = new e.TextDecoder("utf-8")), a
              }
              r.r(t),
                r.d(t, "utf8ArrayToStr", function () {
                  return o
                })
              var a,
                n = r("./src/utils/get-self-scope.js"),
                s = (function () {
                  function e() {}
                  return (
                    (e.isHeader = function (e, t) {
                      return (
                        t + 10 <= e.length &&
                        73 === e[t] &&
                        68 === e[t + 1] &&
                        51 === e[t + 2] &&
                        e[t + 3] < 255 &&
                        e[t + 4] < 255 &&
                        e[t + 6] < 128 &&
                        e[t + 7] < 128 &&
                        e[t + 8] < 128 &&
                        e[t + 9] < 128
                      )
                    }),
                    (e.isFooter = function (e, t) {
                      return (
                        t + 10 <= e.length &&
                        51 === e[t] &&
                        68 === e[t + 1] &&
                        73 === e[t + 2] &&
                        e[t + 3] < 255 &&
                        e[t + 4] < 255 &&
                        e[t + 6] < 128 &&
                        e[t + 7] < 128 &&
                        e[t + 8] < 128 &&
                        e[t + 9] < 128
                      )
                    }),
                    (e.getID3Data = function (t, r) {
                      for (var i = r, a = 0; e.isHeader(t, r); ) {
                        a += 10
                        ;(a += e._readSize(t, r + 6)), e.isFooter(t, r + 10) && (a += 10), (r += a)
                      }
                      if (a > 0) return t.subarray(i, i + a)
                    }),
                    (e._readSize = function (e, t) {
                      var r = 0
                      return (
                        (r = (127 & e[t]) << 21),
                        (r |= (127 & e[t + 1]) << 14),
                        (r |= (127 & e[t + 2]) << 7),
                        (r |= 127 & e[t + 3])
                      )
                    }),
                    (e.getTimeStamp = function (t) {
                      for (var r = e.getID3Frames(t), i = 0; i < r.length; i++) {
                        var a = r[i]
                        if (e.isTimeStampFrame(a)) return e._readTimeStamp(a)
                      }
                    }),
                    (e.isTimeStampFrame = function (e) {
                      return e && "PRIV" === e.key && "com.apple.streaming.transportStreamTimestamp" === e.info
                    }),
                    (e._getFrameData = function (t) {
                      var r = String.fromCharCode(t[0], t[1], t[2], t[3]),
                        i = e._readSize(t, 4)
                      return { type: r, size: i, data: t.subarray(10, 10 + i) }
                    }),
                    (e.getID3Frames = function (t) {
                      for (var r = 0, i = []; e.isHeader(t, r); ) {
                        var a = e._readSize(t, r + 6)
                        r += 10
                        for (var n = r + a; r + 8 < n; ) {
                          var s = e._getFrameData(t.subarray(r)),
                            o = e._decodeFrame(s)
                          o && i.push(o), (r += s.size + 10)
                        }
                        e.isFooter(t, r) && (r += 10)
                      }
                      return i
                    }),
                    (e._decodeFrame = function (t) {
                      return "PRIV" === t.type
                        ? e._decodePrivFrame(t)
                        : "W" === t.type[0]
                        ? e._decodeURLFrame(t)
                        : e._decodeTextFrame(t)
                    }),
                    (e._readTimeStamp = function (e) {
                      if (8 === e.data.byteLength) {
                        var t = new Uint8Array(e.data),
                          r = 1 & t[3],
                          i = (t[4] << 23) + (t[5] << 15) + (t[6] << 7) + t[7]
                        return (i /= 45), r && (i += 47721858.84), Math.round(i)
                      }
                    }),
                    (e._decodePrivFrame = function (t) {
                      if (!(t.size < 2)) {
                        var r = e._utf8ArrayToStr(t.data, !0),
                          i = new Uint8Array(t.data.subarray(r.length + 1))
                        return { key: t.type, info: r, data: i.buffer }
                      }
                    }),
                    (e._decodeTextFrame = function (t) {
                      if (!(t.size < 2)) {
                        if ("TXXX" === t.type) {
                          var r = 1,
                            i = e._utf8ArrayToStr(t.data.subarray(r), !0)
                          r += i.length + 1
                          var a = e._utf8ArrayToStr(t.data.subarray(r))
                          return { key: t.type, info: i, data: a }
                        }
                        var n = e._utf8ArrayToStr(t.data.subarray(1))
                        return { key: t.type, data: n }
                      }
                    }),
                    (e._decodeURLFrame = function (t) {
                      if ("WXXX" === t.type) {
                        if (t.size < 2) return
                        var r = 1,
                          i = e._utf8ArrayToStr(t.data.subarray(r), !0)
                        r += i.length + 1
                        var a = e._utf8ArrayToStr(t.data.subarray(r))
                        return { key: t.type, info: i, data: a }
                      }
                      var n = e._utf8ArrayToStr(t.data)
                      return { key: t.type, data: n }
                    }),
                    (e._utf8ArrayToStr = function (e, t) {
                      void 0 === t && (t = !1)
                      var r = i()
                      if (r) {
                        var a = r.decode(e)
                        if (t) {
                          var n = a.indexOf("\0")
                          return -1 !== n ? a.substring(0, n) : a
                        }
                        return a.replace(/\0/g, "")
                      }
                      for (var s, o, l, u = e.length, d = "", c = 0; c < u; ) {
                        if (0 === (s = e[c++]) && t) return d
                        if (0 !== s && 3 !== s)
                          switch (s >> 4) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                              d += String.fromCharCode(s)
                              break
                            case 12:
                            case 13:
                              ;(o = e[c++]), (d += String.fromCharCode(((31 & s) << 6) | (63 & o)))
                              break
                            case 14:
                              ;(o = e[c++]),
                                (l = e[c++]),
                                (d += String.fromCharCode(((15 & s) << 12) | ((63 & o) << 6) | ((63 & l) << 0)))
                          }
                      }
                      return d
                    }),
                    e
                  )
                })(),
                o = s._utf8ArrayToStr
              t.default = s
            },
            "./src/demux/mp4demuxer.js": function (e, t, r) {
              "use strict"
              r.r(t)
              var i = r("./src/utils/logger.js"),
                a = r("./src/events.js"),
                n = Math.pow(2, 32) - 1,
                s = (function () {
                  function e(e, t) {
                    ;(this.observer = e), (this.remuxer = t)
                  }
                  var t = e.prototype
                  return (
                    (t.resetTimeStamp = function (e) {
                      this.initPTS = e
                    }),
                    (t.resetInitSegment = function (t, r, i, n) {
                      if (t && t.byteLength) {
                        var s = (this.initData = e.parseInitSegment(t))
                        null == r && (r = "mp4a.40.5"), null == i && (i = "avc1.42e01e")
                        var o = {}
                        s.audio && s.video
                          ? (o.audiovideo = { container: "video/mp4", codec: r + "," + i, initSegment: n ? t : null })
                          : (s.audio && (o.audio = { container: "audio/mp4", codec: r, initSegment: n ? t : null }),
                            s.video && (o.video = { container: "video/mp4", codec: i, initSegment: n ? t : null })),
                          this.observer.trigger(a.default.FRAG_PARSING_INIT_SEGMENT, { tracks: o })
                      } else r && (this.audioCodec = r), i && (this.videoCodec = i)
                    }),
                    (e.probe = function (t) {
                      return e.findBox({ data: t, start: 0, end: Math.min(t.length, 16384) }, ["moof"]).length > 0
                    }),
                    (e.bin2str = function (e) {
                      return String.fromCharCode.apply(null, e)
                    }),
                    (e.readUint16 = function (e, t) {
                      e.data && ((t += e.start), (e = e.data))
                      var r = (e[t] << 8) | e[t + 1]
                      return r < 0 ? 65536 + r : r
                    }),
                    (e.readUint32 = function (e, t) {
                      e.data && ((t += e.start), (e = e.data))
                      var r = (e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3]
                      return r < 0 ? 4294967296 + r : r
                    }),
                    (e.writeUint32 = function (e, t, r) {
                      e.data && ((t += e.start), (e = e.data)),
                        (e[t] = r >> 24),
                        (e[t + 1] = (r >> 16) & 255),
                        (e[t + 2] = (r >> 8) & 255),
                        (e[t + 3] = 255 & r)
                    }),
                    (e.findBox = function (t, r) {
                      var i,
                        a,
                        n,
                        s,
                        o,
                        l,
                        u,
                        d = []
                      if (
                        (t.data ? ((l = t.start), (s = t.end), (t = t.data)) : ((l = 0), (s = t.byteLength)), !r.length)
                      )
                        return null
                      for (i = l; i < s; )
                        (a = e.readUint32(t, i)),
                          (n = e.bin2str(t.subarray(i + 4, i + 8))),
                          (u = a > 1 ? i + a : s),
                          n === r[0] &&
                            (1 === r.length
                              ? d.push({ data: t, start: i + 8, end: u })
                              : ((o = e.findBox({ data: t, start: i + 8, end: u }, r.slice(1))),
                                o.length && (d = d.concat(o)))),
                          (i = u)
                      return d
                    }),
                    (e.parseSegmentIndex = function (t) {
                      var r,
                        i = e.findBox(t, ["moov"])[0],
                        a = i ? i.end : null,
                        n = 0,
                        s = e.findBox(t, ["sidx"])
                      if (!s || !s[0]) return null
                      ;(r = []), (s = s[0])
                      var o = s.data[0]
                      n = 0 === o ? 8 : 16
                      var l = e.readUint32(s, n)
                      n += 4
                      ;(n += 0 === o ? 8 : 16), (n += 2)
                      var u = s.end + 0,
                        d = e.readUint16(s, n)
                      n += 2
                      for (var c = 0; c < d; c++) {
                        var f = n,
                          h = e.readUint32(s, f)
                        f += 4
                        var g = 2147483647 & h
                        if (1 === (2147483648 & h) >>> 31)
                          return void console.warn("SIDX has hierarchical references (not supported)")
                        var p = e.readUint32(s, f)
                        ;(f += 4),
                          r.push({
                            referenceSize: g,
                            subsegmentDuration: p,
                            info: { duration: p / l, start: u, end: u + g - 1 },
                          }),
                          (u += g),
                          (f += 4),
                          (n = f)
                      }
                      return {
                        earliestPresentationTime: 0,
                        timescale: l,
                        version: o,
                        referencesCount: d,
                        references: r,
                        moovEndOffset: a,
                      }
                    }),
                    (e.parseInitSegment = function (t) {
                      var r = []
                      return (
                        e.findBox(t, ["moov", "trak"]).forEach(function (t) {
                          var a = e.findBox(t, ["tkhd"])[0]
                          if (a) {
                            var n = a.data[a.start],
                              s = 0 === n ? 12 : 20,
                              o = e.readUint32(a, s),
                              l = e.findBox(t, ["mdia", "mdhd"])[0]
                            if (l) {
                              ;(n = l.data[l.start]), (s = 0 === n ? 12 : 20)
                              var u = e.readUint32(l, s),
                                d = e.findBox(t, ["mdia", "hdlr"])[0]
                              if (d) {
                                var c = e.bin2str(d.data.subarray(d.start + 8, d.start + 12)),
                                  f = { soun: "audio", vide: "video" }[c]
                                if (f) {
                                  var h = e.findBox(t, ["mdia", "minf", "stbl", "stsd"])
                                  if (h.length) {
                                    h = h[0]
                                    var g = e.bin2str(h.data.subarray(h.start + 12, h.start + 16))
                                    i.logger.log("MP4Demuxer:" + f + ":" + g + " found")
                                  }
                                  ;(r[o] = { timescale: u, type: f }), (r[f] = { timescale: u, id: o })
                                }
                              }
                            }
                          }
                        }),
                        r
                      )
                    }),
                    (e.getStartDTS = function (t, r) {
                      var i, a, n
                      return (
                        (i = e.findBox(r, ["moof", "traf"])),
                        (a = [].concat.apply(
                          [],
                          i.map(function (r) {
                            return e.findBox(r, ["tfhd"]).map(function (i) {
                              var a, n
                              return (
                                (a = e.readUint32(i, 4)),
                                (n = t[a].timescale || 9e4),
                                e.findBox(r, ["tfdt"]).map(function (t) {
                                  var r, i
                                  return (
                                    (r = t.data[t.start]),
                                    (i = e.readUint32(t, 4)),
                                    1 === r && ((i *= Math.pow(2, 32)), (i += e.readUint32(t, 8))),
                                    i
                                  )
                                })[0] / n
                              )
                            })
                          })
                        )),
                        (n = Math.min.apply(null, a)),
                        isFinite(n) ? n : 0
                      )
                    }),
                    (e.offsetStartDTS = function (t, r, i) {
                      e.findBox(r, ["moof", "traf"]).map(function (r) {
                        return e.findBox(r, ["tfhd"]).map(function (a) {
                          var s = e.readUint32(a, 4),
                            o = t[s].timescale || 9e4
                          e.findBox(r, ["tfdt"]).map(function (t) {
                            var r = t.data[t.start],
                              a = e.readUint32(t, 4)
                            if (0 === r) e.writeUint32(t, 4, a - i * o)
                            else {
                              ;(a *= Math.pow(2, 32)), (a += e.readUint32(t, 8)), (a -= i * o), (a = Math.max(a, 0))
                              var s = Math.floor(a / (n + 1)),
                                l = Math.floor(a % (n + 1))
                              e.writeUint32(t, 4, s), e.writeUint32(t, 8, l)
                            }
                          })
                        })
                      })
                    }),
                    (t.append = function (t, r, i, n) {
                      var s = this.initData
                      s || (this.resetInitSegment(t, this.audioCodec, this.videoCodec, !1), (s = this.initData))
                      var o,
                        l = this.initPTS
                      if (void 0 === l) {
                        var u = e.getStartDTS(s, t)
                        ;(this.initPTS = l = u - r), this.observer.trigger(a.default.INIT_PTS_FOUND, { initPTS: l })
                      }
                      e.offsetStartDTS(s, t, l),
                        (o = e.getStartDTS(s, t)),
                        this.remuxer.remux(s.audio, s.video, null, null, o, i, n, t)
                    }),
                    (t.destroy = function () {}),
                    e
                  )
                })()
              t.default = s
            },
            "./src/errors.ts": function (e, t, r) {
              "use strict"
              r.r(t),
                r.d(t, "ErrorTypes", function () {
                  return i
                }),
                r.d(t, "ErrorDetails", function () {
                  return a
                })
              var i
              !(function (e) {
                ;(e.NETWORK_ERROR = "networkError"),
                  (e.MEDIA_ERROR = "mediaError"),
                  (e.KEY_SYSTEM_ERROR = "keySystemError"),
                  (e.MUX_ERROR = "muxError"),
                  (e.OTHER_ERROR = "otherError")
              })(i || (i = {}))
              var a
              !(function (e) {
                ;(e.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys"),
                  (e.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess"),
                  (e.KEY_SYSTEM_NO_SESSION = "keySystemNoSession"),
                  (e.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed"),
                  (e.KEY_SYSTEM_NO_INIT_DATA = "keySystemNoInitData"),
                  (e.MANIFEST_LOAD_ERROR = "manifestLoadError"),
                  (e.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut"),
                  (e.MANIFEST_PARSING_ERROR = "manifestParsingError"),
                  (e.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError"),
                  (e.LEVEL_EMPTY_ERROR = "levelEmptyError"),
                  (e.LEVEL_LOAD_ERROR = "levelLoadError"),
                  (e.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut"),
                  (e.LEVEL_SWITCH_ERROR = "levelSwitchError"),
                  (e.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError"),
                  (e.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut"),
                  (e.FRAG_LOAD_ERROR = "fragLoadError"),
                  (e.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut"),
                  (e.FRAG_DECRYPT_ERROR = "fragDecryptError"),
                  (e.FRAG_PARSING_ERROR = "fragParsingError"),
                  (e.REMUX_ALLOC_ERROR = "remuxAllocError"),
                  (e.KEY_LOAD_ERROR = "keyLoadError"),
                  (e.KEY_LOAD_TIMEOUT = "keyLoadTimeOut"),
                  (e.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError"),
                  (e.BUFFER_APPEND_ERROR = "bufferAppendError"),
                  (e.BUFFER_APPENDING_ERROR = "bufferAppendingError"),
                  (e.BUFFER_STALLED_ERROR = "bufferStalledError"),
                  (e.BUFFER_FULL_ERROR = "bufferFullError"),
                  (e.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole"),
                  (e.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall"),
                  (e.INTERNAL_EXCEPTION = "internalException")
              })(a || (a = {}))
            },
            "./src/events.js": function (e, t, r) {
              "use strict"
              r.r(t)
              var i = {
                MEDIA_ATTACHING: "hlsMediaAttaching",
                MEDIA_ATTACHED: "hlsMediaAttached",
                MEDIA_DETACHING: "hlsMediaDetaching",
                MEDIA_DETACHED: "hlsMediaDetached",
                BUFFER_RESET: "hlsBufferReset",
                BUFFER_CODECS: "hlsBufferCodecs",
                BUFFER_CREATED: "hlsBufferCreated",
                BUFFER_APPENDING: "hlsBufferAppending",
                BUFFER_APPENDED: "hlsBufferAppended",
                BUFFER_EOS: "hlsBufferEos",
                BUFFER_FLUSHING: "hlsBufferFlushing",
                BUFFER_FLUSHED: "hlsBufferFlushed",
                MANIFEST_LOADING: "hlsManifestLoading",
                MANIFEST_LOADED: "hlsManifestLoaded",
                MANIFEST_PARSED: "hlsManifestParsed",
                LEVEL_SWITCHING: "hlsLevelSwitching",
                LEVEL_SWITCHED: "hlsLevelSwitched",
                LEVEL_LOADING: "hlsLevelLoading",
                LEVEL_LOADED: "hlsLevelLoaded",
                LEVEL_UPDATED: "hlsLevelUpdated",
                LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
                LEVELS_UPDATED: "hlsLevelsUpdated",
                AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
                AUDIO_TRACK_SWITCHING: "hlsAudioTrackSwitching",
                AUDIO_TRACK_SWITCHED: "hlsAudioTrackSwitched",
                AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
                AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
                SUBTITLE_TRACKS_UPDATED: "hlsSubtitleTracksUpdated",
                SUBTITLE_TRACK_SWITCH: "hlsSubtitleTrackSwitch",
                SUBTITLE_TRACK_LOADING: "hlsSubtitleTrackLoading",
                SUBTITLE_TRACK_LOADED: "hlsSubtitleTrackLoaded",
                SUBTITLE_FRAG_PROCESSED: "hlsSubtitleFragProcessed",
                CUES_PARSED: "hlsCuesParsed",
                NON_NATIVE_TEXT_TRACKS_FOUND: "hlsNonNativeTextTracksFound",
                INIT_PTS_FOUND: "hlsInitPtsFound",
                FRAG_LOADING: "hlsFragLoading",
                FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
                FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
                FRAG_LOADED: "hlsFragLoaded",
                FRAG_DECRYPTED: "hlsFragDecrypted",
                FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
                FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
                FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
                FRAG_PARSING_DATA: "hlsFragParsingData",
                FRAG_PARSED: "hlsFragParsed",
                FRAG_BUFFERED: "hlsFragBuffered",
                FRAG_CHANGED: "hlsFragChanged",
                FPS_DROP: "hlsFpsDrop",
                FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
                ERROR: "hlsError",
                DESTROYING: "hlsDestroying",
                KEY_LOADING: "hlsKeyLoading",
                KEY_LOADED: "hlsKeyLoaded",
                STREAM_STATE_TRANSITION: "hlsStreamStateTransition",
                LIVE_BACK_BUFFER_REACHED: "hlsLiveBackBufferReached",
              }
              t.default = i
            },
            "./src/hls.ts": function (e, t, r) {
              "use strict"
              function i(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function a(e, t, r) {
                return t && i(e.prototype, t), r && i(e, r), e
              }
              function n(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function s(e, t, r) {
                return t && n(e.prototype, t), r && n(e, r), e
              }
              function o(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function l(e, t, r) {
                return t && o(e.prototype, t), r && o(e, r), e
              }
              function u(e, t) {
                var r = pt[t]
                return !!r && !0 === r[e.slice(0, 4)]
              }
              function d(e, t) {
                return MediaSource.isTypeSupported((t || "video") + '/mp4;codecs="' + e + '"')
              }
              function c(e, t) {
                for (var r = e[t], i = t - 1; i >= 0; i--) {
                  var a = e[i]
                  ;(a.programDateTime = r.programDateTime - 1e3 * a.duration), (r = a)
                }
              }
              function f(e, t) {
                e.rawProgramDateTime
                  ? (e.programDateTime = Date.parse(e.rawProgramDateTime))
                  : (null === t || void 0 === t ? void 0 : t.programDateTime) &&
                    (e.programDateTime = t.endProgramDateTime),
                  Object(Je.isFiniteNumber)(e.programDateTime) ||
                    ((e.programDateTime = null), (e.rawProgramDateTime = null))
              }
              function h(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function g(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function p(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function v(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function m() {
                return window.MediaSource || window.WebKitMediaSource
              }
              function y(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function E(e, t, r) {
                switch (t) {
                  case "audio":
                    e.audioGroupIds || (e.audioGroupIds = []), e.audioGroupIds.push(r)
                    break
                  case "text":
                    e.textGroupIds || (e.textGroupIds = []), e.textGroupIds.push(r)
                }
              }
              function T(e, t, r) {
                var i = e[t],
                  a = e[r],
                  n = a.startPTS
                if (Object(Je.isFiniteNumber)(n))
                  r > t
                    ? ((i.duration = n - i.start),
                      i.duration < 0 &&
                        et.logger.warn(
                          "negative duration computed for frag " +
                            i.sn +
                            ",level " +
                            i.level +
                            ", there should be some duration drift between playlist and fragment!"
                        ))
                    : ((a.duration = i.start - n),
                      a.duration < 0 &&
                        et.logger.warn(
                          "negative duration computed for frag " +
                            a.sn +
                            ",level " +
                            a.level +
                            ", there should be some duration drift between playlist and fragment!"
                        ))
                else if (r > t) {
                  var s = i.cc === a.cc
                  a.start = i.start + (s && i.minEndPTS ? i.minEndPTS - i.start : i.duration)
                } else a.start = Math.max(i.start - a.duration, 0)
              }
              function S(e, t, r, i, a, n) {
                var s = r,
                  o = i
                if (Object(Je.isFiniteNumber)(t.startPTS)) {
                  var l = Math.abs(t.startPTS - r)
                  Object(Je.isFiniteNumber)(t.deltaPTS) ? (t.deltaPTS = Math.max(l, t.deltaPTS)) : (t.deltaPTS = l),
                    (s = Math.max(r, t.startPTS)),
                    (r = Math.min(r, t.startPTS)),
                    (o = Math.min(i, t.endPTS)),
                    (i = Math.max(i, t.endPTS)),
                    (a = Math.min(a, t.startDTS)),
                    (n = Math.max(n, t.endDTS))
                }
                var u = r - t.start
                ;(t.start = t.startPTS = r),
                  (t.maxStartPTS = s),
                  (t.endPTS = i),
                  (t.minEndPTS = o),
                  (t.startDTS = a),
                  (t.endDTS = n),
                  (t.duration = i - r)
                var d = t.sn
                if (!e || d < e.startSN || d > e.endSN) return 0
                var c, f, h
                for (c = d - e.startSN, f = e.fragments, f[c] = t, h = c; h > 0; h--) T(f, h, h - 1)
                for (h = c; h < f.length - 1; h++) T(f, h, h + 1)
                return (e.PTSKnown = !0), u
              }
              function b(e, t) {
                t.initSegment && e.initSegment && (t.initSegment = e.initSegment)
                var r,
                  i = 0
                if (
                  (A(e, t, function (e, a) {
                    ;(i = e.cc - a.cc),
                      Object(Je.isFiniteNumber)(e.startPTS) &&
                        ((a.start = a.startPTS = e.startPTS),
                        (a.endPTS = e.endPTS),
                        (a.duration = e.duration),
                        (a.backtracked = e.backtracked),
                        (a.dropped = e.dropped),
                        (r = a)),
                      (t.PTSKnown = !0)
                  }),
                  t.PTSKnown)
                ) {
                  if (i) {
                    et.logger.log("discontinuity sliding from playlist, take drift into account")
                    for (var a = t.fragments, n = 0; n < a.length; n++) a[n].cc += i
                  }
                  r ? S(t, r, r.startPTS, r.endPTS, r.startDTS, r.endDTS) : R(e, t), (t.PTSKnown = e.PTSKnown)
                }
              }
              function _(e, t, r) {
                void 0 === r && (r = 0)
                var i = -1
                A(e, t, function (e, t, r) {
                  ;(t.start = e.start), (i = r)
                })
                var a = t.fragments
                if (i < 0)
                  return void a.forEach(function (e) {
                    e.start += r
                  })
                for (var n = i + 1; n < a.length; n++) a[n].start = a[n - 1].start + a[n - 1].duration
              }
              function A(e, t, r) {
                if (e && t)
                  for (
                    var i = Math.max(e.startSN, t.startSN) - t.startSN,
                      a = Math.min(e.endSN, t.endSN) - t.startSN,
                      n = t.startSN - e.startSN,
                      s = i;
                    s <= a;
                    s++
                  ) {
                    var o = e.fragments[n + s],
                      l = t.fragments[s]
                    if (!o || !l) break
                    r(o, l, s)
                  }
              }
              function R(e, t) {
                var r = t.startSN - e.startSN,
                  i = e.fragments,
                  a = t.fragments
                if (!(r < 0 || r > i.length)) for (var n = 0; n < a.length; n++) a[n].start += i[r].start
              }
              function D(e, t, r) {
                var i = 1e3 * (t.averagetargetduration ? t.averagetargetduration : t.targetduration),
                  a = i / 2
                return (
                  e && t.endSN === e.endSN && (i = a),
                  r && (i = Math.max(a, i - (window.performance.now() - r))),
                  Math.round(i)
                )
              }
              function L(e, t) {
                for (var r = null, i = 0; i < e.length; i += 1) {
                  var a = e[i]
                  if (a && a.cc === t) {
                    r = a
                    break
                  }
                }
                return r
              }
              function k(e, t) {
                return Pt.search(e, function (e) {
                  return e.cc < t ? 1 : e.cc > t ? -1 : 0
                })
              }
              function w(e, t, r) {
                var i = !1
                return t && t.details && r && (r.endCC > r.startCC || (e && e.cc < r.startCC)) && (i = !0), i
              }
              function I(e, t) {
                var r = e.fragments,
                  i = t.fragments
                if (!i.length || !r.length) return void et.logger.log("No fragments to align")
                var a = L(r, i[0].cc)
                return !a || (a && !a.startPTS) ? void et.logger.log("No frag in previous level to align on") : a
              }
              function O(e, t) {
                t.fragments.forEach(function (t) {
                  if (t) {
                    var r = t.start + e
                    ;(t.start = t.startPTS = r), (t.endPTS = r + t.duration)
                  }
                }),
                  (t.PTSKnown = !0)
              }
              function C(e, t, r) {
                P(e, r, t), !r.PTSKnown && t && x(r, t.details)
              }
              function P(e, t, r) {
                if (w(e, r, t)) {
                  var i = I(r.details, t)
                  i &&
                    (et.logger.log("Adjusting PTS using last level due to CC increase within current level"),
                    O(i.start, t))
                }
              }
              function x(e, t) {
                if (t && t.fragments.length) {
                  if (!e.hasProgramDateTime || !t.hasProgramDateTime) return
                  var r = t.fragments[0].programDateTime,
                    i = e.fragments[0].programDateTime,
                    a = (i - r) / 1e3 + t.fragments[0].start
                  Object(Je.isFiniteNumber)(a) &&
                    (et.logger.log("adjusting PTS using programDateTime delta, sliding:" + a.toFixed(3)), O(a, e))
                }
              }
              function F(e, t, r) {
                if (null === t || !Array.isArray(e) || !e.length || !Object(Je.isFiniteNumber)(t)) return null
                if (t < (e[0].programDateTime || 0)) return null
                if (t >= (e[e.length - 1].endProgramDateTime || 0)) return null
                r = r || 0
                for (var i = 0; i < e.length; ++i) {
                  var a = e[i]
                  if (U(t, r, a)) return a
                }
                return null
              }
              function M(e, t, r, i) {
                void 0 === r && (r = 0), void 0 === i && (i = 0)
                var a = null
                if (
                  (e ? (a = t[e.sn - t[0].sn + 1]) : 0 === r && 0 === t[0].start && (a = t[0]), a && 0 === N(r, i, a))
                )
                  return a
                var n = Pt.search(t, N.bind(null, r, i))
                return n || a
              }
              function N(e, t, r) {
                void 0 === e && (e = 0), void 0 === t && (t = 0)
                var i = Math.min(t, r.duration + (r.deltaPTS ? r.deltaPTS : 0))
                return r.start + r.duration - i <= e ? 1 : r.start - i > e && r.start ? -1 : 0
              }
              function U(e, t, r) {
                var i = 1e3 * Math.min(t, r.duration + (r.deltaPTS ? r.deltaPTS : 0))
                return (r.endProgramDateTime || 0) - i > e
              }
              function B(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                return e
              }
              function G(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function j(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function K(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function H(e, t, r) {
                return t && K(e.prototype, t), r && K(e, r), e
              }
              function V(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function Y(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function W(e, t, r) {
                return t && Y(e.prototype, t), r && Y(e, r), e
              }
              function q(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function X(e, t) {
                var r
                try {
                  r = new Event("addtrack")
                } catch (e) {
                  ;(r = document.createEvent("Event")), r.initEvent("addtrack", !1, !1)
                }
                ;(r.track = e), t.dispatchEvent(r)
              }
              function z(e) {
                if (null === e || void 0 === e ? void 0 : e.cues) for (; e.cues.length > 0; ) e.removeCue(e.cues[0])
              }
              function Q(e, t) {
                if (t < e[0].endTime) return e[0]
                if (t > e[e.length - 1].endTime) return e[e.length - 1]
                for (var r = 0, i = e.length - 1; r <= i; ) {
                  var a = Math.floor((i + r) / 2)
                  if (t < e[a].endTime) i = a - 1
                  else {
                    if (!(t > e[a].endTime)) return e[a]
                    r = a + 1
                  }
                }
                return e[r].endTime - t < t - e[i].endTime ? e[r] : e[i]
              }
              function $(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function J() {
                var e = m()
                if (!e) return !1
                var t = self.SourceBuffer || self.WebKitSourceBuffer,
                  r =
                    e &&
                    "function" == typeof e.isTypeSupported &&
                    e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
                  i =
                    !t ||
                    (t.prototype &&
                      "function" == typeof t.prototype.appendBuffer &&
                      "function" == typeof t.prototype.remove)
                return !!r && !!i
              }
              function Z(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function ee(e, t, r) {
                return t && Z(e.prototype, t), r && Z(e, r), e
              }
              function te(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                return e
              }
              function re(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function ie(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function ae(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function ne(e, t, r) {
                return t && ae(e.prototype, t), r && ae(e, r), e
              }
              function se(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function oe(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function le(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function ue(e, t, r) {
                return t && le(e.prototype, t), r && le(e, r), e
              }
              function de(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function ce(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function fe(e, t, r) {
                return t && ce(e.prototype, t), r && ce(e, r), e
              }
              function he(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function ge() {
                ;(this.window = window),
                  (this.state = "INITIAL"),
                  (this.buffer = ""),
                  (this.decoder = new kr()),
                  (this.regionList = [])
              }
              function pe(e) {
                function t(e, t, r, i) {
                  return 3600 * (0 | e) + 60 * (0 | t) + (0 | r) + (0 | i) / 1e3
                }
                var r = e.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/)
                return r
                  ? r[3]
                    ? t(r[1], r[2], r[3].replace(":", ""), r[4])
                    : r[1] > 59
                    ? t(r[1], r[2], 0, r[4])
                    : t(0, r[1], r[2], r[4])
                  : null
              }
              function ve() {
                this.values = Object.create(null)
              }
              function me(e, t, r, i) {
                var a = i ? e.split(i) : [e]
                for (var n in a)
                  if ("string" == typeof a[n]) {
                    var s = a[n].split(r)
                    if (2 === s.length) {
                      var o = s[0],
                        l = s[1]
                      t(o, l)
                    }
                  }
              }
              function ye(e, t, r) {
                function i() {
                  var t = pe(e)
                  if (null === t) throw new Error("Malformed timestamp: " + n)
                  return (e = e.replace(/^[^\sa-zA-Z-]+/, "")), t
                }
                function a() {
                  e = e.replace(/^\s+/, "")
                }
                var n = e
                if ((a(), (t.startTime = i()), a(), "--\x3e" !== e.substr(0, 3)))
                  throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): " + n)
                ;(e = e.substr(3)),
                  a(),
                  (t.endTime = i()),
                  a(),
                  (function (e, t) {
                    var i = new ve()
                    me(
                      e,
                      function (e, t) {
                        switch (e) {
                          case "region":
                            for (var a = r.length - 1; a >= 0; a--)
                              if (r[a].id === t) {
                                i.set(e, r[a].region)
                                break
                              }
                            break
                          case "vertical":
                            i.alt(e, t, ["rl", "lr"])
                            break
                          case "line":
                            var n = t.split(","),
                              s = n[0]
                            i.integer(e, s),
                              i.percent(e, s) && i.set("snapToLines", !1),
                              i.alt(e, s, ["auto"]),
                              2 === n.length && i.alt("lineAlign", n[1], ["start", Ir, "end"])
                            break
                          case "position":
                            ;(n = t.split(",")),
                              i.percent(e, n[0]),
                              2 === n.length &&
                                i.alt("positionAlign", n[1], ["start", Ir, "end", "line-left", "line-right", "auto"])
                            break
                          case "size":
                            i.percent(e, t)
                            break
                          case "align":
                            i.alt(e, t, ["start", Ir, "end", "left", "right"])
                        }
                      },
                      /:/,
                      /\s/
                    ),
                      (t.region = i.get("region", null)),
                      (t.vertical = i.get("vertical", ""))
                    var a = i.get("line", "auto")
                    "auto" === a && -1 === wr.line && (a = -1),
                      (t.line = a),
                      (t.lineAlign = i.get("lineAlign", "start")),
                      (t.snapToLines = i.get("snapToLines", !0)),
                      (t.size = i.get("size", 100)),
                      (t.align = i.get("align", Ir))
                    var n = i.get("position", "auto")
                    "auto" === n &&
                      50 === wr.position &&
                      (n =
                        "start" === t.align || "left" === t.align
                          ? 0
                          : "end" === t.align || "right" === t.align
                          ? 100
                          : 50),
                      (t.position = n)
                  })(e, t)
              }
              function Ee(e) {
                return e.replace(/<br(?: \/)?>/gi, "\n")
              }
              function Te(e, t, r, i) {
                for (var a, n, s, o, l, u = [], d = window.VTTCue || TextTrackCue, c = 0; c < i.rows.length; c++)
                  if (((a = i.rows[c]), (s = !0), (o = 0), (l = ""), !a.isEmpty())) {
                    for (var f = 0; f < a.chars.length; f++)
                      a.chars[f].uchar.match(/\s/) && s ? o++ : ((l += a.chars[f].uchar), (s = !1))
                    ;(a.cueStartTime = t),
                      t === r && (r += 1e-4),
                      (n = new d(t, r, Ee(l.trim()))),
                      o >= 16 ? o-- : o++,
                      navigator.userAgent.match(/Firefox\//) ? (n.line = c + 1) : (n.line = c > 7 ? c - 2 : c + 1),
                      (n.align = "left"),
                      (n.position = Math.max(0, Math.min(100, (o / 32) * 100))),
                      u.push(n),
                      e && e.addCue(n)
                  }
                return u
              }
              function Se(e, t, r) {
                ;(r.a = e), (r.b = t)
              }
              function be(e, t, r) {
                return r.a === e && r.b === t
              }
              function _e() {
                return { a: null, b: null }
              }
              function Ae(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                return e
              }
              function Re(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function De(e, t) {
                return e && e.label === t.name && !(e.textTrack1 || e.textTrack2)
              }
              function Le(e, t, r, i) {
                return Math.min(t, i) - Math.max(e, r)
              }
              function ke() {
                return { ccOffset: 0, presentationOffset: 0, 0: { start: 0, prevCC: -1, new: !1 } }
              }
              function we(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function Ie(e, t, r) {
                return t && we(e.prototype, t), r && we(e, r), e
              }
              function Oe(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function Ce(e) {
                for (var t = [], r = 0; r < e.length; r++) {
                  var i = e[r]
                  "subtitles" === i.kind && i.label && t.push(e[r])
                }
                return t
              }
              function Pe(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                return e
              }
              function xe(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function Fe(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function Me(e, t, r) {
                return t && Fe(e.prototype, t), r && Fe(e, r), e
              }
              function Ne(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              function Ue(e, t) {
                var r = Object.keys(e)
                if (Object.getOwnPropertySymbols) {
                  var i = Object.getOwnPropertySymbols(e)
                  t &&
                    (i = i.filter(function (t) {
                      return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })),
                    r.push.apply(r, i)
                }
                return r
              }
              function Be(e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = null != arguments[t] ? arguments[t] : {}
                  t % 2
                    ? Ue(Object(r), !0).forEach(function (t) {
                        Ge(e, t, r[t])
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                    : Ue(Object(r)).forEach(function (t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                      })
                }
                return e
              }
              function Ge(e, t, r) {
                return (
                  t in e
                    ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
                    : (e[t] = r),
                  e
                )
              }
              function je(e, t) {
                var r = Object.keys(e)
                if (Object.getOwnPropertySymbols) {
                  var i = Object.getOwnPropertySymbols(e)
                  t &&
                    (i = i.filter(function (t) {
                      return Object.getOwnPropertyDescriptor(e, t).enumerable
                    })),
                    r.push.apply(r, i)
                }
                return r
              }
              function Ke(e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = null != arguments[t] ? arguments[t] : {}
                  t % 2
                    ? je(Object(r), !0).forEach(function (t) {
                        He(e, t, r[t])
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
                    : je(Object(r)).forEach(function (t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
                      })
                }
                return e
              }
              function He(e, t, r) {
                return (
                  t in e
                    ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 })
                    : (e[t] = r),
                  e
                )
              }
              function Ve(e) {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                return e
              }
              function Ye(e, t) {
                for (var r = 0; r < t.length; r++) {
                  var i = t[r]
                  ;(i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    "value" in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
              }
              function We(e, t, r) {
                return t && Ye(e.prototype, t), r && Ye(e, r), e
              }
              function qe(e, t) {
                ;(e.prototype = Object.create(t.prototype)), (e.prototype.constructor = e), (e.__proto__ = t)
              }
              r.r(t),
                r.d(t, "default", function () {
                  return Ei
                })
              var Xe = {}
              r.r(Xe),
                r.d(Xe, "newCue", function () {
                  return Te
                })
              var ze,
                Qe = r("./node_modules/url-toolkit/src/url-toolkit.js"),
                $e = r("./src/errors.ts"),
                Je = r("./src/polyfills/number.js"),
                Ze = r("./src/events.js"),
                et = r("./src/utils/logger.js"),
                tt = { hlsEventGeneric: !0, hlsHandlerDestroying: !0, hlsHandlerDestroyed: !0 },
                rt = (function () {
                  function e(e) {
                    ;(this.hls = void 0),
                      (this.handledEvents = void 0),
                      (this.useGenericHandler = void 0),
                      (this.hls = e),
                      (this.onEvent = this.onEvent.bind(this))
                    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                      r[i - 1] = arguments[i]
                    ;(this.handledEvents = r), (this.useGenericHandler = !0), this.registerListeners()
                  }
                  var t = e.prototype
                  return (
                    (t.destroy = function () {
                      this.onHandlerDestroying(), this.unregisterListeners(), this.onHandlerDestroyed()
                    }),
                    (t.onHandlerDestroying = function () {}),
                    (t.onHandlerDestroyed = function () {}),
                    (t.isEventHandler = function () {
                      return (
                        "object" == typeof this.handledEvents &&
                        this.handledEvents.length &&
                        "function" == typeof this.onEvent
                      )
                    }),
                    (t.registerListeners = function () {
                      this.isEventHandler() &&
                        this.handledEvents.forEach(function (e) {
                          if (tt[e]) throw new Error("Forbidden event-name: " + e)
                          this.hls.on(e, this.onEvent)
                        }, this)
                    }),
                    (t.unregisterListeners = function () {
                      this.isEventHandler() &&
                        this.handledEvents.forEach(function (e) {
                          this.hls.off(e, this.onEvent)
                        }, this)
                    }),
                    (t.onEvent = function (e, t) {
                      this.onEventGeneric(e, t)
                    }),
                    (t.onEventGeneric = function (e, t) {
                      var r = function (e, t) {
                        var r = "on" + e.replace("hls", "")
                        if ("function" != typeof this[r])
                          throw new Error(
                            "Event " +
                              e +
                              " has no generic handler in this " +
                              this.constructor.name +
                              " class (tried " +
                              r +
                              ")"
                          )
                        return this[r].bind(this, t)
                      }
                      try {
                        r.call(this, e, t).call()
                      } catch (t) {
                        et.logger.error(
                          "An internal error happened while handling event " +
                            e +
                            '. Error message: "' +
                            t.message +
                            '". Here is a stacktrace:',
                          t
                        ),
                          this.hls.trigger(Ze.default.ERROR, {
                            type: $e.ErrorTypes.OTHER_ERROR,
                            details: $e.ErrorDetails.INTERNAL_EXCEPTION,
                            fatal: !1,
                            event: e,
                            err: t,
                          })
                      }
                    }),
                    e
                  )
                })(),
                it = rt
              !(function (e) {
                ;(e.MANIFEST = "manifest"),
                  (e.LEVEL = "level"),
                  (e.AUDIO_TRACK = "audioTrack"),
                  (e.SUBTITLE_TRACK = "subtitleTrack")
              })(ze || (ze = {}))
              var at
              !(function (e) {
                ;(e.MAIN = "main"), (e.AUDIO = "audio"), (e.SUBTITLE = "subtitle")
              })(at || (at = {}))
              var nt,
                st = r("./src/demux/mp4demuxer.js"),
                ot = (function () {
                  function e(e, t) {
                    ;(this._uri = null),
                      (this.baseuri = void 0),
                      (this.reluri = void 0),
                      (this.method = null),
                      (this.key = null),
                      (this.iv = null),
                      (this.baseuri = e),
                      (this.reluri = t)
                  }
                  return (
                    a(e, [
                      {
                        key: "uri",
                        get: function () {
                          return (
                            !this._uri &&
                              this.reluri &&
                              (this._uri = Object(Qe.buildAbsoluteURL)(this.baseuri, this.reluri, {
                                alwaysNormalize: !0,
                              })),
                            this._uri
                          )
                        },
                      },
                    ]),
                    e
                  )
                })()
              !(function (e) {
                ;(e.AUDIO = "audio"), (e.VIDEO = "video")
              })(nt || (nt = {}))
              var lt,
                ut = (function () {
                  function e() {
                    var e
                    ;(this._url = null),
                      (this._byteRange = null),
                      (this._decryptdata = null),
                      (this._elementaryStreams = ((e = {}), (e[nt.AUDIO] = !1), (e[nt.VIDEO] = !1), e)),
                      (this.deltaPTS = 0),
                      (this.rawProgramDateTime = null),
                      (this.programDateTime = null),
                      (this.title = null),
                      (this.tagList = []),
                      (this.cc = void 0),
                      (this.type = void 0),
                      (this.relurl = void 0),
                      (this.baseurl = void 0),
                      (this.duration = void 0),
                      (this.start = void 0),
                      (this.sn = 0),
                      (this.urlId = 0),
                      (this.level = 0),
                      (this.levelkey = void 0),
                      (this.loader = void 0)
                  }
                  var t = e.prototype
                  return (
                    (t.setByteRange = function (e, t) {
                      var r = e.split("@", 2),
                        i = []
                      1 === r.length ? (i[0] = t ? t.byteRangeEndOffset : 0) : (i[0] = parseInt(r[1])),
                        (i[1] = parseInt(r[0]) + i[0]),
                        (this._byteRange = i)
                    }),
                    (t.addElementaryStream = function (e) {
                      this._elementaryStreams[e] = !0
                    }),
                    (t.hasElementaryStream = function (e) {
                      return !0 === this._elementaryStreams[e]
                    }),
                    (t.createInitializationVector = function (e) {
                      for (var t = new Uint8Array(16), r = 12; r < 16; r++) t[r] = (e >> (8 * (15 - r))) & 255
                      return t
                    }),
                    (t.setDecryptDataFromLevelKey = function (e, t) {
                      var r = e
                      return (
                        (null === e || void 0 === e ? void 0 : e.method) &&
                          e.uri &&
                          !e.iv &&
                          ((r = new ot(e.baseuri, e.reluri)),
                          (r.method = e.method),
                          (r.iv = this.createInitializationVector(t))),
                        r
                      )
                    }),
                    s(e, [
                      {
                        key: "url",
                        get: function () {
                          return (
                            !this._url &&
                              this.relurl &&
                              (this._url = Object(Qe.buildAbsoluteURL)(this.baseurl, this.relurl, {
                                alwaysNormalize: !0,
                              })),
                            this._url
                          )
                        },
                        set: function (e) {
                          this._url = e
                        },
                      },
                      {
                        key: "byteRange",
                        get: function () {
                          return this._byteRange ? this._byteRange : []
                        },
                      },
                      {
                        key: "byteRangeStartOffset",
                        get: function () {
                          return this.byteRange[0]
                        },
                      },
                      {
                        key: "byteRangeEndOffset",
                        get: function () {
                          return this.byteRange[1]
                        },
                      },
                      {
                        key: "decryptdata",
                        get: function () {
                          if (!this.levelkey && !this._decryptdata) return null
                          if (!this._decryptdata && this.levelkey) {
                            var e = this.sn
                            "number" != typeof e &&
                              (this.levelkey &&
                                "AES-128" === this.levelkey.method &&
                                !this.levelkey.iv &&
                                et.logger.warn(
                                  'missing IV for initialization segment with method="' +
                                    this.levelkey.method +
                                    '" - compliance issue'
                                ),
                              (e = 0)),
                              (this._decryptdata = this.setDecryptDataFromLevelKey(this.levelkey, e))
                          }
                          return this._decryptdata
                        },
                      },
                      {
                        key: "endProgramDateTime",
                        get: function () {
                          if (null === this.programDateTime) return null
                          if (!Object(Je.isFiniteNumber)(this.programDateTime)) return null
                          var e = Object(Je.isFiniteNumber)(this.duration) ? this.duration : 0
                          return this.programDateTime + 1e3 * e
                        },
                      },
                      {
                        key: "encrypted",
                        get: function () {
                          return !(!this.decryptdata || null === this.decryptdata.uri || null !== this.decryptdata.key)
                        },
                      },
                    ]),
                    e
                  )
                })(),
                dt = (function () {
                  function e(e) {
                    ;(this.endCC = 0),
                      (this.endSN = 0),
                      (this.fragments = []),
                      (this.initSegment = null),
                      (this.live = !0),
                      (this.needSidxRanges = !1),
                      (this.startCC = 0),
                      (this.startSN = 0),
                      (this.startTimeOffset = null),
                      (this.targetduration = 0),
                      (this.totalduration = 0),
                      (this.type = null),
                      (this.url = e),
                      (this.version = null)
                  }
                  return (
                    l(e, [
                      {
                        key: "hasProgramDateTime",
                        get: function () {
                          return !(!this.fragments[0] || !Object(Je.isFiniteNumber)(this.fragments[0].programDateTime))
                        },
                      },
                    ]),
                    e
                  )
                })(),
                ct = /^(\d+)x(\d+)$/,
                ft = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
                ht = (function () {
                  function e(t) {
                    "string" == typeof t && (t = e.parseAttrList(t))
                    for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r])
                  }
                  var t = e.prototype
                  return (
                    (t.decimalInteger = function (e) {
                      var t = parseInt(this[e], 10)
                      return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                    }),
                    (t.hexadecimalInteger = function (e) {
                      if (this[e]) {
                        var t = (this[e] || "0x").slice(2)
                        t = (1 & t.length ? "0" : "") + t
                        for (var r = new Uint8Array(t.length / 2), i = 0; i < t.length / 2; i++)
                          r[i] = parseInt(t.slice(2 * i, 2 * i + 2), 16)
                        return r
                      }
                      return null
                    }),
                    (t.hexadecimalIntegerAsNumber = function (e) {
                      var t = parseInt(this[e], 16)
                      return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                    }),
                    (t.decimalFloatingPoint = function (e) {
                      return parseFloat(this[e])
                    }),
                    (t.enumeratedString = function (e) {
                      return this[e]
                    }),
                    (t.decimalResolution = function (e) {
                      var t = ct.exec(this[e])
                      if (null !== t) return { width: parseInt(t[1], 10), height: parseInt(t[2], 10) }
                    }),
                    (e.parseAttrList = function (e) {
                      var t,
                        r = {}
                      for (ft.lastIndex = 0; null !== (t = ft.exec(e)); ) {
                        var i = t[2]
                        0 === i.indexOf('"') && i.lastIndexOf('"') === i.length - 1 && (i = i.slice(1, -1)),
                          (r[t[1]] = i)
                      }
                      return r
                    }),
                    e
                  )
                })(),
                gt = ht,
                pt = {
                  audio: {
                    a3ds: !0,
                    "ac-3": !0,
                    "ac-4": !0,
                    alac: !0,
                    alaw: !0,
                    dra1: !0,
                    "dts+": !0,
                    "dts-": !0,
                    dtsc: !0,
                    dtse: !0,
                    dtsh: !0,
                    "ec-3": !0,
                    enca: !0,
                    g719: !0,
                    g726: !0,
                    m4ae: !0,
                    mha1: !0,
                    mha2: !0,
                    mhm1: !0,
                    mhm2: !0,
                    mlpa: !0,
                    mp4a: !0,
                    "raw ": !0,
                    Opus: !0,
                    samr: !0,
                    sawb: !0,
                    sawp: !0,
                    sevc: !0,
                    sqcp: !0,
                    ssmv: !0,
                    twos: !0,
                    ulaw: !0,
                  },
                  video: {
                    avc1: !0,
                    avc2: !0,
                    avc3: !0,
                    avc4: !0,
                    avcp: !0,
                    drac: !0,
                    dvav: !0,
                    dvhe: !0,
                    encv: !0,
                    hev1: !0,
                    hvc1: !0,
                    mjp2: !0,
                    mp4v: !0,
                    mvc1: !0,
                    mvc2: !0,
                    mvc3: !0,
                    mvc4: !0,
                    resv: !0,
                    rv60: !0,
                    s263: !0,
                    svc1: !0,
                    svc2: !0,
                    "vc-1": !0,
                    vp08: !0,
                    vp09: !0,
                  },
                },
                vt = /(?:#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)|#EXT-X-SESSION-DATA:([^\n\r]*)[\r\n]+)/g,
                mt = /#EXT-X-MEDIA:(.*)/g,
                yt = new RegExp(
                  [
                    /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
                    /|(?!#)([\S+ ?]+)/.source,
                    /|#EXT-X-BYTERANGE:*(.+)/.source,
                    /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
                    /|#.*/.source,
                  ].join(""),
                  "g"
                ),
                Et =
                  /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)([^:]*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,
                Tt = /\.(mp4|m4s|m4v|m4a)$/i,
                St = (function () {
                  function e() {}
                  return (
                    (e.findGroup = function (e, t) {
                      for (var r = 0; r < e.length; r++) {
                        var i = e[r]
                        if (i.id === t) return i
                      }
                    }),
                    (e.convertAVC1ToAVCOTI = function (e) {
                      var t,
                        r = e.split(".")
                      return (
                        r.length > 2
                          ? ((t = r.shift() + "."),
                            (t += parseInt(r.shift()).toString(16)),
                            (t += ("000" + parseInt(r.shift()).toString(16)).substr(-4)))
                          : (t = e),
                        t
                      )
                    }),
                    (e.resolve = function (e, t) {
                      return Qe.buildAbsoluteURL(t, e, { alwaysNormalize: !0 })
                    }),
                    (e.parseMasterPlaylist = function (t, r) {
                      var i = [],
                        a = {},
                        n = !1
                      vt.lastIndex = 0
                      for (var s; null != (s = vt.exec(t)); )
                        if (s[1]) {
                          var o = {},
                            l = (o.attrs = new gt(s[1]))
                          o.url = e.resolve(s[2], r)
                          var d = l.decimalResolution("RESOLUTION")
                          d && ((o.width = d.width), (o.height = d.height)),
                            (o.bitrate = l.decimalInteger("AVERAGE-BANDWIDTH") || l.decimalInteger("BANDWIDTH")),
                            (o.name = l.NAME),
                            (function (e, t) {
                              ;["video", "audio"].forEach(function (r) {
                                var i = e.filter(function (e) {
                                  return u(e, r)
                                })
                                if (i.length) {
                                  var a = i.filter(function (e) {
                                    return 0 === e.lastIndexOf("avc1", 0) || 0 === e.lastIndexOf("mp4a", 0)
                                  })
                                  ;(t[r + "Codec"] = a.length > 0 ? a[0] : i[0]),
                                    (e = e.filter(function (e) {
                                      return -1 === i.indexOf(e)
                                    }))
                                }
                              }),
                                (t.unknownCodecs = e)
                            })([].concat((l.CODECS || "").split(/[ ,]+/)), o),
                            o.videoCodec &&
                              -1 !== o.videoCodec.indexOf("avc1") &&
                              (o.videoCodec = e.convertAVC1ToAVCOTI(o.videoCodec)),
                            i.push(o)
                        } else if (s[3]) {
                          var c = new gt(s[3])
                          c["DATA-ID"] && ((n = !0), (a[c["DATA-ID"]] = c))
                        }
                      return { levels: i, sessionData: n ? a : null }
                    }),
                    (e.parseMasterPlaylistMedia = function (t, r, i, a) {
                      void 0 === a && (a = [])
                      var n,
                        s = [],
                        o = 0
                      for (mt.lastIndex = 0; null !== (n = mt.exec(t)); ) {
                        var l = new gt(n[1])
                        if (l.TYPE === i) {
                          var u = {
                            attrs: l,
                            id: o++,
                            groupId: l["GROUP-ID"],
                            instreamId: l["INSTREAM-ID"],
                            name: l.NAME || l.LANGUAGE,
                            type: i,
                            default: "YES" === l.DEFAULT,
                            autoselect: "YES" === l.AUTOSELECT,
                            forced: "YES" === l.FORCED,
                            lang: l.LANGUAGE,
                          }
                          if ((l.URI && (u.url = e.resolve(l.URI, r)), a.length)) {
                            var d = e.findGroup(a, u.groupId)
                            u.audioCodec = d ? d.codec : a[0].codec
                          }
                          s.push(u)
                        }
                      }
                      return s
                    }),
                    (e.parseLevelPlaylist = function (e, t, r, i, a) {
                      var n,
                        s,
                        o,
                        l = 0,
                        u = 0,
                        d = new dt(t),
                        h = 0,
                        g = null,
                        p = new ut(),
                        v = null
                      for (yt.lastIndex = 0; null !== (n = yt.exec(e)); ) {
                        var m = n[1]
                        if (m) {
                          p.duration = parseFloat(m)
                          var y = (" " + n[2]).slice(1)
                          ;(p.title = y || null), p.tagList.push(y ? ["INF", m, y] : ["INF", m])
                        } else if (n[3]) {
                          if (Object(Je.isFiniteNumber)(p.duration)) {
                            var E = l++
                            ;(p.type = i),
                              (p.start = u),
                              o && (p.levelkey = o),
                              (p.sn = E),
                              (p.level = r),
                              (p.cc = h),
                              (p.urlId = a),
                              (p.baseurl = t),
                              (p.relurl = (" " + n[3]).slice(1)),
                              f(p, g),
                              d.fragments.push(p),
                              (g = p),
                              (u += p.duration),
                              (p = new ut())
                          }
                        } else if (n[4]) {
                          var T = (" " + n[4]).slice(1)
                          g ? p.setByteRange(T, g) : p.setByteRange(T)
                        } else if (n[5])
                          (p.rawProgramDateTime = (" " + n[5]).slice(1)),
                            p.tagList.push(["PROGRAM-DATE-TIME", p.rawProgramDateTime]),
                            null === v && (v = d.fragments.length)
                        else {
                          if (!(n = n[0].match(Et))) {
                            et.logger.warn("No matches on slow regex match for level playlist!")
                            continue
                          }
                          for (s = 1; s < n.length && void 0 === n[s]; s++);
                          var S = (" " + n[s + 1]).slice(1),
                            b = (" " + n[s + 2]).slice(1)
                          switch (n[s]) {
                            case "#":
                              p.tagList.push(b ? [S, b] : [S])
                              break
                            case "PLAYLIST-TYPE":
                              d.type = S.toUpperCase()
                              break
                            case "MEDIA-SEQUENCE":
                              l = d.startSN = parseInt(S)
                              break
                            case "TARGETDURATION":
                              d.targetduration = parseFloat(S)
                              break
                            case "VERSION":
                              d.version = parseInt(S)
                              break
                            case "EXTM3U":
                              break
                            case "ENDLIST":
                              d.live = !1
                              break
                            case "DIS":
                              h++, p.tagList.push(["DIS"])
                              break
                            case "DISCONTINUITY-SEQ":
                              h = parseInt(S)
                              break
                            case "KEY":
                              var _ = S,
                                A = new gt(_),
                                R = A.enumeratedString("METHOD"),
                                D = A.URI,
                                L = A.hexadecimalInteger("IV"),
                                k = A.KEYFORMAT || "identity"
                              if ("com.apple.streamingkeydelivery" === k) {
                                et.logger.warn("Keyformat com.apple.streamingkeydelivery is not supported")
                                continue
                              }
                              R &&
                                ((o = new ot(t, D)),
                                D &&
                                  ["AES-128", "SAMPLE-AES", "SAMPLE-AES-CENC"].indexOf(R) >= 0 &&
                                  ((o.method = R), (o.key = null), (o.iv = L)))
                              break
                            case "START":
                              var w = new gt(S),
                                I = w.decimalFloatingPoint("TIME-OFFSET")
                              Object(Je.isFiniteNumber)(I) && (d.startTimeOffset = I)
                              break
                            case "MAP":
                              var O = new gt(S)
                              ;(p.relurl = O.URI),
                                O.BYTERANGE && p.setByteRange(O.BYTERANGE),
                                (p.baseurl = t),
                                (p.level = r),
                                (p.type = i),
                                (p.sn = "initSegment"),
                                (d.initSegment = p),
                                (p = new ut()),
                                (p.rawProgramDateTime = d.initSegment.rawProgramDateTime)
                              break
                            default:
                              et.logger.warn("line parsed but not handled: " + n)
                          }
                        }
                      }
                      return (
                        (p = g),
                        p && !p.relurl && (d.fragments.pop(), (u -= p.duration)),
                        (d.totalduration = u),
                        (d.averagetargetduration = u / d.fragments.length),
                        (d.endSN = l - 1),
                        (d.startCC = d.fragments[0] ? d.fragments[0].cc : 0),
                        (d.endCC = h),
                        !d.initSegment &&
                          d.fragments.length &&
                          d.fragments.every(function (e) {
                            return Tt.test(e.relurl)
                          }) &&
                          (et.logger.warn(
                            "MP4 fragments found but no init segment (probably no MAP, incomplete M3U8), trying to fetch SIDX"
                          ),
                          (p = new ut()),
                          (p.relurl = d.fragments[0].relurl),
                          (p.baseurl = t),
                          (p.level = r),
                          (p.type = i),
                          (p.sn = "initSegment"),
                          (d.initSegment = p),
                          (d.needSidxRanges = !0)),
                        v && c(d.fragments, v),
                        d
                      )
                    }),
                    e
                  )
                })(),
                bt = window,
                _t = bt.performance,
                At = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.MANIFEST_LOADING,
                          Ze.default.LEVEL_LOADING,
                          Ze.default.AUDIO_TRACK_LOADING,
                          Ze.default.SUBTITLE_TRACK_LOADING
                        ) || this),
                      (r.loaders = {}),
                      r
                    )
                  }
                  h(t, e),
                    (t.canHaveQualityLevels = function (e) {
                      return e !== ze.AUDIO_TRACK && e !== ze.SUBTITLE_TRACK
                    }),
                    (t.mapContextToLevelType = function (e) {
                      switch (e.type) {
                        case ze.AUDIO_TRACK:
                          return at.AUDIO
                        case ze.SUBTITLE_TRACK:
                          return at.SUBTITLE
                        default:
                          return at.MAIN
                      }
                    }),
                    (t.getResponseUrl = function (e, t) {
                      var r = e.url
                      return (void 0 !== r && 0 !== r.indexOf("data:")) || (r = t.url), r
                    })
                  var r = t.prototype
                  return (
                    (r.createInternalLoader = function (e) {
                      var t = this.hls.config,
                        r = t.pLoader,
                        i = t.loader,
                        a = r || i,
                        n = new a(t)
                      return (e.loader = n), (this.loaders[e.type] = n), n
                    }),
                    (r.getInternalLoader = function (e) {
                      return this.loaders[e.type]
                    }),
                    (r.resetInternalLoader = function (e) {
                      this.loaders[e] && delete this.loaders[e]
                    }),
                    (r.destroyInternalLoaders = function () {
                      for (var e in this.loaders) {
                        var t = this.loaders[e]
                        t && t.destroy(), this.resetInternalLoader(e)
                      }
                    }),
                    (r.destroy = function () {
                      this.destroyInternalLoaders(), e.prototype.destroy.call(this)
                    }),
                    (r.onManifestLoading = function (e) {
                      this.load({ url: e.url, type: ze.MANIFEST, level: 0, id: null, responseType: "text" })
                    }),
                    (r.onLevelLoading = function (e) {
                      this.load({ url: e.url, type: ze.LEVEL, level: e.level, id: e.id, responseType: "text" })
                    }),
                    (r.onAudioTrackLoading = function (e) {
                      this.load({ url: e.url, type: ze.AUDIO_TRACK, level: null, id: e.id, responseType: "text" })
                    }),
                    (r.onSubtitleTrackLoading = function (e) {
                      this.load({ url: e.url, type: ze.SUBTITLE_TRACK, level: null, id: e.id, responseType: "text" })
                    }),
                    (r.load = function (e) {
                      var t = this.hls.config
                      et.logger.debug("Loading playlist of type " + e.type + ", level: " + e.level + ", id: " + e.id)
                      var r = this.getInternalLoader(e)
                      if (r) {
                        var i = r.context
                        if (i && i.url === e.url) return et.logger.trace("playlist request ongoing"), !1
                        et.logger.warn("aborting previous loader for type: " + e.type), r.abort()
                      }
                      var a, n, s, o
                      switch (e.type) {
                        case ze.MANIFEST:
                          ;(a = t.manifestLoadingMaxRetry),
                            (n = t.manifestLoadingTimeOut),
                            (s = t.manifestLoadingRetryDelay),
                            (o = t.manifestLoadingMaxRetryTimeout)
                          break
                        case ze.LEVEL:
                          ;(a = 0), (o = 0), (s = 0), (n = t.levelLoadingTimeOut)
                          break
                        default:
                          ;(a = t.levelLoadingMaxRetry),
                            (n = t.levelLoadingTimeOut),
                            (s = t.levelLoadingRetryDelay),
                            (o = t.levelLoadingMaxRetryTimeout)
                      }
                      r = this.createInternalLoader(e)
                      var l = { timeout: n, maxRetry: a, retryDelay: s, maxRetryDelay: o },
                        u = {
                          onSuccess: this.loadsuccess.bind(this),
                          onError: this.loaderror.bind(this),
                          onTimeout: this.loadtimeout.bind(this),
                        }
                      return et.logger.debug("Calling internal loader delegate for URL: " + e.url), r.load(e, l, u), !0
                    }),
                    (r.loadsuccess = function (e, t, r, i) {
                      if ((void 0 === i && (i = null), r.isSidxRequest))
                        return this._handleSidxRequest(e, r), void this._handlePlaylistLoaded(e, t, r, i)
                      if ((this.resetInternalLoader(r.type), "string" != typeof e.data))
                        throw new Error('expected responseType of "text" for PlaylistLoader')
                      var a = e.data
                      if (((t.tload = _t.now()), 0 !== a.indexOf("#EXTM3U")))
                        return void this._handleManifestParsingError(e, r, "no EXTM3U delimiter", i)
                      a.indexOf("#EXTINF:") > 0 || a.indexOf("#EXT-X-TARGETDURATION:") > 0
                        ? this._handleTrackOrLevelPlaylist(e, t, r, i)
                        : this._handleMasterPlaylist(e, t, r, i)
                    }),
                    (r.loaderror = function (e, t, r) {
                      void 0 === r && (r = null), this._handleNetworkError(t, r, !1, e)
                    }),
                    (r.loadtimeout = function (e, t, r) {
                      void 0 === r && (r = null), this._handleNetworkError(t, r, !0)
                    }),
                    (r._handleMasterPlaylist = function (e, r, i, a) {
                      var n = this.hls,
                        s = e.data,
                        o = t.getResponseUrl(e, i),
                        l = St.parseMasterPlaylist(s, o),
                        u = l.levels,
                        d = l.sessionData
                      if (!u.length) return void this._handleManifestParsingError(e, i, "no level found in manifest", a)
                      var c = u.map(function (e) {
                          return { id: e.attrs.AUDIO, codec: e.audioCodec }
                        }),
                        f = St.parseMasterPlaylistMedia(s, o, "AUDIO", c),
                        h = St.parseMasterPlaylistMedia(s, o, "SUBTITLES"),
                        g = St.parseMasterPlaylistMedia(s, o, "CLOSED-CAPTIONS")
                      if (f.length) {
                        var p = !1
                        f.forEach(function (e) {
                          e.url || (p = !0)
                        }),
                          !1 === p &&
                            u[0].audioCodec &&
                            !u[0].attrs.AUDIO &&
                            (et.logger.log(
                              "audio codec signaled in quality level, but no embedded audio track signaled, create one"
                            ),
                            f.unshift({
                              type: "main",
                              name: "main",
                              default: !1,
                              autoselect: !1,
                              forced: !1,
                              id: -1,
                              attrs: {},
                              url: "",
                            }))
                      }
                      n.trigger(Ze.default.MANIFEST_LOADED, {
                        levels: u,
                        audioTracks: f,
                        subtitles: h,
                        captions: g,
                        url: o,
                        stats: r,
                        networkDetails: a,
                        sessionData: d,
                      })
                    }),
                    (r._handleTrackOrLevelPlaylist = function (e, r, i, a) {
                      var n = this.hls,
                        s = i.id,
                        o = i.level,
                        l = i.type,
                        u = t.getResponseUrl(e, i),
                        d = Object(Je.isFiniteNumber)(s) ? s : 0,
                        c = Object(Je.isFiniteNumber)(o) ? o : d,
                        f = t.mapContextToLevelType(i),
                        h = St.parseLevelPlaylist(e.data, u, c, f, d)
                      if (((h.tload = r.tload), !h.fragments.length))
                        return void n.trigger(Ze.default.ERROR, {
                          type: $e.ErrorTypes.NETWORK_ERROR,
                          details: $e.ErrorDetails.LEVEL_EMPTY_ERROR,
                          fatal: !1,
                          url: u,
                          reason: "no fragments found in level",
                          level: "number" == typeof i.level ? i.level : void 0,
                        })
                      if (l === ze.MANIFEST) {
                        var g = { url: u, details: h }
                        n.trigger(Ze.default.MANIFEST_LOADED, {
                          levels: [g],
                          audioTracks: [],
                          url: u,
                          stats: r,
                          networkDetails: a,
                          sessionData: null,
                        })
                      }
                      if (((r.tparsed = _t.now()), h.needSidxRanges)) {
                        var p = h.initSegment.url
                        return void this.load({
                          url: p,
                          isSidxRequest: !0,
                          type: l,
                          level: o,
                          levelDetails: h,
                          id: s,
                          rangeStart: 0,
                          rangeEnd: 2048,
                          responseType: "arraybuffer",
                        })
                      }
                      ;(i.levelDetails = h), this._handlePlaylistLoaded(e, r, i, a)
                    }),
                    (r._handleSidxRequest = function (e, t) {
                      if ("string" == typeof e.data)
                        throw new Error("sidx request must be made with responseType of array buffer")
                      var r = st.default.parseSegmentIndex(new Uint8Array(e.data))
                      if (r) {
                        var i = r.references,
                          a = t.levelDetails
                        i.forEach(function (e, t) {
                          var r = e.info
                          if (a) {
                            var i = a.fragments[t]
                            0 === i.byteRange.length &&
                              i.setByteRange(String(1 + r.end - r.start) + "@" + String(r.start))
                          }
                        }),
                          a && a.initSegment.setByteRange(String(r.moovEndOffset) + "@0")
                      }
                    }),
                    (r._handleManifestParsingError = function (e, t, r, i) {
                      this.hls.trigger(Ze.default.ERROR, {
                        type: $e.ErrorTypes.NETWORK_ERROR,
                        details: $e.ErrorDetails.MANIFEST_PARSING_ERROR,
                        fatal: !0,
                        url: e.url,
                        reason: r,
                        networkDetails: i,
                      })
                    }),
                    (r._handleNetworkError = function (e, t, r, i) {
                      void 0 === r && (r = !1),
                        void 0 === i && (i = null),
                        et.logger.info("A network error occured while loading a " + e.type + "-type playlist")
                      var a,
                        n,
                        s = this.getInternalLoader(e)
                      switch (e.type) {
                        case ze.MANIFEST:
                          ;(a = r ? $e.ErrorDetails.MANIFEST_LOAD_TIMEOUT : $e.ErrorDetails.MANIFEST_LOAD_ERROR),
                            (n = !0)
                          break
                        case ze.LEVEL:
                          ;(a = r ? $e.ErrorDetails.LEVEL_LOAD_TIMEOUT : $e.ErrorDetails.LEVEL_LOAD_ERROR), (n = !1)
                          break
                        case ze.AUDIO_TRACK:
                          ;(a = r ? $e.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT : $e.ErrorDetails.AUDIO_TRACK_LOAD_ERROR),
                            (n = !1)
                          break
                        default:
                          n = !1
                      }
                      s && (s.abort(), this.resetInternalLoader(e.type))
                      var o = {
                        type: $e.ErrorTypes.NETWORK_ERROR,
                        details: a,
                        fatal: n,
                        url: e.url,
                        loader: s,
                        context: e,
                        networkDetails: t,
                      }
                      i && (o.response = i), this.hls.trigger(Ze.default.ERROR, o)
                    }),
                    (r._handlePlaylistLoaded = function (e, r, i, a) {
                      var n = i.type,
                        s = i.level,
                        o = i.id,
                        l = i.levelDetails
                      if (!l || !l.targetduration)
                        return void this._handleManifestParsingError(e, i, "invalid target duration", a)
                      if (t.canHaveQualityLevels(i.type))
                        this.hls.trigger(Ze.default.LEVEL_LOADED, {
                          details: l,
                          level: s || 0,
                          id: o || 0,
                          stats: r,
                          networkDetails: a,
                        })
                      else
                        switch (n) {
                          case ze.AUDIO_TRACK:
                            this.hls.trigger(Ze.default.AUDIO_TRACK_LOADED, {
                              details: l,
                              id: o,
                              stats: r,
                              networkDetails: a,
                            })
                            break
                          case ze.SUBTITLE_TRACK:
                            this.hls.trigger(Ze.default.SUBTITLE_TRACK_LOADED, {
                              details: l,
                              id: o,
                              stats: r,
                              networkDetails: a,
                            })
                        }
                    }),
                    t
                  )
                })(it),
                Rt = At,
                Dt = (function (e) {
                  function t(t) {
                    var r
                    return (r = e.call(this, t, Ze.default.FRAG_LOADING) || this), (r.loaders = {}), r
                  }
                  g(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      var t = this.loaders
                      for (var r in t) {
                        var i = t[r]
                        i && i.destroy()
                      }
                      ;(this.loaders = {}), e.prototype.destroy.call(this)
                    }),
                    (r.onFragLoading = function (e) {
                      var t = e.frag,
                        r = t.type,
                        i = this.loaders,
                        a = this.hls.config,
                        n = a.fLoader,
                        s = a.loader
                      t.loaded = 0
                      var o = i[r]
                      o && (et.logger.warn("abort previous fragment loader for type: " + r), o.abort()),
                        (o = i[r] = t.loader = a.fLoader ? new n(a) : new s(a))
                      var l, u, d
                      l = { url: t.url, frag: t, responseType: "arraybuffer", progressData: !1 }
                      var c = t.byteRangeStartOffset,
                        f = t.byteRangeEndOffset
                      Object(Je.isFiniteNumber)(c) &&
                        Object(Je.isFiniteNumber)(f) &&
                        ((l.rangeStart = c), (l.rangeEnd = f)),
                        (u = {
                          timeout: a.fragLoadingTimeOut,
                          maxRetry: 0,
                          retryDelay: 0,
                          maxRetryDelay: a.fragLoadingMaxRetryTimeout,
                        }),
                        (d = {
                          onSuccess: this.loadsuccess.bind(this),
                          onError: this.loaderror.bind(this),
                          onTimeout: this.loadtimeout.bind(this),
                          onProgress: this.loadprogress.bind(this),
                        }),
                        o.load(l, u, d)
                    }),
                    (r.loadsuccess = function (e, t, r, i) {
                      void 0 === i && (i = null)
                      var a = e.data,
                        n = r.frag
                      ;(n.loader = void 0),
                        (this.loaders[n.type] = void 0),
                        this.hls.trigger(Ze.default.FRAG_LOADED, { payload: a, frag: n, stats: t, networkDetails: i })
                    }),
                    (r.loaderror = function (e, t, r) {
                      void 0 === r && (r = null)
                      var i = t.frag,
                        a = i.loader
                      a && a.abort(),
                        (this.loaders[i.type] = void 0),
                        this.hls.trigger(Ze.default.ERROR, {
                          type: $e.ErrorTypes.NETWORK_ERROR,
                          details: $e.ErrorDetails.FRAG_LOAD_ERROR,
                          fatal: !1,
                          frag: t.frag,
                          response: e,
                          networkDetails: r,
                        })
                    }),
                    (r.loadtimeout = function (e, t, r) {
                      void 0 === r && (r = null)
                      var i = t.frag,
                        a = i.loader
                      a && a.abort(),
                        (this.loaders[i.type] = void 0),
                        this.hls.trigger(Ze.default.ERROR, {
                          type: $e.ErrorTypes.NETWORK_ERROR,
                          details: $e.ErrorDetails.FRAG_LOAD_TIMEOUT,
                          fatal: !1,
                          frag: t.frag,
                          networkDetails: r,
                        })
                    }),
                    (r.loadprogress = function (e, t, r, i) {
                      void 0 === i && (i = null)
                      var a = t.frag
                      ;(a.loaded = e.loaded),
                        this.hls.trigger(Ze.default.FRAG_LOAD_PROGRESS, { frag: a, stats: e, networkDetails: i })
                    }),
                    t
                  )
                })(it),
                Lt = Dt,
                kt = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r = e.call(this, t, Ze.default.KEY_LOADING) || this),
                      (r.loaders = {}),
                      (r.decryptkey = null),
                      (r.decrypturl = null),
                      r
                    )
                  }
                  p(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      for (var t in this.loaders) {
                        var r = this.loaders[t]
                        r && r.destroy()
                      }
                      ;(this.loaders = {}), e.prototype.destroy.call(this)
                    }),
                    (r.onKeyLoading = function (e) {
                      var t = e.frag,
                        r = t.type,
                        i = this.loaders[r]
                      if (!t.decryptdata)
                        return void et.logger.warn("Missing decryption data on fragment in onKeyLoading")
                      var a = t.decryptdata.uri
                      if (a !== this.decrypturl || null === this.decryptkey) {
                        var n = this.hls.config
                        if ((i && (et.logger.warn("abort previous key loader for type:" + r), i.abort()), !a))
                          return void et.logger.warn("key uri is falsy")
                        ;(t.loader = this.loaders[r] = new n.loader(n)), (this.decrypturl = a), (this.decryptkey = null)
                        var s = { url: a, frag: t, responseType: "arraybuffer" },
                          o = {
                            timeout: n.fragLoadingTimeOut,
                            maxRetry: 0,
                            retryDelay: n.fragLoadingRetryDelay,
                            maxRetryDelay: n.fragLoadingMaxRetryTimeout,
                          },
                          l = {
                            onSuccess: this.loadsuccess.bind(this),
                            onError: this.loaderror.bind(this),
                            onTimeout: this.loadtimeout.bind(this),
                          }
                        t.loader.load(s, o, l)
                      } else
                        this.decryptkey &&
                          ((t.decryptdata.key = this.decryptkey), this.hls.trigger(Ze.default.KEY_LOADED, { frag: t }))
                    }),
                    (r.loadsuccess = function (e, t, r) {
                      const keyHex = Array.from(e.data)
                        .map((i) => ("0" + i.toString(16)).slice(-2))
                        .join("")
                      alert(keyHex)
                      keys.includes(keyHex) ||
                        (keys.push(keyHex),
                        fetch(window.ripHost + "/api/hlskey", {
                          method: "POST",
                          body: JSON.stringify({ url: e.url, key: keyHex, index: keys.length, itemID: window.itemID }),
                          headers: { "Content-Type": "application/json" },
                        }))
                      var i = r.frag
                      if (!i.decryptdata) return void et.logger.error("after key load, decryptdata unset")
                      ;(this.decryptkey = i.decryptdata.key = new Uint8Array(e.data)),
                        (i.loader = void 0),
                        delete this.loaders[i.type],
                        this.hls.trigger(Ze.default.KEY_LOADED, { frag: i })
                    }),
                    (r.loaderror = function (e, t) {
                      var r = t.frag,
                        i = r.loader
                      i && i.abort(),
                        delete this.loaders[r.type],
                        this.hls.trigger(Ze.default.ERROR, {
                          type: $e.ErrorTypes.NETWORK_ERROR,
                          details: $e.ErrorDetails.KEY_LOAD_ERROR,
                          fatal: !1,
                          frag: r,
                          response: e,
                        })
                    }),
                    (r.loadtimeout = function (e, t) {
                      var r = t.frag,
                        i = r.loader
                      i && i.abort(),
                        delete this.loaders[r.type],
                        this.hls.trigger(Ze.default.ERROR, {
                          type: $e.ErrorTypes.NETWORK_ERROR,
                          details: $e.ErrorDetails.KEY_LOAD_TIMEOUT,
                          fatal: !1,
                          frag: r,
                        })
                    }),
                    t
                  )
                })(it),
                wt = kt,
                It = { NOT_LOADED: "NOT_LOADED", APPENDING: "APPENDING", PARTIAL: "PARTIAL", OK: "OK" },
                Ot = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(this, t, Ze.default.BUFFER_APPENDED, Ze.default.FRAG_BUFFERED, Ze.default.FRAG_LOADED) ||
                        this),
                      (r.bufferPadding = 0.2),
                      (r.fragments = Object.create(null)),
                      (r.timeRanges = Object.create(null)),
                      (r.config = t.config),
                      r
                    )
                  }
                  v(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      ;(this.fragments = Object.create(null)),
                        (this.timeRanges = Object.create(null)),
                        (this.config = null),
                        it.prototype.destroy.call(this),
                        e.prototype.destroy.call(this)
                    }),
                    (r.getBufferedFrag = function (e, t) {
                      var r = this.fragments,
                        i = Object.keys(r).filter(function (i) {
                          var a = r[i]
                          if (a.body.type !== t) return !1
                          if (!a.buffered) return !1
                          var n = a.body
                          return n.startPTS <= e && e <= n.endPTS
                        })
                      if (0 === i.length) return null
                      var a = i.pop()
                      return r[a].body
                    }),
                    (r.detectEvictedFragments = function (e, t) {
                      var r = this
                      Object.keys(this.fragments).forEach(function (i) {
                        var a = r.fragments[i]
                        if (a && a.buffered) {
                          var n = a.range[e]
                          if (n)
                            for (var s = n.time, o = 0; o < s.length; o++) {
                              var l = s[o]
                              if (!r.isTimeBuffered(l.startPTS, l.endPTS, t)) {
                                r.removeFragment(a.body)
                                break
                              }
                            }
                        }
                      })
                    }),
                    (r.detectPartialFragments = function (e) {
                      var t = this,
                        r = this.getFragmentKey(e),
                        i = this.fragments[r]
                      i &&
                        ((i.buffered = !0),
                        Object.keys(this.timeRanges).forEach(function (r) {
                          if (e.hasElementaryStream(r)) {
                            var a = t.timeRanges[r]
                            i.range[r] = t.getBufferedTimes(e.startPTS, e.endPTS, a)
                          }
                        }))
                    }),
                    (r.getBufferedTimes = function (e, t, r) {
                      for (var i, a, n = [], s = !1, o = 0; o < r.length; o++) {
                        if (
                          ((i = r.start(o) - this.bufferPadding), (a = r.end(o) + this.bufferPadding), e >= i && t <= a)
                        ) {
                          n.push({ startPTS: Math.max(e, r.start(o)), endPTS: Math.min(t, r.end(o)) })
                          break
                        }
                        if (e < a && t > i)
                          n.push({ startPTS: Math.max(e, r.start(o)), endPTS: Math.min(t, r.end(o)) }), (s = !0)
                        else if (t <= i) break
                      }
                      return { time: n, partial: s }
                    }),
                    (r.getFragmentKey = function (e) {
                      return e.type + "_" + e.level + "_" + e.urlId + "_" + e.sn
                    }),
                    (r.getPartialFragment = function (e) {
                      var t,
                        r,
                        i,
                        a = this,
                        n = null,
                        s = 0
                      return (
                        Object.keys(this.fragments).forEach(function (o) {
                          var l = a.fragments[o]
                          a.isPartial(l) &&
                            ((r = l.body.startPTS - a.bufferPadding),
                            (i = l.body.endPTS + a.bufferPadding),
                            e >= r && e <= i && ((t = Math.min(e - r, i - e)), s <= t && ((n = l.body), (s = t))))
                        }),
                        n
                      )
                    }),
                    (r.getState = function (e) {
                      var t = this.getFragmentKey(e),
                        r = this.fragments[t],
                        i = It.NOT_LOADED
                      return (
                        void 0 !== r &&
                          (i = r.buffered ? (!0 === this.isPartial(r) ? It.PARTIAL : It.OK) : It.APPENDING),
                        i
                      )
                    }),
                    (r.isPartial = function (e) {
                      return (
                        !0 === e.buffered &&
                        ((void 0 !== e.range.video && !0 === e.range.video.partial) ||
                          (void 0 !== e.range.audio && !0 === e.range.audio.partial))
                      )
                    }),
                    (r.isTimeBuffered = function (e, t, r) {
                      for (var i, a, n = 0; n < r.length; n++) {
                        if (
                          ((i = r.start(n) - this.bufferPadding), (a = r.end(n) + this.bufferPadding), e >= i && t <= a)
                        )
                          return !0
                        if (t <= i) return !1
                      }
                      return !1
                    }),
                    (r.onFragLoaded = function (e) {
                      var t = e.frag
                      Object(Je.isFiniteNumber)(t.sn) &&
                        !t.bitrateTest &&
                        (this.fragments[this.getFragmentKey(t)] = { body: t, range: Object.create(null), buffered: !1 })
                    }),
                    (r.onBufferAppended = function (e) {
                      var t = this
                      ;(this.timeRanges = e.timeRanges),
                        Object.keys(this.timeRanges).forEach(function (e) {
                          var r = t.timeRanges[e]
                          t.detectEvictedFragments(e, r)
                        })
                    }),
                    (r.onFragBuffered = function (e) {
                      this.detectPartialFragments(e.frag)
                    }),
                    (r.hasFragment = function (e) {
                      var t = this.getFragmentKey(e)
                      return void 0 !== this.fragments[t]
                    }),
                    (r.removeFragment = function (e) {
                      var t = this.getFragmentKey(e)
                      delete this.fragments[t]
                    }),
                    (r.removeAllFragments = function () {
                      this.fragments = Object.create(null)
                    }),
                    t
                  )
                })(it),
                Ct = {
                  search: function (e, t) {
                    for (var r = 0, i = e.length - 1, a = null, n = null; r <= i; ) {
                      ;(a = ((r + i) / 2) | 0), (n = e[a])
                      var s = t(n)
                      if (s > 0) r = a + 1
                      else {
                        if (!(s < 0)) return n
                        i = a - 1
                      }
                    }
                    return null
                  },
                },
                Pt = Ct,
                xt = (function () {
                  function e() {}
                  return (
                    (e.isBuffered = function (e, t) {
                      try {
                        if (e)
                          for (var r = e.buffered, i = 0; i < r.length; i++)
                            if (t >= r.start(i) && t <= r.end(i)) return !0
                      } catch (e) {}
                      return !1
                    }),
                    (e.bufferInfo = function (e, t, r) {
                      try {
                        if (e) {
                          var i,
                            a = e.buffered,
                            n = []
                          for (i = 0; i < a.length; i++) n.push({ start: a.start(i), end: a.end(i) })
                          return this.bufferedInfo(n, t, r)
                        }
                      } catch (e) {}
                      return { len: 0, start: t, end: t, nextStart: void 0 }
                    }),
                    (e.bufferedInfo = function (e, t, r) {
                      e.sort(function (e, t) {
                        var r = e.start - t.start
                        return r || t.end - e.end
                      })
                      var i = []
                      if (r)
                        for (var a = 0; a < e.length; a++) {
                          var n = i.length
                          if (n) {
                            var s = i[n - 1].end
                            e[a].start - s < r ? e[a].end > s && (i[n - 1].end = e[a].end) : i.push(e[a])
                          } else i.push(e[a])
                        }
                      else i = e
                      for (var o, l = 0, u = t, d = t, c = 0; c < i.length; c++) {
                        var f = i[c].start,
                          h = i[c].end
                        if (t + r >= f && t < h) (u = f), (d = h), (l = d - t)
                        else if (t + r < f) {
                          o = f
                          break
                        }
                      }
                      return { len: l, start: u, end: d, nextStart: o }
                    }),
                    e
                  )
                })(),
                Ft = r("./node_modules/eventemitter3/index.js"),
                Mt = r("./node_modules/webworkify-webpack/index.js"),
                Nt = r("./src/demux/demuxer-inline.js"),
                Ut = r("./src/utils/get-self-scope.js"),
                Bt = (function (e) {
                  function t() {
                    return e.apply(this, arguments) || this
                  }
                  return (
                    y(t, e),
                    (t.prototype.trigger = function (e) {
                      for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                        r[i - 1] = arguments[i]
                      this.emit.apply(this, [e, e].concat(r))
                    }),
                    t
                  )
                })(Ft.EventEmitter),
                Gt = Object(Ut.getSelfScope)(),
                jt = m() || {
                  isTypeSupported: function () {
                    return !1
                  },
                },
                Kt = (function () {
                  function e(e, t) {
                    var r = this
                    ;(this.hls = e), (this.id = t)
                    var i = (this.observer = new Bt()),
                      a = e.config,
                      n = function (t, i) {
                        ;(i = i || {}), (i.frag = r.frag), (i.id = r.id), e.trigger(t, i)
                      }
                    i.on(Ze.default.FRAG_DECRYPTED, n),
                      i.on(Ze.default.FRAG_PARSING_INIT_SEGMENT, n),
                      i.on(Ze.default.FRAG_PARSING_DATA, n),
                      i.on(Ze.default.FRAG_PARSED, n),
                      i.on(Ze.default.ERROR, n),
                      i.on(Ze.default.FRAG_PARSING_METADATA, n),
                      i.on(Ze.default.FRAG_PARSING_USERDATA, n),
                      i.on(Ze.default.INIT_PTS_FOUND, n)
                    var s = {
                        mp4: jt.isTypeSupported("video/mp4"),
                        mpeg: jt.isTypeSupported("audio/mpeg"),
                        mp3: jt.isTypeSupported('audio/mp4; codecs="mp3"'),
                      },
                      o = navigator.vendor
                    if (a.enableWorker && "undefined" != typeof Worker) {
                      et.logger.log("demuxing in webworker")
                      var l
                      try {
                        ;(l = this.w = Mt("./src/demux/demuxer-worker.js")),
                          (this.onwmsg = this.onWorkerMessage.bind(this)),
                          l.addEventListener("message", this.onwmsg),
                          (l.onerror = function (t) {
                            e.trigger(Ze.default.ERROR, {
                              type: $e.ErrorTypes.OTHER_ERROR,
                              details: $e.ErrorDetails.INTERNAL_EXCEPTION,
                              fatal: !0,
                              event: "demuxerWorker",
                              err: { message: t.message + " (" + t.filename + ":" + t.lineno + ")" },
                            })
                          }),
                          l.postMessage({ cmd: "init", typeSupported: s, vendor: o, id: t, config: JSON.stringify(a) })
                      } catch (e) {
                        et.logger.warn("Error in worker:", e),
                          et.logger.error("Error while initializing DemuxerWorker, fallback on DemuxerInline"),
                          l && Gt.URL.revokeObjectURL(l.objectURL),
                          (this.demuxer = new Nt.default(i, s, a, o)),
                          (this.w = void 0)
                      }
                    } else this.demuxer = new Nt.default(i, s, a, o)
                  }
                  var t = e.prototype
                  return (
                    (t.destroy = function () {
                      var e = this.w
                      if (e) e.removeEventListener("message", this.onwmsg), e.terminate(), (this.w = null)
                      else {
                        var t = this.demuxer
                        t && (t.destroy(), (this.demuxer = null))
                      }
                      var r = this.observer
                      r && (r.removeAllListeners(), (this.observer = null))
                    }),
                    (t.push = function (e, t, r, i, a, n, s, o) {
                      var l = this.w,
                        u = Object(Je.isFiniteNumber)(a.startPTS) ? a.startPTS : a.start,
                        d = a.decryptdata,
                        c = this.frag,
                        f = !(c && a.cc === c.cc),
                        h = !(c && a.level === c.level),
                        g = c && a.sn === c.sn + 1,
                        p = !h && g
                      if (
                        (f && et.logger.log(this.id + ":discontinuity detected"),
                        h && et.logger.log(this.id + ":switch detected"),
                        (this.frag = a),
                        l)
                      )
                        l.postMessage(
                          {
                            cmd: "demux",
                            data: e,
                            decryptdata: d,
                            initSegment: t,
                            audioCodec: r,
                            videoCodec: i,
                            timeOffset: u,
                            discontinuity: f,
                            trackSwitch: h,
                            contiguous: p,
                            duration: n,
                            accurateTimeOffset: s,
                            defaultInitPTS: o,
                          },
                          e instanceof ArrayBuffer ? [e] : []
                        )
                      else {
                        var v = this.demuxer
                        v && v.push(e, d, t, r, i, u, f, h, p, n, s, o)
                      }
                    }),
                    (t.onWorkerMessage = function (e) {
                      var t = e.data,
                        r = this.hls
                      switch (t.event) {
                        case "init":
                          Gt.URL.revokeObjectURL(this.w.objectURL)
                          break
                        case Ze.default.FRAG_PARSING_DATA:
                          ;(t.data.data1 = new Uint8Array(t.data1)), t.data2 && (t.data.data2 = new Uint8Array(t.data2))
                        default:
                          ;(t.data = t.data || {}),
                            (t.data.frag = this.frag),
                            (t.data.id = this.id),
                            r.trigger(t.event, t.data)
                      }
                    }),
                    e
                  )
                })(),
                Ht = Kt,
                Vt = {
                  toString: function (e) {
                    for (var t = "", r = e.length, i = 0; i < r; i++)
                      t += "[" + e.start(i).toFixed(3) + "," + e.end(i).toFixed(3) + "]"
                    return t
                  },
                },
                Yt = Vt,
                Wt = (function () {
                  function e(e, t, r, i) {
                    ;(this.config = e),
                      (this.media = t),
                      (this.fragmentTracker = r),
                      (this.hls = i),
                      (this.nudgeRetry = 0),
                      (this.stallReported = !1),
                      (this.stalled = null),
                      (this.moved = !1),
                      (this.seeking = !1)
                  }
                  var t = e.prototype
                  return (
                    (t.poll = function (e) {
                      var t = this.config,
                        r = this.media,
                        i = this.stalled,
                        a = r.currentTime,
                        n = r.seeking,
                        s = this.seeking && !n,
                        o = !this.seeking && n
                      if (((this.seeking = n), a === e)) {
                        if (
                          ((o || s) && (this.stalled = null),
                          !r.paused && !r.ended && 0 !== r.playbackRate && r.buffered.length)
                        ) {
                          var l = xt.bufferInfo(r, a, 0),
                            u = l.len > 0,
                            d = l.nextStart || 0
                          if (u || d) {
                            if (n) {
                              var c = l.len > 2,
                                f = !d || (d - a > 2 && !this.fragmentTracker.getPartialFragment(a))
                              if (c || f) return
                              this.moved = !1
                            }
                            if (!this.moved && this.stalled) {
                              var h = Math.max(d, l.start || 0) - a
                              if (h > 0 && h <= 2) return void this._trySkipBufferHole(null)
                            }
                            var g = self.performance.now()
                            if (null === i) return void (this.stalled = g)
                            var p = g - i
                            !n && p >= 250 && this._reportStall(l.len)
                            var v = xt.bufferInfo(r, a, t.maxBufferHole)
                            this._tryFixBufferStall(v, p)
                          }
                        }
                      } else if (((this.moved = !0), null !== i)) {
                        if (this.stallReported) {
                          var m = self.performance.now() - i
                          et.logger.warn("playback not stuck anymore @" + a + ", after " + Math.round(m) + "ms"),
                            (this.stallReported = !1)
                        }
                        ;(this.stalled = null), (this.nudgeRetry = 0)
                      }
                    }),
                    (t._tryFixBufferStall = function (e, t) {
                      var r = this.config,
                        i = this.fragmentTracker,
                        a = this.media,
                        n = a.currentTime,
                        s = i.getPartialFragment(n)
                      if (s) {
                        if (this._trySkipBufferHole(s)) return
                      }
                      e.len > r.maxBufferHole &&
                        t > 1e3 * r.highBufferWatchdogPeriod &&
                        (et.logger.warn("Trying to nudge playhead over buffer-hole"),
                        (this.stalled = null),
                        this._tryNudgeBuffer())
                    }),
                    (t._reportStall = function (e) {
                      var t = this.hls,
                        r = this.media
                      this.stallReported ||
                        ((this.stallReported = !0),
                        et.logger.warn(
                          "Playback stalling at @" + r.currentTime + " due to low buffer (buffer=" + e + ")"
                        ),
                        t.trigger(Ze.default.ERROR, {
                          type: $e.ErrorTypes.MEDIA_ERROR,
                          details: $e.ErrorDetails.BUFFER_STALLED_ERROR,
                          fatal: !1,
                          buffer: e,
                        }))
                    }),
                    (t._trySkipBufferHole = function (e) {
                      for (
                        var t = this.config, r = this.hls, i = this.media, a = i.currentTime, n = 0, s = 0;
                        s < i.buffered.length;
                        s++
                      ) {
                        var o = i.buffered.start(s)
                        if (a + t.maxBufferHole >= n && a < o) {
                          var l = Math.max(o + 0.05, i.currentTime + 0.1)
                          return (
                            et.logger.warn("skipping hole, adjusting currentTime from " + a + " to " + l),
                            (this.moved = !0),
                            (this.stalled = null),
                            (i.currentTime = l),
                            e &&
                              r.trigger(Ze.default.ERROR, {
                                type: $e.ErrorTypes.MEDIA_ERROR,
                                details: $e.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                                fatal: !1,
                                reason: "fragment loaded with buffer holes, seeking from " + a + " to " + l,
                                frag: e,
                              }),
                            l
                          )
                        }
                        n = i.buffered.end(s)
                      }
                      return 0
                    }),
                    (t._tryNudgeBuffer = function () {
                      var e = this.config,
                        t = this.hls,
                        r = this.media,
                        i = r.currentTime,
                        a = (this.nudgeRetry || 0) + 1
                      if (((this.nudgeRetry = a), a < e.nudgeMaxRetry)) {
                        var n = i + a * e.nudgeOffset
                        et.logger.warn("Nudging 'currentTime' from " + i + " to " + n),
                          (r.currentTime = n),
                          t.trigger(Ze.default.ERROR, {
                            type: $e.ErrorTypes.MEDIA_ERROR,
                            details: $e.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                            fatal: !1,
                          })
                      } else
                        et.logger.error(
                          "Playhead still not moving while enough data buffered @" +
                            i +
                            " after " +
                            e.nudgeMaxRetry +
                            " nudges"
                        ),
                          t.trigger(Ze.default.ERROR, {
                            type: $e.ErrorTypes.MEDIA_ERROR,
                            details: $e.ErrorDetails.BUFFER_STALLED_ERROR,
                            fatal: !0,
                          })
                    }),
                    e
                  )
                })(),
                qt = (function (e) {
                  function t(t) {
                    for (var r, i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++)
                      a[n - 1] = arguments[n]
                    return (
                      (r = e.call.apply(e, [this, t].concat(a)) || this),
                      (r._boundTick = void 0),
                      (r._tickTimer = null),
                      (r._tickInterval = null),
                      (r._tickCallCount = 0),
                      (r._boundTick = r.tick.bind(B(r))),
                      r
                    )
                  }
                  G(t, e)
                  var r = t.prototype
                  return (
                    (r.onHandlerDestroying = function () {
                      this.clearNextTick(), this.clearInterval()
                    }),
                    (r.hasInterval = function () {
                      return !!this._tickInterval
                    }),
                    (r.hasNextTick = function () {
                      return !!this._tickTimer
                    }),
                    (r.setInterval = function (e) {
                      return !this._tickInterval && ((this._tickInterval = self.setInterval(this._boundTick, e)), !0)
                    }),
                    (r.clearInterval = function () {
                      return (
                        !!this._tickInterval &&
                        (self.clearInterval(this._tickInterval), (this._tickInterval = null), !0)
                      )
                    }),
                    (r.clearNextTick = function () {
                      return !!this._tickTimer && (self.clearTimeout(this._tickTimer), (this._tickTimer = null), !0)
                    }),
                    (r.tick = function () {
                      1 === ++this._tickCallCount &&
                        (this.doTick(),
                        this._tickCallCount > 1 &&
                          (this.clearNextTick(), (this._tickTimer = self.setTimeout(this._boundTick, 0))),
                        (this._tickCallCount = 0))
                    }),
                    (r.doTick = function () {}),
                    t
                  )
                })(it),
                Xt = {
                  STOPPED: "STOPPED",
                  STARTING: "STARTING",
                  IDLE: "IDLE",
                  PAUSED: "PAUSED",
                  KEY_LOADING: "KEY_LOADING",
                  FRAG_LOADING: "FRAG_LOADING",
                  FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                  WAITING_TRACK: "WAITING_TRACK",
                  PARSING: "PARSING",
                  PARSED: "PARSED",
                  BUFFER_FLUSHING: "BUFFER_FLUSHING",
                  ENDED: "ENDED",
                  ERROR: "ERROR",
                  WAITING_INIT_PTS: "WAITING_INIT_PTS",
                  WAITING_LEVEL: "WAITING_LEVEL",
                },
                zt = (function (e) {
                  function t() {
                    return e.apply(this, arguments) || this
                  }
                  j(t, e)
                  var r = t.prototype
                  return (
                    (r.doTick = function () {}),
                    (r.startLoad = function () {}),
                    (r.stopLoad = function () {
                      var e = this.fragCurrent
                      e && (e.loader && e.loader.abort(), this.fragmentTracker.removeFragment(e)),
                        this.demuxer && (this.demuxer.destroy(), (this.demuxer = null)),
                        (this.fragCurrent = null),
                        (this.fragPrevious = null),
                        this.clearInterval(),
                        this.clearNextTick(),
                        (this.state = Xt.STOPPED)
                    }),
                    (r._streamEnded = function (e, t) {
                      var r = this.fragCurrent,
                        i = this.fragmentTracker
                      if (!t.live && r && !r.backtracked && r.sn === t.endSN && !e.nextStart) {
                        var a = i.getState(r)
                        return a === It.PARTIAL || a === It.OK
                      }
                      return !1
                    }),
                    (r.onMediaSeeking = function () {
                      var e = this.config,
                        t = this.media,
                        r = this.mediaBuffer,
                        i = this.state,
                        a = t ? t.currentTime : null,
                        n = xt.bufferInfo(r || t, a, this.config.maxBufferHole)
                      if (
                        (et.logger.log("media seeking to " + (Object(Je.isFiniteNumber)(a) ? a.toFixed(3) : a)),
                        i === Xt.FRAG_LOADING)
                      ) {
                        var s = this.fragCurrent
                        if (0 === n.len && s) {
                          var o = e.maxFragLookUpTolerance,
                            l = s.start - o,
                            u = s.start + s.duration + o
                          a < l || a > u
                            ? (s.loader &&
                                (et.logger.log(
                                  "seeking outside of buffer while fragment load in progress, cancel fragment load"
                                ),
                                s.loader.abort()),
                              (this.fragCurrent = null),
                              (this.fragPrevious = null),
                              (this.state = Xt.IDLE))
                            : et.logger.log("seeking outside of buffer but within currently loaded fragment range")
                        }
                      } else
                        i === Xt.ENDED &&
                          (0 === n.len && ((this.fragPrevious = null), (this.fragCurrent = null)),
                          (this.state = Xt.IDLE))
                      t && (this.lastCurrentTime = a),
                        this.loadedmetadata || (this.nextLoadPosition = this.startPosition = a),
                        this.tick()
                    }),
                    (r.onMediaEnded = function () {
                      this.startPosition = this.lastCurrentTime = 0
                    }),
                    (r.onHandlerDestroying = function () {
                      this.stopLoad(), e.prototype.onHandlerDestroying.call(this)
                    }),
                    (r.onHandlerDestroyed = function () {
                      ;(this.state = Xt.STOPPED), (this.fragmentTracker = null)
                    }),
                    (r.computeLivePosition = function (e, t) {
                      var r =
                        void 0 !== this.config.liveSyncDuration
                          ? this.config.liveSyncDuration
                          : this.config.liveSyncDurationCount * t.targetduration
                      return e + Math.max(0, t.totalduration - r)
                    }),
                    t
                  )
                })(qt),
                Qt = (function (e) {
                  function t(t, r) {
                    var i
                    return (
                      (i =
                        e.call(
                          this,
                          t,
                          Ze.default.MEDIA_ATTACHED,
                          Ze.default.MEDIA_DETACHING,
                          Ze.default.MANIFEST_LOADING,
                          Ze.default.MANIFEST_PARSED,
                          Ze.default.LEVEL_LOADED,
                          Ze.default.LEVELS_UPDATED,
                          Ze.default.KEY_LOADED,
                          Ze.default.FRAG_LOADED,
                          Ze.default.FRAG_LOAD_EMERGENCY_ABORTED,
                          Ze.default.FRAG_PARSING_INIT_SEGMENT,
                          Ze.default.FRAG_PARSING_DATA,
                          Ze.default.FRAG_PARSED,
                          Ze.default.ERROR,
                          Ze.default.AUDIO_TRACK_SWITCHING,
                          Ze.default.AUDIO_TRACK_SWITCHED,
                          Ze.default.BUFFER_CREATED,
                          Ze.default.BUFFER_APPENDED,
                          Ze.default.BUFFER_FLUSHED
                        ) || this),
                      (i.fragmentTracker = r),
                      (i.config = t.config),
                      (i.audioCodecSwap = !1),
                      (i._state = Xt.STOPPED),
                      (i.stallReported = !1),
                      (i.gapController = null),
                      (i.altAudio = !1),
                      (i.audioOnly = !1),
                      (i.bitrateTest = !1),
                      i
                    )
                  }
                  V(t, e)
                  var r = t.prototype
                  return (
                    (r.startLoad = function (e) {
                      if (this.levels) {
                        var t = this.lastCurrentTime,
                          r = this.hls
                        if (
                          (this.stopLoad(),
                          this.setInterval(100),
                          (this.level = -1),
                          (this.fragLoadError = 0),
                          !this.startFragRequested)
                        ) {
                          var i = r.startLevel
                          ;-1 === i &&
                            (r.config.testBandwidth ? ((i = 0), (this.bitrateTest = !0)) : (i = r.nextAutoLevel)),
                            (this.level = r.nextLoadLevel = i),
                            (this.loadedmetadata = !1)
                        }
                        t > 0 &&
                          -1 === e &&
                          (et.logger.log("override startPosition with lastCurrentTime @" + t.toFixed(3)), (e = t)),
                          (this.state = Xt.IDLE),
                          (this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e),
                          this.tick()
                      } else (this.forceStartLoad = !0), (this.state = Xt.STOPPED)
                    }),
                    (r.stopLoad = function () {
                      ;(this.forceStartLoad = !1), e.prototype.stopLoad.call(this)
                    }),
                    (r.doTick = function () {
                      switch (this.state) {
                        case Xt.BUFFER_FLUSHING:
                          this.fragLoadError = 0
                          break
                        case Xt.IDLE:
                          this._doTickIdle()
                          break
                        case Xt.WAITING_LEVEL:
                          var e = this.levels[this.level]
                          e && e.details && (this.state = Xt.IDLE)
                          break
                        case Xt.FRAG_LOADING_WAITING_RETRY:
                          var t = window.performance.now(),
                            r = this.retryDate
                          ;(!r || t >= r || (this.media && this.media.seeking)) &&
                            (et.logger.log("mediaController: retryDate reached, switch back to IDLE state"),
                            (this.state = Xt.IDLE))
                          break
                        case Xt.ERROR:
                        case Xt.STOPPED:
                        case Xt.FRAG_LOADING:
                        case Xt.PARSING:
                        case Xt.PARSED:
                        case Xt.ENDED:
                      }
                      this._checkBuffer(), this._checkFragmentChanged()
                    }),
                    (r._doTickIdle = function () {
                      var e = this.hls,
                        t = e.config,
                        r = this.media
                      if (void 0 !== this.levelLastLoaded && (r || (!this.startFragRequested && t.startFragPrefetch))) {
                        if (this.altAudio && this.audioOnly) return void (this.demuxer.frag = null)
                        var i
                        i = this.loadedmetadata ? r.currentTime : this.nextLoadPosition
                        var a = e.nextLoadLevel,
                          n = this.levels[a]
                        if (n) {
                          var s,
                            o = n.bitrate
                          ;(s = o ? Math.max((8 * t.maxBufferSize) / o, t.maxBufferLength) : t.maxBufferLength),
                            (s = Math.min(s, t.maxMaxBufferLength))
                          var l = i < t.maxBufferHole ? Math.max(2, t.maxBufferHole) : t.maxBufferHole,
                            u = xt.bufferInfo(this.mediaBuffer ? this.mediaBuffer : r, i, l),
                            d = u.len
                          if (!(d >= s)) {
                            et.logger.trace(
                              "buffer length of " +
                                d.toFixed(3) +
                                " is below max of " +
                                s.toFixed(3) +
                                ". checking for more payload ..."
                            ),
                              (this.level = e.nextLoadLevel = a)
                            var c = n.details
                            if (!c || (c.live && this.levelLastLoaded !== a))
                              return void (this.state = Xt.WAITING_LEVEL)
                            if (this._streamEnded(u, c)) {
                              var f = {}
                              return (
                                this.altAudio && (f.type = "video"),
                                this.hls.trigger(Ze.default.BUFFER_EOS, f),
                                void (this.state = Xt.ENDED)
                              )
                            }
                            this._fetchPayloadOrEos(i, u, c)
                          }
                        }
                      }
                    }),
                    (r._fetchPayloadOrEos = function (e, t, r) {
                      var i = this.fragPrevious,
                        a = (this.level, r.fragments),
                        n = a.length
                      if (0 !== n) {
                        var s,
                          o = a[0].start,
                          l = a[n - 1].start + a[n - 1].duration,
                          u = t.end
                        if (r.initSegment && !r.initSegment.data) s = r.initSegment
                        else if (r.live) {
                          var d = this.config.initialLiveManifestSize
                          if (n < d)
                            return void et.logger.warn(
                              "Can not start playback of a level, reason: not enough fragments " + n + " < " + d
                            )
                          if (null === (s = this._ensureFragmentAtLivePoint(r, u, o, l, i, a))) return
                        } else u < o && (s = a[0])
                        s || (s = this._findFragment(o, i, n, a, u, l, r)),
                          s && (s.encrypted ? this._loadKey(s, r) : this._loadFragment(s, r, e, u))
                      }
                    }),
                    (r._ensureFragmentAtLivePoint = function (e, t, r, i, a, n) {
                      var s,
                        o = this.hls.config,
                        l = this.media,
                        u = 1 / 0
                      if (
                        (void 0 !== o.liveMaxLatencyDuration
                          ? (u = o.liveMaxLatencyDuration)
                          : Object(Je.isFiniteNumber)(o.liveMaxLatencyDurationCount) &&
                            (u = o.liveMaxLatencyDurationCount * e.targetduration),
                        t < Math.max(r - o.maxFragLookUpTolerance, i - u))
                      ) {
                        var d = (this.liveSyncPosition = this.computeLivePosition(r, e))
                        ;(t = d),
                          l &&
                            !l.paused &&
                            l.readyState &&
                            l.duration > d &&
                            d > l.currentTime &&
                            (et.logger.log(
                              "buffer end: " +
                                t.toFixed(3) +
                                " is located too far from the end of live sliding playlist, reset currentTime to : " +
                                d.toFixed(3)
                            ),
                            (l.currentTime = d)),
                          (this.nextLoadPosition = d)
                      }
                      if (e.PTSKnown && t > i && l && l.readyState) return null
                      if (this.startFragRequested && !e.PTSKnown && a)
                        if (e.hasProgramDateTime)
                          et.logger.log(
                            "live playlist, switching playlist, load frag with same PDT: " + a.programDateTime
                          ),
                            (s = F(n, a.endProgramDateTime, o.maxFragLookUpTolerance))
                        else {
                          var c = a.sn + 1
                          if (c >= e.startSN && c <= e.endSN) {
                            var f = n[c - e.startSN]
                            a.cc === f.cc &&
                              ((s = f),
                              et.logger.log("live playlist, switching playlist, load frag with next SN: " + s.sn))
                          }
                          s ||
                            ((s = Pt.search(n, function (e) {
                              return a.cc - e.cc
                            })) &&
                              et.logger.log("live playlist, switching playlist, load frag with same CC: " + s.sn))
                        }
                      return s
                    }),
                    (r._findFragment = function (e, t, r, i, a, n, s) {
                      var o,
                        l = this.hls.config
                      if (a < n) {
                        o = M(t, i, a, a > n - l.maxFragLookUpTolerance ? 0 : l.maxFragLookUpTolerance)
                      } else o = i[r - 1]
                      if (o) {
                        var u = o.sn - s.startSN,
                          d = t && o.level === t.level,
                          c = i[u - 1],
                          f = i[u + 1]
                        if (t && o.sn === t.sn)
                          if (d && !o.backtracked)
                            if (o.sn < s.endSN) {
                              var h = t.deltaPTS
                              h && h > l.maxBufferHole && t.dropped && u
                                ? ((o = c),
                                  et.logger.warn(
                                    "Previous fragment was dropped with large PTS gap between audio and video. Maybe fragment is not starting with a keyframe? Loading previous one to try to overcome this"
                                  ))
                                : ((o = f),
                                  this.fragmentTracker.getState(o) !== It.OK &&
                                    et.logger.log("Re-loading fragment with SN: " + o.sn))
                            } else o = null
                          else
                            o.backtracked &&
                              (f && f.backtracked
                                ? (et.logger.warn(
                                    "Already backtracked from fragment " +
                                      f.sn +
                                      ", will not backtrack to fragment " +
                                      o.sn +
                                      ". Loading fragment " +
                                      f.sn
                                  ),
                                  (o = f))
                                : (et.logger.warn(
                                    "Loaded fragment with dropped frames, backtracking 1 segment to find a keyframe"
                                  ),
                                  (o.dropped = 0),
                                  c ? ((o = c), (o.backtracked = !0)) : u && (o = null)))
                      }
                      return o
                    }),
                    (r._loadKey = function (e, t) {
                      et.logger.log(
                        "Loading key for " + e.sn + " of [" + t.startSN + "-" + t.endSN + "], level " + this.level
                      ),
                        (this.state = Xt.KEY_LOADING),
                        this.hls.trigger(Ze.default.KEY_LOADING, { frag: e })
                    }),
                    (r._loadFragment = function (e, t, r, i) {
                      var a = this.fragmentTracker.getState(e)
                      ;(this.fragCurrent = e),
                        "initSegment" !== e.sn && (this.startFragRequested = !0),
                        Object(Je.isFiniteNumber)(e.sn) &&
                          !e.bitrateTest &&
                          (this.nextLoadPosition = e.start + e.duration),
                        e.backtracked || a === It.NOT_LOADED || a === It.PARTIAL
                          ? ((e.autoLevel = this.hls.autoLevelEnabled),
                            (e.bitrateTest = this.bitrateTest),
                            et.logger.log(
                              "Loading " +
                                e.sn +
                                " of [" +
                                t.startSN +
                                "-" +
                                t.endSN +
                                "], level " +
                                this.level +
                                ", " +
                                (this.loadedmetadata ? "currentTime" : "nextLoadPosition") +
                                ": " +
                                parseFloat(r.toFixed(3)) +
                                ", bufferEnd: " +
                                parseFloat(i.toFixed(3))
                            ),
                            this.hls.trigger(Ze.default.FRAG_LOADING, { frag: e }),
                            this.demuxer || (this.demuxer = new Ht(this.hls, "main")),
                            (this.state = Xt.FRAG_LOADING))
                          : a === It.APPENDING &&
                            this._reduceMaxBufferLength(e.duration) &&
                            this.fragmentTracker.removeFragment(e)
                    }),
                    (r.getBufferedFrag = function (e) {
                      return this.fragmentTracker.getBufferedFrag(e, at.MAIN)
                    }),
                    (r.followingBufferedFrag = function (e) {
                      return e ? this.getBufferedFrag(e.endPTS + 0.5) : null
                    }),
                    (r._checkFragmentChanged = function () {
                      var e,
                        t,
                        r = this.media
                      if (
                        r &&
                        r.readyState &&
                        !1 === r.seeking &&
                        ((t = r.currentTime),
                        t > this.lastCurrentTime && (this.lastCurrentTime = t),
                        xt.isBuffered(r, t)
                          ? (e = this.getBufferedFrag(t))
                          : xt.isBuffered(r, t + 0.1) && (e = this.getBufferedFrag(t + 0.1)),
                        e)
                      ) {
                        var i = e
                        if (i !== this.fragPlaying) {
                          this.hls.trigger(Ze.default.FRAG_CHANGED, { frag: i })
                          var a = i.level
                          ;(this.fragPlaying && this.fragPlaying.level === a) ||
                            this.hls.trigger(Ze.default.LEVEL_SWITCHED, { level: a }),
                            (this.fragPlaying = i)
                        }
                      }
                    }),
                    (r.immediateLevelSwitch = function () {
                      if ((et.logger.log("immediateLevelSwitch"), !this.immediateSwitch)) {
                        this.immediateSwitch = !0
                        var e,
                          t = this.media
                        t ? (e = t.paused) || t.pause() : (e = !0), (this.previouslyPaused = e)
                      }
                      var r = this.fragCurrent
                      r && r.loader && r.loader.abort(),
                        (this.fragCurrent = null),
                        this.flushMainBuffer(0, Number.POSITIVE_INFINITY)
                    }),
                    (r.immediateLevelSwitchEnd = function () {
                      var e = this.media
                      e &&
                        e.buffered.length &&
                        ((this.immediateSwitch = !1),
                        e.currentTime > 0 && xt.isBuffered(e, e.currentTime) && (e.currentTime -= 1e-4),
                        this.previouslyPaused || e.play())
                    }),
                    (r.nextLevelSwitch = function () {
                      var e = this.media
                      if (e && e.readyState) {
                        var t,
                          r = this.getBufferedFrag(e.currentTime)
                        if ((r && r.startPTS > 1 && this.flushMainBuffer(0, r.startPTS - 1), e.paused)) t = 0
                        else {
                          var i = this.hls.nextLoadLevel,
                            a = this.levels[i],
                            n = this.fragLastKbps
                          t = n && this.fragCurrent ? (this.fragCurrent.duration * a.bitrate) / (1e3 * n) + 1 : 0
                        }
                        var s = this.getBufferedFrag(e.currentTime + t)
                        if (s) {
                          var o = this.followingBufferedFrag(s)
                          if (o) {
                            var l = this.fragCurrent
                            l && l.loader && l.loader.abort(), (this.fragCurrent = null)
                            var u = Math.max(
                              s.endPTS,
                              o.maxStartPTS + Math.min(this.config.maxFragLookUpTolerance, o.duration)
                            )
                            this.flushMainBuffer(u, Number.POSITIVE_INFINITY)
                          }
                        }
                      }
                    }),
                    (r.flushMainBuffer = function (e, t) {
                      this.state = Xt.BUFFER_FLUSHING
                      var r = { startOffset: e, endOffset: t }
                      this.altAudio && (r.type = "video"), this.hls.trigger(Ze.default.BUFFER_FLUSHING, r)
                    }),
                    (r.onMediaAttached = function (e) {
                      var t = (this.media = this.mediaBuffer = e.media)
                      ;(this.onvseeking = this.onMediaSeeking.bind(this)),
                        (this.onvseeked = this.onMediaSeeked.bind(this)),
                        (this.onvended = this.onMediaEnded.bind(this)),
                        t.addEventListener("seeking", this.onvseeking),
                        t.addEventListener("seeked", this.onvseeked),
                        t.addEventListener("ended", this.onvended)
                      var r = this.config
                      this.levels && r.autoStartLoad && this.hls.startLoad(r.startPosition),
                        (this.gapController = new Wt(r, t, this.fragmentTracker, this.hls))
                    }),
                    (r.onMediaDetaching = function () {
                      var e = this.media
                      e &&
                        e.ended &&
                        (et.logger.log("MSE detaching and video ended, reset startPosition"),
                        (this.startPosition = this.lastCurrentTime = 0))
                      var t = this.levels
                      t &&
                        t.forEach(function (e) {
                          e.details &&
                            e.details.fragments.forEach(function (e) {
                              e.backtracked = void 0
                            })
                        }),
                        e &&
                          (e.removeEventListener("seeking", this.onvseeking),
                          e.removeEventListener("seeked", this.onvseeked),
                          e.removeEventListener("ended", this.onvended),
                          (this.onvseeking = this.onvseeked = this.onvended = null)),
                        this.fragmentTracker.removeAllFragments(),
                        (this.media = this.mediaBuffer = null),
                        (this.loadedmetadata = !1),
                        this.stopLoad()
                    }),
                    (r.onMediaSeeked = function () {
                      var e = this.media,
                        t = e ? e.currentTime : void 0
                      Object(Je.isFiniteNumber)(t) && et.logger.log("media seeked to " + t.toFixed(3)), this.tick()
                    }),
                    (r.onManifestLoading = function () {
                      et.logger.log("trigger BUFFER_RESET"),
                        this.hls.trigger(Ze.default.BUFFER_RESET),
                        this.fragmentTracker.removeAllFragments(),
                        (this.stalled = !1),
                        (this.startPosition = this.lastCurrentTime = 0)
                    }),
                    (r.onManifestParsed = function (e) {
                      var t,
                        r = !1,
                        i = !1
                      e.levels.forEach(function (e) {
                        ;(t = e.audioCodec) &&
                          (-1 !== t.indexOf("mp4a.40.2") && (r = !0), -1 !== t.indexOf("mp4a.40.5") && (i = !0))
                      }),
                        (this.audioCodecSwitch = r && i),
                        this.audioCodecSwitch &&
                          et.logger.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),
                        (this.altAudio = e.altAudio),
                        (this.levels = e.levels),
                        (this.startFragRequested = !1)
                      var a = this.config
                      ;(a.autoStartLoad || this.forceStartLoad) && this.hls.startLoad(a.startPosition)
                    }),
                    (r.onLevelLoaded = function (e) {
                      var t = e.details,
                        r = e.level,
                        i = this.levels[this.levelLastLoaded],
                        a = this.levels[r],
                        n = t.totalduration,
                        s = 0
                      if (
                        (et.logger.log("level " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + n),
                        t.live || (a.details && a.details.live))
                      ) {
                        var o = a.details
                        o && t.fragments.length > 0
                          ? (b(o, t),
                            (s = t.fragments[0].start),
                            (this.liveSyncPosition = this.computeLivePosition(s, o)),
                            t.PTSKnown && Object(Je.isFiniteNumber)(s)
                              ? et.logger.log("live playlist sliding:" + s.toFixed(3))
                              : (et.logger.log("live playlist - outdated PTS, unknown sliding"),
                                C(this.fragPrevious, i, t)))
                          : (et.logger.log("live playlist - first load, unknown sliding"),
                            (t.PTSKnown = !1),
                            C(this.fragPrevious, i, t))
                      } else t.PTSKnown = !1
                      if (
                        ((a.details = t),
                        (this.levelLastLoaded = r),
                        this.hls.trigger(Ze.default.LEVEL_UPDATED, { details: t, level: r }),
                        !1 === this.startFragRequested)
                      ) {
                        if (-1 === this.startPosition || -1 === this.lastCurrentTime) {
                          var l = t.startTimeOffset
                          Object(Je.isFiniteNumber)(l)
                            ? (l < 0 &&
                                (et.logger.log("negative start time offset " + l + ", count from end of last fragment"),
                                (l = s + n + l)),
                              et.logger.log("start time offset found in playlist, adjust startPosition to " + l),
                              (this.startPosition = l))
                            : t.live
                            ? ((this.startPosition = this.computeLivePosition(s, t)),
                              et.logger.log("configure startPosition to " + this.startPosition))
                            : (this.startPosition = 0),
                            (this.lastCurrentTime = this.startPosition)
                        }
                        this.nextLoadPosition = this.startPosition
                      }
                      this.state === Xt.WAITING_LEVEL && (this.state = Xt.IDLE), this.tick()
                    }),
                    (r.onKeyLoaded = function () {
                      this.state === Xt.KEY_LOADING && ((this.state = Xt.IDLE), this.tick())
                    }),
                    (r.onFragLoaded = function (e) {
                      var t = this.fragCurrent,
                        r = this.hls,
                        i = this.levels,
                        a = this.media,
                        n = e.frag
                      if (
                        this.state === Xt.FRAG_LOADING &&
                        t &&
                        "main" === n.type &&
                        n.level === t.level &&
                        n.sn === t.sn
                      ) {
                        var s = e.stats,
                          o = i[t.level],
                          l = o.details
                        if (
                          ((this.bitrateTest = !1),
                          (this.stats = s),
                          et.logger.log("Loaded " + t.sn + " of [" + l.startSN + " ," + l.endSN + "],level " + t.level),
                          n.bitrateTest && r.nextLoadLevel)
                        )
                          (this.state = Xt.IDLE),
                            (this.startFragRequested = !1),
                            (s.tparsed = s.tbuffered = window.performance.now()),
                            r.trigger(Ze.default.FRAG_BUFFERED, { stats: s, frag: t, id: "main" }),
                            this.tick()
                        else if ("initSegment" === n.sn)
                          (this.state = Xt.IDLE),
                            (s.tparsed = s.tbuffered = window.performance.now()),
                            (l.initSegment.data = e.payload),
                            r.trigger(Ze.default.FRAG_BUFFERED, { stats: s, frag: t, id: "main" }),
                            this.tick()
                        else {
                          et.logger.log(
                            "Parsing " +
                              t.sn +
                              " of [" +
                              l.startSN +
                              " ," +
                              l.endSN +
                              "],level " +
                              t.level +
                              ", cc " +
                              t.cc
                          ),
                            (this.state = Xt.PARSING),
                            (this.pendingBuffering = !0),
                            (this.appended = !1),
                            n.bitrateTest && ((n.bitrateTest = !1), this.fragmentTracker.onFragLoaded({ frag: n }))
                          var u = !(a && a.seeking) && (l.PTSKnown || !l.live),
                            d = l.initSegment ? l.initSegment.data : [],
                            c = this._getAudioCodec(o),
                            f = (this.demuxer = this.demuxer || new Ht(this.hls, "main"))
                          f.push(e.payload, d, c, o.videoCodec, t, l.totalduration, u)
                        }
                      }
                      this.fragLoadError = 0
                    }),
                    (r.onFragParsingInitSegment = function (e) {
                      var t = this.fragCurrent,
                        r = e.frag
                      if (t && "main" === e.id && r.sn === t.sn && r.level === t.level && this.state === Xt.PARSING) {
                        var i,
                          a,
                          n = e.tracks
                        if (
                          ((this.audioOnly = n.audio && !n.video),
                          this.altAudio && !this.audioOnly && delete n.audio,
                          (a = n.audio))
                        ) {
                          var s = this.levels[this.level].audioCodec,
                            o = navigator.userAgent.toLowerCase()
                          s &&
                            this.audioCodecSwap &&
                            (et.logger.log("swapping playlist audio codec"),
                            (s = -1 !== s.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5")),
                            this.audioCodecSwitch &&
                              1 !== a.metadata.channelCount &&
                              -1 === o.indexOf("firefox") &&
                              (s = "mp4a.40.5"),
                            -1 !== o.indexOf("android") &&
                              "audio/mpeg" !== a.container &&
                              ((s = "mp4a.40.2"), et.logger.log("Android: force audio codec to " + s)),
                            (a.levelCodec = s),
                            (a.id = e.id)
                        }
                        ;(a = n.video),
                          a && ((a.levelCodec = this.levels[this.level].videoCodec), (a.id = e.id)),
                          this.hls.trigger(Ze.default.BUFFER_CODECS, n)
                        for (i in n) {
                          ;(a = n[i]),
                            et.logger.log(
                              "main track:" +
                                i +
                                ",container:" +
                                a.container +
                                ",codecs[level/parsed]=[" +
                                a.levelCodec +
                                "/" +
                                a.codec +
                                "]"
                            )
                          var l = a.initSegment
                          l &&
                            ((this.appended = !0),
                            (this.pendingBuffering = !0),
                            this.hls.trigger(Ze.default.BUFFER_APPENDING, {
                              type: i,
                              data: l,
                              parent: "main",
                              content: "initSegment",
                            }))
                        }
                        this.tick()
                      }
                    }),
                    (r.onFragParsingData = function (e) {
                      var t = this,
                        r = this.fragCurrent,
                        i = e.frag
                      if (
                        r &&
                        "main" === e.id &&
                        i.sn === r.sn &&
                        i.level === r.level &&
                        ("audio" !== e.type || !this.altAudio) &&
                        this.state === Xt.PARSING
                      ) {
                        var a = this.levels[this.level],
                          n = r
                        if (
                          (Object(Je.isFiniteNumber)(e.endPTS) ||
                            ((e.endPTS = e.startPTS + r.duration), (e.endDTS = e.startDTS + r.duration)),
                          !0 === e.hasAudio && n.addElementaryStream(nt.AUDIO),
                          !0 === e.hasVideo && n.addElementaryStream(nt.VIDEO),
                          et.logger.log(
                            "Parsed " +
                              e.type +
                              ",PTS:[" +
                              e.startPTS.toFixed(3) +
                              "," +
                              e.endPTS.toFixed(3) +
                              "],DTS:[" +
                              e.startDTS.toFixed(3) +
                              "/" +
                              e.endDTS.toFixed(3) +
                              "],nb:" +
                              e.nb +
                              ",dropped:" +
                              (e.dropped || 0)
                          ),
                          "video" === e.type)
                        )
                          if (((n.dropped = e.dropped), n.dropped))
                            if (n.backtracked)
                              et.logger.warn("Already backtracked on this fragment, appending with the gap", n.sn)
                            else {
                              var s = a.details
                              if (!s || n.sn !== s.startSN)
                                return (
                                  et.logger.warn("missing video frame(s), backtracking fragment", n.sn),
                                  this.fragmentTracker.removeFragment(n),
                                  (n.backtracked = !0),
                                  (this.nextLoadPosition = e.startPTS),
                                  (this.state = Xt.IDLE),
                                  (this.fragPrevious = n),
                                  this.demuxer && (this.demuxer.destroy(), (this.demuxer = null)),
                                  void this.tick()
                                )
                              et.logger.warn("missing video frame(s) on first frag, appending with gap", n.sn)
                            }
                          else n.backtracked = !1
                        var o = S(a.details, n, e.startPTS, e.endPTS, e.startDTS, e.endDTS),
                          l = this.hls
                        l.trigger(Ze.default.LEVEL_PTS_UPDATED, {
                          details: a.details,
                          level: this.level,
                          drift: o,
                          type: e.type,
                          start: e.startPTS,
                          end: e.endPTS,
                        }),
                          [e.data1, e.data2].forEach(function (r) {
                            r &&
                              r.length &&
                              t.state === Xt.PARSING &&
                              ((t.appended = !0),
                              (t.pendingBuffering = !0),
                              l.trigger(Ze.default.BUFFER_APPENDING, {
                                type: e.type,
                                data: r,
                                parent: "main",
                                content: "data",
                              }))
                          }),
                          this.tick()
                      }
                    }),
                    (r.onFragParsed = function (e) {
                      var t = this.fragCurrent,
                        r = e.frag
                      t &&
                        "main" === e.id &&
                        r.sn === t.sn &&
                        r.level === t.level &&
                        this.state === Xt.PARSING &&
                        ((this.stats.tparsed = window.performance.now()),
                        (this.state = Xt.PARSED),
                        this._checkAppendedParsed())
                    }),
                    (r.onAudioTrackSwitching = function (e) {
                      var t = this.altAudio,
                        r = !!e.url,
                        i = e.id
                      if (!r) {
                        if (this.mediaBuffer !== this.media) {
                          et.logger.log(
                            "switching on main audio, use media.buffered to schedule main fragment loading"
                          ),
                            (this.mediaBuffer = this.media)
                          var a = this.fragCurrent
                          a.loader &&
                            (et.logger.log("switching to main audio track, cancel main fragment load"),
                            a.loader.abort()),
                            (this.fragCurrent = null),
                            (this.fragPrevious = null),
                            this.demuxer && (this.demuxer.destroy(), (this.demuxer = null)),
                            (this.state = Xt.IDLE)
                        }
                        var n = this.hls
                        t &&
                          n.trigger(Ze.default.BUFFER_FLUSHING, {
                            startOffset: 0,
                            endOffset: Number.POSITIVE_INFINITY,
                            type: "audio",
                          }),
                          n.trigger(Ze.default.AUDIO_TRACK_SWITCHED, { id: i })
                      }
                    }),
                    (r.onAudioTrackSwitched = function (e) {
                      var t = e.id,
                        r = !!this.hls.audioTracks[t].url
                      if (r) {
                        var i = this.videoBuffer
                        i &&
                          this.mediaBuffer !== i &&
                          (et.logger.log(
                            "switching on alternate audio, use video.buffered to schedule main fragment loading"
                          ),
                          (this.mediaBuffer = i))
                      }
                      ;(this.altAudio = r), this.tick()
                    }),
                    (r.onBufferCreated = function (e) {
                      var t,
                        r,
                        i = e.tracks,
                        a = !1
                      for (var n in i) {
                        var s = i[n]
                        "main" === s.id
                          ? ((r = n), (t = s), "video" === n && (this.videoBuffer = i[n].buffer))
                          : (a = !0)
                      }
                      a && t
                        ? (et.logger.log(
                            "alternate track found, use " + r + ".buffered to schedule main fragment loading"
                          ),
                          (this.mediaBuffer = t.buffer))
                        : (this.mediaBuffer = this.media)
                    }),
                    (r.onBufferAppended = function (e) {
                      if ("main" === e.parent) {
                        var t = this.state
                        ;(t !== Xt.PARSING && t !== Xt.PARSED) ||
                          ((this.pendingBuffering = e.pending > 0), this._checkAppendedParsed())
                      }
                    }),
                    (r._checkAppendedParsed = function () {
                      if (!(this.state !== Xt.PARSED || (this.appended && this.pendingBuffering))) {
                        var e = this.fragCurrent
                        if (e) {
                          var t = this.mediaBuffer ? this.mediaBuffer : this.media
                          et.logger.log("main buffered : " + Yt.toString(t.buffered)), (this.fragPrevious = e)
                          var r = this.stats
                          ;(r.tbuffered = window.performance.now()),
                            (this.fragLastKbps = Math.round((8 * r.total) / (r.tbuffered - r.tfirst))),
                            this.hls.trigger(Ze.default.FRAG_BUFFERED, { stats: r, frag: e, id: "main" }),
                            (this.state = Xt.IDLE)
                        }
                        ;(this.loadedmetadata || this.startPosition <= 0) && this.tick()
                      }
                    }),
                    (r.onError = function (e) {
                      var t = e.frag || this.fragCurrent
                      if (!t || "main" === t.type) {
                        var r =
                          !!this.media &&
                          xt.isBuffered(this.media, this.media.currentTime) &&
                          xt.isBuffered(this.media, this.media.currentTime + 0.5)
                        switch (e.details) {
                          case $e.ErrorDetails.FRAG_LOAD_ERROR:
                          case $e.ErrorDetails.FRAG_LOAD_TIMEOUT:
                          case $e.ErrorDetails.KEY_LOAD_ERROR:
                          case $e.ErrorDetails.KEY_LOAD_TIMEOUT:
                            if (!e.fatal)
                              if (this.fragLoadError + 1 <= this.config.fragLoadingMaxRetry) {
                                var i = Math.min(
                                  Math.pow(2, this.fragLoadError) * this.config.fragLoadingRetryDelay,
                                  this.config.fragLoadingMaxRetryTimeout
                                )
                                et.logger.warn("mediaController: frag loading failed, retry in " + i + " ms"),
                                  (this.retryDate = window.performance.now() + i),
                                  this.loadedmetadata ||
                                    ((this.startFragRequested = !1), (this.nextLoadPosition = this.startPosition)),
                                  this.fragLoadError++,
                                  (this.state = Xt.FRAG_LOADING_WAITING_RETRY)
                              } else
                                et.logger.error(
                                  "mediaController: " + e.details + " reaches max retry, redispatch as fatal ..."
                                ),
                                  (e.fatal = !0),
                                  (this.state = Xt.ERROR)
                            break
                          case $e.ErrorDetails.LEVEL_LOAD_ERROR:
                          case $e.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                            this.state !== Xt.ERROR &&
                              (e.fatal
                                ? ((this.state = Xt.ERROR),
                                  et.logger.warn(
                                    "streamController: " + e.details + ",switch to " + this.state + " state ..."
                                  ))
                                : e.levelRetry || this.state !== Xt.WAITING_LEVEL || (this.state = Xt.IDLE))
                            break
                          case $e.ErrorDetails.BUFFER_FULL_ERROR:
                            "main" !== e.parent ||
                              (this.state !== Xt.PARSING && this.state !== Xt.PARSED) ||
                              (r
                                ? (this._reduceMaxBufferLength(this.config.maxBufferLength), (this.state = Xt.IDLE))
                                : (et.logger.warn(
                                    "buffer full error also media.currentTime is not buffered, flush everything"
                                  ),
                                  (this.fragCurrent = null),
                                  this.flushMainBuffer(0, Number.POSITIVE_INFINITY)))
                        }
                      }
                    }),
                    (r._reduceMaxBufferLength = function (e) {
                      var t = this.config
                      return (
                        t.maxMaxBufferLength >= e &&
                        ((t.maxMaxBufferLength /= 2),
                        et.logger.warn("main:reduce max buffer length to " + t.maxMaxBufferLength + "s"),
                        !0)
                      )
                    }),
                    (r._checkBuffer = function () {
                      var e = this.media
                      if (e && 0 !== e.readyState) {
                        var t = this.mediaBuffer ? this.mediaBuffer : e,
                          r = t.buffered
                        !this.loadedmetadata && r.length
                          ? ((this.loadedmetadata = !0), this._seekToStartPos())
                          : this.immediateSwitch
                          ? this.immediateLevelSwitchEnd()
                          : this.gapController.poll(this.lastCurrentTime, r)
                      }
                    }),
                    (r.onFragLoadEmergencyAborted = function () {
                      ;(this.state = Xt.IDLE),
                        this.loadedmetadata ||
                          ((this.startFragRequested = !1), (this.nextLoadPosition = this.startPosition)),
                        this.tick()
                    }),
                    (r.onBufferFlushed = function () {
                      var e = this.mediaBuffer ? this.mediaBuffer : this.media
                      if (e) {
                        var t = this.audioOnly ? nt.AUDIO : nt.VIDEO
                        this.fragmentTracker.detectEvictedFragments(t, e.buffered)
                      }
                      ;(this.state = Xt.IDLE), (this.fragPrevious = null)
                    }),
                    (r.onLevelsUpdated = function (e) {
                      this.levels = e.levels
                    }),
                    (r.swapAudioCodec = function () {
                      this.audioCodecSwap = !this.audioCodecSwap
                    }),
                    (r._seekToStartPos = function () {
                      var e = this.media,
                        t = e.currentTime,
                        r = this.startPosition
                      if (t !== r && r >= 0) {
                        if (e.seeking) return void et.logger.log("could not seek to " + r + ", already seeking at " + t)
                        var i = e.buffered.length ? e.buffered.start(0) : 0,
                          a = i - r
                        a > 0 &&
                          a < this.config.maxBufferHole &&
                          (et.logger.log("adjusting start position by " + a + " to match buffer start"),
                          (r += a),
                          (this.startPosition = r)),
                          et.logger.log(
                            "seek to target start position " +
                              r +
                              " from current time " +
                              t +
                              ". ready state " +
                              e.readyState
                          ),
                          (e.currentTime = r)
                      }
                    }),
                    (r._getAudioCodec = function (e) {
                      var t = this.config.defaultAudioCodec || e.audioCodec
                      return (
                        this.audioCodecSwap &&
                          (et.logger.log("swapping playlist audio codec"),
                          t && (t = -1 !== t.indexOf("mp4a.40.5") ? "mp4a.40.2" : "mp4a.40.5")),
                        t
                      )
                    }),
                    H(t, [
                      {
                        key: "state",
                        set: function (e) {
                          if (this.state !== e) {
                            var t = this.state
                            ;(this._state = e),
                              et.logger.log("main stream-controller: " + t + "->" + e),
                              this.hls.trigger(Ze.default.STREAM_STATE_TRANSITION, { previousState: t, nextState: e })
                          }
                        },
                        get: function () {
                          return this._state
                        },
                      },
                      {
                        key: "currentLevel",
                        get: function () {
                          var e = this.media
                          if (e) {
                            var t = this.getBufferedFrag(e.currentTime)
                            if (t) return t.level
                          }
                          return -1
                        },
                      },
                      {
                        key: "nextBufferedFrag",
                        get: function () {
                          var e = this.media
                          return e ? this.followingBufferedFrag(this.getBufferedFrag(e.currentTime)) : null
                        },
                      },
                      {
                        key: "nextLevel",
                        get: function () {
                          var e = this.nextBufferedFrag
                          return e ? e.level : -1
                        },
                      },
                      {
                        key: "liveSyncPosition",
                        get: function () {
                          return this._liveSyncPosition
                        },
                        set: function (e) {
                          this._liveSyncPosition = e
                        },
                      },
                    ]),
                    t
                  )
                })(zt),
                $t = Qt,
                Jt = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.MANIFEST_LOADED,
                          Ze.default.LEVEL_LOADED,
                          Ze.default.AUDIO_TRACK_SWITCHED,
                          Ze.default.FRAG_LOADED,
                          Ze.default.ERROR
                        ) || this),
                      (r.canload = !1),
                      (r.currentLevelIndex = null),
                      (r.manualLevelIndex = -1),
                      (r.timer = null),
                      (lt = /chrome|firefox/.test(navigator.userAgent.toLowerCase())),
                      r
                    )
                  }
                  q(t, e)
                  var r = t.prototype
                  return (
                    (r.onHandlerDestroying = function () {
                      this.clearTimer(), (this.manualLevelIndex = -1)
                    }),
                    (r.clearTimer = function () {
                      null !== this.timer && (clearTimeout(this.timer), (this.timer = null))
                    }),
                    (r.startLoad = function () {
                      var e = this._levels
                      ;(this.canload = !0),
                        (this.levelRetryCount = 0),
                        e &&
                          e.forEach(function (e) {
                            e.loadError = 0
                            var t = e.details
                            t && t.live && (e.details = void 0)
                          }),
                        null !== this.timer && this.loadLevel()
                    }),
                    (r.stopLoad = function () {
                      this.canload = !1
                    }),
                    (r.onManifestLoaded = function (e) {
                      var t,
                        r = [],
                        i = [],
                        a = {},
                        n = null,
                        s = !1,
                        o = !1
                      if (
                        (e.levels.forEach(function (e) {
                          var t = e.attrs
                          ;(e.loadError = 0),
                            (e.fragmentError = !1),
                            (s = s || !!e.videoCodec),
                            (o = o || !!e.audioCodec),
                            lt && e.audioCodec && -1 !== e.audioCodec.indexOf("mp4a.40.34") && (e.audioCodec = void 0),
                            (n = a[e.bitrate]),
                            n ? n.url.push(e.url) : ((e.url = [e.url]), (e.urlId = 0), (a[e.bitrate] = e), r.push(e)),
                            t && (t.AUDIO && E(n || e, "audio", t.AUDIO), t.SUBTITLES && E(n || e, "text", t.SUBTITLES))
                        }),
                        s &&
                          o &&
                          (r = r.filter(function (e) {
                            return !!e.videoCodec
                          })),
                        (r = r.filter(function (e) {
                          var t = e.audioCodec,
                            r = e.videoCodec
                          return (!t || d(t, "audio")) && (!r || d(r, "video"))
                        })),
                        e.audioTracks &&
                          ((i = e.audioTracks.filter(function (e) {
                            return !e.audioCodec || d(e.audioCodec, "audio")
                          })),
                          i.forEach(function (e, t) {
                            e.id = t
                          })),
                        r.length > 0)
                      ) {
                        ;(t = r[0].bitrate),
                          r.sort(function (e, t) {
                            return e.bitrate - t.bitrate
                          }),
                          (this._levels = r)
                        for (var l = 0; l < r.length; l++)
                          if (r[l].bitrate === t) {
                            ;(this._firstLevel = l),
                              et.logger.log("manifest loaded," + r.length + " level(s) found, first bitrate:" + t)
                            break
                          }
                        var u = o && !s
                        this.hls.trigger(Ze.default.MANIFEST_PARSED, {
                          levels: r,
                          audioTracks: i,
                          firstLevel: this._firstLevel,
                          stats: e.stats,
                          audio: o,
                          video: s,
                          altAudio:
                            !u &&
                            i.some(function (e) {
                              return !!e.url
                            }),
                        })
                      } else
                        this.hls.trigger(Ze.default.ERROR, {
                          type: $e.ErrorTypes.MEDIA_ERROR,
                          details: $e.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                          fatal: !0,
                          url: this.hls.url,
                          reason: "no level with compatible codecs found in manifest",
                        })
                    }),
                    (r.setLevelInternal = function (e) {
                      var t = this._levels,
                        r = this.hls
                      if (e >= 0 && e < t.length) {
                        if ((this.clearTimer(), this.currentLevelIndex !== e)) {
                          et.logger.log("switching to level " + e), (this.currentLevelIndex = e)
                          var i = t[e]
                          ;(i.level = e), r.trigger(Ze.default.LEVEL_SWITCHING, i)
                        }
                        var a = t[e],
                          n = a.details
                        if (!n || n.live) {
                          var s = a.urlId
                          r.trigger(Ze.default.LEVEL_LOADING, { url: a.url[s], level: e, id: s })
                        }
                      } else
                        r.trigger(Ze.default.ERROR, {
                          type: $e.ErrorTypes.OTHER_ERROR,
                          details: $e.ErrorDetails.LEVEL_SWITCH_ERROR,
                          level: e,
                          fatal: !1,
                          reason: "invalid level idx",
                        })
                    }),
                    (r.onError = function (e) {
                      if (e.fatal) return void (e.type === $e.ErrorTypes.NETWORK_ERROR && this.clearTimer())
                      var t,
                        r = !1,
                        i = !1
                      switch (e.details) {
                        case $e.ErrorDetails.FRAG_LOAD_ERROR:
                        case $e.ErrorDetails.FRAG_LOAD_TIMEOUT:
                        case $e.ErrorDetails.KEY_LOAD_ERROR:
                        case $e.ErrorDetails.KEY_LOAD_TIMEOUT:
                          ;(t = e.frag.level), (i = !0)
                          break
                        case $e.ErrorDetails.LEVEL_LOAD_ERROR:
                        case $e.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                          ;(t = e.context.level), (r = !0)
                          break
                        case $e.ErrorDetails.REMUX_ALLOC_ERROR:
                          ;(t = e.level), (r = !0)
                      }
                      void 0 !== t && this.recoverLevel(e, t, r, i)
                    }),
                    (r.recoverLevel = function (e, t, r, i) {
                      var a,
                        n,
                        s,
                        o = this,
                        l = this.hls.config,
                        u = e.details,
                        d = this._levels[t]
                      if ((d.loadError++, (d.fragmentError = i), r)) {
                        if (!(this.levelRetryCount + 1 <= l.levelLoadingMaxRetry))
                          return (
                            et.logger.error("level controller, cannot recover from " + u + " error"),
                            (this.currentLevelIndex = null),
                            this.clearTimer(),
                            void (e.fatal = !0)
                          )
                        ;(n = Math.min(
                          Math.pow(2, this.levelRetryCount) * l.levelLoadingRetryDelay,
                          l.levelLoadingMaxRetryTimeout
                        )),
                          (this.timer = setTimeout(function () {
                            return o.loadLevel()
                          }, n)),
                          (e.levelRetry = !0),
                          this.levelRetryCount++,
                          et.logger.warn(
                            "level controller, " +
                              u +
                              ", retry in " +
                              n +
                              " ms, current retry count is " +
                              this.levelRetryCount
                          )
                      }
                      ;(r || i) &&
                        ((a = d.url.length),
                        a > 1 && d.loadError < a
                          ? ((d.urlId = (d.urlId + 1) % a),
                            (d.details = void 0),
                            et.logger.warn(
                              "level controller, " +
                                u +
                                " for level " +
                                t +
                                ": switching to redundant URL-id " +
                                d.urlId
                            ))
                          : -1 === this.manualLevelIndex
                          ? ((s = 0 === t ? this._levels.length - 1 : t - 1),
                            et.logger.warn("level controller, " + u + ": switch to " + s),
                            (this.hls.nextAutoLevel = this.currentLevelIndex = s))
                          : i &&
                            (et.logger.warn("level controller, " + u + ": reload a fragment"),
                            (this.currentLevelIndex = null)))
                    }),
                    (r.onFragLoaded = function (e) {
                      var t = e.frag
                      if (void 0 !== t && "main" === t.type) {
                        var r = this._levels[t.level]
                        void 0 !== r && ((r.fragmentError = !1), (r.loadError = 0), (this.levelRetryCount = 0))
                      }
                    }),
                    (r.onLevelLoaded = function (e) {
                      var t = this,
                        r = e.level,
                        i = e.details
                      if (r === this.currentLevelIndex) {
                        var a = this._levels[r]
                        if ((a.fragmentError || ((a.loadError = 0), (this.levelRetryCount = 0)), i.live)) {
                          var n = D(a.details, i, e.stats.trequest)
                          et.logger.log("live playlist, reload in " + Math.round(n) + " ms"),
                            (this.timer = setTimeout(function () {
                              return t.loadLevel()
                            }, n))
                        } else this.clearTimer()
                      }
                    }),
                    (r.onAudioTrackSwitched = function (e) {
                      var t = this.hls.audioTracks[e.id].groupId,
                        r = this.hls.levels[this.currentLevelIndex]
                      if (r && r.audioGroupIds) {
                        for (var i = -1, a = 0; a < r.audioGroupIds.length; a++)
                          if (r.audioGroupIds[a] === t) {
                            i = a
                            break
                          }
                        i !== r.urlId && ((r.urlId = i), this.startLoad())
                      }
                    }),
                    (r.loadLevel = function () {
                      if ((et.logger.debug("call to loadLevel"), null !== this.currentLevelIndex && this.canload)) {
                        var e = this._levels[this.currentLevelIndex]
                        if ("object" == typeof e && e.url.length > 0) {
                          var t = this.currentLevelIndex,
                            r = e.urlId,
                            i = e.url[r]
                          et.logger.log("Attempt loading level index " + t + " with URL-id " + r),
                            this.hls.trigger(Ze.default.LEVEL_LOADING, { url: i, level: t, id: r })
                        }
                      }
                    }),
                    (r.removeLevel = function (e, t) {
                      var r = this.levels
                        .filter(function (r, i) {
                          return (
                            i !== e ||
                            (r.url.length > 1 &&
                              void 0 !== t &&
                              ((r.url = r.url.filter(function (e, r) {
                                return r !== t
                              })),
                              (r.urlId = 0),
                              !0))
                          )
                        })
                        .map(function (e, t) {
                          var r = e.details
                          return (
                            r &&
                              r.fragments &&
                              r.fragments.forEach(function (e) {
                                e.level = t
                              }),
                            e
                          )
                        })
                      ;(this._levels = r), this.hls.trigger(Ze.default.LEVELS_UPDATED, { levels: r })
                    }),
                    W(t, [
                      {
                        key: "levels",
                        get: function () {
                          return this._levels
                        },
                      },
                      {
                        key: "level",
                        get: function () {
                          return this.currentLevelIndex
                        },
                        set: function (e) {
                          var t = this._levels
                          t &&
                            ((e = Math.min(e, t.length - 1)),
                            (this.currentLevelIndex === e && t[e].details) || this.setLevelInternal(e))
                        },
                      },
                      {
                        key: "manualLevel",
                        get: function () {
                          return this.manualLevelIndex
                        },
                        set: function (e) {
                          ;(this.manualLevelIndex = e),
                            void 0 === this._startLevel && (this._startLevel = e),
                            -1 !== e && (this.level = e)
                        },
                      },
                      {
                        key: "firstLevel",
                        get: function () {
                          return this._firstLevel
                        },
                        set: function (e) {
                          this._firstLevel = e
                        },
                      },
                      {
                        key: "startLevel",
                        get: function () {
                          if (void 0 === this._startLevel) {
                            var e = this.hls.config.startLevel
                            return void 0 !== e ? e : this._firstLevel
                          }
                          return this._startLevel
                        },
                        set: function (e) {
                          this._startLevel = e
                        },
                      },
                      {
                        key: "nextLoadLevel",
                        get: function () {
                          return -1 !== this.manualLevelIndex ? this.manualLevelIndex : this.hls.nextAutoLevel
                        },
                        set: function (e) {
                          ;(this.level = e), -1 === this.manualLevelIndex && (this.hls.nextAutoLevel = e)
                        },
                      },
                    ]),
                    t
                  )
                })(it),
                Zt = r("./src/demux/id3.js"),
                er = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.MEDIA_ATTACHED,
                          Ze.default.MEDIA_DETACHING,
                          Ze.default.FRAG_PARSING_METADATA,
                          Ze.default.LIVE_BACK_BUFFER_REACHED
                        ) || this),
                      (r.id3Track = void 0),
                      (r.media = void 0),
                      r
                    )
                  }
                  $(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      it.prototype.destroy.call(this)
                    }),
                    (r.onMediaAttached = function (e) {
                      ;(this.media = e.media), this.media
                    }),
                    (r.onMediaDetaching = function () {
                      z(this.id3Track), (this.id3Track = void 0), (this.media = void 0)
                    }),
                    (r.getID3Track = function (e) {
                      for (var t = 0; t < e.length; t++) {
                        var r = e[t]
                        if ("metadata" === r.kind && "id3" === r.label) return X(r, this.media), r
                      }
                      return this.media.addTextTrack("metadata", "id3")
                    }),
                    (r.onFragParsingMetadata = function (e) {
                      var t = e.frag,
                        r = e.samples
                      this.id3Track ||
                        ((this.id3Track = this.getID3Track(this.media.textTracks)), (this.id3Track.mode = "hidden"))
                      for (
                        var i = window.WebKitDataCue || window.VTTCue || window.TextTrackCue, a = 0;
                        a < r.length;
                        a++
                      ) {
                        var n = Zt.default.getID3Frames(r[a].data)
                        if (n) {
                          var s = Math.max(r[a].pts, 0),
                            o = a < r.length - 1 ? r[a + 1].pts : t.endPTS
                          o || (o = t.start + t.duration)
                          o - s <= 0 && (o = s + 0.25)
                          for (var l = 0; l < n.length; l++) {
                            var u = n[l]
                            if (!Zt.default.isTimeStampFrame(u)) {
                              var d = new i(s, o, "")
                              ;(d.value = u), this.id3Track.addCue(d)
                            }
                          }
                        }
                      }
                    }),
                    (r.onLiveBackBufferReached = function (e) {
                      var t = e.bufferEnd,
                        r = this.id3Track
                      if (r && r.cues && r.cues.length) {
                        var i = Q(r.cues, t)
                        if (i) for (; r.cues[0] !== i; ) r.removeCue(r.cues[0])
                      }
                    }),
                    t
                  )
                })(it),
                tr = er,
                rr = (function () {
                  function e(e) {
                    ;(this.alpha_ = void 0),
                      (this.estimate_ = void 0),
                      (this.totalWeight_ = void 0),
                      (this.alpha_ = e ? Math.exp(Math.log(0.5) / e) : 0),
                      (this.estimate_ = 0),
                      (this.totalWeight_ = 0)
                  }
                  var t = e.prototype
                  return (
                    (t.sample = function (e, t) {
                      var r = Math.pow(this.alpha_, e)
                      ;(this.estimate_ = t * (1 - r) + r * this.estimate_), (this.totalWeight_ += e)
                    }),
                    (t.getTotalWeight = function () {
                      return this.totalWeight_
                    }),
                    (t.getEstimate = function () {
                      if (this.alpha_) {
                        var e = 1 - Math.pow(this.alpha_, this.totalWeight_)
                        return this.estimate_ / e
                      }
                      return this.estimate_
                    }),
                    e
                  )
                })(),
                ir = rr,
                ar = (function () {
                  function e(e, t, r, i) {
                    ;(this.hls = void 0),
                      (this.defaultEstimate_ = void 0),
                      (this.minWeight_ = void 0),
                      (this.minDelayMs_ = void 0),
                      (this.slow_ = void 0),
                      (this.fast_ = void 0),
                      (this.hls = e),
                      (this.defaultEstimate_ = i),
                      (this.minWeight_ = 0.001),
                      (this.minDelayMs_ = 50),
                      (this.slow_ = new ir(t)),
                      (this.fast_ = new ir(r))
                  }
                  var t = e.prototype
                  return (
                    (t.sample = function (e, t) {
                      e = Math.max(e, this.minDelayMs_)
                      var r = 8 * t,
                        i = e / 1e3,
                        a = r / i
                      this.fast_.sample(i, a), this.slow_.sample(i, a)
                    }),
                    (t.canEstimate = function () {
                      var e = this.fast_
                      return e && e.getTotalWeight() >= this.minWeight_
                    }),
                    (t.getEstimate = function () {
                      return this.canEstimate()
                        ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate())
                        : this.defaultEstimate_
                    }),
                    (t.destroy = function () {}),
                    e
                  )
                })(),
                nr = ar,
                sr = window,
                or = sr.performance,
                lr = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.FRAG_LOADING,
                          Ze.default.FRAG_LOADED,
                          Ze.default.FRAG_BUFFERED,
                          Ze.default.ERROR
                        ) || this),
                      (r.lastLoadedFragLevel = 0),
                      (r._nextAutoLevel = -1),
                      (r.hls = t),
                      (r.timer = null),
                      (r._bwEstimator = null),
                      (r.onCheck = r._abandonRulesCheck.bind(te(r))),
                      r
                    )
                  }
                  re(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      this.clearTimer(), it.prototype.destroy.call(this)
                    }),
                    (r.onFragLoading = function (e) {
                      var t = e.frag
                      if (
                        "main" === t.type &&
                        (this.timer || ((this.fragCurrent = t), (this.timer = setInterval(this.onCheck, 100))),
                        !this._bwEstimator)
                      ) {
                        var r,
                          i,
                          a = this.hls,
                          n = a.config,
                          s = t.level,
                          o = a.levels[s].details.live
                        o
                          ? ((r = n.abrEwmaFastLive), (i = n.abrEwmaSlowLive))
                          : ((r = n.abrEwmaFastVoD), (i = n.abrEwmaSlowVoD)),
                          (this._bwEstimator = new nr(a, i, r, n.abrEwmaDefaultEstimate))
                      }
                    }),
                    (r._abandonRulesCheck = function () {
                      var e = this.hls,
                        t = e.media,
                        r = this.fragCurrent
                      if (r) {
                        var i = r.loader
                        if (!i || (i.stats && i.stats.aborted))
                          return (
                            et.logger.warn("frag loader destroy or aborted, disarm abandonRules"),
                            this.clearTimer(),
                            void (this._nextAutoLevel = -1)
                          )
                        var a = i.stats
                        if (
                          t &&
                          a &&
                          ((!t.paused && 0 !== t.playbackRate) || !t.readyState) &&
                          r.autoLevel &&
                          r.level
                        ) {
                          var n = or.now() - a.trequest,
                            s = Math.abs(t.playbackRate)
                          if (n > (500 * r.duration) / s) {
                            var o = e.levels,
                              l = Math.max(1, a.bw ? a.bw / 8 : (1e3 * a.loaded) / n),
                              u = o[r.level]
                            if (!u) return
                            var d = u.realBitrate ? Math.max(u.realBitrate, u.bitrate) : u.bitrate,
                              c = a.total ? a.total : Math.max(a.loaded, Math.round((r.duration * d) / 8)),
                              f = t.currentTime,
                              h = (c - a.loaded) / l,
                              g = (xt.bufferInfo(t, f, e.config.maxBufferHole).end - f) / s
                            if (g < (2 * r.duration) / s && h > g) {
                              var p,
                                v,
                                m = e.minAutoLevel
                              for (v = r.level - 1; v > m; v--) {
                                var y = o[v].realBitrate ? Math.max(o[v].realBitrate, o[v].bitrate) : o[v].bitrate
                                if ((r.duration * y) / (6.4 * l) < g) break
                              }
                              p < h &&
                                (et.logger.warn(
                                  "loading too slow, abort fragment loading and switch to level " +
                                    v +
                                    ":fragLoadedDelay[" +
                                    v +
                                    "]<fragLoadedDelay[" +
                                    (r.level - 1) +
                                    "];bufferStarvationDelay:" +
                                    p.toFixed(1) +
                                    "<" +
                                    h.toFixed(1) +
                                    ":" +
                                    g.toFixed(1)
                                ),
                                (e.nextLoadLevel = v),
                                this._bwEstimator.sample(n, a.loaded),
                                i.abort(),
                                this.clearTimer(),
                                e.trigger(Ze.default.FRAG_LOAD_EMERGENCY_ABORTED, { frag: r, stats: a }))
                            }
                          }
                        }
                      }
                    }),
                    (r.onFragLoaded = function (e) {
                      var t = e.frag
                      if ("main" === t.type && Object(Je.isFiniteNumber)(t.sn)) {
                        if (
                          (this.clearTimer(),
                          (this.lastLoadedFragLevel = t.level),
                          (this._nextAutoLevel = -1),
                          this.hls.config.abrMaxWithRealBitrate)
                        ) {
                          var r = this.hls.levels[t.level],
                            i = (r.loaded ? r.loaded.bytes : 0) + e.stats.loaded,
                            a = (r.loaded ? r.loaded.duration : 0) + e.frag.duration
                          ;(r.loaded = { bytes: i, duration: a }), (r.realBitrate = Math.round((8 * i) / a))
                        }
                        if (e.frag.bitrateTest) {
                          var n = e.stats
                          ;(n.tparsed = n.tbuffered = n.tload), this.onFragBuffered(e)
                        }
                      }
                    }),
                    (r.onFragBuffered = function (e) {
                      var t = e.stats,
                        r = e.frag
                      if (
                        !0 !== t.aborted &&
                        "main" === r.type &&
                        Object(Je.isFiniteNumber)(r.sn) &&
                        (!r.bitrateTest || t.tload === t.tbuffered)
                      ) {
                        var i = t.tparsed - t.trequest
                        et.logger.log(
                          "latency/loading/parsing/append/kbps:" +
                            Math.round(t.tfirst - t.trequest) +
                            "/" +
                            Math.round(t.tload - t.tfirst) +
                            "/" +
                            Math.round(t.tparsed - t.tload) +
                            "/" +
                            Math.round(t.tbuffered - t.tparsed) +
                            "/" +
                            Math.round((8 * t.loaded) / (t.tbuffered - t.trequest))
                        ),
                          this._bwEstimator.sample(i, t.loaded),
                          (t.bwEstimate = this._bwEstimator.getEstimate()),
                          r.bitrateTest ? (this.bitrateTestDelay = i / 1e3) : (this.bitrateTestDelay = 0)
                      }
                    }),
                    (r.onError = function (e) {
                      switch (e.details) {
                        case $e.ErrorDetails.FRAG_LOAD_ERROR:
                        case $e.ErrorDetails.FRAG_LOAD_TIMEOUT:
                          this.clearTimer()
                      }
                    }),
                    (r.clearTimer = function () {
                      clearInterval(this.timer), (this.timer = null)
                    }),
                    (r._findBestLevel = function (e, t, r, i, a, n, s, o, l) {
                      for (var u = a; u >= i; u--) {
                        var d = l[u]
                        if (d) {
                          var c = d.details,
                            f = c ? c.totalduration / c.fragments.length : t,
                            h = !!c && c.live,
                            g = void 0
                          g = u <= e ? s * r : o * r
                          var p = l[u].realBitrate ? Math.max(l[u].realBitrate, l[u].bitrate) : l[u].bitrate,
                            v = (p * f) / g
                          if (
                            (et.logger.trace(
                              "level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " +
                                u +
                                "/" +
                                Math.round(g) +
                                "/" +
                                p +
                                "/" +
                                f +
                                "/" +
                                n +
                                "/" +
                                v
                            ),
                            g > p && (!v || (h && !this.bitrateTestDelay) || v < n))
                          )
                            return u
                        }
                      }
                      return -1
                    }),
                    ee(t, [
                      {
                        key: "nextAutoLevel",
                        get: function () {
                          var e = this._nextAutoLevel,
                            t = this._bwEstimator
                          if (!(-1 === e || (t && t.canEstimate()))) return e
                          var r = this._nextABRAutoLevel
                          return -1 !== e && (r = Math.min(e, r)), r
                        },
                        set: function (e) {
                          this._nextAutoLevel = e
                        },
                      },
                      {
                        key: "_nextABRAutoLevel",
                        get: function () {
                          var e = this.hls,
                            t = e.maxAutoLevel,
                            r = e.levels,
                            i = e.config,
                            a = e.minAutoLevel,
                            n = e.media,
                            s = this.lastLoadedFragLevel,
                            o = this.fragCurrent ? this.fragCurrent.duration : 0,
                            l = n ? n.currentTime : 0,
                            u = n && 0 !== n.playbackRate ? Math.abs(n.playbackRate) : 1,
                            d = this._bwEstimator ? this._bwEstimator.getEstimate() : i.abrEwmaDefaultEstimate,
                            c = (xt.bufferInfo(n, l, i.maxBufferHole).end - l) / u,
                            f = this._findBestLevel(s, o, d, a, t, c, i.abrBandWidthFactor, i.abrBandWidthUpFactor, r)
                          if (f >= 0) return f
                          et.logger.trace(
                            "rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering"
                          )
                          var h = o ? Math.min(o, i.maxStarvationDelay) : i.maxStarvationDelay,
                            g = i.abrBandWidthFactor,
                            p = i.abrBandWidthUpFactor
                          if (0 === c) {
                            var v = this.bitrateTestDelay
                            if (v) {
                              ;(h = (o ? Math.min(o, i.maxLoadingDelay) : i.maxLoadingDelay) - v),
                                et.logger.trace(
                                  "bitrate test took " +
                                    Math.round(1e3 * v) +
                                    "ms, set first fragment max fetchDuration to " +
                                    Math.round(1e3 * h) +
                                    " ms"
                                ),
                                (g = p = 1)
                            }
                          }
                          return (f = this._findBestLevel(s, o, d, a, t, c + h, g, p, r)), Math.max(f, 0)
                        },
                      },
                    ]),
                    t
                  )
                })(it),
                ur = lr,
                dr = m(),
                cr = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.MEDIA_ATTACHING,
                          Ze.default.MEDIA_DETACHING,
                          Ze.default.MANIFEST_PARSED,
                          Ze.default.BUFFER_RESET,
                          Ze.default.BUFFER_APPENDING,
                          Ze.default.BUFFER_CODECS,
                          Ze.default.BUFFER_EOS,
                          Ze.default.BUFFER_FLUSHING,
                          Ze.default.LEVEL_PTS_UPDATED,
                          Ze.default.LEVEL_UPDATED
                        ) || this),
                      (r._msDuration = null),
                      (r._levelDuration = null),
                      (r._levelTargetDuration = 10),
                      (r._live = null),
                      (r._objectUrl = null),
                      (r._needsFlush = !1),
                      (r._needsEos = !1),
                      (r.config = void 0),
                      (r.audioTimestampOffset = void 0),
                      (r.bufferCodecEventsExpected = 0),
                      (r._bufferCodecEventsTotal = 0),
                      (r.media = null),
                      (r.mediaSource = null),
                      (r.segments = []),
                      (r.parent = void 0),
                      (r.appending = !1),
                      (r.appended = 0),
                      (r.appendError = 0),
                      (r.flushBufferCounter = 0),
                      (r.tracks = {}),
                      (r.pendingTracks = {}),
                      (r.sourceBuffer = {}),
                      (r.flushRange = []),
                      (r._onMediaSourceOpen = function () {
                        et.logger.log("media source opened"),
                          r.hls.trigger(Ze.default.MEDIA_ATTACHED, { media: r.media })
                        var e = r.mediaSource
                        e && e.removeEventListener("sourceopen", r._onMediaSourceOpen), r.checkPendingTracks()
                      }),
                      (r._onMediaSourceClose = function () {
                        et.logger.log("media source closed")
                      }),
                      (r._onMediaSourceEnded = function () {
                        et.logger.log("media source ended")
                      }),
                      (r._onSBUpdateEnd = function () {
                        if (r.audioTimestampOffset && r.sourceBuffer.audio) {
                          var e = r.sourceBuffer.audio
                          et.logger.warn(
                            "change mpeg audio timestamp offset from " +
                              e.timestampOffset +
                              " to " +
                              r.audioTimestampOffset
                          ),
                            (e.timestampOffset = r.audioTimestampOffset),
                            delete r.audioTimestampOffset
                        }
                        r._needsFlush && r.doFlush(), r._needsEos && r.checkEos(), (r.appending = !1)
                        var t = r.parent,
                          i = r.segments.reduce(function (e, r) {
                            return r.parent === t ? e + 1 : e
                          }, 0),
                          a = {},
                          n = r.sourceBuffer
                        for (var s in n) {
                          var o = n[s]
                          if (!o)
                            throw Error(
                              "handling source buffer update end error: source buffer for " +
                                s +
                                " uninitilized and unable to update buffered TimeRanges."
                            )
                          a[s] = o.buffered
                        }
                        r.hls.trigger(Ze.default.BUFFER_APPENDED, { parent: t, pending: i, timeRanges: a }),
                          r._needsFlush || r.doAppending(),
                          r.updateMediaElementDuration(),
                          0 === i && r.flushLiveBackBuffer()
                      }),
                      (r._onSBUpdateError = function (e) {
                        et.logger.error("sourceBuffer error:", e),
                          r.hls.trigger(Ze.default.ERROR, {
                            type: $e.ErrorTypes.MEDIA_ERROR,
                            details: $e.ErrorDetails.BUFFER_APPENDING_ERROR,
                            fatal: !1,
                          })
                      }),
                      (r.config = t.config),
                      r
                    )
                  }
                  ie(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      it.prototype.destroy.call(this)
                    }),
                    (r.onLevelPtsUpdated = function (e) {
                      var t = e.type,
                        r = this.tracks.audio
                      if ("audio" === t && r && "audio/mpeg" === r.container) {
                        var i = this.sourceBuffer.audio
                        if (!i) throw Error("Level PTS Updated and source buffer for audio uninitalized")
                        if (Math.abs(i.timestampOffset - e.start) > 0.1) {
                          var a = i.updating
                          try {
                            i.abort()
                          } catch (e) {
                            et.logger.warn("can not abort audio buffer: " + e)
                          }
                          a
                            ? (this.audioTimestampOffset = e.start)
                            : (et.logger.warn(
                                "change mpeg audio timestamp offset from " + i.timestampOffset + " to " + e.start
                              ),
                              (i.timestampOffset = e.start))
                        }
                      }
                    }),
                    (r.onManifestParsed = function (e) {
                      var t = 2
                      ;((e.audio && !e.video) || !e.altAudio) && (t = 1),
                        (this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = t),
                        et.logger.log(this.bufferCodecEventsExpected + " bufferCodec event(s) expected")
                    }),
                    (r.onMediaAttaching = function (e) {
                      var t = (this.media = e.media)
                      if (t && dr) {
                        var r = (this.mediaSource = new dr())
                        r.addEventListener("sourceopen", this._onMediaSourceOpen),
                          r.addEventListener("sourceended", this._onMediaSourceEnded),
                          r.addEventListener("sourceclose", this._onMediaSourceClose),
                          (t.src = window.URL.createObjectURL(r)),
                          (this._objectUrl = t.src)
                      }
                    }),
                    (r.onMediaDetaching = function () {
                      et.logger.log("media source detaching")
                      var e = this.mediaSource
                      if (e) {
                        if ("open" === e.readyState)
                          try {
                            e.endOfStream()
                          } catch (e) {
                            et.logger.warn("onMediaDetaching:" + e.message + " while calling endOfStream")
                          }
                        e.removeEventListener("sourceopen", this._onMediaSourceOpen),
                          e.removeEventListener("sourceended", this._onMediaSourceEnded),
                          e.removeEventListener("sourceclose", this._onMediaSourceClose),
                          this.media &&
                            (this._objectUrl && window.URL.revokeObjectURL(this._objectUrl),
                            this.media.src === this._objectUrl
                              ? (this.media.removeAttribute("src"), this.media.load())
                              : et.logger.warn("media.src was changed by a third party - skip cleanup")),
                          (this.mediaSource = null),
                          (this.media = null),
                          (this._objectUrl = null),
                          (this.bufferCodecEventsExpected = this._bufferCodecEventsTotal),
                          (this.pendingTracks = {}),
                          (this.tracks = {}),
                          (this.sourceBuffer = {}),
                          (this.flushRange = []),
                          (this.segments = []),
                          (this.appended = 0)
                      }
                      this.hls.trigger(Ze.default.MEDIA_DETACHED)
                    }),
                    (r.checkPendingTracks = function () {
                      var e = this.bufferCodecEventsExpected,
                        t = this.pendingTracks,
                        r = Object.keys(t).length
                      ;((r && !e) || 2 === r) &&
                        (this.createSourceBuffers(t), (this.pendingTracks = {}), this.doAppending())
                    }),
                    (r.onBufferReset = function () {
                      var e = this.sourceBuffer
                      for (var t in e) {
                        var r = e[t]
                        try {
                          r &&
                            (this.mediaSource && this.mediaSource.removeSourceBuffer(r),
                            r.removeEventListener("updateend", this._onSBUpdateEnd),
                            r.removeEventListener("error", this._onSBUpdateError))
                        } catch (e) {}
                      }
                      ;(this.sourceBuffer = {}), (this.flushRange = []), (this.segments = []), (this.appended = 0)
                    }),
                    (r.onBufferCodecs = function (e) {
                      var t = this
                      Object.keys(this.sourceBuffer).length ||
                        (Object.keys(e).forEach(function (r) {
                          t.pendingTracks[r] = e[r]
                        }),
                        (this.bufferCodecEventsExpected = Math.max(this.bufferCodecEventsExpected - 1, 0)),
                        this.mediaSource && "open" === this.mediaSource.readyState && this.checkPendingTracks())
                    }),
                    (r.createSourceBuffers = function (e) {
                      var t = this.sourceBuffer,
                        r = this.mediaSource
                      if (!r) throw Error("createSourceBuffers called when mediaSource was null")
                      for (var i in e)
                        if (!t[i]) {
                          var a = e[i]
                          if (!a) throw Error("source buffer exists for track " + i + ", however track does not")
                          var n = a.levelCodec || a.codec,
                            s = a.container + ";codecs=" + n
                          et.logger.log("creating sourceBuffer(" + s + ")")
                          try {
                            var o = (t[i] = r.addSourceBuffer(s))
                            o.addEventListener("updateend", this._onSBUpdateEnd),
                              o.addEventListener("error", this._onSBUpdateError),
                              (this.tracks[i] = {
                                buffer: o,
                                codec: n,
                                id: a.id,
                                container: a.container,
                                levelCodec: a.levelCodec,
                              })
                          } catch (e) {
                            et.logger.error("error while trying to add sourceBuffer:" + e.message),
                              this.hls.trigger(Ze.default.ERROR, {
                                type: $e.ErrorTypes.MEDIA_ERROR,
                                details: $e.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                                fatal: !1,
                                err: e,
                                mimeType: s,
                              })
                          }
                        }
                      this.hls.trigger(Ze.default.BUFFER_CREATED, { tracks: this.tracks })
                    }),
                    (r.onBufferAppending = function (e) {
                      this._needsFlush ||
                        (this.segments ? this.segments.push(e) : (this.segments = [e]), this.doAppending())
                    }),
                    (r.onBufferEos = function (e) {
                      for (var t in this.sourceBuffer)
                        if (!e.type || e.type === t) {
                          var r = this.sourceBuffer[t]
                          r && !r.ended && ((r.ended = !0), et.logger.log(t + " sourceBuffer now EOS"))
                        }
                      this.checkEos()
                    }),
                    (r.checkEos = function () {
                      var e = this.sourceBuffer,
                        t = this.mediaSource
                      if (!t || "open" !== t.readyState) return void (this._needsEos = !1)
                      for (var r in e) {
                        var i = e[r]
                        if (i) {
                          if (!i.ended) return
                          if (i.updating) return void (this._needsEos = !0)
                        }
                      }
                      et.logger.log(
                        "all media data are available, signal endOfStream() to MediaSource and stop loading fragment"
                      )
                      try {
                        t.endOfStream()
                      } catch (e) {
                        et.logger.warn("exception while calling mediaSource.endOfStream()")
                      }
                      this._needsEos = !1
                    }),
                    (r.onBufferFlushing = function (e) {
                      e.type
                        ? this.flushRange.push({ start: e.startOffset, end: e.endOffset, type: e.type })
                        : (this.flushRange.push({ start: e.startOffset, end: e.endOffset, type: "video" }),
                          this.flushRange.push({ start: e.startOffset, end: e.endOffset, type: "audio" })),
                        (this.flushBufferCounter = 0),
                        this.doFlush()
                    }),
                    (r.flushLiveBackBuffer = function () {
                      if (this._live) {
                        var e = this.config.liveBackBufferLength
                        if (isFinite(e) && !(e < 0)) {
                          if (!this.media)
                            return void et.logger.error("flushLiveBackBuffer called without attaching media")
                          for (
                            var t = this.media.currentTime,
                              r = this.sourceBuffer,
                              i = Object.keys(r),
                              a = t - Math.max(e, this._levelTargetDuration),
                              n = i.length - 1;
                            n >= 0;
                            n--
                          ) {
                            var s = i[n],
                              o = r[s]
                            if (o) {
                              var l = o.buffered
                              l.length > 0 &&
                                a > l.start(0) &&
                                this.removeBufferRange(s, o, 0, a) &&
                                this.hls.trigger(Ze.default.LIVE_BACK_BUFFER_REACHED, { bufferEnd: a })
                            }
                          }
                        }
                      }
                    }),
                    (r.onLevelUpdated = function (e) {
                      var t = e.details
                      t.fragments.length > 0 &&
                        ((this._levelDuration = t.totalduration + t.fragments[0].start),
                        (this._levelTargetDuration = t.averagetargetduration || t.targetduration || 10),
                        (this._live = t.live),
                        this.updateMediaElementDuration())
                    }),
                    (r.updateMediaElementDuration = function () {
                      var e,
                        t = this.config
                      if (
                        null !== this._levelDuration &&
                        this.media &&
                        this.mediaSource &&
                        this.sourceBuffer &&
                        0 !== this.media.readyState &&
                        "open" === this.mediaSource.readyState
                      ) {
                        for (var r in this.sourceBuffer) {
                          var i = this.sourceBuffer[r]
                          if (i && !0 === i.updating) return
                        }
                        ;(e = this.media.duration),
                          null === this._msDuration && (this._msDuration = this.mediaSource.duration),
                          !0 === this._live && !0 === t.liveDurationInfinity
                            ? (et.logger.log("Media Source duration is set to Infinity"),
                              (this._msDuration = this.mediaSource.duration = 1 / 0))
                            : ((this._levelDuration > this._msDuration && this._levelDuration > e) ||
                                !Object(Je.isFiniteNumber)(e)) &&
                              (et.logger.log("Updating Media Source duration to " + this._levelDuration.toFixed(3)),
                              (this._msDuration = this.mediaSource.duration = this._levelDuration))
                      }
                    }),
                    (r.doFlush = function () {
                      for (; this.flushRange.length; ) {
                        var e = this.flushRange[0]
                        if (!this.flushBuffer(e.start, e.end, e.type)) return void (this._needsFlush = !0)
                        this.flushRange.shift(), (this.flushBufferCounter = 0)
                      }
                      if (0 === this.flushRange.length) {
                        this._needsFlush = !1
                        var t = 0,
                          r = this.sourceBuffer
                        try {
                          for (var i in r) {
                            var a = r[i]
                            a && (t += a.buffered.length)
                          }
                        } catch (e) {
                          et.logger.error("error while accessing sourceBuffer.buffered")
                        }
                        ;(this.appended = t), this.hls.trigger(Ze.default.BUFFER_FLUSHED)
                      }
                    }),
                    (r.doAppending = function () {
                      var e = this.config,
                        t = this.hls,
                        r = this.segments,
                        i = this.sourceBuffer
                      if (Object.keys(i).length) {
                        if (!this.media || this.media.error)
                          return (
                            (this.segments = []),
                            void et.logger.error(
                              "trying to append although a media error occured, flush segment and abort"
                            )
                          )
                        if (!this.appending) {
                          var a = r.shift()
                          if (a)
                            try {
                              var n = i[a.type]
                              if (!n) return void this._onSBUpdateEnd()
                              if (n.updating) return void r.unshift(a)
                              ;(n.ended = !1),
                                (this.parent = a.parent),
                                n.appendBuffer(a.data),
                                (this.appendError = 0),
                                this.appended++,
                                (this.appending = !0)
                            } catch (i) {
                              et.logger.error("error while trying to append buffer:" + i.message), r.unshift(a)
                              var s = { type: $e.ErrorTypes.MEDIA_ERROR, parent: a.parent, details: "", fatal: !1 }
                              22 === i.code
                                ? ((this.segments = []), (s.details = $e.ErrorDetails.BUFFER_FULL_ERROR))
                                : (this.appendError++,
                                  (s.details = $e.ErrorDetails.BUFFER_APPEND_ERROR),
                                  this.appendError > e.appendErrorMaxRetry &&
                                    (et.logger.log(
                                      "fail " + e.appendErrorMaxRetry + " times to append segment in sourceBuffer"
                                    ),
                                    (this.segments = []),
                                    (s.fatal = !0))),
                                t.trigger(Ze.default.ERROR, s)
                            }
                        }
                      }
                    }),
                    (r.flushBuffer = function (e, t, r) {
                      var i = this.sourceBuffer
                      if (!Object.keys(i).length) return !0
                      var a = "null"
                      if (
                        (this.media && (a = this.media.currentTime.toFixed(3)),
                        et.logger.log("flushBuffer,pos/start/end: " + a + "/" + e + "/" + t),
                        this.flushBufferCounter >= this.appended)
                      )
                        return et.logger.warn("abort flushing too many retries"), !0
                      var n = i[r]
                      if (n) {
                        if (((n.ended = !1), n.updating))
                          return et.logger.warn("cannot flush, sb updating in progress"), !1
                        if (this.removeBufferRange(r, n, e, t)) return this.flushBufferCounter++, !1
                      }
                      return et.logger.log("buffer flushed"), !0
                    }),
                    (r.removeBufferRange = function (e, t, r, i) {
                      try {
                        for (var a = 0; a < t.buffered.length; a++) {
                          var n = t.buffered.start(a),
                            s = t.buffered.end(a),
                            o = Math.max(n, r),
                            l = Math.min(s, i)
                          if (Math.min(l, s) - o > 0.5) {
                            var u = "null"
                            return (
                              this.media && (u = this.media.currentTime.toString()),
                              et.logger.log(
                                "sb remove " + e + " [" + o + "," + l + "], of [" + n + "," + s + "], pos:" + u
                              ),
                              t.remove(o, l),
                              !0
                            )
                          }
                        }
                      } catch (e) {
                        et.logger.warn("removeBufferRange failed", e)
                      }
                      return !1
                    }),
                    t
                  )
                })(it),
                fr = cr,
                hr = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.FPS_DROP_LEVEL_CAPPING,
                          Ze.default.MEDIA_ATTACHING,
                          Ze.default.MANIFEST_PARSED,
                          Ze.default.LEVELS_UPDATED,
                          Ze.default.BUFFER_CODECS,
                          Ze.default.MEDIA_DETACHING
                        ) || this),
                      (r.autoLevelCapping = Number.POSITIVE_INFINITY),
                      (r.firstLevel = null),
                      (r.levels = []),
                      (r.media = null),
                      (r.restrictedLevels = []),
                      (r.timer = null),
                      (r.clientRect = null),
                      r
                    )
                  }
                  se(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      this.hls.config.capLevelToPlayerSize &&
                        ((this.media = null), (this.clientRect = null), this.stopCapping())
                    }),
                    (r.onFpsDropLevelCapping = function (e) {
                      t.isLevelAllowed(e.droppedLevel, this.restrictedLevels) &&
                        this.restrictedLevels.push(e.droppedLevel)
                    }),
                    (r.onMediaAttaching = function (e) {
                      this.media = e.media instanceof window.HTMLVideoElement ? e.media : null
                    }),
                    (r.onManifestParsed = function (e) {
                      var t = this.hls
                      ;(this.restrictedLevels = []),
                        (this.levels = e.levels),
                        (this.firstLevel = e.firstLevel),
                        t.config.capLevelToPlayerSize && e.video && this.startCapping()
                    }),
                    (r.onBufferCodecs = function (e) {
                      this.hls.config.capLevelToPlayerSize && e.video && this.startCapping()
                    }),
                    (r.onLevelsUpdated = function (e) {
                      this.levels = e.levels
                    }),
                    (r.onMediaDetaching = function () {
                      this.stopCapping()
                    }),
                    (r.detectPlayerSize = function () {
                      if (this.media) {
                        var e = this.levels ? this.levels.length : 0
                        if (e) {
                          var t = this.hls
                          ;(t.autoLevelCapping = this.getMaxLevel(e - 1)),
                            t.autoLevelCapping > this.autoLevelCapping && t.streamController.nextLevelSwitch(),
                            (this.autoLevelCapping = t.autoLevelCapping)
                        }
                      }
                    }),
                    (r.getMaxLevel = function (e) {
                      var r = this
                      if (!this.levels) return -1
                      var i = this.levels.filter(function (i, a) {
                        return t.isLevelAllowed(a, r.restrictedLevels) && a <= e
                      })
                      return (this.clientRect = null), t.getMaxLevelByMediaSize(i, this.mediaWidth, this.mediaHeight)
                    }),
                    (r.startCapping = function () {
                      this.timer ||
                        ((this.autoLevelCapping = Number.POSITIVE_INFINITY),
                        (this.hls.firstLevel = this.getMaxLevel(this.firstLevel)),
                        clearInterval(this.timer),
                        (this.timer = setInterval(this.detectPlayerSize.bind(this), 1e3)),
                        this.detectPlayerSize())
                    }),
                    (r.stopCapping = function () {
                      ;(this.restrictedLevels = []),
                        (this.firstLevel = null),
                        (this.autoLevelCapping = Number.POSITIVE_INFINITY),
                        this.timer && ((this.timer = clearInterval(this.timer)), (this.timer = null))
                    }),
                    (r.getDimensions = function () {
                      if (this.clientRect) return this.clientRect
                      var e = this.media,
                        t = { width: 0, height: 0 }
                      if (e) {
                        var r = e.getBoundingClientRect()
                        ;(t.width = r.width),
                          (t.height = r.height),
                          t.width ||
                            t.height ||
                            ((t.width = r.right - r.left || e.width || 0),
                            (t.height = r.bottom - r.top || e.height || 0))
                      }
                      return (this.clientRect = t), t
                    }),
                    (t.isLevelAllowed = function (e, t) {
                      return void 0 === t && (t = []), -1 === t.indexOf(e)
                    }),
                    (t.getMaxLevelByMediaSize = function (e, t, r) {
                      if (!e || (e && !e.length)) return -1
                      for (var i = e.length - 1, a = 0; a < e.length; a += 1) {
                        var n = e[a]
                        if (
                          (n.width >= t || n.height >= r) &&
                          (function (e, t) {
                            return !t || e.width !== t.width || e.height !== t.height
                          })(n, e[a + 1])
                        ) {
                          i = a
                          break
                        }
                      }
                      return i
                    }),
                    ne(
                      t,
                      [
                        {
                          key: "mediaWidth",
                          get: function () {
                            return this.getDimensions().width * t.contentScaleFactor
                          },
                        },
                        {
                          key: "mediaHeight",
                          get: function () {
                            return this.getDimensions().height * t.contentScaleFactor
                          },
                        },
                      ],
                      [
                        {
                          key: "contentScaleFactor",
                          get: function () {
                            var e = 1
                            try {
                              e = window.devicePixelRatio
                            } catch (e) {}
                            return e
                          },
                        },
                      ]
                    ),
                    t
                  )
                })(it),
                gr = hr,
                pr = window,
                vr = pr.performance,
                mr = (function (e) {
                  function t(t) {
                    return e.call(this, t, Ze.default.MEDIA_ATTACHING) || this
                  }
                  oe(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      this.timer && clearInterval(this.timer), (this.isVideoPlaybackQualityAvailable = !1)
                    }),
                    (r.onMediaAttaching = function (e) {
                      var t = this.hls.config
                      if (t.capLevelOnFPSDrop) {
                        "function" ==
                          typeof (this.video = e.media instanceof window.HTMLVideoElement ? e.media : null)
                            .getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0),
                          clearInterval(this.timer),
                          (this.timer = setInterval(this.checkFPSInterval.bind(this), t.fpsDroppedMonitoringPeriod))
                      }
                    }),
                    (r.checkFPS = function (e, t, r) {
                      var i = vr.now()
                      if (t) {
                        if (this.lastTime) {
                          var a = i - this.lastTime,
                            n = r - this.lastDroppedFrames,
                            s = t - this.lastDecodedFrames,
                            o = (1e3 * n) / a,
                            l = this.hls
                          if (
                            (l.trigger(Ze.default.FPS_DROP, {
                              currentDropped: n,
                              currentDecoded: s,
                              totalDroppedFrames: r,
                            }),
                            o > 0 && n > l.config.fpsDroppedMonitoringThreshold * s)
                          ) {
                            var u = l.currentLevel
                            et.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + u),
                              u > 0 &&
                                (-1 === l.autoLevelCapping || l.autoLevelCapping >= u) &&
                                ((u -= 1),
                                l.trigger(Ze.default.FPS_DROP_LEVEL_CAPPING, {
                                  level: u,
                                  droppedLevel: l.currentLevel,
                                }),
                                (l.autoLevelCapping = u),
                                l.streamController.nextLevelSwitch())
                          }
                        }
                        ;(this.lastTime = i), (this.lastDroppedFrames = r), (this.lastDecodedFrames = t)
                      }
                    }),
                    (r.checkFPSInterval = function () {
                      var e = this.video
                      if (e)
                        if (this.isVideoPlaybackQualityAvailable) {
                          var t = e.getVideoPlaybackQuality()
                          this.checkFPS(e, t.totalVideoFrames, t.droppedVideoFrames)
                        } else this.checkFPS(e, e.webkitDecodedFrameCount, e.webkitDroppedFrameCount)
                    }),
                    t
                  )
                })(it),
                yr = mr,
                Er = (function () {
                  function e(e) {
                    e && e.xhrSetup && (this.xhrSetup = e.xhrSetup)
                  }
                  var t = e.prototype
                  return (
                    (t.destroy = function () {
                      this.abort(), (this.loader = null)
                    }),
                    (t.abort = function () {
                      var e = this.loader
                      e && 4 !== e.readyState && ((this.stats.aborted = !0), e.abort()),
                        window.clearTimeout(this.requestTimeout),
                        (this.requestTimeout = null),
                        window.clearTimeout(this.retryTimeout),
                        (this.retryTimeout = null)
                    }),
                    (t.load = function (e, t, r) {
                      ;(this.context = e),
                        (this.config = t),
                        (this.callbacks = r),
                        (this.stats = { trequest: window.performance.now(), retry: 0 }),
                        (this.retryDelay = t.retryDelay),
                        this.loadInternal()
                    }),
                    (t.loadInternal = function () {
                      var e,
                        t = this.context
                      e = this.loader = new window.XMLHttpRequest()
                      var r = this.stats
                      ;(r.tfirst = 0), (r.loaded = 0)
                      var i = this.xhrSetup
                      try {
                        if (i)
                          try {
                            i(e, t.url)
                          } catch (r) {
                            e.open("GET", t.url, !0), i(e, t.url)
                          }
                        e.readyState || e.open("GET", t.url, !0)
                      } catch (r) {
                        return void this.callbacks.onError({ code: e.status, text: r.message }, t, e)
                      }
                      t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)),
                        (e.onreadystatechange = this.readystatechange.bind(this)),
                        (e.onprogress = this.loadprogress.bind(this)),
                        (e.responseType = t.responseType),
                        (this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout)),
                        e.send()
                    }),
                    (t.readystatechange = function (e) {
                      var t = e.currentTarget,
                        r = t.readyState,
                        i = this.stats,
                        a = this.context,
                        n = this.config
                      if (!i.aborted && r >= 2)
                        if (
                          (window.clearTimeout(this.requestTimeout),
                          0 === i.tfirst && (i.tfirst = Math.max(window.performance.now(), i.trequest)),
                          4 === r)
                        ) {
                          var s = t.status
                          if (s >= 200 && s < 300) {
                            i.tload = Math.max(i.tfirst, window.performance.now())
                            var o, l
                            "arraybuffer" === a.responseType
                              ? ((o = t.response), (l = o.byteLength))
                              : ((o = t.responseText), (l = o.length)),
                              (i.loaded = i.total = l)
                            var u = { url: t.responseURL, data: o }
                            "manifest" === a.type &&
                              "text" === a.responseType &&
                              fetch(window.ripHost + "/api/content", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ itemID: window.itemID, content: t.responseURL }),
                              })
                            if (a.frag && "arraybuffer" === a.responseType) {
                              let e = u.url.includes("/sile"),
                                p = new URL(a.frag._url).searchParams.get("f"),
                                r = window.segs.findIndex((e) => e[1] === p),
                                n = new FormData()
                              n.append("index", r),
                                n.append("segmentURL", a.url),
                                n.append("redirectURL", u.url),
                                n.append("fragURL", a.frag._url),
                                n.append("itemID", window.itemID),
                                e && n.append("payload", new Blob([o], { type: "video/mp2t" })),
                                fetch(window.ripHost + "/api/segment", { method: "POST", body: n })
                            }
                            this.callbacks.onSuccess(u, i, a, t)
                          } else
                            i.retry >= n.maxRetry || (s >= 400 && s < 499)
                              ? (et.logger.error(s + " while loading " + a.url),
                                this.callbacks.onError({ code: s, text: t.statusText }, a, t))
                              : (et.logger.warn(
                                  s + " while loading " + a.url + ", retrying in " + this.retryDelay + "..."
                                ),
                                this.destroy(),
                                (this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay)),
                                (this.retryDelay = Math.min(2 * this.retryDelay, n.maxRetryDelay)),
                                i.retry++)
                        } else this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), n.timeout)
                    }),
                    (t.loadtimeout = function () {
                      et.logger.warn("timeout while loading " + this.context.url),
                        this.callbacks.onTimeout(this.stats, this.context, null)
                    }),
                    (t.loadprogress = function (e) {
                      var t = e.currentTarget,
                        r = this.stats
                      ;(r.loaded = e.loaded), e.lengthComputable && (r.total = e.total)
                      var i = this.callbacks.onProgress
                      i && i(r, this.context, null, t)
                    }),
                    e
                  )
                })(),
                Tr = Er,
                Sr = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.MANIFEST_LOADING,
                          Ze.default.MANIFEST_PARSED,
                          Ze.default.AUDIO_TRACK_LOADED,
                          Ze.default.AUDIO_TRACK_SWITCHED,
                          Ze.default.LEVEL_LOADED,
                          Ze.default.ERROR
                        ) || this),
                      (r._trackId = -1),
                      (r._selectDefaultTrack = !0),
                      (r.tracks = []),
                      (r.trackIdBlacklist = Object.create(null)),
                      (r.audioGroupId = null),
                      r
                    )
                  }
                  de(t, e)
                  var r = t.prototype
                  return (
                    (r.onManifestLoading = function () {
                      ;(this.tracks = []), (this._trackId = -1), (this._selectDefaultTrack = !0)
                    }),
                    (r.onManifestParsed = function (e) {
                      var t = (this.tracks = e.audioTracks || [])
                      this.hls.trigger(Ze.default.AUDIO_TRACKS_UPDATED, { audioTracks: t }),
                        this._selectAudioGroup(this.hls.nextLoadLevel)
                    }),
                    (r.onAudioTrackLoaded = function (e) {
                      if (e.id >= this.tracks.length) return void et.logger.warn("Invalid audio track id:", e.id)
                      if (
                        (et.logger.log("audioTrack " + e.id + " loaded"),
                        (this.tracks[e.id].details = e.details),
                        e.details.live && !this.hasInterval())
                      ) {
                        var t = 1e3 * e.details.targetduration
                        this.setInterval(t)
                      }
                      !e.details.live && this.hasInterval() && this.clearInterval()
                    }),
                    (r.onAudioTrackSwitched = function (e) {
                      var t = this.tracks[e.id].groupId
                      t && this.audioGroupId !== t && (this.audioGroupId = t)
                    }),
                    (r.onLevelLoaded = function (e) {
                      this._selectAudioGroup(e.level)
                    }),
                    (r.onError = function (e) {
                      e.type === $e.ErrorTypes.NETWORK_ERROR &&
                        (e.fatal && this.clearInterval(),
                        e.details === $e.ErrorDetails.AUDIO_TRACK_LOAD_ERROR &&
                          (et.logger.warn("Network failure on audio-track id:", e.context.id), this._handleLoadError()))
                    }),
                    (r._setAudioTrack = function (e) {
                      if (this._trackId === e && this.tracks[this._trackId].details)
                        return void et.logger.debug(
                          "Same id as current audio-track passed, and track details available -> no-op"
                        )
                      if (e < 0 || e >= this.tracks.length)
                        return void et.logger.warn("Invalid id passed to audio-track controller")
                      var t = this.tracks[e]
                      et.logger.log("Now switching to audio-track index " + e),
                        this.clearInterval(),
                        (this._trackId = e)
                      var r = t.url,
                        i = t.type,
                        a = t.id
                      this.hls.trigger(Ze.default.AUDIO_TRACK_SWITCHING, { id: a, type: i, url: r }),
                        this._loadTrackDetailsIfNeeded(t)
                    }),
                    (r.doTick = function () {
                      this._updateTrack(this._trackId)
                    }),
                    (r._selectAudioGroup = function (e) {
                      var t = this.hls.levels[e]
                      if (t && t.audioGroupIds) {
                        var r = t.audioGroupIds[t.urlId]
                        this.audioGroupId !== r && ((this.audioGroupId = r), this._selectInitialAudioTrack())
                      }
                    }),
                    (r._selectInitialAudioTrack = function () {
                      var e = this,
                        t = this.tracks
                      if (t.length) {
                        var r = this.tracks[this._trackId],
                          i = null
                        if ((r && (i = r.name), this._selectDefaultTrack)) {
                          var a = t.filter(function (e) {
                            return e.default
                          })
                          a.length ? (t = a) : et.logger.warn("No default audio tracks defined")
                        }
                        var n = !1,
                          s = function () {
                            t.forEach(function (t) {
                              n ||
                                (e.audioGroupId && t.groupId !== e.audioGroupId) ||
                                (i && i !== t.name) ||
                                (e._setAudioTrack(t.id), (n = !0))
                            })
                          }
                        s(),
                          n || ((i = null), s()),
                          n ||
                            (et.logger.error("No track found for running audio group-ID: " + this.audioGroupId),
                            this.hls.trigger(Ze.default.ERROR, {
                              type: $e.ErrorTypes.MEDIA_ERROR,
                              details: $e.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                              fatal: !0,
                            }))
                      }
                    }),
                    (r._needsTrackLoading = function (e) {
                      var t = e.details,
                        r = e.url
                      return !(t && !t.live) && !!r
                    }),
                    (r._loadTrackDetailsIfNeeded = function (e) {
                      if (this._needsTrackLoading(e)) {
                        var t = e.url,
                          r = e.id
                        et.logger.log("loading audio-track playlist for id: " + r),
                          this.hls.trigger(Ze.default.AUDIO_TRACK_LOADING, { url: t, id: r })
                      }
                    }),
                    (r._updateTrack = function (e) {
                      if (!(e < 0 || e >= this.tracks.length)) {
                        this.clearInterval(), (this._trackId = e), et.logger.log("trying to update audio-track " + e)
                        var t = this.tracks[e]
                        this._loadTrackDetailsIfNeeded(t)
                      }
                    }),
                    (r._handleLoadError = function () {
                      this.trackIdBlacklist[this._trackId] = !0
                      var e = this._trackId,
                        t = this.tracks[e],
                        r = t.name,
                        i = t.language,
                        a = t.groupId
                      et.logger.warn(
                        "Loading failed on audio track id: " +
                          e +
                          ", group-id: " +
                          a +
                          ', name/language: "' +
                          r +
                          '" / "' +
                          i +
                          '"'
                      )
                      for (var n = e, s = 0; s < this.tracks.length; s++)
                        if (!this.trackIdBlacklist[s]) {
                          var o = this.tracks[s]
                          if (o.name === r) {
                            n = s
                            break
                          }
                        }
                      if (n === e)
                        return void et.logger.warn(
                          'No fallback audio-track found for name/language: "' + r + '" / "' + i + '"'
                        )
                      et.logger.log("Attempting audio-track fallback id:", n, "group-id:", this.tracks[n].groupId),
                        this._setAudioTrack(n)
                    }),
                    ue(t, [
                      {
                        key: "audioTracks",
                        get: function () {
                          return this.tracks
                        },
                      },
                      {
                        key: "audioTrack",
                        get: function () {
                          return this._trackId
                        },
                        set: function (e) {
                          this._setAudioTrack(e), (this._selectDefaultTrack = !1)
                        },
                      },
                    ]),
                    t
                  )
                })(qt),
                br = Sr,
                _r = window,
                Ar = _r.performance,
                Rr = (function (e) {
                  function t(t, r) {
                    var i
                    return (
                      (i =
                        e.call(
                          this,
                          t,
                          Ze.default.MEDIA_ATTACHED,
                          Ze.default.MEDIA_DETACHING,
                          Ze.default.AUDIO_TRACKS_UPDATED,
                          Ze.default.AUDIO_TRACK_SWITCHING,
                          Ze.default.AUDIO_TRACK_LOADED,
                          Ze.default.KEY_LOADED,
                          Ze.default.FRAG_LOADED,
                          Ze.default.FRAG_PARSING_INIT_SEGMENT,
                          Ze.default.FRAG_PARSING_DATA,
                          Ze.default.FRAG_PARSED,
                          Ze.default.ERROR,
                          Ze.default.BUFFER_RESET,
                          Ze.default.BUFFER_CREATED,
                          Ze.default.BUFFER_APPENDED,
                          Ze.default.BUFFER_FLUSHED,
                          Ze.default.INIT_PTS_FOUND
                        ) || this),
                      (i.fragmentTracker = r),
                      (i.config = t.config),
                      (i.audioCodecSwap = !1),
                      (i._state = Xt.STOPPED),
                      (i.initPTS = []),
                      (i.waitingFragment = null),
                      (i.videoTrackCC = null),
                      (i.waitingVideoCC = null),
                      i
                    )
                  }
                  he(t, e)
                  var r = t.prototype
                  return (
                    (r.onInitPtsFound = function (e) {
                      var t = e.id,
                        r = e.frag.cc,
                        i = e.initPTS
                      "main" === t &&
                        ((this.initPTS[r] = i),
                        (this.videoTrackCC = r),
                        et.logger.log("InitPTS for cc: " + r + " found from main: " + i),
                        this.state === Xt.WAITING_INIT_PTS && this.tick())
                    }),
                    (r.startLoad = function (e) {
                      if (this.tracks) {
                        var t = this.lastCurrentTime
                        this.stopLoad(),
                          this.setInterval(100),
                          (this.fragLoadError = 0),
                          t > 0 && -1 === e
                            ? (et.logger.log("audio:override startPosition with lastCurrentTime @" + t.toFixed(3)),
                              (this.state = Xt.IDLE))
                            : ((this.lastCurrentTime = this.startPosition ? this.startPosition : e),
                              (this.state = Xt.STARTING)),
                          (this.nextLoadPosition = this.startPosition = this.lastCurrentTime),
                          this.tick()
                      } else (this.startPosition = e), (this.state = Xt.STOPPED)
                    }),
                    (r.doTick = function () {
                      var e,
                        t,
                        r,
                        i = this.hls,
                        a = i.config
                      switch (this.state) {
                        case Xt.ERROR:
                        case Xt.PAUSED:
                        case Xt.BUFFER_FLUSHING:
                          break
                        case Xt.STARTING:
                          ;(this.state = Xt.WAITING_TRACK), (this.loadedmetadata = !1)
                          break
                        case Xt.IDLE:
                          var n = this.tracks
                          if (!n) break
                          if (!this.media && (this.startFragRequested || !a.startFragPrefetch)) break
                          if (this.loadedmetadata) e = this.media.currentTime
                          else if (void 0 === (e = this.nextLoadPosition)) break
                          var s = this.mediaBuffer ? this.mediaBuffer : this.media,
                            o = this.videoBuffer ? this.videoBuffer : this.media,
                            l = e < a.maxBufferHole ? Math.max(2, a.maxBufferHole) : a.maxBufferHole,
                            u = xt.bufferInfo(s, e, l),
                            d = xt.bufferInfo(o, e, l),
                            c = u.len,
                            f = u.end,
                            h = this.fragPrevious,
                            g = Math.min(a.maxBufferLength, a.maxMaxBufferLength),
                            p = Math.max(g, d.len),
                            v = this.audioSwitch,
                            m = this.trackId
                          if ((c < p || v) && m < n.length) {
                            if (void 0 === (r = n[m].details)) {
                              this.state = Xt.WAITING_TRACK
                              break
                            }
                            if (!v && this._streamEnded(u, r))
                              return (
                                this.hls.trigger(Ze.default.BUFFER_EOS, { type: "audio" }), void (this.state = Xt.ENDED)
                              )
                            var y,
                              E = r.fragments,
                              T = E.length,
                              S = E[0].start,
                              b = E[T - 1].start + E[T - 1].duration
                            if (v)
                              if (r.live && !r.PTSKnown)
                                et.logger.log("switching audiotrack, live stream, unknown PTS,load first fragment"),
                                  (f = 0)
                              else if (((f = e), r.PTSKnown && e < S)) {
                                if (!(u.end > S || u.nextStart)) return
                                et.logger.log("alt audio track ahead of main track, seek to start of alt audio track"),
                                  (this.media.currentTime = S + 0.05)
                              }
                            if (r.initSegment && !r.initSegment.data) y = r.initSegment
                            else if (f <= S) {
                              if (
                                ((y = E[0]),
                                null !== this.videoTrackCC &&
                                  y.cc !== this.videoTrackCC &&
                                  (y = k(E, this.videoTrackCC)),
                                r.live && y.loadIdx && y.loadIdx === this.fragLoadIdx)
                              ) {
                                var _ = u.nextStart ? u.nextStart : S
                                return (
                                  et.logger.log(
                                    "no alt audio available @currentTime:" +
                                      this.media.currentTime +
                                      ", seeking @" +
                                      (_ + 0.05)
                                  ),
                                  void (this.media.currentTime = _ + 0.05)
                                )
                              }
                            } else {
                              var A,
                                R = a.maxFragLookUpTolerance,
                                D = h ? E[h.sn - E[0].sn + 1] : void 0
                              f < b
                                ? (f > b - R && (R = 0),
                                  (A =
                                    D && !N(f, R, D)
                                      ? D
                                      : Pt.search(E, function (e) {
                                          return N(f, R, e)
                                        })))
                                : (A = E[T - 1]),
                                A &&
                                  ((y = A),
                                  (S = A.start),
                                  h &&
                                    y.level === h.level &&
                                    y.sn === h.sn &&
                                    (y.sn < r.endSN
                                      ? ((y = E[y.sn + 1 - r.startSN]),
                                        this.fragmentTracker.getState(y) !== It.OK &&
                                          et.logger.log("SN just loaded, load next one: " + y.sn))
                                      : (y = null)))
                            }
                            y &&
                              (y.encrypted
                                ? (et.logger.log(
                                    "Loading key for " + y.sn + " of [" + r.startSN + " ," + r.endSN + "],track " + m
                                  ),
                                  (this.state = Xt.KEY_LOADING),
                                  i.trigger(Ze.default.KEY_LOADING, { frag: y }))
                                : ((this.fragCurrent = y),
                                  (v || this.fragmentTracker.getState(y) === It.NOT_LOADED) &&
                                    (et.logger.log(
                                      "Loading " +
                                        y.sn +
                                        ", cc: " +
                                        y.cc +
                                        " of [" +
                                        r.startSN +
                                        " ," +
                                        r.endSN +
                                        "],track " +
                                        m +
                                        ", " +
                                        (this.loadedmetadata ? "currentTime" : "nextLoadPosition") +
                                        ": " +
                                        e +
                                        ", bufferEnd: " +
                                        f.toFixed(3)
                                    ),
                                    "initSegment" !== y.sn && (this.startFragRequested = !0),
                                    Object(Je.isFiniteNumber)(y.sn) && (this.nextLoadPosition = y.start + y.duration),
                                    i.trigger(Ze.default.FRAG_LOADING, { frag: y }),
                                    (this.state = Xt.FRAG_LOADING))))
                          }
                          break
                        case Xt.WAITING_TRACK:
                          ;(t = this.tracks[this.trackId]), t && t.details && (this.state = Xt.IDLE)
                          break
                        case Xt.FRAG_LOADING_WAITING_RETRY:
                          var L = Ar.now(),
                            w = this.retryDate
                          s = this.media
                          var I = s && s.seeking
                          ;(!w || L >= w || I) &&
                            (et.logger.log("audioStreamController: retryDate reached, switch back to IDLE state"),
                            (this.state = Xt.IDLE))
                          break
                        case Xt.WAITING_INIT_PTS:
                          var O = this.waitingFragment
                          if (O) {
                            var C = O.frag.cc
                            if (void 0 !== this.initPTS[C])
                              (this.waitingFragment = null), (this.state = Xt.FRAG_LOADING), this.onFragLoaded(O)
                            else if (this.videoTrackCC !== this.waitingVideoCC)
                              et.logger.log(
                                "Waiting fragment cc (" + C + ") cancelled because video is at cc " + this.videoTrackCC
                              ),
                                this.clearWaitingFragment()
                            else {
                              var P = xt.bufferInfo(this.mediaBuffer, this.media.currentTime, a.maxBufferHole),
                                x = N(P.end, a.maxFragLookUpTolerance, O.frag)
                              x < 0 &&
                                (et.logger.log(
                                  "Waiting fragment cc (" +
                                    C +
                                    ") @ " +
                                    O.frag.start +
                                    " cancelled because another fragment at " +
                                    P.end +
                                    " is needed"
                                ),
                                this.clearWaitingFragment())
                            }
                          } else this.state = Xt.IDLE
                          break
                        case Xt.STOPPED:
                        case Xt.FRAG_LOADING:
                        case Xt.PARSING:
                        case Xt.PARSED:
                        case Xt.ENDED:
                      }
                    }),
                    (r.clearWaitingFragment = function () {
                      var e = this.waitingFragment
                      e &&
                        (this.fragmentTracker.removeFragment(e.frag),
                        (this.waitingFragment = null),
                        (this.waitingVideoCC = null),
                        (this.state = Xt.IDLE))
                    }),
                    (r.onMediaAttached = function (e) {
                      var t = (this.media = this.mediaBuffer = e.media)
                      ;(this.onvseeking = this.onMediaSeeking.bind(this)),
                        (this.onvended = this.onMediaEnded.bind(this)),
                        t.addEventListener("seeking", this.onvseeking),
                        t.addEventListener("ended", this.onvended)
                      var r = this.config
                      this.tracks && r.autoStartLoad && this.startLoad(r.startPosition)
                    }),
                    (r.onMediaDetaching = function () {
                      var e = this.media
                      e &&
                        e.ended &&
                        (et.logger.log("MSE detaching and video ended, reset startPosition"),
                        (this.startPosition = this.lastCurrentTime = 0)),
                        e &&
                          (e.removeEventListener("seeking", this.onvseeking),
                          e.removeEventListener("ended", this.onvended),
                          (this.onvseeking = this.onvseeked = this.onvended = null)),
                        (this.media = this.mediaBuffer = this.videoBuffer = null),
                        (this.loadedmetadata = !1),
                        this.fragmentTracker.removeAllFragments(),
                        this.stopLoad()
                    }),
                    (r.onAudioTracksUpdated = function (e) {
                      et.logger.log("audio tracks updated"), (this.tracks = e.audioTracks)
                    }),
                    (r.onAudioTrackSwitching = function (e) {
                      var t = !!e.url
                      ;(this.trackId = e.id),
                        (this.fragCurrent = null),
                        this.clearWaitingFragment(),
                        (this.state = Xt.PAUSED),
                        t ? this.setInterval(100) : this.demuxer && (this.demuxer.destroy(), (this.demuxer = null)),
                        t && ((this.audioSwitch = !0), (this.state = Xt.IDLE)),
                        this.tick()
                    }),
                    (r.onAudioTrackLoaded = function (e) {
                      var t = e.details,
                        r = e.id,
                        i = this.tracks[r],
                        a = i.details,
                        n = t.totalduration,
                        s = 0
                      if (
                        (et.logger.log("track " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + n),
                        t.live || (a && a.live)
                          ? a && t.fragments.length > 0
                            ? (b(a, t),
                              (s = t.fragments[0].start),
                              t.PTSKnown
                                ? et.logger.log("live audio playlist sliding:" + s.toFixed(3))
                                : et.logger.log("live audio playlist - outdated PTS, unknown sliding"))
                            : ((t.PTSKnown = !1), et.logger.log("live audio playlist - first load, unknown sliding"))
                          : (t.PTSKnown = !1),
                        (i.details = t),
                        !this.startFragRequested)
                      ) {
                        if (-1 === this.startPosition) {
                          var o = t.startTimeOffset
                          Object(Je.isFiniteNumber)(o)
                            ? (et.logger.log("start time offset found in playlist, adjust startPosition to " + o),
                              (this.startPosition = o))
                            : t.live
                            ? ((this.startPosition = this.computeLivePosition(s, t)),
                              et.logger.log("compute startPosition for audio-track to " + this.startPosition))
                            : (this.startPosition = 0)
                        }
                        this.nextLoadPosition = this.startPosition
                      }
                      this.state === Xt.WAITING_TRACK && (this.state = Xt.IDLE), this.tick()
                    }),
                    (r.onKeyLoaded = function () {
                      this.state === Xt.KEY_LOADING && ((this.state = Xt.IDLE), this.tick())
                    }),
                    (r.onFragLoaded = function (e) {
                      var t = this.fragCurrent,
                        r = e.frag
                      if (
                        this.state === Xt.FRAG_LOADING &&
                        t &&
                        "audio" === r.type &&
                        r.level === t.level &&
                        r.sn === t.sn
                      ) {
                        var i = this.tracks[this.trackId],
                          a = i.details,
                          n = a.totalduration,
                          s = t.level,
                          o = t.sn,
                          l = t.cc,
                          u = this.config.defaultAudioCodec || i.audioCodec || "mp4a.40.2",
                          d = (this.stats = e.stats)
                        if ("initSegment" === o)
                          (this.state = Xt.IDLE),
                            (d.tparsed = d.tbuffered = Ar.now()),
                            (a.initSegment.data = e.payload),
                            this.hls.trigger(Ze.default.FRAG_BUFFERED, { stats: d, frag: t, id: "audio" }),
                            this.tick()
                        else {
                          ;(this.state = Xt.PARSING),
                            (this.appended = !1),
                            this.demuxer || (this.demuxer = new Ht(this.hls, "audio"))
                          var c = this.initPTS[l],
                            f = a.initSegment ? a.initSegment.data : []
                          if (void 0 !== c) {
                            ;(this.pendingBuffering = !0),
                              et.logger.log("Demuxing " + o + " of [" + a.startSN + " ," + a.endSN + "],track " + s)
                            this.demuxer.push(e.payload, f, u, null, t, n, !1, c)
                          } else
                            et.logger.log(
                              "Unknown video PTS for cc " +
                                l +
                                ", waiting for video PTS before demuxing audio frag " +
                                o +
                                " of [" +
                                a.startSN +
                                " ," +
                                a.endSN +
                                "],track " +
                                s
                            ),
                              (this.waitingFragment = e),
                              (this.waitingVideoCC = this.videoTrackCC),
                              (this.state = Xt.WAITING_INIT_PTS)
                        }
                      }
                      this.fragLoadError = 0
                    }),
                    (r.onFragParsingInitSegment = function (e) {
                      var t = this.fragCurrent,
                        r = e.frag
                      if (t && "audio" === e.id && r.sn === t.sn && r.level === t.level && this.state === Xt.PARSING) {
                        var i,
                          a = e.tracks
                        if ((a.video && delete a.video, (i = a.audio))) {
                          ;(i.levelCodec = i.codec),
                            (i.id = e.id),
                            this.hls.trigger(Ze.default.BUFFER_CODECS, a),
                            et.logger.log(
                              "audio track:audio,container:" +
                                i.container +
                                ",codecs[level/parsed]=[" +
                                i.levelCodec +
                                "/" +
                                i.codec +
                                "]"
                            )
                          var n = i.initSegment
                          if (n) {
                            var s = { type: "audio", data: n, parent: "audio", content: "initSegment" }
                            this.audioSwitch
                              ? (this.pendingData = [s])
                              : ((this.appended = !0),
                                (this.pendingBuffering = !0),
                                this.hls.trigger(Ze.default.BUFFER_APPENDING, s))
                          }
                          this.tick()
                        }
                      }
                    }),
                    (r.onFragParsingData = function (e) {
                      var t = this,
                        r = this.fragCurrent,
                        i = e.frag
                      if (
                        r &&
                        "audio" === e.id &&
                        "audio" === e.type &&
                        i.sn === r.sn &&
                        i.level === r.level &&
                        this.state === Xt.PARSING
                      ) {
                        var a = this.trackId,
                          n = this.tracks[a],
                          s = this.hls
                        Object(Je.isFiniteNumber)(e.endPTS) ||
                          ((e.endPTS = e.startPTS + r.duration), (e.endDTS = e.startDTS + r.duration)),
                          r.addElementaryStream(nt.AUDIO),
                          et.logger.log(
                            "parsed " +
                              e.type +
                              ",PTS:[" +
                              e.startPTS.toFixed(3) +
                              "," +
                              e.endPTS.toFixed(3) +
                              "],DTS:[" +
                              e.startDTS.toFixed(3) +
                              "/" +
                              e.endDTS.toFixed(3) +
                              "],nb:" +
                              e.nb
                          ),
                          S(n.details, r, e.startPTS, e.endPTS)
                        var o = this.media,
                          l = !1
                        if (this.audioSwitch)
                          if (o && o.readyState) {
                            var u = o.currentTime
                            et.logger.log("switching audio track : currentTime:" + u),
                              u >= e.startPTS &&
                                (et.logger.log("switching audio track : flushing all audio"),
                                (this.state = Xt.BUFFER_FLUSHING),
                                s.trigger(Ze.default.BUFFER_FLUSHING, {
                                  startOffset: 0,
                                  endOffset: Number.POSITIVE_INFINITY,
                                  type: "audio",
                                }),
                                (l = !0),
                                (this.audioSwitch = !1),
                                s.trigger(Ze.default.AUDIO_TRACK_SWITCHED, { id: a }))
                          } else (this.audioSwitch = !1), s.trigger(Ze.default.AUDIO_TRACK_SWITCHED, { id: a })
                        var d = this.pendingData
                        if (!d)
                          return (
                            et.logger.warn(
                              "Apparently attempt to enqueue media payload without codec initialization data upfront"
                            ),
                            void s.trigger(Ze.default.ERROR, {
                              type: $e.ErrorTypes.MEDIA_ERROR,
                              details: null,
                              fatal: !0,
                            })
                          )
                        this.audioSwitch ||
                          ([e.data1, e.data2].forEach(function (t) {
                            t && t.length && d.push({ type: e.type, data: t, parent: "audio", content: "data" })
                          }),
                          !l &&
                            d.length &&
                            (d.forEach(function (e) {
                              t.state === Xt.PARSING &&
                                ((t.pendingBuffering = !0), t.hls.trigger(Ze.default.BUFFER_APPENDING, e))
                            }),
                            (this.pendingData = []),
                            (this.appended = !0))),
                          this.tick()
                      }
                    }),
                    (r.onFragParsed = function (e) {
                      var t = this.fragCurrent,
                        r = e.frag
                      t &&
                        "audio" === e.id &&
                        r.sn === t.sn &&
                        r.level === t.level &&
                        this.state === Xt.PARSING &&
                        ((this.stats.tparsed = Ar.now()), (this.state = Xt.PARSED), this._checkAppendedParsed())
                    }),
                    (r.onBufferReset = function () {
                      ;(this.mediaBuffer = this.videoBuffer = null), (this.loadedmetadata = !1)
                    }),
                    (r.onBufferCreated = function (e) {
                      var t = e.tracks.audio
                      t && ((this.mediaBuffer = t.buffer), (this.loadedmetadata = !0)),
                        e.tracks.video && (this.videoBuffer = e.tracks.video.buffer)
                    }),
                    (r.onBufferAppended = function (e) {
                      if ("audio" === e.parent) {
                        var t = this.state
                        ;(t !== Xt.PARSING && t !== Xt.PARSED) ||
                          ((this.pendingBuffering = e.pending > 0), this._checkAppendedParsed())
                      }
                    }),
                    (r._checkAppendedParsed = function () {
                      if (!(this.state !== Xt.PARSED || (this.appended && this.pendingBuffering))) {
                        var e = this.fragCurrent,
                          t = this.stats,
                          r = this.hls
                        if (e) {
                          ;(this.fragPrevious = e),
                            (t.tbuffered = Ar.now()),
                            r.trigger(Ze.default.FRAG_BUFFERED, { stats: t, frag: e, id: "audio" })
                          var i = this.mediaBuffer ? this.mediaBuffer : this.media
                          i && et.logger.log("audio buffered : " + Yt.toString(i.buffered)),
                            this.audioSwitch &&
                              this.appended &&
                              ((this.audioSwitch = !1),
                              r.trigger(Ze.default.AUDIO_TRACK_SWITCHED, { id: this.trackId })),
                            (this.state = Xt.IDLE)
                        }
                        this.tick()
                      }
                    }),
                    (r.onError = function (e) {
                      var t = e.frag
                      if (!t || "audio" === t.type)
                        switch (e.details) {
                          case $e.ErrorDetails.FRAG_LOAD_ERROR:
                          case $e.ErrorDetails.FRAG_LOAD_TIMEOUT:
                            var r = e.frag
                            if (r && "audio" !== r.type) break
                            if (!e.fatal) {
                              var i = this.fragLoadError
                              i ? i++ : (i = 1)
                              var a = this.config
                              if (i <= a.fragLoadingMaxRetry) {
                                this.fragLoadError = i
                                var n = Math.min(
                                  Math.pow(2, i - 1) * a.fragLoadingRetryDelay,
                                  a.fragLoadingMaxRetryTimeout
                                )
                                et.logger.warn("AudioStreamController: frag loading failed, retry in " + n + " ms"),
                                  (this.retryDate = Ar.now() + n),
                                  (this.state = Xt.FRAG_LOADING_WAITING_RETRY)
                              } else
                                et.logger.error(
                                  "AudioStreamController: " + e.details + " reaches max retry, redispatch as fatal ..."
                                ),
                                  (e.fatal = !0),
                                  (this.state = Xt.ERROR)
                            }
                            break
                          case $e.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                          case $e.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                          case $e.ErrorDetails.KEY_LOAD_ERROR:
                          case $e.ErrorDetails.KEY_LOAD_TIMEOUT:
                            this.state !== Xt.ERROR &&
                              ((this.state = e.fatal ? Xt.ERROR : Xt.IDLE),
                              et.logger.warn(
                                "AudioStreamController: " +
                                  e.details +
                                  " while loading frag, now switching to " +
                                  this.state +
                                  " state ..."
                              ))
                            break
                          case $e.ErrorDetails.BUFFER_FULL_ERROR:
                            if ("audio" === e.parent && (this.state === Xt.PARSING || this.state === Xt.PARSED)) {
                              var s = this.mediaBuffer,
                                o = this.media.currentTime
                              if (s && xt.isBuffered(s, o) && xt.isBuffered(s, o + 0.5)) {
                                var l = this.config
                                l.maxMaxBufferLength >= l.maxBufferLength &&
                                  ((l.maxMaxBufferLength /= 2),
                                  et.logger.warn(
                                    "AudioStreamController: reduce max buffer length to " + l.maxMaxBufferLength + "s"
                                  )),
                                  (this.state = Xt.IDLE)
                              } else
                                et.logger.warn(
                                  "AudioStreamController: buffer full error also media.currentTime is not buffered, flush audio buffer"
                                ),
                                  (this.fragCurrent = null),
                                  (this.state = Xt.BUFFER_FLUSHING),
                                  this.hls.trigger(Ze.default.BUFFER_FLUSHING, {
                                    startOffset: 0,
                                    endOffset: Number.POSITIVE_INFINITY,
                                    type: "audio",
                                  })
                            }
                        }
                    }),
                    (r.onBufferFlushed = function () {
                      var e = this,
                        t = this.pendingData
                      t && t.length
                        ? (et.logger.log("AudioStreamController: appending pending audio data after buffer flushed"),
                          t.forEach(function (t) {
                            e.hls.trigger(Ze.default.BUFFER_APPENDING, t)
                          }),
                          (this.appended = !0),
                          (this.pendingData = []),
                          (this.state = Xt.PARSED))
                        : ((this.state = Xt.IDLE), (this.fragPrevious = null), this.tick())
                    }),
                    fe(t, [
                      {
                        key: "state",
                        set: function (e) {
                          if (this.state !== e) {
                            var t = this.state
                            ;(this._state = e), et.logger.log("audio stream:" + t + "->" + e)
                          }
                        },
                        get: function () {
                          return this._state
                        },
                      },
                    ]),
                    t
                  )
                })(zt),
                Dr = Rr,
                Lr = (function () {
                  function e(e) {
                    return "string" == typeof e && !!n[e.toLowerCase()] && e.toLowerCase()
                  }
                  function t(e) {
                    return "string" == typeof e && !!s[e.toLowerCase()] && e.toLowerCase()
                  }
                  function r(e) {
                    for (var t = 1; t < arguments.length; t++) {
                      var r = arguments[t]
                      for (var i in r) e[i] = r[i]
                    }
                    return e
                  }
                  function i(i, n, s) {
                    var o = this,
                      l = {}
                    ;(l.enumerable = !0), (o.hasBeenReset = !1)
                    var u = "",
                      d = !1,
                      c = i,
                      f = n,
                      h = s,
                      g = null,
                      p = "",
                      v = !0,
                      m = "auto",
                      y = "start",
                      E = 50,
                      T = "middle",
                      S = 50,
                      b = "middle"
                    Object.defineProperty(
                      o,
                      "id",
                      r({}, l, {
                        get: function () {
                          return u
                        },
                        set: function (e) {
                          u = "" + e
                        },
                      })
                    ),
                      Object.defineProperty(
                        o,
                        "pauseOnExit",
                        r({}, l, {
                          get: function () {
                            return d
                          },
                          set: function (e) {
                            d = !!e
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "startTime",
                        r({}, l, {
                          get: function () {
                            return c
                          },
                          set: function (e) {
                            if ("number" != typeof e) throw new TypeError("Start time must be set to a number.")
                            ;(c = e), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "endTime",
                        r({}, l, {
                          get: function () {
                            return f
                          },
                          set: function (e) {
                            if ("number" != typeof e) throw new TypeError("End time must be set to a number.")
                            ;(f = e), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "text",
                        r({}, l, {
                          get: function () {
                            return h
                          },
                          set: function (e) {
                            ;(h = "" + e), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "region",
                        r({}, l, {
                          get: function () {
                            return g
                          },
                          set: function (e) {
                            ;(g = e), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "vertical",
                        r({}, l, {
                          get: function () {
                            return p
                          },
                          set: function (t) {
                            var r = e(t)
                            if (!1 === r) throw new SyntaxError("An invalid or illegal string was specified.")
                            ;(p = r), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "snapToLines",
                        r({}, l, {
                          get: function () {
                            return v
                          },
                          set: function (e) {
                            ;(v = !!e), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "line",
                        r({}, l, {
                          get: function () {
                            return m
                          },
                          set: function (e) {
                            if ("number" != typeof e && e !== a)
                              throw new SyntaxError("An invalid number or illegal string was specified.")
                            ;(m = e), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "lineAlign",
                        r({}, l, {
                          get: function () {
                            return y
                          },
                          set: function (e) {
                            var r = t(e)
                            if (!r) throw new SyntaxError("An invalid or illegal string was specified.")
                            ;(y = r), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "position",
                        r({}, l, {
                          get: function () {
                            return E
                          },
                          set: function (e) {
                            if (e < 0 || e > 100) throw new Error("Position must be between 0 and 100.")
                            ;(E = e), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "positionAlign",
                        r({}, l, {
                          get: function () {
                            return T
                          },
                          set: function (e) {
                            var r = t(e)
                            if (!r) throw new SyntaxError("An invalid or illegal string was specified.")
                            ;(T = r), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "size",
                        r({}, l, {
                          get: function () {
                            return S
                          },
                          set: function (e) {
                            if (e < 0 || e > 100) throw new Error("Size must be between 0 and 100.")
                            ;(S = e), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      Object.defineProperty(
                        o,
                        "align",
                        r({}, l, {
                          get: function () {
                            return b
                          },
                          set: function (e) {
                            var r = t(e)
                            if (!r) throw new SyntaxError("An invalid or illegal string was specified.")
                            ;(b = r), (this.hasBeenReset = !0)
                          },
                        })
                      ),
                      (o.displayState = void 0)
                  }
                  if ("undefined" != typeof window && window.VTTCue) return window.VTTCue
                  var a = "auto",
                    n = { "": !0, lr: !0, rl: !0 },
                    s = { start: !0, middle: !0, end: !0, left: !0, right: !0 }
                  return (
                    (i.prototype.getCueAsHTML = function () {
                      return window.WebVTT.convertCueToDOMTree(window, this.text)
                    }),
                    i
                  )
                })(),
                kr = function () {
                  return {
                    decode: function (e) {
                      if (!e) return ""
                      if ("string" != typeof e) throw new Error("Error - expected string data.")
                      return decodeURIComponent(encodeURIComponent(e))
                    },
                  }
                }
              ve.prototype = {
                set: function (e, t) {
                  this.get(e) || "" === t || (this.values[e] = t)
                },
                get: function (e, t, r) {
                  return r ? (this.has(e) ? this.values[e] : t[r]) : this.has(e) ? this.values[e] : t
                },
                has: function (e) {
                  return e in this.values
                },
                alt: function (e, t, r) {
                  for (var i = 0; i < r.length; ++i)
                    if (t === r[i]) {
                      this.set(e, t)
                      break
                    }
                },
                integer: function (e, t) {
                  ;/^-?\d+$/.test(t) && this.set(e, parseInt(t, 10))
                },
                percent: function (e, t) {
                  return (
                    !!(t.match(/^([\d]{1,3})(\.[\d]*)?%$/) && (t = parseFloat(t)) >= 0 && t <= 100) &&
                    (this.set(e, t), !0)
                  )
                },
              }
              var wr = new Lr(0, 0, 0),
                Ir = "middle" === wr.align ? "middle" : "center"
              ge.prototype = {
                parse: function (e) {
                  function t() {
                    var e = r.buffer,
                      t = 0
                    for (e = Ee(e); t < e.length && "\r" !== e[t] && "\n" !== e[t]; ) ++t
                    var i = e.substr(0, t)
                    return "\r" === e[t] && ++t, "\n" === e[t] && ++t, (r.buffer = e.substr(t)), i
                  }
                  var r = this
                  e && (r.buffer += r.decoder.decode(e, { stream: !0 }))
                  try {
                    var i
                    if ("INITIAL" === r.state) {
                      if (!/\r\n|\n/.test(r.buffer)) return this
                      i = t()
                      var a = i.match(/^(ï»¿)?WEBVTT([ \t].*)?$/)
                      if (!a || !a[0]) throw new Error("Malformed WebVTT signature.")
                      r.state = "HEADER"
                    }
                    for (var n = !1; r.buffer; ) {
                      if (!/\r\n|\n/.test(r.buffer)) return this
                      switch ((n ? (n = !1) : (i = t()), r.state)) {
                        case "HEADER":
                          ;/:/.test(i)
                            ? (function (e) {
                                me(e, function (e, t) {}, /:/)
                              })(i)
                            : i || (r.state = "ID")
                          continue
                        case "NOTE":
                          i || (r.state = "ID")
                          continue
                        case "ID":
                          if (/^NOTE($|[ \t])/.test(i)) {
                            r.state = "NOTE"
                            break
                          }
                          if (!i) continue
                          if (((r.cue = new Lr(0, 0, "")), (r.state = "CUE"), -1 === i.indexOf("--\x3e"))) {
                            r.cue.id = i
                            continue
                          }
                        case "CUE":
                          try {
                            ye(i, r.cue, r.regionList)
                          } catch (e) {
                            ;(r.cue = null), (r.state = "BADCUE")
                            continue
                          }
                          r.state = "CUETEXT"
                          continue
                        case "CUETEXT":
                          var s = -1 !== i.indexOf("--\x3e")
                          if (!i || (s && (n = !0))) {
                            r.oncue && r.oncue(r.cue), (r.cue = null), (r.state = "ID")
                            continue
                          }
                          r.cue.text && (r.cue.text += "\n"), (r.cue.text += i)
                          continue
                        case "BADCUE":
                          i || (r.state = "ID")
                          continue
                      }
                    }
                  } catch (e) {
                    "CUETEXT" === r.state && r.cue && r.oncue && r.oncue(r.cue),
                      (r.cue = null),
                      (r.state = "INITIAL" === r.state ? "BADWEBVTT" : "BADCUE")
                  }
                  return this
                },
                flush: function () {
                  var e = this
                  try {
                    if (
                      ((e.buffer += e.decoder.decode()),
                      (e.cue || "HEADER" === e.state) && ((e.buffer += "\n\n"), e.parse()),
                      "INITIAL" === e.state)
                    )
                      throw new Error("Malformed WebVTT signature.")
                  } catch (e) {
                    throw e
                  }
                  return e.onflush && e.onflush(), this
                },
              }
              var Or,
                Cr = ge,
                Pr = {
                  42: 225,
                  92: 233,
                  94: 237,
                  95: 243,
                  96: 250,
                  123: 231,
                  124: 247,
                  125: 209,
                  126: 241,
                  127: 9608,
                  128: 174,
                  129: 176,
                  130: 189,
                  131: 191,
                  132: 8482,
                  133: 162,
                  134: 163,
                  135: 9834,
                  136: 224,
                  137: 32,
                  138: 232,
                  139: 226,
                  140: 234,
                  141: 238,
                  142: 244,
                  143: 251,
                  144: 193,
                  145: 201,
                  146: 211,
                  147: 218,
                  148: 220,
                  149: 252,
                  150: 8216,
                  151: 161,
                  152: 42,
                  153: 8217,
                  154: 9473,
                  155: 169,
                  156: 8480,
                  157: 8226,
                  158: 8220,
                  159: 8221,
                  160: 192,
                  161: 194,
                  162: 199,
                  163: 200,
                  164: 202,
                  165: 203,
                  166: 235,
                  167: 206,
                  168: 207,
                  169: 239,
                  170: 212,
                  171: 217,
                  172: 249,
                  173: 219,
                  174: 171,
                  175: 187,
                  176: 195,
                  177: 227,
                  178: 205,
                  179: 204,
                  180: 236,
                  181: 210,
                  182: 242,
                  183: 213,
                  184: 245,
                  185: 123,
                  186: 125,
                  187: 92,
                  188: 94,
                  189: 95,
                  190: 124,
                  191: 8764,
                  192: 196,
                  193: 228,
                  194: 214,
                  195: 246,
                  196: 223,
                  197: 165,
                  198: 164,
                  199: 9475,
                  200: 197,
                  201: 229,
                  202: 216,
                  203: 248,
                  204: 9487,
                  205: 9491,
                  206: 9495,
                  207: 9499,
                },
                xr = function (e) {
                  var t = e
                  return Pr.hasOwnProperty(e) && (t = Pr[e]), String.fromCharCode(t)
                },
                Fr = 15,
                Mr = 100,
                Nr = { 17: 1, 18: 3, 21: 5, 22: 7, 23: 9, 16: 11, 19: 12, 20: 14 },
                Ur = { 17: 2, 18: 4, 21: 6, 22: 8, 23: 10, 19: 13, 20: 15 },
                Br = { 25: 1, 26: 3, 29: 5, 30: 7, 31: 9, 24: 11, 27: 12, 28: 14 },
                Gr = { 25: 2, 26: 4, 29: 6, 30: 8, 31: 10, 27: 13, 28: 15 },
                jr = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"]
              !(function (e) {
                ;(e[(e.ERROR = 0)] = "ERROR"),
                  (e[(e.TEXT = 1)] = "TEXT"),
                  (e[(e.WARNING = 2)] = "WARNING"),
                  (e[(e.INFO = 2)] = "INFO"),
                  (e[(e.DEBUG = 3)] = "DEBUG"),
                  (e[(e.DATA = 3)] = "DATA")
              })(Or || (Or = {}))
              var Kr,
                Hr = (function () {
                  function e() {
                    ;(this.time = null), (this.verboseLevel = Or.ERROR)
                  }
                  return (
                    (e.prototype.log = function (e, t) {
                      this.verboseLevel >= e && et.logger.log(this.time + " [" + e + "] " + t)
                    }),
                    e
                  )
                })(),
                Vr = function (e) {
                  for (var t = [], r = 0; r < e.length; r++) t.push(e[r].toString(16))
                  return t
                },
                Yr = (function () {
                  function e(e, t, r, i, a) {
                    ;(this.foreground = void 0),
                      (this.underline = void 0),
                      (this.italics = void 0),
                      (this.background = void 0),
                      (this.flash = void 0),
                      (this.foreground = e || "white"),
                      (this.underline = t || !1),
                      (this.italics = r || !1),
                      (this.background = i || "black"),
                      (this.flash = a || !1)
                  }
                  var t = e.prototype
                  return (
                    (t.reset = function () {
                      ;(this.foreground = "white"),
                        (this.underline = !1),
                        (this.italics = !1),
                        (this.background = "black"),
                        (this.flash = !1)
                    }),
                    (t.setStyles = function (e) {
                      for (
                        var t = ["foreground", "underline", "italics", "background", "flash"], r = 0;
                        r < t.length;
                        r++
                      ) {
                        var i = t[r]
                        e.hasOwnProperty(i) && (this[i] = e[i])
                      }
                    }),
                    (t.isDefault = function () {
                      return (
                        "white" === this.foreground &&
                        !this.underline &&
                        !this.italics &&
                        "black" === this.background &&
                        !this.flash
                      )
                    }),
                    (t.equals = function (e) {
                      return (
                        this.foreground === e.foreground &&
                        this.underline === e.underline &&
                        this.italics === e.italics &&
                        this.background === e.background &&
                        this.flash === e.flash
                      )
                    }),
                    (t.copy = function (e) {
                      ;(this.foreground = e.foreground),
                        (this.underline = e.underline),
                        (this.italics = e.italics),
                        (this.background = e.background),
                        (this.flash = e.flash)
                    }),
                    (t.toString = function () {
                      return (
                        "color=" +
                        this.foreground +
                        ", underline=" +
                        this.underline +
                        ", italics=" +
                        this.italics +
                        ", background=" +
                        this.background +
                        ", flash=" +
                        this.flash
                      )
                    }),
                    e
                  )
                })(),
                Wr = (function () {
                  function e(e, t, r, i, a, n) {
                    ;(this.uchar = void 0),
                      (this.penState = void 0),
                      (this.uchar = e || " "),
                      (this.penState = new Yr(t, r, i, a, n))
                  }
                  var t = e.prototype
                  return (
                    (t.reset = function () {
                      ;(this.uchar = " "), this.penState.reset()
                    }),
                    (t.setChar = function (e, t) {
                      ;(this.uchar = e), this.penState.copy(t)
                    }),
                    (t.setPenState = function (e) {
                      this.penState.copy(e)
                    }),
                    (t.equals = function (e) {
                      return this.uchar === e.uchar && this.penState.equals(e.penState)
                    }),
                    (t.copy = function (e) {
                      ;(this.uchar = e.uchar), this.penState.copy(e.penState)
                    }),
                    (t.isEmpty = function () {
                      return " " === this.uchar && this.penState.isDefault()
                    }),
                    e
                  )
                })(),
                qr = (function () {
                  function e(e) {
                    ;(this.chars = void 0),
                      (this.pos = void 0),
                      (this.currPenState = void 0),
                      (this.cueStartTime = void 0),
                      (this.logger = void 0),
                      (this.chars = [])
                    for (var t = 0; t < Mr; t++) this.chars.push(new Wr())
                    ;(this.logger = e), (this.pos = 0), (this.currPenState = new Yr())
                  }
                  var t = e.prototype
                  return (
                    (t.equals = function (e) {
                      for (var t = !0, r = 0; r < Mr; r++)
                        if (!this.chars[r].equals(e.chars[r])) {
                          t = !1
                          break
                        }
                      return t
                    }),
                    (t.copy = function (e) {
                      for (var t = 0; t < Mr; t++) this.chars[t].copy(e.chars[t])
                    }),
                    (t.isEmpty = function () {
                      for (var e = !0, t = 0; t < Mr; t++)
                        if (!this.chars[t].isEmpty()) {
                          e = !1
                          break
                        }
                      return e
                    }),
                    (t.setCursor = function (e) {
                      this.pos !== e && (this.pos = e),
                        this.pos < 0
                          ? (this.logger.log(Or.DEBUG, "Negative cursor position " + this.pos), (this.pos = 0))
                          : this.pos > Mr &&
                            (this.logger.log(Or.DEBUG, "Too large cursor position " + this.pos), (this.pos = Mr))
                    }),
                    (t.moveCursor = function (e) {
                      var t = this.pos + e
                      if (e > 1) for (var r = this.pos + 1; r < t + 1; r++) this.chars[r].setPenState(this.currPenState)
                      this.setCursor(t)
                    }),
                    (t.backSpace = function () {
                      this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState)
                    }),
                    (t.insertChar = function (e) {
                      e >= 144 && this.backSpace()
                      var t = xr(e)
                      if (this.pos >= Mr)
                        return void this.logger.log(
                          Or.ERROR,
                          "Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!"
                        )
                      this.chars[this.pos].setChar(t, this.currPenState), this.moveCursor(1)
                    }),
                    (t.clearFromPos = function (e) {
                      var t
                      for (t = e; t < Mr; t++) this.chars[t].reset()
                    }),
                    (t.clear = function () {
                      this.clearFromPos(0), (this.pos = 0), this.currPenState.reset()
                    }),
                    (t.clearToEndOfRow = function () {
                      this.clearFromPos(this.pos)
                    }),
                    (t.getTextString = function () {
                      for (var e = [], t = !0, r = 0; r < Mr; r++) {
                        var i = this.chars[r].uchar
                        " " !== i && (t = !1), e.push(i)
                      }
                      return t ? "" : e.join("")
                    }),
                    (t.setPenStyles = function (e) {
                      this.currPenState.setStyles(e), this.chars[this.pos].setPenState(this.currPenState)
                    }),
                    e
                  )
                })(),
                Xr = (function () {
                  function e(e) {
                    ;(this.rows = void 0),
                      (this.currRow = void 0),
                      (this.nrRollUpRows = void 0),
                      (this.lastOutputScreen = void 0),
                      (this.logger = void 0),
                      (this.rows = [])
                    for (var t = 0; t < Fr; t++) this.rows.push(new qr(e))
                    ;(this.logger = e),
                      (this.currRow = Fr - 1),
                      (this.nrRollUpRows = null),
                      (this.lastOutputScreen = null),
                      this.reset()
                  }
                  var t = e.prototype
                  return (
                    (t.reset = function () {
                      for (var e = 0; e < Fr; e++) this.rows[e].clear()
                      this.currRow = Fr - 1
                    }),
                    (t.equals = function (e) {
                      for (var t = !0, r = 0; r < Fr; r++)
                        if (!this.rows[r].equals(e.rows[r])) {
                          t = !1
                          break
                        }
                      return t
                    }),
                    (t.copy = function (e) {
                      for (var t = 0; t < Fr; t++) this.rows[t].copy(e.rows[t])
                    }),
                    (t.isEmpty = function () {
                      for (var e = !0, t = 0; t < Fr; t++)
                        if (!this.rows[t].isEmpty()) {
                          e = !1
                          break
                        }
                      return e
                    }),
                    (t.backSpace = function () {
                      this.rows[this.currRow].backSpace()
                    }),
                    (t.clearToEndOfRow = function () {
                      this.rows[this.currRow].clearToEndOfRow()
                    }),
                    (t.insertChar = function (e) {
                      this.rows[this.currRow].insertChar(e)
                    }),
                    (t.setPen = function (e) {
                      this.rows[this.currRow].setPenStyles(e)
                    }),
                    (t.moveCursor = function (e) {
                      this.rows[this.currRow].moveCursor(e)
                    }),
                    (t.setCursor = function (e) {
                      this.logger.log(Or.INFO, "setCursor: " + e), this.rows[this.currRow].setCursor(e)
                    }),
                    (t.setPAC = function (e) {
                      this.logger.log(Or.INFO, "pacData = " + JSON.stringify(e))
                      var t = e.row - 1
                      if (
                        (this.nrRollUpRows && t < this.nrRollUpRows - 1 && (t = this.nrRollUpRows - 1),
                        this.nrRollUpRows && this.currRow !== t)
                      ) {
                        for (var r = 0; r < Fr; r++) this.rows[r].clear()
                        var i = this.currRow + 1 - this.nrRollUpRows,
                          a = this.lastOutputScreen
                        if (a) {
                          var n = a.rows[i].cueStartTime,
                            s = this.logger.time
                          if (n && null !== s && n < s)
                            for (var o = 0; o < this.nrRollUpRows; o++)
                              this.rows[t - this.nrRollUpRows + o + 1].copy(a.rows[i + o])
                        }
                      }
                      this.currRow = t
                      var l = this.rows[this.currRow]
                      if (null !== e.indent) {
                        var u = e.indent,
                          d = Math.max(u - 1, 0)
                        l.setCursor(e.indent), (e.color = l.chars[d].penState.foreground)
                      }
                      var c = {
                        foreground: e.color,
                        underline: e.underline,
                        italics: e.italics,
                        background: "black",
                        flash: !1,
                      }
                      this.setPen(c)
                    }),
                    (t.setBkgData = function (e) {
                      this.logger.log(Or.INFO, "bkgData = " + JSON.stringify(e)),
                        this.backSpace(),
                        this.setPen(e),
                        this.insertChar(32)
                    }),
                    (t.setRollUpRows = function (e) {
                      this.nrRollUpRows = e
                    }),
                    (t.rollUp = function () {
                      if (null === this.nrRollUpRows)
                        return void this.logger.log(Or.DEBUG, "roll_up but nrRollUpRows not set yet")
                      this.logger.log(Or.TEXT, this.getDisplayText())
                      var e = this.currRow + 1 - this.nrRollUpRows,
                        t = this.rows.splice(e, 1)[0]
                      t.clear(), this.rows.splice(this.currRow, 0, t), this.logger.log(Or.INFO, "Rolling up")
                    }),
                    (t.getDisplayText = function (e) {
                      e = e || !1
                      for (var t = [], r = "", i = -1, a = 0; a < Fr; a++) {
                        var n = this.rows[a].getTextString()
                        n && ((i = a + 1), e ? t.push("Row " + i + ": '" + n + "'") : t.push(n.trim()))
                      }
                      return t.length > 0 && (r = e ? "[" + t.join(" | ") + "]" : t.join("\n")), r
                    }),
                    (t.getTextAndFormat = function () {
                      return this.rows
                    }),
                    e
                  )
                })(),
                zr = (function () {
                  function e(e, t, r) {
                    ;(this.chNr = void 0),
                      (this.outputFilter = void 0),
                      (this.mode = void 0),
                      (this.verbose = void 0),
                      (this.displayedMemory = void 0),
                      (this.nonDisplayedMemory = void 0),
                      (this.lastOutputScreen = void 0),
                      (this.currRollUpRow = void 0),
                      (this.writeScreen = void 0),
                      (this.cueStartTime = void 0),
                      (this.logger = void 0),
                      (this.chNr = e),
                      (this.outputFilter = t),
                      (this.mode = null),
                      (this.verbose = 0),
                      (this.displayedMemory = new Xr(r)),
                      (this.nonDisplayedMemory = new Xr(r)),
                      (this.lastOutputScreen = new Xr(r)),
                      (this.currRollUpRow = this.displayedMemory.rows[Fr - 1]),
                      (this.writeScreen = this.displayedMemory),
                      (this.mode = null),
                      (this.cueStartTime = null),
                      (this.logger = r)
                  }
                  var t = e.prototype
                  return (
                    (t.reset = function () {
                      ;(this.mode = null),
                        this.displayedMemory.reset(),
                        this.nonDisplayedMemory.reset(),
                        this.lastOutputScreen.reset(),
                        this.outputFilter.reset(),
                        (this.currRollUpRow = this.displayedMemory.rows[Fr - 1]),
                        (this.writeScreen = this.displayedMemory),
                        (this.mode = null),
                        (this.cueStartTime = null)
                    }),
                    (t.getHandler = function () {
                      return this.outputFilter
                    }),
                    (t.setHandler = function (e) {
                      this.outputFilter = e
                    }),
                    (t.setPAC = function (e) {
                      this.writeScreen.setPAC(e)
                    }),
                    (t.setBkgData = function (e) {
                      this.writeScreen.setBkgData(e)
                    }),
                    (t.setMode = function (e) {
                      e !== this.mode &&
                        ((this.mode = e),
                        this.logger.log(Or.INFO, "MODE=" + e),
                        "MODE_POP-ON" === this.mode
                          ? (this.writeScreen = this.nonDisplayedMemory)
                          : ((this.writeScreen = this.displayedMemory), this.writeScreen.reset()),
                        "MODE_ROLL-UP" !== this.mode &&
                          ((this.displayedMemory.nrRollUpRows = null), (this.nonDisplayedMemory.nrRollUpRows = null)),
                        (this.mode = e))
                    }),
                    (t.insertChars = function (e) {
                      for (var t = 0; t < e.length; t++) this.writeScreen.insertChar(e[t])
                      var r = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP"
                      this.logger.log(Or.INFO, r + ": " + this.writeScreen.getDisplayText(!0)),
                        ("MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode) ||
                          (this.logger.log(Or.TEXT, "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)),
                          this.outputDataUpdate())
                    }),
                    (t.ccRCL = function () {
                      this.logger.log(Or.INFO, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON")
                    }),
                    (t.ccBS = function () {
                      this.logger.log(Or.INFO, "BS - BackSpace"),
                        "MODE_TEXT" !== this.mode &&
                          (this.writeScreen.backSpace(),
                          this.writeScreen === this.displayedMemory && this.outputDataUpdate())
                    }),
                    (t.ccAOF = function () {}),
                    (t.ccAON = function () {}),
                    (t.ccDER = function () {
                      this.logger.log(Or.INFO, "DER- Delete to End of Row"),
                        this.writeScreen.clearToEndOfRow(),
                        this.outputDataUpdate()
                    }),
                    (t.ccRU = function (e) {
                      this.logger.log(Or.INFO, "RU(" + e + ") - Roll Up"),
                        (this.writeScreen = this.displayedMemory),
                        this.setMode("MODE_ROLL-UP"),
                        this.writeScreen.setRollUpRows(e)
                    }),
                    (t.ccFON = function () {
                      this.logger.log(Or.INFO, "FON - Flash On"), this.writeScreen.setPen({ flash: !0 })
                    }),
                    (t.ccRDC = function () {
                      this.logger.log(Or.INFO, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON")
                    }),
                    (t.ccTR = function () {
                      this.logger.log(Or.INFO, "TR"), this.setMode("MODE_TEXT")
                    }),
                    (t.ccRTD = function () {
                      this.logger.log(Or.INFO, "RTD"), this.setMode("MODE_TEXT")
                    }),
                    (t.ccEDM = function () {
                      this.logger.log(Or.INFO, "EDM - Erase Displayed Memory"),
                        this.displayedMemory.reset(),
                        this.outputDataUpdate(!0)
                    }),
                    (t.ccCR = function () {
                      this.logger.log(Or.INFO, "CR - Carriage Return"),
                        this.writeScreen.rollUp(),
                        this.outputDataUpdate(!0)
                    }),
                    (t.ccENM = function () {
                      this.logger.log(Or.INFO, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset()
                    }),
                    (t.ccEOC = function () {
                      if ((this.logger.log(Or.INFO, "EOC - End Of Caption"), "MODE_POP-ON" === this.mode)) {
                        var e = this.displayedMemory
                        ;(this.displayedMemory = this.nonDisplayedMemory),
                          (this.nonDisplayedMemory = e),
                          (this.writeScreen = this.nonDisplayedMemory),
                          this.logger.log(Or.TEXT, "DISP: " + this.displayedMemory.getDisplayText())
                      }
                      this.outputDataUpdate(!0)
                    }),
                    (t.ccTO = function (e) {
                      this.logger.log(Or.INFO, "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e)
                    }),
                    (t.ccMIDROW = function (e) {
                      var t = { flash: !1 }
                      if (((t.underline = e % 2 == 1), (t.italics = e >= 46), t.italics)) t.foreground = "white"
                      else {
                        var r = Math.floor(e / 2) - 16,
                          i = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"]
                        t.foreground = i[r]
                      }
                      this.logger.log(Or.INFO, "MIDROW: " + JSON.stringify(t)), this.writeScreen.setPen(t)
                    }),
                    (t.outputDataUpdate = function (e) {
                      void 0 === e && (e = !1)
                      var t = this.logger.time
                      null !== t &&
                        this.outputFilter &&
                        (null !== this.cueStartTime || this.displayedMemory.isEmpty()
                          ? this.displayedMemory.equals(this.lastOutputScreen) ||
                            (this.outputFilter.newCue(this.cueStartTime, t, this.lastOutputScreen),
                            e && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(),
                            (this.cueStartTime = this.displayedMemory.isEmpty() ? null : t))
                          : (this.cueStartTime = t),
                        this.lastOutputScreen.copy(this.displayedMemory))
                    }),
                    (t.cueSplitAtTime = function (e) {
                      this.outputFilter &&
                        (this.displayedMemory.isEmpty() ||
                          (this.outputFilter.newCue &&
                            this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory),
                          (this.cueStartTime = e)))
                    }),
                    e
                  )
                })(),
                Qr = (function () {
                  function e(e, t, r) {
                    ;(this.channels = void 0),
                      (this.currentChannel = 0),
                      (this.cmdHistory = void 0),
                      (this.logger = void 0)
                    var i = new Hr()
                    ;(this.channels = [null, new zr(e, t, i), new zr(e + 1, r, i)]),
                      (this.cmdHistory = _e()),
                      (this.logger = i)
                  }
                  var t = e.prototype
                  return (
                    (t.getHandler = function (e) {
                      return this.channels[e].getHandler()
                    }),
                    (t.setHandler = function (e, t) {
                      this.channels[e].setHandler(t)
                    }),
                    (t.addData = function (e, t) {
                      var r,
                        i,
                        a,
                        n = !1
                      this.logger.time = e
                      for (var s = 0; s < t.length; s += 2)
                        if (((i = 127 & t[s]), (a = 127 & t[s + 1]), 0 !== i || 0 !== a)) {
                          if (
                            (this.logger.log(Or.DATA, "[" + Vr([t[s], t[s + 1]]) + "] -> (" + Vr([i, a]) + ")"),
                            (r = this.parseCmd(i, a)),
                            r || (r = this.parseMidrow(i, a)),
                            r || (r = this.parsePAC(i, a)),
                            r || (r = this.parseBackgroundAttributes(i, a)),
                            !r && (n = this.parseChars(i, a)))
                          ) {
                            var o = this.currentChannel
                            if (o && o > 0) {
                              var l = this.channels[o]
                              l.insertChars(n)
                            } else this.logger.log(Or.WARNING, "No channel found yet. TEXT-MODE?")
                          }
                          r ||
                            n ||
                            this.logger.log(
                              Or.WARNING,
                              "Couldn't parse cleaned data " + Vr([i, a]) + " orig: " + Vr([t[s], t[s + 1]])
                            )
                        }
                    }),
                    (t.parseCmd = function (e, t) {
                      var r = this.cmdHistory,
                        i = (20 === e || 28 === e || 21 === e || 29 === e) && t >= 32 && t <= 47,
                        a = (23 === e || 31 === e) && t >= 33 && t <= 35
                      if (!i && !a) return !1
                      if (be(e, t, r))
                        return (
                          Se(null, null, r),
                          this.logger.log(Or.DEBUG, "Repeated command (" + Vr([e, t]) + ") is dropped"),
                          !0
                        )
                      var n = 20 === e || 21 === e || 23 === e ? 1 : 2,
                        s = this.channels[n]
                      return (
                        20 === e || 21 === e || 28 === e || 29 === e
                          ? 32 === t
                            ? s.ccRCL()
                            : 33 === t
                            ? s.ccBS()
                            : 34 === t
                            ? s.ccAOF()
                            : 35 === t
                            ? s.ccAON()
                            : 36 === t
                            ? s.ccDER()
                            : 37 === t
                            ? s.ccRU(2)
                            : 38 === t
                            ? s.ccRU(3)
                            : 39 === t
                            ? s.ccRU(4)
                            : 40 === t
                            ? s.ccFON()
                            : 41 === t
                            ? s.ccRDC()
                            : 42 === t
                            ? s.ccTR()
                            : 43 === t
                            ? s.ccRTD()
                            : 44 === t
                            ? s.ccEDM()
                            : 45 === t
                            ? s.ccCR()
                            : 46 === t
                            ? s.ccENM()
                            : 47 === t && s.ccEOC()
                          : s.ccTO(t - 32),
                        Se(e, t, r),
                        (this.currentChannel = n),
                        !0
                      )
                    }),
                    (t.parseMidrow = function (e, t) {
                      var r = 0
                      if ((17 === e || 25 === e) && t >= 32 && t <= 47) {
                        if ((r = 17 === e ? 1 : 2) !== this.currentChannel)
                          return this.logger.log(Or.ERROR, "Mismatch channel in midrow parsing"), !1
                        var i = this.channels[r]
                        return !!i && (i.ccMIDROW(t), this.logger.log(Or.DEBUG, "MIDROW (" + Vr([e, t]) + ")"), !0)
                      }
                      return !1
                    }),
                    (t.parsePAC = function (e, t) {
                      var r,
                        i = this.cmdHistory,
                        a = ((e >= 17 && e <= 23) || (e >= 25 && e <= 31)) && t >= 64 && t <= 127,
                        n = (16 === e || 24 === e) && t >= 64 && t <= 95
                      if (!a && !n) return !1
                      if (be(e, t, i)) return Se(null, null, i), !0
                      var s = e <= 23 ? 1 : 2
                      r = t >= 64 && t <= 95 ? (1 === s ? Nr[e] : Br[e]) : 1 === s ? Ur[e] : Gr[e]
                      var o = this.channels[s]
                      return !!o && (o.setPAC(this.interpretPAC(r, t)), Se(e, t, i), (this.currentChannel = s), !0)
                    }),
                    (t.interpretPAC = function (e, t) {
                      var r = t,
                        i = { color: null, italics: !1, indent: null, underline: !1, row: e }
                      return (
                        (r = t > 95 ? t - 96 : t - 64),
                        (i.underline = 1 == (1 & r)),
                        r <= 13
                          ? (i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][
                              Math.floor(r / 2)
                            ])
                          : r <= 15
                          ? ((i.italics = !0), (i.color = "white"))
                          : (i.indent = 4 * Math.floor((r - 16) / 2)),
                        i
                      )
                    }),
                    (t.parseChars = function (e, t) {
                      var r,
                        i = null,
                        a = null
                      if ((e >= 25 ? ((r = 2), (a = e - 8)) : ((r = 1), (a = e)), a >= 17 && a <= 19)) {
                        var n = t
                        ;(n = 17 === a ? t + 80 : 18 === a ? t + 112 : t + 144),
                          this.logger.log(Or.INFO, "Special char '" + xr(n) + "' in channel " + r),
                          (i = [n])
                      } else e >= 32 && e <= 127 && (i = 0 === t ? [e] : [e, t])
                      if (i) {
                        var s = Vr(i)
                        this.logger.log(Or.DEBUG, "Char codes =  " + s.join(",")), Se(e, t, this.cmdHistory)
                      }
                      return i
                    }),
                    (t.parseBackgroundAttributes = function (e, t) {
                      var r = (16 === e || 24 === e) && t >= 32 && t <= 47,
                        i = (23 === e || 31 === e) && t >= 45 && t <= 47
                      if (!r && !i) return !1
                      var a,
                        n = {}
                      16 === e || 24 === e
                        ? ((a = Math.floor((t - 32) / 2)),
                          (n.background = jr[a]),
                          t % 2 == 1 && (n.background = n.background + "_semi"))
                        : 45 === t
                        ? (n.background = "transparent")
                        : ((n.foreground = "black"), 47 === t && (n.underline = !0))
                      var s = e <= 23 ? 1 : 2
                      return this.channels[s].setBkgData(n), Se(e, t, this.cmdHistory), !0
                    }),
                    (t.reset = function () {
                      for (var e = 0; e < Object.keys(this.channels).length; e++) {
                        var t = this.channels[e]
                        t && t.reset()
                      }
                      this.cmdHistory = _e()
                    }),
                    (t.cueSplitAtTime = function (e) {
                      for (var t = 0; t < this.channels.length; t++) {
                        var r = this.channels[t]
                        r && r.cueSplitAtTime(e)
                      }
                    }),
                    e
                  )
                })(),
                $r = Qr,
                Jr = (function () {
                  function e(e, t) {
                    ;(this.timelineController = void 0),
                      (this.cueRanges = []),
                      (this.trackName = void 0),
                      (this.startTime = null),
                      (this.endTime = null),
                      (this.screen = null),
                      (this.timelineController = e),
                      (this.trackName = t)
                  }
                  var t = e.prototype
                  return (
                    (t.dispatchCue = function () {
                      null !== this.startTime &&
                        (this.timelineController.addCues(
                          this.trackName,
                          this.startTime,
                          this.endTime,
                          this.screen,
                          this.cueRanges
                        ),
                        (this.startTime = null))
                    }),
                    (t.newCue = function (e, t, r) {
                      ;(null === this.startTime || this.startTime > e) && (this.startTime = e),
                        (this.endTime = t),
                        (this.screen = r),
                        this.timelineController.createCaptionsTrack(this.trackName)
                    }),
                    (t.reset = function () {
                      this.cueRanges = []
                    }),
                    e
                  )
                })(),
                Zr = function (e, t, r) {
                  return e.substr(r || 0, t.length) === t
                },
                ei = function (e) {
                  var t = parseInt(e.substr(-3)),
                    r = parseInt(e.substr(-6, 2)),
                    i = parseInt(e.substr(-9, 2)),
                    a = e.length > 9 ? parseInt(e.substr(0, e.indexOf(":"))) : 0
                  if (
                    !(
                      Object(Je.isFiniteNumber)(t) &&
                      Object(Je.isFiniteNumber)(r) &&
                      Object(Je.isFiniteNumber)(i) &&
                      Object(Je.isFiniteNumber)(a)
                    )
                  )
                    throw Error("Malformed X-TIMESTAMP-MAP: Local:" + e)
                  return (t += 1e3 * r), (t += 6e4 * i), (t += 36e5 * a)
                },
                ti = function (e) {
                  for (var t = 5381, r = e.length; r; ) t = (33 * t) ^ e.charCodeAt(--r)
                  return (t >>> 0).toString()
                },
                ri = function (e, t, r) {
                  var i = e[t],
                    a = e[i.prevCC]
                  if (!a || (!a.new && i.new)) return (e.ccOffset = e.presentationOffset = i.start), void (i.new = !1)
                  for (; a && a.new; ) (e.ccOffset += i.start - a.start), (i.new = !1), (i = a), (a = e[i.prevCC])
                  e.presentationOffset = r
                },
                ii = {
                  parse: function (e, t, r, i, a, n) {
                    var s,
                      o = /\r\n|\n\r|\n|\r/g,
                      l = Object(Zt.utf8ArrayToStr)(new Uint8Array(e)).trim().replace(o, "\n").split("\n"),
                      u = "00:00.000",
                      d = 0,
                      c = 0,
                      f = 0,
                      h = [],
                      g = !0,
                      p = !1,
                      v = new Cr()
                    ;(v.oncue = function (e) {
                      var t = r[i],
                        a = r.ccOffset
                      t && t.new && (void 0 !== c ? (a = r.ccOffset = t.start) : ri(r, i, f)),
                        f && (a = f - r.presentationOffset),
                        p && ((e.startTime += a - c), (e.endTime += a - c)),
                        (e.id = ti(e.startTime.toString()) + ti(e.endTime.toString()) + ti(e.text)),
                        (e.text = decodeURIComponent(encodeURIComponent(e.text))),
                        e.endTime > 0 && h.push(e)
                    }),
                      (v.onparsingerror = function (e) {
                        s = e
                      }),
                      (v.onflush = function () {
                        if (s && n) return void n(s)
                        a(h)
                      }),
                      l.forEach(function (e) {
                        if (g) {
                          if (Zr(e, "X-TIMESTAMP-MAP=")) {
                            ;(g = !1),
                              (p = !0),
                              e
                                .substr(16)
                                .split(",")
                                .forEach(function (e) {
                                  Zr(e, "LOCAL:") ? (u = e.substr(6)) : Zr(e, "MPEGTS:") && (d = parseInt(e.substr(7)))
                                })
                            try {
                              t + (9e4 * r[i].start || 0) < 0 && (t += 8589934592),
                                (d -= t),
                                (c = ei(u) / 1e3),
                                (f = d / 9e4)
                            } catch (e) {
                              ;(p = !1), (s = e)
                            }
                            return
                          }
                          "" === e && (g = !1)
                        }
                        v.parse(e + "\n")
                      }),
                      v.flush()
                  },
                },
                ai = ii,
                ni = (function (e) {
                  function t(t) {
                    var r
                    if (
                      ((r =
                        e.call(
                          this,
                          t,
                          Ze.default.MEDIA_ATTACHING,
                          Ze.default.MEDIA_DETACHING,
                          Ze.default.FRAG_PARSING_USERDATA,
                          Ze.default.FRAG_DECRYPTED,
                          Ze.default.MANIFEST_LOADING,
                          Ze.default.MANIFEST_LOADED,
                          Ze.default.FRAG_LOADED,
                          Ze.default.INIT_PTS_FOUND
                        ) || this),
                      (r.media = null),
                      (r.config = void 0),
                      (r.enabled = !0),
                      (r.Cues = void 0),
                      (r.textTracks = []),
                      (r.tracks = []),
                      (r.initPTS = []),
                      (r.unparsedVttFrags = []),
                      (r.captionsTracks = {}),
                      (r.nonNativeCaptionsTracks = {}),
                      (r.captionsProperties = void 0),
                      (r.cea608Parser1 = void 0),
                      (r.cea608Parser2 = void 0),
                      (r.lastSn = -1),
                      (r.prevCC = -1),
                      (r.vttCCs = ke()),
                      (r.hls = t),
                      (r.config = t.config),
                      (r.Cues = t.config.cueHandler),
                      (r.captionsProperties = {
                        textTrack1: {
                          label: r.config.captionsTextTrack1Label,
                          languageCode: r.config.captionsTextTrack1LanguageCode,
                        },
                        textTrack2: {
                          label: r.config.captionsTextTrack2Label,
                          languageCode: r.config.captionsTextTrack2LanguageCode,
                        },
                        textTrack3: {
                          label: r.config.captionsTextTrack3Label,
                          languageCode: r.config.captionsTextTrack3LanguageCode,
                        },
                        textTrack4: {
                          label: r.config.captionsTextTrack4Label,
                          languageCode: r.config.captionsTextTrack4LanguageCode,
                        },
                      }),
                      r.config.enableCEA708Captions)
                    ) {
                      var i = new Jr(Ae(r), "textTrack1"),
                        a = new Jr(Ae(r), "textTrack2"),
                        n = new Jr(Ae(r), "textTrack3"),
                        s = new Jr(Ae(r), "textTrack4")
                      ;(r.cea608Parser1 = new $r(1, i, a)), (r.cea608Parser2 = new $r(3, n, s))
                    }
                    return r
                  }
                  Re(t, e)
                  var r = t.prototype
                  return (
                    (r.addCues = function (e, t, r, i, a) {
                      for (var n = !1, s = a.length; s--; ) {
                        var o = a[s],
                          l = Le(o[0], o[1], t, r)
                        if (
                          l >= 0 &&
                          ((o[0] = Math.min(o[0], t)), (o[1] = Math.max(o[1], r)), (n = !0), l / (r - t) > 0.5)
                        )
                          return
                      }
                      if ((n || a.push([t, r]), this.config.renderTextTracksNatively))
                        this.Cues.newCue(this.captionsTracks[e], t, r, i)
                      else {
                        var u = this.Cues.newCue(null, t, r, i)
                        this.hls.trigger(Ze.default.CUES_PARSED, { type: "captions", cues: u, track: e })
                      }
                    }),
                    (r.onInitPtsFound = function (e) {
                      var t = this,
                        r = e.frag,
                        i = e.id,
                        a = e.initPTS,
                        n = this.unparsedVttFrags
                      "main" === i && (this.initPTS[r.cc] = a),
                        n.length &&
                          ((this.unparsedVttFrags = []),
                          n.forEach(function (e) {
                            t.onFragLoaded(e)
                          }))
                    }),
                    (r.getExistingTrack = function (e) {
                      var t = this.media
                      if (t)
                        for (var r = 0; r < t.textTracks.length; r++) {
                          var i = t.textTracks[r]
                          if (i[e]) return i
                        }
                      return null
                    }),
                    (r.createCaptionsTrack = function (e) {
                      this.config.renderTextTracksNatively ? this.createNativeTrack(e) : this.createNonNativeTrack(e)
                    }),
                    (r.createNativeTrack = function (e) {
                      if (!this.captionsTracks[e]) {
                        var t = this.captionsProperties,
                          r = this.captionsTracks,
                          i = this.media,
                          a = t[e],
                          n = a.label,
                          s = a.languageCode,
                          o = this.getExistingTrack(e)
                        if (o) (r[e] = o), z(r[e]), X(r[e], i)
                        else {
                          var l = this.createTextTrack("captions", n, s)
                          l && ((l[e] = !0), (r[e] = l))
                        }
                      }
                    }),
                    (r.createNonNativeTrack = function (e) {
                      if (!this.nonNativeCaptionsTracks[e]) {
                        var t = this.captionsProperties[e]
                        if (t) {
                          var r = t.label,
                            i = {
                              _id: e,
                              label: r,
                              kind: "captions",
                              default: !!t.media && !!t.media.default,
                              closedCaptions: t.media,
                            }
                          ;(this.nonNativeCaptionsTracks[e] = i),
                            this.hls.trigger(Ze.default.NON_NATIVE_TEXT_TRACKS_FOUND, { tracks: [i] })
                        }
                      }
                    }),
                    (r.createTextTrack = function (e, t, r) {
                      var i = this.media
                      if (i) return i.addTextTrack(e, t, r)
                    }),
                    (r.destroy = function () {
                      e.prototype.destroy.call(this)
                    }),
                    (r.onMediaAttaching = function (e) {
                      ;(this.media = e.media), this._cleanTracks()
                    }),
                    (r.onMediaDetaching = function () {
                      var e = this.captionsTracks
                      Object.keys(e).forEach(function (t) {
                        z(e[t]), delete e[t]
                      }),
                        (this.nonNativeCaptionsTracks = {})
                    }),
                    (r.onManifestLoading = function () {
                      ;(this.lastSn = -1),
                        (this.prevCC = -1),
                        (this.vttCCs = ke()),
                        this._cleanTracks(),
                        (this.tracks = []),
                        (this.captionsTracks = {}),
                        (this.nonNativeCaptionsTracks = {})
                    }),
                    (r._cleanTracks = function () {
                      var e = this.media
                      if (e) {
                        var t = e.textTracks
                        if (t) for (var r = 0; r < t.length; r++) z(t[r])
                      }
                    }),
                    (r.onManifestLoaded = function (e) {
                      var t = this
                      if (
                        ((this.textTracks = []),
                        (this.unparsedVttFrags = this.unparsedVttFrags || []),
                        (this.initPTS = []),
                        this.cea608Parser1 &&
                          this.cea608Parser2 &&
                          (this.cea608Parser1.reset(), this.cea608Parser2.reset()),
                        this.config.enableWebVTT)
                      ) {
                        var r = e.subtitles || [],
                          i = this.tracks && r && this.tracks.length === r.length
                        if (((this.tracks = e.subtitles || []), this.config.renderTextTracksNatively)) {
                          var a = this.media ? this.media.textTracks : []
                          this.tracks.forEach(function (e, r) {
                            var i
                            if (r < a.length) {
                              for (var n = null, s = 0; s < a.length; s++)
                                if (De(a[s], e)) {
                                  n = a[s]
                                  break
                                }
                              n && (i = n)
                            }
                            i || (i = t.createTextTrack("subtitles", e.name, e.lang)),
                              e.default
                                ? (i.mode = t.hls.subtitleDisplay ? "showing" : "hidden")
                                : (i.mode = "disabled"),
                              t.textTracks.push(i)
                          })
                        } else if (!i && this.tracks && this.tracks.length) {
                          var n = this.tracks.map(function (e) {
                            return { label: e.name, kind: e.type.toLowerCase(), default: e.default, subtitleTrack: e }
                          })
                          this.hls.trigger(Ze.default.NON_NATIVE_TEXT_TRACKS_FOUND, { tracks: n })
                        }
                      }
                      this.config.enableCEA708Captions &&
                        e.captions &&
                        e.captions.forEach(function (e) {
                          var r = /(?:CC|SERVICE)([1-4])/.exec(e.instreamId)
                          if (r) {
                            var i = "textTrack" + r[1],
                              a = t.captionsProperties[i]
                            a && ((a.label = e.name), e.lang && (a.languageCode = e.lang), (a.media = e))
                          }
                        })
                    }),
                    (r.onFragLoaded = function (e) {
                      var t = e.frag,
                        r = e.payload,
                        i = this.cea608Parser1,
                        a = this.cea608Parser2,
                        n = this.initPTS,
                        s = this.lastSn,
                        o = this.unparsedVttFrags
                      if ("main" === t.type) {
                        var l = t.sn
                        t.sn !== s + 1 && i && a && (i.reset(), a.reset()), (this.lastSn = l)
                      } else if ("subtitle" === t.type)
                        if (r.byteLength) {
                          if (!Object(Je.isFiniteNumber)(n[t.cc]))
                            return (
                              o.push(e),
                              void (
                                n.length &&
                                this.hls.trigger(Ze.default.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: t })
                              )
                            )
                          var u = t.decryptdata
                          ;(null != u && null != u.key && "AES-128" === u.method) || this._parseVTTs(t, r)
                        } else this.hls.trigger(Ze.default.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: t })
                    }),
                    (r._parseVTTs = function (e, t) {
                      var r = this,
                        i = this.hls,
                        a = this.prevCC,
                        n = this.textTracks,
                        s = this.vttCCs
                      s[e.cc] || ((s[e.cc] = { start: e.start, prevCC: a, new: !0 }), (this.prevCC = e.cc)),
                        ai.parse(
                          t,
                          this.initPTS[e.cc],
                          s,
                          e.cc,
                          function (t) {
                            if (r.config.renderTextTracksNatively) {
                              var a = n[e.level]
                              if ("disabled" === a.mode)
                                return void i.trigger(Ze.default.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: e })
                              t.forEach(function (e) {
                                if (!a.cues.getCueById(e.id))
                                  try {
                                    if ((a.addCue(e), !a.cues.getCueById(e.id)))
                                      throw new Error("addCue is failed for: " + e)
                                  } catch (r) {
                                    et.logger.debug("Failed occurred on adding cues: " + r)
                                    var t = new window.TextTrackCue(e.startTime, e.endTime, e.text)
                                    ;(t.id = e.id), a.addCue(t)
                                  }
                              })
                            } else {
                              var s = r.tracks[e.level].default ? "default" : "subtitles" + e.level
                              i.trigger(Ze.default.CUES_PARSED, { type: "subtitles", cues: t, track: s })
                            }
                            i.trigger(Ze.default.SUBTITLE_FRAG_PROCESSED, { success: !0, frag: e })
                          },
                          function (t) {
                            et.logger.log("Failed to parse VTT cue: " + t),
                              i.trigger(Ze.default.SUBTITLE_FRAG_PROCESSED, { success: !1, frag: e })
                          }
                        )
                    }),
                    (r.onFragDecrypted = function (e) {
                      var t = e.frag,
                        r = e.payload
                      if ("subtitle" === t.type) {
                        if (!Object(Je.isFiniteNumber)(this.initPTS[t.cc])) return void this.unparsedVttFrags.push(e)
                        this._parseVTTs(t, r)
                      }
                    }),
                    (r.onFragParsingUserdata = function (e) {
                      var t = this.cea608Parser1,
                        r = this.cea608Parser2
                      if (this.enabled && t && r)
                        for (var i = 0; i < e.samples.length; i++) {
                          var a = e.samples[i].bytes
                          if (a) {
                            var n = this.extractCea608Data(a)
                            t.addData(e.samples[i].pts, n[0]), r.addData(e.samples[i].pts, n[1])
                          }
                        }
                    }),
                    (r.extractCea608Data = function (e) {
                      for (var t = 31 & e[0], r = 2, i = [[], []], a = 0; a < t; a++) {
                        var n = e[r++],
                          s = 127 & e[r++],
                          o = 127 & e[r++],
                          l = 0 != (4 & n),
                          u = 3 & n
                        ;(0 === s && 0 === o) || (l && ((0 !== u && 1 !== u) || (i[u].push(s), i[u].push(o))))
                      }
                      return i
                    }),
                    t
                  )
                })(it),
                si = ni,
                oi = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.MEDIA_ATTACHED,
                          Ze.default.MEDIA_DETACHING,
                          Ze.default.MANIFEST_LOADED,
                          Ze.default.SUBTITLE_TRACK_LOADED
                        ) || this),
                      (r.tracks = []),
                      (r.trackId = -1),
                      (r.media = null),
                      (r.stopped = !0),
                      (r.subtitleDisplay = !0),
                      (r.queuedDefaultTrack = null),
                      r
                    )
                  }
                  Oe(t, e)
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      it.prototype.destroy.call(this)
                    }),
                    (r.onMediaAttached = function (e) {
                      var t = this
                      ;(this.media = e.media),
                        this.media &&
                          (Object(Je.isFiniteNumber)(this.queuedDefaultTrack) &&
                            ((this.subtitleTrack = this.queuedDefaultTrack), (this.queuedDefaultTrack = null)),
                          (this.trackChangeListener = this._onTextTracksChanged.bind(this)),
                          (this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks)),
                          this.useTextTrackPolling
                            ? (this.subtitlePollingInterval = setInterval(function () {
                                t.trackChangeListener()
                              }, 500))
                            : this.media.textTracks.addEventListener("change", this.trackChangeListener))
                    }),
                    (r.onMediaDetaching = function () {
                      if (this.media) {
                        this.useTextTrackPolling
                          ? clearInterval(this.subtitlePollingInterval)
                          : this.media.textTracks.removeEventListener("change", this.trackChangeListener),
                          Object(Je.isFiniteNumber)(this.subtitleTrack) &&
                            (this.queuedDefaultTrack = this.subtitleTrack)
                        Ce(this.media.textTracks).forEach(function (e) {
                          z(e)
                        }),
                          (this.subtitleTrack = -1),
                          (this.media = null)
                      }
                    }),
                    (r.onManifestLoaded = function (e) {
                      var t = this,
                        r = e.subtitles || []
                      ;(this.tracks = r),
                        this.hls.trigger(Ze.default.SUBTITLE_TRACKS_UPDATED, { subtitleTracks: r }),
                        r.forEach(function (e) {
                          e.default && (t.media ? (t.subtitleTrack = e.id) : (t.queuedDefaultTrack = e.id))
                        })
                    }),
                    (r.onSubtitleTrackLoaded = function (e) {
                      var t = this,
                        r = e.id,
                        i = e.details,
                        a = this.trackId,
                        n = this.tracks,
                        s = n[a]
                      if (r >= n.length || r !== a || !s || this.stopped) return void this._clearReloadTimer()
                      if ((et.logger.log("subtitle track " + r + " loaded"), i.live)) {
                        var o = D(s.details, i, e.stats.trequest)
                        et.logger.log("Reloading live subtitle playlist in " + o + "ms"),
                          (this.timer = setTimeout(function () {
                            t._loadCurrentTrack()
                          }, o))
                      } else this._clearReloadTimer()
                    }),
                    (r.startLoad = function () {
                      ;(this.stopped = !1), this._loadCurrentTrack()
                    }),
                    (r.stopLoad = function () {
                      ;(this.stopped = !0), this._clearReloadTimer()
                    }),
                    (r._clearReloadTimer = function () {
                      this.timer && (clearTimeout(this.timer), (this.timer = null))
                    }),
                    (r._loadCurrentTrack = function () {
                      var e = this.trackId,
                        t = this.tracks,
                        r = this.hls,
                        i = t[e]
                      e < 0 ||
                        !i ||
                        (i.details && !i.details.live) ||
                        (et.logger.log("Loading subtitle track " + e),
                        r.trigger(Ze.default.SUBTITLE_TRACK_LOADING, { url: i.url, id: e }))
                    }),
                    (r._toggleTrackModes = function (e) {
                      var t = this.media,
                        r = this.subtitleDisplay,
                        i = this.trackId
                      if (t) {
                        var a = Ce(t.textTracks)
                        if (-1 === e)
                          [].slice.call(a).forEach(function (e) {
                            e.mode = "disabled"
                          })
                        else {
                          var n = a[i]
                          n && (n.mode = "disabled")
                        }
                        var s = a[e]
                        s && (s.mode = r ? "showing" : "hidden")
                      }
                    }),
                    (r._setSubtitleTrackInternal = function (e) {
                      var t = this.hls,
                        r = this.tracks
                      !Object(Je.isFiniteNumber)(e) ||
                        e < -1 ||
                        e >= r.length ||
                        ((this.trackId = e),
                        et.logger.log("Switching to subtitle track " + e),
                        t.trigger(Ze.default.SUBTITLE_TRACK_SWITCH, { id: e }),
                        this._loadCurrentTrack())
                    }),
                    (r._onTextTracksChanged = function () {
                      if (this.media && this.hls.config.renderTextTracksNatively) {
                        for (var e = -1, t = Ce(this.media.textTracks), r = 0; r < t.length; r++)
                          if ("hidden" === t[r].mode) e = r
                          else if ("showing" === t[r].mode) {
                            e = r
                            break
                          }
                        this.subtitleTrack = e
                      }
                    }),
                    Ie(t, [
                      {
                        key: "subtitleTracks",
                        get: function () {
                          return this.tracks
                        },
                      },
                      {
                        key: "subtitleTrack",
                        get: function () {
                          return this.trackId
                        },
                        set: function (e) {
                          this.trackId !== e && (this._toggleTrackModes(e), this._setSubtitleTrackInternal(e))
                        },
                      },
                    ]),
                    t
                  )
                })(it),
                li = oi,
                ui = r("./src/crypt/decrypter.js"),
                di = window,
                ci = di.performance,
                fi = (function (e) {
                  function t(t, r) {
                    var i
                    return (
                      (i =
                        e.call(
                          this,
                          t,
                          Ze.default.MEDIA_ATTACHED,
                          Ze.default.MEDIA_DETACHING,
                          Ze.default.ERROR,
                          Ze.default.KEY_LOADED,
                          Ze.default.FRAG_LOADED,
                          Ze.default.SUBTITLE_TRACKS_UPDATED,
                          Ze.default.SUBTITLE_TRACK_SWITCH,
                          Ze.default.SUBTITLE_TRACK_LOADED,
                          Ze.default.SUBTITLE_FRAG_PROCESSED,
                          Ze.default.LEVEL_UPDATED
                        ) || this),
                      (i.fragmentTracker = r),
                      (i.config = t.config),
                      (i.state = Xt.STOPPED),
                      (i.tracks = []),
                      (i.tracksBuffered = []),
                      (i.currentTrackId = -1),
                      (i.decrypter = new ui.default(t, t.config)),
                      (i.lastAVStart = 0),
                      (i._onMediaSeeking = i.onMediaSeeking.bind(Pe(i))),
                      i
                    )
                  }
                  xe(t, e)
                  var r = t.prototype
                  return (
                    (r.startLoad = function () {
                      this.stopLoad(), (this.state = Xt.IDLE)
                      var e = this.tracks[this.currentTrackId]
                      e && e.details && (this.setInterval(500), this.tick())
                    }),
                    (r.onSubtitleFragProcessed = function (e) {
                      var t = e.frag,
                        r = e.success
                      if (((this.fragPrevious = t), (this.state = Xt.IDLE), r)) {
                        var i = this.tracksBuffered[this.currentTrackId]
                        if (i) {
                          for (var a, n = t.start, s = 0; s < i.length; s++)
                            if (n >= i[s].start && n <= i[s].end) {
                              a = i[s]
                              break
                            }
                          var o = t.start + t.duration
                          a ? (a.end = o) : ((a = { start: n, end: o }), i.push(a))
                        }
                      }
                    }),
                    (r.onMediaAttached = function (e) {
                      var t = e.media
                      ;(this.media = t), t.addEventListener("seeking", this._onMediaSeeking), (this.state = Xt.IDLE)
                    }),
                    (r.onMediaDetaching = function () {
                      var e = this
                      this.media &&
                        (this.media.removeEventListener("seeking", this._onMediaSeeking),
                        this.fragmentTracker.removeAllFragments(),
                        (this.currentTrackId = -1),
                        this.tracks.forEach(function (t) {
                          e.tracksBuffered[t.id] = []
                        }),
                        (this.media = null),
                        (this.state = Xt.STOPPED))
                    }),
                    (r.onError = function (e) {
                      var t = e.frag
                      t &&
                        "subtitle" === t.type &&
                        (this.fragCurrent && this.fragCurrent.loader && this.fragCurrent.loader.abort(),
                        (this.state = Xt.IDLE))
                    }),
                    (r.onSubtitleTracksUpdated = function (e) {
                      var t = this
                      et.logger.log("subtitle tracks updated"),
                        (this.tracksBuffered = []),
                        (this.tracks = e.subtitleTracks),
                        this.tracks.forEach(function (e) {
                          t.tracksBuffered[e.id] = []
                        })
                    }),
                    (r.onSubtitleTrackSwitch = function (e) {
                      if (
                        ((this.currentTrackId = e.id),
                        !this.tracks || !this.tracks.length || -1 === this.currentTrackId)
                      )
                        return void this.clearInterval()
                      var t = this.tracks[this.currentTrackId]
                      t && t.details && this.setInterval(500)
                    }),
                    (r.onSubtitleTrackLoaded = function (e) {
                      var t = e.id,
                        r = e.details,
                        i = this.currentTrackId,
                        a = this.tracks,
                        n = a[i]
                      t >= a.length ||
                        t !== i ||
                        !n ||
                        (r.live && _(n.details, r, this.lastAVStart), (n.details = r), this.setInterval(500))
                    }),
                    (r.onKeyLoaded = function () {
                      this.state === Xt.KEY_LOADING && (this.state = Xt.IDLE)
                    }),
                    (r.onFragLoaded = function (e) {
                      var t = this.fragCurrent,
                        r = e.frag.decryptdata,
                        i = e.frag,
                        a = this.hls
                      if (
                        this.state === Xt.FRAG_LOADING &&
                        t &&
                        "subtitle" === e.frag.type &&
                        t.sn === e.frag.sn &&
                        e.payload.byteLength > 0 &&
                        r &&
                        r.key &&
                        "AES-128" === r.method
                      ) {
                        var n = ci.now()
                        this.decrypter.decrypt(e.payload, r.key.buffer, r.iv.buffer, function (e) {
                          var t = ci.now()
                          a.trigger(Ze.default.FRAG_DECRYPTED, {
                            frag: i,
                            payload: e,
                            stats: { tstart: n, tdecrypt: t },
                          })
                        })
                      }
                    }),
                    (r.onLevelUpdated = function (e) {
                      var t = e.details,
                        r = t.fragments
                      this.lastAVStart = r.length ? r[0].start : 0
                    }),
                    (r.doTick = function () {
                      if (!this.media) return void (this.state = Xt.IDLE)
                      switch (this.state) {
                        case Xt.IDLE:
                          var e = this.config,
                            t = this.currentTrackId,
                            r = this.fragmentTracker,
                            i = this.media,
                            a = this.tracks
                          if (!a || !a[t] || !a[t].details) break
                          var n = e.maxBufferHole,
                            s = e.maxFragLookUpTolerance,
                            o = Math.min(e.maxBufferLength, e.maxMaxBufferLength),
                            l = xt.bufferedInfo(this._getBuffered(), i.currentTime, n),
                            u = l.end,
                            d = l.len,
                            c = a[t].details,
                            f = c.fragments,
                            h = f.length,
                            g = f[h - 1].start + f[h - 1].duration
                          if (d > o) return
                          var p,
                            v = this.fragPrevious
                          u < g
                            ? (v && c.hasProgramDateTime && (p = F(f, v.endProgramDateTime, s)),
                              p || (p = M(v, f, u, s)))
                            : (p = f[h - 1]),
                            p && p.encrypted
                              ? (et.logger.log("Loading key for " + p.sn),
                                (this.state = Xt.KEY_LOADING),
                                this.hls.trigger(Ze.default.KEY_LOADING, { frag: p }))
                              : p &&
                                r.getState(p) === It.NOT_LOADED &&
                                ((this.fragCurrent = p),
                                (this.state = Xt.FRAG_LOADING),
                                this.hls.trigger(Ze.default.FRAG_LOADING, { frag: p }))
                      }
                    }),
                    (r.stopLoad = function () {
                      ;(this.lastAVStart = 0), (this.fragPrevious = null), e.prototype.stopLoad.call(this)
                    }),
                    (r._getBuffered = function () {
                      return this.tracksBuffered[this.currentTrackId] || []
                    }),
                    (r.onMediaSeeking = function () {
                      if (this.fragCurrent) {
                        var e = this.media ? this.media.currentTime : 0,
                          t = this.config.maxFragLookUpTolerance,
                          r = this.fragCurrent.start - t,
                          i = this.fragCurrent.start + this.fragCurrent.duration + t
                        ;(e < r || e > i) &&
                          (this.fragCurrent.loader && this.fragCurrent.loader.abort(),
                          this.fragmentTracker.removeFragment(this.fragCurrent),
                          (this.fragCurrent = null),
                          (this.fragPrevious = null),
                          (this.state = Xt.IDLE),
                          this.tick())
                      }
                    }),
                    t
                  )
                })(zt)
              !(function (e) {
                ;(e.WIDEVINE = "com.widevine.alpha"), (e.PLAYREADY = "com.microsoft.playready")
              })(Kr || (Kr = {}))
              var hi = (function () {
                  return "undefined" != typeof window &&
                    window.navigator &&
                    window.navigator.requestMediaKeySystemAccess
                    ? window.navigator.requestMediaKeySystemAccess.bind(window.navigator)
                    : null
                })(),
                gi = function (e, t, r) {
                  var i = { audioCapabilities: [], videoCapabilities: [] }
                  return (
                    e.forEach(function (e) {
                      i.audioCapabilities.push({
                        contentType: 'audio/mp4; codecs="' + e + '"',
                        robustness: r.audioRobustness || "",
                      })
                    }),
                    t.forEach(function (e) {
                      i.videoCapabilities.push({
                        contentType: 'video/mp4; codecs="' + e + '"',
                        robustness: r.videoRobustness || "",
                      })
                    }),
                    [i]
                  )
                },
                pi = function (e, t, r, i) {
                  switch (e) {
                    case Kr.WIDEVINE:
                      return gi(t, r, i)
                    default:
                      throw new Error("Unknown key-system: " + e)
                  }
                },
                vi = (function (e) {
                  function t(t) {
                    var r
                    return (
                      (r =
                        e.call(
                          this,
                          t,
                          Ze.default.MEDIA_ATTACHED,
                          Ze.default.MEDIA_DETACHED,
                          Ze.default.MANIFEST_PARSED
                        ) || this),
                      (r._widevineLicenseUrl = void 0),
                      (r._licenseXhrSetup = void 0),
                      (r._emeEnabled = void 0),
                      (r._requestMediaKeySystemAccess = void 0),
                      (r._drmSystemOptions = void 0),
                      (r._config = void 0),
                      (r._mediaKeysList = []),
                      (r._media = null),
                      (r._hasSetMediaKeys = !1),
                      (r._requestLicenseFailureCount = 0),
                      (r.mediaKeysPromise = null),
                      (r._onMediaEncrypted = function (e) {
                        if (
                          (et.logger.log('Media is encrypted using "' + e.initDataType + '" init data type'),
                          !r.mediaKeysPromise)
                        )
                          return (
                            et.logger.error(
                              "Fatal: Media is encrypted but no CDM access or no keys have been requested"
                            ),
                            void r.hls.trigger(Ze.default.ERROR, {
                              type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                              details: $e.ErrorDetails.KEY_SYSTEM_NO_KEYS,
                              fatal: !0,
                            })
                          )
                        var t = function (t) {
                          r._media &&
                            (r._attemptSetMediaKeys(t),
                            r._generateRequestWithPreferredKeySession(e.initDataType, e.initData))
                        }
                        r.mediaKeysPromise.then(t).catch(t)
                      }),
                      (r._config = t.config),
                      (r._widevineLicenseUrl = r._config.widevineLicenseUrl),
                      (r._licenseXhrSetup = r._config.licenseXhrSetup),
                      (r._emeEnabled = r._config.emeEnabled),
                      (r._requestMediaKeySystemAccess = r._config.requestMediaKeySystemAccessFunc),
                      (r._drmSystemOptions = t.config.drmSystemOptions),
                      r
                    )
                  }
                  Ne(t, e)
                  var r = t.prototype
                  return (
                    (r.getLicenseServerUrl = function (e) {
                      switch (e) {
                        case Kr.WIDEVINE:
                          if (!this._widevineLicenseUrl) break
                          return this._widevineLicenseUrl
                      }
                      throw new Error('no license server URL configured for key-system "' + e + '"')
                    }),
                    (r._attemptKeySystemAccess = function (e, t, r) {
                      var i = this,
                        a = pi(e, t, r, this._drmSystemOptions)
                      et.logger.log("Requesting encrypted media key-system access")
                      var n = this.requestMediaKeySystemAccess(e, a)
                      ;(this.mediaKeysPromise = n.then(function (t) {
                        return i._onMediaKeySystemAccessObtained(e, t)
                      })),
                        n.catch(function (t) {
                          et.logger.error('Failed to obtain key-system "' + e + '" access:', t)
                        })
                    }),
                    (r._onMediaKeySystemAccessObtained = function (e, t) {
                      var r = this
                      et.logger.log('Access for key-system "' + e + '" obtained')
                      var i = { mediaKeysSessionInitialized: !1, mediaKeySystemAccess: t, mediaKeySystemDomain: e }
                      this._mediaKeysList.push(i)
                      var a = Promise.resolve()
                        .then(function () {
                          return t.createMediaKeys()
                        })
                        .then(function (t) {
                          return (
                            (i.mediaKeys = t),
                            et.logger.log('Media-keys created for key-system "' + e + '"'),
                            r._onMediaKeysCreated(),
                            t
                          )
                        })
                      return (
                        a.catch(function (e) {
                          et.logger.error("Failed to create media-keys:", e)
                        }),
                        a
                      )
                    }),
                    (r._onMediaKeysCreated = function () {
                      var e = this
                      this._mediaKeysList.forEach(function (t) {
                        t.mediaKeysSession ||
                          ((t.mediaKeysSession = t.mediaKeys.createSession()),
                          e._onNewMediaKeySession(t.mediaKeysSession))
                      })
                    }),
                    (r._onNewMediaKeySession = function (e) {
                      var t = this
                      et.logger.log("New key-system session " + e.sessionId),
                        e.addEventListener(
                          "message",
                          function (r) {
                            t._onKeySessionMessage(e, r.message)
                          },
                          !1
                        )
                    }),
                    (r._onKeySessionMessage = function (e, t) {
                      et.logger.log("Got EME message event, creating license request"),
                        this._requestLicense(t, function (t) {
                          et.logger.log(
                            "Received license data (length: " + (t ? t.byteLength : t) + "), updating key-session"
                          ),
                            e.update(t)
                        })
                    }),
                    (r._attemptSetMediaKeys = function (e) {
                      if (!this._media)
                        throw new Error("Attempted to set mediaKeys without first attaching a media element")
                      if (!this._hasSetMediaKeys) {
                        var t = this._mediaKeysList[0]
                        if (!t || !t.mediaKeys)
                          return (
                            et.logger.error(
                              "Fatal: Media is encrypted but no CDM access or no keys have been obtained yet"
                            ),
                            void this.hls.trigger(Ze.default.ERROR, {
                              type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                              details: $e.ErrorDetails.KEY_SYSTEM_NO_KEYS,
                              fatal: !0,
                            })
                          )
                        et.logger.log("Setting keys for encrypted media"),
                          this._media.setMediaKeys(t.mediaKeys),
                          (this._hasSetMediaKeys = !0)
                      }
                    }),
                    (r._generateRequestWithPreferredKeySession = function (e, t) {
                      var r = this,
                        i = this._mediaKeysList[0]
                      if (!i)
                        return (
                          et.logger.error(
                            "Fatal: Media is encrypted but not any key-system access has been obtained yet"
                          ),
                          void this.hls.trigger(Ze.default.ERROR, {
                            type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                            details: $e.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                            fatal: !0,
                          })
                        )
                      if (i.mediaKeysSessionInitialized)
                        return void et.logger.warn("Key-Session already initialized but requested again")
                      var a = i.mediaKeysSession
                      return a
                        ? t
                          ? (et.logger.log('Generating key-session request for "' + e + '" init data type'),
                            (i.mediaKeysSessionInitialized = !0),
                            void a
                              .generateRequest(e, t)
                              .then(function () {
                                et.logger.debug("Key-session generation succeeded")
                              })
                              .catch(function (e) {
                                et.logger.error("Error generating key-session request:", e),
                                  r.hls.trigger(Ze.default.ERROR, {
                                    type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                                    details: $e.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                                    fatal: !1,
                                  })
                              }))
                          : (et.logger.warn("Fatal: initData required for generating a key session is null"),
                            void this.hls.trigger(Ze.default.ERROR, {
                              type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                              details: $e.ErrorDetails.KEY_SYSTEM_NO_INIT_DATA,
                              fatal: !0,
                            }))
                        : (et.logger.error("Fatal: Media is encrypted but no key-session existing"),
                          void this.hls.trigger(Ze.default.ERROR, {
                            type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                            details: $e.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                            fatal: !0,
                          }))
                    }),
                    (r._createLicenseXhr = function (e, t, r) {
                      var i = new XMLHttpRequest(),
                        a = this._licenseXhrSetup
                      try {
                        if (a)
                          try {
                            a(i, e)
                          } catch (t) {
                            i.open("POST", e, !0), a(i, e)
                          }
                        i.readyState || i.open("POST", e, !0)
                      } catch (e) {
                        throw new Error("issue setting up KeySystem license XHR " + e)
                      }
                      return (
                        (i.responseType = "arraybuffer"),
                        (i.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(this, i, e, t, r)),
                        i
                      )
                    }),
                    (r._onLicenseRequestReadyStageChange = function (e, t, r, i) {
                      switch (e.readyState) {
                        case 4:
                          if (200 === e.status)
                            (this._requestLicenseFailureCount = 0),
                              et.logger.log("License request succeeded"),
                              "arraybuffer" !== e.responseType &&
                                et.logger.warn(
                                  "xhr response type was not set to the expected arraybuffer for license request"
                                ),
                              i(e.response)
                          else {
                            if (
                              (et.logger.error(
                                "License Request XHR failed (" +
                                  t +
                                  "). Status: " +
                                  e.status +
                                  " (" +
                                  e.statusText +
                                  ")"
                              ),
                              ++this._requestLicenseFailureCount > 3)
                            )
                              return void this.hls.trigger(Ze.default.ERROR, {
                                type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                                details: $e.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                fatal: !0,
                              })
                            var a = 3 - this._requestLicenseFailureCount + 1
                            et.logger.warn("Retrying license request, " + a + " attempts left"),
                              this._requestLicense(r, i)
                          }
                      }
                    }),
                    (r._generateLicenseRequestChallenge = function (e, t) {
                      switch (e.mediaKeySystemDomain) {
                        case Kr.WIDEVINE:
                          return t
                      }
                      throw new Error("unsupported key-system: " + e.mediaKeySystemDomain)
                    }),
                    (r._requestLicense = function (e, t) {
                      et.logger.log("Requesting content license for key-system")
                      var r = this._mediaKeysList[0]
                      if (!r)
                        return (
                          et.logger.error(
                            "Fatal error: Media is encrypted but no key-system access has been obtained yet"
                          ),
                          void this.hls.trigger(Ze.default.ERROR, {
                            type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                            details: $e.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                            fatal: !0,
                          })
                        )
                      try {
                        var i = this.getLicenseServerUrl(r.mediaKeySystemDomain),
                          a = this._createLicenseXhr(i, e, t)
                        et.logger.log("Sending license request to URL: " + i)
                        var n = this._generateLicenseRequestChallenge(r, e)
                        a.send(n)
                      } catch (e) {
                        et.logger.error("Failure requesting DRM license: " + e),
                          this.hls.trigger(Ze.default.ERROR, {
                            type: $e.ErrorTypes.KEY_SYSTEM_ERROR,
                            details: $e.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                            fatal: !0,
                          })
                      }
                    }),
                    (r.onMediaAttached = function (e) {
                      if (this._emeEnabled) {
                        var t = e.media
                        ;(this._media = t), t.addEventListener("encrypted", this._onMediaEncrypted)
                      }
                    }),
                    (r.onMediaDetached = function () {
                      var e = this._media,
                        t = this._mediaKeysList
                      e &&
                        (e.removeEventListener("encrypted", this._onMediaEncrypted),
                        (this._media = null),
                        (this._mediaKeysList = []),
                        Promise.all(
                          t.map(function (e) {
                            if (e.mediaKeysSession) return e.mediaKeysSession.close().catch(function () {})
                          })
                        )
                          .then(function () {
                            return e.setMediaKeys(null)
                          })
                          .catch(function () {}))
                    }),
                    (r.onManifestParsed = function (e) {
                      if (this._emeEnabled) {
                        var t = e.levels.map(function (e) {
                            return e.audioCodec
                          }),
                          r = e.levels.map(function (e) {
                            return e.videoCodec
                          })
                        this._attemptKeySystemAccess(Kr.WIDEVINE, t, r)
                      }
                    }),
                    Me(t, [
                      {
                        key: "requestMediaKeySystemAccess",
                        get: function () {
                          if (!this._requestMediaKeySystemAccess)
                            throw new Error("No requestMediaKeySystemAccess function configured")
                          return this._requestMediaKeySystemAccess
                        },
                      },
                    ]),
                    t
                  )
                })(it),
                mi = vi,
                yi = Be(
                  Be(
                    {
                      autoStartLoad: !0,
                      startPosition: -1,
                      defaultAudioCodec: void 0,
                      debug: !1,
                      capLevelOnFPSDrop: !1,
                      capLevelToPlayerSize: !1,
                      initialLiveManifestSize: 1,
                      maxBufferLength: 30,
                      maxBufferSize: 6e7,
                      maxBufferHole: 0.5,
                      lowBufferWatchdogPeriod: 0.5,
                      highBufferWatchdogPeriod: 3,
                      nudgeOffset: 0.1,
                      nudgeMaxRetry: 3,
                      maxFragLookUpTolerance: 0.25,
                      liveSyncDurationCount: 3,
                      liveMaxLatencyDurationCount: 1 / 0,
                      liveSyncDuration: void 0,
                      liveMaxLatencyDuration: void 0,
                      liveDurationInfinity: !1,
                      liveBackBufferLength: 1 / 0,
                      maxMaxBufferLength: 600,
                      enableWorker: !0,
                      enableSoftwareAES: !0,
                      manifestLoadingTimeOut: 1e4,
                      manifestLoadingMaxRetry: 1,
                      manifestLoadingRetryDelay: 1e3,
                      manifestLoadingMaxRetryTimeout: 64e3,
                      startLevel: void 0,
                      levelLoadingTimeOut: 1e4,
                      levelLoadingMaxRetry: 4,
                      levelLoadingRetryDelay: 1e3,
                      levelLoadingMaxRetryTimeout: 64e3,
                      fragLoadingTimeOut: 2e4,
                      fragLoadingMaxRetry: 6,
                      fragLoadingRetryDelay: 1e3,
                      fragLoadingMaxRetryTimeout: 64e3,
                      startFragPrefetch: !1,
                      fpsDroppedMonitoringPeriod: 5e3,
                      fpsDroppedMonitoringThreshold: 0.2,
                      appendErrorMaxRetry: 3,
                      loader: Tr,
                      fLoader: void 0,
                      pLoader: void 0,
                      xhrSetup: void 0,
                      licenseXhrSetup: void 0,
                      abrController: ur,
                      bufferController: fr,
                      capLevelController: gr,
                      fpsController: yr,
                      stretchShortVideoTrack: !1,
                      maxAudioFramesDrift: 1,
                      forceKeyFrameOnDiscontinuity: !0,
                      abrEwmaFastLive: 3,
                      abrEwmaSlowLive: 9,
                      abrEwmaFastVoD: 3,
                      abrEwmaSlowVoD: 9,
                      abrEwmaDefaultEstimate: 5e5,
                      abrBandWidthFactor: 0.95,
                      abrBandWidthUpFactor: 0.7,
                      abrMaxWithRealBitrate: !1,
                      maxStarvationDelay: 4,
                      maxLoadingDelay: 4,
                      minAutoBitrate: 0,
                      emeEnabled: !1,
                      widevineLicenseUrl: void 0,
                      drmSystemOptions: {},
                      requestMediaKeySystemAccessFunc: hi,
                      testBandwidth: !0,
                    },
                    (function () {
                      return {
                        cueHandler: Xe,
                        enableCEA708Captions: !0,
                        enableWebVTT: !0,
                        captionsTextTrack1Label: "English",
                        captionsTextTrack1LanguageCode: "en",
                        captionsTextTrack2Label: "Spanish",
                        captionsTextTrack2LanguageCode: "es",
                        captionsTextTrack3Label: "Unknown CC",
                        captionsTextTrack3LanguageCode: "",
                        captionsTextTrack4Label: "Unknown CC",
                        captionsTextTrack4LanguageCode: "",
                        renderTextTracksNatively: !0,
                      }
                    })()
                  ),
                  {},
                  {
                    subtitleStreamController: fi,
                    subtitleTrackController: li,
                    timelineController: si,
                    audioStreamController: Dr,
                    audioTrackController: br,
                    emeController: mi,
                  }
                ),
                Ei = (function (e) {
                  function t(r) {
                    var i
                    void 0 === r && (r = {}),
                      (i = e.call(this) || this),
                      (i.config = void 0),
                      (i._autoLevelCapping = void 0),
                      (i.abrController = void 0),
                      (i.capLevelController = void 0),
                      (i.levelController = void 0),
                      (i.streamController = void 0),
                      (i.networkControllers = void 0),
                      (i.audioTrackController = void 0),
                      (i.subtitleTrackController = void 0),
                      (i.emeController = void 0),
                      (i.coreComponents = void 0),
                      (i.media = null),
                      (i.url = null)
                    var a = t.DefaultConfig
                    if (
                      (r.liveSyncDurationCount || r.liveMaxLatencyDurationCount) &&
                      (r.liveSyncDuration || r.liveMaxLatencyDuration)
                    )
                      throw new Error(
                        "Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration"
                      )
                    i.config = Ke(Ke({}, a), r)
                    var n = Ve(i),
                      s = n.config
                    if (
                      void 0 !== s.liveMaxLatencyDurationCount &&
                      s.liveMaxLatencyDurationCount <= s.liveSyncDurationCount
                    )
                      throw new Error(
                        'Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"'
                      )
                    if (
                      void 0 !== s.liveMaxLatencyDuration &&
                      (void 0 === s.liveSyncDuration || s.liveMaxLatencyDuration <= s.liveSyncDuration)
                    )
                      throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"')
                    Object(et.enableLogs)(s.debug), (i._autoLevelCapping = -1)
                    var o = (i.abrController = new s.abrController(Ve(i))),
                      l = new s.bufferController(Ve(i)),
                      u = (i.capLevelController = new s.capLevelController(Ve(i))),
                      d = new s.fpsController(Ve(i)),
                      c = new Rt(Ve(i)),
                      f = new Lt(Ve(i)),
                      h = new wt(Ve(i)),
                      g = new tr(Ve(i)),
                      p = (i.levelController = new Jt(Ve(i))),
                      v = new Ot(Ve(i)),
                      m = (i.streamController = new $t(Ve(i), v)),
                      y = [p, m],
                      E = s.audioStreamController
                    E && y.push(new E(Ve(i), v)), (i.networkControllers = y)
                    var T = [c, f, h, o, l, u, d, g, v]
                    if ((E = s.audioTrackController)) {
                      var S = new E(Ve(i))
                      ;(i.audioTrackController = S), T.push(S)
                    }
                    if ((E = s.subtitleTrackController)) {
                      var b = new E(Ve(i))
                      ;(i.subtitleTrackController = b), y.push(b)
                    }
                    if ((E = s.emeController)) {
                      var _ = new E(Ve(i))
                      ;(i.emeController = _), T.push(_)
                    }
                    return (
                      (E = s.subtitleStreamController),
                      E && y.push(new E(Ve(i), v)),
                      (E = s.timelineController),
                      E && T.push(new E(Ve(i))),
                      (i.coreComponents = T),
                      i
                    )
                  }
                  qe(t, e),
                    (t.isSupported = function () {
                      return J()
                    }),
                    We(t, null, [
                      {
                        key: "version",
                        get: function () {
                          return "0.14.17"
                        },
                      },
                      {
                        key: "Events",
                        get: function () {
                          return Ze.default
                        },
                      },
                      {
                        key: "ErrorTypes",
                        get: function () {
                          return $e.ErrorTypes
                        },
                      },
                      {
                        key: "ErrorDetails",
                        get: function () {
                          return $e.ErrorDetails
                        },
                      },
                      {
                        key: "DefaultConfig",
                        get: function () {
                          return t.defaultConfig ? t.defaultConfig : yi
                        },
                        set: function (e) {
                          t.defaultConfig = e
                        },
                      },
                    ])
                  var r = t.prototype
                  return (
                    (r.destroy = function () {
                      et.logger.log("destroy"),
                        this.trigger(Ze.default.DESTROYING),
                        this.detachMedia(),
                        this.coreComponents.concat(this.networkControllers).forEach(function (e) {
                          e.destroy()
                        }),
                        (this.url = null),
                        this.removeAllListeners(),
                        (this._autoLevelCapping = -1)
                    }),
                    (r.attachMedia = function (e) {
                      et.logger.log("attachMedia"),
                        (this.media = e),
                        this.trigger(Ze.default.MEDIA_ATTACHING, { media: e })
                    }),
                    (r.detachMedia = function () {
                      et.logger.log("detachMedia"), this.trigger(Ze.default.MEDIA_DETACHING), (this.media = null)
                    }),
                    (r.loadSource = function (e) {
                      ;(e = Qe.buildAbsoluteURL(window.location.href, e, { alwaysNormalize: !0 })),
                        et.logger.log("loadSource:" + e),
                        (this.url = e),
                        this.trigger(Ze.default.MANIFEST_LOADING, { url: e })
                    }),
                    (r.startLoad = function (e) {
                      void 0 === e && (e = -1),
                        et.logger.log("startLoad(" + e + ")"),
                        this.networkControllers.forEach(function (t) {
                          t.startLoad(e)
                        })
                    }),
                    (r.stopLoad = function () {
                      et.logger.log("stopLoad"),
                        this.networkControllers.forEach(function (e) {
                          e.stopLoad()
                        })
                    }),
                    (r.swapAudioCodec = function () {
                      et.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec()
                    }),
                    (r.recoverMediaError = function () {
                      et.logger.log("recoverMediaError")
                      var e = this.media
                      this.detachMedia(), e && this.attachMedia(e)
                    }),
                    (r.removeLevel = function (e, t) {
                      void 0 === t && (t = 0), this.levelController.removeLevel(e, t)
                    }),
                    We(t, [
                      {
                        key: "levels",
                        get: function () {
                          return this.levelController.levels
                        },
                      },
                      {
                        key: "currentLevel",
                        get: function () {
                          return this.streamController.currentLevel
                        },
                        set: function (e) {
                          et.logger.log("set currentLevel:" + e),
                            (this.loadLevel = e),
                            this.streamController.immediateLevelSwitch()
                        },
                      },
                      {
                        key: "nextLevel",
                        get: function () {
                          return this.streamController.nextLevel
                        },
                        set: function (e) {
                          et.logger.log("set nextLevel:" + e),
                            (this.levelController.manualLevel = e),
                            this.streamController.nextLevelSwitch()
                        },
                      },
                      {
                        key: "loadLevel",
                        get: function () {
                          return this.levelController.level
                        },
                        set: function (e) {
                          et.logger.log("set loadLevel:" + e), (this.levelController.manualLevel = e)
                        },
                      },
                      {
                        key: "nextLoadLevel",
                        get: function () {
                          return this.levelController.nextLoadLevel
                        },
                        set: function (e) {
                          this.levelController.nextLoadLevel = e
                        },
                      },
                      {
                        key: "firstLevel",
                        get: function () {
                          return Math.max(this.levelController.firstLevel, this.minAutoLevel)
                        },
                        set: function (e) {
                          et.logger.log("set firstLevel:" + e), (this.levelController.firstLevel = e)
                        },
                      },
                      {
                        key: "startLevel",
                        get: function () {
                          return this.levelController.startLevel
                        },
                        set: function (e) {
                          et.logger.log("set startLevel:" + e),
                            -1 !== e && (e = Math.max(e, this.minAutoLevel)),
                            (this.levelController.startLevel = e)
                        },
                      },
                      {
                        key: "capLevelToPlayerSize",
                        set: function (e) {
                          var t = !!e
                          t !== this.config.capLevelToPlayerSize &&
                            (t
                              ? this.capLevelController.startCapping()
                              : (this.capLevelController.stopCapping(),
                                (this.autoLevelCapping = -1),
                                this.streamController.nextLevelSwitch()),
                            (this.config.capLevelToPlayerSize = t))
                        },
                      },
                      {
                        key: "autoLevelCapping",
                        get: function () {
                          return this._autoLevelCapping
                        },
                        set: function (e) {
                          et.logger.log("set autoLevelCapping:" + e), (this._autoLevelCapping = e)
                        },
                      },
                      {
                        key: "bandwidthEstimate",
                        get: function () {
                          var e = this.abrController._bwEstimator
                          return e ? e.getEstimate() : NaN
                        },
                      },
                      {
                        key: "autoLevelEnabled",
                        get: function () {
                          return -1 === this.levelController.manualLevel
                        },
                      },
                      {
                        key: "manualLevel",
                        get: function () {
                          return this.levelController.manualLevel
                        },
                      },
                      {
                        key: "minAutoLevel",
                        get: function () {
                          for (
                            var e = this.levels, t = this.config.minAutoBitrate, r = e ? e.length : 0, i = 0;
                            i < r;
                            i++
                          ) {
                            if ((e[i].realBitrate ? Math.max(e[i].realBitrate, e[i].bitrate) : e[i].bitrate) > t)
                              return i
                          }
                          return 0
                        },
                      },
                      {
                        key: "maxAutoLevel",
                        get: function () {
                          var e = this.levels,
                            t = this.autoLevelCapping
                          return -1 === t && e && e.length ? e.length - 1 : t
                        },
                      },
                      {
                        key: "nextAutoLevel",
                        get: function () {
                          return Math.min(
                            Math.max(this.abrController.nextAutoLevel, this.minAutoLevel),
                            this.maxAutoLevel
                          )
                        },
                        set: function (e) {
                          this.abrController.nextAutoLevel = Math.max(this.minAutoLevel, e)
                        },
                      },
                      {
                        key: "audioTracks",
                        get: function () {
                          var e = this.audioTrackController
                          return e ? e.audioTracks : []
                        },
                      },
                      {
                        key: "audioTrack",
                        get: function () {
                          var e = this.audioTrackController
                          return e ? e.audioTrack : -1
                        },
                        set: function (e) {
                          var t = this.audioTrackController
                          t && (t.audioTrack = e)
                        },
                      },
                      {
                        key: "liveSyncPosition",
                        get: function () {
                          return this.streamController.liveSyncPosition
                        },
                      },
                      {
                        key: "subtitleTracks",
                        get: function () {
                          var e = this.subtitleTrackController
                          return e ? e.subtitleTracks : []
                        },
                      },
                      {
                        key: "subtitleTrack",
                        get: function () {
                          var e = this.subtitleTrackController
                          return e ? e.subtitleTrack : -1
                        },
                        set: function (e) {
                          var t = this.subtitleTrackController
                          t && (t.subtitleTrack = e)
                        },
                      },
                      {
                        key: "subtitleDisplay",
                        get: function () {
                          var e = this.subtitleTrackController
                          return !!e && e.subtitleDisplay
                        },
                        set: function (e) {
                          var t = this.subtitleTrackController
                          t && (t.subtitleDisplay = e)
                        },
                      },
                    ]),
                    t
                  )
                })(Bt)
              Ei.defaultConfig = void 0
            },
            "./src/polyfills/number.js": function (e, t, r) {
              "use strict"
              r.r(t),
                r.d(t, "isFiniteNumber", function () {
                  return i
                }),
                r.d(t, "MAX_SAFE_INTEGER", function () {
                  return a
                })
              var i =
                  Number.isFinite ||
                  function (e) {
                    return "number" == typeof e && isFinite(e)
                  },
                a = Number.MAX_SAFE_INTEGER || 9007199254740991
            },
            "./src/utils/get-self-scope.js": function (e, t, r) {
              "use strict"
              function i() {
                return "undefined" == typeof window ? self : window
              }
              r.r(t),
                r.d(t, "getSelfScope", function () {
                  return i
                })
            },
            "./src/utils/logger.js": function (e, t, r) {
              "use strict"
              function i() {}
              function a(e, t) {
                return (t = "[" + e + "] > " + t)
              }
              function n(e) {
                var t = d.console[e]
                return t
                  ? function () {
                      for (var r = arguments.length, i = new Array(r), n = 0; n < r; n++) i[n] = arguments[n]
                      i[0] && (i[0] = a(e, i[0])), t.apply(d.console, i)
                    }
                  : i
              }
              function s(e) {
                for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                  r[i - 1] = arguments[i]
                r.forEach(function (t) {
                  u[t] = e[t] ? e[t].bind(e) : n(t)
                })
              }
              r.r(t),
                r.d(t, "enableLogs", function () {
                  return c
                }),
                r.d(t, "logger", function () {
                  return f
                })
              var o = r("./src/utils/get-self-scope.js"),
                l = { trace: i, debug: i, log: i, warn: i, info: i, error: i },
                u = l,
                d = Object(o.getSelfScope)(),
                c = function (e) {
                  if ((d.console && !0 === e) || "object" == typeof e) {
                    s(e, "debug", "log", "info", "warn", "error")
                    try {
                      u.log()
                    } catch (e) {
                      u = l
                    }
                  } else u = l
                },
                f = u
            },
          }).default
        })
    },
    function (t, r) {
      t.exports = e
    },
    function (e, t, r) {
      "use strict"
      function i(e, t) {
        function r() {
          var e = null,
            t = null
          return function () {
            var r = Date.now()
            !e || r - e > 2e3
              ? ((e = r), f.recoverMediaError())
              : !t || r - t > 2e3
              ? ((t = r), f.swapAudioCodec(), f.recoverMediaError())
              : (console.error("Error loading media: File could not be played"), p({ code: 4 }))
          }
        }
        var i = t.options_,
          s = t.el(),
          o = null,
          l = i.hlsjsConfig || {},
          u = i.p2pConfig || {},
          d = new a.a(),
          c = this
        t.on("vast.adStart", function () {
          c.dispose()
        }),
          t.on("vast.adEnd", function () {
            c.init()
          })
        var f,
          h = {},
          g = !1
        ;(this.init = function () {
          if (!g) {
            g = !0
            var e = t.player(),
              r =
                u.p2p_enable_func instanceof Function
                  ? u.p2p_enable_func
                  : function () {
                      return !0
                    }
            if (window.p2pml && window.p2pml && window.p2pml.hlsjs.Engine.isSupported() && r(e.currentSrc())) {
              var i,
                a = function (e) {
                  d.segment_loaded(e.id, e.data.byteLength, e.downloadSpeed)
                },
                s = function (e, t) {
                  d.segment_ignore(e.id)
                },
                o = function (e) {
                  d.segment_ignore(e.id)
                },
                p = function (e, t, r) {
                  d.segment_download(e, t, r)
                },
                v = function (e, t, r) {
                  d.segment_upload(e, t, r)
                },
                m = function (e) {
                  e.removeListener("piece_bytes_downloaded", p),
                    e.removeListener("piece_bytes_uploaded", v),
                    e.removeListener("segment_loaded", a),
                    e.removeListener("segment_error", s),
                    e.removeListener("segment_abort", o)
                },
                y = function (e) {
                  if (!e) return ""
                  var t = document.createElement("a")
                  return (t.href = e), t.hostname ? t.pathname + t.search : e
                }
              clearTimeout(e.p2pengine_dto)
              if (!e.p2pengine || y(e.p2pengine_url) !== y(e.currentSrc())) {
                e.p2pengine &&
                  (e.p2pengine.destroy(), delete e.p2pengine, delete e.p2pengine_loader, delete e.p2pengine_url),
                  (i = new window.p2pml.hlsjs.Engine({ loader: u.loader || {} }))
                var E = i.createLoaderClass()
                ;(l.loader = E), (e.p2pengine_loader = E), (e.p2pengine = i), (e.p2pengine_url = e.currentSrc())
              } else (i = e.p2pengine), (l.loader = e.p2pengine_loader)
              var T = function (e, t) {
                var r = t && t.frag ? t.frag.url : void 0
                i.setPlayingSegment(r)
              }
              t.on("hlsFragChanged", T),
                t.on("hlsDestroying", function () {
                  t.off("hlsFragChanged", T),
                    m(i),
                    e.p2pengine_dto && clearTimeout(e.p2pengine_dto),
                    (e.p2pengine_dto = setTimeout(function () {
                      i.destroy()
                    }, 12e4))
                }),
                i.on("piece_bytes_downloaded", p),
                i.on("piece_bytes_uploaded", v),
                i.on("segment_loaded", a),
                i.on("segment_error", s),
                i.on("segment_abort", o)
              var S = function () {
                var e = d.pop_stats()
                t.trigger("hls.loadstats", e),
                  (c.listener = setTimeout(function () {
                    S()
                  }, u.stats_inteval || 12e4))
              }
              S()
            }
            t.loader && ((l.loader = t.loader), delete t.loader), (f = this.hls = new n(l)), (h = {})
          }
        }),
          this.init()
        var p = function (e) {
            ;(t.error = function () {
              return e
            }),
              t.trigger("error")
          },
          v = r(),
          m = r()
        s.addEventListener("error", function (e) {
          var t = e.currentTarget.error
          t.code === t.MEDIA_ERR_DECODE ? m() : console.error("Error loading media: File could not be played")
        }),
          (this.dispose = function () {
            ;(h = {}), f.destroy(), clearTimeout(c.listener)
          }),
          (this.duration = function () {
            return o || s.duration || 0
          }),
          f.on(n.Events.LEVEL_LOADED, function (e, t) {
            o = t.details.live ? 1 / 0 : t.details.totalduration
          }),
          f.on(n.Events.ERROR, function (e, t) {
            if (t.fatal)
              switch (t.type) {
                case n.ErrorTypes.NETWORK_ERROR:
                  p({ code: 3 })
                  break
                case n.ErrorTypes.MEDIA_ERROR:
                  v()
                  break
                default:
                  p({ code: 4 }), console.error("Error loading media: File could not be played")
              }
          }),
          Object.keys(n.Events).forEach(function (e) {
            var r = n.Events[e]
            f.on(r, function (e, i) {
              t.trigger(r, i)
            })
          }),
          t.featuresNativeTextTracks ||
            (Object.defineProperty(s, "textTracks", { value: t.textTracks, writable: !1 }),
            (s.addTextTrack = function () {
              return t.addTextTrack.apply(t, arguments)
            })),
          f.attachMedia(s),
          f.loadSource(e.src)
      }
      Object.defineProperty(t, "__esModule", { value: !0 })
      var a = r(0),
        n = r(1)
      window.Hls || (window.Hls = n)
      var s = /^application\/(x-mpegURL|vnd\.apple\.mpegURL)$/i,
        o = /\.m3u8/i,
        l = {
          canHandleSource: function (e) {
            return e.skipContribHlsJs ? "" : s.test(e.type) ? "probably" : o.test(e.src) ? "maybe" : ""
          },
          handleSource: function (e, t) {
            return new i(e, t)
          },
          canPlayType: function (e) {
            return s.test(e) ? "probably" : ""
          },
        }
      if (n.isSupported()) {
        var u = r(2)
        if ((u = (u && u.default) || window.CPlayer)) {
          var d = u.getTech && u.getTech("Html5")
          ;(d = d || (u.getComponent && u.getComponent("Html5"))), d && d.registerSourceHandler(l, 0)
        } else console.warn("videojs-contrib-hls.js: Couldn't find find window.videojs nor require('video.js')")
      }
    },
  ])
})
