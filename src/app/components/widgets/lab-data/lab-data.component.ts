import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AppConstants} from "../../../providers/app-constants";
import {SimpleKeyValue} from "../../record-details/record-details.component";

@Component({
  selector: 'app-lab-data',
  templateUrl: './lab-data.component.html',
  styleUrls: ['./lab-data.component.css', '../../record-details/record-details.component.scss']
})
export class LabDataComponent implements OnChanges {
  @Input() recordDetails: any;
  labOrders: any[];

  constructor(public appConstants: AppConstants){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recordDetails']?.currentValue){
      this.labOrders = this.getLabOrders(this.recordDetails);
    }
  }

  private getLabOrders(recordDetails: any) {
    let nestedArrayList = []
    recordDetails.Patient?.Lab_Order_Code?.forEach(labOrder => {
      let labObj: any = {};
      for (const key in labOrder) {
        if(key == 'Laboratory_Results' && labOrder['Laboratory_Results']?.length > 0){
          let labResults = [];
          labOrder['Laboratory_Results'].forEach(result => {
            let keyValueList = [];
            for (const key in result) {
              if(key == "Unit"){
                const facilityId = `Code: ${labOrder.Facility?.[key]?.Code || ''} System: ${labOrder.Facility?.[key]?.System || ''} Display: ${labOrder.Facility?.[key]?.Display || ''}`;
                const object = new SimpleKeyValue(key, facilityId);
                keyValueList.push(object);
              }
              else{
                const object = new SimpleKeyValue(key, result[key]);
                keyValueList.push(object);
              }
            }
            labResults.push(keyValueList)
          });
          labObj.labResults = labResults;
        }
        else if (key == "Facility"){
          const facility = labOrder.Facility;
          let facilityKeyValue = []
          for (const key in labOrder.Facility) {
            if (key == "ID" && labOrder.Facility?.['ID']) {
              const facilityId = `Value: ${labOrder.Facility?.[key]?.value} Type: ${labOrder.Facility?.[key]?.type}`;
              const object = new SimpleKeyValue(key, facilityId);
              facilityKeyValue.push(object);
            }
            else {
              const object = new SimpleKeyValue(key, facility[key]);
              facilityKeyValue.push(object);
            }
          }
          labObj.facility = facilityKeyValue;
        }
        else if (key == "Provider"){
          const facility = labOrder.Provider;
          let providerKeyValue = []
          for (const key in labOrder.Provider) {
            if (key == "ID") {
              const providerId = `Value: ${labOrder.Provider?.[key]?.value} Type: ${labOrder.Provider?.[key]?.type}`;
              const object = new SimpleKeyValue(key, providerId);
              providerKeyValue.push(object);
            }
            else {
              const object = new SimpleKeyValue(key, facility[key]);
              providerKeyValue.push(object);
            }
          }
          labObj.provider=providerKeyValue;
        }
        else {
          labObj[key]=labOrder[key];
        }
      }
      nestedArrayList.push(labObj);
    });
    return nestedArrayList;
  }

}
