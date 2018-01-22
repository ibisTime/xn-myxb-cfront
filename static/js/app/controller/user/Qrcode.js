define([
	'app/controller/base',
	'app/util/ajax',
	'app/module/loading/loading',
	'app/util/cookie',
	'html2canvas',
], function(base, Ajax, loading, CookieUtil, html2canvas) {

	var inviteCode = base.getUrlParam("inviteCode") || "";

	if(inviteCode == "" || !inviteCode) {
		inviteCode = CookieUtil.get("inviteCode") || ""
	}

	if(inviteCode == "" && base.is_weixn()) {
		window.location.href = '../user/register.html'
	} else {
		init()
	}

	function init() {
		base.showLoading();
		var domain = window.location.host;
		var href = "http://" + domain + "/user/register.html?inviteCode=" + inviteCode;
		var qrcode = new QRCode('qrcode', href);

		try {
			if(typeof(eval(html2canvas)) == "function") {
				window['html2canvas'] = html2canvas;
				setTimeout(function() {
					try {
						html2canvas(document.getElementById("qrWrap")).then(function(canvas) {
							$("#canvasWrap").html(canvas);
		
							setTimeout(function() {
								$("#canvasWrapImg").html("<img src='" + canvas.toDataURL("image/png") + "' />");
								base.hideLoading();
							}, 50)
						},function(){
							html2canvasError();
						});
					} catch(e) {
						html2canvasError();
					}
				}, 300)
			} else {
				html2canvasError();
			}
		} catch(e) {
			html2canvasError();
		}
	}
	
	function html2canvasError(){
		$("#canvasWrapImg").addClass("hidden")
		$("#canvasWrap").addClass("hidden")
		base.hideLoading();
	}
});