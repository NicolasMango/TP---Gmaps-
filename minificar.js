var compressor = require('node-minify');
// Using Google Closure Compiler 
compressor.minify({
  compressor: 'uglifyjs',
  input: 'js/script.js',
  output: 'js/script_uglificado.js',
  callback: function (err, min) {}
});
