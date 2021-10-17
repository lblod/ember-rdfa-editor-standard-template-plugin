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
    if (!this.context) {
      return [];
    }
    const dataset = this.context;
    console.log(dataset);
    for (const quad of dataset) {
      console.log(quad);
    }
    return (
      this.templates.fetchTemplates.last.value?.filter((template) => {
        const typePredicate = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
        const containsTypes = dataset.some(
          (quad) =>
            quad.predicate.value === typePredicate &&
            template.contexts.includes(quad.object.value)
        );
        const containsDisabledTypes = dataset.some(
          (quad) =>
            quad.predicate.value === typePredicate &&
            template.disabledInContexts.includes(quad.object.value)
        );

        return containsTypes && !containsDisabledTypes;
      }) || []
    );
  }

  get hasApplicableTemplates() {
    return this.applicableTemplates.length > 0;
  }

  @action
  trackContext(event) {
    console.log('EVENT', event.payload);
    this.context = event.payload.parentDataset;
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
