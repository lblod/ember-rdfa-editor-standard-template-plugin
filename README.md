# @lblod/ember-rdfa-editor-standard-template-plugin

RDFa editor plugin to insert standard templates in the editor. Depending on the position of the cursor or selected text, a dropdown will appear in the toolbar of the editor that lets you insert a template for the proper context at the location of the cursor.


## Compatibility

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


## Installation

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

When creating a template in your database, the following properties are used by the plugin:

* the title of the template (`title`)
* its HTML content (`content`)
* the words of the document the template should match on (`matches`)
* the contexts in which it should be active (`contexts`) 
* the contexts in which it should not be active (`disabled-in-contexts`)

Note: providing multiple contexts will be processed as `( context1 OR context2 OR ... )`.

### RDFa context

The plugin will search for RDFa contexts in the content of the editor and the editor itself. Based on the contexts, the plugin will show possible templates to be added at the location of the cursor. E.g. if an element in the editor has the `typeof="besluit:BehandelingVanAgendapunt"` attribute, the plugin will show the templates related to `besluit:BehandelingVanAgendapunt` in the dropdown menu. This attribute can be set on an element in the content of the editor or predefined in the editor itself.

The dummy app (see "Testing" below), contains this example scenario. Start the dummy app and check out the *"CustomHTML"* or *"CustomXML"*.


## Testing

This plugin comes with a dummy app to test basic functionality. However, this plugin requires external data sources to populate the templates. This means you need to have a running stack of `app-gelinkt-notuleren` where there are routes for HTTP requests to `/templates` already set-up. In order for requests to be routed through correctly, you should start Ember in proxy mode, pointing to the Gelinkt Notuleren stack, e.g.:

```
ember serve --proxy http://localhost/
```

TODO: This could be improved by mocking the external data source with some prebuilt templates.

