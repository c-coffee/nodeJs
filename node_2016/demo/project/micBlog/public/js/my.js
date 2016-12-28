/**
 * Created by vol on 2016/12/28.
 */
angular.module("myModule",["ng","ngRoute","ngAnimate"])
    .controller('startCtrl',function(){})
    .controller('registerCtrl',function($scope,$http){
        $scope.doRegister = function(){
            var userName = $('#txtUser').val();
            var userPwd = $('#txtPwd1').val();
            $http({
                url:'doRegister',
                method:'post',
                data:{
                    "userName":userName,
                    "userPwd":userPwd
                }
            }).success(function(data){

            });
        }
    })
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'template/main.html',
                controller:'startCtrl'
            })
            .when('/register',{
                templateUrl:'template/register.html',
                controller:'registerCtrl'
            })
    });