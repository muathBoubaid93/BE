const stringifyParams = require('./stringifyParams');

describe('stringifyParams', () => {
  it('should be a function', () => {
    expect(typeof stringifyParams).toBe('function');
  });

  it('should returns a correct value', () => {
    const data = { token: '3sm40', secretKey: 'a019xm512', ip: '10.25.91' };
    const expectedValue = 'token=3sm40&secretKey=a019xm512&ip=10.25.91';

    expect(stringifyParams(data)).toBe(expectedValue);
  });
});
