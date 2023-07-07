import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SimpleKeyValue} from "../../record-details/record-details.component";
import {AppConstants} from "../../../providers/app-constants";

@Component({
  selector: 'app-guardians-info',
  templateUrl: './guardians-info.component.html',
  styleUrls: ['./guardians-info.component.scss', '../../record-details/record-details.component.scss']
})
export class GuardiansInfoComponent implements OnChanges{
  @Input() recordDetails: any;
  guardiansData: any[];

  constructor(public appConstants: AppConstants){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['facilityData']?.currentValue){
      this.guardiansData = this.getGuardianInfoData(this.recordDetails);
    }
  }
  private getGuardianInfoData(response: any) {
    let nestedArrayList = []
    response.Parents_Guardians?.forEach(guardian => {
      let arrayList: any[] = [];
      for (const key in guardian) {
        if(key == 'Name'){
          const value = `${guardian[key]?.given} ${guardian[key].family}`
          const object = new SimpleKeyValue(key, value);
          arrayList.push(object);
        }
        else {
          const object = new SimpleKeyValue(key, guardian[key]);
          arrayList.push(object);
        }
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }

}
