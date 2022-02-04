import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  plugins = ['text-styles', 'searching', 'standard-template'];

  @action
  rdfaEditorInit(controller) {
    const presetContent = `
<div typeof="besluit:BehandelingVanAgendapunt">
    Enter this text with the cursor and try to add a template. This wil appear in place of the cursor leaving this text on screen, but when it works, it works. We could consider adding the RDFa data of this element into the debug component itself.
</div>`;
    controller.setHtmlContent(presetContent);
    const editorDone = new CustomEvent('editor-done');
    window.dispatchEvent(editorDone);
  }
}
