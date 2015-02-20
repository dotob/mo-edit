(function() {
  var loggingModule;

  loggingModule = angular.module('moedit.Logging', []);


  /**
   * Service that gives us a nice Angular-esque wrapper around the
   * stackTrace.js pintStackTrace() method.
   */

  loggingModule.factory('traceService', function() {
    return {
      print: printStackTrace
    };
  });


  /**
   * Override Angular's built in exception handler, and tell it to 
   * use our new exceptionLoggingService which is defined below
   */

  loggingModule.provider('$exceptionHandler', {
    $get: function(exceptionLoggingService) {
      return exceptionLoggingService;
    }
  });


  /**
   * Exception Logging Service, currently only used by the $exceptionHandler
   * it preserves the default behaviour ( logging to the console) but 
   * also posts the error server side after generating a stacktrace.
   */

  loggingModule.factory('exceptionLoggingService', [
    '$log', '$window', 'traceService', function($log, $window, traceService) {
      var error;
      error = function(exception, cause) {
        var errorMessage, loggingError, stackTrace;
        $log.error.apply($log, arguments);
        try {
          errorMessage = exception.toString();
          stackTrace = traceService.print({
            e: exception
          });
          $.ajax({
            type: 'POST',
            url: '/logger',
            contentType: 'application/json',
            data: angular.toJson({
              url: $window.location.href,
              message: errorMessage,
              type: 'exception',
              stackTrace: stackTrace,
              cause: cause || ''
            })
          });
        } catch (_error) {
          loggingError = _error;
          $log.warn('Error server-side logging failed');
          $log.log(loggingError);
        }
      };
      return error;
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2xvZ2dpbmcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0FBQUEsTUFBQSxhQUFBOztBQUFBLEVBQUEsYUFBQSxHQUFnQixPQUFPLENBQUMsTUFBUixDQUFnQixnQkFBaEIsRUFBaUMsRUFBakMsQ0FBaEIsQ0FBQTs7QUFFQTtBQUFBOzs7S0FGQTs7QUFBQSxFQU1BLGFBQWEsQ0FBQyxPQUFkLENBQXVCLGNBQXZCLEVBQXNDLFNBQUEsR0FBQTtXQUNyQztBQUFBLE1BQUUsS0FBQSxFQUFPLGVBQVQ7TUFEcUM7RUFBQSxDQUF0QyxDQU5BLENBQUE7O0FBU0E7QUFBQTs7O0tBVEE7O0FBQUEsRUFhQSxhQUFhLENBQUMsUUFBZCxDQUF3QixtQkFBeEIsRUFBNEM7QUFBQSxJQUFBLElBQUEsRUFBTSxTQUFDLHVCQUFELEdBQUE7YUFDakQsd0JBRGlEO0lBQUEsQ0FBTjtHQUE1QyxDQWJBLENBQUE7O0FBZ0JBO0FBQUE7Ozs7S0FoQkE7O0FBQUEsRUFxQkEsYUFBYSxDQUFDLE9BQWQsQ0FBdUIseUJBQXZCLEVBQWlEO0lBQy9DLE1BRCtDLEVBRS9DLFNBRitDLEVBRy9DLGNBSCtDLEVBSWhELFNBQUMsSUFBRCxFQUFPLE9BQVAsRUFBZ0IsWUFBaEIsR0FBQTtBQUVDLFVBQUEsS0FBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLFNBQUMsU0FBRCxFQUFZLEtBQVosR0FBQTtBQUdQLFlBQUEsc0NBQUE7QUFBQSxRQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBWCxDQUFpQixJQUFqQixFQUF1QixTQUF2QixDQUFBLENBQUE7QUFFQTtBQUNDLFVBQUEsWUFBQSxHQUFlLFNBQVMsQ0FBQyxRQUFWLENBQUEsQ0FBZixDQUFBO0FBQUEsVUFFQSxVQUFBLEdBQWEsWUFBWSxDQUFDLEtBQWIsQ0FBbUI7QUFBQSxZQUFBLENBQUEsRUFBRyxTQUFIO1dBQW5CLENBRmIsQ0FBQTtBQUFBLFVBS0EsQ0FBQyxDQUFDLElBQUYsQ0FDQztBQUFBLFlBQUEsSUFBQSxFQUFPLE1BQVA7QUFBQSxZQUNBLEdBQUEsRUFBTSxTQUROO0FBQUEsWUFFQSxXQUFBLEVBQWMsa0JBRmQ7QUFBQSxZQUdBLElBQUEsRUFBTSxPQUFPLENBQUMsTUFBUixDQUNMO0FBQUEsY0FBQSxHQUFBLEVBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUF0QjtBQUFBLGNBQ0EsT0FBQSxFQUFTLFlBRFQ7QUFBQSxjQUVBLElBQUEsRUFBTyxXQUZQO0FBQUEsY0FHQSxVQUFBLEVBQVksVUFIWjtBQUFBLGNBSUEsS0FBQSxFQUFPLEtBQUEsSUFBVSxFQUpqQjthQURLLENBSE47V0FERCxDQUxBLENBREQ7U0FBQSxjQUFBO0FBa0JDLFVBREsscUJBQ0wsQ0FBQTtBQUFBLFVBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVyxrQ0FBWCxDQUFBLENBQUE7QUFBQSxVQUNBLElBQUksQ0FBQyxHQUFMLENBQVMsWUFBVCxDQURBLENBbEJEO1NBTE87TUFBQSxDQUFSLENBQUE7YUEyQkEsTUE3QkQ7SUFBQSxDQUpnRDtHQUFqRCxDQXJCQSxDQUFBO0FBQUEiLCJmaWxlIjoic2VydmljZXMvbG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIiMgaHR0cDovL2VuZ2luZWVyaW5nLnRhbGlzLmNvbS9hcnRpY2xlcy9jbGllbnQtc2lkZS1lcnJvci1sb2dnaW5nL1xyXG5sb2dnaW5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21vZWRpdC5Mb2dnaW5nJywgW10pXHJcblxyXG4jIyMqXHJcbiMgU2VydmljZSB0aGF0IGdpdmVzIHVzIGEgbmljZSBBbmd1bGFyLWVzcXVlIHdyYXBwZXIgYXJvdW5kIHRoZVxyXG4jIHN0YWNrVHJhY2UuanMgcGludFN0YWNrVHJhY2UoKSBtZXRob2QuIFxyXG4jIyNcclxubG9nZ2luZ01vZHVsZS5mYWN0b3J5ICd0cmFjZVNlcnZpY2UnLCAtPlxyXG5cdHsgcHJpbnQ6IHByaW50U3RhY2tUcmFjZSB9XHJcblxyXG4jIyMqXHJcbiMgT3ZlcnJpZGUgQW5ndWxhcidzIGJ1aWx0IGluIGV4Y2VwdGlvbiBoYW5kbGVyLCBhbmQgdGVsbCBpdCB0byBcclxuIyB1c2Ugb3VyIG5ldyBleGNlcHRpb25Mb2dnaW5nU2VydmljZSB3aGljaCBpcyBkZWZpbmVkIGJlbG93XHJcbiMjI1xyXG5sb2dnaW5nTW9kdWxlLnByb3ZpZGVyICckZXhjZXB0aW9uSGFuZGxlcicsICRnZXQ6IChleGNlcHRpb25Mb2dnaW5nU2VydmljZSkgLT5cclxuXHRleGNlcHRpb25Mb2dnaW5nU2VydmljZVxyXG5cclxuIyMjKlxyXG4jIEV4Y2VwdGlvbiBMb2dnaW5nIFNlcnZpY2UsIGN1cnJlbnRseSBvbmx5IHVzZWQgYnkgdGhlICRleGNlcHRpb25IYW5kbGVyXHJcbiMgaXQgcHJlc2VydmVzIHRoZSBkZWZhdWx0IGJlaGF2aW91ciAoIGxvZ2dpbmcgdG8gdGhlIGNvbnNvbGUpIGJ1dCBcclxuIyBhbHNvIHBvc3RzIHRoZSBlcnJvciBzZXJ2ZXIgc2lkZSBhZnRlciBnZW5lcmF0aW5nIGEgc3RhY2t0cmFjZS5cclxuIyMjXHJcbmxvZ2dpbmdNb2R1bGUuZmFjdG9yeSAnZXhjZXB0aW9uTG9nZ2luZ1NlcnZpY2UnLCBbXHJcblx0JyRsb2cnXHJcblx0JyR3aW5kb3cnXHJcblx0J3RyYWNlU2VydmljZSdcclxuXHQoJGxvZywgJHdpbmRvdywgdHJhY2VTZXJ2aWNlKSAtPlxyXG5cclxuXHRcdGVycm9yID0gKGV4Y2VwdGlvbiwgY2F1c2UpIC0+XHJcblx0XHRcdCMgcHJlc2VydmUgdGhlIGRlZmF1bHQgYmVoYXZpb3VyIHdoaWNoIHdpbGwgbG9nIHRoZSBlcnJvclxyXG5cdFx0XHQjIHRvIHRoZSBjb25zb2xlLCBhbmQgYWxsb3cgdGhlIGFwcGxpY2F0aW9uIHRvIGNvbnRpbnVlIHJ1bm5pbmcuXHJcblx0XHRcdCRsb2cuZXJyb3IuYXBwbHkgJGxvZywgYXJndW1lbnRzXHJcblx0XHRcdCMgbm93IHRyeSB0byBsb2cgdGhlIGVycm9yIHRvIHRoZSBzZXJ2ZXIgc2lkZS5cclxuXHRcdFx0dHJ5XHJcblx0XHRcdFx0ZXJyb3JNZXNzYWdlID0gZXhjZXB0aW9uLnRvU3RyaW5nKClcclxuXHRcdFx0XHQjIHVzZSBvdXIgdHJhY2VTZXJ2aWNlIHRvIGdlbmVyYXRlIGEgc3RhY2sgdHJhY2VcclxuXHRcdFx0XHRzdGFja1RyYWNlID0gdHJhY2VTZXJ2aWNlLnByaW50KGU6IGV4Y2VwdGlvbilcclxuXHJcblx0XHRcdFx0IyBUT0RPIGFkZCBtZWFuaW5nZnVsIGRhdGFcclxuXHRcdFx0XHQkLmFqYXhcclxuXHRcdFx0XHRcdHR5cGU6ICdQT1NUJ1xyXG5cdFx0XHRcdFx0dXJsOiAnL2xvZ2dlcicgXHJcblx0XHRcdFx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXHJcblx0XHRcdFx0XHRkYXRhOiBhbmd1bGFyLnRvSnNvblxyXG5cdFx0XHRcdFx0XHR1cmw6ICR3aW5kb3cubG9jYXRpb24uaHJlZlxyXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBlcnJvck1lc3NhZ2VcclxuXHRcdFx0XHRcdFx0dHlwZTogJ2V4Y2VwdGlvbidcclxuXHRcdFx0XHRcdFx0c3RhY2tUcmFjZTogc3RhY2tUcmFjZVxyXG5cdFx0XHRcdFx0XHRjYXVzZTogY2F1c2UgfHwgJydcclxuXHJcblx0XHRcdGNhdGNoIGxvZ2dpbmdFcnJvclxyXG5cdFx0XHRcdCRsb2cud2FybiAnRXJyb3Igc2VydmVyLXNpZGUgbG9nZ2luZyBmYWlsZWQnXHJcblx0XHRcdFx0JGxvZy5sb2cgbG9nZ2luZ0Vycm9yXHJcblx0XHRcdHJldHVyblxyXG5cclxuXHRcdGVycm9yXHJcbl1cclxuIl19