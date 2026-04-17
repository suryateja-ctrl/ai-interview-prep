import { o, c as clsx, r as reactExports, u as useInternetIdentity, a as useNavigate, b as useGetProfile, d as useGetProgressReport, e as useGetUserMockSessions, f as useGetSkillGapAnalysis, j as jsxRuntimeExports, Z as Zap, B as Button, A as ArrowRight, P as PageLoader, T as Target, M as Mic, g as BookOpen, F as FileText, h as MessageSquare, L as Link } from "./index-D5GFhSas.js";
import { P as PageHeader, B as Badge } from "./PageHeader-D_Twfh17.js";
import { P as ProgressBar } from "./ProgressBar-CWJg1SdH.js";
import { S as Shape, f as filterProps, a as adaptEventsOfChild, A as Animate, i as interpolateNumber, L as Layer, b as isEqual, c as LabelList, m as mathSign, d as isFunction, G as Global, e as findPositionOfBar, g as getBaseValueOfBar, h as findAllByType, C as Cell, t as truncateByDomain, j as getValueByDataKey, k as getCateCoordinateOfBar, l as getTooltipItem, p as polarToCartesian, n as generateCategoricalChart, P as PolarAngleAxis, o as PolarRadiusAxis, q as formatAxisMap, T as TrendingUp, R as ResponsiveContainer, r as LineChart, X as XAxis, Y as YAxis, s as Tooltip, u as Line } from "./LineChart-2R3pu9BF.js";
function _typeof$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$1(o2);
}
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r && (o2 = o2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o2);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function parseCornerRadius(cornerRadius) {
  if (typeof cornerRadius === "string") {
    return parseInt(cornerRadius, 10);
  }
  return cornerRadius;
}
function typeGuardSectorProps(option, props) {
  var cxValue = "".concat(props.cx || option.cx);
  var cx = Number(cxValue);
  var cyValue = "".concat(props.cy || option.cy);
  var cy = Number(cyValue);
  return _objectSpread$1(_objectSpread$1(_objectSpread$1({}, props), option), {}, {
    cx,
    cy
  });
}
function RadialBarSector(props) {
  return /* @__PURE__ */ o.createElement(Shape, _extends$1({
    shapeType: "sector",
    propTransformer: typeGuardSectorProps
  }, props));
}
var _excluded = ["shape", "activeShape", "activeIndex", "cornerRadius"], _excluded2 = ["value", "background"];
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r && (o2 = o2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o2);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o2, e) {
  return o2 = _getPrototypeOf(o2), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o2, e || [], _getPrototypeOf(t).constructor) : o2.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o2, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf(o2, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var RadialBar = /* @__PURE__ */ function(_PureComponent) {
  function RadialBar2() {
    var _this;
    _classCallCheck(this, RadialBar2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, RadialBar2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: false
    });
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(RadialBar2, _PureComponent);
  return _createClass(RadialBar2, [{
    key: "getDeltaAngle",
    value: function getDeltaAngle() {
      var _this$props = this.props, startAngle = _this$props.startAngle, endAngle = _this$props.endAngle;
      var sign = mathSign(endAngle - startAngle);
      var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
      return sign * deltaAngle;
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;
      var _this$props2 = this.props, shape = _this$props2.shape, activeShape = _this$props2.activeShape, activeIndex = _this$props2.activeIndex, cornerRadius = _this$props2.cornerRadius, others = _objectWithoutProperties(_this$props2, _excluded);
      var baseProps = filterProps(others, false);
      return sectors.map(function(entry, i) {
        var isActive = i === activeIndex;
        var props = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, baseProps), {}, {
          cornerRadius: parseCornerRadius(cornerRadius)
        }, entry), adaptEventsOfChild(_this2.props, entry, i)), {}, {
          className: "recharts-radial-bar-sector ".concat(entry.className),
          forceCornerRadius: others.forceCornerRadius,
          cornerIsExternal: others.cornerIsExternal,
          isActive,
          option: isActive ? activeShape : shape
        });
        return /* @__PURE__ */ o.createElement(RadialBarSector, _extends({}, props, {
          key: "sector-".concat(i)
        }));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;
      var _this$props3 = this.props, data = _this$props3.data, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var prevData = this.state.prevData;
      return /* @__PURE__ */ o.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radialBar-".concat(animationId),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(_ref) {
        var t = _ref.t;
        var stepData = data.map(function(entry, index) {
          var prev = prevData && prevData[index];
          if (prev) {
            var interpolatorStartAngle = interpolateNumber(prev.startAngle, entry.startAngle);
            var interpolatorEndAngle = interpolateNumber(prev.endAngle, entry.endAngle);
            return _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: interpolatorStartAngle(t),
              endAngle: interpolatorEndAngle(t)
            });
          }
          var endAngle = entry.endAngle, startAngle = entry.startAngle;
          var interpolator = interpolateNumber(startAngle, endAngle);
          return _objectSpread(_objectSpread({}, entry), {}, {
            endAngle: interpolator(t)
          });
        });
        return /* @__PURE__ */ o.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props4 = this.props, data = _this$props4.data, isAnimationActive = _this$props4.isAnimationActive;
      var prevData = this.state.prevData;
      if (isAnimationActive && data && data.length && (!prevData || !isEqual(prevData, data))) {
        return this.renderSectorsWithAnimation();
      }
      return this.renderSectorsStatically(data);
    }
  }, {
    key: "renderBackground",
    value: function renderBackground(sectors) {
      var _this4 = this;
      var cornerRadius = this.props.cornerRadius;
      var backgroundProps = filterProps(this.props.background, false);
      return sectors.map(function(entry, i) {
        entry.value;
        var background = entry.background, rest = _objectWithoutProperties(entry, _excluded2);
        if (!background) {
          return null;
        }
        var props = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
          cornerRadius: parseCornerRadius(cornerRadius)
        }, rest), {}, {
          fill: "#eee"
        }, background), backgroundProps), adaptEventsOfChild(_this4.props, entry, i)), {}, {
          index: i,
          className: clsx("recharts-radial-bar-background-sector", backgroundProps === null || backgroundProps === void 0 ? void 0 : backgroundProps.className),
          option: background,
          isActive: false
        });
        return /* @__PURE__ */ o.createElement(RadialBarSector, _extends({}, props, {
          key: "sector-".concat(i)
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, hide = _this$props5.hide, data = _this$props5.data, className = _this$props5.className, background = _this$props5.background, isAnimationActive = _this$props5.isAnimationActive;
      if (hide || !data || !data.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = clsx("recharts-area", className);
      return /* @__PURE__ */ o.createElement(Layer, {
        className: layerClass
      }, background && /* @__PURE__ */ o.createElement(Layer, {
        className: "recharts-radial-bar-background"
      }, this.renderBackground(data)), /* @__PURE__ */ o.createElement(Layer, {
        className: "recharts-radial-bar-sectors"
      }, this.renderSectors()), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(_objectSpread({}, this.props), data));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curData: nextProps.data,
          prevData: prevState.curData
        };
      }
      if (nextProps.data !== prevState.curData) {
        return {
          curData: nextProps.data
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty(RadialBar, "displayName", "RadialBar");
_defineProperty(RadialBar, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  minPointSize: 0,
  hide: false,
  legendType: "rect",
  data: [],
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  forceCornerRadius: false,
  cornerIsExternal: false
});
_defineProperty(RadialBar, "getComposedData", function(_ref2) {
  var item = _ref2.item, props = _ref2.props, radiusAxis = _ref2.radiusAxis, radiusAxisTicks = _ref2.radiusAxisTicks, angleAxis = _ref2.angleAxis, angleAxisTicks = _ref2.angleAxisTicks, displayedData = _ref2.displayedData, dataKey = _ref2.dataKey, stackedData = _ref2.stackedData, barPosition = _ref2.barPosition, bandSize = _ref2.bandSize, dataStartIndex = _ref2.dataStartIndex;
  var pos = findPositionOfBar(barPosition, item);
  if (!pos) {
    return null;
  }
  var cx = angleAxis.cx, cy = angleAxis.cy;
  var layout = props.layout;
  var _item$props = item.props, children = _item$props.children, minPointSize = _item$props.minPointSize;
  var numericAxis = layout === "radial" ? angleAxis : radiusAxis;
  var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
  var baseValue = getBaseValueOfBar({
    numericAxis
  });
  var cells = findAllByType(children, Cell);
  var sectors = displayedData.map(function(entry, index) {
    var value, innerRadius, outerRadius, startAngle, endAngle, backgroundSector;
    if (stackedData) {
      value = truncateByDomain(stackedData[dataStartIndex + index], stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      }
    }
    if (layout === "radial") {
      innerRadius = getCateCoordinateOfBar({
        axis: radiusAxis,
        ticks: radiusAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      endAngle = angleAxis.scale(value[1]);
      startAngle = angleAxis.scale(value[0]);
      outerRadius = innerRadius + pos.size;
      var deltaAngle = endAngle - startAngle;
      if (Math.abs(minPointSize) > 0 && Math.abs(deltaAngle) < Math.abs(minPointSize)) {
        var delta = mathSign(deltaAngle || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaAngle));
        endAngle += delta;
      }
      backgroundSector = {
        background: {
          cx,
          cy,
          innerRadius,
          outerRadius,
          startAngle: props.startAngle,
          endAngle: props.endAngle
        }
      };
    } else {
      innerRadius = radiusAxis.scale(value[0]);
      outerRadius = radiusAxis.scale(value[1]);
      startAngle = getCateCoordinateOfBar({
        axis: angleAxis,
        ticks: angleAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      endAngle = startAngle + pos.size;
      var deltaRadius = outerRadius - innerRadius;
      if (Math.abs(minPointSize) > 0 && Math.abs(deltaRadius) < Math.abs(minPointSize)) {
        var _delta = mathSign(deltaRadius || minPointSize) * (Math.abs(minPointSize) - Math.abs(deltaRadius));
        outerRadius += _delta;
      }
    }
    return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, entry), backgroundSector), {}, {
      payload: entry,
      value: stackedData ? value : value[1],
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    }, cells && cells[index] && cells[index].props), {}, {
      tooltipPayload: [getTooltipItem(item, entry)],
      tooltipPosition: polarToCartesian(cx, cy, (innerRadius + outerRadius) / 2, (startAngle + endAngle) / 2)
    });
  });
  return {
    data: sectors,
    layout
  };
});
var RadialBarChart = generateCategoricalChart({
  chartName: "RadialBarChart",
  GraphicalChild: RadialBar,
  legendContent: "children",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap,
  defaultProps: {
    layout: "radial",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
const QUICK_ACTIONS = [
  {
    to: "/resume",
    icon: FileText,
    label: "Build Resume",
    description: "Generate ATS-optimized resume",
    color: "text-chart-1",
    bg: "bg-chart-1/10 border-chart-1/20",
    hoverBg: "group-hover:bg-chart-1/20"
  },
  {
    to: "/interview",
    icon: MessageSquare,
    label: "Practice Q&A",
    description: "Role-specific questions",
    color: "text-chart-2",
    bg: "bg-chart-2/10 border-chart-2/20",
    hoverBg: "group-hover:bg-chart-2/20"
  },
  {
    to: "/mock-interview",
    icon: Mic,
    label: "Mock Interview",
    description: "Simulate real session",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20",
    hoverBg: "group-hover:bg-accent/20"
  },
  {
    to: "/study",
    icon: BookOpen,
    label: "Study Topics",
    description: "Curated learning paths",
    color: "text-chart-3",
    bg: "bg-chart-3/10 border-chart-3/20",
    hoverBg: "group-hover:bg-chart-3/20"
  }
];
const PRIORITY_LABELS = {
  "1": "Critical",
  "2": "High",
  "3": "Medium"
};
const PRIORITY_VARIANTS = {
  "1": "destructive",
  "2": "warning",
  "3": "secondary"
};
function ReadinessGauge({ score }) {
  const data = [{ name: "score", value: score, fill: "var(--color-accent)" }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 180, height: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadialBarChart,
      {
        cx: "50%",
        cy: "100%",
        innerRadius: 70,
        outerRadius: 95,
        startAngle: 180,
        endAngle: 0,
        data,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          RadialBar,
          {
            dataKey: "value",
            cornerRadius: 8,
            background: { fill: "oklch(var(--muted))" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: "oklch(var(--accent))" })
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 flex flex-col items-center gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold font-display text-foreground leading-none", children: score }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/ 100" })
    ] })
  ] });
}
function ScoreTrendChart({
  trends
}) {
  if (trends.length < 2) return null;
  const data = trends.slice(-8).map((t, i) => ({
    name: `S${i + 1}`,
    score: Number(t.score)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 80, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    LineChart,
    {
      data,
      margin: { top: 4, right: 4, left: -24, bottom: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "name",
            tick: { fontSize: 10, fill: "oklch(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            domain: [0, 100],
            tick: { fontSize: 10, fill: "oklch(var(--muted-foreground))" },
            axisLine: false,
            tickLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Tooltip,
          {
            contentStyle: {
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              borderRadius: "6px",
              fontSize: 12,
              color: "oklch(var(--foreground))"
            },
            cursor: { stroke: "oklch(var(--border))" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Line,
          {
            type: "monotone",
            dataKey: "score",
            stroke: "oklch(var(--accent))",
            strokeWidth: 2,
            dot: { r: 3, fill: "oklch(var(--accent))", strokeWidth: 0 },
            activeDot: { r: 5 }
          }
        )
      ]
    }
  ) });
}
function DashboardPage() {
  const { isAuthenticated, login } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: progress, isLoading: progressLoading } = useGetProgressReport();
  const { data: sessions } = useGetUserMockSessions();
  const { data: skillGap, isLoading: skillGapLoading } = useGetSkillGapAnalysis();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 flex items-center justify-center min-h-[60vh] flex-col gap-4",
        "data-ocid": "dashboard.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 24, className: "text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-lg", children: "Your Interview Command Center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs text-center", children: "Sign in to track your readiness, practice interviews, and close skill gaps." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "accent",
              onClick: login,
              "data-ocid": "dashboard.login_button",
              className: "mt-2",
              children: [
                "Sign In with Internet Identity",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
              ]
            }
          )
        ]
      }
    );
  }
  if (profileLoading || progressLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {});
  const readinessScore = progress ? Number(progress.readinessScore) : 0;
  const completedSessions = progress ? Number(progress.mockSessionsCompleted) : 0;
  const avgScore = progress ? Number(progress.averageScore) : 0;
  const topicsCompleted = progress ? Number(progress.topicsCompleted) : 0;
  const topicsTotal = progress ? Number(progress.topicsTotal) : 0;
  const skillsAcquired = (progress == null ? void 0 : progress.skillsAcquired) ?? [];
  const scoreTrends = (progress == null ? void 0 : progress.scoreTrends) ?? [];
  const weakSkills = (skillGap == null ? void 0 : skillGap.weakSkills) ?? [];
  const studyPlan = (skillGap == null ? void 0 : skillGap.studyPlan) ?? [];
  const greeting = (profile == null ? void 0 : profile.name) ? `Welcome back, ${profile.name}` : "Welcome to AIPS";
  const subtext = (profile == null ? void 0 : profile.targetJobTitle) ? `Preparing for: ${profile.targetJobTitle} · ${profile.role}` : "Let's start preparing for your next interview.";
  const readinessLabel = readinessScore >= 80 ? "Interview Ready" : readinessScore >= 60 ? "Good Progress" : readinessScore >= 30 ? "Building Skills" : "Just Starting";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: greeting,
        subtitle: subtext,
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "accent",
            size: "sm",
            onClick: () => navigate({ to: "/mock-interview" }),
            "data-ocid": "dashboard.start_mock_button",
            children: [
              "Start Mock Interview",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-6 space-y-6 overflow-y-auto", children: [
      profile && !profile.onboardingComplete && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "card-data p-4 border-accent/30 bg-accent/5 flex items-start gap-4",
          "data-ocid": "dashboard.onboarding_prompt",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-md bg-accent/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 16, className: "text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-0.5", children: "Complete your profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro", children: "Set your target role to unlock personalized recommendations." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "accent",
                size: "sm",
                onClick: () => navigate({ to: "/profile" }),
                "data-ocid": "dashboard.complete_profile_button",
                children: "Complete"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-data p-5 flex flex-col items-center justify-center gap-3",
            "data-ocid": "dashboard.stat.readiness",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Readiness Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ReadinessGauge, { score: readinessScore }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: readinessScore >= 80 ? "success" : readinessScore >= 60 ? "default" : "warning",
                  children: readinessLabel
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-data p-5 flex flex-col gap-2",
            "data-ocid": "dashboard.stat.trend",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "stat-label", children: "Score Trend" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14, className: "text-muted-foreground" })
              ] }),
              scoreTrends.length >= 2 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreTrendChart, { trends: scoreTrends }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro text-center", children: "Complete more sessions to see your trend" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-rows-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-data p-4 flex items-center gap-3",
              "data-ocid": "dashboard.stat.sessions",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 14, className: "text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-display text-foreground leading-none", children: completedSessions }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro mt-0.5", children: "Mock sessions done" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-data p-4 flex items-center gap-3",
              "data-ocid": "dashboard.stat.score",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-chart-2/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 14, className: "text-chart-2" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-display text-foreground leading-none", children: avgScore > 0 ? avgScore : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro mt-0.5", children: "Average score" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-data p-4 flex items-center gap-3",
              "data-ocid": "dashboard.stat.topics",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-chart-3/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 14, className: "text-chart-3" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold font-display text-foreground leading-none", children: [
                    topicsCompleted,
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground", children: [
                      "/",
                      topicsTotal || "—"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro mt-0.5", children: "Topics completed" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.quick_actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "Quick Actions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: QUICK_ACTIONS.map(
          ({ to, icon: Icon, label, description, color, bg, hoverBg }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              className: "card-data p-4 flex flex-col gap-2 hover:border-accent/40 group cursor-pointer",
              "data-ocid": `dashboard.quick_action.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-9 h-9 rounded-md border flex items-center justify-center transition-smooth ${bg} ${hoverBg}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: color })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro", children: description })
              ]
            },
            to
          )
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.skill_gap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Skill Gap Analysis" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/analytics",
                className: "text-xs text-accent hover:underline",
                "data-ocid": "dashboard.view_full_analysis_link",
                children: "Full report"
              }
            )
          ] }),
          skillGapLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "card-data p-5 space-y-3",
              "data-ocid": "dashboard.skill_gap.loading_state",
              children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "animate-pulse flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 bg-muted rounded w-24" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 bg-muted rounded" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 bg-muted rounded w-14" })
                  ]
                },
                n
              ))
            }
          ) : weakSkills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-data p-6 flex flex-col items-center text-center",
              "data-ocid": "dashboard.skill_gap.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { size: 16, className: "text-chart-3" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No gaps detected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro", children: "Complete mock interviews to unlock skill analysis." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-data divide-y divide-border overflow-hidden", children: weakSkills.slice(0, 5).map((skill, i) => {
            const current = Number(skill.currentLevel);
            const target = Number(skill.targetLevel);
            const pct = target > 0 ? Math.round(current / target * 100) : 0;
            const priorityStr = skill.priority.toString();
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "p-3 flex items-center gap-3",
                "data-ocid": `dashboard.skill_gap.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: skill.skill }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: PRIORITY_VARIANTS[priorityStr] ?? "secondary",
                        className: "flex-shrink-0",
                        children: PRIORITY_LABELS[priorityStr] ?? "Low"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ProgressBar,
                    {
                      value: current,
                      max: target,
                      size: "sm",
                      variant: pct < 40 ? "warning" : "accent"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-micro mt-1", children: [
                    "Level ",
                    current,
                    " / ",
                    target
                  ] })
                ] })
              },
              `${skill.skill}-${i}`
            );
          }) }),
          skillsAcquired.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
            skillsAcquired.slice(0, 6).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-accent", children: skill }, skill)),
            skillsAcquired.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-accent", children: [
              "+",
              skillsAcquired.length - 6,
              " more"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.recent_sessions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Recent Sessions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/mock-interview",
                className: "text-xs text-accent hover:underline",
                "data-ocid": "dashboard.view_all_sessions_link",
                children: "View all"
              }
            )
          ] }),
          !sessions || sessions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-data p-6 flex flex-col items-center text-center",
              "data-ocid": "dashboard.sessions.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 16, className: "text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No sessions yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-micro mb-4", children: "Start your first mock interview to track your progress." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "accent",
                    size: "sm",
                    onClick: () => navigate({ to: "/mock-interview" }),
                    "data-ocid": "dashboard.sessions.start_button",
                    children: "Start a Session"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-data divide-y divide-border overflow-hidden", children: sessions.slice(0, 5).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-3 flex items-center justify-between gap-4",
              "data-ocid": `dashboard.sessions.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-md bg-muted flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { size: 14, className: "text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                      s.role,
                      " Interview"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-micro", children: [
                      s.difficulty,
                      " difficulty"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-shrink-0", children: s.isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "success", children: [
                  Number(s.totalScore),
                  " pts"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "In Progress" }) })
              ]
            },
            s.id.toString()
          )) })
        ] })
      ] }),
      studyPlan.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.study_plan", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "Personalized Study Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: studyPlan.slice(0, 3).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-data p-4",
            "data-ocid": `dashboard.study_plan.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: item.skill }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-primary flex-shrink-0", children: [
                  "#",
                  Number(item.priority)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-micro", children: [
                "Est. ",
                Number(item.estimatedHours),
                "h to complete"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/study",
                  className: "mt-3 flex items-center gap-1 text-xs text-accent hover:underline",
                  "data-ocid": `dashboard.study_plan.go.${i + 1}`,
                  children: [
                    "Start studying ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11 })
                  ]
                }
              )
            ]
          },
          `${item.skill}-${i}`
        )) })
      ] })
    ] })
  ] });
}
export {
  DashboardPage
};
