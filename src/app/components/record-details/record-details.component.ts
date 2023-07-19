import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CaseRecordService} from "../../service/case-record.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatAccordion} from "@angular/material/expansion";
import {UtilsService} from "../../service/utils.service";
import {PersonInfo} from "../../domain/person-info";
import {PersonInfoService} from "../../service/person-info.service";
import {mergeMap, Subscription, tap} from "rxjs";
import {CaseRecordStatus} from "../../domain/case-record-status";

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

export class RecordDetailsComponent implements OnInit, OnDestroy{
  @ViewChild(MatAccordion) accordion: MatAccordion;

  recordId = parseInt(this.route.snapshot.params['id']);
  caseDetails: any;
  recordHistory: any[];
  isLargeScreenMode = true;
  triggerSubscription$: Subscription;
  isLoadingTriggerData: boolean = false;
  isLoading: boolean = false;
  readonly NO_DATA_TO_DISPLAY = "No data to display.";
  errorMessageStr: string = '';

  constructor(
    public route: ActivatedRoute,
    private caseRecordService: CaseRecordService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private utilsService: UtilsService,
    private personInfoService: PersonInfoService
  ) { }

  ngOnDestroy(): void {
    this.triggerSubscription$?.unsubscribe();
  }

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

  getCaseRecordDetails(caseId: number): void {
    this.isLoading = !this.isLoadingTriggerData;
    this.caseRecordService.getRecordDetailsById(caseId).subscribe({
        next: (response: any) => {
          this.caseDetails = response;
          const personInfo = new PersonInfo(response, this.utilsService);
          this.personInfoService.setPersonInfo(personInfo);
          this.isLoading = false;
        },
        error: err => {
          console.error(err);
          this.isLoading = false;
          this.utilsService.showErrorNotification();
        }
      }
    );
  }
  onQueryRecord(recordId: number) {
    this.isLoadingTriggerData = true;
    this.triggerSubscription$ = this.caseRecordService.triggerRecord(recordId)
      .pipe(
        mergeMap(() => this.caseRecordService.checkInitialTriggerResult(recordId).pipe(
          tap({
            next: value => {
              this.caseDetails = value;
              const personInfo = new PersonInfo(value, this.utilsService);
              this.personInfoService.setPersonInfo(personInfo);
            },
            error: err => {
              console.error(err);
              this.utilsService.showErrorNotification();
            }
          }),
        )),
        mergeMap(() => this.caseRecordService.checkSecondaryTriggerResult(recordId)),
      ).subscribe({
        next: value => {
          this.isLoadingTriggerData = false;
          this.caseDetails = value;
          const personInfo = new PersonInfo(value, this.utilsService);
          this.personInfoService.setPersonInfo(personInfo);
          if(value.status?.toLowerCase() == 'error'){
            this.setErrorMessage(this.recordId);
          }
        },
        error: err => {
          console.error(err);
          this.isLoadingTriggerData = false;
          this.utilsService.showErrorNotification();
        }
      });
  }


  onViewRecordHistory() {
    this.router.navigate(['/record-history', this.recordId]);
  }

  private getCaseRecordHistory(recordId: number) {
    //TODO See if I should remove this code since we may not need the record history
    this.caseRecordService.getRecordHistoryById(recordId).subscribe({
      next: value => this.recordHistory = value,
      error: err => console.error(err)
    })
  }

  onCancelRecordRefresh(recordId: number) {
    this.isLoadingTriggerData = false;
    this.triggerSubscription$?.unsubscribe();
  }

  onRefreshRecord(recordId: number) {
    this.getCaseRecordDetails(recordId);
  }

  private setErrorMessage(recordId: number) {
    this.caseRecordService.getRecordDetailsById(recordId).subscribe({
      next: value => this.errorMessageStr = value?.[0]?.data?.StatusLog
    })
  }
}
