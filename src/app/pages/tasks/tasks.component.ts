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
import {FormRoutes} from "../../enums/form-routes.enum";
import {Router} from "@angular/router";

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
    private utilities: Utilities,
    private router: Router) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    Object.entries(this.session.processInfo).forEach(([key, value]) => {
      this.userProcess.push(value);
    });
    Object.entries(this.session.processNames).forEach(([key, value]) => {
      this.processNames[key] = value;
    });
    this.searchTasks();
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

  public takeTask(userId, selectedTask) {
    if (FormRoutes[selectedTask.name]) {
      this.router.navigate([FormRoutes[selectedTask.name], this.utilities.encodeJsonElement(selectedTask)]);
    }
  }

}
