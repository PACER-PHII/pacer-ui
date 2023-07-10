import { Injectable } from '@angular/core';
import {CaseRecordStatus} from "../domain/case-record-status";
import {AdministrativeSex} from "../domain/admnistrative-sex";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getMedicalRecordNumber(patient): number | null{
    return patient?.ID?.[0]?.value ?? null
  }

  getStatus(caseRecord: any){
    if(!caseRecord?.Status || caseRecord.Status?.length == 0){
      console.warn("Case Record is missing status field " + JSON.stringify(caseRecord))
      return null;
    }
    else if (caseRecord.Status.length != 1){
      console.warn("Invalid Status Code passed for record " + JSON.stringify(caseRecord));
      return null;
    }
    const statusCode = caseRecord.Status;
    switch(statusCode){
      case "R":
        return CaseRecordStatus.R;
      case "E":
        return CaseRecordStatus.E;
      case "A":
        return CaseRecordStatus.A;
      case "P":
        return CaseRecordStatus.P;
      default: {
        console.warn("Invalid Status Code passed for record " + JSON.stringify(caseRecord));
        return null;
      }
    }
  }

  /**
   * See https://hl7-definition.caristix.com/v2/HL7v2.5.1/Tables/0001
   * For values used in the function
   */
  getGender(genderStr: string): AdministrativeSex | null {
    if(!genderStr){
      return null;
    }
    switch(genderStr){
      case "A":
        return AdministrativeSex.A;
      case "F":
        return AdministrativeSex.F;
      case "M":
        return AdministrativeSex.M;
      case "N":
        return AdministrativeSex.N;
      case "O":
        return AdministrativeSex.O;
      case "U":
        return AdministrativeSex.U;
      default:
        console.warn("Invalid Patient.Sex passed " + genderStr);
        return null;
    }
  }

  getDate(dateStr) {
    if(!dateStr){
      return null;
    }
    if(!dateStr.length
      ||
      dateStr.length !== 8
      ||
      isNaN(dateStr)
    ){
      console.warn("Unable to parse invalid date " + dateStr);
      return null;
    }
    const day = dateStr.slice(-2);
    const month = dateStr.slice(4,6);
    const year = dateStr.slice(0,4);
    const formattedDodStr = year + "-" + month + "-" + day;

    if (Date.parse(formattedDodStr)){
      return new Date(formattedDodStr);
    }
    else{
      console.warn("Unable to parse invalid date " + dateStr);
      return null;
    }
  }

  getDiagnosisDisplayValue(diagnosis){
    // TODO Test with actual data
    if(!diagnosis?.length){
      return '';
    }
    const sorted = diagnosis?.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
    return sorted?.length > 0 ? sorted[0] : (diagnosis?.[0].display ?? null);
  }
}
