import Component from '@glimmer/component';
import instantiateUuids from '../../utils/instantiate-uuids';
import { action } from '@ember/object';

export default class SuggestedTemplatesCardComponent extends Component {
  get templates() {
    return this.args.info.templates;
  }
  get editor() {
    return this.args.info.editor;
  }

  @action
  async insert(template) {
    await template.reload();
    this.editor.executeCommand('insert-html', instantiateUuids(template.body));
    this.closeHints();
  }

  @action
  closeHints() {
    this.args.closeHints();
  }
}

