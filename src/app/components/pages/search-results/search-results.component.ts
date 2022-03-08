import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {CaseRecordService} from "../../../service/case-record.service";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  displayedColumns: string[] = [ 'lastName', 'givenName', 'sendingApplication', 'diagnoses'];
  loadDataObservable$: Subscription;
  caseRecordList: [];
  totalCount = 0;
  isLoading = false;
  dataSource = new MatTableDataSource<any>();;

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
      }
    );
  }

  ngOnInit(): void {
  }

  onRowClicked(row:any) {

  }

  pageChanged($event: PageEvent) {

  }
}
