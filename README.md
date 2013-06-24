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

## Usage

### Node, Component

    var ns = require("basespace");
    ...

## Examples

    var app = {
        space: ns.space
    };
    ns(["model", "ui.dialog", "ui.list", "ui.list.cyclic", "util"], app);
    app.space("ui.menu", "template");
    app.space("data").util = {...};

## API

    var ns = require("basespace");

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
