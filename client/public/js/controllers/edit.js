(function() {
  var controllers;

  controllers = angular.module('moedit.Controllers');

  controllers.controller('editController', [
    '$scope', '$log', '$q', '$state', '$window', 'moedit.Socket', 'moedit.SweetAlert', 'moedit.Focus', 'moedit.Data', function($scope, $log, $q, $state, $window, Socket, SweetAlert, Focus, Data) {
      $scope.selectChapter = function(chapter) {
        var c, _i, _len, _ref;
        if ($scope.chapterWatch != null) {
          $scope.chapterWatch();
        }
        $log.info("select chapter " + chapter.title + ":" + chapter.selected);
        $log.debug(chapter.content);
        $scope.currentChapter = chapter;
        _ref = $scope.currentDocument.chapters;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (c._id === chapter._id) {
            c.selected = true;
          } else {
            c.selected = false;
          }
        }
        return $scope.chapterWatch = $scope.$watch('currentChapter.content', function(val) {
          $scope.currentChapter.lastChanged = new Date();
          return console.log('changed');
        });
      };
      $scope.newComment = function(chapter) {
        return SweetAlert.info('kommt noch');
      };
      $scope.newChapter = function(document) {
        return SweetAlert.info('kommt noch');
      };
      $scope.showPreview = function(document) {
        return $window.open("/preview/" + document._id);
      };
      $scope.downloadWord = function(document) {
        return $window.open("/download/word/" + document._id);
      };
      $scope.saveDocument = function(document) {
        console.log("save");
        console.dir(document);
        return Data.saveDocument(document);
      };
      return Data.documents().then(function(documents) {
        $scope.documents = documents;
        $scope.currentDocument = documents[0];
        return $scope.selectChapter($scope.currentDocument.chapters[0]);
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2VkaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxXQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQU8sQ0FBQyxNQUFSLENBQWdCLG9CQUFoQixDQUFkLENBQUE7O0FBQUEsRUFDQSxXQUFXLENBQUMsVUFBWixDQUF3QixnQkFBeEIsRUFBeUM7SUFDdkMsUUFEdUMsRUFFdkMsTUFGdUMsRUFHdkMsSUFIdUMsRUFJdkMsUUFKdUMsRUFLdkMsU0FMdUMsRUFNdkMsZUFOdUMsRUFPdkMsbUJBUHVDLEVBUXZDLGNBUnVDLEVBU3ZDLGFBVHVDLEVBVXhDLFNBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxFQUFmLEVBQW1CLE1BQW5CLEVBQTJCLE9BQTNCLEVBQW9DLE1BQXBDLEVBQTRDLFVBQTVDLEVBQXdELEtBQXhELEVBQStELElBQS9ELEdBQUE7QUFFQyxNQUFBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUMsT0FBRCxHQUFBO0FBQ3RCLFlBQUEsaUJBQUE7QUFBQSxRQUFBLElBQUcsMkJBQUg7QUFDQyxVQUFBLE1BQU0sQ0FBQyxZQUFQLENBQUEsQ0FBQSxDQUREO1NBQUE7QUFBQSxRQUVBLElBQUksQ0FBQyxJQUFMLENBQVcsaUJBQUEsR0FBaUIsT0FBTyxDQUFDLEtBQXpCLEdBQStCLEdBQS9CLEdBQWtDLE9BQU8sQ0FBQyxRQUFyRCxDQUZBLENBQUE7QUFBQSxRQUdBLElBQUksQ0FBQyxLQUFMLENBQVcsT0FBTyxDQUFDLE9BQW5CLENBSEEsQ0FBQTtBQUFBLFFBSUEsTUFBTSxDQUFDLGNBQVAsR0FBd0IsT0FKeEIsQ0FBQTtBQUtBO0FBQUEsYUFBQSwyQ0FBQTt1QkFBQTtBQUNDLFVBQUEsSUFBRyxDQUFDLENBQUMsR0FBRixLQUFTLE9BQU8sQ0FBQyxHQUFwQjtBQUNDLFlBQUEsQ0FBQyxDQUFDLFFBQUYsR0FBYSxJQUFiLENBREQ7V0FBQSxNQUFBO0FBR0MsWUFBQSxDQUFDLENBQUMsUUFBRixHQUFhLEtBQWIsQ0FIRDtXQUREO0FBQUEsU0FMQTtlQVVBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWUsd0JBQWYsRUFBd0MsU0FBQyxHQUFELEdBQUE7QUFDN0QsVUFBQSxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQXRCLEdBQXdDLElBQUEsSUFBQSxDQUFBLENBQXhDLENBQUE7aUJBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBYSxTQUFiLEVBRjZEO1FBQUEsQ0FBeEMsRUFYQTtNQUFBLENBQXZCLENBQUE7QUFBQSxNQWVBLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLFNBQUMsT0FBRCxHQUFBO2VBQ25CLFVBQVUsQ0FBQyxJQUFYLENBQWlCLFlBQWpCLEVBRG1CO01BQUEsQ0FmcEIsQ0FBQTtBQUFBLE1Ba0JBLE1BQU0sQ0FBQyxVQUFQLEdBQW9CLFNBQUMsUUFBRCxHQUFBO2VBQ25CLFVBQVUsQ0FBQyxJQUFYLENBQWlCLFlBQWpCLEVBRG1CO01BQUEsQ0FsQnBCLENBQUE7QUFBQSxNQXFCQSxNQUFNLENBQUMsV0FBUCxHQUFxQixTQUFDLFFBQUQsR0FBQTtlQUNwQixPQUFPLENBQUMsSUFBUixDQUFjLFdBQUEsR0FBVyxRQUFRLENBQUMsR0FBbEMsRUFEb0I7TUFBQSxDQXJCckIsQ0FBQTtBQUFBLE1Bd0JBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLFNBQUMsUUFBRCxHQUFBO2VBQ3JCLE9BQU8sQ0FBQyxJQUFSLENBQWMsaUJBQUEsR0FBaUIsUUFBUSxDQUFDLEdBQXhDLEVBRHFCO01BQUEsQ0F4QnRCLENBQUE7QUFBQSxNQTJCQSxNQUFNLENBQUMsWUFBUCxHQUFzQixTQUFDLFFBQUQsR0FBQTtBQUNyQixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQWEsTUFBYixDQUFBLENBQUE7QUFBQSxRQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksUUFBWixDQURBLENBQUE7ZUFFQSxJQUFJLENBQUMsWUFBTCxDQUFrQixRQUFsQixFQUhxQjtNQUFBLENBM0J0QixDQUFBO2FBZ0NBLElBQUksQ0FBQyxTQUFMLENBQUEsQ0FBZ0IsQ0FBQyxJQUFqQixDQUFzQixTQUFDLFNBQUQsR0FBQTtBQUNyQixRQUFBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLFNBQW5CLENBQUE7QUFBQSxRQUNBLE1BQU0sQ0FBQyxlQUFQLEdBQXlCLFNBQVUsQ0FBQSxDQUFBLENBRG5DLENBQUE7ZUFFQSxNQUFNLENBQUMsYUFBUCxDQUFxQixNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQXJELEVBSHFCO01BQUEsQ0FBdEIsRUFsQ0Q7SUFBQSxDQVZ3QztHQUF6QyxDQURBLENBQUE7QUFBQSIsImZpbGUiOiJjb250cm9sbGVycy9lZGl0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnbW9lZGl0LkNvbnRyb2xsZXJzJylcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIgJ2VkaXRDb250cm9sbGVyJywgW1xuXHQnJHNjb3BlJ1xuXHQnJGxvZydcblx0JyRxJ1xuXHQnJHN0YXRlJ1xuXHQnJHdpbmRvdydcblx0J21vZWRpdC5Tb2NrZXQnXG5cdCdtb2VkaXQuU3dlZXRBbGVydCdcblx0J21vZWRpdC5Gb2N1cydcblx0J21vZWRpdC5EYXRhJ1xuXHQoJHNjb3BlLCAkbG9nLCAkcSwgJHN0YXRlLCAkd2luZG93LCBTb2NrZXQsIFN3ZWV0QWxlcnQsIEZvY3VzLCBEYXRhKSAtPlxuXG5cdFx0JHNjb3BlLnNlbGVjdENoYXB0ZXIgPSAoY2hhcHRlcikgLT5cblx0XHRcdGlmICRzY29wZS5jaGFwdGVyV2F0Y2g/XG5cdFx0XHRcdCRzY29wZS5jaGFwdGVyV2F0Y2goKSAjIHJlbW92ZSB3YXRjaFxuXHRcdFx0JGxvZy5pbmZvIFwic2VsZWN0IGNoYXB0ZXIgI3tjaGFwdGVyLnRpdGxlfToje2NoYXB0ZXIuc2VsZWN0ZWR9XCJcblx0XHRcdCRsb2cuZGVidWcgY2hhcHRlci5jb250ZW50XG5cdFx0XHQkc2NvcGUuY3VycmVudENoYXB0ZXIgPSBjaGFwdGVyXG5cdFx0XHRmb3IgYyBpbiAkc2NvcGUuY3VycmVudERvY3VtZW50LmNoYXB0ZXJzXG5cdFx0XHRcdGlmIGMuX2lkID09IGNoYXB0ZXIuX2lkXG5cdFx0XHRcdFx0Yy5zZWxlY3RlZCA9IHRydWVcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGMuc2VsZWN0ZWQgPSBmYWxzZVxuXHRcdFx0JHNjb3BlLmNoYXB0ZXJXYXRjaCA9ICRzY29wZS4kd2F0Y2ggJ2N1cnJlbnRDaGFwdGVyLmNvbnRlbnQnLCAodmFsKSAtPlxuXHRcdFx0XHQkc2NvcGUuY3VycmVudENoYXB0ZXIubGFzdENoYW5nZWQgPSBuZXcgRGF0ZSgpXG5cdFx0XHRcdGNvbnNvbGUubG9nICdjaGFuZ2VkJ1xuXG5cdFx0JHNjb3BlLm5ld0NvbW1lbnQgPSAoY2hhcHRlcikgLT5cblx0XHRcdFN3ZWV0QWxlcnQuaW5mbyAna29tbXQgbm9jaCdcblxuXHRcdCRzY29wZS5uZXdDaGFwdGVyID0gKGRvY3VtZW50KSAtPlxuXHRcdFx0U3dlZXRBbGVydC5pbmZvICdrb21tdCBub2NoJ1xuXG5cdFx0JHNjb3BlLnNob3dQcmV2aWV3ID0gKGRvY3VtZW50KSAtPlxuXHRcdFx0JHdpbmRvdy5vcGVuIFwiL3ByZXZpZXcvI3tkb2N1bWVudC5faWR9XCJcblxuXHRcdCRzY29wZS5kb3dubG9hZFdvcmQgPSAoZG9jdW1lbnQpIC0+XG5cdFx0XHQkd2luZG93Lm9wZW4gXCIvZG93bmxvYWQvd29yZC8je2RvY3VtZW50Ll9pZH1cIlxuXG5cdFx0JHNjb3BlLnNhdmVEb2N1bWVudCA9IChkb2N1bWVudCkgLT5cblx0XHRcdGNvbnNvbGUubG9nIFwic2F2ZVwiXG5cdFx0XHRjb25zb2xlLmRpciBkb2N1bWVudFxuXHRcdFx0RGF0YS5zYXZlRG9jdW1lbnQoZG9jdW1lbnQpXG5cblx0XHREYXRhLmRvY3VtZW50cygpLnRoZW4gKGRvY3VtZW50cykgLT5cblx0XHRcdCRzY29wZS5kb2N1bWVudHMgPSBkb2N1bWVudHNcblx0XHRcdCRzY29wZS5jdXJyZW50RG9jdW1lbnQgPSBkb2N1bWVudHNbMF1cblx0XHRcdCRzY29wZS5zZWxlY3RDaGFwdGVyKCRzY29wZS5jdXJyZW50RG9jdW1lbnQuY2hhcHRlcnNbMF0pXG5cdFx0XHRcblxuXVxuIl19