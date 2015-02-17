angular.module("moedit.Services").factory "moedit.Data", [ 
	'$rootScope'
	'$log'
	($rootScope, $log) ->

		_authors = []
		_documents = []

		self =
			documents: ->
				if !_authors or _.isEmpty(_authors)
					for i in [0..3]
						d = 
							creator: _.sample(@authors)
							state: _sample(['ONGOING', 'FINISHED'])
						_documents.push d
				_documents

			authors: ->
				if !_authors or _.isEmpty(_authors)
					for i in [0..5]
						a = 
							name: chance.name()
							role: _sample(['MASTER', 'WRITER'])
						_authors.push a
				_authors


		self
]