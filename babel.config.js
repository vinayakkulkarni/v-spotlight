module.exports = {
  presets: [
    [
      'env',
      {
        modules: false,
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  comments: false,
  env: {
    test: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@': './src',
              '~': './src',
            },
          },
        ],
      ],
      ignore: ['ava.config.js'],
      presets: [
        [
          'env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
};
