/**
 * Created by vol on 2016/12/28.
 */
angular.module("myModule",["ng","ngRoute","ngAnimate"])
    .controller('startCtrl',function(){})
    .controller('registerCtrl',function($scope,$http,$timeout){
        $(".alert").fadeOut(0);
        $scope.doRegister = function(){
            var userName = $('#txtUser').val();
            var userPwd = $('#txtPwd1').val();
            var userPwd2 = $('#txtPwd2').val();
            if(userName == "" || userPwd == ""){
                alertMsg("请输入完整信息！");
                return;
            }
            if(userPwd != userPwd2){
                $('#txtPwd1').val('');
                $('#txtPwd2').val('');
                alertMsg("密码确认错误！请重新输入！");
                return;
            }
            $http({
                url:'doRegister',
                method:'post',
                data:{
                    "userName":userName,
                    "userPwd":userPwd
                }
            }).success(function(data){
                switch(data){
                    case 1:
                        alertMsg("注册成功！请您登录!");
                        break;
                    case -3:
                        alertMsg("服务器内部错误！");
                        break;
                    case -2:
                        alertMsg("数据库错误！");
                        break;
                    case -1:
                        alertMsg("该用户已存在！");
                        break;
                }
                $('#txtUser').val('');
                $('#txtPwd1').val('');
                $('#txtPwd2').val('');
            });
        }

        function alertMsg(message){
            $scope.msg = message;
            $(".alert").fadeIn();
            $timeout(function(){
                $(".alert").fadeOut();
            },3000);
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