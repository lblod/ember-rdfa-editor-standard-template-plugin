import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  plugins = ['standard-template'];
  controller;

  @action
  rdfaEditorInit(controller) {
    this.controller = controller;
  }
}
