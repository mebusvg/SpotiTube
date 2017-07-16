app.directive('goBackHistory', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.on('click', function ($event) {
                $event.stopPropagation();
                if ($window.history.length) {
                    $window.history.back();
                } else {
                    $window.close();  
                }
            });
        }
    };
}]).directive('goNextHistory', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.on('click', function ($event) {
                $event.stopPropagation();
                if ($window.history.length) {
                    $window.history.forward();
                } else {
                    $window.close();  
                }
            });
        }
    };
}])