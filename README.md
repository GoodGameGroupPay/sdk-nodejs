'use strict';


import { init } from './gatewayCfg.js';

import { recharge, rechargeAsync, withdraw, withdrawAsync, detail, detailAsync } from './gatewaySdk.js';


/**
 * Here is an example of a gateway sdk
 */
 

export async function test() {

    // initialize this configuration
    
    // apiUrl gateway Api Url
    
    // appId in developer settings : App Id
    
    // key in developer settings : Key
    
    // secret in developer settings : secret
    
    // serverPubKey in developer settings : Server Public Key
    
    // privateKey in developer settings : Private Key
    
    init(apiUrl, appId, key, secret, serverPubKey, privateKey);

    // Here is an example of a recharge 
    
    // return recharge result: code=1,message=,transactionId=12817291,paymentUrl=https://www.xxxx...
    
    recharge("10001", 1.06, "MYR", "TNG_MY", "gateway Test", "gateway@hotmail.com", "0123456789", (result) => {
        console.log("recharge result:", result);
    });

    // Here is an example of a withdraw
    
    // return withdraw result: code=1,message=,transactionId=12817291
    
    withdraw("10012", 1.06, "MYR", "CIMB", "gateway Test", "234719327401231", "", "gateway@hotmail.com", "0123456789", (result) => {
        console.log("withdraw result:", result);
    });

    // Here is an example of a detail
    
    // return detail result: code,message,transactionId,amount,fee
    
    detail("10024", 2, (result) => {
        console.log("detail result:", result);
    });

    // Here is an example of a async recharge 
    
    let rechargeResult = await rechargeAsync("10001", 1.06, "MYR", "TNG_MY", "gateway Test", "gateway@hotmail.com", "0123456789");
    
    console.log("async recharge result:", rechargeResult);

    // Here is an example of a async withdraw 
    
    let withdrawResult = await withdrawAsync("10012", 1.06, "MYR", "CIMB", "gateway Test", "234719327401231", "", "gateway@hotmail.com", "0123456789");
    
    console.log("async withdraw result:", withdrawResult);

    // Here is an example of a async detail 
    
    let detailResult = await detailAsync("10024", 2);
    
    console.log("async withdraw result:", detailResult);
}
