define([
    'app/controller/base',
    'app/util/ajax',
], function(base, Ajax) {
	
	var updateUrl,ios,android ;
	
    init();
    
    function init() {
    	
		base.showLoading("加载中...")
		$.when(
			getAndroidUrl(),
			getIosUrl()
		).then(function(){
			base.hideLoading()
		})
		
    }
	
	function getAndroidUrl(){
		return Ajax.get("625918",{
			"type":"android-c",
			"systemCode":SYSTEM_CODE,
			"companyCode":SYSTEM_CODE
		}).then(function(res) {
	        if (res.success) {
        		$("#upload_android").attr("href",res.data.downloadUrl);
	        } else {
	        	base.showMsg(res.msg);
	        }
	    }, function() {
	        base.showMsg("获取安卓下载地址失败");
	    });
	}
	
	function getIosUrl(){
		return Ajax.get("625918",{
			"type":"ios-c",
			"systemCode":SYSTEM_CODE,
			"companyCode":SYSTEM_CODE
		}).then(function(res) {
	        if (res.success) {
        		$("#upload_ios").attr("href",res.data.downloadUrl);
	        } else {
	        	base.showMsg(res.msg);
	        }
	    }, function() {
	        base.showMsg("获取ios下载地址失败");
	    });
	}
});