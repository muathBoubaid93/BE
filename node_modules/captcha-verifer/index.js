const https = require('https');

const { stringifyParams } = require('./utills');

const host = {
  recaptcha: 'www.google.com',
  hcaptcha: 'hcaptcha.com',
};

const path = {
  recaptcha: '/recaptcha/api/siteverify',
  hcaptcha: '/siteverify',
};

class Captcha {
  static verifer({ type, secretKey, token, ip }) {
    return new Promise((resolve, reject) => {
      // Params check
      if (!type || !secretKey || !token)
        throw new Error('Some required params are empty');

      if (type !== 'recaptcha' && type !== 'hcaptcha')
        throw new Error(
          'Type of captcha is not known. It might be ReCaptcha of HCaptcha'
        );

      const captchaHost = type === 'recaptcha' ? host.recaptcha : host.hcaptcha;
      const captchaPath = type === 'recaptcha' ? path.recaptcha : path.hcaptcha;

      const params = {
        secret: secretKey,
        response: token,
        remoteip: ip,
      };

      // Request
      const requestData = stringifyParams(params);

      const options = {
        hostname: captchaHost,
        path: captchaPath,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const req = https.request(options, (res) => {
        res.setEncoding('utf8');

        let buffer = '';

        res
          .on('error', reject)
          .on('data', (chunk) => (buffer += chunk))
          .on('end', () => resolve(JSON.parse(buffer)));
      });

      req.write(requestData);
      req.on('error', reject).end();
    });
  }
}

module.exports = Captcha;
