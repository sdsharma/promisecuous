import { encryptField, decryptField } from './encrypt';

describe('Encrypt', () => {
  it('should encrypt data', () => {
    let data = encryptField('hi', 'hello');
    expect(data).toBeTruthy();
  });

  it('should decrypt encrypted data', () => {
    let data = encryptField('hi', 'hello');
    data = decryptField('hi', data);
    expect(data).toEqual('hello');
  });
});
