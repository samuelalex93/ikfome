import type { Config } from "tailwindcss"

const config =  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amarelo: "#FFD700",
        laranja: "#FF8C00",
        vermelho: "#FF0000",
        rosaClaro: "#FFB6C1",
        rosaEscuro: "#C71585",
        roxo: "#800080",
        azul: "#1E90FF",
        verde: "#32CD32",
        branco: "#FFFFFF",
        preto: "#000000",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
