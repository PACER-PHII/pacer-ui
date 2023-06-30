import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordService} from "../../service/case-record.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatAccordion} from "@angular/material/expansion";
import {CaseRecordDTO} from "../../domain/case-record-dto";
import {UtilsService} from "../../service/utils.service";
import {PersonInfo} from "../../domain/person-info";
import {PersonInfoService} from "../../service/person-info.service";

export class SimpleKeyValue{
  key: string;
  value: string;
  constructor(key, value){
    this.key = key ?? '';
    this.value = value ?? '';
  }
}

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.scss']
})

export class RecordDetailsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  providerData: any[];
  facilityData: any[];
  personIdentityData: any[];
  guardianInfo: any[];
  immunizationHistory: any[];
  medicationsProvided: any[];
  labOrders: any[];
  symptoms: any[];
  travelHistory: any[];

  recordId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;
  isLargeScreenMode = true;
  readonly NO_DATA_TO_DISPLAY = "No data to display."
  constructor(
    private route: ActivatedRoute,
    private caseRecordService: CaseRecordService,
    private responsive: BreakpointObserver,
    private router: Router,
    private utilsService: UtilsService,
    private personInfoService: PersonInfoService
  ) { }

  ngOnInit(): void {
    this.getCaseRecordDetails(this.recordId);

    this.responsive.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Medium,
      Breakpoints.Small,
    ])
      .subscribe(result => {

        this.isLargeScreenMode = true;

        if (result.matches) {
          this.isLargeScreenMode = false;
        }

      });
  }

  getCaseRecordDetails(caseId: number): void{
    this.caseRecordService.getRecordDetailsById(caseId).subscribe(
      (response: any) => {
        this.caseDetails = response;
        this.providerData = this.getProviderData(response);
        this.facilityData = this.getFacilityData(response);
        this.personIdentityData = this.getIdentityData(response);
        this.guardianInfo = this.getGuardianInfoData(response);
        this.immunizationHistory = this.getImmunizationHistory(response);
        this.medicationsProvided = this.getProvidedMedications(response);
        this.labOrders = this.getLabOrder(response);
        this.symptoms = this.getSymptoms(response);
        this.travelHistory = this.getTravelHistory(response);
        const personInfo = new PersonInfo(response, this.utilsService);
        this.personInfoService.setPersonInfo(personInfo);
      }
    );
  }

  private getTravelHistory(response: any) {
    let nestedArrayList = []
    response['Travel_History']?.forEach(historyRecord => {
      let arrayList: any[] = [];
      for (const key in historyRecord) {
        const object = new SimpleKeyValue(key, historyRecord[key]);
        arrayList.push(object);
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }

  private getSymptoms(response: any) {
    let nestedArrayList = []
    response['Symptoms']?.forEach(symptom => {
      let arrayList: any[] = [];
      for (const key in symptom) {
        const object = new SimpleKeyValue(key, symptom[key]);
        arrayList.push(object);
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }

  private getLabOrder(response: any) {
    //TODO implement a parser when we know the meaning of the data.
    return [];
  }
  private getProvidedMedications(response: any) {
    let nestedArrayList = []
    response['Medication Provided']?.forEach(medication => {
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

  private getImmunizationHistory(response: any) {
    let nestedArrayList = []
    response.Immunization_History?.forEach(immunizationRecord => {
      let arrayList: any[] = [];
      for (const key in immunizationRecord) {
        const object = new SimpleKeyValue(key, immunizationRecord[key]);
        arrayList.push(object);
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }

  private getGuardianInfoData(response: any) {
    let nestedArrayList = []
    response.Parents_Guardians?.forEach(guardian => {
      let arrayList: any[] = [];
      for (const key in guardian) {
          const object = new SimpleKeyValue(key, guardian[key]);
          arrayList.push(object);
      }
      nestedArrayList.push(arrayList);
    });
    return nestedArrayList;
  }

  getIdentityData(response){
    const identityDataKeys = ['Birth_Date', 'Death_Date', 'Ethnicity', 'Insurance_Type', 'Name', 'Occupation', 'Race', 'Sex', 'Pregnant', 'PatientClass', 'Street_Address'];
    let arrayList: any[] = [];
    const patient = response.Patient;
    for (const key in response.Patient) {
      if(identityDataKeys.indexOf(key)!= -1){
        if(key === 'Name'){
          const name = `${response.Patient?.[key]?.family}, ${response.Patient?.[key]?.given}`;
          const object = new SimpleKeyValue(key, name);
          arrayList.push(object);
        }
        else if (key == "Race" || key=="Ethnicity" || key=="Preferred_Language" || key=="Insurance_Type"){
          let valueStr: string = `Code: ${response.Patient[key]?.Code} | System: ${response.Patient[key]?.System} | Display: ${response.Patient[key]?.Display}`
          if(!response.Patient[key]?.Code && !response.Patient[key]?.System && !response.Patient[key]?.Display){
            valueStr = '';
          }
          const object = new SimpleKeyValue(key, valueStr);
          arrayList.push(object);
        }
        else {
          const object = new SimpleKeyValue(key, response.Patient[key]);
          arrayList.push(object);
        }
      }
    }
    return arrayList;
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

  getProviderData(response) {
    let nestedArrayList = []
     response.Provider?.forEach(provider => {
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


  scroll(element: HTMLDivElement) {
    element.scrollIntoView();
  }

  onViewRecordHistory() {
    this.router.navigate(['/record-history', this.recordId]);
  }

}
