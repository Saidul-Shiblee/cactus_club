export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        maxWidth: "1440px",
      },
      fontFamily: {
        luckiest: ["Luckiest Guy, cursive"],
        poppins: ["Poppins, sans-serif"],
        rubik: ["Rubik One-Regular, Helvetica"],
        IBM: ["IBM Plex Sans, sans-serif"],
      },
      textShadow: {
        custom: "2px 2px 0 rgba(0,0,0,0.5)",
      },
    },
    backgroundImage: {
      "hero-lg": "url('./assets/image/Rectangle281.svg')",
      "hero-sm": "url('./assets/image/hero_bg_mobile.png')",
      "deposite-lg": "url('./assets/image/deposite_desktop.png')",
      "deposite-sm": "url('./assets/image/deposite_mobile.png')",
      "withdraw-lg": "url('./assets/image/withdraw_large.png')",
      "withdraw-sm": "url('./assets/image/withdraw_small.png')",
      "history-lg": "url('./assets/image/history_large.png')",
      "history-sm": "url('./assets/image/history_small.png')",
      "keno-bg": "url('./assets/image/Rectangle282.png')",
      "login": "url('./assets/image/login_bg.png')",
      "login-mobile": "url('./assets/image/login_mobile.png')",
      "signup": "url('./assets/image/signup_bg.png')",
      "signup-mobile": "url('./assets/image/mobile_signup.png')",
      "keno-bg-lg": "url('./assets/image/kenobg.png')",
      "keno-coin-pot-lg": "url('./assets/image/Frame.png')",
      "gradient-bg": "linear-gradient(94deg, #45CAA0 13.79%, #10BB85 92.08%)",
    
    
    
    
    },
    colors: ({ colors }) => ({
      ...colors,
      "primary-white": "#FFFFFF",
      "link": "#13BC87",
      "primary-title": "#5E3D1C",
      "orange-primary": "#F5AA52",
      "secondary-title": "#2D471A",
      "orange-secondary": "#E09F75",
      "green-secondary": "#284E19",
      "submit-button": "#E7E8E9",
      "s-button-text": "#9FA3A9",
      "link2": "#18BD89",
      "under_line": "#178BBD",
      "primary-hover": "#F5AA52",
      "deposite-hover": "rgba(94, 61, 28, 0.10)",
      "input-link": "#178BBD",
      "danger": "#C21C00",
      "primary-game": "#FA9842",
      "primary-dark-gray": "#955B38",
      "dark-green": "#169C9C",
      "gray-primary": "#0E0E0E80",
      "green-hover": "#139C9C"
    }),
    
  },
  plugins: [],
};
