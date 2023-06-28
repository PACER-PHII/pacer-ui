import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordService} from "../../service/case-record.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

export interface TableValues{
  keys: string[];
  label: string;
  value?: string;
}

export class SimpleKeyValue{
  key: string;
  value: string;
  constructor(key, value){
    this.key = key ?? '';
    this.value = value ?? '';
  }
}

export interface RecordDetailsSection{
  sortOrder: number;
  displayName: string;
  expanded: boolean;
  tableData: TableValues[];
}

@Component({
  selector: 'app-record-details',
  templateUrl: './record-details.component.html',
  styleUrls: ['./record-details.component.scss']
})

export class RecordDetailsComponent implements OnInit {

  panelOpenState: boolean;
  expansionPanelData
  tableData: any;
  providerData: any[];
  facilityData: any[];
  personIdentityData: any[];
  guardianInfo: any[];
  immunizationHistory: any[];
  medicationsProvided: any[];
  labOrderCodes: any[];

  recordId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;
  isLargeScreenMode = true;
  collection = [];
  constructor(
    private route: ActivatedRoute,
    private caseRecordService: CaseRecordService,
    private responsive: BreakpointObserver,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCaseDetails(this.recordId);

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

  getCaseDetails(caseId: number): void{
    this.caseRecordService.getRecordDetailsById(caseId).subscribe(
      (response: any) => {
        console.log(response);
        this.caseDetails = response;
        this.providerData = this.getProviderData(response);
        this.facilityData = this.getFacilityData(response);
        this.personIdentityData = this.getIdentityData(response);
        this.guardianInfo = this.getGuardianInfoData(response);
        this.immunizationHistory = this.getImmunizationHistory(response);
        this.medicationsProvided = this.getProvidedMedications(response);
        this.labOrderCodes = this.getLabOrderCodes(response);
      }
    );
  }

  private getLabOrderCodes(response: any) {
    //TODO implement
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
