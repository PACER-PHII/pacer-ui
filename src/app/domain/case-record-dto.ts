import {CaseRecordStatus} from "./case-record-status";
import {AdministrativeSex} from "./admnistrative-sex";
import {UtilsService} from "../service/utils.service";

export class CaseRecordDTO {
  recordId: number;
  medicalRecordNumber: number | null;
  lastName: string;
  givenName: string;
  diagnosis: string;
  dob: Date | null;
  status: CaseRecordStatus | string | null;
  gender: AdministrativeSex | string |  null;
  resource: any;


  constructor(responseRecord: any, utilsService: UtilsService){
    this.recordId = responseRecord.Id;
    this.medicalRecordNumber = utilsService.getMedicalRecordNumber(responseRecord?.Patient);
    this.lastName = responseRecord?.Patient?.Name?.family ?? '';
    this.givenName = responseRecord?.Patient?.Name?.given ?? '';
    this.diagnosis = utilsService.getDiagnosisDisplayValue(responseRecord?.Patient?.Diagnosis);
    this.dob = utilsService.getDate(responseRecord?.Patient?.Birth_Date);
    this.status = utilsService.getStatus(responseRecord);
    this.gender = utilsService.getGender(responseRecord?.Patient?.Sex);
    this.resource = responseRecord;
  }
}
