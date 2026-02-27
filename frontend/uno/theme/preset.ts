import { Preset } from "unocss";
import { ThemeOptions } from "./types";

function colorRef(color: string) {
  if (!color) return `var(--current-color)`;
  const keyType = color.charAt(0);
  const key = color.substring(1);
  if (keyType === "$") {
    return `var(--current-${key})`;
  } else if (keyType === "@") {
    return `var(--color-${key})`;
  }
  return color;
}
function contrastRef(color: string) {
  if (!color) return `var(--current-color-contrast)`;
  const keyType = color.charAt(0);
  const key = color.substring(1);
  if (keyType === "$") {
    return `var(--current-${key}-contrast)`;
  } else if (keyType === "@") {
    return `var(--color-${key}-contrast)`;
  }
  return color;
}

function relativePercent(value: string) {
  const [_, signal, text] = value.match(/^([\-\+]?)(.*)$/) ?? [];
  if (signal) return `${signal} ${Number(text) / 100}`;
  return String(Number(text) / 100);
}

function relativeValue(base: string, value: string) {
  if (/^[\-\+]/.test(value)) {
    return /^[\-\+]0+$/.test(value) ? base : `calc(${base} ${value})`;
  }
  return value;
}

function oldColorRef(base: string) {
  if (base.startsWith("--")) {
    base = `var(${base})`;
  } else if (base.startsWith("@current-")) {
    base = `var(--${base.substring(1)})`;
  } else if (base.startsWith("@")) {
    base = `var(--color-${base.substring(1)})`;
  }
  return base;
}

function defineColor(value: string, key?: string) {
  if (key)
    return {
      [`--current-${key}`]: value,
    };
  return {
    "--current-color": value,
  };
}

export function presetTheme({
  globals = {},
  themes = {},
}: ThemeOptions): Preset {
  return {
    name: "theme",
    preflights: [
      {
        getCSS() {
          let css = `:root{\n`;
          for (const [name, value] of Object.entries(globals.variables ?? {})) {
            css += `  --${name}:${value};\n`;
          }
          for (const [name, value] of Object.entries(globals.colors ?? {})) {
            css += `  --color-${name}: ${value};\n`;
          }
          css += "}\n";
          return css;
        },
      },
    ],
    rules: [
      [
        /^theme-vars-(.+)$/,
        ([_, themeName]) => {
          const { variables = {}, colors = {} } = themes[themeName] ?? {};
          const css: Record<string, string> = {};
          for (const [name, value] of Object.entries(variables)) {
            css[`--${name}`] = value;
          }
          for (const [name, value] of Object.entries(colors)) {
            css[`--color-${name}`] = value;
          }
          return css;
        },
      ],
      [
        /^bg--(.+)$/,
        ([_, colorName]) => ({ background: `var(--color-${colorName})` }),
      ],
      [
        /^bg--(.+)\/(\d{1,3})$/,
        ([_, colorName, opacity]) => ({
          background: `rgba(from var(--color-${colorName}) r g b / ${opacity}%)`,
        }),
      ],
      [
        /^fg--(.+)$/,
        ([_, colorName]) => ({ color: `var(--color-${colorName})` }),
      ],
      [
        /^fg--(.+)\/(\d{1,3})$/,
        ([_, colorName, opacity]) => ({
          color: `rgba(from var(--color-${colorName}) r g b / ${opacity}%)`,
        }),
      ],
      [
        /^color(?:\.(.+?))?--(.+)$/,
        ([_, key, colorName]) => {
          if (key)
            return {
              [`--current-${key}`]: `var(--color-${colorName})`,
              [`--current-${key}-contrast`]: `var(--color-${colorName}-contrast)`,
            };
          return {
            "--current-color": `var(--color-${colorName})`,
            "--current-color-contrast": `var(--color-${colorName}-contrast)`,
          };
        },
      ],
      [
        /^bg(?::(.+?))?(?:\/(\d{1,3}))?$/,
        ([_, color, alpha]) => {
          return {
            background: alpha
              ? `rgba(from ${colorRef(color)} r g b / ${alpha}%)`
              : colorRef(color),
          };
        },
      ],
      [
        /^bg-contrast(?::(.+?))?(?:\/(\d{1,3}))?$/,
        ([_, color, alpha]) => {
          return {
            background: alpha
              ? `rgba(from ${contrastRef(color)} r g b / ${alpha}%)`
              : contrastRef(color),
          };
        },
      ],
      [
        /^fg(?::(.+?))?(?:\/(\d{1,3}))?$/,
        ([_, color, alpha]) => {
          return {
            color: alpha
              ? `rgba(from ${colorRef(color)} r g b / ${alpha}%)`
              : colorRef(color),
          };
        },
      ],
      [
        /^fg-contrast(?::(.+?))?(?:\/(\d{1,3}))?$/,
        ([_, color, alpha]) => {
          return {
            color: alpha
              ? `rgba(from ${contrastRef(color)} r g b / ${alpha}%)`
              : contrastRef(color),
          };
        },
      ],
      [
        /^(?:\$(.+?):)?light\((.+?),([\-\+]?\d{1,3})\)$/,
        ([_, key, base, amount]) =>
          defineColor(
            `oklch(from ${colorRef(base)} ${relativeValue(
              "l",
              relativePercent(amount)
            )} c h)`,
            key
          ),
      ],
      [
        /^(?:\$(.+?):)?chroma\((.+?),([\-\+]?\d{1,3})\)$/,
        ([_, key, base, amount]) =>
          defineColor(
            `oklch(from ${colorRef(base)} l ${relativeValue(
              "c",
              relativePercent(amount)
            )} h)`,
            key
          ),
      ],
      [
        /^(?:\$(.+?):)?hue\((.+?),([\-\+]?\d{1,3})\)$/,
        ([_, key, base, amount]) =>
          defineColor(
            `oklch(from ${colorRef(base)} l c ${relativeValue(
              "h",
              relativePercent(amount)
            )})`,
            key
          ),
      ],
      [
        /^(?:\$(.+?):)?alpha\((.+?),(\d{1,3})\)$/,
        ([_, key, base, amount]) =>
          defineColor(`rgba(from ${colorRef(base)} r g b / ${amount}%)`, key),
      ],
      [
        /^(?:\$(.+?):)?mix\((?:(hsl|srgb|lab),)?(.+?),(.+?),(\d{1,3})\)$/,
        ([_, key, mode, from, to, amount]) =>
          defineColor(
            `color-mix(in ${mode || "srgb"}, ${colorRef(from)},${colorRef(
              to
            )} ${amount}%)`,
            key
          ),
      ],
      // [
      //   /^(?:\$(.+?):)?\[(.+?)\](?:\/(\d{1,3}))?$/,
      //   ([_, key, color, alpha]) => {
      //     return defineColor(
      //       alpha
      //         ? `rgba(from ${colorRef(color)} r g b / ${alpha}%)`
      //         : colorRef(color),
      //       key
      //     );
      //   },
      // ],
    ],
    shortcuts: [
      [
        /^theme-(?!vars)(.+)$/,
        ([_, themeName]) =>
          `theme-vars-${themeName} bg--background fg--foreground`,
      ],
    ],
  };
}
