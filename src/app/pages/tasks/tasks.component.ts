import {Component, OnInit} from '@angular/core';
import {
  ZgwnuBonitaBpmHumanTaskService, ZgwnuBonitaBpmProcessService, ZgwnuBonitaBpmTaskService,
  ZgwnuBonitaConfigService,
  ZgwnuBonitaErrorResponse,
  ZgwnuBonitaHumanTask, ZgwnuBonitaProcessDefinition,
  ZgwnuBonitaSearchParms
} from '@zgwnu/ng-bonita';
import {Utilities} from '../../utilities/utilities';
import {HttpRequestService} from '../../provider/http-request/http-request.service';
import {BonitaSession} from '../../models/bonita-session';
import {HttpMethod} from '../../enums/http-method.enum';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public session: BonitaSession;
  public errorResponse: ZgwnuBonitaErrorResponse;
  public humanTasks: ZgwnuBonitaHumanTask[];
  public userProcess = new Array();
  public processNames = new Array();

  constructor(
    private task: ZgwnuBonitaBpmTaskService,
    private bpmHumanTaskService: ZgwnuBonitaBpmHumanTaskService,
    private bpmProcessService: ZgwnuBonitaBpmProcessService,
    private configService: ZgwnuBonitaConfigService,
    private httpRequest: HttpRequestService,
    private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    Object.entries(this.session.processInfo).forEach(([key, value]) => {
      this.userProcess.push(value);
    });
    Object.entries(this.session.processNames).forEach(([key, value]) => {
      this.processNames[key] = value;
    });
    this.setDocumentOnProcess(() => {
      this.searchTasks();
    });
  }

  private setDocumentOnProcess(callback) {
    const processInfo = this.session.processInfo;
    const identificationNumber = this.session.customeInfo.IdentificationNumber;
    const processIds = Object.keys(this.session.processNames);
    const currentProcessId = processIds[0];
    let currentCase = null;
    let promise = null;
    if (currentProcessId && processInfo[currentProcessId]) {
      currentCase = processInfo[currentProcessId].currentCase;
      currentCase = currentCase[0];
    }
    if (currentCase) {
      promise = new Promise((resolve, reject) => {
        this.setProcessVariable(currentCase.id, identificationNumber, (status) => {
          resolve(status);
        });
      });
    }

    promise.then((final) => {
      return typeof callback === 'function' ? callback() : callback;
    }).catch(reason => console.error('promise failed, ', reason));
  }

  private setProcessVariable(caseId: number, value: any, callback): void {
    const endpoint = `/bonita/API/bpm/caseVariable/${caseId}/identificationNumber`;
    const params = {
      type: 'java.lang.String',
      value
    };
    this.httpRequest.request(endpoint, params, HttpMethod.PUT, {
      additionalHeaders: {'X-Bonita-API-Token': this.session.token}
    }).subscribe((response) => {
      return typeof callback === 'function' ? callback(response) : response;
    });
  }

  private searchTasks() {
    const searchParams: ZgwnuBonitaSearchParms = new ZgwnuBonitaSearchParms(0, 50);
    searchParams.filters = [
      `user_id=${this.session.user_id}`
    ];

    this.bpmHumanTaskService.searchHumanTasks(searchParams)
      .subscribe(
        humanTasks => {
          this.humanTasks = humanTasks;
        },
        errorResponse => this.errorResponse = errorResponse
      );
  }

  public takeTask(userId, taskId) {
    console.log("userId, ", userId, taskId);
  }

}
