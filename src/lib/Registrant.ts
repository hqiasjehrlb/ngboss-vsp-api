import API, { APIOptionalProps, APIResponseStatus, chkResp } from './API';

export interface RegistrantUploadData {
  registrant_id: string;
  image: string;
}

export interface RegistrantQueryData {
  registrant_id: string;
  lang: 'zh_CN'|'en_US';
}

export interface RegistrantAuditResult {
  audit_status: string;
  registry_id: number;
  registrant_id: string;
  registrant_org: string;
}

class Registrant extends API {
  async upload (data: RegistrantUploadData, opt?: APIOptionalProps) {
    const method = 'cnnic.url.forward.newg.audit.registrant.materialupload';
    const originResponse = await this.apiCall(method, data, opt);
    const resp = chkResp(originResponse);
    const status: APIResponseStatus = resp.status;
    return { status, originResponse };
  }

  async status (data: RegistrantQueryData, opt?: APIOptionalProps) {
    const method = 'cnnic.url.forward.newg.audit.registrant.realNameQuery';
    const originResponse = await this.apiCall(method, data, opt);
    const resp = chkResp(originResponse);
    const status: APIResponseStatus = resp.status;
    const audit_result: RegistrantAuditResult|undefined = resp.audit_result;
    return { status, audit_result, originResponse };
  }
}

export default Registrant
