
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root.basespace = factory(req, exp, mod);
    }
}(this, function(require, exports, module) {
/**
 * @module basespace 
 */

/**
 * Create specified namespaces if they do not exist.
 * 
 * @param {Array|String} names
 *      Namespaces that should be created.
 * @param {Object} [context=global]
 *      An object inside of which namespaces will be created. Global object (i.e. window in browser) by default.
 * @param {Any} [value={}]
 *      A value that will be assigned to a final field. <code>{}</code> by default.
 * @return 
 *      The value for the last name. <code>undefined</code> by default (if no names were passed).
 * @alias module:basespace
 */
function namespace(names, context, value) {
    /*jshint laxbreak:true*/
    var bLastValue = arguments.length > 2,
        namePart, nI, nL, obj, sName, space;
    if (names) {
        if (typeof names === "string") {
            names = [names];
        }
        if (! context) {
            context = (function() {return this;}).call(null);
        }
        if (! bLastValue) {
            value = {};
        }
        for (nI = 0, nL = names.length; nI < nL; nI++) {
            namePart = names[nI].split(".");
            space = context;
            while (namePart.length) {
                sName = namePart.shift();
                if (namePart.length) {
                    obj = space[sName];
                    if (! obj || (typeof obj !== "object" && typeof obj !== "function")) {
                        obj = space[sName] = {};
                    }
                    space = obj;
                }
                else {
                    space = ! (sName in space) || bLastValue
                                ? (space[sName] = value)
                                : space[sName];
                }
            }
        }
    }
    return space;
}

/**
 * Create specified namespaces inside <code>this</code> object if they do not exist.
 * <br>
 * This function is a "wrap" for the following code:
 * <code><pre>
 * var namespace = require("basespace");
 * namespace(arguments, this);
 * </pre></code>
 * It can be transferred to an object to use as a method.
 * 
 * @param {...String} name
 *      A namespace that should be created.
 * @return 
 *      The value for the last name. <code>undefined</code> by default (if no names were passed).
 */
namespace.space = function(name) {
    /*jshint unused:vars*/
    return namespace(arguments, this);
};

module.exports = namespace;

    return namespace;
}));
