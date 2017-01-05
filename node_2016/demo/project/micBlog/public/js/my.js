/**
 * Created by vol on 2016/12/28.
 */
angular.module("myModule",["ng","ngRoute","ngAnimate","angularFileUpload"])
    .controller('startCtrl',function($scope,$rootScope,$http,$timeout,$location){
        $(".alert").fadeOut(0); //隐藏消息框
        $scope.isMain = true;  //设置导航条激活

        if(sessionStorage.login == "true"){
            $rootScope.userName = sessionStorage.userName;
            $rootScope.login = sessionStorage.login;
            $rootScope.avatar = sessionStorage.avatar;
            //console.log($rootScope.login)
        }else{
            $rootScope.login = false;
            //console.log($rootScope.login)
        }
        console.log($rootScope.login);

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
                switch(data.result.toString()){
                    case "1":
                        sessionStorage.login = true;
                        sessionStorage.userName = userName;
                        sessionStorage.avatar = data.avatar;
                        $rootScope.userName = userName;
                        $rootScope.login = true;
                        $rootScope.avatar = data.avatar;
                        $location.path('/');

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
        };

        $scope.submitContent = function(){
            //获取用户填写的内容
            var content = $("#txtContent").val();
            console.log("content", content);
            if(content == ""){
                alertMsg("请输入说说内容！");
                $("txtContent").focus();
                return;
            }
            $http({
                url:"saveContent",
                method:"post",
                cache:false,
                data:{"content":content}
            }).success(function(data){
                if(data.result.toString() == "1"){
                    alertMsg("发表成功！");
                    $("#txtContent").val("");
                    showList(0);
                }else{
                    alertMsg("发表失败，请重新输入！错误码：" + data.result.toString());
                }
            })
        };

        //展示说说内容
        showList(0);
        function showList(pageNum){
            $http({
                url:"showList?pageNum=" + pageNum,
                method:"get"
            }).success(function(result){
                console.log(result);
                if(result.r == 1){
                    (function getAvatar(num){
                        console.log(num);
                        if(num >= result.result.length){
                            $scope.blogs = result.result;
                            return;
                        }else{
                            $http({
                                url:"getAvatar?userName=" + result.result[num].userName,
                                method:"get"
                            }).success(function(result2){
                                console.log(result2);
                                result.result[num].avatar = result2.avatar;
                                getAvatar(++num);
                            })
                        }
                    })(0);


                }
                //console.log(result);
            })
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
                cache:false,
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
                cache:false,
                data:{
                    "userName":userName,
                    "userPwd":userPwd
                }
            }).success(function(data){
                console.log(data);
                switch(data.result.toString()){
                    case "1":
                        alertMsg("登录成功！3秒自动回到首页...");
                        sessionStorage.login = true;
                        sessionStorage.userName = userName;
                        sessionStorage.avatar = data.avatar;
                        $rootScope.userName = userName;
                        $rootScope.login = true;
                        $rootScope.avatar = data.avatar;
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
    .controller('setPersonalCtrl',function($scope,$http,$rootScope,FileUploader,$timeout,$location){
        var cropInfo; //裁剪图形的区域信息
        var jcrop_api;
        var filePath;
        //初始化剪切图片组件
        function cropPicInit(){
            var xSize = 400,
                ySize = 400;
            $('#target').Jcrop({
                //bgFade:true,
                //bgOpacity: .2,
                //setSelect:[10,10,150,150],
                onChange:updatePreview,
                onSelect:updatePreview,
                aspectRatio: xSize / ySize
            },function(){
                jcrop_api = this;
                //jcrop_api.setSelect([10,10,150,150]);
                console.log("ok");
            });

            function updatePreview(c){
                cropInfo = c;
                //console.log(c);
            }
        }
        cropPicInit();

        $(".alert").fadeOut(0); //隐藏消息框

        $scope.filePath = "/avatar/default.jpg";
        //页面访问权限判断
        $http({
            url:"checkLogin?"+ Math.random().toString(),
            cache:false,
            method:"get"
        }).success(function(result){
            if(result.status == "-1"){
                $rootScope.userName = "";
                $rootScope.login = false;
                sessionStorage.login = false;
                sessionStorage.removeItem("userName");
                sessionStorage.removeItem("avatar");
                alertMsg("请先登录！即将返回登录页面...");
                $timeout(function(){
                    $location.path('/login');
                },3000);
            }else{
                $rootScope.userName = sessionStorage.userName = result.userName;
                $rootScope.login = sessionStorage.login = true;
            }
        });
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
            console.log(response);

            $scope.uploadStatus = true;   //上传成功则把状态改为true
            if(response.status == "-1"){
                alertMsg("头像上传失败！");
            }else if(response.status == "1"){
                //$scope.upLoadPic = "/avatar/default.jpg";
                //console.log(response.filePath);
                var picWidth = response.width + 40;
                var picHeight = response.height + 20;
                filePath = response.filePath;
                $("#modifyPicModal .modal-dialog").css("width",picWidth);
                $("#modifyPicModal .modal-dialog").css("height",picHeight);

                //设置剪裁界面显示的图片
                jcrop_api.setImage(filePath);
                //弹出剪切图片模式窗口
                $('#modifyPicModal').modal();

            }
            //console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        //上传图像
        $scope.uploadFile = function(){
            //console.log("uploadAll");
            uploader.uploadAll();
        };
        //剪切图形
        $scope.cropPic = function(){
            console.log(cropInfo);
            if(!cropInfo){
                $("#cropAlert").html("请选择剪切区域！").fadeIn();
                $timeout(function(){
                    $("#cropAlert").fadeOut();
                },3000);
                return;
            }
            $http({
                url:"cropPic",
                method:"post",
                data:{"filePath":filePath,"cropInfo":cropInfo}
            }).success(function(result){
                console.log(result);
                $('#modifyPicModal').modal('hide');
                if(result.r == "-1"){
                    alertMsg("图片上传失败！请重新尝试");
                }else if(result.r == "1"){
                    sessionStorage.avatar = result.avatar;
                    $scope.filePath = filePath + "?" + Math.random().toString();
                }
            });
        };


        function alertMsg(message){
            $scope.msg = message;
            $("#divAlert").fadeIn();
            $timeout(function(){
                $("#divAlert").fadeOut();
            },3000);
        }
    })
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'template/main.html?aa' + Math.random(),
                controller:'startCtrl',
                cache:false
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