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
        const personInfo = new PersonInfo(response, this.utilsService);
        this.personInfoService.setPersonInfo(personInfo);
      }
    );
  }

  onQueryRecord(recordId: number) {
    this.caseRecordService.triggerRecord(recordId).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => console.error(err)
    })
  }

  onViewRecordHistory() {
    this.router.navigate(['/record-history', this.recordId]);
  }

  private getCaseRecordHistory(recordId: number) {
    this.caseRecordService.getRecordHistoryById(recordId).subscribe({
      next: value => this.recordHistory = value,
      error: err => console.error(err)
    })
  }
}
