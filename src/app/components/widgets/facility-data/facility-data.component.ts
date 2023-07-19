import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AppConstants} from "../../../providers/app-constants";
import {SimpleKeyValue} from "../../../domain/simple-key-value";

@Component({
  selector: 'app-facility-data',
  templateUrl: './facility-data.component.html',
  styleUrls: ['./facility-data.component.scss', '../../record-details/record-details.component.scss']
})
export class FacilityDataComponent implements OnChanges {
  @Input() recordDetails: any;
  facilityData: any[];

  constructor(public appConstants: AppConstants){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['facilityData']?.currentValue){
      this.facilityData = this.getFacilityData(this.recordDetails);
    }
  }

  getFacilityData(response){
    let arrayList: any[] = [];
    const facility = response.Facility;
    for (const key in response.Facility) {
      const object = new SimpleKeyValue(key, facility[key]);
      arrayList.push(object);
    }
    return arrayList;
  }
}
