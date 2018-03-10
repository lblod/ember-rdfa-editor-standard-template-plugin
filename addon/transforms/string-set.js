import { typeOf } from '@ember/utils';
import { assert } from '@ember/debug';
import Transform from 'ember-data/transform';

const StringSet = Transform.extend({
  deserialize(serialized) {
    assert(`expected array got ${typeOf(serialized)}`, (!serialized) || (typeOf(serialized) === "array"));
    return serialized || [];
  },
  serialize(deserialized) {
    assert(`expected array got ${typeOf(deserialized)}`, (!deserialized) || (typeOf(deserialized) === "array"));
    return deserialized || [];
  }});
export default StringSet;
