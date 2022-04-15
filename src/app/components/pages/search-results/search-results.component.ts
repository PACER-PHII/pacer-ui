import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {CaseRecordService} from "../../../service/case-record.service";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

export class CaseRecord {
  id: number;
  lastName: string;
  givenName: string;
  sendingApplication: string;
  diagnoses: string;
}


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'lastName', 'givenName', 'sendingApplication', 'diagnoses'];
  loadDataObservable$: Subscription;
  isLoading = false;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private caseServiceRecordService: CaseRecordService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  getCaseRecords(): void {
    this.isLoading = true;
    this.loadDataObservable$ = this.caseServiceRecordService.getAll().subscribe({
        next: (response: any) => {
          this.dataSource = new MatTableDataSource<any>(this.getFridList(response));
          this.isLoading = false;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          this._snackBar.open("Unable to load records. Server error.", 'x' ,{
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
    this.router.navigate(['/case-details', record.id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getFridList(responseData): CaseRecord[] {
    return responseData.map((responseRecord)=> {
      let caseRecord = new CaseRecord();
      caseRecord.id = responseRecord.Id;
      caseRecord.lastName = responseRecord?.Patient?.Name?.family;
      caseRecord.givenName = responseRecord?.Patient?.Name?.given;
      caseRecord.sendingApplication = responseRecord['Sending Application'];
      caseRecord.diagnoses = "Unknown";
      return caseRecord;
    });
  }
}
