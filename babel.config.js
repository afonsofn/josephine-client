module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      // Required for expo-router
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/components': './components',
            '@/utils': './utils',
            '@/api': './api',
            '@/socket': './socket',
            '@/types': './types',
            '@/store': './store',
            '@/': ['./'],
          },
        },
      ],
    ],
  }
}
