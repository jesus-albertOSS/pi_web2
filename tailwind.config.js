// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        spider: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(150px)' } },
        witch: { '0%': { transform: 'translateX(-150px)' }, '100%': { transform: 'translateX(110vw)' } },
        fog: { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '1000px 0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pumpkin: { '0%,100%': { transform: 'rotate(0deg) translateY(0)' }, '50%': { transform: 'rotate(10deg) translateY(-10px)' } },
        flicker: { '0%,18%,22%,25%,53%,57%,100%': { opacity: 1 }, '20%,24%,55%': { opacity: 0.3 } },
      },
      animation: {
        spider: 'spider 6s ease-in-out infinite',
        witch: 'witch 12s linear infinite',
        fog: 'fog 30s linear infinite',
        float: 'float 4s ease-in-out infinite',
        pumpkin: 'pumpkin 6s ease-in-out infinite',
        flicker: 'flicker 2s infinite',
      },
    },
  },
  plugins: [],
}
