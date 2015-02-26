(function() {
  var controllers;

  controllers = angular.module('moedit.Controllers');

  controllers.controller('loginController', [
    '$scope', '$log', '$q', '$state', 'moedit.Socket', 'moedit.SweetAlert', 'moedit.Focus', function($scope, $log, $q, $state, Socket, SweetAlert, Focus) {
      $scope.loading = false;
      Focus.focus('#username');
      return $scope.login = function() {
        $scope.loading = true;
        return $state.go('edit');
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2xvZ2luLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUEsV0FBQTs7QUFBQSxFQUFBLFdBQUEsR0FBYyxPQUFPLENBQUMsTUFBUixDQUFlLG9CQUFmLENBQWQsQ0FBQTs7QUFBQSxFQUNBLFdBQVcsQ0FBQyxVQUFaLENBQXVCLGlCQUF2QixFQUEwQztJQUN6QyxRQUR5QyxFQUV6QyxNQUZ5QyxFQUd6QyxJQUh5QyxFQUl6QyxRQUp5QyxFQUt6QyxlQUx5QyxFQU16QyxtQkFOeUMsRUFPekMsY0FQeUMsRUFRekMsU0FBQyxNQUFELEVBQVMsSUFBVCxFQUFlLEVBQWYsRUFBbUIsTUFBbkIsRUFBMkIsTUFBM0IsRUFBbUMsVUFBbkMsRUFBK0MsS0FBL0MsR0FBQTtBQUVDLE1BQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsS0FBakIsQ0FBQTtBQUFBLE1BQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBWSxXQUFaLENBREEsQ0FBQTthQUdBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsU0FBQSxHQUFBO0FBQ2QsUUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixJQUFqQixDQUFBO2VBQ0EsTUFBTSxDQUFDLEVBQVAsQ0FBVSxNQUFWLEVBRmM7TUFBQSxFQUxoQjtJQUFBLENBUnlDO0dBQTFDLENBREEsQ0FBQTtBQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2xvZ2luLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiY29udHJvbGxlcnMgPSBhbmd1bGFyLm1vZHVsZSgnbW9lZGl0LkNvbnRyb2xsZXJzJylcbmNvbnRyb2xsZXJzLmNvbnRyb2xsZXIgJ2xvZ2luQ29udHJvbGxlcicsIFtcblx0JyRzY29wZSdcblx0JyRsb2cnXG5cdCckcSdcblx0JyRzdGF0ZSdcblx0J21vZWRpdC5Tb2NrZXQnXG5cdCdtb2VkaXQuU3dlZXRBbGVydCdcblx0J21vZWRpdC5Gb2N1cydcblx0KCRzY29wZSwgJGxvZywgJHEsICRzdGF0ZSwgU29ja2V0LCBTd2VldEFsZXJ0LCBGb2N1cykgLT5cblxuXHRcdCRzY29wZS5sb2FkaW5nID0gZmFsc2Vcblx0XHRGb2N1cy5mb2N1cygnI3VzZXJuYW1lJylcblxuXHRcdCRzY29wZS5sb2dpbiA9ICgpIC0+XG5cdFx0XHQkc2NvcGUubG9hZGluZyA9IHRydWVcblx0XHRcdCRzdGF0ZS5nbyAnZWRpdCdcbl1cbiJdfQ==