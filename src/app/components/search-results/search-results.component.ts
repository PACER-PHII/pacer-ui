import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {mergeMap, Subscription, tap} from "rxjs";
import {CaseRecordService} from "../../service/case-record.service";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {CaseRecordDTO} from "../../domain/case-record-dto";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {UtilsService} from "../../service/utils.service";
import {CaseRecordStatus} from "../../domain/case-record-status";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['medicalRecordNumber', 'diagnosis', 'lastName', 'givenName', 'dob', 'gender', 'status', 'actions'];
  loadDataObservable$: Subscription;
  isLoading = false;
  dataSource: MatTableDataSource<CaseRecordDTO>;
  triggerSubscription$: Subscription;
  isLargeScreenMode: boolean = true;
  time: number = 0;
  interval;

  constructor(
    private caseRecordService: CaseRecordService,
    private router: Router,
    private snackBar: MatSnackBar,
    private responsive: BreakpointObserver,
    private utilsService: UtilsService
  ) { }

  ngOnDestroy(): void {
    this.triggerSubscription$?.unsubscribe();
  }

  getCaseRecords(): void {
    this.isLoading = true;
    this.loadDataObservable$ = this.caseRecordService.getCaseRecordsList().subscribe({
        next: (response: CaseRecordDTO[]) => {
          this.dataSource = new MatTableDataSource<CaseRecordDTO>(response);
          this.isLoading = false;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (error) => {
          this.snackBar.open("Unable to load records. Server error.", 'x' ,{
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-color']
          });
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      }
    );
  }

  ngOnInit(): void {
    this.getCaseRecords();
    console.log(this.responsive);
    this.responsive.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Medium,
      Breakpoints.Small,
    ])
      .subscribe(result => {
        this.isLargeScreenMode = !result.matches;
      });
  }

  onViewCases(record: any) {
    this.router.navigate(['/record-details', record.recordId]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onExportToCSV() {
    this.caseRecordService.downloadExcelFile();
  }

  onViewHistory(record) {
    this.router.navigate(['/record-history', record.recordId]);
  }

  startTimer() {
    if(!this.interval){
      this.interval = setInterval(() => {
        this.time++;
      },1000);
    }

  }

  onQueryRecord(recordId: number) {
    this.startTimer();
    this.triggerSubscription$ = this.caseRecordService.triggerRecord(recordId)
      .pipe(
        mergeMap(() => this.caseRecordService.checkInitialTriggerResult(recordId).pipe(
          tap({
            next: value => {
              const caseRecordDTO = new CaseRecordDTO(value, this.utilsService, true);
              this.refreshDataSourceData(caseRecordDTO);
            },
            error: err => {
              console.error(err);
            }
          }),
        )),
        mergeMap(() => this.caseRecordService.checkSecondaryTriggerResult(recordId)),
      ).subscribe({
        next: value => {
          const caseRecordDTO = new CaseRecordDTO(value, this.utilsService, false);
          this.refreshDataSourceData(caseRecordDTO);

        },
        error: err => {
          console.error(err);
        }
      });
  }

  private refreshDataSourceData(caseDto: CaseRecordDTO) {
    this.dataSource.data = this.dataSource.data.map(record => (record.recordId  == caseDto.recordId) ? caseDto: record);
  }

  onAutoRefresh(record: CaseRecordDTO) {
    record.isRefreshing = true;
    this.refreshDataSourceData(record)
    this.caseRecordService.checkSecondaryTriggerResult(record.recordId).subscribe({
      next: value => {
        const caseRecordDTO = new CaseRecordDTO(value, this.utilsService);
        this.refreshDataSourceData(caseRecordDTO)
      },
      error: err => {
        console.error(err)
      }
    })
  }

  protected readonly CaseRecordStatus = CaseRecordStatus;

}
