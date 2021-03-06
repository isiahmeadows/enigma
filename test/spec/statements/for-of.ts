import {parseScript, parseModule} from "../../../src";
import {Program} from "../../../src/estree";
import * as assert from "clean-assert";

describe.skip("Statements - `for ... of`", () => {
    it("should parse \"for (var x of list) process(x);\"", () => {
        assert.match<Program>(parseScript(`for (var x of list) process(x);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    await: false,
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "process",
                            },
                            arguments: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var x of list) process(x);\"", () => {
        assert.match<Program>(parseScript(`for (var x of list) process(x);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "x",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    await: false,
                    body: {
                        type: "ExpressionStatement",
                        expression: {
                            type: "CallExpression",
                            callee: {
                                type: "Identifier",
                                name: "process",
                            },
                            arguments: [
                                {
                                    type: "Identifier",
                                    name: "x",
                                },
                            ],
                        },
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(var a of b);\"", () => {
        assert.match<Program>(parseScript(`for(var a of b);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    await: false,
                    body: {
                        type: "EmptyStatement",
                    },
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(a of b);\"", () => {
        assert.match<Program>(parseScript(`for(a of b);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "Identifier",
                        name: "a",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(let [a] of b);\"", () => {
        assert.match<Program>(parseScript(`for(let [a] of b);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                    ],
                                },
                                init: null,
                            },
                        ],
                        kind: "let",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(let of of b);\"", () => {
        assert.match<Program>(parseScript(`for(let of of b);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "of",
                                },
                                init: null,
                            },
                        ],
                        kind: "let",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for(const a of b);\"", () => {
        assert.match<Program>(parseScript(`for(const a of b);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                },
                                init: null,
                            },
                        ],
                        kind: "const",
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var [p, q] of r);\"", () => {
        assert.match<Program>(parseScript(`for (var [p, q] of r);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "ArrayPattern",
                                    elements: [
                                        {
                                            type: "Identifier",
                                            name: "p",
                                        },
                                        {
                                            type: "Identifier",
                                            name: "q",
                                        },
                                    ],
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "r",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for ([p, q] of r);\"", () => {
        assert.match<Program>(parseScript(`for ([p, q] of r);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "ArrayPattern",
                        elements: [
                            {
                                type: "Identifier",
                                name: "p",
                            },
                            {
                                type: "Identifier",
                                name: "q",
                            },
                        ],
                    },
                    right: {
                        type: "Identifier",
                        name: "r",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (x of let) {}\"", () => {
        assert.match<Program>(parseScript(`for (x of let) {}`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "Identifier",
                        name: "x",
                    },
                    right: {
                        type: "Identifier",
                        name: "let",
                    },
                    body: {
                        type: "BlockStatement",
                        body: [],
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (let z of list);\"", () => {
        assert.match<Program>(parseScript(`for (let z of list);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "z",
                                },
                                init: null,
                            },
                        ],
                        kind: "let",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (var z of list);\"", () => {
        assert.match<Program>(parseScript(`for (var z of list);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "z",
                                },
                                init: null,
                            },
                        ],
                        kind: "var",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (const z of list);\"", () => {
        assert.match<Program>(parseScript(`for (const z of list);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "z",
                                },
                                init: null,
                            },
                        ],
                        kind: "const",
                    },
                    right: {
                        type: "Identifier",
                        name: "list",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for (p of q);\"", () => {
        assert.match<Program>(parseScript(`for (p of q);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "Identifier",
                        name: "p",
                    },
                    right: {
                        type: "Identifier",
                        name: "q",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse for await", () => {
        assert.match<Program>(parseScript(`async function f() {
  for await (let x of y);
}`, {next: true}), {
            body: [
                {
                    async: true,
                    body: {
                        body: [
                            {
                                await: true,
                                body: {
                                    type: "EmptyStatement",
                                },
                                left: {
                                    declarations: [
                                        {
                                            id: {
                                                name: "x",
                                                type: "Identifier",
                                            },
                                            init: null,
                                            type: "VariableDeclarator",
                                        },
                                    ],
                                    kind: "let",
                                    type: "VariableDeclaration",
                                },
                                right: {
                                    name: "y",
                                    type: "Identifier",
                                },
                                type: "ForOfStatement",
                            },
                        ],
                        type: "BlockStatement",
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: "f",
                        type: "Identifier",
                    },
                    params: [],
                    type: "FunctionDeclaration",
                },
            ],
            sourceType: "script",
            type: "Program",
        });
    });

    it("should parse \"for (let of of [0]);\"", () => {
        assert.match<Program>(parseScript(`for (let of of [0]); `), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                id: {
                                    type: "Identifier",
                                    name: "of",
                                },
                                init: null,
                            },
                        ],
                        kind: "let",
                    },
                    right: {
                        type: "ArrayExpression",
                        elements: [
                            {
                                type: "Literal",
                                value: 0,
                            },
                        ],
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should parse \"for([{a=0}] of b);\"", () => {
        assert.match<Program>(parseScript(`for([{a=0}] of b);`), {
            type: "Program",
            body: [
                {
                    type: "ForOfStatement",
                    left: {
                        type: "ArrayPattern",
                        elements: [
                            {
                                type: "ObjectPattern",
                                properties: [
                                    {
                                        type: "Property",
                                        key: {
                                            type: "Identifier",
                                            name: "a",
                                        },
                                        computed: false,
                                        value: {
                                            type: "AssignmentPattern",
                                            left: {
                                                type: "Identifier",
                                                name: "a",
                                            },
                                            right: {
                                                type: "Literal",
                                                value: 0,
                                            },
                                        },
                                        kind: "init",
                                        method: false,
                                        shorthand: true,
                                    },
                                ],
                            },
                        ],
                    },
                    right: {
                        type: "Identifier",
                        name: "b",
                    },
                    body: {
                        type: "EmptyStatement",
                    },
                    await: false,
                },
            ],
            sourceType: "script",
        });
    });

    it("should throw \"for (let x = 1 of y);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for (let x = 1 of y);`); });
    });

    it("should throw \"for (var {x} = y of z);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for (var {x} = y of z);`); });
    });

    it("should throw \"for(var a = 0 of b);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(var a = 0 of b);`); });
    });

    it("should throw \"for (const let of y);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for (const let of y);`); });
    });

    it("should throw \"for (const of 42);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for (const of 42);`); });
    });

    it("should throw \"for(let a = 0 of b);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(let a = 0 of b);`); });
    });

    it("should throw \"for(var a of b, c);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(var a of b, c);`); });
    });

    it("should throw \"for(a of b, c);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(a of b, c);`); });
    });

    it("should throw \"for ([(p, q), r] of foo);\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for ([(p, q), r] of foo);`); });
    });

    it("should throw on \"for(a of b) function c(){}\"", () => {
        assert.throws(SyntaxError, () => { parseScript(`for(a of b) function c(){}`); });
    });
});
