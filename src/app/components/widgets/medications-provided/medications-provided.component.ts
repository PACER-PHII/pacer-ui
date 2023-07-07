import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AppConstants} from "../../../providers/app-constants";
import {SimpleKeyValue} from "../../record-details/record-details.component";

@Component({
  selector: 'app-medications-provided',
  templateUrl: './medications-provided.component.html',
  styleUrls: ['./medications-provided.component.css', '../../record-details/record-details.component.scss']
})
export class MedicationsProvidedComponent implements OnChanges{
  @Input() recordDetails: any;
  medicationsProvided: any[];

  constructor(public appConstants: AppConstants){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recordDetails']?.currentValue){
      this.medicationsProvided = this.getProvidedMedications(this.recordDetails);
    }
  }

  private getProvidedMedications(recordDetails: any) {
    let nestedArrayList = []
    recordDetails['Medication Provided']?.forEach(medication => {
      let arrayList: any[] = [];
      for (const key in medication) {
        if(key == 'Dosage'){
          const value = `${medication[key]?.Value} ${medication[key]?.Unit}`
          const object = new SimpleKeyValue(key, value);
          arrayList.push(object);
        }
        else {
          const object = new SimpleKeyValue(key, medication[key]);
          arrayList.push(object);
        }
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }

}
