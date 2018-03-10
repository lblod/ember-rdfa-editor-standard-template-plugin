# ember-rdfa-editor-standard-template-plugin

RDFa editor plugin to insert standard templates in the editor.

## Installation

Install the plugin like an Ember addon in your host application.

```
ember install git+https://github.com/lblod/ember-rdfa-editor-standard-template-plugin.git
```

### Dispatcher configuration
The plugin will automatically be added to the `default` and `all` profile in the editor's dispatcher configuration in `app/config/editor-profiles.js`.

### Template model
On installation the plugin will generate a `template` model. In case the host application already contains a `template` model, the plugin's model can be merged in the existing model using the `template-model` mixin.

E.g.
```javascript
import Model from 'ember-data/model';
import TemplateModelMixin from 'ember-rdfa-editor-standard-template-plugin/mixins/template-model';

export default Model.extend(TemplateModelMixin, {
  // your template model here
});
```
