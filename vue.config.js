const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/", //根路径
  outputDir: process.env.outputDir, //打包的时候生成的一个文件名
  assetsDir: "assets", //静态资源目录(js,css,img,fonts)这些文件都可以写里面
  lintOnSave: process.env.NODE_ENV === "production", //是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  // webpack配置
  configureWebpack: () => {},
  // 配置解析别名
  chainWebpack: config => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@static", resolve("src/static"));
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: false, //配置自动启动浏览器
    host: "0.0.0.0",
    port: 8080, // 端口号
    https: false,
    hotOnly: false, // https:{type:Boolean}
    proxy: {
      "/api": {
        target: "http://localhost", // 接口域名
        // target: "http://sqfb.com",
        ws: false, // 是否启用websockets
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "" //需要rewrite的,
        }
      }
    } // 配置跨域处理,只有一个代理
    // before: app => {}
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require("os").cpus().length > 1,
  // 向 PWA 插件传递选项
  pwa: {},
  // 可以用来传递任何第三方插件选项
  pluginOptions: {}
};