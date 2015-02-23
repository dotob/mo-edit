controllers = angular.module('moedit.Controllers')
controllers.controller 'editController', [
	'$scope'
	'$log'
	'$q'
	'$state'
	'$stateParams'
	'$window'
	'moedit.Socket'
	'moedit.SweetAlert'
	'moedit.Focus'
	'moedit.Data'
	'messageCenterService'
	($scope, $log, $q, $state, $stateParams, $window, Socket, SweetAlert, Focus, Data, messageCenterService) ->

		# autosave
		autoSaveCurrentDocument = () ->
			$log.debug "autosave"
			$scope.saveDocument($scope.currentDocument, "Automatisch gespeichert")
		
		autoSave = _.debounce autoSaveCurrentDocument, 5000

		$scope.selectChapter = (chapter) ->
			if $scope.chapterWatch?
				$scope.chapterWatch() # remove watch
			$log.info "select chapter #{chapter.title}:#{chapter.selected}"
			$log.debug chapter.content
			$scope.currentChapter = chapter
			for c in $scope.currentDocument.chapters
				if c._id == chapter._id
					c.selected = true
				else
					c.selected = false
			$scope.chapterWatch = $scope.$watch 'currentChapter.content', (val) ->
				$log.debug "changed"
				$scope.currentChapter.lastChanged = new Date()
				autoSave()

		$scope.newComment = (chapter) ->
			SweetAlert.info 'kommt noch'

		$scope.newChapter = (document) ->
			SweetAlert.info 'kommt noch'

		$scope.showPreview = (document) ->
			$window.open "/preview/#{document._id}"

		$scope.downloadWord = (document) ->
			$window.open "/download/word/#{document._id}"

		$scope.saveDocument = (document, msg = "Gutachten erfolgreich gespeichert") ->
			Data.saveDocument(document).then (response) ->
				if response.status != 200
					messageCenterService.add('danger', msg, {html: true});
				else
					messageCenterService.add('success', msg, {timeout: 2000, html: true});

		Data.document($stateParams.docid).then (document) ->
			console.dir document
			$scope.currentDocument = document
			$scope.selectChapter($scope.currentDocument.chapters[0])
			

]
