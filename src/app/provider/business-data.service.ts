import {Injectable} from '@angular/core';
import {ZgwnuBonitaSearchParms} from '@zgwnu/ng-bonita';
import {HttpMethod} from '../enums/http-method.enum';
import {HttpRequestService} from './http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {

  constructor(private httpRequest: HttpRequestService) {
  }

  public getStorageId(caseId, dataName, callback) {
    const endpoint = `/bonita/API/bdm/businessDataReference/${caseId}/${dataName}`;
    this.httpRequest.request(endpoint, {}, HttpMethod.GET)
      .subscribe((storageData) => {
        return typeof callback === 'function' ? callback(storageData.storageId) : storageData.storageId;
      });
  }

  public getBusunessBonitaData(dataName, storageId, resource?, callback?) {
    let endpoint = `/bonita/API/bdm/businessData/com.company.model.${dataName}/${storageId}`;
    if (resource) {
      endpoint += `/${resource}`;
    }
    this.httpRequest.request(endpoint, {}, HttpMethod.GET)
      .subscribe((response) => {
        return typeof callback === 'function' ? callback(response) : '';
      });
  }
}
