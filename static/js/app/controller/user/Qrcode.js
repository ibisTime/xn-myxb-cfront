define([
    'app/controller/base',
    'app/util/ajax',
    'app/module/loading/loading',
    'app/util/cookie',
    'html2canvas',
], function(base, Ajax, loading,CookieUtil,html2canvas) {
	window['html2canvas']=html2canvas;
	
    var inviteCode = base.getUrlParam("inviteCode")||"";
	
	if(inviteCode==""||!inviteCode){
		inviteCode = CookieUtil.get("inviteCode")||""
	}
	
	if(inviteCode==""&&base.is_weixn()){
		window.location.href='../user/register.html'
	}else{
		init()
	}
	
	function init(){
    	base.showLoading();
    	var domain = window.location.host;
    	var href = "http://"+domain+"/user/register.html?inviteCode="+inviteCode;
    	var qrcode = new QRCode('qrcode',href);
    	
    	// setTimeout(function(){
    	// 	html2canvas(document.querySelector("#qrWrap")).then(canvas => {
			//     $("#canvasWrap").html(canvas);
			//
			//     setTimeout(function(){
			// 	    $("#canvasWrapImg").html("<img src='"+canvas.toDataURL("image/png")+"' />");
		 //    		base.hideLoading();
		 //    	},50)
			// });
    	// },100)

        if(html2canvas){
            setTimeout(function(){
                html2canvas(document.querySelector("#qrWrap")).then(canvas => {
                    $("#canvasWrap").html(canvas);

                setTimeout(function(){
                    $("#canvasWrapImg").html("<img src='"+canvas.toDataURL("image/png")+"' />");
                    base.hideLoading();
                },50)
            });
            },200)
        }

    }
	

});