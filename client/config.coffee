app = angular.module('moedit.App')
app.config ($provide) ->
	$provide.decorator 'taOptions', [
		'taRegisterTool'
		'$delegate'
		(taRegisterTool, taOptions) ->
			colors = ['red', 'yellow', 'blue', 'green', 'gray']
			console.log "================================="
			# $delegate is the taOptions we are decorating
			# register the tool with textAngular
			taRegisterTool 'addComment',
				buttontext: 'Kommentar'
				action: ->
					sel = document.getSelection().focusNode.data
					myScope = @.$parent.$parent
					comment = myScope.newComment(myScope.currentChapter)

					@$editor().wrapSelection 'insertHTML', "<span id='#{comment.key} class='comment'>#{sel}</span>"

					myScope.getCommentText(myScope.currentChapter, comment.key)
					console.log "wrapped"
			# add the button to the default toolbar definition
			taOptions.toolbar[1].push 'addComment'
			taOptions
	]