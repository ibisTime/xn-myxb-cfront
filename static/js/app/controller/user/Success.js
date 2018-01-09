define([
    'app/controller/base',
    'app/util/ajax',
    'app/module/loading/loading',
    'clipboard',
    'app/util/cookie',
], function(base, Ajax, loading,clipboard,CookieUtil) {
	window['Clipboard']=clipboard;
	
    var mobile = CookieUtil.get("m")||'';
	
	if(mobile==""||!mobile){
		window.location.href='../user/register.html'
	}else{
		init()
	}
	
	function init(){
    	base.showLoading();
    	var domain = window.location.host;
    	$("#copyBtn").attr("data-clipboard-text","http://"+domain+"/user/register.html?mobile="+mobile)
    	$("#dialog .href").html("http://"+domain+"/user/register.html?mobile="+mobile)
    	addListener();
    	base.hideLoading();
	}
	
    function addListener() {
		$("#goUpload").click(function(){
			var timestamp = new Date().getTime()
			window.location.href = '../share/share-upload.html?timestamp='+timestamp;
		})
		var clipboard = new Clipboard('#copyBtn');
		clipboard.on('success', function(e) {
			base.showMsg("复制成功")
		    e.clearSelection();
		});
		clipboard.on('error', function(e) {
			$("#dialog").removeClass("hiddeni")
		});
		
		$("#shareQrcodeBtn").click(function(){
			var timestamp = new Date().getTime()
			window.location.href = '../user/qrcode.html?m='+mobile+'&timestamp='+timestamp;
		})
		
		$(".am-modal-mask").click(function(){
			$(this).parent(".dialog").addClass("hiddeni")
		})
		
    }

});