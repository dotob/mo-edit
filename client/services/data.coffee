angular.module('moedit.Services').factory 'moedit.Data', [ 
	'$rootScope'
	'$log'
	'$http'
	'$q'
	($rootScope, $log, $http, $q) ->

		self =
			documents: ->
				deferred = $q.defer()
				$http.get('/documents').then (response) ->
					deferred.resolve response.data
				deferred.promise
			
			document: (docid) ->
				deferred = $q.defer()
				$http.get("/documents/#{docid}").then (response) ->
					deferred.resolve response.data
				deferred.promise
			
			saveDocument: (doc) ->
				if doc._id?
					$http.put "/documents/#{doc._id}", doc
				else
					$http.put "/documents/", doc

			deleteDocument: (doc) ->
				$http.delete "/documents/#{doc._id}"

			authors: ->


		self
]