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
  @tracked context;
  @service templates;

  constructor() {
    super(...arguments);
    this.templates.fetchTemplates.perform();
    this.args.controller.onEvent('selectionChanged', this.trackContext);
  }

  get busy() {
    return this.templates.fetchTemplates.isRunning;
  }

  get controller() {
    return this.args.controller;
  }

  get applicableTemplates() {
    if (!this.context?.types) {
      return [];
    }
    return (
      this.templates.fetchTemplates.last.value?.filter((template) => {
        return (
          template.contexts.includes(...this.context.types) &&
          !template.disabledInContexts.includes(...this.context.types)
        );
      }) || []
    );
  }

  get hasApplicableTemplates() {
    return this.applicableTemplates.length > 0;
  }

  @action
  trackContext(event) {
    console.log('EVENT', event.payload);
    this.context = event.payload.rdfaContext;
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
