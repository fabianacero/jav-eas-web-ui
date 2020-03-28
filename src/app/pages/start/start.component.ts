import {Component, OnInit} from '@angular/core';
import {HttpMethod} from '../../enums/http-method.enum';
import {HttpRequestService} from '../../provider/http-request/http-request.service';
import {BonitaSession} from '../../models/bonita-session';
import {Utilities} from '../../utilities/utilities';
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";
import {ZgwnuBonitaBpmHumanTaskService, ZgwnuBonitaHumanTask, ZgwnuBonitaSearchParms} from "@zgwnu/ng-bonita";
import {TasksNames} from "../../enums/tasks-names.enum";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  public session: BonitaSession;
  private humanTasks: ZgwnuBonitaHumanTask[];
  public showLoader = false;

  constructor(private httpRequest: HttpRequestService,
              private utilities: Utilities,
              private router: Router,
              private bpmHumanTaskService: ZgwnuBonitaBpmHumanTaskService) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    this.searchTasks();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    if (this.humanTasks[0]) {
      const taskId = this.humanTasks[0]["id"];
      this.startTask(this.session.user_id, taskId);
    } else {
      console.info("No task obtained!");
    }
  }

  public startTask(userId, taskId) {
    const endpoint = `/bonita/API/bpm/humanTask/${taskId}`;
    const params = {
      assigned_id: userId,
      values: `[{'name': 'assigned_id', 'value': '${userId}'}]`
    };

    this.httpRequest.request(endpoint, params, HttpMethod.PUT, {
      additionalHeaders: {'X-Bonita-API-Token': this.session.token}
    }).subscribe((response) => {
      this.executeTask(taskId, (execution) => {
        sessionStorage.removeItem(TasksNames.BEGIN);
        setTimeout(() => {
          this.showLoader = false;
          this.router.navigate(['/task']);
        }, 2000);
      });
    });
  }

  public executeTask(taskId, callback) {
    const endpoint = `/bonita/API/bpm/userTask/${taskId}/execution`;
    const identificationNumber = this.session.customeInfo["IdentificationNumber"];
    const params = {
      ticket_comment: 'User execution',
      identificationNumberInput: identificationNumber
    };
    this.showLoader = true;
    this.httpRequest.request(endpoint, params, HttpMethod.POST, {
      additionalHeaders: {'X-Bonita-API-Token': this.session.token}
    }).subscribe((response) => {
      return typeof callback === 'function' ? callback(response) : '';
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
        errorResponse => {
          console.error(errorResponse);
        }
      );
  }

}
