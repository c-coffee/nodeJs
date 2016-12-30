/**
 * Created by vol on 2016/12/28.
 */
angular.module("myModule",["ng","ngRoute","ngAnimate","angularFileUpload"])
    .controller('startCtrl',function($scope){
        $scope.isMain = true;
    })
    .controller('registerCtrl',function($scope,$http,$timeout,$rootScope){
        $(".alert").fadeOut(0);
        $scope.isRegister = true;
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
                console.log(data);
                switch(data.toString()){
                    case "1":
                        alertMsg("注册成功！请您登录!");
                        $rootScope.userName = userName;
                        $rootScope.login = true;
                        console.log($rootScope.userName + " " + $rootScope.login);
                        //alertMsg("注册成功！请您登录!");
                        break;
                    case "-3":
                        alertMsg("服务器内部错误！");
                        break;
                    case "-2":
                        alertMsg("数据库错误！");
                        break;
                    case "-1":
                        alertMsg("该用户已存在！");
                        break;
                }
                $('#txtUser').val('');
                $('#txtPwd1').val('');
                $('#txtPwd2').val('');
            }).error(function(err){
                console.log(err);
            });
        }

        function alertMsg(message){
            console.log(message);
            $scope.msg = message;
            $(".alert").fadeIn();
            $timeout(function(){
                $(".alert").fadeOut();
            },3000);
        }
    })
    .controller('loginCtrl',function($scope,$http,$timeout,$rootScope,$location){
        $(".alert").fadeOut(0); //隐藏消息框
        $scope.isLogin = true;
        $scope.doLogin = function(){
            var userName = $('#txtUser').val();
            var userPwd = $('#txtPwd').val();

            if(userName == "" || userPwd == ""){
                alertMsg("请输入完整信息！");
                return;
            }
            $http({
                url:'doLogin',
                method:'post',
                data:{
                    "userName":userName,
                    "userPwd":userPwd
                }
            }).success(function(data){
                //console.log(data);
                switch(data.toString()){
                    case "1":
                        alertMsg("登录成功！3秒自动回到首页...");
                        $rootScope.userName = userName;
                        $rootScope.login = true;
                        $timeout(function(){
                            $location.path('/');
                        },3000);

                        //console.log($rootScope.userName + " " + $rootScope.login);
                        //alertMsg("注册成功！请您登录!");
                        break;
                    case "-3":
                        alertMsg("服务器内部错误！");
                        break;
                    case "-2":
                        alertMsg("数据库错误！");
                        break;
                    case "-1":
                        alertMsg("用户名密码错误！");
                        break;
                }
            }).error(function(err){
                console.log(err);
            });
        }
        function alertMsg(message){
            console.log(message);
            $scope.msg = message;
            $(".alert").fadeIn();
            $timeout(function(){
                $(".alert").fadeOut();
            },3000);
        }
    })
    .controller('setPersonalCtrl',function($scope,$http,FileUploader,$timeout){
        $(".alert").fadeOut(0); //隐藏消息框
        $scope.filePath = "/avatar/default.jpg";
        //todo:页面访问权限判断
        //图像上传
        $scope.uploadStatus = $scope.uploadStatus1 = false; //定义两个上传后返回的状态，成功获失败
        $scope.fileName = "请选择...";
        var uploader = $scope.uploader = new FileUploader({
            url: 'uploadPersonFile',
            queueLimit: 1,     //文件个数
            removeAfterUpload: true   //上传后删除文件
        });
        $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        };
        uploader.onAfterAddingFile = function(fileItem) {
            $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
            $scope.fileName = $scope.fileItem.name;
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.uploadStatus = true;   //上传成功则把状态改为true
            if(response.status == "-1"){
                alertMsg("头像上传失败！");
            }else if(response.status == "1"){
                $scope.filePath = response.filePath;
            }
            console.info('onSuccessItem', fileItem, response, status, headers);
        };

        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        $scope.uploadFile = function(){
            //console.log("uploadAll");
            uploader.uploadAll();
        }

        function alertMsg(message){
            console.log(message);
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
            .when('/login',{
                templateUrl:'template/login.html',
                controller:'loginCtrl'
            })
            .when('/setPersonal',{
                templateUrl:'template/setPersonal.html',
                controller:'setPersonalCtrl'
            })
    });