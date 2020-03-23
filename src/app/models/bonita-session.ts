import {ZgwnuBonitaSession} from '@zgwnu/ng-bonita';

export class BonitaSession extends ZgwnuBonitaSession {
  public customeInfo: {};
  public processNames: {};
  public processInfo: {};

  constructor(originalSession: ZgwnuBonitaSession, customeInfo: {}) {
    super();
    this.customeInfo = customeInfo;
    Object.entries(originalSession).forEach((property) => {
      this[`${property[0]}`] = property[1];
    });
  }
}
