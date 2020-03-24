import {Injectable} from '@angular/core';
import {
  ZgwnuBonitaAuthenticationService, ZgwnuBonitaConfigService,
  ZgwnuBonitaCredentials
} from '@zgwnu/ng-bonita';
import {Utilities} from 'src/app/utilities/utilities';
import {ServiceResponse} from '../enums/service-response.enum';
import {BonitaSession} from '../models/bonita-session';
import {HttpMethod} from '../enums/http-method.enum';
import {HttpRequestService} from './http-request/http-request.service';
import {TasksNames} from "../enums/tasks-names.enum";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private bonitaSession: BonitaSession;
  constructor(
    private configService: ZgwnuBonitaConfigService,
    private authenticationService: ZgwnuBonitaAuthenticationService,
    private httpRequest: HttpRequestService,
    private utilities: Utilities) {
  }

  public loginUser(loginForm, callback): any {
    this.authenticationService.login(new ZgwnuBonitaCredentials(loginForm.value.user, loginForm.value.password))
      .subscribe(
        (session: BonitaSession) => {
          this.bonitaSession = session;
          this.getUserCustomInfo( (customeInfo) => {
            const customeSession: BonitaSession = new BonitaSession(this.bonitaSession, customeInfo);
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
          console.info('configService', this.configService);
        }
      );
  }

  public isLogged() {
    return this.utilities.getFromSession('session') !== null;
  }

  private getUserCustomInfo(callback) {
    const endpoint = `/bonita/API/customuserinfo/user?c=10&p=0&f=userId=${this.bonitaSession.user_id}`;
    const customInfo = new Array();
    const params = {};

    this.httpRequest.request(endpoint, params, HttpMethod.GET).subscribe(
      (customInformation) => {
        customInformation.forEach((customField) => {
          customInfo[customField.definitionId.name] = customField.value;
        });

        this.getCurrentProcess((processData) => {
          if (processData) {
            this.bonitaSession.processNames = processData.processNames;
            this.bonitaSession.processInfo = processData.processInfo;
          }
          callback(Object.assign({}, customInfo));
        });
      });
  }

  private getCurrentProcess(callback) {
    let endpoint = `bonita/API/bpm/humanTask?c=50&f=state%3Dready&f=user_id%3D${this.bonitaSession.user_id}&p=0`;
    let processNames: Array<any> = new Array<any>();
    let processInfo: Array<any> = new Array<any>();
    sessionStorage.removeItem(TasksNames.BEGIN);
    this.httpRequest.request(endpoint, {}, HttpMethod.GET)
      .subscribe((task) => {
        let result = {processNames: {}, processInfo: {}};
        if (!task || !task.length) {
          return typeof callback === 'function' ? callback(result) : result;
        }
        this.utilities.saveOnSession(TasksNames.BEGIN, task);
        endpoint = `/bonita/API/bpm/process/${task[0].processId}`;
        this.httpRequest.request(endpoint, {}, HttpMethod.GET).subscribe((process) => {
          processNames[process.id] = process.displayName;
          processInfo[process.id] = process;
          processNames = Object.assign({}, processNames);
          processInfo = Object.assign({}, processInfo);
          result = {processNames, processInfo};
          return typeof callback === 'function' ? callback(result) : result;
        });
      });
  }
}
