_ = require 'lodash'
Chance = require 'chance'
chance = new Chance
m = require 'mongoose'
m.connect 'mongodb://localhost/moedit'
models = require('./models')(m)

models.Document.find {}, (err, doc) ->
	if doc?
		console.log 'NOOOO FAKEDATA'
	else
		console.log 'CREATE FAKEDATA'
		authors = []
		for i in [0..5]
			a = new models.Author
				name: chance.name()
				role: _.sample ['MASTER', 'SLAVE']
			a.save (err, data) ->
				if !err
					authors.push a
					console.log "saved #{data}"
				else
					console.log err

		chapters = []
		for i in [0..10]
			c = new models.Chapter
				author: _.sample authors
				title: chance.word()
				content: chance.paragraph()
				lastChanged: new Date()
				state: _.sample ['ONGOING', 'FINISHED']
			c.save (err, data) ->
				if !err
					chapters.push c
					console.log "saved #{data}"
				else
					console.log err

		documents = []
		for i in [0..3]
			c = new models.Document
				headAuthor: _.sample authors
				title: chance.word()
				chapters: _.sample chapters, 2
				state: _.sample ['ONGOING', 'FINISHED']
			c.save (err, data) ->
				if !err
					documents.push c
					console.log "saved #{data}"
				else
					console.log err
