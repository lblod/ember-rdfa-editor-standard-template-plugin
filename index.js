'use strict';

module.exports = {
  name: require('./package').name,
  included: function (app) {
    this._super.included.apply(this, app);
    app.import('vendor/node-uuid-v4_v3.1.0.js');
    app.import('vendor/shims/uuid.js');
  }
};
