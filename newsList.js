(function() {
    'use strict';
    angular.module("newsApp", []);
    angular.module("newsApp").controller("newsList", ["$scope", "$http", function($scope, $http) {
        $scope.gridView = true;
        $scope.orderProperty = "+parsedDate";
        var requesturl = "https://newsapi.org/v2/everything?q=reactjs&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize=10&page=1&sortBy=publishedAt";
        $http({
            method: 'GET',
            url: requesturl
        }).then(function successCallback(response) {
            if (response.data) {
                $scope.newsData = response.data.articles;
                for (var i = 0; i < $scope.newsData.length; i++) {
                    $scope.newsData[i].parsedDate = Date.parse($scope.newsData[i].publishedAt);
                }
                console.log($scope.newsData)
            }
        }, function errorCallback(response) {});
        $scope.GetSortOrder = function(prop) {
            return function(a, b) {
                if (a[prop] > b[prop]) {
                    return 1;
                } else if (a[prop] < b[prop]) {
                    return -1;
                }
                return 0;
            }
        }
        $scope.sortProperty = function(column) {
            var currentColumn = $scope.orderProperty.slice(1);
            var currentDirection = $scope.orderProperty.slice(0, 1);
            var dir = '+';
            if (column === currentColumn) {
                dir = currentDirection === '+' ? '-' : '+';
            }
            $scope.orderProperty = dir + column;
        };
    }]);
})();