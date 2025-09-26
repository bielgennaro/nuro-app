const path = require('node:path')
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })

config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@features': path.resolve(__dirname, 'src/features'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@stores': path.resolve(__dirname, 'src/stores'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@assets': path.resolve(__dirname, 'assets'),
}
