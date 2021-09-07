import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/**
 * Card displaying a hint of the Standard Template plugin
 *
 * @module editor-standard-template-plugin
 * @class StandardTemplateCard
 * @extends Glimmer.Component
 */
export default class StandardTemplateCardComponent extends Component {
  @tracked menuOpen = false;

  get editor() {
    return this.args.editor;
  }

  @action
  openMenu() {
    this.menuOpen = true;
  }

  @action
  closeMenu() {
    this.menuOpen = false;
  }
}
