# basespace

Functions to create namespaces inside objects.

## Installation

### Node

    npm install basespace

### Component

Install component:

    npm install -g component

Then:

    component install gamtiq/basespace

### AMD, &lt;script&gt;

Use `dist/basespace.js` or `dist/basespace.min.js` (minified version).

## Usage

### Node, Component

    var ns = require("basespace");
    ...

### AMD

```js
define(["path/to/dist/basespace.js"], function(ns) {
    ...
});
```

### &lt;script&gt;

```html
<script type="text/javascript" src="path/to/dist/basespace.js"></script>
<script type="text/javascript">
    // basespace is available via basespace field of window object
    var ns = basespace;
    ...
</script>
```

## Example

```js
var app = {
    space: ns.space
};
ns(["model", "ui.dialog", "ui.list", "ui.list.cyclic", "util"], app);
app.space("ui.menu", "template");
app.space("data").util = {...};
```

## API

### ns(namespaces: Array|String, [context: Object], [value])

Create specified `namespaces` inside `context` if they do not exist.
`context` is global object (i.e. `window` in browser) by default.
`value` specifies a value that will be assigned to a final field. `{}` by default.

Return the value for the last of created names/fields.

### .space(namespace: String, ...)

Create the specified `namespace` inside `this` object.

Return the value for the last of created names/fields.

## Licence

MIT
