var app = angular.module('TodoListApp', [])

app.controller('MainController', function($scope){
    $scope.tasks = []

    $scope.addTask = function() {
        $scope.validateTask()
        if ($scope.validationMessage) return
        $scope.tasks.push({ text: $scope.task, done: false })
        console.log($scope.tasks)
        $scope.task = ''
        $scope.validationMessage = ''
    };

    $scope.deleteTask = function(index) {
        $scope.tasks.splice(index, 1)
        console.log($scope.tasks)
    };

    $scope.validateTask = function() {
        if (!$scope.task) {
            $scope.validationMessage = 'task is required'
        } else if ($scope.task.length < 3) {
            $scope.validationMessage = 'task must be atleast 3 chars'
        } else {
            $scope.validationMessage = ''
        }
    };
})
