import {Component, OnInit} from '@angular/core';
import {Utilities} from "../../utilities/utilities";
import {ActivatedRoute, Router} from "@angular/router";
import {TasksService} from "../../provider/tasks.service";
import {BusinessDataService} from "../../provider/business-data.service";
import {CdtRequest} from "../../models/cdt-request";
import {BonitaSession} from "../../models/bonita-session";
import {NgForm} from "@angular/forms";
import {Routes} from "../../enums/routes.enum";

@Component({
  selector: 'app-contact-client',
  templateUrl: './contact-client.component.html',
  styleUrls: ['./contact-client.component.scss']
})
export class ContactClientComponent implements OnInit {

  public task: any;
  public model: CdtRequest;
  public session: BonitaSession;

  constructor(private utilities: Utilities,
              private activatedRoute: ActivatedRoute,
              private taskService: TasksService,
              private router: Router,
              private businessDataService: BusinessDataService) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    this.activatedRoute.paramMap.subscribe(params => {
      this.task = this.utilities.decodeJsonElement(params.get('task'));
    });
    const sessionRequest = this.utilities.getFromSession('request');
    this.model = this.utilities.recursiveAssign(new CdtRequest(), sessionRequest);

    const caseId = this.task.rootCaseId;
    this.businessDataService.getStorageId(caseId, "customerDTo", (storageId) => {
      this.businessDataService.getBusunessBonitaData('Customer', storageId, null, (customer) => {
        this.model.firstName = customer.firstName;
        this.model.lastName = customer.lastName;
        this.model.email = customer.email;
      });
      this.businessDataService.getBusunessBonitaData("Product", storageId, "identification", (identification) => {
        this.model.identificationNumber = identification.identificationNumber;
      });
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return false;
    }
    const userId = this.session.user_id;
    const taskId = this.task.id;
    let params = {};
    this.taskService.assignTask(userId, taskId, (result) => {
      params = {
        customerWantsContinueInput: form.value.continue,
        customerDtoInput: {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          email: form.value.email,
          identificationCustomer: {
            identificationNumber: form.value.identification,
            persistenceId_string: '6'
          }
        },
        cdtConditionsInput: {
          amount: form.value.amount,
          term: form.value.term,
          rate: form.value.rate
        }
      };

      this.taskService.executeTask(params, taskId, (execution) => {
        this.router.navigate([Routes.TASK]);
      });
    });
  }
}
