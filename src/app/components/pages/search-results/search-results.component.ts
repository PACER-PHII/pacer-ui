import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {CaseRecordService} from "../../../service/case-record.service";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'lastName', 'givenName', 'sendingApplication', 'diagnoses', 'action'];
  loadDataObservable$: Subscription;
  caseRecordList: [];
  totalCount = 0;
  isLoading = false;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private caseServiceRecordService: CaseRecordService
  ) { }

  getCaseRecords(filter: string, sortOrder: string, sortBy: string, pageNumber: number, pageSize: number): void {
    this.isLoading = true;
    this.loadDataObservable$ = this.caseServiceRecordService.getCases(filter, sortOrder, sortBy, pageNumber, pageSize).subscribe(
      (response: any) => {
        this.caseRecordList = response.data;
        this.totalCount = response.count;
        this.dataSource = new MatTableDataSource<any>(this.caseRecordList);
        this.isLoading = false;
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnInit(): void {
    this.getCaseRecords(null, null, null, null, null);
  }

  onViewCases() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
