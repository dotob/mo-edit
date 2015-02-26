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
			Data.documents().then (documents) ->
				$scope.documents = documents
				
		$scope.openDocument = (document) ->
			$state.go 'edit', {docid: document._id}

		$scope.docLastChangeDate = (document) ->
			_(document.chapters).max((c) -> moment(c.lastChanged)).value().lastChanged

		Data.documents().then (documents) ->
			$scope.documents = documents

]
