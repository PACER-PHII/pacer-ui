import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AppConstants} from "../../../providers/app-constants";
import {SimpleKeyValue} from "../../../domain/simple-key-value";

@Component({
  selector: 'app-immunization-history',
  templateUrl: './immunization-history.component.html',
  styleUrls: ['./immunization-history.component.scss', '../../record-details/record-details.component.scss']
})
export class ImmunizationHistoryComponent implements OnChanges{
  @Input() recordDetails: any;
  immunizationHistory: any[];

  constructor(public appConstants: AppConstants){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recordDetails']?.currentValue){
      this.immunizationHistory = this.getImmunizationHistory(this.recordDetails);
    }
  }

  private getImmunizationHistory(recordDetails: any) {
    let nestedArrayList = []
    recordDetails?.['Patient']?.['Immunization_History'].forEach(immunizationRecord => {
      console.log(immunizationRecord);
      let arrayList: any[] = [];
      for (const key in immunizationRecord) {
        const object = new SimpleKeyValue(key, immunizationRecord[key]);
        arrayList.push(object);
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }
}
