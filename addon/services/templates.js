import Service, { inject as service } from "@ember/service";
import { task } from "ember-concurrency-decorators";

export default class TemplatesService extends Service {
  @service store;

  @task
  *fetchTemplates() {
    const templates = yield this.loadTemplates();
    console.log(templates);
    return templates;
  }

  async loadTemplates() {
    return this.store.query('template', {
      fields: { templates: 'title,contexts,matches,disabled-in-contexts' },
    });
  }
}
