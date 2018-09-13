const CryptoJS = require("crypto-js");
const uuid     = require("uuid/v4");
const _        =require('lodash');

module.exports = (function() {
    let CryptoJSAesJson = {
        stringify (cipherParams) {
            var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
            if (cipherParams.iv) j.iv = cipherParams.iv.toString();
            if (cipherParams.salt) j.s = cipherParams.salt.toString();
            return JSON.stringify(j);
        },

        parse (jsonStr) {
            var j = JSON.parse(jsonStr);
            var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
            if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
            if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
            return cipherParams;
        }
    };


    return {
        encryptEx (data) {
            var keys = this.makeKey();
            var key = this.selectKey(keys);
            var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {format: CryptoJSAesJson}).toString();
            var encryptedObj =  JSON.parse(encryptedData);
            encryptedObj.k = keys;
            encryptedData = JSON.stringify(encryptedObj);
            return encryptedData;
        },

        decryptEx (data) {
            let keys = JSON.parse(data).k;
            let key = this.selectKey(keys);

            return JSON.parse(CryptoJS.AES.decrypt(
                data, key,
                {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8)
            );
        },

        makeKey () {
            let keyArray = [];
            for(var i = 0 ; i < 10 ; i++){
                var  uid = _.split(uuid(), '-',5);
                keyArray[i] = uid[4];
            }

            return {
                t:_.toString(Date.now()),
                d:keyArray
            };
        },

        selectKey (data) {
            var timeArray = _.toArray(data.t);
            return data.d[timeArray[12]];
        }
    };
})();
