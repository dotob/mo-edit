app = angular.module('moedit.App')

# routes
app.config ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) ->

	$stateProvider
		.state 'login',
			url: "/login"
			templateUrl: 'partials/login.html'
			controller: 'loginController'
		
		.state 'logout',
			url: "/logout"

		.state 'edit',
			url: "/edit"
			templateUrl: 'partials/edit.html'
			controller: 'editController'


	$urlRouterProvider.otherwise('/login');

	$locationProvider.html5Mode(true)
]

# take not logged in user to login
app.run ['$rootScope', '$state', '$log', 'moedit.Auth', ($rootScope, $state, $log, Auth) ->
	$rootScope.$on "$stateChangeStart", (event, toState, toParams, fromState, fromParams) ->
		$log.info "statechange from: #{fromState.name} to: #{toState.name}"
		if toState.name != 'login'
			if !Auth.isLoggedIn()
				$log.info "not logged in for that state. goto login."
				event.preventDefault()
				$state.go 'login'

			if toState.name == 'logout'
				$log.info "logout and goto login"
				Auth.logout()
				event.preventDefault()
				$state.go 'login'
]