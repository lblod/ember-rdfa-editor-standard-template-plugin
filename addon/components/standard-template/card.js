import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class StandardTemplateCardComponent extends Component {
  @tracked active = true;

  get controller() {
    return this.args.controller;
  }
}
