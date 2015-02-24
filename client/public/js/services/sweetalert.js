(function() {
  angular.module("moedit.Services").factory("moedit.SweetAlert", [
    '$timeout', '$window', function($timeout, $window) {
      var self, swal;
      swal = $window.swal;
      self = {
        swal: function(arg1, arg2, arg3) {
          return $timeout((function() {
            if (typeof arg2 === "function") {
              return swal(arg1, (function(isConfirm) {
                return $timeout(function() {
                  return arg2(isConfirm);
                });
              }), arg3);
            } else {
              return swal(arg1, arg2, arg3);
            }
          }), 200);
        },
        adv: function(object) {
          return $timeout((function() {
            return swal(object);
          }), 200);
        },
        timed: function(title, message, type, time) {
          return $timeout((function() {
            return swal({
              title: title,
              text: message,
              type: type,
              timer: time
            });
          }), 200);
        },
        success: function(title, message) {
          return $timeout((function() {
            return swal(title, message, "success");
          }), 200);
        },
        error: function(title, message) {
          return $timeout((function() {
            return swal(title, message, "error");
          }), 200);
        },
        warning: function(title, message) {
          return $timeout((function() {
            return swal(title, message, "warning");
          }), 200);
        },
        info: function(title, message) {
          return $timeout((function() {
            return swal(title, message, "info");
          }), 200);
        }
      };
      return self;
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL3N3ZWV0YWxlcnQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsRUFBQSxPQUFPLENBQUMsTUFBUixDQUFnQixpQkFBaEIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEyQyxtQkFBM0MsRUFBK0Q7SUFBRyxVQUFILEVBQWUsU0FBZixFQUF5QixTQUFDLFFBQUQsRUFBVyxPQUFYLEdBQUE7QUFDdEYsVUFBQSxVQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sT0FBTyxDQUFDLElBQWYsQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUNDO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsR0FBQTtpQkFDTCxRQUFBLENBQVMsQ0FBQyxTQUFBLEdBQUE7QUFDVCxZQUFBLElBQUcsTUFBQSxDQUFBLElBQUEsS0FBa0IsVUFBckI7cUJBQ0MsSUFBQSxDQUFLLElBQUwsRUFBVyxDQUFDLFNBQUMsU0FBRCxHQUFBO3VCQUNYLFFBQUEsQ0FBUyxTQUFBLEdBQUE7eUJBQ1IsSUFBQSxDQUFLLFNBQUwsRUFEUTtnQkFBQSxDQUFULEVBRFc7Y0FBQSxDQUFELENBQVgsRUFHRyxJQUhILEVBREQ7YUFBQSxNQUFBO3FCQU1DLElBQUEsQ0FBSyxJQUFMLEVBQVcsSUFBWCxFQUFpQixJQUFqQixFQU5EO2FBRFM7VUFBQSxDQUFELENBQVQsRUFRRyxHQVJILEVBREs7UUFBQSxDQUFOO0FBQUEsUUFXQSxHQUFBLEVBQUssU0FBQyxNQUFELEdBQUE7aUJBQ0osUUFBQSxDQUFTLENBQUMsU0FBQSxHQUFBO21CQUNULElBQUEsQ0FBSyxNQUFMLEVBRFM7VUFBQSxDQUFELENBQVQsRUFFRyxHQUZILEVBREk7UUFBQSxDQVhMO0FBQUEsUUFnQkEsS0FBQSxFQUFPLFNBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIsSUFBakIsRUFBdUIsSUFBdkIsR0FBQTtpQkFDTixRQUFBLENBQVMsQ0FBQyxTQUFBLEdBQUE7bUJBQ1QsSUFBQSxDQUNDO0FBQUEsY0FBQSxLQUFBLEVBQU8sS0FBUDtBQUFBLGNBQ0EsSUFBQSxFQUFNLE9BRE47QUFBQSxjQUVBLElBQUEsRUFBTSxJQUZOO0FBQUEsY0FHQSxLQUFBLEVBQU8sSUFIUDthQURELEVBRFM7VUFBQSxDQUFELENBQVQsRUFNRyxHQU5ILEVBRE07UUFBQSxDQWhCUDtBQUFBLFFBeUJBLE9BQUEsRUFBUyxTQUFDLEtBQUQsRUFBUSxPQUFSLEdBQUE7aUJBQ1IsUUFBQSxDQUFTLENBQUMsU0FBQSxHQUFBO21CQUNULElBQUEsQ0FBSyxLQUFMLEVBQVksT0FBWixFQUFzQixTQUF0QixFQURTO1VBQUEsQ0FBRCxDQUFULEVBRUcsR0FGSCxFQURRO1FBQUEsQ0F6QlQ7QUFBQSxRQThCQSxLQUFBLEVBQU8sU0FBQyxLQUFELEVBQVEsT0FBUixHQUFBO2lCQUNOLFFBQUEsQ0FBUyxDQUFDLFNBQUEsR0FBQTttQkFDVCxJQUFBLENBQUssS0FBTCxFQUFZLE9BQVosRUFBc0IsT0FBdEIsRUFEUztVQUFBLENBQUQsQ0FBVCxFQUVHLEdBRkgsRUFETTtRQUFBLENBOUJQO0FBQUEsUUFtQ0EsT0FBQSxFQUFTLFNBQUMsS0FBRCxFQUFRLE9BQVIsR0FBQTtpQkFDUixRQUFBLENBQVMsQ0FBQyxTQUFBLEdBQUE7bUJBQ1QsSUFBQSxDQUFLLEtBQUwsRUFBWSxPQUFaLEVBQXNCLFNBQXRCLEVBRFM7VUFBQSxDQUFELENBQVQsRUFFRyxHQUZILEVBRFE7UUFBQSxDQW5DVDtBQUFBLFFBd0NBLElBQUEsRUFBTSxTQUFDLEtBQUQsRUFBUSxPQUFSLEdBQUE7aUJBQ0wsUUFBQSxDQUFTLENBQUMsU0FBQSxHQUFBO21CQUNULElBQUEsQ0FBSyxLQUFMLEVBQVksT0FBWixFQUFzQixNQUF0QixFQURTO1VBQUEsQ0FBRCxDQUFULEVBRUcsR0FGSCxFQURLO1FBQUEsQ0F4Q047T0FKRCxDQUFBO2FBZ0RBLEtBakRzRjtJQUFBLENBQXpCO0dBQS9ELENBQUEsQ0FBQTtBQUFBIiwiZmlsZSI6InNlcnZpY2VzL3N3ZWV0YWxlcnQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZShcIm1vZWRpdC5TZXJ2aWNlc1wiKS5mYWN0b3J5IFwibW9lZGl0LlN3ZWV0QWxlcnRcIiwgWyAnJHRpbWVvdXQnLCAnJHdpbmRvdycsICgkdGltZW91dCwgJHdpbmRvdykgLT5cclxuXHRcdHN3YWwgPSAkd2luZG93LnN3YWxcclxuXHRcdFxyXG5cdFx0I3B1YmxpYyBtZXRob2RzXHJcblx0XHRzZWxmID1cclxuXHRcdFx0c3dhbDogKGFyZzEsIGFyZzIsIGFyZzMpIC0+XHJcblx0XHRcdFx0JHRpbWVvdXQgKC0+XHJcblx0XHRcdFx0XHRpZiB0eXBlb2YgKGFyZzIpIGlzIFwiZnVuY3Rpb25cIlxyXG5cdFx0XHRcdFx0XHRzd2FsIGFyZzEsICgoaXNDb25maXJtKSAtPlxyXG5cdFx0XHRcdFx0XHRcdCR0aW1lb3V0IC0+XHJcblx0XHRcdFx0XHRcdFx0XHRhcmcyIGlzQ29uZmlybVxyXG5cdFx0XHRcdFx0XHQpLCBhcmczXHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHN3YWwgYXJnMSwgYXJnMiwgYXJnM1xyXG5cdFx0XHRcdCksIDIwMFxyXG5cclxuXHRcdFx0YWR2OiAob2JqZWN0KSAtPlxyXG5cdFx0XHRcdCR0aW1lb3V0ICgtPlxyXG5cdFx0XHRcdFx0c3dhbCBvYmplY3RcclxuXHRcdFx0XHQpLCAyMDBcclxuXHJcblx0XHRcdHRpbWVkOiAodGl0bGUsIG1lc3NhZ2UsIHR5cGUsIHRpbWUpIC0+XHJcblx0XHRcdFx0JHRpbWVvdXQgKC0+XHJcblx0XHRcdFx0XHRzd2FsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiB0aXRsZVxyXG5cdFx0XHRcdFx0XHR0ZXh0OiBtZXNzYWdlXHJcblx0XHRcdFx0XHRcdHR5cGU6IHR5cGVcclxuXHRcdFx0XHRcdFx0dGltZXI6IHRpbWVcclxuXHRcdFx0XHQpLCAyMDBcclxuXHJcblx0XHRcdHN1Y2Nlc3M6ICh0aXRsZSwgbWVzc2FnZSkgLT5cclxuXHRcdFx0XHQkdGltZW91dCAoLT5cclxuXHRcdFx0XHRcdHN3YWwgdGl0bGUsIG1lc3NhZ2UsIFwic3VjY2Vzc1wiXHJcblx0XHRcdFx0KSwgMjAwXHJcblxyXG5cdFx0XHRlcnJvcjogKHRpdGxlLCBtZXNzYWdlKSAtPlxyXG5cdFx0XHRcdCR0aW1lb3V0ICgtPlxyXG5cdFx0XHRcdFx0c3dhbCB0aXRsZSwgbWVzc2FnZSwgXCJlcnJvclwiXHJcblx0XHRcdFx0KSwgMjAwXHJcblxyXG5cdFx0XHR3YXJuaW5nOiAodGl0bGUsIG1lc3NhZ2UpIC0+XHJcblx0XHRcdFx0JHRpbWVvdXQgKC0+XHJcblx0XHRcdFx0XHRzd2FsIHRpdGxlLCBtZXNzYWdlLCBcIndhcm5pbmdcIlxyXG5cdFx0XHRcdCksIDIwMFxyXG5cclxuXHRcdFx0aW5mbzogKHRpdGxlLCBtZXNzYWdlKSAtPlxyXG5cdFx0XHRcdCR0aW1lb3V0ICgtPlxyXG5cdFx0XHRcdFx0c3dhbCB0aXRsZSwgbWVzc2FnZSwgXCJpbmZvXCJcclxuXHRcdFx0XHQpLCAyMDBcclxuXHRcdHNlbGZcclxuXSJdfQ==