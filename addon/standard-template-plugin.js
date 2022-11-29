import { inject as service } from '@ember/service';
import { RdfaEditorPlugin } from '@lblod/ember-rdfa-editor';

export default class StandardTemplatePlugin extends RdfaEditorPlugin {
  @service rdfaEditorStandardTemplatePlugin;
  matches = new Set();

  async initialize() {
    super.initialize();
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
  }

  widgets() {
    return [
      {
        desiredLocation: 'insertSidebar',
        componentName: 'standard-template/template-card',
        identifier: 'standard-template/template-card',
      },
    ];
  }
}
