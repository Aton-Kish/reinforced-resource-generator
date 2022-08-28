import path from 'path'

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'

import type { CracoConfig } from '@craco/craco'

const config: CracoConfig = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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

export default config
