const expo = require('eslint-config-expo/flat');

module.exports = [
  ...expo,
  {
    ignores: ['dist/*', '.expo/*', 'scripts/nativewind-v5-doc.txt'],
  },
];
