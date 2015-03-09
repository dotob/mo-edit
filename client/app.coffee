app = angular.module('moedit.App', [
	'angularMoment'
	'ipCookie'
	'ngDialog'
	'ngSanitize'
	'ui.router'
	'angularSpinner'
	'MessageCenterModule'
	'moedit.Controllers'
	'moedit.Services'
	'textAngular'
	'ui.sortable'
#  'moedit.Logging'
])

# controllers, init
controllers = angular.module('moedit.Controllers', [])

# services, init
services = angular.module('moedit.Services', [])
