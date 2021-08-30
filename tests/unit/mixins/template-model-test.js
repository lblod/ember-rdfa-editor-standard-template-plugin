import EmberObject from '@ember/object';
// eslint-disable-next-line ember/no-mixins
import TemplateModelMixin from 'ember-rdfa-editor-standard-template-plugin/mixins/template-model';
import { module, test } from 'qunit';

module('Unit | Mixin | template model', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    // eslint-disable-next-line ember/no-new-mixins
    let TemplateModelObject = EmberObject.extend(TemplateModelMixin);
    let subject = TemplateModelObject.create();
    assert.ok(subject);
  });
});
