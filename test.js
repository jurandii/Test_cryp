let web3 = Web3 | undefined;

export async function authentication() {  
    web3 = Web3 | undefined;
    if (!web3) {
        try {
            const networkId = parseInt((window).ethereum.chainId);
            if(networkId !== 97){
                window.alert('NETWORK INVALID');
                return false;
            } else { 
                await (window).ethereum.enable();
                web3 = new Web3((window).ethereum);
                
                return true;
            }
        } catch (error) {
            window.alert('error in process MetaMask.');
            return false;
        }
    }else{
        console.log('You Need of Metamask')
        return false;
    }
}

export async function getBalance(){    
    await authentication();
    console.log(web3.givenProvider.selectedAddress)
    web3.eth.getBalance(web3.givenProvider.selectedAddress, function (err, result) {
        if (!err) {
            document.getElementById("myBalance").innerText = web3.utils.fromWei(result, "ether");
        } else {
            console.error(err);
        }
    });
}

export async function sendTransaction(){
    await authentication();

    let addressTo = document.getElementById("to").value;
    let valueSend = document.getElementById("value").value;

    console.log(web3);
    
    const addressTo1 = '0xaCC172Fa5424194F71e552abD7d4877ab6334BEC';
    
    

    web3.eth.sendTransaction({
        from: web3.givenProvider.selectedAddress,
        to: addressTo1.toString(),
        value: web3.utils.toWei(valueSend, "ether")
    })
    .on('confirmation', function(confirmationNumber, receipt){ 
        if(confirmationNumber === 6){
            getBalance();
        }
     })
    .on('error', function(){
        window.alert('Erro: Payment dont was processed');
        console.log(error)
    });
}
