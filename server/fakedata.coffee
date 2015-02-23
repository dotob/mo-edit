_ = require 'lodash'
Chance = require 'chance'
chance = new Chance

module.exports = (models) ->

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
			authors = [chance.name(), chance.name(), chance.name()]
			comments = []
			chapters = []
			documents = []

			for j in [0..5]
				comments.push 
					author: _.sample authors
					text: _.sample ['super absatz', 'mist, nochmal', 'guck ich mir nochmal an']
					created: new Date()
			save models.Comment, comments, () ->
				for k in [0..10]
					chapters.push 
						author: _.sample authors
						number: "#{k}"
						title: chance.word()
						content: chance.paragraph()
						lastChanged: new Date()
						state: _.sample ['ONGOING', 'FINISHED']
						comments: _.sample comments
						version: 1
				save models.Chapter, chapters, () ->
					for m in [0..3]
						documents.push 
							key: "#{chance.integer({min: 100000, max: 999999})}"
							headAuthor: _.sample authors
							title: chance.word()
							chapters: _.sample chapters, 2
							patient:
								name: chance.name()
								dob: chance.birthday()
							state: _.sample ['ONGOING', 'FINISHED']
					n = 1
					for d in documents
						d.number = "#{n}"
						n += 1
					save models.Document, documents, () ->
						console.log "FINISHED INSERT FAKEDATA"
