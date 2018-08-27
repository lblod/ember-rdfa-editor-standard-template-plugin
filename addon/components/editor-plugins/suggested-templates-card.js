import Component from '@ember/component';
import layout from '../../templates/components/editor-plugins/suggested-templates-card';
import { reads } from '@ember/object/computed';
export default Component.extend({
  layout,
  templates: reads('info.templates'),
  editor: reads('info.editor'),
  actions: {
    insert(template) {
      this.editor.replaceTextWithHTML(...this.editor.currentSelection, template.html);
    }
  }
});
