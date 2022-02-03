import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  plugins = ['text-styles', 'searching', 'standard-template'];

  @action
  rdfaEditorInit(controller) {
    //const presetContent = localStorage.getItem('EDITOR_CONTENT') ?? '';
    const presetContent = `
<div prefix="ext: http://mu.semte.ch/vocabularies/ext/ mobiliteit: https://data.vlaanderen.be/ns/mobiliteit# dct: http://purl.org/dc/terms/" typeof="besluit:BehandelingVanAgendapunt" resource="http://data.lblod.info/artikels/32f2768c-917f-412a-a33e-45b2722eb610">
    Enter this text with the cursor and try to add a template. This wil appear in place of the cursor leaving this text on screen, but when it works, it works. We could consider adding the RDFa data of this element into the debug component itself.
</div>`;
    controller.setHtmlContent(presetContent);
    const editorDone = new CustomEvent('editor-done');
    window.dispatchEvent(editorDone);
  }
}
