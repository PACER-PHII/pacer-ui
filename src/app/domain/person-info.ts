import {CaseRecordStatus} from "./case-record-status";
import {AdministrativeSex} from "./admnistrative-sex";
import {UtilsService} from "../service/utils.service";

export class PersonInfo {
  medicalRecordNumber: number | null;
  lastName: string;
  givenName: string;
  lastDiagnosisStr: string;
  dob: Date | null;
  status: CaseRecordStatus | null;
  gender: AdministrativeSex | string | null;
  streetAddress: string;
  preferredLanguage: string;
  resource: any;
  race: string;
  ethnicity: string;
  pregnant: string;
  constructor(recordDetails: any, utilsService: UtilsService){
    this.medicalRecordNumber = utilsService.getMedicalRecordNumber(recordDetails?.Patient);
    this.lastName = recordDetails?.Patient?.Name?.family ?? '';
    this.givenName = recordDetails?.Patient?.Name?.given ?? '';
    this.lastDiagnosisStr = utilsService.getDiagnosisDisplayValue(recordDetails?.Patient?.Diagnosis);
    this.dob = utilsService.getDate(recordDetails?.Patient?.Birth_Date);
    this.gender = utilsService.getGender(recordDetails?.Patient?.Sex);
    this.streetAddress = recordDetails?.Patient?.Street_Address ?? '';
    this.preferredLanguage = recordDetails?.Patient?.Preferred_Language ?? '';
    this.race = recordDetails?.Patient?.Race?.Display ?? '';
    this.ethnicity = recordDetails?.Patient?.Ethnicity?.Display ?? '';
    this.resource = recordDetails;
    this.pregnant = utilsService.getPatientPregnantStr(recordDetails?.Patient?.Pregnant);
  }
}
