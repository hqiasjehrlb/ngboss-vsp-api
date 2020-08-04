# NGBoss-VSP-API
API implementation use Typescript

## install
```
npm install --save https://github.com/hqiasjehrlb/ngboss-vsp-api.git#master
```
or
```
yarn add https://github.com/hqiasjehrlb/ngboss-vsp-api.git#master
```

## Usage
1. Create instance
```javascript
const Client = require('ngboss-api');
const client = new Client('http://open.cnnic.cn/op/rest', { app_key, app_secret });
```
2. Call method
```javascript
(async () => {
  const result = await client.registrant.status({
    registrant_id: 'xxxxx',
    lang: 'zh_CN'
  });
  /*
    {
      status: {
        code: 0,
        message: 'success'
      },
      audit_result: {
        audit_status: 'pass',
        registry_id: 12345,
        registrant_id: 'xxxxx',
        registrant_org: 'xxxxxx'
      },
      originResponse: <original response body>
    }
  */
})();
```
3. Methods
* domain

  upload: upload domain material
  ```javascript
  client.domain.upload({
    domain_name: 'xxxxxx',
    image: '<base64 string>'
  });
  ```

  status: check domain audit status
  ```javascript
  client.domain.status({
    domain_name: 'xxxxxx',
    lang: 'zh_CN'
  });
  ```

* registrant

  upload: upload registrant material
  ```javascript
  client.registrant.upload({
    registrant_id: 'xxxxxx',
    image: '<base64 string>'
  });
  ```

  status: check registrant audit status
  ```javascript
  client.registrant.status({
    registrant_id: 'xxxxxx',
    lang: 'zh_CN'
  });
  ```
