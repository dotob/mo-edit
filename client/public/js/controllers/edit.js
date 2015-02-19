(function() {
  var controllers;

  controllers = angular.module('moedit.Controllers');

  controllers.controller('editController', [
    '$scope', '$log', '$q', '$state', 'moedit.Socket', 'moedit.SweetAlert', 'moedit.Focus', 'moedit.Data', function($scope, $log, $q, $state, Socket, SweetAlert, Focus, Data) {
      $log.info('editController hello world');
      Data.documents().then(function(documents) {
        console.table(documents);
        $scope.documents = documents;
        return $scope.currentDocument = documents[0];
      });
      return $scope.selectChapter = function(chapter) {
        var c, _i, _len, _ref, _results;
        $log.info("select chapter " + chapter.title + ":" + chapter.selected);
        $log.debug(chapter.content);
        $scope.currentChapter = chapter;
        _ref = $scope.currentDocument.chapters;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (c._id === chapter._id) {
            _results.push(c.selected = true);
          } else {
            _results.push(c.selected = false);
          }
        }
        return _results;
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2VkaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxXQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQU8sQ0FBQyxNQUFSLENBQWdCLG9CQUFoQixDQUFkLENBQUE7O0FBQUEsRUFDQSxXQUFXLENBQUMsVUFBWixDQUF3QixnQkFBeEIsRUFBeUM7SUFDdkMsUUFEdUMsRUFFdkMsTUFGdUMsRUFHdkMsSUFIdUMsRUFJdkMsUUFKdUMsRUFLdkMsZUFMdUMsRUFNdkMsbUJBTnVDLEVBT3ZDLGNBUHVDLEVBUXZDLGFBUnVDLEVBU3hDLFNBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxFQUFmLEVBQW1CLE1BQW5CLEVBQTJCLE1BQTNCLEVBQW1DLFVBQW5DLEVBQStDLEtBQS9DLEVBQXNELElBQXRELEdBQUE7QUFFQyxNQUFBLElBQUksQ0FBQyxJQUFMLENBQVcsNEJBQVgsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsU0FBTCxDQUFBLENBQWdCLENBQUMsSUFBakIsQ0FBc0IsU0FBQyxTQUFELEdBQUE7QUFDckIsUUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLFNBQWQsQ0FBQSxDQUFBO0FBQUEsUUFDQSxNQUFNLENBQUMsU0FBUCxHQUFtQixTQURuQixDQUFBO2VBRUEsTUFBTSxDQUFDLGVBQVAsR0FBeUIsU0FBVSxDQUFBLENBQUEsRUFIZDtNQUFBLENBQXRCLENBREEsQ0FBQTthQU1BLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUMsT0FBRCxHQUFBO0FBQ3RCLFlBQUEsMkJBQUE7QUFBQSxRQUFBLElBQUksQ0FBQyxJQUFMLENBQVcsaUJBQUEsR0FBaUIsT0FBTyxDQUFDLEtBQXpCLEdBQStCLEdBQS9CLEdBQWtDLE9BQU8sQ0FBQyxRQUFyRCxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxLQUFMLENBQVcsT0FBTyxDQUFDLE9BQW5CLENBREEsQ0FBQTtBQUFBLFFBRUEsTUFBTSxDQUFDLGNBQVAsR0FBd0IsT0FGeEIsQ0FBQTtBQUdBO0FBQUE7YUFBQSwyQ0FBQTt1QkFBQTtBQUNDLFVBQUEsSUFBRyxDQUFDLENBQUMsR0FBRixLQUFTLE9BQU8sQ0FBQyxHQUFwQjswQkFDQyxDQUFDLENBQUMsUUFBRixHQUFhLE1BRGQ7V0FBQSxNQUFBOzBCQUdDLENBQUMsQ0FBQyxRQUFGLEdBQWEsT0FIZDtXQUREO0FBQUE7d0JBSnNCO01BQUEsRUFSeEI7SUFBQSxDQVR3QztHQUF6QyxDQURBLENBQUE7QUFBQSIsImZpbGUiOiJjb250cm9sbGVycy9lZGl0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnbW9lZGl0LkNvbnRyb2xsZXJzJylcclxuY29udHJvbGxlcnMuY29udHJvbGxlciAnZWRpdENvbnRyb2xsZXInLCBbXHJcblx0JyRzY29wZSdcclxuXHQnJGxvZydcclxuXHQnJHEnXHJcblx0JyRzdGF0ZSdcclxuXHQnbW9lZGl0LlNvY2tldCdcclxuXHQnbW9lZGl0LlN3ZWV0QWxlcnQnXHJcblx0J21vZWRpdC5Gb2N1cydcclxuXHQnbW9lZGl0LkRhdGEnXHJcblx0KCRzY29wZSwgJGxvZywgJHEsICRzdGF0ZSwgU29ja2V0LCBTd2VldEFsZXJ0LCBGb2N1cywgRGF0YSkgLT5cclxuXHJcblx0XHQkbG9nLmluZm8gJ2VkaXRDb250cm9sbGVyIGhlbGxvIHdvcmxkJ1xyXG5cdFx0RGF0YS5kb2N1bWVudHMoKS50aGVuIChkb2N1bWVudHMpIC0+XHJcblx0XHRcdGNvbnNvbGUudGFibGUgZG9jdW1lbnRzXHJcblx0XHRcdCRzY29wZS5kb2N1bWVudHMgPSBkb2N1bWVudHNcclxuXHRcdFx0JHNjb3BlLmN1cnJlbnREb2N1bWVudCA9IGRvY3VtZW50c1swXVxyXG5cclxuXHRcdCRzY29wZS5zZWxlY3RDaGFwdGVyID0gKGNoYXB0ZXIpIC0+XHJcblx0XHRcdCRsb2cuaW5mbyBcInNlbGVjdCBjaGFwdGVyICN7Y2hhcHRlci50aXRsZX06I3tjaGFwdGVyLnNlbGVjdGVkfVwiXHJcblx0XHRcdCRsb2cuZGVidWcgY2hhcHRlci5jb250ZW50XHJcblx0XHRcdCRzY29wZS5jdXJyZW50Q2hhcHRlciA9IGNoYXB0ZXJcclxuXHRcdFx0Zm9yIGMgaW4gJHNjb3BlLmN1cnJlbnREb2N1bWVudC5jaGFwdGVyc1xyXG5cdFx0XHRcdGlmIGMuX2lkID09IGNoYXB0ZXIuX2lkXHJcblx0XHRcdFx0XHRjLnNlbGVjdGVkID0gdHJ1ZVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdGMuc2VsZWN0ZWQgPSBmYWxzZVxyXG5cdFx0XHRcclxuXHJcbl1cclxuIl19