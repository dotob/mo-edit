Pandoc = require './pandoc'
pandoc = new Pandoc
q = require 'q'

DocumentHandling = class DocumentHandling

	constructor: (@models) ->

	createPreview: (docid) ->
		deferred = q.defer()
		console.log "createPreview"
		@getDocument(docid).then (doc) =>
			h = @createHtml(doc)
			deferred.resolve h
		.catch (e) ->
			console.log e
		deferred.promise

	createWord: (docid) ->
		deferred = q.defer()
		@getDocument(docid).then (doc) =>
			console.log "got doc"
			html = @createHtml doc    
			pandoc.createWord(html, docid).then (outname) ->
				deferred.resolve outname
			.catch (e) ->
				console.log e
		.catch (e) ->
			console.log e
		deferred.promise
	
	createHtml: (doc) ->
		html = "<h1>#{doc.title}</h1>\n\n"
		for chapter in doc.chapters
			html += "<h2>#{chapter.title}</h2>\n\n"
			html += "<p>#{chapter.content}</p>\n\n"
		console.log "html: #{html}"
		html
		
	getDocument: (docid) ->
		deferred = q.defer()
		@models.Document.findOne {_id: docid}, (err, doc) ->
			if err
				deferred.reject err
			else
				deferred.resolve doc
		deferred.promise

module.exports = DocumentHandling
