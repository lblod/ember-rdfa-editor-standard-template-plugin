import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  plugins = ['standard-template'];
  controller;

  @action
  rdfaEditorInit(controller) {
    this.controller = controller;
    controller.executeCommand(
      'insert-html',
      `<div prefix="besluit: http://data.vlaanderen.be/ns/besluit#" typeof="besluit:Besluit"><div property="heeftBehandeling" typeof="besluit:BehandelingVanAgendapunt">skeet</div>yeet</div>`,
      controller.rangeFactory.fromAroundAll()
    );
  }
}
