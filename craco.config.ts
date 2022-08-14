import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'

export default {
  webpack: {
    plugins: {
      add: [
        new NodePolyfillPlugin({
          excludeAliases: ['console'],
        }),
        new WindiCSSWebpackPlugin({
          virtualModulePath: 'src',
        }),
      ],
    },
    configure: {
      resolve: {
        fallback: {
          fs: false,
        },
      },
    },
  },
}
