var app = angular.module('StudentManagementUIApp', [])

app.controller('MainController', function($scope){
    $scope.students = []
    $scope.sortBy = ''

    $scope.addStudent = function() {
        $scope.validateStudent()
        if ($scope.validationMessage) return
        var student = {
            name: $scope.student, 
            marks: $scope.marks
        }
        $scope.students.push(student)
        console.log($scope.students)
        $scope.student = ''
        $scope.marks = null
        $scope.validationMessage = ''
    };

    $scope.deleteStudent = function(student) {
        var index = $scope.students.indexOf(student)
        $scope.students.splice(index, 1)
        console.log($scope.students)
    };

    $scope.validateStudent = function() {
        if (!$scope.student) {
            $scope.validationMessage = 'student name is required'
        } else if ($scope.student.length < 3) {
            $scope.validationMessage = 'student name must be atleast 3 chars'
        } else if ($scope.marks == null) {
            $scope.validationMessage = 'marks are required'
        } else if ($scope.marks < 0 || $scope.marks > 100) {
            $scope.validationMessage = 'marks must be between 0 and 100'
        } else {
            $scope.validationMessage = ''
        }
    };
})
