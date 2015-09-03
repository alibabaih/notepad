var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'login.html',
        controller: 'loginController'
    })
    
    .when('/dashboard', {
//        resolve: {
//            'check': function($location, $rootScope) {
//                if (! $rootScope.loggesIn) {
//                    $location.path('/');
//                } 
//            }
//        },
        templateUrl: 'dashboard.html',
        controller: 'notepadController'
    })
    
});

myApp.controller('loginController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
    $scope.submit = function() {
        if($scope.username == 'admin' && $scope.password == 'admin') {
//            $rootScope.loggesIn = true;
            $location.path('/dashboard');
        } else {
            alert('Wrong credentials!');
        }
    }
}]);

myApp.controller('notepadController', ['$scope', '$http', function($scope, $http) {
//    $scope.listNotes = [
//        {id: 'n01', time: '01.08.2015 15:30', place: 'top', note: 'Schitov Vasiliy 8 904 92 39 309'},
//        {id: 'n02', time: '01.08.2015 15:30', place: 'top', note: 'Karlova Olga 8 904 92 39 309'},
//        {id: 'n03', time: '01.08.2015 15:30', place: 'top', note: 'Schitov Vasiliy 8 904 92 39 309'},
//        {id: 'n04', time: '01.08.2015 15:30', place: 'top', note: 'Schitov Vasiliy 8 904 92 39 309'},
//        {id: 'n05', time: '01.08.2015 15:30', place: 'top', note: 'Schitov Vasiliy 8 904 92 39 309'},
//    ];
    
        var responseData;
    
        $http.get('http://note.pad/api.php').then(function(response){
            $scope.listNotes = response.data;
        });

    
    $scope.add = function() {
        $scope.listNotes.push({
            id: $scope.id, time: $scope.time, place: $scope.place, note: $scope.note
        });
        $scope.id = '';
        $scope.time = '';
        $scope.place = '';
        $scope.note = '';
    }
    
    $scope.edit = function() {
        var index = getSelectedIndex($scope.id);
        $scope.listNotes[index].time = $scope.time;
        $scope.listNotes[index].place = $scope.place;
        $scope.listNotes[index].note = $scope.note;
    }
    
    $scope.selectEdit = function(id) {
        var index = getSelectedIndex(id);
        var note = $scope.listNotes[index];
        $scope.id = note.id;
        $scope.time = note.time;
        $scope.place = note.place;
        $scope.note = note.note;
    }
    
    $scope.del = function(id) {
        var result = confirm('Are you sure?');
        if(result == true) {
            var index = getSelectedIndex(id);
            
            $scope.listNotes.splice(index, 1);
        }
        
    }
    
    function getSelectedIndex(id) {
        for(var i = 0; i < $scope.listNotes.length; i++) {
            if($scope.listNotes[i].id == id) {
                return i;
            }
        }
    }
    
}]);