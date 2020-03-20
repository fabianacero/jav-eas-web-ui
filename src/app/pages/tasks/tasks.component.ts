import {Component, OnInit} from '@angular/core';
import {
  ZgwnuBonitaBpmHumanTaskService, ZgwnuBonitaConfigService,
  ZgwnuBonitaErrorResponse, ZgwnuBonitaSearchParms,
  ZgwnuBonitaSession, ZgwnuBonitaTask
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
  public humanTask: ZgwnuBonitaTask;

  constructor(
    private bpmHumanTaskService: ZgwnuBonitaBpmHumanTaskService,
    private configService: ZgwnuBonitaConfigService,
    private utilities: Utilities) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    this.searchTasks();
  }

  public getForm(taskId): void {
    console.log("taskId, ", taskId);
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

  private searchTasks() {
    const searchParams: ZgwnuBonitaSearchParms = new ZgwnuBonitaSearchParms(0, 1);
    searchParams.filters = [
      `user_id=${this.session.user_id}`
    ];

    this.bpmHumanTaskService.searchHumanTasks(searchParams)
      .subscribe(
        humanTasks => {
          console.log('humanTask, ', humanTasks);
          if (humanTasks && humanTasks[0]) {
            this.humanTask = humanTasks[0];
            this.getUserTask();
          }
        },
        errorResponse => this.errorResponse = errorResponse
      );
  }

  private getUserTask() {
    this.bpmHumanTaskService.getHumanTask(this.humanTask.id)
      .subscribe(
        humanTask => {
          console.log("humanTask, ", humanTask);
          this.humanTask = humanTask;
        },
        errorResponse => this.errorResponse
      );
  }
}
