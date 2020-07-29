import API, { APIOptionalProps } from './API';
import Domain from './Domain';
import Registrant from './Registrant';

class Client extends API {
  domain: Domain;
  registrant: Registrant;
  constructor (url: string, opt: APIOptionalProps) {
    super(url, opt);
    this.domain = new Domain(url, opt);
    this.registrant = new Registrant(url, opt);
  }
}

export default Client
