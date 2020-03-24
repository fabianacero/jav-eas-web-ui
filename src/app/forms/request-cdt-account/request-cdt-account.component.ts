import {Component, OnInit} from '@angular/core';
import {ZgwnuBonitaSession} from '@zgwnu/ng-bonita';
import {Utilities} from '../../utilities/utilities';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksService} from '../../provider/tasks.service';
import {Routes} from '../../enums/routes.enum';
import {TasksNames} from '../../enums/tasks-names.enum';
import {CdtRequest} from '../../models/cdt-request';
import {BusinessDataService} from '../../provider/business-data.service';

@Component({
  selector: 'app-request-cdt-account',
  templateUrl: './request-cdt-account.component.html',
  styleUrls: ['./request-cdt-account.component.scss']
})
export class RequestCdtAccountComponent implements OnInit {

  public task: any;
  public session: ZgwnuBonitaSession;
  public acceptCdt = false;
  public model = new CdtRequest();

  constructor(
    private utilities: Utilities,
    private activatedRoute: ActivatedRoute,
    private taskService: TasksService,
    private businessDataService: BusinessDataService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    this.activatedRoute.paramMap.subscribe(params => {
      this.task = this.utilities.decodeJsonElement(params.get('task'));
    });

    if (this.task.name === TasksNames.ACCEPT_CDT_FORM) {
      this.acceptCdt = true;
      this.businessDataService.getBusunessData('CDTConditions', (cdtConditions) => {
        this.model = this.utilities.recursiveAssign(new CdtRequest(), cdtConditions);
        this.model.accept = false;
      });
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    const userId = this.session.user_id;
    const taskId = this.task.id;
    let params = {};
    this.taskService.assignTask(userId, taskId, (result) => {

      if (this.acceptCdt) {
        params = {
          cdtConditionsInput: {
            amount: form.value.amount,
            term: form.value.term,
            rate: form.value.rate
          },
          acceptTerms: form.value.accept
        };
      } else {
        params = {
          amountFormInput: form.value.amount,
          termFormInput: form.value.term
        };
      }
      this.taskService.executeTask(params, taskId, (execution) => {
        this.utilities.saveOnSession('request', this.model);
        this.router.navigate([Routes.TASK]);
      });
    });
  }
}
