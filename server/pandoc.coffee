pdc = require 'pdc'
fs = require 'fs'
q = require 'q'

Pandoc = class Pandoc
	test: () ->
		html = fs.readFileSync 'server/test.html'
		pdc html, 'html', 'docx', ['-o',  'blabla.docx', '--reference-docx', 'server/template/template.docx'],  (err, result) ->
			if err
				throw err;
			console.log result 

	createWord: (html, outname) ->
		deferred = q.defer()
		filename = "docs/#{outname}.docx"
		pdc html, 'html', 'docx', ['-o',  filename, '--reference-docx', 'server/template/template.docx'],  (err, result) ->
			if err
				deferred.reject err
			else
				deferred.resolve filename
		deferred.promise

module.exports = Pandoc