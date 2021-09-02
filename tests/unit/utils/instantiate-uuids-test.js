import instantiateUuids from 'dummy/utils/instantiate-uuids';
import { module, test } from 'qunit';

module('Unit | Utility | instantiate-uuids', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    const templateString =
      'http://data.lblod.info/id/besluiten/${generateUuid()}"';
    let result = instantiateUuids(templateString);
    assert.ok(!result.includes('generateUuid'));
  });
});
