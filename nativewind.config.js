module.exports = {
  input: './global.css',
  theme: {
    extend: {
      // Platform-specific adjustments
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    },
  },
};