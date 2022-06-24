const { defineConfig } = require("@vue/cli-service");
const resolve = require("path").resolve;
const cdn = {
  js: ["https://lib.baomitu.com/vue/2.6.10/vue.min.js"],
};
module.exports = defineConfig({
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Index Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    login: {
      // page 的入口
      entry: "src/main.login.js",
      // 模板来源
      template: "public/login.html",
      // 在 dist/index.html 的输出
      filename: "login.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "login Page",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["login"],
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "~": resolve(__dirname, "src"),
        src: resolve(__dirname, "src"),
      },
      extensions: [".js", ".vue", ".json", ".css", ".scss"],
    },
    externals: [{ vue: "Vue" }],
  },
  chainWebpack(config) {
    ["index", "login"].forEach((chunk) => {
      config.plugin("html-" + chunk).tap((args) => {
        args[0].cdn = cdn;
        return args;
      });
    });
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: "chunk-vendors",
          minChunks: 4,
          test: /node_modules/,
          priority: -10,
          chunks: "initial",
        },
        common: {},
      },
    });
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api/": {
        target: "http://127.0.0.1:8002",
        // changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    },
  },
});
