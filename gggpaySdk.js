'use strict';

import http from 'http';
import crypto from 'crypto';
import * as gggpayCfg from './gggpayCfg.js';

/**
 * rsa algorithm
 */
const ALGORITHM = "aes-256-cbc";

/**
 * aes algorithm
 */
const HASH_ALGORITHM = "rsa-sha256";

/**
 * encrypt auth info
 */
var EncryptAuthInfo = null;

/**
 * user recharge
 * @param {*} orderId orderId order number - maxlength(40)
 * @param {*} amount amount order amount - maxlength(20)
 * @param {*} currency currency Empty default: MYR - maxlength(16)
 * @param {*} payMethod payMethod FPX, TNG_MY, ALIPAY_CN, GRABPAY_MY, BOOST_MY - maxlength(16)
 * @param {*} customerName customerName customer name - maxlength(64)
 * @param {*} customerEmail customerEmail customer email - maxlength(64)
 * @param {*} customerPhone customerPhone customer phone - maxlength(20)
 * @param {*} callback function
 * @returns code,message,paymentUrl,transactionId
 */
export function recharge(orderId, amount, currency, payMethod, customerName, customerEmail, customerPhone, callback) {
    try {
        getToken((token) => {
            if (isnull(token)) {
                callback({ code: 0, message: 'token is null' });
                return;
            }
            let requestUrl = "gggpay/v1/createPayment";
            let cnst = generateConstant(requestUrl);
            let bodyJson = "{\"customer\":{\"email\":\"" + customerEmail + "\",\"name\":\"" + customerName + "\",\"phone\":\"" + customerPhone + "\"},\"method\":\"" + payMethod + "\",\"order\":{\"additionalData\":\"\",\"amount\":\"" + amount + "\",\"currencyType\":\"" + (isnull(currency) ? "MYR" : currency) + "\",\"id\":\"" + orderId + "\",\"title\":\"Payment\"}}";
            let base64ReqBody = sortedAfterToBased64(bodyJson);
            let signature = createSignature(cnst, base64ReqBody);
            let encryptData = symEncrypt(base64ReqBody);
            let json = { data: encryptData };
            post(requestUrl, token, signature, json, cnst.nonceStr, cnst.timestamp, (result) => {
                if (isnull(result) || isnull(result.encryptedData) && result.code !== 1) {
                    callback(result);
                    return;
                }
                if (!isnull(result.encryptedData)) {
                    let decryptedData = symDecrypt(result.encryptedData);
                    result = tryParseJson(decryptedData);
                    callback(result);
                    return;
                } else {
                    callback(result);
                    return;
                }
            });
        })
    }
    catch (error) {
        callback({ code: 0, message: error });
        return result;
    }
}

/**
 * user recharge
 * @param {*} orderId orderId order number - maxlength(40)
 * @param {*} amount amount order amount - maxlength(20)
 * @param {*} currency currency Empty default: MYR - maxlength(16)
 * @param {*} payMethod payMethod FPX, TNG_MY, ALIPAY_CN, GRABPAY_MY, BOOST_MY - maxlength(16)
 * @param {*} customerName customerName customer name - maxlength(64)
 * @param {*} customerEmail customerEmail customer email - maxlength(64)
 * @param {*} customerPhone customerPhone customer phone - maxlength(20)
 * @returns code,message,paymentUrl,transactionId
 */
export async function rechargeAsync(orderId, amount, currency, payMethod, customerName, customerEmail, customerPhone) {
    return new Promise(async (resolve, reject) => {
        try {
            recharge(orderId, amount, currency, payMethod, customerName, customerEmail, customerPhone, (result) => {
                return resolve(result);
            });
        } catch (error) {
            return reject(error);
        }
    });
}

/**
 * user withdraw
 * @param {*} orderId orderId order number - maxlength(40)
 * @param {*} amount amount order amount - maxlength(20)
 * @param {*} currency currency Empty default: MYR - maxlength(16)
 * @param {*} bankCode bankCode MayBank=MBB,Public Bank=PBB,CIMB Bank=CIMB,Hong Leong Bank=HLB,RHB Bank=RHB,AmBank=AMMB,United Overseas Bank=UOB,Bank Rakyat=BRB,OCBC Bank=OCBC,HSBC Bank=HSBC  - maxlength(16)
 * @param {*} cardholder cardholder cardholder - maxlength(64)
 * @param {*} accountNumber accountNumber account number - maxlength(20)
 * @param {*} refName refName recipient refName - maxlength(64)
 * @param {*} recipientEmail recipientEmail recipient email - maxlength(64)
 * @param {*} recipientPhone recipientPhone recipient phone - maxlength(20)
 * @param {*} callback function
 * @returns code,message,transactionId
 */
export function withdraw(orderId, amount, currency, bankCode, cardholder, accountNumber, refName, recipientEmail, recipientPhone, callback) {
    try {
        getToken((token) => {
            if (isnull(token)) {
                callback({ code: 0, message: 'token is null' });
                return;
            }
            let requestUrl = "gggpay/v1/withdrawRequest";
            let cnst = generateConstant(requestUrl);
            let bodyJson = "{\"order\":{\"amount\":\"" + amount.toString() + "\",\"currencyType\":\"" + (isnull(currency) ? "MYR" : currency) + "\",\"id\":\"" + orderId + "\"},\"recipient\":{\"email\":\"" + recipientEmail + "\",\"methodRef\":\"" + refName + "\",\"methodType\":\"" + bankCode + "\",\"methodValue\":\"" + accountNumber + "\",\"name\":\"" + cardholder + "\",\"phone\":\"" + recipientPhone + "\"}}";
            let base64ReqBody = sortedAfterToBased64(bodyJson);
            let signature = createSignature(cnst, base64ReqBody);
            let encryptData = symEncrypt(base64ReqBody);
            let json = { data: encryptData };
            post(requestUrl, token, signature, json, cnst.nonceStr, cnst.timestamp, (result) => {
                if (isnull(result) || isnull(result.encryptedData) && result.code !== 1) {
                    callback(result);
                    return;
                }
                if (!isnull(result.encryptedData)) {
                    let decryptedData = symDecrypt(result.encryptedData);
                    result = tryParseJson(decryptedData);
                    callback(result);
                    return;
                } else {
                    callback(result);
                    return;
                }
            });
        });
    }
    catch (error) {
        callback({ code: 0, message: error });
        return;
    }
}

/**
 * user withdraw
 * @param {*} orderId orderId order number - maxlength(40)
 * @param {*} amount amount order amount - maxlength(20)
 * @param {*} currency currency Empty default: MYR - maxlength(16)
 * @param {*} bankCode bankCode MayBank=MBB,Public Bank=PBB,CIMB Bank=CIMB,Hong Leong Bank=HLB,RHB Bank=RHB,AmBank=AMMB,United Overseas Bank=UOB,Bank Rakyat=BRB,OCBC Bank=OCBC,HSBC Bank=HSBC  - maxlength(16)
 * @param {*} cardholder cardholder cardholder - maxlength(64)
 * @param {*} accountNumber accountNumber account number - maxlength(20)
 * @param {*} refName refName recipient refName - maxlength(64)
 * @param {*} recipientEmail recipientEmail recipient email - maxlength(64)
 * @param {*} recipientPhone recipientPhone recipient phone - maxlength(20)
 * @returns code,message,transactionId
 */
export async function withdrawAsync(orderId, amount, currency, bankCode, cardholder, accountNumber, refName, recipientEmail, recipientPhone) {
    return new Promise(async (resolve, reject) => {
        try {
            withdraw(orderId, amount, currency, bankCode, cardholder, accountNumber, refName, recipientEmail, recipientPhone, (result) => {
                return resolve(result);
            });
        } catch (error) {
            return reject(error);
        }
    });
}

/**
 * User recharge and withdrawal details
 * @param {*} orderId transaction id
 * @param {*} type 1 recharge,2 withdrawal
 * @param {*} callback callback
 */
export function detail(orderId, type, callback) {
    try {
        getToken((token) => {
            if (isnull(token)) {
                callback({ code: 0, message: 'token is null' });
                return;
            }
            let requestUrl = "gggpay/v1/getTransactionStatusById";
            let cnst = generateConstant(requestUrl);
            let bodyJson = "{\"transactionId\":\"" + orderId + "\",\"type\":" + type + "}";
            let base64ReqBody = sortedAfterToBased64(bodyJson);
            let signature = createSignature(cnst, base64ReqBody);
            let encryptData = symEncrypt(base64ReqBody);
            let json = { data: encryptData };
            post(requestUrl, token, signature, json, cnst.nonceStr, cnst.timestamp, (result) => {
                if (isnull(result) || isnull(result.encryptedData) && result.code !== 1) {
                    callback(result);
                    return;
                }
                if (!isnull(result.encryptedData)) {
                    let decryptedData = symDecrypt(result.encryptedData);
                    result = tryParseJson(decryptedData);
                    callback(result);
                    return;
                } else {
                    callback(result);
                    return;
                }
            });
        });
    }
    catch (error) {
        callback({ code: 0, message: error });
        return;
    }
}

/**
 * User recharge and withdrawal details
 * @param {*} orderId transaction id
 * @param {*} type 1 recharge,2 withdrawal
 * @returns code,message,transactionId,amount,fee
 */
export async function detailAsync(orderId, type) {
    return new Promise(async (resolve, reject) => {
        try {
            detail(orderId, type, (result) => {
                return resolve(result);
            });
        } catch (error) {
            return reject(error);
        }
    });
}

/**
 * get server token
 * @returns token
 */
function getToken(callback) {
    if (isnull(EncryptAuthInfo)) {
        let authString = stringToBase64(`${gggpayCfg.CLIENT_ID}:${gggpayCfg.CLIENT_SECRET}`);
        EncryptAuthInfo = publicEncrypt(authString);
    }
    post('gggpay/v1/createToken', "", "", {
        data: EncryptAuthInfo,
    }, "", "", function (result) {
        if (isnull(result) || isnull(result.encryptedToken) && result.code !== 1) {
            callback(null);
            return;
        }
        let token = symDecrypt(result.encryptedToken);
        callback(token);
        return;
    });
};

/**
 * A simple http request method
 * @param {*} url 
 * @param {*} param 
 * @returns 
 */
function post(url, token, signature, json, nonceStr, timestamp, callback) {
    if (gggpayCfg.BASE_URL.endsWith("/")) {
        url = gggpayCfg.BASE_URL + url;
    } else {
        url = gggpayCfg.BASE_URL + '/' + url;
    }
    let options = {
        method: "POST"
    }
    let jsonString = JSON.stringify(json);
    let dataBytes = stringToBytes(jsonString);
    if (token && signature && nonceStr && timestamp) {
        options.headers = {
            Authorization: token,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(dataBytes),
            'X-Nonce-Str': nonceStr,
            'X-Signature': signature,
            'X-Timestamp': timestamp,
        };
    } else {
        options.headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(dataBytes),
        };
    }
    let request = http.request(url, options, (response) => {
        let result = '';
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            result += chunk;
        });
        response.on('end', function () {
            let jsonObj = tryParseJson(result);
            callback(jsonObj);
            return;
        });
    });
    request.write(dataBytes);
    request.end();
}

/**
 * create a signature
 * @param {*} constantVars 
 * @param {*} base64ReqBody 
 * @returns signature info
 */
function createSignature(cnst, base64ReqBody) {
    const dataString = `data=${base64ReqBody}&method=${cnst.method}&nonceStr=${cnst.nonceStr}&requestUrl=${cnst.requestUrl}&signType=${cnst.signType}&timestamp=${cnst.timestamp}`;
    const signature = sign(dataString);
    return `${cnst.signType} ${signature}`;
}

/**
 * generate constant
 * @param {*} request url
 * @returns constant
 */
function generateConstant(requestUrl) {
    let constant = {
        method: 'post',
        nonceStr: randomNonceStr(),
        requestUrl,
        signType: 'sha256',
        timestamp: Date.now(),
    };
    return constant;
}

/**
 * random nonceStr
 * @returns nonceStr
 */
function randomNonceStr() {
    return crypto.randomBytes(8).toString('hex');
}

/**
 * Encrypt data based on the server's public key
 * @param {*} data data to be encrypted
 * @returns encrypted data
 */
function publicEncrypt(data) {
    // 如果是对象类型则先转成JSON字符串
    let msg = typeof data == 'object' ? JSON.stringify(data) : data;
    const encryptBuffer = crypto.publicEncrypt(
        {
            key: gggpayCfg.SERVER_PUB_KEY,
            padding: crypto.constants.RSA_PKCS1_PADDING, // 填充方式，需与私钥解密一致
        },
        stringToBytes(msg),
    );
    let hex = bytesToHex(encryptBuffer);
    return hex;
}

/**
 * Decrypt data according to the interface private key
 * @param {*} encryptData data to be decrypted
 * @returns decrypted data
 */
function privateDecrypt(encryptData) {
    let encryptBuffer = hexToBytes(encryptData);
    let msgBuffer = crypto.privateDecrypt(
        {
            key: gggpayCfg.PRIVATE_KEY,
            padding: crypto.constants.RSA_PKCS1_PADDING, // 填充方式，需与公钥加密一致
        },
        encryptBuffer
    );
    let msg = bytesToString(msgBuffer);
    // 尝试转成JSON后输出
    return tryParseJson(msg);
}

/**
 * Payment interface data encryption method
 * @param {*} message data to be encrypted
 * @returns The encrypted data is returned in hexadecimal
 */
function symEncrypt(message) {
    let iv = generateIv(gggpayCfg.CLIENT_SYMMETRIC_KEY);
    let cipheriv = crypto.createCipheriv(
        ALGORITHM,
        stringToBytes(gggpayCfg.CLIENT_SYMMETRIC_KEY),
        iv,
    );
    // 更新加密数据
    let cipherData = cipheriv.update(message, 'utf8');
    // 生成加密数据
    cipherData = Buffer.concat([cipherData, cipheriv.final()]);
    let encrypted = bytesToHex(cipherData);
    return encrypted;
}

/**
 * Payment interface data decryption method
 * @param {*} encryptedMessage The data that needs to be encryptedMessage, the result encrypted by symEncrypt can be decrypted
 * @returns Return the data content of utf-8 after decryption
 */
function symDecrypt(encryptedMessage) {
    let encryptedText = hexToBytes(encryptedMessage);
    // 解密
    let iv = generateIv(gggpayCfg.CLIENT_SYMMETRIC_KEY);
    const decipheriv = crypto.createDecipheriv(
        ALGORITHM,
        stringToBytes(gggpayCfg.CLIENT_SYMMETRIC_KEY),
        iv,
    );
    // 更新解密数据
    let decrypted = decipheriv.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipheriv.final()]);
    let decryptedText = bytesToString(decrypted);
    return decryptedText;
}

/**
 * private key signature
 * @param {*} data 
 * @returns signature
 */
function sign(data) {
    const sign = crypto.createSign(HASH_ALGORITHM);
    let encryptBuffer = stringToBytes(data);
    sign.update(encryptBuffer);
    sign.end();
    const signatureBuffer = sign.sign({
        key: gggpayCfg.PRIVATE_KEY
    });
    let base64 = bytesToBase64(signatureBuffer);
    return base64;
}

/**
 * Public key verification signature information
 * @param {*} data 
 * @param {*} signature 
 * @returns result true or false
 */
function verify(data, signature) {
    const verify = crypto.createVerify(HASH_ALGORITHM);
    let encryptBuffer = stringToBytes(data);
    verify.update(encryptBuffer);
    verify.end();
    return verify.verify(gggpayCfg.SERVER_PUB_KEY, signature, 'base64');
}

/**
 * Return base64 after sorting argument list
 * @param {*} param 
 * @returns param to json base64
 */
function sortedAfterToBased64(json) {
    let jsonBytes = stringToBytes(json);
    let jsonBase64 = bytesToBase64(jsonBytes);
    return jsonBase64;
};

/**
 * Generate an IV based on the data encryption key
 * @param {*} symmetricKey 
 * @returns iv
 */
function generateIv(symmetricKey) {
    let iv = crypto.createHash('md5').update(symmetricKey).digest();
    return iv;
}

/**
 * UTF8 String to bytes
 * @param {*} data 
 * @returns bytes
 */
function stringToBytes(data) {
    return Buffer.from(data, 'utf8');
}

/**
 * UTF8 String to base64
 * @param {*} data 
 * @returns base64
 */
function stringToBase64(data) {
    return Buffer.from(data, 'utf8').toString('base64');
}

/**
 * String to bytes
 * @param {*} bytes 
 * @returns bytes
 */
function bytesToString(bytes) {
    return Buffer.from(bytes).toString('utf8');
}

/**
 * Bytes to hex
 * @param {*} bytes 
 * @returns hex
 */
function bytesToHex(bytes) {
    return Buffer.from(bytes).toString('hex');
}

/**
 * Hex to bytes
 * @param {*} hex 
 * @returns bytes
 */
function hexToBytes(hex) {
    return Buffer.from(hex, 'hex');
}

/**
 * Bytes to base64
 * @param {*} bytes 
 * @returns base64
 */
function bytesToBase64(bytes) {
    return Buffer.from(bytes).toString('base64');
}

/**
 * Base64 to bytes
 * @param {*} base64 
 * @returns bytes
 */
function base64ToBytes(base64) {
    return Buffer.from(base64, 'base64');
}

/**
 * 尝试将数据转成JSON
 * @param {*} data
 * @returns
 */
function tryParseJson(data) {
    if (typeof data === 'string') {
        try {
            let jsonData = JSON.parse(data);
            return jsonData;
        } catch {
            return data;
        }
    } else {
        return data;
    }
}

/**
 * value is null
 * @param {*} val 
 * @returns 
 */
function isnull(val) {
    if (val === null) return true;
    if (val === undefined) return true;
    if (val === 'undefined') return true;
    if (val?.toString().trim() === '') return true;
    if (val?.length <= 0) return true;
    if (JSON.stringify(val) === '{}') return true;
    return false;
}