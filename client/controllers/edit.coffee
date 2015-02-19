controllers = angular.module('moedit.Controllers')
controllers.controller 'editController', [
	'$scope'
	'$log'
	'$q'
	'$state'
	'moedit.Socket'
	'moedit.SweetAlert'
	'moedit.Focus'
	'moedit.Data'
	($scope, $log, $q, $state, Socket, SweetAlert, Focus, Data) ->

		$log.info 'editController hello world'
		Data.documents().then (documents) ->
			console.table documents
			$scope.documents = documents
			$scope.currentDocument = documents[0]

		$scope.selectChapter = (chapter) ->
			$log.info "select chapter #{chapter.title}:#{chapter.selected}"
			$log.debug chapter.content
			$scope.currentChapter = chapter
			for c in $scope.currentDocument.chapters
				if c._id == chapter._id
					c.selected = true
				else
					c.selected = false
			

]
