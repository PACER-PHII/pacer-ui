import {CaseRecordStatus} from "./case-record-status";
import {AdministrativeSex} from "./admnistrative-sex";

export class CaseRecordDTO {
  recordId: number | null;
  lastName: string;
  givenName: string;
  diagnoses: string;
  dob: Date | null;
  status: CaseRecordStatus | null;
  gender: AdministrativeSex | null;
  resource: any;


  constructor(responseRecord: any){
    this.recordId = responseRecord.Patient.ID?.[0]?.value ?? null;
    this.lastName = responseRecord?.Patient?.Name?.family ?? '';
    this.givenName = responseRecord?.Patient?.Name?.given ?? '';
    this.diagnoses = responseRecord?.Patient?.Diagnosis?.[0] ?? null;
    this.dob = this.getDob(responseRecord);
    this.status = this.getStatus(responseRecord);
    this.gender = this.getGender(responseRecord);
    this.resource = responseRecord;
  }

  private getStatus(responseRecord: any){
    if(!responseRecord?.Status || responseRecord.Status?.length == 0){
      console.warn("Case Record is missing status field " + JSON.stringify(responseRecord))
      return null;
    }
    else if (responseRecord.Status.length != 1){
      console.warn("Invalid Status Code passed for record " + JSON.stringify(responseRecord));
      return null;
    }
    const statusCode = responseRecord.Status;
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
        console.warn("Invalid Status Code passed for record " + JSON.stringify(responseRecord));
        return null;
      }
    }
  }

  // parsing dates in the following format yyyyMMdd Example: 19750602
  private getDob(responseRecord) {
    if(!responseRecord?.Patient?.Birth_Date){
      return null;
    }
    if(!responseRecord?.Patient?.Birth_Date?.length
      ||
      responseRecord?.Patient?.Birth_Date?.length !== 8
      ||
      isNaN(responseRecord?.Patient?.Birth_Date)
    ){
      console.warn("Unable to parse invalid date " + responseRecord?.Patient?.Birth_Date);
      return null;
    }
    const dobStr = responseRecord?.Patient?.Birth_Date;
    const day = dobStr.slice(-2);
    const month = dobStr.slice(4,6);
    const year = dobStr.slice(0,4);
    const formattedDodStr = year + "-" + month + "-" + day;

    if (Date.parse(formattedDodStr)){
      return new Date(formattedDodStr);
    }
    else{
      console.warn("Unable to parse invalid date " + responseRecord?.Patient?.Birth_Date);
      return null;
    }
  }

  /**
   * See https://hl7-definition.caristix.com/v2/HL7v2.5.1/Tables/0001
   * For values used in the function
   */
  private getGender(responseRecord: any) {
    if(!responseRecord?.Patient?.Sex){
      return null;
    }
    switch(responseRecord?.Patient?.Sex){
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
        console.warn("Invalid Patient.Sex passed for record " + JSON.stringify(responseRecord));
        return null;
    }
  }
}
