module.exports = {
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "commonjs": true,
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"], 
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "parser": "@babel/eslint-parser",
};