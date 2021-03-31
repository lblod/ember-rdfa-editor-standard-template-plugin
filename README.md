# @lblod/ember-rdfa-editor-standard-template-plugin

RDFa editor plugin to insert standard templates in the editor.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install @lblod/ember-rdfa-editor
ember install @lblod/ember-rdfa-editor-standard-template-plugin
```

## Configuration
### Dispatcher configuration
The plugin will automatically be added in the `default` and `all` editor profiles in `app/config/editor-profiles.js`. Add the plugin name `rdfa-editor-standard-template-plugin` to other editor profiles if you want to enable the plugin in these profiles, too.

Once the plugin is configured in the appropriate editor profiles in `app/config/editor-profiles.js` it will be automatically be picked up by the rdfa-editor.

### Template model
On installation the plugin will generate a `template` model. In case the host application already contains a `template` model, the plugin's model can be merged in the existing model using the `template-model` mixin.

E.g.
```javascript
import Model from 'ember-data/model';
import TemplateModelMixin from '@lblod/ember-rdfa-editor-standard-template-plugin/mixins/template-model';

export default Model.extend(TemplateModelMixin, {
  // your template model here
});
```

### Template resource used by the plugin
When creating a template in your database, the following properties are used by the plugin :
- the title of the template (`title`)
- its HTML content (`content`)
- the words of the document the template should match on (`matches`)
- the contexts in which it should be active (`contexts`) 
- the contexts in which it should not be active (`disabled-in-contexts`)

Note: providing multiple contexts will be processed as `( context1 OR context2 OR ... )`.
