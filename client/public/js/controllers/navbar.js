(function() {
  var controllers;

  controllers = angular.module('moedit.Controllers');

  controllers.controller('navbarController', [
    '$rootScope', '$scope', '$log', '$state', function($rootScope, $scope, $log, $state) {
      return $rootScope.toggleFullscreen = function() {
        $rootScope.fullscreen = !$rootScope.fullscreen;
        return $log.info("set fullscreen to " + $rootScope.fullscreen);
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL25hdmJhci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBTyxDQUFDLE1BQVIsQ0FBZ0Isb0JBQWhCLENBQWQsQ0FBQTs7QUFBQSxFQUNBLFdBQVcsQ0FBQyxVQUFaLENBQXdCLGtCQUF4QixFQUEyQztJQUN6QyxZQUR5QyxFQUV6QyxRQUZ5QyxFQUd6QyxNQUh5QyxFQUl6QyxRQUp5QyxFQUsxQyxTQUFDLFVBQUQsRUFBYSxNQUFiLEVBQXFCLElBQXJCLEVBQTJCLE1BQTNCLEdBQUE7YUFFQyxVQUFVLENBQUMsZ0JBQVgsR0FBOEIsU0FBQSxHQUFBO0FBQzdCLFFBQUEsVUFBVSxDQUFDLFVBQVgsR0FBd0IsQ0FBQSxVQUFXLENBQUMsVUFBcEMsQ0FBQTtlQUNBLElBQUksQ0FBQyxJQUFMLENBQVcsb0JBQUEsR0FBb0IsVUFBVSxDQUFDLFVBQTFDLEVBRjZCO01BQUEsRUFGL0I7SUFBQSxDQUwwQztHQUEzQyxDQURBLENBQUE7QUFBQSIsImZpbGUiOiJjb250cm9sbGVycy9uYXZiYXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjb250cm9sbGVycyA9IGFuZ3VsYXIubW9kdWxlKCdtb2VkaXQuQ29udHJvbGxlcnMnKVxuY29udHJvbGxlcnMuY29udHJvbGxlciAnbmF2YmFyQ29udHJvbGxlcicsIFtcblx0JyRyb290U2NvcGUnXG5cdCckc2NvcGUnXG5cdCckbG9nJ1xuXHQnJHN0YXRlJ1xuXHQoJHJvb3RTY29wZSwgJHNjb3BlLCAkbG9nLCAkc3RhdGUpIC0+XG5cblx0XHQkcm9vdFNjb3BlLnRvZ2dsZUZ1bGxzY3JlZW4gPSAoKSAtPlxuXHRcdFx0JHJvb3RTY29wZS5mdWxsc2NyZWVuID0gISRyb290U2NvcGUuZnVsbHNjcmVlblxuXHRcdFx0JGxvZy5pbmZvIFwic2V0IGZ1bGxzY3JlZW4gdG8gI3skcm9vdFNjb3BlLmZ1bGxzY3JlZW59XCJcbl1cbiJdfQ==