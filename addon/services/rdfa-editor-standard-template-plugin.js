import Service, { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { waitForProperty } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

const trimTrailingWhitespace = /\s+$/g;
const HINT_COMPONENT_NAME = "editor-plugins/standard-template-card";
/**
* RDFa Editor plugin that hints standard templates based on input keywords
*
* @module editor-standard-template-plugin
* @class RdfaEditorStandardTemplatePlugin
* @extends Ember.Service
*/

export default class RdfaEditorStandardTemplatePluginService extends Service {
  @service store;
  @tracked templates;
  editorApi = "0.1";

  constructor() {
    super(...arguments);
    this.loadTemplates();
  }

  @task
  * execute(rdfaBlocks, hintsRegistry, editor) {
    if (rdfaBlocks.length == 0) return;

    yield waitForProperty(this, 'templates');

    const hints = [];
    hintsRegistry.removeHints({ rdfaBlocks, scope: HINT_COMPONENT_NAME});
    for (let block of rdfaBlocks) {
      const hintsForContext = this.generateHintsForContext(block, hintsRegistry, editor);
      hints.push(...hintsForContext);
    }
    hintsRegistry.addHints(HINT_COMPONENT_NAME, hints);
  }

  /**
   * @method suggestHint
   *
   */
  async suggestHints(context, editor) {
    await waitForProperty(this, 'templates');
    const rdfaTypes = context.context.filter(t => t.predicate == 'a').map(t => t.object);
    const cachedTemplates = this.templates;
    const templates = this.templatesForContext(cachedTemplates, rdfaTypes);
    if (templates.length === 0) {
      return [];
    }
    else
      return [{ component: 'editor-plugins/suggested-templates-card', info: {templates, editor}}];
  }

  /**
   * Generates a card to hint for a given template
   *
   * @method generateCard
   *
   * @param {Object} template Template to generate a card for
   * @param {[int,int]} location Location to generate a card for
   * @param {string} hrId Unique identifier of the event in the hintsRegistry
   * @param {Object} hintsRegistry Registry of hints in the editor
   * @param {Object} editor The RDFa editor instance
   *
   * @return {Object} The card to hint for a given template
   *
   * @private
   */
  generateCard(template, location, hintsRegistry, editor) {
    return {
      location,
      info: {
        label: template.title,
        value: template,
        location, hintsRegistry, editor
      },
      card: HINT_COMPONENT_NAME
    };
  }


  /**
   Generates the hints for a location based on a given RDFa context and text input.
   A hint includes a suggestion for a standard template to insert in the editor.

   @method generateHintsForContext

   @param {Object} context Text snippet at a specific location with an RDFa context
   @param {string} hrId Unique identifier of the event in the hintsRegistry
   @param {Object} hintsRegistry Registry of hints in the editor
   @param {Object} editor The RDFa editor instance

   @return {Array} Array of cards to hint for a given context

   @private
   */
  generateHintsForContext(context, hintsRegistry, editor) {
    const hints = [];

    const rdfaTypes = context.context.filter(t => t.predicate == 'a').map(t => t.object);

    if(rdfaTypes.length === 0) return hints;

    const cachedTemplates = this.templates;
    const templates = this.templatesForContext(cachedTemplates, rdfaTypes);

    // Find hints that apply on the given text input and template
    templates.forEach( (template) => {
      const matches = this.scanForMatch(context.text || '', template.get('matches'));

      const cards = matches.map( (match) => {
        const location = this.rebaseMatchLocation(match.location, context.region);
        return this.generateCard(template, location, hintsRegistry, editor);
      });

      hints.push(...cards);
    });

    return hints;
  }

  /**
   Filter the valid templates for a context.

   @method templatesForContext

   @param {Array} Array of templates
   @param {Array} The path of rdfaContext objects from the root till the current context

   @return {Array} Array of templates (filtered)

   @private
   */
  templatesForContext(templates, rdfaTypes){
    let isMatchingForContext = template => {
      return rdfaTypes.filter(e => template.get('contexts').includes(e)).length > 0
        && rdfaTypes.filter(e => template.get('disabledInContexts').includes(e)).length === 0;
    };
    return templates.filter(isMatchingForContext);
  }

  /**
   Loads the standard templates.
   The first time the templates will be loaded from a backend.
   Afterwards the templates will be fetched from the store.

   @method loadTemplates

   @return {Promise} A promise that resolves to a RecordArray of templates

   @private
   */
  async loadTemplates() {
    let templates = await this.get('store').query(
      'template',
      { fields:  {templates: 'title,contexts,matches,disabled-in-contexts'}});
    this.templates = templates;
  }

  /**
   Rebase a region with relative locations against a base region

   @method rebaseMatchLocation

   @param {[int,int]} [start, end] Base region to rebase the relative region on
   @param {[int, int]} region Region with relative locations to rebase

   @return {[int, int]} Rebased region

   @private
   */
  rebaseMatchLocation([start, end], region) {
    return [region[0] + start, region[0] + end];
  }

  /**
   Scan a text snippet for matching template keywords.

   Implemented by:
   1. scanning the text for a full match on one or more of the keywords.
   2. scanning the end of the text for a partial match on one or more of the keywords
      assuming the user is entering additional input at the end of the text

   @method scanForMatch

   @param {string} text Text snippet to scan for a keyword
   @param {Array} keywords Array of template keywords to match the text snippet with

   @return {Array} Array containing objects with the part of the text that matches
                   together with its relative position in the text.

   @private
   */
  scanForMatch(text, keywords) {
    text = text.toLowerCase().replace(trimTrailingWhitespace, '');
    keywords = keywords.map(k => k.toLowerCase());

    const matches = [];

    // Full matches
    keywords.forEach( (keyword) => {
      let i = text.indexOf(keyword);
      while (i != -1) {
        const matchedLocation = [i, i + keyword.length];
        matches.push({ location: matchedLocation, text: keyword });
        i = text.indexOf(keyword, i + 1);
      }
    });

    // Partial matches at the end of the string
    for (let i=0; i < text.length - 3; ++i) { // matching part must be 4 chars long at least
      const slicedText = text.slice(i);

      // find all partial matches that are not a full match
      const matchedKeyword = keywords.find(k => k.startsWith(slicedText) && k != slicedText);

      if (matchedKeyword) {
        const matchedLocation = [i, i + slicedText.length];
        matches.push({ location: matchedLocation, text: slicedText });
        break; // only add the first (and longest) occurrence as a match
      }
    }

    return matches;
  }
}
