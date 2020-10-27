const path = require('path')
const pxtoviewport = require('postcss-px-to-viewport')
module.exports = {
  // webpack相关配置
  webpack: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@redux": path.resolve(__dirname, "./src/redux")
    }
  },
  // style样式相关配置
  style: {
    postcss: {
      plugins: [
        pxtoviewport({
          viewportWidth: 375
        })
      ]
    }
  }
}