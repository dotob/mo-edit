(function() {
  angular.module("moedit.Services").factory("moedit.Auth", [
    '$rootScope', 'ipCookie', '$log', function($rootScope, ipCookie, $log) {
      var self;
      self = {
        login: function(username, password) {
          var authCookie, success;
          $log.debug("login user: " + username + ", password: " + password);
          authCookie = ipCookie(cookieKey);
          $log.debug("login user: auth cookie is " + (JSON.stringify(authCookie)));
          $log.debug("received login response: " + (JSON.stringify(loginData)));
          success = true;
          if (success) {
            $rootScope.user = {
              name: username,
              sessionToken: password
            };
            ipCookie(cookieKey, $rootScope.user, cookieOptions);
            return $rootScope.userLoggedIn = true;
          }
        },
        logout: function() {
          $rootScope.user = null;
          $rootScope.userLoggedIn = false;
          return ipCookie.remove(cookieKey);
        },
        isLoggedIn: function() {
          var authCookie, fake;
          authCookie = ipCookie(cookieKey);
          $log.info("isLoggedIn: auth cookie is " + (JSON.stringify(authCookie)));
          fake = false;
          if (fake) {
            this.login("John Doe", "secret");
            $rootScope.userLoggedIn = true;
          }
          $log.info("isLoggedIn: $rootScope.userLoggedIn is " + $rootScope.userLoggedIn);
          return $rootScope.userLoggedIn;
        }
      };
      return self;
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGguY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsRUFBQSxPQUFPLENBQUMsTUFBUixDQUFnQixpQkFBaEIsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEyQyxhQUEzQyxFQUF5RDtJQUN2RCxZQUR1RCxFQUV2RCxVQUZ1RCxFQUd2RCxNQUh1RCxFQUl4RCxTQUFDLFVBQUQsRUFBYSxRQUFiLEVBQXVCLElBQXZCLEdBQUE7QUFFQyxVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FDQztBQUFBLFFBQUEsS0FBQSxFQUFPLFNBQUMsUUFBRCxFQUFXLFFBQVgsR0FBQTtBQUNOLGNBQUEsbUJBQUE7QUFBQSxVQUFBLElBQUksQ0FBQyxLQUFMLENBQVksY0FBQSxHQUFjLFFBQWQsR0FBdUIsY0FBdkIsR0FBcUMsUUFBakQsQ0FBQSxDQUFBO0FBQUEsVUFDQSxVQUFBLEdBQWEsUUFBQSxDQUFTLFNBQVQsQ0FEYixDQUFBO0FBQUEsVUFFQSxJQUFJLENBQUMsS0FBTCxDQUFZLDZCQUFBLEdBQTRCLENBQUMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxVQUFmLENBQUQsQ0FBeEMsQ0FGQSxDQUFBO0FBQUEsVUFLQSxJQUFJLENBQUMsS0FBTCxDQUFZLDJCQUFBLEdBQTBCLENBQUMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxTQUFmLENBQUQsQ0FBdEMsQ0FMQSxDQUFBO0FBQUEsVUFNQSxPQUFBLEdBQVUsSUFOVixDQUFBO0FBT0EsVUFBQSxJQUFHLE9BQUg7QUFDQyxZQUFBLFVBQVUsQ0FBQyxJQUFYLEdBQ0M7QUFBQSxjQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsY0FDQSxZQUFBLEVBQWMsUUFEZDthQURELENBQUE7QUFBQSxZQUtBLFFBQUEsQ0FBUyxTQUFULEVBQW9CLFVBQVUsQ0FBQyxJQUEvQixFQUFxQyxhQUFyQyxDQUxBLENBQUE7bUJBTUEsVUFBVSxDQUFDLFlBQVgsR0FBMEIsS0FQM0I7V0FSTTtRQUFBLENBQVA7QUFBQSxRQWlCQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ1AsVUFBQSxVQUFVLENBQUMsSUFBWCxHQUFrQixJQUFsQixDQUFBO0FBQUEsVUFDQSxVQUFVLENBQUMsWUFBWCxHQUEwQixLQUQxQixDQUFBO2lCQUVBLFFBQVEsQ0FBQyxNQUFULENBQWdCLFNBQWhCLEVBSE87UUFBQSxDQWpCUjtBQUFBLFFBc0JBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDWCxjQUFBLGdCQUFBO0FBQUEsVUFBQSxVQUFBLEdBQWEsUUFBQSxDQUFTLFNBQVQsQ0FBYixDQUFBO0FBQUEsVUFDQSxJQUFJLENBQUMsSUFBTCxDQUFXLDZCQUFBLEdBQTRCLENBQUMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxVQUFmLENBQUQsQ0FBdkMsQ0FEQSxDQUFBO0FBQUEsVUFFQSxJQUFBLEdBQU8sS0FGUCxDQUFBO0FBR0EsVUFBQSxJQUFHLElBQUg7QUFDQyxZQUFBLElBQUMsQ0FBQSxLQUFELENBQVEsVUFBUixFQUFvQixRQUFwQixDQUFBLENBQUE7QUFBQSxZQUNBLFVBQVUsQ0FBQyxZQUFYLEdBQTBCLElBRDFCLENBREQ7V0FIQTtBQUFBLFVBT0EsSUFBSSxDQUFDLElBQUwsQ0FBVyx5Q0FBQSxHQUF5QyxVQUFVLENBQUMsWUFBL0QsQ0FQQSxDQUFBO2lCQVFBLFVBQVUsQ0FBQyxhQVRBO1FBQUEsQ0F0Qlo7T0FERCxDQUFBO2FBa0NBLEtBcENEO0lBQUEsQ0FKd0Q7R0FBekQsQ0FBQSxDQUFBO0FBQUEiLCJmaWxlIjoic2VydmljZXMvYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKFwibW9lZGl0LlNlcnZpY2VzXCIpLmZhY3RvcnkgXCJtb2VkaXQuQXV0aFwiLCBbIFxuXHQnJHJvb3RTY29wZSdcblx0J2lwQ29va2llJ1xuXHQnJGxvZydcblx0KCRyb290U2NvcGUsIGlwQ29va2llLCAkbG9nKSAtPlxuXG5cdFx0c2VsZiA9XG5cdFx0XHRsb2dpbjogKHVzZXJuYW1lLCBwYXNzd29yZCkgLT5cblx0XHRcdFx0JGxvZy5kZWJ1ZyBcImxvZ2luIHVzZXI6ICN7dXNlcm5hbWV9LCBwYXNzd29yZDogI3twYXNzd29yZH1cIlxuXHRcdFx0XHRhdXRoQ29va2llID0gaXBDb29raWUgY29va2llS2V5XG5cdFx0XHRcdCRsb2cuZGVidWcgXCJsb2dpbiB1c2VyOiBhdXRoIGNvb2tpZSBpcyAje0pTT04uc3RyaW5naWZ5KGF1dGhDb29raWUpfVwiXG5cblx0XHRcdFx0IyBhc2sgc2VydmVyXG5cdFx0XHRcdCRsb2cuZGVidWcgXCJyZWNlaXZlZCBsb2dpbiByZXNwb25zZTogI3tKU09OLnN0cmluZ2lmeShsb2dpbkRhdGEpfVwiXG5cdFx0XHRcdHN1Y2Nlc3MgPSB0cnVlICMgVE9ET1xuXHRcdFx0XHRpZiBzdWNjZXNzXG5cdFx0XHRcdFx0JHJvb3RTY29wZS51c2VyID1cblx0XHRcdFx0XHRcdG5hbWU6IHVzZXJuYW1lXG5cdFx0XHRcdFx0XHRzZXNzaW9uVG9rZW46IHBhc3N3b3JkICMgVE9ETzogY2hhbmdlIHRoaXNcblxuXHRcdFx0XHRcdCMgc2V0IGNvb2tpZVxuXHRcdFx0XHRcdGlwQ29va2llIGNvb2tpZUtleSwgJHJvb3RTY29wZS51c2VyLCBjb29raWVPcHRpb25zXG5cdFx0XHRcdFx0JHJvb3RTY29wZS51c2VyTG9nZ2VkSW4gPSB0cnVlXG5cblx0XHRcdGxvZ291dDogLT5cblx0XHRcdFx0JHJvb3RTY29wZS51c2VyID0gbnVsbFxuXHRcdFx0XHQkcm9vdFNjb3BlLnVzZXJMb2dnZWRJbiA9IGZhbHNlXG5cdFx0XHRcdGlwQ29va2llLnJlbW92ZSBjb29raWVLZXlcblxuXHRcdFx0aXNMb2dnZWRJbjogLT5cblx0XHRcdFx0YXV0aENvb2tpZSA9IGlwQ29va2llIGNvb2tpZUtleVxuXHRcdFx0XHQkbG9nLmluZm8gXCJpc0xvZ2dlZEluOiBhdXRoIGNvb2tpZSBpcyAje0pTT04uc3RyaW5naWZ5KGF1dGhDb29raWUpfVwiXG5cdFx0XHRcdGZha2UgPSBmYWxzZVxuXHRcdFx0XHRpZiBmYWtlXG5cdFx0XHRcdFx0QGxvZ2luIFwiSm9obiBEb2VcIiwgXCJzZWNyZXRcIlxuXHRcdFx0XHRcdCRyb290U2NvcGUudXNlckxvZ2dlZEluID0gdHJ1ZVxuXG5cdFx0XHRcdCRsb2cuaW5mbyBcImlzTG9nZ2VkSW46ICRyb290U2NvcGUudXNlckxvZ2dlZEluIGlzICN7JHJvb3RTY29wZS51c2VyTG9nZ2VkSW59XCJcblx0XHRcdFx0JHJvb3RTY29wZS51c2VyTG9nZ2VkSW5cblxuXHRcdHNlbGZcbl0iXX0=