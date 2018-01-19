define([
    'app/controller/base',
    'app/util/ajax',
], function(base, Ajax) {
	
    init();
    
    function init() {

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
			$('#bcoinGasPrice').attr('value','Bcoin最新Gas价格: '+list.bcoinGasPrice+' WEI')
			$('#bcoinScaned').attr('value','Bcoin当前扫描区块号: '+list.bcoinScaned)
			$('#infuraBlockNumber').attr('value','Infrua最大区块号: '+list.infuraBlockNumber)
			$('#infuraGasPrice').attr('value','Infrua最新Gas价格: '+list.infuraGasPrice+' WEI')
        })
    }



    });