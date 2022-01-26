import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  plugins = ['text-styles', 'searching', 'standard-template'];

  @action
  rdfaEditorInit(controller) {
    const presetContent = localStorage.getItem('EDITOR_CONTENT') ?? '';
    controller.setHtmlContent(presetContent);
    const editorDone = new CustomEvent('editor-done');
    window.dispatchEvent(editorDone);
  }
}
