import Component from '@glimmer/component';
import instantiateUuids from '../utils/instantiate-uuids';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SuggestedTemplatesCardComponent extends Component {
  @tracked active = true;

  get controller() {
    return this.args.controller;
  }

  get plugin() {
    return this.args.plugin;
  }

  @action
  async insert(template) {
    await template.reload();
    const insertedRange = this.controller.executeCommand(
      'insert-html',
      instantiateUuids(template.body)
    );
    // TODO not the cleanest, we should have more expressive events
    // so we can simply listen for the contentChange the above insert generates
    this.plugin.highlightInRange(insertedRange);
  }
}
