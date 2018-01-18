define([
    'app/controller/base',
    'app/util/ajax',
], function(base, Ajax) {
	
    init();
    
    function init() {
    	$('.upload-logo').css('background','rgb(241,83,83)').css('margin-top','0');
    	$('.uploadWrap').css('margin-top','0.5rem').css('padding','2.5rem 0');
        $('.uploadWrap input').css('text-align','left').css('padding-left','0.3rem').css('font-size','0.3rem')
		base.showLoading("加载中...")
		$.when(
			getNodeinfo()
		).then(function(){
			base.hideLoading()
		})

    }


	function getNodeinfo() {
        return Ajax.get("625800", {}).then(function (data) {
            var list = data.data;
			$('#bcoinBlockNumber').attr('value','Bcoin最大区块号: '+list.bcoinBlockNumber)
			$('#bcoinGasPrice').attr('value','Bcoin最新Gas价格: '+list.bcoinGasPrice)
			$('#bcoinScaned').attr('value','Bcoin当前扫描区块号: '+list.bcoinScaned)
			$('#infuraBlockNumber').attr('value','Infrua最大区块号: '+list.infuraBlockNumber)
			$('#infuraGasPrice').attr('value','Infrua最新Gas价格: '+list.infuraGasPrice)
        })
    }



    });