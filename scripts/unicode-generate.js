#!/usr/bin/env node
"use strict"

// TODO: add tests for this
//
// Note: when editing the output, check the output to ensure it's actually valid asm.js:
// https://anvaka.github.io/asmalidator/

// This generates delta-encoded tables with a common lookup function aware of the encoding to
// minimize the number of comparisons required, especially for the common case. I'd rather not have
// a very slow runtime test.
//
// Note that this has a dependency on `unicode-9.0.0` if executed directly.
//
// `generate(opts)`, default-exported, generates a source from one or more lists of code points and
// associated exports.
//
// It accepts these named options:
//
// - `eval` - (optional) boolean, `true` if this should emit a JS body
// - `tables` - (optional) mapping of name + stored table
// - `write` - promise-returning function called on each written string
// - `exports` - mapping of name + list of functions returning only *positive* code points
//
// To use this, you do something like this:
//
// ```js
// import {isIDContinue} from "./unicode-generated";
//
// if (isIDContinue(charCode)) {
//     doThings();
// }
// ```
//
// The format used for the code lists (stored as a shared typed array) is this:
//
// - `prev`: implicit counter starting at `0`
// - `-code`: equality with `prev + code`
// - `start, delta`: between `prev + start` and `prev + start + delta`
//
// The `test` helper does this in a very highly optimized way, with some various hacks to reduce
// branching, and it targets ASM.js for speed, so it gets optimized early.
//
// The entire process is done asynchronously and in serial, to avoid blowing up the RAM. It has a
// few GC hints, too, to keep memory down.

// GC hint
function gc() {
    return new Promise(resolve => setTimeout(resolve, 10))
}

function serialize(codes, values) {
    const table = Array.from(values).sort((a, b) => a - b)
    const offset = codes.length

    debugger
    if (table.length === 0) return offset
    let top = offset
    let prev = table[0]
    codes.push(-prev)

    for (let i = 1; i < table.length; i++) {
        const child = table[i]
        if (codes[top] < 0) {
            if (child !== prev + 1) {
                codes.push(prev - child)
                top++
            } else {
                codes[top] = -codes[top]
                codes.push(1)
                top++
            }
        } else if (child !== prev + 1) {
            codes.push(prev - child)
            top++
        } else {
            codes[top]++
        }
        prev = child;
    }

    return offset
}

exports.generate = generate
async function generate(opts) {
    const ts = str => opts.eval ? "" : str
    const codes = []

    await opts.write(`/* tslint:disable */
"use strict";
`)

    for (const exported in opts.exports) {
        if (hasOwnProperty.call(opts.exports, exported)) {
            const items = opts.exports[exported]
            const values = new Set()

            for (const makeList of items) {
                for (const item of makeList()) {
                    if (item === 0) throw new RangeError("Only positive values are allowed")
                    values.add(item)
                }
                await gc()
            }

            const offset = serialize(codes, values)
            if (opts.tables != null) opts.tables[exported] = codes.slice(offset)

            await opts.write(`
function ${exported}(code${ts(":number")}) {
    return _.test(${
        offset * Int32Array.BYTES_PER_ELEMENT
    },${
        codes.length * Int32Array.BYTES_PER_ELEMENT
    },code)!==0;
}
`)
        }
    }

    const size = Math.max(4096, 1 << (32 - Math.clz32(codes.length) + 4))

    await opts.write(`
var _b=new ArrayBuffer(${size}),
_=(function(s${ts(":any")},f${ts(":any")},h${ts(":any")}) {
    "use asm";
    var t${ts(":Int32Array")}=new s.Int32Array(h);

    function test(i${ts(":number")},e${ts(":number")},s${ts(":number")}) {
        i=i|0; e=e|0; s=s|0;
        var a=0;
        while ((i|0)<(e|0)) {
            a=t[i>>2]|0;
            i=i+4|0;
            if ((a|0)>0) {
                s=s-a|0;
                if ((s|0)<0) return 0;
                s=s-(t[i>>2]|0)|0;
                if ((s|0)<=0) return 1;
                i=i+4|0;
            } else {
                s=s+a|0;
                if ((s|0)==0) return 1;
                if ((s|0)<0) return 0;
            }
        }
        return 0;
    }

    return {test: test};
})({Int32Array},{},_b),
_v=new Int32Array(_b),_c=[${codes}],_i=0;
for(;_i<${codes.length};_v[_i]=_c[_i++]);

${opts.eval ? "return" : "export"} {${Object.keys(opts.exports)}};
`)
}

// Edit these here to change the options when run directly.

if (require.main === module) {
    const path = require("path")
    const load = name => () => {
        const mod = require.resolve(`unicode-9.0.0/${name}/code-points`)
        const list = require(mod)

        // Keep this out of persistent memory
        delete require.cache[mod]
        return list
    }

    const stream = require("fs").createWriteStream(
        path.resolve(__dirname, "../src/unicode-generated.ts")
    )

    generate({
        write: str => new Promise((resolve, reject) => {
            stream.write(str, err => err != null ? reject(err) : resolve())
        }),
        exports: {
            isIDContinue: [load("Binary_Property/ID_Continue")],
            isIDStart: [load("Binary_Property/ID_Start")],
        },
    })
    // Node only started exiting on collected rejections in v8
    .catch(e => process.nextTick(() => { throw e }))
}
