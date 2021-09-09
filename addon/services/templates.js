import Service, { inject as service } from "@ember/service";
import { task } from "ember-concurrency-decorators";

export default class TemplatesService extends Service {
  @service store;

  @task
  *fetchTemplates() {
    return yield this.loadTemplates();
  }

  async loadTemplates() {
    return this.store.query('template', {
      fields: { templates: 'title,contexts,matches,disabled-in-contexts' },
    });
  }
}
