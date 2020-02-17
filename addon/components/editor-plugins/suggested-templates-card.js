import Component from '@ember/component';
import layout from '../../templates/components/editor-plugins/suggested-templates-card';
import { reads } from '@ember/object/computed';
import instantiateUuids from '../../utils/instantiate-uuids';
export default Component.extend({
  layout,
  templates: reads('info.templates'),
  editor: reads('info.editor'),
  actions: {
    async insert(template) {
      await template.reload();
      const selection = this.editor.selectCurrentSelection()
      this.editor.update(selection, { set: {innerHTML: instantiateUuids(template.body)}})
      this.closeHints();
    },
    closeHints() {
      this.closeHints();
    }
  }
});
