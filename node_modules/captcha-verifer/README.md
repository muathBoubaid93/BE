# captcha-verifer

![Captcha Verifer](https://developers.google.com/recaptcha/images/newCaptchaAnchor.gif "Captcha Verifer package")

Verification your ReCaptcha or HCaptcha is easy

## Advantages

* Without any dependencies
* Less than 5 kb
* ES6
* Verify two types of captcha (ReCaptcha and HCaptcha)
* Ease to use

## Installation

```bash
npm i captcha-verifer
```

## Usage

```javascript
const Captcha = require('captcha-verifer');
```

```javascript
Captcha.verifer({
  type: 'recaptcha', // Required (recaptcha or hcaptcha)
  secretKey: 'superSecret', // Required
  token: 'TOKEN (Captcha response)', // Required
  ip: '47.16.0.0' // Optional
})
.then((captcha) => {
  if (!captcha.success) return; // Captcha not solved

  /* All good. There is your super code! */
})
.catch((e) => console.log(e));
```

Or

```javascript
(async () => {
  try {
    const captcha = await Captcha.verifer({
      type: 'hcaptcha', // Required (recaptcha or hcaptcha)
      secretKey: 'superSecret', // Required
      token: 'TOKEN (Captcha response)', // Required
      ip: '47.16.0.0' // Optional
    });

    if (!captcha.success) return; // Captcha not solved

    /* Your perfect code here */
  } catch (e) {
    console.log(e);
  }
})();
```

You can also verify recaptcha 3

```javascript
Captcha.verifer({
  type: 'recaptcha', // Required (recaptcha or hcaptcha)
  secretKey: 'superSecret', // Required
  token: 'TOKEN (Captcha response)', // Required
  ip: '47.16.0.0' //Optional
})
.then((captcha) => {
  if (!captcha.success || captcha.score <= 0.3) return; // Captcha not solved

  /* Pefect. Go ahead */
})
.catch((e) => console.log(e));
```

---

## License
[MIT](https://choosealicense.com/licenses/mit/)
