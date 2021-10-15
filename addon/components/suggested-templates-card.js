import Component from '@glimmer/component';
import instantiateUuids from '../utils/instantiate-uuids';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SuggestedTemplatesCardComponent extends Component {
  @service templates;
  @tracked active = true;

  get controller() {
    return this.args.controller;
  }

  @action
  async insert(template) {
    await template.reload();
    this.controller.executeCommand(
      'insert-html',
      instantiateUuids(template.body)
    );
    this.closeHints();
  }

  @action
  closeHints() {
    this.args.onClose();
  }
}
