var app = angular.module('studentListApp', [])

app.controller('MainController', function($scope){
    $scope.students = []

    $scope.addStudent = function() {
        $scope.validateStudent()
        if ($scope.validationMessage) return
        $scope.students.push($scope.student)
        console.log($scope.students)
        $scope.student = ''
        $scope.validationMessage = ''
    };

    $scope.deleteStudent = function(index) {
        $scope.students.splice(index, 1)
        console.log($scope.students)
    };

    $scope.validateStudent = function() {
        if (!$scope.student) {
            $scope.validationMessage = 'student name is required'
        } else if ($scope.student.length < 3) {
            $scope.validationMessage = 'student name must be atleast 3 chars'
        } else {
            $scope.validationMessage = ''
        }
    };
})