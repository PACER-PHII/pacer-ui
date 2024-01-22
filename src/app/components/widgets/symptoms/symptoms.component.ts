import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AppConstants} from "../../../providers/app-constants";
import {SimpleKeyValue} from "../../../domain/simple-key-value";

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.scss', '../../record-details/record-details.component.scss']
})
export class SymptomsComponent implements OnChanges{
  @Input() recordDetails: any;
  symptoms: any[];

  constructor(public appConstants: AppConstants){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recordDetails']?.currentValue){
      this.symptoms = this.getSymptoms(this.recordDetails);
    }
  }

  private getSymptoms(recordDetails: any) {
    let nestedArrayList = []
    recordDetails?.['Patient']?.['Symptoms']?.forEach(medication => {
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
