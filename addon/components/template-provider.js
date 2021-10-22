import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import instantiateUuids from '../utils/instantiate-uuids';

export default class TemplateProviderComponent extends Component {
  @tracked context;
  @service templates;

  constructor() {
    super(...arguments);
    this.args.controller.onEvent('selectionChanged', this.trackContext);
  }

  get busy() {
    return this.templates.fetchTemplates.isRunning;
  }

  get plugin() {
    return this.args.plugin;
  }

  get controller() {
    return this.args.controller;
  }

  get applicableTemplates() {
    if (!this.context) {
      return [];
    }
    const dataset = this.context;
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
    this.context = event.payload.parentDataset;
  }

  @action
  async insert(template) {
    await template.reload();
    let insertRange = this.controller.selection.lastRange;
    console.log(insertRange.toString());
    if (insertRange.getTextAttributes().get('highlighted')) {
      insertRange = this.controller.rangeFactory.fromAroundNode(
        insertRange.getCommonAncestor()
      );
    }
    const insertedRange = this.controller.executeCommand(
      'insert-html',
      instantiateUuids(template.body),
      insertRange,
      'right'
    );
    this.plugin.highlightInRange(this.controller.rangeFactory.fromAroundAll());
  }
}
