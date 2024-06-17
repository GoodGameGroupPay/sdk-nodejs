'use strict';

//-- begin config --------------------------------------------------------------------------------

/**
 * Api Version Number
 */
export const VERSION_NO = "v1";

/**
 * gateway Api Url
 */
export const BASE_URL = "http://localhost:3000/";

/**
 * in developer settings : App Id
 */
export const CLIENT_ID = "10020";

/**
 * in developer settings : Key
 */
export const CLIENT_SYMMETRIC_KEY = "PCd1dlEmFnBXaVce06Pzp7Vike0oHnVJ";

/**
 * in developer settings : Secret
 */
export const CLIENT_SECRET = "F0NfID1ftdGdu27ybGMfT3vqqCMM9gwO";

/**
 * in developer settings : Server Public Key
 */
export const SERVER_PUB_KEY = "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApkgv8hWMIReydv2wkA7z" +
    "0cy8SLCCDN+Rnz1G50QMPF+THkRdvks5F9FBMzpJWVHpnxmj7TDUEWAc1xJDcr3b" +
    "qkqId1cdgNeQ5KYDnER+UsVvQOkWPh3P+kDc9wvDIR6XKqeZnhtWvsYtI1cbivs/" +
    "bTqV18iIhEE0zHLkWL7aMO/n4KcMyu0gjqnC1RdhCGRPw1iUFvoX4EIrcnhZQUe3" +
    "KbA9Ko15EgwGLIC36KuB6iYWWnck9mRi2sWVXK3ve8rRANCWq7zQ2lxj5bSUb1I9" +
    "2eA4/GJQubNU0ShA8Y36/MEpep5q+YNHSEe0b9L4ObP5kI7RxLAXf2+oRkSpnXmJ" +
    "9QIDAQAB\n" +
    "-----END PUBLIC KEY-----";

/**
 * in developer settings : Private Key
 */
export const PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIIEowIBAAKCAQEA3NgwXcNmrP2ZLSJ+fpOVcmz1xg6xu7waecfCQTaRoigIEaTp" +
    "K+uX34gGTHF44UhIarbs4/HKgazYUjtl6x7oVnDqJ3Q79PI7JnMtnsLi5lDTcmxa" +
    "AZm6j5f1b1J/UcY4uCb6DkP1P8aC3Ztw8Y9xaM60rFQYnspqlWFZTSp7ct97h+w8" +
    "drBLK/lyoOueKPJG4jR7tilADvSjpnDmELahC5zgksLs+bQqxHaVp0hi5FVU84Ku" +
    "1+nm5Vp2NdgLMnwUlbrBC9nlH20PEUUsHHFqayOwe+rGcXxzsYdNyxe9Rnk2bSYe" +
    "azl/csOsAdTygi60Hu0sDdpI073jgvN++Q0APQIDAQABAoIBABBOfJMZIpZLOw71" +
    "29IOpYDiMkCU+lh9bRVeY7B12MmDfAW01Uxl/twQEBT/ZkNOLMiyZ+n0gx/RlSnM" +
    "kyaKAkegWphzW5pRyNPP5TJdO1dHEwyBGyFAn7b1a7eJUiIwiSTHKKdlKwaclVz1" +
    "xWBqF3U7brmbE7P6iBBZHzip1nKBZ5WANfNWGp47+aequ8xK6OI65XKtlS39KlUO" +
    "delD9euFO2TXlYFXeJJfJjQi1Ahw/fyKP8Ry3sliqRFURgwp0rzp1cGn5sIXcynK" +
    "vzjdZ5V+0WfdsMnZsRVofTelWq4iCKkbuNsVQmdDHAWcynfhRP1XVx/a9oxzrCn9" +
    "zefXIokCgYEA+l2osu/p7yyiVDwUaQ46WP/r7xfpfSLEkP7JMGOLSmDAelySnxra" +
    "XSBOF3ZCtUINAJjbhW7dDmYmAE902g8V/eC2NQnHh2wJzZRZAaz/JMAryQkT8+kf" +
    "eHj/4SVBi3AxTMx8cdJm2dvGSZtChZ5VtqS03FIy/BQ/VkoVX/0Yt2UCgYEA4dB1" +
    "leu6S6r7ccUJYywcyHhRZGmlB2WUuZ8Qo6WRIYTbCYJbOZ3+VSsYuDXldwGtg5BF" +
    "P9AdYObIO7Cll1lyE4wATSJEkPj3NNlewIOYdjGRCS1vR4rNW9VR0HD99u5BqdQQ" +
    "WMdad1NKm2wdVr7kMvyn5wdJTkllMAMo9Qm7s/kCgYBknu2k9Jz9HeAjoH3Hdwtm" +
    "J3zH+8FAJJABghSTmP4rJ1VUGA5pWV53XPtlnIbU2DXnjodzSgoXtmABce2RkcyR" +
    "2xT/ne2N9JLAB6X58XAdcgpm4nodZgza2y5jaxi7lJyLtAczq47gcd5wSLDkiK0E" +
    "GZACmBqbivulj2Kl0E91rQKBgHpwfIFoyp+iuynqC3gBgC3Wx1Mp0TichLLNI8mH" +
    "yZSiI94ZF3u7Rh9J+eJQHvaTK1EN1e6O2o8jM2jiFDdnYWpl2/f237S3udqnDjBW" +
    "akGUCK8wOolRIp5roSvjSGEuuN3rxV1N4qiWufph+dqCMNvQkP28vqu7MimBXSDY" +
    "QTWJAoGBAMSYfPal85hHBA5GNIa81eUPx53xKqslbn2SqpJ6XPkDg2FylvpJ9KCK" +
    "rd/kprfkrvK/SztLNonbf8ih1eD+ycqiSLEV5Qn1QDDNDo5Kk+mqYVpun35Zu2Gc" +
    "TTk094z2Lg5QiH3W2/0pBU1TNqqdcVfP5A9y+mEsNdwN4DrykTFA\n" +
    "-----END RSA PRIVATE KEY-----";

//-- end config --------------------------------------------------------------------------------

/**
 * initialize this configuration
 * @param {*} verNo gateway Api Version Number
 * @param {*} apiUrl apiUrl gateway Api Url
 * @param {*} appId appId in developer settings : App Id
 * @param {*} key key in developer settings : Key
 * @param {*} secret secret in developer settings : secret
 * @param {*} serverPubKey serverPubKey in developer settings : Server Public Key
 * @param {*} privateKey privateKey in developer settings : Private Key
 */
export function init(verNo, apiUrl, appId, key, secret, serverPubKey, privateKey) {
    VERSION_NO = verNo;
    BASE_URL = apiUrl;
    CLIENT_ID = appId;
    CLIENT_SYMMETRIC_KEY = key;
    CLIENT_SECRET = secret;
    SERVER_PUB_KEY = serverPubKey;
    PRIVATE_KEY = privateKey;
}