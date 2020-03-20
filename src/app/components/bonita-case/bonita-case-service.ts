import {ZgwnuBonitaBusinessDataContext, ZgwnuBonitaContractInputFile} from "@zgwnu/ng-bonita";
import {Injectable} from "@angular/core";

@Injectable()
export class BonitaCaseService {
  public isAuthorized = false;
  public caseId: string;
  public taskId: string;
  public businessDataContext: ZgwnuBonitaBusinessDataContext;
  public uploadedDocFile: ZgwnuBonitaContractInputFile;
}
