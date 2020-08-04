import API, { APIOptionalProps, APIResponseStatus, chkResp } from './API';

export interface DomainUploadData {
  domain_name: string;
  image: string;
}

export interface DomainQueryData {
  domain_name: string;
  lang: 'zh_CN' | 'en_US';
}

export interface DomainAuditResult {
  audit_status: string;
  audit_date: string;
  registry_id: number;
}

class Domain extends API {
  async upload(data: DomainUploadData, opt: APIOptionalProps) {
    const method = 'cnnic.url.forward.newg.audit.domain.materialupload';
    const originResponse = await this.apiCall(method, data, opt);
    const resp = chkResp(originResponse);
    const status: APIResponseStatus = resp.status;
    return { status, originResponse };
  }

  async status(data: DomainQueryData, opt: APIOptionalProps) {
    const method = 'cnnic.url.forward.newg.audit.registrant.domainResultQuery';
    const originResponse = await this.apiCall(method, data, opt);
    const resp = chkResp(originResponse);
    const status: APIResponseStatus = resp.status;
    const audit_result: DomainAuditResult | undefined = resp.audit_result;
    return { status, audit_result, originResponse };
  }
}

export default Domain;
