import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordService} from "../../service/case-record.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatAccordion} from "@angular/material/expansion";
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

  recordId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;
  recordHistory: any[];
  isLargeScreenMode = true;
  readonly NO_DATA_TO_DISPLAY = "No data to display."
  constructor(
    public route: ActivatedRoute,
    private caseRecordService: CaseRecordService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private utilsService: UtilsService,
    private personInfoService: PersonInfoService
  ) { }

  ngOnInit(): void {
    this.getCaseRecordDetails(this.recordId);
    this.getCaseRecordHistory(this.recordId);

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Medium,
      Breakpoints.Small,
    ])
      .subscribe(result => {
        this.isLargeScreenMode = !result.matches;
      });
  }

  getCaseRecordDetails(caseId: number): void{
    this.caseRecordService.getRecordDetailsById(caseId).subscribe(
      (response: any) => {
        this.caseDetails = response;

        //TODO: Remove hardcoded data. It was added for testing purpose
        this.caseDetails["Medication Provided"] = [
          {
            "Code": "141962",
            "System": "http://www.nlm.nih.gov/research/umls/rxnorm",
            "Display": "Azithromycin 250 MG OralCapsule",
            "Dosage": {
              "Value": "",
              "Unit": ""
            },
            "Date": "Thu Mar 27 00:00:00 UTC 2200",
            "Frequency": ""
          },
          {
            "Code": "1665497",
            "System": "http://www.nlm.nih.gov/research/umls/rxnorm",
            "Display": "levoFLOXacin 250 MG in 50 ML Injection",
            "Dosage": {
              "Value": "",
              "Unit": ""
            },
            "Date": "Thu Mar 27 00:00:00 UTC 2200",
            "Frequency": ""
          },
          {
            "Code": "1423080",
            "System": "http://www.nlm.nih.gov/research/umls/rxnorm",
            "Display": "doxycycline hyclate 200 MG Delayed Release Oral Tablet",
            "Dosage": {
              "Value": "",
              "Unit": ""
            },
            "Date": "Thu Mar 27 00:00:00 UTC 2200",
            "Frequency": ""
          }
        ];
        this.caseDetails["Diagnosis"] = [
          {
            "Code": "105629000",
            "System": "urn:oid:2.16.840.1.113883.6.96",
            "Display": "",
            "Date": "Thu Mar 27 00:00:00 UTC 2200"
          }
        ];
        this.caseDetails["Symptoms"] = [
          {
            "Code": "105629000",
            "System": "urn:oid:2.16.840.1.113883.6.96",
            "Display": "",
          }
        ];

        const personInfo = new PersonInfo(response, this.utilsService);
        this.personInfoService.setPersonInfo(personInfo);
      }
    );
  }

  scroll(element: HTMLDivElement) {
    element.scrollIntoView();
  }

  onViewRecordHistory() {
    this.router.navigate(['/record-history', this.recordId]);
  }

  onQueryRecord() {

  }

  private getCaseRecordHistory(recordId: number) {
    this.caseRecordService.getRecordHistoryById(recordId).subscribe({
      next: value => this.recordHistory = value,
      error: err => console.error(err)
    })
  }
}
