import { parseScript, parseModule } from "../../../src";
import {expect} from "chai";

describe.skip("ES2015 - Spread elements", () => {

    it("should call spread first", () => {
        expect(parseScript("f(...x, y, z);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should call multi spread", () => {
        expect(parseScript("f(...x, ...y, ...z);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "z",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should call spread default", () => {
        expect(parseScript("f(g, ...h = i);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "g",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "h",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "i",
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should call spread", () => {
        expect(parseScript("f(...g);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "g",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle new spread default", () => {
        expect(parseScript("new f(g, ...h = i);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "Identifier",
                                name: "g",
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "AssignmentExpression",
                                    operator: "=",
                                    left: {
                                        type: "Identifier",
                                        name: "h",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "i",
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle new spread first", () => {
        expect(parseScript("new f(...x, y, z);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                            {
                                type: "Identifier",
                                name: "y",
                            },
                            {
                                type: "Identifier",
                                name: "z",
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle new spread number", () => {
        expect(parseScript("new f(....5);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Literal",
                                    value: 0.5,
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle call spread", () => {
        expect(parseScript("f(...g);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "g",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should handle new multi spread", () => {
        expect(parseScript("new f(...x, ...y, ...z);")).to.eql({
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "NewExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
                        },
                        arguments: [
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "x",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "y",
                                },
                            },
                            {
                                type: "SpreadElement",
                                argument: {
                                    type: "Identifier",
                                    name: "z",
                                },
                            },
                        ],
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
