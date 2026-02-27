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
            background: "#12100E", // Fundo principal escuro
            "background-contrast": "#FFFFFF", // Texto sobre fundo escuro
            foreground: "#F0EAE4", // Texto principal em fundo escuro
            "foreground-contrast": "#000000", // Texto em áreas claras (ex: cards)

            // Cores principais
            primary: "#A88B73", // Versão clara do marrom original
            "primary-contrast": "#000000",
            secondary: "#E39B56", // Um laranja mais suave e visível no escuro
            "secondary-contrast": "#000000",
            accent: "#53CFF0", // Azul vibrante no escuro
            "accent-contrast": "#000000",
            surface: "#1C1A18", // Cartões, modais etc.

            // Cores de contexto
            danger: "#E15B64",
            "danger-contrast": "#000000",
            warning: "#FFD25C",
            "warning-contrast": "#000000",
            info: "#5AB1E8",
            "info-contrast": "#000000",
            success: "#55D88B",
            "success-contrast": "#000000",
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
