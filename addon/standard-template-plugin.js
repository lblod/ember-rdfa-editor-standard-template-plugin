import { inject as service } from '@ember/service';

export default class StandardTemplatePlugin {
  @service rdfaEditorStandardTemplatePlugin;
  matches = new Set();

  get name() {
    return 'standard-template';
  }

  async initialize(transaction, controller) {
    let templates;
    try {
      templates =
        await this.rdfaEditorStandardTemplatePlugin.fetchTemplates.perform();
    } catch (e) {
      console.warn(
        `Plugin ${this.name} had trouble initializing: Templates failed to load`
      );
    }
    if (templates) {
      templates.forEach((template) => {
        template.matches.forEach((match) => this.matches.add(match));
      });
    }
    transaction.registerWidget(
      {
        desiredLocation: 'insertSidebar',
        componentName: 'standard-template/template-card',
        identifier: 'standard-template/template-card',
      },
      controller
    );
  }
}
