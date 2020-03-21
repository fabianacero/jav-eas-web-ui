import {Component, OnInit} from '@angular/core';
import {
  ZgwnuBonitaBpmHumanTaskService, ZgwnuBonitaBpmProcessService,
  ZgwnuBonitaConfigService,
  ZgwnuBonitaErrorResponse,
  ZgwnuBonitaHumanTask, ZgwnuBonitaProcessDefinition,
  ZgwnuBonitaSearchParms,
  ZgwnuBonitaSession,
} from '@zgwnu/ng-bonita';
import {Utilities} from '../../utilities/utilities';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  private readonly humanTaskName = 'USER_TASK';
  public session: ZgwnuBonitaSession;
  public errorResponse: ZgwnuBonitaErrorResponse;
  public humanTasks: ZgwnuBonitaHumanTask[];
  public userProcess: ZgwnuBonitaProcessDefinition[];
  public processNames = new Array();

  constructor(
    private bpmHumanTaskService: ZgwnuBonitaBpmHumanTaskService,
    private bpmProcessService: ZgwnuBonitaBpmProcessService,
    private configService: ZgwnuBonitaConfigService,
    private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    this.searchProcess();
    this.searchTasks();
  }

  /*private getAssignedTask() {
    const endpoint = '/bonita/API/bpm/humanTask';
    const headers = {
      additionalHeaders: {
        'X-Bonita-API-Token': '806f410d-d052-4074-84ab-85412afc958a',
        'Cookie': 'JSESSIONID=7790E3A6B67D4F6A06B871DD1A6B910A',
        'bonita.tenant': '1'
      }
    };
    const params = {
      p: '0',
      c: '10',
      f: 'state=ready&user_id=4'
    };

    this.httpRequest.request(endpoint, params, HttpMethod.GET, headers).subscribe((response) => {
      console.log('response, ', response);
    });

  }*/

  private searchProcess() {
    const searchParams: ZgwnuBonitaSearchParms = new ZgwnuBonitaSearchParms(0, 50);
    searchParams.filters = [`user_id=${this.session.user_id}`, 'forPendingOrAssignedTask=true'];

    this.bpmProcessService.searchProcessDefinitions(searchParams)
      .subscribe(
        processDefinitions => {
          this.userProcess = processDefinitions;
          this.userProcess.forEach(process => {
            this.processNames[process.id] = process.displayName;
          });
        },
        errorResponse => this.errorResponse = errorResponse
      );
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

  public getForm(taskId) {
    console.log("taskId, ", taskId);
  }
}
