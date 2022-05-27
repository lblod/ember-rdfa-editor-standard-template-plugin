'use strict';

module.exports = {
  isDevelopingAddon() {
    return process.env.EMBER_ENV === 'development';
  },
  name: require('./package').name,
};
