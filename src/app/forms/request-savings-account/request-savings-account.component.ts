import {Component, OnInit} from '@angular/core';
import {ZgwnuBonitaSession} from "@zgwnu/ng-bonita";
import {Utilities} from "../../utilities/utilities";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BusinessDataService} from "../../provider/business-data.service";
import {SavingRequest} from "../../models/saving-request";
import {Routes} from "../../enums/routes.enum";
import {TasksService} from "../../provider/tasks.service";

@Component({
  selector: 'app-request-savings-account',
  templateUrl: './request-savings-account.component.html',
  styleUrls: ['./request-savings-account.component.scss']
})
export class RequestSavingsAccountComponent implements OnInit {

  public task: any;
  public session: ZgwnuBonitaSession;
  public model = new SavingRequest();

  constructor(private utilities: Utilities,
              private activatedRoute: ActivatedRoute,
              private businessDataService: BusinessDataService,
              private taskService: TasksService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.session = this.utilities.getFromSession('session');
    this.activatedRoute.paramMap.subscribe(params => {
      this.task = this.utilities.decodeJsonElement(params.get('task'));
    });
    const caseId = this.task.rootCaseId;
    this.businessDataService.getStorageId(caseId, "savingAccountRequest", (storageId) => {
      this.businessDataService.getBusunessBonitaData("RequestProduct", storageId, null, (savingAccount) => {
        this.model.savingId = savingAccount.id;
        this.model.productType = savingAccount.productType;
      });

      this.businessDataService.getBusunessBonitaData("RequestProduct", storageId, "identification", (identification) => {
        this.model.identificationNumber = identification.identificationNumber;
      });
    });

    this.businessDataService.getStorageId(caseId, "customerDto", (storageId) => {
      this.businessDataService.getBusunessBonitaData("Customer", storageId, null, (customer) => {
        this.model.firstName = customer.firstName;
        this.model.lastName = customer.lastName;
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
        savingAccountRequestInput: {
          id: form.value.id,
          productType: this.model.productType,
          identification: {
            persistenceId_string: '88',
            identification: 1,
            identificationNumber: form.value.identification
          }
        },
        customerDtoInput: {
          firstName: form.value.firstName,
          lastName: form.value.lastName
        },
        savingAccountInput: {
          balance: form.value.balance
        }
      };

      this.taskService.executeTask(params, taskId, (execution) => {
        this.utilities.saveOnSession('saving', this.model);
        this.router.navigate([Routes.TASK]);
      });
    });
  }
}
