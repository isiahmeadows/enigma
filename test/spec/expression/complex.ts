import {parseScript} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Expressions - Complex", () => {
    it("should parse a || b && c | d ^ e & f == g < h >>> i + j * k", () => {
        assert.match<Program>(parseScript("a || b && c | d ^ e & f == g < h >>> i + j * k"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "LogicalExpression",
                        operator: "||",
                        left: {
                            type: "Identifier",
                            name: "a",
                        },
                        right: {
                            type: "LogicalExpression",
                            operator: "&&",
                            left: {
                                type: "Identifier",
                                name: "b",
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "|",
                                left: {
                                    type: "Identifier",
                                    name: "c",
                                },
                                right: {
                                    type: "BinaryExpression",
                                    operator: "^",
                                    left: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                    right: {
                                        type: "BinaryExpression",
                                        operator: "&",
                                        left: {
                                            type: "Identifier",
                                            name: "e",
                                        },
                                        right: {
                                            type: "BinaryExpression",
                                            operator: "==",
                                            left: {
                                                type: "Identifier",
                                                name: "f",
                                            },
                                            right: {
                                                type: "BinaryExpression",
                                                operator: "<",
                                                left: {
                                                    type: "Identifier",
                                                    name: "g",
                                                },
                                                right: {
                                                    type: "BinaryExpression",
                                                    operator: ">>>",
                                                    left: {
                                                        type: "Identifier",
                                                        name: "h",
                                                    },
                                                    right: {
                                                        type: "BinaryExpression",
                                                        operator: "+",
                                                        left: {
                                                            type: "Identifier",
                                                            name: "i",
                                                        },
                                                        right: {
                                                            type: "BinaryExpression",
                                                            operator: "*",
                                                            left: {
                                                                type: "Identifier",
                                                                name: "j",
                                                            },
                                                            right: {
                                                                type: "Identifier",
                                                                name: "k",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
    it("should parse a + (b < (c * d)) + e", () => {
        assert.match<Program>(parseScript("a + (b < (c * d)) + e"), {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "BinaryExpression",
                        operator: "+",
                        left: {
                            type: "BinaryExpression",
                            operator: "+",
                            left: {
                                type: "Identifier",
                                name: "a",
                            },
                            right: {
                                type: "BinaryExpression",
                                operator: "<",
                                left: {
                                    type: "Identifier",
                                    name: "b",
                                },
                                right: {
                                    type: "BinaryExpression",
                                    operator: "*",
                                    left: {
                                        type: "Identifier",
                                        name: "c",
                                    },
                                    right: {
                                        type: "Identifier",
                                        name: "d",
                                    },
                                },
                            },
                        },
                        right: {
                            type: "Identifier",
                            name: "e",
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });
});
