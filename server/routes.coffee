path         = require 'path'
fs           = require 'fs'

module.exports = (app, models, basedir) ->

	# init documenthandling
	DocumentHandling = require './documenthandling'
	documentHandling = new DocumentHandling(models)

	sendToClient = (req, res) ->
		console.log "requested #{req.url}"
		res.sendFile path.join basedir, 'client', 'public', 'index.html'
	# basic route
	app.get '/edit/*', sendToClient
	app.get '/list', sendToClient
	app.get '/login', sendToClient
		

	# logger route, for saving logmessages from client
	app.post '/logger', (req, res) ->
		console.log JSON.stringify(req.body)
		res.sendStatus(200)

	# preview route
	app.get '/preview/:docid', (req, res) ->
		console.log "requested preview doc #{req.params.docid}"
		console.log documentHandling.createPreview(req.params.docid).then (h) ->
			res.send h

	# download route
	app.get '/download/word/:docid', (req, res) ->
		console.log "requested download doc #{req.params.docid}"
		documentHandling.createWord(req.params.docid).then (filename) ->
			res.sendFile path.join(basedir, filename)

	app.get '/documents', (req, res) ->
		console.log 'request all documents'
		models.Document.find (err, docs) ->
			res.send docs 
		
	app.get '/documents/:docid', (req, res) ->
		console.log "request document with id: #{req.params.docid}"
		models.Document.findById req.params.docid, (err, doc) ->
			res.send doc  

	app.put '/documents/:docid', (req, res) ->
		console.log "put doc #{req.params.docid}"
		models.Document.findByIdAndUpdate req.params.docid, req.body, (err, dbdoc) ->
			if err?
				console.log "error while saving: #{err}"
				res.sendStatus(500)
			else
				console.log "saved doc #{req.params.docid} successfully"
				res.sendStatus(200)

	app.delete '/documents/:docid', (req, res) ->
		console.log "delete doc #{req.params.docid}"
		models.Document.findById req.params.docid, (err, dbdoc) ->
			if err?
				console.log "error while saving: #{err}"
			else
				dbdoc.remove (err) ->
					if err?
						console.log "error while saving: #{err}"
					else
						console.log "successfully removed doc: #{req.params.docid}"


