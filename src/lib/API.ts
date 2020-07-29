import axios, { AxiosInstance } from 'axios';
import qs = require('querystring');
import moment = require('moment');
import crypto = require('crypto');

export interface APIOptionalProps {
  app_key: string;
  app_secret: string;
}

export interface APIResponseStatus {
  code: number;
  operation_at: string;
  message: string;
}

export function timestamp() {
  return moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
}

export function signObj(obj: any, app_secret: string) {
  const ar = [app_secret];
  const keys = Object.keys(obj).sort();
  const rslt: any = {};
  for (const key of keys) {
    rslt[key] = obj[key];
    ar.push(`${key}${obj[key]}`);
  }
  ar.push(app_secret);
  rslt.sign = crypto.createHash('md5').update(ar.join('')).digest('hex').toUpperCase();
  return rslt;
}

export function chkResp(originResponse: any) {
  const key = Object.keys(originResponse)[0];
  const resp = originResponse[key];
  if (!resp || !resp.status) {
    throw new Error(JSON.stringify(originResponse));
  }
  return resp;
}

class API {
  /* instance properties */
  app_key: string = '';
  app_secret: string = '';
  protected _req: AxiosInstance;

  /* constructor */
  constructor(url: string, opt?: APIOptionalProps) {
    if (opt) {
      this.app_key = opt.app_key || '';
      this.app_secret = opt.app_secret || '';
    }
    this._req = axios.create({
      baseURL: url,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      responseType: 'json',
      validateStatus() {
        return true;
      },
    });
  }

  /* instance methods */
  /** return api call response body */
  async apiCall(method: string, data: object, opt?: APIOptionalProps) {
    let app_key = this.app_key,
      app_secret = this.app_secret;
    if (opt) {
      app_key = opt.app_key || app_key;
      app_secret = opt.app_secret || app_secret;
    }
    if (!app_key || !app_secret) {
      throw new Error('opt.app_key and opt.app_secret is required');
    }
    const outObj = {
      ...data,
      timestamp: timestamp(),
      format: 'json',
      app_key,
      v: '1.0',
      sign_method: 'md5',
      method,
    };
    const outData = qs.stringify(signObj(outObj, app_secret));
    const result = await this._req.post('', outData);
    if (!result || !result.data) {
      throw new Error('unknown_api_call_error');
    }
    if (typeof result.data !== 'object') {
      throw new Error(result.data);
    }
    return result.data;
  }
}

export default API;
