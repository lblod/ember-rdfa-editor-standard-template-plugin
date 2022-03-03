import Service, { inject as service } from '@ember/service';
import { task, waitForProperty } from 'ember-concurrency';

export default class RdfaEditorStandardTemplatePluginService extends Service {
  @service store;
  @tracked templates;

  constructor() {
    super(...arguments);
    this.loadTemplates();
  }

  @task
  *fetchTemplates() {
    yield waitForProperty(this, 'templates');
    return this.templates;
  }

  async loadTemplates() {
    this.templates = await this.store.query('template', {
      fields: { templates: 'title,contexts,matches,disabled-in-contexts' },
    });
  }
}
