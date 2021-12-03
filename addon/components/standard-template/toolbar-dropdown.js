import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class StandardTemplateToolbarDropdownComponent extends Component {
  @tracked menuOpen = false;

  get controller() {
    return this.args.controller;
  }

  get plugin() {
    return this.args.plugin;
  }
}
