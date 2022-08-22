import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'

export default {
  webpack: {
    plugins: {
      add: [
        new NodePolyfillPlugin({
          excludeAliases: ['console', 'path'],
        }),
        new WindiCSSWebpackPlugin({
          virtualModulePath: 'src',
        }),
      ],
    },
    configure: {
      resolve: {
        alias: {
          path: 'path-browserify',
        },
        fallback: {
          fs: false,
        },
      },
    },
  },
}
