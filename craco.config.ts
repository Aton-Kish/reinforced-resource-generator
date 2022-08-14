import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'

export default {
  webpack: {
    plugins: {
      add: [
        new WindiCSSWebpackPlugin({
          virtualModulePath: 'src',
        }),
      ],
    },
  },
}
