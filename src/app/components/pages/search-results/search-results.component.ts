import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {CaseRecordService} from "../../../service/case-record.service";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

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

  displayedColumns: string[] = ['id', 'lastName', 'givenName', 'sendingApplication', 'diagnoses', 'action'];
  loadDataObservable$: Subscription;
  isLoading = false;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private caseServiceRecordService: CaseRecordService,
    private router: Router
  ) { }

  getCaseRecords(): void {
    this.isLoading = true;
    this.loadDataObservable$ = this.caseServiceRecordService.getAll().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource<any>(this.getFridList(response));
        this.isLoading = false;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnInit(): void {
   this.getCaseRecords();
  }

  onViewCases() {
    this.router.navigate(['/case-details', 12]);
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
