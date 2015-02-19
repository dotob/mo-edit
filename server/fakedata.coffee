_ = require 'lodash'
Chance = require 'chance'
chance = new Chance
m = require 'mongoose'
m.connect 'mongodb://localhost/moedit'
models = require('./models')(m)

save = (model, docsArray, cb) ->
	console.log "insert #{JSON.stringify(docsArray)}"
	model.collection.insert docsArray, (err, data) ->
		if err?
			console.log "error: #{err}"
		else
			docsArray = data
			console.dir docsArray
			cb()
		return

models.Document.find {}, (err, doc) ->
	if doc? and !_.isEmpty doc
		console.log 'NOOOO FAKEDATA'
	else
		console.log 'CREATE FAKEDATA'
		authors = []
		comments = []
		chapters = []
		documents = []

		for i in [0..5]
			authors.push 
				name: chance.name()
				role: _.sample ['MASTER', 'SLAVE']
		save models.Author, authors, () ->
			for j in [0..5]
				comments.push 
					author: _.sample authors
					text: _.sample ['super absatz', 'mist, nochmal', 'guck ich mir nochmal an']
					created: new Date()
			save models.Comment, comments, () ->
				for k in [0..10]
					chapters.push 
						author: _.sample authors
						title: chance.word()
						content: chance.paragraph()
						lastChanged: new Date()
						state: _.sample ['ONGOING', 'FINISHED']
						comments: _.sample comments
						version: 1
				save models.Chapter, chapters, () ->
					for l in [0..3]
						documents.push 
							headAuthor: _.sample authors
							title: chance.word()
							chapters: _.sample chapters, 2
							state: _.sample ['ONGOING', 'FINISHED']
					save models.Document, documents, () ->
						console.log "FINISHED INSERT FAKEDATA"
