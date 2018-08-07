import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | rdfa editor standard template plugin', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:rdfa-editor-standard-template-plugin');
    assert.ok(service);
  });
});
