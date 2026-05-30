module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        jest: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        afterAll: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
