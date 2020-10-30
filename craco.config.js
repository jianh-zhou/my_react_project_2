const path = require('path')
const pxtoviewport = require('postcss-px-to-viewport')
module.exports = {
  // webpack相关配置
  webpack: {
    alias: {
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@comp": path.resolve(__dirname, "./src/components"),
      "@assets":path.resolve(__dirname,'./src/assets')
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