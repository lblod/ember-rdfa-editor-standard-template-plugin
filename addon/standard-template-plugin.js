import { inject as service } from '@ember/service';
export default class StandardTemplatePlugin {
  @service templates;
  get name() {
    return 'standard-template';
  }

  async initialize(controller) {
    await this.templates.fetchTemplates.perform();
    controller.registerWidget({
      desiredLocation: 'toolbar',
      componentName: 'standard-template-card',
      identifier: 'standard-template-card',
    });
    controller.registerWidget({
      desiredLocation: 'sidebar',
      componentName: 'suggested-templates-card',
      identifier: 'suggested-templates-card',
    });
  }
}
