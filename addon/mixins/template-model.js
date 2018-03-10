import Mixin from '@ember/object/mixin';
import attr from 'ember-data/attr';

export default Mixin.create({
  title: attr(),
  matches: attr('string-set', {
    defaultValue() { return []; }
  }),
  body: attr(),
  contexts: attr('string-set', {
    defaultValue() { return []; }
  }),
  disabledInContexts: attr('string-set', {
    defaultValue() { return []; }
  })
});
