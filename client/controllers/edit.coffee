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
	'ngDialog'
	($scope, $log, $q, $state, $stateParams, $window, Socket, SweetAlert, Focus, Data, messageCenterService, ngDialog) ->

		# autosave
		autoSaveCurrentDocument = () ->
			$log.debug "autosave"
			$scope.saveDocument($scope.currentDocument, "Automatisch gespeichert")
		
		autoSave = _.debounce autoSaveCurrentDocument, 5000

		$scope.selectChapter = (chapter) ->
			if $scope.chapterWatch?
				$scope.chapterWatch() # remove watch
			$log.info "select chapter #{chapter.title}:#{chapter.selected}"
			$scope.currentChapter = chapter
			for c in $scope.currentDocument.chapters
				if c._id == chapter._id
					c.selected = true
				else
					c.selected = false
			$scope.chapterWatch = $scope.$watch 'currentChapter.content', chapterchange, true

		$scope.selectComment = (comment) ->
			$log.info "select comment #{comment.text}:#{comment.selected}"
			$scope.currentComment = comment
			for c in $scope.currentChapter.comments
				if c.key == comment.key
					c.selected = true
				else
					c.selected = false

		chapterchange = (newValue, oldValue) ->
			$log.debug "changed"
			console.log $scope.currentChapter.content
			if newValue != oldValue
				$scope.currentChapter.lastChanged = new Date()
				removeMe = []
				for comment in $scope.currentChapter.comments
					if newValue.indexOf(comment.key) < 0
						removeMe.push comment.key
				for r in removeMe
					_.remove($scope.currentChapter.comments, (c) -> c.key == r)
				autoSave()	

		$scope.newComment = (chapter) ->
			comment = 
				author: chance.name()
				key: chance.guid()
				created: new Date()
			chapter.comments.push comment
			autoSave()
			comment

		$scope.getCommentText = (chapter, commentKey) ->
			dialog = ngDialog.open
				template: 'comment-input-dialog'
				scope: $scope
			dialog.closePromise.then (tmp) ->
				console.log "key: #{commentKey}, text: #{$scope.newCommentText}"
				comment = _.find(chapter.comments, (c) -> c.key == commentKey)
				comment.text = $scope.newCommentText
				autoSave()

		$scope.newChapter = (document) ->
			document.chapters.push
				title: $scope.newChapterTitle
				author: chance.name()
				lastChanged: new Date()
				state: 'ONGOING'
				comments: []
				version: 1
			$scope.newChapterTitle = ''
			$scope.selectChapter(_.last document.chapters)
			autoSave()

		$scope.saveDocument = (document, msg = "Gutachten erfolgreich gespeichert") ->
			Data.saveDocument(document).then (response) ->
				if response.status != 200
					messageCenterService.add('danger', msg, {html: true});
				else
					messageCenterService.add('success', msg, {timeout: 2000, html: true});

		$scope.docStateChanged = (val) ->
			console.log $scope.currentDocument.state

		if $stateParams.docid
			Data.document($stateParams.docid).then (document) ->
				console.dir document
				$scope.currentDocument = document
				$scope.selectChapter($scope.currentDocument.chapters[0])
		else
			$state.go 'list'
]
