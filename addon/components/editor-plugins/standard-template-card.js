import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../templates/components/editor-plugins/standard-template-card';
import instantiateUuids from '../../utils/instantiate-uuids';

/**
* Card displaying a hint of the Standard Template plugin
*
* @module editor-standard-template-plugin
* @class StandardTemplateCard
* @extends Ember.Component
*/
export default Component.extend({
  layout,

  /**
   * Region on which the card applies
   * @property location
   * @type [number,number]
   * @private
  */
  location: reads('info.location'),

  /**
   * Unique identifier of the event in the hints registry
   * @property hrId
   * @type Object
   * @private
  */
  hrId: reads('info.hrId'),

  /**
   * The RDFa editor instance
   * @property editor
   * @type RdfaEditor
   * @private
  */
  editor: reads('info.editor'),

  /**
   * Hints registry storing the cards
   * @property hintsRegistry
   * @type HintsRegistry
   * @private
  */
  hintsRegistry: reads('info.hintsRegistry'),

  actions: {
    async insert() {
      await this.info.value.reload();
      const updatedLocation = this.get('hintsRegistry').updateLocationToCurrentIndex(this.get('hrId'), this.get('location'));
      this.get('hintsRegistry').removeHintsAtLocation(this.get('location'), this.get('hrId'), 'editor-plugins/standard-template-card');
      const selection = this.get('editor').selectHighlight(updatedLocation)
      this.editor.update(selection, { set: {innerHTML: instantiateUuids(this.get('info').value.body)}})
    }
  }
});
