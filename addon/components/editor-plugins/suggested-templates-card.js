import Component from '@glimmer/component';
import instantiateUuids from '../../utils/instantiate-uuids';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SuggestedTemplatesCardComponent extends Component {
  @service templates;

  get editor() {
    return this.args.editor;
  }

  @action
  async insert(template) {
    await template.reload();
    this.editor.executeCommand('insert-html', instantiateUuids(template.body));
    this.closeHints();
  }

  @action
  closeHints() {
    this.args.onClose();
  }
}
