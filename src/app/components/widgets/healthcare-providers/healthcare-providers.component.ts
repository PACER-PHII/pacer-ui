import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SimpleKeyValue} from "../../record-details/record-details.component";
import {AppConstants} from "../../../providers/app-constants";

@Component({
  selector: 'app-healthcare-providers',
  templateUrl: './healthcare-providers.component.html',
  styleUrls: ['./healthcare-providers.component.scss', '../../record-details/record-details.component.scss']
})
export class HealthcareProvidersComponent implements OnChanges {
  @Input() recordDetails: any;
  providersData: any[];

  constructor(public appConstants: AppConstants){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recordDetails']?.currentValue){
      this.providersData = this.getProvidersData(this.recordDetails);
    }
  }

  getProvidersData(recordDetails) {
    let nestedArrayList = []
    recordDetails.Provider?.forEach(provider => {
      let arrayList: any[] = [];
      for (const key in provider) {
        if(key != 'ID'){
          const object = new SimpleKeyValue(key, provider[key]);
          arrayList.push(object);
        }
        else {
          const value = `${provider[key]?.type} ${provider[key]?.value}`
          const object = new SimpleKeyValue(key, value);
          arrayList.push(object);
        }
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }
}
