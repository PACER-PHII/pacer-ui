import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import {SimpleKeyValue} from "../../record-details/record-details.component";
import {AppConstants} from "../../../providers/app-constants";

@Component({
  selector: 'app-identity-info',
  templateUrl: './identity-info.component.html',
  styleUrls: ['./identity-info.component.scss', '../../record-details/record-details.component.scss']
})
export class IdentityInfoComponent implements OnChanges {
  @Input() recordDetails: any;
  identityInfoData: any[];

  constructor(public appConstants: AppConstants){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recordDetails']?.currentValue){
      this.identityInfoData = this.getIdentityInfoData(this.recordDetails);
    }
  }

  getIdentityInfoData(recordDetails): any{
    const identityDataKeys = ['Birth_Date', 'Death_Date', 'Ethnicity',
      'Insurance_Type', 'Name', 'Occupation', 'Race', 'Sex', 'Pregnant', 'PatientClass',
      'Street_Address', 'Date_Of_Onset', 'Date_Discharged', 'Admission_DateTime',
      'Placer_Order_Code', 'Visit_DateTime'
    ];

    let arrayList: any[] = [];
    for (const key in recordDetails.Patient) {
      if(identityDataKeys.indexOf(key)!= -1){
        if(key === 'Name'){
          const name = `${recordDetails.Patient?.[key]?.family}, ${recordDetails.Patient?.[key]?.given}`;
          const object = new SimpleKeyValue(key, name);
          arrayList.push(object);
        }
        else if (key == "Race" || key=="Ethnicity" || key=="Preferred_Language" || key=="Insurance_Type"){
          let valueStr: string = `Code: ${recordDetails.Patient[key]?.Code} | System: ${recordDetails.Patient[key]?.System} | Display: ${recordDetails.Patient[key]?.Display}`
          if(!recordDetails.Patient[key]?.Code && !recordDetails.Patient[key]?.System && !recordDetails.Patient[key]?.Display){
            valueStr = '';
          }
          const object = new SimpleKeyValue(key, valueStr);
          arrayList.push(object);
        }
        else {
          const object = new SimpleKeyValue(key, recordDetails.Patient[key]);
          arrayList.push(object);
        }
      }
    }
    return arrayList;
  }
}
