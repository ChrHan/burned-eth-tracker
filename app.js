const dotenv = require('dotenv').config();
var api = require('etherscan-api').init(process.env.ETHERSCAN_API_KEY);

//var balance = api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
var balance = api.account.balance(process.env.ETH_ADDRESS);
balance.then(function(balanceData){
  //console.log(balanceData);
  var etherBalance = balanceData.result/Math.pow(10, 18)
  console.log("Balance in ETH: " + etherBalance)
});
var txlist = api.account.txlist(process.env.ETH_ADDRESS, 1, 'latest', 1, 100, 'asc');
var burnedETH = 0;
var totalGasUsed = 0;
var totalTransaction = 0;
var totalGasPrice = 0;
var totalFailedTransaction = 0;
var totalFailedETH = 0;
txlist.then(function(txData){
	if(txData.message == "OK") {
		for (var trx in txData.result) {
			var tempTx = txData.result[trx];
			if (tempTx.from.toString().toLowerCase() == process.env.ETH_ADDRESS.toLowerCase()) {
				var cumulativeTx = parseInt(tempTx.value) + parseInt(tempTx.gasUsed);
				var tempETH = parseInt(tempTx.gasUsed) * parseInt(tempTx.gasPrice);
				burnedETH += tempETH;
				totalGasPrice += parseInt(tempTx.gasPrice);
				totalGasUsed += parseInt(tempTx.gasUsed);
				totalTransaction++;
				if (tempTx.isError == 1) {
					totalFailedTransaction++;
					totalFailedETH += tempETH;
				}
			}
		}
	}
	var averageGasPrice = totalGasPrice/totalTransaction;
	//console.log("Wallet Address: " + process.env.ETH_ADDRESS )
	console.log("You've spent Ξ"+ burnedETH/Math.pow(10, 18) )
	console.log("You used " + totalGasUsed + " gas to send " + totalTransaction + " transactions, with an average price of " + averageGasPrice/Math.pow(10, 9) + " gwei")
	console.log(totalFailedTransaction + " of them failed, costing you Ξ" + totalFailedETH/Math.pow(10, 18) )
});

