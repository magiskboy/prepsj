const flowbiteReactPath = require('path').resolve(
  require.resolve('flowbite-react'),
  '../../../'
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    `${flowbiteReactPath}/lib/esm/**/*.js`,
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

