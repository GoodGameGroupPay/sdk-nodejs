'use strict';

import { init } from './gggpayCfg.js';
import { deposit, depositAsync, withdraw, withdrawAsync, detail, detailAsync,symDecrypt } from './gggpaySdk.js';

/**
 * Here is an example of a gggpay sdk
 */

export async function test() {

    // dictionary list
    // payment-method: https://doc.gggpay.org/docs/appendix/payment-method
    // 

    // initialize this configuration
    // verNo GGGPay Api Version Number, default: v1
    // apiUrl GGGPay Api Url
    // appId in developer settings : App Id
    // key in developer settings : Key
    // secret in developer settings : secret
    // serverPubKey in developer settings : Server Public Key
    // privateKey in developer settings : Private Key
    init(verNo, apiUrl, appId, key, secret, serverPubKey, privateKey);

    // Here is an example of a deposit 
    // return deposit result: code=1,message=,transactionId=12817291,paymentUrl=https://www.xxxx...
    deposit("10001", 1.06, "MYR", "TNG_MY", "GGGPay Test", "gggpay@hotmail.com", "0123456789", (result) => {
        console.log("deposit result:", result);
    });

    // Here is an example of a withdraw
    // return withdraw result: code=1,message=,transactionId=12817291
    withdraw("10012", 1.06, "MYR", "CIMB", "GGGPay Test", "234719327401231", "", "gggpay@hotmail.com", "0123456789", (result) => {
        console.log("withdraw result:", result);
    });

    // Here is an example of a detail
    // return detail result: code,message,transactionId,amount,fee
    detail("10024", 2, (result) => {
        console.log("detail result:", result);
    });

    // Here is an example of a async deposit 
    let depositResult = await depositAsync("10001", 1.06, "MYR", "TNG_MY", "GGGPay Test", "gggpay@hotmail.com", "0123456789");
    console.log("async deposit result:", depositResult);

    // Here is an example of a async withdraw 
    let withdrawResult = await withdrawAsync("10012", 1.06, "MYR", "CIMB", "GGGPay Test", "234719327401231", "", "gggpay@hotmail.com", "0123456789");
    console.log("async withdraw result:", withdrawResult);

    // Here is an example of a async detail 
    let detailResult = await detailAsync("10854", 1);
    console.log("async detail result:", detailResult);

    // Decrypt the encrypted information in the callback
    let jsonstr = symDecrypt("encryptedData .........");
    console.log(jsonstr);
}