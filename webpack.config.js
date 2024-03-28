/* eslint-disable @typescript-eslint/no-var-requires */

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'apps/mailer/templates',
          to: 'apps/mailer/templates',
        },
      ],
    }),
  ],
};
