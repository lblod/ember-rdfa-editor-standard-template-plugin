'use strict';

module.exports = {
  isDevelopingAddon() {
    return this.app.env === 'development';
  },
  name: require('./package').name,
};
