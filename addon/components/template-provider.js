import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import instantiateUuids from '../utils/instantiate-uuids';
import { DOMParser as ProseParser } from 'prosemirror-model';
export default class TemplateProviderComponent extends Component {
  @service rdfaEditorStandardTemplatePlugin;

  get busy() {
    return this.rdfaEditorStandardTemplatePlugin.fetchTemplates.isRunning;
  }

  get controller() {
    return this.args.controller;
  }

  get hasApplicableTemplates() {
    return this.applicableTemplates.length > 0;
  }

  get applicableTemplates() {
    return (
      this.rdfaEditorStandardTemplatePlugin.fetchTemplates.last.value?.filter(
        (template) => this.templateIsApplicable(template)
      ) || []
    );
  }

  templateIsApplicable(template) {
    const selection = this.controller.state.selection;
    if (!selection.from) {
      return false;
    }

    const containsTypes = this.controller.datastore
      .match(null, 'a')
      .dataset.some((quad) => {
        return template.contexts.includes(quad.object.value);
      });

    const containsDisabledTypes = this.controller.datastore
      .match(null, 'a')
      .dataset.some((quad) =>
        template.disabledInContexts.includes(quad.object.value)
      );

    return containsTypes && !containsDisabledTypes;
  }

  @action
  async insert(template) {
    await template.reload();
    const selection = this.controller.state.selection;
    // if (insertRange.getMarks().hasMarkName('highlighted')) {
    //   insertRange = this.controller.rangeFactory.fromAroundNode(
    //     insertRange.getCommonAncestor()
    //   );
    // }

    const domParser = new DOMParser();
    const contentFragment = ProseParser.fromSchema(
      this.controller.schema
    ).parse(
      domParser.parseFromString(instantiateUuids(template.body), 'text/html')
    ).content;
    this.controller.withTransaction((tr) => {
      return tr.replaceWith(selection.from, selection.to, contentFragment);
    });
  }
}
