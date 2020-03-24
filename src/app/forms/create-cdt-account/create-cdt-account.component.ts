import {Component, OnInit} from '@angular/core';
import {ZgwnuBonitaSession} from '@zgwnu/ng-bonita';
import {Utilities} from '../../utilities/utilities';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksService} from '../../provider/tasks.service';
import {Routes} from '../../enums/routes.enum';
import {CdtRequest} from '../../models/cdt-request';
import {BonitaSession} from '../../models/bonita-session';
import {BusinessDataService} from '../../provider/business-data.service';

@Component({
  selector: 'app-create-cdt-account',
  templateUrl: './create-cdt-account.component.html',
  styleUrls: ['./create-cdt-account.component.scss']
})
export class CreateCdtAccountComponent implements OnInit {

  public task: any;
  public model: CdtRequest;
  public session: BonitaSession;

  constructor(
    private utilities: Utilities,
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
    this.businessDataService.getBusunessData('Product', (product) => {
      this.model.accountNumber = product.accountNumber;
      this.model.balance = product.balance;
    });
    this.businessDataService.getBusunessData('Customer', (customer) => {
      this.model.firstName = customer.firstName;
      this.model.lastName = customer.lastName;
    });
    this.businessDataService.getBusunessData('identificationCustomer', (identification) => {
      this.model.identificationNumber = identification.identificationNumber;
    });
    this.businessDataService.getBusunessData('RequestProduct', (requestProduct) => {
      this.model.productType = requestProduct.productType;
      this.model.cdtId = requestProduct.id;
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
        savingAccountInput: {
          accountNumber: form.value.account,
          balance: form.value.balance,
        },
        customerDtoInput: {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          identificationCustomer: {
            identificationNumber: form.value.identification
          }
        },
        cdtConditionsInput: {
          amount: form.value.amount,
          term: form.value.term,
          rate: form.value.rate
        },
        cdtAccountRequestInput: {
          id: form.value.cdt
        }
      };
      this.taskService.executeTask(params, taskId, (execution) => {
        this.router.navigate([Routes.FINISH]);
      });
    });
  }
}
