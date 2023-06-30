import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {CaseRecordService} from "../../service/case-record.service";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {CaseRecordDTO} from "../../domain/case-record-dto";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['medicalRecordNumber', 'diagnosis', 'lastName', 'givenName', 'dob', 'gender', 'status', 'actions'];
  loadDataObservable$: Subscription;
  isLoading = false;
  dataSource: MatTableDataSource<CaseRecordDTO>;

  constructor(
    private caseServiceRecordService: CaseRecordService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  getCaseRecords(): void {
    this.isLoading = true;
    this.loadDataObservable$ = this.caseServiceRecordService.getCaseRecordsList().subscribe({
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
  }

  onViewCases(record: any) {
    console.log(record);
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
    //TODO implement export to excel
    console.log("Exporting to Excel")
  }

  onShowHistory(record: CaseRecordDTO) {
    //TODO Implement Action
  }

  onQueryRecord(record) {
    //TODO Implement Action
  }
}
