/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#7C3AED',
          primaryDark: '#1E0A3C',
          background: '#F5F3F0',
          ecoAccent: '#16A34A',
          ecoWallet: '#14532D',
          white: '#FFFFFF',
          textPrimary: '#1E0A3C',
          textSecondary: '#6B7280',
        }
      },
      fontFamily: {
        playfair: ['PlayfairDisplay_700Bold'],
        playfairExtra: ['PlayfairDisplay_800ExtraBold'],
        lato: ['Lato_400Regular'],
        latoBold: ['Lato_700Bold'],
      }
    },
  },
  plugins: [],
};
