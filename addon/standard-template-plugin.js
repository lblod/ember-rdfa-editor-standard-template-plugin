export default class StandardTemplatePlugin {
  get name() {
    return 'standard-template';
  }

  static create() {
    return new StandardTemplatePlugin();
  }

  async initialize(controller) {
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
