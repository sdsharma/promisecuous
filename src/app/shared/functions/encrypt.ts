import * as sjcl from 'sjcl';

export function encryptField(password: string, content: string): string {
    let hashPass = sjcl.hash.sha256.hash(password);
    hashPass = sjcl.codec.hex.fromBits(hashPass);
    return sjcl.encrypt(hashPass, content);
}

export function decryptField(password: string, encryptedData: string): string {
    let hashPass = sjcl.hash.sha256.hash(password);
    hashPass = sjcl.codec.hex.fromBits(hashPass);
    return sjcl.decrypt(hashPass, encryptedData);
}
