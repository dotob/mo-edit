pdc = require 'pdc'
fs = require 'fs'

html = fs.readFileSync 'bla.html'
pdc html, 'html', 'docx', ['-o blabla.docx'],  (err, result) ->
  if err
    throw err;
  console.log result 
