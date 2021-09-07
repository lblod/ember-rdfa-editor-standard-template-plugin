import Service, { inject as service } from '@ember/service';

export default class TemplatesService extends Service {
  @service store;

  async loadTemplates() {
    return this.store.query('template', {
      fields: { templates: 'title,contexts,matches,disabled-in-contexts' },
    });
  }
}
