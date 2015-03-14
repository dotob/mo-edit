controllers = angular.module('moedit.Controllers')
controllers.controller 'listController', [
	'$scope'
	'$log'
	'$q'
	'$state'
	'$window'
	'moedit.Socket'
	'moedit.SweetAlert'
	'moedit.Focus'
	'moedit.Data'
	($scope, $log, $q, $state, $window, Socket, SweetAlert, Focus, Data) ->

		$scope.newDocument = () ->
			SweetAlert.info 'kommt noch'

		$scope.deleteDocument = (document) ->
			Data.deleteDocument(document).then (i) ->
				getAllDocuments()

		$scope.openDocument = (document) ->
			$state.go 'edit', {docid: document._id}

		$scope.docLastChangeDate = (document) ->
			_(document.chapters).max((c) -> moment(c.lastChanged)).value().lastChanged

		getAllDocuments = () ->
			Data.documents().then (documents) ->
				docsByKey = _.groupBy documents, 'key'
				docsByKeyArray = []
				for k, docs of docsByKey
					docsByKeyArray.push
						key: k
						firstDoc: _.first docs
						docs: docs
						selectedVersion: _.last(_.sortBy docs, 'version')
				console.dir docsByKeyArray
				$scope.docsByKey = docsByKeyArray

		getAllDocuments()
]
