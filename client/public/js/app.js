(function() {
  var app, controllers, services;

  app = angular.module('moedit.App', ['angularMoment', 'ipCookie', 'ngDialog', 'ngSanitize', 'ui.router', 'angularSpinner', 'MessageCenterModule', 'moedit.Controllers', 'moedit.Services', 'textAngular', 'ui.sortable']);

  controllers = angular.module('moedit.Controllers', []);

  services = angular.module('moedit.Services', []);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLDBCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQU8sQ0FBQyxNQUFSLENBQWdCLFlBQWhCLEVBQTZCLENBQ2pDLGVBRGlDLEVBRWpDLFVBRmlDLEVBR2pDLFVBSGlDLEVBSWpDLFlBSmlDLEVBS2pDLFdBTGlDLEVBTWpDLGdCQU5pQyxFQU9qQyxxQkFQaUMsRUFRaEMsb0JBUmdDLEVBU2hDLGlCQVRnQyxFQVVoQyxhQVZnQyxFQVdoQyxhQVhnQyxDQUE3QixDQUFOLENBQUE7O0FBQUEsRUFnQkEsV0FBQSxHQUFjLE9BQU8sQ0FBQyxNQUFSLENBQWdCLG9CQUFoQixFQUFxQyxFQUFyQyxDQWhCZCxDQUFBOztBQUFBLEVBbUJBLFFBQUEsR0FBVyxPQUFPLENBQUMsTUFBUixDQUFnQixpQkFBaEIsRUFBa0MsRUFBbEMsQ0FuQlgsQ0FBQTtBQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcCA9IGFuZ3VsYXIubW9kdWxlKCdtb2VkaXQuQXBwJywgW1xyXG5cdCdhbmd1bGFyTW9tZW50J1xyXG5cdCdpcENvb2tpZSdcclxuXHQnbmdEaWFsb2cnXHJcblx0J25nU2FuaXRpemUnXHJcblx0J3VpLnJvdXRlcidcclxuXHQnYW5ndWxhclNwaW5uZXInXHJcblx0J01lc3NhZ2VDZW50ZXJNb2R1bGUnXHJcbiAgJ21vZWRpdC5Db250cm9sbGVycydcclxuICAnbW9lZGl0LlNlcnZpY2VzJ1xyXG4gICd0ZXh0QW5ndWxhcidcclxuICAndWkuc29ydGFibGUnXHJcbiMgICdtb2VkaXQuTG9nZ2luZydcclxuXSlcclxuXHJcbiMgY29udHJvbGxlcnMsIGluaXRcclxuY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnbW9lZGl0LkNvbnRyb2xsZXJzJywgW10pXHJcblxyXG4jIHNlcnZpY2VzLCBpbml0XHJcbnNlcnZpY2VzID0gYW5ndWxhci5tb2R1bGUoJ21vZWRpdC5TZXJ2aWNlcycsIFtdKVxyXG4iXX0=