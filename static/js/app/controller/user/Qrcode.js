define([
    'app/controller/base',
    'app/util/ajax',
    'app/module/loading/loading',
    'app/util/cookie',
], function(base, Ajax, loading,CookieUtil) {
	
    var mobile;
	
	if(base.is_weixn()){
		mobile = CookieUtil.get("m")||""
	}else{
		mobile= base.getUrlParam("m")
	}
	if(mobile==""&&base.is_weixn()){
		window.location.href='../user/register.html'
	}else{
		init()
	}
	
	function init(){
    	base.showLoading();
    	var domain = window.location.host;
    	var href = "http://"+domain+"/user/register.html?mobile="+mobile;
    	var qrcode = new QRCode('qrcode',href);
    	base.hideLoading();
	}
	

});