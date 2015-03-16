(function() {
  var controllers;

  controllers = angular.module('moedit.Controllers');

  controllers.controller('editController', [
    '$scope', '$log', '$q', '$state', '$stateParams', '$window', 'moedit.Socket', 'moedit.SweetAlert', 'moedit.Focus', 'moedit.Data', 'messageCenterService', 'ngDialog', function($scope, $log, $q, $state, $stateParams, $window, Socket, SweetAlert, Focus, Data, messageCenterService, ngDialog) {
      var autoSave, autoSaveCurrentDocument, chapterchange, highlightComment, unhighlightAllComments, unhighlightComment, unselectComments;
      autoSaveCurrentDocument = function() {
        $log.debug("autosave");
        return $scope.saveDocument($scope.currentDocument, "Automatisch gespeichert");
      };
      autoSave = _.debounce(autoSaveCurrentDocument, 5000);
      $scope.commentRemoval = true;
      $scope.selectChapter = function(chapter) {
        var c, i, len, ref;
        $log.info("select chapter " + chapter.title + ":" + chapter.selected);
        unhighlightAllComments();
        unselectComments();
        if ($scope.chapterWatch != null) {
          $scope.chapterWatch();
        }
        $scope.currentChapter = chapter;
        ref = $scope.currentDocument.chapters;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          if (c._id === chapter._id) {
            c.selected = true;
          } else {
            c.selected = false;
          }
        }
        $scope.chapterWatch = $scope.$watch('currentChapter.content', chapterchange, true);
        Data.hasPreviousVersion($scope.currentDocument).then(function(hasOne) {
          console.log("has pv: " + hasOne);
          return $scope.hasPreviousVersion = hasOne;
        });
        return Data.hasNextVersion($scope.currentDocument).then(function(hasOne) {
          console.log("has nv: " + hasOne);
          return $scope.hasNextVersion = hasOne;
        });
      };
      $scope.selectComment = function(comment) {
        var c, i, len, ref;
        unhighlightComment($scope.currentComment);
        $log.info("select comment: " + comment.text + ":" + comment.selected + ":" + comment.key);
        $scope.currentComment = comment;
        ref = $scope.currentChapter.comments;
        for (i = 0, len = ref.length; i < len; i++) {
          c = ref[i];
          if (c.key === comment.key) {
            c.selected = true;
          } else {
            c.selected = false;
          }
        }
        highlightComment($scope.currentComment);
        return true;
      };
      unselectComments = function() {
        var c, i, len, ref, ref1, results;
        if (((ref = $scope.currentChapter) != null ? ref.comments : void 0) != null) {
          ref1 = $scope.currentChapter.comments;
          results = [];
          for (i = 0, len = ref1.length; i < len; i++) {
            c = ref1[i];
            results.push(c.selected = false);
          }
          return results;
        }
      };
      highlightComment = function(comment) {
        if (comment != null) {
          return $("#" + comment.key).addClass('comment-highlight');
        }
      };
      unhighlightComment = function(comment) {
        if (comment != null) {
          return $("#" + comment.key).removeClass('comment-highlight');
        }
      };
      unhighlightAllComments = function() {
        return $(".comment").removeClass('comment-highlight');
      };
      chapterchange = function(newValue, oldValue) {
        var comment, i, idx, j, len, len1, r, ref, removeMe;
        $log.debug("changed:: " + $scope.currentChapter.content);
        if (newValue !== oldValue) {
          $scope.currentChapter.lastChanged = new Date();
          if ($scope.commentRemoval) {
            removeMe = [];
            ref = $scope.currentChapter.comments;
            for (i = 0, len = ref.length; i < len; i++) {
              comment = ref[i];
              idx = newValue.indexOf(comment.key);
              if (idx < 0) {
                removeMe.push(comment);
                $log.debug("remove comment " + comment.text);
              }
            }
            for (j = 0, len1 = removeMe.length; j < len1; j++) {
              r = removeMe[j];
              _.remove($scope.currentChapter.comments, function(c) {
                return c.key === r.key;
              });
            }
          }
          return autoSave();
        }
      };
      $scope.newComment = function(chapter, commentKey) {
        var dialog;
        dialog = ngDialog.open({
          template: 'comment-input-dialog',
          scope: $scope
        });
        return dialog.closePromise.then(function(dialogData) {
          var comment;
          console.log("key: " + commentKey + ", text: " + dialogData.value);
          comment = {
            author: chance.name(),
            key: commentKey,
            created: new Date(),
            text: dialogData.value
          };
          chapter.lastChanged = new Date();
          chapter.comments.push(comment);
          $scope.selectComment(comment);
          return autoSave();
        });
      };
      $scope.newChapter = function(document) {
        document.chapters.push({
          title: $scope.newChapterTitle,
          author: chance.name(),
          lastChanged: new Date(),
          state: 'ONGOING',
          comments: [],
          version: 1
        });
        $scope.newChapterTitle = '';
        $scope.selectChapter(_.last(document.chapters));
        return autoSave();
      };
      $scope.saveDocument = function(document, msg) {
        if (msg == null) {
          msg = "Gutachten erfolgreich gespeichert";
        }
        return Data.saveDocument(document).then(function(response) {
          if (response.status !== 200) {
            return messageCenterService.add('danger', "Fehler beim Speichern", {
              html: true
            });
          } else {
            return messageCenterService.add('success', msg, {
              timeout: 2000,
              html: true
            });
          }
        });
      };
      $scope.docStateChanged = function(val) {
        return console.log($scope.currentDocument.state);
      };
      $scope.deleteComment = function(comment) {
        var m, r, rgx;
        unhighlightComment(comment);
        rgx = "<span id=\"" + comment.key + "\" class=\".*?\">(.*?)<\/span>";
        console.log("rgx: " + rgx);
        r = new RegExp(rgx);
        console.log("before: " + $scope.currentChapter.content);
        m = $scope.currentChapter.content.match(r);
        if (m[1] != null) {
          $scope.currentChapter.content = $scope.currentChapter.content.replace(r, m[1], 'g');
          console.log("after : " + $scope.currentChapter.content);
          _.remove($scope.currentChapter.comments, function(c) {
            return c.key === comment.key;
          });
          return autoSave();
        }
      };
      $scope.editComment = function(comment) {
        var dialog;
        $scope.newCommentText = comment.text;
        dialog = ngDialog.open({
          template: 'comment-input-dialog',
          scope: $scope
        });
        return dialog.closePromise.then(function(dialogData) {
          console.log("key: " + comment.key + ", text: " + dialogData.value);
          comment.text = dialogData.value;
          return autoSave();
        });
      };
      $scope.newVersion = function(document) {
        var newDoc;
        newDoc = angular.copy(document);
        delete newDoc._id;
        newDoc.version++;
        return $scope.saveDocument(newDoc, "Neue Version gespeichert");
      };
      $scope.previousVersion = function() {
        return Data.getPreviousVersion($scope.currentDocument).then(function(document) {
          return $state.go('edit', {
            docid: document._id
          });
        });
      };
      $scope.nextVersion = function() {
        return Data.getNextVersion($scope.currentDocument).then(function(document) {
          return $state.go('edit', {
            docid: document._id
          });
        });
      };
      $scope.diff = function(document) {
        $log.debug("goto diff of " + document.key);
        return $state.go('diff', {
          docKey: document.key,
          leftVersion: 0,
          rightVersion: document.version
        });
      };
      if ($stateParams.docid) {
        return Data.document($stateParams.docid).then(function(document) {
          console.dir(document);
          $scope.currentDocument = document;
          return $scope.selectChapter($scope.currentDocument.chapters[0]);
        });
      } else {
        return $state.go('list');
      }
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2VkaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSxXQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQU8sQ0FBQyxNQUFSLENBQWUsb0JBQWYsQ0FBZCxDQUFBOztBQUFBLEVBQ0EsV0FBVyxDQUFDLFVBQVosQ0FBdUIsZ0JBQXZCLEVBQXlDO0lBQ3hDLFFBRHdDLEVBRXhDLE1BRndDLEVBR3hDLElBSHdDLEVBSXhDLFFBSndDLEVBS3hDLGNBTHdDLEVBTXhDLFNBTndDLEVBT3hDLGVBUHdDLEVBUXhDLG1CQVJ3QyxFQVN4QyxjQVR3QyxFQVV4QyxhQVZ3QyxFQVd4QyxzQkFYd0MsRUFZeEMsVUFad0MsRUFheEMsU0FBQyxNQUFELEVBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUIsTUFBbkIsRUFBMkIsWUFBM0IsRUFBeUMsT0FBekMsRUFBa0QsTUFBbEQsRUFBMEQsVUFBMUQsRUFBc0UsS0FBdEUsRUFBNkUsSUFBN0UsRUFBbUYsb0JBQW5GLEVBQXlHLFFBQXpHLEdBQUE7QUFHQyxVQUFBLGdJQUFBO0FBQUEsTUFBQSx1QkFBQSxHQUEwQixTQUFBLEdBQUE7QUFDekIsUUFBQSxJQUFJLENBQUMsS0FBTCxDQUFXLFVBQVgsQ0FBQSxDQUFBO2VBQ0EsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsTUFBTSxDQUFDLGVBQTNCLEVBQTRDLHlCQUE1QyxFQUZ5QjtNQUFBLENBQTFCLENBQUE7QUFBQSxNQUlBLFFBQUEsR0FBVyxDQUFDLENBQUMsUUFBRixDQUFXLHVCQUFYLEVBQW9DLElBQXBDLENBSlgsQ0FBQTtBQUFBLE1BS0EsTUFBTSxDQUFDLGNBQVAsR0FBd0IsSUFMeEIsQ0FBQTtBQUFBLE1BT0EsTUFBTSxDQUFDLGFBQVAsR0FBdUIsU0FBQyxPQUFELEdBQUE7QUFDdEIsWUFBQSxjQUFBO0FBQUEsUUFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLGlCQUFBLEdBQWtCLE9BQU8sQ0FBQyxLQUExQixHQUFnQyxH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QXZDLEVBREQ7T0FBQSxNQUFBO2VBTUMsTUFBTSxDQUFDLEVBQVAsQ0FBVSxNQUFWLEVBTkQ7T0ExSkQ7SUFBQSxDQWJ3QztHQUF6QyxDQURBLENBQUE7QUFBQSIsImZpbGUiOiJjb250cm9sbGVycy9lZGl0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnbW9lZGl0LkNvbnRyb2xsZXJzJylcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIgJ2VkaXRDb250cm9sbGVyJywgW1xuXHQnJHNjb3BlJ1xuXHQnJGxvZydcblx0JyRxJ1xuXHQnJHN0YXRlJ1xuXHQnJHN0YXRlUGFyYW1zJ1xuXHQnJHdpbmRvdydcblx0J21vZWRpdC5Tb2NrZXQnXG5cdCdtb2VkaXQuU3dlZXRBbGVydCdcblx0J21vZWRpdC5Gb2N1cydcblx0J21vZWRpdC5EYXRhJ1xuXHQnbWVzc2FnZUNlbnRlclNlcnZpY2UnXG5cdCduZ0RpYWxvZydcblx0KCRzY29wZSwgJGxvZywgJHEsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkd2luZG93LCBTb2NrZXQsIFN3ZWV0QWxlcnQsIEZvY3VzLCBEYXRhLCBtZXNzYWdlQ2VudGVyU2VydmljZSwgbmdEaWFsb2cpIC0+XG5cblx0XHQjIGF1dG9zYXZlXG5cdFx0YXV0b1NhdmVDdXJyZW50RG9jdW1lbnQgPSAoKSAtPlxuXHRcdFx0JGxvZy5kZWJ1ZyBcImF1dG9zYXZlXCJcblx0XHRcdCRzY29wZS5zYXZlRG9jdW1lbnQoJHNjb3BlLmN1cnJlbnREb2N1bWVudCwgXCJBdXRvbWF0aXNjaCBnZXNwZWljaGVydFwiKVxuXHRcdFxuXHRcdGF1dG9TYXZlID0gXy5kZWJvdW5jZSBhdXRvU2F2ZUN1cnJlbnREb2N1bWVudCwgNTAwMFxuXHRcdCRzY29wZS5jb21tZW50UmVtb3ZhbCA9IHRydWVcblxuXHRcdCRzY29wZS5zZWxlY3RDaGFwdGVyID0gKGNoYXB0ZXIpIC0+XG5cdFx0XHQkbG9nLmluZm8gXCJzZWxlY3QgY2hhcHRlciAje2NoYXB0ZXIudGl0bGV9OiN7Y2hhcHRlci5zZWxlY3RlZH1cIlxuXHRcdFx0dW5oaWdobGlnaHRBbGxDb21tZW50cygpXG5cdFx0XHR1bnNlbGVjdENvbW1lbnRzKClcblx0XHRcdGlmICRzY29wZS5jaGFwdGVyV2F0Y2g/XG5cdFx0XHRcdCRzY29wZS5jaGFwdGVyV2F0Y2goKSAjIHJlbW92ZSB3YXRjaFxuXHRcdFx0JHNjb3BlLmN1cnJlbnRDaGFwdGVyID0gY2hhcHRlclxuXHRcdFx0Zm9yIGMgaW4gJHNjb3BlLmN1cnJlbnREb2N1bWVudC5jaGFwdGVyc1xuXHRcdFx0XHRpZiBjLl9pZCA9PSBjaGFwdGVyLl9pZFxuXHRcdFx0XHRcdGMuc2VsZWN0ZWQgPSB0cnVlXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRjLnNlbGVjdGVkID0gZmFsc2Vcblx0XHRcdCRzY29wZS5jaGFwdGVyV2F0Y2ggPSAkc2NvcGUuJHdhdGNoICdjdXJyZW50Q2hhcHRlci5jb250ZW50JywgY2hhcHRlcmNoYW5nZSwgdHJ1ZVxuXHRcdFx0RGF0YS5oYXNQcmV2aW91c1ZlcnNpb24oJHNjb3BlLmN1cnJlbnREb2N1bWVudCkudGhlbiAoaGFzT25lKSAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcImhhcyBwdjogI3toYXNPbmV9XCJcblx0XHRcdFx0JHNjb3BlLmhhc1ByZXZpb3VzVmVyc2lvbiA9IGhhc09uZVxuXHRcdFx0RGF0YS5oYXNOZXh0VmVyc2lvbigkc2NvcGUuY3VycmVudERvY3VtZW50KS50aGVuIChoYXNPbmUpIC0+XG5cdFx0XHRcdGNvbnNvbGUubG9nIFwiaGFzIG52OiAje2hhc09uZX1cIlxuXHRcdFx0XHQkc2NvcGUuaGFzTmV4dFZlcnNpb24gPSBoYXNPbmVcblxuXHRcdCRzY29wZS5zZWxlY3RDb21tZW50ID0gKGNvbW1lbnQpIC0+XG5cdFx0XHR1bmhpZ2hsaWdodENvbW1lbnQoJHNjb3BlLmN1cnJlbnRDb21tZW50KVxuXHRcdFx0JGxvZy5pbmZvIFwic2VsZWN0IGNvbW1lbnQ6ICN7Y29tbWVudC50ZXh0fToje2NvbW1lbnQuc2VsZWN0ZWR9OiN7Y29tbWVudC5rZXl9XCJcblx0XHRcdCRzY29wZS5jdXJyZW50Q29tbWVudCA9IGNvbW1lbnRcblx0XHRcdGZvciBjIGluICRzY29wZS5jdXJyZW50Q2hhcHRlci5jb21tZW50c1xuXHRcdFx0XHRpZiBjLmtleSA9PSBjb21tZW50LmtleVxuXHRcdFx0XHRcdGMuc2VsZWN0ZWQgPSB0cnVlXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRjLnNlbGVjdGVkID0gZmFsc2Vcblx0XHRcdGhpZ2hsaWdodENvbW1lbnQoJHNjb3BlLmN1cnJlbnRDb21tZW50KVxuXHRcdFx0cmV0dXJuIHRydWUgIyB0aGlzIGlzIGJlY2F1c2UgYW5ndWxhciBpcyBjb21wbGFpbmcgYWJvdXQ6IFwiUmVmZXJlbmNpbmcgYSBET00gbm9kZSBpbiBFeHByZXNzaW9uXCIgd2hlbiBqdXN0IHJldHVybmluZyBzb21ldGhpbmcgZWxzZVxuXG5cdFx0dW5zZWxlY3RDb21tZW50cyA9ICgpIC0+XG5cdFx0XHRpZiAkc2NvcGUuY3VycmVudENoYXB0ZXI/LmNvbW1lbnRzP1xuXHRcdFx0XHRmb3IgYyBpbiAkc2NvcGUuY3VycmVudENoYXB0ZXIuY29tbWVudHNcblx0XHRcdFx0XHRjLnNlbGVjdGVkID0gZmFsc2VcblxuXHRcdGhpZ2hsaWdodENvbW1lbnQgPSAoY29tbWVudCkgLT5cblx0XHRcdGlmIGNvbW1lbnQ/XG5cdFx0XHRcdCQoXCIjI3tjb21tZW50LmtleX1cIikuYWRkQ2xhc3MoJ2NvbW1lbnQtaGlnaGxpZ2h0JylcblxuXHRcdHVuaGlnaGxpZ2h0Q29tbWVudCA9IChjb21tZW50KSAtPlxuXHRcdFx0aWYgY29tbWVudD9cblx0XHRcdFx0JChcIiMje2NvbW1lbnQua2V5fVwiKS5yZW1vdmVDbGFzcygnY29tbWVudC1oaWdobGlnaHQnKVxuXG5cdFx0dW5oaWdobGlnaHRBbGxDb21tZW50cyA9ICgpIC0+XG5cdFx0XHQkKFwiLmNvbW1lbnRcIikucmVtb3ZlQ2xhc3MoJ2NvbW1lbnQtaGlnaGxpZ2h0JylcblxuXHRcdGNoYXB0ZXJjaGFuZ2UgPSAobmV3VmFsdWUsIG9sZFZhbHVlKSAtPlxuXHRcdFx0JGxvZy5kZWJ1ZyBcImNoYW5nZWQ6OiAjeyRzY29wZS5jdXJyZW50Q2hhcHRlci5jb250ZW50fVwiXG5cdFx0XHRpZiBuZXdWYWx1ZSAhPSBvbGRWYWx1ZVxuXHRcdFx0XHQkc2NvcGUuY3VycmVudENoYXB0ZXIubGFzdENoYW5nZWQgPSBuZXcgRGF0ZSgpXG5cdFx0XHRcdGlmICRzY29wZS5jb21tZW50UmVtb3ZhbFxuXHRcdFx0XHRcdHJlbW92ZU1lID0gW11cblx0XHRcdFx0XHRmb3IgY29tbWVudCBpbiAkc2NvcGUuY3VycmVudENoYXB0ZXIuY29tbWVudHNcblx0XHRcdFx0XHRcdGlkeCA9IG5ld1ZhbHVlLmluZGV4T2YoY29tbWVudC5rZXkpXG5cdFx0XHRcdFx0XHRpZiBpZHggPCAwXG5cdFx0XHRcdFx0XHRcdHJlbW92ZU1lLnB1c2ggY29tbWVudFxuXHRcdFx0XHRcdFx0XHQkbG9nLmRlYnVnIFwicmVtb3ZlIGNvbW1lbnQgI3tjb21tZW50LnRleHR9XCJcblx0XHRcdFx0XHRmb3IgciBpbiByZW1vdmVNZVxuXHRcdFx0XHRcdFx0Xy5yZW1vdmUoJHNjb3BlLmN1cnJlbnRDaGFwdGVyLmNvbW1lbnRzLCAoYykgLT4gYy5rZXkgPT0gci5rZXkpXG5cdFx0XHRcdGF1dG9TYXZlKClcdFxuXG5cdFx0JHNjb3BlLm5ld0NvbW1lbnQgPSAoY2hhcHRlciwgY29tbWVudEtleSkgLT5cblx0XHRcdGRpYWxvZyA9IG5nRGlhbG9nLm9wZW5cblx0XHRcdFx0dGVtcGxhdGU6ICdjb21tZW50LWlucHV0LWRpYWxvZydcblx0XHRcdFx0c2NvcGU6ICRzY29wZVxuXHRcdFx0ZGlhbG9nLmNsb3NlUHJvbWlzZS50aGVuIChkaWFsb2dEYXRhKSAtPlxuXHRcdFx0XHRjb25zb2xlLmxvZyBcImtleTogI3tjb21tZW50S2V5fSwgdGV4dDogI3tkaWFsb2dEYXRhLnZhbHVlfVwiXG5cdFx0XHRcdGNvbW1lbnQgPSBcblx0XHRcdFx0XHRhdXRob3I6IGNoYW5jZS5uYW1lKClcblx0XHRcdFx0XHRrZXk6IGNvbW1lbnRLZXlcblx0XHRcdFx0XHRjcmVhdGVkOiBuZXcgRGF0ZSgpXG5cdFx0XHRcdFx0dGV4dDogZGlhbG9nRGF0YS52YWx1ZVxuXHRcdFx0XHRjaGFwdGVyLmxhc3RDaGFuZ2VkID0gbmV3IERhdGUoKVxuXHRcdFx0XHRjaGFwdGVyLmNvbW1lbnRzLnB1c2ggY29tbWVudFxuXHRcdFx0XHQkc2NvcGUuc2VsZWN0Q29tbWVudCBjb21tZW50XG5cdFx0XHRcdGF1dG9TYXZlKClcblxuXHRcdCRzY29wZS5uZXdDaGFwdGVyID0gKGRvY3VtZW50KSAtPlxuXHRcdFx0ZG9jdW1lbnQuY2hhcHRlcnMucHVzaFxuXHRcdFx0XHR0aXRsZTogJHNjb3BlLm5ld0NoYXB0ZXJUaXRsZVxuXHRcdFx0XHRhdXRob3I6IGNoYW5jZS5uYW1lKClcblx0XHRcdFx0bGFzdENoYW5nZWQ6IG5ldyBEYXRlKClcblx0XHRcdFx0c3RhdGU6ICdPTkdPSU5HJ1xuXHRcdFx0XHRjb21tZW50czogW11cblx0XHRcdFx0dmVyc2lvbjogMVxuXHRcdFx0JHNjb3BlLm5ld0NoYXB0ZXJUaXRsZSA9ICcnXG5cdFx0XHQkc2NvcGUuc2VsZWN0Q2hhcHRlcihfLmxhc3QgZG9jdW1lbnQuY2hhcHRlcnMpXG5cdFx0XHRhdXRvU2F2ZSgpXG5cblx0XHQkc2NvcGUuc2F2ZURvY3VtZW50ID0gKGRvY3VtZW50LCBtc2cgPSBcIkd1dGFjaHRlbiBlcmZvbGdyZWljaCBnZXNwZWljaGVydFwiKSAtPlxuXHRcdFx0RGF0YS5zYXZlRG9jdW1lbnQoZG9jdW1lbnQpLnRoZW4gKHJlc3BvbnNlKSAtPlxuXHRcdFx0XHRpZiByZXNwb25zZS5zdGF0dXMgIT0gMjAwXG5cdFx0XHRcdFx0bWVzc2FnZUNlbnRlclNlcnZpY2UuYWRkKCdkYW5nZXInLCBcIkZlaGxlciBiZWltIFNwZWljaGVyblwiLCB7aHRtbDogdHJ1ZX0pO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0bWVzc2FnZUNlbnRlclNlcnZpY2UuYWRkKCdzdWNjZXNzJywgbXNnLCB7dGltZW91dDogMjAwMCwgaHRtbDogdHJ1ZX0pO1xuXG5cdFx0JHNjb3BlLmRvY1N0YXRlQ2hhbmdlZCA9ICh2YWwpIC0+XG5cdFx0XHRjb25zb2xlLmxvZyAkc2NvcGUuY3VycmVudERvY3VtZW50LnN0YXRlXG5cblx0XHQkc2NvcGUuZGVsZXRlQ29tbWVudCA9IChjb21tZW50KSAtPlxuXHRcdFx0dW5oaWdobGlnaHRDb21tZW50KGNvbW1lbnQpXG5cdFx0XHRyZ3ggPSBcIjxzcGFuIGlkPVxcXCIje2NvbW1lbnQua2V5fVxcXCIgY2xhc3M9XFxcIi4qP1xcXCI+KC4qPyk8XFwvc3Bhbj5cIlxuXHRcdFx0Y29uc29sZS5sb2cgXCJyZ3g6ICN7cmd4fVwiXG5cdFx0XHRyID0gbmV3IFJlZ0V4cCByZ3hcblx0XHRcdGNvbnNvbGUubG9nIFwiYmVmb3JlOiAjeyRzY29wZS5jdXJyZW50Q2hhcHRlci5jb250ZW50fVwiXG5cdFx0XHRtID0gJHNjb3BlLmN1cnJlbnRDaGFwdGVyLmNvbnRlbnQubWF0Y2ggclxuXHRcdFx0aWYgbVsxXT9cblx0XHRcdFx0JHNjb3BlLmN1cnJlbnRDaGFwdGVyLmNvbnRlbnQgPSAkc2NvcGUuY3VycmVudENoYXB0ZXIuY29udGVudC5yZXBsYWNlIHIsIG1bMV0sICdnJ1xuXHRcdFx0XHRjb25zb2xlLmxvZyBcImFmdGVyIDogI3skc2NvcGUuY3VycmVudENoYXB0ZXIuY29udGVudH1cIlxuXHRcdFx0XHRfLnJlbW92ZSgkc2NvcGUuY3VycmVudENoYXB0ZXIuY29tbWVudHMsIChjKSAtPiBjLmtleSA9PSBjb21tZW50LmtleSlcblx0XHRcdFx0YXV0b1NhdmUoKVxuXG5cdFx0JHNjb3BlLmVkaXRDb21tZW50ID0gKGNvbW1lbnQpIC0+IFxuXHRcdFx0JHNjb3BlLm5ld0NvbW1lbnRUZXh0ID0gY29tbWVudC50ZXh0XG5cdFx0XHRkaWFsb2cgPSBuZ0RpYWxvZy5vcGVuXG5cdFx0XHRcdHRlbXBsYXRlOiAnY29tbWVudC1pbnB1dC1kaWFsb2cnXG5cdFx0XHRcdHNjb3BlOiAkc2NvcGVcblx0XHRcdGRpYWxvZy5jbG9zZVByb21pc2UudGhlbiAoZGlhbG9nRGF0YSkgLT5cblx0XHRcdFx0Y29uc29sZS5sb2cgXCJrZXk6ICN7Y29tbWVudC5rZXl9LCB0ZXh0OiAje2RpYWxvZ0RhdGEudmFsdWV9XCJcblx0XHRcdFx0I2NvbW1lbnQgPSBfLmZpbmQoJHNjb3BlLmN1cnJlbnRDaGFwdGVyLmNvbW1lbnRzLCAoYykgLT4gYy5rZXkgPT0gY29tbWVudC5rZXkpXG5cdFx0XHRcdGNvbW1lbnQudGV4dCA9IGRpYWxvZ0RhdGEudmFsdWVcblx0XHRcdFx0YXV0b1NhdmUoKVxuXG5cdFx0JHNjb3BlLm5ld1ZlcnNpb24gPSAoZG9jdW1lbnQpIC0+XG5cdFx0XHRuZXdEb2MgPSBhbmd1bGFyLmNvcHkgZG9jdW1lbnRcblx0XHRcdGRlbGV0ZSBuZXdEb2MuX2lkXG5cdFx0XHRuZXdEb2MudmVyc2lvbisrXG5cdFx0XHQkc2NvcGUuc2F2ZURvY3VtZW50IG5ld0RvYywgXCJOZXVlIFZlcnNpb24gZ2VzcGVpY2hlcnRcIlxuXG5cdFx0JHNjb3BlLnByZXZpb3VzVmVyc2lvbiA9ICgpIC0+XG5cdFx0XHREYXRhLmdldFByZXZpb3VzVmVyc2lvbigkc2NvcGUuY3VycmVudERvY3VtZW50KS50aGVuIChkb2N1bWVudCkgLT5cblx0XHRcdFx0JHN0YXRlLmdvICdlZGl0JywgeyBkb2NpZDogZG9jdW1lbnQuX2lkIH1cblx0XHRcblx0XHQkc2NvcGUubmV4dFZlcnNpb24gPSAoKSAtPlxuXHRcdFx0RGF0YS5nZXROZXh0VmVyc2lvbigkc2NvcGUuY3VycmVudERvY3VtZW50KS50aGVuIChkb2N1bWVudCkgLT5cblx0XHRcdFx0JHN0YXRlLmdvICdlZGl0JywgeyBkb2NpZDogZG9jdW1lbnQuX2lkIH1cblxuXHRcdCRzY29wZS5kaWZmID0gKGRvY3VtZW50KSAtPlxuXHRcdFx0JGxvZy5kZWJ1ZyBcImdvdG8gZGlmZiBvZiAje2RvY3VtZW50LmtleX1cIlxuXHRcdFx0JHN0YXRlLmdvICdkaWZmJyAsIHtkb2NLZXk6IGRvY3VtZW50LmtleSwgbGVmdFZlcnNpb246IDAsIHJpZ2h0VmVyc2lvbjogZG9jdW1lbnQudmVyc2lvbn1cblxuXHRcdCMgZml4IHJvdXRpbmcgaWYgc29tZW9uZSBjb21lcyBoZXJlIHdpdGggbm8gb3Igbm9uIGV4aXN0aW5nIGRvY2lkXG5cdFx0aWYgJHN0YXRlUGFyYW1zLmRvY2lkXG5cdFx0XHREYXRhLmRvY3VtZW50KCRzdGF0ZVBhcmFtcy5kb2NpZCkudGhlbiAoZG9jdW1lbnQpIC0+XG5cdFx0XHRcdGNvbnNvbGUuZGlyIGRvY3VtZW50XG5cdFx0XHRcdCRzY29wZS5jdXJyZW50RG9jdW1lbnQgPSBkb2N1bWVudFxuXHRcdFx0XHQkc2NvcGUuc2VsZWN0Q2hhcHRlcigkc2NvcGUuY3VycmVudERvY3VtZW50LmNoYXB0ZXJzWzBdKVxuXHRcdGVsc2Vcblx0XHRcdCRzdGF0ZS5nbyAnbGlzdCdcbl1cbiJdfQ==