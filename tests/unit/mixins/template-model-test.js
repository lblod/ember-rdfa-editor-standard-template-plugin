import EmberObject from '@ember/object';
import TemplateModelMixin from 'ember-rdfa-editor-standard-template-plugin/mixins/template-model';
import { module, test } from 'qunit';

module('Unit | Mixin | template model', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let TemplateModelObject = EmberObject.extend(TemplateModelMixin);
    let subject = TemplateModelObject.create();
    assert.ok(subject);
  });
});
