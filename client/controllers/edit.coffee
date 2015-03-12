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
			$log.info "select chapter #{chapter.title}:#{chapter.selected}"
			unhighlightAllComments()
			if $scope.chapterWatch?
				$scope.chapterWatch() # remove watch
			$scope.currentChapter = chapter
			for c in $scope.currentDocument.chapters
				if c._id == chapter._id
					c.selected = true
				else
					c.selected = false
			$scope.chapterWatch = $scope.$watch 'currentChapter.content', chapterchange, true

		$scope.selectComment = (comment) ->
			unhighlightComment($scope.currentComment)
			$log.info "select comment: #{comment.text}:#{comment.selected}"
			$scope.currentComment = comment
			for c in $scope.currentChapter.comments
				if c.key == comment.key
					c.selected = true
				else
					c.selected = false
			highlightComment($scope.currentComment)
			return true # this is because angular is complaing about: "Referencing a DOM node in Expression" when just returning something else

		highlightComment = (comment) ->
			if comment?
				$("##{comment.key}").addClass('comment-highlight')

		unhighlightComment = (comment) ->
			if comment?
				$("##{comment.key}").removeClass('comment-highlight')

		unhighlightAllComments = () ->
			$(".comment").removeClass('comment-highlight')

		chapterchange = (newValue, oldValue) ->
			$log.debug "changed:: #{$scope.currentChapter.content}"
			if newValue != oldValue
				$scope.currentChapter.lastChanged = new Date()
				if $scope.commentRemoval
					removeMe = []
					for comment in $scope.currentChapter.comments
						if newValue.indexOf(comment.key) < 0
							removeMe.push comment
					for r in removeMe
						$scope.deleteComment r
					autoSave()	

		$scope.newComment = (chapter, commentKey) ->
			dialog = ngDialog.open
				template: 'comment-input-dialog'
				scope: $scope
			dialog.closePromise.then (dialogData) ->
				console.log "key: #{commentKey}, text: #{dialogData.value}"
				comment = 
					author: chance.name()
					key: commentKey
					created: new Date()
					text: dialogData.value
				console.dir chapter
				chapter.comments.push comment
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

		$scope.deleteComment = (comment) ->
			unhighlightComment(comment)
			r = new RegExp "<span id=\"#{comment.key}\" class=\".*?\">"
			$scope.currentChapter.content.replace r, '', 'g'
			_.remove($scope.currentChapter.comments, (c) -> c.key == comment.key)
			autoSave()

		$scope.editComment = (comment) -> 
			$scope.newCommentText = comment.text
			dialog = ngDialog.open
				template: 'comment-input-dialog'
				scope: $scope
			dialog.closePromise.then (dialogData) ->
				console.log "key: #{comment.key}, text: #{dialogData.value}"
				#comment = _.find($scope.currentChapter.comments, (c) -> c.key == comment.key)
				comment.text = dialogData.value
				autoSave()

		# fix routing if someone comes here with no or non existing docid
		if $stateParams.docid
			Data.document($stateParams.docid).then (document) ->
				console.dir document
				$scope.currentDocument = document
				$scope.selectChapter($scope.currentDocument.chapters[0])
		else
			$state.go 'list'
]
