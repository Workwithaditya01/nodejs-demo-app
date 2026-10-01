const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
{
ignores: [
"node_modules/",
"coverage/",
"dist/",
"eslint.config.js"
]
},

js.configs.recommended,

// Node.js application files
{
files: [
"index.js"
],


languageOptions: {
  ecmaVersion: "latest",
  sourceType: "commonjs",

  globals: {
    ...globals.node
  }
},

rules: {
  "no-console": "off"
}


},

// Jest test files
{
files: [
"**/*.test.js"
],

languageOptions: {
  ecmaVersion: "latest",
  sourceType: "commonjs",

  globals: {
    ...globals.node,
    ...globals.jest
  }
},

rules: {
  "no-console": "off"
}


},

// Browser JavaScript
{
files: [
"public/**/*.js"
],

languageOptions: {
  ecmaVersion: "latest",
  sourceType: "script",

  globals: {
    ...globals.browser
  }
},

rules: {
  "no-unused-vars": "off",
  "no-console": "off"
}


}
];
