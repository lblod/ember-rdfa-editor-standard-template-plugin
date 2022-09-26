import { inject as service } from '@ember/service';

export default class StandardTemplatePlugin {
  @service rdfaEditorStandardTemplatePlugin;
  matches = new Set();
  controller;

  get name() {
    return 'standard-template';
  }

  async initialize(controller) {
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
    this.controller = controller;
    controller.registerWidget({
      desiredLocation: 'insertSidebar',
      componentName: 'standard-template/template-card',
      identifier: 'standard-template/template-card',
    });
  }
}
