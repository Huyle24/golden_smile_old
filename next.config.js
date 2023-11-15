
const webpack = require('webpack');

// module.exports = {
//     reactStrictMode: true,
//     trailingSlash: true,
// };

module.exports = {
    images: {
        loader: "imgix",
        path: "https://noop/",
    },
    webpack: (config, { dev }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'window.jQuery': 'jquery'
            })
        );
        return config
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};



// module.exports = {
//     exportPathMap: async function (
//       defaultPathMap,
//       { dev, dir, outDir, distDir, buildId },
//     ) {
//       return {
//         '/': { page: '/' },
//         '/about': { page: '/about' },
//         '/new': { page: '/new' },
//         '/contact': { page: '/contact' },
//         '/info': { page: '/info' },
//         '/Auth/register': { page: '/Auth/register' },
//         '/Auth/login': { page: '/Auth/login' },
//         '/cart': { page: '/cart' },
//         '/cart/order_summary': { page: '/cart/order_summary' },
//         ' /cart/payment_method': { page: ' /cart/payment_method' },
//         '/new': { page: '/new' },
//         '/golf': { page: '/golf' , query: { title: '[permalink]' }},
//         '/golf_package': { page: '/golf_package' , query: { title: '[permalink]' }},
//         '/tour': { page: '/tour' , query: { title: '[permalink]' }},
//         '/car': { page: '/car' , query: { title: '[permalink]' }},
//         '/new': { page: '/new' , query: { title: '[permalink]' }},
//         '/stay': { page: '/stay',query: { title: '[permalink]' }},
//         '/stay/list': { page: '/stay/list' },
//         '/move': { page: '/move' },
//         '/move/payment': { page: '/move/payment' },
//         '/move/list': { page: '/move/list' },
//         '/search': { page: '/search' },
//       };
//     },
//   };