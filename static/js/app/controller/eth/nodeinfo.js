define([
    'app/controller/base',
    'app/util/ajax',
], function(base, Ajax) {
	
    init();
    
    function init() {
		base.showLoading("加载中...");
		getNodeinfo();
	}
	function getNodeinfo() {
        return Ajax.get("802901").then(function (res) {
        	base.hideLoading()
        	if (res.success) {
        		var data = res.data
        		$('#bcoinBlockNumber').html('<samp>Bcoin最大区块号: </samp>'+data.bcoinBlockNumber)
				$('#bcoinGasPrice').html('<samp>Bcoin最新Gas价格:  </samp>'+data.bcoinGasPrice+' WEI')
				$('#bcoinScaned').html('<samp>Bcoin当前扫描区块号:  </samp>'+data.bcoinScaned)
				$('#infuraBlockNumber').html('<samp>Infrua最大区块号:  </samp>'+data.infuraBlockNumber)
				$('#infuraGasPrice').html('<samp>Infrua最新Gas价格:  </samp>'+data.infuraGasPrice+' WEI')
				$('#scBlockNumber').html('<samp>SC区块高度:  </samp>'+data.scBlockNumber)
				$('#scScanNumber').html('<samp>SC已扫描区块:  </samp>'+data.scScanNumber)
				$('#scWalletBalance').html('<samp>SC钱包余额:  </samp>'+data.scWalletBalance)
				$('#scWalletOpened').html('<samp>SC钱包是否打开:  </samp>'+data.scWalletOpened)
				setInterval(function(){
					base.showLoading("更新中...");
					getNodeinfo()
				},10000)
	        } else {
	        	base.showMsg(res.msg);
	        }
        },base.hideLoading)
    }

});