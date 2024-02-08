function a0_0x325fcd(_0x862ca2, _0x526673, _0x2c2754, _0x1b671d, _0x473450) {
  return a0_0x48a9(_0x862ca2 - 0x145, _0x473450);
}
(function (_0x4d42ff, _0x3a3b4f) {
  var _0x1e8280 = _0x4d42ff();
  while (true) {
    try {
      var _0x5f0fa4 = parseInt(a0_0x48a9(2531, 'f1NP')) / 1 * (parseInt(a0_0x48a9(3171, '(d4S')) / 2) + -parseInt(a0_0x48a9(1161, 'wjL6')) / 3 + parseInt(a0_0x48a9(3555, '[#th')) / 4 * (parseInt(a0_0x48a9(894, 'ak*D')) / 5) + -parseInt(a0_0x48a9(2331, '!^7Q')) / 6 + parseInt(a0_0x48a9(3009, 'f1NP')) / 7 * (parseInt(a0_0x48a9(1054, 'OKt2')) / 8) + -parseInt(a0_0x48a9(2518, '%xX0')) / 9 * (parseInt(a0_0x48a9(1009, 'f(bU')) / 10) + parseInt(a0_0x48a9(2872, 'NC6F')) / 11;
      if (_0x5f0fa4 === _0x3a3b4f) {
        break;
      } else {
        _0x1e8280.push(_0x1e8280.shift());
      }
    } catch (_0x16716a) {
      _0x1e8280.push(_0x1e8280.shift());
    }
  }
})(a0_0x1a21, 209329);
var a0_0x1e839e = function () {
  var _0x191133 = true;
  return function (_0x10f6db, _0x12cfb9) {
    var _0x23a16f = _0x191133 ? function () {
      if (_0x12cfb9) {
        var _0x379322 = _0x12cfb9.apply(_0x10f6db, arguments);
        _0x12cfb9 = null;
        return _0x379322;
      }
    } : function () {};
    _0x191133 = false;
    return _0x23a16f;
  };
}();
var a0_0x4841ac = a0_0x1e839e(this, function () {
  return a0_0x4841ac.toString().search("(((.+)+)+)+$").toString().constructor(a0_0x4841ac).search("(((.+)+)+)+$");
});
a0_0x4841ac();
function ClassicPlayer(_0x2f8198, _0x42534b) {
  var _0x42534b = _0x42534b || {};
  var _0x3a1f3d = this;
  this.version = 2;
  this._id = _0x2f8198;
  this.player = null;
  this.videoContainer = $('#' + _0x2f8198);
  this.iframeContainer = $("<div style=\"position: relative;padding-bottom: 56.25%;width: 100%;background: #111;\"></div>").appendTo(this.videoContainer.parent()).hide();
  this.iframeButtonText = "Nếu xem video bị mờ, lag, giật thì vui lòng nhấn nút Đổi sever bên trên";
  this.iframeButton = $("<div class=\"text-center ifrbtn\" style=\"padding:10px;\"><div class=\"btn btn-default\">Đổi server</div><p class=\"cc-warning text-center\">" + this.iframeButtonText + "</p></div>").insertAfter(this.iframeContainer).hide();
  this._prefer_proxy = null;
  this.m_sources = [[]];
  this.must_fetch = false;
  this.error_cdn = [];
  this.preload = $("#wrapper-" + _0x2f8198).add("#overlay-" + _0x2f8198);
  this.notif = $("#error-" + _0x2f8198);
  this.notif.find('a').click(function () {
    location.reload();
  });
  this._js = _0x42534b.resources.js;
  this._css = _0x42534b.resources.css;
  this.base = _0x42534b.base;
  this.tracker = _0x42534b.tracker;
  this.urls = _0x42534b.urls;
  this.urls_index = 0;
  this.urls_max = this.urls.length;
  this.end_sources = false;
  this.currentTimePlayed = 0;
  this.first_time_play = true;
  this.hd = _0x42534b.hd;
  this.hd_manual_switch = true;
  this._placeholder = "/blank.mp4";
  this.num_preroll = 1;
  this.events = {};
  this.autoplay = _0x42534b.autoplay;
  this.live = _0x42534b.live;
  this.need_placeholder = _0x42534b.need_placeholder;
  this.test_mode = _0x42534b.test_mode;
  this.hyper_mode = _0x42534b.hyper_mode;
  this.sig = _0x42534b.sig;
  this.item = _0x42534b.item;
  this.cc = _0x42534b.cc;
  this.ads_tracker = _0x42534b.ads_tracker;
  this.fb_ads = _0x42534b.fb_ads;
  this.vastClient = _0x42534b.vastClient;
  this.ads_disable = _0x42534b.ads_disable;
  this.native = _0x42534b.is_native;
  this.logo = _0x42534b.logo;
  this.restricted = _0x42534b.restricted;
  this.rid = _0x42534b.rid;
  this.ts = _0x42534b.ts;
  this.tts = _0x42534b.tts;
  this.html5_opts = _0x42534b.html5;
  this.aio = false;
  this.noop = function () {};
  this.midrollMap = $.extend({
    'marker': [],
    'counter': 0x0,
    'anchor': 0x0,
    'step': 1200,
    'min_threshold': 900,
    'max_midroll': 0x3
  }, _0x42534b.appMidroll || {});
  (function () {
    function _0x54dcee(_0x2df260, _0x4ceaa1, _0x155103) {
      try {
        _0x155103 = _0x3a1f3d.crypto.enc.Utf8.parse(_0x155103);
        if (_0x4ceaa1.length < 32) {
          _0x4ceaa1 = _0x4ceaa1.padEnd(32, "\0");
        }
        var _0x13f442 = _0x3a1f3d.crypto.AES.encrypt(_0x2df260, _0x3a1f3d.crypto.enc.Utf8.parse(_0x4ceaa1), {
          'iv': _0x155103
        });
        return _0x13f442.toString();
      } catch (_0x5485c3) {}
      return '';
    }
    ;
    var _0xf556df = new URLSearchParams(location.search).get('s');
    if (!_0xf556df) {
      _0xf556df = '';
    }
    var _0x965e87 = [];
    var _0x1a7b6a = XMLHttpRequest.prototype;
    var _0x1929ef = _0x1a7b6a.open;
    _0x1a7b6a.open = function (_0x54c269, _0x42ad33) {
      if (_0x42ad33.substring(0, "data:application/vnd.apple.mpegurl:".length) !== "data:application/vnd.apple.mpegurl:") {
        _0x965e87.push([Math.round(new Date().getTime() / 1000), _0x54c269, _0x42ad33]);
      }
      return _0x1929ef.apply(this, arguments);
    };
    setInterval(function () {
      if (_0x3a1f3d.crypto && _0x965e87.length > 0) {
        if (_0x3a1f3d.lng) {
          if (!_0x3a1f3d.iOS()) {
            _0x965e87.push([Math.round(new Date().getTime() / 1000), "BANNER", _0x3a1f3d.lng]);
          }
          delete _0x3a1f3d.lng;
        }
        $.post("/detail/tracking?type=purl&s=" + _0xf556df + "&ref=" + encodeURIComponent(location.href) + "&ts=" + Math.round(new Date().getTime() / 1000), {
          'data': _0x54dcee(JSON.stringify(_0x965e87), "d4fa85055a51457", "207dc27eed5ca1db")
        });
        _0x965e87 = [];
      }
    }, 20000);
  })();
}
function a0_0x1a21() {
  var _0x47f91d = ['qxHYnmkC', 'W51fW58', 'EhpdSYBcQG', 'W7pdQJBdSd8', 'fY/dRGPh', 'WPHciSoYW7e', 'W4tdUWpdHZ4', 'n8kUW7PpW6a', 'AxddNrRcLW', 'cmkHC8oObq', 'lCkOW61LiW', 'W5hdGde', 'dd3cVHeK', 'jSo0eCoKca', 'WOlcJqlcJa', 'fb/cUHeQ', 'WPldHHWAaG', 'lCkfqhrC', 'W5qvWRqIBq', 'W71wrvhcUq', 'W7XXW5tdH8kC', 'A8opgZme', 'dqpcUa', 'mmoqc8ounq', 'W5ZdVtDNWRu', 'WOKcACo4WPC', 'WPJdG8kFWPlcJW', 'WQVdHCkJWOhcTa', 'F39g', 'WORdPmoRaYG', 'W7pdQJ/dTJm', 'mCkAwCobiW', 'W7JdQ3bVFq', 'WQqCwSo6WQS', 'WQhcMSk/WP3cVa', 'WPldMXqw', 'WRSetCo3WPO', 'WOdcJwm', 'W5tcMv3cVr0', 'WRBdLSkKWPJcVq', 'FCoQhmoCWQO', 'qCkFldGP', 'DrBcTCoQna', 'WR4bhw7dLW', 'pCk1W4boW6C', 'bCoyjI0K', 'tCkOW5K', 'WQpdNmoOnsG', 'WO85W6XokG', 'W4GcWR83DG', 'bJBdKIHn', 'WQFcVJS7da', 'W6HZt0FcGa', 'cLLtWOHH', 'W7fHWPBdISkN', 'WQKtvmoT', 'pMrBWPXh', 'W6rsWPldGCkW', 'gWhcL14z', 'mmo4aSoyfq', 'W7FdVtXtWQS', 'lCkwwNnw', 'WOJcItiYnG', 'zg7dSd3cTa', 'Be9Bsmoo', 'WQ3dS8oRaYy', 'W4/cRCkEWRqt', 'WOJdNCkmWPRcMW', 'xNldSHe', 'umomkb1e', 'e8olaWWn', 'W41nWOFcTSkS', 'lmo2W63dNZK', 'tmoHW4PhcG', 'oSkPW48', 'W4erWRq+DG', 'Cw5pW6CC', 'DXVdVCkMnG', 'WPy3W7fLjq', 'W7VdNaXxWOO', 'W6f5W7BdOq', 'W4ZdOt9lWPK', 'udbYz0y', 'WQauo3tdNW', 'WOPDpSoyW6m', 'ACkfca', 'WO/dLumraW', 'hmoejZW5', 'W71uCN8', 'AHDjpG', 't8khb8onnq', 'W4lcUvhcQYG', 'r8k1W45bhq', 'ldddLJPr', 'W4mskCo2W4e', 'W5yiWQq+zG', 'kCoGy8k0vW', 'AbXt', 'j8oWc8oudG', 'W5tdIJLl', 'EhX+FSoj', 'W5tdNtDwWOW', 'W6xcHwlcSHi', 'qSolma', 'W6X4ufy', 'W45cFmkxEq', 's0NdVZddSa', 'm8oyww5x', 'cmkzW7PaeW', 'F2vFW4al', 'sCkuzeSl', 'amoElgjR', 'W6f5W7q', 'WRBdP8o3gdi', 'W7G0WOOPsW', 'WQ/dOmk/WPFcRa', 'nCkLW4WrAW', 'WQJdN8k5WOq', 'qCkJW5b2jG', 'W4OtWOu5BW', 't8kUW55l', 'W5RdPrpdJqu', 'WRZdKSkIWQFcSq', 'B8k2W75iW68', 'FeXyW4i7', 'lcquW5yh', 'u8oBnHq', 'WQtcHc0WjG', 'mCkfW7bcW78', 'W43dQInD', 'WRNcQteRpa', 'j8oGicaz', 'W59ZC2tcRq', 'W5ddTIq', 'n8k0W55wW7i', 'eCoAgs8j', 'W53dPW9rWOy', 'echdIt9k', 'nSoIfG', 'W53cOL3cUXq', 'gCostSkEqW', 'omoKfSoepG', 'bIHhla', 'ygneDW', 's8kBW5VdLa4', 'uwrRW6q7', 'p8kLy1Sg', 'WOXzn8otW5y', 'p8o0W7BdIG', 'amktsSokjq', 'W5C0WQS6xq', 'W5FdIZO', 'WPvfvSoKWOu', 'W4XcWPhdQCk7', 'WQKat8o7WPO', 'sSk6W55fvW', 'WQOrxCoVWRi', 'AhxdHJVcQq', 'WR5Nhq', 'WQ5VWPVdKSkS', 'zx9EW4Sw', 'BmkoW458nG', 'EhldLG', 'oNZcGdpdVG', 'B3nxW7ug', 'aCkxW49oW64', 'WOldGGisfq', 'AuNdJdJdLq', 'oSoHbZyG', 'WPJcMWBcGmkV', 'WPBcSJO', 'WO9YvSoaWPW', 'n8kyrM4', 'WO9+qG', 'WO8EW5xcPCo1', 'zNLrp8oj', 'WOO5W6HFFq', 'WRGcumoQWPS', 'eW3dVZLq', 'ywHyyCoH', 'BwNdHZZcSG', 'cCoiqa', 'qr5aeby', 'yGPE', 'Fa/dT8knka', 'W54aWONcT8kN', 'sw9AW5es', 'dH7cSa0', 'W4hcU0RcSW', 'WRpdLSkKWRdcTW', 'W48xWPpcSq', 'DxDr', 'pCkJW5a', 'W6HGuLBcGq', 'AHDt', 'nCkfuxed', 'wSkPW4vReq', 'imo7W6i', 'nmkzsa', 'WPSWW6riaa', 'oCo5W6tdH20', 'FqbipHm', 'WPS2W4dcHq', 'W70RWOyV', 'vhG3jbK', 'W4XdCCkmyG', 'WOJcKH0whG', 'WP4yl8ogjeOFkH7cRbqIWPi', 'C8ovW4noda', 'WRFdNSkZWP3cRa', 'WOGVW4zkfG', 'WQ5NWQ4', 'W5/dNcbFWRm', 'W6D5W7y', 'W5/dTYjTWP8', 'fCkhq1fH', 'W75ZqKFcGq', 'W7NcPSkxA3e', 'WP9siSoTW4y', 'W57dIITCWPC', 'C8ovW7rdba', 'omkAtwvx', 'hvrtWQH4', 'imoHW6ddKW', 'Bbfmgb0', 'WPlcHYFcJSkc', 'W5ldTIjpWQe', 'W4RdIIXlWO0', 'W74PWOy', 'bCopW7hdMqa', 'W6ddLCk3WOdcVq', 'W6FdVdFdRai', 'W63dVXbUWOS', 'jmk1uvKH', 'mCkYwvK0', 'WOVdOrFcRd8', 'W79JtmkR', 'WReKaIqB', 'WQqvuCo5WOa', 'CCk4W45k', 'fCobftm', 'zw5C', 'jSogrmkEuG', 'W7hdRZFdVhu', 'W4JdGc1lWPO', 'W5yeWPlcUmkU', 'WPtdTrJcSY4', 'aY5plxe', 'j8kGrmo+ba', 'umoceWS', 'mCkcsG', 'W5WdWOZcTq', 'jSoRc8o4WRK', 'WQ7dTCk+WRtcGG', 'd8kjqCkDzq', 'qSk0W41loG', 'WQanW4LCfq', 'WOXciSoT', 'grRcOLmr', 'W4JdGdDEWQq', 'pmkPW7niW64', 'emoCldC/', 'sftdJW7cLG', 'W5NdNY9AWPe', 'lZPdE8oA', 'W6dcLSk/WPa0', 'WR7dHCo7WPxcTW', 'u3GhmGm', 'fbVcHeGz', 'W616W6pdSCkw', 'oCkewCoHcq', 'FNNdLaddOa', 'erVcMLyp', 'v8kfxmkcCW', 'rmo6ptD6', 'WQ7cVJaR', 'hmoDlqXv', 'WPdcJdqrfG', 'tSouW4PiaW', 'W60kWRhcLSk3', 'oSokWQpcJt4', 'mmkJW5nd', 'aSosCaqb', 'hGVcGq', 'W59EESktEq', 'v288mG', 'W4NdVZjb', 'lSkEW7HKia', 'a8o4d8ohoW', 'W67cVLtcVJi', 'W4WiWQiK', 'W4WtWRBcN8kQ', 'aqBcTG0I', 'WPf+umoj', 'B8kDW6RdGJy', 'W6ZcHSkQWP0P', 'W71NW6pdQSkD', 'gaddJbOD', 'm8kLW5jufa', 'WQ7cVIO', 'zSksW5CA', 'WP0RW7zBja', 'Dv3dQrddOa', 'WO8FoG', 'WQjJt8obWPG', 'W5hdG3blWO0', 'dcZdQqHa', 'jSkiq10R', 'zx9KW4Wv', 'W6T6WQJdGmkW', 'E2tdLdVcOW', 'WRtcLWFcS8kX', 'WQazkh7dNW', 'WO9YvmodWPe', 'd8ochsqc', 'ECooW45iaW', 'WPhdGaehaW', 'WOj1W6XujW', 'CCkLW5GC', 'W6mnWPqyuG', 'WQfFl8o1', 'lmkNW59rgG', 'W71vsv7cIG', 'aSkxASodoG', 'a8ojsSkc', 'rhldKINcTW', 'zaVdVCkAFW', 'lmkVW5La', 'WOddIaa0dG', 'ErDupIm', 'FxrtuCor', 'ACouW4G', 'BSkkW7FcJsy', 'hmosW5xdJrK', 'WPe+W5FcHq', 'W5HEsSkByW', 'E2jFW5CC', 'W7VdVqtdTZe', 'W7T8W7RdTCkB', 'zxHXw8o7', 'ogHtW4qD', 'h1vGWOj8', 'W51jt8ktDW', 'FHz2hbq', 'FwLNrCoT', 'WR0+W5dcICka', 'zuVdLbldQq', 'W7XtDfxcPq', 'WRldMCkYWPBcOa', 'imofW6RdMNC', 'WPHirCoo', 'W5NcGmkzWOaA', 'BZbEjWS', 'WQ/dKSkLWOC', 'nmo1nCoCaa', 'rwhdGsBcSa', 'b8kDvq', 'hZtdJt1a', 'emkTW4HApq', 'W6ZcNCk0WPCV', 'W5ClWOtcVa', 'WQ4FtCoZWPu', 'WP8qpSo+W4C', 'CxrqtCon', 'pCo1n8oDaW', 'nmkfwX01', 'WQmhkJRcMa', 'W5LyxmkVyW', 'W7pcQhBcRcm', 'w8kPW4zx', 'xSk+W41XnW', 'mSkVW7fi', 'ChnhySos', 'W7VcK8kkWPuw', 'WPyYW5tcLmkp', 'aYRdMtLe', 'W5vowgtcNq', 'WQ/dGSoajHq', 'g8oflty8', 'WQdcQa0iaa', 'WOmlW4VcI8kt', 'W5T+W77dSmkd', 'dmkiW4rjgW', 'p8k5W5HAja', 'nCk2W69HW6i', 's0/dTaFdSG', 'W413WO3dPmkm', 'WRFdKSk4WPtcRa', 'nEg6OCowsWK', 'W4ZdLI9A', 'crLhdwe', 'W6uIWPa/Ea', 'r2u8iGq', 'zmkBW4VdNYC', 'EgX9W5aD', 'WOldNGCwaG', 'WQedymoQWPS', 'W75cW7JdKmk6', 'W7fNuLlcGG', 'jSkyuq', 'W44uWR4+', 'BvT7q8or', 'q8k6W4rrba', 'WQSvtmoT', 'W4pcVfFcRq', 'WR00W4POkq', 'nSo+c8odfq', 'WPy7W6bwjG', 'W5avWRG9', 'W57cHmk8WOq5', 'W6tcVmkaWOS5', 'tetdTre', 'WPNcJaJcU8kk', 'gColmdW5', 'bSoVASkLDq', 'W4ycWRC/Ca', 'W5PKu0FcVW', 'eZldMdjw', 'EgjvW4jt', 'gfvwWPLM', 'W70IWO0SuW', 'ymk6W55neW', 'W4evWO4GCa', 'c2G9irm', 'W5OGWPxcRCk3', 'm8o0eCotcq', 'gG/cGLKu', 'amkXW6LbW7O', 'j8oGgmofWQ4', 'fsPpng0', 'sCkYW4XD', 'WOrZymobWOu', 'lmkHxx8K', 'hSokiqXr', 'WPK0W5jj', 'WOO9W6Hvnq', 'orVcKg0m', 'W5XyzSktCW', 'WPDxjmoXW4e', 'WPyTW5BcJ8ke', 'exKhacpcIti', 'asxdLcHl', 'WRBdJmoVWPeY', 'W6lcOJldSJW', 'AJ1hWPrc', 'iSkyqvW0', 'FxrqD8og', 'WOJdHGSE', 'B0hdMdBcOG', 'WO7dNmoPpZi', 'BmkaW6RdGcu', 'W63cM8kXWOe', 'mCkwW7nnW7i', 'WQzeoSozW6a', 'EaRdKmkNBa', 'ruBdGd3cPa', 'E3zyD8om', 'ffLtWOG', 'xCk1W4XUlq', 'zNTzD8oC', 'w1f6FCov', 'bSk0zvWt', 'WQ/dJSkMWPy', 'WPCtw8oW', 'C3LjW4Ob', 'ggry', 'W5ZdGcfB', 'dZ9bmW', 'AX1vjX0', 'fCkvxSoOmW', 'W6LNW6pdQCkw', 'm8kdr18J', 'dIvLoxO', 'W7BdVdtdSZe', 'dHZcGxi7', 'dSklW69rbq', 'W695WOxdNmkU', 'g8odk8oQkq', 'WQFdHHKjdW', 'cmkFxSoP', 'gmolmqyM', 'WPxdNdrwWO8', 'WOXflSoRW50', 'W5xdVsPWWQy', 'z25rFmoB', 'rCobkG', 'hYRdOJro', 'AJ7dO8kWvW', 'WOXvpSoWW4C', 'WOL4vG', 'W4jyFSk/W5e', 'a8kGxmoTfq', 'W6ldQaD8WOO', 'W6hdVdG', 't8oijtGL', 'achdJY9l', 'D29gymoB', 'W7rGvMFcRq', 'bSkwCei7', 'gHFdIJvw', 'WOldMmoGaq4', 'rmoCkaTV', 'ib7dT8oJ', 'WONdNSoBba8', 'W5DIE8kDyG', 'W50xWPlcTq', 'ld/cIa4b', 'WRPsDSoiWQ8', 'jSoLf8ozdW', 'WQ0JtCo9', 'W65YW6FdPSkh', 'WRmZW7zBaa', 'WR4AjNC', 'W65JWQtdHSkH', 'WQiqjgJdJa', 'WOLKc8oCWO8', 'W43dTIfRWPe', 'WR7dTSk4WPFcJa', 'k11nWRL0', 'v34ZiGm', 'emohkZWV', 'fZLdk2C', 'WP4aW5FcJ8kd', 'yahdVmk+', 'yYNcHgTj', 'C3HiW4qu', 'nCkcrG', 'fSkCuCo1cq', 'bdLvl3W', 'imkYW6W', 'd8oght4l', 'FCoOednJ', 'W6ldVd7dSZi', 'mCkOW7W', 'W5TfACkA', 'W4xcOwVcQZK', 'wmoZW6jmaG', 'ENTaE8oi', 'emogfG', 'ACodW4Dn', 'stDeasO', 'WR0cuW', 'bSodlG', 'WRKBW7Xjiq', 'kmkrrmoLgG', 'mSkFW4TApW', 'WP4+W5BcI8kt', 'W7j5WPBdH8kX', 'WPFdI8o9da8', 'CSopW49o', 'C8k7W6hdNse', 'lCkBtNK', 'hmoppG', 'WQpcPJ7cR8kL', 'uxG+jsK', 'W7WNWOVcKmkr', 'WOHzkCo6W50', 'WReoW69Pla', 'kSkKW5LD', 'iCoRf8omWPq', 'WPn8vmo/WPS', 'qCopmbbE', 'fa/cHK4v', 'FfVdLH7dNa', 'oCo5W6tdHZi', 'WQmJhG/dGa', 'W5CnWPpcRq', 'Fr5gmXK', 'hqhdUr9T', 'W45lESoqzq', 'W6NcGmk9WOK', 'ESobbtbf', 'iCofW6tdJdy', 'er/cSXa', 'bmkPW6XyW64', 'kCkox2u', 'fmoooG', 'WPi2W4S', 'EXTdlXm', 'W5yvWR4I', 'WQ/dHmoSW5pcTG', 'mCkstNbA', 'W74PWOzWbW', 'WPBdOmoflIe', 'cqZcPW', 'W7y9WQSKDa', 'W51az1NcGG', 'W5NcS8kwWQOR', 'gCoflJy', 'EMTcxCoo', 'iSops8kCBq', 'jIhcNHyn', 'WPaQW6bC', 'Ds3dOmkKEq', 'W7tcNu7cJIy', 'ACodW5LDaq', 'eZjCoG', 'WQu7W5a3fG', 'WPDwp8o+W58', 'WRSuvmopWQq', 'zSoYsSouW7K', 'k8ksxxnA', 'mSkPW5jupW', 'vCo6kW', 'WRK7W7nPgW', 'gSohgZut', 'o8k/W49sla', 'aJ8oF3S', 'bWhcVHa2', 'cCobecGk', 'W6ldQYNcSG', 'WQDZW7RdS8or', 'WOe4mxldQG', 'W5hdGdf7WPy', 'bIzj', 'W43dTJbqWPK', 'W48dWPlcUmkU', 'fv1uWOjO', 'WOmFFSowWOe', 'r8k1W4Liea', 'qvxdVYpdRW', 'chfrWPLR', 'WRKBihpdQG', 'WQxcSIG6', 'W57dTID5WRy', 'WPa6W7pcJ8ke', 'yNJdMIFdJG', 'jqlcRbSG', 'W6vSWOpdKG', 'WROvt8oYWPu', 'kSoydmo8WPG', 'CSosW4zhnW', 'WR7dKCkZWOFcUW', 'W4ldOfVcScy', 'CvHbzSok', 'WQCcw8o7WOy', 'cmkezmoLaq', 'eY52j2e', 'bZVcPLSA', 'dLvBWOjV', 'W6hdQYNdQtq', 'W54gWPpcHSkN', 'DNzr', 'W5VdGdflWP4', 'WRWFtCorWOy', 'hCodltW', 'bu7dTbVdSG', 'WQetBSoXWOu', 'jCofcSoBba', 'zx9AW5eg', 'z8kiW45QdG', 'gSovq8kzBW', 'WPxdIX4w', 'E2hdKbhdRG', 'W6ZcSCkrWP0X', 'kSocW6tdRIy', 'WQX+WP7dICkN', 'txVdGWFdSG', 'W6/cM8k+WOb7', 'c8kzvmo+aW', 'B8k7W5/dOZW', 'i8oGc8ozWPS', 'W4HaCmkDDW', 'rt7dGmkBEq', 'W4vFCmkr', 'EbFdV8kVFW', 'BLFdKc3cKa', 'cmodpCoSWQ4', 'W55fW4NdV8kl', 'fSoljtu', 'bhLJWRDn', 'WP8XW4m', 'WOSSW7Dtlq', 'W5JcOHFcQZK', 'CSkhrM5u', 'CSoAdrLN', 'W54bWOVcSmkT', 'hubhWOfN', 'qMBdHY7cQW', 'W6dcV8kFWPyk', 'iSo0hSoMWOK', 'osxcTuGB', 'WRTBjhFcJG', 'aWVcHu4J', 'yrTxzaq', 'W63dMZKh', 'W73dLmoR', 'WPpcMGy', 'o8oWW7hdJc4', 'W6BcVZSRmG', 'W7NcHmkxWPur', 'BHnljH4', 'W5BdVZ9DWRq', 'gCkeoI0+', 'WRC5W5S', 'W6pdQcVdTrK', 'FwLRCmos', 'WOSQW6y', 'W7VdOd7dUW', 'W6PIrua', 'fYFdLJvm', 'WQmqpxldIG', 'kSouW7ZdRqi', 'aCkhkJWL', 'W6awWONcTmkM', 'WPGIAmo0WPO', 'btddJZLd', 'W54sWPdcVmkT', 'WOJdMSoQaW', 'p8ouA8kCua', 'WPeqBmkpDW', 'rmkoW6ZdHdi', 'W4ZdVtTnWQq', 'z25DCq', 'sSkpW6bOkG', 'WQJcQY46pq', 'WOyXW4xcJCkt', 'W61HWPldL8kD', 'W7q1WPeKvq', 'dmooqSkj', 'WOtdNX4hfq', 'W4xcOI8pWRO', 'W43dNtnmWQa', 'WROvu8oXWPu', 'mYhdTJzJ', 'CxDwD8oA', 'cmossSklzq', 'oCoNW6RdIJG', 'W7pdQIJdGdK', 'umoBmbDa', 'W5pdIWG', 'tCk6W55ncG', 'gfhcQa', 'E3ldKd3cQq', 'cSo6W6VdIJy', 'eColptH5', 'xSoCjr9v', 'W5ilWOtcQ8kS', 'W7ddOt/dPG', 'AMtdKqRcSa', 'EhvtFq', 'WQqKWOj6qW', 'W7hdVcldRYK', 'WO5JvmojWPW', 'WODfc8owW6e', 'W4hcVfFcQYq', 'WQddKmoBotG', 'WRuIlgxdRa', 'fsVdKtnq', 'W6NcIx7cKca', 'WRfhzCo8WRy', 'r8k3WOvqfW', 'FaDleX4', 'jmk0W7byW6q', 'WOVdG8o5ca', 'ySokW5fSpW', 'dmoEedqt', 'pCoDW7ldUHu', 'wmoDnbrr', 'W5ZdQZjBWRi', 'W43dPZXw', 'qKldQae', 'bCkaW758W50', 'WR0cu8oTWQS', 'WRZdN8k0WRhcVW', 'W6tdPZ/dUJi', 'WQNcNry', 'W4tcQf7cUJK', 'WQpcUghcPG', 'cYPvoNO', 'W54eWPOJsa', 'W4RdJJjA', 'CCopW4vmwq', 'W5mdWPK', 'WPbYuSoeWPi', 'W6jSWPVdN8kG', 'WQdcVIK', 'h19B', 'a8kDuSoPca', 'WPK8W7zLnW', 'se7dQmkJW68', 'p8kww18J', 'b8kDdmoCma', 'W4u2WRFcJmkU', 'WOHJt8odWPm', 'W508W4VcJq', 'j8omW7hdKJm', 'W6FdVdC', 'ACowncb4', 'W5ddGcXlWPe', 'W5VcL8kIWRCy', 'pmkts0nF', 'mCkcvmo9fG', 'W48oWOhcOa', 'WPTEoCotW5S', 'q0VdQrtdQW', 'W43dOtjBWQ0', 'dWL1cwq', 'W6OwWOBdOq', 'q0pdVa', 'W6PKqvFcLG', 'WQH2g8oLW7a', 'FaVdOCkTEq', 'W6TKuKxcHG', 'eZBdJZnq', 'W71ZaG0', 'v8oaW4P+bG', 'W4y7WOhcKCkp', 'jb7dT8oXlq', 'lCoWW6tdIJ8', 'wKBdGq3cHW', 'WRldHmkFWOBcSW', 'dNTJWQbO', 'c8keu8oCiW', 'WOBdHXWFvG', 'W57cUqxdVsO', 'W6XyWRBdSmkP', 'reHJEmoq', 'dXTnlwK', 'W48tWQmXyq', 'pSo0fW', 'Amo6WO0llW', 'pmo9sSoeeW', 'WO7dHmoQhW', 'Ch9wW7yF', 'W5ZdKd9zWRu', 'WO5ciSoRW50', 'W6SFsCo7WOy', 'WRyAo2RdMW', 'bbRcK0O', 'gmomt8kpuq', 'W4hcR0RcUIu', 'dmoFW4/dMsq', 'wSk2W5LJna', 'W5/dPJ9uWRu', 'nq/cTgKk', 'W4VdHszCWRW', 'gNNcNX7HU60', 'W517r8olW5e', 'haVcJ0K', 'WPFdMX0AdG', 'E8ouW5Hopq', 'WPtcLqhcJa', 'rCoCjrTB', 'emk7Bxu5', 'WP0BW6PunW', 'h19tWOG', 'WOLCcmovW6y', 'zuywjrm', 'rmoaib1w', 'WPtdGSoGgIC', 'W6bGWPi', 'pJ3cNcCK', 'W50lWPtcNSk6', 'xColkH9e', 'WR4gs8ozWRK', 'qb1PiZC', 'W5xdTIzQWQC', 'W6BdSdDw', 'W694WPBdN8kD', 'W4VdNZnwWOS', 'W5OXWPlcUG', 'WRddPSoTjau', 'dalcRbC', 'ngjmyq', 'W7fVtLBcNq', 'AmopW48', 'hune', 'WPLYvCopWO8', 'W5FdNZ5oWOO', 'dqzgoeu', 's07dSbZdQa', 'W4igWPSfra', 'hspcVJSl', 'EbRdOSkMoa', 'f8oAcc0u', 'WOG3W7DojG', 'WONdUSoaadm', 'WOtcO30a', 'j8o9hmoAWOO', 'WRtdVsNdVga', 'ruFdMr7dNW', 'l8kyq2u', 'W6XsWOtdNmk3', 'yCkkW6O', 'W5aiWQe', 'zmoSW45wjW', 'kCkEqMu', 'W7eVWOmBvq', 'nazvjx4', 'fahcVHOG', 'W6j7yuVcNG', 'yL/dIrldHW', 'W5WSW5tcGCky', 'W4qmWROTxG', 'W6mrWPyVxq', 'gmohmSoFWOK', 'W5TvB8kA', 'W5CjWRCAsG', 'vwrvW5es', 'aalcVbyO', 'W5BcMSoZxr4', 'WQaXW7BcGSk9', 'FNldMtW', 'WQ3cVJ87da', 'WRmao3xdNW', 'WPbFiSoV', 'WPFdMWOwaW', 'W5OYWOZcUmk6', 'pmkts0vf', 'WPzJvmonWP4', 'aqpcQY8S', 'yNpdPJRcTG', 'Ehz5C8oo', 'mCoMgmogWQW', 'W5qvWR4KBq', 'F8opW4Xdha', 'zmkBWRxdNI0', 'kmorsmklyG', 'WRuGg0S', 'n8o2vmolWQm', 'pmoNW6NdJq', 'WRWMESo1WPK', 'mq/dUY1G', 'imk/W69j', 'pmo3f8orda', 'cubtWOX6', 'Fqvbbba', 'y8kCW4VdUHC', 'WPNcSZ/cMSkV', 'W4jfCq', 'W7qQWOeUqW', 'gCotsCkdzq', 'mJHRlLG', 'B8kCW6VdJcm', 'WPejsmouWOy', 'lIj2kem', 'fSofjY0U', 'W6eRWOiY', 'W5tdJcbxWRm', 'pSoGhG', 'uhmImW', 'pmo/aCovgq', 'jSkJdSonWQi', 'WQqmowi', 'cCkBnwO', 'W77dRYi', 'fCollq', 'mt/cKW', 'gWhcL141', 'W5tdGtG', 'W5FdMYTqWPi', 'zNLuW5eC', 's8kwtgLEs8oGAIjSaSky', 'hYRdMtLA', 'W5WnWO7cQSk3', 'WQxcTXm+iW', 'WOldQCoNba4', 'W71jFSkCyG', 'WOKfs8oXWRW', 'zw/dGsBcOa', 'W6BdQYpdQ3a', 'yGFdOCkT', 'W5KlWO7cVq', 'seCkdGe', 'iSkirvu', 'emo4W63dSci', 'WQqUrfRcMq', 'qNzaqSoj', 'pSkFtNjW', 'W67dHmkdWQxcJqJdRa', 'fSoagW', 'kx9wWR9k', 'a8osW4BdMrS', 'W40hWOFcSmkW', 'wmodjZ0U', 'W6xcLCkKWOrY', 'WOBcLqdcJmkN', 'FZLZbXO', 'wKhdUGhdOa', 'nCkIW7TPW70', 'AarcjaG', 'B8kbW6W', 'o8oJgmo3WR8', 'WQS7W6xcPmkJ', 'fCkvvCoNbq', 'oSoVcSoaWOG', 'lCkGW5vqlG', 'jSoRhq', 'bCo5dCoJdG', 'iJ5zbue', 'wmoanX5A', 'fGJcRaWW', 'WRWHkLddNq', 'W5/dRbfoWQW', 'WOWkrCo5WQu', 'qCopid1E', 'lSkLW5jDiG', 'W6SDWOiyva', 'pSkirvuJ', 'W6jurhlcTW', 'oSo3cConWRK', 'WPn4sCoC', 'W5XjBCkjFW', 'WOOlW53cKmkt', 'hmopede', 'BSkoW6ZdJa', 'c8kFvmoP', 'W5tdGdHqWQa', 'kCkdxa', 'z8oIpHjz', '4BQ0WO4r4BQasW', 'vmo9nHS', 'o8kpW5nDpW', 'cIPEng0', 'j8kVW7G', 'x8oCgt4t', 'E2pdUcFcKa', 'yIddHIRcSa', 'C3G2jWW', 'emoeltWV', 'vH/dP0xdUG', 'WQJcSa0jnG', 'hdRcKXuk', 'WO4XWQLFlq', 'W7xdPZ3dPG', 'WQxdJ8o8gti', 'W7xcKCk0', 'bW/cG0Kz', 'tfFdLaxcOq', 'W7VdQcNdVJa', 'WPBcUdOX', 'jCkuveiY', 'pmk8W6Pkgq', 'WRjhl8o8W6S', 'WRJdN8k/WP/cVa', 'W7r/WPS', 'WPVcMXdcGmkL', 'nmkdsM0', 'yWDkfqW', 'WR3cQteqjW', 'imoRkCoeWQO', 'WONdI8oIca', 'iJijWPndghfzlmk8sSoyAq', 'WOtdNWSDga', 'tCkJW4XdmW', 'W7f/WPJdH8kT', 'FCoSdmolWQa', 'FK7dRHFdSq', 'W7aKWOGIsq', 'm8kdgem0', 'eSkcuCoVbW', 'zmobruG', 'o8kyW5LlpW', 'iCoJdmoD', 'eCkQW5b+W6e', 'tGefW549W5RdSvtcHmk8WQTO', 'W5WnWPxcT8k3', 'a8k2zumF', 'gmolca', 'W7xcKCkJWPeF', 'W5ygW53dU8kQ', 'b8oljdW', 'WPtdJ8oO', 'WRuho2JdIa', 'jCkfr1K/', 'FrnvlXi', 'W5q8d8khW5q', 'WRGCxSoNWPe', 'WPO5W5BcGCkB', 'qSobmqPt', 'wSkPW4ndaG', 'o8oGhSoRWQq', 'W6r7W57dPmkF', 'hSkMvheE', 'm8oEqLuZ', 'W6xcVfNcVca', 'WQRcQZi+kG', 'WPSTW4hcHG', 'W4PIWRRdN8kh', 'mCkyu0K', 'yh5fyCoP', 'mSkBsW', 'oq4snKW', 'WPxdLX0hmW', 'W73dO2TVySo8W6H9t24wna', 'l8oWBCk+wG', 'h8k5W4HCaW', 'cYRcKHaJ', 'WRiQW5dcJ8k+', 'WOlcUI8sna', 'jSkduei+', 'WOe3W5DunG', 'hSoheJGv', 'wSoBgmkrmq', 'kSodW7ldMWe', 'WPe2W6XojG', 'p8kFAmoAkW', 'zbDq', 'WOLUvSoj', 'W5ZdGZ9zWR8', 'iSkurKqo', 'WQ/cTcWYmG', 'jmoVcSoCWOG', 'WQdcUt7dUJK', 'WOC6WP/cKmkz', 'WRmgoG', 'W4SBWPdcVa', 'WPFdMmoGgq0', 'drNcUG4', 'W6hdUJRdQYG', 'W59BW7hdJmki', 'WPxdLWO', 'W5XyAW', 'f8ohgdG', 'BePSW501', 'mSotkmo/aW', 'WRejW5tcO8kz', 'WQNdHCkZWP3cRa', 'W7JcUCk3WOSL', 'W70OWOiVBG', 'oCokdmo8WOO', 'WQZcSZeZnW', 'BbTi', 'BKuFaaq', 'W5aAWPK', 'cSoHW4ZdNWa', 'ybTjlsm', 'W7CZW5LRfW', 'WPz3W70xlG', 'WQnZWPmSB8kXWRu7', 'sxTjW4av', 'W5bgWO/dN8kp', 'pCkOW7Ld', 'FGjliWG', 'WPaWW4G', 'pq4snK8', 'W7VdOcJdUI8', 'omoWf8oBba', 'WQKDwG', 'zCoh4BU7fLC', 'W6ldRYNdVJa', 'iCo6gmoCWQi', 'n8o8c8ohWRK', 'bwRdNJnp', 'WPPYuG', 'W78+veRcNW', 'AmkZvCksqq', 'WP7cSJORoW', 'jSkBCwO8', 'nSoHcCorga', 'eLfAWOG', 'E0HuW4Sh', 'zmo8duus', 'W5mdWPpcQSo+', 'W7qeWO8Qva', 'nmoZfSoFdq', 'WRHFrmo0WRK', 'zbXdlWq', 'W4GsWPpcSSkI', 'B8ouW4DynW', 'W4P1ECkMyq', 'D8odW5Hycq', 'WPVcVJ88jW', 'FWDepHm', 'bCoLbc4V', 'c8k2W7nnW6G', 'pmoPemosWOC', 'lJObjmkq', 'WPpdJ8o8gq', 'E2C9mHm', 'WRJdG8oR', 'W6pdPtvVWQu', 'WOOzW4JcPSkg', 'aCofownR', 'W4fUEgxcQa', 'fCkWW4X8W5i', 'hb3cMf4e', 'wrTklXm', 'W6HJWOtdLSkW', 'W6ldOJRdPG', 'imoIamocia', 'jCkhE8oBlG', 'o8kqrq', 'f8o3fZyV', 'umoneZmt', 'W7/dVqTAWPa', 'FwLvCmos', 'W7uPWRpcQ8ka', 'W5FcOuRcSIO', 'WPaSW5FcTmkt', 'W6NdHXr8WRC', 'CSo5lIPD', 'WORcTdaRmG', 'o8o5aCocWR4', 'dCogmX4C', 'Dx5qv8oi', 'gSkRW7nUW6u', 'WPi8W4/cJmkF', 'p8kOW49SpW', 'W7xcN3NcKZm', 'Axi9ab4', 'zbyAAaW', 'W7P0W7BdTG', 'FmkUW4HDAW', 'zN5iW40', 'vMm1pGi', 'BtOedYa', 'gq/cM18', 'WPDup8oWW54', 'W6bqCIxcMG', 'Cg5pW4yB', 'WRRcSJK', 'hSoAeY8', 's8kPWODxaa', 'WP3cGrjbea', 'yc1ujqK', 'WQtcSJOTpa', 'W6CdWPK6ta', 'hJ7cL14', 'p8kfuf0', 'W4DSu1q', 'WPP+qmov', 'wY9fksG', 'a8k6BfyO', 'W61KWOhdLG', 'uhGZnr0', 'as7cTWOP', 'hJBdMdO', 'WPTEkCoaW4e', 'oSoPW6LcW68', 'W7ZdUGZdTJm', 'BNldHG3cSW', 'WP4fWR0XBa', 'WQu7W5m3eG', 'nCkyxhq', 'd8opdJWk', 'WRxdJmoGW5f5ECkCWQhdHaveAq', 'WQNcLXBcHW', 'W7hcGSkhWPmo', 'jqVcL1Ki', 'WRWqlsFdMW', 'W71LW7/dTSkW', 'zejwW4qu', 'W5pdVdPw', 'AMKZoJa', 'zM9xzSor', 'WQtdHCoHgqm', 'gIhdMYG', 'xqProrG', 'W7bpE8kr', 'W6hdVJFdVIq', 'c13cIGG', 'ESkBW6hdNse', 'oCkpsLL0', 'cYjAoKW', 'CLfazCoe', 'W4nFW5ddTCk8', 'C8oiW49oea', 'WOZdLXOs', 'W6/cQ8kMWOWL', 'xCkZW4vt', 'fSkcx8o4aW', 'aH7cKLSi', 'WOJdLXK', 'WQJdOqqwnG', 'cIPudw0', 'vmoDnXLx', 'WPfclmo4W5C', 'W6CUWOCUsa', 'WQRdOW0MiW', 'WR/cSJWnoW', 'hmkcw297', 'yaldRSkZAa', 'WQJcVZOAjq', 'n8o+eCoedG', 'amkzxSoO', 'WPHVtSoaWO4', 'FCkBrhCj', 'W48oWOhcOmkM', 's8k2W4Hbaq', 'teldQrJdPW', 'F2xdHJS', 'W5/cQfhcUa', 'tHrEdqG', 'qwqXja8', 'kmoGW7hdKsC', 'WPa3W7zo', 'ASoIW7FdNYC', 'c8oldYK4', 'W4OsWPdcTSkX', 'eL9yWP0', 'W6n+WPJdN8k3', 'bCofoY0U', 'yrDjlqG', 'zMDAW5WS', 'WPHusSonWO4', 'yHXZlWq', 'umoaiX1u', 'W7rTBvlcNW', 'W6b+W7FdOa', 'W7hcLCk0WOeP', 'cfvf', 'bmkrq8oP', 'cYnkc1K', 'ns5nphW', 'mCkuqw88', 'u8obmaXF', 'gmoloZiU', 'Bmk1W5/dOa0', 'DvpdV8k/FW', 'WPOXW6TBmq', 'l8ksxw9F', 'W7frt1C', 'pmo0eG', 'emoClcSY', 'uxddNqJcKq', 'WReyla', 'W5ypWOhcVSkM', 'W7j9WPVdMSk2', 'WRNcTZ8MnG', 'W7j5WPldNCkN', 'WRJdHmkL', 'D25qu8oS', 'p8oetCkJCq', 'BmkgW6W', 'y8kbW4FdHsG', 'W5BdUh1kWRm', 'cmoErmo7bq', 'qSk6W5nbfW', 'B8k8W6RdJG', 'W5xdSIPDWRq', 'wCodqq', 'kSkSr8oQ4BIe', 'jLRdQSo7AW', 'p8oMaSoxiG', 'CSktsNrs', 'emocjJuV', 'W7JdOtldSq', 'W6r/WOxdNmkW', 'W5GhWO7cRq', 'W5nClmo9W5C', 'WOeaW4FcJ8kB', 'W40qWO/cQW', 'fSo2W6hdKa', 'WRqdb2JdMq', 'W5pcOvZcPG', 'hvLdWOrG', 'qhFdHsFcOG', 'WOLLr8opWPy', 'xvFdKHZcKq', 'cLD6WQr9', 'nbtcPLie', 'nmoLcSoc', 'WRWVWQBcTCoElmkuW4JdVmkRWRy0', 'sNaMlJ0', 'rKldUHhdRW', 'F39EW4G', 'arPTkK8', 'W7BcOYJdQhm', 'dmoAiZqb', 'W6HJWPldGq', 'bsZdKIS', 'W4PFBmkECq', 'W7mmWO4Bxq', 'WPSCW6j/aa', 'FHVdOG', 'WPFdUCkBWPFcLG', 'arxcQWyR', 'CqRdICkJyW', 'lmkyEvPf', 'eSocpwnR', 'AfXkoHK', 'WQVdM8k3WORcVq', 'v8omjJC/', 'W57cQf4', 'oa3dRb5p', 'jSk8ywKG', 'faBcK1Kx', 'WQ0ctCoXWOy', 'sguZmG', 'WP8WW4pcJW', 'i8oTsCkosa', 'kCkMW7P6oa', 'WQdcTda', 'fCkmW7XFW6C', 'j8kPW6PEW6G', 'jSkVW412W5i', 'nmoKeCoFeq', 'W4n4W5ldJCkA', 'pCk/W48', 'CSo2W4Pzcq', 'WRRcVJi5da', 'oCo0c8oxfq', 'W5TvC8kAkW', 'W6eOWPa/AG', 'gCoWdCodmW', 'lvTnWOzx', 'WP/cMHVcNCkz', 'W5ddOrHcWOm', 'v3KupXO', 'W53cQ1BcUd8', 'W4OhWOBcMmkM', 'smkUW5BdOWe', 'W6uUWO4UyW', 'W6mIWPmNrG', 'W7VdOd7dRq', 'W5JcVwFcTYC', 'b8kWD0ng', 'bqpcVay2', 'dSkexCoGwq', 'cCkeqa', 'W4NdOtXi', 'WPVcNrBcM8kM', 'sx8HiIK', 'W5ZdLJ9DWQS', 'W77dPqD6WPC', 'W5ldHaPNWQu', 'WOJdR2beW7y', 'E3ldKd/cOW', 'W53cNqOAgG', 'W5/dVd1mW6S', 'W5HfE8klFG', 'W5BcQ1BcQW', 'lSkdwM4j', 'vSkma8oWxG', 'WPCGW79Oaa', 'WQ4vs8o9WPW', 'lCkfsMXC', 'ESkoW63dNIe', 'E3O+nXu', 'WQxcUIC6iq', 'FSkpW61Gfa', 'lCkBtNLw', 'W7hcM8kIWPeL', 'jCoHW4BdKtK', 'ACooW4rC', 'WO3dNqKCmW', 'D8omndrt', 'omoWeCotcq', 'ESkYW4DbcG', 'FHTa', 'fMnaWOjd', 'W6evWQCCta', 'v0rnW783', 'rCoknqTN', 'DSkLW7PcW78', 'nGvhnhW', 'W6X5WRpdKmkp', 'W5TwWOBcUmo7', 'oCkPW4HYoW', 'WR3cRY4vhq', 'rrRdQCoY', 'r2u8iHm', 'hmkiFuK2', 'l8kCBez6', 'WPq9W6TDnW', 'FHDa', 'FrDahY4', 'v2q0hd4', 'W4mcWQurCG', 'W53dRsPlWOS', 'W4ivWRa9zW', 'rwjwW5aF', 'oSoWW6ddLt4', 'd8ojt8kFEq', 'oCoWha', 'WPtdNSo9baW', 'tNK9oa', 'WPHvu8oyWOK', 'WR3cKWpcJ8kS', 'dSkzvmoP', 'Fr1vpHK', 'WPughmojWPe', 'nCkdqMW', 'bdHF', 'fZLjlwC', 'W6f5W7BdTW', 'jSkSr8A44BIE', 'gSoAkdOI', 'W4H5qv7cMq', 'eIVdIG', 'WPfYg8koWO0', 'ceVcRf4', 'WO1vi8o7', 'hYRdMZn9', 'W7GkWRaXxW', 'bCkvz8oJhG', 'W5xcOu8', 'W7lcMKlcNHS', 'zbrvkXe', 'ferAWOe7', 'W4lcOLhcVc4', 'kspcVGCc', 'WPDGc8oFWPy', 'wSohkH8b', 'W4moWRCP', 'W7H0W57dRCk5', 'qN3dUGFdPW', 'W5/cUMRcUIG', 'BMVdVHBdSW', 'WOJdLbWsaq', 'WQRcQc0', 'yLtdOYtcKq', 'WRKwW6/cH8kN', 'gmolmqSU', 'vu5qW6WH', 'cSoCec44', 'gmocs8keCW', 'F8olW5TFeq', 'f8kPW7fyW6O', 'WO/cNrzEaq', 'WPxcLqBcGmkM', 'W6JcMmo/WPeY', 'WO7dG8kWW4S', 'yLddLcVdPG', 'W4n9W5FdSmkG', 'gSoXhZ8', 'zbXUla4', 'yX7dO8kJEq', 'W6H+WQtdHSkY', 'zMDAW5W', 'W7aoWRW1Bq', 'W5NdIXXqWPi', 'W5tcOfNcVsC', 'hrbgWPJHUQ0', 'WOWRWQPqna', 'W6z2W77dOa', 'omoGW5ZdTdm', 'cmoUzSkNDW', 'eaVdMrbq', 'rvNdQW', 'WP47W798cG', 'zaBdUSkNBW', 'vmoamdrz', 'EhtdHYBcQa', 'W70PWPhcRmkl', 'uxG+', 'W4hcOLNcPI4', 'AMNdGsBcQa', 'WOpdI8o7da', 'kCkfrMDu', 'FmoTeCojWQu', 'lColht4t', 'dmogeYO', 'WOa6W4xcKSkv', 'W5ddOaXwWQC', 'W7/dTGDxWQu', 'WP0QW7Dvmq', 'pCkGW61nW6y', 'FeRdKJVdSa', 'W6H+WPBdKCkU', 'z25gD8oF', 'uSoTW5yt', 'ahryjNG', 'gSoedcS5', 'dSkgFu9Y', 'pmokvmkJDa', 'WP0RW4hcKSky', 'WONdHCo7baq', 'W5ddMYTpWOW', 'WPldQmo6gry', 'W610W6ldRCkO', 'W5dcVKJcUIu', 'W6LTW73dGSkn', 'WPuTW4VcJCk1', 'EMD2W4qd', 'xmk+W4Taha', 'lSoWW7e', 'W6CvuSo8WPe', 'WRWjt8o7', 'vCoNW7Ljjq', 'z2hdHJZdUW', 'fmkpEfPG', 'WPnWymozWPm', 'ocronq', 'mmoIfSoZdG', 'eXpdMd50', 'WQ01u8o7WPK', 'm8kJWRbnW7S', 'WRNcJG4+nq', 'hJ3dJtLq', 'W78IWPDLqq', 'e8konHDC', 'WPyPW4hcJSkc', 'kSo9W6ddNtW', 'WOldKWadaa', 'W4zcE8kABG', 'eqhcHfCD', 'tMu7oa', 'e8ofoZqQ', 'o8kdW4T2aW', 'jSkerLG', 'sx9AW4iS', 'W49ZrelcLq', 'sCk7W6ldRbq', 'W5NdMITqWO8', 'iSo+W4aa', 'm8kLW5i', 'gSovsCkDyq', 'nmkvuCoVga', 'r3KH', 'umoajX1d', 'WRO/hbZcIW', 'WOVdG8oQaXy', 'W5/dNcpdRZi', 'vmoaqmo0', 'xSk3W4TDaa', 'WQdcHXxcOSkG', 'FCo9emoeWQ4', 'pSoDoteV', 'W4zyESks', 'W5tdHILA', 'W61hW7/dPmkw', 'd8ote8kEpq', 'E3xdHIC', 'hmocft4m', 'W6iZWPeUrG', 'WQ7dHCk6WOdcHW', 'W7FdOdRdVte', 'lmkPW5fCpq', 'oCk/aSoFdG', 'gSoyja', 'WOC6W4a', 'ef9uWOX6', 'WQurtW', 'ECoeW5jgcG', 'WPFcHalcJmkN', 'vCkFW7tdJd0', 'q8k+W55f', 'vsDRlcO', 'W6TjC8kEBW', 'W4nGW6pdRCkl', 'W7pcLCk+WOeV', 'EgDuW4qx', 'W7hcMmkXWPWL', 'W5FdJsXAWO0', 'et3cS3y1', 'WP02WR5lFG', 'bWlcSrCG', 'shJcKJve', 'd8opq8kbza', 'tCk9W4ZdIcS', 'o8kjvLy7', 'W65Gu0FcRa', 'd0ju', 'WQBdSMRdO20', 'FNldMtZcMq', 'k8kIW5HAjq', 'W7vKaedcMW', 'z2hdJa', 'gCogkZGH', 'WO45W7zo', 'dCokz8k3zW', 'n8oEgmogWQ4', 'Eh9EW5CD', 'WOnfCSkECq', 'W6jLWPldKmkP', 'uMm2mXK', 'WPpdLXObfq', 'W6zJW4FdRmkc', 'W5yeWRqJ', 'WP9tjSo2W5W', 'WRhdG8kAWQVcSq', 'bWlcL0mz', 'gvhcRWNcTa', 'dWJcRq', 'WRiapxpdLq', 'ruVdVq', 'mSkBs1zs', 'jSoHkSoCWRK', 'rN9vCCok', 'c8oxxmkbEq', 'WOzMomolW6e', 'WOSWW6Pn', 'WP09W51OkG', 'CNvgF8oF', 'WOmZW4xcMCkt', 'W7mOWPC/sa', 'W51jBmklza', 'AYtdGYxdHW', 'WONcNMqDW4e', 'fGJcRbC3', 'mI3dKczP', 'eGdcLq', 'fc5nlwS', 'oSoKf8otba', 'q2Hqy8oe', 'W7VcH3pcUbO', 'W65Gu0C', 'p3ZcHJpdVW', 'WQrOkCoAW5K', 'c8oggtm', 'vbhdRr9X', 'emodlJe/', 'WQWZv8o3WPG', 'WOJdNaOwfa', 'x8komaRdMG', 'uSoUW5yvgq', 'yMBdHY7cQW', 'WPhdNr0hiq', 'WRzyaSouW4q', 'W6hdQZRdRt4', 'W53dOJvvWOK', 'jSoLhmoCba', 'kSk3FCoVaW', 'DGhdVCkNBa', 'W7qPWPChtG', 'bIJdNcu', 'W6ldOI7dUdq', 'pCoSW7xdMW', 'W7ZdTc/dPXy', 'WP3dV8okdYS', 'BSoPWRbFW78', 'W5aEWQe1', 'WOJdNaK', 'dsrfmq', 'pSkwq2W', 'WPryDq', 'W7BdGHvXWPC', 'imkGECo5fq', 'W7VdVqJdQI0', 'fSo5W6RdNZm', 'WQJdNSkSWPy', 'WOW9W7DQmq', 'wMldVslcNa', 'WO9Yr8oiWOq', 'aHZcMKKJ', 'W7P0vfBcOq', 'C8oElJjE', 'm8keF1PN', 'xw8Gcqy', 'WQNdNs0via', 'fa/cMLyE', 'rxm1mJO', 'gmo6nmo4iG', 'W5JdVJy', 'yM3dLcJcOW', 'uSoCkWTd', 'gCoVfCoaWRG', 'WR3dLCkjWPlcVa', 't8k4W49w', 'W5mhWO7cVSk3', 'zNLEW5CC', 'Bmodx3G', 'arNdObb4', 'vmohW59chG', 'hmkUW651mG', 'vSolmcDD', 'rmoEibLe', 'bc57mhO', 'xSkUW5Lm', 'e8oleJOt', 'pmkEqwvb', 'bSoitCkj', 'bSocqSkkDa', 'zg7dKa', 'p8kDgKqJ', 'd8kEv8opaW', 'AqVdVq', 'WRebpxxdKW', 'dmogrCkb', 'eHBcGHOw', 'hmomnCoPWQC', 'nrVcGK4t', 'WP5hW6bICG', 'mCk5W5jx', 'W6bUWPZdGa', 'W5hcHCk9WP8e', 'W4lcVLtcTJ8', 'W7VdGY7dNau', 'jCo6W6tdMH4', 'lCkIF2fv', 'bWldVHLN', 'W4GiWRa0sW', 'cSktw8oMjW', 'WQNdVaSRiq', 'dIv4BqC', 'WPldMmoJhJ0', 'fCkvuCo+dW', 'WQ5PWPldH8kJ', 'WOe6W5tcJmkx', 'W6rqW5VdP8kC', 'ehpcId4A', 'gSodxcSo', 'FxXgC8ot', 'rCojW5TFgW', 'mCkzW7PEW7K', 'BhfQW4Gk', 'jSksEfGh', 'WOG0W6bojG', 'lCoGW7FdNYm', 'WQi5i2BdQG', 'WRhdR8o/lJe', 'WO5Lrq', 'WOTYva', 'W6hdLWD6WP4', 'WRqupwy', 'WQ7dJ8kWWOeJ', 'vM8GorO', 'WQf8WOldKSoG', 'amk0W75pW6a', 'WOHrpSoR', 'W5RdOtzzWRi', 'wSk0W7LqfW', 'WQqhkgtdKq', 'zarPmXG', 'W61sW6pdVCkv', 'W4PfW5/dP8kz', 'mmksxhns', 'E8kfsMyo', 'bdTapNe', 'E3ldMJVcQq', 'tNX2W4GW', 'WPa7W4O', 'hSokgb4l', 'WRCkW73cK8kN', 'nmkeFfDG', 'W6WrihhcMG', 'suNdQHpdVW', 'W6DtW5RdLmkH', 'sg88mqi', 'E1tdMItcOW', 'as/cQHCX', 'WQ/dKSkY', 'WPFcHGdcImkW', 'x8oFctXh', 'WPProCo+', 'WOWXW6HFnG', 'xKJdOWhcQq', 'F8kFW7ZdJda', 'WPTcp8oWW4a', 'W6fJW7RdQSkb', 'cYDHpNG', 'WR0Alwi', 'xLldUq', 'bIxdJY9h', 'xCoccrLa', 'W4DHt8oFWPq', 'WPxdJ8oCgra', 'AgxdOIdcTa', 'g1vdWR18', 'WQaFu8o6WPe', 'W77dOHBdVI0', 'b8kermo+bq', 'emoBmmopWQe', 'oSoWW7FdId4', 'W4NdVZjbWQm', 'DCowW45zcq', 'Fg5aySon', 'AHDtfr8', 'imoheJSi', 'd8kErmoPhG', 'WO54u8oEWP4', 'WRNdVmkgWQdcTa', 'p8kVW5DAjq', 'lCkfsG', 'hGdcKL8e', 'W4OqWOpcVmkb', 'F2vC', 'W59ECmklEq', 'gSodW5tdJIq', 'WOe2W4pcImkc', 'AM3dKa', 'W5PCB8kqza', 'WPxcHWe', 'dSkVW4ldIeu', 'vguHiJS', 'rmkfW6/dIGa', 'WOpcHH7cMSkw', 'W7v0WOFdLG', 'W6mIWPa/vq', 'n8kJW5bcW44', 'W67cMSkeWOa4', 'W51yiSkkCG', 'q1L3W6mF', 'fv5uWOf7', 'WP1ylmoVW4y', 'bmoiwmkezG', 'WPpdMmoUdGK', 'bJ9fkw0', 'W5fUWPNdPSkw', 'WRldH8kIWPRcTW', 'W4NdOtXmWQK', 'hIVdJIHm', 'W4DtW7JdKmke', 'W6HZt1tcNq', 'W7pdSrfkWPy', 'aWtcUrO', 'WRldMdlHUzGP', 'W65OrfBcGa', 'rmoqq8o4fq', 'W5NdIWXuWPy', 'kCksxvbb', 'WQ0Es8kXWOq', 'W7foCW', 'i1ntWOm', 'W6HUBgxcIG', 'W7tdG8k5WOhcQG', 'W7lcG8k5WPeJ', 'W6e1WOy5sa', 'W4SvWQq1qW', 'WONcL2GhW4HGmSojWQddS2/cLa', 'W4hcVf3cRsq', 'imo7W6hdMY8', 'q0pdVrRdMq', 'W7DSWOtdH8kb', 'bIJdNcvh', 'pmoblCoOga', 'omkfyvK8', 'dfLdWQXS', 'WOxcHb7cGmk9', 's8kmW49gmW', 'lCkfqgnw', 'W43dV0tdQtC', 'eqHojwq', 'W6hdStf3WRy', 'WOmTW4VcLmkz', 'wqbgkrC', 'vSkmbmoWxq', 'hCkIW6vPW6m', 'nZhdItnQ', 'amkecSkSwq', 'W71Srv3cMW', 'WPuvW59naa', 'fb/cSbCQ', 'rGfJpY4', 'WO5Jq8ocWPG', 'W4WwWOhcRCk2', 'pSoNd8on', 'W4CgWQeKDW', 'E2K2oa', 'zgbyW4CI', 'WPzvlSo0W7S', 'mSkPW51diG', 'dLn8WOHP', 'Arntk1e', 'oCkNW61hW64', 'fr1HWQm1', 'z8kgW7ZdNYS', 'kmkfq3nS', 'WRlcNXxcKmkK', 'W4XrW7BdPSkA', 'qg/dUcpcGW', 'o8kIW7PTW78', 'EqTxlW', 'W40qWOxcT8k3', 'gCoxqmkeDa', 'kSk+W4v3lG', 'WQldM8kZW47dUG', 'W5bPWQhdO8ka', 'WQ0NwSo8WQi', 'WRSkW59lfG', 'ygmomSko', 'DrJdQSkKEq', 'WPOXW4m', 'l8kBFCo7gW', 'kCkyFhrb', 'W6lcHMdcMXK', 'gIRdMG', 'b8opocWI', 'WPldLWaxmW', 'W5hdOtzE', 'W7/cR0ZcTJ0', 'hCoEjdv+', 'nCkVW7a', 'w8ofW55XjG', 'WR4XlKxdOG', 'AXTvoqG', 'WOOKFCoWWRy', 'W5lcU0RcRs4', 'WQedBmoRWOq', 'WRWcxSo9WP8', 'd8oUBSkiCG', 'DsvRpdm', 'WOBHU49kWR7cJa', 'lmoTWRJcNgC', 'pSoRf8opWR8', 'hmojptWV', 'm3L8WQLa', 'WQqUsaddKq', 'ESkdW7NdLce', 'WQuvtmoTWPu', 'kmkUA2HW', 'W708uf/cJG', 'WPFcTYpcJSk4', 'WO8Clq', 'WP9upSo8W5m', 'W6uTWPBdL8kX', 'W78MWO4U', 'o8kuqve1', 'ACkDW6hdNta', 'dfXcWOPN', 'W4PAESkryG', 'qmk8WOznca', 'Er7cOCkYDa', 'WO7dNaCx', 'W4JdJITxWPe', 'W5SdWPtcUa', 'WP8ZW6NcGCkg', 'eCobeY0', 'WRRcRZ8Ria', 'WRBdNH8IgW', 'W4lcPLFcQa4', 'WQGbjfpdRG', 'WQZcMdeXjW', 'WPOYW4e', 'WO9Wr8oiWRy', 'W6iIWOq', 'WOtdNbO/bq', 'W45iE8kSEq', 'kaZcTXax', 'g8ofzdOK', 'WONcMwug', 'WPRcTJOueq', 'WPvLq8ok', 'WRKggNldIG', 'q8olmaPj', 'gHBcUXNdOW', 'W5ddVtDDWR4', 'WPLYsmoi', 'fSogidOG', 'ECkBW73dGYe', 'zbvoja8', 'iSksySoana', 'b8k2W5DMmq', 'r2S+oG', 'mCkIW7Lboq', 'EajdkWG', 'W4meWRy/wG', 'CIfsFCoq', 'sg/dMZVcPW', 'kmo3W6mC', 'zSkkW7BdIJa', 'nSo5bmociG', 'xSkPW4vqcG', 'W5ZdOsfxWRq', 'jCkmW5PlW6y', 'W7iYWPe5qG', 'rrJdLSkcsa', 'hYRdMG', 'WOtdI8oJaq', 'WQ/dKSkBWPBcTG', 'n8kQW49vba', 'W5BcQ0W', 'tmkmW4DJnW', 'WPDtoCo6W5y', 'lmkPW4XFkG', 'i8k4Euih', 'WPldUSoOhYS', 'BGDvobK', 'WPjCkmo7', 'W4ejWQuCAW', 'br3cRW88', 'WOyBW47cUSkK', 'x0zEWOLR', 'pmo6lCobWQy', 't2/dUHhdSG', 'CmkRW5nCla', 'WQCOW7DFjq', 'WOOXW7zkcq', 'WQyuoNpdUq', 'WR4MWPuIqq', 'D21FW4ar', 'mmk4W5Lbjq', 'WPtdGai', 'mWVcMLSf', 'W53dGsSqWPW', 'W7VdVqtdQZi', 'W5LyWRVdLCku', 'ACkhW7NdNWC', 'BSoQemoEW6S', 'Dv19CCo2', 'W6JcVhZcQtK', 'xSk6W59xaa', 'W4nnzSos', 'WRKLWQdcQ8oC', 'WPmKb3BdVa', 'W6tdRYJdQW', 'DWVdUW', 'WOldV8oDiq', 'd8oYabe7', 'WQ/cMrRcP8k8', 'hZFcNve0', 'fv5tWOH2', 'd8kCwCo4fq', 'W71ZuLZcNq', 'W6ZdHt5YWOS', 'W5lcQ2/cSdK', 'W4P3WRldVCkv', 'yaldRSkZBW', 'j8kUW7bBW5S', 'qL5oumoC', 'WRWvtmoQ', 'WPLxW79PlG', 'WPhdJ8oHcq0', 'h0jsWOX6', 'W7JcTM/cHrG', 'WOdcLqhcNq', 'CCkRW4zfbG', 'rColnLHz', 'bb3dIXGw', 'zrRdOmk6yq', 'WRHyoCoVW6C', 'WPaSW6Hw', 'ACowW4Dcha', 'fahcVHO', 'c243iHC', 'mSkVW7G', 'cCogqmkbyG', 'W6JdPUg7SfBcOq', 'WO8rkhpdMW', 'shJcKJHl', 'FaldGSkRFq', 'nCkVW6TfW6u', 'jmkIW4PYoa', 'n8o4c8oreW', 'cY4rFxG', 'WRrcq8kPWOG', 'WPK7r8oYWRK', 'FHPipq', 'WPOpW4ZcJ8ky', 'dIvjlq', 'h1HsWO5L', 'W5OAWPtcVmkT', 'iCkQW75yW6q', 'faBcP08+', 'WRxdLSkIWPRcRG', 'AZpdG8wB4BUY', 'vM88', 'W5ztBMNcPW', 'zMNdKt3cQq', 'jmo0W6VdIZy', 'W7yboJO', 'edGwCcC', 'E8oNdX9H', 'asdcTqKZ', 'WPtdGaiamW', 'zx9oW4TD', 'qSolW4P6bW', 'dGr/', 'dfXwWPrR', 'lSk+bCkz', 'gmoicqC2', 'WQNdGCkGWPlcSq', 'W6BdTYVdUG', 'stFdJZ8F', 'W6H5WPldNG', 'nCk2W6XUW74', 'yKZcSq', 'W7pcKCkIWOOS', 'W4JdNtblWPa', 'W4PUASklyG', 'W7GPWO0Uvq', 'WRLIgCo6W50', 'ocrCk3S', 'mSkPW61bW6O', 'gSoacbGl', 'W5ewWRtcSmkU', 'W6rYW73dOSkB', 'W6z4W6FdRmkj', 'imoWW7i', 'rSkwW43dGZ4', 'C8osW45g', 'W79KvgZcJa', 'WQKfs8oX', 'W4yhWPldTmkW', 'W6jIWPNdH8kN', 'W4eJWPtcNmof', 'DColWPeAuq', 'WRJdMmk7WOpcTa', 'fvWyWPL8', 'acfldve', 'it5cpa', 'WQdcRJdcQSkg', 'W7/dPZ/dRti', 'DNnADG', 'kmo/W6mFW7C', 'gL9fWObV', 'WOxdI8o8ca', 'W4ClWRGZAq', 'lmo7W7e', 'W6pdQHRdIr8', 'eJLalfC', 'W5/cUMZcTIy', 'W6T/W7BdQ8kl', 'vSoTcGLJ', 'WR3cKZS2na', 'WPLVq8o1WRO', 'wCkAW7njfG', 'o8kBW5Lrhq', 'fmkvuCoOfq', 'nCkEw0mL', 'd8ousCkzia', 'r8kAFJ0O', 'W7hdVsG', 'WRegoG', 'AdbglGG', 'dZJcG24V', 'jSoM4BQ6WOJcUW', 'W54mWPpcQCkS', 'sqddRbtdTa', 'W4VcVCkBWOir', 'C8kqqg9u', 'W4VdMYS', 'W5tdVdDD', 'nmoCpXG9', 'W5ioWRu1Bq', 'aq/cHu5s', 'WQTDB8oOWOq', 'd8kEvmoPfa', 'W5moWQ3cUmkZ', 'C2vFW7Oa', 'W5fCiSo4W50', 'zSkWWOLpEG', 'W41gzLtcPW', 'd1xdLara', 'eSodlYa', 'oSkEqMeD', 'uSogfX1c', 'W7DNrG', 'W7aQWOy', 'WRFdLSkVW5xcSq', 'bSoitCkjsq', 'b8kzxSoPhG', 'WRpdG8k7WP/dRq', 'BSoEkbLj', 'wmk7W4ddVty', 'W6PGsvC', 'aCototW', 'W5ddPZzv', 'rv3dUHBdRW', 'dCoTcSoB', 'W5ZdHdzAWPa', 'jSkDveK0', 'W4CdWOyXCa', 'W77dGcJdPYG', 'WPerW4TDdq', 'amoyjsOu', 'c8k2W7nnW7i', 'baVcGK8m', 'W4CvWRqXDG', 'WO5Jx8oaWPG', 'W7ZcQ0NcIGi', 'W4SnWRpcRCkX', 'cGRcMryR', 'txW3ja', 'mmk4W6HAjG', 'WORdHCo5cay', 'WO3dKXCwhG', 'rmofwmkd', 'W5hdGtTAWOC', 'W5NdHt5h', 'W7VdUJ7dSG', 'WQ4zu8o7', 'WO4EW7vXlq', 'W5KhWPtcUSkR', 'WQqbjMK', 'Fu98W4Cv', 'W5dcHSkPWOWW', 'W4T8WQBdICkK', 'WR0QW7Dvmq', 'WPXNvSoaWPq', 'WPddMmkIWR/cVa', 'WOJdHmoQ', 'dahcRa', 'W6T7W7ZdTSkk', 'F8kBWOLjhq', 'WOXVvmohWOO', 'WP86W4xcKmkF', 'xxXgC8ot', 'hCoNW6tdNtW', 'FMjFW4a', 'oSkTW4HsEq', 'WPhdQCoTfW4', 'nmoKeCoF', 'W64JWRqIsW', 'W7BdHdXYWQK', 'W7tcHSk8', 'W6dcNCk/', 'zqzkjG', 'f8o8W6PQhq', 'mCkssxq', 'WO1aiCo2W4y', 'tCk0W4rqba', 'ASokW4Ps', 'F8ouW4rhba', 'W5ZdOcbzWQe', 'k8oCeGue', 'WRqAW6ZcSSk8', 'W7H2W6hdTSkk', 'WQVdLSkKWOdcVq', 'y3TDzSox', 'WRJdLSkIWPRcTW', 'ceLhWOG', 'WRNdJCkCWPdcKG', 's2q7mG', 'vhG9jG', 'jmkZW6Xe', 'ecPfk2e', 'gmogW4ddRI0', 'WPpcHLlcJmk7', 'zcjpjri', 'W64OWOixqW', 'W6iIWOyGtG', 'd8o9hCoKea', 'r1FdKrRcTG', 'ssDacZy', 'W4bWW4hdSmkD', 'W79OWPTMsG', 'nMXs4BIibW', 'EaFdQ8kV', 'aH7cHLuo', 'vgpdKse', 'nSoneCobWQC', 'qN12W7as', 'BWDtlW8', 'cCoiqmkcCG', 'WO0QW6Lj', 'W4RcNrtcM8kO', 'hbpdItFcRq', 'WRvYt8olWPu', 'eSkFqa', 'e8obgZi', 'AghdMspcPa', 'WRKBlwldGG', 'y8kbW77dGHS', 'WReGoMNdVG', 'W7tdSJa', 'WQufowJdIa', 'W5KGWRe+vq', 'lCo0W7hdN2u', 'ySkaW7tdIse', 'aHZcMKK', 'o8k+W6XblG', 'WP4yB8kh', 'wmkYW5LnbW', 'EabelZ4', 'W7OWWQWUsW', 'bCoRd8oRWQa', 'W4P3zhBcPG', 'xCkRW4zneq', 'bCoFoJe', 'n8ksxLK/', 'WRtcOGlcQSkM', 'WR7cGrBcUmkJ', 'W6dcHmkGWOKP', 'hSoct8kfxW', 'cCoiwCkdDa', 'zw5iW5yA', 'oCkJqa', 'W7xcKCkJWPe', 'W6tcHSkIWOOY', 'DmodjJfD', 'gSocs8k4uG', 'W7qyWOy5vq', 'hCopid4J', 'W4OgWRW1', 'jCkftfW0', 'WPT7sCodWO8', 'W5dcQN7cTIu', 'cSkuFvLs', 'W5CcWR80', 'qmkCz2T+', 'WOddPX0Dka', 'W4KgWQm7zW', 'd8kEvSoJ', 'zCkxW6e', 'bXJcRreG', 'CWldPSkPzG', 'DxWFmZa', 'W6BdMb7dTda', 'gmodlsSK', 'W6T7W7RdOmkb', 'pmkFW7rhW4m', 'ACo1W5XndW', 'WOW2wSo9WOe', 'W5OqWPlcTSkX', 'WPyXW4C', 'gSoola', 'W4vslmo8W5K', 'W7aZWQSNCq', 'ct5bahG', 'mCoRlSohWRK', 'W57cU0RcVc4', 'WR/cGCkYW4BdRG', 'WP9jB8k/W5q', 'yuPmrSoo', 'zgHBCCoB', 'i8kdtguq', 'bmosqq', 'WRPYl8o8W74', 'WQ7cVIOloG', 'sCksrCoVbW', 'fmoOnCoHkq', 'WOiamCkT', 'WP7dImoMgGS', 'W4q8W6XmyW', 'FhTguCor', 'o8o4emomWQ4', 'W6ZdPZua', 'hCkjW5fEW6m', 'zM/dLYBcQG', 'ymobdYLf', 'DqFdQmkIEq', 'WQ3cUIO+', 'Dx5jW5Cw', 'vNiEzJJdMmkcW51gW5vrFb8', 'a8ojs8oayG', 'umokaHfE', 'WQpcPslcI8kS', 'funwWO9I', 'W4naESkB', 'W69RWP7dLa', 'WRddKSkK', 'fZLjm2C', 'vxvXwSo8', 'cCohgdGi', 'iSoIgmorWQ4', 'WQ4zuCo6', 'BbzufrG', 'W5fVvLlcGW', 'ywPeFCom', 'W6T5rSkmrW', 'W5tcVfFcSYC', 'W6lcPMRcIYi', 'W6ZcKCkJWPyH', 'o8kqqvm5', 'xLtdQXa', 'p8keW6rQca', 'wuJdTrhdMq', 'iaJcSWi8', 'W55DW4pdJ8kz', 'jSkNW6G', 'g8oqobSj', 'adhdLhXo', 'W6ldVdtdQZi', 'WQmak3tdJG', 'yZDaD8og', 'jwxdHZ3cQq', 'WPr5q8oE', 'W5hcNfzFgG', 'W555sCoyWPq', 'WOZcOMCnW7e', 'bmkFxmoOvW', 'hmoCgtGj', 'W7VHUzXZsCkZ', 'bbRcK1qz', 'tu7cHf8q', 'CqldUmkRDa', 'efvrWPK', 'W4JdGZ5gWPO', 'W50bFmkqCG', 'W7BdHWm', 'u2m2iH4', 'WP0+W5dcICka', 'WO1yiSoO', 'W4ddLt9+WRy', 'W6dcMmk5WOfG', 'CrRdPSk8Aa', 'W4RdUZXp', 'W5RdOZ9zWR8', 'W43dHJS', 'm8kPW4HBja', 'gSoltCkuzq', 'pSktWQ4', 'y8kCW7ddIca', 'WPL2uSonW4C', 'WP/cGbFcHa', 'BSooWPelwq', 'wghdTIVcVG', 'W40aFW', 'jmkPW6XyW4y', 'CuzBEWa', 'WO3dMmoGpWW', 'W5xdVdrxWPK', 'W5HPWRukzG', 'WRJcUICrgG', 'WP9/umogWOK', 'gmocwmkFEq', 'W5xdGZ9sWRq', 'WP7cMWhcNq', 'n8keqv8H', 'WP42W4dcKSkz', 'WPFcLXNcHCkG', 'WQyCoM7dMa', 'W4PmF8oJWOi', 'W7aJWOCisW', 'W7vOrehcGa', 'WP0DW6LFlG', 'WQ0cymoUWOy', 'sMW7mq', 'sxHEW4ay', 'DaFdUCoQBG', 'gCocqSkjxW', 'W50fWPKpvq', 'dCk0FhLW', 'khihmSoD', 'WRSrW4hcUmk7', 'W5nGux7cIa', 'xSkRW49a', 'prJcHg4e', 'B8kTW63dMta', 'mCk0W61dW7K', 'WRFdM8kZWPFcHW', 'DSkqr1KW', 'W7WOWOGDva', 'FHDciru', 'g1LrWPq', 'umokid1g', 'W4OmtmkwEW', 'fIPveue', 'fSkrrmoKaG', 'W7uOWOa+sG', 'W4SaEmkQW5m', 'i8oMW6RdKa', 'W5ddTdPwWRu', 's2PgD8oy', 'yXnklW', 'WO7dHmoRcbO', 'WRugoMBdNq', 'yMtdGsFdVa', 'e8kwvSoPhG', 'WPxcHGVcMCk9', 'BKJdVrtdSW', 'WQb+W5fYf8oJW5eKr2KGW6pcTq', 'W6HTquRcIG', 'W5RcOwelW7u', 'W6VcNCkMWPC5', 'ACojW55zcW', 'EM5vW4ih', 'hLLzWOX8', 'fSoagdGF', 'ygjFW4aC', 'W4zkBCkEEW', 'xSokitLe', 'eW/cGLS', 'E8ocW65zgG', 'W6NcGmk9WOL1', 'WPhdNG8kcq', 'eSklFvOK', 'W6j6W4eHua', 'W4BcQ1RcUZK', 'v0H4xmo2', 'W4DRuW', 'aCkBz8ocdq', 'WQW2W4a', 'j8oOW7XdW6y', 'W7hdOJldVdy', 'W6lcLCkKWOWV', 'WOVdHSocdbi', 'omkJW45EkG', 'lCo8W7pcGa', 'qchdNmkE', 'B8kbW7S', 'WOBdICoKhG', 'FHDgob8', 'WQr3o8ovW6i', 'CCkOW5LhkG', 'lJ3dHaPm', 'WRpcMshcHCkg', 'WRvJf8oRW7y', 'BSoAlrvv', 'WPiYW4e', 'W5XtkmoXW4y', 'a8kEuW', 'C8olW4O', 'WOOtsSoeWOW', 'qCoApqHv', 'WOFcUIO2jq', 'W4GiWRa0', 'W6JdJdPkWOu', 'eSkjqmoP', 'W5tcVeRcSdK', 'afFdV0b0', 'kmkfCSoDhG', 'zgPvW4eC', 'W4ZdHJjAWOO', 'WR7dMCk1', 'Fx1AFCom', 'WQSCvSo9WP8', 'WO/cRJa8', 'W5evWR0', 'W5RdOrJdUre', 'W5BdJJPXWRa', 'WROFu8onWOq', 'WROFr8oN', 'wSokiqX2', 'W616W7hdOmkl', 'jCo9bmojba', 'W6L5WOpdG8kX', 'hSovtCkoAW', 'r3TrW48H', 'W65+W6hdTSkB', 'W5BcGaKLaHFdSmk6', 'z8oxdgzv', 'WQvcASokWQS', 'cSkzvCoIga', 'yWVdRSk4BG', 'ygHFzG', 'W67cVYFcQW', 'lSkGW51klG', 'zM/dKsO', 'W4VcQWldV3O', 'WPyBW43cK8kg', 'yNjlW4a', 'q8oliXfd', 'B8o0WOSlFemYW4dcQtlcV8oz', 'WOldJ8koWRBcUq', 'oCoGW7BdLG', 'r8ohib1F', 'lmkKs2zr', 'WOGQW6PzjG', 'cX7cTHCS', 'aCkzvSo1', 'vxzDECog', 'AcD1bG', 'WRNdLSkLWPBdRG', 'hvPwWPu', 'yHVdTSokza', 'W43dRt/dSq', 'xmksW4fOfW', 'jmkoW6JdNsG', 'W49KvNdcHa', 'nmkzrNrw', 'tmotq8oq', 'WPFcLH3cM8k9', 'WR0umq', 'v3O+pWi', 'y8kbW7ZdIdW', 'iSkdta', 'aCoplq', 'WQZcVt8QpW', 'WPldRSoLnZa', 'EgxdHJZcRW', 'W7hcHSk1WPCV', 'W6BcLhdcLH8', 'EqddQa', 'W5ZdJITEW4u', 'WO5sW5ddVa', 'W5PzDSkB', 'EwLiW4ab', 'ksFdJI8', 'rbJdGSkFBa', 'WOddMmoGgaW', 'W5BcP17cPG', 'W43dUbz3WQ0', 'WQNdNmo4W4TR', 'W7Xdyv7cTq', 'ibFdMrbi', 'WPX7CCoF', 'W5BdVty', 'WO/dOZq/lq', 'bCoylcKQ', 'WPBdKWChbq', 'WPe1W6rLnW', 'q07dRXddOG', 'DtRdPSkNAa', 'WQyWc1ldNW', 'W7CSv0hcJG', 'd8opgbGj', 'WQOjuCoTWRi', 'fYRdNJLr', 'W4neWPhdH8kd', 'W6r4W7tdQSkW', 'W6lcH8kJ', 'xCkVW5HncW', 'zspdP8kerq', 'WOO9W6rEoG', 'ybZdQSk4yG', 'W4/cG1uvaW', 'ySotW5jIaW', 'WRRdLCk5WOBcRa', 'W4fdCmkp', 'aSkvu8oJca', 'W6HJWPpdLSk6', 'fmktvCo/', 'W4PeCmktCG', 'j8oIkc0Z', 'lmo0fW', 'y8kBW73dGa', 'zg5CW4Wa', 'FmkwW48txq', 'qMuGoXC', 'EqpdQG', 't8kfzG', 'z8oYW6RdKta', 'ESk7W7FdHIe', 'W5ymWOxcQW', 'lmoxW7ddIIm', 'WPRdMqlcHCkO', 'W5vAW6f+nq', 'bCogkcaU', 'rrNdQmkFqG', 'cSoCea', 'jmksub0M', 'qCobnGXv', 'W5TiBSkmqq', 'n8kQW7bFW64', 'o8oGhConWRm', 'xeJdQuNcQq', 'WPCFt8oQWOC', 'csryage', 'l8kHFmokca', 'gffdWOW8', 'zqzkjKK', 'FGhdOmk6', 'W6CLWPKktG', 'bubsW4j+', 'W6TXtfRcMW', 'W7uYWPeQuW', 'WP7cRe3cVca', 'WQ/cJYKghW', 'WP1fp8oTW5C', 'WQVdHCk5WOFcTW', 'dbNcSG9W', 'hmobeIKv', 'xWDZmJy', 'w8oDkXy', 'WPRcKYy+eG', 'WO0OW6fBnW', 'F39sW4OD', 'd8okhsKc', 'WRRcRYO', 'tKJdQa', 'v1zyu8o7', 'W65+W73dOq', 'eJLa', 'eaFcKem', 'W7H4W6ddSCkI', 'WPn4uSofWPS', 'Eq3dU8kVAq', 'ct9jlwy', 'aCoyid4S', 'W59TW6RdImkN', 'fmk6W45NmW', 'WR/dLSkIWPi', 'dqpcUWy9', 'WPiLW4RcP8ku', 'vhG9iHK', 'W6uyWPFcLCkU', 'WPGdWRGMiG', 'xMZdVqhdOW', 'WQZcGbNcJ8k6', 'W4PEBCkqza', 'gCocxSkBAq', 'W63cMmkDWOqW', 'WOaRW5BcICky', 'W5tdSIftWQm', 'wKZdVZddQa', 'W7TGtf/cJq', 'W6hdPJtdQa', 'WQaes8oUWOC', 'xtD3jJ4', 'x8obkWG', 'vmoCzKz7', 'AbTaiGG', 'WP/cMHBcJmkX', 'pYVdHcT4', 'W7XGvfldLq', 'WP/cMHu', 'W48qWO/cRCkS', 'tmkPW4H9cG', 'fCkJW717pG', 'cWddPvbX', 'rSk2W73dUc4', 'mmksw2HC', 'ACkaW7BdMty', 'WPtdJ8o9gWS', 'hYNdNa', 'suaIaIa', 'c8kRW7biW64', 'oCkNWRi', 'ACkdW7hdJI8', 'v05ou8oU', 'fCkyW6L4oW', 'WPzYva', 'WRddMSoKW5zU', 'W51qW4pdTSkH', 'WPWhWPlcQ8kS', 'jCo+fSoela', 'eshdIqHl', 'W6JcH8kdWRit', 'W615W6FdICkg', 'W658EmktqW', 'kGlcQ0mZ', 'W5qhWPK', 'AvlcOmkIpG', 'WRNcQtSTpa', 'W6tcMCkYWOaK', 'dqhcTHC8', 'falcK1So', 'bcnnmw8', 'Fr5gmYm', 'EgJdMJG', 'W5VdPIDDWOG', 'imoJcCodpG', 'W4v6W7fFoW', 'W6eRWOiYqG', 'quK+nWu', 'r8kVW49j', 'W7FdUd7dSsK', 'rmoCkaS', 'lmkTW59ylG', 'WPiRW6Pu', 'W61LW4ZdTCkD', 'WQ/dMmkfWOFcQG', 'gGpcM1as', 'W73dVJ7dSq', 'W4SjWRq', 'vSocivzt', 'W4jzrhBcHa', 'W6lcHSkPWPu0', 'jg3dHxS', 'WP8+W5FcK8ol', 'W6agWOhcRCkI', 'WR4Apw7dNa', 'oCo0W7hdLJK', 'WR7cSJORoW', 'WOL4DCoyWO8', 'xetdVXddQq', 'hSo2W5FdPZy', 'AmkZfCoFeG', 'zHDEoq', 'W5CcWRq7AW', 'bshdKZH9', 'nSoKf8ocba', 'bmk1tuOb', 'o8kqr1S0', 'WQWrs8o/', 'nHnHhKW', 'W44XWOtcV8kH', 'B8kDW4FdNty', 'W684W7FdSCoa', 'uhG7mre', 'p8klW7vqaW', 'dYrFk2y', 'hv5uWOH9', 'r8olnG', 'w8kPW4zxoG', 'WPdcMWdcHmkO', 'WQSFuCo4WP0', 'fahcMfWv', 'o8o2i8ofdW', 'qhvtDCos', 'W7qLW6/cSmkt', 'WQ7dHmkZWOhcMq', 'ybnFgbK', 'o8o8W6e', 'cSoHfCoBWOy', 'W7tcHSk8WPyF', 'W4VdGrtdSru', 'kKhcOmkVBG', 'b8kuvmojgG', 'zhldLcJcOW', 'F25m', 'W7e7WQ7cImkq', 'W6xcQxpcLau', 'iCoLcSoEqW', 'bCofjZWL', 'W7BdHJ/dPZC', 'WR7dLSk7', 'FXfcoq', 'q8oplrW', 'W7jOWPNdL8kD', 'WQj6sCoiWPG', 'WPJcGcBcGmkK', 'WRVcSJO', 'W6FcNvZcKYe', 'WPLYrCodWPK', 'aJBdLdTf', 'bCoslmoQeG', 'W4OiWQu5za', 'iCoJha', 'WPaTW53cKmkc', 'WRJdHCkZWPlcRa', 'j8oHW5BdJdq', 'g8oTW7FdSbi', 'eHJcK0Gf', 'o8oBWQJcLhBcHCkdtmk4WPhdOmkdW54', 'WPxdUGWeWO4', 'aJBdLde', 'gYxdJZDh', 'omkexgfu', 'W5OpWPdcRCk6', 'WOFdKdesca', 'aCofoXy5', 'W6iZWOyLqG', 'WOJdPSoRns0', 'WPFdHSoUfaC', 'jmo8W6hdJdG', 'aSkhq2fq', 'WOe6W4NcJ8ka', 'atNcTG4G', 'jSkdwKq+', 'wuJdTre', 'W5/cU1xcGdS', 'W5tcPSkzW5HI', 'W4ueWROJ', 'WPKSW7fikG', 'wg7dPY3cJq', 'W4e3WR0XEW', 'WPpdHbqlkW', 'W7hcMmkLWOiP', 'WPhdKsmBoG', 'WP4xW7zDnG', 'W48vWQpcQCkw', 'WRWet8ouWRO', 'evfp', 'rwfvW6ex', 'gGhcKL8', 'g8oSgW0g', 'W4xcP1xcUJ4', 'cf9KWPL8', 'W5VdGdm', 'W6HGuLlcGG', 'aCkbW49FW4u', 'dLvAWOj4', 'pSkuxfC5', 'WPLvoCoEW4i', 'WPe9W7i', 'D8opW49zbW', 'WOlcHHVcJSkU', 'WOddNGiCgW', 'W7rKtLtcMW', 'W4TVCLhcPa', 'W4BcIedcLCo9', 'WP9Dka', 'WRpdHCkZWPu', 'kmo3W6RdJcm', 'mSkqqve', 'W5dcQLZcJcq', 'l8oomsSD', 'vM8Mja8', 'rKZdOG', 'v3vAzSoF', 'zmkiW57dMcO', 'W74RWRlcK8kx', 'zN9aymoh', 'ySkJaSoMd0VcUgS', 'WO7dNSoQaa', 'd1HyWPO', 'W40xWOpcRCkS', 'WR83WOSQra', 'WRm4W5lcImk1', 'hGdcK0G', 'W43dOZtdUZG', 'W7PUreO', 'WQBcT2NcQw0OrquBl8ojWO0N', 'DmkrW5HxlG', 'WOyMawZdUa', 'W4KdWPpcRq', 'W6vYW7ZdSmkB', 'jCkbwvKL', 'gmoPgaqZ', 'fmkFxmoGcq', 'WOldKXOAaW', 'W4tcOfZcUI0', 'zNTd', 'WO5NsSofWOK', 'W6VdPrD9WO8', 'WQO3W7ldQCkd', 'WRxdMmk5WOm', 's8kPW4vicq', 'z2PyE8ok', 'W45cFmkAzq', 'W6XdFCk1wq', 'cNO8mq', 'we7dVLJdSq', 'WPpdRqyFhW', 'WRPgkSohW7G', 'umoEnb1E', 'W5pdMaZdIt8', 'WRefW77cOSk8', 'q3LIFCoB', 'pmkvq2vh', 'WR7dHCkjWOpcQG', 'W6tcMSk0WOaK', 'yGhdT8kZ', 'W5lcOLhcVca', 'vLNcRWqnm0ma', 'cSkvxSoRga', 'WPiBW6mSnq', 'wqldUmk5vq', 'BM3dHtVcVW', 'jCkXbSoCaa', 'WOdcSYRcHmkq', 'wsNcKG', 'W60MWPJcO8kt', 'nCkLW5juEq', 'WQGXbqJdJW', 'qmkOW6Hreq', 'hCoAkq', 'sCooic9R', 'q8keW5Llea', 'W4JdNtPtWPa', 'bsZdHbbN', 'BSoFW5To', 'vmoCkXrC', 'zMDAW4yw', 'FGzviXi', 'WRuyk2ldNG', 'uxO2nWi', 'pCo4aCov', 'W6uIWPeBvq', 'F8kDW7tdNHS', 'W7PAW5ddJCkf', 'w0rdW7ib', 'c8oxxmkbAq', 'W4hdKqishW', 'lCkKW5ne', 'zSkaW7/dGG', 'W7T0W5ddLCki', 'bW/cHf8s', 'WOldKSo7caW', 'W5brpCoVW54', 'W5LTuSkPBa', 'WOW9W7DPfa', 'bqFcVHS', 'EhddMsBcSG', 'jmkPW61yW64', 'WQZcQsWWiq', 'WOC6t8ocWPK', 'W53cOL3cU2S', 'vCoapNq5', 'mSkGW7fsoW', 'WO/dHCo8gqW', 'W7HEd8kWW4q', 'hmoHW6pcHG', 'WQRcUJaVpW', 'W7aKWOG4', 'a8oTetqs', 'xLNdTbG', 'WPZcIrizpW', 'W5nOWPBdKmk2', 'qKtdVXa', 'W693CvVcNG', 'lmoCxf41', 'ESkDW7FdMsS', 'oCkGwvzE', 'WP8XW6nd', 'bq7cTba', 'W615W7FdOmkl', 'WOBcMbpcKmkS', 'WQr6tSoIWOG', 'W5tdGd5B', 'aSodC8kayq', 'E3ldKcpcQq', 'W5VdJJfpWPm', 'WQqrrG', 'e8kcxmo/mW', 'WOJdLGSCta', 'WQ3cMr8Ycq', 'mmo8b8ovbq', 'W6fKW7VdOmkl', 'cmkfuCoGmW', 'wutdJtxcLG', 'WR3cOI46', 'Cw4lyCkd', 'hJtdMGPw', 'ACosW5LcbG', 'WOTciCoSW60', 'e8olkG', 'AHDthHu', 'FmoSW49hmG', 'W7iRWOOOta', 'BwxdGsZcRG', 'fv5EWPLE', 'lCoHndCL', 'WQdcTtST', 'W5JdTYbNWRi', 'l8kLtea0', 'W6v4W7FdOa', 'W6TKrvJcHG', 'WOD2a8owW5C', 'W6BdQYJdQWi', 'W5tdTIblWQC', 'd8kEvW', 'WOBcLqdcMSkS', 'WRGrsSoTWPe', 'W43dVcm', 'W5TEDSkyCq', 'wKhdUHBdOW', 'WOVcRc8DbW', 'W7z7uxhcRq', 'Bmo9WO4aEeeKW6NcMJhcV8o2', 'W5tcQu/cQIG', 'WPm9W7C', 'W5TqW6ldLCkI', 'W7ntu2BcOa', 'xSk6W5Hxaa', 'fCkdW4W', 'WP5Lq8ojWPm', 'F3tdHG', 'nmkzsMq', 'dCk0W5TAW7K', 'vgyZlW', 'WPFdMmoQhW0', 'W5TXgW', 'Fx9jW4qq', 'WRWCjINdMq', 'W5PEC8km', 'gttdMdi', 'W4VdII1jWPy', 'W6JcKmoTW4C', 'WO8Ak20', 'yGVdU8k4Da', 'gmoiymkRwq', 'WPX5b8ovW4u', 'wCoCiqTy', 'qwe7obe', 'WPHCiSoWW4a', 'W6tcN2JcVs4', 'B8ouW4C', 'WPbrimo6', 'W4VdMZPrWPO', 'a8kchCoQaW', 'nmkzrNrJ', 'hvLzWOH8', 'cLXt', 'fSkuumoyFa', 'WRWFBmoQWOy', 'ENvByG', 'WRtdMCkIWPZcRq', 'dColgZqu', 'WOyrs8o3WOi', 'W6XKWPNdRmk2', 'EIDsW4Gs', 'B8kDW4JdNYe', 'W6HGwgRcVq', 'W7tdOsNdSJW', 'lSk4W4vdlG', 'cahcKGi1', 'W4NcRSkAWQS3', 'jCoZFa', 'hZFdRILs', 'WQhcUJa4nG', 'o8kQW6XGW6i', 'W5D0W7FdQW', 'rCodsCkzyq', 'W6TKq2dcMG', 'W57dVYNdNH4', 'mSkIW5S', 'WOzBW5NdOSoH', 'WQZcJdS9bq', 'tYDUlry', 'fX/cVa', 'W5xdTNeyWRi', 'kmo0W6mF', 'WRGCxSo3WPO', 'W6/cKCk1WOeF', 'W4OrWOxcQ8kc', 'eXVdNcHw', 'Fmk+W4Theq', 'oCkzva', 'W7bfEW', 'D8oBjWXG', 'x3bWz8oX', 'W5HAWP3dVCkh', 'vgyZlXm', 'WOO9W6jtma', 'xmk+W5Hlcq', 'aXFcHL8', 'gSkNW6TfW70', 'W6RdNsNdJHW', 'W4jZBmkqyW', 'W5ygWR80Bq', 'WPqXW6bunW', 'WOeIWRPoFG', 'WOddM8odaYq', 'WOVcIri9jq', 'wCk6W4nqda', 'WQCeumoQWO0', 'qgSMn0q', 'BajxjGu', 'W6LSWOtdM8kb', 'kSkQwCoifq', 'W6pdU+g7UmoXoG', 'nCkNqLuh', 'W61EW5hdOmkD', 'W7JcH8k8WOqo', 'amkeASoGiW', 'bYlcSx8K', 'W53dGsT6WPm', 'hubhWOf3', 'omkztMjF', 'WOxcVWhcJCkN', 'WPtcMXBcKa', 'vmkma8oWwa', 'n8kPW7fyW7K', 'p0LFWR95', 'zx9jW4WD', 'W6xcOYNdUI4', 'ebtcRWy', 'qmk0W50', 'WP4XW7DjnW', 'nSkPW6TyW6q', 'WO5YvCoFWPq', 'WRX/BCoAWPa', 'eJTipNW', 'WQtdVSombZa', 'W7ZdVGbuWOK', 'nCkuyL8J', 'WOBcHHFcHCkM', 'u8klW5xdNXq', 'WPDvoG', 'fSkcvCo+aW', 'x8oAeXfE', 'o8o9kSoDWRS', 'vCklW7NdMsu', 'WRKsigNdIq', 'W7TYW7ldT8km', 'eWZdRtjB', 'WPBdJsTr', 'W7W3W7NdSSoc', 'W5lcQ1BcQY4', 'reRcUXzN', 'eZBcKdPn', 'rxOIoG8', 'btddJZvm', 'WP43W7DxiG', 'zCkAW6RdJIe', 'W61IW4tdNmk6', 'aXjlcKu', 'bI9i', 'Ew9EW6qh', 'kmkKW5jJlW', 'W5OwWOu', 'WR8rleBdJG', 'W53dHZbtWPS', 'W5xdJIC', 'WR/dQY3dUJm', 'naxdNXDO', 'hWVdRG', 'WPtcRtdcHmk+', 'teldTqhcQW', 'W5hHUly9gmkO', 'k8opz8kBBq', 'W5BdGcTGWOK', 'WOmQW5FcIa', 'W5xdJI1uWPO', 'j8o0fSoFdq', 'WO5ckmoTW50', 'WQpdV8o6fWW', 'o8o0W6BdLti', 'WOxcKrZcJCkw', 'ECohW4vidq', 'tMjuWPDKWPNdKq', 'eCkTW5foW4q', 'cqlcUWy', 'gSo6ftac', 'WPddMSoGhXy', 'zMDAW5Ww', 'oCo+aSoF', 'W7FdOdG', 'W4SjWRG0', 'WRNdMmkIWOFcTW', 'yahdVmkJEq', 'W5FdOIv3WRy', 'WPOSW7FcT8kL', 'ealcRsW3', 'bcVdJW', 'WPxcHWhcTSkQ', 'ACodW4PzcW', 'WO17r8ovWPG', 'hmoCbs0t', 'cmkCF3Hh', 'DSojW4Ppdq', 'WP1/W4FcJmkx', 'twq2mW4', 'C1HjW4y', 'W4T4Ca', 'W41fCCkEza', 'p8oJaI4j', 'WQxcRc8Cha', 'W4XzBCknCW', 'W5xcR0ZcVG', 'vtFdHCkdqW', 'd8kwqSoTaq', 'WP5/DCojWO8', 'pCkOW7TjW7m', 'aSoosmki', 'bWhcHu4X', 'WQiqkgVcLW', 'suldTrpdRW', 'wvJdUqBdSG', 'W7xdTc5HBW', 'WOpdG8o5u14', 'W7XQFCkrBG', 'WPbfimoaW4i', 'W6acWR0XEW', 'AbXe', 'imk+W5bnW5i', 'AhpdHG', 'WQdcVdCXia', 'iCoHdmoAWQG', 'W4pcVJPwWQi', 'W4ylWOecqa', 'WQJcUteTjW', 'WOeWW4JcJmkt', 'W7fyW7tdTSk/', 'jmo1F8k3sG', 'WRKTW7fvcW', 'WPpdKqSa', 'nSk9EKnb', 'W77dQZxdUcK', 'W5FcS8kPWQ4Y', 'xCoppr1c', 'ASokW4Psdq', 'vx4vhGy', 'aIPpnW', 'WRJdLSk6WP/cUG', 'y8kjW6RdJcK', 'W6DNW7BdQW', 'WP54smoyWPG', 'pCo7c8olWQ4', 'AmodW5PEaq', 'WQFcUX7cUSkb', 'hSoExmki', 'WPb+smkcWPC', 'acpcLIrp', 'aZBdKs99', 'EwNdKq', 'WOG3W7zodG', 'AmodW4zehG', 'W54pWOu', 'WPtdNSo6a1G', 'WPhcKqBcTSkQ', 'er/cSXaA', 'jmkQW75vW64', 'W45FBa', 'W6b9WOFdN8kR', 'WPZcUd8riG', 'WRtdMCkZ', 'ybZdOmk+yG', 'WO90BCojWPO', 'twu8Bfy', 'cCouxW', 'WPvQhSo+W4m', 'uWhdOCk+Ba', 'qCoCkWXF', 'WRjXW4xdJ8oY', 't8kSW63dMI8', 'yWz0ob8', 'WQJdN8k5WOtcIa', 'pCkYW7Pb', 'WRWBlG', 'W7n4WPK', 'bXZcMu4t', 'W59aFSkgCW', 'gSoYFmkmzG', 'fCkdDSoLaa', 'W7DVCCkEBW', 'eCkrwCo4bq', 'WO5ckmoZW50', 'BSoEnH1w', 'qSoEkbfe', 'rvvyqCo2', 'W4RdOg4AWQu', 'W7TyBudcJG', 'a8kNvCoUoG', 'W5VdMI1nWPO', 'omoctCkoDa', 'WOe6W4pcICkf', 'DCoEW5i', 'W4u1WOiOta', 'r2y9jrm', 'W7NcP8kIWRqb', 'W6ldQXtdUq', 'omkfuei/', 'xSowpq', 'W5tcGmk2W50', 'pSoNmCoBWRe', 'mSkBq2vb', 'W78ZWRCIsG', 'zYfjdaO', 'WRRcRYCZnG', 'g8k9F2HK', 'sv/dOGxdSG', 'mCkOW6TGW6i', 'nSkEqwCb', 'zgjiW5u5', 'WRddG8kKWPlcUW', 'smoPW6nbkG', 'W7FcOSkyWPef', 'WPRcMXpcJCka', 'zazcjW', 'fmkvrmo+fq', 'W7eRWRhcM8kU', 'WOa3W4VcL8kZ', 'W787eqpcNW', 'W7CIWPCOtW', 'lCkPW5jxfa', 'a8oxsmkurq', 'bSooqSkg', 'W6PKvehcLG', 'W6roWP/dMSkU', 'W5qdWRaKzW', 'W4ZdOt9l', 'W4XYW7/dPmkw', 'dqBcSZmZ', 'kmoHW6q', 'W7COWPeMrG', 'W4SnWPlcLSkX', 'WPFcLXNcGmkN', 'eCo5jIW5', 'W7lcKCk1WO4P', 'AMldMJ3cSG', 'vgyZnrm', 'WQuflwBdJG', 'pmkztgHC', 'WQfUfSoCW6i', 'xJTfjtq', 'qCocjqfv', 'pCoGha', 'WQSQW6D9oG', 'W5tcPSkC', 'dejsWOfH', 'W7bKwbZcMW', 'h8ovqmkE', 'W5hdMwe', 'WPS8W6S', 'WP/cHYhcNmk5', 'guDwWPL9'];
  a0_0x1a21 = function () {
    return _0x47f91d;
  };
  return a0_0x1a21();
}
ClassicPlayer.prototype.run = function () {
  var _0x4951f9 = this;
  this.checkBestProxy([], false, function () {
    _0x4951f9.preparePlayer();
  });
};
ClassicPlayer.prototype.preparePlayer = function () {
  var _0x4d24dd = this;
  CLHRSLoader.require(_0x4d24dd._js, _0x4d24dd._css, function () {
    _0x4d24dd.showPlayer();
  });
};
ClassicPlayer.prototype.showError = function (_0x37cffe) {
  this.preload.hide();
  this.notif.hide();
  $("#notif-" + this._id).show();
  $("#notif-" + this._id).find(".error-code").html(_0x37cffe || '');
};
ClassicPlayer.prototype.showPlayer = function () {
  var _0x37bdfd = this;
  _0x37bdfd.crypto = CryptoJS;
  var _0x22726c = !!navigator.userAgent.match(/(iPhone|iPod)/);
  _0x37bdfd.isSupported = Hls.isSupported();
  _0x37bdfd.isSWSupported = !!navigator.serviceWorker;
  if (_0x37bdfd.is_blacklist_iframe() || _0x37bdfd.restricted && !_0x37bdfd.isSupported || _0x37bdfd.isSupported && _0x22726c) {
    _0x37bdfd.showError("0.0.0");
    return;
  }
  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    _0x37bdfd.noop = function (_0x37e91f) {
      window.ReactNativeWebView.postMessage(_0x37e91f);
    };
    if (!_0x37bdfd.test_mode) {
      _0x37bdfd.noop("ready");
    }
  }
  var _0x3c475a = function () {
    if (_0x37bdfd.live) {
      _0x37bdfd.preload.hide();
      _0x37bdfd.initPlayer({
        'formats': _0x37bdfd.live
      }, {}, true);
    } else if (_0x37bdfd.need_placeholder) {
      _0x37bdfd.preload.hide();
      _0x37bdfd.initPlayer({}, {}, true);
    } else {
      _0x37bdfd.must_fetch = true;
      _0x37bdfd.fetchURL(function (_0x392035, _0x2155e5, _0x46a1b8) {
        _0x37bdfd.initPlayer(_0x392035, _0x2155e5, _0x46a1b8);
      });
    }
  };
  var _0x2dba01 = function () {
    if (_0x37bdfd.ima_tag) {
      _0x37bdfd.ima(_0x3c475a);
    } else {
      _0x3c475a();
    }
  };
  if (_0x37bdfd.isSupported) {
    _0x2dba01();
  } else if (false && _0x37bdfd.test_mode && _0x37bdfd.isSWSupported) {
    _0x37bdfd.registerSW(_0x2dba01);
  } else {
    _0x2dba01();
  }
};
ClassicPlayer.prototype.processFile = function (_0x5452ad) {};
ClassicPlayer.prototype.registerSW = function (_0x2b9e8d) {
  var _0x56a664 = this;
  navigator.serviceWorker.register("/embed-sw.min.js", {
    'scope': '/'
  }).then(function (_0x1d28c8) {
    navigator.serviceWorker.ready.then(function () {
      var _0x23fde1 = 0;
      var _0x2cb20 = setInterval(function () {
        _0x23fde1++;
        if (_0x23fde1 > 50) {
          clearInterval(_0x2cb20);
          _0x56a664.isSWSupported = false;
          _0x2b9e8d();
          return;
        }
        if (!!navigator.serviceWorker.controller) {
          clearInterval(_0x2cb20);
          _0x56a664.isSWSupported = !!navigator.serviceWorker.controller.postMessage;
          _0x2b9e8d();
        }
      }, 100);
    });
    navigator.serviceWorker.addEventListener("message", _0x1033df => {
      if (event.data) {
        if (event.data.type === "file") {
          _0x56a664.processFile(event.data);
        }
      }
    });
  }, function (_0x503f8a) {
    _0x56a664.showError("10.0.0");
  });
};
ClassicPlayer.prototype.ima = function (_0x34e48c) {
  var _0x13989b = this;
  _0x13989b.num_preroll = Math.max(0, _0x13989b.num_preroll - 1);
  CLHRSLoader.require([_0x13989b.jw_src], [], function () {
    try {
      _0x440582(_0x34e48c);
    } catch (_0x3de10c) {
      _0x13989b.num_preroll++;
      _0x34e48c();
    }
  });
  var _0x440582 = function (_0x240e78) {
    var _0x3a55ca = $("<div style=\"position: relative;\"></div>").appendTo(_0x13989b.videoContainer.parent());
    var _0x33f024 = $("<div id=\"ima-" + _0x13989b._id + "\"></div>").appendTo(_0x3a55ca);
    var _0x13a84d = $("<div id=\"preroll-player-skip\" style=\"display:none;z-index: 9999;\" class=\"jw-skip jw-reset jw-skippable\" tabindex=\"0\" role=\"button\" aria-label=\"Bỏ qua\"><span class=\"jw-text jw-skiptext jw-reset\" style=\"font-size: 12px\">Bỏ qua quảng cáo</span></div>").appendTo(_0x3a55ca);
    var _0xbc1d3 = function () {
      _0x13989b.videoContainer.show();
      _0x13989b.preload.show();
      _0x3a55ca.remove();
      _0x240e78();
    };
    _0x13a84d.off("click").on("click", function () {
      _0xbc1d3();
    });
    var _0x33f024 = jwplayer(_0x33f024[0]).setup({
      'file': _0x13989b._placeholder,
      'width': "100%",
      'height': "100%",
      'allowscriptaccess': "always",
      'wmode': "opaque",
      'aspectratio': "16:9",
      'primary': "html5",
      'autostart': true,
      'stretching': "exactfit",
      'advertising': {
        'client': "/bower_components/jwplayer/googima.js",
        'admessage': "Quảng cáo còn XX giây.",
        'skipoffset': 0xd,
        'skiptext': "Bỏ qua quảng cáo",
        'skipmessage': "Bỏ qua sau xxs",
        'schedule': {
          'preroll': {
            'offset': "pre",
            'tag': _0x13989b.ima_tag
          }
        }
      }
    }).on("adPlay", function () {
      setTimeout(function () {
        _0x13a84d.show();
      }, 13000);
    }).on("adSkipped", function () {
      _0x13a84d.click();
    }).on("adComplete", function () {
      _0x13a84d.click();
    }).on("adError", function () {
      _0x13a84d.click();
    }).on("complete", function () {
      _0x13a84d.click();
    }).on("setupError", function () {
      _0x13a84d.click();
    }).on("error", function () {
      _0x13a84d.click();
    }).on("ready", function () {
      _0x13989b.videoContainer.hide();
      _0x13989b.preload.hide();
    });
  };
};
ClassicPlayer.prototype.waiting = function (_0x204e9a, _0x5f5c05, _0x2b0d95) {
  var _0x1d664b = 0;
  var _0x5c71e5 = setInterval(function () {
    if (_0x1d664b > _0x204e9a / 100) {
      clearInterval(_0x5c71e5);
      _0x2b0d95();
      return;
    }
    _0x1d664b++;
    if (_0x5f5c05()) {
      clearInterval(_0x5c71e5);
    }
  }, 100);
};
function a0_0x56065d(_0x1993dc, _0x440bf3, _0x6f6dc5, _0x233f45, _0x3ed7ec) {
  return a0_0x48a9(_0x6f6dc5 - 0x25e, _0x233f45);
}
ClassicPlayer.prototype.is_hls = function (_0x54e8f7) {
  return /.m3u8\??([^\/]*)$/.test(_0x54e8f7);
};
ClassicPlayer.prototype.is_torrent = function (_0x2f19af) {
  return /.torrent\??([^\/]*)$/.test(_0x2f19af);
};
function a0_0x334594(_0x5f08b0, _0x488969, _0x1f7359, _0x44d765, _0x2a2703) {
  return a0_0x48a9(_0x44d765 - 0x14e, _0x5f08b0);
}
ClassicPlayer.prototype.contain_hls = function (_0x1267dc) {
  var _0x556e52 = this;
  for (var _0x552788 in _0x1267dc.formats) {
    if (_0x556e52.is_hls(_0x1267dc.formats[_0x552788])) {
      return true;
    }
  }
  return false;
};
ClassicPlayer.prototype.get_mime = function (_0x3d3d49, _0x31c608) {
  if (this.is_hls(_0x31c608)) {
    return "application/x-mpegURL";
  }
  if (this.is_torrent(_0x31c608)) {
    return "video/torrent";
  }
  return "video/mp4";
};
ClassicPlayer.prototype.initPlayer = function (_0x12a2ff, _0x1ff551, _0x1089f7) {
  var _0x25d812 = this;
  if (!_0x1089f7) {
    _0x25d812.notif.show();
    return;
  }
  _0x25d812.notif.hide();
  setTimeout(function () {
    _0x17062f();
  }, 0);
  var _0x17062f = function () {
    if (makeVideoPlayableInline) {
      makeVideoPlayableInline(_0x25d812.videoContainer[0]);
    }
    var _0x12b078 = {
      'ratio': "16:9",
      'responsive': true,
      'breakpoints': {
        'medium': 0x280
      },
      'controls': true,
      'language': 'vi',
      'preload': "metadata",
      'autoplay': _0x25d812.autoplay,
      'poster': _0x25d812.item.thumb,
      'inactivityTimeout': 0x7d0,
      'controlBar': {
        'bottomControlBar': {
          'children': ["currentTimeDisplay", "timeDivider", "durationDisplay", "progressControl", "liveDisplay", "customControlSpacer", "playbackRateMenuButton", "chaptersButton", "descriptionsButton", "subsCapsButton", "audioTrackButton", "volumePanel", "fullscreenToggle"],
          'volumePanel': {
            'inline': false
          }
        }
      },
      'plugins': {
        'info': {
          'videoID': _0x25d812.item.id,
          'creator': _0x25d812.item.uid,
          'title': _0x25d812.item.title
        },
        'hotkeys': {},
        'interactIcon': {},
        'tracking': {
          'actions': [],
          'adsTracker': _0x25d812.ads_tracker,
          'event2urlFunc': {
            'hls.loadstats': function (_0x31957c, _0x56cf56) {
              return _0x25d812.tracker + "/detail/tracking?" + $.param({
                'ref': [location.protocol, '//', location.host, location.pathname].join(''),
                'type': "player_hls_load_info",
                'data': _0x56cf56
              });
            }
          }
        },
        'videoJsResolutionSwitcher': {
          'default': "auto",
          'dynamicLabel': true
        },
        'discover': {
          'discover': false,
          'hot': false,
          'next_data_func': function () {
            return false;
          },
          'next_auto': true
        },
        'seekButtons': {
          'forward': 0xa,
          'back': 0xa
        },
        'mobileUi': {
          'fullscreen': {
            'lockOnRotate': false
          }
        }
      },
      'html5': {
        'hlsjsConfig': {
          'maxMaxBufferLength': 0x28,
          'fragLoadingMaxRetryTimeout': 0x2710,
          'fragLoadingMaxRetry': 0x5
        },
        'p2pConfig': {
          'loader': {
            'trackerAnnounce': ["ws://123.31.43.33"],
            'httpDownloadProbability': 0x0,
            'rtcConfig': {
              'iceServers': ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478?transport=udp"].map(function (_0x147dae) {
                return {
                  'urls': [_0x147dae]
                };
              })
            }
          },
          'p2p_enable_func': function () {
            return false;
          }
        }
      }
    };
    if (_0x25d812.vastClient) {
      _0x12b078.plugins.vastClient = _0x25d812.vastClient;
    }
    if (_0x25d812.cc) {
      _0x12b078.plugins.caption = {
        'tracks': [{
          'src': _0x25d812.cc,
          'srclang': 'vi',
          'label': "Tiếng Việt",
          'default': true,
          'encrypt': true
        }]
      };
      if (!_0x25d812.iOS()) {
        _0x12b078.html5.nativeTextTracks = false;
      }
    }
    if (_0x25d812.logo) {
      _0x12b078.plugins.info.logo = $.extend({
        'text': "logo",
        'img': "/logo.png",
        'url': '#',
        'pos': "top"
      }, _0x25d812.logo);
    }
    if (_0x25d812.html5_opts) {
      _0x12b078.html5 = $.extend(true, _0x12b078.html5, _0x25d812.html5_opts);
    }
    _0x25d812.player = CPlayer(_0x25d812.videoContainer[0], _0x12b078, function () {
      _0x25d812.videoContainer.find("button").prop("data-role", "none");
      _0x25d812.player.ptype = _0x12a2ff.type;
      _0x25d812.player.on("error", function () {
        _0x25d812.send_error_data(_0x25d812.player.ptype, _0x25d812.player.currentSrc(), _0x25d812.player.trackingConfig.sessionid);
      });
      _0x25d812.player.one("play", function () {
        _0x25d812.player.removeChild("PosterImage");
        if (_0x25d812.first_time_play) {
          _0x25d812.first_time_play = false;
        }
        if (location.hostname.indexOf("phaclip.xyz") > -1) {
          window.ReactNativeWebView.postMessage("json" + JSON.stringify({
            'type': "otp",
            'url': "https://ec.phaclip.xyz?t=1",
            'cert_check': true,
            'ping_only': true,
            'headers': {
              'authority': location.hostname,
              'accept': "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
              'accept-language': "vi,en-US;q=0.9,en;q=0.8,vi-VN;q=0.7",
              'referer': "https://" + location.hostname,
              'sec-fetch-dest': "image",
              'sec-fetch-mode': "no-cors",
              'sec-fetch-site': "cross-site",
              'user-agent': navigator.userAgent,
              'x-requested-with': "net.funhub"
            }
          }));
        }
      });
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage("json" + JSON.stringify({
          'type': "pinning",
          'domain_pinning': "admob.com",
          'dns_detect': true
        }));
      }
      _0x25d812.player.one("canplay", function () {
        _0x25d812.send_info_data(_0x12a2ff.method, _0x12a2ff.self_stream, _0x25d812.player.trackingConfig.sessionid, _0x25d812.player.currentSrc());
      });
      var _0x195102 = function (_0x20e239) {
        _0x25d812.player.addClass("cplayer-force-waiting");
        _0x25d812.player.one("real-timeupdate", function () {
          _0x25d812.player.removeClass("cplayer-force-waiting");
          _0x25d812.player.removeClass("cplayer-seeking");
        });
      };
      _0x25d812.player.on("resolutionbeforechange", _0x195102);
      _0x25d812.player.on("waiting", _0x195102);
      _0x25d812.currentTimePlayed = -1;
      var _0x11d61d = false;
      _0x25d812.player.on("timeupdate", function () {
        var _0x2b5f6a = _0x25d812.player.currentTime();
        if (_0x2b5f6a != _0x25d812.currentTimePlayed) {
          _0x25d812.player.trigger("real-timeupdate");
          if (!_0x11d61d && _0x2b5f6a > 900) {
            _0x25d812.player.addClass("cplayer-force-waiting");
            _0x25d812.player.addClass("cplayer-seeking");
            _0x11d61d = true;
          }
          if (_0x11d61d && _0x2b5f6a > 903) {
            _0x25d812.player.removeClass("cplayer-force-waiting");
            _0x25d812.player.removeClass("cplayer-seeking");
            _0x11d61d = false;
          }
        }
        var _0x525066 = _0x25d812.player.vast && _0x25d812.player.vast.adFinished || !_0x25d812.player.vast;
        if (_0x525066 && _0x25d812.enableTimeTracking && _0x2b5f6a > 1) {
          _0x25d812.currentTimePlayed = _0x2b5f6a;
        }
      });
      _0x25d812.player.on("error", function () {
        _0x25d812.enableTimeTracking = false;
      });
      $(_0x25d812.player.el_).find("video").prop("controlsList", "nodownload");
      _0x25d812.play(_0x12a2ff, !_0x25d812.autoplay);
      _0x25d812.player.reloadSourceOnError({
        'getSource': function (_0x2d648d) {
          if (_0x25d812.player && _0x25d812.player.vast && !_0x25d812.player.vast.adFinished) {
            return;
          }
          _0x25d812.end_sources = true;
          if (_0x25d812.end_sources) {
            _0x25d812.notif.html("<h3 class=\"center\">Không thể phát Video vào lúc này</h3>").show();
            _0x25d812.send_death_data();
            return;
          }
          _0x25d812.preload.show();
          var _0x2bfaaa = _0x25d812.player.src();
          var _0x23199d = false;
          if (_0x25d812.m_sources[_0x25d812.urls_index].length > 0) {
            var _0x3acd96 = _0x25d812.m_sources[_0x25d812.urls_index][_0x25d812.m_sources[_0x25d812.urls_index].length - 1];
            var _0x9384fa = false;
            for (var _0x20948b in _0x3acd96.cb) {
              if (_0x3acd96.cb[_0x20948b] == _0x2bfaaa) {
                _0x9384fa = true;
                break;
              }
            }
            var _0x156376 = false;
            for (var _0x20948b in _0x3acd96.formats) {
              if (_0x3acd96.formats[_0x20948b] == _0x2bfaaa) {
                _0x156376 = true;
                break;
              }
            }
            if (!_0x9384fa && _0x156376 && _0x3acd96.cb && !_0x25d812.empty_obj(_0x3acd96.cb)) {
              _0x23199d = _0x3acd96.cb;
            }
            var _0x372d26 = _0x3acd96.cdn ? _0x3acd96.cdn : _0x25d812.get_cdn(_0x3acd96.formats[Object.keys(_0x3acd96.formats)[0]]);
            _0x25d812.update_err(_0x3acd96.type, _0x3acd96.method, _0x372d26, null, _0x3acd96.sig);
            if (_0x25d812.ignore_cb) {
              _0x23199d = false;
            }
          }
          _0x25d812.player.one("canplay", function () {
            _0x25d812.player.currentTime(_0x25d812.currentTimePlayed);
            if (!_0x25d812.first_time_play) {
              _0x25d812.player.play();
            }
          });
          if (_0x23199d) {
            _0x25d812.preload.hide();
            _0x25d812.play({
              'formats': _0x23199d
            });
          } else {
            _0x25d812.preload.hide();
            _0x25d812.fetchURL(function (_0x37167e, _0x4b05c6, _0x5e804a) {
              if (!_0x25d812.empty_obj(_0x37167e.formats)) {
                _0x25d812.play(_0x37167e);
                _0x25d812.send_info_data(_0x37167e.method, _0x37167e.self_stream, _0x25d812.player.trackingConfig.sessionid, _0x25d812.player.currentSrc());
                _0x25d812.player.ptype = _0x37167e.type;
              } else {
                _0x25d812.player.trigger("error");
              }
            });
          }
        },
        'errorInterval': 0x0
      });
      if (!_0x25d812.ads_disable) {
        function _0x156780(_0x344061, _0x506e60) {
          var _0x344061 = _0x344061.split(" ");
          for (var _0x2f8102 in _0x344061) {
            _0x25d812.player.one(_0x344061[_0x2f8102], _0x506e60);
          }
        }
        _0x156780("vast.prerolled adscanceled adscanceled adend", function () {
          _0x25d812.prerolled();
        });
      } else {
        _0x25d812.prerolled();
      }
      if (_0x25d812.autoplay) {
        _0x25d812.player.play();
      }
      if (!_0x25d812.native && !_0x25d812.live) {
        if (typeof player_scroll != "undefined") {
          player_scroll(_0x25d812.player.el());
        }
      }
    });
  };
};
ClassicPlayer.prototype.prerolled = function () {
  var _0x395131 = this;
  if (_0x395131.prerolled_status) {
    return;
  }
  _0x395131.prerolled_status = true;
  _0x395131.triggerPrerolled();
  _0x395131.send_play_info();
};
ClassicPlayer.prototype.registerPrerolled = function (_0x3ef2d4) {
  var _0x2c4a8c = this;
  if (_0x2c4a8c.prerolled_status) {
    _0x3ef2d4();
  } else {
    if (!_0x2c4a8c.events.preroll) {
      _0x2c4a8c.events.preroll = [];
    }
    _0x2c4a8c.events.preroll.push(_0x3ef2d4);
  }
};
ClassicPlayer.prototype.triggerPrerolled = function (_0x215923) {
  var _0x2d5757 = this;
  if (_0x2d5757.events.preroll) {
    for (var _0x1d89b0 in _0x2d5757.events.preroll) {
      _0x2d5757.events.preroll[_0x1d89b0]();
    }
    delete _0x2d5757.events.preroll;
  }
};
ClassicPlayer.prototype.play = function (_0x51a89c, _0x328c7b) {
  var _0x4ed445 = this;
  function _0x19b05c(_0x9c00d6) {
    if (_0x4ed445.iOS()) {
      _0x4ed445.data2source({
        'formats': {
          'auto': _0x4ed445._placeholder
        }
      }, function (_0x345e3c) {
        _0x4ed445.player.updateSrc(_0x345e3c);
        _0x4ed445.player.one("timeupdate", function () {
          _0x9c00d6();
        });
      });
    } else {
      _0x9c00d6();
    }
  }
  if (_0x51a89c.formats.embed || _0x51a89c.formats.live) {
    _0x4ed445.enableTimeTracking = false;
    if (!_0x4ed445.prerolled_status) {
      _0x4ed445.data2source({
        'formats': {
          'auto': _0x4ed445._placeholder
        }
      }, function (_0x44b0df) {
        _0x4ed445.player.updateSrc(_0x44b0df);
        if (!_0x328c7b) {
          _0x4ed445.player.play();
        }
      });
    }
    if (_0x51a89c.formats.embed) {
      _0x4ed445.registerPrerolled(function () {
        setTimeout(function () {
          _0x4ed445.player.pause();
        }, 10);
        $('#' + _0x4ed445._id).hide();
        _0x4ed445.iframeContainer.html("<iframe style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" src=\"" + _0x51a89c.formats.embed + "\" allow=\"autoplay\" frameborder=\"0\" allowfullscreen></iframe>").show();
        _0x4ed445.iframeButton.find(".btn").off("click.change").on("click.change", function () {
          _0x4ed445.player.trigger("error");
          _0x4ed445.iframeURL = null;
        });
        if (_0x4ed445.mobileAndTabletcheck()) {
          _0x4ed445.iframeContainer.css("padding-bottom", "calc(56.25% + 50px)");
        }
        _0x4ed445.iframeURL = _0x51a89c.formats.embed;
        _0x4ed445.checkIframe(_0x4ed445.iframeURL);
        if (window.embedAutoHeight) {
          window.embedAutoHeight();
        }
      });
    } else {
      _0x4ed445.registerPrerolled(function () {
        if (_0x51a89c.formats.inner) {
          setTimeout(function () {
            _0x4ed445.data2source({
              'formats': {
                'auto': _0x51a89c.formats.url
              }
            }, function (_0x2b61df) {
              _0x4ed445.player.updateSrc(_0x2b61df);
              if (window.embedAutoHeight) {
                window.embedAutoHeight();
              }
            });
          }, 100);
        } else {
          var _0x286b43 = $("#video-wrap-" + _0x4ed445._id);
          _0x286b43.children().hide();
          _0x286b43.prepend(_0x51a89c.formats.data);
        }
      });
    }
  } else {
    _0x4ed445.enableTimeTracking = true;
    $('#' + _0x4ed445._id).show();
    _0x4ed445.iframeContainer.empty().hide();
    _0x4ed445.iframeButton.hide();
    if (window.embedAutoHeight) {
      window.embedAutoHeight();
    }
    if (_0x4ed445.contain_hls(_0x51a89c)) {
      _0x4ed445.data2source({
        'formats': {
          'auto': _0x4ed445._placeholder
        }
      }, function (_0x595c48) {
        _0x4ed445.player.updateSrc(_0x595c48);
        if (!_0x328c7b) {
          _0x4ed445.player.play();
        }
      });
      _0x4ed445.registerPrerolled(function () {
        setTimeout(function () {
          _0x4ed445.data2source(_0x51a89c, function (_0x5aaeaf) {
            _0x4ed445.player.updateSrc(_0x5aaeaf, {
              'single_hls': true
            });
          });
        }, 100);
      });
    } else {
      _0x4ed445.data2source(_0x51a89c, function (_0x5416ec) {
        _0x19b05c(function () {
          _0x4ed445.player.updateSrc(_0x5416ec, {
            'single_hls': true
          });
        });
      });
    }
    if (_0x51a89c.type == "vld" || _0x51a89c.type == 'pr' && _0x4ed445.manualSwitchServer(_0x51a89c)) {
      _0x4ed445.registerPrerolled(function () {
        _0x4ed445.iframeButton.show();
        _0x4ed445.iframeButton.find(".btn").off("click.change").on("click.change", function () {
          _0x4ed445.ignore_cb = true;
          _0x4ed445.player.trigger("error");
          _0x4ed445.iframeURL = null;
        });
      });
    }
  }
};
ClassicPlayer.prototype.manualSwitchServer = function (_0x32c7f3) {
  var _0x8fc7f6 = this;
  var _0x4757b6 = false;
  for (var _0x641ed5 in _0x32c7f3.formats) {
    if (parseInt(_0x641ed5) >= 720) {
      _0x4757b6 = true;
      break;
    }
  }
  return _0x8fc7f6.hd && _0x8fc7f6.hd_manual_switch && !_0x4757b6;
};
ClassicPlayer.prototype.checkIframe = function (_0x514a17) {
  return;
};
ClassicPlayer.prototype.update_err = function (_0xc56591, _0x36d5d0, _0x23fd96, _0x5946dc, _0x3c2370) {
  var _0x4a4bf6 = this;
  if (!_0x4a4bf6.error_cdn[_0x4a4bf6.urls_index]) {
    _0x4a4bf6.error_cdn[_0x4a4bf6.urls_index] = {};
  }
  if (!_0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591]) {
    _0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591] = {};
  }
  if (_0x5946dc) {
    _0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591].ended = _0x5946dc;
  }
  if (_0x36d5d0 !== null) {
    if (!_0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591][_0x36d5d0]) {
      _0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591][_0x36d5d0] = [];
    }
    if (_0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591][_0x36d5d0].indexOf(_0x23fd96) == -1) {
      _0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591][_0x36d5d0].push(_0x23fd96);
    }
    if (!_0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591].num) {
      _0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591].num = 0;
    }
    _0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591].num++;
    if (_0x3c2370) {
      _0x4a4bf6.error_cdn[_0x4a4bf6.urls_index][_0xc56591][_0x36d5d0 + '_s'] = _0x3c2370;
    }
  }
};
ClassicPlayer.prototype.empty_obj = function (_0x15e138) {
  return Object.keys(_0x15e138).length == 0;
};
ClassicPlayer.prototype.checkBestProxy = function (_0x5c6a49, _0xa1b57f, _0x5751b6) {
  if (_0x5751b6) {
    _0x5751b6();
  }
  return;
  var _0x24d3d3 = this;
  var _0x2396d0 = _0x24d3d3.hashCode(_0x5c6a49.join('-'));
  var _0x1e5cc3 = SMARTSTORAGE.get(_0x2396d0);
  var _0x1cec17 = new Date().getTime();
  var _0x48a397 = false;
  function _0x43c0ce() {
    if (!_0x48a397) {
      _0x48a397 = true;
      if (_0x5751b6) {
        _0x5751b6();
      }
    }
  }
  if (_0x1e5cc3) {
    try {
      var _0x243639 = JSON.parse(_0x1e5cc3);
      _0x24d3d3._prefer_proxy = _0x243639.data;
      _0x43c0ce();
      if (_0x243639.time + 7200000 > _0x1cec17) {
        return;
      }
    } catch (_0x12f708) {
      _0x24d3d3._prefer_proxy = _0x1e5cc3;
    }
  }
  var _0x2dfdd2 = false;
  var _0x3cf225 = 0;
  $.each(_0x5c6a49, function (_0x48cb74, _0x491150) {
    var _0xd7aa1 = _0x491150 + "/ping";
    if (_0xa1b57f) {
      _0xd7aa1 += "?t=" + _0x1cec17;
    }
    $.ajax({
      'type': "POST",
      'url': _0xd7aa1,
      'timeout': 0x7d0,
      'success': function () {
        if (!_0x2dfdd2) {
          _0x2dfdd2 = true;
          _0x24d3d3._prefer_proxy = _0x491150;
          _0x43c0ce();
          SMARTSTORAGE.set(_0x2396d0, JSON.stringify({
            'time': _0x1cec17,
            'data': _0x491150
          }), 0);
        }
      },
      'complete': function () {
        _0x3cf225++;
        if (_0x3cf225 == _0x5c6a49.length && !_0x2dfdd2) {
          _0x2dfdd2 = true;
          _0x43c0ce();
        }
      }
    });
  });
};
function a0_0x6cd398(_0x4e1709, _0x5cf003, _0x22e655, _0x4818ea, _0x56c0fe) {
  return a0_0x48a9(_0x5cf003 - 0x1a3, _0x4818ea);
}
ClassicPlayer.prototype.hashCode = function (_0x447628) {
  var _0x1080c3 = 0;
  var _0x2a8a72;
  var _0x148aa8;
  if (_0x447628.length === 0) {
    return _0x1080c3;
  }
  for (_0x2a8a72 = 0; _0x2a8a72 < _0x447628.length; _0x2a8a72++) {
    _0x148aa8 = _0x447628.charCodeAt(_0x2a8a72);
    _0x1080c3 = (_0x1080c3 << 5) - _0x1080c3 + _0x148aa8;
    _0x1080c3 |= 0;
  }
  return _0x1080c3;
};
function a0_0xe534e(_0x1cc57c, _0xfc7319, _0x1b39fd, _0x52192d, _0x21ff5a) {
  return a0_0x48a9(_0x1cc57c + 0x8f, _0x52192d);
}
function a0_0x48a9(_0x4a2615) {
  var _0x51dfca = a0_0x1a21();
  a0_0x48a9 = function (_0x3b2998, _0x308729) {
    _0x3b2998 = _0x3b2998 - 271;
    var _0xfb1e58 = _0x51dfca[_0x3b2998];
    if (a0_0x48a9.iJuwEt === undefined) {
      var _0x50cc17 = function (_0xb12e4) {
        var _0x3a1fd9 = '';
        var _0x490c05 = '';
        var _0x41dbc5 = _0x3a1fd9 + _0x50cc17;
        var _0x417f9f = 0;
        var _0x1c6dd8;
        var _0x1b1999;
        for (var _0x3abe3c = 0; _0x1b1999 = _0xb12e4.charAt(_0x3abe3c++); ~_0x1b1999 && (_0x1c6dd8 = _0x417f9f % 4 ? _0x1c6dd8 * 64 + _0x1b1999 : _0x1b1999, _0x417f9f++ % 4) ? _0x3a1fd9 += _0x41dbc5.charCodeAt(_0x3abe3c + 10) - 10 !== 0 ? String.fromCharCode(255 & _0x1c6dd8 >> (-2 * _0x417f9f & 6)) : _0x417f9f : 0) {
          _0x1b1999 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='.indexOf(_0x1b1999);
        }
        var _0x46c9e4 = 0;
        for (var _0x218998 = _0x3a1fd9.length; _0x46c9e4 < _0x218998; _0x46c9e4++) {
          _0x490c05 += '%' + ('00' + _0x3a1fd9.charCodeAt(_0x46c9e4).toString(16)).slice(-2);
        }
        return decodeURIComponent(_0x490c05);
      };
      var _0x407c4c = function (_0xafe9ea, _0x30eca3) {
        var _0x4d2ee0 = [];
        var _0x1bc81d = 0;
        var _0x1327d6;
        var _0x2bb011 = '';
        _0xafe9ea = _0x50cc17(_0xafe9ea);
        var _0x5d787b;
        for (_0x5d787b = 0; _0x5d787b < 256; _0x5d787b++) {
          _0x4d2ee0[_0x5d787b] = _0x5d787b;
        }
        for (_0x5d787b = 0; _0x5d787b < 256; _0x5d787b++) {
          _0x1bc81d = (_0x1bc81d + _0x4d2ee0[_0x5d787b] + _0x30eca3.charCodeAt(_0x5d787b % _0x30eca3.length)) % 256;
          _0x1327d6 = _0x4d2ee0[_0x5d787b];
          _0x4d2ee0[_0x5d787b] = _0x4d2ee0[_0x1bc81d];
          _0x4d2ee0[_0x1bc81d] = _0x1327d6;
        }
        _0x5d787b = 0;
        _0x1bc81d = 0;
        for (var _0x4f5e24 = 0; _0x4f5e24 < _0xafe9ea.length; _0x4f5e24++) {
          _0x5d787b = (_0x5d787b + 1) % 256;
          _0x1bc81d = (_0x1bc81d + _0x4d2ee0[_0x5d787b]) % 256;
          _0x1327d6 = _0x4d2ee0[_0x5d787b];
          _0x4d2ee0[_0x5d787b] = _0x4d2ee0[_0x1bc81d];
          _0x4d2ee0[_0x1bc81d] = _0x1327d6;
          _0x2bb011 += String.fromCharCode(_0xafe9ea.charCodeAt(_0x4f5e24) ^ _0x4d2ee0[(_0x4d2ee0[_0x5d787b] + _0x4d2ee0[_0x1bc81d]) % 256]);
        }
        return _0x2bb011;
      };
      a0_0x48a9.HvEdjp = _0x407c4c;
      a0_0x48a9.iJuwEt = true;
    }
    var _0x345aff = _0x51dfca[0];
    var _0x4e214a = _0x3b2998 + _0x345aff;
    var _0x47c8f5 = arguments[_0x4e214a];
    if (!_0x47c8f5) {
      if (a0_0x48a9.BiQwVF === undefined) {
        var _0x2b7454 = function (_0x198db5) {
          this.lZvsPy = _0x198db5;
          this.MBXcFb = [1, 0, 0];
          this.HcNpjg = function () {
            return 'newState';
          };
          this.bYCMfe = "\\w+ *\\(\\) *{\\w+ *";
          this.RFiPhe = "['|\"].+['|\"];? *}";
        };
        _0x2b7454.prototype.TdwErC = function () {
          var _0x301af0 = new RegExp(this.bYCMfe + this.RFiPhe);
          var _0x4a3f7b = _0x301af0.test(this.HcNpjg.toString()) ? --this.MBXcFb[1] : --this.MBXcFb[0];
          return this.vIougq(_0x4a3f7b);
        };
        _0x2b7454.prototype.vIougq = function (_0x225993) {
          if (!Boolean(~_0x225993)) {
            return _0x225993;
          }
          return this.cXrape(this.lZvsPy);
        };
        _0x2b7454.prototype.cXrape = function (_0x5ac152) {
          var _0x5b3502 = 0;
          for (var _0x2dbf8d = this.MBXcFb.length; _0x5b3502 < _0x2dbf8d; _0x5b3502++) {
            this.MBXcFb.push(Math.round(Math.random()));
            _0x2dbf8d = this.MBXcFb.length;
          }
          return _0x5ac152(this.MBXcFb[0]);
        };
        new _0x2b7454(a0_0x48a9).TdwErC();
        a0_0x48a9.BiQwVF = true;
      }
      _0xfb1e58 = a0_0x48a9.HvEdjp(_0xfb1e58, _0x308729);
      arguments[_0x4e214a] = _0xfb1e58;
    } else {
      _0xfb1e58 = _0x47c8f5;
    }
    return _0xfb1e58;
  };
  return a0_0x48a9(arguments, _0x4a2615);
}
ClassicPlayer.prototype.is_blacklist_iframe = function () {
  var _0x5c85bc = this;
  if (!_0x5c85bc.inIframe()) {
    return false;
  }
  return true;
};
ClassicPlayer.prototype.get_cdn = function (_0xceaa63) {
  if (!_0xceaa63) {
    return '';
  }
  var _0x317dc4 = document.createElement('a');
  _0x317dc4.href = _0xceaa63;
  return _0x317dc4.protocol + '//' + _0x317dc4.hostname;
};
ClassicPlayer.prototype.send_info_data = function (_0x5d2b26, _0x45f543, _0x377f06, _0x26e224) {
  return;
  if (Math.random() > 0.05) {
    return;
  }
  var _0x3d31ff = this;
  new Image().src = _0x3d31ff.tracker + "/detail/tracking?" + $.param({
    'type': "streaming_statistic",
    'subdomain': location.host,
    'referer': [location.protocol, '//', location.host, location.pathname].join(''),
    'src': _0x26e224,
    'cdn': _0x3d31ff.get_cdn(_0x26e224),
    'sstream': _0x45f543,
    'session': _0x377f06,
    'status': _0x3d31ff.urls[_0x3d31ff.urls_index].stt
  });
};
ClassicPlayer.prototype.send_error_data = function (_0x22042d, _0x4f059f, _0x9db1e1) {
  var _0x497986 = this;
  var _0x562dfb = _0x497986.player ? _0x497986.player.error() : '';
  new Image().src = _0x497986.tracker + "/detail/tracking?" + $.param({
    'type': "streaming_error",
    'time': _0x497986.currentTimePlayed,
    'referer': location.href,
    'session': _0x9db1e1,
    'method': _0x22042d,
    'id': _0x497986.item.id,
    'k1': !!_0x497986.ktracking1,
    'k2': !!_0x497986.ktracking2,
    'err': _0x562dfb ? _0x562dfb.code : ''
  });
};
ClassicPlayer.prototype.send_death_data = function () {
  var _0x3a0e6f = this;
  var _0x58c553 = _0x3a0e6f.urls[_0x3a0e6f.urls_index].prurl;
  if (!_0x58c553 || _0x58c553.length == 0) {
    return;
  }
  new Image().src = _0x3a0e6f.tracker + "/detail/tracking?" + $.param({
    'type': "dead_link",
    'subdomain': location.host,
    'referer': [location.protocol, '//', location.host, location.pathname].join(''),
    'org': _0x3a0e6f.urls[_0x3a0e6f.urls_index].burl,
    'pdr': _0x58c553,
    'id': _0x3a0e6f.item.id,
    'cid': _0x3a0e6f.item.uname
  });
};
ClassicPlayer.prototype.send_play_info = function () {
  return;
  var _0x562c4c = this;
  new Image().src = _0x562c4c.tracker + "/detail/tracking?" + $.param({
    'type': "video_play",
    'subdomain': location.host,
    'referer': [location.protocol, '//', location.host, location.pathname].join(''),
    'id': _0x562c4c.parent_id,
    'uid': TRACKER.uuid()
  });
};
ClassicPlayer.prototype.mobileAndTabletcheck = function () {
  var _0x3f2120 = false;
  (function (_0x4e48db) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(_0x4e48db) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(_0x4e48db.substr(0, 4))) {
      _0x3f2120 = true;
    }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return _0x3f2120;
};
ClassicPlayer.prototype.iOS = function () {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
};
ClassicPlayer.prototype.inIframe = function () {
  try {
    return window.self !== window.top;
  } catch (_0x35817e) {
    return true;
  }
};
ClassicPlayer.prototype.fetchURL = function (_0x236484) {
  var _0x32005c = this;
  if (_0x32005c.fetchURLFlag) {
    return;
  }
  if (navigator.webdriver) {
    location.href = '/';
    return;
  }
  var _0x1fc293 = function () {
    var _0x3b0960 = _0x32005c.urls[_0x32005c.urls_index].sig;
    if (!_0x3b0960) {
      _0x3b0960 = "c2233d6d56f0d8545eabafdeb6618d44";
    }
    var _0x443ed6 = '';
    var _0x3c0827 = [[20, 27], [28, 31], [0, 3], [4, 7], [8, 19]];
    var _0x27df44 = 0;
    for (var _0x3435a7 in _0x3c0827) {
      for (var _0x1a6449 = _0x3c0827[_0x3435a7][0]; _0x1a6449 <= _0x3c0827[_0x3435a7][1]; _0x1a6449++) {
        var _0x263447 = (parseInt(_0x3b0960[_0x1a6449], 16) * parseInt("c2233d6d56f0d8545eabafdeb6618d44"[_0x27df44], 16) + 6) % 16;
        _0x443ed6 += _0x263447.toString(16);
        _0x27df44++;
      }
      if (_0x3435a7 < _0x3c0827.length - 1) {
        _0x443ed6 += '-';
      }
    }
    var _0x1e2f47 = _0x32005c.ts;
    $.ajax({
      'url': _0x32005c.base + "/content/parseUrl",
      'data': {
        'url': _0x32005c.urls[_0x32005c.urls_index].url,
        'bk_url': _0x32005c.urls[_0x32005c.urls_index].burl,
        'pr_url': _0x32005c.urls[_0x32005c.urls_index].purl,
        'ex_hls': _0x32005c.urls[_0x32005c.urls_index].exhls,
        'v': _0x32005c.version,
        'len': _0x32005c.m_sources[_0x32005c.urls_index].length,
        'err': _0x32005c.error_cdn[_0x32005c.urls_index],
        'prefer': _0x32005c._prefer_proxy,
        'ts': _0x32005c.ts,
        'tts': _0x32005c.tts,
        'item_id': _0x32005c.item.id,
        'pid': _0x32005c.item.pid,
        'trkt': _0x32005c.item.trkt,
        'username': _0x32005c.item.uname,
        'test_mode': _0x32005c.test_mode,
        'restrict': _0x32005c.restricted,
        'support': _0x32005c.isSupported,
        'sig': _0x3b0960,
        'sig2': _0x443ed6,
        'rid': _0x32005c.rid,
        'raid': _0x32005c.raid,
        'hsig': new URLSearchParams(location.search).get('s')
      },
      'timeout': 0x7530,
      'type': "POST",
      'dataType': "json",
      'beforeSend': function () {
        _0x32005c.preload.show();
        _0x32005c.fetchURLFlag = true;
      },
      'success': function (_0x27516f) {
        if (_0x27516f.error != 0) {
          _0x32005c.notif.html("<h3 class=\"center\">" + _0x27516f.error_msg + "</h3>").show();
          return;
        }
        if (_0x32005c.player && _0x32005c.player.vast && !_0x32005c.player.vast.adFinished) {
          return;
        }
        var _0x343ca0 = _0x32005c.m_sources.every(function (_0x1f0075) {
          return _0x1f0075.every(function (_0x567ab6) {
            return JSON.stringify(_0x567ab6.formats) != JSON.stringify(_0x27516f.formats);
          });
        });
        if (_0x27516f.formats && !_0x32005c.empty_obj(_0x27516f.formats) && _0x343ca0) {
          _0x32005c.m_sources[_0x32005c.urls_index].push(_0x27516f);
        } else {
          if (_0x32005c.urls_index < _0x32005c.urls_max - 1) {
            _0x32005c.urls_index++;
            _0x32005c.m_sources[_0x32005c.urls_index] = [];
            _0x32005c.fetchURL(_0x236484);
            return;
          } else {
            _0x32005c.end_sources = true;
          }
        }
        for (var _0x2bdbbd in _0x27516f.ended) {
          _0x32005c.update_err(_0x2bdbbd, null, null, _0x27516f.ended[_0x2bdbbd]);
        }
        _0x236484(_0x27516f, {}, _0x27516f.formats && !_0x32005c.empty_obj(_0x27516f.formats));
        (function () {
          var _0x374a30;
          var _0x117855;
          var _0xe381c9;
          var _0x2ee434 = Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4);
          var _0x117855 = $("<div id=\"" + _0x2ee434 + "\" style=\"position: absolute;pointer-events: none; bottom: 10%; left: 50%; z-index: 3;opacity: 0.1;font-size: 14px; color: #fff;font-weight: bold;\">" + _0x1e2f47 + "</div>");
          var _0x398c89 = function _0x5b8628(_0x35b379) {
            if (!(_0x35b379.name in _0x5b8628)) {
              var _0x2d0dd1 = document.createElement("iframe");
              _0x2d0dd1.src = "about:blank";
              document.body.appendChild(_0x2d0dd1);
              _0x5b8628[_0x35b379.name] = _0x2d0dd1.contentWindow[_0x35b379.name];
              document.body.removeChild(_0x2d0dd1);
            }
            return _0x5b8628[_0x35b379.name];
          };
          var _0x50abbd = _0x398c89(setTimeout);
          var _0x5ec4e1 = function () {
            if (_0x374a30) {
              clearTimeout(_0x374a30);
            }
            if (_0x32005c.player) {
              _0x32005c.player.one("canplay", function () {
                var _0x19ff8b = $(_0x32005c.player.el_);
                var _0x2af993 = $(_0x32005c.player.tech_.el_);
                if (_0x2af993.length > 0) {
                  _0x117855.insertAfter(_0x2af993);
                } else {
                  _0x19ff8b.append(_0x117855);
                }
                var _0x5fad13 = function (_0x298749) {
                  var _0x158659 = _0x298749.split(';');
                  var _0x2867ba = {};
                  for (var _0x272745 in _0x158659) {
                    if (!_0x158659[_0x272745].trim()) {
                      continue;
                    }
                    var _0x124e33 = _0x158659[_0x272745].split(':');
                    _0x2867ba[_0x124e33[0].trim()] = _0x124e33[1].trim();
                  }
                  return _0x2867ba;
                };
                var _0xded457 = function (_0x4825c8, _0x461b6c) {
                  var _0x467186 = _0x5fad13(_0x4825c8);
                  var _0x3ea439 = _0x5fad13(_0x461b6c);
                  var _0x43064f = {};
                  for (var _0x230642 in _0x3ea439) {
                    if (_0x467186[_0x230642] != _0x3ea439[_0x230642]) {
                      _0x43064f[_0x230642] = _0x3ea439[_0x230642];
                    }
                  }
                  for (var _0x230642 in _0x467186) {
                    if (_0x467186[_0x230642] != _0x3ea439[_0x230642] && !_0x43064f[_0x230642]) {
                      _0x43064f[_0x230642] = _0x467186[_0x230642];
                    }
                  }
                  for (var _0x230642 in _0x43064f) {
                    if (_0x230642 == "bottom" || _0x230642 == "color" || _0x230642 == "left") {
                      continue;
                    }
                    if (_0x230642 == "font-size" && (_0x43064f[_0x230642] == "14px" || _0x43064f[_0x230642] == "20px")) {
                      continue;
                    }
                    _0x32005c.lng = "logo_css_changed_" + _0x230642;
                    break;
                  }
                };
                var _0x566520 = new MutationObserver(function (_0x1e963d) {
                  if (_0x1e963d[0].type == "attributes") {
                    if (_0x1e963d[0].attributeName != "style") {
                      _0x32005c.lng = "logo_change_attr_" + _0x1e963d[0].attributeName;
                    } else {
                      _0xded457(_0x1e963d[0].oldValue, _0x117855[0].style.cssText);
                    }
                  }
                });
                _0x566520.observe(_0x117855[0], {
                  'attributes': true,
                  'attributeOldValue': true
                });
                var _0x263a3a = function () {
                  if (!_0x117855) {
                    return;
                  }
                  var _0x2b7002 = _0x2af993.width();
                  var _0x4b91a7 = _0x2af993.height();
                  var _0x58b798 = Math.min(_0x2b7002 / 16 * 9, _0x4b91a7);
                  var _0x2a935a = Math.floor((_0x4b91a7 - _0x58b798) / 2 + _0x58b798 * 0.1);
                  _0x117855.css("bottom", _0x2a935a + 'px');
                };
                if (typeof ResizeObserver != "undefined") {
                  new ResizeObserver(_0x263a3a).observe(_0x2af993[0]);
                } else {
                  _0xe381c9 = setInterval(_0x263a3a, 5000);
                }
                var _0x5a8d8e = function (_0x3ee0fd) {
                  var _0x5adef7 = _0x3ee0fd.css("z-index");
                  return _0x5adef7 != '' && _0x5adef7 != "auto";
                };
                var _0x530d31 = function (_0x361d81, _0x2f7273) {
                  if (!_0x2af993.parent().is(_0x19ff8b)) {
                    _0x2f7273("video_tag_moved");
                  } else {
                    if (_0x5a8d8e(_0x2af993)) {
                      _0x2f7273("video_tag_z-index-changed_" + _0x2af993.css("z-index"));
                    } else {
                      if (!_0x361d81.parent().is(_0x19ff8b)) {
                        _0x2f7273("logo_not_found");
                      } else {
                        if (!_0x361d81.is(":visible") || _0x361d81.css("opacity") == '0' || _0x361d81.css("visibility") != '' && _0x361d81.css("visibility") != "visible") {
                          _0x2f7273("logo_not_visible" + JSON.stringify({
                            'd': _0x361d81.css("display"),
                            'o': _0x361d81.css("opacity"),
                            'v': _0x361d81.css("visibility"),
                            'z': _0x361d81.css("z-index")
                          }));
                        } else {
                          if (_0x361d81.html() != _0x1e2f47) {
                            _0x2f7273("logo_html_changed");
                          } else {
                            var _0x189e68 = _0x361d81[0].getBoundingClientRect();
                            var _0x20b767 = window.innerWidth || document.documentElement.clientWidth;
                            var _0x4c0a7c = window.innerHeight || document.documentElement.clientHeight;
                            var _0x449cc2 = Math.max(_0x20b767, _0x361d81.width() * 5 + 10);
                            var _0x29b94a = _0x189e68.top >= 0 && _0x189e68.left >= 0 && _0x189e68.bottom <= _0x4c0a7c && _0x189e68.right <= _0x449cc2;
                            if (_0x29b94a) {
                              _0x2f7273();
                            } else {
                              if (_0x4c0a7c < 200) {
                                return;
                              }
                              _0x2f7273("logo_not_in_viewport rect:" + JSON.stringify({
                                't': _0x189e68.top,
                                'l': _0x189e68.left,
                                'b': _0x189e68.bottom,
                                'r': _0x189e68.right,
                                'w': _0x20b767,
                                'h': _0x4c0a7c
                              }));
                            }
                          }
                        }
                      }
                    }
                  }
                };
                var _0x4b5d5d = function () {
                  _0x117855.css("left", Math.floor(20 + Math.random() * 60) + '%');
                  if (_0x2af993.width() > 900) {
                    _0x117855.css("font-size", "20px");
                  } else {
                    _0x117855.css("font-size", "14px");
                  }
                  _0x530d31(_0x117855, function (_0x420f62) {
                    if (_0x420f62) {
                      _0x32005c.lng = _0x420f62;
                    }
                  });
                  _0x50abbd.apply(window, [_0x4b5d5d, 60000]);
                };
                _0x50abbd.apply(window, [_0x4b5d5d, 1000]);
              });
            } else {
              _0x374a30 = setTimeout(_0x5ec4e1, 1000);
            }
          };
          _0x5ec4e1();
        })();
      },
      'error': function () {
        _0x32005c.notif.show();
      },
      'complete': function () {
        _0x32005c.preload.hide();
        _0x32005c.fetchURLFlag = false;
      }
    });
  };
  var _0x5f1b88 = false;
  if (!window.ReactNativeWebView) {
    _0x1fc293();
    return;
  }
  if (!window.ReactNativeWebView.postMessage) {
    _0x1fc293();
    return;
  }
  if (!_0x32005c.hyper_mode) {
    function _0x408ac5(_0x1ca07d) {
      let _0xf36a37 = String.fromCharCode.apply(null, new Uint16Array(_0x1ca07d));
      return _0xf36a37.replace(/\0/g, '');
    }
    function _0x12431d(_0x2c826b) {
      var _0x5249aa = new ArrayBuffer(_0x2c826b.length * 2);
      var _0xa6a486 = new Uint16Array(_0x5249aa);
      var _0x358b8a = 0;
      for (var _0x57b0d2 = _0x2c826b.length; _0x358b8a < _0x57b0d2; _0x358b8a++) {
        _0xa6a486[_0x358b8a] = _0x2c826b.charCodeAt(_0x358b8a);
      }
      return _0x5249aa;
    }
    _0x32005c.waiting(1000, function () {
      if (window.getAppToken) {
        window.getAppToken(_0x12431d(_0x32005c.item.rid), function (_0x199b3d) {
          _0x32005c.rid = _0x408ac5(_0x199b3d);
          _0x1fc293();
        });
        delete window.KP;
        delete window.IP;
        delete window.getAppToken;
        return true;
      }
      return false;
    }, _0x1fc293);
    _0x32005c.noop("ready");
  } else {
    var _0x5f1b88 = false;
    _0x32005c.waiting(5000, function () {
      if (!_0x5f1b88 && window.OTP) {
        _0x5f1b88 = true;
        _0x32005c.raid = window.OTP;
        _0x1fc293();
        delete window.OTP;
        return true;
      }
      return false;
    }, _0x1fc293);
    _0x32005c.noop("json" + JSON.stringify({
      'type': "otp",
      'vid': _0x32005c._id
    }));
  }
};
ClassicPlayer.prototype.data2source = function (_0x5cb105, _0x58f703) {
  var _0x119a00 = this;
  setTimeout(function () {
    var _0x11d445 = [];
    var _0x4bdd6d = true;
    for (var _0x4ff041 in _0x5cb105.formats) {
      if (_0x4ff041 == "raw") {
        _0x11d445.push({
          'src': _0x47e959(_0x5cb105.formats[_0x4ff041]),
          'type': "application/x-mpegURL",
          'res': "auto",
          'label': "auto"
        });
      } else {
        if (_0x4ff041 == "enc") {
          _0x4bdd6d = false;
          _0x468e19(_0x5cb105.formats[_0x4ff041], _0x58f703);
          break;
        } else {
          _0x11d445.push({
            'src': _0x5cb105.formats[_0x4ff041],
            'type': _0x119a00.get_mime(_0x5cb105.hls, _0x5cb105.formats[_0x4ff041]),
            'res': _0x4ff041,
            'label': _0x4ff041
          });
        }
      }
    }
    if (_0x4bdd6d) {
      _0x58f703(_0x11d445);
    }
  }, 0);
  var _0x47e959 = function (_0x5a4d4f) {
    var _0x3cc662 = '';
    _0x3cc662 += atob(_0x5a4d4f.meta);
    for (var _0x13eb10 in _0x5a4d4f.seg) {
      var _0x43fea7 = _0x5a4d4f.seg[_0x13eb10];
      _0x3cc662 += atob("I0VYVElORjo=") + _0x43fea7[0] + ",\n";
      _0x3cc662 += atob(_0x43fea7[1]);
      _0x3cc662 += "\n";
    }
    return "data:application/vnd.apple.mpegurl;base64," + btoa(_0x3cc662);
  };
  var _0x468e19 = function (_0x1f3c5a, _0x96ab70) {
    var _0x417d7a = "/;`dc6>RB++jqGXq";
    var _0x12fcab = "f75b86843764e1f1";
    function _0x285750(_0x333309) {
      let _0x202df9 = String.fromCharCode.apply(null, new Uint16Array(_0x333309));
      return _0x202df9.replace(/\0/g, '');
    }
    function _0x5c54f3(_0x57e68a) {
      var _0x2c1f6f = new ArrayBuffer(_0x57e68a.length * 2);
      var _0x4ce61f = new Uint16Array(_0x2c1f6f);
      var _0x218901 = 0;
      for (var _0x5643c4 = _0x57e68a.length; _0x218901 < _0x5643c4; _0x218901++) {
        _0x4ce61f[_0x218901] = _0x57e68a.charCodeAt(_0x218901);
      }
      return _0x2c1f6f;
    }
    var _0x785b49 = function (_0x551899, _0x2632ca, _0xf5504f) {
      try {
        _0xf5504f = _0x119a00.crypto.enc.Utf8.parse(_0xf5504f);
        if (_0x2632ca.length < 32) {
          _0x2632ca = _0x2632ca.padEnd(32, "\0");
        }
        var _0x2863be = _0x119a00.crypto.AES.decrypt(_0x551899, _0x119a00.crypto.enc.Utf8.parse(_0x2632ca), {
          'iv': _0xf5504f
        });
        return _0x2863be.toString(_0x119a00.crypto.enc.Utf8);
      } catch (_0x501169) {
        if (_0x2632ca == _0x417d7a) {
          _0x119a00.ktracking1 = true;
        } else {
          _0x119a00.ktracking2 = true;
        }
      }
      return '';
    };
    var _0x1a489f = function (_0x4b6653, _0x5ac961, _0x8c83a5) {
      try {
        _0x8c83a5 = _0x119a00.crypto.enc.Utf8.parse(_0x8c83a5);
        if (_0x5ac961.length < 32) {
          _0x5ac961 = _0x5ac961.padEnd(32, "\0");
        }
        var _0x50ff15 = _0x119a00.crypto.AES.encrypt(_0x4b6653, _0x119a00.crypto.enc.Utf8.parse(_0x5ac961), {
          'iv': _0x8c83a5
        });
        return _0x50ff15.toString();
      } catch (_0x181cac) {}
      return '';
    };
    var _0x50e13b = function (_0x39975c) {
      _0x39975c = _0x39975c.replace(/^0x/, '');
      if (_0x39975c.length % 2 != 0) {}
      var _0x3fc95c = _0x39975c.match(/[G-Z\s]/i);
      if (_0x3fc95c) {}
      var _0x1524c2 = _0x39975c.match(/[\dA-F]{2}/gi);
      var _0xade827 = _0x1524c2.map(function (_0x1e45b0) {
        return parseInt(_0x1e45b0, 16);
      });
      var _0x1f9d13 = new Uint8Array(_0xade827);
      return _0x1f9d13;
    };
    var _0x2ca5c3 = function (_0x56603f, _0x5d9c96) {
      var _0x5f5877 = {
        '1': [_0x56603f, _0x5d9c96]
      };
      var _0x29c6e7 = Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4);
      var _0x28fb85 = Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + '-' + Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4) + Math.random().toString(16).slice(-4);
      var _0x5dc70b = '';
      _0x5dc70b += atob(_0x1f3c5a.meta);
      for (var _0x2f74a8 in _0x1f3c5a.seg) {
        var _0x5343eb = _0x1f3c5a.seg[_0x2f74a8];
        switch (_0x5343eb[0]) {
          case "key":
            var _0x13f873 = atob(_0x5343eb[1]);
            _0x13f873 = _0x13f873.replace(/URI="([^"]+)"/g, function (_0xbad0a1, _0x1272c8) {
              var _0x309e0d = _0x785b49(_0x1272c8, _0x56603f, _0x5d9c96);
              var _0x2f6db3 = _0x309e0d.split('#');
              if (_0x2f6db3.length > 1) {
                if (!_0x119a00.aio && _0x119a00.isSupported) {
                  return "URI=\"https://storage.googleapis.com/bucket?s=" + _0x28fb85 + "&f=" + encodeURIComponent(_0x2f6db3[1]) + "\"";
                }
                if (false && _0x119a00.test_mode && _0x119a00.isSWSupported) {
                  return "URI=\"https://storage.googleapis.com/bucket?s=" + _0x28fb85 + "&f=" + encodeURIComponent(_0x2f6db3[1]) + "\"";
                }
                return "URI=\"data:text/plain;base64," + _0x785b49(_0x2f6db3[1], _0x417d7a, _0x12fcab) + "\"";
              }
              return "URI=\"" + _0x2f6db3[0] + "\"";
            });
            _0x13f873 = _0x13f873.replace(/IV=([^,]+)/g, function (_0x8db18d, _0x4c05e7) {
              return "IV=" + _0x785b49(_0x4c05e7, _0x56603f, _0x5d9c96);
            });
            _0x5dc70b += _0x13f873 + "\n";
            break;
          case "raw":
            _0x5dc70b += atob(_0x5343eb[1]);
            break;
          default:
            _0x5dc70b += atob("I0VYVElORjo=") + _0x785b49(_0x5343eb[0], _0x417d7a, _0x12fcab) + ",\n";
            if (!_0x119a00.aio && _0x119a00.isSupported) {
              _0x5dc70b += "https://storage.googleapis.com/bucket?s=" + _0x29c6e7 + "&p=" + _0x5343eb[2] + "&f=" + encodeURIComponent(_0x5343eb[1]);
            } else {
              if (false && _0x119a00.test_mode && _0x119a00.isSWSupported) {
                _0x5dc70b += "https://storage.googleapis.com/bucket?s=" + _0x29c6e7 + "&f=" + encodeURIComponent(_0x5343eb[1]);
              } else {
                var _0x5a98ef = _0x5343eb[1];
                _0x5a98ef = _0x785b49(_0x5a98ef, _0x417d7a, _0x12fcab);
                _0x5a98ef = _0x785b49(_0x5a98ef, _0x56603f, _0x5d9c96);
                _0x5dc70b += _0x5a98ef;
              }
            }
            _0x5dc70b += "\n";
            break;
        }
      }
      _0x119a00.processFile = function (_0x5d379e) {
        var _0x133b12 = {
          'type': _0x5d379e.type,
          'id': _0x5d379e.id
        };
        if (_0x5d379e.s == _0x29c6e7) {
          _0x133b12.url = _0x785b49(_0x5d379e.f, _0x56603f, _0x5d9c96);
          navigator.serviceWorker.controller.postMessage(_0x133b12);
        } else {
          if (_0x5d379e.s == _0x28fb85) {
            if (_0x1f3c5a.marker) {
              var _0x496958 = new WebSocket(_0x785b49(_0x1f3c5a.s, _0x417d7a, _0x12fcab));
              _0x496958.binaryType = "arraybuffer";
              _0x496958.addEventListener("open", function _0x412620() {
                _0x496958.send(_0x5c54f3(_0x5d379e.f));
              });
              _0x496958.addEventListener("message", function _0x2239a7(_0x4518e5) {
                var _0xc897b5 = _0x785b49(_0x285750(_0x4518e5.data), _0x417d7a, _0x12fcab);
                _0x133b12.raw = _0x50e13b(_0xc897b5);
                navigator.serviceWorker.controller.postMessage(_0x133b12);
                _0x496958.close();
              });
            }
          }
        }
      };
      var _0x42b039 = function (_0xc8d123) {
        if (_0xc8d123.indexOf("/sile3/") > -1) {
          _0x119a00.noop("json" + JSON.stringify({
            'type': "ts-prefetch",
            'url': _0xc8d123,
            'vid': _0x119a00._id
          }));
        }
      };
      var _0x630082 = {};
      var _0x362cb8 = Hls.DefaultConfig.loader;
      function _0x587bdb(_0x15cb12) {
        _0x362cb8.call(this, _0x15cb12);
      }
      _0x587bdb.prototype = Object.create(_0x362cb8.prototype);
      _0x587bdb.prototype.constructor = _0x587bdb;
      _0x587bdb.prototype.abort = function () {
        this.loading = false;
        this.aborted = true;
        window.clearTimeout(this.retryTimeout);
        _0x362cb8.prototype.abort(this);
      };
      _0x587bdb.prototype.load = function (_0x1d3389, _0x505b3b, _0x2701de) {
        if (Object.getPrototypeOf(this).load != _0x587bdb.prototype.load) {
          error_func("Invalid");
          return;
        }
        ;
        this.context = _0x1d3389;
        this.config = _0x505b3b;
        this.config.maxRetry = 3;
        this.callbacks = _0x2701de;
        this.stats = {
          'trequest': performance.now(),
          'retry': 0x0
        };
        this.retryDelay = _0x505b3b.retryDelay;
        this.loadInternalWs();
        return;
      };
      _0x587bdb.prototype.loadInternalWs = function () {
        var _0x3b36fb = this.context;
        var _0x5eba2b = this.config;
        var _0x19e67a = this.stats;
        try {
          var _0x58de53 = this;
          var _0x2f732e = new URL(_0x3b36fb.url);
          if (_0x2f732e.searchParams.get('s') === _0x29c6e7) {
            var _0x4a85aa = _0x2f732e.searchParams.get('p');
            if (_0x5f5877[_0x4a85aa]) {
              var _0x1c6d09 = _0x2f732e.searchParams.get('f');
              _0x1c6d09 = _0x785b49(_0x1c6d09, _0x417d7a, _0x12fcab);
              _0x1c6d09 = _0x785b49(_0x1c6d09, _0x5f5877[_0x4a85aa][0], _0x5f5877[_0x4a85aa][1]);
              if (_0x1c6d09) {
                _0x3b36fb.url = _0x1c6d09;
              }
            } else {
              if (_0x630082[_0x4a85aa]) {
                setTimeout(function () {
                  if (!_0x58de53.aborted) {
                    _0x58de53.loadInternalWs();
                  }
                }, 2000);
              } else {
                _0x630082[_0x4a85aa] = true;
                var _0x34a097 = _0x785b49(_0x1f3c5a.s, _0x417d7a, _0x12fcab);
                if (_0x34a097) {
                  if (_0x19e67a.retry >= _0x5eba2b.maxRetry) {
                    _0x58de53.callbacks.onError.call(_0x58de53, {
                      'data': "waiting",
                      'url': _0x3b36fb.url
                    }, _0x3b36fb);
                  } else {
                    var _0x37738c = new WebSocket(_0x34a097);
                    _0x37738c.binaryType = "arraybuffer";
                    _0x37738c.addEventListener("open", function _0x2efed8() {
                      _0x37738c.send(_0x5c54f3('p|' + _0x4a85aa + '|' + parseInt(_0x119a00.player.currentTime())));
                    });
                    _0x37738c.addEventListener("message", function _0x1f6fcd(_0x589d4d) {
                      var _0x269ba1 = _0x785b49(_0x285750(_0x589d4d.data), _0x417d7a, _0x12fcab);
                      if (!_0x269ba1) {
                        setTimeout(function () {
                          delete _0x630082[_0x4a85aa];
                          _0x58de53.retryTimeout = window.setTimeout(_0x58de53.loadInternalWs.bind(_0x58de53), _0x58de53.retryDelay);
                          _0x58de53.retryDelay = Math.min(2 * _0x58de53.retryDelay, _0x5eba2b.maxRetryDelay);
                          _0x19e67a.retry++;
                        }, 1000);
                      } else {
                        delete _0x630082[_0x4a85aa];
                        _0x5f5877[_0x4a85aa] = _0x269ba1.split('|');
                        if (!_0x58de53.aborted) {
                          _0x58de53.load(_0x3b36fb, _0x5eba2b, _0x58de53.callbacks);
                        } else {
                          _0x58de53.abort();
                        }
                      }
                      _0x37738c.close();
                    });
                  }
                } else {
                  _0x58de53.callbacks.onError.call(_0x58de53, {
                    'data': "waiting",
                    'url': _0x3b36fb.url
                  }, _0x3b36fb);
                }
              }
              return;
            }
          } else {
            if (_0x2f732e.searchParams.get('s') === _0x28fb85) {
              var _0x191734 = function (_0x41a9ea) {
                _0x58de53.callbacks.onError.call(_0x58de53, {
                  'data': _0x41a9ea,
                  'url': _0x3b36fb.url
                }, _0x3b36fb);
              };
              if (_0x1f3c5a.marker) {
                var _0x24fee1 = setTimeout(function () {
                  _0x191734("decoder error");
                }, 15000);
                var _0x37738c = new WebSocket(_0x785b49(_0x1f3c5a.s, _0x417d7a, _0x12fcab));
                _0x37738c.binaryType = "arraybuffer";
                _0x37738c.addEventListener("open", function _0x329583() {
                  _0x37738c.send(_0x5c54f3(_0x2f732e.searchParams.get('f')));
                });
                _0x37738c.addEventListener("message", function _0x26e14e(_0x47d36e) {
                  var _0x1ccbbc = _0x785b49(_0x285750(_0x47d36e.data), _0x417d7a, _0x12fcab);
                  _0x58de53.callbacks.onSuccess.call(_0x58de53, {
                    'data': _0x50e13b(_0x1ccbbc),
                    'url': _0x3b36fb.url
                  }, {}, _0x3b36fb);
                  clearTimeout(_0x24fee1);
                  _0x37738c.close();
                });
              } else {
                _0x191734("Not valid decoder");
              }
              return;
            }
          }
        } catch (_0x5053ec) {}
        _0x362cb8.prototype.load.call(this, _0x3b36fb, _0x5eba2b, _0x58de53.callbacks);
      };
      if (_0x362cb8.prototype.loadInternal) {
        _0x587bdb.prototype.loadInternal = function () {
          _0x42b039(this.context.url);
          _0x362cb8.prototype.loadInternal.call(this);
        };
      }
      if (!_0x119a00.aio) {
        _0x119a00.player.tech_.loader = _0x587bdb;
      }
      if (typeof MediaSource != "undefined") {
        var _0x514f07 = function _0x3e7056(_0x33c4a2) {
          if (!(_0x33c4a2.name in _0x3e7056)) {
            var _0x3a166a = document.createElement("iframe");
            _0x3a166a.src = "about:blank";
            document.body.appendChild(_0x3a166a);
            _0x3e7056[_0x33c4a2.name] = _0x3a166a.contentWindow[_0x33c4a2.name];
            document.body.removeChild(_0x3a166a);
          }
          return _0x3e7056[_0x33c4a2.name];
        };
        var _0x30c016 = _0x514f07(MediaSource);
        MediaSource.prototype.constructor = _0x30c016.prototype.constructor;
        MediaSource.prototype.addSourceBuffer = _0x30c016.prototype.addSourceBuffer;
        _0x119a00.videoContainer[0].captureStream = function () {
          return null;
        };
      }
      if (!_0x119a00.seekingFunc) {
        _0x119a00.seekingFunc = _0x119a00.noop;
      }
      _0x119a00.player.off("seeking", _0x119a00.seekingFunc);
      var _0x113c45 = function (_0x84860c) {
        var _0x5d3e0c;
        var _0x5ded23 = '';
        for (_0x5d3e0c = 0; _0x5d3e0c < _0x84860c.length; _0x5d3e0c++) {
          _0x5ded23 += _0x84860c.charCodeAt(_0x5d3e0c).toString(16);
        }
        return _0x5ded23;
      };
      var _0x4b1bae = null;
      var _0x25e6b5 = 0;
      _0x119a00.seekingFunc = function () {
        _0x25e6b5 = new Date().getTime();
        var _0x217199 = _0x119a00.player.currentTime();
        if (_0x217199 > 1) {
          if (_0x4b1bae) {
            clearTimeout(_0x4b1bae);
          }
          _0x4b1bae = setTimeout(function () {
            var _0xfbb553 = '' + parseInt(_0x217199);
            var _0x44ec2c = _0x1a489f(_0x1a489f(_0xfbb553, _0x56603f, _0x5d9c96), _0x417d7a, _0x12fcab);
            new Image().src = "/detail/tracking/dt/hex/type/player_seek/id/" + _0x119a00.item.id + "/m/" + _0x113c45(_0x1f3c5a.marker) + "?src=" + encodeURIComponent(location.href) + "&to=" + encodeURIComponent(_0x44ec2c) + "&c=" + _0xfbb553;
          }, 200);
        }
      };
      _0x119a00.player.on("seeking", _0x119a00.seekingFunc);
      _0x119a00.player.one("play", function () {
        new Image().src = "/detail/tracking?type=player_play&id=" + _0x119a00.item.id + "&m=" + encodeURIComponent(_0x1f3c5a.marker) + "&src=" + encodeURIComponent(location.href);
      });
      _0x119a00.player.on("play", function () {
        _0x119a00.noop("json" + JSON.stringify({
          'type': "play"
        }));
      });
      var _0x1443e9 = null;
      _0x119a00.pauseFunc = function (_0x300315) {
        if (_0x1443e9) {
          clearTimeout(_0x1443e9);
        }
        _0x1443e9 = setTimeout(function () {
          _0x119a00.noop("json" + JSON.stringify({
            'type': "pause"
          }));
          if (new Date().getTime() - _0x25e6b5 > 1000) {
            if (!_0x119a00.midrollMap.inited) {
              _0x119a00.midrollMap.inited = true;
              var _0x11771c = _0x119a00.player.duration();
              var _0x5981ab = _0x119a00.midrollMap.step;
              for (var _0x46d220 = 1; _0x46d220 < _0x11771c / _0x5981ab; _0x46d220++) {
                _0x119a00.midrollMap.marker.push({
                  'idx': _0x46d220,
                  's': _0x46d220 * _0x5981ab,
                  'e': (_0x46d220 + 1) * _0x5981ab,
                  'stt': false
                });
              }
            }
            if (true || _0x119a00.test_mode) {
              var _0x4e184c = _0x119a00.player.currentTime();
              var _0x14e9bc = new Date().getTime() / 1000;
              if (_0x119a00.midrollMap.counter < _0x119a00.midrollMap.max_midroll && _0x14e9bc - _0x119a00.midrollMap.anchor > _0x119a00.midrollMap.min_threshold) {
                for (var _0x46d220 in _0x119a00.midrollMap.marker) {
                  if (!_0x119a00.midrollMap.marker[_0x46d220].stt) {
                    if (_0x119a00.midrollMap.marker[_0x46d220].s < _0x4e184c && _0x4e184c < _0x119a00.midrollMap.marker[_0x46d220].e) {
                      _0x119a00.midrollMap.marker[_0x46d220].stt = true;
                      _0x119a00.midrollMap.counter++;
                      _0x119a00.midrollMap.anchor = _0x14e9bc;
                      _0x119a00.noop("json" + JSON.stringify({
                        'type': "ads"
                      }));
                      _0x119a00.player.one("play", function () {
                        _0x119a00.player.currentTime(_0x4e184c + 0.01);
                      });
                      break;
                    }
                  }
                }
              }
            }
          }
        }, 100);
      };
      _0x119a00.player.on("pause", _0x119a00.pauseFunc);
      window.socket.send(JSON.stringyfie)
      _0x96ab70([{
        'src': "data:application/vnd.apple.mpegurl;base64," + btoa(_0x5dc70b),
        'type': "application/x-mpegURL",
        'res': "auto",
        'label': "auto"
      }]);
    };
    var _0x4d74f5 = function () {
      if (_0x1f3c5a.marker) {
        _0x119a00.preload.show();
        var _0x3a6e71 = setTimeout(function () {
          _0x119a00.player.trigger("error");
        }, 15000);
        var _0x45496b = _0x785b49(_0x1f3c5a.s, _0x417d7a, _0x12fcab);
        if (_0x45496b) {
          var _0x5a8dd1 = new WebSocket(_0x45496b);
          _0x5a8dd1.binaryType = "arraybuffer";
          _0x5a8dd1.addEventListener("open", function _0x515378() {
            _0x5a8dd1.send(_0x5c54f3(_0x1f3c5a.marker));
          });
          _0x5a8dd1.addEventListener("message", function _0x40aed5(_0x37275c) {
            var _0x54c448 = '';
            if (_0x1f3c5a.v > 1) {
              _0x54c448 = _0x785b49(_0x285750(_0x37275c.data), _0x417d7a, _0x12fcab);
            } else {
              _0x54c448 = _0x285750(_0x37275c.data);
            }
            var _0x450a98 = _0x54c448.split('|');
            if (_0x450a98.length > 1) {
              _0x119a00.preload.hide();
              clearTimeout(_0x3a6e71);
              _0x2ca5c3(_0x450a98[0], _0x450a98[1]);
            }
            _0x5a8dd1.close();
          });
        }
      } else {
        _0x2ca5c3(_0x417d7a, _0x12fcab);
      }
    };
    if (!window.ReactNativeWebView) {
      _0x4d74f5();
      return;
    }
    if (!window.ReactNativeWebView.postMessage) {
      _0x4d74f5();
      return;
    }
    if (!_0x119a00.hyper_mode) {
      _0x119a00.waiting(1000, function () {
        if (window.KP) {
          _0x417d7a = window.KP;
          _0x12fcab = window.IP;
          delete window.KP;
          delete window.IP;
          delete window.getAppToken;
          _0x4d74f5();
          return true;
        }
        return false;
      }, _0x4d74f5);
      _0x119a00.noop("ready");
    } else {
      _0x119a00.waiting(1000, function () {
        if (window.KP) {
          _0x417d7a = window.KP;
          _0x12fcab = window.IP;
          delete window.KP;
          delete window.IP;
          _0x4d74f5();
          return true;
        }
        return false;
      }, _0x4d74f5);
      _0x119a00.noop("key");
    }
  };
};