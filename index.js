'use strict';

module.exports = {
  name: '@lblod/ember-rdfa-editor-standard-template-plugin',

  included: function (app) {
    this._super.included(app);
    app.import('vendor/node-uuid-v4_v3.1.0.js');
    app.import('vendor/shims/uuid.js');
  }
};
