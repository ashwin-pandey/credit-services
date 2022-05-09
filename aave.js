const Web3 = require('web3')

const arrayABI = [[{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"initialize","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]]

const AaveContractAddress = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"

const web3 = new Web3(Web3.givenProvider || "https://mainnet.infura.io/v3/a1329a8cd7a34b29b83290023636432c")

const address1 = "0x77801893f3a20B3e9Dd3048711BA0f1d045AE7a7"

web3.eth.getAccounts((err, accounts)=> {

    myAccountAddress = accounts[0]

    const myContract = new web3.eth.Contract(arrayABI,AaveContractAddress, { 
        from: myAccountAddress,
    })

    myContract.methods.getUserAccountData(address1)
        .call({from: myAccountAddress }, (err,result) => {
            console.log(result)
        })
})