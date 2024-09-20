module.exports = {
    // other configurations...
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        // other rules...
      ],
    },
  };