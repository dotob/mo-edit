controllers = angular.module('moedit.Controllers')
controllers.controller 'editController', [
	'$scope'
	'$log'
	'$q'
	'$state'
	'moedit.Socket'
	'moedit.SweetAlert'
	'moedit.Focus'
	($scope, $log, $q, $state, Socket, SweetAlert, Focus) ->

		$scope.todo = ""

]
