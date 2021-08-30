import Mixin from '@ember/object/mixin';
import { attr } from '@ember-data/model';

// eslint-disable-next-line ember/no-new-mixins
export default Mixin.create({
  title: attr(),
  matches: attr('string-set', {
    defaultValue() {
      return [];
    },
  }),
  body: attr(),
  contexts: attr('string-set', {
    defaultValue() {
      return [];
    },
  }),
  disabledInContexts: attr('string-set', {
    defaultValue() {
      return [];
    },
  }),
});
