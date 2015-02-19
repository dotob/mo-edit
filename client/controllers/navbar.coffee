controllers = angular.module('moedit.Controllers')
controllers.controller 'navbarController', [
	'$rootScope'
	'$scope'
	'$log'
	'$state'
	($rootScope, $scope, $log, $state) ->

		$rootScope.toggleFullscreen = () ->
			$rootScope.fullscreen = !$rootScope.fullscreen
			$log.info "set fullscreen to #{$rootScope.fullscreen}"
]
