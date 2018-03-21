﻿define([
    'app/controller/base',
    'app/util/ajax',
    'app/module/loading/loading',
    'app/util/cookie',
], function(base, Ajax, loading, CookieUtil) {

    var code = base.getUrlParam("code");
    var captchaTime = 60; //重新发送时间
    var inviteCode = base.getUrlParam("inviteCode")||"";
    var userRefereeKind = base.getUrlParam("kind");
    var userReferee = base.getUrlParam("userReferee");


    var temp = "";

    addListener();


    function addListener() {
    	if(inviteCode!=""){
    		$("#r-ref-wrap").addClass("hidden")
    	}
    	
        $("#r-nick").val("");
        $("#r-tel").val("");
        $("#r-captcha").val("");
        $("#r-pwd").val("");
    	
    	
        $(".r-input").focus(function() {
            $(this).siblings(".r-input-placeholder").html(" ");
        })
        $(".r-input").blur(function() {
            var txt = $(this).siblings(".r-input-placeholder").attr("data-txt");
            if ($(this).val() == "") {
                $(this).siblings(".r-input-placeholder").html(txt);
            }
        })

//      $("#r-tel").blur(function() {
//          var userTel = $(this).val();
//
//          getProvingTel($(this));
//          if (temp == "" || temp != userTel) {
//              temp = userTel
//              captchaTime = 60;
//              $("#rbtn-captcha").html("获取验证码");
//              $("#rbtn-captcha").removeClass("captchaTimeBg");
//          } else {
//              temp = temp;
//          }
//      });
        // $("#r-nick").blur(function() {
        //     var usernick = $(this).val();
        //     if (usernick < 3 || usernick > 6) {
        //         base.showMsg("请输入3到6位数的昵称");
        //         console.log(usernick);
        //     }
        // });
        
        $(".r-popup-close").click(function() {
            $(".r-popup").fadeOut(500);
        });

        //下载倍可盈app>
        // $(".r-protocol").click(function() {
        // 	var timestamp = new Date().getTime()
        //     window.location.href = '../share/share-upload.html?timestamp'+timestamp;
        // 	$(".r-input").each(function() {
	     //        var txt = $(this).siblings(".r-input-placeholder").attr("data-txt");
	     //        $(this).val("")
	     //        $(this).siblings(".r-input-placeholder").html(txt);
	     //
	     //    })
        //
        // });

        //验证码
        $("#rbtn-captcha").click(function() {

            var userTel = $("#r-tel").val();
            var kind = $("#r-nick").val();
            if (userTel == null || userTel == "") {
                base.showMsg("请输入手机号");
            }else if (kind == null || kind == "") {
                base.showMsg("请选择角色");
            } else if (getProvingTel($("#r-tel"))) {

                if (captchaTime == 60) {

                	var parem = {
                        "mobile": userTel,
                        "bizType": "805041",
                        "kind": kind,
                        "systemCode": SYSTEM_CODE,
                        "companyCode": SYSTEM_CODE,
                    }
                	base.showLoading('发送中...')
                	Ajax.post("805950", { json: parem })
                        .then(function(res) {
                            if (res.success) {
                            	captchaTime = 59;
		                        $("#rbtn-captcha").html("重新发送(" + captchaTime + ")").addClass('captchaTimeBg');
		                        
                				base.hideLoading();
		                        
                            	timer = setInterval(function() {
			                        captchaTime--;
			
			                        $("#rbtn-captcha").html("重新发送(" + captchaTime + ")").addClass('captchaTimeBg');
			
			                        if (captchaTime < 0) {
			                            clearInterval(timer);
			                            captchaTime = 60;
			                            $("#rbtn-captcha").html("获取验证码");
			                            $("#rbtn-captcha").removeClass("captchaTimeBg");
			                        }
			                    }, 1000);
                            	
                            } else {
                            	
                				base.hideLoading();
                                base.showMsg(res.msg);
                            }
                        }, function() {
                            base.hideLoading();
                            base.showMsg("获取验证码失败");
                        });
                    

                }
            }
        });

        //提交
        $("#rbtn-sub").click(function() {
            var kind = $("#r-nick").val();
            var userTel = $("#r-tel").val();
            var userCaptcha = $("#r-captcha").val();
            var userPwd = $("#r-pwd").val();
            if (kind == null || kind == "") {
                base.showMsg("请输入昵称");
            } else if (userTel == null || userTel == "") {
                base.showMsg("请输入手机号");
            } else if (userCaptcha == null || userCaptcha == "") {
                base.showMsg("请输入验证码");
            } else if (userPwd == null || userPwd == "") {
                base.showMsg("请输入密码");
            } else if (getProvingTel($("#r-tel"))) {
				base.showLoading("注册中...");
				
				// var userReferee = $("#r-ref").val()
                var parem = {
                    "kind": kind,
                    "mobile": userTel,
                    "loginPwd": userPwd,
                    "loginPwdStrength": base.calculateSecurityLevel(userPwd),
                    "userReferee": userReferee || '18870421319',
                    "inviteCode":inviteCode,
                    "userRefereeKind": userRefereeKind || 'L',
                    "smsCaptcha": userCaptcha,
                    "systemCode": SYSTEM_CODE,
                    "companyCode": COMPANY_CODE
                }

                Ajax.post("805041", { json: parem })
                    .then(function(res) {
                    	base.hideLoading()
                        if (res.success) {
                        	
                        	Ajax.get("805121", { 
                        		userId: res.data.userId
                        	}).then(function(res) {
                    			CookieUtil.set("inviteCode", res.data.secretUserId);
                                base.showLoading("加载中...");
                                base.showMsg("注册成功，请等待后台审核");
                                setTimeout(function () {
                                    window.location.href = '../share/share-upload.html';

                                },2000)

		                    }, function() {
		        				base.hideLoading();
		                        base.showMsg("请求失败");
		                    });
                            $(".r-input").each(function() {
					            var txt = $(this).siblings(".r-input-placeholder").attr("data-txt");
					            $(this).val("")
					            $(this).siblings(".r-input-placeholder").html(txt);
					        })
                        } else {
                            base.showMsg(res.msg);
                        }
                    }, function() {
        				base.hideLoading();
                        base.showMsg("注册失败");
                    });

            }

        })

    }


    function getCaptchaTime(obj, code) {
        var timer;

        timer = setInterval(function() {
            code--;
            obj.html("重新发送(" + code + ")");
            

            if (code < 0) {
                clearInterval(timer);
                code = 60
                obj.html("获取验证码");
                obj.removeClass("captchaTimeBg");
            }
        }, 1000)
    }

    function getProvingTel(obj) {
        var val = obj.val();
        var mobilevalid = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;

        if (!mobilevalid.test(val)) {
            base.showMsg("请输入正确的手机号码！");
            return false;
        } else {
            return true;
        }
    }

});