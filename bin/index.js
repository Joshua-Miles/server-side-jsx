#!/usr/bin/env node

const Path = require('path')
require("@babel/register")({
    "plugins": [
        ["@babel/plugin-transform-react-jsx", {
            "runtime": "automatic", "importSource": Path.join(__dirname, '..', 'lib')
        }],
        "babel-plugin-transform-es2015-modules-commonjs"
    ]
})

require(Path.join(process.cwd(), process.argv[2]))