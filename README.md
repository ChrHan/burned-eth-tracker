# Burned ETH Tracker

This is a CLI based ETH tracker, inspired by [fees.wtf](https://fees.wtf)
leveraging [Etherscan.io](https://etherscan.io)'s API.

Made possible by [seb's etherscan-api](https://github.com/sebs/etherscan-api#readme)

## How to run?

* Get your own [Etherscan.io](https://etherscan.io) API key from [Etherscan.io/apis](https://etherscan.io/apis)
* then change `.env` to match your API key & wallet address to generate data, and run the following command:

```
    npm install
    node app.js
```

This will result to something like this:

```
    Balance in ETH: 0.061442921507176965
    You've spent Ξ0.29712753163594635
    You used 4932977 gas to send 36 transactions, with an average price of 78.43165851380556 gwei
    4 of them failed, costing you Ξ0.033985100870755264
```


