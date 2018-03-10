import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('editor-plugins/standard-template-card', 'Integration | Component | editor plugins/standard template card', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{editor-plugins/standard-template-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#editor-plugins/standard-template-card}}
      template block text
    {{/editor-plugins/standard-template-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
