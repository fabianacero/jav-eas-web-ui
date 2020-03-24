import {Injectable} from '@angular/core';
import {ZgwnuBonitaBpmHumanTaskService, ZgwnuBonitaSearchParms} from '@zgwnu/ng-bonita';
import {BonitaSession} from '../models/bonita-session';
import {Utilities} from '../utilities/utilities';
import {HttpMethod} from "../enums/http-method.enum";
import {HttpRequestService} from "./http-request/http-request.service";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private session: BonitaSession;

  constructor(private bpmHumanTaskService: ZgwnuBonitaBpmHumanTaskService, private utilities: Utilities, private httpRequest: HttpRequestService) {
    this.session = this.utilities.getFromSession('session');
  }

  private searchTasks(userId, callback) {
    const searchParams: ZgwnuBonitaSearchParms = new ZgwnuBonitaSearchParms(0, 50);
    searchParams.filters = [
      `user_id=${userId}`
    ];
    this.bpmHumanTaskService.searchHumanTasks(searchParams)
      .subscribe(
        humanTasks => {
          return typeof callback === 'function' ? callback(humanTasks) : humanTasks;
        },
        errorResponse => console.error(errorResponse)
      );
  }

  public assignTask(userId, taskId, callback) {
    const endpoint = `/bonita/API/bpm/humanTask/${taskId}`;
    const params = {
      assigned_id: userId,
      values: `[{'name': 'assigned_id', 'value': '${userId}'}]`
    };

    this.httpRequest.request(endpoint, params, HttpMethod.PUT, {
      additionalHeaders: {'X-Bonita-API-Token': this.session.token}
    }).subscribe((response) => {
      return typeof callback === 'function' ? callback(response) : response;
    });
  }

  public executeTask(params, taskId, callback) {
    const endpoint = `/bonita/API/bpm/userTask/${taskId}/execution`;
    const requestParams = {
      ...params
    };
    this.httpRequest.request(endpoint, requestParams, HttpMethod.POST, {
      additionalHeaders: {'X-Bonita-API-Token': this.session.token}
    }).subscribe((response) => {
      return typeof callback === 'function' ? callback(response) : '';
    });
  }
}
