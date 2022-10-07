import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import instantiateUuids from '../utils/instantiate-uuids';

export default class TemplateProviderComponent extends Component {
  @service rdfaEditorStandardTemplatePlugin;
  @tracked applicableTemplates = [];

  constructor() {
    super(...arguments);
    this.args.controller.addTransactionStepListener(this.onTransactionUpdate);
  }

  get busy() {
    return this.rdfaEditorStandardTemplatePlugin.fetchTemplates.isRunning;
  }

  get controller() {
    return this.args.controller;
  }

  get hasApplicableTemplates() {
    return this.applicableTemplates.length > 0;
  }

  templateIsApplicable(transaction, template) {
    const selectedRange = transaction.currentSelection.lastRange;
    if (!selectedRange) {
      return false;
    }
    const rangeStore = transaction
      .getCurrentDataStore()
      .limitToRange(selectedRange, 'rangeIsInside');

    const containsTypes = rangeStore.match(null, 'a').dataset.some((quad) => {
      return template.contexts.includes(quad.object.value);
    });

    const containsDisabledTypes = rangeStore
      .match(null, 'a')
      .dataset.some((quad) =>
        template.disabledInContexts.includes(quad.object.value)
      );

    return containsTypes && !containsDisabledTypes;
  }

  modifiesSelection(steps) {
    return steps.some(
      (step) => step.type === 'selection-step' || step.type === 'operation-step'
    );
  }

  @action
  onTransactionUpdate(transaction, steps) {
    if (this.modifiesSelection(steps)) {
      this.applicableTemplates =
        this.rdfaEditorStandardTemplatePlugin.fetchTemplates.last.value?.filter(
          (template) => this.templateIsApplicable(transaction, template)
        ) || [];
    }
  }

  @action
  async insert(template) {
    await template.reload();
    let insertRange = this.controller.selection.lastRange;
    if (insertRange.getMarks().hasMarkName('highlighted')) {
      insertRange = this.controller.rangeFactory.fromAroundNode(
        insertRange.getCommonAncestor()
      );
    }
    this.controller.perform((tr) => {
      tr.commands.insertHtml({
        htmlString: instantiateUuids(template.body),
        range: insertRange,
      });
    });
    // this.controller.executeCommand(
    //   'insert-html',
    //   instantiateUuids(template.body),
    //   insertRange,
    //   'right'
    // );
  }
}
