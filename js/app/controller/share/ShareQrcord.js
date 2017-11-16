define([
    'app/controller/base',
    'app/util/ajax',
], function(base, Ajax) {
	
	var updateUrl,ios,android ;
	
    init();
    
    function init() {
    	$(".sq-btn1").click(function(){
    		getUrl();
    	})
    	
    	// $(".sq-btn2").click(function(){
    	// 	getUrl(android);
    	// })
    	
    }
	 
	
	function getUrl(t){
		Ajax.get("807715",{
			"type":"3",
		    "start": "1",
		    "limit": "20",
			"systemCode":SYSTEM_CODE,
			"companyCode":SYSTEM_CODE
		}).then(function(res) {
	        if (res.success) {
	        	updateUrl = res.data.list;
	        	var androidUrl ,iosUrl;
	        	
	        	updateUrl.forEach(function(v, i){
	        		
	        		if(v.ckey == "androidDownload"){
	        			androidUrl = v.cvalue;
	        		}
        			if(v.ckey == "iosDownload"){
	        			iosUrl = v.cvalue;
	        		}
	        		
	        	})
					// if(t == ios){
	    //     			window.location.href= iosUrl;
	    //     		}else{
	    //     			window.location.href= androidUrl;
	    //     		}	        	
	        	
	        	base.getUserBrowser(iosUrl,androidUrl);//跳转
	        	
	        } else {
	        	base.showMsg(res.msg);
	        }
	    }, function() {
	        base.showMsg("获取下载地址失败");
	    });
	}
});