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

    /**
     * Exception Logging Service, currently only used by the $exceptionHandler
     * it preserves the default behaviour ( logging to the console) but 
     * also posts the error server side after generating a stacktrace.
     */
  });

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2xvZ2dpbmcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0FBQUEsTUFBQSxhQUFBOztBQUFBLEVBQUEsYUFBQSxHQUFnQixPQUFPLENBQUMsTUFBUixDQUFlLGdCQUFmLEVBQWlDLEVBQWpDLENBQWhCLENBQUE7O0FBRUE7QUFBQTs7O0tBRkE7O0FBQUEsRUFNQSxhQUFhLENBQUMsT0FBZCxDQUFzQixjQUF0QixFQUFzQyxTQUFBLEdBQUE7V0FDckM7QUFBQSxNQUFFLEtBQUEsRUFBTyxlQUFUO01BRHFDO0VBQUEsQ0FBdEMsQ0FOQSxDQUFBOztBQVNBO0FBQUE7OztLQVRBOztBQUFBLEVBYUEsYUFBYSxDQUFDLFFBQWQsQ0FBdUIsbUJBQXZCLEVBQTRDO0FBQUEsSUFBQSxJQUFBLEVBQU0sU0FBQyx1QkFBRCxHQUFBO2FBQ2pELHdCQURpRDtJQUFBLENBQU47QUFHNUM7QUFBQTs7OztPQUg0QztHQUE1QyxDQWJBLENBQUE7O0FBQUEsRUFxQkEsYUFBYSxDQUFDLE9BQWQsQ0FBc0IseUJBQXRCLEVBQWlEO0lBQ2hELE1BRGdELEVBRWhELFNBRmdELEVBR2hELGNBSGdELEVBSWhELFNBQUMsSUFBRCxFQUFPLE9BQVAsRUFBZ0IsWUFBaEIsR0FBQTtBQUVDLFVBQUEsS0FBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLFNBQUMsU0FBRCxFQUFZLEtBQVosR0FBQTtBQUdQLFlBQUEsc0NBQUE7QUFBQSxRQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBWCxDQUFpQixJQUFqQixFQUF1QixTQUF2QixDQUFBLENBQUE7QUFFQTtBQUNDLFVBQUEsWUFBQSxHQUFlLFNBQVMsQ0FBQyxRQUFWLENBQUEsQ0FBZixDQUFBO0FBQUEsVUFFQSxVQUFBLEdBQWEsWUFBWSxDQUFDLEtBQWIsQ0FBbUI7QUFBQSxZQUFBLENBQUEsRUFBRyxTQUFIO1dBQW5CLENBRmIsQ0FBQTtBQUFBLFVBS0EsQ0FBQyxDQUFDLElBQUYsQ0FDQztBQUFBLFlBQUEsSUFBQSxFQUFNLE1BQU47QUFBQSxZQUNBLEdBQUEsRUFBSyxTQURMO0FBQUEsWUFFQSxXQUFBLEVBQWEsa0JBRmI7QUFBQSxZQUdBLElBQUEsRUFBTSxPQUFPLENBQUMsTUFBUixDQUNMO0FBQUEsY0FBQSxHQUFBLEVBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUF0QjtBQUFBLGNBQ0EsT0FBQSxFQUFTLFlBRFQ7QUFBQSxjQUVBLElBQUEsRUFBTSxXQUZOO0FBQUEsY0FHQSxVQUFBLEVBQVksVUFIWjtBQUFBLGNBSUEsS0FBQSxFQUFPLEtBQUEsSUFBUyxFQUpoQjthQURLLENBSE47V0FERCxDQUxBLENBREQ7U0FBQSxjQUFBO0FBa0JDLFVBREsscUJBQ0wsQ0FBQTtBQUFBLFVBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxrQ0FBVixDQUFBLENBQUE7QUFBQSxVQUNBLElBQUksQ0FBQyxHQUFMLENBQVMsWUFBVCxDQURBLENBbEJEO1NBTE87TUFBQSxDQUFSLENBQUE7YUEyQkEsTUE3QkQ7SUFBQSxDQUpnRDtHQUFqRCxDQXJCQSxDQUFBO0FBQUEiLCJmaWxlIjoic2VydmljZXMvbG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIiMgaHR0cDovL2VuZ2luZWVyaW5nLnRhbGlzLmNvbS9hcnRpY2xlcy9jbGllbnQtc2lkZS1lcnJvci1sb2dnaW5nL1xubG9nZ2luZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtb2VkaXQuTG9nZ2luZycsIFtdKVxuXG4jIyMqXG4jIFNlcnZpY2UgdGhhdCBnaXZlcyB1cyBhIG5pY2UgQW5ndWxhci1lc3F1ZSB3cmFwcGVyIGFyb3VuZCB0aGVcbiMgc3RhY2tUcmFjZS5qcyBwaW50U3RhY2tUcmFjZSgpIG1ldGhvZC4gXG4jIyNcbmxvZ2dpbmdNb2R1bGUuZmFjdG9yeSAndHJhY2VTZXJ2aWNlJywgLT5cblx0eyBwcmludDogcHJpbnRTdGFja1RyYWNlIH1cblxuIyMjKlxuIyBPdmVycmlkZSBBbmd1bGFyJ3MgYnVpbHQgaW4gZXhjZXB0aW9uIGhhbmRsZXIsIGFuZCB0ZWxsIGl0IHRvIFxuIyB1c2Ugb3VyIG5ldyBleGNlcHRpb25Mb2dnaW5nU2VydmljZSB3aGljaCBpcyBkZWZpbmVkIGJlbG93XG4jIyNcbmxvZ2dpbmdNb2R1bGUucHJvdmlkZXIgJyRleGNlcHRpb25IYW5kbGVyJywgJGdldDogKGV4Y2VwdGlvbkxvZ2dpbmdTZXJ2aWNlKSAtPlxuXHRleGNlcHRpb25Mb2dnaW5nU2VydmljZVxuXG4jIyMqXG4jIEV4Y2VwdGlvbiBMb2dnaW5nIFNlcnZpY2UsIGN1cnJlbnRseSBvbmx5IHVzZWQgYnkgdGhlICRleGNlcHRpb25IYW5kbGVyXG4jIGl0IHByZXNlcnZlcyB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgKCBsb2dnaW5nIHRvIHRoZSBjb25zb2xlKSBidXQgXG4jIGFsc28gcG9zdHMgdGhlIGVycm9yIHNlcnZlciBzaWRlIGFmdGVyIGdlbmVyYXRpbmcgYSBzdGFja3RyYWNlLlxuIyMjXG5sb2dnaW5nTW9kdWxlLmZhY3RvcnkgJ2V4Y2VwdGlvbkxvZ2dpbmdTZXJ2aWNlJywgW1xuXHQnJGxvZydcblx0JyR3aW5kb3cnXG5cdCd0cmFjZVNlcnZpY2UnXG5cdCgkbG9nLCAkd2luZG93LCB0cmFjZVNlcnZpY2UpIC0+XG5cblx0XHRlcnJvciA9IChleGNlcHRpb24sIGNhdXNlKSAtPlxuXHRcdFx0IyBwcmVzZXJ2ZSB0aGUgZGVmYXVsdCBiZWhhdmlvdXIgd2hpY2ggd2lsbCBsb2cgdGhlIGVycm9yXG5cdFx0XHQjIHRvIHRoZSBjb25zb2xlLCBhbmQgYWxsb3cgdGhlIGFwcGxpY2F0aW9uIHRvIGNvbnRpbnVlIHJ1bm5pbmcuXG5cdFx0XHQkbG9nLmVycm9yLmFwcGx5ICRsb2csIGFyZ3VtZW50c1xuXHRcdFx0IyBub3cgdHJ5IHRvIGxvZyB0aGUgZXJyb3IgdG8gdGhlIHNlcnZlciBzaWRlLlxuXHRcdFx0dHJ5XG5cdFx0XHRcdGVycm9yTWVzc2FnZSA9IGV4Y2VwdGlvbi50b1N0cmluZygpXG5cdFx0XHRcdCMgdXNlIG91ciB0cmFjZVNlcnZpY2UgdG8gZ2VuZXJhdGUgYSBzdGFjayB0cmFjZVxuXHRcdFx0XHRzdGFja1RyYWNlID0gdHJhY2VTZXJ2aWNlLnByaW50KGU6IGV4Y2VwdGlvbilcblxuXHRcdFx0XHQjIFRPRE8gYWRkIG1lYW5pbmdmdWwgZGF0YVxuXHRcdFx0XHQkLmFqYXhcblx0XHRcdFx0XHR0eXBlOiAnUE9TVCdcblx0XHRcdFx0XHR1cmw6ICcvbG9nZ2VyJyBcblx0XHRcdFx0XHRjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdFx0ZGF0YTogYW5ndWxhci50b0pzb25cblx0XHRcdFx0XHRcdHVybDogJHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cdFx0XHRcdFx0XHRtZXNzYWdlOiBlcnJvck1lc3NhZ2Vcblx0XHRcdFx0XHRcdHR5cGU6ICdleGNlcHRpb24nXG5cdFx0XHRcdFx0XHRzdGFja1RyYWNlOiBzdGFja1RyYWNlXG5cdFx0XHRcdFx0XHRjYXVzZTogY2F1c2UgfHwgJydcblxuXHRcdFx0Y2F0Y2ggbG9nZ2luZ0Vycm9yXG5cdFx0XHRcdCRsb2cud2FybiAnRXJyb3Igc2VydmVyLXNpZGUgbG9nZ2luZyBmYWlsZWQnXG5cdFx0XHRcdCRsb2cubG9nIGxvZ2dpbmdFcnJvclxuXHRcdFx0cmV0dXJuXG5cblx0XHRlcnJvclxuXVxuIl19