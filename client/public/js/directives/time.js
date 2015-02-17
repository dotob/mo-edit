(function() {
  var app;

  app = angular.module('moedit.App');

  app.directive("time", [
    "$timeout", "$filter", function($timeout, $filter) {
      return function(scope, element, attrs) {
        var filter, intervalLength, time_string, timeoutId, updateLater, updateTime;
        updateTime = function() {
          return element.text(filter(time_string));
        };
        updateLater = function() {
          var timeoutId;
          return timeoutId = $timeout(function() {
            updateTime();
            return updateLater();
          }, intervalLength);
        };
        timeoutId = null;
        time_string = attrs.time;
        intervalLength = 1000 * 10;
        filter = $filter("fromNow");
        element.bind("$destroy", function() {
          return $timeout.cancel(timeoutId);
        });
        updateTime();
        return updateLater();
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvdGltZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEdBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBTyxDQUFDLE1BQVIsQ0FBZ0IsWUFBaEIsQ0FBTixDQUFBOztBQUFBLEVBRUEsR0FBRyxDQUFDLFNBQUosQ0FBZSxNQUFmLEVBQXNCO0lBQUksVUFBSixFQUFpQixTQUFqQixFQUE0QixTQUFDLFFBQUQsRUFBVyxPQUFYLEdBQUE7QUFDakQsYUFBTyxTQUFDLEtBQUQsRUFBUSxPQUFSLEVBQWlCLEtBQWpCLEdBQUE7QUFDTixZQUFBLHVFQUFBO0FBQUEsUUFBQSxVQUFBLEdBQWEsU0FBQSxHQUFBO2lCQUNaLE9BQU8sQ0FBQyxJQUFSLENBQWEsTUFBQSxDQUFPLFdBQVAsQ0FBYixFQURZO1FBQUEsQ0FBYixDQUFBO0FBQUEsUUFHQSxXQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ2IsY0FBQSxTQUFBO2lCQUFBLFNBQUEsR0FBWSxRQUFBLENBQVMsU0FBQSxHQUFBO0FBQ3BCLFlBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQTttQkFDQSxXQUFBLENBQUEsRUFGb0I7VUFBQSxDQUFULEVBR1YsY0FIVSxFQURDO1FBQUEsQ0FIZCxDQUFBO0FBQUEsUUFTQSxTQUFBLEdBQVksSUFUWixDQUFBO0FBQUEsUUFVQSxXQUFBLEdBQWMsS0FBSyxDQUFDLElBVnBCLENBQUE7QUFBQSxRQVdBLGNBQUEsR0FBaUIsSUFBQSxHQUFPLEVBWHhCLENBQUE7QUFBQSxRQVlBLE1BQUEsR0FBUyxPQUFBLENBQVMsU0FBVCxDQVpULENBQUE7QUFBQSxRQWFBLE9BQU8sQ0FBQyxJQUFSLENBQWMsVUFBZCxFQUF5QixTQUFBLEdBQUE7aUJBQ3hCLFFBQVEsQ0FBQyxNQUFULENBQWdCLFNBQWhCLEVBRHdCO1FBQUEsQ0FBekIsQ0FiQSxDQUFBO0FBQUEsUUFnQkEsVUFBQSxDQUFBLENBaEJBLENBQUE7ZUFpQkEsV0FBQSxDQUFBLEVBbEJNO01BQUEsQ0FBUCxDQURpRDtJQUFBLENBQTVCO0dBQXRCLENBRkEsQ0FBQTtBQUFBIiwiZmlsZSI6ImRpcmVjdGl2ZXMvdGltZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFwcCA9IGFuZ3VsYXIubW9kdWxlKCdtb2VkaXQuQXBwJylcclxuXHJcbmFwcC5kaXJlY3RpdmUgXCJ0aW1lXCIsIFsgIFwiJHRpbWVvdXRcIiwgIFwiJGZpbHRlclwiLCAgKCR0aW1lb3V0LCAkZmlsdGVyKSAtPlxyXG5cdHJldHVybiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSAtPlxyXG5cdFx0dXBkYXRlVGltZSA9IC0+XHJcblx0XHRcdGVsZW1lbnQudGV4dCBmaWx0ZXIodGltZV9zdHJpbmcpXHJcblxyXG5cdFx0dXBkYXRlTGF0ZXIgPSAtPlxyXG5cdFx0XHR0aW1lb3V0SWQgPSAkdGltZW91dCgtPlxyXG5cdFx0XHRcdHVwZGF0ZVRpbWUoKVxyXG5cdFx0XHRcdHVwZGF0ZUxhdGVyKClcclxuXHRcdFx0LCBpbnRlcnZhbExlbmd0aClcclxuXHJcblx0XHR0aW1lb3V0SWQgPSBudWxsXHJcblx0XHR0aW1lX3N0cmluZyA9IGF0dHJzLnRpbWVcclxuXHRcdGludGVydmFsTGVuZ3RoID0gMTAwMCAqIDEwICMgMTBzXHJcblx0XHRmaWx0ZXIgPSAkZmlsdGVyKFwiZnJvbU5vd1wiKVxyXG5cdFx0ZWxlbWVudC5iaW5kIFwiJGRlc3Ryb3lcIiwgLT5cclxuXHRcdFx0JHRpbWVvdXQuY2FuY2VsIHRpbWVvdXRJZFxyXG5cclxuXHRcdHVwZGF0ZVRpbWUoKVxyXG5cdFx0dXBkYXRlTGF0ZXIoKVxyXG5dIl19