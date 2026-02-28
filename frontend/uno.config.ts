import {
  defineConfig,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { presetTheme } from "./uno/theme/preset";

export default defineConfig({
  presets: [
    presetTheme({
      themes: {
        light: {
          colors: {
            background: "#F3F4F6", // Fundo principal
            "background-contrast": "#111827", // Texto sobre fundo
            foreground: "#4F46E5", // Verde principal para identidade
            "foreground-contrast": "#FFFFFF", // Texto sobre foreground

            // Cores principais
            primary: "#4F46E5", // Destaques principais (botões, links)
            "primary-contrast": "#FFFFFF", // Texto sobre primário
            secondary: "#E5E7EB", // Destaques secundários
            "secondary-contrast": "#111827", // Texto sobre secundário
            accent: "#6366F1", // Cor de acento chamativa
            "accent-contrast": "#FFFFFF", // Texto sobre acentos
            surface: "#FFFFFF", // Fundo de cartões, modais, etc.
            "surface-2": "#F9FAFB", // Fundo secundário

            // Cores de contexto
            danger: "#EF4444", // Erros, ações destrutivas
            "danger-contrast": "#FFFFFF", // Texto sobre perigo
            warning: "#F59E0B", // Avisos
            "warning-contrast": "#111827", // Texto sobre aviso
            info: "#3B82F6", // Informações neutras
            "info-contrast": "#FFFFFF", // Texto sobre informação
            success: "#22C55E", // Sucesso, confirmações
            "success-contrast": "#FFFFFF", // Texto sobre sucesso
          },
        },
        dark: {
          colors: {
            background: "#0F172A", // Fundo principal escuro (slate-900)
            "background-contrast": "#F3F4F6", // Texto principal claro

            foreground: "#6366F1", // Roxo principal levemente mais vivo no dark
            "foreground-contrast": "#FFFFFF",

            // Cores principais
            primary: "#6366F1", // Mantém identidade, mais vibrante no dark
            "primary-contrast": "#FFFFFF",

            secondary: "#1F2937", // Cinza escuro para elementos secundários
            "secondary-contrast": "#F3F4F6",

            accent: "#818CF8", // Acento mais claro para destacar no fundo escuro
            "accent-contrast": "#0F172A",

            surface: "#111827", // Cards, modais
            "surface-2": "#1E293B", // Fundo secundário levemente elevado

            // Cores de contexto
            danger: "#F87171", // Vermelho mais suave para dark
            "danger-contrast": "#111827",

            warning: "#FBBF24",
            "warning-contrast": "#111827",

            info: "#60A5FA",
            "info-contrast": "#111827",

            success: "#4ADE80",
            "success-contrast": "#111827",
          },
        },
      },
    }),
    presetWind3({}),
    presetWebFonts({
      provider: "google",
      fonts: {
        display: ["Nunito", "Noto Color Emoji"],
        serif: ["Nunito:400,600,800", "Noto Color Emoji"],
        sans: ["Nunito:400,600,800", "Noto Color Emoji"],
        mono: ["Inter:400,600", "Noto Color Emoji"],
      },
    }),
    presetTypography({
      cssExtend: {
        "h1,h2,h3,h4": {
          "font-family": "Nunito display",
        },
        h1: {
          "font-weight": "800",
        },
        p: {
          "font-family": "Nunito",
        },
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: [
    ["title-display", "font-display font-bold text-9"],
    ["title-display-2", "font-display font-normal text-7"],
    ["body", "font-sans font-normal text-4"],
  ],
  safelist: ["theme-light", "body"],
});
