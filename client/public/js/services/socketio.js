(function() {
  angular.module('moedit.Services').factory('moedit.Socket', [
    '$rootScope', '$log', function($rootScope, $log) {
      var socket;
      socket = io.connect();
      return {
        on: function(eventName, callback) {
          return socket.on(eventName, function() {
            var args;
            args = arguments;
            return $rootScope.$apply(function() {
              return callback.apply(socket, args);
            });
          });
        },
        emit: function(eventName, data, callback) {
          if (typeof data === 'function') {
            callback = data;
            data = {};
          }
          return socket.emit(eventName, data, function() {
            var args;
            args = arguments;
            return $rootScope.$apply(function() {
              if (callback) {
                return callback.apply(socket, args);
              }
            });
          });
        },
        emitAndListen: function(eventName, data, callback) {
          this.emit(eventName, data, callback);
          return this.on(eventName, callback);
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3NvY2tldGlvLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLEVBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZ0IsaUJBQWhCLENBQWlDLENBQUMsT0FBbEMsQ0FBMkMsZUFBM0MsRUFBMkQ7SUFBRSxZQUFGLEVBQWdCLE1BQWhCLEVBQXVCLFNBQUMsVUFBRCxFQUFhLElBQWIsR0FBQTtBQUNoRixVQUFBLE1BQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxFQUFFLENBQUMsT0FBSCxDQUFBLENBQVQsQ0FBQTthQUVBO0FBQUEsUUFBQSxFQUFBLEVBQUksU0FBQyxTQUFELEVBQVksUUFBWixHQUFBO2lCQUNILE1BQU0sQ0FBQyxFQUFQLENBQVUsU0FBVixFQUFxQixTQUFBLEdBQUE7QUFDcEIsZ0JBQUEsSUFBQTtBQUFBLFlBQUEsSUFBQSxHQUFPLFNBQVAsQ0FBQTttQkFDQSxVQUFVLENBQUMsTUFBWCxDQUFrQixTQUFBLEdBQUE7cUJBQ2pCLFFBQVEsQ0FBQyxLQUFULENBQWUsTUFBZixFQUF1QixJQUF2QixFQURpQjtZQUFBLENBQWxCLEVBRm9CO1VBQUEsQ0FBckIsRUFERztRQUFBLENBQUo7QUFBQSxRQUtBLElBQUEsRUFBTSxTQUFDLFNBQUQsRUFBWSxJQUFaLEVBQWtCLFFBQWxCLEdBQUE7QUFDTCxVQUFBLElBQUcsTUFBQSxDQUFBLElBQUEsS0FBZ0IsVUFBbkI7QUFDQyxZQUFBLFFBQUEsR0FBVyxJQUFYLENBQUE7QUFBQSxZQUNBLElBQUEsR0FBTyxFQURQLENBREQ7V0FBQTtpQkFHQSxNQUFNLENBQUMsSUFBUCxDQUFZLFNBQVosRUFBdUIsSUFBdkIsRUFBNkIsU0FBQSxHQUFBO0FBQzVCLGdCQUFBLElBQUE7QUFBQSxZQUFBLElBQUEsR0FBTyxTQUFQLENBQUE7bUJBQ0EsVUFBVSxDQUFDLE1BQVgsQ0FBa0IsU0FBQSxHQUFBO0FBQ2pCLGNBQUEsSUFBRyxRQUFIO3VCQUNDLFFBQVEsQ0FBQyxLQUFULENBQWUsTUFBZixFQUF1QixJQUF2QixFQUREO2VBRGlCO1lBQUEsQ0FBbEIsRUFGNEI7VUFBQSxDQUE3QixFQUpLO1FBQUEsQ0FMTjtBQUFBLFFBY0EsYUFBQSxFQUFlLFNBQUMsU0FBRCxFQUFZLElBQVosRUFBa0IsUUFBbEIsR0FBQTtBQUNkLFVBQUEsSUFBQyxDQUFDLElBQUYsQ0FBTyxTQUFQLEVBQWtCLElBQWxCLEVBQXdCLFFBQXhCLENBQUEsQ0FBQTtpQkFDQSxJQUFDLENBQUMsRUFBRixDQUFLLFNBQUwsRUFBZ0IsUUFBaEIsRUFGYztRQUFBLENBZGY7UUFIZ0Y7SUFBQSxDQUF2QjtHQUEzRCxDQUFBLENBQUE7QUFBQSIsImZpbGUiOiJzZXJ2aWNlcy9zb2NrZXRpby5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdtb2VkaXQuU2VydmljZXMnKS5mYWN0b3J5ICdtb2VkaXQuU29ja2V0JywgWyckcm9vdFNjb3BlJywgJyRsb2cnLCAoJHJvb3RTY29wZSwgJGxvZykgLT5cclxuXHRcdHNvY2tldCA9IGlvLmNvbm5lY3QoKVxyXG5cclxuXHRcdG9uOiAoZXZlbnROYW1lLCBjYWxsYmFjaykgLT5cclxuXHRcdFx0c29ja2V0Lm9uIGV2ZW50TmFtZSwgKCkgLT5cclxuXHRcdFx0XHRhcmdzID0gYXJndW1lbnRzXHJcblx0XHRcdFx0JHJvb3RTY29wZS4kYXBwbHkgKCkgLT5cclxuXHRcdFx0XHRcdGNhbGxiYWNrLmFwcGx5KHNvY2tldCwgYXJncylcclxuXHRcdGVtaXQ6IChldmVudE5hbWUsIGRhdGEsIGNhbGxiYWNrKSAtPlxyXG5cdFx0XHRpZiB0eXBlb2YgZGF0YSA9PSAnZnVuY3Rpb24nXHJcblx0XHRcdFx0Y2FsbGJhY2sgPSBkYXRhXHJcblx0XHRcdFx0ZGF0YSA9IHt9XHJcblx0XHRcdHNvY2tldC5lbWl0IGV2ZW50TmFtZSwgZGF0YSwgKCkgLT5cclxuXHRcdFx0XHRhcmdzID0gYXJndW1lbnRzXHJcblx0XHRcdFx0JHJvb3RTY29wZS4kYXBwbHkgKCkgLT5cclxuXHRcdFx0XHRcdGlmIGNhbGxiYWNrXHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmFwcGx5KHNvY2tldCwgYXJncylcclxuXHRcdGVtaXRBbmRMaXN0ZW46IChldmVudE5hbWUsIGRhdGEsIGNhbGxiYWNrKSAtPlxyXG5cdFx0XHRALmVtaXQoZXZlbnROYW1lLCBkYXRhLCBjYWxsYmFjaylcclxuXHRcdFx0QC5vbihldmVudE5hbWUsIGNhbGxiYWNrKVxyXG5cdF0iXX0=