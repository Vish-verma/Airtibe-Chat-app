const moment = require('moment');
const CryptoJS = require("crypto-js");
require('dotenv').config();
const cryptoKey = process.env.CRYPTO_KEY;

function formatMessage(username, text) {
  return {
    username,
    text:encrypt(text),
    time: moment().format('h:mm a')
  };
}

let encrypt = (msg)=>{
    console.log("msg",msg, cryptoKey);
    return CryptoJS.AES.encrypt(msg, cryptoKey).toString();
}
let decrypt = (text)=>{
    return CryptoJS.AES.decrypt(text, cryptoKey).toString(CryptoJS.enc.Utf8);
}

module.exports={
    formatMessage,
    decrypt
}