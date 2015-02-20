pdc = require 'pdc'
fs = require 'fs'

html = fs.readFileSync 'server/test.html'
pdc html, 'html', 'docx', ['-o',  'blabla.docx', '--reference-docx', 'server/template/template.docx'],  (err, result) ->
  if err
    throw err;
  console.log result 
