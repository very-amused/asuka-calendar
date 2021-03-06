/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
    static: {
      url: '/',
      static: true,
      resolve: false
    }
  },
  plugins: ['@snowpack/plugin-typescript']
}