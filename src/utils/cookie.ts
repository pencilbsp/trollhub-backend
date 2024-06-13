export interface ICookie {
  id?: number;
  storeId?: string;
  session?: boolean;
  hostOnly?: boolean;
  expirationDate?: number;
  name: string;
  value: string;
  url?: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: CookieSameSite;
  expires?: number;
  priority?: CookiePriority;
  sameParty?: boolean;
  sourceScheme?: CookieSourceScheme;
  partitionKey?: string;
}

export default class Cookie {
  json: ICookie[] = [];
  constructor(cookie: ICookie[], domain?: string) {
    this.json = domain
      ? cookie.filter((c) => c?.domain?.includes(domain))
      : cookie;
  }

  get = (name: string, domain?: string) => {
    return this.json.find(
      (c) => c.name === name && (domain ? c?.domain?.includes(domain) : true)
    );
  };

  set = (name: string, c: ICookie) => {
    const index = this.json.findIndex((c) => c.name === name);
    if (index > -1) {
      this.json[index] = c;
    } else {
      this.json.push(c);
    }
  };

  toString = () => {
    return this.json.map((c) => `${c.name}=${c.value}`).join("; ");
  };
}
