import {Injectable} from '@angular/core';
import {
  ZgwnuBonitaAuthenticationService, ZgwnuBonitaBpmProcessService, ZgwnuBonitaConfigService,
  ZgwnuBonitaCredentials, ZgwnuBonitaSearchParms, ZgwnuBonitaSession
} from '@zgwnu/ng-bonita';
import {Utilities} from 'src/app/utilities/utilities';
import {ServiceResponse} from '../enums/service-response.enum';
import {BonitaSession} from '../models/bonita-session';
import {HttpMethod} from '../enums/http-method.enum';
import {HttpRequestService} from './http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private configService: ZgwnuBonitaConfigService,
    private authenticationService: ZgwnuBonitaAuthenticationService,
    private httpRequest: HttpRequestService,
    private utilities: Utilities,
    private bpmProcessService: ZgwnuBonitaBpmProcessService) {
  }

  public loginUser(loginForm, callback): any {
    this.authenticationService.login(new ZgwnuBonitaCredentials(loginForm.value.user, loginForm.value.password))
      .subscribe(
        (session: ZgwnuBonitaSession) => {
          this.getUserCustomInfo(session, (customeInfo) => {
            const customeSession: BonitaSession = new BonitaSession(session, customeInfo);
            this.utilities.saveOnSession('session', customeSession);
            return typeof callback === 'function' ? callback({
              status: ServiceResponse.SUCESS,
              customeSession
            }) : customeSession;
          });
        },
        errorResponse => {
          return typeof callback === 'function' ? callback({
            status: ServiceResponse.ERROR,
            message: errorResponse
          }) : errorResponse;
        },
        () => {
          console.log('configService', this.configService);
        }
      );
  }

  public isLogged() {
    return this.utilities.getFromSession('session') !== null;
  }

  private getUserCustomInfo(session: ZgwnuBonitaSession, callback) {
    const endpoint = `/bonita/API/customuserinfo/user?c=10&p=0&f=userId=${session.user_id}`;
    const customInfo = new Array();
    const params = {};

    this.httpRequest.request(endpoint, params, HttpMethod.GET).subscribe(
      (customInformation) => {
        customInformation.forEach((customField) => {
          customInfo[customField.definitionId.name] = customField.value;
        });
        this.getCurrentProcess(session, (processData) => {
          session.processNames = processData.processNames;
          session.processInfo = processData.processInfo;
          console.log("session, ", session)
          callback(Object.assign({}, customInfo));
        });
      });
  }

  private getCurrentProcess(session, callback) {
    const searchParams: ZgwnuBonitaSearchParms = new ZgwnuBonitaSearchParms(0, 50);
    let result = {};
    searchParams.filters = [`user_id=${session.user_id}`];

    this.bpmProcessService.searchProcessDefinitions(searchParams)
      .subscribe(
        processDefinitions => {
          let processNames: Array<any> = new Array<any>();
          let processInfo: Array<any> = new Array<any>();
          let promise = null;
          promise = new Promise((resolve, reject) => {
            processDefinitions.forEach(process => {
              this.getCurrentCase(process.id, (currentCase) => {
                process.currentCase = currentCase;
                processInfo[process.id] = process;
                processNames[process.id] = process.displayName;
                resolve(currentCase);
              });
            });
          });

          promise.then((final) => {
            processNames = Object.assign({}, processNames);
            processInfo = Object.assign({}, processInfo);
            console.log("processInfo, ", processInfo);
            result = {processNames, processInfo};
            return typeof callback === 'function' ? callback(result) : result;
          }).catch((reason) => {
            console.error('promise rejected', reason);
          });
        },
        errorResponse => console.error(errorResponse)
      );
  }

  private getCurrentCase(processId, callback): any {
    const endpoint = `/bonita/API/bpm/case?p=0&c=10&f=processDefinitionId=${processId}`;
    const params = {};

    this.httpRequest.request(endpoint, params, HttpMethod.GET).subscribe(
      (currentCaseInfo) => {
        return typeof callback === 'function' ? callback(currentCaseInfo) : currentCaseInfo;
      });
  }
}
