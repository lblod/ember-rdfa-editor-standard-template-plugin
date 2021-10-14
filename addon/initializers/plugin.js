import StandardTemplatePlugin from '../standard-template-plugin';

export function initialize(application) {
  application.register('plugin:standard-template', StandardTemplatePlugin, {
    singleton: false,
  });
}

export default {
  initialize,
};
