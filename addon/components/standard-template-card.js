import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
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
  @service templates;

  constructor() {
    super(...arguments);
    this.templates.fetchTemplates.perform();
  }

  get busy() {
    return this.templates.fetchTemplates.isRunning;
  }

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
  }
}
