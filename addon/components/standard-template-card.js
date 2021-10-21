import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import instantiateUuids from '../utils/instantiate-uuids';

/**
 * Card displaying a hint of the Standard Template plugin
 *
 * @module editor-standard-template-plugin
 * @class StandardTemplateCard
 * @extends Glimmer.Component
 */
export default class StandardTemplateCardComponent extends Component {
  @tracked menuOpen = false;

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
    this.plugin.highlightInRange(insertedRange);
  }
}
