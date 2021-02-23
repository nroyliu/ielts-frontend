module.exports = {
    devServer: {
        overlay: { // 关闭eslient 规则校验
            warning: false,
            errors: false
        },
        // proxy: {}
        proxy: { // 如访问的接口地址是http://122.xxx.63.78:80/api/service
            '/api': {
                target: 'https://api.papaen.com/v1/', // 代理接口
                ws: false, // 是否启用websockets
                changeOrigin: true, // 开启代理
                secure: false, // 将安全设置为false,才能访问https开头的
                pathRewrite: {
                    '^/api': '/api' // //这里理解成用‘/api’代替target里面的地址
                }
            }
        }
    },
}