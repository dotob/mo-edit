app = angular.module('moedit.App')
app.config ($provide) ->
	$provide.decorator 'taOptions', [
		'taRegisterTool'
		'$delegate'
		(taRegisterTool, taOptions) ->
			console.log "================================="
			# $delegate is the taOptions we are decorating
			# register the tool with textAngular
			taRegisterTool 'addComment',
				buttontext: 'Kommentar'
				action: ->
					sel = document.getSelection().focusNode.data
					console.dir sel
					myScope = @.$parent.$parent
					myScope.createComment(myScope.currentChapter).then (key) =>
						console.log key
						if key?
							#@$editor().wrapSelection 'insertHTML', "<span class='#{key}'>#{sel}</span>"
							document.execCommand 'insertHTML', false, "<span class='#{key}'>#{sel}</span>"
							console.log "wrapped"
			# add the button to the default toolbar definition
			taOptions.toolbar[1].push 'addComment'
			taOptions
	]