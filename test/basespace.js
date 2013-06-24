// Tests for basespace component/module
describe("basespace", function() {
    var global = (function() {return this;}).call(null),
        spaceList = [
                     "a",
                     "a.b.c",
                     "a.b.c.d",
                     "a.b.d",
                     "a.b",
                     "a.b2",
                     "a.value",
                     "s1.s2.s3.s4.s5.s6.s7.s8.s9.s10",
                     "some parent.some child"
                     ],
        expect, ns;
    
    // node
    if (typeof chai === "undefined") {
        ns = require("../index");
        expect = require("chai").expect;
    }
    // browser
    else {
        ns = require("basespace");
        expect = chai.expect;
    }
    
    function clearObj(obj) {
        for (nI = 0, nL = spaceList.length; nI < nL; nI++) {
            delete obj[ spaceList[nI].split(".").shift() ];
        }
    }
    
    function clearGlobal() {
        clearObj(global);
    }
    
    describe("basespace()", function() {
        
        describe("basespace(null | '' | 0)", function() {
            it("should return undefined", function() {
                expect( ns(null) )
                    .be["undefined"];
            });
        });
        
        describe("basespace('...', context)", function() {
            it("should create empty fields inside context", function() {
                var context = {};
                
                ns(".field", context);
                expect(context)
                    .have.property("");
                expect(context[""])
                    .have.property("field");
                
                ns("...", context);
                expect(context)
                    .have.property("");
                expect(context[""])
                    .have.property("");
                expect(context[""][""])
                    .have.property("");
                expect(context[""][""][""])
                    .have.property("");
            });
        });
        
        describe("basespace('some.name.space')", function() {
            it("should create the specified namespace inside global object", function() {
                var name, nI, nL, space;
                for (nI = 0, nL = spaceList.length; nI < nL; nI++) {
                    name = spaceList[nI];
                    space = ns(name);
                    expect(global)
                        .have.deep.property(name, space);
                }
            });
            after(clearGlobal);
        });
        
        describe("basespace('some.name.space', context)", function() {
            it("should create the specified namespace inside context", function() {
                var context = {
                        a: {
                            b: {},
                            value: 7
                        },
                        "some parent": {}
                    },
                    name, nI, nL, space;
                for (nI = 0, nL = spaceList.length; nI < nL; nI++) {
                    name = spaceList[nI];
                    space = ns(name, context);
                    expect(context)
                        .have.deep.property(name, space);
                }
            });
        });
        
        describe("basespace('some.name.space', context | null, value | object)", function() {
            it("should create the specified namespace with given value inside context", function() {
                var context = {
                        a: {
                            b: {},
                            x: "x",
                            z: {}
                        },
                        "some parent": {}
                    },
                    value = 123,
                    name, nI, nL;
                for (nI = 0, nL = spaceList.length; nI < nL; nI++) {
                    name = spaceList[nI];
                    ns(name, context, value);
                    expect(context)
                        .have.deep.property(name, value);
                }
            });
            
            it("should create the specified namespace with given object inside global", function() {
                var obj = {f1: 1, f2: "f2"},
                    name, nI, nL;
                for (nI = 0, nL = spaceList.length; nI < nL; nI++) {
                    name = spaceList[nI];
                    ns(name, global, obj);
                    expect(global)
                        .have.deep.property(name, obj);
                    expect( ns(name, global, obj) )
                        .deep.equal(obj);
                }
            });
            
            it("should replace context's field value", function() {
                var context = {
                        a: {b: true},
                        "some parent": 53
                    },
                    value = "val",
                    space;
                
                space = ns("a.b.c", context);
                expect(context)
                    .have.deep.property("a.b");
                expect(context)
                    .have.deep.property("a.b.c", space);
                
                ns("some parent.field", context, value);
                expect(context)
                    .have.deep.property("some parent");
                expect(context)
                    .have.deep.property("some parent.field", value);
            });
            
            after(clearGlobal);
        });
        
        describe("basespace(namespaceArray, context)", function() {
            it("should create specified namespaces inside context", function() {
                var context = {},
                    nI, nL;
                
                ns(spaceList, context);
                for (nI = 0, nL = spaceList.length; nI < nL; nI++) {
                    expect(context)
                        .have.deep.property( spaceList[nI] );
                }
            });
        });
        
    });
    
    describe(".space()", function() {
        it("should create namespaces inside object that has space method", function() {
            var context = {space: ns.space};
            
            context.space("ins.ide", "o.u.t");
            
            expect(context)
                .have.property("ins");
            expect(context)
                .have.deep.property("ins.ide");
            
            expect(context)
                .have.property("o");
            expect(context)
                .have.deep.property("o.u.t");
            
            context.space("a.r.t");
            expect(context["a"])
                .have.property("r");
            expect(context)
                .have.deep.property("a.r.t");
        });

        it("should create namespaces inside basespace function object", function() {
            ns.space("app.ui.dialog", "app.ui.list", "app.util", "app.data");
            expect(ns)
                .have.property("app");
            expect(ns.app)
                .have.property("ui");
            expect(ns.app)
                .have.property("util");
            expect(ns.app)
                .have.property("data");
            expect(ns.app.ui)
                .have.property("dialog");
            expect(ns.app.ui)
                .have.property("list");
        });
        
        after(function() {
            clearObj(ns);
        });
    });
});
