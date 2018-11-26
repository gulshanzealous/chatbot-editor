var Utf8 = require("crypto-js/enc-utf8")
var AES = require("crypto-js/aes");

export const saveState = (store) => {

    try {
        const serializedStore = JSON.stringify(store)
        const encryptedStore = AES.encrypt(serializedStore, 'mySecretKey');
        localStorage.setItem('store', encryptedStore)
    } catch (e) {
        console.log(e)
    }
}

export const loadState = () => {
    try {
        const encryptedStore = localStorage.getItem('store')
        if (encryptedStore === null) {
            return undefined
        }
        var bytes = AES.decrypt(encryptedStore.toString(), 'mySecretKey');
        var serializedStore = bytes.toString(Utf8);

        return JSON.parse(serializedStore)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

export const deleteState = () => {
    try {
        localStorage.removeItem('store')

        console.log('logged out')
    } catch (e) {
        console.log(e)
        return undefined
    }
}