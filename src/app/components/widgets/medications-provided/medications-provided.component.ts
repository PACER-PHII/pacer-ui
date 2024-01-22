import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {AppConstants} from "../../../providers/app-constants";
import {SimpleKeyValue} from "../../../domain/simple-key-value";


export class SimpleMedProvided{
  source: string;
  code: string;
  system: string;
  dosage: string;
  date: Date;
  frequency: string;
  display: string;
  constructor(medProvided: any, source: string, date: string){
    this.source = source ?? '';
    this.date = new Date(date);
    this.code = medProvided.Code ?? '';
    this.system = medProvided.System ?? '';
    this.display = medProvided.Display ?? '';
    this.dosage = `${medProvided?.dosage?.value} ${medProvided?.dosage?.unit}`;
    this.frequency = medProvided.frequency ?? '';
  }
}
@Component({
  selector: 'app-medications-provided',
  templateUrl: './medications-provided.component.html',
  styleUrls: ['./medications-provided.component.scss', '../../record-details/record-details.component.scss']
})

export class MedicationsProvidedComponent implements OnChanges{
  @Input() recordDetails: any;
  @Input() recordHistory: any;

  medicationsProvided: any[];
  medicationHistory: SimpleMedProvided[] = [];

  constructor(public appConstants: AppConstants){}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['recordDetails']?.currentValue){
      this.medicationsProvided = this.getProvidedMedications(this.recordDetails);
    }

    if(changes['recordHistory']?.currentValue){
      this.medicationHistory = this.getMedicationHistory(this.recordHistory);
    }
  }

  private getProvidedMedications(recordDetails: any) {
    let nestedArrayList = []
    recordDetails?.['Patient']?.['Medication Provided']?.forEach(medication => {
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

  private getMedicationHistory(medicationHistory: any[]) {
    const medsProvided = medicationHistory.map(
      record => {
         return record?.data?.Patient['Medication Provided'].map(medication => {
          return {source: record.source, date: record.date, medication: medication}
        })
      }
    )
      .flat(1)
      .map(record => new SimpleMedProvided(record.medication, record.source, record.date));
    return medsProvided;
  }
}
