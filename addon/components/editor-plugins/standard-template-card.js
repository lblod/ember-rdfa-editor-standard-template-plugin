import Component from '@glimmer/component';
import instantiateUuids from '../../utils/instantiate-uuids';
import { action } from '@ember/object';

/**
* Card displaying a hint of the Standard Template plugin
*
* @module editor-standard-template-plugin
* @class StandardTemplateCard
* @extends Glimmer.Component
*/
export default class StandardTemplateCardComponent extends Component {

  /**
   * Region on which the card applies
   * @property location
   * @type [number,number]
   * @private
  */
  get location() {
    return this.args.info.location;
  }


  /**
   * The RDFa editor instance
   * @property editor
   * @type RdfaEditor
   * @private
  */
  get editor() {
    return this.args.info.editor;
  }

  /**
   * Hints registry storing the cards
   * @property hintsRegistry
   * @type HintsRegistry
   * @private
   */
  get hintsRegistry() {
    return this.args.info.hintsRegistry;
  }

  @action
  async insert() {
    await this.args.info.value.reload();
    this.hintsRegistry.removeHints({
      region: this.location,
      scope: 'editor-plugins/standard-template-card'
    });
    const selection = this.editor.selectHighlight(this.location);
    this.editor.update(selection, { set: {innerHTML: this.args.info.value.body}});
  }
}
