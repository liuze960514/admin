module.exports = {
    // 反向代理
    devServer: {
        open: false,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: {
            // 配置跨域
            '/api': {
                target: 'http://localhost:5200/api/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        before: app => {}
    }
};