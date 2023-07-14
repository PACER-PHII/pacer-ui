import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AppConstants} from "../../../providers/app-constants";
import {SimpleKeyValue} from "../../record-details/record-details.component";

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss', '../../record-details/record-details.component.scss']
})
export class DiagnosisComponent implements OnChanges{
  @Input() recordDetails: any;
  diagnosis: any[];

  constructor(public appConstants: AppConstants){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recordDetails']?.currentValue){
      this.diagnosis = this.getDiagnosis(this.recordDetails);
    }
  }

  private getDiagnosis(recordDetails: any) {
    let nestedArrayList = [];
    recordDetails?.Patient?.Diagnosis.forEach(medication => {
      let arrayList: any[] = [];
      for (const key in medication) {
        const object = new SimpleKeyValue(key, medication[key]);
        arrayList.push(object);
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }

}
