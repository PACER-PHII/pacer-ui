import {CaseRecordStatus} from "./case-record-status";
import {AdministrativeSex} from "./admnistrative-sex";
import {UtilsService} from "../service/utils.service";

export class PersonInfo {
  medicalRecordNumber: number | null;
  lastName: string;
  givenName: string;
  diagnosis: string;
  dob: Date | null;
  status: CaseRecordStatus | null;
  gender: AdministrativeSex | null;
  streetAddress: string;
  preferredLanguage: string;
  resource: any;
  constructor(recordDetails: any, utilsService: UtilsService){
    this.medicalRecordNumber = utilsService.getMedicalRecordNumber(recordDetails?.Patient);
    this.lastName = recordDetails?.Patient?.Name?.family ?? '';
    this.givenName = recordDetails?.Patient?.Name?.given ?? '';
    this.diagnosis = utilsService.getDiagnosisDisplayValue(recordDetails);
    this.dob = utilsService.getDate(recordDetails?.Patient?.Birth_Date);
    this.gender = utilsService.getGender(recordDetails?.Patient?.Sex);
    this.streetAddress = recordDetails?.Patient?.Street_Address ?? '';
    this.preferredLanguage = recordDetails?.Patient?.Preferred_Language ?? '';
    this.resource = recordDetails;
  }
}
