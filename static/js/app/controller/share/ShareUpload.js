define([
    'app/controller/base',
    'app/util/ajax',
], function(base, Ajax) {
	
	var updateUrl,ios,android ;
	
    init();
    
    function init() {
    	$("#upload_android").click(function(){
    		getAndroidUrl();
    	})
    	
    	$("#upload_ios").click(function(){
    		getIosUrl();
    	})
    	
    }
	
	function getAndroidUrl(){
		base.showLoading("加载中...")
		Ajax.get("625918",{
			"type":"android-c",
			"systemCode":SYSTEM_CODE,
			"companyCode":SYSTEM_CODE
		}).then(function(res) {
			base.hideLoading()
	        if (res.success) {
        		window.location.href=res.data.downloadUrl;
	        } else {
	        	base.showMsg(res.msg);
	        }
	    }, function() {
	        base.showMsg("获取下载地址失败");
	    });
	}
	
	function getIosUrl(){
		base.showLoading("加载中...")
		Ajax.get("625918",{
			"type":"ios-c",
			"systemCode":SYSTEM_CODE,
			"companyCode":SYSTEM_CODE
		}).then(function(res) {
			base.hideLoading()
	        if (res.success) {
        		window.location.href=res.data.downloadUrl;
	        } else {
	        	base.showMsg(res.msg);
	        }
	    }, function() {
	        base.showMsg("获取下载地址失败");
	    });
	}
});