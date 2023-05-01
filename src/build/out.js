(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/randomcolor/randomColor.js
  var require_randomColor = __commonJS({
    "node_modules/randomcolor/randomColor.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          var randomColor2 = factory();
          if (typeof module === "object" && module && module.exports) {
            exports = module.exports = randomColor2;
          }
          exports.randomColor = randomColor2;
        } else if (typeof define === "function" && define.amd) {
          define([], factory);
        } else {
          root.randomColor = factory();
        }
      })(exports, function() {
        var seed = null;
        var colorDictionary = {};
        loadColorBounds();
        var colorRanges = [];
        var randomColor2 = function(options2) {
          options2 = options2 || {};
          if (options2.seed !== void 0 && options2.seed !== null && options2.seed === parseInt(options2.seed, 10)) {
            seed = options2.seed;
          } else if (typeof options2.seed === "string") {
            seed = stringToInteger(options2.seed);
          } else if (options2.seed !== void 0 && options2.seed !== null) {
            throw new TypeError("The seed value must be an integer or string");
          } else {
            seed = null;
          }
          var H, S, B;
          if (options2.count !== null && options2.count !== void 0) {
            var totalColors = options2.count, colors = [];
            for (var i = 0; i < options2.count; i++) {
              colorRanges.push(false);
            }
            options2.count = null;
            while (totalColors > colors.length) {
              var color = randomColor2(options2);
              if (seed !== null) {
                options2.seed = seed;
              }
              colors.push(color);
            }
            options2.count = totalColors;
            return colors;
          }
          H = pickHue(options2);
          S = pickSaturation(H, options2);
          B = pickBrightness(H, S, options2);
          return setFormat([H, S, B], options2);
        };
        function pickHue(options2) {
          if (colorRanges.length > 0) {
            var hueRange = getRealHueRange(options2.hue);
            var hue = randomWithin(hueRange);
            var step = (hueRange[1] - hueRange[0]) / colorRanges.length;
            var j = parseInt((hue - hueRange[0]) / step);
            if (colorRanges[j] === true) {
              j = (j + 2) % colorRanges.length;
            } else {
              colorRanges[j] = true;
            }
            var min = (hueRange[0] + j * step) % 359, max = (hueRange[0] + (j + 1) * step) % 359;
            hueRange = [min, max];
            hue = randomWithin(hueRange);
            if (hue < 0) {
              hue = 360 + hue;
            }
            return hue;
          } else {
            var hueRange = getHueRange(options2.hue);
            hue = randomWithin(hueRange);
            if (hue < 0) {
              hue = 360 + hue;
            }
            return hue;
          }
        }
        function pickSaturation(hue, options2) {
          if (options2.hue === "monochrome") {
            return 0;
          }
          if (options2.luminosity === "random") {
            return randomWithin([0, 100]);
          }
          var saturationRange = getSaturationRange(hue);
          var sMin = saturationRange[0], sMax = saturationRange[1];
          switch (options2.luminosity) {
            case "bright":
              sMin = 55;
              break;
            case "dark":
              sMin = sMax - 10;
              break;
            case "light":
              sMax = 55;
              break;
          }
          return randomWithin([sMin, sMax]);
        }
        function pickBrightness(H, S, options2) {
          var bMin = getMinimumBrightness(H, S), bMax = 100;
          switch (options2.luminosity) {
            case "dark":
              bMax = bMin + 20;
              break;
            case "light":
              bMin = (bMax + bMin) / 2;
              break;
            case "random":
              bMin = 0;
              bMax = 100;
              break;
          }
          return randomWithin([bMin, bMax]);
        }
        function setFormat(hsv, options2) {
          switch (options2.format) {
            case "hsvArray":
              return hsv;
            case "hslArray":
              return HSVtoHSL(hsv);
            case "hsl":
              var hsl = HSVtoHSL(hsv);
              return "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)";
            case "hsla":
              var hslColor = HSVtoHSL(hsv);
              var alpha = options2.alpha || Math.random();
              return "hsla(" + hslColor[0] + ", " + hslColor[1] + "%, " + hslColor[2] + "%, " + alpha + ")";
            case "rgbArray":
              return HSVtoRGB(hsv);
            case "rgb":
              var rgb = HSVtoRGB(hsv);
              return "rgb(" + rgb.join(", ") + ")";
            case "rgba":
              var rgbColor = HSVtoRGB(hsv);
              var alpha = options2.alpha || Math.random();
              return "rgba(" + rgbColor.join(", ") + ", " + alpha + ")";
            default:
              return HSVtoHex(hsv);
          }
        }
        function getMinimumBrightness(H, S) {
          var lowerBounds = getColorInfo(H).lowerBounds;
          for (var i = 0; i < lowerBounds.length - 1; i++) {
            var s1 = lowerBounds[i][0], v1 = lowerBounds[i][1];
            var s2 = lowerBounds[i + 1][0], v2 = lowerBounds[i + 1][1];
            if (S >= s1 && S <= s2) {
              var m = (v2 - v1) / (s2 - s1), b = v1 - m * s1;
              return m * S + b;
            }
          }
          return 0;
        }
        function getHueRange(colorInput) {
          if (typeof parseInt(colorInput) === "number") {
            var number = parseInt(colorInput);
            if (number < 360 && number > 0) {
              return [number, number];
            }
          }
          if (typeof colorInput === "string") {
            if (colorDictionary[colorInput]) {
              var color = colorDictionary[colorInput];
              if (color.hueRange) {
                return color.hueRange;
              }
            } else if (colorInput.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
              var hue = HexToHSB(colorInput)[0];
              return [hue, hue];
            }
          }
          return [0, 360];
        }
        function getSaturationRange(hue) {
          return getColorInfo(hue).saturationRange;
        }
        function getColorInfo(hue) {
          if (hue >= 334 && hue <= 360) {
            hue -= 360;
          }
          for (var colorName in colorDictionary) {
            var color = colorDictionary[colorName];
            if (color.hueRange && hue >= color.hueRange[0] && hue <= color.hueRange[1]) {
              return colorDictionary[colorName];
            }
          }
          return "Color not found";
        }
        function randomWithin(range) {
          if (seed === null) {
            var golden_ratio = 0.618033988749895;
            var r = Math.random();
            r += golden_ratio;
            r %= 1;
            return Math.floor(range[0] + r * (range[1] + 1 - range[0]));
          } else {
            var max = range[1] || 1;
            var min = range[0] || 0;
            seed = (seed * 9301 + 49297) % 233280;
            var rnd = seed / 233280;
            return Math.floor(min + rnd * (max - min));
          }
        }
        function HSVtoHex(hsv) {
          var rgb = HSVtoRGB(hsv);
          function componentToHex(c) {
            var hex2 = c.toString(16);
            return hex2.length == 1 ? "0" + hex2 : hex2;
          }
          var hex = "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
          return hex;
        }
        function defineColor(name, hueRange, lowerBounds) {
          var sMin = lowerBounds[0][0], sMax = lowerBounds[lowerBounds.length - 1][0], bMin = lowerBounds[lowerBounds.length - 1][1], bMax = lowerBounds[0][1];
          colorDictionary[name] = {
            hueRange,
            lowerBounds,
            saturationRange: [sMin, sMax],
            brightnessRange: [bMin, bMax]
          };
        }
        function loadColorBounds() {
          defineColor(
            "monochrome",
            null,
            [[0, 0], [100, 0]]
          );
          defineColor(
            "red",
            [-26, 18],
            [[20, 100], [30, 92], [40, 89], [50, 85], [60, 78], [70, 70], [80, 60], [90, 55], [100, 50]]
          );
          defineColor(
            "orange",
            [18, 46],
            [[20, 100], [30, 93], [40, 88], [50, 86], [60, 85], [70, 70], [100, 70]]
          );
          defineColor(
            "yellow",
            [46, 62],
            [[25, 100], [40, 94], [50, 89], [60, 86], [70, 84], [80, 82], [90, 80], [100, 75]]
          );
          defineColor(
            "green",
            [62, 178],
            [[30, 100], [40, 90], [50, 85], [60, 81], [70, 74], [80, 64], [90, 50], [100, 40]]
          );
          defineColor(
            "blue",
            [178, 257],
            [[20, 100], [30, 86], [40, 80], [50, 74], [60, 60], [70, 52], [80, 44], [90, 39], [100, 35]]
          );
          defineColor(
            "purple",
            [257, 282],
            [[20, 100], [30, 87], [40, 79], [50, 70], [60, 65], [70, 59], [80, 52], [90, 45], [100, 42]]
          );
          defineColor(
            "pink",
            [282, 334],
            [[20, 100], [30, 90], [40, 86], [60, 84], [80, 80], [90, 75], [100, 73]]
          );
        }
        function HSVtoRGB(hsv) {
          var h = hsv[0];
          if (h === 0) {
            h = 1;
          }
          if (h === 360) {
            h = 359;
          }
          h = h / 360;
          var s = hsv[1] / 100, v = hsv[2] / 100;
          var h_i = Math.floor(h * 6), f = h * 6 - h_i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), r = 256, g = 256, b = 256;
          switch (h_i) {
            case 0:
              r = v;
              g = t;
              b = p;
              break;
            case 1:
              r = q;
              g = v;
              b = p;
              break;
            case 2:
              r = p;
              g = v;
              b = t;
              break;
            case 3:
              r = p;
              g = q;
              b = v;
              break;
            case 4:
              r = t;
              g = p;
              b = v;
              break;
            case 5:
              r = v;
              g = p;
              b = q;
              break;
          }
          var result = [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
          return result;
        }
        function HexToHSB(hex) {
          hex = hex.replace(/^#/, "");
          hex = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex;
          var red = parseInt(hex.substr(0, 2), 16) / 255, green = parseInt(hex.substr(2, 2), 16) / 255, blue = parseInt(hex.substr(4, 2), 16) / 255;
          var cMax = Math.max(red, green, blue), delta = cMax - Math.min(red, green, blue), saturation = cMax ? delta / cMax : 0;
          switch (cMax) {
            case red:
              return [60 * ((green - blue) / delta % 6) || 0, saturation, cMax];
            case green:
              return [60 * ((blue - red) / delta + 2) || 0, saturation, cMax];
            case blue:
              return [60 * ((red - green) / delta + 4) || 0, saturation, cMax];
          }
        }
        function HSVtoHSL(hsv) {
          var h = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100, k = (2 - s) * v;
          return [
            h,
            Math.round(s * v / (k < 1 ? k : 2 - k) * 1e4) / 100,
            k / 2 * 100
          ];
        }
        function stringToInteger(string) {
          var total = 0;
          for (var i = 0; i !== string.length; i++) {
            if (total >= Number.MAX_SAFE_INTEGER)
              break;
            total += string.charCodeAt(i);
          }
          return total;
        }
        function getRealHueRange(colorHue) {
          if (!isNaN(colorHue)) {
            var number = parseInt(colorHue);
            if (number < 360 && number > 0) {
              return getColorInfo(colorHue).hueRange;
            }
          } else if (typeof colorHue === "string") {
            if (colorDictionary[colorHue]) {
              var color = colorDictionary[colorHue];
              if (color.hueRange) {
                return color.hueRange;
              }
            } else if (colorHue.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {
              var hue = HexToHSB(colorHue)[0];
              return getColorInfo(hue).hueRange;
            }
          }
          return [0, 360];
        }
        return randomColor2;
      });
    }
  });

  // src/index.js
  var import_randomcolor = __toESM(require_randomColor(), 1);

  // src/utils/arcs.js
  var calculateAngle = (numberOfSegments) => Math.floor(360 / numberOfSegments * 100) / 100;
  var calculateEndCoords = (angle2) => {
    const radius = 45;
    const x = 50 + radius * Math.sin(Math.PI * (angle2 / 180));
    const y = 50 - radius * Math.cos(Math.PI * (angle2 / 180));
    return {
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100
    };
  };

  // src/utils/logic.js
  var logic_default = (angle2, choices) => {
    const normalised = Math.floor(angle2 % 360 / 360 * choices.length);
    return choices[normalised].title;
  };

  // src/index.js
  var spinner = document.getElementById("spinner");
  var spinnerCenter = document.getElementById("spinner-center");
  var numOfSegments = 5;
  var options = [
    { title: "Ellis", color: (0, import_randomcolor.default)() },
    { title: "Corey", color: (0, import_randomcolor.default)() },
    { title: "Waldo", color: (0, import_randomcolor.default)() },
    { title: "Pip", color: (0, import_randomcolor.default)() },
    { title: "Polar", color: (0, import_randomcolor.default)() }
  ].slice(0, numOfSegments);
  var currentAngle = 0;
  var setup = () => {
    spinnerCenter.addEventListener("click", () => {
      const rotation = Math.random() * 1e4;
      currentAngle -= rotation;
      const winner = logic_default(Math.abs(currentAngle), options);
      setTimeout(() => {
        alert(winner);
      }, 5e3);
      spinner.style.transform = `rotate(${currentAngle}deg)`;
    });
  };
  setup();
  var addSegments = (angle2, coord) => {
    for (let segNum = 0; segNum < numOfSegments; segNum += 1) {
      const segment = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      path.setAttribute("d", `M 50,50 L 50,5 A45,45 1 0,1 ${coord.x},${coord.y} z`);
      text.style.transform = `rotate(${-90}deg)`;
      text.setAttribute("x", "48");
      text.setAttribute("y", "25");
      text.textContent = options[segNum].title;
      text.setAttribute("id", "segment-text");
      segment.appendChild(path);
      segment.appendChild(text);
      segment.setAttribute("id", "segment");
      segment.setAttribute("viewBox", "0 0 100 100");
      segment.style.transform = `rotate(${90 + angle2 * segNum}deg)`;
      segment.style.fill = options[segNum].color;
      spinner.appendChild(segment);
    }
  };
  var angle = calculateAngle(numOfSegments);
  var endCoord = calculateEndCoords(angle);
  addSegments(angle, endCoord);
})();
