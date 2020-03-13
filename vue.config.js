module.exports = {
  devServer: {
    open: true,
    overlay: {
      warnings: false, // 关闭桌面代码审查爆出的warning和error
      errors: false
    },
    proxy: {
      '/Service': {
        target: 'https://m.mtime.cn/', // 你请求的第三方接口
        changeOrigin: true
      },
      '/discovery': {
        target: 'https://ticket-api-m.mtime.cn',
        changeOrigin: true
      },
      '/position': {
        target: 'https://ticket-m.mtime.cn',
        changeOrigin: true,
        pathRewrite: {
          // 路径重写，
          '^/position': '' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
        }
      },
      // '/api': {
      //   target: 'https://m.mtime.cn/', // 你请求的第三方接口
      //   changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      //   pathRewrite: { // 路径重写，
      //     '^/api': '' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
      //   }
      // },
      '/ajax': {
        target: 'https://content-api-m.mtime.cn/', // 你请求的第三方接口
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          // 路径重写，
          '^/ajax': '' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
        }
      }
    }
  },
  lintOnSave: false // 关闭eslint  代码风格审查
}
