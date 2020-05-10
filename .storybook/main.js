const merge = require('webpack-merge')

module.exports = {
  stories: [
    '../src/**/*.stories.ts',
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
  ],
  webpackFinal: config => merge(config, {
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  }),
}
