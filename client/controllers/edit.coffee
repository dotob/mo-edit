controllers = angular.module('moedit.Controllers')
controllers.controller 'editController', [
	'$scope'
	'$log'
	'$q'
	'$state'
	'moedit.Socket'
	'moedit.SweetAlert'
	'moedit.Focus'
	'Restangular'
	($scope, $log, $q, $state, Socket, SweetAlert, Focus, Restangular) ->

		$scope.todo = ""

]
