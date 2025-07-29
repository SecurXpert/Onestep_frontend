// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'primary': "#5f6fff",
        'custom-blue': '#014F86',
      },

       backgroundImage: {
        'b3d8e4-gradient': 'radial-gradient(circle at center, #EDF8FF 30%, #B3D8E4 100%)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite', // 20s duration, adjustable
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' }, // Start at original position
          '100%': { transform: 'translateX(-50%)' }, // Move left by half (for seamless loop)
        },
        
      },
    },
  },
  plugins: [],
}
