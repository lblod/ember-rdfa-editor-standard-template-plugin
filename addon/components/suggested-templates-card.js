import Component from '@glimmer/component';
import instantiateUuids from '../utils/instantiate-uuids';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SuggestedTemplatesCardComponent extends Component {
  @tracked active = true;

  get controller() {
    return this.args.controller;
  }

}
