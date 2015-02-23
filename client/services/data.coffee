angular.module('moedit.App').config ['RestangularProvider', (RestangularProvider) ->
	RestangularProvider.setBaseUrl '/api'
	RestangularProvider.setRestangularFields { id: "_id"}
	# add a response intereceptor
	RestangularProvider.addResponseInterceptor (data, operation, what, url, response, deferred) ->
		extractedData = undefined
		# .. to look for getList operations
		if operation == 'getList'
			extractedData = data.payload
		else
			extractedData = data.payload
		extractedData
]

angular.module('moedit.Services').factory 'moedit.Data', [ 
	'$rootScope'
	'$log'
	'Restangular'
	($rootScope, $log, Restangular) ->

		baseDocuments = Restangular.all('document')

		self =
			documents: ->
				baseDocuments.getList()
				
			saveDocument: (document) ->
				document.put()
				console.log "put document"

			authors: ->


		self
]