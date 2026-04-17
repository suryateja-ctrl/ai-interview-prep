import { j as jsxRuntimeExports, y as cn } from "./index-D5GFhSas.js";
function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  size = "md",
  variant = "accent",
  className
}) {
  const percentage = Math.min(100, Math.max(0, value / max * 100));
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const colors = {
    default: "bg-primary",
    accent: "bg-accent",
    success: "bg-emerald-500",
    warning: "bg-amber-500"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full", className), children: [
    (label || showValue) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
      showValue && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground", children: [
        Math.round(percentage),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "w-full rounded-full bg-muted overflow-hidden",
          heights[size]
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              colors[variant]
            ),
            style: { width: `${percentage}%` },
            "aria-valuenow": value,
            "aria-valuemin": 0,
            "aria-valuemax": max
          }
        )
      }
    )
  ] });
}
export {
  ProgressBar as P
};
